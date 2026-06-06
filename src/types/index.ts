/**
 * Global TypeScript types
 * Domain-specific types live in their respective modules.
 */

export interface ContentPiece {
  id: string
  type: 'carousel' | 'reel' | 'story' | 'blog' | 'podcast' | 'newsletter'
  status: 'draft' | 'review' | 'approved' | 'scheduled' | 'published' | 'archived'
  title: string
  content: string
  metadata: ContentMetadata
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  authorId: string
  reviewerId?: string
  brandVoiceScore?: number
  culturalCheckPassed?: boolean
}

export interface ContentMetadata {
  platform: Platform
  pillar: ContentPillar
  hashtags: string[]
  mentions: string[]
  scheduledFor?: Date
  mediaUrls: string[]
  caption?: string
  altText?: string
  seoTitle?: string
  seoDescription?: string
  canonicalUrl?: string
}

export type Platform = 'instagram' | 'tiktok' | 'linkedin' | 'twitter' | 'youtube' | 'spotify' | 'apple_podcasts' | 'website'

export type ContentPillar =
  | 'immigration'
  | 'career'
  | 'finance'
  | 'culture'
  | 'community'
  | 'lifestyle'

export interface MetaCampaign {
  id: string
  name: string
  objective: 'AWARENESS' | 'TRAFFIC' | 'ENGAGEMENT' | 'LEADS' | 'SALES'
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED'
  dailyBudget: number
  spend: number
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  cpc: number
  cpm: number
  roas: number
  startDate: Date
  endDate?: Date
}

export interface MetaAdSet {
  id: string
  campaignId: string
  name: string
  targeting: AdTargeting
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED'
}

export interface AdTargeting {
  countries: string[]
  languages: string[]
  ageMin: number
  ageMax: number
  interests: string[]
  customAudiences?: string[]
  lookalikeAudiences?: string[]
}

export interface AnalyticsMetrics {
  date: Date
  platform: Platform
  followers: number
  followersGrowth: number
  impressions: number
  reach: number
  engagement: number
  engagementRate: number
  likes: number
  comments: number
  shares: number
  saves: number
  clicks: number
  profileVisits: number
  websiteClicks: number
}

export interface PodcastEpisode {
  id: string
  title: string
  description: string
  script: string
  audioUrl?: string
  duration: number
  episodeNumber: number
  seasonNumber: number
  guest?: string
  topics: string[]
  status: 'scripting' | 'recording' | 'editing' | 'published'
  publishedAt?: Date
  spotifyUrl?: string
  appleUrl?: string
  downloads?: number
}

export interface CommunityMember {
  id: string
  name: string
  email: string
  country: string
  city: string
  joinDate: Date
  interests: string[]
  engagementScore: number
  isAmbassador: boolean
  referralCount: number
}

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }
