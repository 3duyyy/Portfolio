import ScrollReveal, { StaggerItem } from "@/components/animations/ScrollReveal"
import TiltCard from "@/components/animations/TiltCard"
import Image from "next/image"
import { FiExternalLink, FiGithub } from "react-icons/fi"
import { projects } from "@/data/projects"
import FadeIn from "@/components/animations/FadeIn"

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="section-divider absolute inset-x-0 top-0 h-px" />
      <div className="container mx-auto px-6 lg:px-12">
        <FadeIn>
          <p className="text-sm tracking-[0.3em] text-sky-400 uppercase">Selected work</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Dự án nổi bật</h2>
          <FadeIn delay={0.12} y={12}>
            <p className="mt-4 max-w-2xl text-zinc-400">
              Một vài sản phẩm mình tâm đắc nhất — từ đồ án tốt nghiệp tới sản phẩm thương mại.
            </p>
          </FadeIn>
        </FadeIn>

        <ScrollReveal className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
          {projects.map((p) => (
            <StaggerItem key={p.id} className="h-full">
              <TiltCard className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 transition-colors hover:border-sky-400/50">
                {/* Preview / placeholder */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                  {p.image ? (
                    <>
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="project-image object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-7xl font-black text-white/5 transition group-hover:scale-110">
                      {p.title.charAt(0)}
                    </div>
                  )}
                  {p.highlight && (
                    <span className="absolute top-4 left-4 rounded-full bg-sky-500/90 px-3 py-1 text-xs font-semibold text-zinc-950">
                      Featured
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs tracking-widest text-sky-400 uppercase">{p.subtitle}</p>
                  <h3 className="mt-2 text-xl font-bold text-zinc-100">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">{p.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((tech, index) => (
                      <span
                        key={`${tech}-${index}`}
                        className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-4 border-t border-white/5 pt-4">
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="animated-link group/link inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-zinc-300 transition hover:text-sky-400"
                    >
                      <FiExternalLink className="action-icon" /> Demo
                    </a>
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="animated-link group/link inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-zinc-300 transition hover:text-sky-400"
                    >
                      <FiGithub className="action-icon" /> Source
                    </a>
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </ScrollReveal>
      </div>
    </section>
  )
}
