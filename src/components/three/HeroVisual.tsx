"use client"

import dynamic from "next/dynamic"
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { m, useInView, useTransform } from "framer-motion"
import { FiPause, FiPlay } from "react-icons/fi"
import { useMotionPreferences } from "@/components/animations/MotionProvider"
import { usePointerMotion } from "@/hooks/usePointerMotion"
import { useMediaQuery, usePageVisible } from "@/hooks/useMediaQuery"
import { profile } from "@/data/profile"

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false })

class SceneBoundary extends Component<{ children: ReactNode; onUnavailable: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onUnavailable()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export default function HeroVisual() {
  const { ref, x, y, events, canHover } = usePointerMotion<HTMLDivElement>()
  const sceneRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sceneRef, { margin: "80px" })
  const visible = usePageVisible()
  const compact = useMediaQuery("(max-width: 767px)", true)
  const { canAnimate, paused, reducedMotion, togglePaused } = useMotionPreferences()
  const [eligible, setEligible] = useState(false)
  const [ready, setReady] = useState(false)
  const [unavailable, setUnavailable] = useState(false)
  const onReady = useCallback(() => setReady(true), [])
  const onUnavailable = useCallback(() => {
    setUnavailable(true)
    setReady(false)
  }, [])
  const numberX = useTransform(x, (value) => value * 8)
  const numberY = useTransform(y, (value) => value * 8)

  useEffect(() => {
    if (!canAnimate || !inView || !visible || eligible) return
    const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
    if (
      device.connection?.saveData ||
      (device.deviceMemory && device.deviceMemory < 4) ||
      (device.hardwareConcurrency && device.hardwareConcurrency < 4)
    )
      return
    // Let text paint before downloading the isolated WebGL chunk.
    if ("requestIdleCallback" in window) {
      const idle = window.requestIdleCallback(() => setEligible(true), { timeout: 1800 })
      return () => window.cancelIdleCallback(idle)
    }
    const timer = setTimeout(() => setEligible(true), 700)
    return () => clearTimeout(timer)
  }, [canAnimate, inView, visible, eligible])

  return (
    <div
      ref={ref}
      {...events}
      className="hero-visual relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 shadow-2xl"
    >
      <div aria-hidden className="hero-card-grid absolute inset-0 opacity-40" />
      <div ref={sceneRef} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 bottom-10">
        <div className="orb-fallback absolute inset-0" data-scene-ready={ready && !reducedMotion}>
          <span />
          <span />
          <span />
        </div>
        {eligible && !unavailable && !reducedMotion && (
          <SceneBoundary onUnavailable={onUnavailable}>
            <HeroScene
              active={canAnimate && visible && inView}
              compact={compact}
              interactive={canHover}
              x={x}
              y={y}
              onReady={onReady}
              onUnavailable={onUnavailable}
            />
          </SceneBoundary>
        )}
      </div>
      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-5 pb-10">
        <m.div
          className="hero-number text-[10rem] leading-none font-black text-transparent"
          style={{ x: canHover ? numberX : 0, y: canHover ? numberY : 0, WebkitTextStroke: "2px rgb(125 211 252)" }}
        >
          {profile.luckyNumber}
        </m.div>
      </div>
      <p className="absolute inset-x-5 bottom-8 z-10 text-center text-xs leading-relaxed tracking-[0.24em] text-zinc-400 uppercase">
        Keep The Blue Flag Flying High
      </p>
      {!reducedMotion && (
        <button
          type="button"
          onClick={togglePaused}
          aria-label={paused ? "Bật chuyển động" : "Tạm dừng chuyển động"}
          aria-pressed={paused}
          title={paused ? "Bật chuyển động" : "Tạm dừng chuyển động"}
          className="absolute top-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-950/70 text-zinc-400 transition-colors hover:text-sky-300"
        >
          {paused ? <FiPlay size={14} /> : <FiPause size={14} />}
        </button>
      )}
    </div>
  )
}
