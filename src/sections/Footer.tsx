import { Link } from 'react-router-dom'
import { M_PATH } from '@/three/mPath'
import { MAIN_SERVICES } from '@/data/services'

/**
 * Footer — the M returns one last time. Brand lockup + tagline on the left,
 * navigation columns on the right, legal row below.
 */

const COLS = [
  {
    title: 'Diensten',
    links: [
      ...MAIN_SERVICES.map((s) => ({ label: s.label, to: `/diensten/${s.slug}` })),
      { label: 'Alle diensten', to: '/diensten' },
    ],
  },
  {
    title: 'Studio',
    links: [
      { label: 'Werk', to: '/work' },
      { label: 'Over ons', to: '/about' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Volg',
    links: [
      { label: 'Instagram', to: '#' },
      { label: 'LinkedIn', to: '#' },
      { label: 'TikTok', to: '#' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-near-black pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
        <div className="flex flex-col justify-between gap-14 lg:flex-row">
          {/* Brand */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5">
              <svg viewBox="-1.75 -1 3.5 2" className="h-7 w-auto" aria-hidden="true">
                <path d={M_PATH} transform="scale(1,-1)" fill="#42C28C" />
              </svg>
              <span className="font-display text-xl font-bold tracking-[-0.01em] text-white">
                Minterest
              </span>
            </Link>
            <p className="mt-6 font-accent text-lg italic text-white/70">
              Where interest becomes your growth.
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed text-white/45">
              Merk, website, video, social en vindbaarheid, gebouwd om je groei te laten klimmen.
            </p>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4 className="font-sans text-xs uppercase tracking-[0.22em] text-mint/80">
                  {col.title}
                </h4>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="font-sans text-sm text-white/55 transition-colors duration-200 hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-sans text-xs text-white/40">
            &copy; {2026} Minterest. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6 font-sans text-xs text-white/40">
            <Link to="#" className="transition-colors hover:text-white/70">
              Privacy
            </Link>
            <Link to="#" className="transition-colors hover:text-white/70">
              Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
