import { nav } from './content'

/** Resolves a file in public/ against the configured base URL. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export type SectionId = keyof typeof nav

export const navLinks = Object.entries(nav) as [SectionId, string][]

/** Section label like "02 / FEATURED WORK", numbered by the section's position in the nav (home is 00). */
export const sectionEyebrow = (id: SectionId, label: string) =>
  `${String(navLinks.findIndex(([key]) => key === id)).padStart(2, '0')} / ${label}`
