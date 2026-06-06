import { getSupabaseServer } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const supabase = getSupabaseServer()

  const { data: events } = await supabase
    .from('marketing_analytics_events')
    .select('event_name, event_properties, timestamp')
    .order('timestamp', { ascending: false })
    .limit(50)

  const eventCounts: Record<string, number> = {}
  events?.forEach((e) => {
    eventCounts[e.event_name] = (eventCounts[e.event_name] ?? 0) + 1
  })

  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-brand-dark mb-6 text-3xl font-bold">Analytics</h1>

        {/* Event counts */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Object.entries(eventCounts).map(([name, count]) => (
            <Card key={name}>
              <CardHeader>
                <CardTitle className="text-2xl">{count}</CardTitle>
                <p className="text-brand-slate text-xs capitalize">{name}</p>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Recent events */}
        <h2 className="text-brand-dark mb-3 text-lg font-semibold">Eventos recentes</h2>
        <div className="space-y-2">
          {events && events.length > 0 ? (
            events.map((e, i) => (
              <Card key={i}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{e.event_name}</span>
                    <span className="text-brand-slate text-xs">
                      {new Date(e.timestamp).toLocaleString('pt-BR')}
                    </span>
                  </div>
                  {e.event_properties && Object.keys(e.event_properties).length > 0 && (
                    <pre className="text-brand-slate mt-1 overflow-x-auto text-xs">
                      {JSON.stringify(e.event_properties, null, 2)}
                    </pre>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-brand-slate">Nenhum evento registrado ainda.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
