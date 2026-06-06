import { getSupabaseServer } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = getSupabaseServer()

  // Fetch real data from Supabase
  const { count: contentCount } = await supabase
    .from('marketing_content_pieces')
    .select('*', { count: 'exact', head: true })

  const { count: scheduledCount } = await supabase
    .from('marketing_social_posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'scheduled')

  const { count: leadsCount } = await supabase
    .from('marketing_leads')
    .select('*', { count: 'exact', head: true })

  const { count: leadsNewCount } = await supabase
    .from('marketing_leads')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

  const { data: campaigns } = await supabase
    .from('marketing_meta_campaigns')
    .select('spend, roas')
    .eq('status', 'ACTIVE')

  const totalSpend = campaigns?.reduce((sum, c) => sum + (c.spend ?? 0), 0) ?? 0
  const avgRoas = campaigns?.length
    ? campaigns.reduce((sum, c) => sum + (c.roas ?? 0), 0) / campaigns.length
    : 0

  const { data: upcomingPosts } = await supabase
    .from('marketing_social_posts')
    .select('id, platform, scheduled_for, status')
    .eq('status', 'scheduled')
    .order('scheduled_for', { ascending: true })
    .limit(5)

  const { data: recentContent } = await supabase
    .from('marketing_content_pieces')
    .select('id, title, status, type, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-brand-dark text-3xl font-bold">Dashboard</h1>
            <p className="text-brand-slate mt-1">Visão geral da máquina de marketing</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardDescription>Conteúdo total</CardDescription>
              <CardTitle className="text-3xl">{contentCount ?? 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">peças criadas</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Posts agendados</CardDescription>
              <CardTitle className="text-3xl">{scheduledCount ?? 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="info">na fila</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Spend Meta Ads</CardDescription>
              <CardTitle className="text-3xl">£{totalSpend.toFixed(0)}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="warning">campanhas ativas</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>ROAS médio</CardDescription>
              <CardTitle className="text-3xl">{avgRoas.toFixed(1)}x</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="success">{campaigns?.length ?? 0} campanhas</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Content Pipeline */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Pipeline de conteúdo</CardTitle>
              <CardDescription>Últimas peças criadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentContent && recentContent.length > 0 ? (
                  recentContent.map((item) => (
                    <div
                      key={item.id}
                      className="bg-brand-light flex items-center justify-between rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            item.status === 'published'
                              ? 'success'
                              : item.status === 'approved'
                                ? 'success'
                                : item.status === 'review'
                                  ? 'warning'
                                  : item.status === 'scheduled'
                                    ? 'info'
                                    : 'secondary'
                          }
                        >
                          {item.status}
                        </Badge>
                        <span className="text-brand-dark text-sm font-medium">{item.title}</span>
                      </div>
                      <span className="text-brand-slate text-xs capitalize">{item.type}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-brand-slate text-sm">
                    Nenhum conteúdo ainda. Crie o primeiro!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/dashboard/content/new">
                  <button className="border-brand-slate/20 hover:bg-brand-light text-brand-dark w-full rounded-lg border px-4 py-2 text-left text-sm font-medium transition-colors">
                    📝 Criar novo conteúdo
                  </button>
                </Link>
                <Link href="/dashboard/content">
                  <button className="border-brand-slate/20 hover:bg-brand-light text-brand-dark w-full rounded-lg border px-4 py-2 text-left text-sm font-medium transition-colors">
                    📋 Ver todo conteúdo
                  </button>
                </Link>
                <Link href="/dashboard/calendar">
                  <button className="border-brand-slate/20 hover:bg-brand-light text-brand-dark w-full rounded-lg border px-4 py-2 text-left text-sm font-medium transition-colors">
                    📅 Calendário editorial
                  </button>
                </Link>
                <Link href="/dashboard/ads">
                  <button className="border-brand-slate/20 hover:bg-brand-light text-brand-dark w-full rounded-lg border px-4 py-2 text-left text-sm font-medium transition-colors">
                    📊 Meta Ads
                  </button>
                </Link>
                <Link href="/dashboard/leads">
                  <button className="border-brand-slate/20 hover:bg-brand-light text-brand-dark w-full rounded-lg border px-4 py-2 text-left text-sm font-medium transition-colors">
                    👥 Leads ({leadsCount ?? 0})
                  </button>
                </Link>
                <div className="border-brand-slate/10 border-t pt-2">
                  <p className="text-brand-slate mb-2 text-xs">
                    Leads novos (7 dias): {leadsNewCount ?? 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Posts */}
        {upcomingPosts && upcomingPosts.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Próximas publicações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {upcomingPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-brand-light flex items-center justify-between rounded p-2"
                    >
                      <span className="text-sm font-medium capitalize">{post.platform}</span>
                      <span className="text-brand-slate text-xs">
                        {post.scheduled_for
                          ? new Date(post.scheduled_for).toLocaleString('pt-BR')
                          : 'Sem data'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
