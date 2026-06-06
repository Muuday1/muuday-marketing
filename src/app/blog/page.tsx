import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils/format'

const articles = [
  {
    id: 1,
    title: 'Como abrir uma conta bancária no Reino Unido',
    excerpt: 'Guia completo com os documentos necessários, melhores bancos e dicas para brasileiros.',
    category: 'Burocracia',
    readTime: '8 min',
    date: '2026-06-01',
    tags: ['UK', 'Banco', 'Documentos'],
  },
  {
    id: 2,
    title: '5 erros que brasileiros cometem no LinkedIn',
    excerpt: 'Aprenda a otimizar seu perfil e se conectar da forma certa com recrutadores.',
    category: 'Carreira',
    readTime: '6 min',
    date: '2026-05-28',
    tags: ['LinkedIn', 'Carreira', 'Dicas'],
  },
  {
    id: 3,
    title: 'Imposto de Renda 2026: o que mudou para quem mora fora',
    excerpt: 'Tudo que você precisa saber sobre declaração de residentes no exterior.',
    category: 'Finanças',
    readTime: '10 min',
    date: '2026-05-25',
    tags: ['Imposto', 'Finanças', 'Burocracia'],
  },
  {
    id: 4,
    title: 'Saudade de casa: como lidar com a distância',
    excerpt: 'Estratégias práticas para manter a saúde mental enquanto vive longe da família.',
    category: 'Bem-estar',
    readTime: '7 min',
    date: '2026-05-20',
    tags: ['Saúde Mental', 'Família', 'Bem-estar'],
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">Blog Brasil Global</h1>
          <p className="text-lg text-brand-slate max-w-xl mx-auto">
            Artigos práticos e histórias reais para brasileiros que vivem no exterior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="default">{article.category}</Badge>
                  <span className="text-xs text-brand-slate">{article.readTime}</span>
                </div>
                <CardTitle className="text-lg">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-brand-slate mb-3">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-xs text-brand-slate">
                    {formatDate(article.date)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
