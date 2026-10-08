# Portfolio template

Single-page portfolio site built from a template. Vite + React 19 + TypeScript, Tailwind CSS v4, Motion for animation, Bodoni Moda bundled via @fontsource. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

The person you are working with is the site's owner. They may not be a developer: explain in plain language, avoid jargon, and tell them what to check in the browser rather than asking them to read code.

## First run: personalizing the template

If the site still contains placeholders (`grep -rn "Your Name\|YOUR-USERNAME\|you@example.com" src index.html public/favicon.svg` finds matches), the owner most likely wants it personalized. Work through this:

1. **Gather details.** Ask for anything you don't already have, in one message rather than one question at a time: name; a one-line description of what they do or study and where; their résumé or LinkedIn text; 3 to 5 pieces of work with a title, type and one or two sentences each; one project or role to tell as the spotlight story; email, optional phone, links; skills and tools; a few short phrases for the colored strip and footer. Offer to draft wording from their résumé so they only have to approve it. Use their words when they give them.
2. **Fill `src/content.tsx`.** All visible text, links and media references live there. Keep the types; `ReactNode` fields may use `<strong>`/`<em>`. If a section doesn't apply, ask whether to drop it (see "Changing sections").
3. **Media.** Put files in `public/` and reference them by path inside `public/` (no leading slash). For every image, set `width`/`height` to the file's real pixel size and write real alt text describing what it shows. Convert to WebP at quality ~85 and resize to no more than about 2x display size (roughly 1000–1400px on the long side; the portrait displays up to 460px wide). Any available tool is fine: `cwebp`, ImageMagick `magick`, Python Pillow, or the owner can use https://squoosh.app. Videos are MP4 in `public/videos/<name>.mp4` with a WebP cover frame at `public/images/video-covers/<name>.webp`.
4. **Delete placeholders** that were replaced or are no longer used (`public/images/*.webp`, `public/images/carousel/`, `public/documents/resume.pdf`). Every file in `public/` must be referenced.
5. **`index.html`.** Title, description (the same text in `description`, `og:description`, `twitter:description`), `og:site_name`, `og:image:alt`, and replace every `https://YOUR-USERNAME.github.io/YOUR-REPO/` with the real site address (ask; it is shown in the repository's Settings → Pages, or is their custom domain). Social tags need absolute URLs.
6. **Link-preview image.** Replace `public/images/og-image.jpg` with a 1200x630 JPEG (name plus portrait on the cream background works well).
7. **Favicon.** Change the initials in `public/favicon.svg`.
8. **Colors and fonts**, only if the owner wants: the `@theme` block in `src/index.css`; the headline font import is in `src/main.tsx`.
9. **Check.** Run the correctness sweep below, then tell the owner how to see it (`pnpm dev`, or commit and wait for the Actions run) and what to look at.
10. **Publishing.** If GitHub Pages isn't set up yet, walk them through the "Turn on GitHub Pages" steps in `README.md`.

If the owner is working in a chat window without file access, ask them to paste `src/content.tsx`, return the complete edited file, and tell them which other files to change and how (README "Option B").

## Commands

```sh
pnpm install --frozen-lockfile   # Node 24, pnpm 11 (see .nvmrc / packageManager)
pnpm dev                         # local preview
pnpm lint                        # oxlint
pnpm build                       # tsc -b && vite build -> dist/
pnpm preview                     # serve dist/
```

The CI workflow runs lint and build with a frozen lockfile. If you add or remove a dependency, do it with `pnpm add` / `pnpm remove` so `pnpm-lock.yaml` is updated in the same change, otherwise the deploy fails.

## Where things live

- `src/content.tsx`: every piece of visible text, the nav labels, links, and media references, with the types (`ImageFile`, `ProjectMedia`, `ProjectEntry`, `ExperienceEntry`). Content changes happen here, not in components.
- `src/App.tsx`: section layout and order, plus the IntersectionObserver that fades text in.
- `src/ui.tsx`: shared building blocks: `Screen` (one viewport-tall snap stop), `ScrollSection` (fading full-height section), `Eyebrow`, `SectionHeading`, `TextLink`, and the shared `H2` class string.
- `src/SiteHeader.tsx`: sticky header. Inline links from 761px up, name plus menu button below.
- `src/Project.tsx`: `Project` (one featured-work entry) and its media panels (`ImagePanel`, `PortraitVideo`, `LandscapeVideo`, and the carousel via `PhoneSlideshow`). The media type in content picks the panel.
- `src/PhoneSlideshow.tsx`: phone-frame carousel; slides come from content.
- `src/site.ts`: `navLinks` (from `nav` in content), `sectionEyebrow()` which numbers sections by nav order, and the `asset()` helper. Always reference files in `public/` through `asset()` so the Vite base URL is applied.
- `src/index.css`: the Tailwind theme (colors, fonts, breakpoints, `--spacing-fold`) and the small set of global rules utilities cannot express (scroll snapping on `html`, focus ring, selection, the JS-toggled fade classes).
- `index.html`: title, description, favicon link, canonical URL, Open Graph and Twitter tags.
- `public/images/`: WebP images, plus `og-image.jpg` (1200x630 JPEG for link previews). `public/videos/`: MP4 (create when needed). `public/documents/`: résumé PDF.
- `vite.config.ts`: `base: './'` makes the build work at any path (`user.github.io/repo/`, a root domain, or a custom domain) without changes.
- `README.md`: owner-facing guide, including GitHub Pages setup. Keep its file list accurate when structure changes.

## Changing sections

- Section order is the order in `App.tsx`; the header links and the "01 /", "02 /" numbers come from the order of `nav` in `src/content.tsx`. Keep the two in the same order. Each section's `id` must match its `nav` key.
- To remove a section: delete its block in `App.tsx`, its key in `nav`, and its export in `content.tsx` if nothing else uses it. `SectionId` is derived from `nav`, so the type checker points at anything left behind.
- To add one: copy the shape of an existing `ScrollSection` (with `id`, `aria-labelledby`, and an `Eyebrow` using `sectionEyebrow`), add its key to `nav`, and its text to `content.tsx`.
- Featured-work entries alternate sides and are numbered automatically from their position in `work.projects`.

## Styling rules

- Layout and typography are Tailwind utility classes on the elements. Do not add component classes to `index.css` for things utilities can express. Custom CSS is only for global behaviour and for classes that JavaScript toggles.
- Design tokens are in `@theme` in `index.css`. Use them by name: `text-accent`, `bg-cream`, `text-muted`, `border-line`, `font-serif`, `text-body` (14px body size), `min-h-fold` (viewport height below the header). To recolor the site, change token values rather than class names. `theme-color` in `index.html` and the colors in `favicon.svg` should follow `cream` and `accent`.
- Breakpoints are the site's own, not Tailwind defaults: `sm` = 601px, `md` = 761px, `lg` = 901px, `xl` = 1600px. Phone is `max-sm:`, tablet is `sm:max-lg:`, desktop is `lg:`. `md` exists only for the header's menu-button switch.
- Exact pixel values from the design are kept as arbitrary values (`py-[100px]`, `text-[clamp(...)]`). Use the spacing scale only where it is exactly equal (4px steps).
- `--header-height` (76px, 68px on phones) is a plain CSS variable on `:root` and feeds both the snap stops' `scroll-margin-top` and `--spacing-fold`.
- When a shared component needs a different margin, tracking, or color per use, pass it via `className`; the base class strings deliberately leave those out to avoid two conflicting utilities on one element.
- Headline fields that are arrays of lines (`hero.titleLines`, `about.lead`) get forced line breaks. Body copy must never use `<br>`; it wraps naturally within a `max-w`.

## Scroll behaviour

- `html` has `scroll-snap-type: y mandatory`. Every `ScrollSection` and `Screen` is `snap-start snap-always scroll-mt-(--header-height)` and at least `min-h-fold` tall, so each fills the viewport below the header.
- The header offset is `scroll-margin-top` on the snap stops, never `scroll-padding-top` on `html`. Firefox sizes the free-scroll range of an oversized section with scroll-padding subtracted but measures it from the unpadded box, so with scroll-padding it rests one header height past the section's bottom. scroll-margin is exact in Firefox, Chromium and WebKit, and anchor links honour it too.
- Sections taller than the viewport (Featured work) rely on the CSS rule that a snap area larger than the snapport lets the user rest anywhere inside it and snap to its top or bottom edge. Do not add snap alignment to the projects inside it.
- The hero plus the accent strip, and the contact section plus the footer, are grouped in a `Screen` so neither the strip nor the footer is skipped by snapping.
- Snapping is off below 601px and under `prefers-reduced-motion`. Keep it that way unless the owner asks.
- `scroll-behavior: smooth` also drives the anchor links in the header.

## Correctness sweep

After any non-trivial change, or when asked to check the site, run through this list.

1. `pnpm lint && pnpm build` must pass clean. The build runs `tsc -b`, so type errors fail it. If you cannot run them (no Node available), say so and ask the owner to check the Actions run after committing.
2. Inspect the generated CSS in `dist/assets/*.css` for every arbitrary or unusual utility you introduced (`grep -F` the expected declaration). Tailwind silently drops classes it cannot parse. Also confirm the order of `max-*` variants: `max-lg` rules must appear before `max-md` before `max-sm` so phone overrides win.
3. Placeholders: the grep in "First run" finds nothing, and no placeholder images remain unless the owner chose to keep them for now.
4. Dependencies: every package in `package.json` must be imported somewhere. Remove unused ones with `pnpm remove`.
5. Assets: every file in `public/` must be referenced; delete orphans. Images are WebP at no more than 2x their largest display size; `width`/`height` in content must match the file's real dimensions. Videos keep `preload="metadata"`.
6. `index.html`: favicon linked, description present, Open Graph and Twitter tags present with absolute URLs on the site's real address.
7. Markup consistency: repeated structures must come from one component (projects, experience roles, eyebrows, text links). Counts, numbers and labels derive from data in `content.tsx`, not hard-coded next to it.
8. Accessibility: `aria-labelledby` on sections, `aria-expanded`/`aria-controls` on the menu button, Escape closes the menu and returns focus, skip link target is focusable, decorative arrows are `aria-hidden`, images have real alt text, hover-only styles are wrapped in `@media (hover: hover)` (Tailwind does this by default).
9. Responsive: reason through every rule at phone (<601), tablet (601 to 900) and desktop (901+) widths. Long names or headlines should still fit at phone width; shorten or reduce the clamp if not.
10. Scroll: each section is a full-height snap stop, oversized sections can be scrolled through and rest exactly on their bottom edge, and anchor links land under the header. Firefox and Chromium snap implementations differ; ask the owner to check both if scrolling changed.
11. Before changing the design or removing something the owner did not ask to remove, ask them, with a recommended option first. Pure bug fixes can be applied directly and listed in the summary.

## Working agreements

- The owner does the visual checks in a real browser unless you have browser tooling; ask for a screenshot or a measurement when you need one.
- Do not commit or push unless asked. Enabling GitHub Pages and changing DNS are the owner's actions; walk them through it using `README.md`.
- The owner's copy (names, dates, wording, punctuation) is content, not a style issue. Leave it unless asked, and don't invent facts about them: ask, or leave a clearly marked gap.
- Never put private details (home address, personal phone, ID numbers) on the page unless the owner explicitly wants them; the site is public.
