import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { useAdminAuth } from './AdminAuth'
import { AdminBoot } from './AdminShell'

/**
 * Admin login. Email + password via Supabase Auth, styled in the Minterest house
 * style (teal/mint) but calm and premium, on a light background. Already logged
 * in? Redirect straight to the panel.
 */
export function AdminLogin() {
  const { loading, session, signIn } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  if (loading) return <AdminBoot />
  if (session) return <Navigate to={from} replace />

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setBusy(true)
    const { error } = await signIn(email.trim(), password)
    setBusy(false)
    if (error) {
      setError('Inloggen mislukt. Controleer je e-mail en wachtwoord.')
      return
    }
    navigate(from, { replace: true })
  }

  const field =
    'w-full rounded-xl border border-emerald-deep/15 bg-white px-4 py-3 font-sans text-sm text-near-black outline-none transition-colors placeholder:text-near-black/35 focus:border-emerald'

  return (
    <div
      className="grid min-h-screen place-items-center bg-[#f4f4f4] px-6 py-12"
      style={{
        backgroundImage:
          'radial-gradient(60% 50% at 85% 0%, rgba(66,194,140,0.14), transparent 60%), radial-gradient(50% 45% at 0% 100%, rgba(0,128,129,0.12), transparent 60%)',
      }}
    >
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo className="h-7 w-auto" wordmark="#1c1c1c" />
          <span className="mt-5 font-sans text-xs uppercase tracking-[0.28em] text-emerald">
            Admin panel
          </span>
          <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-near-black">
            Welkom terug
          </h1>
          <p className="mt-2 max-w-xs font-sans text-sm leading-relaxed text-near-black/55">
            Log in om de Minterest-werkomgeving te beheren.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-emerald-deep/10 bg-white p-7 shadow-[0_24px_60px_rgba(1,63,64,0.08)] md:p-8"
        >
          <div className="flex flex-col gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-sm font-semibold text-near-black">E-mail</span>
              <input
                type="email"
                name="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={field}
                placeholder="jij@minterest.nl"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="font-sans text-sm font-semibold text-near-black">Wachtwoord</span>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={field}
                placeholder="Wachtwoord"
              />
            </label>

            {error && (
              <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 font-sans text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-7 py-3.5 font-sans text-sm font-semibold text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              <span className="relative z-10">{busy ? 'Inloggen…' : 'Inloggen'}</span>
              {!busy && (
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                  &rarr;
                </span>
              )}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center font-sans text-xs text-near-black/40">
          Alleen voor het Minterest-team. Toegang nodig? Vraag een beheerder.
        </p>
      </div>
    </div>
  )
}
