---
name: page-structures
description: The content types Aurasyncs ships. Every post is a plain-Markdown .mdx file at content/posts/<slug>.mdx, read by lib/posts.ts (gray-matter) and rendered by app/blog/[slug]/page.tsx through next-mdx-remote with remark-gfm and a fixed component map (H1 from the title frontmatter; a leading blockquote = answer box; no custom JSX components; GFM tables allowed but used sparingly). The four types — 💫 themed affirmation collection, 📅 daily/occasion set, 🙏 faith/scripture set, 🧘 practice guide — each have a frontmatter shape, a body skeleton, and a word-count band. Pick the type from the keyword's intent before writing. Audience tuning (women/men/kids/teens) and tone tuning (funny/sweary) are modifiers, not separate types.
---

# Page Structures — The Aurasyncs Content Types

> Aurasyncs renders every post through **one** route: `app/blog/[slug]/page.tsx` reads `content/posts/<slug>.mdx`, parses frontmatter with **`gray-matter`** (`lib/posts.ts`), renders the `<h1>` from the `title` field, then runs the Markdown body through **`next-mdx-remote/rsc` `<MDXRemote>`** (`components/MdxContent.tsx`) with **`remark-gfm`** and a fixed component map. The map styles only `h1, h2, h3, p, ul, ol, li, blockquote, hr, code, pre, a, img` — there are **no custom JSX components** (`AnswerBox`, `Callout`, `ProTip` do not exist). GFM tables render (remark-gfm), but for affirmations prose and grouped lists usually read better. The route also auto-emits `BlogPosting` + `BreadcrumbList` JSON-LD, canonical, OpenGraph (per-post og:image), and a Twitter card. The "shape" of a post is carried entirely by the Markdown body skeleton you choose.

Pick the type from the keyword's search intent. The value drives word count and snippet strategy. Every affirmation is well-formed and non-harmful (`affirmation-craft-skill.md`) and every load-bearing claim is sourced (`accuracy-and-trust-skill.md`).

---

## What carries structure (no custom components)

Because the body is plain Markdown (in an `.mdx` file), the two non-negotiable structural elements are built from Markdown primitives:

- **Answer box** → a **blockquote** (`> …`) near the top of the body (often right after the featured image). The component map renders a `>` block as a left-bordered, italic box. This is the featured-snippet target and the orienting answer.
- **CTA / cross-link** → a normal **Markdown link** to a sibling affirmation post, e.g. `[morning affirmations](/blog/morning-affirmations-to-transform-your-day)`, placed in the conclusion.
- **Tip / note** → a **bold lead-in line** ("**A gentle note.** …") or a blockquote. There is no callout component.

Everything else is `##` / `###` headings, paragraphs, ordered/unordered lists (the affirmations), and Markdown images. **Don't invent JSX tags** — raw JSX needs a component in the map, which doesn't exist. If a comparison is genuinely tabular, a GFM table works, but a grouped list usually reads better for affirmations.

---

## Type index

| Type | Intent | Word count | Snippet play |
|---|---|---|---|
| 💫 Themed affirmation collection | "Affirmations for X" → grouped list + framing | 900–1,600 + lists | Blockquote answer + grouped list |
| 📅 Daily / occasion set | "365 / Monday / morning affirmations" → time-anchored set | 1,200–2,000+ | Blockquote answer + dated/grouped list |
| 🙏 Faith / scripture set | "Bible / Christian affirmations" → affirmation + cited verse | 1,000–1,800 | Blockquote answer + verse-paired list |
| 🧘 Practice guide | "how affirmations work / write your own" → method | 1,000–1,600 | Blockquote answer + numbered method |

All types output to `content/posts/<slug>.mdx`. They share the universal rules at the bottom.

---

## Frontmatter contract (all types)

`lib/posts.ts` reads these frontmatter keys (via `gray-matter`). Don't invent fields.

```yaml
---
title: "Affirmations for Anxiety: 25+ Calming Phrases to Quiet Your Mind"
excerpt: "Short 1–2 sentence on-page hook (shown on the blog index card)."
metaDescription: "150–160 char SERP description, SEPARATE from excerpt."
author: "Ugo Charles"
tags: ["affirmations", "anxiety"]
readingTime: 6
createdTime: "2025-08-18T23:09:00.000Z"
lastEditedTime: "2025-08-18T23:30:00.000Z"
featuredImage: "/blog/affirmations-for-anxiety-finding-peace-inner-calm.webp"
---
```

Field notes:

- The **slug is the filename** (`content/posts/<slug>.mdx`) — there is **no `slug` frontmatter field**. Taken from the brief; don't invent a new one.
- `title` — serves as **both** the H1 and the `<title>` / og:title / JSON-LD headline. There is one title field; there is no `metaTitle`. Front-load the keyword; keep the load-bearing part ≤ ~60 chars. Do **not** repeat it as a `#` heading at the top of the body.
- `excerpt` — a short 1–2 sentence on-page hook. Nullable.
- `metaDescription` — a **separate** 150–160 char SERP description. Don't conflate it with `excerpt`. (Many existing posts have this truncated to ~100 chars — fix to a full line when you touch them.)
- `author` — the byline. Default in copy is **"Ugo Charles"** (the loader falls back to "Aurasyncs Team" if omitted).
- `tags` — 1–4 short topical tags (e.g. `affirmations`, plus the theme).
- `readingTime` — minutes (number).
- `createdTime` / `lastEditedTime` — ISO datetimes. `createdTime` → `datePublished`/og:publishedTime; `lastEditedTime` → `dateModified`/og:modifiedTime (bump it on edits).
- `featuredImage` — full path (`/blog/<slug>.webp`); the file lives at `public/blog/<slug>.webp`. Omit if none.

There is **no `status` field** (the file existing = published) and **no `relatedCategories`/`relatedPages`** (cross-links are inline Markdown links). A `BlogPosting` + `BreadcrumbList` JSON-LD pair is emitted **automatically** by the route; `FAQPage`/`HowTo` are **not** (optional future work), so FAQ content lives in the body as prose. See `seo-and-schema-skill.md`.

---

## Type 1 — 💫 Themed affirmation collection ("Affirmations for X")

**The core type.** One per need. Rank the "affirmations for X" / "X affirmations" query and give the reader both the words and the way to use them.
**Word count:** 900–1,600 plus the affirmation lists.

### Body skeleton (no `#` H1 — rendered from `title`)

```
![A calm woman with a hand on her heart](/blog/affirmations-for-anxiety-finding-peace-inner-calm-content-1.webp)

> These 25 anxiety affirmations are short, calming phrases you can repeat when your
> mind races — at your desk, in the car, or at 2am. Read them slowly, breathe between
> each one, and keep the two or three that feel true today.

## How to use these affirmations
[Short, practical: say them out loud or silently, repeat a few times, pair with a
slow breath, pick the ones that fit. 80–140 words.]

## Calming affirmations for an anxious moment
[A grouped list of first-person, present-tense affirmations.]
- I am safe in this moment.
- I breathe in calm and breathe out tension.
...

## Affirmations for racing thoughts
- My thoughts are not facts, and this feeling will pass.
...

## Affirmations to feel grounded again
...

## Why affirmations help with anxiety
[2–4 sentences, SOURCED. What self-affirmation / reframing research does and doesn't
support. Include a light, non-alarmist note: affirmations are a supportive practice,
not a replacement for professional care — if anxiety is persistent, reach out to a
doctor or therapist.]

## Tips to make them stick
[A few practical, honest tips. "Ladder" the ones you don't believe yet: 'I am learning to feel calm.']

## Frequently asked questions
### Do affirmations actually help with anxiety?
### How many times should I repeat an affirmation?
...

[One-line CTA to a sibling post, e.g. the sleep or self-love affirmations.]
```

The grouped list + the "how to use" + "why they help" framing is what makes this non-generic. A bare list ships as thin content. Every affirmation must be well-formed (`affirmation-craft-skill.md`).

---

## Type 2 — 📅 Daily / occasion set

**Time- or occasion-anchored sets.** "365 daily affirmations", "Monday affirmations", "morning affirmations", "Friday affirmations", "daily affirmations for kids". The organizing principle is *time*, not theme.
**Word count:** 1,200–2,000+ (a 365 set is long — outline and draft in sections, see master §LONG-FORM).

### Body skeleton

```
![A soft sunrise over a calm landscape](/blog/morning-affirmations-to-transform-your-day-content-1.webp)

> Start each morning with one of these affirmations and you set the tone before the
> day sets it for you. Below are 40 morning affirmations grouped by what you might
> need — confidence, calm, gratitude — so you can pick one to carry out the door.

## How to use a daily affirmation
[Pick one, say it while you get ready, repeat it through the day. 80–140 words.]

## Morning affirmations for confidence
- Today, I move through the world with quiet confidence.
...

## Morning affirmations for calm
...

## Morning affirmations for gratitude
...

## Building a daily affirmation habit
[Tie it to an existing cue — coffee, the mirror, the commute. Honest, practical.]

## Frequently asked questions
### What should I say to myself every morning?
...

[CTA to a sibling, e.g. night/sleep affirmations to bookend the day.]
```

For calendar sets (365 / month-by-month), group by month or week with a `##` per block and the affirmations as list items. Keep the "how to use" + a habit section so it isn't just a wall of 365 lines.

---

## Type 3 — 🙏 Faith / scripture set

**Affirmations rooted in scripture.** "Bible affirmations", "Christian affirmations for work", "I am affirmations from the Bible". Each affirmation is paired with an **accurately quoted, correctly referenced** verse, and the **translation is named**. Scripture accuracy is a hard gate — see `accuracy-and-trust-skill.md`.
**Word count:** 1,000–1,800.

### Body skeleton

```
![An open Bible in soft light](/blog/bible-affirmations-verses-faith-content-1.webp)

> These Bible-based affirmations turn God's promises into first-person declarations
> you can speak over your day. Each one is paired with the verse it draws from, so
> you can read the affirmation, then sit with the Scripture behind it.

## How to use these biblical affirmations
[Read the verse, speak the affirmation, optionally journal it. 80–140 words.]

## Affirmations about identity in Christ
- I am a new creation; the old has gone and the new has come.
  *(2 Corinthians 5:17, NIV)*
...

## Affirmations about strength and courage
- I can do all things through Christ who strengthens me.
  *(Philippians 4:13, NIV)*
...

## Affirmations about peace
...

## Frequently asked questions
### Is it biblical to speak affirmations over yourself?
...

[CTA to a sibling faith post.]
```

Quote each verse exactly, cite book/chapter/verse correctly, and name the translation (NIV/ESV/KJV…). Don't paraphrase a verse and present it as a quote. Frame affirmations as a devotional practice, respectfully.

---

## Type 4 — 🧘 Practice guide

**Teaches the method.** "How do affirmations work", "how to write affirmations that work", "manifestation for beginners", "affirmation routine". Prose-led, with example affirmations woven in. This is the type that builds topical authority and earns links.
**Word count:** 1,000–1,600.

### Body skeleton

```
![A person journaling with a cup of tea](/blog/manifestation-affirmations-for-beginners-content-1.webp)

> Affirmations work best when they're believable, present tense, and repeated with
> attention — not just recited. This guide covers what affirmations are, how to write
> ones that actually stick, and a simple daily routine, with examples throughout.

## What affirmations are (and aren't)
[Define affirmation; distinguish from mantra/declaration; set honest expectations.
SOURCE the psychology — self-affirmation theory and what it does/doesn't claim.]

## How to write an affirmation that works
[The craft, as a numbered method: present tense, first person, positive framing,
believable "ladder", specific, emotionally resonant. Each step with an example.]

## A simple daily routine
[When and how to practice — anchor to a cue, repeat, say out loud, journal.]

## Common mistakes
[Affirming what you fear, choosing ones you can't believe yet, expecting magic.]

## Frequently asked questions
### Do affirmations really work?
### How long until affirmations work?
...

[CTA to a themed collection so the reader can start using them.]
```

This type leans on `affirmation-craft-skill.md` and must source its psychology claims responsibly — no "rewires your brain in 21 days," no invented studies.

---

## Audience & tone modifiers (not separate types)

Posts for a specific audience (women, men, kids, teens, new mothers) or a specific tone (funny, sweary, novelty) are a **modifier on a type**, usually Type 1 or 2:

- **Audience modifier** — shift the examples, the situations, and the voice to that reader. "Affirmations for kids" uses simple, concrete language and a parent-facing how-to-use; "affirmations for men" drops nothing in substance but matches register. Keep every affirmation well-formed.
- **Tone modifier** — "funny" or "sweary" affirmations still have to be well-formed affirmations underneath the humor, and the responsible-claims rules still apply. Don't let the bit produce a harmful or mocking affirmation.

The structure stays the type's structure; the modifier changes the voice and examples, not the skeleton.

---

## Choosing the type

1. **Read the keyword's intent.** "affirmations for anxiety" → 💫 collection. "365 daily affirmations" / "Monday affirmations" → 📅 daily/occasion. "Bible affirmations" → 🙏 faith. "how to write affirmations" / "manifestation for beginners" → 🧘 practice guide.
2. **Check the SERP.** If the top results are grouped lists with framing, write a collection and beat them on better grouping, a real how-to-use, and sourced why-it-works. If they teach a method, write a practice guide.
3. **When ambiguous, ask the operator** — or default to the collection, which is the core type.

---

## Heading hierarchy (universal, non-negotiable)

- H1 lives in the frontmatter `title:` only. **Never a `#` in the body.** The route renders the H1, and the component map maps a body `#`/`h1` to an `<h2>` anyway. Top sections are `##`, sub-sections `###`.
- Body starts with content (often the featured image), then the **answer blockquote** (`>`), then `##` sections.
- **No `{#id}` anchors and no auto heading IDs** — the renderer does not slugify headings. Don't write anchor syntax; it prints literally.
- `##` → `###`, no skips.

See `scannable-formatting-skill.md` for the full discipline.

---

## Voice (universal)

All types share:

- Warm, plain, encouraging prose (~grade 7). "Pick two or three that feel true today" beats "unlock your highest self."
- Well-formed affirmations and correct terminology, every time (`affirmation-craft-skill.md`).
- Claims that verify and scripture that's accurate, always (`accuracy-and-trust-skill.md`).
- One CTA per post, to a sibling affirmation post.
- No hype, no "powerful / life-changing / game-changing" without a reason.
- Responsible framing: support, not a substitute for professional care.

See `research/voice_profile.md` (or `protocols/site-voice-profile.md`) for the Aurasyncs voice lock.

---

**BlogOS** — content types that give the reader the words and the way to use them.
