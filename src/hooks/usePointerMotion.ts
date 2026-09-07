"use client"

import { useEffect, useRef, type PointerEvent } from "react"
import { useMotionValue, useSpring } from "framer-motion"
import { useMotionPreferences } from "@/components/animations/MotionProvider"
import { pointerSpring } from "@/components/animations/tokens"

// Shared normalized coordinates; no React renders on pointer movement.
export function usePointerMotion<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const bounds = useRef<DOMRect | null>(null)
  const { canHover } = useMotionPreferences()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, pointerSpring)
  const springY = useSpring(y, pointerSpring)
  const reset = () => {
    x.set(0)
    y.set(0)
    bounds.current = null
  }
  useEffect(() => {
    if (!canHover) {
      x.set(0)
      y.set(0)
      springX.jump(0)
      springY.jump(0)
    }
  }, [canHover, x, y, springX, springY])
  return {
    ref,
    x: springX,
    y: springY,
    canHover,
    events: {
      onPointerEnter: () => {
        bounds.current = ref.current?.getBoundingClientRect() ?? null
      },
      onPointerMove: (event: PointerEvent<T>) => {
        if (!canHover || event.pointerType !== "mouse") return
        const rect = bounds.current ?? event.currentTarget.getBoundingClientRect()
        x.set(Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5)))
        y.set(Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5)))
      },
      onPointerLeave: reset,
      onPointerCancel: reset,
      onBlur: reset,
    },
  }
}
