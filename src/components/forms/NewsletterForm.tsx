'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { newsletterSignup } from '@/lead-capture/actions'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const result = await newsletterSignup({ email, name })

    if (result.success) {
      setStatus('success')
      setMessage('Inscrição realizada com sucesso!')
      setEmail('')
      setName('')
    } else {
      setStatus('error')
      setMessage(result.error || 'Erro ao se inscrever')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Nome (opcional)"
        placeholder="Seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Email"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" disabled={status === 'loading'} className="w-full">
        {status === 'loading' ? 'Inscrevendo...' : 'Quero receber a newsletter'}
      </Button>
      {status === 'success' && (
        <p className="text-sm text-green-600 text-center">{message}</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 text-center">{message}</p>
      )}
    </form>
  )
}
