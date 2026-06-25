# KD3BQP — Notes from the Shack

Personal amateur radio blog for **Ethan Manzi, KD3BQP** — Technician-class operator based in York, PA. Posts cover radio operations, equipment reviews, digital modes, and life from the shack.

**Live site:** [blog.kd3bqp.radio](https://blog.kd3bqp.radio)

---

## Stack

- **[Astro](https://astro.build)** — static site generator
- **[Artalk](https://artalk.js.org)** — self-hosted comment system
- **[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)** — CAPTCHA for contact form
- **[n8n](https://n8n.io)** — contact form webhook → Telegram notification
- **[@fontsource](https://fontsource.org)** — self-hosted Spectral, Source Sans 3, JetBrains Mono

## Project structure

```
src/
  content/posts/   Markdown blog posts (one file per post)
  components/      Astro components (Masthead, Footer, RigSidebar, etc.)
  layouts/         BaseLayout.astro — shared HTML shell
  pages/           index, about, contact, posts/[slug]
  styles/          tokens.css — CSS custom properties for theming
public/            Static assets (favicon, robots.txt, _headers)
.github/workflows/ CI build + artifact upload
```

## Running locally

```bash
cp .env.example .env   # fill in your values
npm install
npm run dev
```

The dev server starts at `http://localhost:4321`. Analytics and Turnstile are disabled in dev by default (see `.env.example`).

## Adding a post

Create a new Markdown file in `src/content/posts/`:

```markdown
---
cat: "Blog Posts"          # Blog Posts | Reviews | Events
type: "article"            # article | review
date: "Jun 25, 2026"
read: "5 min"
title: "Your Post Title"
excerpt: "One-sentence summary shown on the index and in OG tags."
tags: ["#Tag1", "#Tag2"]
---

Post content here...
```

For review posts set `type: "review"` and include a `rig:` block — see any existing review post for the full schema.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `PUBLIC_GA_ID` | prod only | Google Analytics measurement ID |
| `PUBLIC_TURNSTILE_SITE_KEY` | prod only | Cloudflare Turnstile site key |
| `PUBLIC_TURNSTILE_DISABLED` | dev | Set `true` to skip CAPTCHA locally |
| `PUBLIC_COMMENTS_ENABLED` | optional | Set `true` to show Artalk comments |
| `PUBLIC_ARTALK_SERVER` | if comments on | URL of your Artalk instance |
| `PUBLIC_N8N_WEBHOOK_URL` | prod only | n8n webhook for contact form |

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve dist/ locally
```

CI builds on every push and pull request to `main`, and uploads `dist/` as a downloadable GitHub Actions artifact.

## License

Code: MIT — see [LICENSE.md](LICENSE.md)
Blog posts (`src/content/posts/`): CC BY 4.0 — see [LICENSE.md](LICENSE.md)
