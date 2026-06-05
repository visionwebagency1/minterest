import { useFrame, useThree } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useControls } from 'leva'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { buildMShape } from './mPath'

/**
 * The Minterest M: the exact logo outline (three ascending blades weaving into
 * one mark, climbing toward the upper-right) extruded into 3D glass.
 *
 * Motion:
 *  - intro: a full 360° spin + scale-pop + rise into place on load
 *  - idle: a slow continuous rotation so the glass keeps catching the light
 *  - scroll: the M ascends to the upper-right, rotates and shrinks as you
 *    scroll past the hero (and returns when you scroll back)
 *
 * Capable devices get bright frosted-white glass; low-power devices get a clean
 * solid-white material (no per-frame transmission buffers).
 */

const EXTRUDE = {
  depth: 0.4,
  bevelEnabled: true,
  bevelThickness: 0.06,
  bevelSize: 0.05,
  bevelSegments: 4,
  steps: 1,
  curveSegments: 32,
}

const INTRO_DELAY = 0.25

// Brand gradient baked into the M as per-vertex colours: deep emerald at the
// bottom-left climbing to fresh lime at the top-right ("growth over time"),
// matching the brand logomark. The glass material tints over these colours so
// the mark stays liquid-glass but reads in the gradient instead of white.
const GRADIENT_STOPS: [number, string][] = [
  [0.0, '#8FE3C0'],
  [0.4, '#B6EED6'],
  [0.7, '#DAF7E8'],
  [1.0, '#FBFEFC'],
]

function applyBrandGradient(geo: THREE.BufferGeometry) {
  geo.computeBoundingBox()
  const { min, max } = geo.boundingBox!
  const pos = geo.attributes.position
  const colors = new Float32Array(pos.count * 3)
  const stops = GRADIENT_STOPS.map(([t, hex]) => ({
    t,
    c: new THREE.Color(hex).convertSRGBToLinear(),
  }))
  const c = new THREE.Color()
  for (let i = 0; i < pos.count; i++) {
    const tx = (pos.getX(i) - min.x) / (max.x - min.x || 1)
    const ty = (pos.getY(i) - min.y) / (max.y - min.y || 1)
    const t = THREE.MathUtils.clamp(tx * 0.5 + ty * 0.5, 0, 1) // diagonal
    let lo = stops[0]
    let hi = stops[stops.length - 1]
    for (let s = 0; s < stops.length - 1; s++) {
      if (t >= stops[s].t && t <= stops[s + 1].t) {
        lo = stops[s]
        hi = stops[s + 1]
        break
      }
    }
    const k = (t - lo.t) / (hi.t - lo.t || 1)
    c.copy(lo.c).lerp(hi.c, k)
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
}

// Resting world-Y on mobile: the M now lives in its own contained stage block
// below the copy, so it sits centred in that block (orbit pills ring around it).
const MOBILE_REST_Y = -0.1
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
const easeOutBack = (t: number) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

export function MShapes({ lowPower = false }: { lowPower?: boolean }) {
  const outer = useRef<THREE.Group>(null)
  const tilt = useRef<THREE.Group>(null)
  const { viewport, size } = useThree()

  const introStart = useRef<number | null>(null)
  const idleSpin = useRef(0)
  const smMouse = useRef(new THREE.Vector2())

  const ctrl = useControls('M-shapes', {
    scale: { value: 0.55, min: 0.4, max: 2.5, step: 0.01 },
    posX: { value: 0, min: -3, max: 3, step: 0.01 },
    // posY is now a fine-tune offset on top of the size-derived top anchor.
    posY: { value: 0, min: -1.5, max: 1.5, step: 0.01 },
    posZ: { value: 1.4, min: 0, max: 3, step: 0.05 }, // keep M in front of gradient plane
    rotX: { value: 10, min: -45, max: 45, step: 0.5 }, // resting tilt (deg)
    rotY: { value: -16, min: -45, max: 45, step: 0.5 },
    tiltAmount: { value: 0.7, min: 0, max: 1.5, step: 0.01 }, // pointer/touch reactivity
    // entrance / motion
    introDuration: { value: 2.2, min: 0.5, max: 5, step: 0.1 },
    idleSpin: { value: 0.22, min: 0, max: 1, step: 0.01 }, // rad/s, continuous turn
    // material — glassy but light; the colour comes from the vertex gradient
    transmission: { value: 0.38, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.2, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.35, min: 1, max: 2.333, step: 0.01 },
    thickness: { value: 0.5, min: 0, max: 3, step: 0.01 },
    chromaticAberration: { value: 0.1, min: 0, max: 1, step: 0.01 },
  })

  // Build the extruded geometry once.
  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(buildMShape(), EXTRUDE)
    geo.center()
    applyBrandGradient(geo)
    return geo
  }, [])

  // Shrink on narrow viewports so the wide mark always fits.
  const responsiveScale = useMemo(
    () => Math.min(1, viewport.width / 7.5),
    [viewport.width],
  )

  const baseRotX = THREE.MathUtils.degToRad(ctrl.rotX)
  const baseRotY = THREE.MathUtils.degToRad(ctrl.rotY)

  useFrame((state, delta) => {
    const o = outer.current
    const ti = tilt.current
    if (!o || !ti) return

    const t = state.clock.elapsedTime
    if (introStart.current === null) introStart.current = t + INTRO_DELAY
    const p = THREE.MathUtils.clamp(
      (t - introStart.current) / ctrl.introDuration,
      0,
      1,
    )
    const eOut = easeOutCubic(p)
    const eBack = p <= 0 ? 0 : easeOutBack(p) // scale pop with slight overshoot

    // snappy pointer follow — the M tracks the cursor almost directly (mouse on
    // desktop, touch-drag on mobile) so it feels responsive, not floaty.
    smMouse.current.lerp(state.pointer, 0.2)

    // idle spin ramps in only after the intro has landed
    idleSpin.current += delta * ctrl.idleSpin * eOut

    // ---- rotation (tilt group) ----
    const introRotY = (1 - eOut) * Math.PI * 2 // one full turn settling to 0
    const mouseRotY = smMouse.current.x * 1.0 * ctrl.tiltAmount
    ti.rotation.y = baseRotY + introRotY + idleSpin.current + mouseRotY

    const introRotX = (1 - eOut) * 0.5 // start tipped forward, settle
    const mouseRotX = -smMouse.current.y * 0.85 * ctrl.tiltAmount
    ti.rotation.x = baseRotX + introRotX + mouseRotX

    // ---- position + scale (outer group) ----
    // The M stays put on scroll (the hero background parallaxes instead, see
    // Hero). Desktop: parked in the right half. Mobile: centred, a bit low.
    const wide = size.width >= 768
    // Smaller on desktop for balance; bigger on mobile to read on the dark bg.
    const base = ctrl.scale * responsiveScale * (wide ? 0.78 : 1.7)
    // Park the M in the right column of the centred (max ~1400px) hero grid,
    // converting a pixel offset to world units so it tracks every breakpoint.
    const containerPx = Math.min(size.width * 0.9, 1400)
    const restX =
      ctrl.posX + (wide ? containerPx * 0.24 * (viewport.width / size.width) : 0)
    const restY = (wide ? 0 : MOBILE_REST_Y) + ctrl.posY
    const introY = THREE.MathUtils.lerp(restY - 1.4, restY, eOut)
    o.position.set(restX, introY, ctrl.posZ)
    o.scale.setScalar(Math.max(0, base * eBack))
  })

  return (
    // Initial transform avoids a one-frame flash before useFrame runs.
    <group
      ref={outer}
      position={[ctrl.posX, ctrl.posY - 1.4, ctrl.posZ]}
      scale={0}
    >
      <group ref={tilt}>
        <Float speed={2} rotationIntensity={0.4} floatIntensity={1.05}>
          <mesh geometry={geometry}>
            {lowPower ? (
              <meshStandardMaterial
                vertexColors
                metalness={0.12}
                roughness={0.3}
                envMapIntensity={1.4}
              />
            ) : (
              <MeshTransmissionMaterial
                // Coloured liquid glass: vertexColors carry the brand gradient,
                // low transmission keeps that gradient dominant while clearcoat
                // + environment reflections preserve the glassy sheen.
                vertexColors
                color="#ffffff"
                attenuationColor="#D8F7E6"
                attenuationDistance={4}
                envMapIntensity={1.8}
                // Kept deliberately light: low samples/resolution.
                samples={4}
                resolution={256}
                transmission={ctrl.transmission}
                thickness={ctrl.thickness}
                roughness={ctrl.roughness}
                ior={ctrl.ior}
                chromaticAberration={ctrl.chromaticAberration}
                anisotropy={0.1}
                distortion={0.06}
                distortionScale={0.12}
                temporalDistortion={0.06}
                clearcoat={0.8}
                clearcoatRoughness={0.16}
                backside={false}
              />
            )}
          </mesh>
        </Float>
      </group>
    </group>
  )
}
