"use client"

import { useEffect, useState } from "react"

const sectionIds = ["hero", "about", "skills", "experience", "projects", "contact"]

export function useActiveSection() {
  const [active, setActive] = useState("hero")
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    let frame = 0
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))
    const update = () => {
      frame = 0
      setScrolled(window.scrollY > 20)
      const marker = window.innerHeight * 0.36
      let current = sections[0]?.id ?? "hero"
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) current = section.id
      }
      if (window.scrollY > 20 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4)
        current = sections.at(-1)?.id ?? current
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])
  return { active, scrolled }
}
