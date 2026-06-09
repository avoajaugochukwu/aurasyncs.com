# BlogOS — Human-Quality Affirmation Posts at Scale

A skill pack adapted from FacelessOS (YouTube scriptwriting) for writing blog posts that Google rates as helpful, original, and trustworthy — and specifically tuned for `aurasyncs.com`: themed affirmation collections ("affirmations for anxiety", "self-love affirmations"), daily and occasion sets ("365 daily affirmations", "Monday affirmations"), faith and scripture sets ("Bible affirmations"), and practice guides ("how affirmations work", "manifestation for beginners"). Every post gives a real person the words they came for and the context that makes those words land.

## How the system maps to the project

- **Posts are authored in Notion** (the content database is the source of truth). Each post is a Notion page with a property set (Title, Slug, Excerpt, Meta Description, Author, Tags, ReadingTime, Featured Image, Status) and a body written as Notion blocks. Setting `Status` to **Done** marks it published.
- **`scripts/migrate-notion.mjs` pulls Notion into the repo.** Run `node --env-file=.env scripts/migrate-notion.mjs`: it queries every `Done` page, writes each to `content/posts/<slug>.json` (a `blocks` array plus metadata), downloads the featured image to `public/blog/<slug>.webp` and each in-body image to `public/blog/<slug>-content-N.webp`, and rebuilds `content/posts/_index.json`.
- **Rendering.** `app/blog/page.tsx` lists posts from the local JSON via `lib/posts.ts`. `app/blog/[slug]/page.tsx` renders the `<h1>` from the **Title** property and the body through `components/NotionRenderer.tsx`. (The `[slug]` route currently still reads live from Notion; the index reads local JSON — the migration is mid-flight. Either way, Notion is the authoring source and the migrate script is the publish step.)
- **The renderer supports only a fixed set of Notion blocks:** `paragraph`, `heading_1`, `heading_2`, `heading_3`, `bulleted_list_item`, `numbered_list_item`, `to_do`, `toggle`, `code`, `image`, `divider`, `quote`, `callout`. There are **no tables** (a table renders as nothing), **no math**, and **no custom components**. The `quote` block is the answer box; the `callout` block is the tip/note box.
- **The route emits no JSON-LD.** Only `<title>`, meta description, and a self-canonical ship. `BlogPosting` / `FAQPage` / breadcrumb schema are not wired — treat them as optional future enhancements, never claim they ship.
- **This pack** at `protocols/blog/` — the writing craft + SEO discipline + research alignment + the accuracy & trust gate that produces well-formed affirmations and verifiable claims.

The pack does NOT define React templates. Aurasyncs renders every post through one route. A post's "shape" is carried by the content type the writer chooses from `page-structures-skill.md` and the Notion-block body skeleton it implies.

### Property contract (the Notion properties the pipeline reads)

```
Title            # the rendered <h1> AND the meta <title>/og:title (no separate metaTitle)
Slug             # kebab-case; equals content/posts/<slug>.json filename
Excerpt          # short 1–2 sentence on-page hook (blog index card)
Meta Description # 150–160 char SERP description; SEPARATE from Excerpt
Author           # the byline; default "Ugo Charles"
Tags             # 1–4 short topical tags
ReadingTime      # minutes (number)
Featured Image   # file → /blog/<slug>.webp
Status           # "Done" = published (anything else is skipped by the migrate script)
Created          # date → createdTime
```

There is **no `dateModified` field** (track updates via `lastEditedTime` / git) and **no schema/FAQ property** (FAQs live in the body). Don't invent `metaTitle`, `dateModified`, `schema`, or `category` fields.

## How it differs from FacelessOS

| | FacelessOS (YouTube) | BlogOS (web) |
|---|---|---|
| Output | TTS-ready prose | Notion-native blocks (Notion page → `content/posts/<slug>.json`) |
| Retention model | Watch time, rehook every 60-90s | Scroll depth, scannability every 200-300 words |
| Quality gate | YouTube monetization policy | Google HCU + E-E-A-T + spam policy + **well-formed affirmations, claims that verify** |
| Output target | Baserow row (`script` field) | A Notion page (pulled to `content/posts/`) |
| Per-channel personality | Voice profile per channel | Voice profile per site |
| Brief origin | Operator-provided | WebSearch SERP/PAA research |

## Files in this pack (21 skills + README + USAGE)

| File | Purpose |
|---|---|
| `blog-os-master.md` | Core philosophy, the Notion output contract, the accuracy & trust gate, anti-AI-slop checklist, mandatory re-audit |
| `page-structures-skill.md` | The Aurasyncs content types (💫 collection, 📅 daily/occasion, 🙏 faith/scripture, 🧘 practice guide) — property shape, body skeleton, word counts |
| `affirmation-craft-skill.md` | **The affirmation craft & vocabulary guide.** What makes an affirmation well-formed (present tense, first person, positive framing, the believability "ladder"), grouping, and correct terminology (affirmation vs. mantra, self-affirmation theory, responsible manifestation framing) |
| `accuracy-and-trust-skill.md` | **Hard gate.** Every affirmation well-formed and non-harmful; every psychology/scripture/health/money claim verified against a real authority and cited; no fabricated facts or fake statistics; affirmations support but never replace professional care |
| `keyword-research-skill.md` | The research alignment: WebSearch SERP/PAA recon for affirmation keywords (no DataForSEO/Apify pipeline on this site) |
| `engagement-mechanics-skill.md` | Scroll-depth psychology, scannability cadence, dwell-time mechanics |
| `BLOG-INTRO-SWIPE.md` | Answer-first opening patterns by intent (the leading `quote` block) |
| `variety-rotation-skill.md` | Rotation system to prevent same-y "Affirmations for X" posts |
| `narrative-arc-skill.md` | Arc for longform (big daily sets / pillar guides) |
| `conclusion-and-cta-skill.md` | Conclusion shapes, single-CTA discipline (to a sibling affirmation post), FAQ block |
| `title-meta-slug-skill.md` | Title / meta title / meta description / URL slug rules (mapped to Notion properties) |
| `seo-and-schema-skill.md` | On-page SEO + canonical; schema framed as a not-yet-wired future enhancement |
| `research-and-citation-skill.md` | Source rules, sourcing discipline, the responsible-claims discipline (mental health / scripture / money) |
| `eeat-signals-skill.md` | Author byline (Ugo Charles), verified affirmations, the YMYL trust angle |
| `featured-snippet-skill.md` | 40-60 word answer paragraph, PAA capture, list snippets |
| `media-and-images-skill.md` | Featured/inline image paths, captions as alt text, on-theme imagery |
| `scannable-formatting-skill.md` | Heading cadence, paragraph length, lists vs prose (Notion blocks) |
| `topical-authority-skill.md` | Pillar-cluster architecture, internal linking, hub-and-spoke across affirmation clusters |
| `update-discipline-skill.md` | Update vs replace vs merge vs sunset; periodic re-check (no `dateModified` field) |
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
/b-write <topic/keyword>      # research + draft → a Notion-ready post (+ optional content/posts/<slug>.json)
/b-review <slug>              # audit + fix an existing post
```

Each is a plain markdown file in `.claude/commands/<name>.md` — no installation, no build step.

## The non-negotiable defaults

Enforced by `blog-os-master.md`, `page-structures-skill.md`, `affirmation-craft-skill.md`, and `accuracy-and-trust-skill.md`:

1. **Notion-native output, supported blocks only.** Property set first, then a body built from the supported Notion blocks. No tables in bodies, no math, no H1 in the body (the Title is the H1; `heading_1` mis-renders as an h2, so use `heading_2`/`heading_3`).
2. **The answer is a leading `quote` block.** 40–60 words: what the set is for, roughly how many affirmations, how to use them.
3. **Well-formed affirmations.** Present tense, first person, positive framing, believable or laddered, grouped so the list helps. No denial / toxic positivity, no guaranteed-outcome spells.
4. **Accuracy & trust as a publish gate** — every affirmation is well-formed and safe; every load-bearing claim (psychology, study, scripture, health, money) is verified against a real authority and cited. No fabricated facts, no fake "studies show 90%…" statistics. Scripture is quoted exactly with the translation named. Affirmations support but never replace professional care. A harmful affirmation or an unverifiable claim means the post does not ship.
5. **Anti-AI slop checklist.** No "let that sink in", no fake-specific numbers, no hype words without a reason.
6. **Research contract.** WebSearch SERP/PAA recon + WebFetch fact/scripture verification. There is no keyword pipeline or `plan/` folder on this site.
7. **Content-type skeletons** match `page-structures-skill.md`.
8. **Variety rotation log** appended to every audit; next run avoids the same slot picks.

## Provenance

Forked from FacelessOS (extracted from 4,000+ real faceless YouTube scripts), re-tuned for blog mechanics, ported through an earlier BlogOS build, and retargeted here for aurasyncs.com's positive-affirmations content, its Notion → `content/posts/` rendering pipeline, and the YMYL accuracy & trust discipline that affirmations demand.
