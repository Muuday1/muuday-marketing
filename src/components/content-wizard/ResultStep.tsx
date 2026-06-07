'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import {
  PLATFORMS,
  FORMATS,
  PURPOSES,
  type ContentPlatform,
  type ContentFormat,
  type ContentPurpose,
} from '@/content-engine/strategy/content-matrix'
import { InstagramPreview } from './previews/InstagramPreview'
import { LinkedInPreview } from './previews/LinkedInPreview'

interface GeneratedContent {
  headline: string
  body: string
  cta: string
  hashtags: string[]
  altText: string
}

interface ResultStepProps {
  platform: ContentPlatform
  format: ContentFormat
  purpose: ContentPurpose
  content: GeneratedContent
  contentPieceId: string | null
  imageUrls: string[]
  scheduleDate: string
  scheduleTime: string
  onScheduleDateChange: (date: string) => void
  onScheduleTimeChange: (time: string) => void
}

export function ResultStep({
  platform,
  format,
  purpose,
  content,
  contentPieceId,
  imageUrls,
  scheduleDate,
  scheduleTime,
  onScheduleDateChange,
  onScheduleTimeChange,
}: ResultStepProps) {
  const router = useRouter()
  const [scheduling, setScheduling] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [scheduleResult, setScheduleResult] = useState<string | null>(null)
  const [publishResult, setPublishResult] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview')

  async function handleSchedule() {
    if (!scheduleDate || !contentPieceId) return
    setScheduling(true)
    setScheduleResult(null)

    try {
      const scheduledFor = new Date(`${scheduleDate}T${scheduleTime}`).toISOString()
      const res = await fetch('/api/content/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentPieceId,
          platform,
          scheduledFor,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setScheduleResult('Agendado com sucesso!')
      } else {
        setScheduleResult(`Erro: ${data.error}`)
      }
    } catch {
      setScheduleResult('Erro ao agendar')
    } finally {
      setScheduling(false)
    }
  }

  async function handlePublishNow() {
    if (!contentPieceId) return
    setPublishing(true)
    setPublishResult(null)

    try {
      const res = await fetch('/api/content/publish-now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentPieceId,
          platform,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setPublishResult('Publicado com sucesso!')
      } else {
        setPublishResult(`Erro: ${data.error}`)
      }
    } catch {
      setPublishResult('Erro ao publicar')
    } finally {
      setPublishing(false)
    }
  }

  const platformLabel = PLATFORMS[platform]?.label || platform
  const formatLabel = FORMATS[format]?.label || format
  const purposeLabel = PURPOSES[purpose]?.label || purpose

  const renderPlatformPreview = () => {
    if (platform === 'instagram') {
      return (
        <InstagramPreview
          headline={content.headline}
          body={content.body}
          cta={content.cta}
          hashtags={content.hashtags}
          imageUrls={imageUrls}
        />
      )
    }
    if (platform === 'linkedin') {
      return (
        <LinkedInPreview
          headline={content.headline}
          body={content.body}
          cta={content.cta}
          imageUrls={imageUrls}
        />
      )
    }
    return (
      <div className="text-brand-slate rounded-xl border bg-white p-8 text-center">
        <p className="text-sm">Preview não disponível para {platformLabel}</p>
        <p className="mt-1 text-xs">Mas o conteúdo foi gerado com sucesso!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-brand-dark text-xl font-semibold">Conteúdo gerado!</h2>
        <p className="text-brand-slate mt-1 text-sm">
          {platformLabel} • {formatLabel} • {purposeLabel}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            activeTab === 'preview'
              ? 'text-brand-dark bg-white shadow-sm'
              : 'text-brand-slate hover:text-brand-dark'
          }`}
        >
          👀 Preview na plataforma
        </button>
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-all ${
            activeTab === 'edit'
              ? 'text-brand-dark bg-white shadow-sm'
              : 'text-brand-slate hover:text-brand-dark'
          }`}
        >
          ✏️ Editar copy
        </button>
      </div>

      {/* Preview tab */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          {renderPlatformPreview()}

          {/* Images grid */}
          {imageUrls.length > 0 && (
            <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
              <label className="text-brand-slate text-xs tracking-wide uppercase">
                Slides gerados ({imageUrls.length})
              </label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {imageUrls.map((url, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                    <img src={url} alt={`Slide ${i + 1}`} className="h-full w-full object-cover" />
                    <span className="absolute top-1 right-1 rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white">
                      {i + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Edit tab */}
      {activeTab === 'edit' && (
        <div className="space-y-4">
          <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
            <label className="text-brand-slate text-xs tracking-wide uppercase">
              Headline / Hook
            </label>
            <p className="text-brand-dark mt-1 text-lg font-semibold">{content.headline}</p>
          </div>
          <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
            <label className="text-brand-slate text-xs tracking-wide uppercase">Copy</label>
            <div className="text-brand-dark mt-1 text-sm leading-relaxed whitespace-pre-wrap">
              {content.body}
            </div>
          </div>
          <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
            <label className="text-brand-slate text-xs tracking-wide uppercase">CTA</label>
            <p className="text-brand-dark mt-1 font-medium">{content.cta}</p>
          </div>
          <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
            <label className="text-brand-slate text-xs tracking-wide uppercase">Hashtags</label>
            <div className="mt-1 flex flex-wrap gap-2">
              {content.hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-brand-lime/10 text-brand-dark rounded-full px-2.5 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="border-brand-lime/20 bg-brand-lime/5 space-y-4 rounded-xl border-2 p-4">
        {/* Publish Now */}
        <div>
          <h3 className="text-brand-dark font-semibold">🚀 Publicar agora</h3>
          <p className="text-brand-slate mt-1 text-xs">Publica diretamente no {platformLabel}</p>

          {publishResult && (
            <p
              className={`mt-2 text-xs ${publishResult.startsWith('Erro') ? 'text-red-600' : 'text-green-600'}`}
            >
              {publishResult}
            </p>
          )}

          <div className="mt-3 flex gap-2">
            <Button
              onClick={handlePublishNow}
              disabled={!contentPieceId || publishing}
              size="sm"
              className="bg-brand-dark hover:bg-brand-dark/90 text-white"
            >
              {publishing ? 'Publicando...' : 'Publicar agora'}
            </Button>
          </div>
        </div>

        <div className="border-brand-slate/10 border-t" />

        {/* Schedule */}
        <div>
          <h3 className="text-brand-dark font-semibold">📅 Agendar publicação</h3>
          <p className="text-brand-slate mt-1 text-xs">Escolha data e hora para publicar</p>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="text-brand-dark mb-1 block text-xs font-medium">Data</label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => onScheduleDateChange(e.target.value)}
                className="border-brand-slate/20 text-brand-dark w-full rounded-lg border bg-white px-3 py-2 text-sm"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <label className="text-brand-dark mb-1 block text-xs font-medium">Hora</label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => onScheduleTimeChange(e.target.value)}
                className="border-brand-slate/20 text-brand-dark w-full rounded-lg border bg-white px-3 py-2 text-sm"
              />
            </div>
          </div>

          {scheduleResult && (
            <p
              className={`mt-2 text-xs ${scheduleResult.startsWith('Erro') ? 'text-red-600' : 'text-green-600'}`}
            >
              {scheduleResult}
            </p>
          )}

          <div className="mt-3 flex gap-2">
            <Button
              onClick={handleSchedule}
              disabled={!scheduleDate || !contentPieceId || scheduling}
              size="sm"
            >
              {scheduling ? 'Agendando...' : 'Agendar'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/dashboard/content/${contentPieceId}`)}
            >
              Ver detalhes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
