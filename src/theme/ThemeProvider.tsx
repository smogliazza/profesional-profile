import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { flushSync } from 'react-dom'
import type { ColorMode, ProfileConfig, VariantId } from '../config/types'
import { paletteFor } from '../config/defaults'
import { isVariantId, variantMeta } from '../variants/meta'

interface ThemeState {
  config: ProfileConfig
  variant: VariantId
  mode: ColorMode
  /** Mode actually applied after resolving 'system' and forced modes. */
  resolvedMode: 'light' | 'dark'
  setVariant: (variant: VariantId) => void
  setMode: (mode: ColorMode) => void
}

const ThemeContext = createContext<ThemeState | null>(null)

const STORAGE_KEY = 'profile-theme'
const isMode = (value: unknown): value is ColorMode => value === 'light' || value === 'dark' || value === 'system'

function readStored(): { variant?: string; mode?: string } {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
  } catch {
    return {}
  }
}

function writeStored(value: { variant: VariantId; mode: ColorMode }) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  } catch {
    /* storage unavailable (private mode, blocked cookies...) */
  }
}

/** URL params win (?variant=terminal&mode=dark, handy to share), then saved choice, then config. */
function initialState(config: ProfileConfig) {
  const params = new URLSearchParams(window.location.search)
  const stored = config.showSwitcher ? readStored() : {}
  const variantParam = params.get('variant')
  const modeParam = params.get('mode')
  return {
    variant: isVariantId(variantParam) ? variantParam : isVariantId(stored.variant) ? stored.variant : config.variant,
    mode: isMode(modeParam) ? modeParam : isMode(stored.mode) ? stored.mode : config.colorMode,
  }
}

function useSystemDark() {
  const query = '(prefers-color-scheme: dark)'
  const [dark, setDark] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setDark(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])
  return dark
}

function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(() => window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const onChange = () => setReduced(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Runs a state change inside a View Transition when the browser supports it. */
function withTransition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
  if (doc.startViewTransition && document.documentElement.dataset.motion !== 'off') {
    // flushSync makes React render synchronously so the transition captures the new state
    doc.startViewTransition(() => flushSync(update))
  } else {
    update()
  }
}

export function ThemeProvider({ config, children }: { config: ProfileConfig; children: ReactNode }) {
  const [{ variant, mode }, setState] = useState(() => initialState(config))
  const systemDark = useSystemDark()
  const reducedMotion = useReducedMotion()

  const forced = variantMeta(variant).forceMode
  const resolvedMode: 'light' | 'dark' = forced ?? (mode === 'system' ? (systemDark ? 'dark' : 'light') : mode)

  // Apply tokens before paint to avoid a flash of the wrong colors.
  useLayoutEffect(() => {
    const root = document.documentElement
    const palette = paletteFor(config, variant, resolvedMode)
    root.style.setProperty('--pp-page', palette.page)
    root.style.setProperty('--pp-surface', palette.surface)
    root.style.setProperty('--pp-ink', palette.ink)
    root.style.setProperty('--pp-muted', palette.muted)
    root.style.setProperty('--pp-line', palette.line)
    root.style.setProperty('--pp-primary', palette.primary)
    root.style.setProperty('--pp-on-primary', palette.onPrimary)
    root.style.setProperty('--pp-accent', palette.accent)
    root.classList.toggle('dark', resolvedMode === 'dark')
    root.style.colorScheme = resolvedMode
    root.dataset.variant = variant
    root.dataset.motion = config.animations && !reducedMotion ? 'on' : 'off'
  }, [config, variant, resolvedMode, reducedMotion])

  useEffect(() => {
    if (config.showSwitcher) writeStored({ variant, mode })
  }, [config.showSwitcher, variant, mode])

  const setVariant = useCallback((next: VariantId) => {
    withTransition(() => {
      setState((s) => ({ ...s, variant: next }))
      window.scrollTo({ top: 0 })
    })
  }, [])

  const setMode = useCallback((next: ColorMode) => {
    withTransition(() => setState((s) => ({ ...s, mode: next })))
  }, [])

  const value = useMemo(
    () => ({ config, variant, mode, resolvedMode, setVariant, setMode }),
    [config, variant, mode, resolvedMode, setVariant, setMode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeState {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>')
  return ctx
}
