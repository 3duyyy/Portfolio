import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/ui/Navbar"
import Footer from "@/components/ui/Footer"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nguyễn Ba Duy — FullStack Developer",
  description:
    "Portfolio cá nhân của Nguyễn Ba Duy — FullStack Developer (Next.js, Vue, Node.js / Express). Frontend Developer tại VNPT-IT, làm việc với Micro-Frontend Architecture và Vue 3.",
  keywords: ["Nguyễn Ba Duy", "Portfolio", "FullStack Developer", "Next.js", "Vue", "Express", "VNPT-IT", "HaUI"],
  authors: [{ name: "Nguyễn Ba Duy" }],
  openGraph: {
    title: "Nguyễn Ba Duy — FullStack Developer",
    description: "Personal portfolio & projects showcase.",
    type: "website",
    locale: "vi_VN",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="relative flex min-h-full flex-col antialiased">
        {/* Global decorative backdrop — shared by every section */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          {/* Subtle grid with radial fade */}
          <div className="bg-grid bg-grid-mask absolute inset-0 opacity-60" />
          {/* Ambient glow blobs */}
          <div className="absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-sky-500/15 blur-3xl" />
          <div className="absolute top-1/3 -right-40 h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-emerald-500/10 blur-3xl" />
          {/* Bottom vignette to soften footer transition */}
          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>

        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
