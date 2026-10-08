import { useEffect, useRef, useState } from 'react'
import { name } from './content'
import { navLinks } from './site'

/** Matches the md breakpoint in index.css: inline links from here up, menu button below. */
const INLINE_NAV = '(min-width: 761px)'

const NAV_DESKTOP = 'flex items-center gap-[clamp(22px,4vw,62px)] whitespace-nowrap px-[3px] py-[9px] text-body tracking-[.5px] max-lg:gap-6'
const NAV_MOBILE = 'max-md:absolute max-md:inset-x-0 max-md:top-full max-md:flex-col max-md:items-stretch max-md:gap-0 max-md:whitespace-normal max-md:border-b max-md:border-line max-md:bg-cream/98 max-md:px-[6%] max-md:py-2 max-md:shadow-[0_18px_30px_#24232114] max-md:backdrop-blur-[12px]'
const BAR = 'h-0.5 w-5 bg-ink transition duration-200'

export default function SiteHeader() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      close()
      buttonRef.current?.focus()
    }
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close()
    }
    const inlineNav = window.matchMedia(INLINE_NAV)
    const onResize = (event: MediaQueryListEvent) => {
      if (event.matches) close()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    inlineNav.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
      inlineNav.removeEventListener('change', onResize)
    }
  }, [open])

  return (
    <header ref={headerRef} className="sticky top-0 z-20 flex min-h-(--header-height) items-center justify-between border-b border-line bg-cream/96 px-[6%] py-[15px] backdrop-blur-[12px] max-sm:py-3 md:justify-center">
      <a href="#home" className="font-serif text-[18px] font-bold tracking-[.02em] text-accent md:hidden" onClick={() => setOpen(false)}>{name}</a>

      <button
        ref={buttonRef}
        type="button"
        className="group -mr-2.5 flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
        aria-expanded={open}
        aria-controls="site-nav"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(current => !current)}
      >
        <span className={`${BAR} group-aria-expanded:translate-y-[7px] group-aria-expanded:rotate-45`} />
        <span className={`${BAR} group-aria-expanded:opacity-0`} />
        <span className={`${BAR} group-aria-expanded:-translate-y-[7px] group-aria-expanded:-rotate-45`} />
      </button>

      <nav
        id="site-nav"
        aria-label="Main navigation"
        className={`${NAV_DESKTOP} ${NAV_MOBILE} ${open ? 'max-md:flex max-md:motion-safe:animate-menu-in' : 'max-md:hidden'}`}
      >
        {navLinks.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="hover:text-accent max-md:border-t max-md:border-line max-md:py-3.5 max-md:first:border-t-0">
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}
