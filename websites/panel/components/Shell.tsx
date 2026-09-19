import Link from 'next/link'

import type { CurrentUser } from '@/lib/auth'

export interface NavItem {
  href: string
  label: string
}

/**
 * Gedeelde schil voor het admin en de klantomgeving: zelfde opbouw, zelfde
 * design-tokens als het bestaande Minterest-admin (licht, teal accent).
 */
export function Shell({
  user,
  nav,
  area,
  children,
}: {
  user: CurrentUser
  nav: NavItem[]
  area: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-emerald-deep/10 bg-white px-5 py-7 md:flex">
        <Link href="/" className="font-display text-lg font-semibold">
          Minterest
        </Link>
        <span className="mt-0.5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
          {area}
        </span>

        <nav className="mt-8 grid gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 font-sans text-sm text-near-black/70 transition hover:bg-emerald/8 hover:text-near-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-emerald-deep/10 pt-4">
          <p className="font-sans text-xs text-near-black/50">{user.email}</p>
          <form action="/auth/uitloggen" method="post">
            <button
              type="submit"
              className="mt-2 font-sans text-xs font-semibold text-emerald hover:underline"
            >
              Uitloggen
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-6 py-8 md:px-10 md:py-10">{children}</main>
    </div>
  )
}

/** Blok voor schermen die in een latere fase worden gebouwd. */
export function Binnenkort({ titel, fase, punten }: { titel: string; fase: string; punten: string[] }) {
  return (
    <section className="rounded-2xl border border-emerald-deep/10 bg-white p-6 shadow-[0_12px_40px_rgba(1,63,64,0.05)]">
      <h2 className="text-lg font-semibold">{titel}</h2>
      <p className="mt-1 font-sans text-sm text-near-black/60">Wordt gebouwd in {fase}.</p>
      <ul className="mt-4 grid gap-1.5 font-sans text-sm text-near-black/70">
        {punten.map((p) => (
          <li key={p} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-mint" />
            {p}
          </li>
        ))}
      </ul>
    </section>
  )
}
