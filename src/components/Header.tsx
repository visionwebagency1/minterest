import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { BorderBeam } from './BorderBeam'
import { Logo } from './Logo'
import { SERVICE_ICON_BY_SLUG } from './serviceIcons'
import { MAIN_SERVICES } from '@/data/services'

/**
 * Floating glass header + a slide-down navigation panel:
 *   Home · Onze diensten · Onze projecten · Over ons · Contact, with a CTA and
 *   social links at the bottom. No services dropdown: "Onze diensten" links
 *   straight to the diensten-overzicht (/diensten).
 */

const EASE = [0.22, 1, 0.36, 1] as const

const PRIMARY = [
  { no: '01', label: 'Home', to: '/' },
  { no: '02', label: 'Onze diensten', to: '/diensten' },
  { no: '03', label: 'Onze projecten', to: '/work' },
  { no: '04', label: 'Over ons', to: '/about' },
  { no: '05', label: 'Contact', to: '/contact' },
]

/* ---- social icons ---- */
const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    path: 'M12 2.2c-2.7 0-3 0-4.1.1-1 0-1.8.2-2.4.5-.7.3-1.2.6-1.8 1.2S2.8 5.2 2.5 5.9c-.3.6-.4 1.4-.5 2.4C1.9 9.4 1.9 9.7 1.9 12s0 2.6.1 3.7c0 1 .2 1.8.5 2.4.3.7.6 1.2 1.2 1.8s1.1.9 1.8 1.2c.6.3 1.4.4 2.4.5 1.1.1 1.4.1 4.1.1s3 0 4.1-.1c1 0 1.8-.2 2.4-.5.7-.3 1.2-.6 1.8-1.2s.9-1.1 1.2-1.8c.3-.6.4-1.4.5-2.4.1-1.1.1-1.4.1-3.7s0-2.6-.1-3.7c0-1-.2-1.8-.5-2.4-.3-.7-.6-1.2-1.2-1.8s-1.1-.9-1.8-1.2c-.6-.3-1.4-.4-2.4-.5C15 2.2 14.7 2.2 12 2.2Zm0 1.8c2.7 0 3 0 4 .1.9 0 1.4.2 1.8.3.4.2.8.4 1.1.7.3.3.5.7.7 1.1.1.4.3.9.3 1.8.1 1 .1 1.3.1 4s0 3-.1 4c0 .9-.2 1.4-.3 1.8-.2.4-.4.8-.7 1.1-.3.3-.7.5-1.1.7-.4.1-.9.3-1.8.3-1 .1-1.3.1-4 .1s-3 0-4-.1c-.9 0-1.4-.2-1.8-.3-.4-.2-.8-.4-1.1-.7-.3-.3-.5-.7-.7-1.1-.1-.4-.3-.9-.3-1.8-.1-1-.1-1.3-.1-4s0-3 .1-4c0-.9.2-1.4.3-1.8.2-.4.4-.8.7-1.1.3-.3.7-.5 1.1-.7.4-.1.9-.3 1.8-.3 1-.1 1.3-.1 4-.1Zm0 3.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8Zm0 8.1a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm6.2-8.3a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com',
    path: 'M16.5 2.5c.3 2 1.5 3.6 3.5 4v2.6c-1.3 0-2.5-.4-3.5-1v6.3a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v2.7a3 3 0 1 0 2.1 2.9V2.5h2.7Z',
  },
  {
    label: 'Snapchat',
    href: 'https://snapchat.com',
    path: 'M12 2.6c2.3 0 4 1.7 4.1 4 0 .6 0 1.3-.1 1.9.3.2.7.2 1.1 0 .2-.1.9-.3 1.2.2.2.4 0 .9-.6 1.1-.2.1-1.3.5-1.5.9-.2.5.8 1.9 2.4 2.5.3.1.5.4.4.7-.2.6-1.5.8-2 .9-.1.2-.1.6-.3.8-.2.1-.6.1-1 0-.6-.1-1.3-.2-2 .1-.5.2-.9.7-1.6 1-1.4.6-2.6-.6-3.6-1-.7-.3-1.4-.2-2-.1-.4.1-.8.1-1 0-.2-.2-.2-.6-.3-.8-.5-.1-1.8-.3-2-.9-.1-.3.1-.6.4-.7 1.6-.6 2.6-2 2.4-2.5-.2-.4-1.3-.8-1.5-.9-.6-.2-.8-.7-.6-1.1.3-.5 1-.3 1.2-.2.4.2.8.2 1.1 0-.1-.6-.1-1.3-.1-1.9.1-2.3 1.8-4 4.1-4Z',
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/31657691672',
    path: 'M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm4.4 12.1c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5L9.3 8.1c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.7.8-.9 1.7-.6 2.9.5 1.9 1.8 3.4 3.7 4.4 1.7.9 2.5.8 3.4.7.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.1Z',
  },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <div className="relative flex w-full items-center justify-between gap-2 rounded-2xl border border-white/10 bg-near-black/70 p-2 pl-3.5 shadow-[0_16px_50px_rgba(10,21,18,0.5)] backdrop-blur-xl sm:w-auto sm:justify-start sm:pl-4">
          <Link
            to="/"
            onClick={close}
            aria-label="Minterest home"
            className="group relative z-10 flex shrink-0 items-center pr-1 transition-transform duration-300 hover:scale-[1.03]"
          >
            <Logo className="h-7 w-auto sm:h-8" />
          </Link>

          <span className="relative z-10 mx-1 hidden h-7 w-px bg-white/12 sm:block" />

          <Link
            to="/start"
            onClick={close}
            className="group relative z-10 inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 font-sans text-[13px] font-medium text-white transition-colors duration-300 hover:border-mint/40 sm:flex-none sm:justify-start sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <BorderBeam rx={12} />
            <span className="relative z-10 sm:hidden">Start project</span>
            <span className="relative z-10 hidden sm:inline">Start jouw project</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-mint/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
            className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/12 bg-white/5 text-white transition-colors duration-300 hover:border-mint/40 hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
              <motion.line x1="4" x2="20" y1="8" y2="8" animate={open ? { x1: 5, y1: 5, x2: 19, y2: 19 } : { x1: 4, y1: 8, x2: 20, y2: 8 }} transition={{ duration: 0.3, ease: EASE }} />
              <motion.line x1="4" x2="20" y1="16" y2="16" animate={open ? { x1: 5, y1: 19, x2: 19, y2: 5 } : { x1: 4, y1: 16, x2: 20, y2: 16 }} transition={{ duration: 0.3, ease: EASE }} />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Slide-down navigation */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-near-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={close}
            />
            <motion.nav
              className="fixed inset-x-0 top-0 z-40 max-h-[100dvh] overflow-y-auto border-b border-white/10 bg-near-black/95 px-6 pb-12 pt-28 backdrop-blur-2xl md:px-10"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="mx-auto max-w-5xl">
                <ul className="flex flex-col">
                  {PRIMARY.map((item, i) =>
                    item.to === '/diensten' ? (
                      /* diensten always expanded (desktop + mobile) */
                      <ServicesNav key={item.to} close={close} baseDelay={0.1 + i * 0.05} />
                    ) : (
                      <NavRow key={item.to} no={item.no} delay={0.1 + i * 0.05}>
                        <Link to={item.to} onClick={close} className="group flex items-baseline gap-4 py-3 md:gap-6">
                          <BigLabel>{item.label}</BigLabel>
                          <Arrow />
                        </Link>
                      </NavRow>
                    ),
                  )}
                </ul>

                {/* CTA + socials */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
                  className="mt-10 flex flex-col items-start gap-6"
                >
                  <Link
                    to="/start"
                    onClick={close}
                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-emerald/30 transition-transform duration-300 hover:scale-[1.01] sm:w-auto"
                  >
                    <BorderBeam rx={12} />
                    <span className="relative z-10">Start jouw project</span>
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                    <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  </Link>

                  <div className="flex items-center gap-3">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-white/5 text-white/80 transition-all duration-300 hover:border-mint/50 hover:bg-mint/15 hover:text-white"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                          <path d={s.path} />
                        </svg>
                      </a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ---- expanded "Onze diensten" dropdown (desktop + mobile) ---- */
function ServicesNav({ close, baseDelay }: { close: () => void; baseDelay: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: baseDelay }}
      className="border-b border-white/5"
    >
      <Link to="/diensten" onClick={close} className="group flex items-baseline gap-4 py-3 md:gap-6">
        <BigLabel>Onze diensten</BigLabel>
        <Arrow />
      </Link>

      <ul className="mb-3 grid grid-cols-2 gap-2 md:mb-5 md:grid-cols-3 md:gap-3">
        {MAIN_SERVICES.map((s, i) => {
          const Icon = SERVICE_ICON_BY_SLUG[s.slug]
          return (
            <motion.li
              key={s.slug}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: EASE, delay: baseDelay + 0.12 + i * 0.07 }}
            >
              <Link
                to={`/diensten/${s.slug}`}
                onClick={close}
                className="group/svc relative flex h-full items-center gap-2.5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 transition-colors duration-300 hover:border-mint/40 hover:bg-white/[0.06] md:gap-3.5 md:px-4 md:py-3.5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-mint/10 text-mint [&>svg]:h-4 [&>svg]:w-4 md:h-11 md:w-11 md:rounded-xl md:[&>svg]:h-5 md:[&>svg]:w-5">
                  <Icon />
                </span>
                <span className="font-sans text-[13px] font-medium leading-[1.15] text-white/80 transition-colors duration-300 group-hover/svc:text-white md:text-[15px]">
                  {s.label}
                </span>
                {/* line that draws across the button, one after another (staggered) */}
                <motion.span
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-emerald via-mint to-lime-accent"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.55, ease: EASE, delay: baseDelay + 0.22 + i * 0.1 }}
                />
              </Link>
            </motion.li>
          )
        })}
      </ul>
    </motion.li>
  )
}

/* ---- small menu helpers ---- */
function NavRow({
  no,
  delay,
  children,
  className = '',
}: {
  no: string
  delay: number
  children: ReactNode
  className?: string
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className={`border-b border-white/5 ${className}`}
    >
      <span className="sr-only">{no}</span>
      {children}
    </motion.li>
  )
}
function BigLabel({ children }: { children: ReactNode }) {
  return (
    <span className="font-display text-2xl font-semibold text-white/75 transition-colors duration-300 group-hover:text-white md:text-4xl">
      {children}
    </span>
  )
}
function Arrow() {
  return (
    <span className="ml-auto translate-x-0 self-center text-mint opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
      &rarr;
    </span>
  )
}
