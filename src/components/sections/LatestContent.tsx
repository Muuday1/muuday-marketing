import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

const latestPosts = [
  {
    type: 'Artigo',
    pillar: 'Imigração',
    title: 'Como abrir conta bancária no Reino Unido em 2026',
    description: 'Guia completo para brasileiros que chegam ao UK e precisam de conta bancária.',
    date: '2 dias atrás',
    readTime: '8 min',
    image: '/images/blog/banking-uk.jpg',
  },
  {
    type: 'Podcast',
    pillar: 'Carreira',
    title: 'Ep. 42: De estagiário a diretor em 5 anos no exterior',
    description: 'Conversa com Rafael, brasileiro que virou diretor de produto em Londres.',
    date: '3 dias atrás',
    readTime: '35 min',
    image: '/images/podcast/ep42.jpg',
  },
  {
    type: 'Guia',
    pillar: 'Finanças',
    title: 'Imposto de Renda 2026: o que muda para brasileiros no exterior',
    description: 'Tudo sobre tributação, acordos internacionais e como declarar corretamente.',
    date: '5 dias atrás',
    readTime: '12 min',
    image: '/images/blog/taxes-2026.jpg',
  },
]

export function LatestContent() {
  return (
    <section className="py-24 bg-brand-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="font-display text-4xl text-brand-dark mb-2">Últimos conteúdos</h2>
            <p className="text-brand-slate">Feitos com pesquisa, experiência e muito cuidado.</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0">
            Ver todos
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <Card key={post.title} variant="default" className="overflow-hidden">
              <div className="h-48 bg-brand-slate/10 flex items-center justify-center">
                <span className="text-4xl opacity-30">🖼️</span>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{post.type}</Badge>
                  <Badge variant="outline">{post.pillar}</Badge>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-2">{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-xs text-brand-slate">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime} de leitura</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
