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
  const [scheduleResult, setScheduleResult] = useState<string | null>(null)

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

  const platformLabel = PLATFORMS[platform].label
  const formatLabel = FORMATS[format].label
  const purposeLabel = PURPOSES[purpose].label

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-brand-dark text-xl font-semibold">Conteúdo gerado!</h2>
        <p className="text-brand-slate mt-1 text-sm">Revise, edite e agende para publicação</p>
      </div>

      {/* Generated content preview */}
      <div className="space-y-4">
        {/* Headline */}
        <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
          <label className="text-brand-slate text-xs tracking-wide uppercase">
            Headline / Hook
          </label>
          <p className="text-brand-dark mt-1 text-lg font-semibold">{content.headline}</p>
        </div>

        {/* Body */}
        <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
          <label className="text-brand-slate text-xs tracking-wide uppercase">Copy</label>
          <div className="text-brand-dark mt-1 text-sm leading-relaxed whitespace-pre-wrap">
            {content.body}
          </div>
        </div>

        {/* CTA */}
        <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
          <label className="text-brand-slate text-xs tracking-wide uppercase">CTA</label>
          <p className="text-brand-dark mt-1 font-medium">{content.cta}</p>
        </div>

        {/* Hashtags */}
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

        {/* Visual preview */}
        {imageUrls.length > 0 && (
          <div className="border-brand-slate/10 rounded-xl border bg-white p-4">
            <label className="text-brand-slate text-xs tracking-wide uppercase">Visual</label>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {imageUrls.map((url, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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

      {/* Scheduling */}
      <div className="border-brand-lime/20 bg-brand-lime/5 rounded-xl border-2 p-4">
        <h3 className="text-brand-dark font-semibold">📅 Agendar publicação</h3>
        <p className="text-brand-slate mt-1 text-xs">
          {platformLabel} • {formatLabel} • {purposeLabel}
        </p>

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
  )
}
