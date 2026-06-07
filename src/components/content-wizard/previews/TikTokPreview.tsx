'use client'

import { useState } from 'react'

interface TikTokPreviewProps {
  headline: string
  body: string
  hashtags: string[]
  imageUrls: string[]
  username?: string
}

export function TikTokPreview({
  headline,
  body,
  hashtags,
  imageUrls,
  username = 'usemuuday',
}: TikTokPreviewProps) {
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)

  const caption = `${headline} ${body} ${hashtags.join(' ')}`

  return (
    <div className="mx-auto max-w-[340px]">
      <div className="relative overflow-hidden rounded-xl bg-black shadow-lg">
        {/* Video area */}
        <div className="relative aspect-[9/16] bg-gray-900">
          {imageUrls.length > 0 ? (
            <img src={imageUrls[0]} alt="video" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-purple-900 to-black">
              <span className="text-sm text-white/40">Vídeo</span>
            </div>
          )}

          {/* Play overlay */}
          {!playing && (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/20"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <svg className="ml-1 h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}

          {/* Progress bar when playing */}
          {playing && (
            <div className="absolute right-0 bottom-0 left-0 h-1 bg-white/20">
              <div className="h-full w-1/3 animate-pulse bg-white" />
            </div>
          )}

          {/* Caption overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-20">
            <p className="mb-1 text-sm font-semibold text-white">{username}</p>
            <p className="text-xs leading-relaxed text-white/80">
              {expanded ? (
                <>
                  {caption}{' '}
                  <button onClick={() => setExpanded(false)} className="text-white/60">
                    menos
                  </button>
                </>
              ) : (
                <>
                  {caption.slice(0, 80)}
                  {caption.length > 80 && (
                    <button onClick={() => setExpanded(true)} className="text-white/60">
                      ... mais
                    </button>
                  )}
                </>
              )}
            </p>
            <p className="mt-1 text-[10px] text-white/50">♫ som original - {username}</p>
          </div>

          {/* Right sidebar */}
          <div className="absolute right-2 bottom-20 flex flex-col items-center gap-4">
            <div className="h-10 w-10 rounded-full border border-white bg-gray-700 p-0.5">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-lime-400 to-green-600" />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <svg className="h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-[10px] text-white">12.5K</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-[10px] text-white">892</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <svg
                className="h-7 w-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span className="text-[10px] text-white">234</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
