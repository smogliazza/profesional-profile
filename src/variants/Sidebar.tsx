import type { ReactNode } from 'react'
import type { SectionId } from '../config/types'
import { useProfile } from '../lib/useProfile'
import { formatRange } from '../lib/dates'
import { cn } from '../lib/cn'
import { Reveal } from '../components/Reveal'
import { Avatar } from '../components/Avatar'
import { SocialLinks } from '../components/SocialLinks'
import { ContactList } from '../components/ContactList'
import { SkillBar } from '../components/SkillBar'
import { Tags } from '../components/Tags'
import { Icon } from '../components/Icon'

/** Sections that live in the sidebar; the rest go to the main column. */
const SIDEBAR: SectionId[] = ['contact', 'skills', 'languages', 'interests']

/** Classic CV — sidebar + main column. Prints nicely on A4 / Letter. */
export default function Sidebar() {
  const { profile, labels, sections, cvUrl } = useProfile()
  const { basics } = profile

  // Sidebar keeps its own order (contact first); visibility still follows the config
  const side = SIDEBAR.filter((id) => sections.includes(id))
  const main = sections.filter((id) => !SIDEBAR.includes(id))

  const sideTitle = 'mb-3 text-xs font-bold tracking-[0.18em] text-primary uppercase'

  const sideRender: Partial<Record<SectionId, () => ReactNode>> = {
    contact: () => (
      <>
        <ContactList basics={basics} className="text-sm" itemClassName="hover:text-primary" iconClassName="text-primary" />
        <SocialLinks profiles={basics.profiles} withLabel className="mt-3 flex-col items-start gap-2 text-sm" linkClassName="hover:text-primary" />
      </>
    ),
    skills: () => (
      <ul className="space-y-4">
        {profile.skills!.map((s) => (
          <li key={s.name}>
            <p className="text-sm font-semibold">{s.name}</p>
            {s.level != null && <SkillBar level={s.level} label={s.name} className="mt-1.5 h-1" />}
            <p className="mt-1.5 text-sm text-muted">{s.keywords.join(' · ')}</p>
          </li>
        ))}
      </ul>
    ),
    languages: () => (
      <ul className="space-y-1.5 text-sm">
        {profile.languages!.map((l) => (
          <li key={l.language} className="flex justify-between gap-2">
            <span className="font-medium">{l.language}</span>
            <span className="text-muted">{l.fluency}</span>
          </li>
        ))}
      </ul>
    ),
    interests: () => <Tags items={profile.interests} tagClassName="rounded border border-line px-2 py-0.5 text-xs" />,
  }

  const mainTitle = 'mb-6 flex items-center gap-4 text-sm font-bold tracking-[0.18em] uppercase after:h-px after:flex-1 after:bg-line'

  const mainRender: Partial<Record<SectionId, () => ReactNode>> = {
    about: () => <p className="leading-relaxed text-muted">{basics.summary}</p>,

    experience: () => (
      <ol className="space-y-8">
        {profile.work!.map((job, i) => (
          <Reveal as="li" key={job.company + job.startDate} delay={i * 60} className="break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-semibold">{job.position}</h3>
              <p className="text-sm text-muted tabular-nums">{formatRange(job.startDate, job.endDate, labels.present)}</p>
            </div>
            <p className="text-sm font-medium text-primary">
              {job.company}
              {job.location && <span className="font-normal text-muted"> — {job.location}</span>}
            </p>
            {job.summary && <p className="mt-2 text-sm leading-relaxed">{job.summary}</p>}
            {job.highlights && (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted marker:text-primary">
                {job.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
            {job.technologies && <p className="mt-2 text-xs text-muted">{job.technologies.join(' · ')}</p>}
          </Reveal>
        ))}
      </ol>
    ),

    projects: () => (
      <ul className="grid gap-5 sm:grid-cols-2">
        {profile.projects!.map((p, i) => (
          <Reveal as="li" key={p.name} delay={i * 60} className="break-inside-avoid border-l-2 border-primary/40 pl-4 transition-colors duration-300 hover:border-primary">
            <h3 className="font-semibold">
              {p.url || p.repo ? (
                <a href={p.url ?? p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-primary">
                  {p.name} <Icon name="link" className="size-3.5 text-muted" />
                </a>
              ) : (
                p.name
              )}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{p.description}</p>
            {p.technologies && <p className="mt-1.5 text-xs text-primary">{p.technologies.join(' · ')}</p>}
          </Reveal>
        ))}
      </ul>
    ),

    education: () => (
      <ul className="space-y-4">
        {profile.education!.map((e) => (
          <li key={e.institution + e.area} className="break-inside-avoid">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="font-semibold">{[e.studyType, e.area].filter(Boolean).join(' — ')}</h3>
              <p className="text-sm text-muted tabular-nums">{formatRange(e.startDate, e.endDate, labels.present)}</p>
            </div>
            <p className="text-sm text-primary">{e.institution}</p>
          </li>
        ))}
      </ul>
    ),

    certificates: () => (
      <ul className="space-y-2 text-sm">
        {profile.certificates!.map((c) => (
          <li key={c.name} className="flex flex-wrap justify-between gap-x-4">
            <span>
              <span className="font-medium">{c.name}</span> <span className="text-muted">— {c.issuer}</span>
            </span>
            {c.date && <span className="text-muted tabular-nums">{c.date.slice(0, 4)}</span>}
          </li>
        ))}
      </ul>
    ),
  }

  return (
    <div className="min-h-screen bg-page py-0 font-sans text-ink sm:py-10 print:py-0">
      <div className="mx-auto grid max-w-6xl animate-fade-in overflow-hidden bg-surface shadow-xl shadow-black/5 sm:rounded-2xl lg:grid-cols-[20rem_1fr] print:max-w-none print:grid-cols-[16rem_1fr] print:shadow-none">
        <aside className="border-line bg-primary/[0.06] p-8 lg:border-r">
          <div className="lg:sticky lg:top-10">
            <Avatar name={basics.name} image={basics.image} className="size-28 rounded-full text-3xl ring-4 ring-surface" />
            <h1 className="mt-5 text-2xl leading-tight font-bold">{basics.name}</h1>
            <p className="mt-1 font-medium text-primary">{basics.label}</p>
            {basics.location && <p className="mt-1 text-sm text-muted">{basics.location}</p>}

            <button
              type="button"
              onClick={() => (cvUrl ? window.open(cvUrl, '_blank') : window.print())}
              className="no-print mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              <Icon name="download" className="size-4" /> {labels.downloadCv}
            </button>

            {side.map((id, i) => (
              <Reveal as="section" key={id} id={id} delay={i * 80} className="mt-8">
                <h2 className={sideTitle}>{labels[id]}</h2>
                {sideRender[id]?.()}
              </Reveal>
            ))}
          </div>
        </aside>

        <main className="p-8 sm:p-12">
          {main.map((id, i) => (
            <section key={id} id={id} className={cn(i > 0 && 'mt-12')}>
              <Reveal>
                <h2 className={mainTitle}>{labels[id]}</h2>
              </Reveal>
              {mainRender[id]?.()}
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}
