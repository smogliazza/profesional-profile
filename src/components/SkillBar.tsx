import { useRef } from 'react'
import { cn } from '../lib/cn'
import { useInView } from './Reveal'

interface SkillBarProps {
  level: number
  className?: string
  barClassName?: string
  label?: string
}

/** Progress bar that fills up when it scrolls into view. */
export function SkillBar({ level, className, barClassName, label }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref)
  const value = Math.max(0, Math.min(100, level))

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-1.5 overflow-hidden rounded-full bg-line', className)}
    >
      <div
        className={cn('h-full rounded-full bg-primary transition-[width] duration-1000 ease-out', barClassName)}
        style={{ width: visible ? `${value}%` : '0%' }}
      />
    </div>
  )
}
