'use client'

import { useState } from 'react'

interface YouTubePreviewProps {
  headline: string
  body: string
  imageUrls: string[]
}

export function YouTubePreview({ headline, body, imageUrls }: YouTubePreviewProps) {
  const [playing, setPlaying] = useState(false)

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
        {!playing && (
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center bg-black/10"
          >
            <div className="flex h-14 w-20 items-center justify-center rounded-xl bg-red-600/90 shadow-lg transition-transform hover:scale-105">
              <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
        {playing && (
          <div className="absolute right-0 bottom-0 left-0 h-1 bg-white/20">
            <div className="h-full w-1/3 animate-pulse bg-red-600" />
          </div>
        )}
        <div className="absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white">
          5:42
        </div>
      </div>

      {/* Info */}
      <div className="mt-2 flex gap-2 px-1">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-red-600">
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
        <svg
          className="text-brand-slate mt-1 h-5 w-5 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
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
