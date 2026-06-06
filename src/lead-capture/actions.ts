'use server'

import { z } from 'zod'
import {
  newsletterSignupSchema,
  communityJoinSchema,
  contactFormSchema,
} from './forms'

interface ActionResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

/**
 * Server action: Newsletter signup.
 */
export async function newsletterSignup(
  input: z.infer<typeof newsletterSignupSchema>
): Promise<ActionResult> {
  const parsed = newsletterSignupSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Dados inválidos' }
  }

  // TODO: Save to Supabase or Make.com
  console.log('[LeadCapture] Newsletter signup received')

  return { success: true, data: { message: 'Inscrição realizada com sucesso!' } }
}

/**
 * Server action: Join community.
 */
export async function joinCommunity(
  input: z.infer<typeof communityJoinSchema>
): Promise<ActionResult> {
  const parsed = communityJoinSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Dados inválidos' }
  }

  // TODO: Save to Supabase and trigger welcome email via Make.com
  console.log('[LeadCapture] Community join received')

  return { success: true, data: { message: 'Bem-vindo à comunidade!' } }
}

/**
 * Server action: Contact form submission.
 */
export async function submitContactForm(
  input: z.infer<typeof contactFormSchema>
): Promise<ActionResult> {
  const parsed = contactFormSchema.safeParse(input)
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message || 'Dados inválidos' }
  }

  // TODO: Send notification via email or Make.com
  console.log('[LeadCapture] Contact form received')

  return { success: true, data: { message: 'Mensagem enviada com sucesso!' } }
}
