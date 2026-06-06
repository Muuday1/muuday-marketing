import { Button } from '@/components/ui/Button'

export function CommunityCTA() {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-lime rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-blue rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl lg:text-5xl text-white mb-6">
          Junte-se à comunidade
        </h2>
        <p className="text-brand-slate text-lg mb-8 max-w-2xl mx-auto">
          Conecte-se com milhares de brasileiros que entendem exatamente o que você está passando.
          Troque experiências, faça amizades e encontre oportunidades.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-brand-lime text-brand-dark hover:bg-brand-lime/90">
            Entrar na comunidade
          </Button>
          <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
            Saber mais
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">Discord</div>
            <div className="text-sm text-brand-slate">Chat em tempo real</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">WhatsApp</div>
            <div className="text-sm text-brand-slate">Grupos por cidade</div>
          </div>
          <div className="w-px h-12 bg-white/10" />
          <div className="text-center">
            <div className="text-2xl font-bold text-white">Eventos</div>
            <div className="text-sm text-brand-slate">Presencial e online</div>
          </div>
        </div>
      </div>
    </section>
  )
}
