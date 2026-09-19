'use client'

import { createBrowserClient } from '@supabase/ssr'

import { requireSupabaseEnv } from '../env'

/** Supabase-client voor client components (inloggen, uitloggen, realtime). */
export function createClient() {
  const { url, anonKey } = requireSupabaseEnv()
  return createBrowserClient(url, anonKey)
}
