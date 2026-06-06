import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '@/components/ui/Badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info', 'secondary'],
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Badge',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Aprovado',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Revisão',
  },
}

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'Erro',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Draft',
  },
}
