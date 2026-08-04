# Ahmed Wafy — Portfolio

A personal developer portfolio built with Next.js, TypeScript, and Tailwind CSS, with all content — bio, projects, experience, and contact info — served from Sanity, a headless CMS. Nothing personal is hardcoded in the codebase; everything is editable through a CMS UI without touching or redeploying code.

**Live site:** _add your deployed Vercel URL here_

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| CMS | Sanity (embedded Studio at `/studio`) |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Icons | lucide-react, react-icons |
| Deployment | Vercel |

## Architecture

```
src/
  app/
    page.tsx                 # Homepage — composes all sections
    layout.tsx                # Root layout, fonts, theme, SEO metadata
    icon.tsx                  # Dynamically generated favicon (from CMS name)
    opengraph-image.tsx       # Dynamically generated social share image
    projects/[slug]/          # Individual project detail pages
    api/contact/route.ts      # Server route that sends contact form emails via Resend
    studio/[[...tool]]/       # Embedded Sanity Studio
  components/
    sections/                 # Hero, About, Projects, Experience, Contact
    layout/                   # Nav, mobile nav
    theme/                    # Dark/light theme provider + toggle
    ui/                       # Reusable primitives: BracketFrame, Reveal, RichText, etc.
  sanity/
    schemaTypes/               # CMS content models: person, project, experience
    queries.ts                 # GROQ queries
    fetchers.ts                # Typed data-fetching functions used by pages
  types/sanity.ts               # TypeScript interfaces mirroring the CMS schema
```

## Content model (Sanity)

- **Person** (singleton) — name, headline, bio (rich text), avatar, resume URL, skills, social links
- **Project** — title, slug, summary, full description (rich text), cover image, gallery, tech stack, live/repo URLs, featured flag
- **Experience** — role, company, dates, current-role flag, description (rich text), tech stack

All content is managed by editing and publishing documents in the Studio (`/studio`) — no code changes needed to update the site's content.

## Local setup

```bash
npm install
```

Create a `.env.local` file:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=your_email
```

```bash
npm run dev
```

- `http://localhost:3000` — the site
- `http://localhost:3000/studio` — the CMS

The first time you run the Studio locally, Sanity will prompt you to add `http://localhost:3000` as a CORS origin for your project (via sanity.io/manage) — this is a one-time step per environment (also required again for your production URL after deploying).

## Design system

The visual direction is a "spec sheet" / precision-instrument aesthetic:

- **Colors** — deep navy/charcoal in dark mode, warm paper tones in light mode, with a single amber accent color used sparingly for signal (links, active states, highlights)
- **Type** — Space Grotesk (display), IBM Plex Sans (body), IBM Plex Mono (labels, dates, tags)
- **Signature motif** — a corner-bracket "viewfinder" frame (`BracketFrame` component) wraps every card across the site and tightens on hover/scroll-reveal, used consistently rather than mixing different hover effects per section

Theme tokens live in `src/app/globals.css` as CSS variables, mapped into Tailwind via `@theme inline`, with a `.dark` class-based override (toggle persists via `localStorage`).

## AI-assisted development

This project was built in collaboration with Claude (Anthropic), used specifically for:

- Scaffolding the Next.js/Sanity/TypeScript architecture
- Generating React components, typed hooks, and utility functions
- Writing Framer Motion animation logic (scroll reveals, page transitions, micro-interactions)
- Suggesting and implementing the design system and component patterns
- Debugging build/runtime issues during development

All personal content — bio, project descriptions, experience details — was written by hand and entered directly into the Sanity Studio; no AI-generated text appears anywhere on the site.

## Deployment

Deployed on Vercel, connected to this GitHub repository for automatic deploys on push to `main`. Environment variables (Sanity project config, Resend API key, contact email) are configured in the Vercel project settings, not committed to the repo.
