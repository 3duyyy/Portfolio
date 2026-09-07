"use client"

import { Canvas, useThree } from "@react-three/fiber"
import { useEffect } from "react"
import type { MotionValue } from "framer-motion"
import FloatingObject from "./FloatingObject"
import SceneLights from "./SceneLights"

type Props = {
  active: boolean
  compact: boolean
  interactive: boolean
  x: MotionValue<number>
  y: MotionValue<number>
  onReady: () => void
  onUnavailable: () => void
}

function ContextLifecycle({ canvas, onUnavailable }: { canvas: HTMLCanvasElement; onUnavailable: () => void }) {
  useEffect(() => {
    const onLost = (event: Event) => {
      event.preventDefault()
      onUnavailable()
    }
    canvas.addEventListener("webglcontextlost", onLost)
    return () => canvas.removeEventListener("webglcontextlost", onLost)
  }, [canvas, onUnavailable])
  return null
}

export default function HeroScene({ active, compact, interactive, x, y, onReady, onUnavailable }: Props) {
  return (
    <Canvas
      aria-hidden
      tabIndex={-1}
      dpr={compact ? 1 : [1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 43 }}
      gl={{ alpha: true, antialias: !compact, powerPreference: "low-power" }}
      frameloop={active ? "always" : "never"}
      fallback={null}
      onCreated={onReady}
    >
      <SceneLights />
      <FloatingObject x={x} y={y} compact={compact} interactive={interactive} />
      <CanvasLifecycle onUnavailable={onUnavailable} />
    </Canvas>
  )
}

function CanvasLifecycle({ onUnavailable }: { onUnavailable: () => void }) {
  const canvas = useThree((state) => state.gl.domElement)
  return <ContextLifecycle canvas={canvas} onUnavailable={onUnavailable} />
}
