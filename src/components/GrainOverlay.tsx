/**
 * Global grain/noise overlay.
 * Fixed, non-interactive, very low opacity (~1.5%). Sits above all content.
 */
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />
}
