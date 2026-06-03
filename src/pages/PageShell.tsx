import type { ReactNode } from 'react'
import { Footer } from '@/sections/Footer'

/**
 * Shared chrome for inner pages: a light, airy cream background with a soft
 * green glow up top, room for the fixed header, and the (dark) footer to close.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full">
      <div
        className="relative min-h-screen bg-cream pb-28 pt-36 text-near-black md:pt-44"
        style={{
          backgroundImage:
            'radial-gradient(70% 45% at 80% -5%, rgba(79,216,155,0.22), transparent 60%), radial-gradient(50% 30% at 0% 0%, rgba(31,166,122,0.12), transparent 60%)',
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  )
}
