'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { submitContactForm } from '@/lead-capture/actions'

export default function ContatoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const result = await submitContactForm(formData)

    if (result.success) {
      setStatus('success')
      setMessage('Mensagem enviada com sucesso! Responderemos em breve.')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } else {
      setStatus('error')
      setMessage(result.error || 'Erro ao enviar mensagem')
    }
  }

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-brand-light">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">Fale com a gente</h1>
          <p className="text-lg text-brand-slate">
            Tem uma dúvida, sugestão ou quer colaborar? Manda uma mensagem!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl mb-2">✉️</div>
              <h3 className="font-semibold text-brand-dark mb-1">Email</h3>
              <p className="text-sm text-brand-slate">contato@brasilglobal.com</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-semibold text-brand-dark mb-1">WhatsApp</h3>
              <p className="text-sm text-brand-slate">+44 20 0000 0000</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl mb-2">📍</div>
              <h3 className="font-semibold text-brand-dark mb-1">Endereço</h3>
              <p className="text-sm text-brand-slate">Londres, Reino Unido</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Envie uma mensagem</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Nome"
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
              <Input
                label="Assunto"
                placeholder="Sobre o que é sua mensagem?"
                value={formData.subject}
                onChange={(e) => updateField('subject', e.target.value)}
                required
              />
              <Textarea
                label="Mensagem"
                placeholder="Escreva sua mensagem aqui..."
                value={formData.message}
                onChange={(e) => updateField('message', e.target.value)}
                required
              />
              <Button type="submit" disabled={status === 'loading'} className="w-full">
                {status === 'loading' ? 'Enviando...' : 'Enviar mensagem'}
              </Button>
              {status === 'success' && (
                <p className="text-sm text-green-600 text-center">{message}</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-600 text-center">{message}</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
