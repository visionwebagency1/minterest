import type { CSSProperties, ReactNode } from 'react'
import type { Business, NavItem, TemplateTheme, Testimonial } from '../types'

/**
 * Building blocks every template shares: the shell that applies a theme, the
 * sticky header, the footer and a few primitives.
 *
 * The theme only carries colour, type and roundness. Layout stays in the
 * template itself, because that is what has to differ: six salon-coloured
 * copies of one page would not be six templates.
 */

/** Turns a theme into CSS custom properties the whole page can use. */
export function themeVars(theme: TemplateTheme): CSSProperties {
  return {
    '--bg': theme.bg,
    '--ink': theme.ink,
    '--muted': theme.muted,
    '--accent': theme.accent,
    '--on-accent': theme.onAccent,
    '--surface': theme.surface,
    '--line': theme.line,
    '--dark': theme.dark,
    '--on-dark': theme.onDark,
    '--radius': theme.radius,
    '--font-heading': theme.headingFont,
    '--font-body': theme.bodyFont,
  } as CSSProperties
}

export function Shell({
  theme,
  children,
}: {
  theme: TemplateTheme
  children: ReactNode
}) {
  return (
    <div
      style={themeVars(theme)}
      className="min-h-screen bg-[var(--bg)] font-[family-name:var(--font-body)] text-[var(--ink)] antialiased"
    >
      {children}
    </div>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>
}

export function Heading({
  children,
  level = 2,
  className = '',
}: {
  children: ReactNode
  level?: 1 | 2 | 3
  className?: string
}) {
  const Tag = (`h${level}` as unknown) as 'h1'
  const size =
    level === 1
      ? 'text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.05]'
      : level === 2
        ? 'text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1]'
        : 'text-xl leading-snug'
  return (
    <Tag className={`font-[family-name:var(--font-heading)] font-semibold tracking-tight ${size} ${className}`}>
      {children}
    </Tag>
  )
}

export function Kicker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)] ${className}`}>
      {children}
    </span>
  )
}

export function Button({
  href,
  children,
  variant = 'solid',
  className = '',
}: {
  href: string
  children: ReactNode
  variant?: 'solid' | 'outline' | 'light'
  className?: string
}) {
  const styles = {
    solid: 'bg-[var(--accent)] text-[var(--on-accent)] hover:opacity-90',
    outline: 'border border-current text-current hover:bg-current/5',
    light: 'bg-white/95 text-[var(--ink)] hover:bg-white',
  }[variant]
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-6 py-3.5 text-sm font-semibold transition ${styles} ${className}`}
    >
      {children}
    </a>
  )
}

/** Sticky header. `tone` decides whether it starts transparent over a photo. */
export function Header({
  business,
  nav,
  tone = 'light',
  cta,
}: {
  business: Business
  nav: NavItem[]
  tone?: 'light' | 'over-image' | 'dark'
  cta?: string
}) {
  const base =
    tone === 'over-image'
      ? 'absolute inset-x-0 top-0 z-30 text-white'
      : tone === 'dark'
        ? 'sticky top-0 z-30 bg-[var(--dark)] text-[var(--on-dark)]'
        : 'sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur'

  return (
    <header className={base}>
      <Container className="flex h-20 items-center justify-between gap-6">
        <a href="#top" className="font-[family-name:var(--font-heading)] text-lg font-semibold tracking-tight">
          {business.name}
        </a>
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="opacity-80 transition hover:opacity-100">
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={`tel:${business.phone.replace(/\s/g, '')}`}
          className={`rounded-[var(--radius)] px-5 py-2.5 text-sm font-semibold transition ${
            tone === 'over-image'
              ? 'bg-white/95 text-[var(--ink)] hover:bg-white'
              : 'bg-[var(--accent)] text-[var(--on-accent)] hover:opacity-90'
          }`}
        >
          {cta ?? business.phone}
        </a>
      </Container>
    </header>
  )
}

export function Quote({ item, className = '' }: { item: Testimonial; className?: string }) {
  return (
    <figure className={className}>
      <blockquote className="font-[family-name:var(--font-heading)] text-[clamp(1.15rem,2vw,1.6rem)] font-medium leading-snug">
        &ldquo;{item.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 text-sm opacity-70">
        <span className="font-semibold opacity-100">{item.name}</span>
        <span className="mx-2 opacity-40">&middot;</span>
        {item.role}
      </figcaption>
    </figure>
  )
}

/** Address, opening hours and contact details. Every template closes with this. */
export function Footer({
  business,
  nav,
  tone = 'dark',
}: {
  business: Business
  nav: NavItem[]
  tone?: 'dark' | 'light'
}) {
  const dark = tone === 'dark'
  const tel = business.phone.replace(/\s/g, '')

  return (
    <footer
      id="contact"
      className={dark ? 'bg-[var(--dark)] text-[var(--on-dark)]' : 'border-t border-[var(--line)] bg-[var(--surface)]'}
    >
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="lg:col-span-1">
          <p className="font-[family-name:var(--font-heading)] text-xl font-semibold">{business.name}</p>
          <p className="mt-2 text-sm opacity-70">{business.claim}</p>
          {business.area && <p className="mt-4 text-sm opacity-60">Werkgebied: {business.area}</p>}
          {business.kvk && <p className="mt-1 text-sm opacity-50">KvK {business.kvk}</p>}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">Adres</p>
          <address className="mt-4 text-sm not-italic leading-relaxed opacity-80">
            {business.street}
            <br />
            {business.postcode} {business.city}
          </address>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">Contact</p>
          <div className="mt-4 flex flex-col gap-2 text-sm opacity-80">
            <a href={`tel:${tel}`} className="transition hover:opacity-100">
              {business.phone}
            </a>
            <a href={`mailto:${business.email}`} className="transition hover:opacity-100">
              {business.email}
            </a>
          </div>
          <nav className="mt-6 flex flex-col gap-2 text-sm opacity-70">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:opacity-100">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-60">Openingstijden</p>
          <dl className="mt-4 flex flex-col gap-2 text-sm opacity-80">
            {business.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4">
                <dt className="opacity-70">{h.days}</dt>
                <dd className="whitespace-nowrap font-medium">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      <div className={`border-t ${dark ? 'border-white/10' : 'border-[var(--line)]'}`}>
        <Container className="flex flex-col gap-2 py-6 text-xs opacity-50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {business.name}
          </span>
          <span>Website door Minterest</span>
        </Container>
      </div>
    </footer>
  )
}
