import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes with conflict resolution.
 * Use this for all className composition.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
