import { cn } from "@/lib/utils"
import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => (
  <div className="flex flex-col gap-2">
    {label && <label className="text-sm font-medium text-zinc-300">{label}</label>}
    <input
      ref={ref}
      className={cn(
        "rounded-lg border border-white/10 bg-zinc-900/50 px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20",
        error && "border-red-500/60",
        className,
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
))
Input.displayName = "Input"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, error, className, ...props }, ref) => (
  <div className="flex flex-col gap-2">
    {label && <label className="text-sm font-medium text-zinc-300">{label}</label>}
    <textarea
      ref={ref}
      className={cn(
        "min-h-[140px] resize-y rounded-lg border border-white/10 bg-zinc-900/50 px-4 py-3 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-sky-400/60 focus:ring-2 focus:ring-sky-400/20",
        error && "border-red-500/60",
        className,
      )}
      {...props}
    />
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
))
Textarea.displayName = "Textarea"
