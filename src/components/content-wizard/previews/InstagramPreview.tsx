'use client'

import { useState, useRef } from 'react'

interface InstagramPreviewProps {
  headline: string
  body: string
  cta: string
  hashtags: string[]
  imageUrls: string[]
  username?: string
  avatarUrl?: string
}

export function InstagramPreview({
  headline,
  body,
  cta,
  hashtags,
  imageUrls,
  username = 'usemuuday',
  avatarUrl,
}: InstagramPreviewProps) {
  const [expanded, setExpanded] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const fullCaption = `${headline}\n\n${body}\n\n${cta}\n\n${hashtags.join(' ')}`
  const hasMultipleImages = imageUrls.length > 1

  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const width = scrollRef.current.offsetWidth
    const index = Math.round(scrollLeft / width)
    setActiveSlide(index)
  }

  return (
    <div className="mx-auto max-w-[375px]">
      <div className="border-brand-slate/20 overflow-hidden rounded-2xl border bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-2.5 px-3 py-2.5">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-lime-400 to-green-500 ring-2 ring-pink-500 ring-offset-1">
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                M
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-brand-dark text-sm font-semibold">{username}</p>
            <p className="text-brand-slate text-[10px]">Lisboa, Portugal</p>
          </div>
          <span className="text-brand-slate text-xl">⋯</span>
        </div>

        {/* Image / Carousel */}
        <div className="relative bg-gray-100">
          {imageUrls.length > 0 ? (
            <>
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="scrollbar-hide flex snap-x snap-mandatory overflow-x-auto"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {imageUrls.map((url, i) => (
                  <div key={i} className="aspect-square w-full shrink-0 snap-center">
                    <img src={url} alt={`slide ${i + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Slide indicators */}
              {hasMultipleImages && (
                <div className="absolute top-2 right-2 flex gap-1">
                  {imageUrls.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeSlide ? 'w-3 bg-white' : 'w-1.5 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Slide counter */}
              {hasMultipleImages && (
                <div className="absolute top-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white">
                  {activeSlide + 1} / {imageUrls.length}
                </div>
              )}
            </>
          ) : (
            <div className="flex aspect-square w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <span className="text-brand-slate text-sm">Sem imagem</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
              />
            </svg>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </div>
          {hasMultipleImages && (
            <div className="flex gap-1">
              {imageUrls.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === activeSlide ? 'bg-blue-500' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          )}
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0111.186 0z"
            />
          </svg>
        </div>

        {/* Likes */}
        <div className="px-3 pb-1">
          <p className="text-brand-dark text-sm font-semibold">1,247 curtidas</p>
        </div>

        {/* Caption - expandível */}
        <div className="px-3 pb-3">
          <p className="text-brand-dark text-sm leading-relaxed">
            <span className="font-semibold">{username}</span>{' '}
            {expanded ? (
              <>
                <span className="whitespace-pre-wrap">{fullCaption}</span>{' '}
                <button onClick={() => setExpanded(false)} className="text-brand-slate">
                  menos
                </button>
              </>
            ) : (
              <>
                <span className="whitespace-pre-wrap">{fullCaption.slice(0, 120)}</span>
                {fullCaption.length > 120 && (
                  <button onClick={() => setExpanded(true)} className="text-brand-slate">
                    ... mais
                  </button>
                )}
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
