import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Logo } from '@/components/Logo'
import { useAdminAuth } from './AdminAuth'
import { countNewLeads } from './data/leads'

/**
 * The admin shell: a calm, light tool UI with a left sidebar and a content area.
 * Deliberately not the marketing look. The sidebar carries the navigation, a
 * "nieuwe aanvragen" badge and the logout control.
 *
 * Counts (like the number of new leads) live in a small context so the sidebar
 * badge, the dashboard and any page can read and refresh the same number.
 */

type AdminCounts = { newLeads: number; refresh: () => void }
const AdminCountsContext = createContext<AdminCounts>({ newLeads: 0, refresh: () => {} })

export function useAdminCounts(): AdminCounts {
  return useContext(AdminCountsContext)
}

type NavItem = {
  to: string
  label: string
  icon: ReactNode
  badge?: 'newLeads'
  /** Sections that arrive in a later step are shown but marked as upcoming. */
  upcoming?: boolean
}

const icon = (path: ReactNode) => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
)

const NAV: NavItem[] = [
  { to: '/admin', label: 'Dashboard', icon: icon(<><path d="M3 12 12 4l9 8" /><path d="M5 10v9h14v-9" /></>) },
  { to: '/admin/inbox', label: 'Inbox', badge: 'newLeads', icon: icon(<><path d="M3 7l9 6 9-6" /><rect x="3" y="5" width="18" height="14" rx="2" /></>) },
  { to: '/admin/klanten', label: 'Klanten', icon: icon(<><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5a3 3 0 0 1 0 6" /><path d="M19 20a5 5 0 0 0-3-4.6" /></>) },
  { to: '/admin/offertes', label: 'Offertes', icon: icon(<><path d="M7 3h7l5 5v13H7z" /><path d="M14 3v5h5" /><path d="M10 13h6" /><path d="M10 17h6" /></>) },
  { to: '/admin/facturen', label: 'Facturen', icon: icon(<><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z" /><path d="M10 8h4" /><path d="M10 12h4" /></>) },
]

function Badge({ count }: { count: number }) {
  if (!count) return null
  return (
    <span className="ml-auto grid h-5 min-w-[20px] place-items-center rounded-full bg-emerald px-1.5 text-[11px] font-bold text-cream">
      {count}
    </span>
  )
}

export function AdminLayout() {
  const { profile, user, signOut } = useAdminAuth()
  const location = useLocation()
  const [newLeads, setNewLeads] = useState(0)

  const refresh = useCallback(() => {
    countNewLeads()
      .then(setNewLeads)
      .catch(() => setNewLeads(0))
  }, [])

  // Refresh the badge on first load and whenever the route changes (e.g. after
  // reading a request, returning to the inbox brings the count up to date).
  useEffect(() => {
    refresh()
  }, [refresh, location.pathname])

  const name = profile?.full_name || user?.email || 'admin'

  const linkBase =
    'group flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-sans text-sm font-medium transition-colors'

  return (
    <AdminCountsContext.Provider value={{ newLeads, refresh }}>
      <div className="min-h-screen bg-[#f4f4f4] text-near-black md:grid md:grid-cols-[256px_1fr]">
        {/* sidebar */}
        <aside className="flex flex-col border-b border-emerald-deep/10 bg-white px-4 py-5 md:sticky md:top-0 md:h-screen md:border-b-0 md:border-r md:py-7">
          <div className="px-2">
            <Logo className="h-6 w-auto" wordmark="#1c1c1c" />
          </div>

          <nav className="mt-7 flex gap-1.5 overflow-x-auto md:flex-col md:overflow-visible">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  `${linkBase} ${
                    isActive
                      ? 'bg-emerald/10 text-emerald-deep'
                      : 'text-near-black/60 hover:bg-emerald-deep/5 hover:text-near-black'
                  }`
                }
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="whitespace-nowrap">{item.label}</span>
                {item.badge === 'newLeads' && <Badge count={newLeads} />}
                {item.upcoming && (
                  <span className="ml-auto hidden rounded-full bg-emerald-deep/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-near-black/35 md:inline">
                    binnenkort
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="mt-auto hidden border-t border-emerald-deep/10 pt-4 md:block">
            <NavLink
              to="/admin/instellingen"
              className={({ isActive }) =>
                `${linkBase} mb-2 ${
                  isActive ? 'bg-emerald/10 text-emerald-deep' : 'text-near-black/60 hover:bg-emerald-deep/5 hover:text-near-black'
                }`
              }
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
              </svg>
              Instellingen
            </NavLink>
            <p className="px-2 font-sans text-xs text-near-black/40">Ingelogd als</p>
            <p className="truncate px-2 font-sans text-sm font-semibold text-near-black">{name}</p>
            <button
              type="button"
              onClick={() => signOut()}
              className="mt-3 flex w-full items-center gap-2 rounded-xl border border-emerald-deep/12 px-3.5 py-2.5 font-sans text-sm font-medium text-near-black/70 transition-colors hover:border-emerald/40 hover:text-near-black"
            >
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M16 17l5-5-5-5" />
                <path d="M21 12H9" />
              </svg>
              Uitloggen
            </button>
          </div>
        </aside>

        {/* content */}
        <main className="min-w-0">
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-12">
            <Outlet />
          </div>
        </main>
      </div>
    </AdminCountsContext.Provider>
  )
}
