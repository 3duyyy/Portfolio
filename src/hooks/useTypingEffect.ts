"use client"
import { useEffect, useRef, useState } from "react"

export function useTypingEffect(words: string[], speed = 80, pause = 1500, enabled = true) {
  const [text, setText] = useState(words[0] ?? "")
  const wordIdxRef = useRef(0)
  const charIdxRef = useRef(Array.from(words[0] ?? "").length)
  const deletingRef = useRef(true)

  useEffect(() => {
    if (!words.length || !enabled) return

    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      const current = words[wordIdxRef.current % words.length]
      // Tách theo code point để emoji (surrogate pair) không bị cắt nửa chừng.
      const chars = Array.from(current)

      if (!deletingRef.current) {
        charIdxRef.current += 1
        setText(chars.slice(0, charIdxRef.current).join(""))

        if (charIdxRef.current >= chars.length) {
          deletingRef.current = true
          timer = setTimeout(tick, pause)
          return
        }
        timer = setTimeout(tick, speed)
      } else {
        charIdxRef.current -= 1
        setText(chars.slice(0, Math.max(charIdxRef.current, 0)).join(""))

        if (charIdxRef.current <= 0) {
          deletingRef.current = false
          wordIdxRef.current = (wordIdxRef.current + 1) % words.length
          timer = setTimeout(tick, speed)
          return
        }
        timer = setTimeout(tick, speed / 2)
      }
    }

    timer = setTimeout(tick, pause)
    return () => clearTimeout(timer)
  }, [words, speed, pause, enabled])

  return text
}
