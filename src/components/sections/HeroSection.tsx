import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-brand-light py-24 lg:py-32">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-brand-lime/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-lime/20 px-4 py-1.5 mb-8">
            <span className="h-2 w-2 rounded-full bg-brand-lime animate-pulse" />
            <span className="text-sm font-medium text-brand-dark">
              +10.000 brasileiros já fazem parte
            </span>
          </div>

          <h1 className="font-display text-5xl lg:text-6xl text-brand-dark leading-tight mb-6">
            Sua jornada no exterior,
            <br />
            <span className="text-brand-lime bg-brand-dark px-2 rounded-lg">com quem entende</span>
          </h1>

          <p className="text-lg lg:text-xl text-brand-slate mb-10 max-w-2xl mx-auto">
            Guias práticos, podcasts inspiradores e uma comunidade vibrante para
            brasileiros que vivem, trabalham e sonham fora do Brasil.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Explorar conteúdo</Button>
            <Button variant="outline" size="lg">
              Ouvir podcast
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-dark">50+</div>
              <div className="text-sm text-brand-slate mt-1">Países</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-dark">200+</div>
              <div className="text-sm text-brand-slate mt-1">Artigos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-dark">10k+</div>
              <div className="text-sm text-brand-slate mt-1">Membros</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
