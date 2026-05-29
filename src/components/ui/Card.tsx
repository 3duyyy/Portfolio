import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export default function Card({ className, children, ...props }: Props) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur", className)} {...props}>
      {children}
    </div>
  )
}
