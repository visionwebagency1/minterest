import { Logo } from '@/components/Logo'

/**
 * Shared admin chrome. For now this holds the small full-screen states (boot and
 * "Supabase not configured"). The sidebar layout + dashboard are added in the
 * next step. The admin look is a clean, light tool UI: off-white background,
 * teal as the accent, mint for highlights. Deliberately not the marketing look.
 */

/** Quiet full-screen loader while the session resolves. */
export function AdminBoot() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f4f4f4]">
      <div className="flex flex-col items-center gap-4">
        <Logo className="h-7 w-auto opacity-90" wordmark="#1c1c1c" />
        <span
          className="h-6 w-6 animate-spin rounded-full border-2 border-emerald/30 border-t-emerald"
          aria-label="Laden"
        />
      </div>
    </div>
  )
}

/** Shown when the Supabase env vars are missing, so the admin never white-screens. */
export function AdminSetupNeeded() {
  return (
    <div className="grid min-h-screen place-items-center bg-[#f4f4f4] px-6">
      <div className="w-full max-w-md rounded-2xl border border-emerald-deep/10 bg-white p-8 text-center shadow-[0_18px_50px_rgba(1,63,64,0.08)]">
        <Logo className="mx-auto h-7 w-auto" wordmark="#1c1c1c" />
        <h1 className="mt-6 font-display text-xl font-semibold text-near-black">
          Admin nog niet geconfigureerd
        </h1>
        <p className="mt-3 font-sans text-sm leading-relaxed text-near-black/60">
          Stel de Supabase-omgevingsvariabelen in (VITE_SUPABASE_URL en
          VITE_SUPABASE_ANON_KEY) en herlaad de pagina. Zie supabase/README.md
          voor de stappen.
        </p>
      </div>
    </div>
  )
}
