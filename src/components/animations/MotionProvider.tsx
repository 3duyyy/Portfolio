"use client"

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion"
import { createContext, useContext, useState, type ReactNode } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { duration, ease } from "./tokens"

const MotionContext = createContext({
  canAnimate: false,
  canHover: false,
  paused: false,
  reducedMotion: true,
  togglePaused: () => {},
})

export function useMotionPreferences() {
  return useContext(MotionContext)
}

export default function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false)
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine) and (min-width: 768px)")
  const canAnimate = !reducedMotion && !paused
  return (
    <MotionContext.Provider
      value={{
        canAnimate,
        canHover: canAnimate && finePointer,
        paused,
        reducedMotion,
        togglePaused: () => setPaused((value) => !value),
      }}
    >
      <LazyMotion features={domAnimation} strict>
        <MotionConfig
          reducedMotion={canAnimate ? "never" : "always"}
          transition={{ duration: canAnimate ? duration.reveal : 0, ease }}
        >
          <div className="contents" data-motion={canAnimate ? "full" : "reduced"}>
            {children}
          </div>
        </MotionConfig>
      </LazyMotion>
    </MotionContext.Provider>
  )
}
