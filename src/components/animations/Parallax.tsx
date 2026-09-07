"use client"

import { m, useScroll, useTransform } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { useMotionPreferences } from "./MotionProvider"

export default function Parallax({
  children,
  className,
  distance = 36,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { canHover } = useMotionPreferences()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, distance])
  return (
    <div ref={ref} className={className}>
      <m.div style={{ y: canHover ? y : 0 }}>{children}</m.div>
    </div>
  )
}
