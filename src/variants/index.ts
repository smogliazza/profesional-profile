import type { ComponentType } from 'react'
import type { VariantId } from '../config/types'
import Minimal from './Minimal'
import Modern from './Modern'
import Sidebar from './Sidebar'
import Terminal from './Terminal'
import Editorial from './Editorial'

/**
 * Every style reads the same data (useProfile) and colors (CSS variables).
 * To add your own: create a component here, register it below and in meta.ts.
 */
export const VARIANT_COMPONENTS: Record<VariantId, ComponentType> = {
  minimal: Minimal,
  modern: Modern,
  sidebar: Sidebar,
  terminal: Terminal,
  editorial: Editorial,
}
