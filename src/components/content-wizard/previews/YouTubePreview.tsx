'use client'

interface YouTubePreviewProps {
  headline: string
  body: string
  imageUrls: string[]
}

export function YouTubePreview({ headline, body, imageUrls }: YouTubePreviewProps) {
  return (
    <div className="mx-auto max-w-[375px]">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-900 shadow-lg">
        {imageUrls.length > 0 ? (
          <img src={imageUrls[0]} alt="thumbnail" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <span className="text-sm text-white/40">Thumbnail</span>
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-red-600/90 shadow-lg">
            <span className="text-xl text-white">▶</span>
          </div>
        </div>
        <div className="absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
          5:42
        </div>
      </div>

      {/* Info */}
      <div className="mt-2 flex gap-2 px-1">
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-red-600">
          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
            M
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-brand-dark line-clamp-2 text-sm leading-snug font-semibold">
            {headline}
          </h3>
          <p className="text-brand-slate mt-0.5 text-[11px]">
            Muuday · 5K views · {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mx-1 mt-2 rounded-lg bg-gray-50 p-3">
        <p className="text-brand-dark text-xs leading-relaxed whitespace-pre-wrap">
          {body.slice(0, 120)}...
        </p>
      </div>
    </div>
  )
}
