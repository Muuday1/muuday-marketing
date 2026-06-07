import {
  ContentPlatform,
  ContentFormat,
  ContentPurpose,
} from '@/content-engine/strategy/content-matrix'

export type WizardStep = 'platform' | 'format' | 'purpose' | 'review' | 'result'

export interface WizardState {
  step: WizardStep
  platform: ContentPlatform | null
  format: ContentFormat | null
  purpose: ContentPurpose | null
  pillar: string
  topic: string
  tone: 'warm' | 'informative' | 'motivational' | 'fun'
  theme: import('@/content-engine/templates/themes/const').CarouselTheme
  generateCoverImage: boolean
  scheduleDate: string
  scheduleTime: string
  generatedContent: {
    headline: string
    body: string
    cta: string
    hashtags: string[]
    altText: string
  } | null
  contentPieceId: string | null
  imageUrls: string[]
  loading: boolean
  error: string | null
}

export const INITIAL_STATE: WizardState = {
  step: 'platform',
  platform: null,
  format: null,
  purpose: null,
  pillar: 'finance',
  topic: '',
  tone: 'warm',
  theme: 'lime',
  generateCoverImage: false,
  scheduleDate: '',
  scheduleTime: '12:00',
  generatedContent: null,
  contentPieceId: null,
  imageUrls: [],
  loading: false,
  error: null,
}
