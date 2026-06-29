import { Navigate, Route, Routes } from 'react-router-dom'
import { isSupabaseConfigured } from '@/lib/supabase'
import { Logo } from '@/components/Logo'
import { AdminAuthProvider, RequireAdmin, useAdminAuth } from './AdminAuth'
import { AdminLogin } from './AdminLogin'
import { AdminSetupNeeded } from './AdminShell'

/**
 * Admin panel router. Mounted (lazy) only for /admin/* paths, so the public site
 * never bundles Supabase. The full sidebar shell + dashboard arrive in step 3;
 * for now the protected landing just confirms that auth + logout work.
 */

function AdminLandingPlaceholder() {
  const { profile, user, signOut } = useAdminAuth()
  const name = profile?.full_name || user?.email || 'admin'

  return (
    <div className="grid min-h-screen place-items-center bg-[#f4f4f4] px-6">
      <div className="w-full max-w-md rounded-2xl border border-emerald-deep/10 bg-white p-8 text-center shadow-[0_18px_50px_rgba(1,63,64,0.08)]">
        <Logo className="mx-auto h-7 w-auto" wordmark="#1c1c1c" />
        <span className="mt-5 inline-block font-sans text-xs uppercase tracking-[0.28em] text-emerald">
          Ingelogd
        </span>
        <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-near-black">
          Hallo {name}
        </h1>
        <p className="mt-3 font-sans text-sm leading-relaxed text-near-black/60">
          Je bent ingelogd in het Minterest admin panel. Het werkpaneel met
          zijbalk en dashboard komt in de volgende stap.
        </p>
        <button
          type="button"
          onClick={() => signOut()}
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-deep/15 bg-white px-6 py-3 font-sans text-sm font-semibold text-near-black transition-colors hover:border-emerald/40"
        >
          Uitloggen
        </button>
      </div>
    </div>
  )
}

export default function AdminApp() {
  // Friendly screen instead of a crash when the env vars are not set yet.
  if (!isSupabaseConfigured) return <AdminSetupNeeded />

  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminLandingPlaceholder />} />
        </Route>
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminAuthProvider>
  )
}
