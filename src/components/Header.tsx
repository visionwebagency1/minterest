import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { M_PATH } from '@/three/mPath'
import { BorderBeam } from './BorderBeam'

/**
 * Floating glass header + a slide-down navigation panel:
 *   Home · Onze diensten (accordion → 2x2 grid of services) · Onze projecten ·
 *   Over ons · Contact, with a CTA and social links at the bottom.
 */

const EASE = [0.22, 1, 0.36, 1] as const
const ICON_VB = '-1.75 -1 3.5 2'

/* ---- service icons (clean mint line art) ---- */
function WebIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8h18" />
      <circle cx="6" cy="6" r="0.6" fill="currentColor" />
    </svg>
  )
}
function BrandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16.5 14 6.5a2.1 2.1 0 0 1 3 3L7 19.5l-4 1 1-4Z" />
      <path d="M12.5 8 16 11.5" />
    </svg>
  )
}
function VideoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M10 9.5v5l4-2.5-4-2.5Z" fill="currentColor" stroke="none" />
    </svg>
  )
}
function NetworkIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="6" r="2.2" />
      <circle cx="5.5" cy="17" r="2.2" />
      <circle cx="18.5" cy="17" r="2.2" />
      <path d="M10.5 7.8 7 15M13.5 7.8 17 15M7.7 17h8.6" />
    </svg>
  )
}

const SERVICES = [
  { label: 'Website & webshops', desc: 'Snelle sites die verkopen', to: '/websites', Icon: WebIcon },
  { label: 'Design & branding', desc: 'Een merk dat blijft hangen', to: '/branding', Icon: BrandIcon },
  { label: 'Short video', desc: 'Scroll-stoppende content', to: '/video', Icon: VideoIcon },
  { label: 'Influencer marketing', desc: 'Bereik via echte creators', to: '/influencer', Icon: NetworkIcon },
]

const PRIMARY = [
  { no: '01', label: 'Home', to: '/' },
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

/** The Minterest M as a small icon (path flipped from Three.js y-up space). */
function MIcon() {
  return (
    <motion.svg
      viewBox={ICON_VB}
      className="h-6 w-auto"
      aria-hidden="true"
      animate={{ rotate: [-5, 5, -5], y: [0, -1.5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <path d={M_PATH} transform="scale(1,-1)" fill="#F4F1EA" strokeLinejoin="round" />
    </motion.svg>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(true)
  const close = () => setOpen(false)

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <div className="relative flex items-center gap-2 rounded-2xl border border-white/10 bg-near-black/70 p-2 pl-4 shadow-[0_16px_50px_rgba(10,21,18,0.5)] backdrop-blur-xl">
          <Link
            to="/"
            onClick={close}
            className="group relative z-10 flex items-center gap-2.5 pr-1 transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="drop-shadow-[0_0_10px_rgba(127,227,168,0.35)]">
              <MIcon />
            </span>
            <span className="font-logo text-lg font-medium tracking-tight text-white">Minterest</span>
          </Link>

          <span className="relative z-10 mx-1 hidden h-7 w-px bg-white/12 sm:block" />

          <Link
            to="/contact"
            onClick={close}
            className="group relative z-10 hidden items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 font-sans text-sm font-medium text-white transition-colors duration-300 hover:border-mint/40 sm:inline-flex"
          >
            <BorderBeam rx={12} />
            <span className="relative z-10">Start jouw project</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
            <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-mint/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
            className="relative z-10 grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/5 text-white transition-colors duration-300 hover:border-mint/40 hover:bg-white/10"
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
                  {/* Home */}
                  <NavRow no="01" delay={0.1}>
                    <Link to="/" onClick={close} className="group flex items-baseline gap-4 py-3 md:gap-6">
                      <BigLabel>Home</BigLabel>
                      <Arrow />
                    </Link>
                  </NavRow>

                  {/* Onze diensten — accordion */}
                  <NavRow no="02" delay={0.15}>
                    <button
                      onClick={() => setServicesOpen((o) => !o)}
                      aria-expanded={servicesOpen}
                      className="group flex w-full items-baseline gap-4 py-3 text-left md:gap-6"
                    >
                      <BigLabel>Onze diensten</BigLabel>
                      <span className={`ml-auto grid h-9 w-9 shrink-0 self-center place-items-center rounded-full border border-white/15 text-mint transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`}>
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {servicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-2">
                            {SERVICES.map((s) => {
                              const { Icon } = s
                              return (
                                <Link
                                  key={s.to}
                                  to={s.to}
                                  onClick={close}
                                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-300 hover:border-mint/40 hover:bg-white/[0.07]"
                                >
                                  <BorderBeam rx={16} />
                                  <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mint/10 text-mint shadow-[0_0_22px_rgba(79,216,155,0.45)]">
                                    <Icon />
                                  </span>
                                  <span className="relative z-10">
                                    <span className="block font-display text-lg font-semibold text-white">{s.label}</span>
                                    <span className="block font-sans text-sm text-white/55">{s.desc}</span>
                                  </span>
                                </Link>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavRow>

                  {/* the rest */}
                  {PRIMARY.slice(1).map((item, i) => (
                    <NavRow key={item.to} no={item.no} delay={0.2 + i * 0.05}>
                      <Link to={item.to} onClick={close} className="group flex items-baseline gap-4 py-3 md:gap-6">
                        <BigLabel>{item.label}</BigLabel>
                        <Arrow />
                      </Link>
                    </NavRow>
                  ))}
                </ul>

                {/* CTA + socials */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.4 }}
                  className="mt-10 flex flex-col items-start gap-6"
                >
                  <Link
                    to="/contact"
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

/* ---- small menu helpers ---- */
function NavRow({ no, delay, children }: { no: string; delay: number; children: ReactNode }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      className="border-b border-white/5"
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
