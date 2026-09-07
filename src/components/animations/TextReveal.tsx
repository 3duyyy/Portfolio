"use client"

import { m } from "framer-motion"
import { useMotionPreferences } from "./MotionProvider"
import { duration, ease, revealViewport } from "./tokens"

export default function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  const { canAnimate } = useMotionPreferences()
  return (
    <span>
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        variants={{
          hidden: {},
          visible: { transition: { delayChildren: canAnimate ? delay : 0, staggerChildren: canAnimate ? 0.055 : 0 } },
        }}
      >
        {text.split(" ").map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
            <m.span
              className={`motion-reveal inline-block ${className ?? ""}`}
              variants={{
                hidden: { y: "110%" },
                visible: { y: 0, transition: { duration: canAnimate ? duration.reveal : 0, ease } },
              }}
            >
              {word}
            </m.span>
            {index < text.split(" ").length - 1 ? "\u00a0" : ""}
          </span>
        ))}
      </m.span>
    </span>
  )
}
