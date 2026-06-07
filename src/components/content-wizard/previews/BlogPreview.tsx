'use client'

interface BlogPreviewProps {
  headline: string
  body: string
  imageUrls: string[]
}

export function BlogPreview({ headline, body, imageUrls }: BlogPreviewProps) {
  const excerpt = body.slice(0, 180)

  return (
    <div className="mx-auto max-w-[375px]">
      <div className="border-brand-slate/15 overflow-hidden rounded-xl border bg-white shadow-lg">
        {/* Cover */}
        {imageUrls.length > 0 && (
          <div className="h-48 w-full overflow-hidden">
            <img src={imageUrls[0]} alt="cover" className="h-full w-full object-cover" />
          </div>
        )}

        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="bg-brand-lime text-brand-dark rounded-full px-2 py-0.5 text-[10px] font-semibold">
              Blog
            </span>
            <span className="text-brand-slate text-[11px]">5 min de leitura</span>
          </div>

          <h1 className="text-brand-dark text-lg leading-tight font-bold">{headline}</h1>

          <div className="mt-2 flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-gradient-to-br from-lime-400 to-green-600" />
            <span className="text-brand-slate text-[11px]">Muuday Editorial</span>
            <span className="text-brand-slate text-[11px]">
              · {new Date().toLocaleDateString('pt-BR')}
            </span>
          </div>

          <p className="text-brand-dark mt-3 text-sm leading-relaxed">{excerpt}...</p>

          <button className="bg-brand-dark hover:bg-brand-dark/90 mt-3 rounded-lg px-4 py-2 text-xs font-medium text-white transition-colors">
            Ler completo →
          </button>
        </div>
      </div>
    </div>
  )
}
