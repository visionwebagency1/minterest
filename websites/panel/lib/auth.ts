import { redirect } from 'next/navigation'
import type { ProfileRole } from '@minterest/websites-shared'

import { createClient } from './supabase/server'

export interface CurrentUser {
  id: string
  email: string | null
  fullName: string | null
  role: ProfileRole
}

/**
 * De ingelogde gebruiker plus zijn rol uit public.profiles.
 *
 * De rol bepaalt alleen welke schermen iemand te zien krijgt. De echte grens ligt
 * in de database: RLS laat een klant uitsluitend de eigen rijen zien, ook als hij
 * de URL van een adminpagina raadt.
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name, email')
    .eq('id', user.id)
    .maybeSingle()

  return {
    id: user.id,
    email: profile?.email ?? user.email ?? null,
    fullName: profile?.full_name ?? null,
    // Geen profiel gevonden betekent: zeker geen admin.
    role: (profile?.role as ProfileRole | undefined) ?? 'klant',
  }
}

export async function requireUser(): Promise<CurrentUser> {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  return user
}

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await requireUser()
  if (user.role !== 'admin') redirect('/klant')
  return user
}

export async function requireCustomer(): Promise<CurrentUser> {
  const user = await requireUser()
  if (user.role === 'admin') redirect('/admin')
  return user
}
