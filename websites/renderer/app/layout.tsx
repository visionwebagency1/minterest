import type { Metadata } from 'next'
import { FONT_STYLESHEETS } from '@minterest/websites-shared'

import './globals.css'

/**
 * Root-layout van de renderer.
 *
 * Let op: dit is de schil van het PLATFORM, niet van een klant-site. Fase 1 geeft
 * elke klant-site zijn eigen metadata (title, description, OG, canonical) via een
 * generateMetadata per route, gevoed door de site die bij het domein hoort.
 */
export const metadata: Metadata = {
  title: 'Minterest Websites',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        {FONT_STYLESHEETS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body>{children}</body>
    </html>
  )
}
