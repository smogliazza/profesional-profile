import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ElementType, ReactNode, RefObject } from 'react'
import { cn } from '../lib/cn'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  /** Delay in ms, useful to stagger items in a list. */
  delay?: number
  className?: string
  id?: string
}

/** Fades + slides its content in the first time it scrolls into view. */
export function Reveal({ children, as: Tag = 'div', delay = 0, className, id }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}

/** Becomes true once the element enters the viewport (and stays true). */
export function useInView(ref: RefObject<HTMLElement | null>, rootMargin = '0px 0px -8% 0px') {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    // No animations (config or "reduce motion"): show everything right away
    if (document.documentElement.dataset.motion === 'off' || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, rootMargin, visible])

  return visible
}
