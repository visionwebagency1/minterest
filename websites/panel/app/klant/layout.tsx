import { Shell, type NavItem } from '@/components/Shell'
import { requireCustomer } from '@/lib/auth'

export const dynamic = 'force-dynamic'

const NAV: NavItem[] = [
  { href: '/klant', label: 'Overzicht' },
  { href: '/klant/website', label: 'Mijn website' },
  { href: '/klant/domein', label: 'Domein' },
  { href: '/klant/facturen', label: 'Facturen' },
  { href: '/klant/wijziging', label: 'Wijziging aanvragen' },
]

export default async function KlantLayout({ children }: { children: React.ReactNode }) {
  const user = await requireCustomer()
  return (
    <Shell user={user} nav={NAV} area="Mijn omgeving">
      {children}
    </Shell>
  )
}
