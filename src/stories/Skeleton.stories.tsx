import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton, CardSkeleton, StatsSkeleton } from '@/components/feedback/Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'h-4 w-48',
  },
}

export const Card: Story = {
  render: () => <CardSkeleton />,
}

export const Stats: Story = {
  render: () => <StatsSkeleton />,
}
