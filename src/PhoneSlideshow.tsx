import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import type { ImageFile } from './content'
import { asset } from './site'

const CONTROL = 'min-h-11 min-w-11 border-b border-line bg-transparent'

/** Slides shown one at a time inside a phone frame, advancing on a timer while on screen. */
export default function PhoneSlideshow({ label, slides }: { label: string; slides: ImageFile[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref, { amount: 0.3 })
  const playing = !paused && !reducedMotion
  const slide = slides[index]

  useEffect(() => {
    if (!playing || !visible) return
    const timer = window.setInterval(() => setIndex(current => (current + 1) % slides.length), 4500)
    return () => window.clearInterval(timer)
  }, [playing, visible, slides.length])

  function goTo(next: number) {
    setPaused(true)
    setIndex((next + slides.length) % slides.length)
  }

  return (
    <div ref={ref} className="w-full min-w-0 p-5 text-center max-sm:p-2.5" role="region" aria-roledescription="carousel" aria-label={`${label} slides`}>
      <div className="mx-auto w-[min(100%,300px)] overflow-hidden rounded-[35px] border-[6px] border-ink bg-phone px-[5px] pt-[15px] pb-2.5 shadow-[0_22px_38px_#24232118]">
        <div className="mx-auto mb-5 h-1.5 w-[62px] rounded-[9px] bg-ink" aria-hidden="true" />
        <div className="flex justify-between px-2.5 pb-[13px] text-body"><span>{label}</span><span aria-hidden="true">•••</span></div>
        <div className="aspect-[4/5] overflow-hidden bg-screen [perspective:800px]" aria-live={playing ? 'off' : 'polite'}>
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={index}
              className="block h-full w-full object-contain"
              src={asset(slide.src)}
              width={slide.width} height={slide.height}
              alt={`Slide ${index + 1} of ${slides.length}. ${slide.alt}`}
              initial={reducedMotion ? false : { opacity: 0, rotateY: -12, x: 20 }}
              animate={{ opacity: 1, rotateY: 0, x: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, rotateY: 12, x: -20 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </div>
        <div className="flex justify-center pt-2.5" aria-label="Choose a slide">
          {slides.map((_, i) => (
            <button key={i} type="button" className="grid h-[34px] w-[34px] place-items-center bg-transparent" onClick={() => goTo(i)} aria-label={`Show slide ${i + 1}`} aria-current={index === i ? 'true' : undefined}>
              <span className={`h-[5px] w-[5px] rounded-full ${index === i ? 'bg-accent' : 'bg-dot'}`} />
            </button>
          ))}
        </div>
        <div className="mx-auto mt-3 h-1 w-[90px] rounded-lg bg-ink" aria-hidden="true" />
      </div>
      <div className="mt-6 flex items-center justify-center gap-[15px] text-body">
        <button type="button" className={`${CONTROL} text-[18px]`} onClick={() => goTo(index - 1)} aria-label="Previous slide">←</button>
        <span>{index + 1} / {slides.length}</span>
        <button type="button" className={`${CONTROL} text-[18px]`} onClick={() => goTo(index + 1)} aria-label="Next slide">→</button>
        {!reducedMotion && <button type="button" className={`${CONTROL} text-body`} onClick={() => setPaused(current => !current)}>{paused ? 'Play' : 'Pause'}</button>}
      </div>
      <a className="mt-3 inline-block text-body underline underline-offset-4" href={asset(slide.src)} target="_blank" rel="noreferrer">View slide full size ↗</a>
    </div>
  )
}
