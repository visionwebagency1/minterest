import { useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import gsap from 'gsap'

/**
 * Scene 01 — "een webshop bouwt zichzelf".
 * URL types itself → nav + hero snap in, headline types → product cards fill
 * with image, name, price → a cursor clicks a product, the cart badge counts to
 * 1 → a PageSpeed score counts to 100 and a "Live" check lands → rest → loop.
 *
 * Pure HTML/SVG driven by one looping GSAP timeline (transform/opacity only).
 * Plays only while in view; reduced-motion renders the finished end-state.
 */

const URL = 'jouwwebshop.nl'
const HEADLINE = 'Jouw merk, online.'
const PRODUCTS = [
  { g: 'from-mint to-lime-accent', name: 'Sneaker', price: '€ 89' },
  { g: 'from-emerald to-mint', name: 'Jas', price: '€ 129' },
  { g: 'from-emerald-deep to-emerald', name: 'Tas', price: '€ 59' },
]

export function SceneWebsites() {
  const root = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  useLayoutEffect(() => {
    const el = root.current
    if (!el) return
    const q = gsap.utils.selector(el)
    const url = q('[data-url]')[0] as HTMLElement
    const headline = q('[data-headline]')[0] as HTMLElement
    const score = q('[data-score]')[0] as HTMLElement
    const cartCount = q('[data-cart-count]')[0] as HTMLElement

    const setText = (node: HTMLElement, full: string, p: number) => {
      node.textContent = full.slice(0, Math.round(full.length * p))
    }

    // Reduced motion: paint the finished frame and stop.
    if (reduce) {
      url.textContent = URL
      headline.textContent = HEADLINE
      score.textContent = '100'
      cartCount.textContent = '1'
      gsap.set(q('[data-fade]'), { opacity: 1, y: 0, scale: 1 })
      gsap.set(q('[data-cart]'), { opacity: 1, scale: 1 })
      gsap.set(q('[data-live]'), { opacity: 1, scale: 1 })
      gsap.set(q('[data-cursor]'), { opacity: 0 })
      return
    }

    let timeline: gsap.core.Timeline | undefined
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, paused: true })
      timeline = tl
      const urlP = { p: 0 }
      const headP = { p: 0 }
      const scoreV = { v: 0 }

      // reset to empty start state each loop (seamless rest → restart)
      tl.set(q('[data-fade]'), { opacity: 0, y: 10, scale: 0.96 })
        .set(q('[data-cart]'), { opacity: 0, scale: 0.6 })
        .set(q('[data-live]'), { opacity: 0, scale: 0.6 })
        .set(q('[data-cursor]'), { opacity: 0, x: 40, y: -10 })
        .call(() => {
          url.textContent = ''
          headline.textContent = ''
          score.textContent = '0'
          cartCount.textContent = '0'
        }, [], 0)

      // 1 — url types itself
      tl.to(urlP, { p: 1, duration: 1.1, ease: 'none', onUpdate: () => setText(url, URL, urlP.p) }, 0.3)

      // 2 — nav + hero block snap in
      tl.to(q('[data-fade="nav"]'), { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out' }, 1.3)
      tl.to(q('[data-fade="hero"]'), { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }, 1.5)

      // 3 — headline types, then button
      tl.to(headP, { p: 1, duration: 0.9, ease: 'none', onUpdate: () => setText(headline, HEADLINE, headP.p) }, 1.9)
      tl.to(q('[data-fade="btn"]'), { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 2.7)

      // 4 — product cards fill: image, then name, then price
      tl.to(q('[data-fade="card"]'), { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.16, ease: 'power3.out' }, 3.0)
      tl.to(q('[data-fade="meta"]'), { opacity: 1, y: 0, duration: 0.4, stagger: 0.12, ease: 'power2.out' }, 3.6)

      // 5 — cursor moves to product 1 and taps; cart counts to 1
      tl.to(q('[data-cursor]'), { opacity: 1, x: -36, y: 30, duration: 0.7, ease: 'power2.inOut' }, 4.4)
      tl.to(q('[data-cursor]'), { scale: 0.82, duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.inOut' }, 5.1)
      tl.to(q('[data-fade="card"]')[0], { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.inOut' }, 5.12)
      tl.to(q('[data-cart]'), { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(2.2)' }, 5.25)
      tl.to({ v: 0 }, { v: 1, duration: 0.4, ease: 'none', onUpdate: function () { cartCount.textContent = String(Math.round(this.targets()[0].v)) } }, 5.25)
      tl.to(q('[data-cursor]'), { opacity: 0, x: 20, y: 50, duration: 0.6, ease: 'power2.in' }, 5.7)

      // 6 — PageSpeed score counts to 100, Live check lands
      tl.to(q('[data-fade="footer"]'), { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 5.9)
      tl.to(scoreV, { v: 100, duration: 1.1, ease: 'power2.out', onUpdate: () => (score.textContent = String(Math.round(scoreV.v))) }, 6.1)
      tl.to(q('[data-live]'), { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, 7.0)
    }, el)

    // play only while in view
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!timeline) return
        if (entry.isIntersecting) timeline.play()
        else timeline.pause()
      },
      { threshold: 0.15 },
    )
    io.observe(el)

    return () => {
      io.disconnect()
      ctx.revert()
    }
  }, [reduce])

  return (
    <div ref={root} className="grid h-full w-full place-items-center p-5 [perspective:1200px] sm:p-7">
      <div
        className="relative w-full max-w-[26rem] [transform-style:preserve-3d]"
        style={{ transform: 'rotateY(-10deg) rotateX(5deg)' }}
      >
        <div className="relative overflow-hidden rounded-xl bg-cream shadow-[0_36px_80px_rgba(0,0,0,0.55)]">
          {/* chrome */}
          <div className="flex items-center gap-1.5 border-b border-black/5 bg-black/[0.04] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald/40" />
            <span className="h-2 w-2 rounded-full bg-emerald/25" />
            <span className="h-2 w-2 rounded-full bg-emerald/25" />
            <span className="ml-2 flex h-4 flex-1 items-center rounded-full bg-white px-2 font-mono text-[9px] text-emerald-deep shadow-inner">
              <span data-url />
              <span className="ml-px inline-block h-2.5 w-px animate-pulse bg-emerald" />
            </span>
          </div>

          {/* body */}
          <div className="relative bg-cream p-3">
            {/* nav */}
            <div data-fade="nav" className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-md bg-emerald" />
                <span className="font-display text-[8px] font-bold text-emerald-deep">Merk</span>
              </span>
              <div className="flex gap-2.5">
                {['Home', 'Shop', 'Over'].map((t) => (
                  <span key={t} className="font-sans text-[7px] font-medium text-emerald-deep/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* hero */}
            <div
              data-fade="hero"
              className="flex h-20 flex-col justify-center gap-1.5 rounded-lg bg-gradient-to-br from-emerald to-mint px-3"
            >
              <span data-headline className="min-h-[12px] font-display text-[10px] font-bold leading-tight text-cream" />
              <span
                data-fade="btn"
                className="grid h-4 w-12 place-items-center rounded bg-cream font-sans text-[6px] font-semibold text-emerald-deep"
              >
                Shop nu
              </span>
            </div>

            {/* products */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {PRODUCTS.map((p) => (
                <div key={p.name} data-fade="card" className="overflow-hidden rounded-md bg-white shadow-sm">
                  <div className={`h-8 bg-gradient-to-br ${p.g}`} />
                  <div className="space-y-0.5 p-1.5">
                    <span data-fade="meta" className="block font-sans text-[6px] font-semibold text-emerald-deep">
                      {p.name}
                    </span>
                    <span data-fade="meta" className="block font-sans text-[6px] text-emerald">
                      {p.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* footer: PageSpeed score + Live */}
            <div data-fade="footer" className="mt-3 flex items-center justify-between border-t border-black/5 pt-2">
              <span className="flex items-center gap-1.5 font-mono text-[8px] font-bold text-emerald-deep">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald/10 text-emerald">
                  <span data-score>0</span>
                </span>
                PageSpeed
              </span>
              <span
                data-live
                className="flex items-center gap-1 rounded-full bg-emerald px-2 py-0.5 font-sans text-[7px] font-bold text-cream"
              >
                <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12.5 10 17 19 7" />
                </svg>
                Live
              </span>
            </div>

            {/* cart badge */}
            <span
              data-cart
              className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-emerald-deep text-cream shadow-[0_6px_16px_rgba(0,0,0,0.4)]"
            >
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="20" r="1" />
                <circle cx="17" cy="20" r="1" />
                <path d="M3 4h2l2.4 11.4a1 1 0 0 0 1 .8h7.7a1 1 0 0 0 1-.8L19 7H6" />
              </svg>
              <span
                data-cart-count
                className="absolute -right-1 -top-1 grid h-3 w-3 place-items-center rounded-full bg-lime-accent font-mono text-[7px] font-bold text-emerald-deep"
              >
                0
              </span>
            </span>
          </div>
        </div>

        {/* cursor */}
        <svg
          data-cursor
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-1/2 top-1/2 h-5 w-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          fill="#0A1512"
          stroke="#F4F1EA"
          strokeWidth="1.2"
        >
          <path d="M5 3l6 14 2-5 5-2L5 3z" />
        </svg>
      </div>
    </div>
  )
}
