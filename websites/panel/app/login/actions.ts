'use server'

import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

/**
 * Inloggen met hetzelfde account als het bestaande Minterest-admin: een Supabase
 * Auth-gebruiker. Na het inloggen bepaalt de rol uit profiles waar iemand landt.
 */
export async function signIn(_prev: string | null, formData: FormData): Promise<string | null> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const next = String(formData.get('volgende') ?? '')

  if (!email || !password) return 'Vul je e-mailadres en wachtwoord in.'

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return 'Inloggen is niet gelukt. Controleer je e-mailadres en wachtwoord.'

  redirect(next && next.startsWith('/') ? next : '/')
}
