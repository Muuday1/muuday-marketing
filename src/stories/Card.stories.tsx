import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Título do Card</CardTitle>
        <CardDescription>Uma descrição curta do conteúdo.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-brand-slate">
          Conteúdo do card com informações relevantes.
        </p>
      </CardContent>
    </Card>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Post do Instagram</CardTitle>
          <Badge variant="success">Aprovado</Badge>
        </div>
        <CardDescription>Publicado em 15/05/2026</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">Editar</Button>
          <Button size="sm">Publicar</Button>
        </div>
      </CardContent>
    </Card>
  ),
}

export const StatsCard: Story = {
  render: () => (
    <Card className="w-56">
      <CardHeader>
        <CardDescription>Engajamento</CardDescription>
        <CardTitle className="text-3xl">4.2%</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge variant="success">+0.8% vs mês passado</Badge>
      </CardContent>
    </Card>
  ),
}
