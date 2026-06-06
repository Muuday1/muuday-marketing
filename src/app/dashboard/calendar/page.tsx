import { getSupabaseServer } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const dynamic = 'force-dynamic'

export default async function CalendarPage() {
  const supabase = getSupabaseServer()

  const { data: posts } = await supabase
    .from('marketing_social_posts')
    .select('id, platform, scheduled_for, status, content_piece_id')
    .order('scheduled_for', { ascending: true })

  // Group by month/week for display
  const grouped: Record<string, typeof posts> = {}
  posts?.forEach((post) => {
    const date = post.scheduled_for
      ? new Date(post.scheduled_for).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
      : 'Sem data'
    if (!grouped[date]) grouped[date] = []
    grouped[date].push(post)
  })

  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-brand-dark mb-6 text-3xl font-bold">Calendário Editorial</h1>

        {Object.keys(grouped).length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-brand-slate">Nenhum post agendado.</p>
            </CardContent>
          </Card>
        ) : (
          Object.entries(grouped).map(([month, monthPosts]) => (
            <div key={month} className="mb-8">
              <h2 className="text-brand-dark mb-3 text-lg font-semibold capitalize">{month}</h2>
              <div className="space-y-2">
                {monthPosts?.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={post.status === 'published' ? 'success' : 'info'}
                          className="capitalize"
                        >
                          {post.status}
                        </Badge>
                        <span className="text-sm font-medium capitalize">{post.platform}</span>
                      </div>
                      <span className="text-brand-slate text-xs">
                        {post.scheduled_for
                          ? new Date(post.scheduled_for).toLocaleString('pt-BR')
                          : 'Sem data'}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
