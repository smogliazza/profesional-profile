import type { ProfileConfig, UserConfig, Palette, VariantId } from './types'

export const defaultConfig: ProfileConfig = {
  variant: 'modern',
  showSwitcher: true,
  colorMode: 'system',
  animations: true,
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
  labels: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    education: 'Education',
    certificates: 'Certificates',
    languages: 'Languages',
    interests: 'Interests',
    contact: 'Contact',
    present: 'Present',
    downloadCv: 'Download CV',
    contactMe: 'Get in touch',
    viewProject: 'Live',
    viewCode: 'Code',
    style: 'Style',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'Auto',
  },
}

/** Identity helper: gives autocompletion in `profile.config.ts`. */
export function defineConfig(config: UserConfig): UserConfig {
  return config
}

export function resolveConfig(user: UserConfig): ProfileConfig {
  return {
    ...defaultConfig,
    ...user,
    colors: {
      light: { ...defaultConfig.colors.light, ...user.colors?.light },
      dark: { ...defaultConfig.colors.dark, ...user.colors?.dark },
    },
    labels: { ...defaultConfig.labels, ...user.labels },
  }
}

export function paletteFor(config: ProfileConfig, variant: VariantId, mode: 'light' | 'dark'): Palette {
  return { ...config.colors[mode], ...config.variants?.[variant]?.colors?.[mode] }
}
