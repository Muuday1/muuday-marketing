'use client'

interface NewsletterPreviewProps {
  headline: string
  body: string
  imageUrls: string[]
}

export function NewsletterPreview({ headline, body, imageUrls }: NewsletterPreviewProps) {
  const paragraphs = body
    .split('\n')
    .filter((p) => p.trim().length > 0)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-[375px]">
      <div className="border-brand-slate/15 overflow-hidden rounded-xl border bg-white shadow-lg">
        <div className="bg-brand-dark px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-brand-lime text-sm font-bold">Muuday Newsletter</span>
            <span className="text-xs text-white/60">#{new Date().getDate()}</span>
          </div>
        </div>

        <div className="p-4">
          <h1 className="text-brand-dark text-lg font-bold">{headline}</h1>

          {imageUrls.length > 0 && (
            <div className="mt-3 overflow-hidden rounded-lg">
              <img src={imageUrls[0]} alt="newsletter" className="h-auto w-full" />
            </div>
          )}

          <div className="mt-3 space-y-2">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-brand-dark text-sm leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-4 border-t pt-3">
            <p className="text-brand-slate text-[11px]">
              Enviado para <span className="font-medium">2,847</span> ·{' '}
              <span className="font-medium">42% abertura</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
