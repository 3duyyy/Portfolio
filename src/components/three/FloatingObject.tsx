"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MathUtils, type Group } from "three"
import type { MotionValue } from "framer-motion"

export default function FloatingObject({
  x,
  y,
  interactive,
  compact,
}: {
  x: MotionValue<number>
  y: MotionValue<number>
  interactive: boolean
  compact: boolean
}) {
  const group = useRef<Group>(null)
  const time = useRef(0)
  useFrame((_, delta) => {
    if (!group.current) return
    const step = Math.min(delta, 0.05)
    time.current += step
    group.current.position.y = Math.sin(time.current * 0.45) * 0.07
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      0.35 + (interactive ? y.get() * 0.3 : 0),
      3,
      step,
    )
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      -0.3 + (interactive ? x.get() * 0.4 : 0),
      3,
      step,
    )
    group.current.rotation.z = Math.sin(time.current * 0.14) * 0.12
  })
  return (
    <group ref={group} rotation={[0.35, -0.3, 0]}>
      <mesh rotation={[0, 0, -0.45]} scale={[1, 1.12, 1]}>
        <torusGeometry args={[1.12, 0.15, compact ? 12 : 20, compact ? 64 : 112]} />
        <meshPhysicalMaterial
          color="#2499d4"
          metalness={0.65}
          roughness={0.24}
          clearcoat={1}
          clearcoatRoughness={0.18}
        />
      </mesh>
      <mesh rotation={[0.75, -0.6, 0.3]}>
        <torusGeometry args={[1.52, 0.012, 6, compact ? 64 : 96]} />
        <meshStandardMaterial color="#75d9ed" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh rotation={[-0.5, 0.65, -0.4]}>
        <torusGeometry args={[1.42, 0.008, 6, 64]} />
        <meshStandardMaterial color="#377bb8" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[1.22, 0.68, 0.3]}>
        <sphereGeometry args={[0.085, 16, 12]} />
        <meshStandardMaterial color="#b0eef5" metalness={0.45} roughness={0.2} />
      </mesh>
      <mesh position={[-1.15, -0.72, 0.2]}>
        <sphereGeometry args={[0.055, 12, 8]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.55} roughness={0.25} />
      </mesh>
    </group>
  )
}
