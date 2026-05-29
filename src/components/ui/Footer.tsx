import { FiGithub, FiLinkedin, FiFacebook, FiMail } from "react-icons/fi"
import { profile } from "@/data/profile"

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row lg:px-12">
        <p className="text-sm text-zinc-500">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js & ❤
        </p>
        <div className="flex items-center gap-4 text-zinc-400">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition hover:text-sky-400">
            <FiGithub size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-sky-400"
          >
            <FiLinkedin size={18} />
          </a>
          <a
            href={profile.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="transition hover:text-sky-400"
          >
            <FiFacebook size={18} />
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="transition hover:text-sky-400">
            <FiMail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
