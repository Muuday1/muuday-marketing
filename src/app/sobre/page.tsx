import { Card, CardContent } from '@/components/ui/Card'

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-brand-light">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">Sobre o Brasil Global</h1>
          <p className="text-lg text-brand-slate">
            Conectando brasileiros pelo mundo com conteúdo de qualidade e uma comunidade acolhedora.
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">Nossa missão</h2>
              <p className="text-brand-slate leading-relaxed">
                O Brasil Global nasceu da vontade de ajudar brasileiros que decidiram construir
                uma vida fora do país. Sabemos que essa jornada é cheia de desafios — burocracia,
                saudade, adaptação cultural — e queremos ser o apoio que a gente gostaria de ter
                tido quando chegou.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">O que fazemos</h2>
              <ul className="space-y-3 text-brand-slate">
                <li className="flex items-start gap-3">
                  <span className="text-brand-primary mt-1">✦</span>
                  <span>
                    <strong>Conteúdo prático:</strong> Guias, dicas e histórias reais sobre vida no
                    exterior.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-primary mt-1">✦</span>
                  <span>
                    <strong>Comunidade:</strong> Grupos, eventos e networking para brasileiros pelo
                    mundo.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-primary mt-1">✦</span>
                  <span>
                    <strong>Podcast:</strong> Entrevistas e conversas sobre os desafios e
                    conquistas da vida fora.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-brand-primary mt-1">✦</span>
                  <span>
                    <strong>Newsletter:</strong> Resumo semanal com as melhores oportunidades e
                    novidades.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-brand-dark mb-4">Nossa equipe</h2>
              <p className="text-brand-slate leading-relaxed">
                Somos um time de brasileiros espalhados pelo mundo — Londres, Dublin, Lisboa,
                Sydney — unidos pela vontade de ajudar outros brasileiros a prosperarem no
                exterior. Cada artigo, episódio e evento é feito com carinho e experiência real.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
