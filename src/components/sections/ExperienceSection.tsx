"use client"
import { motion } from "framer-motion"
import { experiences } from "@/data/experiences"
import FadeIn from "@/components/animations/FadeIn"

export default function ExperienceSection() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="section-divider absolute inset-x-0 top-0 h-px" />
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-sm tracking-[0.3em] text-sky-400 uppercase">Timeline</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Kinh nghiệm & học tập</h2>
        </FadeIn>

        <div className="relative mt-14 ml-3 border-l border-white/10 pl-8 sm:ml-6 sm:pl-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
              className="relative mb-12 last:mb-0"
            >
              <span className="absolute -left-[42px] flex h-4 w-4 items-center justify-center sm:-left-[54px]">
                <span className="absolute h-4 w-4 animate-ping rounded-full bg-sky-400/40" />
                <span className="relative h-3 w-3 rounded-full bg-sky-400 ring-4 ring-zinc-950" />
              </span>

              <p className="text-xs tracking-widest text-sky-400 uppercase">{exp.period}</p>
              <h3 className="mt-2 text-xl font-semibold text-zinc-100">{exp.role}</h3>
              <p className="mt-1 text-sm font-medium text-zinc-400">{exp.company}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
