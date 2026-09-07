"use client"

import { m, useMotionTemplate, useTransform, type MotionStyle } from "framer-motion"
import type { ReactNode } from "react"
import { usePointerMotion } from "@/hooks/usePointerMotion"
import { cn } from "@/lib/utils"

export default function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const { ref, x, y, events, canHover } = usePointerMotion<HTMLElement>()
  const rotateX = useTransform(y, (value) => value * -5)
  const rotateY = useTransform(x, (value) => value * 5)
  const glowX = useTransform(x, (value) => (value + 0.5) * 100)
  const glowY = useTransform(y, (value) => (value + 0.5) * 100)
  const imageX = useTransform(x, (value) => `${value * -10}px`)
  const imageY = useTransform(y, (value) => `${value * -10}px`)
  const background = useMotionTemplate`radial-gradient(320px circle at ${glowX}% ${glowY}%, rgb(56 189 248 / 0.10), transparent 80%)`
  return (
    <m.article
      ref={ref}
      {...events}
      className={cn("tilt-card group relative", className)}
      style={
        {
          transformPerspective: 1000,
          rotateX: canHover ? rotateX : 0,
          rotateY: canHover ? rotateY : 0,
          "--image-x": imageX,
          "--image-y": imageY,
        } as MotionStyle
      }
    >
      {children}
      <m.div
        aria-hidden
        className="card-spotlight pointer-events-none absolute inset-0 rounded-[inherit] opacity-0"
        style={{ background }}
      />
    </m.article>
  )
}
