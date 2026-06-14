/**
 * The brand "timeline" backdrop. One continuous vertical gradient that spans the
 * full document height — diep smaragd (top / "begin") through emerald and mint to
 * licht mint (bottom / "einde") — so scrolling the page literally walks up the
 * brand gradient, exactly like the identity lockup. Sections sit on top as
 * translucent tinted glass, letting this flow through.
 *
 * Rendered as an absolute, full-height layer behind a `relative` <main>, so it
 * naturally maps to scroll position (no JS, no repaint cost on scroll).
 */
export function ScrollGradient() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        background:
          'linear-gradient(180deg,' +
          ' #0A1512 0%,' + // hero handoff — near-black green
          ' #0F5C4D 16%,' + // emerald-deep
          ' #14745F 30%,' +
          ' #1FA67A 46%,' + // emerald
          ' #37BE8A 60%,' +
          ' #4FD89B 74%,' + // mint
          ' #7FE3A8 88%,' + // lime-accent
          ' #9BF5BE 100%)', // light mint — "einde"
      }}
    />
  )
}
