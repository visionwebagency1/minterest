import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * Subtle particle veil behind the M: a few hundred soft light points in
 * mint/lime tints that slowly drift toward the upper-right ("the climb").
 *
 * Lives in z ∈ [0.2, 1.1] — in front of the opaque gradient plane (z=0) but
 * behind the M (z≈1.4). Additive blending so they glow over the dark gradient.
 * Not rendered on low-power devices.
 */

const RANGE = {
  x: [-4.8, 4.8] as const,
  y: [-3.4, 3.4] as const,
  z: [0.2, 1.1] as const,
}

const PALETTE = [
  new THREE.Color('#4FD89B'), // mint
  new THREE.Color('#7FE3A8'), // lime-accent
  new THREE.Color('#1FA67A'), // emerald
]

/** Soft round sprite (radial gradient) so points read as glowing dots. */
function makeSoftCircle(): THREE.Texture {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.3, 'rgba(255,255,255,0.55)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

export function Particles() {
  const ref = useRef<THREE.Points>(null)

  const { count, speed, size, opacity } = useControls('Particles', {
    count: { value: 300, min: 0, max: 600, step: 10 },
    speed: { value: 0.17, min: 0, max: 0.6, step: 0.01 },
    size: { value: 0.055, min: 0.01, max: 0.2, step: 0.005 },
    opacity: { value: 0.8, min: 0, max: 1, step: 0.05 },
  })

  const texture = useMemo(() => makeSoftCircle(), [])

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = THREE.MathUtils.randFloat(RANGE.x[0], RANGE.x[1])
      positions[i * 3 + 1] = THREE.MathUtils.randFloat(RANGE.y[0], RANGE.y[1])
      positions[i * 3 + 2] = THREE.MathUtils.randFloat(RANGE.z[0], RANGE.z[1])
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])

  // Drift upward and slightly right; wrap around the volume.
  useFrame((_, delta) => {
    const pts = ref.current
    if (!pts) return
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute
    const arr = attr.array as Float32Array
    const dy = speed * delta
    const dx = speed * 0.4 * delta
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += dx
      arr[i + 1] += dy
      if (arr[i + 1] > RANGE.y[1]) arr[i + 1] = RANGE.y[0]
      if (arr[i] > RANGE.x[1]) arr[i] = RANGE.x[0]
    }
    attr.needsUpdate = true
  })

  if (count === 0) return null

  return (
    <points ref={ref} key={count}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        vertexColors
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
