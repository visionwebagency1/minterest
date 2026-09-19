import type { Metadata } from 'next'
import { FONT_STYLESHEETS } from '@minterest/websites-shared'

import './globals.css'

export const metadata: Metadata = {
  title: 'Minterest Panel',
  description: 'Beheer van websites, abonnementen en klanten.',
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
