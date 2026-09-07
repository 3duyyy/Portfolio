"use client"

import { m, useInView, useScroll } from "framer-motion"
import { useRef } from "react"
import { experiences } from "@/data/experiences"
import type { Experience } from "@/types"
import FadeIn from "@/components/animations/FadeIn"
import { useMotionPreferences } from "@/components/animations/MotionProvider"

export default function ExperienceSection() {
  const timeline = useRef<HTMLDivElement>(null)
  const { canAnimate } = useMotionPreferences()
  const { scrollYProgress } = useScroll({ target: timeline, offset: ["start 75%", "end 55%"] })
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="section-divider absolute inset-x-0 top-0 h-px" />
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-sm tracking-[0.3em] text-sky-400 uppercase">Timeline</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Kinh nghiệm & học tập</h2>
        </FadeIn>
        <div ref={timeline} className="relative mt-14 ml-3 border-l border-white/10 pl-8 sm:ml-6 sm:pl-12">
          <m.div
            aria-hidden
            className="timeline-progress absolute -left-px top-0 bottom-0 w-px origin-top bg-gradient-to-b from-sky-400 via-cyan-300 to-sky-400/20"
            style={{ scaleY: canAnimate ? scrollYProgress : 1 }}
          />
          {experiences.map((experience) => (
            <ExperienceItem key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ExperienceItem({ experience }: { experience: Experience }) {
  const ref = useRef<HTMLDivElement>(null)
  const active = useInView(ref, { margin: "-15% 0px -35% 0px" })
  return (
    <div ref={ref} data-active={active} className="timeline-item relative mb-12 last:mb-0">
      <span
        aria-hidden
        className="absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center sm:-left-[53px]"
      >
        <span className="timeline-dot relative h-3 w-3 rounded-full bg-zinc-600 ring-4 ring-zinc-950" />
      </span>
      <FadeIn y={16}>
        <p className="text-xs tracking-widest text-sky-400 uppercase">{experience.period}</p>
        <h3 className="mt-2 text-xl font-semibold text-zinc-100">{experience.role}</h3>
        <p className="timeline-company mt-1 text-sm font-medium text-zinc-400">{experience.company}</p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">{experience.description}</p>
      </FadeIn>
    </div>
  )
}
