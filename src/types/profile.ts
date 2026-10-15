/**
 * Shape of `src/data/profile.json`.
 * Loosely based on the JSON Resume standard (https://jsonresume.org),
 * so most existing resumes can be pasted in with small changes.
 *
 * Dates are strings: "2024-03", "2024" or "present".
 */

export type SocialNetwork =
  | 'github'
  | 'linkedin'
  | 'x'
  | 'twitter'
  | 'gitlab'
  | 'website'
  | 'medium'
  | 'dev'
  | 'stackoverflow'
  | 'youtube'
  | 'instagram'
  | (string & {})

export interface SocialProfile {
  network: SocialNetwork
  username?: string
  url: string
}

export interface Basics {
  name: string
  label: string
  image?: string
  email?: string
  phone?: string
  url?: string
  location?: string
  summary?: string
  /** Short facts shown as small badges in the hero, e.g. "Open to remote". */
  highlights?: string[]
  profiles?: SocialProfile[]
}

export interface Work {
  company: string
  position: string
  url?: string
  location?: string
  startDate: string
  endDate?: string
  summary?: string
  highlights?: string[]
  technologies?: string[]
}

export interface Education {
  institution: string
  area: string
  studyType?: string
  url?: string
  startDate?: string
  endDate?: string
  summary?: string
}

export interface SkillGroup {
  name: string
  /** 0–100. Used by variants that show progress bars. Optional. */
  level?: number
  keywords: string[]
}

export interface Project {
  name: string
  description: string
  url?: string
  repo?: string
  image?: string
  technologies?: string[]
  highlights?: string[]
  featured?: boolean
}

export interface Language {
  language: string
  fluency: string
}

export interface Certificate {
  name: string
  issuer: string
  date?: string
  url?: string
}

export interface Profile {
  $schema?: string
  basics: Basics
  work?: Work[]
  education?: Education[]
  skills?: SkillGroup[]
  projects?: Project[]
  languages?: Language[]
  certificates?: Certificate[]
  interests?: string[]
}
