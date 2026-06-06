import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-dark">Dashboard</h1>
            <p className="text-brand-slate mt-1">Visão geral da máquina de conteúdo</p>
          </div>
          <div className="mt-4 sm:mt-0 flex gap-3">
            <Button variant="outline">Exportar relatório</Button>
            <Button>Criar conteúdo</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardDescription>Conteúdo este mês</CardDescription>
              <CardTitle className="text-3xl">24</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="success">+12% vs mês passado</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Engajamento médio</CardDescription>
              <CardTitle className="text-3xl">4.2%</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="success">+0.8% vs mês passado</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Spend Meta Ads</CardDescription>
              <CardTitle className="text-3xl">£1,240</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="warning">82% do orçamento</Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>ROAS</CardDescription>
              <CardTitle className="text-3xl">2.8x</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="success">Meta: 2.5x</Badge>
            </CardContent>
          </Card>
        </div>

        {/* Content Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Pipeline de conteúdo</CardTitle>
              <CardDescription>Status dos próximos conteúdos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: 'Como abrir conta bancária no UK', status: 'approved', platform: 'Blog' },
                  { title: 'Ep. 43: Entrevista com Maria', status: 'review', platform: 'Podcast' },
                  { title: '5 dicas de LinkedIn', status: 'draft', platform: 'Instagram' },
                  { title: 'Imposto de Renda 2026', status: 'scheduled', platform: 'Blog' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between p-3 rounded-lg bg-brand-light"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          item.status === 'approved'
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
                      <span className="text-sm font-medium text-brand-dark">{item.title}</span>
                    </div>
                    <span className="text-xs text-brand-slate">{item.platform}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ações rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Gerar post do Instagram
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Criar episódio de podcast
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Ver relatório Meta Ads
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Agendar conteúdo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
