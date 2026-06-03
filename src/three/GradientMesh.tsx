import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { useControls } from 'leva'
import * as THREE from 'three'
import { fragmentShader, vertexShader } from './shaders/gradientMesh'

/**
 * Fullscreen shader plane that fills the camera frustum at z=0.
 * Organic, slowly-breathing gradient that reacts gently to the pointer.
 */
export function GradientMesh() {
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport, size } = useThree()
  const smoothedMouse = useRef(new THREE.Vector2(0, 0))

  // Slightly deeper green on mobile so the M and pills pop forward.
  const darken = size.width < 768 ? 0.93 : 1.0

  // Dev-tunable values (leva). Panel is hidden in production via <Leva>.
  const { speed, scale, breath, mouseInfluence } = useControls('Gradient', {
    speed: { value: 0.28, min: 0, max: 1, step: 0.01 },
    scale: { value: 1.6, min: 0.3, max: 5, step: 0.1 },
    breath: { value: 0.38, min: 0, max: 1, step: 0.01 },
    mouseInfluence: { value: 0.35, min: 0, max: 1.5, step: 0.01 },
  })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uSpeed: { value: speed },
      uScale: { value: scale },
      uBreath: { value: breath },
      uDarken: { value: 1 },
    }),
    // created once; live values are pushed in useFrame below
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useFrame((state, delta) => {
    const mat = matRef.current
    if (!mat) return
    const u = mat.uniforms
    u.uTime.value += delta
    u.uSpeed.value = speed
    u.uScale.value = scale
    u.uBreath.value = breath
    u.uDarken.value = darken

    // gentle, lagging mouse follow
    smoothedMouse.current.lerp(state.pointer, 0.04)
    u.uMouse.value.copy(smoothedMouse.current).multiplyScalar(mouseInfluence)
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}
