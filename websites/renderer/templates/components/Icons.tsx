import type { IconName } from '../types'

/**
 * One line-icon set for all templates: same 24px grid, same 1.5 stroke, same
 * round caps. Drawn by hand rather than pulled from a library so every sector
 * gets an icon that actually means something (a heat pump, a trowel, a plate)
 * and so the set stays consistent across six different designs.
 */

const P = (d: string) => (
  <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
)

const PATHS: Record<IconName, React.ReactNode> = {
  scissors: (
    <>
      {P('M6.5 6.5 17 17M17 7 6.5 17.5')}
      <circle cx="5" cy="19" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="5" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  sparkle: P('M12 3.5l1.7 4.8 4.8 1.7-4.8 1.7L12 16.5l-1.7-4.8L5.5 10l4.8-1.7L12 3.5ZM18.5 16l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z'),
  brush: P('M15.5 3.5 20.5 8.5 11 18H6v-5l9.5-9.5ZM13.5 5.5l5 5M6 18l-2.5 2.5'),
  droplet: P('M12 3.5s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10ZM9.5 13.5a2.5 2.5 0 0 0 2.5 2.5'),
  flame: P('M12 3.5c3 3.4 5.5 5.7 5.5 9a5.5 5.5 0 0 1-11 0c0-1.8.8-3 2-4.3.6 1 1.2 1.6 2 1.8-.5-2.4.3-4.7 1.5-6.5ZM12 20a2.6 2.6 0 0 0 2.6-2.6c0-1.4-1.3-2.4-2.6-4-1.3 1.6-2.6 2.6-2.6 4A2.6 2.6 0 0 0 12 20Z'),
  wrench: P('M20 5.5a4.8 4.8 0 0 1-6.4 6.2L6.2 19a2.1 2.1 0 0 1-3-3l7.3-7.4A4.8 4.8 0 0 1 16.7 2l-3 3 1.4 3.3 3.3 1.4 3-3c.4.6.6 1.2.6 1.8Z'),
  bolt: P('M13.5 2.5 5.5 13.5h5l-1 8 8-11h-5l1-8Z'),
  shield: P('M12 2.8 19 5.5v6c0 4.3-2.9 7.7-7 9.7-4.1-2-7-5.4-7-9.7v-6L12 2.8ZM9 12l2.2 2.2L15.5 10'),
  leaf: P('M20 4c0 8.5-4.3 13-11 13a5 5 0 0 1-.6-10C13 6.4 16.3 5.4 20 4ZM8 20c1.3-4.6 4-8 8-10'),
  tree: P('M12 3 6.5 10.5h3L5.5 17h13L14.5 10.5h3L12 3ZM12 17v4M9.5 21h5'),
  fence: P('M4 10.5h16M4 15h16M6.5 20V7l2-2.5L10.5 7v13M13.5 20V7l2-2.5L17.5 7v13'),
  shovel: P('M12 3v9M9 12h6l1 4.5c0 2-1.8 4.5-4 4.5s-4-2.5-4-4.5L9 12ZM9.5 3h5'),
  plate: (
    <>
      <circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
  coffee: P('M4.5 7.5h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5v-6ZM16.5 9h1.8a2.6 2.6 0 0 1 0 5.2h-1.8M7 4.5V3M10.5 4.5V3M14 4.5V3'),
  wine: P('M8 3h8l-.6 5.5a3.4 3.4 0 0 1-6.8 0L8 3ZM12 12v6M9 21h6M8.4 7h7.2'),
  chef: P('M7.5 20h9v-6H7.5v6ZM7.5 14a4 4 0 0 1-1-7.9 3.6 3.6 0 0 1 6.5-2 3.6 3.6 0 0 1 6 2.4A4 4 0 0 1 16.5 14M9.5 17h5'),
  heart: P('M12 20S3.8 15.2 3.8 9.4A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8.2 2.4C20.2 15.2 12 20 12 20Z'),
  hand: P('M8.5 11V5.2a1.6 1.6 0 1 1 3.2 0V10m0-.5V4.2a1.6 1.6 0 1 1 3.2 0V10m0-.8V6.4a1.6 1.6 0 1 1 3.1 0v7.2c0 4-2.6 7.4-6.4 7.4-3.3 0-5.1-1.8-6.4-4.6l-1.6-3.6a1.7 1.7 0 0 1 2.9-1.7L8.5 13'),
  activity: P('M3 12.5h4l2.5-6.5 4 13 2.5-6.5h5'),
  stethoscope: P('M6 3v5.5a4.5 4.5 0 0 0 9 0V3M4.5 3h3M13.5 3h3M10.5 13v2.5a4 4 0 0 0 8 0V14M18.5 14a1.8 1.8 0 1 0 0-3.6 1.8 1.8 0 0 0 0 3.6Z'),
  chart: P('M4 20h16M7 20v-6M12 20V7M17 20v-9M5.5 9.5 10 5l3.5 3L19 3.5'),
  briefcase: P('M3.5 8h17v11h-17V8ZM9 8V5.5h6V8M3.5 13h17'),
  calculator: P('M5.5 3h13v18h-13V3ZM8 7h8M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01M8.5 15h.01M12 15h.01M15.5 15h.01M8.5 18.5h7'),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {P('m15.5 8.5-2 5.2-5.2 2 2-5.2 5.2-2Z')}
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {P('M12 7.5V12l3 1.8')}
    </>
  ),
  phone: P('M7.2 3.5h2.3l1.4 3.5-1.8 1.3a11 11 0 0 0 5.6 5.6l1.3-1.8 3.5 1.4v2.3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 5.2 5.7a2 2 0 0 1 2-2.2Z'),
  mail: P('M3.5 6h17v12h-17V6ZM3.5 6.8 12 13l8.5-6.2'),
  pin: P('M12 21s6.5-6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21ZM12 13a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z'),
  check: P('M4.5 12.5 9.5 17.5 19.5 6.5'),
  arrow: P('M4.5 12h14M13 6.5 18.5 12 13 17.5'),
  star: P('M12 3.5l2.6 5.6 6 .8-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6L3.4 9.9l6-.8L12 3.5Z'),
}

export function Icon({ name, className = 'h-6 w-6' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {PATHS[name]}
    </svg>
  )
}
