import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">
            Comunidade Brasil Global
          </h1>
          <p className="text-lg text-brand-slate max-w-xl mx-auto">
            Um espaço seguro para brasileiros no exterior trocarem experiências,
            fazerem networking e se apoiarem mutuamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            {
              title: 'Grupo no WhatsApp',
              description: 'Converse em tempo real com outros brasileiros na sua cidade.',
              icon: '💬',
            },
            {
              title: 'Eventos presenciais',
              description: 'Encontros mensais em Londres, Dublin, Lisboa e outras cidades.',
              icon: '🎉',
            },
            {
              title: 'Mentoria gratuita',
              description: 'Conecte-se com brasileiros mais experientes para tirar dúvidas.',
              icon: '🤝',
            },
            {
              title: 'Vagas de emprego',
              description: 'Acesso exclusivo a oportunidades indicadas pela comunidade.',
              icon: '💼',
            },
          ].map((feature) => (
            <Card key={feature.title}>
              <CardContent className="p-6">
                <div className="text-3xl mb-3">{feature.icon}</div>
                <h3 className="font-semibold text-brand-dark mb-1">{feature.title}</h3>
                <p className="text-sm text-brand-slate">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Junte-se à comunidade</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-brand-slate/20 bg-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border border-brand-slate/20 bg-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    Cidade
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-brand-slate/20 bg-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    placeholder="Ex: Londres"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark mb-1">
                    País
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-brand-slate/20 bg-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                    placeholder="Ex: Reino Unido"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">
                  Profissão (opcional)
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-brand-slate/20 bg-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                  placeholder="Ex: Engenheiro de Software"
                />
              </div>
              <Button type="submit" className="w-full">
                Quero fazer parte
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
