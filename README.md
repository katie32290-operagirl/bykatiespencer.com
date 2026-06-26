# bykatiespencer.com

Personal brand site for **Katie Spencer** — brand architect & arts executive.
Editorial-luxury design: warm bone/ink/amber "Gallery" palette, Fraunces + Plus
Jakarta Sans, subtle Framer Motion.

## Stack

- **Next.js 16** (App Router) · React 19 · TypeScript
- **Tailwind CSS v4** + **shadcn/ui** (Radix primitives)
- **Framer Motion** · **lucide-react** · **next-themes**

## Running locally

Node 22+ is required. This machine has a standalone Node at `~/.local/node`
already on your PATH (added to `~/.zshrc`).

```bash
cd ~/bykatiespencer
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

> Note: `npm run dev` uses Turbopack by default. If you hit a Turbopack
> subprocess error in a restricted shell, run `npm run dev -- --webpack`.

## Project structure

```
app/(site)/      Pages — home, about, portfolio, work-with-me, writing, contact
app/sitemap.ts   SEO: sitemap.xml
app/robots.ts    SEO: robots.txt
components/ui/    shadcn primitives
components/layout, components/motion, components/sections
content/         ← EDIT YOUR CONTENT HERE (typed, CMS-ready)
lib/             fonts, seo helpers, utils
types/           shared content interfaces
```

## Editing content

All copy lives in `content/` as typed data — no code changes needed:

- `content/site.ts` — name, nav, socials, SEO defaults
- `content/experience.ts` — roles, education, leadership (from CV)
- `content/projects.ts` — portfolio case studies
- `content/services.ts` — Work With Me offerings
- `content/writing.ts` — essays
- `content/testimonials.ts` — replace placeholder quotes with real, attributed ones

Each shape matches an interface in `types/` — when you move to a CMS later,
only the data source changes, not the components.

## Adding your photos

1. Drop images into `public/` (e.g. `public/katie-portrait.jpg`).
2. About page: pass the path to `<Portrait src="/katie-portrait.jpg" />`
   in `app/(site)/about/page.tsx`. Until then it shows an intentional placeholder.
3. Add an `og.png` (1200×630) to `public/` for social sharing previews.

## To do before launch

- [ ] Replace placeholder testimonials with real quotes
- [ ] Add real portrait + `og.png`
- [ ] Confirm portfolio metrics/numbers
- [ ] Wire the contact form to an email service (see `components/contact-form.tsx`)
- [ ] Set the real domain in `content/site.ts` if it changes
