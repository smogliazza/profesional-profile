import { cn } from '../lib/cn'

interface TagsProps {
  items?: string[]
  className?: string
  tagClassName?: string
  /** Text before each tag, e.g. "#" in the terminal style. */
  prefix?: string
}

export function Tags({ items, className, tagClassName, prefix }: TagsProps) {
  if (!items?.length) return null
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li key={item} className={tagClassName}>
          {prefix}
          {item}
        </li>
      ))}
    </ul>
  )
}
