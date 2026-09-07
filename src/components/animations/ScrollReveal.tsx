"use client"
import { m } from "framer-motion"
import type { ReactNode } from "react"
import { useMotionPreferences } from "./MotionProvider"
import { itemVariants, revealViewport } from "./tokens"
import { cn } from "@/lib/utils"

interface Props {
  children: ReactNode
  className?: string
  stagger?: number
}

export { itemVariants } from "./tokens"

export default function ScrollReveal({ children, className, stagger = 0.1 }: Props) {
  const { canAnimate } = useMotionPreferences()
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: canAnimate ? stagger : 0 } },
      }}
    >
      {children}
    </m.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const { canAnimate } = useMotionPreferences()
  return (
    <m.div
      className={cn("motion-reveal", className)}
      variants={
        canAnimate ? itemVariants : { hidden: { opacity: 1 }, visible: { opacity: 1, transition: { duration: 0 } } }
      }
    >
      {children}
    </m.div>
  )
}
