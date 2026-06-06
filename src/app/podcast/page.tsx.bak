import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export default function PodcastPage() {
  const episodes = [
    {
      id: 1,
      title: 'Ep. 42: Como conseguir o visto de trabalho no UK',
      duration: '32 min',
      date: '15 Mai 2026',
      tags: ['Burocracia', 'UK'],
    },
    {
      id: 2,
      title: 'Ep. 41: Entrevista com Carlos — De São Paulo a Dublin',
      duration: '45 min',
      date: '08 Mai 2026',
      tags: ['História', 'Irlanda'],
    },
    {
      id: 3,
      title: 'Ep. 40: Dicas de LinkedIn para quem está começando',
      duration: '28 min',
      date: '01 Mai 2026',
      tags: ['Carreira', 'Dicas'],
    },
  ]

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">
            Brasil Global Podcast
          </h1>
          <p className="text-lg text-brand-slate max-w-xl mx-auto">
            Histórias reais de brasileiros que vivem pelo mundo. Dicas práticas,
            entrevistas inspiradoras e muito bate-papo.
          </p>
        </div>

        <div className="mb-12">
          <Card className="bg-brand-primary/5 border-brand-primary/20">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-xl bg-brand-primary flex items-center justify-center text-white text-4xl">
                  🎙️
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-brand-dark mb-2">
                    Ouça onde quiser
                  </h2>
                  <p className="text-brand-slate mb-4">
                    Disponível no Spotify, Apple Podcasts, YouTube e todas as plataformas.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <Button size="sm" variant="outline">Spotify</Button>
                    <Button size="sm" variant="outline">Apple</Button>
                    <Button size="sm" variant="outline">YouTube</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold text-brand-dark mb-6">Episódios recentes</h2>
        <div className="space-y-4">
          {episodes.map((ep) => (
            <Card key={ep.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-brand-dark mb-1">{ep.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-brand-slate">
                      <span>{ep.duration}</span>
                      <span>•</span>
                      <span>{ep.date}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {ep.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    ▶ Ouvir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
