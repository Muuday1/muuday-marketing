'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface PublishButtonProps {
  contentPieceId: string
  status: string
}

export function PublishButton({ contentPieceId, status }: PublishButtonProps) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [published, setPublished] = useState(status === 'published')

  async function handlePublish() {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/content/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentPieceId }),
      })

      const data = await res.json()

      if (data.success) {
        setResult('Publicado com sucesso!')
        setPublished(true)
      } else {
        setResult(`Erro: ${data.error}`)
      }
    } catch {
      setResult('Erro ao publicar')
    } finally {
      setLoading(false)
    }
  }

  if (published) {
    return (
      <Button disabled variant="outline" className="gap-2">
        <span>✓</span> Publicado
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Button onClick={handlePublish} disabled={loading} className="gap-2">
        {loading ? 'Publicando...' : 'Publicar no Instagram'}
      </Button>
      {result && (
        <span
          className={result.startsWith('Erro') ? 'text-sm text-red-600' : 'text-sm text-green-600'}
        >
          {result}
        </span>
      )}
    </div>
  )
}
