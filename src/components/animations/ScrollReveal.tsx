"use client"
import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
  stagger?: number
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export default function ScrollReveal({ children, className, stagger = 0.1 }: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

export { container }
