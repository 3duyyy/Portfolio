import {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiNuxt,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPrisma,
  SiDocker,
  SiGit,
  SiUbuntu,
  SiWordpress,
} from "react-icons/si"
import { DiMsqlServer } from "react-icons/di"
import ScrollReveal, { StaggerItem } from "@/components/animations/ScrollReveal"
import type { IconType } from "react-icons"
import { skills } from "@/data/skills"
import FadeIn from "@/components/animations/FadeIn"

const iconLib: Record<string, IconType> = {
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiNuxt,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  DiMsqlServer,
  SiPrisma,
  SiDocker,
  SiGit,
  SiUbuntu,
  SiWordpress,
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="section-divider absolute inset-x-0 top-0 h-px" />
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-sm tracking-[0.3em] text-sky-400 uppercase">Tech stack</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Công nghệ sử dụng</h2>
          <FadeIn delay={0.12} y={12}>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Bộ công cụ chính mình sử dụng hàng ngày trong công việc và các dự án cá nhân.
            </p>
          </FadeIn>
        </FadeIn>

        <ScrollReveal className="mt-14 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6" stagger={0.035}>
          {skills.map((skill) => {
            const Icon = iconLib[skill.icon]
            return (
              <StaggerItem key={skill.name}>
                <div className="depth-card skill-card group flex h-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/50 px-2 py-6 sm:px-6 transition hover:border-sky-400/40">
                  {Icon ? (
                    <Icon size={36} style={{ color: skill.color }} className="skill-icon" />
                  ) : (
                    <div className="h-9 w-9 rounded bg-zinc-700" />
                  )}
                  <span className="text-xs font-medium text-zinc-300">{skill.name}</span>
                </div>
              </StaggerItem>
            )
          })}
        </ScrollReveal>
      </div>
    </section>
  )
}
