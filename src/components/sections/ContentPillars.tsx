import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

const pillars = [
  {
    icon: '🛂',
    title: 'Imigração & Legal',
    description: 'Visas, cidadania, documentos e direitos do imigrante. Tudo que você precisa saber para estar legal.',
    color: 'bg-accent-blue/10 text-accent-blue',
  },
  {
    icon: '💼',
    title: 'Carreira',
    description: 'Job search, networking, LinkedIn e reconhecimento de diploma. Conquiste sua carreira no exterior.',
    color: 'bg-accent-purple/10 text-accent-purple',
  },
  {
    icon: '💰',
    title: 'Finanças',
    description: 'Banking, impostos, investimentos e remessas. Controle seu dinheiro em qualquer moeda.',
    color: 'bg-success/10 text-success',
  },
  {
    icon: '🏠',
    title: 'Cultura & Identidade',
    description: 'Saudade, comida, tradições e a experiência de ser brasileiro no mundo.',
    color: 'bg-accent-orange/10 text-accent-orange',
  },
  {
    icon: '🤝',
    title: 'Comunidade',
    description: 'Eventos, conexões, saúde mental e apoio mútuo. Você nunca está sozinho.',
    color: 'bg-accent-rose/10 text-accent-rose',
  },
  {
    icon: '✈️',
    title: 'Lifestyle',
    description: 'Viagens, gastronomia, bem-estar e relacionamentos. Viva bem onde estiver.',
    color: 'bg-warning/10 text-warning',
  },
]

export function ContentPillars() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-display text-4xl text-brand-dark mb-4">
            Conteúdo que faz a diferença
          </h2>
          <p className="text-brand-slate text-lg">
            Seis pilares que cobrem todos os aspectos da vida de um brasileiro no exterior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <Card key={pillar.title} variant="bordered" className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${pillar.color} flex items-center justify-center text-2xl mb-4`}>
                  {pillar.icon}
                </div>
                <CardTitle>{pillar.title}</CardTitle>
                <CardDescription>{pillar.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href="#"
                  className="text-sm font-medium text-brand-dark hover:text-brand-lime transition-colors inline-flex items-center gap-1"
                >
                  Ver conteúdo
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
