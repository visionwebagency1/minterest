import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { BorderBeam } from '@/components/BorderBeam'
import { SERVICE_ICON_BY_SLUG } from '@/components/serviceIcons'
import {
  MAIN_SERVICES,
  SERVICE_FOCUS_EVENT,
  type MainService,
} from '@/data/services'
import { lenisScrollTo } from '@/lib/useLenis'

/**
 * Homepage services — a clean, premium "dropdown" of the six main services on a
 * bright off-white background.
 *   · desktop: an accordion. Each service expands smoothly to reveal its
 *     sub-services, a short pitch, its animated render and a link to the page.
 *   · mobile: the six services as a 2-column grid (2, 2, 2). Tapping a tile
 *     opens its detail panel below, with the render shown large.
 * Each service has its own icon (Extra diensten uses a globe). The clickable
 * hero pills broadcast a focus index; we open that service and scroll here.
 */

const EASE = [0.22, 1, 0.36, 1] as const

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
      className="relative bg-cream py-20 text-near-black md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10 lg:px-16">
        {desktop ? (
          <div className="overflow-hidden rounded-3xl border border-emerald-deep/10 bg-white shadow-[0_30px_80px_rgba(1,63,64,0.08)]">
            {MAIN_SERVICES.map((s, i) => (
              <AccordionRow
                key={s.slug}
                service={s}
                open={active === i}
                onToggle={() => setActive(active === i ? -1 : i)}
              />
            ))}
          </div>
        ) : (
          <MobileGrid active={active} setActive={setActive} />
        )}
      </div>
    </section>
  )
}

/* ───────────────────────── DESKTOP — accordion ───────────────────────── */

function AccordionRow({
  service: s,
  open,
  onToggle,
}: {
  service: MainService
  open: boolean
  onToggle: () => void
}) {
  const Icon = SERVICE_ICON_BY_SLUG[s.slug]
  return (
    <div className="border-b border-emerald-deep/10 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group flex w-full items-center gap-5 px-6 py-6 text-left transition-colors duration-300 hover:bg-emerald/[0.04] md:px-9"
      >
        <span
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${
            open ? 'bg-emerald text-cream' : 'bg-emerald/10 text-emerald'
          }`}
        >
          <Icon />
        </span>
        <span className="font-display text-2xl font-semibold tracking-tight text-near-black md:text-[1.75rem]">
          {s.label}
        </span>
        <motion.span
          className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full border border-emerald-deep/15 text-emerald"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid items-center gap-8 px-6 pb-9 md:grid-cols-2 md:gap-12 md:px-9">
              <div>
                <p className="max-w-md font-sans text-base leading-relaxed text-near-black/65 md:text-lg">
                  {s.cardDesc}
                </p>
                <ul className="mt-6 grid grid-cols-2 gap-2.5">
                  {s.subs.map((sub) => (
                    <li key={sub.name} className="h-full">
                      <span className="flex h-full items-center gap-2 rounded-xl border border-emerald/20 bg-emerald/[0.06] px-3.5 py-2.5 font-sans text-[13px] font-medium leading-tight text-emerald-deep">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" aria-hidden="true" />
                        {sub.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={`/diensten/${s.slug}`}
                  className="group relative mt-7 inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-7 py-3.5 font-sans text-sm font-semibold text-near-black shadow-lg shadow-mint/25 transition-transform duration-300 hover:scale-[1.03]"
                >
                  <BorderBeam rx={12} />
                  <span className="relative z-10">Ontdek {s.label}</span>
                  <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
                  <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                </Link>
              </div>
              <RenderTile service={s} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ───────────────────────── MOBILE — 2x3 grid + detail panel ───────────────────────── */

function MobileGrid({
  active,
  setActive,
}: {
  active: number
  setActive: (i: number) => void
}) {
  const current = MAIN_SERVICES[active] ?? MAIN_SERVICES[0]
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {MAIN_SERVICES.map((s, i) => {
          const Icon = SERVICE_ICON_BY_SLUG[s.slug]
          const on = active === i
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-expanded={on}
              className={`flex h-full flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
                on
                  ? 'border-emerald bg-emerald/10 shadow-[0_0_0_1px_rgba(0,128,129,0.35)]'
                  : 'border-emerald-deep/12 bg-white'
              }`}
            >
              <span
                className={`grid h-10 w-10 place-items-center rounded-xl transition-colors duration-300 ${
                  on ? 'bg-emerald text-cream' : 'bg-emerald/10 text-emerald'
                }`}
              >
                <Icon />
              </span>
              <span className="font-sans text-sm font-semibold leading-tight text-near-black">
                {s.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Detail panel for the selected service, opens smoothly below the grid. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.slug}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-4 overflow-hidden rounded-3xl border border-emerald-deep/10 bg-white shadow-[0_24px_60px_rgba(1,63,64,0.1)]"
        >
          <RenderTile service={current} mobile />
          <div className="p-5">
            <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-near-black">
              {current.label}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-near-black/65">
              {current.cardDesc}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {current.subs.map((sub) => (
                <li key={sub.name}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/25 bg-emerald/[0.06] px-2.5 py-1 font-sans text-[11px] font-medium text-emerald-deep">
                    <span className="h-1 w-1 rounded-full bg-emerald" aria-hidden="true" />
                    {sub.name}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              to={`/diensten/${current.slug}`}
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-mint px-5 py-2.5 font-sans text-sm font-semibold text-near-black shadow-lg shadow-mint/25"
            >
              Ontdek {current.label}
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ───────────────────────── shared render tile ───────────────────────── */

function RenderTile({ service: s, mobile = false }: { service: MainService; mobile?: boolean }) {
  const { Render } = s
  return (
    <div
      className={`relative w-full overflow-hidden border-white/10 ${
        mobile ? 'h-[260px] border-b' : 'aspect-[4/3] rounded-2xl border'
      }`}
      style={{ backgroundImage: 'linear-gradient(155deg, #013F40 0%, #082321 55%, #05110F 100%)' }}
    >
      <div className="absolute inset-0 grid place-items-center [&>*]:h-full [&>*]:w-full">
        <Render />
      </div>
    </div>
  )
}
