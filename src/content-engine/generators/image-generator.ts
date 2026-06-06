import { env } from '@/config/env'
import { ApiResult } from '@/types'

interface ImageGenerationInput {
  prompt: string
  style?: 'photographic' | 'illustration' | 'minimalist' | 'cinematic'
  aspectRatio?: '1:1' | '4:5' | '9:16' | '16:9'
  size?: '1024x1024' | '1792x1024' | '1024x1792'
}

interface ImageGenerationOutput {
  url: string
  revisedPrompt: string
}

/**
 * Generate images using DALL-E 3.
 * All prompts must include brand style guidelines.
 */
export async function generateImage(
  input: ImageGenerationInput
): Promise<ApiResult<ImageGenerationOutput>> {
  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: enhancePrompt(input.prompt, input.style),
        size: input.size || '1024x1024',
        quality: 'standard',
        n: 1,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      return { success: false, error: `DALL-E error: ${error}` }
    }

    const data = await response.json()
    const image = data.data?.[0]

    if (!image?.url) {
      return { success: false, error: 'No image generated' }
    }

    return {
      success: true,
      data: {
        url: image.url,
        revisedPrompt: image.revised_prompt || input.prompt,
      },
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { success: false, error: message }
  }
}

function enhancePrompt(basePrompt: string, style?: string): string {
  const styleGuidelines: Record<string, string> = {
    photographic: 'professional photography, natural lighting, shallow depth of field',
    illustration: 'modern flat illustration, bold colors, clean lines, vector art style',
    minimalist: 'minimalist design, negative space, subtle colors, elegant typography',
    cinematic: 'cinematic composition, dramatic lighting, film grain, 35mm lens',
  }

  const stylePrefix = styleGuidelines[style || 'photographic']

  return `${basePrompt}. ${stylePrefix}. Brand colors: lime green (#9FE870) accents on dark slate (#0F172A) background. Warm, inviting atmosphere. High quality, detailed.`
}
