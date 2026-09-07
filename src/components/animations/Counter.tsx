"use client"

import { animate, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import { useMotionPreferences } from "./MotionProvider"
import { ease } from "./tokens"

export default function Counter({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const { canAnimate } = useMotionPreferences()
  useEffect(() => {
    if (!inView || !canAnimate) return
    const node = ref.current
    const animation = animate(0, value, {
      duration: 1.1,
      ease,
      onUpdate: (latest) => {
        if (node) node.textContent = latest.toFixed(decimals)
      },
    })
    return () => {
      animation.stop()
      if (node) node.textContent = value.toFixed(decimals)
    }
  }, [inView, canAnimate, value, decimals])
  return (
    <span className="inline-block tabular-nums">
      <span className="sr-only">{value.toFixed(decimals)}</span>
      <span ref={ref} aria-hidden>
        {value.toFixed(decimals)}
      </span>
    </span>
  )
}
