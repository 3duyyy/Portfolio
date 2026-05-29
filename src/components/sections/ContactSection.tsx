"use client"
import { motion } from "framer-motion"
import { FiMail, FiFacebook, FiSend, FiArrowUpRight, FiMapPin } from "react-icons/fi"
import { SiTelegram, SiZalo } from "react-icons/si"
import type { IconType } from "react-icons"
import FadeIn from "@/components/animations/FadeIn"
import { profile } from "@/data/profile"

type Channel = {
  id: string
  label: string
  value: string
  href: string
  icon: IconType
  accent: string // tailwind text color class
  ring: string // tailwind hover ring/border color class
  glow: string // tailwind gradient color class for blob
}

const channels: Channel[] = [
  {
    id: "gmail",
    label: "Gmail",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: FiMail,
    accent: "text-red-400",
    ring: "hover:border-red-400/50",
    glow: "from-red-500/20",
  },
  {
    id: "facebook",
    label: "Facebook",
    value: "Messenger / Profile",
    href: profile.facebook,
    icon: FiFacebook,
    accent: "text-sky-400",
    ring: "hover:border-sky-400/50",
    glow: "from-sky-500/20",
  },
  {
    id: "zalo",
    label: "Zalo",
    value: "Chat trực tiếp",
    href: profile.zalo,
    icon: SiZalo,
    accent: "text-blue-400",
    ring: "hover:border-blue-400/50",
    glow: "from-blue-500/20",
  },
  {
    id: "telegram",
    label: "Telegram",
    value: "Nhắn tin nhanh",
    href: profile.telegram,
    icon: SiTelegram,
    accent: "text-cyan-400",
    ring: "hover:border-cyan-400/50",
    glow: "from-cyan-500/20",
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div className="section-divider absolute inset-x-0 top-0 h-px" />
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="text-sm tracking-[0.3em] text-sky-400 uppercase">Get in touch</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Cùng kết nối nhé!</h2>
          <p className="mt-4 text-zinc-400">
            Muốn hợp tác, trao đổi công nghệ hay chỉ đơn giản là chào hỏi? Chọn kênh bạn thấy thuận tiện — mình sẽ phản hồi sớm
            nhất có thể.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-500">
            <FiMapPin className="text-sky-400" /> {profile.location}
          </p>
        </FadeIn>

        <motion.div
          className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {channels.map((c) => (
            <ChannelCard key={c.id} channel={c} />
          ))}
        </motion.div>

        <FadeIn delay={0.2} className="mx-auto mt-12 max-w-md text-center">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-zinc-200 transition hover:border-sky-400/40 hover:bg-sky-400/10 hover:text-sky-300"
          >
            <FiSend className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            Gửi email ngay
          </a>
        </FadeIn>
      </div>
    </section>
  )
}

function ChannelCard({ channel }: { channel: Channel }) {
  const Icon = channel.icon
  return (
    <motion.a
      href={channel.href}
      target="_blank"
      rel="noreferrer"
      aria-label={channel.label}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex items-center gap-5 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 p-5 backdrop-blur transition ${channel.ring}`}
    >
      {/* Hover gradient glow */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br ${channel.glow} via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100`}
      />

      <motion.div
        whileHover={{ rotate: -6, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-950/60 ${channel.accent}`}
      >
        <Icon size={26} />
      </motion.div>

      <div className="min-w-0 flex-1">
        <p className="text-xs tracking-widest text-zinc-500 uppercase">{channel.label}</p>
        <p className="mt-1 truncate text-sm font-medium text-zinc-100">{channel.value}</p>
      </div>

      <FiArrowUpRight
        className={`shrink-0 text-zinc-500 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${channel.accent.replace("text-", "group-hover:text-")}`}
        size={20}
      />
    </motion.a>
  )
}
