import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, type PanInfo } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BorderBeam } from '@/components/BorderBeam'
import {
  MAIN_SERVICES,
  SERVICE_FOCUS_EVENT,
  type MainService,
} from '@/data/services'
import { lenisScrollTo } from '@/lib/useLenis'

gsap.registerPlugin(ScrollTrigger)

const SECTION_BG =
  'radial-gradient(55% 50% at 12% 18%, rgba(66,194,140,0.18), transparent 60%), radial-gradient(50% 45% at 88% 82%, rgba(0,128,129,0.16), transparent 60%), linear-gradient(180deg, #F4F4F4 0%, #EAF4EC 12%, #EAF4EC 100%)'

const TOTAL = MAIN_SERVICES.length

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

/**
 * Homepage services. The clickable hero pills broadcast a focus index; on
 * desktop we scroll to that stacked card, on mobile we jump the carousel there.
 * Desktop keeps the signature pinned card-stacking with the SVG renders
 * (untouched); mobile is a compact horizontal carousel (swipe + arrow + dots).
 */
export function ServicesShowcase() {
  const desktop = useIsDesktop()
  return desktop ? <ServicesPinnedDesktop /> : <ServicesCarouselMobile />
}

/* ───────────────────────── DESKTOP — pinned stacking ───────────────────────── */

function ServicesPinnedDesktop() {
  const sectionRef = useRef<HTMLElement>(null)
  const stRef = useRef<ScrollTrigger | null>(null)
  const reduce = useReducedMotion()
  const staticLayout = !!reduce

  useLayoutEffect(() => {
    if (staticLayout) return
    ScrollTrigger.config({ ignoreMobileResize: true })

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.svc-card')
      gsap.set(cards.slice(1), { yPercent: 110 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => '+=' + window.innerHeight * cards.length,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: true,
        },
      })
      stRef.current = tl.scrollTrigger ?? null

      cards.forEach((card, i) => {
        if (i === 0) return
        tl.to(card, { yPercent: 0, ease: 'none', duration: 1 })
        tl.to(cards[i - 1], { scale: 0.95, ease: 'none', duration: 1 }, '<')
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [staticLayout])

  // Hero pills → scroll to that card's position in the pinned timeline.
  useEffect(() => {
    const onFocus = (e: Event) => {
      const i = (e as CustomEvent<number>).detail ?? 0
      const st = stRef.current
      if (st && !staticLayout) {
        lenisScrollTo(st.start + i * window.innerHeight + 8, { duration: 1 })
      } else {
        const card = sectionRef.current?.querySelectorAll('.svc-card')[i]
        if (card instanceof HTMLElement) lenisScrollTo(card, { offset: -90 })
      }
    }
    window.addEventListener(SERVICE_FOCUS_EVENT, onFocus)
    return () => window.removeEventListener(SERVICE_FOCUS_EVENT, onFocus)
  }, [staticLayout])

  return (
    <section
      ref={sectionRef}
      id="diensten-cards"
      className={staticLayout ? 'relative py-20' : 'relative h-screen overflow-hidden'}
      style={{ backgroundImage: SECTION_BG }}
    >
      <div className={staticLayout ? 'flex flex-col gap-8' : 'relative h-full'}>
        {MAIN_SERVICES.map((s, i) => (
          <article
            key={s.slug}
            className={
              'svc-card ' +
              (staticLayout
                ? 'relative px-4'
                : 'absolute inset-0 flex items-center justify-center p-4 md:p-10')
            }
          >
            <DesktopCard service={s} index={i} />
          </article>
        ))}
      </div>
    </section>
  )
}

function DesktopCard({ service: s, index }: { service: MainService; index: number }) {
  const { Render } = s
  return (
    <motion.div
      className="flex w-full max-w-[1100px] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-emerald-deep shadow-[0_40px_120px_rgba(0,0,0,0.5)] md:grid md:max-h-[78vh] md:grid-cols-2"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Render half (SVG animation untouched). */}
      <div className="relative h-[36vh] min-h-[300px] w-full shrink-0 overflow-hidden border-b border-white/10 bg-[#062320] md:h-auto md:min-h-0 md:border-b-0 md:border-r">
        <Render />
      </div>

      {/* Text half */}
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 p-5 md:gap-6 md:p-12">
        <div className="font-mono text-sm tracking-widest text-mint">
          0{index + 1} <span className="text-white/30">/ 0{TOTAL}</span>
        </div>
        <h3 className="font-display text-[clamp(1.9rem,3.6vw,3.4rem)] font-semibold leading-[1.02] tracking-tight text-cream">
          {s.label}
        </h3>
        <p className="max-w-md font-sans text-base leading-relaxed text-cream/80 md:text-lg">
          {s.cardDesc}
        </p>

        {/* Sub-services in a 2x2 grid, equal heights. */}
        <ul className="mt-1 grid grid-cols-2 gap-2.5 border-t border-white/10 pt-4 md:pt-5">
          {s.subs.map((sub) => (
            <li key={sub.name} className="h-full">
              <span className="flex h-full items-center gap-2 rounded-xl border border-mint/30 bg-mint/10 px-3.5 py-2.5 font-sans text-[13px] font-medium leading-tight text-cream transition-colors duration-300 hover:border-mint/60 hover:bg-mint/20 md:text-sm">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lime-bright" aria-hidden="true" />
                {sub.name}
              </span>
            </li>
          ))}
        </ul>

        <Link
          to={`/diensten/${s.slug}`}
          className="group relative mt-4 inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-7 py-3.5 font-sans text-base font-semibold text-near-black shadow-lg shadow-mint/30 transition-transform duration-300 hover:scale-[1.03] md:mt-5 md:px-8 md:py-4"
        >
          <BorderBeam rx={12} />
          <span className="relative z-10">Ontdek nu</span>
          <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
          <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
        </Link>
      </div>
    </motion.div>
  )
}

/* ───────────────────────── MOBILE — compact carousel ───────────────────────── */

function ServicesCarouselMobile() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [width, setWidth] = useState(0)

  // Measure the slide width so drag + transform stay in sync.
  useEffect(() => {
    const measure = () => setWidth(viewportRef.current?.offsetWidth ?? 0)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const goTo = (i: number) => setActive(Math.max(0, Math.min(TOTAL - 1, i)))

  // Hero pills → jump to that service and bring the section into view.
  useEffect(() => {
    const onFocus = (e: Event) => {
      const i = (e as CustomEvent<number>).detail ?? 0
      goTo(i)
      if (sectionRef.current) lenisScrollTo(sectionRef.current, { offset: -70 })
    }
    window.addEventListener(SERVICE_FOCUS_EVENT, onFocus)
    return () => window.removeEventListener(SERVICE_FOCUS_EVENT, onFocus)
  }, [])

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = width * 0.2
    if (info.offset.x < -threshold || info.velocity.x < -500) goTo(active + 1)
    else if (info.offset.x > threshold || info.velocity.x > 500) goTo(active - 1)
  }

  return (
    <section
      ref={sectionRef}
      id="diensten-cards"
      className="relative px-4 py-16"
      style={{ backgroundImage: SECTION_BG }}
    >
      <div className="relative mx-auto max-w-md">
        {/* viewport */}
        <div ref={viewportRef} className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: -active * width }}
            transition={{ type: 'spring', stiffness: 260, damping: 32 }}
            drag="x"
            dragConstraints={{ left: -(TOTAL - 1) * width, right: 0 }}
            dragElastic={0.12}
            onDragEnd={onDragEnd}
          >
            {MAIN_SERVICES.map((s, i) => (
              <div key={s.slug} className="w-full shrink-0 px-1">
                <MobileCard service={s} index={i} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* arrow (bottom-right) */}
        <button
          type="button"
          onClick={() => goTo(active + 1 >= TOTAL ? 0 : active + 1)}
          aria-label="Volgende dienst"
          className="absolute -bottom-3 right-2 z-10 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-emerald to-mint text-near-black shadow-lg shadow-mint/30 transition-transform duration-300 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>

        {/* dots (centred, active dot animates wider) */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {MAIN_SERVICES.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ga naar ${s.label}`}
              aria-current={i === active}
              className="py-2"
            >
              <motion.span
                className="block h-1.5 rounded-full"
                animate={{
                  width: i === active ? 26 : 8,
                  backgroundColor: i === active ? '#008081' : 'rgba(1,63,64,0.25)',
                }}
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function MobileCard({ service: s, index }: { service: MainService; index: number }) {
  const { Render } = s
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-emerald-deep shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
      {/* compact render (smaller than desktop) */}
      <div className="relative h-[190px] w-full shrink-0 overflow-hidden border-b border-white/10 bg-[#062320]">
        <Render />
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="font-mono text-xs tracking-widest text-mint">
          0{index + 1} <span className="text-white/30">/ 0{TOTAL}</span>
        </div>
        <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-cream">
          {s.label}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-cream/80">{s.cardDesc}</p>

        <ul className="mt-1 flex flex-wrap gap-2 border-t border-white/10 pt-3">
          {s.subs.map((sub) => (
            <li key={sub.name}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/30 bg-mint/10 px-2.5 py-1 font-sans text-[11px] font-medium text-cream">
                <span className="h-1 w-1 rounded-full bg-lime-bright" aria-hidden="true" />
                {sub.name}
              </span>
            </li>
          ))}
        </ul>

        <Link
          to={`/diensten/${s.slug}`}
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-emerald to-mint px-5 py-2.5 font-sans text-sm font-semibold text-near-black shadow-lg shadow-mint/30"
        >
          Ontdek nu
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  )
}
