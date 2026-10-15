import { useEffect, useRef, useState } from 'react'
import type { ColorMode } from '../config/types'
import { useTheme } from '../theme/ThemeProvider'
import { VARIANTS, variantMeta } from '../variants/meta'
import { cn } from '../lib/cn'
import { Icon } from './Icon'

const MODES: { id: ColorMode; icon: string }[] = [
  { id: 'light', icon: 'sun' },
  { id: 'dark', icon: 'moon' },
  { id: 'system', icon: 'monitor' },
]

/**
 * Floating panel to switch the page style and color mode.
 * Hide it with `showSwitcher: false` in profile.config.ts.
 */
export function VariantSwitcher() {
  const { config, variant, mode, setVariant, setMode } = useTheme()
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const forced = variantMeta(variant).forceMode

  // Close with Escape or a click outside
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  if (!config.showSwitcher) return null
  const { labels } = config

  return (
    <div ref={panelRef} className="no-print fixed right-4 bottom-4 z-50 font-sans sm:right-6 sm:bottom-6">
      <div
        id="style-panel"
        role="dialog"
        aria-label={labels.style}
        className={cn(
          'absolute right-0 bottom-16 w-72 origin-bottom-right rounded-2xl border border-line bg-surface p-4 text-ink shadow-2xl shadow-black/20',
          'transition-all duration-300 ease-out',
          open ? 'visible scale-100 opacity-100' : 'invisible translate-y-2 scale-95 opacity-0',
        )}
      >
        <p className="mb-2 text-xs font-semibold tracking-wider text-muted uppercase">{labels.style}</p>
        <ul className="space-y-1">
          {VARIANTS.map((v) => {
            const active = v.id === variant
            return (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => setVariant(v.id)}
                  aria-pressed={active}
                  className={cn(
                    'w-full rounded-xl px-3 py-2 text-left transition-colors duration-200',
                    active ? 'bg-primary text-on-primary' : 'hover:bg-primary/10',
                  )}
                >
                  <span className="block text-sm font-medium">{v.name}</span>
                  <span className={cn('block text-xs', active ? 'opacity-80' : 'text-muted')}>{v.description}</span>
                </button>
              </li>
            )
          })}
        </ul>

        <p className="mt-4 mb-2 text-xs font-semibold tracking-wider text-muted uppercase">{labels.theme}</p>
        <div className={cn('grid grid-cols-3 gap-1 rounded-xl bg-page p-1', forced && 'pointer-events-none opacity-50')}>
          {MODES.map((m) => {
            const active = (forced ?? mode) === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                aria-pressed={active}
                disabled={Boolean(forced)}
                className={cn(
                  'flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs transition-colors duration-200',
                  active ? 'bg-surface font-medium shadow-sm' : 'text-muted hover:text-ink',
                )}
              >
                <Icon name={m.icon} className="size-3.5" />
                {labels[m.id]}
              </button>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="style-panel"
        aria-label={labels.style}
        className="grid size-12 place-items-center rounded-full bg-primary text-on-primary shadow-lg shadow-black/25 transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <Icon name={open ? 'close' : 'palette'} className="size-5 transition-transform duration-300" />
      </button>
    </div>
  )
}
