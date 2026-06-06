import { describe, it, expect } from 'vitest'
import { checkBrandVoice } from '@/content-engine/validators/brand-voice-check'

describe('checkBrandVoice', () => {
  it('passes with strong copy', () => {
    const result = checkBrandVoice({
      headline: 'A gente sabe que não é fácil',
      body: 'Você consegue. E a gente te mostra como.',
      cta: 'Junte-se à comunidade hoje',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.passed).toBe(true)
      expect(result.data.score).toBeGreaterThanOrEqual(8)
    }
  })

  it('fails with forbidden words', () => {
    const result = checkBrandVoice({
      headline: 'Imigrante no exterior',
      body: 'É fácil e só precisa fazer isso.',
      cta: 'Clique aqui',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.passed).toBe(false)
      expect(result.data.issues.length).toBeGreaterThan(0)
    }
  })
})
