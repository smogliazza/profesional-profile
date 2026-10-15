import data from '../data/profile.json'
import type { Profile } from '../types/profile'
import type { SectionId } from '../config/types'
import { useTheme } from '../theme/ThemeProvider'

export const profile = data as Profile

/** True when a section has content to show. */
function hasContent(id: SectionId, p: Profile): boolean {
  switch (id) {
    case 'about':
      return Boolean(p.basics.summary)
    case 'experience':
      return Boolean(p.work?.length)
    case 'projects':
      return Boolean(p.projects?.length)
    case 'skills':
      return Boolean(p.skills?.length)
    case 'education':
      return Boolean(p.education?.length)
    case 'certificates':
      return Boolean(p.certificates?.length)
    case 'languages':
      return Boolean(p.languages?.length)
    case 'interests':
      return Boolean(p.interests?.length)
    case 'contact':
      return Boolean(p.basics.email || p.basics.phone || p.basics.profiles?.length)
  }
}

export function useProfile() {
  const { config } = useTheme()
  const sections = config.sections.filter((id) => hasContent(id, profile))
  return { profile, labels: config.labels, sections, cvUrl: config.cvUrl }
}
