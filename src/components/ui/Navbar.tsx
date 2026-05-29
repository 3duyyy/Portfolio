"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { profile } from "@/data/profile"

const NAV_ITEMS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-white/10 bg-zinc-950/70 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-6 lg:px-12">
        <Link href="#hero" className="text-lg font-bold tracking-tight text-zinc-100">
          <span className="text-sky-400">{"<"}</span>
          {profile.shortName}
          <span className="text-sky-400">{" />"}</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-[15px] font-medium text-zinc-400 transition hover:text-sky-400">
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile burger */}
        <button aria-label="Toggle menu" aria-expanded={open} className="md:hidden" onClick={() => setOpen((v) => !v)}>
          <div className="flex flex-col gap-1.5">
            <span className={cn("block h-0.5 w-6 bg-zinc-100 transition", open && "translate-y-2 rotate-45")} />
            <span className={cn("block h-0.5 w-6 bg-zinc-100 transition", open && "opacity-0")} />
            <span className={cn("block h-0.5 w-6 bg-zinc-100 transition", open && "-translate-y-2 -rotate-45")} />
          </div>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <ul className="flex flex-col gap-2 border-t border-white/10 bg-zinc-950/95 px-6 py-4 md:hidden">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-zinc-300 hover:text-sky-400"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
