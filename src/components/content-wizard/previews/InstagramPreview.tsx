'use client'

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
  const fullCaption = `${headline}\n\n${body}\n\n${cta}\n\n${hashtags.join(' ')}`

  return (
    <div className="mx-auto max-w-[375px]">
      <div className="border-brand-slate/20 overflow-hidden rounded-2xl border bg-white shadow-lg">
        <div className="flex items-center gap-2.5 px-3 py-2.5">
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-lime-400 to-green-500">
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

        <div className="relative aspect-square bg-gray-100">
          {imageUrls.length > 0 ? (
            <img src={imageUrls[0]} alt="post" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <span className="text-brand-slate text-sm">Sem imagem</span>
            </div>
          )}
          {imageUrls.length > 1 && (
            <div className="absolute top-2 right-2 flex gap-1">
              {imageUrls.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            <span className="text-xl">♡</span>
            <span className="text-xl">💬</span>
            <span className="text-xl">↗</span>
          </div>
          <span className="text-xl">🔖</span>
        </div>

        <div className="px-3 pb-1">
          <p className="text-brand-dark text-sm font-semibold">1,247 curtidas</p>
        </div>

        <div className="px-3 pb-3">
          <p className="text-brand-dark text-sm leading-relaxed">
            <span className="font-semibold">{username}</span>{' '}
            <span className="whitespace-pre-wrap">{fullCaption.slice(0, 180)}</span>
            {fullCaption.length > 180 && <span className="text-brand-slate">... mais</span>}
          </p>
        </div>
      </div>
    </div>
  )
}
