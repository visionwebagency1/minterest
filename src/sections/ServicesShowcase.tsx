import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { BorderBeam } from '@/components/BorderBeam'
import { SERVICE_ICON_BY_SLUG } from '@/components/serviceIcons'
import {
  MAIN_SERVICES,
  SERVICE_FOCUS_EVENT,
  subPath,
  type MainService,
} from '@/data/services'
import { lenisScrollTo } from '@/lib/useLenis'

/**
 * Homepage services — a premium carousel of the six main services on a bright
 * off-white background. Same idea on every screen size:
 *   · choice pills on top (a row on desktop, a 3x2 grid on mobile)
 *   · one service card at a time, with its sub-services, pitch, animated render
 *     and a link to the page
 *   · arrows + dots below, with autoplay that pauses after interaction
 * Each service has its own icon (Extra diensten uses a globe). The clickable
 * hero pills broadcast a focus index; we open that service and scroll here.
 */

const EASE = [0.22, 1, 0.36, 1] as const
const AUTOPLAY_MS = 5000
const RESUME_MS = 7000

const cardSlide = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 36 : -36 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -36 : 36 }),
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 768px)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => setDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return desktop
}

export function ServicesShowcase() {
  const desktop = useIsDesktop()
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  // Hero pills → open that service and bring the section into view.
  useEffect(() => {
    const onFocus = (e: Event) => {
      const i = (e as CustomEvent<number>).detail ?? 0
      setActive(i)
      if (sectionRef.current) lenisScrollTo(sectionRef.current, { offset: -80 })
    }
    window.addEventListener(SERVICE_FOCUS_EVENT, onFocus)
    return () => window.removeEventListener(SERVICE_FOCUS_EVENT, onFocus)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="diensten-cards"
      className="relative bg-cream pb-20 pt-2 text-near-black md:pb-28 md:pt-4"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        {desktop ? (
          <DesktopCarousel active={active} setActive={setActive} />
        ) : (
          <MobileGrid active={active} setActive={setActive} />
        )}
      </div>
    </section>
  )
}

/* ───────────────────────── shared carousel controller ─────────────────────────
 * One source of truth for the active index, direction, autoplay and the
 * pause-after-interaction behaviour. Both the desktop and mobile presentations
 * drive the same state machine. */

function useServiceCarousel(active: number, setActive: (i: number) => void) {
  const count = MAIN_SERVICES.length
  const idx = active < 0 ? 0 : active
  const current = MAIN_SERVICES[idx] ?? MAIN_SERVICES[0]
  const [paused, setPaused] = useState(false)
  const [dir, setDir] = useState(1)
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Pause autoplay for a moment after any manual interaction, then resume.
  const pause = () => {
    setPaused(true)
    if (resumeRef.current) clearTimeout(resumeRef.current)
    resumeRef.current = setTimeout(() => setPaused(false), RESUME_MS)
  }
  useEffect(
    () => () => {
      if (resumeRef.current) clearTimeout(resumeRef.current)
    },
    [],
  )

  // Autoplay.
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setDir(1)
      setActive((idx + 1) % count)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, idx, count, setActive])

  const goTo = (i: number) => {
    setDir(i >= idx ? 1 : -1)
    setActive(((i % count) + count) % count)
    pause()
  }
  const next = () => {
    setDir(1)
    setActive((idx + 1) % count)
    pause()
  }
  const prev = () => {
    setDir(-1)
    setActive((idx - 1 + count) % count)
    pause()
  }

  return { count, idx, current, dir, goTo, next, prev }
}

/* ───────────────────────── DESKTOP — pills row + card carousel ───────────────────────── */

function DesktopCarousel({
  active,
  setActive,
}: {
  active: number
  setActive: (i: number) => void
}) {
  const { idx, current, dir, goTo, next, prev } = useServiceCarousel(active, setActive)
  const CurrentIcon = SERVICE_ICON_BY_SLUG[current.slug]

  return (
    <div>
      {/* choice pills, 3-column grid (two rows of three) */}
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2.5">
        {MAIN_SERVICES.map((s, i) => {
          const Icon = SERVICE_ICON_BY_SLUG[s.slug]
          const on = idx === i
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-pressed={on}
              className={`flex w-full items-center justify-center gap-2.5 rounded-full border px-5 py-3 font-sans text-sm font-semibold transition-all duration-300 ${
                on
                  ? 'border-emerald bg-emerald text-cream shadow-lg shadow-emerald/20'
                  : 'border-emerald-deep/15 bg-white text-near-black/70 hover:border-emerald/40'
              }`}
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center [&>svg]:h-4 [&>svg]:w-4 ${
                  on ? 'text-cream' : 'text-emerald'
                }`}
              >
                <Icon />
              </span>
              {s.short}
            </button>
          )
        })}
      </div>

      {/* service card */}
      <div className="relative mt-7">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current.slug}
            custom={dir}
            variants={cardSlide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden rounded-3xl border border-emerald-deep/10 bg-white shadow-[0_30px_80px_rgba(1,63,64,0.1)]"
          >
            <div className="grid items-center gap-10 p-8 md:grid-cols-2 md:gap-12 md:p-10">
              <div>
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald/10 text-emerald [&>svg]:h-7 [&>svg]:w-7">
                    <CurrentIcon />
                  </span>
                  <h3 className="font-display text-3xl font-semibold tracking-tight text-near-black">
                    {current.label}
                  </h3>
                </div>
                <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-near-black/65">
                  {current.cardDesc}
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-2.5">
                  {current.subs.map((sub) => (
                    <li key={sub.name} className="h-full">
                      <Link
                        to={subPath(current.slug, sub.name)}
                        className="group/sub relative flex h-full items-center gap-2 overflow-hidden rounded-xl border border-emerald/20 bg-emerald/[0.06] px-3.5 py-2.5 font-sans text-[13px] font-medium leading-tight text-emerald-deep transition-colors duration-200 hover:border-emerald/40"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" aria-hidden="true" />
                        {sub.name}
                        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 ease-out group-hover/sub:translate-x-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/diensten/${current.slug}`}
                  className="group relative mt-8 inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-7 py-3.5 font-sans text-sm font-semibold text-near-black shadow-lg shadow-mint/25 transition-transform duration-300 hover:scale-[1.03]"
                >
                  <BorderBeam rx={12} />
                  <span className="relative z-10">Ontdek {current.label}</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                  <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                </Link>
              </div>
              <RenderTile service={current} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* navigation: left arrow · dots · right arrow */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <ArrowBtn dir="left" onClick={prev} />
        <div className="flex items-center gap-1.5">
          {MAIN_SERVICES.map((s, i) => {
            const on = idx === i
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ga naar ${s.label}`}
                aria-current={on}
                className="grid place-items-center py-1"
              >
                <motion.span
                  className="block h-1.5 rounded-full"
                  animate={{
                    width: on ? 28 : 8,
                    backgroundColor: on ? '#008081' : 'rgba(1,63,64,0.2)',
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </button>
            )
          })}
        </div>
        <ArrowBtn dir="right" onClick={next} />
      </div>
    </div>
  )
}

/* ───────────────────────── MOBILE — pills + card carousel ─────────────────────────
 * The six choice-pills (3x2), the service card and the dots all share one
 * `active` index. Tapping a pill, a dot, an arrow or swiping the card moves the
 * carousel; the matching pill + dot light up. Autoplay advances on its own and
 * pauses briefly after any manual interaction, then resumes. */

function MobileGrid({
  active,
  setActive,
}: {
  active: number
  setActive: (i: number) => void
}) {
  const { idx, current, dir, goTo, next, prev } = useServiceCarousel(active, setActive)

  return (
    <div>
      {/* B1 — six choice pills: two visible, horizontally scrollable with snap */}
      <div className="-mx-6 flex snap-x snap-mandatory gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {MAIN_SERVICES.map((s, i) => {
          const Icon = SERVICE_ICON_BY_SLUG[s.slug]
          const on = idx === i
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-pressed={on}
              className={`flex min-w-[44%] shrink-0 snap-start items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-300 ${
                on
                  ? 'border-emerald bg-emerald/10 shadow-[0_0_0_1px_rgba(0,128,129,0.3)]'
                  : 'border-emerald-deep/12 bg-white'
              }`}
            >
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg transition-colors duration-300 [&>svg]:h-4 [&>svg]:w-4 ${
                  on ? 'bg-emerald text-cream' : 'bg-emerald/10 text-emerald'
                }`}
              >
                <Icon />
              </span>
              <span className="font-sans text-[11px] font-semibold leading-[1.15] text-near-black">
                {s.short}
              </span>
            </button>
          )
        })}
      </div>

      {/* B2 — service card, swipeable */}
      <motion.div
        className="mt-4 touch-pan-y"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.16}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) next()
          else if (info.offset.x > 60) prev()
        }}
      >
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={current.slug}
            custom={dir}
            variants={cardSlide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden rounded-3xl border border-emerald-deep/10 bg-white shadow-[0_24px_60px_rgba(1,63,64,0.1)]"
          >
            <RenderTile service={current} mobile />
            <div className="p-5">
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-near-black">
                {current.label}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/65">
                {current.cardDesc}
              </p>
              {/* B6 — clickable sub-pills with a glare on tap */}
              <ul className="mt-4 flex flex-wrap gap-2">
                {current.subs.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      to={subPath(current.slug, sub.name)}
                      className="group/sub relative inline-flex items-center gap-1.5 overflow-hidden rounded-full border border-emerald/30 bg-emerald/[0.06] px-2.5 py-1.5 font-sans text-[11px] font-medium text-emerald-deep transition-colors duration-200 active:bg-emerald/20"
                    >
                      <span className="h-1 w-1 rounded-full bg-emerald" aria-hidden="true" />
                      {sub.name}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 ease-out group-hover/sub:translate-x-full group-active/sub:translate-x-full" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to={`/diensten/${current.slug}`}
                className="group relative mt-5 inline-flex w-fit items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-5 py-2.5 font-sans text-sm font-semibold text-near-black shadow-lg shadow-mint/25"
              >
                <span className="relative z-10">Ontdek {current.label}</span>
                <span className="relative z-10" aria-hidden="true">&rarr;</span>
                <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-active:translate-x-full" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* B2 — navigation: left arrow · dots · right arrow, on one line */}
      <div className="mt-5 flex items-center justify-between">
        <ArrowBtn dir="left" onClick={prev} />
        <div className="flex items-center gap-1.5">
          {MAIN_SERVICES.map((s, i) => {
            const on = idx === i
            return (
              <button
                key={s.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ga naar ${s.label}`}
                aria-current={on}
                className="grid place-items-center py-1"
              >
                <motion.span
                  className="block h-1.5 rounded-full"
                  animate={{
                    width: on ? 20 : 6,
                    backgroundColor: on ? '#008081' : 'rgba(1,63,64,0.22)',
                  }}
                  transition={{ duration: 0.3, ease: EASE }}
                />
              </button>
            )
          })}
        </div>
        <ArrowBtn dir="right" onClick={next} />
      </div>
    </div>
  )
}

function ArrowBtn({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 'left' ? 'Vorige dienst' : 'Volgende dienst'}
      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-r from-emerald to-mint text-near-black shadow-lg shadow-mint/25 transition-transform duration-200 active:scale-90 md:h-12 md:w-12 md:hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {dir === 'left' ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  )
}

/* ───────────────────────── shared render tile ───────────────────────── */

function RenderTile({ service: s, mobile = false }: { service: MainService; mobile?: boolean }) {
  const { Render } = s
  return (
    <div
      className={`relative w-full overflow-hidden border-white/10 ${
        mobile ? 'h-[340px] border-b' : 'aspect-[4/3] rounded-2xl border'
      }`}
      style={{ backgroundImage: 'linear-gradient(155deg, #013F40 0%, #082321 55%, #05110F 100%)' }}
    >
      <div className="absolute inset-0 grid place-items-center [&>*]:h-full [&>*]:w-full">
        <Render />
      </div>
    </div>
  )
}
