import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import type { Session, User } from '@supabase/supabase-js'
import { getSupabase } from '@/lib/supabase'
import { AdminBoot } from './AdminShell'

/**
 * Auth context for the admin panel. Tracks the Supabase session, the matching
 * admin profile and exposes sign-in / sign-out. Wraps every /admin route.
 *
 * Admin access is invite-only: accounts are created in the Supabase dashboard
 * and a trigger gives each one a row in `profiles`. Having a session therefore
 * means being an admin; we still load the profile for the display name.
 */

export type AdminProfile = {
  id: string
  email: string | null
  full_name: string | null
  role: string
}

type AdminAuthValue = {
  loading: boolean
  session: Session | null
  user: User | null
  profile: AdminProfile | null
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthValue | null>(null)

export function useAdminAuth(): AdminAuthValue {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within <AdminAuthProvider>')
  return ctx
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const supabase = getSupabase()
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<AdminProfile | null>(null)

  useEffect(() => {
    let active = true

    // Initial session, then keep it in sync with auth state changes.
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      setSession(data.session)
      setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      if (!active) return
      setSession(next)
    })

    return () => {
      active = false
      sub.subscription.unsubscribe()
    }
  }, [supabase])

  // Load the admin profile whenever the user changes.
  useEffect(() => {
    const userId = session?.user?.id
    if (!userId) {
      setProfile(null)
      return
    }
    let active = true
    supabase
      .from('profiles')
      .select('id, email, full_name, role')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (active) setProfile((data as AdminProfile) ?? null)
      })
    return () => {
      active = false
    }
  }, [supabase, session?.user?.id])

  const value = useMemo<AdminAuthValue>(
    () => ({
      loading,
      session,
      user: session?.user ?? null,
      profile,
      signIn: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return { error: error ? error.message : null }
      },
      signOut: async () => {
        await supabase.auth.signOut()
      },
    }),
    [loading, session, profile, supabase],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

/**
 * Route guard: renders the protected admin routes only when logged in. While the
 * session is resolving it shows a quiet boot screen; otherwise it redirects to
 * the login page and remembers where the user wanted to go.
 */
export function RequireAdmin() {
  const { loading, session } = useAdminAuth()
  const location = useLocation()

  if (loading) return <AdminBoot />
  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }
  return <Outlet />
}
