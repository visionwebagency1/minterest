// Gradient-mesh shader for the hero background.
// Organic, slowly-breathing flow in the Minterest palette, leaning toward
// the upper-right ("the climb"). Dark & premium so hero text stays readable.

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uSpeed;
  uniform float uScale;
  uniform float uBreath;
  uniform float uDarken;

  varying vec2 vUv;

  // ---- Ashima simplex 3D noise ----------------------------------------
  vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // ---- brand palette (sRGB, 0..1) — teal climb -----------------------
  const vec3 EMERALD_DEEP = vec3(0.004, 0.247, 0.251); // #013F40 deep teal
  const vec3 EMERALD      = vec3(0.000, 0.502, 0.506); // #008081 PRIMARY teal
  const vec3 MINT         = vec3(0.259, 0.761, 0.549); // #42C28C bridge
  const vec3 LIME         = vec3(0.565, 0.933, 0.565); // #90EE90 ACCENT green
  const vec3 NEAR_BLACK   = vec3(0.039, 0.082, 0.071); // #0A1512 dark

  void main(){
    vec2 uv = vUv;
    float t = uTime * uSpeed;

    // diagonal axis leaning toward the upper-right = "the climb"
    float diag = (uv.x + uv.y) * 0.5;

    // organic flowing noise field (two octaves), gently nudged by the mouse
    vec2 p = uv * uScale + uMouse;
    float n1 = snoise(vec3(p + vec2(t * 0.6, t * 0.4), t * 0.5));
    float n2 = snoise(vec3(p * 2.1 - vec2(t * 0.3, 0.0), t * 0.3 + 12.0));
    float flow  = n1 * 0.65 + n2 * 0.35;   // -1..1
    float light = flow * 0.5 + 0.5;         // 0..1

    // curtain-like vertical folds: wavy vertical drapes whose positions are
    // warped by the flow noise and sway over time, so the field reads like
    // soft hanging fabric rather than a flat gradient.
    float foldPhase = uv.x * 8.5 + n1 * 2.4 + sin(uv.y * 2.2 + t) * 0.7 + t * 0.4;
    float folds = sin(foldPhase) * 0.5 + 0.5;   // 0..1
    light *= 0.88 + 0.12 * folds;               // gentle drape shading

    // slow breathing
    float breath = sin(uTime * 0.35) * 0.5 + 0.5; // 0..1

    // value driving the color ramp: rises toward upper-right, flow adds
    // drifting light, folds add the drape, breath modulates the whole field
    float v = diag * 0.65 + light * 0.45 - 0.15;
    v += (folds - 0.5) * 0.07;
    v += (breath - 0.5) * uBreath;
    v = clamp(v, 0.0, 1.0);

    // dark, premium ramp
    vec3 col = NEAR_BLACK;
    col = mix(col, EMERALD_DEEP, smoothstep(0.00, 0.35, v));
    col = mix(col, EMERALD,      smoothstep(0.30, 0.62, v));
    col = mix(col, MINT,         smoothstep(0.58, 0.85, v));
    col = mix(col, LIME,         smoothstep(0.82, 1.00, v));

    // concentrate bright accents (light leaks) so most of the frame stays deep
    float accent = smoothstep(0.62, 0.95, light) * (0.55 + 0.45 * breath);
    col += MINT * accent * 0.12;

    // crease shadows along the fold troughs add fabric depth
    col = mix(col, NEAR_BLACK, smoothstep(0.5, 0.0, folds) * 0.06);

    // soft vignette toward the lower-left for depth
    float vig = smoothstep(1.1, 0.1, diag);
    col = mix(col, NEAR_BLACK, vig * 0.35);

    // global darken (slightly deeper on mobile)
    col *= uDarken;

    gl_FragColor = vec4(col, 1.0);
  }
`
