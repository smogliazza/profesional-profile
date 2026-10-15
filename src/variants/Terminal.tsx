import type { ReactNode } from 'react'
import type { SectionId } from '../config/types'
import { useProfile } from '../lib/useProfile'
import { formatRange, year } from '../lib/dates'
import { prettyUrl } from '../lib/cn'
import { Reveal } from '../components/Reveal'
import { Typewriter } from '../components/Typewriter'
import { Tags } from '../components/Tags'

/** Command typed before each section. */
const COMMANDS: Record<SectionId, string> = {
  about: 'cat about.md',
  experience: 'git log --experience',
  projects: 'ls ~/projects',
  skills: 'skills --list',
  education: 'cat education.txt',
  certificates: 'ls ~/certificates',
  languages: 'locale -a',
  interests: 'cat interests.txt',
  contact: './contact.sh',
}

/** ASCII progress bar: [████████░░] */
const asciiBar = (level: number, width = 20) => {
  const filled = Math.round((Math.max(0, Math.min(100, level)) / 100) * width)
  return `[${'█'.repeat(filled)}${'░'.repeat(width - filled)}]`
}

/** Terminal — monospace, command-line look. Always dark. */
export default function Terminal() {
  const { profile, labels, sections, cvUrl } = useProfile()
  const { basics } = profile
  const user = basics.name.split(' ')[0]!.toLowerCase()

  const prompt = (cmd: string, caret = false) => (
    <p className="break-all">
      <span className="text-primary">{user}@profile</span>
      <span className="text-muted">:</span>
      <span className="text-accent">~</span>
      <span className="text-muted">$ </span>
      <span>{cmd}</span>
      {caret && <span className="inline-block w-[0.6em] animate-blink bg-primary">&nbsp;</span>}
    </p>
  )

  const link = 'text-primary underline decoration-primary/40 underline-offset-4 transition-colors duration-200 hover:decoration-primary'

  const render: Record<SectionId, () => ReactNode> = {
    about: () => <p className="max-w-3xl leading-relaxed">{basics.summary}</p>,

    experience: () => (
      <ol className="space-y-6">
        {profile.work!.map((job, i) => (
          <Reveal as="li" key={job.company + job.startDate} delay={i * 80}>
            <p>
              <span className="text-accent">commit {hash(job.company + job.startDate)}</span>
              {i === 0 && (!job.endDate || job.endDate === 'present') && <span className="text-primary"> (HEAD -&gt; current)</span>}
            </p>
            <p className="text-muted">Date: {formatRange(job.startDate, job.endDate, labels.present)}</p>
            <p className="mt-2 pl-4 sm:pl-8">
              <span className="font-bold">{job.position}</span> @ {job.company}
              {job.location && <span className="text-muted"> ({job.location})</span>}
            </p>
            {job.summary && <p className="mt-1 pl-4 text-muted sm:pl-8">{job.summary}</p>}
            {job.highlights && (
              <ul className="mt-2 space-y-1 pl-4 sm:pl-8">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="text-primary">+</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
            <Tags items={job.technologies} prefix="#" className="mt-2 gap-x-3 pl-4 text-sm text-accent sm:pl-8" />
          </Reveal>
        ))}
      </ol>
    ),

    projects: () => (
      <ul className="space-y-4">
        {profile.projects!.map((p, i) => (
          <Reveal as="li" key={p.name} delay={i * 80}>
            <p>
              <span className="text-muted">drwxr-xr-x </span>
              <span className="font-bold text-primary">{p.name.toLowerCase().replace(/\s+/g, '-')}/</span>
              {p.url && (
                <a href={p.url} target="_blank" rel="noreferrer" className={`ml-3 text-sm ${link}`}>
                  [{labels.viewProject.toLowerCase()}]
                </a>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer" className={`ml-3 text-sm ${link}`}>
                  [{labels.viewCode.toLowerCase()}]
                </a>
              )}
            </p>
            <p className="pl-4 text-muted sm:pl-8">{p.description}</p>
            <Tags items={p.technologies} prefix="#" className="gap-x-3 pl-4 text-sm text-accent sm:pl-8" />
          </Reveal>
        ))}
      </ul>
    ),

    skills: () => (
      <ul className="space-y-3">
        {profile.skills!.map((s) => (
          <li key={s.name}>
            <p className="flex flex-wrap gap-x-3">
              <span className="w-24 shrink-0 font-bold">{s.name.toLowerCase()}</span>
              {s.level != null && (
                <span className="text-primary">
                  {asciiBar(s.level)} <span className="text-muted">{s.level}%</span>
                </span>
              )}
            </p>
            <p className="text-muted sm:pl-[7.5rem]">{s.keywords.join(', ')}</p>
          </li>
        ))}
      </ul>
    ),

    education: () => (
      <ul className="space-y-2">
        {profile.education!.map((e) => (
          <li key={e.institution + e.area}>
            <span className="text-accent">{year(e.startDate, labels.present)}–{year(e.endDate, labels.present)}</span> {e.studyType} in{' '}
            <span className="font-bold">{e.area}</span> <span className="text-muted">@ {e.institution}</span>
          </li>
        ))}
      </ul>
    ),

    certificates: () => (
      <ul className="space-y-1">
        {profile.certificates!.map((c) => (
          <li key={c.name}>
            <span className="text-primary">✔</span> {c.name} <span className="text-muted">— {c.issuer}{c.date && `, ${c.date.slice(0, 4)}`}</span>
          </li>
        ))}
      </ul>
    ),

    languages: () => (
      <ul className="space-y-1">
        {profile.languages!.map((l) => (
          <li key={l.language}>
            {l.language.toLowerCase()}.UTF-8 <span className="text-muted"># {l.fluency}</span>
          </li>
        ))}
      </ul>
    ),

    interests: () => <p>{profile.interests!.join('  ')}</p>,

    contact: () => (
      <ul className="space-y-1">
        {basics.email && (
          <li>
            <span className="text-muted">email    → </span>
            <a href={`mailto:${basics.email}`} className={link}>
              {basics.email}
            </a>
          </li>
        )}
        {basics.phone && (
          <li>
            <span className="text-muted">phone    → </span>
            {basics.phone}
          </li>
        )}
        {basics.url && (
          <li>
            <span className="text-muted">web      → </span>
            <a href={basics.url} target="_blank" rel="noreferrer" className={link}>
              {prettyUrl(basics.url)}
            </a>
          </li>
        )}
        {basics.profiles?.map((p) => (
          <li key={p.url + p.network}>
            <span className="text-muted">{p.network.padEnd(8, ' ')} → </span>
            <a href={p.url} target="_blank" rel="noreferrer" className={link}>
              {p.username ?? prettyUrl(p.url)}
            </a>
          </li>
        ))}
      </ul>
    ),
  }

  return (
    <div className="min-h-screen bg-page px-3 py-6 font-mono text-[0.9rem] text-ink sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl animate-fade-up overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <p className="ml-3 truncate text-xs text-muted">{user}@profile: ~</p>
        </div>

        <div className="space-y-10 p-5 whitespace-pre-wrap sm:p-8">
          <header>
            {prompt('whoami')}
            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              <Typewriter text={basics.name} caretClassName="text-primary" />
            </h1>
            <p className="mt-2 text-lg text-primary">
              {'> '}
              {basics.label}
            </p>
            {basics.location && <p className="text-muted"># {basics.location}</p>}
            {basics.highlights && <Tags items={basics.highlights} prefix="--" className="mt-3 gap-x-4 text-sm text-accent" />}
            {cvUrl && (
              <a href={cvUrl} className={`mt-3 inline-block ${link}`}>
                wget {labels.downloadCv.toLowerCase().replace(/\s+/g, '-')}.pdf
              </a>
            )}
          </header>

          {sections.map((id) => (
            <Reveal as="section" key={id} id={id}>
              {prompt(COMMANDS[id])}
              <div className="mt-3">{render[id]()}</div>
            </Reveal>
          ))}

          {prompt('', true)}
        </div>
      </div>
    </div>
  )
}

/** Fake short commit hash from a string, stable between renders. */
function hash(text: string): string {
  let h = 0
  for (const char of text) h = (Math.imul(31, h) + char.charCodeAt(0)) | 0
  return (h >>> 0).toString(16).padStart(7, '0').slice(0, 7)
}
