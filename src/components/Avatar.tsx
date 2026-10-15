import { cn, initials } from '../lib/cn'

interface AvatarProps {
  name: string
  image?: string
  className?: string
}

/** Photo from `basics.image`, or the person's initials when there is none. */
export function Avatar({ name, image, className }: AvatarProps) {
  if (image) {
    return <img src={image} alt={name} className={cn('object-cover', className)} loading="eager" />
  }
  return (
    <div
      role="img"
      aria-label={name}
      className={cn('grid place-items-center bg-primary font-semibold text-on-primary select-none', className)}
    >
      {initials(name)}
    </div>
  )
}
