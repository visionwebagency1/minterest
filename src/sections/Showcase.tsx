import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { getFeaturedProjects, getPublishedProjects, type Project } from '@/lib/projects'

/**
 * Selected work: real projects from the database as tilted browser cards that
 * right themselves on hover. The homepage shows the featured projects; /work
 * shows all published ones. Each card links to the project's case page.
 */

const EASE = [0.22, 1, 0.36, 1] as const

type Card = Pick<Project, 'slug' | 'title' | 'category' | 'cover_image'>

const ACCENTS = ['from-emerald-deep to-emerald', 'from-emerald to-mint', 'from-mint to-lime-accent', 'from-emerald-deep to-mint']

// Shown only if the database has no projects yet (e.g. before the migration
// runs), so the portfolio grid is never empty. Not clickable.
const FALLBACK: Card[] = [
  { slug: '', title: 'Luna Light', category: 'Webshop · Shopify', cover_image: null },
  { slug: '', title: 'Ascend Labs', category: 'SaaS · Development', cover_image: null },
  { slug: '', title: 'DYOTA', category: 'Branding · Landingpage', cover_image: null },
  { slug: '', title: 'Bloom & Co', category: 'Website · Merk', cover_image: null },
]

export function Showcase({ variant = 'home' }: { variant?: 'home' | 'all' }) {
  const [cards, setCards] = useState<Card[] | null>(null)

  useEffect(() => {
    let active = true
    const load = variant === 'all' ? getPublishedProjects() : getFeaturedProjects(6)
    load
      .then((rows) => active && setCards(rows.length ? rows : FALLBACK))
      .catch(() => active && setCards(FALLBACK))
    return () => {
      active = false
    }
  }, [variant])

  const list = cards ?? FALLBACK

  return (
    <section id="work" className="relative bg-[#EAF4EC] py-28 text-near-black md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal className="flex items-center gap-3">
              <span className="h-px w-10 bg-emerald/50" />
              <span className="font-sans text-xs uppercase tracking-[0.28em] text-emerald-deep/60">Portfolio</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-8 max-w-2xl text-balance font-display text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[1.02] tracking-tight">
                Ons <Accent>werk.</Accent>
              </h2>
            </Reveal>
          </div>
          {variant === 'home' && (
            <Reveal delay={0.1}>
              <Link
                to="/work"
                className="group inline-flex items-center gap-2 rounded-xl bg-emerald-deep px-6 py-3.5 font-sans text-sm font-semibold text-cream transition-transform duration-300 hover:scale-[1.03]"
              >
                Bekijk alle cases
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </Reveal>
          )}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-14">
          {list.map((p, i) => {
            const to = p.slug ? `/work/${p.slug}` : '/work'
            return (
              <motion.div
                key={`${p.title}-${i}`}
                className={`[perspective:1400px] ${i % 2 === 1 ? 'md:mt-16' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <Link to={to} className="group block">
                  <motion.div
                    className="overflow-hidden rounded-2xl border border-emerald-deep/10 bg-white shadow-[0_30px_70px_rgba(1,63,64,0.14)] [transform-style:preserve-3d]"
                    style={{ rotateY: i % 2 === 0 ? 9 : -9, rotateX: 5 }}
                    whileHover={{ rotateY: 0, rotateX: 0, y: -6 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <div className="flex items-center gap-1.5 border-b border-black/5 bg-black/[0.03] px-3 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald/40" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald/25" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald/25" />
                      <span className="ml-2 h-3.5 flex-1 rounded-full bg-black/[0.06]" />
                    </div>
                    <div className="aspect-[16/10]">
                      {p.cover_image ? (
                        <img src={p.cover_image} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className={`h-full w-full bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]}`} />
                      )}
                    </div>
                  </motion.div>
                </Link>
                <div className="mt-4 flex items-center justify-between gap-2 md:mt-5">
                  <div>
                    <h3 className="font-display text-base font-semibold md:text-2xl">{p.title}</h3>
                    {p.category && <p className="mt-1 font-sans text-xs text-near-black/50 md:text-sm">{p.category}</p>}
                  </div>
                  {p.slug && <span className="hidden font-sans text-sm text-emerald-deep sm:inline">Bekijk case &rarr;</span>}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
