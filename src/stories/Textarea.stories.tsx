import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from '@/components/ui/Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Digite sua mensagem...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Mensagem',
    placeholder: 'Escreva algo...',
  },
}

export const WithError: Story = {
  args: {
    label: 'Descrição',
    placeholder: 'Descreva o conteúdo...',
    error: 'Descrição muito curta',
  },
}
