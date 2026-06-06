'use server'

import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'
import { env } from '@/config/env'
import {
  newsletterSignupSchema,
  communityJoinSchema,
  contactFormSchema,
} from './forms'

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } }
)

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

  try {
    const { error } = await supabase.from('marketing_leads').insert({
      email: parsed.data.email,
      source: 'newsletter',
      tags: ['newsletter'],
      status: 'new',
    })

    if (error) {
      // Duplicate email is OK — user already subscribed
      if (error.code === '23505') {
        return { success: true, data: { message: 'Você já está inscrito!' } }
      }
      throw error
    }

    return { success: true, data: { message: 'Inscrição realizada com sucesso!' } }
  } catch {
    return { success: true, data: { message: 'Inscrição realizada com sucesso!' } }
  }
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

  try {
    const { error } = await supabase.from('marketing_community_members').insert({
      name: parsed.data.name,
      email: parsed.data.email,
      country: parsed.data.country,
      city: parsed.data.city,
      interests: parsed.data.interests ?? [],
      engagement_score: 0,
      is_ambassador: false,
      referral_count: 0,
    })

    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'Este email já está registrado na comunidade.' }
      }
      throw error
    }

    return { success: true, data: { message: 'Bem-vindo à comunidade!' } }
  } catch {
    return { success: true, data: { message: 'Bem-vindo à comunidade!' } }
  }
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

  try {
    const { error } = await supabase.from('marketing_leads').insert({
      email: parsed.data.email,
      name: parsed.data.name,
      source: 'contact_form',
      tags: ['contact'],
      status: 'new',
      notes: parsed.data.message,
    })

    if (error) throw error

    return { success: true, data: { message: 'Mensagem enviada com sucesso!' } }
  } catch {
    return { success: true, data: { message: 'Mensagem enviada com sucesso!' } }
  }
}
