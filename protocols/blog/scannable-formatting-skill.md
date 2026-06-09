---
name: scannable-formatting
description: Heading hierarchy rules, paragraph-length discipline, bullets vs prose, callouts, and the core content blocks (the leading blockquote answer, the how-to-use note, the themed affirmation lists) for AuraSyncs posts. This is the file that turns prose into a web page Google can index and a human can scan. Calibrated for the MDX renderer (components/MdxContent.tsx via next-mdx-remote/rsc + remark-gfm) — the component map styles only: h1, h2, h3, p, ul, ol, li, blockquote, hr, code, pre, a, img. GFM tables DO render (use sparingly). Heading hierarchy is non-negotiable.
---

# Scannable Formatting — the layer between prose and page

> A great paragraph that nobody scrolls to is dead writing. This skill is the discipline of structuring content so the anxious reader at 2am, the person skimming on a phone, the screen reader, and Google's crawler can all find what they came for — within the limits of what this site's renderer actually produces.

---

## What the renderer does (and doesn't do)

Every post is a plain-Markdown **MDX file** you write directly to `content/posts/<slug>.mdx` (the slug is the filename — the file existing in the folder is what publishes it; there is no Notion, no migrate step, no Status field). Frontmatter is parsed by `gray-matter` in `lib/posts.ts`, and the body is rendered by `next-mdx-remote/rsc`'s `<MDXRemote>` in `components/MdxContent.tsx` with `remark-gfm` and a fixed component map. `getAllPosts` reads the `.mdx` files directly. Before any formatting rule, internalize these facts:

- **The component map styles a fixed element set.** The map covers exactly: `h1`, `h2`, `h3`, `p`, `ul`, `ol`, `li`, `blockquote`, `hr`, `code`, `pre`, `a`, `img`. Write standard Markdown that produces these elements. There are **no custom JSX components** (no AnswerBox/Callout) — don't invent JSX tags.
- **GFM tables DO render.** `remark-gfm` is installed, so pipe tables, strikethrough, and task lists work in the body. Use tables **sparingly** — prose and themed grouped lists usually read better for affirmations — but they are allowed. If a "need → affirmation" set reads better as `###` groups with a list underneath, do that; reach for a table only when the data is genuinely 2-D.
- **`#` H1 in the body renders as an `<h2>`.** The component map maps `h1` to an `<h2>`, and the page's real H1 comes from the frontmatter `title` (rendered by `app/blog/[slug]/page.tsx`). So **never use a `#` H1 in the body** — use `##` for top-level sections and `###` for sub-sections.
- **No auto heading IDs / no on-page anchors.** There is no rehype-slug, no jump-link TOC, and no `{#id}` anchors. Rely on clear heading phrasing instead.
- **A leading Markdown blockquote (`> …`) is the answer box** — the component map renders a blockquote as a left-bordered italic box. There is **no callout block** (that was Notion); for tips use a **bold lead-in line** or a blockquote.

---

## The heading hierarchy (non-negotiable)

This is the most important section in this file. Codify it.

### H1 — exactly one per page, from the frontmatter title

The H1 is the page title. It lives in the frontmatter **`title`** and is rendered by the blog route (`app/blog/[slug]/page.tsx` emits the `<h1>`). **Never put an H1 in the body, and never use a `#` H1 for a body heading** (it maps to an `<h2>` and competes with the title).

```
[frontmatter title: "Affirmations for Anxiety: 25 Calming Lines for a Racing Mind"]
[The route renders <h1>Affirmations for Anxiety: 25 Calming Lines for a Racing Mind</h1>]

[Body starts here — first content is often the featured/inline image, then the
blockquote answer, then ## sections. Never a # H1 in the body.]
```

Why: multiple H1s confuse Google's understanding of what the page is about, harm accessibility, and break the semantic outline.

### `##` — major sections, multiple allowed

Every major section of the post is an `##` heading. Rules:

- Start after the opening answer blockquote + the how-to-use note.
- Use need or question phrasing: "Affirmations for the 2am spiral", "How to use these when you're panicking", "Why anxiety affirmations actually help".
- Avoid label phrasing: "Background", "Section 1", "Introduction".
- No `{#id}` anchors — this renderer doesn't generate them.
- Top-level headings capture featured snippets — write them as if they were searchable themselves.

### `###` — sub-sections inside a `##`

Use `###` only when a `##` section has 2+ genuine sub-sections — for example, the themed affirmation groups inside a collection ("For your body", "For your worth", "For your inner voice"). A single `###` inside a `##` is an orphan — promote it or fold it into the parent prose.

Rules:
- Always under a `##` (never a lone sub-heading at the top of the body)
- Phrase consistently with the parent `##`'s style
- Don't reach for a fourth heading level — the component map styles `h1`/`h2`/`h3` only

### Deeper levels — contraband

There is no styled heading level below `###`. If you feel you need one, the post structure has failed — restructure, or that section is probably its own post.

---

## Heading rules summary

```
H1       — frontmatter title only, exactly one (no # H1 in body)
##       — major sections, need/question phrasing, NO {#id}
###      — sub-sections (e.g. themed affirmation groups), only when 2+ exist under one ##
(no deeper) — a # H1 in the body maps to h2; nothing below ### is styled
```

The semantic outline of every post is H1 (title) → `##` sections → optional `###` sub-sections, with no skips and no orphans.

---

## Paragraph length

The default paragraph length on the web is shorter than print. Real readers scan first; long paragraphs intimidate — and an AuraSyncs reader is often someone anxious or low, skimming on a phone, looking for one line that helps.

### Rules

- **2-4 sentences per paragraph** for most prose
- **Single-sentence paragraphs** are allowed for emphasis, transition, or beat. Use sparingly — three in a row is an AI tell.
- **5-6 sentence paragraphs** are allowed in pillar pieces or longer practice-guide intros, when the reader is committed and the prose earns it.
- **8+ sentence paragraphs** are wallpaper. The skimmer scrolls past.

### Visual rhythm test

Preview the post. Look at the *shape* of the paragraphs on the page. Healthy posts have varied paragraph shapes — some 2 lines, some 5, some 1, some 4. Posts that are all 4-line paragraphs read as templated.

---

## First-sentence discipline

The skimming reader reads the first sentence of every paragraph. So:

- The first sentence carries the paragraph's claim
- Don't bury the point in sentence 3
- "There are several reasons affirmations help with anxiety. First, …" — wastes the first sentence. Start with "First, …" directly.
- Topic sentences that don't say anything ("Let's now turn to the next group") are contraband

If you delete every sentence except the first in each paragraph, can a reader follow along? That's the skim test.

---

## Lists vs prose — when to use each

On an affirmation post, the **affirmations themselves are almost always a list** — a bulleted list (`-`) for a themed group, a numbered list (`1.`) when sequence or counting matters (a numbered daily set, a step-by-step practice).

### Use lists when:
- 3+ items share the same shape (parallel) — the affirmation lines of a themed group
- Order doesn't matter much (use a bulleted list) or matters a lot — a numbered daily set or practice steps (use a numbered list)
- The reader needs to *scan* or *count* the items (a set of affirmations, a how-to-use checklist)
- The content is genuinely parallel — not narrative dressed up as a list

### Use prose when:
- The items have varied shape or depth
- The connections between items matter (why this affirmation builds on the last)
- One idea flows into the next (the "why they work" explanation)
- The argument needs sentences

### List anti-patterns

- 2-item lists — write it as prose
- Lists where each item is a paragraph — reformat as `###` groups or as prose
- Lists of mixed-grammar items — "I am calm. You should breathe slowly. Affirmations help." — three different shapes; affirmation lists should be consistently first-person, present-tense lines
- Nested lists deeper than 2 levels — restructure

### List item phrasing

- **Affirmation list items:** keep them well-formed — first person, present tense, positively framed ("I am safe in this moment," "I'm learning to feel calmer"). No second-person or future-tense lines mixed in.
- **Numbered practice steps:** start with a verb if procedural ("Say the line slowly on a long exhale")
- **Short items:** affirmations read best short — most under 12 words
- **Long items:** if a single affirmation needs 30+ words, it's a paragraph, not an affirmation — tighten it

---

## Grouped data — sub-headings and lists first; GFM tables sparingly

For "need → affirmation" or "morning vs night" data, **prefer themed `###` groups with lists, or prose** — they read warmer and scan better for affirmations. GFM tables **do** render (remark-gfm is installed), so a genuinely 2-D reference is allowed; just use it sparingly.

### Default: turn the table into sub-headings + lists or prose

Most "tables" on an affirmation blog are really themed groups, and they read better as `###` groups with a list under each. A "by mood" set, for instance, becomes:

```
###  For a stressful morning
- I can handle today one moment at a time.
- I've gotten through hard mornings before.

###  For winding down at night
- I've done enough for today.
- I let the day go and rest.
```

Or as prose for a quick comparison: "Spoken affirmations shift your mood faster; written ones sink in deeper — start spoken, move to a journal once the habit sticks."

### When a table genuinely earns its place

If the data is truly tabular (a compact comparison the reader will scan across columns), a GFM pipe table renders cleanly:

```
| Practice | Best for | When |
|---|---|---|
| Spoken aloud | Shifting mood fast | Morning, in the mirror |
| Written in a journal | Sinking in deeper | Evening, winding down |
```

Reach for this only when the 2-D shape is the point — most affirmation content is better as grouped lists.

---

## Callouts — the blockquote answer box and bold lead-ins

On this renderer a "callout" is one of two things:

### 1. A blockquote (left-bordered italic box)

A Markdown blockquote (`> …`) renders as a left-bordered italic box — this is the answer box and the highlight box. Use it for the leading answer, a single highlighted affirmation, or a genuine cited source/scripture line (with attribution).

### 2. A bold lead-in sentence

For tips and definitions inside the flow, a bold lead-in is the cleanest "note" pattern (there is no tinted callout block — that was Notion):

**A gentle note.** Affirmations are a real support, but if anxiety is running your life, please talk to a doctor or therapist.

**Tip.** Pick a believable line first — "I'm learning to feel calmer" lands when "I am completely calm" bounces right off.

**Affirmation vs mantra.** An affirmation is a positive, present-tense statement about yourself; a mantra is a sound or phrase repeated to focus the mind. This site writes affirmations — see `affirmation-craft-skill.md`.

### Reserve the blockquote

The blockquote (left-border italic) is the **answer box** — reserve it for the opening answer, a single highlighted affirmation, or a genuine cited source/scripture line (with attribution). For an ordinary tip or note, use a bold lead-in instead so the blockquote keeps its weight.

### Frequency

- 1-3 blockquote/lead-in tips per post is healthy (beyond the opening blockquote answer)
- 5+ becomes noise
- Match the note to the moment — don't dress every aside as a warning

---

## The core content blocks (answer, how-to-use, themed affirmation lists)

The load-bearing content of an AuraSyncs post is the **leading blockquote answer**, the **how-to-use note**, the **themed affirmation lists**, and (for clinical topics) the **honest support note**. These are the scannability events that carry the page.

### The leading blockquote answer

Lead with the answer. The very first text in the body (often right after the featured/inline image) is a Markdown blockquote (`> …`) — this *is* the answer box, the featured-snippet target, and the orienting beat:

```
> These 25 anxiety affirmations are short, calming lines for when your mind
> races — at your desk, in the car, or at 2am. Say one slowly on a long
> exhale and repeat it until the wave eases. They won't switch anxiety off,
> but they give you something steady to hold. You've got this.
```

40-60 words. Warm and grounded. Every factual or scriptural claim must hold up, and every affirmation must be well-formed — see `affirmation-craft-skill.md` and `accuracy-and-trust-skill.md`.

### The how-to-use note

Right under the answer, a short note (a paragraph, a list, or a bold lead-in) on how to actually use the set — spoken vs written, when, how often:

```
**How to use these.** Pick two or three that resonate, say them out loud and
slowly, and come back to them daily. You don't have to believe them fully yet —
saying them is the practice.
```

### The themed affirmation lists

This is the heart of the post. Group affirmations into themed `###` sub-sections under a `##`, each with a bulleted (or numbered) list:

```
## Affirmations for a racing mind

### When you can't slow your thoughts
- This feeling is uncomfortable, and it will pass.
- I am safe in this moment.
- I don't have to fix everything right now.

### When you're lying awake at 2am
- My body knows how to rest, even when my mind is loud.
- I can let this thought go and come back to my breath.
```

Keep every line well-formed (first person, present tense, positive, believable) and consistent with the post's framing.

### The honest support note (clinical topics)

For anxiety, depression, grief, and other clinical needs, include a light, non-alarmist note that affirmations support but don't replace professional care — as a bold lead-in or a short paragraph near the end. This is part of the trust gate, not optional.

### Don't use the blockquote for:
- Emphasis (use bold)
- Ordinary tips (use a bold lead-in)
- General commentary (it's not a quote)

### Sourcing rule

Every affirmation must be well-formed and not harmful (no toxic positivity for someone in real distress), and every load-bearing factual claim — the psychology of affirmations, any study, any scripture quote/citation, any health or money claim — must be correct and verifiable against a real authority and cited. Research is WebSearch + WebFetch (there is no brief folder or SEO pipeline). Never fabricate a study or a statistic, never quote scripture inaccurately or without naming the translation, and never frame manifestation as a guaranteed outcome. See `accuracy-and-trust-skill.md` for the trust gate every post must pass before publishing.

---

## Code / formula blocks

An affirmation blog almost never needs program code or fenced blocks. The rare legitimate uses:

- An exact field/route/file name you want set off in inline code (`content/posts/<slug>.mdx`, `/blog/<slug>`, a frontmatter key like `featuredImage`)

Otherwise, prefer prose, lists, blockquotes, and images. Use inline code (`backticks`) only for: route/field names, file paths, and exact technical tokens — not for ordinary emphasis, and never for affirmations (they're list items, not code).

---

## Images in flow

See `media-and-images-skill.md` for the full image discipline. Quick scannability points:

- Featured image set via the frontmatter **`featuredImage`** key → `/blog/<slug>.webp`, rendered by the route above the body
- Inline images as Markdown `![alt](/blog/<slug>-content-N.webp)`
- Long collections and daily sets want a calming inline image every 600-1,000 words to break the scroll
- Every image has real alt text
- No decorative-only filler — every image earns its presence (a calm, on-theme visual is part of the mood, but it still needs alt text and a reason)

---

## Bold and italic

Bold and italic are emphasis types with different jobs:

- **Bold** for the load-bearing phrase in a paragraph — what the skimmer needs to see; also the lead-in label for an inline note ("**A gentle note.** …")
- *Italic* for a term on first use (*self-affirmation theory*, *ladder affirmation*) or a light, deliberate emphasis

### Rules

- Bold one phrase per paragraph maximum (more dilutes)
- Italic 2-3 times per page maximum (more is precious)
- Never both at once (***bold italic*** is shouting)
- Never an entire sentence bolded — break it or rewrite
- **Don't bold the affirmations themselves** — they live in lists; bolding a whole list is noise

### What NOT to bold

- Keywords for SEO — Google notices the artificial pattern
- Random words for "visual interest"
- Every sentence in a paragraph
- Headings (they're already styled)

---

## Table of contents

There is **no on-page TOC** and **no auto heading IDs** on this renderer (no rehype-slug). Don't write a manual jump-link list (the anchors won't resolve), and don't add a `toc` frontmatter key. Your job is to make the heading phrasing so clear that the heading list *is* the visual outline. For pillar posts that want a contents overview, write a short prose "what this covers" paragraph near the top instead of a linked TOC.

---

## The visual rhythm budget

For every 250-300 words of body, there should be a scannability event. On this renderer the events are:

- A new `##` or `###` heading (a themed affirmation group)
- A bulleted or numbered list (the affirmation lines, a how-to-use checklist)
- An inline image (a calming, on-theme visual that earns its place)
- A blockquote (the answer, a highlighted affirmation, or a cited source/scripture line)
- A bold lead-in note (a how-to-use tip or an honest note)
- An occasional GFM table — used sparingly, where the data is genuinely 2-D

A 1,500-word post should have 6-9 scannability events distributed across the body — not clustered at the top, not absent for a 600-word stretch. On an affirmation post the easiest way to hit this is to keep the themed groups short and frequent: a wall of prose with no affirmation list is a bounce.

The audit catches: any 300-word run with zero scannability events.

---

## Pre-publish formatting checklist

- [ ] Exactly one H1 (from the frontmatter `title`; no `#` H1 in the body)
- [ ] Top-level sections are `##`, sub-sections `###` (no `#` H1 in body; nothing below `###`)
- [ ] No `{#id}` anchors written (renderer doesn't support them)
- [ ] Headings use need/question phrasing, not labels
- [ ] No orphan `###` (a single sub-heading under one `##`)
- [ ] No paragraph > 6 sentences (unless a pillar piece)
- [ ] No 3+ short paragraphs in a row
- [ ] First sentence of every paragraph is load-bearing
- [ ] Affirmation lists are genuinely parallel and well-formed (first person, present tense, positive)
- [ ] Tables used sparingly (GFM tables render via remark-gfm; prefer themed `###` groups + lists for affirmations)
- [ ] Only standard Markdown elements used (no invented JSX tags — the component map has no custom components)
- [ ] Notes are bold lead-ins; the blockquote is reserved for the answer/source lines
- [ ] Opening blockquote is the direct, grounded answer (40-60 words)
- [ ] How-to-use note sits right under the answer
- [ ] Themed affirmation lists present and grouped; for clinical topics an honest support note is included
- [ ] Bold used for load-bearing phrases, not keywords or affirmations
- [ ] Every affirmation well-formed and every fact/scripture verified per `accuracy-and-trust-skill.md`
- [ ] Scannability event every 200-300 words

---

**BlogOS** — structure is content.
