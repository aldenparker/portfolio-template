import { motion, useReducedMotion } from 'motion/react'
import { Fragment, useEffect } from 'react'
import { about, contact, experience, hero, name, spotlight, work, type ExperienceEntry } from './content'
import { Project } from './Project'
import SiteHeader from './SiteHeader'
import { asset, sectionEyebrow } from './site'
import { Eyebrow, H2, Screen, ScrollSection, SectionHeading, TextLink } from './ui'

const CONTACT_LINK = 'max-w-full border-b border-transparent [overflow-wrap:anywhere] hover:border-current hover:text-accent'

function ExperienceRole({ date, current = false, title, organization, summary }: ExperienceEntry) {
  return (
    <article className="grid grid-cols-[1fr_2.2fr] gap-10 border-t border-line py-[34px] last:border-b max-sm:grid-cols-1 max-sm:gap-5">
      <p className="text-body leading-[1.8] text-muted">
        {date}
        {current && <span className="mt-2.5 block text-body tracking-[1px] text-accent max-sm:mt-0 max-sm:ml-3.5 max-sm:inline-block">Current role</span>}
      </p>
      <div>
        <h3 className="font-serif text-[clamp(25px,2.8vw,38px)] leading-[1.2]">{title}</h3>
        <p className="mt-[13px] text-body text-accent">{organization}</p>
        <p className="mt-5 max-w-[580px] text-body leading-[1.9] text-muted">{summary}</p>
      </div>
    </article>
  )
}

/** Renders lines with a forced break between them (headlines only). */
function Lines({ lines }: { lines: string[] }) {
  return lines.map((line, i) => <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>)
}

function App() {
  const reduceMotion = useReducedMotion()

  // Fade text in as it scrolls into view. Headings and paragraphs are picked up
  // automatically; other elements opt in with data-fade.
  useEffect(() => {
    if (reduceMotion) return
    const elements = document.querySelectorAll('main h1, main h2, main h3, main p, main [data-fade]')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle('text-in-view', entry.isIntersecting))
    }, { threshold: 0.08 })
    elements.forEach(element => {
      element.classList.add('scroll-fade-text')
      observer.observe(element)
    })
    return () => {
      observer.disconnect()
      elements.forEach(element => element.classList.remove('scroll-fade-text', 'text-in-view'))
    }
  }, [reduceMotion])

  return (
    <>
      <a className="absolute -top-[100px] left-5 z-30 bg-white p-[15px] focus:top-2.5" href="#main">Skip to content</a>
      <SiteHeader />

      <main id="main" tabIndex={-1}>
        <Screen>
          <section className="mx-auto grid w-[min(1280px,88%)] max-w-[1100px] flex-1 grid-cols-1 items-center gap-10 py-[42px] sm:grid-cols-2 sm:gap-[3%] sm:py-14" id="home" aria-labelledby="hero-title">
            <motion.div className="relative sm:col-start-2 sm:row-start-1 sm:-top-7" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="mb-7 font-sans text-body font-bold leading-[1.8] tracking-[1.5px] max-lg:tracking-[.6px]">{hero.eyebrow}</p>
              <h1 id="hero-title" className="font-serif text-[clamp(74px,8.7vw,132px)] font-bold leading-[1.02] tracking-[-.035em] text-accent max-lg:text-[clamp(63px,9vw,90px)] max-sm:text-[clamp(78px,18.5vw,113px)]"><Lines lines={hero.titleLines} /></h1>
              <div className="mt-11 max-sm:mt-[30px]">
                <p className="max-w-[31em] text-[16px] leading-[1.9] text-pretty text-muted">{hero.intro}</p>
                <TextLink href="#work" icon="↗">{hero.cta}</TextLink>
              </div>
            </motion.div>
            <motion.figure className="w-full max-w-[420px] justify-self-center max-sm:max-w-[340px] sm:col-start-1 sm:row-start-1 sm:justify-self-start xl:max-w-[460px]" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <img className="block aspect-[4/5] h-auto w-full rounded-xl object-cover object-top" src={asset(hero.portrait.src)} width={hero.portrait.width} height={hero.portrait.height} alt={hero.portrait.alt} fetchPriority="high" />
              <figcaption data-fade className="mt-3.5 text-body font-bold tracking-[1.6px] text-muted">{hero.portraitCaption}</figcaption>
            </motion.figure>
          </section>

          <div className="flex justify-around gap-5 bg-accent px-[6%] py-[22px] text-body tracking-[1px] text-cream max-sm:py-5 max-sm:leading-[1.7] max-sm:tracking-normal" aria-hidden="true">
            {hero.strip.map(phrase => <span key={phrase} data-fade>{phrase}</span>)}
          </div>
        </Screen>

        <ScrollSection className="bg-story" id="spotlight" aria-labelledby="spotlight-title">
          <div className="mx-auto grid w-[min(1280px,88%)] grid-cols-[1.2fr_1fr] items-center gap-[12%] max-lg:gap-[7%] max-sm:grid-cols-1 max-sm:gap-10">
            <div>
              <Eyebrow className="mb-[25px] text-muted">{sectionEyebrow('spotlight', spotlight.eyebrow)}</Eyebrow>
              <h2 id="spotlight-title" className="font-serif text-[clamp(44px,4.8vw,70px)] leading-[1.02] tracking-[-.045em] max-sm:text-[48px]">{spotlight.title}<br /><em className="text-accent">{spotlight.titleAccent}</em></h2>
              <div className="max-w-[470px] space-y-6 pt-[35px] text-body leading-[1.9] text-muted">
                {spotlight.paragraphs.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
              </div>
            </div>
            <figure className="max-w-[450px] justify-self-end max-sm:justify-self-center">
              <a className="block" href={asset(spotlight.image.src)} target="_blank" rel="noreferrer" aria-label={`View ${spotlight.caption} image at full size`}>
                <img className="block h-auto w-full" src={asset(spotlight.image.src)} width={spotlight.image.width} height={spotlight.image.height} loading="lazy" alt={spotlight.image.alt} />
              </a>
              <figcaption data-fade className="mt-[18px] flex justify-between gap-[15px] text-body leading-[1.8] text-muted"><span>{spotlight.caption}</span></figcaption>
            </figure>
          </div>
        </ScrollSection>

        <ScrollSection className="bg-work px-[6%]" id="work" aria-labelledby="work-title">
          <div className="mx-auto max-w-[1280px]">
            <SectionHeading id="work-title" eyebrow={sectionEyebrow('work', work.eyebrow)} title={<>{work.title}<span className="text-accent">.</span></>} aside={work.aside} />
            <div className="flex flex-col">
              {work.projects.map((project, i) => (
                <Project key={project.title} {...project} number={String(i + 1).padStart(2, '0')} flip={i % 2 === 1} />
              ))}
            </div>
          </div>
        </ScrollSection>

        <ScrollSection className="bg-about px-[6%] text-about-text" id="about" aria-labelledby="about-title">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 items-center gap-[12%] max-sm:grid-cols-1 max-sm:gap-10">
            <div>
              <Eyebrow className="mb-[25px] text-about-muted">{sectionEyebrow('about', about.eyebrow)}</Eyebrow>
              <h2 id="about-title" className={`${H2} text-about-accent`}>{about.title}<br /><em>{about.titleAccent}</em></h2>
            </div>
            <div>
              <p className="mb-[30px] font-serif text-[clamp(30px,3.2vw,46px)] leading-[1.15] tracking-[-.025em]"><Lines lines={about.lead} /></p>
              <p className="max-w-[425px] text-body leading-[1.95] text-about-muted">{about.body}</p>
              <div data-fade className="mt-[35px] flex flex-wrap gap-5">
                {about.tags.map((tag, i) => <span key={i} className="border-t border-[#c5c0b650] pt-2.5 text-body text-about-muted">{tag}</span>)}
              </div>
              <TextLink href="#contact" icon="↗" dark>{about.cta}</TextLink>
            </div>
          </div>
        </ScrollSection>

        <ScrollSection className="mx-auto w-[min(1280px,88%)]" id="experience" aria-labelledby="experience-title">
          <SectionHeading id="experience-title" eyebrow={sectionEyebrow('experience', experience.eyebrow)} title={<>{experience.title}<span className="text-accent">.</span></>} aside={experience.aside} />
          <p className="mb-[23px] text-body tracking-[1px] text-muted">{experience.label}</p>
          <div>
            {experience.roles.map(role => <ExperienceRole key={`${role.title}-${role.date}`} {...role} />)}
          </div>
          <section className="mt-[52px] grid grid-cols-[1fr_2.2fr] items-baseline gap-10 pt-7 max-sm:mt-10 max-sm:grid-cols-1 max-sm:gap-5" aria-labelledby="skills-title">
            <h3 id="skills-title" className="font-serif text-[26px] leading-[1.2] text-accent">Skills &amp; tools</h3>
            <ul data-fade className="flex flex-wrap gap-x-7 gap-y-4 text-body leading-[1.7] text-accent">
              {experience.skills.map((skill, i) => <li key={i}>{skill}</li>)}
            </ul>
          </section>
          {experience.resume && <TextLink href={asset(experience.resume.file)} download={experience.resume.downloadName} icon="↓">{experience.resume.label}</TextLink>}
        </ScrollSection>

        <Screen>
          <ScrollSection fill className="bg-contact" id="contact" aria-labelledby="contact-title">
            <div className="mx-auto w-[min(1280px,88%)]">
              <Eyebrow className="mb-[25px]">{sectionEyebrow('contact', contact.eyebrow)}</Eyebrow>
              <h2 id="contact-title" className="relative font-serif text-[clamp(85px,12vw,180px)] leading-[1.02] tracking-[-.045em]">
                {contact.title}<br /><em className="text-accent">{contact.titleAccent}</em>
                <span aria-hidden="true" className="absolute top-[20%] right-[4%] font-sans text-[80px] text-accent max-sm:right-0 max-sm:text-[45px]">↗</span>
              </h2>
              <div className="mt-[35px] flex items-end justify-between gap-[25px] max-sm:flex-col max-sm:items-start">
                <address data-fade className="flex flex-col items-start gap-4 text-body leading-[1.6] not-italic">
                  <a className={CONTACT_LINK} href={`mailto:${contact.email}`}>{contact.email}</a>
                  {contact.phone && <a className={CONTACT_LINK} href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a>}
                  {contact.links.map(link => (
                    <a key={link.href} className={CONTACT_LINK} href={link.href} target="_blank" rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a>
                  ))}
                </address>
                <TextLink href="#home" icon="↑">Back to top</TextLink>
              </div>
            </div>
          </ScrollSection>
          <footer className="mx-auto flex w-[min(1280px,88%)] justify-between gap-5 py-[25px] text-body text-muted max-sm:flex-col max-sm:gap-2.5">
            <span>{name} / Portfolio</span><span>{contact.footer}</span>
          </footer>
        </Screen>
      </main>
    </>
  )
}

export default App
