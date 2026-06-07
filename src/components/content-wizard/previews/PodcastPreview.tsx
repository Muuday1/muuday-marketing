'use client'

interface PodcastPreviewProps {
  headline: string
  body: string
  imageUrls: string[]
}

export function PodcastPreview({ headline, imageUrls }: PodcastPreviewProps) {
  return (
    <div className="mx-auto max-w-[375px]">
      <div className="border-brand-slate/15 overflow-hidden rounded-xl border bg-white shadow-lg">
        {/* Cover Art */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-900 to-gray-800">
          {imageUrls.length > 0 ? (
            <img src={imageUrls[0]} alt="cover" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-lime-400 to-green-600">
                <span className="text-2xl text-white">🎙️</span>
              </div>
              <p className="text-base font-bold text-white">Muuday Podcast</p>
              <p className="mt-0.5 text-xs text-white/50">Histórias da diáspora</p>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-brand-dark text-base font-bold">{headline}</h3>
          <p className="text-brand-slate mt-0.5 text-xs">
            Muuday · Ep {String(new Date().getDate()).padStart(3, '0')}
          </p>

          {/* Player */}
          <div className="mt-3 flex items-center gap-3">
            <button className="bg-brand-dark flex h-10 w-10 items-center justify-center rounded-full text-lg text-white shadow-md">
              ▶
            </button>
            <div className="flex-1">
              <div className="h-1 w-full rounded-full bg-gray-200">
                <div className="bg-brand-lime h-1 w-1/4 rounded-full" />
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-brand-slate text-[10px]">0:00</span>
                <span className="text-brand-slate text-[10px]">7:42</span>
              </div>
            </div>
          </div>

          {/* Platforms */}
          <div className="mt-3 flex items-center gap-2">
            {['Spotify', 'Apple', 'YouTube'].map((p) => (
              <span
                key={p}
                className="text-brand-slate rounded-full bg-gray-100 px-2 py-0.5 text-[10px]"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
