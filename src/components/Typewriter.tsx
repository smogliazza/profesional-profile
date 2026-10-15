import { useEffect, useState } from 'react'
import { cn } from '../lib/cn'

interface TypewriterProps {
  text: string
  /** ms per character */
  speed?: number
  startDelay?: number
  className?: string
  caretClassName?: string
}

/** Types the text one character at a time, with a blinking caret. */
export function Typewriter({ text, speed = 55, startDelay = 250, className, caretClassName }: TypewriterProps) {
  const [count, setCount] = useState(() => (motionOff() ? text.length : 0))

  useEffect(() => {
    if (motionOff()) {
      setCount(text.length)
      return
    }
    setCount(0)
    let i = 0
    let timer: number
    const tick = () => {
      i += 1
      setCount(i)
      if (i < text.length) timer = window.setTimeout(tick, speed)
    }
    timer = window.setTimeout(tick, startDelay)
    return () => window.clearTimeout(timer)
  }, [text, speed, startDelay])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      <span aria-hidden="true" className={cn('ml-0.5 inline-block w-[0.55em] animate-blink bg-current', caretClassName)}>
        &nbsp;
      </span>
    </span>
  )
}

const motionOff = () => document.documentElement.dataset.motion === 'off'
