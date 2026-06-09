# BlogOS — Human-Quality Affirmation Posts at Scale

> **Start here for the day-to-day workflow: [`PLAYBOOK.md`](./PLAYBOOK.md).** As of the 2026 reader redesign the output contract is the structured **`reader:` frontmatter block** (`structured-reader-skill.md`), not Markdown affirmation lists in the body. Sections of this README that describe the body as plain-Markdown lists/blockquote describe the **legacy prose-fallback** path; new posts use `reader:`.

A skill pack adapted from FacelessOS (YouTube scriptwriting) for writing blog posts that Google rates as helpful, original, and trustworthy — and specifically tuned for `aurasyncs.com`: themed affirmation collections ("affirmations for anxiety", "self-love affirmations"), daily and occasion sets ("365 daily affirmations", "Monday affirmations"), faith and scripture sets ("Bible affirmations"), and practice guides ("how affirmations work", "manifestation for beginners"). Every post gives a real person the words they came for and the context that makes those words land.

## How the system maps to the project

- **Content** lives at `content/posts/<slug>.mdx` — a flat directory, one plain-Markdown `.mdx` file per post. The slug is the filename. There is no Notion, no database, and no build/migrate step: you write the `.mdx` file directly, and the file existing in `content/posts/` is what publishes it. (Project assets are handled by `scripts/gen-assets.mjs`; images go under `public/blog/`.)
- **Rendering** is a single blog route: `app/blog/[slug]/page.tsx` reads the frontmatter via `lib/posts.ts` (parsed with **`gray-matter`**), renders the `<h1>` from `title`, and runs the body through **`next-mdx-remote/rsc` `<MDXRemote>`** (`components/MdxContent.tsx`) with **`remark-gfm`** and a fixed component map. It auto-emits a `BlogPosting` JSON-LD block AND a `BreadcrumbList` JSON-LD block, plus canonical, OpenGraph (with a per-post og:image from `featuredImage`), and a Twitter card.
- **Frontmatter schema** is the set of keys `lib/posts.ts` reads — see the contract below. `title` is also the meta title; `metaDescription` is a **separate** field from `excerpt`.
- **MDX, but plain Markdown elements only.** The component map styles `h1–h3, p, ul, ol, li, blockquote, hr, code, pre, a, img` — there are **no** custom JSX components (no `AnswerBox`, `Callout`, `ProTip`, `Table`). Don't invent JSX tags. Use a top **blockquote** as the answer box (it renders as a left-bordered italic box) and plain Markdown links for CTAs.
- **`remark-gfm` IS installed** → GFM pipe tables, strikethrough, and task lists render. Tables are allowed, but for affirmations prose and grouped lists usually read better — use a table only when the content is genuinely tabular. **No math rendering** → don't write `$…$`. **No auto heading IDs** → no `{#id}` anchors.
- **This pack** at `protocols/blog/` — the writing craft + SEO discipline + research alignment + the accuracy & trust gate that produces MDX that fits the route.

The pack does NOT define React templates. Aurasyncs renders every post through one route. A post's "shape" is carried by the content type the writer chooses from `page-structures-skill.md` and the Markdown body skeleton it implies.

### Frontmatter contract (exactly what `lib/posts.ts` reads)

```yaml
title:           # also the rendered <h1> and the meta <title>/og:title
excerpt:         # short 1–2 sentence hook; nullable
metaDescription: # 150–160 char meta description; SEPARATE from excerpt; nullable
author:          # the byline; "Ugo Charles" (loader default "Aurasyncs Team")
tags:            # [list] 1–4 short topical tags
readingTime:     # number, minutes
createdTime:     # ISO datetime → datePublished
lastEditedTime:  # ISO datetime → dateModified (bump on edits)
featuredImage:   # /blog/<slug>.webp, or omit
```

There is **no `slug` field** (slug = filename), **no `status` field** (the file existing = published), and **no `relatedCategories`/`relatedPages`/`metaTitle`/`category`** fields. Cross-links are inline Markdown links in the body. `lastEditedTime` is the modified-date — there is no separate `dateModified` field to add. FAQs live in the body, not the frontmatter.

## How it differs from FacelessOS

| | FacelessOS (YouTube) | BlogOS (web) |
|---|---|---|
| Output | TTS-ready prose | MDX, plain Markdown elements (`.mdx`) |
| Retention model | Watch time, rehook every 60-90s | Scroll depth, scannability every 200-300 words |
| Quality gate | YouTube monetization policy | Google HCU + E-E-A-T + spam policy + **well-formed affirmations, claims that verify** |
| Output target | Baserow row (`script` field) | MDX file in `content/posts/` |
| Per-channel personality | Voice profile per channel | Voice profile per site |
| Brief origin | Operator-provided | WebSearch SERP/PAA research |

## Files in this pack (21 skills + README + USAGE)

| File | Purpose |
|---|---|
| `blog-os-master.md` | Core philosophy, the MDX output contract, the accuracy & trust gate, anti-AI-slop checklist, the mandatory re-audit |
| `page-structures-skill.md` | The Aurasyncs content types (💫 collection · 📅 daily/occasion · 🙏 faith/scripture · 🧘 practice guide) — frontmatter shape, body skeleton, word counts |
| `affirmation-craft-skill.md` | **The affirmation craft & vocabulary guide.** What makes an affirmation well-formed (present tense, first person, positive framing, the believability "ladder"), grouping, and correct terminology (affirmation vs. mantra, self-affirmation theory, responsible manifestation framing) |
| `accuracy-and-trust-skill.md` | **Hard gate.** Every affirmation well-formed and non-harmful; every psychology/scripture/health/money claim verified against a real authority and cited; no fabricated facts or fake statistics; affirmations support but never replace professional care |
| `keyword-research-skill.md` | The research alignment: WebSearch SERP/PAA recon for affirmation keywords (no DataForSEO/Apify pipeline on this site) |
| `engagement-mechanics-skill.md` | Scroll-depth psychology, scannability cadence, dwell-time mechanics |
| `BLOG-INTRO-SWIPE.md` | Answer-first opening patterns by intent (the leading blockquote) |
| `variety-rotation-skill.md` | Rotation system to prevent same-y "Affirmations for X" posts |
| `narrative-arc-skill.md` | Arc for longform (big daily sets / pillar guides) |
| `conclusion-and-cta-skill.md` | Conclusion shapes, single-CTA discipline (to a sibling affirmation post), FAQ block |
| `title-meta-slug-skill.md` | Title / meta title / meta description / URL slug rules (mapped to frontmatter) |
| `seo-and-schema-skill.md` | On-page SEO + the auto-emitted `BlogPosting`/`BreadcrumbList` JSON-LD, canonical, OG/Twitter |
| `research-and-citation-skill.md` | Source rules, sourcing discipline, the responsible-claims discipline (mental health / scripture / money) |
| `eeat-signals-skill.md` | Author byline (Ugo Charles), verified affirmations, the YMYL trust angle |
| `featured-snippet-skill.md` | 40-60 word answer paragraph, PAA capture, list snippets |
| `media-and-images-skill.md` | Featured/inline image paths, alt text, on-theme imagery |
| `scannable-formatting-skill.md` | Heading cadence, paragraph length, lists vs prose (Markdown elements) |
| `topical-authority-skill.md` | Pillar-cluster architecture, internal linking, hub-and-spoke across affirmation clusters |
| `update-discipline-skill.md` | Update vs replace vs merge vs sunset; periodic re-check (`lastEditedTime` tracks updates) |
| `google-trust-audit-skill.md` | HCU + E-E-A-T + spam-policy pre-publish audit (incl. the thin-list trap) |
| `analytics-coaching-skill.md` | Read analytics + GSC, diagnose post problems |
| `README.md` | This file |
| `USAGE.md` | The day-to-day operator guide |

Plus adjacent files:

- `protocols/site-voice-profile.md` — the canonical structure for a per-site voice lock, and the Aurasyncs voice notes
- `research/voice_profile.md` — the Aurasyncs voice lock the writer injects (build it from real reader data; provisional until then)
- `protocols/rotation-log.md` — the append-only variety-rotation log

## Optional slash commands

The pack runs as a manual workflow, and there are command shortcuts under `.claude/commands/`:

```
/blog                         # load the pack into chat
/b-write <topic/keyword>      # research + draft → content/posts/<slug>.mdx
/b-review <slug>              # audit + fix an existing post
```

Each is a plain markdown file in `.claude/commands/<name>.md` — no installation, no build step.

## The non-negotiable defaults

Enforced by `blog-os-master.md`, `page-structures-skill.md`, `affirmation-craft-skill.md`, and `accuracy-and-trust-skill.md`:

1. **MDX output, plain Markdown elements only.** Frontmatter first, body second, no preamble, no closer. No invented JSX components, no `$…$` math, no `{#id}` anchors. GFM tables render but are used sparingly.
2. **H1 in frontmatter only.** Body starts (often after an image) with a top blockquote answer box. The route renders the H1 from `title`. No `#` H1 in the body (use `##`/`###`); no manual heading anchors.
3. **Well-formed affirmations.** Present tense, first person, positive framing, believable or laddered, grouped so the list helps. No denial / toxic positivity, no guaranteed-outcome spells.
4. **Accuracy & trust as a publish gate** — every affirmation is well-formed and safe; every load-bearing claim (psychology, study, scripture, health, money) is verified against a real authority and cited. No fabricated facts, no fake "studies show 90%…" statistics. Scripture is quoted exactly with the translation named. Affirmations support but never replace professional care. A harmful affirmation or an unverifiable claim means the post does not ship.
5. **Anti-AI slop checklist.** No "let that sink in", no fake-specific numbers, no hype words without a reason.
6. **Research contract.** WebSearch SERP/PAA recon + WebFetch fact/scripture verification. There is no keyword pipeline or `plan/` folder on this site.
7. **Content-type skeletons** match `page-structures-skill.md`.
8. **Variety rotation log** appended to every audit; next run avoids the same slot picks.

## Provenance

Forked from FacelessOS (extracted from 4,000+ real faceless YouTube scripts), re-tuned for blog mechanics, and retargeted here for aurasyncs.com's positive-affirmations content, its `content/posts/*.mdx` + `next-mdx-remote` rendering pipeline, and the YMYL accuracy & trust discipline that affirmations demand.
