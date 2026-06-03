import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useControls } from 'leva'

/**
 * Subtle bloom so the mint/lime accents (and the particle veil) glow softly.
 * Threshold keeps the deep parts of the gradient from blowing out.
 * Only mounted on capable devices.
 */
export function Effects() {
  const { intensity, threshold } = useControls('Bloom', {
    intensity: { value: 0.6, min: 0, max: 2, step: 0.05 },
    threshold: { value: 0.55, min: 0, max: 1, step: 0.01 },
  })

  return (
    <EffectComposer enableNormalPass={false} multisampling={0}>
      <Bloom
        intensity={intensity}
        luminanceThreshold={threshold}
        luminanceSmoothing={0.25}
        mipmapBlur
      />
    </EffectComposer>
  )
}
