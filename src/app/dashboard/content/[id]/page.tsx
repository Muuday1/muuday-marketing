import { getSupabaseServer } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { PublishButton } from '@/components/content/PublishButton'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ContentDetailPage({ params }: PageProps) {
  const { id } = await params
  const supabase = getSupabaseServer()

  const { data: content } = await supabase
    .from('marketing_content_pieces')
    .select('*')
    .eq('id', id)
    .single()

  if (!content) {
    notFound()
  }

  const copy = JSON.parse(content.content || '{}')
  const imageUrls: string[] = content.metadata?.imageUrls || []
  const coverImageUrl: string | undefined = content.metadata?.coverImageUrl
  const theme: string = content.metadata?.theme || 'warm'
  const status = content.status

  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/dashboard/content"
            className="text-brand-slate hover:text-brand-dark text-sm"
          >
            ← Voltar
          </Link>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-brand-dark text-3xl font-bold">{content.title}</h1>
            <p className="text-brand-slate mt-1 text-sm">
              {content.type} • Score: {content.brand_voice_score}/10 • Tema: {theme}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PublishButton contentPieceId={id} status={status} />
            <Badge
              variant={
                status === 'published' || status === 'approved'
                  ? 'success'
                  : status === 'review'
                    ? 'warning'
                    : 'secondary'
              }
              className="capitalize"
            >
              {status}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Carousel Preview */}
          <Card>
            <CardContent className="p-4">
              <h2 className="text-brand-dark mb-4 text-lg font-semibold">Carrossel</h2>
              {coverImageUrl && (
                <div className="mb-4 overflow-hidden rounded-lg border">
                  <p className="text-brand-slate mb-2 text-xs font-medium">Capa gerada por FLUX</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverImageUrl} alt="Capa" className="h-auto w-full" loading="lazy" />
                </div>
              )}
              {imageUrls.length > 0 ? (
                <div className="space-y-4">
                  {imageUrls.map((url, i) => (
                    <div key={i} className="overflow-hidden rounded-lg border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={url}
                        alt={`Slide ${i + 1}`}
                        className="h-auto w-full"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-brand-slate text-sm">Nenhuma imagem gerada.</p>
              )}
            </CardContent>
          </Card>

          {/* Copy Details */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h2 className="text-brand-dark mb-2 text-lg font-semibold">Headline</h2>
                <p className="text-brand-dark text-xl font-medium">{copy.headline}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h2 className="text-brand-dark mb-2 text-lg font-semibold">Body</h2>
                <p className="text-brand-slate whitespace-pre-wrap">{copy.body}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h2 className="text-brand-dark mb-2 text-lg font-semibold">CTA</h2>
                <p className="text-brand-dark font-medium">{copy.cta}</p>
              </CardContent>
            </Card>

            {copy.hashtags && (
              <Card>
                <CardContent className="p-4">
                  <h2 className="text-brand-dark mb-2 text-lg font-semibold">Hashtags</h2>
                  <p className="text-brand-slate">{copy.hashtags.join(' ')}</p>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-4">
                <h2 className="text-brand-dark mb-2 text-lg font-semibold">Metadados</h2>
                <div className="text-brand-slate space-y-1 text-sm">
                  <p>Platform: {content.metadata?.platform}</p>
                  <p>Pillar: {content.metadata?.pillar}</p>
                  <p>Theme: {theme}</p>
                  <p>
                    AI: {content.ai_provider} / {content.ai_model}
                  </p>
                  <p>Criado: {new Date(content.created_at).toLocaleString('pt-BR')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
