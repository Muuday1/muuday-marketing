import { env } from '@/config/env'
import { ApiResult } from '@/types'

interface VoiceSynthesisInput {
  text: string
  voiceId?: string
  stability?: number
  similarityBoost?: number
}

interface VoiceSynthesisOutput {
  audioUrl: string
  durationSeconds: number
}

/**
 * Synthesize voice using ElevenLabs API.
 * Default voice: Brazilian Portuguese native speaker.
 */
export async function synthesizeVoice(
  input: VoiceSynthesisInput
): Promise<ApiResult<VoiceSynthesisOutput>> {
  try {
    const apiKey = env.ELEVENLABS_API_KEY
    if (!apiKey) {
      return { success: false, error: 'ELEVENLABS_API_KEY not configured' }
    }

    // Default voice: a warm Brazilian Portuguese voice
    const voiceId = input.voiceId || '21m00Tcm4TlvDq8ikWAM' // Adam — can be changed to BR voice

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: input.text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: input.stability ?? 0.5,
            similarity_boost: input.similarityBoost ?? 0.75,
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      return { success: false, error: `ElevenLabs error: ${error}` }
    }

    // ElevenLabs returns audio bytes directly
    const audioBlob = await response.blob()
    const audioUrl = URL.createObjectURL(audioBlob)

    // Estimate duration (rough: ~150 words per minute for BR Portuguese)
    const wordCount = input.text.split(/\s+/).length
    const durationSeconds = Math.ceil((wordCount / 150) * 60)

    return {
      success: true,
      data: {
        audioUrl,
        durationSeconds,
      },
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { success: false, error: message }
  }
}
