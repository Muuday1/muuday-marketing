import { env } from '@/config/env'
import { ApiResult } from '@/types'

export type QualityTier = 'premium' | 'standard' | 'budget' | 'local'
export type TaskType = 'copy' | 'structured' | 'code' | 'summary' | 'image' | 'video'

interface GenerateOptions {
  prompt: string
  system?: string
  temperature?: number
  maxTokens?: number
}

interface ProviderConfig {
  name: string
  apiKey: string | undefined
  baseUrl: string
  model: string
  maxRetries: number
}

const PROVIDERS: Record<QualityTier, ProviderConfig> = {
  premium: {
    name: 'anthropic',
    apiKey: env.ANTHROPIC_API_KEY,
    baseUrl: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-7-sonnet-20250219',
    maxRetries: 3,
  },
  standard: {
    name: 'openai',
    apiKey: env.OPENAI_API_KEY,
    baseUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4.1',
    maxRetries: 2,
  },
  budget: {
    name: 'deepseek',
    apiKey: env.DEEPSEEK_API_KEY,
    baseUrl: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    maxRetries: 2,
  },
  local: {
    name: 'local',
    apiKey: undefined,
    baseUrl: 'http://localhost:11434/v1/chat/completions',
    model: 'llama3',
    maxRetries: 1,
  },
}

const TASK_MODEL_MAP: Record<TaskType, QualityTier> = {
  copy: 'premium',
  structured: 'standard',
  code: 'standard',
  summary: 'budget',
  image: 'premium',
  video: 'premium',
}

const costTracker: Record<string, number> = {}

function trackCost(provider: string, tokensIn: number, tokensOut: number): void {
  const rate =
    provider === 'anthropic'
      ? { in: 3.0, out: 15.0 }
      : provider === 'openai'
        ? { in: 2.0, out: 8.0 }
        : provider === 'deepseek'
          ? { in: 0.27, out: 1.1 }
          : { in: 0, out: 0 }

  const cost = (tokensIn * rate.in + tokensOut * rate.out) / 1_000_000
  costTracker[provider] = (costTracker[provider] || 0) + cost
}

async function callProvider(
  config: ProviderConfig,
  options: GenerateOptions
): Promise<ApiResult<string>> {
  if (config.name !== 'local' && !config.apiKey) {
    return { success: false, error: `API key not configured for ${config.name}` }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.apiKey || ''}`,
  }

  if (config.name === 'anthropic') {
    headers['anthropic-version'] = '2023-06-01'
  }

  const body =
    config.name === 'anthropic'
      ? {
          model: config.model,
          max_tokens: options.maxTokens ?? 1024,
          temperature: options.temperature ?? 0.7,
          system: options.system,
          messages: [{ role: 'user', content: options.prompt }],
        }
      : {
          model: config.model,
          max_tokens: options.maxTokens ?? 1024,
          temperature: options.temperature ?? 0.7,
          messages: [
            ...(options.system ? [{ role: 'system' as const, content: options.system }] : []),
            { role: 'user' as const, content: options.prompt },
          ],
        }

  try {
    const response = await fetch(config.baseUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      return { success: false, error: `${config.name} API error: ${response.status} ${errorText}` }
    }

    const data = await response.json()

    const content =
      config.name === 'anthropic'
        ? data.content?.[0]?.text
        : data.choices?.[0]?.message?.content

    if (!content) {
      return { success: false, error: `${config.name} returned empty content` }
    }

    const tokensIn = data.usage?.prompt_tokens || data.usage?.input_tokens || 0
    const tokensOut = data.usage?.completion_tokens || data.usage?.output_tokens || 0
    trackCost(config.name, tokensIn, tokensOut)

    return { success: true, data: content }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { success: false, error: `${config.name} request failed: ${message}` }
  }
}

/**
 * Generate text using the specified quality tier.
 */
export async function generate(
  tier: QualityTier,
  options: GenerateOptions
): Promise<ApiResult<string>> {
  const config = PROVIDERS[tier]
  if (!config) {
    return { success: false, error: `Unknown tier: ${tier}` }
  }

  for (let attempt = 0; attempt < config.maxRetries; attempt++) {
    const result = await callProvider(config, options)
    if (result.success) return result

    if (attempt < config.maxRetries - 1) {
      const delay = Math.pow(2, attempt) * 1000
      await new Promise((r) => setTimeout(r, delay))
    }
  }

  return { success: false, error: `${config.name} failed after ${config.maxRetries} retries` }
}

/**
 * Generate text using the optimal model for a task type.
 */
export async function generateWithModel(
  task: TaskType,
  options: GenerateOptions
): Promise<ApiResult<string>> {
  const tier = TASK_MODEL_MAP[task] || 'standard'
  return generate(tier, options)
}

/**
 * Generate an image using fal.ai.
 */
export async function generateImage(
  options: { prompt: string; size?: string; style?: string }
): Promise<ApiResult<{ url: string }>> {
  if (!env.FAL_KEY || env.FAL_KEY === 'dummy') {
    return { success: false, error: 'FAL_KEY not configured' }
  }

  try {
    const { fal } = await import('@fal-ai/client')
    fal.config({ credentials: env.FAL_KEY })

    const result = await fal.subscribe('fal-ai/flux', {
      input: {
        prompt: options.prompt,
        image_size: (options.size || 'square') as 'square' | 'portrait' | 'landscape',
        num_images: 1,
      },
    })

    const url = result.data?.images?.[0]?.url
    if (!url) {
      return { success: false, error: 'Image generation returned no URL' }
    }

    trackCost('fal', 0, 0)
    return { success: true, data: { url } }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { success: false, error: `Image generation failed: ${message}` }
  }
}

/**
 * Try providers in order until one succeeds.
 */
export async function withFallback(
  chain: QualityTier[],
  options: GenerateOptions
): Promise<ApiResult<string>> {
  for (const tier of chain) {
    const result = await generate(tier, options)
    if (result.success) return result
  }

  return {
    success: false,
    error: `All providers failed: ${chain.join(' -> ')}`,
  }
}

/**
 * Get cost summary across all providers.
 */
export function getCostSummary(): Record<string, number> {
  return { ...costTracker }
}
