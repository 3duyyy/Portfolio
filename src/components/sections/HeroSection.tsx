import { FiArrowDown, FiGithub } from "react-icons/fi"
import { profile } from "@/data/profile"
import FadeIn from "@/components/animations/FadeIn"
import TextReveal from "@/components/animations/TextReveal"
import MagneticLink from "@/components/animations/MagneticLink"
import Parallax from "@/components/animations/Parallax"
import HeroVisual from "@/components/three/HeroVisual"
import HeroRole from "@/components/ui/HeroRole"

export default function HeroSection() {
  return (
    <section id="hero" className="hero-section relative flex min-h-svh items-center overflow-hidden">
      <div
        aria-hidden
        className="hero-ambient pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl"
      />
      <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-6 py-24 lg:grid-cols-12 lg:px-12">
        <div className="min-w-0 lg:col-span-7">
          <FadeIn y={12}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-widest text-sky-300 uppercase">
              <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf860]" />
              Available for collaboration
            </span>
          </FadeIn>
          <h1 className="mt-6 text-4xl leading-tight font-bold sm:text-5xl lg:text-7xl">
            <TextReveal text="Xin chào, mình là" delay={0.08} />{" "}
            <TextReveal
              text={profile.name}
              delay={0.2}
              className="hero-name bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent"
            />
          </h1>
          <FadeIn delay={0.25} y={12}>
            <HeroRole />
          </FadeIn>
          <FadeIn delay={0.32} y={16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
              {profile.tagline} Hiện đang là Frontend Developer tại <span className="text-zinc-200">VNPT-IT</span> và đã
              có <span className="text-zinc-200">1 năm kinh nghiệm</span> làm việc.
            </p>
          </FadeIn>
          <FadeIn delay={0.4} y={16} className="mt-10 flex flex-wrap gap-4">
            <MagneticLink
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 font-semibold text-zinc-950 transition-colors hover:bg-sky-400"
            >
              Xem dự án <FiArrowDown className="action-icon" />
            </MagneticLink>
            <MagneticLink
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 font-semibold text-zinc-100 transition-colors hover:border-white/30 hover:bg-white/5"
            >
              <FiGithub className="action-icon" /> GitHub
            </MagneticLink>
          </FadeIn>
        </div>
        <FadeIn delay={0.22} y={20} className="min-w-0 lg:col-span-5">
          <Parallax>
            <HeroVisual />
          </Parallax>
        </FadeIn>
      </div>
    </section>
  )
}
