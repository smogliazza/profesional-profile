import type { VariantId } from '../config/types'

export interface VariantMeta {
  id: VariantId
  name: string
  description: string
  /** Some styles only make sense in one mode (e.g. terminal is always dark). */
  forceMode?: 'light' | 'dark'
}

export const VARIANTS: VariantMeta[] = [
  { id: 'minimal', name: 'Minimal', description: 'Single column, lots of air, serif titles' },
  { id: 'modern', name: 'Modern', description: 'Gradient hero, cards and soft shadows' },
  { id: 'sidebar', name: 'Classic CV', description: 'Two columns with a sidebar, print friendly' },
  { id: 'terminal', name: 'Terminal', description: 'Monospace, command line look', forceMode: 'dark' },
  { id: 'editorial', name: 'Editorial', description: 'Big type, magazine style' },
]

export const isVariantId = (value: unknown): value is VariantId =>
  typeof value === 'string' && VARIANTS.some((v) => v.id === value)

export const variantMeta = (id: VariantId): VariantMeta => VARIANTS.find((v) => v.id === id)!
