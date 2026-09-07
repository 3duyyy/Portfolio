import Counter from "@/components/animations/Counter"
import ScrollReveal, { StaggerItem } from "@/components/animations/ScrollReveal"
import FadeIn from "@/components/animations/FadeIn"
import { FiBookOpen, FiBriefcase, FiHeart } from "react-icons/fi"

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="section-divider absolute inset-x-0 top-0 h-px" />
      <div className="container mx-auto grid grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-12">
        <FadeIn className="lg:col-span-7">
          <p className="text-sm tracking-[0.3em] text-sky-400 uppercase">About me</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl">Hành trình của mình</h2>
          <FadeIn delay={0.12} className="mt-6 space-y-4 text-base leading-relaxed text-zinc-400 sm:text-lg">
            <p>
              Mình là <span className="text-zinc-100">Nguyễn Ba Duy</span> — Tốt nghiệp cử nhân ngành Công nghệ thông
              tin tại <span className="text-zinc-100">Đại học Công nghiệp Hà Nội (HaUI)</span> bằng giỏi với{" "}
              <span className="text-zinc-100">
                GPA: <Counter value={3.25} decimals={2} />
              </span>
              . Đam mê của mình là xây dựng các sản phẩm web có trải nghiệm người dùng tốt và hiệu năng cao.
            </p>
            <p>
              Hiện tại mình đang làm Frontend Developer tại <span className="text-zinc-100">VNPT-IT</span>, làm việc
              chính với <span className="text-sky-300">Micro-frontend Architecture và Vue 3</span>. Bên cạnh đó, mình đã
              có kinh nghiệm làm việc với <span className="text-sky-300">Node.js / Express</span> ở backend, với DB là{" "}
              <span className="text-sky-300">MongoDB, MySQL, SQL Server</span>.
            </p>
            <p>
              Môi trường phát triển ưa thích: <span className="text-zinc-100">Ubuntu</span> + Docker. Mình tin rằng code
              đẹp và sản phẩm tốt đến từ sự kiên trì và học hỏi mỗi ngày.
            </p>
          </FadeIn>
        </FadeIn>

        <ScrollReveal className="lg:col-span-5" stagger={0.1}>
          <div className="grid gap-4">
            <StaggerItem>
              <InfoCard
                icon={<FiBookOpen />}
                title="Học tập"
                text="Đại học Công nghiệp Hà Nội (HaUI) — Công nghệ thông tin"
              />
            </StaggerItem>
            <StaggerItem>
              <InfoCard icon={<FiBriefcase />} title="Công việc" text="Frontend Developer at VNPT-IT" />
            </StaggerItem>
            <StaggerItem>
              <InfoCard icon={<FiHeart />} title="Sở thích" text="Tập Gym 💪 · Bóng đá ⚽ · Cầu lông 🏸" />
            </StaggerItem>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function InfoCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="depth-card flex items-start gap-4 rounded-2xl border border-white/10 bg-zinc-900/50 p-5 backdrop-blur transition hover:border-sky-400/30">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
        {icon}
      </div>
      <div>
        <p className="text-xs tracking-widest text-zinc-500 uppercase">{title}</p>
        <p className="mt-1 text-[15px] text-zinc-200">{text}</p>
      </div>
    </div>
  )
}
