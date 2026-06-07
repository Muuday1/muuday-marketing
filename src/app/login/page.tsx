'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    })

    setLoading(false)

    if (result?.error) {
      setError('Senha incorreta')
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="bg-brand-light flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Muuday Marketing</CardTitle>
          <p className="text-brand-slate mt-1 text-sm">Ferramenta interna de marketing</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-brand-dark mb-1 block text-sm font-medium">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-brand-slate/20 text-brand-dark focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-lg border bg-white px-4 py-2 focus:ring-2"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <p className="text-brand-slate mt-4 text-center text-xs">
            Acesso restrito. Ambiente de produção.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
