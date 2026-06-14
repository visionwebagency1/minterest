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
          'linear-gradient(174deg,' +
          ' #0A1512 0%,' + // hero handoff — teal-tinted near-black
          ' #013F40 12%,' + // deep teal
          ' #015E5F 25%,' +
          ' #008081 42%,' + // PRIMARY teal
          ' #1FA88B 56%,' +
          ' #42C28C 70%,' + // mint bridge
          ' #6FD98F 83%,' +
          ' #90EE90 93%,' + // ACCENT green
          ' #B6F5B6 100%)', // light green — "einde"
      }}
    />
  )
}
