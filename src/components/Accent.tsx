import type { ReactNode } from 'react'

/** Editorial accent word: italic Fraunces serif in mint, used inside headings. */
export function Accent({ children }: { children: ReactNode }) {
  return (
    <span className="font-accent italic font-medium text-mint">{children}</span>
  )
}
