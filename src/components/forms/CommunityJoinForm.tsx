'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { joinCommunity } from '@/lead-capture/actions'

export function CommunityJoinForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    country: '',
    profession: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const result = await joinCommunity(formData)

    if (result.success) {
      setStatus('success')
      setMessage('Bem-vindo à comunidade!')
      setFormData({ name: '', email: '', city: '', country: '', profession: '' })
    } else {
      setStatus('error')
      setMessage(result.error || 'Erro ao entrar na comunidade')
    }
  }

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nome completo"
          placeholder="Seu nome"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          required
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Cidade"
          placeholder="Ex: Londres"
          value={formData.city}
          onChange={(e) => updateField('city', e.target.value)}
          required
        />
        <Input
          label="País"
          placeholder="Ex: Reino Unido"
          value={formData.country}
          onChange={(e) => updateField('country', e.target.value)}
          required
        />
      </div>
      <Input
        label="Profissão (opcional)"
        placeholder="Ex: Engenheiro de Software"
        value={formData.profession}
        onChange={(e) => updateField('profession', e.target.value)}
      />
      <Button type="submit" disabled={status === 'loading'} className="w-full">
        {status === 'loading' ? 'Entrando...' : 'Quero fazer parte'}
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
