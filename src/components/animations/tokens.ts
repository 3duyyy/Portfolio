import type { Variants } from "framer-motion"

export const ease = [0.22, 1, 0.36, 1] as const
export const duration = { reveal: 0.65, short: 0.35 }
export const pointerSpring = { stiffness: 150, damping: 24, mass: 0.5 }
export const revealViewport = { once: true, margin: "0px 0px -48px 0px" } as const
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease } },
}
