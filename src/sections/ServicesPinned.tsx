import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BorderBeam } from '@/components/BorderBeam'
import {
  BrowserRender,
  BrandingRender,
  VideoRender,
  AiVideoRender,
  SeoRender,
  NetworkRender,
} from './serviceRenders'

gsap.registerPlugin(ScrollTrigger)

/**
 * The four services as large stacking cards. On desktop the section pins and
 * each card scrubs up over the previous one (which dims + scales back, its
 * title shimmering behind) — wibify-style. On mobile / reduced-motion it
 * degrades to a clean vertical stack with no pinning.
 */

const SERVICES = [
  {
    no: '01',
    title: 'Websites & webshops',
    to: '/websites',
    desc: 'Snelle, converterende websites en webshops die er strak uitzien en verkopen. Van landingspagina tot complete Shopify of WooCommerce shop.',
    subs: [
      'Webshops in Shopify & WooCommerce',
      'Maatwerk in Next.js & React',
      'SEO en bliksemsnelle laadtijden',
      'Gebouwd op conversie',
    ],
    Render: BrowserRender,
  },
  {
    no: '02',
    title: 'Design & branding',
    to: '/branding',
    desc: 'Een merk dat blijft hangen. Van logo en huisstijl tot een compleet designsysteem dat overal consistent werkt.',
    subs: ['Logo en wordmark', 'Complete huisstijl', 'Designsysteem', 'Merkrichtlijnen'],
    Render: BrandingRender,
  },
  {
    no: '03',
    title: 'Short video content',
    to: '/video',
    desc: 'Video die kijkers vasthoudt en aanzet tot actie. Wij bedenken, draaien en monteren content die het goed doet op social.',
    subs: ['Concept en scenario', 'Opname en regie', 'Montage en editing', 'Klaar voor Reels & TikTok'],
    Render: VideoRender,
  },
  {
    no: '04',
    title: 'AI video',
    to: '/ai-video',
    desc: 'Schaalbare videocontent met AI. Snel en eindeloos variabel, van productvideo tot advertentie, zonder cameraploeg.',
    subs: ['AI-avatars & voice-over', 'Generatieve productvideo', 'Tientallen ad-varianten', 'Mens bewaakt de stijl'],
    Render: AiVideoRender,
  },
  {
    no: '05',
    title: 'SEO',
    to: '/seo',
    desc: 'Structureel bovenaan in Google. Technische SEO, content die rankt en lokale vindbaarheid die klanten naar je toe brengt.',
    subs: ['Technische SEO', 'Content die rankt', 'Linkbuilding', 'Lokale vindbaarheid'],
    Render: SeoRender,
  },
  {
    no: '06',
    title: 'Influencer marketing',
    to: '/influencer',
    desc: 'De juiste makers aan jouw merk koppelen. Wij regelen matching, strategie en content die echt resultaat oplevert.',
    subs: ['De juiste creators vinden', 'Campagnestrategie', 'Content en video', 'Heldere rapportage'],
    Render: NetworkRender,
  },
]

/** True from the md breakpoint up — where the pinned stacking effect runs. */
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

export function ServicesPinned() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const desktop = useIsDesktop()
  // On mobile (and reduced-motion) we skip the pinned card-stacking entirely and
  // fall back to a clean vertical stack, so each card keeps its own full height.
  const staticLayout = reduce || !desktop

  useLayoutEffect(() => {
    if (staticLayout) return

    // Mobile browsers fire resize when the URL bar shows/hides; ignore it so
    // the pin doesn't jump mid-scroll.
    ScrollTrigger.config({ ignoreMobileResize: true })

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.svc-card')
      // Stacking: later cards start below the viewport and slide up OVER the
      // previous as you scroll (opaque, so nothing bleeds through). The covered
      // card eases back slightly for depth.
      gsap.set(cards.slice(1), { yPercent: 110 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => '+=' + window.innerHeight * cards.length,
          pin: true,
          scrub: true,
        },
      })

      cards.forEach((card, i) => {
        if (i === 0) return
        tl.to(card, { yPercent: 0, ease: 'none', duration: 1 })
        tl.to(cards[i - 1], { scale: 0.95, ease: 'none', duration: 1 }, '<')
      })

      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [staticLayout])

  return (
    <section
      ref={sectionRef}
      className={
        staticLayout ? 'relative py-20' : 'relative h-screen overflow-hidden'
      }
      style={{
        backgroundImage:
          'radial-gradient(55% 50% at 12% 18%, rgba(79,216,155,0.18), transparent 60%), radial-gradient(50% 45% at 88% 82%, rgba(31,166,122,0.16), transparent 60%), linear-gradient(180deg, #0A1B16 0%, #EFF1E7 11%, #EFF1E7 100%)',
      }}
    >
      <div className={staticLayout ? 'flex flex-col gap-8' : 'relative h-full'}>
        {SERVICES.map((s) => {
          const { Render } = s
          return (
            <article
              key={s.no}
              className={
                'svc-card ' +
                (staticLayout
                  ? 'relative px-4'
                  : 'absolute inset-0 flex items-center justify-center p-4 md:p-10')
              }
            >
              <motion.div
                className="flex w-full max-w-[1100px] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-emerald-deep shadow-[0_40px_120px_rgba(0,0,0,0.5)] md:grid md:max-h-[78vh] md:grid-cols-2"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Render half (darker solid panel so the light UI pops). On
                    mobile it gets its own tall, clipped box ABOVE the text. */}
                <div className="relative h-[44vh] min-h-[300px] w-full shrink-0 overflow-hidden border-b border-white/10 bg-[#082019] md:h-auto md:min-h-0 md:border-b-0 md:border-r">
                  <Render />
                </div>

                {/* Text half */}
                <div className="flex min-h-0 flex-1 flex-col justify-center gap-4 p-6 md:gap-7 md:p-14">
                  <div className="font-mono text-sm tracking-widest text-mint">
                    {s.no} <span className="text-white/30">/ 06</span>
                  </div>
                  <h3 className="font-display text-[clamp(2rem,4vw,3.75rem)] font-semibold leading-[1.02] tracking-tight text-cream">
                    {s.title}
                  </h3>
                  <p className="max-w-md font-sans text-base leading-relaxed text-cream/80 md:text-lg">
                    {s.desc}
                  </p>
                  <ul className="mt-1 flex flex-wrap gap-2 border-t border-white/10 pt-4 md:gap-2.5 md:pt-6">
                    {s.subs.map((sub) => (
                      <li key={sub}>
                        <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-3.5 py-1.5 font-sans text-[13px] font-medium text-cream transition-colors duration-300 hover:border-mint/60 hover:bg-mint/20 md:px-4 md:py-2 md:text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-lime-bright" aria-hidden="true" />
                          {sub}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Animated CTA (border-beam, like the header) */}
                  <Link
                    to={s.to}
                    className="group relative mt-6 inline-flex w-fit items-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-emerald to-mint px-8 py-4 font-sans text-base font-semibold text-near-black shadow-lg shadow-mint/30 transition-transform duration-300 hover:scale-[1.03]"
                  >
                    <BorderBeam rx={12} />
                    <span className="relative z-10">Ontdek nu</span>
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                      &rarr;
                    </span>
                    <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                  </Link>
                </div>
              </motion.div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
