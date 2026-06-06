import { getSupabaseServer } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ContentPage() {
  const supabase = getSupabaseServer()

  const { data: content } = await supabase
    .from('marketing_content_pieces')
    .select('id, title, type, status, created_at, brand_voice_score')
    .order('created_at', { ascending: false })

  const statusCounts: Record<string, number> = {}
  content?.forEach((c) => {
    statusCounts[c.status] = (statusCounts[c.status] ?? 0) + 1
  })

  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-brand-dark text-3xl font-bold">Conteúdo</h1>
          <Link href="/dashboard/content/new">
            <button className="bg-brand-primary rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
              + Novo conteúdo
            </button>
          </Link>
        </div>

        {/* Status filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Badge key={status} variant="secondary" className="capitalize">
              {status}: {count}
            </Badge>
          ))}
        </div>

        <div className="space-y-3">
          {content && content.length > 0 ? (
            content.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-brand-dark font-medium">{item.title}</h3>
                      <p className="text-brand-slate mt-1 text-xs">
                        {item.type} • Criado em{' '}
                        {new Date(item.created_at).toLocaleDateString('pt-BR')}
                        {item.brand_voice_score ? ` • Score: ${item.brand_voice_score}/10` : ''}
                      </p>
                    </div>
                    <Badge
                      variant={
                        item.status === 'published' || item.status === 'approved'
                          ? 'success'
                          : item.status === 'review'
                            ? 'warning'
                            : item.status === 'scheduled'
                              ? 'info'
                              : 'secondary'
                      }
                      className="capitalize"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-brand-slate">Nenhum conteúdo ainda.</p>
                <Link
                  href="/dashboard/content/new"
                  className="text-brand-primary mt-2 inline-block text-sm"
                >
                  Criar o primeiro conteúdo →
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
