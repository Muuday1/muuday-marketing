import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Report {
  id: string
  name: string
  type: 'weekly' | 'monthly' | 'campaign' | 'custom'
  status: 'ready' | 'generating' | 'scheduled'
  createdAt: string
  downloadUrl?: string
}

// TODO: Fetch from Supabase when report engine is built
const mockReports: Report[] = [
  {
    id: '1',
    name: 'Relatório Semanal — Semana 23',
    type: 'weekly',
    status: 'ready',
    createdAt: '2026-06-06T12:00:00Z',
    downloadUrl: '#',
  },
  {
    id: '2',
    name: 'Performance Meta Ads — Maio 2026',
    type: 'monthly',
    status: 'ready',
    createdAt: '2026-06-01T10:00:00Z',
    downloadUrl: '#',
  },
  {
    id: '3',
    name: 'Análise de Campanha "Verão Portugal"',
    type: 'campaign',
    status: 'generating',
    createdAt: '2026-06-06T14:00:00Z',
  },
]

export default function ReportsPage() {
  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-brand-dark text-3xl font-bold">Relatórios</h1>
          <button className="bg-brand-primary rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
            + Gerar relatório
          </button>
        </div>

        {/* Reports list */}
        <div className="space-y-3">
          {mockReports.map((report) => (
            <Card key={report.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {report.type}
                      </Badge>
                      <Badge
                        variant={
                          report.status === 'ready'
                            ? 'success'
                            : report.status === 'generating'
                              ? 'warning'
                              : 'info'
                        }
                      >
                        {report.status}
                      </Badge>
                    </div>
                    <h3 className="text-brand-dark mt-1 font-medium">{report.name}</h3>
                    <p className="text-brand-slate text-xs">
                      Criado em {new Date(report.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  {report.status === 'ready' && report.downloadUrl && (
                    <Link
                      href={report.downloadUrl}
                      className="text-brand-primary text-sm font-medium hover:underline"
                    >
                      Download →
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Placeholder for future automation */}
        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-brand-dark mb-2 font-semibold">Automação de Relatórios</h3>
            <p className="text-brand-slate text-sm">
              Em breve: relatórios automáticos toda segunda-feira com métricas de todas as
              plataformas, enviados por email.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
