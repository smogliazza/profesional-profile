import type { ReactNode } from 'react'
import type { SectionId } from '../config/types'
import { useProfile } from '../lib/useProfile'
import { year } from '../lib/dates'
import { Reveal } from '../components/Reveal'
import { Avatar } from '../components/Avatar'
import { SocialLinks } from '../components/SocialLinks'
import { ContactList } from '../components/ContactList'
import { Tags } from '../components/Tags'
import { Icon } from '../components/Icon'

/** Editorial — oversized type, numbered sections, magazine layout. */
export default function Editorial() {
  const { profile, labels, sections, cvUrl } = useProfile()
  const { basics } = profile
  const keywords = profile.skills?.flatMap((s) => s.keywords) ?? []

  const render: Record<SectionId, () => ReactNode> = {
    about: () => (
      <p className="font-serif text-2xl leading-snug sm:text-3xl">
        <span className="float-left mt-1 mr-3 font-display text-7xl leading-[0.8] font-bold text-primary">{basics.summary!.charAt(0)}</span>
        {basics.summary!.slice(1)}
      </p>
    ),

    experience: () => (
      <ol className="divide-y divide-line border-y border-line">
        {profile.work!.map((job, i) => (
          <Reveal as="li" key={job.company + job.startDate} delay={i * 80} className="group grid gap-3 py-8 sm:grid-cols-[8rem_1fr]">
            <p className="font-display text-sm font-bold tabular-nums">
              {year(job.startDate, labels.present)} — {year(job.endDate, labels.present)}
            </p>
            <div>
              <h3 className="font-display text-2xl font-bold transition-colors duration-300 group-hover:text-primary sm:text-3xl">
                {job.company}
              </h3>
              <p className="mt-1 text-sm font-semibold tracking-widest text-muted uppercase">{job.position}</p>
              {job.summary && <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed">{job.summary}</p>}
              {job.highlights && (
                <ul className="mt-4 max-w-2xl space-y-2">
                  {job.highlights.map((h) => (
                    <li key={h} className="border-l-2 border-primary pl-4 text-muted">
                      {h}
                    </li>
                  ))}
                </ul>
              )}
              <Tags items={job.technologies} className="mt-4 gap-x-4 gap-y-1" tagClassName="text-xs font-bold tracking-widest uppercase" />
            </div>
          </Reveal>
        ))}
      </ol>
    ),

    projects: () => (
      <ol className="space-y-px overflow-hidden border border-line bg-line">
        {profile.projects!.map((p, i) => {
          const href = p.url ?? p.repo
          const body = (
            <>
              <span className="hidden font-display text-5xl font-bold text-line transition-colors sm:inline duration-300 group-hover:text-on-primary/60">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                <p className="mt-1 max-w-xl text-muted transition-colors duration-300 group-hover:text-on-primary/80">{p.description}</p>
                <Tags items={p.technologies} className="mt-3 gap-x-4" tagClassName="text-xs font-bold tracking-widest uppercase" />
              </div>
              {href && <Icon name="arrow" className="size-7 shrink-0 -rotate-45 transition-transform duration-300 group-hover:rotate-0" />}
            </>
          )
          const cls =
            'group flex items-start gap-6 bg-page p-6 transition-colors duration-300 hover:bg-primary hover:text-on-primary sm:p-8'
          return (
            <Reveal as="li" key={p.name} delay={i * 80}>
              {href ? (
                <a href={href} target="_blank" rel="noreferrer" className={cls}>
                  {body}
                </a>
              ) : (
                <div className={cls}>{body}</div>
              )}
            </Reveal>
          )
        })}
      </ol>
    ),

    skills: () => (
      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {profile.skills!.map((s) => (
          <div key={s.name} className="border-t-4 border-ink pt-3">
            <h3 className="font-display text-xl font-bold">{s.name}</h3>
            <p className="mt-2 font-serif text-lg text-muted">{s.keywords.join(', ')}</p>
          </div>
        ))}
      </div>
    ),

    education: () => (
      <ul className="space-y-6">
        {profile.education!.map((e) => (
          <li key={e.institution + e.area}>
            <p className="font-display text-sm font-bold tabular-nums text-primary">
              {year(e.startDate, labels.present)} — {year(e.endDate, labels.present)}
            </p>
            <h3 className="font-display text-2xl font-bold">{e.area}</h3>
            <p className="font-serif text-lg text-muted">
              {[e.studyType, e.institution].filter(Boolean).join(', ')}
            </p>
          </li>
        ))}
      </ul>
    ),

    certificates: () => (
      <ul className="space-y-3">
        {profile.certificates!.map((c) => (
          <li key={c.name} className="flex flex-wrap items-baseline justify-between gap-x-6 border-b border-line pb-3">
            <span className="font-display text-lg font-bold">{c.name}</span>
            <span className="text-sm tracking-widest text-muted uppercase">
              {c.issuer}
              {c.date && ` · ${c.date.slice(0, 4)}`}
            </span>
          </li>
        ))}
      </ul>
    ),

    languages: () => (
      <ul className="flex flex-wrap gap-x-12 gap-y-4">
        {profile.languages!.map((l) => (
          <li key={l.language}>
            <p className="font-display text-3xl font-bold">{l.language}</p>
            <p className="text-sm tracking-widest text-muted uppercase">{l.fluency}</p>
          </li>
        ))}
      </ul>
    ),

    interests: () => <p className="font-serif text-2xl italic">{profile.interests!.join(', ')}.</p>,

    contact: () => (
      <div>
        {basics.email && (
          <a
            href={`mailto:${basics.email}`}
            className="group inline-flex items-center gap-4 font-display text-3xl font-bold break-all sm:text-5xl"
          >
            <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_4px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_4px]">
              {basics.email}
            </span>
            <Icon name="arrow" className="size-8 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-2" />
          </a>
        )}
        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-6">
          <ContactList basics={{ ...basics, email: undefined }} className="text-sm" itemClassName="hover:text-primary" />
          <SocialLinks
            profiles={basics.profiles}
            withLabel
            className="flex-col items-start gap-2 text-sm"
            linkClassName="font-bold tracking-widest uppercase hover:text-primary"
          />
        </div>
      </div>
    ),
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-page font-sans text-ink">
      <header className="mx-auto max-w-6xl px-6 pt-10">
        <div className="flex animate-fade-in items-center justify-between border-b-4 border-ink pb-3 text-xs font-bold tracking-[0.25em] uppercase">
          <span>{basics.label}</span>
          <span className="hidden sm:inline">{basics.location}</span>
          <span>Vol. {new Date().getFullYear()}</span>
        </div>

        <div className="grid items-end gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_auto]">
          <h1 className="animate-fade-up font-display text-[clamp(3.5rem,13vw,10rem)] leading-[0.85] font-bold tracking-tighter">
            {basics.name.split(' ').map((part, i) => (
              <span key={i} className="block">
                {part}
                {i === basics.name.split(' ').length - 1 && <span className="text-primary">.</span>}
              </span>
            ))}
          </h1>
          <div className="animate-fade-up space-y-4 [animation-delay:200ms] lg:max-w-xs">
            <Avatar name={basics.name} image={basics.image} className="size-24 rounded-none text-3xl grayscale-[30%]" />
            {basics.highlights && <Tags items={basics.highlights} className="flex-col gap-1" tagClassName="text-sm font-semibold tracking-widest uppercase before:mr-2 before:text-primary before:content-['→']" />}
            {cvUrl && (
              <a href={cvUrl} className="inline-flex items-center gap-2 border-b-2 border-primary pb-0.5 text-sm font-bold tracking-widest uppercase">
                {labels.downloadCv} <Icon name="download" className="size-4" />
              </a>
            )}
          </div>
        </div>
      </header>

      {keywords.length > 0 && (
        <div aria-hidden="true" className="no-print overflow-hidden border-y border-ink bg-ink py-3 text-page">
          <div className="flex w-max animate-marquee gap-8 font-display text-xl font-bold tracking-wider whitespace-nowrap uppercase">
            {[...keywords, ...keywords].map((k, i) => (
              <span key={i} className="flex items-center gap-8">
                {k} <span className="text-primary">✦</span>
              </span>
            ))}
          </div>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-6">
        {sections.map((id, i) => (
          <section key={id} id={id} className="grid gap-6 border-b border-line py-16 lg:grid-cols-[16rem_1fr] lg:gap-12">
            <Reveal>
              <div className="lg:sticky lg:top-8">
                <p className="font-display text-6xl font-bold text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</p>
                <h2 className="mt-1 text-sm font-bold tracking-[0.25em] uppercase">{labels[id]}</h2>
              </div>
            </Reveal>
            <Reveal delay={120}>{render[id]()}</Reveal>
          </section>
        ))}
      </main>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-xs font-bold tracking-[0.25em] uppercase">
        <span>
          © {new Date().getFullYear()} {basics.name}
        </span>
        <SocialLinks profiles={basics.profiles} className="gap-4 text-base" linkClassName="hover:text-primary" />
      </footer>
    </div>
  )
}
