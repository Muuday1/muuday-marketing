'use client'

interface TwitterPreviewProps {
  headline: string
  body: string
  imageUrls: string[]
  name?: string
  handle?: string
}

export function TwitterPreview({
  headline,
  body,
  imageUrls,
  name = 'Muuday',
  handle = '@usemuuday',
}: TwitterPreviewProps) {
  const fullText = `${headline}\n\n${body}`

  return (
    <div className="mx-auto max-w-[375px]">
      <div className="border-brand-slate/15 overflow-hidden rounded-xl border bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-start gap-2.5 p-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-black">
            <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
              M
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <p className="text-brand-dark text-sm font-bold">{name}</p>
              <span className="text-brand-slate text-xs">{handle}</span>
              <span className="text-brand-slate text-xs">· 1h</span>
            </div>
            <p className="text-brand-dark mt-1 text-[15px] leading-relaxed whitespace-pre-wrap">
              {fullText.slice(0, 280)}
              {fullText.length > 280 && <span className="text-brand-slate">...</span>}
            </p>
          </div>
        </div>

        {/* Images */}
        {imageUrls.length > 0 && (
          <div className="mx-3 mb-2 overflow-hidden rounded-xl">
            <img src={imageUrls[0]} alt="media" className="h-auto w-full" />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between border-t px-3 py-2">
          <span className="text-brand-slate flex items-center gap-1 text-xs">
            💬 <span>42</span>
          </span>
          <span className="text-brand-slate flex items-center gap-1 text-xs">
            🔄 <span>18</span>
          </span>
          <span className="text-brand-slate flex items-center gap-1 text-xs">
            ♡ <span>312</span>
          </span>
          <span className="text-brand-slate flex items-center gap-1 text-xs">
            📊 <span>4.2K</span>
          </span>
        </div>
      </div>
    </div>
  )
}
