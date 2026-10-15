import type { ReactNode } from 'react'
import type { SectionId } from '../config/types'
import { useProfile } from '../lib/useProfile'
import { formatRange } from '../lib/dates'
import { Reveal } from '../components/Reveal'
import { Avatar } from '../components/Avatar'
import { SocialLinks } from '../components/SocialLinks'
import { ContactList } from '../components/ContactList'
import { Tags } from '../components/Tags'
import { Icon } from '../components/Icon'

/** Minimal — one centered column, serif titles, thin dividers. */
export default function Minimal() {
  const { profile, labels, sections, cvUrl } = useProfile()
  const { basics } = profile

  const link = 'underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-primary hover:decoration-primary'

  const render: Record<SectionId, () => ReactNode> = {
    about: () => <p className="text-lg leading-relaxed text-muted">{basics.summary}</p>,

    experience: () => (
      <ol className="space-y-10">
        {profile.work!.map((job, i) => (
          <Reveal as="li" key={job.company + job.startDate} delay={i * 60} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <p className="text-sm text-muted tabular-nums">{formatRange(job.startDate, job.endDate, labels.present)}</p>
            <div>
              <h3 className="font-medium">
                {job.position} ·{' '}
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noreferrer" className={link}>
                    {job.company}
                  </a>
                ) : (
                  job.company
                )}
              </h3>
              {job.summary && <p className="mt-2 leading-relaxed text-muted">{job.summary}</p>}
              {job.highlights && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-line">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              <Tags items={job.technologies} className="mt-3" tagClassName="text-xs text-muted after:ml-1.5 after:content-['·'] last:after:content-none" />
            </div>
          </Reveal>
        ))}
      </ol>
    ),

    projects: () => (
      <ul className="space-y-8">
        {profile.projects!.map((p, i) => (
          <Reveal as="li" key={p.name} delay={i * 60}>
            <h3 className="flex flex-wrap items-baseline gap-x-3 font-medium">
              {p.name}
              {p.url && (
                <a href={p.url} target="_blank" rel="noreferrer" className={`text-sm font-normal text-muted ${link}`}>
                  {labels.viewProject}
                </a>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer" className={`text-sm font-normal text-muted ${link}`}>
                  {labels.viewCode}
                </a>
              )}
            </h3>
            <p className="mt-1.5 leading-relaxed text-muted">{p.description}</p>
            <Tags items={p.technologies} className="mt-2" tagClassName="text-xs text-muted after:ml-1.5 after:content-['·'] last:after:content-none" />
          </Reveal>
        ))}
      </ul>
    ),

    skills: () => (
      <dl className="space-y-4">
        {profile.skills!.map((s) => (
          <div key={s.name} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="text-sm text-muted">{s.name}</dt>
            <dd>{s.keywords.join(', ')}</dd>
          </div>
        ))}
      </dl>
    ),

    education: () => (
      <ul className="space-y-6">
        {profile.education!.map((e) => (
          <li key={e.institution + e.area} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <p className="text-sm text-muted tabular-nums">{formatRange(e.startDate, e.endDate, labels.present)}</p>
            <div>
              <h3 className="font-medium">{[e.studyType, e.area].filter(Boolean).join(', ')}</h3>
              <p className="text-muted">{e.institution}</p>
            </div>
          </li>
        ))}
      </ul>
    ),

    certificates: () => (
      <ul className="space-y-3">
        {profile.certificates!.map((c) => (
          <li key={c.name} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <p className="text-sm text-muted tabular-nums">{c.date?.slice(0, 4)}</p>
            <p>
              {c.url ? (
                <a href={c.url} target="_blank" rel="noreferrer" className={link}>
                  {c.name}
                </a>
              ) : (
                c.name
              )}
              <span className="text-muted"> — {c.issuer}</span>
            </p>
          </li>
        ))}
      </ul>
    ),

    languages: () => (
      <ul className="flex flex-wrap gap-x-8 gap-y-2">
        {profile.languages!.map((l) => (
          <li key={l.language}>
            {l.language} <span className="text-muted">— {l.fluency}</span>
          </li>
        ))}
      </ul>
    ),

    interests: () => <p className="text-muted">{profile.interests!.join(' · ')}</p>,

    contact: () => (
      <div className="space-y-4">
        <ContactList basics={basics} withLocation={false} itemClassName="hover:text-primary" iconClassName="text-muted" />
        <SocialLinks profiles={basics.profiles} withLabel className="gap-x-6" linkClassName="text-muted hover:text-primary" />
      </div>
    ),
  }

  return (
    <div className="min-h-screen bg-page font-sans text-ink">
      <main className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
        <header className="animate-fade-up">
          <Avatar name={basics.name} image={basics.image} className="mb-8 size-16 rounded-full text-xl" />
          <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">{basics.name}</h1>
          <p className="mt-3 text-lg text-muted">
            {basics.label}
            {basics.location && <span> · {basics.location}</span>}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <SocialLinks profiles={basics.profiles} className="gap-4 text-lg" linkClassName="text-muted hover:text-primary" />
            {basics.email && (
              <a href={`mailto:${basics.email}`} className={`text-sm ${link}`}>
                {basics.email}
              </a>
            )}
            {cvUrl && (
              <a href={cvUrl} className={`inline-flex items-center gap-1.5 text-sm ${link}`}>
                <Icon name="download" className="size-4" /> {labels.downloadCv}
              </a>
            )}
          </div>
        </header>

        {sections.map((id) => (
          <Reveal as="section" key={id} id={id} className="mt-16 border-t border-line pt-10">
            <h2 className="mb-8 font-serif text-xl font-semibold">{labels[id]}</h2>
            {render[id]()}
          </Reveal>
        ))}

        <footer className="mt-20 text-sm text-muted">
          © {new Date().getFullYear()} {basics.name}
        </footer>
      </main>
    </div>
  )
}
