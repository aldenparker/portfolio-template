import { motion, useReducedMotion } from 'motion/react'
import type { ComponentProps, ReactNode } from 'react'

/** Section title style shared by the numbered sections. */
export const H2 = 'font-serif text-[clamp(50px,6vw,88px)] leading-[1.02] tracking-[-.045em]'

/** One viewport-tall snap stop that stacks several blocks (hero + strip, contact + footer). */
export function Screen({ children }: { children: ReactNode }) {
  return <div className="flex min-h-fold snap-start snap-always scroll-mt-(--header-height) flex-col">{children}</div>
}

type ScrollSectionProps = ComponentProps<'section'> & {
  /** Stretch inside a Screen instead of being a snap stop of its own. */
  fill?: boolean
}

/** A content section that fades in as it scrolls into view. By default it is a full-height snap stop. */
export function ScrollSection({ children, className = '', fill = false, ...props }: ScrollSectionProps) {
  const reducedMotion = useReducedMotion()
  const sizing = fill ? 'flex-1' : 'min-h-fold snap-start snap-always'
  return (
    <section {...props} className={`flex scroll-mt-(--header-height) flex-col justify-center py-[100px] max-lg:py-[75px] max-sm:py-[60px] ${sizing} ${className}`}>
      <motion.div
        className="w-full"
        initial={reducedMotion || props.id === 'work' ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.01 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </section>
  )
}

/** Small tracked label above a heading. Callers set margin and color. */
export function Eyebrow({ className = '', children, ...props }: ComponentProps<'p'>) {
  return <p {...props} className={`font-sans text-body leading-[1.8] tracking-[2px] ${className}`}>{children}</p>
}

type SectionHeadingProps = { id: string; eyebrow: string; title: ReactNode; aside: string }

/** Eyebrow + title on the left, a short tagline on the right. */
export function SectionHeading({ id, eyebrow, title, aside }: SectionHeadingProps) {
  return (
    <div className="mb-[65px] flex items-end justify-between gap-[30px] max-sm:mb-10 max-sm:flex-col max-sm:items-start max-sm:gap-[22px]">
      <div>
        <Eyebrow className="mb-[25px]">{eyebrow}</Eyebrow>
        <h2 id={id} className={H2}>{title}</h2>
      </div>
      <p className="mb-[9px] text-body tracking-[1px] text-muted">{aside}</p>
    </div>
  )
}

type TextLinkProps = ComponentProps<'a'> & {
  /** Decorative arrow shown after the label. */
  icon: string
  /** Use the accent hover color on dark backgrounds. */
  dark?: boolean
}

/** Underlined call-to-action link with a trailing arrow. */
export function TextLink({ icon, dark = false, className = '', children, ...props }: TextLinkProps) {
  const hover = dark ? 'hover:text-about-accent' : 'hover:text-accent'
  return (
    <a {...props} data-fade className={`mt-7 inline-flex items-center gap-[35px] border-b border-current pb-[9px] font-sans text-body leading-[1.6] ${hover} ${className}`}>
      {children}
      <span aria-hidden="true" className="text-[19px]">{icon}</span>
    </a>
  )
}
