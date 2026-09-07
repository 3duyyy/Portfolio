"use client"
import { m } from "framer-motion"
import type { ReactNode } from "react"
import { useMotionPreferences } from "./MotionProvider"
import { duration, ease, revealViewport } from "./tokens"
import { cn } from "@/lib/utils"

interface Props {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

export default function FadeIn({ children, delay = 0, y = 24, className }: Props) {
  const { canAnimate } = useMotionPreferences()
  return (
    <m.div
      className={cn("motion-reveal", className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: canAnimate ? duration.reveal : 0, delay: canAnimate ? delay : 0, ease }}
    >
      {children}
    </m.div>
  )
}
