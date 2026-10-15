const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const isPresent = (value?: string) => !value || value.toLowerCase() === 'present'

/** "2024-03" → "Mar 2024", "2024" → "2024", "present" → label */
export function formatDate(value: string | undefined, presentLabel: string): string {
  if (isPresent(value)) return presentLabel
  const [year, month] = value!.split('-')
  const m = Number(month)
  return m >= 1 && m <= 12 ? `${MONTHS[m - 1]} ${year}` : year
}

export function formatRange(start: string | undefined, end: string | undefined, presentLabel: string): string {
  if (!start) return end ? formatDate(end, presentLabel) : ''
  return `${formatDate(start, presentLabel)} — ${formatDate(end, presentLabel)}`
}

function toMonths(value: string | undefined): number {
  if (isPresent(value)) {
    const now = new Date()
    return now.getFullYear() * 12 + now.getMonth()
  }
  const [y, m] = value!.split('-').map(Number)
  return y * 12 + ((m || 1) - 1)
}

/** "2y 3m" style duration, used by some variants. */
export function duration(start: string, end?: string): string {
  const total = Math.max(1, toMonths(end) - toMonths(start) + 1)
  const years = Math.floor(total / 12)
  const months = total % 12
  return [years ? `${years}y` : '', months ? `${months}m` : ''].filter(Boolean).join(' ')
}

export function year(value: string | undefined, presentLabel: string): string {
  if (isPresent(value)) return presentLabel
  return value!.slice(0, 4)
}
