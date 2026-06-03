// The exact Minterest M outline, extracted from the brand-identity PDF
// (vector clip path of the standalone mark), then normalized:
//   - centred on the origin
//   - Y flipped (SVG y-down -> Three.js y-up)
//   - scaled to a width of 3.2 units (height ~1.71, aspect ~1.87)
// One continuous path: the white gaps between the three ascending blades are
// formed by the concavities of this single outline. Commands: M / L / C / Z.
export const M_PATH =
  'M 0.7619 0.8253 L 0.1347 0.0171 C 0.1025 -0.0244 0.0397 -0.0245 0.0075 0.0171 C -0.1159 0.176 -0.2993 0.4123 -0.4236 0.5725 C -0.4559 0.614 -0.5186 0.614 -0.5508 0.5724 L -1.5589 -0.7266 C -1.6 -0.7795 -1.5623 -0.8565 -1.4953 -0.8565 L -1.0352 -0.8565 C -1.0103 -0.8565 -0.9869 -0.845 -0.9716 -0.8254 L -0.2825 0.0626 C -0.2502 0.1042 -0.1875 0.1042 -0.1553 0.0626 L -0.0309 -0.0976 C -0.0084 -0.1266 -0.0084 -0.1672 -0.0309 -0.1963 L -0.4425 -0.7266 C -0.4835 -0.7795 -0.4458 -0.8565 -0.3788 -0.8565 L 0.0813 -0.8565 C 0.1062 -0.8565 0.1296 -0.8451 0.1449 -0.8254 C 0.3374 -0.5773 0.8005 0.0195 1.0303 0.3156 C 1.0625 0.3571 1.1253 0.3571 1.1575 0.3155 L 1.2394 0.21 C 1.262 0.1809 1.262 0.1403 1.2394 0.1113 C 1.1177 -0.0457 0.7652 -0.4998 0.5892 -0.7267 C 0.5481 -0.7796 0.5858 -0.8565 0.6528 -0.8565 L 0.9976 -0.8565 C 1.0225 -0.8565 1.046 -0.8451 1.0612 -0.8254 C 1.1542 -0.7056 1.4668 -0.3028 1.5774 -0.1602 C 1.6 -0.1312 1.6 -0.0906 1.5775 -0.0615 C 1.3715 0.2038 1.1007 0.5528 0.8891 0.8254 C 0.873 0.8461 0.8493 0.8565 0.8256 0.8565 C 0.8018 0.8565 0.7781 0.8461 0.7619 0.8253 Z'

/** Parse the (M/L/C/Z only) path string into a THREE.Shape. */
import * as THREE from 'three'
export function buildMShape(): THREE.Shape {
  const shape = new THREE.Shape()
  const tokens = M_PATH.match(/[MLCZ]|-?\d+\.?\d*/g) ?? []
  let i = 0
  const num = () => parseFloat(tokens[i++])
  while (i < tokens.length) {
    const cmd = tokens[i++]
    if (cmd === 'M') shape.moveTo(num(), num())
    else if (cmd === 'L') shape.lineTo(num(), num())
    else if (cmd === 'C') shape.bezierCurveTo(num(), num(), num(), num(), num(), num())
    else if (cmd === 'Z') shape.closePath()
  }
  return shape
}
