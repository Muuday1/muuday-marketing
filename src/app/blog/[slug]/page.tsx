import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDate } from '@/lib/utils/format'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

// Mock article data — replace with CMS fetch
const articles: Record<string, {
  title: string
  content: string
  category: string
  date: string
  readTime: string
  tags: string[]
  author: string
}> = {
  'como-abrir-conta-bancaria-no-reino-unido': {
    title: 'Como abrir uma conta bancária no Reino Unido',
    category: 'Burocracia',
    date: '2026-06-01',
    readTime: '8 min',
    tags: ['UK', 'Banco', 'Documentos'],
    author: 'Equipe Brasil Global',
    content: `
Abrir uma conta bancária no Reino Unido é um dos primeiros passos essenciais para quem acabou de chegar. Neste guia completo, vamos te mostrar tudo que você precisa saber.

## Documentos necessários

- Passaporte válido
- Comprovante de endereço (bill de luz, contrato de aluguel)
- Carteira de trabalho (BRP ou share code)
- Comprovante de renda (contrato de trabalho ou payslip)

## Melhores bancos para brasileiros

### Monzo
- 100% digital
- Abertura rápida pelo app
- Ótimo para iniciantes

### Starling Bank
- Sem taxas internacionais
- Suporte em inglês
- Conta poupança integrada

### HSBC
- Presença global
- Suporte para transferências internacionais
- Agências físicas

## Dicas importantes

1. **Não aceite o primeiro banco** — compare taxas e benefícios
2. **Verifique taxas de transferência internacional** — alguns cobram caro
3. **Mantenha seu CPF atualizado no Brasil** — para receber remessas

## Passo a passo

1. Baixe o app do banco escolhido
2. Faça o pré-cadastro com seus dados
3. Agende uma videochamada de verificação
4. Envie os documentos solicitados
5. Aguarde aprovação (geralmente 1-3 dias úteis)

## Conclusão

Com um pouco de planejamento, abrir uma conta bancária no UK é simples. O mais importante é ter todos os documentos em dia e escolher um banco que atenda suas necessidades.
    `,
  },
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = articles[slug]

  if (!article) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-dark mb-2">Artigo não encontrado</h1>
          <Button onClick={() => window.location.href = '/blog'}>Voltar ao blog</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-light">
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="default">{article.category}</Badge>
            <span className="text-sm text-brand-slate">{article.readTime}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-brand-slate">
            <span>{article.author}</span>
            <span>•</span>
            <span>{formatDate(article.date)}</span>
          </div>
        </header>

        <Card>
          <CardContent className="p-8">
            <div className="prose prose-slate max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-xl font-bold text-brand-dark mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  )
                }
                if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n')
                  return (
                    <ul key={index} className="list-disc list-inside space-y-1 mb-4">
                      {items.map((item, i) => (
                        <li key={i} className="text-brand-slate">{item.replace(/^[-\d.\s]+/, '')}</li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={index} className="text-brand-slate mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex gap-2 flex-wrap">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </article>
    </div>
  )
}
