import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">
            Newsletter Brasil Global
          </h1>
          <p className="text-lg text-brand-slate max-w-xl mx-auto">
            Receba toda semana as melhores dicas, histórias e oportunidades
            para brasileiros que vivem no exterior.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Inscreva-se gratuitamente</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-brand-slate/20 bg-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                  placeholder="Seu nome"
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
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">
                  País onde mora
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-brand-slate/20 bg-white px-4 py-2 text-brand-dark focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                  placeholder="Ex: Reino Unido"
                />
              </div>
              <Button type="submit" className="w-full">
                Quero receber a newsletter
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { number: '2.500+', label: 'Inscritos' },
            { number: '52', label: 'Edições por ano' },
            { number: '45%', label: 'Taxa de abertura' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4">
              <div className="text-3xl font-bold text-brand-primary">{stat.number}</div>
              <div className="text-sm text-brand-slate">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
