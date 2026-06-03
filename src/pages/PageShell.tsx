import type { ReactNode } from 'react'
import { Footer } from '@/sections/Footer'

/**
 * Shared chrome for inner pages: the brand "timeline" gradient background,
 * top padding to clear the fixed header, and the footer.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full">
      <div
        className="relative min-h-screen pt-32 pb-24 md:pt-40"
        style={{
          backgroundImage:
            'linear-gradient(180deg, #0A1512 0%, #0B241F 28%, #0F3E35 70%, #0A1512 100%)',
        }}
      >
        {children}
      </div>
      <Footer />
    </div>
  )
}
