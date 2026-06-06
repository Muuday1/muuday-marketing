import { env } from '@/config/env'
import { ApiResult } from '@/types'

interface ScriptInput {
  topic: string
  guest?: string
  durationMinutes: number
  style: 'interview' | 'monologue' | 'conversation'
}

interface ScriptOutput {
  title: string
  intro: string
  segments: Array<{
    title: string
    content: string
    durationSeconds: number
  }>
  outro: string
  totalDurationSeconds: number
}

/**
 * Generate podcast script using OpenAI.
 * Scripts are reviewed by human before recording.
 */
export async function generatePodcastScript(
  input: ScriptInput
): Promise<ApiResult<ScriptOutput>> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Você é um roteirista de podcast brasileiro premiado. Cria scripts para "Brasil Global", podcast sobre a vida de brasileiros no exterior.

REGRAS:
- Tom: conversacional, amigável, como bate-papo entre amigos
- Linguagem: português do Brasil, natural, com gírias leves
- Estrutura: hook forte nos primeiros 30 segundos
- Inclua: pausas [PAUSA], risadas [RISADA], ênfases
- Duração: aproximadamente ${input.durationMinutes} minutos
- Estilo: ${input.style}
- Formato de saída: JSON com title, intro, segments (array), outro`,
          },
          {
            role: 'user',
            content: `Tema: ${input.topic}\n${input.guest ? `Convidado: ${input.guest}` : ''}\nEstilo: ${input.style}`,
          },
        ],
        temperature: 0.85,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      return { success: false, error: `OpenAI error: ${error}` }
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''

    const script = parseScript(content, input.durationMinutes)
    return { success: true, data: script }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { success: false, error: message }
  }
}

function parseScript(content: string, durationMinutes: number): ScriptOutput {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
  } catch {
    // fallback
  }

  // Fallback: simple structure
  return {
    title: 'Episódio Brasil Global',
    intro: content.slice(0, 300),
    segments: [
      {
        title: 'Tema principal',
        content: content,
        durationSeconds: durationMinutes * 60,
      },
    ],
    outro: 'Obrigado por ouvir o Brasil Global. Até a próxima!',
    totalDurationSeconds: durationMinutes * 60,
  }
}
