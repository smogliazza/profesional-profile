export type VariantId = 'minimal' | 'modern' | 'sidebar' | 'terminal' | 'editorial'

export type ColorMode = 'light' | 'dark' | 'system'

export type SectionId =
  | 'about'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'education'
  | 'certificates'
  | 'languages'
  | 'interests'
  | 'contact'

/**
 * Every color accepts any CSS color: hex, rgb(), hsl(), oklch()...
 */
export interface Palette {
  /** Page background */
  page: string
  /** Cards, panels, sidebar */
  surface: string
  /** Main text */
  ink: string
  /** Secondary text (dates, captions) */
  muted: string
  /** Borders and dividers */
  line: string
  /** Brand color: links, buttons, highlights */
  primary: string
  /** Text drawn on top of `primary` */
  onPrimary: string
  /** Second brand color, used for small details and gradients */
  accent: string
}

export interface ColorScheme {
  light: Palette
  dark: Palette
}

export interface VariantOverride {
  /** Partial palettes, merged over the global `colors`. */
  colors?: { light?: Partial<Palette>; dark?: Partial<Palette> }
}

export type Labels = Record<SectionId, string> & {
  present: string
  downloadCv: string
  contactMe: string
  viewProject: string
  viewCode: string
  style: string
  theme: string
  light: string
  dark: string
  system: string
}

export interface ProfileConfig {
  /** Style used when the page loads. */
  variant: VariantId
  /** Show the floating panel to switch style and light/dark mode. */
  showSwitcher: boolean
  /** Initial color mode. Visitors can change it if the switcher is visible. */
  colorMode: ColorMode
  /** Turn entrance animations on/off. Always off for visitors with "reduce motion". */
  animations: boolean
  /** Which sections to render, in this order. Remove one to hide it. */
  sections: SectionId[]
  /** Link to a PDF version of your CV (optional). */
  cvUrl?: string
  colors: ColorScheme
  /** Fine-tune colors for a single variant. */
  variants?: Partial<Record<VariantId, VariantOverride>>
  /** Section titles and UI texts, to translate the page. */
  labels: Labels
}

export type UserConfig = Partial<Omit<ProfileConfig, 'colors' | 'labels'>> & {
  colors?: { light?: Partial<Palette>; dark?: Partial<Palette> }
  labels?: Partial<Labels>
}
