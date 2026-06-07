import { z } from 'zod'

const envSchema = z.object({
  // Next.js
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_VERSION: z.string().default('0.3.0'),

  // AI Providers
  OPENAI_API_KEY: z.string().optional().default(''),
  OPENROUTER_API_KEY: z.string().optional().default(''),
  ANTHROPIC_API_KEY: z.string().optional().default(''),
  DEEPSEEK_API_KEY: z.string().optional().default(''),
  KIMI_API_KEY: z.string().optional().default(''),

  // Image/Video
  FAL_KEY: z.string().optional().default(''),
  REPLICATE_API_TOKEN: z.string().optional().default(''),

  // Voice
  ELEVENLABS_API_KEY: z.string().optional().default(''),

  // Meta
  META_APP_ID: z.string().optional().default(''),
  META_APP_SECRET: z.string().optional().default(''),
  META_ACCESS_TOKEN: z.string().optional().default(''),
  META_VERIFY_TOKEN: z.string().optional().default(''),
  META_AD_ACCOUNT_ID: z.string().optional().default(''),

  // Instagram
  INSTAGRAM_BUSINESS_ACCOUNT_ID: z.string().optional().default(''),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional().default('http://localhost:54321'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional().default(''),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional().default(''),
  SUPABASE_ACCESS_TOKEN: z.string().optional().default(''),
  SUPABASE_DB_DIRECT_URL: z.string().optional().default(''),
  SUPABASE_DB_POOLER_URL: z.string().optional().default(''),

  // Sanity
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional().default(''),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
  SANITY_API_TOKEN: z.string().optional().default(''),

  // Analytics
  NEXT_PUBLIC_MIXPANEL_TOKEN: z.string().optional().default(''),

  // Email
  RESEND_API_KEY: z.string().optional().default(''),

  // Redis
  UPSTASH_REDIS_REST_URL: z.string().url().optional().default('https://dummy.upstash.io'),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional().default('dummy'),

  // Make.com
  MAKE_WEBHOOK_URL: z.string().url().optional().default('http://localhost:3000/webhook'),
  MAKE_WEBHOOK_API_KEY: z.string().optional().default(''),
  MAKE_WEBHOOK_SECRET: z.string().optional().default(''),
  MAKE_API_TOKEN: z.string().optional().default(''),

  // Sentry
  SENTRY_DSN: z.string().optional().default(''),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional().default(''),
  SENTRY_ORG: z.string().optional().default(''),
  SENTRY_PROJECT: z.string().optional().default(''),
  SENTRY_AUTH_TOKEN: z.string().optional().default(''),

  // Internal
  APP_SECRET: z
    .string()
    .min(32, 'APP_SECRET must be at least 32 characters')
    .optional()
    .default('dev-app-secret-32-chars-long-ok-'),

  // Admin auth (local tool — physical security is the boundary)
  ADMIN_PASSWORD: z.string().min(1, 'ADMIN_PASSWORD is required').default('muuday-admin'),
})

export type Env = z.infer<typeof envSchema>

function parseEnv(): Env {
  const result = envSchema.safeParse(process.env)

  if (!result.success) {
    const errors = result.error.errors.map((e) => `${e.path}: ${e.message}`)
    console.error('Invalid environment variables:')
    errors.forEach((e) => console.error(`  - ${e}`))
    throw new Error('Environment validation failed')
  }

  return result.data
}

export const env = parseEnv()
