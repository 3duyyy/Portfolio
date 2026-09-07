"use client"

import { useState, useEffect, useRef } from "react"
import { m } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { profile } from "@/data/profile"
import { useActiveSection } from "@/hooks/useActiveSection"
import { useMotionPreferences } from "@/components/animations/MotionProvider"
import { duration, ease } from "@/components/animations/tokens"

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const { active, scrolled } = useActiveSection()
  const { canAnimate } = useMotionPreferences()
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false)
    }
    const desktop = window.matchMedia("(min-width: 768px)")
    const onResize = () => {
      if (desktop.matches) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onPointer)
    desktop.addEventListener("change", onResize)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onPointer)
      desktop.removeEventListener("change", onResize)
    }
  }, [open])

  const closeAndFocus = (href: string) => {
    setOpen(false)
    const section = document.querySelector<HTMLElement>(href)
    section?.setAttribute("tabindex", "-1")
    section?.focus({ preventScroll: true })
  }

  return (
    <header
      ref={header}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled || open ? "border-white/10 bg-zinc-950/80 backdrop-blur-md" : "border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Điều hướng chính"
        className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-12"
      >
        <Link href="#hero" onClick={() => setOpen(false)} className="text-lg font-bold tracking-tight text-zinc-100">
          <span className="text-sky-400">{"<"}</span>
          {profile.shortName}
          <span className="text-sky-400">{" />"}</span>
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={active === item.href.slice(1) ? "location" : undefined}
                className="nav-link relative block py-2 text-[15px] font-medium text-zinc-400 transition-colors hover:text-sky-400"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          ref={toggle}
          type="button"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          <span aria-hidden className="flex flex-col gap-1.5">
            <span
              className={cn("block h-0.5 w-6 bg-zinc-100 transition-transform", open && "translate-y-2 rotate-45")}
            />
            <span className={cn("block h-0.5 w-6 bg-zinc-100 transition-opacity", open && "opacity-0")} />
            <span
              className={cn("block h-0.5 w-6 bg-zinc-100 transition-transform", open && "-translate-y-2 -rotate-45")}
            />
          </span>
        </button>
      </nav>
      <m.div
        id="mobile-navigation"
        inert={!open}
        aria-hidden={!open}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: canAnimate ? duration.short : 0, ease }}
        className="overflow-hidden md:hidden"
      >
        <ul className="mobile-nav-list flex flex-col gap-2 border-t border-white/10 bg-zinc-950/95 px-6 py-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => closeAndFocus(item.href)}
                aria-current={active === item.href.slice(1) ? "location" : undefined}
                className="nav-link relative inline-flex min-h-11 items-center py-2 text-sm font-medium text-zinc-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </m.div>
    </header>
  )
}
