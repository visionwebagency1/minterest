import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { M_PATH } from '@/three/mPath'
import { BorderBeam } from './BorderBeam'

/**
 * Floating glass header: a rounded "block" holding the full Minterest lockup
 * (animated M icon + Poppins wordmark), a primary CTA and a hamburger that
 * slides a full navigation panel down from the top.
 *
 * Nav targets follow the site map in CLAUDE.md (work · the four services ·
 * about · contact). Page routes arrive in a later phase; a catch-all in App
 * keeps these links from dead-ending in the meantime.
 */

const EASE = [0.22, 1, 0.36, 1] as const
const ICON_VB = '-1.75 -1 3.5 2'

const NAV = [
  { label: 'Werk', to: '/work' },
  { label: 'Website & Webshops', to: '/websites' },
  { label: 'Design & branding', to: '/branding' },
  { label: 'Short video', to: '/video' },
  { label: 'Influencer Marketing', to: '/influencer' },
  { label: 'Over ons', to: '/about' },
  { label: 'Contact', to: '/contact' },
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

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
      >
        <div className="relative flex items-center gap-2 rounded-2xl border border-white/10 bg-near-black/70 p-2 pl-4 shadow-[0_16px_50px_rgba(10,21,18,0.5)] backdrop-blur-xl">
          {/* Logo lockup */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="group relative z-10 flex items-center gap-2.5 pr-1 transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="drop-shadow-[0_0_10px_rgba(127,227,168,0.35)]">
              <MIcon />
            </span>
            <span className="font-logo text-lg font-medium tracking-tight text-white">
              Minterest
            </span>
          </Link>

          {/* Divider */}
          <span className="relative z-10 mx-1 hidden h-7 w-px bg-white/12 sm:block" />

          {/* CTA */}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="group relative z-10 hidden items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 font-sans text-sm font-medium text-white transition-colors duration-300 hover:border-mint/40 sm:inline-flex"
          >
            {/* Glowing line travelling around the button */}
            <BorderBeam rx={12} />
            <span className="relative z-10">Start jouw project</span>
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
              &rarr;
            </span>
            <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-mint/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
          </Link>

          {/* Hamburger / close */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Menu sluiten' : 'Menu openen'}
            aria-expanded={open}
            className="relative z-10 grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/5 text-white transition-colors duration-300 hover:border-mint/40 hover:bg-white/10"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <motion.line
                x1="4" x2="20" y1="8" y2="8"
                animate={open ? { x1: 5, y1: 5, x2: 19, y2: 19 } : { x1: 4, y1: 8, x2: 20, y2: 8 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              <motion.line
                x1="4" x2="20" y1="16" y2="16"
                animate={open ? { x1: 5, y1: 19, x2: 19, y2: 5 } : { x1: 4, y1: 16, x2: 20, y2: 16 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
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
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-near-black/95 px-6 pb-14 pt-28 backdrop-blur-2xl md:px-10"
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <ul className="mx-auto flex max-w-7xl flex-col">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.to}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.12 + i * 0.05 }}
                    className="border-b border-white/5"
                  >
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 py-3 md:gap-6"
                    >
                      <span className="font-sans text-xs tabular-nums text-mint/70">
                        0{i + 1}
                      </span>
                      <span className="font-display text-2xl font-semibold text-white/75 transition-colors duration-300 group-hover:text-white md:text-4xl">
                        {item.label}
                      </span>
                      <span className="ml-auto translate-x-0 text-mint opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        &rarr;
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
