---
name: seo-and-schema
description: On-page SEO discipline for aurasyncs.com's affirmation collections, daily/occasion sets, faith sets, and practice guides — plus an account of the Schema.org JSON-LD the route auto-emits (BlogPosting + BreadcrumbList) and the types that are NOT wired yet (FAQPage, HowTo). Covers the on-page artifacts the route really ships (title, meta description, canonical, OpenGraph with per-post og:image, Twitter summary_large_image, and the two JSON-LD blocks), URL slug rules, and the frontmatter that feeds them. This is the file that turns a well-written post into an indexable, internal-link-discoverable web page.
---

# SEO & Schema — the page Google can rank

> A post can be perfectly written and never rank if Google can't parse it, can't crawl it, or can't trust it. This skill is the layer between the prose and the search index. On aurasyncs.com the route emits clean metadata — title, meta description, canonical, OpenGraph (incl. per-post og:image), Twitter — **and** two JSON-LD blocks (BlogPosting + BreadcrumbList) automatically. Your job is to feed the route clean inputs (the frontmatter and a well-structured body) so this machinery has good data to emit — you never hand-author the schema yourself.

---

## What the page actually emits (read this first)

Posts are **plain-Markdown MDX files** — you write one file per post directly to `content/posts/<slug>.mdx`. The slug is the filename (there is no `slug` frontmatter field); the file existing in the folder is what publishes it. There is no Notion, no migrate step, no `Status` field. Frontmatter is parsed by `gray-matter` in `lib/posts.ts`; `getAllPosts` reads the `.mdx` files directly; the body renders through `components/MdxContent.tsx`. The `app/blog/[slug]/page.tsx` route reads the same files for both the page and its metadata. (Project image assets are handled by `scripts/gen-assets.mjs`; the old `scripts/migrate-notion.mjs` is gone.)

The route's `generateMetadata` and the page component together emit **rich metadata and two JSON-LD blocks** per post, with zero extra work and **nothing for you to hand-author**:

- **`<title>`** = the frontmatter **`title`** (which is *also* the page H1 — one field does both)
- **`<meta name="description">`** = the frontmatter **`metaDescription`** (falls back to `excerpt`)
- **`metadata.alternates.canonical`** = `${baseUrl}/blog/${slug}` (canonical **is** emitted — you never set it by hand)
- **OpenGraph** — `og:type=article`, `og:title`, `og:description`, `og:url`, `publishedTime` (from `createdTime`), `modifiedTime` (from `lastEditedTime`), authors, tags, and a **per-post `og:image` from `featuredImage`**
- **Twitter** — `summary_large_image` card with title, description, and the `featuredImage`
- **`BlogPosting` JSON-LD** — headline, description, image, datePublished (`createdTime`), dateModified (`lastEditedTime`), author Person, publisher Organization **"Aurasyncs.com"**, mainEntityOfPage, keywords (from `tags`)
- **`BreadcrumbList` JSON-LD** — Home → Affirmations → this post

**Not emitted today:** FAQPage, HowTo (and ItemList/DefinedTerm/CollectionPage). FAQ content lives in the body as prose; FAQPage is a future enhancement — see the FAQPage / HowTo subsection below. Everything above (BlogPosting, BreadcrumbList, OG, Twitter, canonical) **does** ship — do **not** hand-author it, and do not put a `schema` key in frontmatter (nothing reads it).

---

## The YAML frontmatter

Each `.mdx` file opens with a YAML frontmatter block (parsed by `gray-matter` in `lib/posts.ts`). The keys that matter for SEO:

| Key | Maps to | Max length | Purpose |
|---|---|---|---|
| **`title`** | The page `<h1>` **and** `metadata.title` → `<title>` / og:title / SERP | ≤ 60 chars | The heading the reader sees AND what Google shows |
| **`metaDescription`** | `metadata.description` → `<meta name="description">` (falls back to `excerpt`) | 150–160 chars | The SERP snippet under the title |
| **`excerpt`** | on-page hook / listing dek (not the SERP snippet) | ~1–2 sentences | The warm orienting line |
| **`featuredImage`** | `/blog/<slug>.webp` → og:image + Twitter image + BlogPosting image | — | Social/preview image (or omit) |
| **`author`** | byline + BlogPosting author (use "Ugo Charles"; loader default "Aurasyncs Team") | — | Named author |
| **`tags`** | post badges + BlogPosting `keywords` + og tags (YAML list, 1–4) | — | Topic tags |
| **`readingTime`** | "N min read" byline | number (minutes) | Reading-time estimate |
| **`createdTime`** | datePublished + og publishedTime | ISO datetime | Publish date |
| **`lastEditedTime`** | dateModified + og modifiedTime — **update on every edit** | ISO datetime | Modified date |

There is **no `slug` key** (the filename is the slug), **no `status`** (the file existing publishes it), and no `relatedCategories`/`relatedPages`.

**Key consequence of this site's setup:** the **`title`** does double duty as both H1 and meta title, so write a `title` that works in both the SERP and on the page (≤ 60 chars is the binding constraint). The **`metaDescription`** is its own key — distinct from **`excerpt`**, which is the on-page hook under the headline. There is **no separate meta-title key** — the one `title` field is both.

**The body must NOT contain its own H1.** The page H1 renders from the frontmatter `title` in `app/blog/[slug]/page.tsx`. Start the body with content — typically the answer blockquote (see `featured-snippet-skill.md`), optionally an image above it. Note: in the component map, a `#` H1 maps to `<h2>`, so use **`##`** for top-level body sections and **`###`** for sub-sections.

See `title-meta-slug-skill.md` for the full title / metaDescription / excerpt / slug rules. This skill assumes those are set.

---

## URL slug discipline

The slug is permanent — it's the `content/posts/<slug>.mdx` **filename** (there is no separate slug field) and the `/blog/<slug>` path. Changing it later breaks every inbound link and shuffles your SEO equity. Get it right the first time.

### Rules

- **Kebab-case.** `affirmations-for-anxiety-finding-peace-inner-calm` not `Affirmations_For_Anxiety` or `affirmationsForAnxiety`.
- **Front-load the keyword.** `money-affirmations-for-financial-abundance` beats `the-best-ways-to-attract-wealth`.
- **Drop stop words unless load-bearing.** `morning-affirmations-for-women` beats `some-of-the-best-affirmations-to-say-every-morning`.
- **No dates in the slug.** `2026-money-affirmations` ages out and forces a yearly redirect. Track freshness in the `createdTime`/`lastEditedTime` frontmatter, not a slug year.
- **No numbers in the slug unless they're the point.** `365-daily-affirmations-year-of-empowering-words` is fine because `365` is genuinely the set size. If the count later changes, the slug lies.
- **No filler.** No "the", "a", "an" unless the title doesn't parse without it.
- **No trailing words.** Don't end with `-guide`, `-article`, or `-post` as filler. (A descriptive tail like `-calm-your-mind` is fine — it's meaning, not filler.)
- **No special characters.** Hyphens only. No underscores, no en-dashes, no emoji.
- **Match the target query.** If the target query is "affirmations for confidence", the slug front-loads it (`affirmations-for-confidence-unlock-your-inner-power`), not `believe-in-yourself-2026`.

### Slug examples

| Target query | Good slug | Bad slug |
|---|---|---|
| "affirmations for anxiety" | `affirmations-for-anxiety-finding-peace-inner-calm` | `the-complete-guide-to-calming-anxiety-with-words` |
| "money affirmations" | `money-affirmations-for-financial-abundance` | `everything-about-attracting-money-2026` |
| "affirmations for confidence" | `affirmations-for-confidence-unlock-your-inner-power` | `boost-your-self-belief-the-easy-way` |
| "Bible affirmations" | `bible-affirmations-verses-faith` | `powerful-scripture-affirmations-for-everyone` |
| "morning affirmations" | `morning-affirmations-to-transform-your-day` | `start-your-day-right-with-positive-words` |

---

## Meta title rules (the `title` key)

The `title` is both your H1 and your `<title>`/SERP title, so it has to earn its place in search results while still reading well as a page heading.

- ≤ 60 chars (Google truncates at ~580 pixels, ~60 chars in most fonts) — the binding constraint since the field is also the H1
- Target query front-loaded
- A modifier that signals depth or value: a count (`25+`, `40+`), `to Calm Your Mind`, `for Women`, `Step by Step`
- Title case
- No clickbait the post can't deliver
- No brand suffix — a `| AuraSyncs` suffix eats your 60-char budget; skip it

Examples (matching real posts on the site):

- `Affirmations for Anxiety: 25+ Calming Phrases to Quiet Your Mind`
- `Money Manifestation Affirmations: 40+ Quotes to Align with Abundance`
- `Affirmations for Confidence: Unlock Your Inner Power`

> Note: some existing posts have `metaDescription` values truncated to ~100 chars. When you touch a post, fix the description up to a full 150–160 chars — short descriptions waste SERP real estate and cost click-through.

---

## Meta description rules (the `metaDescription` key)

`metaDescription` becomes the `<meta name="description">` (and the OG/Twitter description). It doesn't directly influence ranking — but it drives click-through, which does. (The visible hook under the headline is the separate **`excerpt`** key; keep them distinct so the page doesn't read the same line twice. If `metaDescription` is omitted, the route falls back to `excerpt` — but set both, distinct.)

- **150–160 chars** (the sweet spot — shorter wastes the SERP real estate, longer gets truncated). **Audit the existing posts: many are ~100 chars and should be lengthened to the full band.**
- Active verb in the first half
- Target query somewhere in it
- Ends on an implicit "what they'll get if they click"
- Never starts with "In this article, we will…"
- Never duplicates the Title verbatim — they sit one above the other in the SERP

Example for "affirmations for anxiety":

> "Calm a racing mind with 25+ affirmations for anxiety, grouped by what you're feeling. Learn how to use them, why they help, and a gentle note on when to seek support."

In the 150–160 band, leads with the action, names what's inside, ends on a value promise.

---

## Canonical tag — automatic

You do **not** set the canonical. `generateMetadata` in `app/blog/[slug]/page.tsx` sets `alternates.canonical` to `${baseUrl}/blog/${slug}` for every post. The host is **aurasyncs.com**, so a post with slug `affirmations-for-anxiety-finding-peace-inner-calm` canonicalizes to:

```
https://aurasyncs.com/blog/affirmations-for-anxiety-finding-peace-inner-calm
```

There is no `canonical` frontmatter key and no need for one. If you ever syndicate a post elsewhere, the canonical already points at your version — nothing to configure. It's one of several pieces of "SEO plumbing" the route ships automatically (alongside OpenGraph, Twitter, and the two JSON-LD blocks).

---

## Schema / JSON-LD — auto-emitted by the route

**Two JSON-LD blocks ship on every post automatically** — `BlogPosting` and `BreadcrumbList` — built by `app/blog/[slug]/page.tsx` from the post's frontmatter and slug. You do **not** hand-author them, and you do not put a `schema` key in frontmatter — nothing reads it. Your only job is clean frontmatter (good `title`, `metaDescription`, `createdTime`, `lastEditedTime`, `author`, `tags`, `featuredImage`); the schema inputs all come from there.

The shapes below are what the route emits today, for reference (host `aurasyncs.com`).

### BlogPosting (every post — auto-emitted)

The baseline article schema. It lets Google attach the author, dates, and image to the result. Built from the post's frontmatter:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "<title>",
  "description": "<metaDescription, falls back to excerpt>",
  "image": ["https://aurasyncs.com/blog/<slug>.webp"],
  "datePublished": "<createdTime, ISO>",
  "dateModified": "<lastEditedTime, ISO>",
  "author": { "@type": "Person", "name": "<author, e.g. 'Ugo Charles'>" },
  "publisher": {
    "@type": "Organization",
    "name": "Aurasyncs.com",
    "logo": { "@type": "ImageObject", "url": "https://aurasyncs.com/logo.png" }
  },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://aurasyncs.com/blog/<slug>" },
  "keywords": "<tags, comma-joined>"
}
```

Note `dateModified` comes from **`lastEditedTime`** — that's why you bump `lastEditedTime` whenever you edit a post, so the freshness signal stays honest. The `image` only appears when `featuredImage` is set, so set it.

### BreadcrumbList (every post — auto-emitted)

Home → Affirmations → this post. Pure derived data, built from the slug + `title`. Breadcrumbs render under the title in the SERP and lift CTR.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aurasyncs.com" },
    { "@type": "ListItem", "position": 2, "name": "Affirmations", "item": "https://aurasyncs.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "<title>", "item": "https://aurasyncs.com/blog/<slug>" }
  ]
}
```

### FAQPage / HowTo (NOT emitted — future enhancement)

These are the only schema types **not** wired today. FAQ content still lives in the body as prose (a `## Frequently asked questions` section — see `featured-snippet-skill.md`) and earns People Also Ask placement on its own; it just doesn't emit `FAQPage` JSON-LD yet.

If FAQPage is wired up later, the route would parse the `##`/`###` FAQ pairs out of the body and emit a script whose answer text matches the visible answers word-for-word. Because the renderer adds no auto heading IDs, no schema `url`/anchor should point at `#frequently-asked-questions` — that fragment won't resolve. `HowTo` (for step-by-step practice guides) is likewise a future add. Until then, don't claim either renders.

---

## Open Graph + Twitter Card — auto-emitted by the route

The route **does** emit OpenGraph and Twitter Card tags from the frontmatter. OpenGraph ships `og:type=article`, `og:title` (the `title`), `og:description` (`metaDescription`, falling back to `excerpt`), `og:url` (the canonical), `publishedTime` (`createdTime`), `modifiedTime` (`lastEditedTime`), authors, tags, and a **per-post `og:image` from `featuredImage`**. Twitter ships a `summary_large_image` card with the same title, description, and image. You don't hand-author any of these.

The one thing you control is **setting `featuredImage`** — without it there's no `og:image` and no Twitter image, and the social card falls back to a bare text preview. Supply the image at a wide ratio (the route declares 1200 × 800) so social crops cleanly.

---

## Robots, sitemap, indexing

- Site-level discoverability is handled by the route + any `robots`/`sitemap` config in `app/`.
- New posts enter the index by simply existing: write the `.mdx` file to `content/posts/<slug>.mdx`. `getAllPosts` reads every `.mdx` file in that folder directly via `lib/posts.ts` — there is no index file, no `_index.json`, no blocks array, and no migrate step to run.
- **There is no draft/Status mechanism:** a file in `content/posts/` is published; to keep a work-in-progress out of the build, keep it out of that folder (e.g. a different directory or branch) until it's ready. There is no `noindex` flag or `Status` field to manage.

---

## Internal linking architecture

See `topical-authority-skill.md` for the full hub-and-spoke discipline. The SEO essentials:

- Links live **in the body** as **Markdown links** — `[anchor](/blog/<sibling-slug>)`. The component map styles internal links (paths starting with `/`) via `next/link`; relative paths resolve against the site root.
- Every post links to **≥ 3 sibling posts** in its cluster and **1 pillar** where one exists.
- Anchor text should *be* the target query of the linked page — the strongest internal-link signal Google has. Anchor "money affirmations for financial abundance" on the link to that post; anchor "affirmations for confidence" on the link to that sibling.
- Link to the home page only via global nav, not the body.

Real routes to link to: `/blog/<slug>` for posts — each corresponds to a `content/posts/<slug>.mdx` file. Verify a slug is real before linking it; never link a 404. Examples of real slugs: `/blog/affirmations-for-anxiety-finding-peace-inner-calm`, `/blog/money-affirmations-for-financial-abundance`, `/blog/bible-affirmations-verses-faith`, `/blog/morning-affirmations-to-transform-your-day`.

---

## Common SEO mistakes the audit catches

The `google-trust-audit-skill.md` checks for these. Recap:

- An H1 inside the body (the H1 comes from the frontmatter `title` — the body must not repeat it; and remember a body `#` H1 maps to `<h2>` anyway)
- Missing or truncated `metaDescription` (no snippet, or a ~100-char snippet that wastes the band — lengthen to 150–160)
- `title` > 60 chars (truncated SERP title and a bloated H1)
- Slug (filename) contains stop words, dates, or special characters
- A table where a list would read better (GFM tables render, but most affirmation comparisons read warmer as prose or a list)
- No body links to siblings or to the pillar
- Stale `lastEditedTime` after an edit (it feeds dateModified / og:modifiedTime — bump it whenever you change a post)
- No outbound source citations where a load-bearing claim is made (psychology of affirmations, any study, any scripture, any health/money claim)
- Missing `featuredImage` (no preview image, no og:image, no Twitter image)
- A psychology/science/scripture/health/money claim that wasn't verified (see the trust gate in `accuracy-and-trust-skill.md`)
- Toxic-positivity or denial framing, or a money/manifestation "guarantee" (see the responsible-claims rule in `accuracy-and-trust-skill.md`)

---

## Pre-publish SEO checklist

- [ ] `title` ≤ 60 chars, target query front-loaded (it's both H1 and SERP/og title)
- [ ] `metaDescription` 150–160 chars (lengthen any existing ~100-char description), reads as a SERP snippet, distinct from `excerpt`
- [ ] `excerpt` set as the on-page hook (distinct from `metaDescription`)
- [ ] Slug (the `.mdx` filename) kebab-case, no stop words, no dates, no special chars
- [ ] No H1 in the body — body opens with content + the answer blockquote; top-level sections use `##`
- [ ] Tables used sparingly (GFM renders, but prefer prose/lists for affirmation comparisons)
- [ ] Target query in: `title`, `metaDescription`, slug, first paragraph, ≥ 1 `##`, featured image alt
- [ ] `author` set (use "Ugo Charles"); `featuredImage` at `/blog/<slug>.webp` (wide ratio); `createdTime` + `lastEditedTime` set, `tags` (1–4), `readingTime`
- [ ] `lastEditedTime` bumped if you edited the post (feeds dateModified / og:modifiedTime)
- [ ] ≥ 3 body Markdown links to sibling posts + 1 to the pillar; anchor text = the linked page's target query; no "click here"
- [ ] Outbound links to credible sources for any load-bearing claim (psychology / study / named-translation scripture / health authority)
- [ ] Every psychology / scripture / health / money claim verified per `accuracy-and-trust-skill.md`; no fabricated stats

Canonical, OpenGraph (incl. per-post og:image from `featuredImage`), Twitter, and the `BlogPosting` + `BreadcrumbList` JSON-LD are all emitted automatically — nothing to hand-author there beyond feeding clean frontmatter. `FAQPage`/`HowTo` are the only schema types **not** wired yet; don't rely on them.

---

**BlogOS** — the page Google can rank.
