---
name: seo-and-schema
description: On-page SEO discipline for aurasyncs.com's affirmation collections, daily/occasion sets, faith sets, and practice guides — plus an honest account of Schema.org JSON-LD, which this site does NOT yet emit. Covers the on-page artifacts the route really ships (title, meta description, canonical), URL slug rules, and the structured-data types (BlogPosting, FAQPage, BreadcrumbList) that WOULD help and are recommended as future enhancements but are not wired today. This is the file that turns a well-written post into an indexable, internal-link-discoverable web page.
---

# SEO & Schema — the page Google can rank

> A post can be perfectly written and never rank if Google can't parse it, can't crawl it, or can't trust it. This skill is the layer between the prose and the search index. On aurasyncs.com the route emits clean basic metadata — title, meta description, canonical — automatically. It does **not** emit JSON-LD yet. Your job is to feed the route clean inputs and to write the body so it earns snippets and internal-link discovery without relying on structured data that isn't shipping.

---

## What the page actually emits (read this first)

Posts originate in a **Notion database** (the source of truth) and are pulled into the repo by `node --env-file=.env scripts/migrate-notion.mjs`, which writes `content/posts/<slug>.json` (a `blocks` array of Notion blocks + metadata) and downloads images to `public/blog/`. The body renders through `components/NotionRenderer.tsx`. The blog index reads local JSON via `lib/posts.ts`; the `app/blog/[slug]/page.tsx` route still reads live from Notion (migration in progress).

The route's `generateMetadata` emits only **basic metadata**. There is **no JSON-LD, no BlogPosting, no FAQPage, no BreadcrumbList** shipping today. Do not author JSON-LD and do not claim any structured data renders.

Auto-emitted, per post, with zero extra work:

- **`<title>`** = the Notion **Title** property (which is *also* the page H1 — one field does both)
- **`<meta name="description">`** = the Notion **Meta Description** property
- **`metadata.alternates.canonical`** = `${baseUrl}/blog/${slug}` (canonical **is** emitted — you never set it by hand)

**Not emitted today:** BlogPosting, FAQPage, BreadcrumbList, HowTo, ItemList, DefinedTerm, CollectionPage, OpenGraph/Twitter rich tags. Treat all structured data as **aspirational / future** — see the OPTIONAL section for what would help and how you'd wire it. Never assume a rich result ships; only the title, meta description, and canonical do.

---

## The Notion "frontmatter" (the DB properties)

Posts don't have YAML frontmatter — the Notion DB properties *are* the frontmatter. The ones that matter for SEO:

| Property | Maps to | Max length | Purpose |
|---|---|---|---|
| **Title** | The page `<h1>` **and** `metadata.title` → `<title>` and SERP | ≤ 60 chars | The heading the reader sees AND what Google shows |
| **Meta Description** | `metadata.description` → `<meta name="description">` | 150–160 chars | The SERP snippet under the title |
| **Slug** | the filename `content/posts/<slug>.json` → path `/blog/<slug>` | ≤ 60 chars | Permanent, indexable URL |
| **Excerpt** | on-page hook / listing dek (not the SERP snippet) | ~1–2 sentences | The warm orienting line |
| **Featured Image** | `/blog/<slug>.webp` | — | Social/preview image |
| **Author** | byline (default "Ugo Charles") | — | Named author |
| **Status** | "Done" = published | — | Publish gate |

**Key consequence of this site's setup:** the **Title** does double duty as both H1 and meta title, so write a Title that works in both the SERP and on the page (≤ 60 chars is the binding constraint). The **Meta Description** is its own property — distinct from **Excerpt**, which is the on-page hook under the headline. There is **no separate meta-title property** — the one Title field is both.

**The body must NOT contain its own H1.** The page H1 renders from the Notion Title in `app/blog/[slug]/page.tsx`. Start the body with content — typically the answer quote block (see `featured-snippet-skill.md`), optionally an image above it. Note: in the renderer, `heading_1` is styled visually as `<h2>`, so use **heading_2** for top-level body sections and **heading_3** for sub-sections.

See `title-meta-slug-skill.md` for the full Title / Meta Description / Excerpt / Slug rules. This skill assumes those are set.

---

## URL slug discipline

The slug is permanent — it's the Notion **Slug** property, the `content/posts/<slug>.json` filename, and the `/blog/<slug>` path. Changing it later breaks every inbound link and shuffles your SEO equity. Get it right the first time.

### Rules

- **Kebab-case.** `affirmations-for-anxiety-finding-peace-inner-calm` not `Affirmations_For_Anxiety` or `affirmationsForAnxiety`.
- **Front-load the keyword.** `money-affirmations-for-financial-abundance` beats `the-best-ways-to-attract-wealth`.
- **Drop stop words unless load-bearing.** `morning-affirmations-for-women` beats `some-of-the-best-affirmations-to-say-every-morning`.
- **No dates in the slug.** `2026-money-affirmations` ages out and forces a yearly redirect. Track freshness in Notion (Created) and git, not a slug year.
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

## Meta title rules (the Title property)

The Title is both your H1 and your `<title>`/SERP title, so it has to earn its place in search results while still reading well as a page heading.

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

> Note: the site's existing Meta Description values are sometimes truncated to ~100 chars. When you touch a post, fix the description up to a full 150–160 chars — short descriptions waste SERP real estate and cost click-through.

---

## Meta description rules (the Meta Description property)

Meta Description becomes the `<meta name="description">`. It doesn't directly influence ranking — but it drives click-through, which does. (The visible hook under the headline is the separate **Excerpt** property; keep them distinct so the page doesn't read the same line twice.)

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

There is no Notion `canonical` property and no need for one. If you ever syndicate a post elsewhere, the canonical already points at your version — nothing to configure. This is the one piece of "SEO plumbing" the route *does* ship beyond title/description.

---

## Schema / JSON-LD — NOT emitted today (recommended future enhancements)

**No JSON-LD ships on this site right now.** The route emits title, meta description, and canonical — nothing more. The types below are **recommendations**, not reality. Adding any of them means editing `app/blog/[slug]/page.tsx` to emit a `<script type="application/ld+json">` built from the post's Notion data. Do **not** describe them to anyone as shipping, and do not put a `schema` property in Notion expecting it to render — nothing reads it.

For each, here's the target shape and why it would help.

### BlogPosting (the first thing to wire — every post)

The baseline article schema. It would let Google attach the author, date, and image to the result. Built from the post's Notion data (host `aurasyncs.com`):

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "<Title>",
  "description": "<Meta Description>",
  "datePublished": "<Created, ISO>",
  "url": "https://aurasyncs.com/blog/<slug>",
  "author": { "@type": "Person", "name": "<Author, default 'Ugo Charles'>" },
  "publisher": {
    "@type": "Organization",
    "name": "AuraSyncs",
    "url": "https://aurasyncs.com",
    "logo": { "@type": "ImageObject", "url": "https://aurasyncs.com/logo.png" }
  },
  "image": { "@type": "ImageObject", "url": "https://aurasyncs.com/blog/<slug>.webp" }
}
```

How you'd wire it: in `page.tsx`, build this object from the already-loaded post (Title, Meta Description, Created, Author, Featured Image) and emit one `<script type="application/ld+json">`. No Notion property change needed — all the inputs already exist.

### FAQPage (high-value content add)

Best paired with the body's `## Frequently asked questions` section (a heading_2 + heading_3 questions — see `featured-snippet-skill.md`). To emit it honestly, the answer text in the JSON-LD must match the visible answer word-for-word.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do affirmations really work?",
      "acceptedAnswer": { "@type": "Answer", "text": "<answer, plain text, 40-60 words, matching the visible answer>" }
    }
  ]
}
```

How you'd wire it: parse the FAQ heading_2 + its heading_3/paragraph pairs out of the Notion `blocks` array in `page.tsx`, and emit a JSON-LD script built from the same blocks so visible and structured stay in sync. Because the renderer adds no auto heading IDs, don't point any schema `url`/anchor at `#frequently-asked-questions` — that fragment won't resolve.

### BreadcrumbList (cheapest add)

Home → Blog → this post. Pure derived data — no new Notion property needed; built from the slug + Title in `page.tsx`. Breadcrumbs render under the title in the SERP and lift CTR, which makes this the cheapest high-value win once you start wiring schema.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aurasyncs.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://aurasyncs.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "<Title>", "item": "https://aurasyncs.com/blog/<slug>" }
  ]
}
```

### ItemList (collection / daily-set posts)

For a themed collection ("25+ affirmations for anxiety") or a daily set ("365 daily affirmations") you might emit an `ItemList` of the affirmations. This needs you to parse the affirmation list items out of the `blocks` array, so it's more work than BlogPosting.

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "numberOfItems": "<N>",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "I am calm and capable." },
    { "@type": "ListItem", "position": 2, "name": "This feeling will pass." }
  ]
}
```

### If you add several

Render each as its own `<script type="application/ld+json">` block. Do not merge multiple `@type`s into one object — validators get confused. The sensible order to wire them: **BlogPosting first** (every post), then **BreadcrumbList** (cheap, derived), then **FAQPage** (high value, needs block parsing).

---

## Open Graph + Twitter Card — not wired today

The route does **not** currently emit OpenGraph or Twitter Card tags. If you add them later, build `og:type=article`, `og:site_name=AuraSyncs`, `og:title=Title`, `og:description=Meta Description`, `og:url=canonical`, and an `og:image` from the Featured Image (`/blog/<slug>.webp`, supplied at a 16:9 ratio like 1200 × 675 so social crops cleanly). Until then, do not claim a social preview card renders. The Featured Image is still worth setting — it's the listing/preview image and the input any future OG wiring would use.

---

## Robots, sitemap, indexing

- Site-level discoverability is handled by the route + any `robots`/`sitemap` config in `app/`.
- New posts enter the index via the canonical workflow: write in Notion → set **Status** to "Done" → run `node --env-file=.env scripts/migrate-notion.mjs`. The index page reads the resulting local JSON via `lib/posts.ts`. (A write command may ALSO emit `content/posts/<slug>.json` directly and append `{slug, title, createdTime}` to `content/posts/_index.json`.)
- **Drafts are excluded by Status, not a meta tag:** any Status other than "Done" keeps the post out of the build and listings. There is no `noindex` mechanism to manage — keep a work-in-progress at a non-"Done" Status and it simply isn't published.

---

## Internal linking architecture

See `topical-authority-skill.md` for the full hub-and-spoke discipline. The SEO essentials:

- Links live **in the body** as **inline Notion rich-text `href`s** — a run of rich text with `href` set to `/blog/<sibling-slug>`. The renderer styles links; relative paths resolve against the site root. (There is no Markdown `[text](url)` in the body — the body is Notion blocks, so a link is a rich-text run with an `href`.)
- Every post links to **≥ 3 sibling posts** in its cluster and **1 pillar** where one exists.
- Anchor text should *be* the target query of the linked page — the strongest internal-link signal Google has. Anchor "money affirmations for financial abundance" on the link to that post; anchor "affirmations for confidence" on the link to that sibling.
- Link to the home page only via global nav, not the body.

Real routes to link to: `/blog/<slug>` for posts — all of which exist in `content/posts/` and `content/posts/_index.json`. Verify a slug is real before linking it; never link a 404. Examples of real slugs: `/blog/affirmations-for-anxiety-finding-peace-inner-calm`, `/blog/money-affirmations-for-financial-abundance`, `/blog/bible-affirmations-verses-faith`, `/blog/morning-affirmations-to-transform-your-day`.

---

## Common SEO mistakes the audit catches

The `google-trust-audit-skill.md` checks for these. Recap:

- An H1 inside the body (the H1 comes from the Notion Title — the body must not repeat it; and remember a body `heading_1` renders as `<h2>` anyway)
- Missing or truncated Meta Description (no snippet, or a ~100-char snippet that wastes the band — lengthen to 150–160)
- Title > 60 chars (truncated SERP title and a bloated H1)
- Slug contains stop words, dates, or special characters
- A table in the post body (the Notion renderer supports no tables — reframe as prose or a list)
- No body links to siblings or to the pillar
- No outbound source citations where a load-bearing claim is made (psychology of affirmations, any study, any scripture, any health/money claim)
- Missing Featured Image (no preview image)
- A psychology/science/scripture/health/money claim that wasn't verified (see the trust gate in `accuracy-and-trust-skill.md`)
- Toxic-positivity or denial framing, or a money/manifestation "guarantee" (see the responsible-claims rule in `accuracy-and-trust-skill.md`)

---

## Pre-publish SEO checklist

- [ ] Title ≤ 60 chars, target query front-loaded (it's both H1 and SERP title)
- [ ] Meta Description 150–160 chars (lengthen any existing ~100-char description), reads as a SERP snippet, distinct from Excerpt
- [ ] Excerpt set as the on-page hook (distinct from Meta Description)
- [ ] Slug kebab-case, no stop words, no dates, no special chars; matches the `content/posts/<slug>.json` filename
- [ ] No H1 in the body — body opens with content + the answer quote block; top-level sections use heading_2
- [ ] No tables in the body — comparisons reframed as prose/lists
- [ ] Target query in: Title, Meta Description, Slug, first paragraph, ≥ 1 heading_2, Featured Image alt
- [ ] Author set (default "Ugo Charles"); Status "Done"; Featured Image at `/blog/<slug>.webp` (16:9)
- [ ] ≥ 3 inline body links to sibling posts + 1 to the pillar; anchor text = the linked page's target query; no "click here"
- [ ] Outbound links to credible sources for any load-bearing claim (psychology / study / named-translation scripture / health authority)
- [ ] Every psychology / scripture / health / money claim verified per `accuracy-and-trust-skill.md`; no fabricated stats
- [ ] (Aspirational) If/when JSON-LD is wired, BlogPosting first, then BreadcrumbList, then FAQPage — built from the Notion data, never claimed to ship before it does

Canonical is emitted automatically — nothing to check there beyond feeding a clean slug. Title and Meta Description are the only other auto-emitted artifacts. JSON-LD, OpenGraph, and Twitter are **not** emitted yet; don't rely on them.

---

**BlogOS** — the page Google can rank.
