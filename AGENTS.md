# KD3BQP Site — AI Agent Context

Personal amateur radio home base + blog for Ethan Manzi, KD3BQP. Astro static site deployed to DigitalOcean. Built with Astro v7, self-hosted Artalk comments, Cloudflare Turnstile CAPTCHA, n8n webhook for contact form, and @fontsource self-hosted fonts.

This repo used to be split into two sites (a landing page and a blog on a `blog.` subdomain). They've been merged into one Astro site since it's all the same static build sharing the same components/assets — the landing pages now live at the root and the blog moved under `/blog`.

**Live site:** https://kd3bqp.radio
**Repo:** https://github.com/kd3bqp/blog

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Architecture

- `src/pages/index.astro` — root landing page (logbook status, QSO log, quick links)
- `src/pages/about.astro`, `src/pages/contact.astro` — landing-site pages, rooted at `/about` and `/contact`
- `src/pages/blog/index.astro` — blog post listing, at `/blog`
- `src/pages/blog/posts/[slug].astro` — individual post/review pages, at `/blog/posts/<slug>`
- `src/layouts/BaseLayout.astro` — HTML shell: theme, fonts, GA (prod-only), OG tags, canonical
- `src/content/posts/*.md` — all blog posts; schema defined in `src/content.config.ts`
- `src/components/Masthead.astro` — site-wide nav (Home / Blog / About / Contact); `active` prop drives the highlighted link
- `src/components/RigSidebar.astro` — review sidebar (sticky desktop, FAB drawer on mobile)
- `src/components/StatusCard.astro`, `Logbook.astro`, `QuickLinks.astro`, `Carousel.astro`, `PhotoModal.astro` — landing-page-only components used by the root index
- `src/styles/tokens.css` — CSS custom properties for paper/night themes; do not change font family names here
- `public/_headers` — Cloudflare cache rules (immutable for `/_astro/*`)
- `public/robots.txt` — allow all, sitemap reference

## Key patterns

**Theming:** Two themes — `paper` (light) and `night` (dark) — toggled via `data-theme` on `<html>`. The active theme is persisted to `localStorage` under key `kd3bqp-theme`. An inline blocking `<script is:inline>` in `<head>` applies the stored theme before first paint to prevent FOUC.

**Analytics:** GA4 via `gtag()`. The loader script is only injected when `import.meta.env.PROD` is true, so analytics never fire locally. Custom events: `view_article`, `view_review`, `article_read`, `review_buy_click`, `comment_posted`, `contact_form_submitted`.

**Fonts:** Self-hosted via @fontsource (Spectral, Source Sans 3, JetBrains Mono). Imported by weight in `BaseLayout.astro` frontmatter. Do not add Google Fonts CDN links.

**Contact form:** Submits to n8n webhook (`PUBLIC_N8N_WEBHOOK_URL`). When `PUBLIC_TURNSTILE_DISABLED=true` (dev), skips Turnstile validation and logs payload to console instead of fetching (avoids CORS on localhost).

**Review posts:** Set `type: "review"` and include a `rig:` block in frontmatter. `RigSidebar` renders sticky on desktop and as a slide-in drawer (FAB: "📻 Overview") on mobile. Escape key, backdrop click, and ✕ button all close the drawer.

**Photos:** Top-level post photos: lazy-load with placeholder fade-in (class `photo-placeholder` → `photo-loaded` on img `onload`). Rig sidebar photos: same pattern. Host images on `cdn.kd3bqp.radio` — external hotlink-protected URLs won't load.

**Content schema:** See `src/content.config.ts`. Posts support: `cat`, `type`, `date`, `read`, `title`, `excerpt`, `photo`, `photoLabel`, `tags`, `eventDetails`, `rig`.

## Environment variables

All secrets live in `.env` (gitignored). See `.env.example` for the full list. Production values must be set in the DigitalOcean deploy environment:

| Variable | Notes |
|---|---|
| `PUBLIC_GA_ID` | GA4 measurement ID — injected only in prod builds |
| `PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile |
| `PUBLIC_TURNSTILE_DISABLED` | `true` in dev, `false` in prod |
| `PUBLIC_COMMENTS_ENABLED` | `true` once Artalk is stable |
| `PUBLIC_ARTALK_SERVER` | https://commentsection.puppylab.net |
| `PUBLIC_N8N_WEBHOOK_URL` | Use production URL (not `-test`) in prod |
| `PUBLIC_SHOW_CAROUSEL` | Toggles the "From the shack" photo carousel on the root landing page |

## Documentation

Full Astro docs: https://docs.astro.build

Relevant guides:
- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
