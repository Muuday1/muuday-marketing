import { getSupabaseServer } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const dynamic = 'force-dynamic'

export default async function CampaignsPage() {
  const supabase = getSupabaseServer()

  const { data: campaigns } = await supabase
    .from('marketing_meta_campaigns')
    .select('*')
    .order('synced_at', { ascending: false })

  const activeCount = campaigns?.filter((c) => c.status === 'ACTIVE').length || 0
  const totalSpend = campaigns?.reduce((sum, c) => sum + (c.spend ?? 0), 0) ?? 0

  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-brand-dark mb-6 text-3xl font-bold">Campanhas Meta Ads</h1>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{campaigns?.length ?? 0}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">campanhas totais</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{activeCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="success">ativas</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">${totalSpend.toFixed(2)}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="warning">spend total</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns list */}
        <div className="space-y-3">
          {campaigns && campaigns.length > 0 ? (
            campaigns.map((c) => (
              <Card key={c.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-brand-dark font-medium">{c.name}</h3>
                      <p className="text-brand-slate mt-1 text-xs">
                        {c.objective} • Spend: ${c.spend} • Clicks: {c.clicks} • Impressions:{' '}
                        {c.impressions}
                      </p>
                    </div>
                    <Badge variant={c.status === 'ACTIVE' ? 'success' : 'secondary'}>
                      {c.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-brand-slate">Nenhuma campanha encontrada.</p>
                <p className="text-brand-slate mt-2 text-sm">
                  Rode <code className="rounded bg-gray-100 px-1">npm run meta:sync</code> para
                  sincronizar.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
