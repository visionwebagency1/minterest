import { isSupabaseConfigured } from '@/lib/env'

import { LoginForm } from './LoginForm'

export const dynamic = 'force-dynamic'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ volgende?: string }>
}) {
  const { volgende } = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-emerald">
          Minterest
        </span>
        <h1 className="mt-2 text-2xl font-semibold">Panel</h1>
        <p className="mt-2 text-sm text-near-black/60">
          Log in met je Minterest-account. Klanten komen automatisch in hun eigen omgeving.
        </p>

        {isSupabaseConfigured ? (
          <LoginForm next={volgende ?? ''} />
        ) : (
          <p className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            Supabase is nog niet ingesteld. Zet NEXT_PUBLIC_SUPABASE_URL en
            NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local (zie .env.example).
          </p>
        )}
      </div>
    </main>
  )
}
