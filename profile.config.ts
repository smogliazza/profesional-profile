import { defineConfig } from './src/config/defaults'

/**
 * ─────────────────────────────────────────────────────────────
 *  Profile configuration
 *  Your data lives in `src/data/profile.json`.
 *  Everything about how it looks lives here.
 * ─────────────────────────────────────────────────────────────
 */
export default defineConfig({
  /**
   * Page style: 'minimal' | 'modern' | 'sidebar' | 'terminal' | 'editorial'
   */
  variant: 'modern',

  /** Floating panel to try every style and light/dark mode live. */
  showSwitcher: true,

  /** 'light' | 'dark' | 'system' */
  colorMode: 'system',

  /** Entrance animations (always disabled for "reduce motion" users). */
  animations: true,

  /** Order of the sections. Delete a line to hide that section. */
  sections: [
    'about',
    'experience',
    'projects',
    'skills',
    'education',
    'certificates',
    'languages',
    'interests',
    'contact',
  ],

  /** Optional link to a PDF version of your CV. */
  // cvUrl: './cv.pdf',

  /**
   * Colors. Any CSS color works (hex, rgb, hsl, oklch).
   * You only need to write the ones you want to change.
   */
  colors: {
    light: {
      page: '#fafaf9',
      surface: '#ffffff',
      ink: '#1c1917',
      muted: '#57534e',
      line: '#e7e5e4',
      primary: '#4f46e5',
      onPrimary: '#ffffff',
      accent: '#d97706',
    },
    dark: {
      page: '#0c0a09',
      surface: '#1c1917',
      ink: '#f5f5f4',
      muted: '#a8a29e',
      line: '#292524',
      primary: '#818cf8',
      onPrimary: '#0c0a09',
      accent: '#fbbf24',
    },
  },

  /** Per-variant tweaks, merged over `colors`. */
  variants: {
    terminal: {
      colors: {
        dark: {
          page: '#0a0f0b',
          surface: '#101812',
          ink: '#d1fae5',
          muted: '#7f9f8b',
          line: '#1d2b22',
          primary: '#4ade80',
          onPrimary: '#052e16',
          accent: '#facc15',
        },
      },
    },
    editorial: {
      colors: {
        light: { primary: '#e11d48', accent: '#1c1917' },
        dark: { primary: '#fb7185', accent: '#f5f5f4' },
      },
    },
  },

  /** Translate the page by changing these texts. */
  labels: {
    // about: 'Sobre mí',
    // experience: 'Experiencia',
    // projects: 'Proyectos',
  },
})
