import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { lenisScrollTo } from '@/lib/useLenis'

/**
 * Hero HTML overlay above the WebGL canvas — editorial split layout:
 *   · desktop: copy column on the LEFT, the 3D glass-M lives on the RIGHT
 *     (MShapes pushes itself right on wide viewports) so they never overlap.
 *   · mobile: copy stacks below the M, centred.
 *
 * Anatomy: floating top bar · indexed eyebrow · big headline with italic
 * Fraunces accent words · supporting subline · two CTAs · a trust/stats row ·
 * a fixed contact dock on the right edge · a minimal scroll cue.
 *
 * The container is pointer-events-none so the canvas keeps the mouse; only the
 * interactive bits re-enable pointer events.
 */

const EASE = [0.22, 1, 0.36, 1] as const

const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
}
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

// Editorial accent word: italic Fraunces serif in lime with a soft underline.
function Accent({ children }: { children: string }) {
  return (
    <span className="font-accent italic font-medium text-lime-accent underline decoration-mint/40 decoration-[3px] underline-offset-[0.14em]">
      {children}
    </span>
  )
}

// Social-proof figures.
const STATS = [
  { value: '150+', label: 'groeiprojecten' },
  { value: '300M+', label: 'bereik gerealiseerd' },
  { value: '4.9★', label: 'klantwaardering' },
]

export function HeroContent() {
  return (
    <>
      {/* Main content — mobile: copy on TOP, M + orbit below. Desktop: copy on
          the left, M on the right (vertically centred). */}
      <div className="pointer-events-none relative z-10 flex items-start pt-28 sm:pt-32 md:absolute md:inset-0 md:items-center md:pt-0">
        {/* Desktop legibility scrim (left-dark). On mobile the whole-hero scrim
            in Hero handles this, so there is no copy-block edge / seam. */}
        <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-near-black/85 via-near-black/45 to-transparent md:block" />

        <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-10 px-[clamp(1.5rem,5vw,5rem)] md:grid-cols-2 md:gap-14">
          <motion.div
            variants={group}
            initial="hidden"
            animate="show"
            className="text-center md:text-left"
          >
            {/* Headline */}
            <motion.h1
              variants={rise}
              className="font-display text-[2.3rem] font-semibold leading-[1.04] tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:text-[4.75rem]"
            >
              Waar <Accent>aandacht</Accent>
              <br />
              verandert in <Accent>groei</Accent>.
            </motion.h1>

            {/* Subline */}
            <motion.p
              variants={rise}
              className="mx-auto mt-7 max-w-md font-sans text-base leading-relaxed text-white/65 md:mx-0 md:text-lg"
            >
              Websites, branding, video en influencer marketing gebouwd om jouw
              bedrijf zichtbaarder te maken, vertrouwen op te bouwen en
              structureel te groeien.
            </motion.p>

            {/* Two CTAs — squared (header style), always on one row (also on
                the smallest phones), centred on mobile */}
            <motion.div
              variants={rise}
              className="mt-9 flex flex-row flex-nowrap items-stretch justify-center gap-2.5 md:justify-start md:gap-3"
            >
              {/* Primary: gradient fill + sweeping shimmer */}
              <Link
                to="/start"
                className="group pointer-events-auto relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl bg-gradient-to-r from-emerald to-mint px-4 py-3.5 font-sans text-[13px] font-medium text-near-black shadow-lg shadow-emerald/25 transition-transform duration-300 hover:scale-[1.03] sm:px-7 sm:text-sm lg:px-9 lg:py-4 lg:text-base"
              >
                <span className="relative z-10">Start jouw groeiproject</span>
                <svg
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17 L17 7" />
                  <path d="M8 7 H17 V16" />
                </svg>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </Link>

              {/* Secondary: dark glass (matches the header CTA) */}
              <button
                type="button"
                onClick={() => lenisScrollTo('#diensten', { offset: -80 })}
                className="group pointer-events-auto relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 font-sans text-[13px] font-medium text-white backdrop-blur-md transition-colors duration-300 hover:border-mint/40 sm:gap-2.5 sm:px-7 sm:text-sm lg:px-9 lg:py-4 lg:text-base"
              >
                <span className="relative z-10 h-1.5 w-1.5 bg-lime-accent transition-transform duration-300 group-hover:rotate-45" />
                <span className="relative z-10">Bekijk onze diensten</span>
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-mint/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </button>
            </motion.div>

            {/* Trust / stats row — compact, always on one line (stacked on
                mobile, inline on desktop) */}
            <motion.div
              variants={rise}
              className="mt-10 flex items-center justify-center gap-3 md:mt-12 md:justify-start md:gap-6"
            >
              {STATS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-3 md:gap-6">
                  {i > 0 && (
                    <span className="h-7 w-px bg-white/15 md:h-8" aria-hidden="true" />
                  )}
                  <span className="flex flex-col items-center gap-0.5 whitespace-nowrap md:flex-row md:items-baseline md:gap-1.5">
                    <span className="font-display text-base font-semibold text-mint sm:text-lg md:text-xl">
                      {s.value}
                    </span>
                    <span className="font-sans text-[9px] uppercase tracking-[0.14em] text-white/45 sm:text-[11px] sm:tracking-[0.18em]">
                      {s.label}
                    </span>
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column: the 3D M shows through here (canvas behind). */}
          <div className="hidden md:block" aria-hidden="true" />
        </div>
      </div>

      {/* Fixed contact dock (desktop) — adapts to the section behind it. */}
      <ContactDock />
    </>
  )
}

const DOCK_LINKS = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/',
    path: 'M12 2a10 10 0 0 0-8.6 15l-1.4 5 5.1-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5l-.7-1.7c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.7.8-.9 1.7-.6 2.9.5 1.9 1.8 3.4 3.7 4.4 1.7.9 2.5.8 3.4.7.5-.1 1.4-.6 1.6-1.2.2-.6.2-1 .1-1.1l-.4-.2Z',
  },
  {
    label: 'Bel ons',
    href: 'tel:+31',
    path: 'M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11 11 0 0 0 3.5.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.6 3.5a1 1 0 0 1-.3 1l-2.2 2.3Z',
  },
  {
    label: 'Chat',
    href: '#contact',
    path: 'M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1Z',
  },
]

/**
 * Fixed contact dock on the right edge. Samples the background of whatever
 * section sits behind it and switches style: on a LIGHT section it goes solid
 * dark-teal (so the icons stay visible); on a DARK section it stays glassy
 * white. Re-checks on scroll and resize.
 */
function ContactDock() {
  const [onLight, setOnLight] = useState(false)

  useEffect(() => {
    const sample = () => {
      const x = Math.max(8, window.innerWidth - 150)
      const y = Math.round(window.innerHeight / 2)
      for (const el of document.elementsFromPoint(x, y)) {
        const m = getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/)
        if (!m) continue
        const p = m[1].split(',').map((v) => parseFloat(v))
        if ((p[3] ?? 1) < 0.5) continue
        const lum = (0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]) / 255
        setOnLight(lum > 0.55)
        return
      }
      setOnLight(false)
    }
    sample()
    window.addEventListener('scroll', sample, { passive: true })
    window.addEventListener('resize', sample)
    return () => {
      window.removeEventListener('scroll', sample)
      window.removeEventListener('resize', sample)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 1 }}
      className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
    >
      {DOCK_LINKS.map((c) => (
        <a
          key={c.label}
          href={c.href}
          aria-label={c.label}
          className={`pointer-events-auto grid h-11 w-11 place-items-center rounded-xl border backdrop-blur-md transition-colors duration-500 ${
            onLight
              ? 'border-emerald-deep/15 bg-emerald-deep text-cream shadow-[0_10px_30px_rgba(1,63,64,0.28)] hover:bg-emerald'
              : 'border-white/12 bg-white/5 text-white/80 hover:border-mint/50 hover:bg-mint/15 hover:text-white'
          }`}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d={c.path} />
          </svg>
        </a>
      ))}
    </motion.div>
  )
}
