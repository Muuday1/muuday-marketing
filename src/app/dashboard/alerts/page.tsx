import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export const dynamic = 'force-dynamic'

interface Alert {
  id: string
  type: 'budget' | 'roas' | 'ctr' | 'frequency'
  severity: 'low' | 'medium' | 'high'
  message: string
  campaign?: string
  createdAt: string
}

// TODO: Fetch from Supabase when alert engine is built
const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'budget',
    severity: 'high',
    message: 'Campanha "Verão Portugal" atingiu 85% do orçamento diário',
    campaign: 'Verão Portugal',
    createdAt: '2026-06-06T10:00:00Z',
  },
  {
    id: '2',
    type: 'roas',
    severity: 'medium',
    message: 'ROAS caiu para 1.2x na campanha "Black Friday UK"',
    campaign: 'Black Friday UK',
    createdAt: '2026-06-06T08:30:00Z',
  },
  {
    id: '3',
    type: 'ctr',
    severity: 'low',
    message: 'CTR abaixo de 1% nas últimas 24h — considere trocar o creative',
    createdAt: '2026-06-05T22:00:00Z',
  },
]

export default function AlertsPage() {
  const highCount = mockAlerts.filter((a) => a.severity === 'high').length
  const mediumCount = mockAlerts.filter((a) => a.severity === 'medium').length

  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-brand-dark mb-6 text-3xl font-bold">Alertas</h1>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{mockAlerts.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">total</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-red-600">{highCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="error">críticos</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-amber-600">{mediumCount}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="warning">atenção</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Alerts list */}
        <div className="space-y-3">
          {mockAlerts.map((alert) => (
            <Card key={alert.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          alert.severity === 'high'
                            ? 'error'
                            : alert.severity === 'medium'
                              ? 'warning'
                              : 'secondary'
                        }
                      >
                        {alert.severity}
                      </Badge>
                      <span className="text-brand-slate text-xs capitalize">{alert.type}</span>
                    </div>
                    <p className="text-brand-dark mt-2 font-medium">{alert.message}</p>
                    {alert.campaign && (
                      <p className="text-brand-slate text-xs">Campanha: {alert.campaign}</p>
                    )}
                  </div>
                  <span className="text-brand-slate text-xs">
                    {new Date(alert.createdAt).toLocaleString('pt-BR')}
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
