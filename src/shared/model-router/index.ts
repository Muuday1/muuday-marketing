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
  headers?: Record<string, string>
}

const PROVIDERS: Record<QualityTier, ProviderConfig> = {
  premium: {
    name: 'kimi',
    apiKey: env.KIMI_API_KEY,
    baseUrl: 'https://api.moonshot.ai/v1/chat/completions',
    model: 'kimi-k2.5',
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
  copy: 'standard', // GPT-4.1 — reliable, fast, no reasoning
  structured: 'standard', // GPT-4.1 for structured output
  code: 'premium', // Kimi for code generation
  summary: 'standard', // GPT-4.1 for summaries
  image: 'standard', // GPT-4.1 for image prompts
  video: 'standard', // GPT-4.1 for video scripts
}

const costTracker: Record<string, number> = {}

function trackCost(provider: string, tokensIn: number, tokensOut: number): void {
  const rate =
    provider === 'kimi'
      ? { in: 1.0, out: 3.0 }
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
    ...config.headers,
  }

  const isKimi = config.name === 'kimi'
  const body: Record<string, unknown> = {
    model: config.model,
    max_tokens: options.maxTokens ?? (isKimi ? 2048 : 1024),
    messages: [
      ...(options.system ? [{ role: 'system' as const, content: options.system }] : []),
      { role: 'user' as const, content: options.prompt },
    ],
  }
  // Kimi k2.5/k2.6 only accepts temperature=1
  if (!isKimi) {
    body.temperature = options.temperature ?? 0.7
  } else {
    body.temperature = 1
    // Disable thinking mode to get direct answers without reasoning chain
    body.enable_thinking = false
  }
  // Force JSON output for structured tasks when using Kimi
  if (isKimi && options.system?.includes('JSON')) {
    body.response_format = { type: 'json_object' }
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

    const message = data.choices?.[0]?.message
    const content = message?.content || message?.reasoning_content || ''

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
 * Kimi is the default for all tasks. Others are fallback.
 */
export async function generateWithModel(
  task: TaskType,
  options: GenerateOptions
): Promise<ApiResult<string>> {
  const tier = TASK_MODEL_MAP[task] || 'premium'
  return generate(tier, options)
}

/**
 * Generate an image using fal.ai.
 */
export async function generateImage(options: {
  prompt: string
  size?: string
  style?: string
}): Promise<ApiResult<{ url: string }>> {
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
