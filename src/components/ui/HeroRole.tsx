"use client"

import { useRef } from "react"
import { useInView } from "framer-motion"
import { useTypingEffect } from "@/hooks/useTypingEffect"
import { usePageVisible } from "@/hooks/useMediaQuery"
import { useMotionPreferences } from "@/components/animations/MotionProvider"
import { profile } from "@/data/profile"

export default function HeroRole() {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref)
  const visible = usePageVisible()
  const { canAnimate } = useMotionPreferences()
  const typed = useTypingEffect(profile.roles, 70, 1400, canAnimate && inView && visible)
  return (
    <p ref={ref} className="relative mt-6 min-h-14 text-xl font-medium text-zinc-300 sm:min-h-8 sm:text-2xl">
      <span className="sr-only">{profile.roles.join(" · ")}</span>
      <span aria-hidden>
        {canAnimate ? typed : profile.roles[0]}
        <span className="typing-caret ml-1 inline-block h-6 w-[2px] bg-sky-400 align-middle" />
      </span>
    </p>
  )
}
