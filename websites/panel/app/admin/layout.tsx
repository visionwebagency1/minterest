import { Shell, type NavItem } from '@/components/Shell'
import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const NAV: NavItem[] = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/klanten', label: 'Klanten en sites' },
  { href: '/admin/abonnementen', label: 'Abonnementen' },
  { href: '/admin/aanvragen', label: 'Wijzigingsaanvragen' },
  { href: '/admin/templates', label: 'Templates' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin()
  return (
    <Shell user={user} nav={NAV} area="Websites admin">
      {children}
    </Shell>
  )
}
