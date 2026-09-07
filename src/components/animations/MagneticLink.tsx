"use client"

import { m, useTransform } from "framer-motion"
import type { ComponentPropsWithoutRef } from "react"
import { usePointerMotion } from "@/hooks/usePointerMotion"
import { cn } from "@/lib/utils"

type Props = Omit<ComponentPropsWithoutRef<"a">, "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart">

export default function MagneticLink({ children, className, ...props }: Props) {
  const { ref, x, y, events, canHover } = usePointerMotion<HTMLAnchorElement>()
  const moveX = useTransform(x, (value) => value * 12)
  const moveY = useTransform(y, (value) => value * 10)
  return (
    <m.a
      {...props}
      {...events}
      ref={ref}
      className={cn("magnetic-link", className)}
      style={{ x: canHover ? moveX : 0, y: canHover ? moveY : 0 }}
    >
      {children}
    </m.a>
  )
}
