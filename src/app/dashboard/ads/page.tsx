import { getSupabaseServer } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const dynamic = 'force-dynamic'

export default async function AdsPage() {
  const supabase = getSupabaseServer()

  const { data: campaigns } = await supabase
    .from('marketing_meta_campaigns')
    .select('*')
    .order('synced_at', { ascending: false })

  const totalSpend = campaigns?.reduce((sum, c) => sum + (c.spend ?? 0), 0) ?? 0
  const totalBudget = campaigns?.reduce((sum, c) => sum + (c.daily_budget ?? 0), 0) ?? 0
  const totalImpressions = campaigns?.reduce((sum, c) => sum + (c.impressions ?? 0), 0) ?? 0
  const totalClicks = campaigns?.reduce((sum, c) => sum + (c.clicks ?? 0), 0) ?? 0
  const avgCTR = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0

  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-brand-dark mb-6 text-3xl font-bold">Meta Ads</h1>

        {/* Summary */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">£{totalSpend.toFixed(0)}</CardTitle>
              <p className="text-brand-slate text-xs">Total gasto</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">£{totalBudget.toFixed(0)}</CardTitle>
              <p className="text-brand-slate text-xs">Orçamento diário</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{totalImpressions.toLocaleString()}</CardTitle>
              <p className="text-brand-slate text-xs">Impressões</p>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{avgCTR.toFixed(2)}%</CardTitle>
              <p className="text-brand-slate text-xs">CTR médio</p>
            </CardHeader>
          </Card>
        </div>

        {/* Campaigns */}
        <div className="space-y-3">
          {campaigns && campaigns.length > 0 ? (
            campaigns.map((c) => (
              <Card key={c.id}>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-brand-dark font-medium">{c.name}</h3>
                    <Badge
                      variant={
                        c.status === 'ACTIVE'
                          ? 'success'
                          : c.status === 'PAUSED'
                            ? 'warning'
                            : 'secondary'
                      }
                    >
                      {c.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                    <div>
                      <p className="text-brand-slate text-xs">Spend</p>
                      <p className="font-medium">£{c.spend?.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-brand-slate text-xs">Budget</p>
                      <p className="font-medium">£{c.daily_budget?.toFixed(2)}/dia</p>
                    </div>
                    <div>
                      <p className="text-brand-slate text-xs">ROAS</p>
                      <p className="font-medium">{c.roas?.toFixed(1)}x</p>
                    </div>
                    <div>
                      <p className="text-brand-slate text-xs">CPC</p>
                      <p className="font-medium">£{c.cpc?.toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-brand-slate">Nenhuma campanha sincronizada.</p>
                <p className="text-brand-slate mt-1 text-xs">
                  Rode `npm run sync-meta-ads` para importar campanhas.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
