import { describe, it, expect } from 'vitest'
import {
  formatBRL,
  formatGBP,
  formatPercent,
  formatDate,
  formatRelativeTime,
  truncateText,
  slugify,
} from '@/lib/utils/format'

describe('formatBRL', () => {
  it('formats BRL correctly', () => {
    expect(formatBRL(1234.56)).toBe('R$\u00a01.234,56')
  })
})

describe('formatGBP', () => {
  it('formats GBP correctly', () => {
    expect(formatGBP(1234.56)).toBe('£1,234.56')
  })
})

describe('formatPercent', () => {
  it('formats percentage with default decimals', () => {
    expect(formatPercent(0.042)).toBe('4.2%')
  })

  it('formats percentage with custom decimals', () => {
    expect(formatPercent(0.042, 2)).toBe('4.20%')
  })
})

describe('truncateText', () => {
  it('returns original text if within limit', () => {
    expect(truncateText('short', 100)).toBe('short')
  })

  it('truncates text with ellipsis', () => {
    expect(truncateText('this is a long text', 10)).toBe('this is...')
  })
})

describe('slugify', () => {
  it('converts to lowercase and replaces spaces', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('removes accents', () => {
    expect(slugify('São Paulo')).toBe('sao-paulo')
  })

  it('removes special characters', () => {
    expect(slugify('Test @#$%')).toBe('test')
  })
})
