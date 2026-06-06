import { z } from 'zod'

/**
 * Lead capture form schemas.
 * Used for newsletter signup and community join forms.
 */

export const newsletterSignupSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
  country: z.string().optional(),
  interests: z.array(z.string()).optional(),
})

export const communityJoinSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  country: z.string().min(2, 'País é obrigatório'),
  profession: z.string().optional(),
  interests: z.array(z.string()).optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  subject: z.string().min(5, 'Assunto deve ter pelo menos 5 caracteres'),
  message: z.string().min(20, 'Mensagem deve ter pelo menos 20 caracteres'),
})

export type NewsletterSignupInput = z.infer<typeof newsletterSignupSchema>
export type CommunityJoinInput = z.infer<typeof communityJoinSchema>
export type ContactFormInput = z.infer<typeof contactFormSchema>
