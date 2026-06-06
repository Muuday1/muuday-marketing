import { env } from '@/config/env'
import { ApiResult } from '@/types'

interface NewsletterIssue {
  title: string
  subject: string
  intro: string
  sections: Array<{
    heading: string
    content: string
    link?: string
  }>
  cta: string
  footer: string
}

/**
 * Generate a newsletter issue using AI.
 * Newsletter is reviewed by human before sending.
 */
export async function generateNewsletter(
  theme: string,
  contentPieces: Array<{ title: string; url: string; excerpt: string }>
): Promise<ApiResult<NewsletterIssue>> {
  try {
    const apiKey = env.OPENAI_API_KEY
    if (!apiKey) {
      return { success: false, error: 'OPENAI_API_KEY not configured' }
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Você é um editor de newsletter brasileiro. Cria a newsletter semanal "Brasil Global" para brasileiros que moram no exterior.

TOM E ESTILO:
- Saudação calorosa, como um amigo escrevendo
- Linguagem natural, com expressões brasileiras leves
- Seções curtas e diretas
- Links para conteúdos do blog/podcast
- Chamada para ação clara no final

FORMATO DE SAÍDA (JSON):
{
  "title": "Título da newsletter",
  "subject": "Linha de assunto do email",
  "intro": "Parágrafo de introdução (2-3 frases)",
  "sections": [
    { "heading": "Título da seção", "content": "Conteúdo", "link": "URL" }
  ],
  "cta": "Call to action final",
  "footer": "Assinatura e links sociais"
}`,
          },
          {
            role: 'user',
            content: `Tema: ${theme}\n\nConteúdos recentes:\n${contentPieces.map((c) => `- ${c.title}: ${c.excerpt}`).join('\n')}`,
          },
        ],
        temperature: 0.8,
        max_tokens: 2500,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      return { success: false, error: `OpenAI error: ${error}` }
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''

    const issue = parseNewsletter(content)
    return { success: true, data: issue }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return { success: false, error: message }
  }
}

function parseNewsletter(content: string): NewsletterIssue {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
  } catch {
    // fallback
  }

  return {
    title: 'Brasil Global - Semana ' + new Date().toLocaleDateString('pt-BR'),
    subject: 'Novidades da semana para brasileiros no exterior',
    intro: content.slice(0, 200),
    sections: [
      { heading: 'Destaques', content: content },
    ],
    cta: 'Acesse nosso site para mais conteúdo.',
    footer: 'Brasil Global - Comunidade de brasileiros no exterior',
  }
}
