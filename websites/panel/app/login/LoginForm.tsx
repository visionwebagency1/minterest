'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import { signIn } from './actions'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-emerald px-4 py-3 font-sans text-sm font-semibold text-cream transition hover:bg-emerald-deep disabled:opacity-60"
    >
      {pending ? 'Bezig...' : 'Inloggen'}
    </button>
  )
}

export function LoginForm({ next }: { next: string }) {
  const [error, formAction] = useActionState(signIn, null)

  return (
    <form action={formAction} className="mt-8 grid gap-4">
      <input type="hidden" name="volgende" value={next} />

      <label className="grid gap-1.5 font-sans text-sm">
        <span className="font-medium text-near-black/70">E-mailadres</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="rounded-xl border border-emerald-deep/15 bg-white px-3 py-2.5 outline-none focus:border-emerald"
        />
      </label>

      <label className="grid gap-1.5 font-sans text-sm">
        <span className="font-medium text-near-black/70">Wachtwoord</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="rounded-xl border border-emerald-deep/15 bg-white px-3 py-2.5 outline-none focus:border-emerald"
        />
      </label>

      {error && (
        <p role="alert" className="rounded-xl bg-red-50 px-3 py-2 font-sans text-sm text-red-700">
          {error}
        </p>
      )}

      <SubmitButton />
    </form>
  )
}
