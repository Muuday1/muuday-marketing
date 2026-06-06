import { getSupabaseServer } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const dynamic = 'force-dynamic'

export default async function LeadsPage() {
  const supabase = getSupabaseServer()

  const { data: leads } = await supabase
    .from('marketing_leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  const statusCounts: Record<string, number> = {}
  leads?.forEach((l) => {
    statusCounts[l.status] = (statusCounts[l.status] ?? 0) + 1
  })

  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-brand-dark mb-6 text-3xl font-bold">Leads</h1>

        {/* Status summary */}
        <div className="mb-6 flex flex-wrap gap-2">
          {Object.entries(statusCounts).map(([status, count]) => (
            <Badge key={status} variant="secondary" className="capitalize">
              {status}: {count}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          {leads && leads.length > 0 ? (
            leads.map((lead) => (
              <Card key={lead.id}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-brand-dark text-sm font-medium">
                        {lead.name || lead.email}
                      </p>
                      <p className="text-brand-slate text-xs">
                        {lead.email} • {lead.country || 'N/A'} • {lead.source}
                      </p>
                      {lead.notes && (
                        <p className="text-brand-slate mt-1 text-xs italic">{lead.notes}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="text-xs capitalize">
                        {lead.status}
                      </Badge>
                      <p className="text-brand-slate mt-1 text-xs">
                        {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-brand-slate">Nenhum lead ainda.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
