# Portfolio template

A single-page portfolio site you can make your own with the help of an AI assistant (Claude, ChatGPT, or similar) and publish for free on GitHub Pages.

The page has a hero with your photo, a spotlight story, a featured-work gallery (images, videos, and a phone-style carousel), an about section, experience and skills with a résumé download, and contact details. Every section is a full-screen scroll stop, text fades in as you scroll, and the layout adapts to phones, tablets and desktops.

All the text lives in **one file, `src/content.tsx`**. The images in `public/` are labeled placeholders showing the size each replacement should be.

---

## 1. Get your own copy

You need a free [GitHub account](https://github.com/signup).

**If this repository shows a green "Use this template" button:** click it, choose **Create a new repository**, give it a name (for example `portfolio`), set it to **Public**, and click **Create repository**.

**If you downloaded a ZIP instead:** create a new empty public repository on GitHub, then upload the files. In the new repository, click **uploading an existing file**, drag in everything from the unzipped folder (including the `.github` folder; if your file browser hides it, turn on hidden files), and click **Commit changes**.

> The `.github/workflows/deploy.yml` file is what publishes the site. Make sure it made it into your repository.

## 2. Turn on GitHub Pages

1. In your repository, open **Settings → Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **GitHub Actions**. There is nothing else to fill in.
3. Open the **Actions** tab. If you see a failed "Deploy to GitHub Pages" run from before you changed the setting, open it and click **Re-run all jobs**. Otherwise, any change you commit starts a new run.
4. When the run shows a green check (about a minute), your site is live at:

   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO/
   ```

   The address is also shown at the top of **Settings → Pages**.

From now on, **every change committed to the `main` branch republishes the site automatically.** If a run fails, open it in the Actions tab to see why; the usual cause is a typo in `src/content.tsx`, and pasting the error into your AI assistant will get it fixed.

> Tip: if you name the repository exactly `YOUR-USERNAME.github.io`, the site is served at `https://YOUR-USERNAME.github.io/` with no extra path.

## 3. Make it yours with an AI assistant

Pick whichever way of working suits you.

### Option A: an AI coding assistant on your computer (easiest for big changes)

Tools such as [Claude Code](https://claude.com/claude-code), the ChatGPT Codex app, Cursor or GitHub Copilot can read and edit the whole project.

1. Download your repository to your computer (green **Code** button → **Download ZIP**, or clone it with GitHub Desktop).
2. Open the folder in your assistant and say something like:

   > Personalize this portfolio for me. Here is my résumé: (paste it or attach the PDF). Ask me for anything else you need.

   The assistant reads `AGENTS.md`, which tells it how the project is laid out, what to ask you, and how to check its work.
3. Put your photos and work samples in the folder when it asks, or ask it to convert and resize images for you.
4. Upload or push the changed files back to GitHub. The site republishes on its own.

### Option B: in the browser only, with ChatGPT or Claude chat (nothing to install)

1. On GitHub, open `src/content.tsx` and copy its contents.
2. Paste it into a chat with this message, plus your résumé or LinkedIn text:

   > This is the content file for my portfolio website. Fill it in with my details below. Keep the exact structure, types and quotes, change only the text values, and give me back the whole file. If a section doesn't fit me, tell me rather than deleting it. My details: …

3. Back on GitHub, open `src/content.tsx`, click the pencil icon, replace everything with the AI's version, and click **Commit changes**.
4. Do the same for `index.html` (page title, description, and your site address in place of `YOUR-USERNAME.github.io/YOUR-REPO`).
5. Upload your images: open the `public/images` folder, **Add file → Upload files**. Either give them the same names as the placeholders (`portrait.webp`, `project-1.webp`, …) or ask the AI to update the file names and sizes in `content.tsx`.

Wait a minute after each commit and refresh your site.

### What to prepare

- A portrait photo (vertical works best; it is cropped to 4:5).
- Images of 3 to 5 pieces of work, plus one for the spotlight story. Videos (MP4) are supported too.
- Your résumé as a PDF.
- Your email, and optionally phone number and LinkedIn or other links.
- A 1200 × 630 image for link previews when the site is shared (`public/images/og-image.jpg`). An AI assistant can make one from your photo.

Images should be **WebP**, at most about twice the size they display at (roughly 1000–1400 px on the long side). Free converters such as [Squoosh](https://squoosh.app) do this in the browser.

## What lives where

```
src/content.tsx         ALL the text, links, and image references. Start here.
index.html              Browser tab title, search description, link-preview tags
src/index.css           Colors and fonts (the @theme block at the top)
src/App.tsx             Section layout and order
src/ui.tsx              Shared building blocks (sections, headings, links)
src/Project.tsx         A featured-work entry and its image/video panels
src/PhoneSlideshow.tsx  The phone-frame carousel
src/SiteHeader.tsx      Top navigation and the phone menu
src/site.ts             Navigation helpers and asset() for files in public/
public/images/          Your photos and work images (placeholders to replace)
public/videos/          Your videos, if any (create the folder)
public/documents/       Your résumé PDF
public/favicon.svg      Browser tab icon (shows your initials)
.github/workflows/      Builds and publishes the site on every commit
AGENTS.md               Instructions for AI assistants (CLAUDE.md points to it)
```

Common changes:

- **Colors:** the `--color-…` values in `src/index.css`. `accent` is the main highlight color.
- **Fonts:** the headline font is Bodoni Moda, loaded in `src/main.tsx` and named in `--font-serif`. Ask your assistant to swap it for another font from [Fontsource](https://fontsource.org).
- **Add or remove a featured-work entry:** add or remove an item in `work.projects` in `src/content.tsx`. Numbering and left/right alternation are automatic.
- **Remove a whole section:** ask your assistant; it removes the section from `src/App.tsx` and its entry from `nav` in `src/content.tsx` so the numbering stays right.
- **Initials in the browser tab:** edit the two letters in `public/favicon.svg`.

## Custom domain (optional)

If you own a domain (for example `yourname.com`):

1. In **Settings → Pages → Custom domain**, enter it and click **Save**.
2. At your domain registrar, add the DNS records GitHub shows (see [GitHub's guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)). For a root domain that is four `A` records pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, and a `CNAME` record for `www` pointing to `YOUR-USERNAME.github.io`.
3. Once the check passes, tick **Enforce HTTPS**.
4. Update the URLs in `index.html` to your domain.

No code changes are needed; the site works at any address.

## Running it on your computer (optional)

You only need this to preview changes before publishing. It requires [Node.js 24](https://nodejs.org) and pnpm 11 (`npm install -g pnpm`, or `corepack enable`). A Nix dev shell is also included (`nix develop`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the address it prints. Other commands:

| Command | What it does |
|---|---|
| `pnpm dev` | Start a local preview that updates as you edit |
| `pnpm lint` | Check the code for mistakes |
| `pnpm build` | Type-check and build the final site into `dist/` |
| `pnpm preview` | Serve the built site locally |

Opening `index.html` directly in a browser will not work; use `pnpm dev`.

If you add or remove a package, use `pnpm add` / `pnpm remove` so `pnpm-lock.yaml` updates too, otherwise the publish step fails.

## Built with

[Vite](https://vite.dev), React 19, TypeScript, [Tailwind CSS v4](https://tailwindcss.com), [Motion](https://motion.dev), and Bodoni Moda via [Fontsource](https://fontsource.org). Hosted on GitHub Pages via GitHub Actions.
