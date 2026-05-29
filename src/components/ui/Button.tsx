import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes, ReactNode } from "react"

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline"
  children: ReactNode
}

export default function Button({ variant = "primary", className, children, ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary"
          ? "bg-sky-500 text-zinc-950 hover:bg-sky-400"
          : "border border-white/10 text-zinc-100 hover:border-white/30 hover:bg-white/5",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
