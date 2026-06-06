'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function NewContentPage() {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<
    'carousel' | 'reel' | 'story' | 'blog' | 'podcast' | 'newsletter'
  >('carousel')
  const [platform, setPlatform] = useState<'instagram' | 'linkedin' | 'tiktok' | 'twitter'>(
    'instagram'
  )
  const [pillar, setPillar] = useState('culture')
  const [useAI, setUseAI] = useState(true)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, type, platform, pillar, useAI }),
      })

      const data = await res.json()

      if (data.success) {
        setResult('Conteúdo criado com sucesso!')
        setTimeout(() => router.push('/dashboard/content'), 1500)
      } else {
        setResult(`Erro: ${data.error}`)
      }
    } catch {
      setResult('Erro ao criar conteúdo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-brand-light min-h-screen">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-brand-dark mb-6 text-3xl font-bold">Novo conteúdo</h1>

        <Card>
          <CardHeader>
            <CardTitle>Criar peça de conteúdo</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-brand-dark mb-1 block text-sm font-medium">
                  Título / Tema
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border-brand-slate/20 text-brand-dark focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-lg border bg-white px-4 py-2 focus:ring-2"
                  placeholder="Ex: 5 dicas para brasileiros no UK"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-brand-dark mb-1 block text-sm font-medium">Tipo</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as typeof type)}
                    className="border-brand-slate/20 text-brand-dark w-full rounded-lg border bg-white px-4 py-2"
                  >
                    <option value="carousel">Carousel</option>
                    <option value="reel">Reel</option>
                    <option value="story">Story</option>
                    <option value="blog">Blog</option>
                    <option value="podcast">Podcast</option>
                    <option value="newsletter">Newsletter</option>
                  </select>
                </div>
                <div>
                  <label className="text-brand-dark mb-1 block text-sm font-medium">
                    Plataforma
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as typeof platform)}
                    className="border-brand-slate/20 text-brand-dark w-full rounded-lg border bg-white px-4 py-2"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="tiktok">TikTok</option>
                    <option value="twitter">Twitter/X</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-brand-dark mb-1 block text-sm font-medium">Pilar</label>
                <select
                  value={pillar}
                  onChange={(e) => setPillar(e.target.value)}
                  className="border-brand-slate/20 text-brand-dark w-full rounded-lg border bg-white px-4 py-2"
                >
                  <option value="culture">Cultura & Identidade</option>
                  <option value="career">Carreira</option>
                  <option value="finance">Finanças</option>
                  <option value="immigration">Imigração & Legal</option>
                  <option value="community">Comunidade</option>
                  <option value="lifestyle">Lifestyle</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="useAI"
                  checked={useAI}
                  onChange={(e) => setUseAI(e.target.checked)}
                  className="border-brand-slate/20 rounded"
                />
                <label htmlFor="useAI" className="text-brand-dark text-sm">
                  Usar AI para gerar copy e imagem
                </label>
              </div>

              {result && (
                <p
                  className={`text-sm ${result.startsWith('Erro') ? 'text-red-600' : 'text-green-600'}`}
                >
                  {result}
                </p>
              )}

              <div className="flex gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Criando...' : 'Criar conteúdo'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/dashboard/content')}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
