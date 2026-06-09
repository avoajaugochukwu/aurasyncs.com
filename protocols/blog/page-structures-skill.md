---
name: page-structures
description: The content types Aurasyncs ships. Every post is a Notion page pulled into content/posts/<slug>.json by scripts/migrate-notion.mjs and rendered by app/blog/[slug]/page.tsx + components/NotionRenderer.tsx (H1 from the Title property; body = supported Notion blocks only; quote block = answer box; callout = tip; no tables). The four types — 💫 themed affirmation collection, 📅 daily/occasion set, 🙏 faith/scripture set, 🧘 practice guide — each have a property shape, a body skeleton, and a word-count band. Pick the type from the keyword's intent before writing. Audience tuning (women/men/kids/teens) and tone tuning (funny/sweary) are modifiers, not separate types.
---

# Page Structures — The Aurasyncs Content Types

> Aurasyncs renders every blog post through **one** pipeline: a page authored in the Notion content database is pulled into `content/posts/<slug>.json` by `scripts/migrate-notion.mjs`; `app/blog/[slug]/page.tsx` renders the `<h1>` from the **Title** property and the body through `components/NotionRenderer.tsx`. That renderer supports **only** these blocks: `paragraph`, `heading_1`, `heading_2`, `heading_3`, `bulleted_list_item`, `numbered_list_item`, `to_do`, `toggle`, `code`, `image`, `divider`, `quote`, `callout`. There are **no tables** (a table renders as nothing), **no math**, and **no custom components**. The "shape" of a post is carried entirely by the body skeleton you choose. (`heading_1` is styled as an `<h2>`, so body section headings use `heading_2` / `heading_3`.)

Pick the type from the keyword's search intent. The value drives word count and snippet strategy. Every affirmation is well-formed and non-harmful (`affirmation-craft-skill.md`) and every load-bearing claim is sourced (`accuracy-and-trust-skill.md`).

---

## What carries structure (no custom components)

Because the body is plain Notion blocks, the two non-negotiable structural elements are built from native blocks:

- **Answer box** → a **`quote` block** near the top of the body (right after the optional featured image). The renderer styles a quote as a left-bordered, italic box. This is the featured-snippet target and the orienting answer.
- **CTA / cross-link** → a normal inline **rich-text link** to a sibling affirmation post, e.g. a link to `/blog/morning-affirmations-to-transform-your-day`, placed in the conclusion.
- **Tip / note** → a **`callout` block** (emoji + tinted) or a bold lead-in line in a paragraph.

Everything else is `heading_2` / `heading_3` headings, paragraphs, bulleted/numbered lists (the affirmations), and images. **No tables** — write anything tabular as grouped lists.

---

## Type index

| Type | Intent | Word count | Snippet play |
|---|---|---|---|
| 💫 Themed affirmation collection | "Affirmations for X" → grouped list + framing | 900–1,600 + lists | Quote answer + grouped list |
| 📅 Daily / occasion set | "365 / Monday / morning affirmations" → time-anchored set | 1,200–2,000+ | Quote answer + dated/grouped list |
| 🙏 Faith / scripture set | "Bible / Christian affirmations" → affirmation + cited verse | 1,000–1,800 | Quote answer + verse-paired list |
| 🧘 Practice guide | "how affirmations work / write your own" → method | 1,000–1,600 | Quote answer + numbered method |

All types output to a Notion page → `content/posts/<slug>.json`. They share the universal rules at the bottom.

---

## Property contract (all types)

The pipeline reads these Notion properties (see `scripts/migrate-notion.mjs` and `lib/posts.ts`). Don't invent fields.

```
Title:            Affirmations for Anxiety: 25+ Calming Phrases to Quiet Your Mind
Slug:             affirmations-for-anxiety-finding-peace-inner-calm
Excerpt:          Short 1–2 sentence on-page hook (shown on the blog index card).
Meta Description: 150–160 char SERP description, SEPARATE from Excerpt.
Author:           Ugo Charles
Tags:             [affirmations, anxiety]
ReadingTime:      6
Featured Image:   (file → /blog/<slug>.webp)
Status:           Done
```

Field notes:

- `Title` — serves as **both** the H1 and the `<title>` / og:title. There is one title field; there is no `metaTitle`. Front-load the keyword; keep the load-bearing part ≤ ~60 chars. Do **not** repeat it as a heading at the top of the body.
- `Excerpt` — a short 1–2 sentence on-page hook.
- `Meta Description` — a **separate** 150–160 char SERP description. Don't conflate it with `Excerpt`. (Many existing posts have this truncated to ~100 chars — fix to a full line when you touch them.)
- `Author` — the byline. Default **"Ugo Charles"**.
- `Tags` — 1–4 short topical tags (e.g. `affirmations`, plus the theme).
- `ReadingTime` — minutes (number).
- `Featured Image` — file; downloaded to `public/blog/<slug>.webp`.
- `Status` — `Done` publishes; anything else is skipped by the migrate script.

There is **no `dateModified` field** (track updates via `lastEditedTime` / git) and **no JSON-LD** emitted by the route — `BlogPosting` / `FAQPage` schema are not wired, so FAQ content lives in the body as prose, never as a property. See `seo-and-schema-skill.md`.

---

## Type 1 — 💫 Themed affirmation collection ("Affirmations for X")

**The core type.** One per need. Rank the "affirmations for X" / "X affirmations" query and give the reader both the words and the way to use them.
**Word count:** 900–1,600 plus the affirmation lists.

### Body skeleton (no H1 — rendered from `Title`)

```
[image] featured image, caption = descriptive alt ("A calm woman with a hand on her heart")

[quote] These 25 anxiety affirmations are short, calming phrases you can repeat when
your mind races — at your desk, in the car, or at 2am. Read them slowly, breathe
between each one, and keep the two or three that feel true today.

## How to use these affirmations
[Short, practical: say them out loud or silently, repeat a few times, pair with a
slow breath, pick the ones that fit. 80–140 words.]

## Calming affirmations for an anxious moment
[A grouped list of first-person, present-tense affirmations as list items.]
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
[image] featured image, caption = alt

[quote] Start each morning with one of these affirmations and you set the tone before
the day sets it for you. Below are 40 morning affirmations grouped by what you might
need — confidence, calm, gratitude — so you can pick one to carry out the door.

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

For calendar sets (365 / month-by-month), group by month or week with a `heading_2` per block and the affirmations as list items. Keep the "how to use" + a habit section so it isn't just a wall of 365 lines.

---

## Type 3 — 🙏 Faith / scripture set

**Affirmations rooted in scripture.** "Bible affirmations", "Christian affirmations for work", "I am affirmations from the Bible". Each affirmation is paired with an **accurately quoted, correctly referenced** verse, and the **translation is named**. Scripture accuracy is a hard gate — see `accuracy-and-trust-skill.md`.
**Word count:** 1,000–1,800.

### Body skeleton

```
[image] featured image (soft, light-themed), caption = alt

[quote] These Bible-based affirmations turn God's promises into first-person
declarations you can speak over your day. Each one is paired with the verse it draws
from, so you can read the affirmation, then sit with the Scripture behind it.

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
[image] featured image, caption = alt

[quote] Affirmations work best when they're believable, present tense, and repeated
with attention — not just recited. This guide covers what affirmations are, how to
write ones that actually stick, and a simple daily routine, with examples throughout.

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

- H1 lives in the **Title** property only. **Never in the body.** The route renders the H1. `heading_1` is styled as an `<h2>` by the renderer, so don't use it either — top sections are `heading_2`, sub-sections `heading_3`.
- Body starts with content (often the featured image), then the **answer `quote` block**, then `heading_2` sections.
- `heading_2` → `heading_3`, no skips.

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
