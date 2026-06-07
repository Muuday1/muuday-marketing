'use client'

import { useState, useRef } from 'react'

interface LinkedInPreviewProps {
  headline: string
  body: string
  cta: string
  imageUrls: string[]
  name?: string
  title?: string
  avatarUrl?: string
}

export function LinkedInPreview({
  headline,
  body,
  cta,
  imageUrls,
  name = 'Muuday',
  title = 'Comunidade Brasileira Global',
  avatarUrl,
}: LinkedInPreviewProps) {
  const [expanded, setExpanded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const fullText = `${headline}\n\n${body}\n\n${cta}`

  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const width = scrollRef.current.offsetWidth
    const index = Math.round(scrollLeft / width)
    setActiveSlide(index)
  }

  return (
    <div className="mx-auto max-w-[375px]">
      <div className="border-brand-slate/20 overflow-hidden rounded-xl border bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-start gap-2.5 p-3">
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-blue-800">
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                M
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-brand-dark text-sm font-semibold">{name}</p>
            <p className="text-brand-slate text-[11px] leading-tight">{title}</p>
            <p className="text-brand-slate text-[10px]">1h • 🌎</p>
          </div>
          <span className="text-brand-slate text-lg">⋯</span>
        </div>

        {/* Text */}
        <div className="px-3 pb-2">
          <p className="text-brand-dark text-sm leading-relaxed whitespace-pre-wrap">
            {expanded ? (
              <>
                {fullText}{' '}
                <button onClick={() => setExpanded(false)} className="text-brand-slate font-medium">
                  ...ver menos
                </button>
              </>
            ) : (
              <>
                {fullText.slice(0, 200)}
                {fullText.length > 200 && (
                  <button
                    onClick={() => setExpanded(true)}
                    className="text-brand-slate font-medium"
                  >
                    ...ver mais
                  </button>
                )}
              </>
            )}
          </p>
        </div>

        {/* Images - swipeable */}
        {imageUrls.length > 0 && (
          <div className="relative border-y">
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex snap-x snap-mandatory overflow-x-auto"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {imageUrls.map((url, i) => (
                <div key={i} className="aspect-[1200/627] w-full shrink-0 snap-center">
                  <img src={url} alt={`slide ${i + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
            {imageUrls.length > 1 && (
              <div className="absolute top-2 right-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] text-white">
                {activeSlide + 1} / {imageUrls.length}
              </div>
            )}
          </div>
        )}

        {/* Engagement */}
        <div className="flex items-center justify-between border-b px-3 py-2">
          <div className="flex items-center gap-1">
            <span className="text-xs text-blue-500">👍</span>
            <span className="text-brand-slate text-[11px]">847</span>
          </div>
          <p className="text-brand-slate text-[11px]">142 comentários • 38 reposts</p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-1 px-2 py-1">
          {['👍 Gostei', '💬 Comentar', '🔄 Repostar'].map((action) => (
            <button
              key={action}
              className="hover:bg-brand-light text-brand-slate rounded-md py-2 text-[11px] font-medium transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
