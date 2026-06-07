'use client'

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
  const caption = `${headline} ${body.slice(0, 80)} ${hashtags.join(' ')}`

  return (
    <div className="mx-auto max-w-[340px]">
      <div className="overflow-hidden rounded-xl bg-black shadow-lg">
        {/* Video area */}
        <div className="relative aspect-[9/16] bg-gray-900">
          {imageUrls.length > 0 ? (
            <img src={imageUrls[0]} alt="video" className="h-full w-full object-cover opacity-80" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-gray-800 to-black">
              <span className="text-sm text-white/40">Vídeo preview</span>
            </div>
          )}

          {/* Overlay UI */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-20">
            <p className="text-sm font-semibold text-white">{username}</p>
            <p className="line-clamp-3 text-xs leading-relaxed text-white/80">{caption}</p>
            <p className="mt-1 text-[10px] text-white/60">♫ som original - {username}</p>
          </div>

          {/* Right sidebar */}
          <div className="absolute right-2 bottom-20 flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-0.5">
              <div className="h-10 w-10 rounded-full border-2 border-white bg-gray-700" />
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xl text-white">♡</span>
              <span className="text-[10px] text-white">12.5K</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xl text-white">💬</span>
              <span className="text-[10px] text-white">892</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-xl text-white">↗</span>
              <span className="text-[10px] text-white">234</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
