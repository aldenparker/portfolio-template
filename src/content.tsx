import type { ReactNode } from 'react'

/*
  Everything a visitor reads on the page lives in this file.
  Replace the placeholder text below with your own and the layout updates itself.

  Files (images, videos, résumé) go in public/ and are referenced here by their
  path inside public/, for example 'images/portrait.webp'. Do not start the path with a slash.

  Text fields typed as ReactNode can contain simple markup such as <strong>bold</strong>
  or <em>italic</em>. Plain strings work everywhere.
*/

/** An image in public/. width and height are the file's real pixel size. */
export type ImageFile = { src: string; alt: string; width: number; height: number }

/** What appears beside a featured-work entry. */
export type ProjectMedia =
  /** A single image. Portrait and landscape images are both fine. */
  | { type: 'image'; image: ImageFile }
  /** A 9:16 vertical video: public/videos/<file>.mp4 with a cover at public/images/video-covers/<file>.webp. */
  | { type: 'portrait-video'; file: string }
  /** A horizontal video, same file layout as portrait-video. */
  | { type: 'landscape-video'; file: string }
  /** A set of slides shown inside a phone frame. `label` appears at the top of the phone screen. */
  | { type: 'carousel'; label: string; slides: ImageFile[] }

export type ProjectEntry = { title: string; kind: string; description: string; media: ProjectMedia }

export type ExperienceEntry = { date: string; current?: boolean; title: string; organization: string; summary: string }

/** Your name, as it appears in the header, footer and image alt text. */
export const name = 'Your Name'

/**
 * Header link labels, in page order. Section numbers ("01 /", "02 /" ...) are worked out from this order,
 * so if you move a section in App.tsx, move its entry here too.
 */
export const nav = {
  home: 'Home',
  spotlight: 'Spotlight',
  work: 'Featured work',
  about: 'About me',
  experience: 'Experience',
  contact: 'Contact',
} as const

export const hero = {
  eyebrow: 'FIELD · SPECIALTY · INTEREST',
  /** The big name. Each entry is its own line. */
  titleLines: ['Your', 'Name'],
  intro: <>A one or two sentence introduction: what you study or do, <strong>where you do it</strong>, and what you care about in your work.</>,
  cta: 'Explore my work',
  portrait: { src: 'images/portrait.webp', alt: 'Your Name', width: 800, height: 1000 } satisfies ImageFile,
  portraitCaption: 'A SHORT CAPTION UNDER YOUR PHOTO',
  /** Three short phrases shown in the colored strip under the hero. */
  strip: ['A short phrase.', 'Another phrase.', 'A third phrase.'],
}

/** A single highlighted piece of work or experience, told as a short story with one image. */
export const spotlight = {
  eyebrow: 'SPOTLIGHT',
  title: 'A headline for one standout project.',
  titleAccent: 'A second line in italics.',
  paragraphs: [
    'Use this section to tell the story behind one project or role you are proud of. Where were you, who was it for, and what was the goal?',
    'A second paragraph can describe the brief, the choices you made, and the result. Keep each paragraph to a few sentences.',
  ] as ReactNode[],
  image: { src: 'images/spotlight.webp', alt: 'Describe what the image shows for people using screen readers.', width: 1080, height: 1350 } satisfies ImageFile,
  caption: 'Project or client name',
}

export const work = {
  eyebrow: 'FEATURED WORK',
  title: 'Featured work',
  aside: 'Three words. Describing. Your work.',
  projects: [
    {
      title: 'Project One',
      kind: 'Type of work, e.g. Social media graphic',
      description: 'One or two sentences on the idea behind this piece and what you were trying to achieve.',
      media: { type: 'image', image: { src: 'images/project-1.webp', alt: 'Describe the image.', width: 1080, height: 1350 } },
    },
    {
      title: 'Project Two',
      kind: 'Type of work, e.g. Social media carousel',
      description: 'A carousel works well for multi-slide posts, presentations or step-by-step work.',
      media: {
        type: 'carousel',
        label: 'Project Two',
        slides: [1, 2, 3, 4].map(n => ({ src: `images/carousel/${n}.webp`, alt: `Describe what slide ${n} says.`, width: 1080, height: 1350 })),
      },
    },
    {
      title: 'Project Three',
      kind: 'Type of work, e.g. Email header',
      description: 'Wide images such as banners, headers or website screenshots get a wider panel automatically.',
      media: { type: 'image', image: { src: 'images/project-3.webp', alt: 'Describe the image.', width: 1280, height: 720 } },
    },
  ] as ProjectEntry[],
}

export const about = {
  eyebrow: 'BEHIND THE WORK',
  title: 'Behind',
  titleAccent: 'the work.',
  lead: ['A short line about you.', 'And another one.'],
  body: <>A paragraph about who you are: where you are from, what you study or do, <strong>where</strong>, and what you enjoy outside of work. Finish with how that shapes the way you approach what you do.</>,
  tags: ['Skill area', 'Skill area', 'Skill area'],
  cta: 'Let’s connect',
}

export const experience = {
  eyebrow: 'THE JOURNEY',
  title: 'Experience',
  aside: 'What you have done',
  label: 'Recent experience',
  roles: [
    {
      date: 'Month – Month Year',
      title: 'Job Title',
      organization: 'Company or Organization',
      summary: 'One or two sentences on what you did and what came of it.',
    },
    {
      date: 'Month Year – Present',
      current: true,
      title: 'Role Title',
      organization: 'Club, Team or Organization',
      summary: 'One or two sentences on your responsibilities.',
    },
  ] as ExperienceEntry[],
  skills: ['Tool', 'Tool', 'Tool', 'Tool', 'Tool'],
  /** Put your résumé PDF in public/documents/. Set this to null to hide the download link. */
  resume: { file: 'documents/resume.pdf', downloadName: 'Your-Name-Resume.pdf', label: 'Learn more — Download résumé' } as { file: string; downloadName: string; label: string } | null,
}

export const contact = {
  eyebrow: 'GET IN TOUCH',
  title: 'Let’s',
  titleAccent: 'connect.',
  email: 'you@example.com',
  /** Shown as written; the link dials the digits. Set to null to hide. */
  phone: '(555) 555-0100' as string | null,
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/your-profile' },
  ],
  footer: 'Field. Specialty. Interest.',
}
