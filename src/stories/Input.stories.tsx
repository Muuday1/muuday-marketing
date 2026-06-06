import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '@/components/ui/Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Digite algo...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    type: 'email',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    type: 'email',
    error: 'Email inválido',
    value: 'invalid-email',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Seu nome',
    disabled: true,
  },
}
