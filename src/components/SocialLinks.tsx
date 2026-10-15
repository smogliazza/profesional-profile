import type { SocialProfile } from '../types/profile'
import { cn } from '../lib/cn'
import { Icon } from './Icon'

interface SocialLinksProps {
  profiles?: SocialProfile[]
  className?: string
  linkClassName?: string
  /** Show the username next to the icon. */
  withLabel?: boolean
}

const networkNames: Record<string, string> = {
  github: 'GitHub',
  gitlab: 'GitLab',
  linkedin: 'LinkedIn',
  x: 'X',
  twitter: 'Twitter',
  website: 'Website',
}

export function SocialLinks({ profiles = [], className, linkClassName, withLabel }: SocialLinksProps) {
  if (!profiles.length) return null
  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {profiles.map((p) => {
        const name = networkNames[p.network] ?? p.network
        return (
          <li key={p.url + p.network}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              aria-label={withLabel ? undefined : name}
              title={name}
              className={cn('inline-flex items-center gap-2 transition-colors duration-200', linkClassName)}
            >
              <Icon name={p.network} className="size-[1.1em] shrink-0" />
              {withLabel && <span>{p.username ?? name}</span>}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
