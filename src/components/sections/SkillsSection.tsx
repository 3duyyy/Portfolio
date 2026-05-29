"use client"
import { motion } from "framer-motion"
import * as SiIcons from "react-icons/si"
import * as DiIcons from "react-icons/di"
import type { IconType } from "react-icons"
import { skills } from "@/data/skills"
import FadeIn from "@/components/animations/FadeIn"

const iconLib = { ...SiIcons, ...DiIcons } as unknown as Record<string, IconType>

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="section-divider absolute inset-x-0 top-0 h-px" />
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-sm tracking-[0.3em] text-sky-400 uppercase">Tech stack</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Công nghệ sử dụng</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">
            Bộ công cụ chính mình sử dụng hàng ngày trong công việc và các dự án cá nhân.
          </p>
        </FadeIn>

        <motion.div
          className="mt-14 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {skills.map((skill) => {
            const Icon = iconLib[skill.icon]
            return (
              <motion.div
                key={skill.name}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur transition hover:border-sky-400/40"
              >
                {Icon ? (
                  <Icon size={36} style={{ color: skill.color }} className="transition group-hover:scale-110" />
                ) : (
                  <div className="h-9 w-9 rounded bg-zinc-700" />
                )}
                <span className="text-xs font-medium text-zinc-300">{skill.name}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
