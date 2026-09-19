import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/** De voordeur: admins naar het admin, klanten naar hun eigen omgeving. */
export default async function Home() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  redirect(user.role === 'admin' ? '/admin' : '/klant')
}
