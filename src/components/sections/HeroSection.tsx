"use client"
import { motion } from "framer-motion"
import { FiArrowDown, FiGithub } from "react-icons/fi"
import { useTypingEffect } from "@/hooks/useTypingEffect"
import { profile } from "@/data/profile"

export default function HeroSection() {
  const typed = useTypingEffect(profile.roles, 70, 1400)

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="container mx-auto grid grid-cols-1 gap-10 px-6 py-24 lg:grid-cols-12 lg:px-12">
        {/* Left: text */}
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-widest text-sky-300 uppercase">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
            Available for collaboration
          </span>

          <h1 className="mt-6 text-4xl leading-tight font-bold sm:text-5xl lg:text-7xl">
            Xin chào, mình là{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              {profile.name}
            </span>
          </h1>

          <p className="mt-6 h-8 text-xl font-medium text-zinc-300 sm:text-2xl">
            {typed}
            <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-sky-400 align-middle" />
          </p>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            {profile.tagline} Hiện đang là Frontend Developer tại <span className="text-zinc-200">VNPT-IT</span> và đã có{" "}
            <span className="text-zinc-200">1 năm kinh nghiệm</span> làm việc.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-sky-400"
            >
              Xem dự án
              <FiArrowDown className="transition group-hover:translate-y-0.5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-6 py-3 font-semibold text-zinc-100 transition hover:border-white/30 hover:bg-white/5"
            >
              <FiGithub /> GitHub
            </a>
          </div>
        </motion.div>

        {/* Right: lucky number card (Chelsea easter egg) */}
        <motion.div
          className="relative lg:col-span-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative mx-auto aspect-square max-w-sm rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-1 shadow-2xl">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-3xl bg-zinc-950/80 p-8">
              <div
                className="text-[10rem] leading-none font-black text-transparent"
                style={{ WebkitTextStroke: "2px rgb(56 189 248)" }}
              >
                {profile.luckyNumber}
              </div>
              <p className="mt-4 text-sm tracking-[0.3em] text-zinc-500 uppercase">Keep The Blue Flag Flying High</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
