import { Canvas } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { Suspense } from 'react'
import { GradientMesh } from './GradientMesh'
import { MShapes } from './MShapes'
import { Particles } from './Particles'
import { Effects } from './Effects'
import { useIsLowPower } from '@/lib/useIsLowPower'

/**
 * The WebGL hero scene. Lazy-loaded (see Hero section) so the rest of the
 * page paints first.
 *   1.1 gradient mesh · 1.2 glass M · 1.3 particles · bloom postprocessing.
 * Low-power devices skip transmission glass, particles and postprocessing.
 */
export default function HeroCanvas({ active = true }: { active?: boolean }) {
  const lowPower = useIsLowPower()

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={lowPower ? [1, 1.5] : [1, 2]}
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      {/* Background gradient. */}
      <GradientMesh />

      {/* Particle veil behind the M (skipped on low-power devices). */}
      {!lowPower && <Particles />}

      {/* Lighting for the glass / jewel M — brighter so the white reads white. */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 3]} intensity={1.7} color="#ffffff" />
      <directionalLight position={[-4, 2, 2]} intensity={0.6} color="#7FE3A8" />

      {/* Brand-coloured environment so the glass reflects emerald/mint/lime.
          Baked once (frames={1}); background stays the gradient. */}
      <Environment resolution={256} frames={1} background={false}>
        <Lightformer intensity={2.2} color="#4FD89B" position={[2, 2, 2]} scale={[6, 6, 1]} />
        <Lightformer intensity={1.4} color="#1FA67A" position={[-3, 1, 1]} scale={[6, 6, 1]} />
        <Lightformer intensity={1.6} color="#7FE3A8" position={[2, 3, -2]} scale={[5, 5, 1]} />
        <Lightformer intensity={0.7} color="#0F5C4D" position={[-2, -2, 2]} scale={[8, 8, 1]} />
      </Environment>

      <Suspense fallback={null}>
        <MShapes lowPower={lowPower} />
      </Suspense>

      {/* Soft glow on the mint/lime accents. */}
      {!lowPower && <Effects />}
    </Canvas>
  )
}
