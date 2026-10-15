import type { ReactNode } from 'react'
import type { SectionId } from '../config/types'
import { useProfile } from '../lib/useProfile'
import { duration, formatRange } from '../lib/dates'
import { cn } from '../lib/cn'
import { Reveal } from '../components/Reveal'
import { Avatar } from '../components/Avatar'
import { SocialLinks } from '../components/SocialLinks'
import { ContactList } from '../components/ContactList'
import { SkillBar } from '../components/SkillBar'
import { Tags } from '../components/Tags'
import { Icon } from '../components/Icon'

const card = 'rounded-2xl border border-line bg-surface p-6 shadow-sm shadow-black/[0.03]'
const chip = 'rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary'

/** Modern — gradient hero, sticky nav, cards with hover lift. */
export default function Modern() {
  const { profile, labels, sections, cvUrl } = useProfile()
  const { basics } = profile

  const render: Record<SectionId, () => ReactNode> = {
    about: () => (
      <div className={card}>
        <p className="text-lg leading-relaxed">{basics.summary}</p>
      </div>
    ),

    experience: () => (
      <ol className="relative space-y-6 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-line">
        {profile.work!.map((job, i) => (
          <Reveal as="li" key={job.company + job.startDate} delay={i * 80} className="relative pl-8">
            <span className="absolute top-7 left-0 size-[15px] rounded-full border-4 border-page bg-primary" />
            <article className={cn(card, 'transition duration-300 hover:-translate-y-0.5 hover:shadow-lg')}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{job.position}</h3>
                  <p className="text-primary">
                    {job.url ? (
                      <a href={job.url} target="_blank" rel="noreferrer" className="hover:underline">
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                    {job.location && <span className="text-muted"> · {job.location}</span>}
                  </p>
                </div>
                <p className="text-right text-sm text-muted">
                  {formatRange(job.startDate, job.endDate, labels.present)}
                  <span className="block text-xs">{duration(job.startDate, job.endDate)}</span>
                </p>
              </div>
              {job.summary && <p className="mt-3 leading-relaxed text-muted">{job.summary}</p>}
              {job.highlights && (
                <ul className="mt-3 space-y-1.5">
                  {job.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5">
                      <Icon name="arrow" className="mt-1 size-3.5 shrink-0 text-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
              <Tags items={job.technologies} className="mt-4" tagClassName={chip} />
            </article>
          </Reveal>
        ))}
      </ol>
    ),

    projects: () => (
      <div className="grid gap-5 sm:grid-cols-2">
        {profile.projects!.map((p, i) => (
          <Reveal key={p.name} delay={i * 80}>
            <article
              className={cn(
                card,
                'group relative flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl',
              )}
            >
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100" />
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">{p.description}</p>
              <Tags items={p.technologies} className="mt-4" tagClassName={chip} />
              {(p.url || p.repo) && (
                <div className="mt-5 flex gap-4 text-sm font-medium">
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                      <Icon name="link" className="size-4" /> {labels.viewProject}
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                      <Icon name="code" className="size-4" /> {labels.viewCode}
                    </a>
                  )}
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    ),

    skills: () => (
      <div className="grid gap-5 sm:grid-cols-2">
        {profile.skills!.map((s, i) => (
          <Reveal key={s.name} delay={i * 80} className={card}>
            <div className="flex items-baseline justify-between">
              <h3 className="font-semibold">{s.name}</h3>
              {s.level != null && <span className="text-sm text-muted tabular-nums">{s.level}%</span>}
            </div>
            {s.level != null && <SkillBar level={s.level} label={s.name} className="mt-3" barClassName="bg-gradient-to-r from-primary to-accent" />}
            <Tags items={s.keywords} className="mt-4" tagClassName="rounded-md border border-line px-2 py-0.5 text-sm" />
          </Reveal>
        ))}
      </div>
    ),

    education: () => (
      <div className="grid gap-5 sm:grid-cols-2">
        {profile.education!.map((e) => (
          <article key={e.institution + e.area} className={card}>
            <p className="text-sm text-muted">{formatRange(e.startDate, e.endDate, labels.present)}</p>
            <h3 className="mt-1 font-semibold">{e.area}</h3>
            <p className="text-primary">{e.institution}</p>
            {e.studyType && <p className="mt-1 text-sm text-muted">{e.studyType}</p>}
          </article>
        ))}
      </div>
    ),

    certificates: () => (
      <div className="grid gap-5 sm:grid-cols-2">
        {profile.certificates!.map((c) => (
          <article key={c.name} className={cn(card, 'flex items-start gap-4')}>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">★</span>
            <div>
              <h3 className="font-semibold">
                {c.url ? (
                  <a href={c.url} target="_blank" rel="noreferrer" className="hover:text-primary">
                    {c.name}
                  </a>
                ) : (
                  c.name
                )}
              </h3>
              <p className="text-sm text-muted">
                {c.issuer}
                {c.date && ` · ${c.date.slice(0, 4)}`}
              </p>
            </div>
          </article>
        ))}
      </div>
    ),

    languages: () => (
      <div className="flex flex-wrap gap-4">
        {profile.languages!.map((l) => (
          <div key={l.language} className={cn(card, 'px-5 py-4')}>
            <p className="font-semibold">{l.language}</p>
            <p className="text-sm text-muted">{l.fluency}</p>
          </div>
        ))}
      </div>
    ),

    interests: () => <Tags items={profile.interests} className="gap-2" tagClassName="rounded-full border border-line bg-surface px-4 py-1.5" />,

    contact: () => (
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-8 text-on-primary sm:p-10">
        <h3 className="text-2xl font-semibold sm:text-3xl">{labels.contactMe}</h3>
        <ContactList basics={basics} className="mt-6" itemClassName="opacity-90 hover:opacity-100 hover:underline" />
        <SocialLinks profiles={basics.profiles} className="mt-6 gap-3" linkClassName="grid size-10 place-items-center rounded-full bg-white/15 text-lg hover:bg-white/25" />
      </div>
    ),
  }

  return (
    <div className="min-h-screen bg-page font-sans text-ink">
      <nav className="no-print sticky top-0 z-40 border-b border-line/60 bg-page/75 backdrop-blur-lg">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-3">
          <a href="#top" className="font-display font-bold">
            {basics.name}
          </a>
          <ul className="hidden gap-5 text-sm text-muted md:flex">
            {sections
              .filter((id) => id !== 'about')
              .slice(0, 5)
              .map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="transition-colors duration-200 hover:text-primary">
                    {labels[id]}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </nav>

      <header id="top" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-24 size-96 animate-float rounded-full bg-primary/25 blur-3xl" />
          <div className="absolute -right-24 top-10 size-80 animate-float rounded-full bg-accent/20 blur-3xl [animation-delay:-4s]" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 sm:pt-28">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            <Avatar
              name={basics.name}
              image={basics.image}
              className="size-28 animate-fade-up rounded-3xl bg-gradient-to-br from-primary to-accent text-3xl shadow-xl ring-4 ring-surface"
            />
            <div className="animate-fade-up [animation-delay:120ms]">
              <h1 className="font-display text-4xl font-bold tracking-tight sm:text-6xl">{basics.name}</h1>
              <p className="mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-medium text-transparent sm:text-2xl">
                {basics.label}
              </p>
              {basics.location && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-muted">
                  <Icon name="location" className="size-4" /> {basics.location}
                </p>
              )}
            </div>
          </div>

          {basics.highlights && (
            <Tags
              items={basics.highlights}
              className="mt-8 animate-fade-up gap-2 [animation-delay:240ms]"
              tagClassName="rounded-full border border-line bg-surface/70 px-3 py-1 text-sm backdrop-blur"
            />
          )}

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-3 [animation-delay:360ms]">
            {basics.email && (
              <a
                href={`mailto:${basics.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-medium text-on-primary shadow-lg shadow-primary/25 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Icon name="mail" className="size-4" /> {labels.contactMe}
              </a>
            )}
            {cvUrl && (
              <a
                href={cvUrl}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 font-medium transition duration-300 hover:-translate-y-0.5 hover:border-primary"
              >
                <Icon name="download" className="size-4" /> {labels.downloadCv}
              </a>
            )}
            <SocialLinks
              profiles={basics.profiles}
              className="gap-2"
              linkClassName="grid size-11 place-items-center rounded-full border border-line bg-surface text-lg hover:border-primary hover:text-primary"
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-20 px-6 pb-24">
        {sections.map((id) => (
          <section key={id} id={id} className="scroll-mt-24">
            <Reveal>
              <h2 className="mb-6 flex items-center gap-3 font-display text-2xl font-bold sm:text-3xl">
                <span className="h-7 w-1.5 rounded-full bg-gradient-to-b from-primary to-accent" />
                {labels[id]}
              </h2>
            </Reveal>
            <Reveal delay={100}>{render[id]()}</Reveal>
          </section>
        ))}
      </main>

      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} {basics.name}
      </footer>
    </div>
  )
}
