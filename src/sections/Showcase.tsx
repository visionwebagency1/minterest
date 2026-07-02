import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/Reveal'
import { Accent } from '@/components/Accent'
import { getFeaturedProjects, getPublishedProjects, type Project } from '@/lib/projects'

/**
 * Selected work: real projects from the database in a clean 2-up grid (uniform
 * cards, no browser mockup, so any content works — websites, socials, TikTok).
 * The homepage shows the featured projects; /work shows all published ones.
 * Each card links to the project's case page.
 */

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

        <div className="mt-14 grid grid-cols-2 gap-5 md:mt-16 md:gap-8">
          {list.map((p, i) => {
            const to = p.slug ? `/work/${p.slug}` : '/work'
            return (
              <Reveal key={`${p.title}-${i}`} delay={(i % 2) * 0.06}>
                <Link to={to} className="group block">
                  <div className="overflow-hidden rounded-2xl border border-emerald-deep/10 bg-white shadow-[0_18px_50px_rgba(1,63,64,0.1)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_30px_70px_rgba(1,63,64,0.18)]">
                    <div className="aspect-[4/3] overflow-hidden">
                      {p.cover_image ? (
                        <img
                          src={p.cover_image}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className={`grid h-full w-full place-items-center bg-gradient-to-br ${ACCENTS[i % ACCENTS.length]} p-4`}>
                          <span className="text-center font-display text-lg font-semibold text-near-black/70 md:text-xl">{p.title}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-base font-semibold md:text-xl">{p.title}</h3>
                      {p.category && <p className="mt-0.5 truncate font-sans text-xs text-near-black/50 md:text-sm">{p.category}</p>}
                    </div>
                    {p.slug && (
                      <span className="hidden shrink-0 font-sans text-sm font-medium text-emerald-deep transition-transform duration-300 group-hover:translate-x-0.5 sm:inline">
                        Bekijk case &rarr;
                      </span>
                    )}
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
