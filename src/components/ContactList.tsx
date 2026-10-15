import type { Basics } from '../types/profile'
import { cn, prettyUrl } from '../lib/cn'
import { Icon } from './Icon'

interface ContactListProps {
  basics: Basics
  className?: string
  itemClassName?: string
  iconClassName?: string
  /** Include location (not a link). */
  withLocation?: boolean
}

/** Email, phone, website and location as a list of icon + text links. */
export function ContactList({ basics, className, itemClassName, iconClassName, withLocation = true }: ContactListProps) {
  const items = [
    basics.email && { icon: 'mail', text: basics.email, href: `mailto:${basics.email}` },
    basics.phone && { icon: 'phone', text: basics.phone, href: `tel:${basics.phone.replace(/[^\d+]/g, '')}` },
    basics.url && { icon: 'website', text: prettyUrl(basics.url), href: basics.url },
    withLocation && basics.location && { icon: 'location', text: basics.location },
  ].filter(Boolean) as { icon: string; text: string; href?: string }[]

  if (!items.length) return null

  return (
    <ul className={cn('space-y-2', className)}>
      {items.map((item) => (
        <li key={item.icon}>
          {item.href ? (
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className={cn('inline-flex items-center gap-2.5 transition-colors duration-200', itemClassName)}
            >
              <Icon name={item.icon} className={cn('size-4 shrink-0', iconClassName)} />
              <span className="break-all">{item.text}</span>
            </a>
          ) : (
            <span className={cn('inline-flex items-center gap-2.5', itemClassName)}>
              <Icon name={item.icon} className={cn('size-4 shrink-0', iconClassName)} />
              {item.text}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
