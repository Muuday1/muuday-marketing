'use client'

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
  const fullText = `${headline}\n\n${body}\n\n${cta}`

  return (
    <div className="mx-auto max-w-[550px]">
      <div className="border-brand-slate/20 overflow-hidden rounded-lg border bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-start gap-3 p-4">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-lime-400 to-green-600">
            {avatarUrl ? (
              <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-white">
                M
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-brand-dark text-sm font-semibold">{name}</p>
            <p className="text-brand-slate text-xs">{title}</p>
            <p className="text-brand-slate text-xs">1h • 🌎</p>
          </div>
          <span className="text-brand-slate text-lg">⋯</span>
        </div>

        {/* Text */}
        <div className="px-4 pb-3">
          <p className="text-brand-dark text-sm leading-relaxed whitespace-pre-wrap">
            {fullText.slice(0, 300)}
            {fullText.length > 300 && (
              <span className="text-brand-slate font-medium">... ver mais</span>
            )}
          </p>
        </div>

        {/* Image */}
        {imageUrls.length > 0 && (
          <div className="border-brand-slate/10 border-y">
            <img src={imageUrls[0]} alt="post" className="h-auto w-full object-cover" />
          </div>
        )}

        {/* Engagement */}
        <div className="flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-1">
            <span className="text-sm text-blue-500">👍</span>
            <span className="text-brand-slate text-xs">847</span>
          </div>
          <p className="text-brand-slate text-xs">142 comentários • 38 reposts</p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-4 gap-1 px-2 py-1">
          {['👍 Gostei', '💬 Comentar', '🔄 Repostar', '✉️ Enviar'].map((action) => (
            <button
              key={action}
              className="hover:bg-brand-light text-brand-slate rounded-md py-2 text-xs font-medium transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
