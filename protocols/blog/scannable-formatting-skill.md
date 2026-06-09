---
name: scannable-formatting
description: Heading hierarchy rules, paragraph-length discipline, bullets vs prose, callouts, and the core content blocks (the leading quote-block answer, the how-to-use note, the themed affirmation lists) for AuraSyncs posts. This is the file that turns prose into a web page Google can index and a human can scan. Calibrated for the Notion renderer (components/NotionRenderer.tsx) — only the supported block types render: paragraph, heading_1/2/3, bulleted_list_item, numbered_list_item, to_do, toggle, code, image, divider, quote, callout. NO tables. Heading hierarchy is non-negotiable.
---

# Scannable Formatting — the layer between prose and page

> A great paragraph that nobody scrolls to is dead writing. This skill is the discipline of structuring content so the anxious reader at 2am, the person skimming on a phone, the screen reader, and Google's crawler can all find what they came for — within the limits of what this site's renderer actually produces.

---

## What the renderer does (and doesn't do)

Every post originates in Notion, is pulled into `content/posts/<slug>.json` by `scripts/migrate-notion.mjs`, and is rendered block-by-block through `components/NotionRenderer.tsx` (the `[slug]` route still reads live from Notion; the index reads local JSON via `lib/posts.ts`). Before any formatting rule, internalize these facts:

- **Only the supported blocks render.** The renderer handles exactly: `paragraph`, `heading_1`, `heading_2`, `heading_3`, `bulleted_list_item`, `numbered_list_item`, `to_do`, `toggle`, `code`, `image`, `divider`, `quote`, `callout`. Anything else won't render. Don't reach for blocks outside this set.
- **No tables.** There is no table block support. A side-by-side grid will not render. **Prefer themed sub-headings with lists, or prose** for any grouped or comparative data. If you're tempted to make a table of "need → affirmation," restate it as a `heading_3` group with a list underneath.
- **`heading_1` renders as an `<h2>`.** Notion's heading_1 is styled visually as an h2, and the page's real H1 comes from the Notion **Title** (rendered by `app/blog/[slug]/page.tsx`). So **don't use heading_1 for body headings** — use `heading_2` for top-level sections and `heading_3` for sub-sections.
- **No auto heading IDs / no on-page anchors.** There is no jump-link TOC and no `{#id}` anchors. Rely on clear heading phrasing instead.
- **The quote block is the answer box** (left-border italic); the **callout block** (emoji + tinted) is the tip/note box.

---

## The heading hierarchy (non-negotiable)

This is the most important section in this file. Codify it.

### H1 — exactly one per page, from the Notion Title

The H1 is the page title. It lives in the Notion **Title** property and is rendered by the blog route (`app/blog/[slug]/page.tsx` emits the `<h1>`). **Never put an H1 in the body, and never use `heading_1` for a body heading** (it renders as an h2 and competes with the title).

```
[Notion Title: "Affirmations for Anxiety: 25 Calming Lines for a Racing Mind"]
[The route renders <h1>Affirmations for Anxiety: 25 Calming Lines for a Racing Mind</h1>]

[Body starts here — first content is often the featured/inline image, then the
quote-block answer, then heading_2 sections. Never an H1 or heading_1 in the body.]
```

Why: multiple H1s confuse Google's understanding of what the page is about, harm accessibility, and break the semantic outline.

### heading_2 — major sections, multiple allowed

Every major section of the post is a `heading_2`. Rules:

- Start after the opening answer quote block + the how-to-use note.
- Use need or question phrasing: "Affirmations for the 2am spiral", "How to use these when you're panicking", "Why anxiety affirmations actually help".
- Avoid label phrasing: "Background", "Section 1", "Introduction".
- No `{#id}` anchors — this renderer doesn't generate them.
- Top-level headings capture featured snippets — write them as if they were searchable themselves.

### heading_3 — sub-sections inside a heading_2

Use `heading_3` only when a `heading_2` has 2+ genuine sub-sections — for example, the themed affirmation groups inside a collection ("For your body", "For your worth", "For your inner voice"). A single `heading_3` inside a `heading_2` is an orphan — promote it or fold it into the parent prose.

Rules:
- Always under a `heading_2` (never a lone sub-heading at the top of the body)
- Phrase consistently with the parent `heading_2`'s style
- Don't reach for a fourth heading level — the renderer styles `heading_1/2/3` only

### Deeper levels — contraband

There is no supported heading level below `heading_3`. If you feel you need one, the post structure has failed — restructure, or that section is probably its own post.

---

## Heading rules summary

```
H1            — Notion Title only, exactly one (no H1 / heading_1 in body)
heading_2     — major sections, need/question phrasing, NO {#id}
heading_3     — sub-sections (e.g. themed affirmation groups), only when 2+ exist under one heading_2
(no deeper)   — heading_1 renders as h2; nothing below heading_3 is supported
```

The semantic outline of every post is H1 (Title) → heading_2 sections → optional heading_3 sub-sections, with no skips and no orphans.

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

On an affirmation post, the **affirmations themselves are almost always a list** — `bulleted_list_item` for a themed group, `numbered_list_item` when sequence or counting matters (a numbered daily set, a step-by-step practice).

### Use lists when:
- 3+ items share the same shape (parallel) — the affirmation lines of a themed group
- Order doesn't matter much (use bulleted) or matters a lot — a numbered daily set or practice steps (use numbered)
- The reader needs to *scan* or *count* the items (a set of affirmations, a how-to-use checklist)
- The content is genuinely parallel — not narrative dressed up as a list

### Use prose when:
- The items have varied shape or depth
- The connections between items matter (why this affirmation builds on the last)
- One idea flows into the next (the "why they work" explanation)
- The argument needs sentences

### List anti-patterns

- 2-item lists — write it as prose
- Lists where each item is a paragraph — reformat as `heading_3` groups or as prose
- Lists of mixed-grammar items — "I am calm. You should breathe slowly. Affirmations help." — three different shapes; affirmation lists should be consistently first-person, present-tense lines
- Nested lists deeper than 2 levels — restructure

### List item phrasing

- **Affirmation list items:** keep them well-formed — first person, present tense, positively framed ("I am safe in this moment," "I'm learning to feel calmer"). No second-person or future-tense lines mixed in.
- **Numbered practice steps:** start with a verb if procedural ("Say the line slowly on a long exhale")
- **Short items:** affirmations read best short — most under 12 words
- **Long items:** if a single affirmation needs 30+ words, it's a paragraph, not an affirmation — tighten it

---

## Grouped data — sub-headings and lists, not tables

A table would be handy for "need → affirmation" or "morning vs night" data — but **the renderer has no table support**. So:

### Default: turn the table into sub-headings + lists or prose

Most "tables" on an affirmation blog are really themed groups, and they read better as `heading_3` groups with a list under each. A "by mood" set, for instance, becomes:

```
heading_3:  For a stressful morning
  • I can handle today one moment at a time.
  • I've gotten through hard mornings before.

heading_3:  For winding down at night
  • I've done enough for today.
  • I let the day go and rest.
```

Or as prose for a quick comparison: "Spoken affirmations shift your mood faster; written ones sink in deeper — start spoken, move to a journal once the habit sticks."

### There is no raw-HTML escape hatch

Unlike a Markdown pipeline, this renderer only renders the supported Notion blocks — raw HTML won't render. If data feels genuinely 2-D, redesign it as themed `heading_3` groups with lists. Never ship a table.

---

## Callouts — the callout block and bold lead-ins

On this renderer a "callout" is one of two things:

### 1. A callout block (emoji + tinted box)

The Notion `callout` block renders as a tinted box with an emoji — this is the tip/note box. Use it for:

- **A how-to-use tip** — "💡 Say each line slowly, on a long exhale — the breath matters as much as the words."
- **A gentle, honest note** — "💙 Affirmations are a real support, but if anxiety is running your life, please talk to a doctor or therapist."

### 2. A bold lead-in sentence

For tips and definitions inside the flow, a bold lead-in is cleaner than a callout:

**Tip.** Pick a believable line first — "I'm learning to feel calmer" lands when "I am completely calm" bounces right off.

**Affirmation vs mantra.** An affirmation is a positive, present-tense statement about yourself; a mantra is a sound or phrase repeated to focus the mind. This site writes affirmations — see `affirmation-craft-skill.md`.

### The quote block is separate

The `quote` block (left-border italic) is the **answer box** — reserve it for the opening answer, a single highlighted affirmation, or a genuine cited source/scripture line (with attribution). Don't confuse it with the callout block.

### Frequency

- 1-3 callout/lead-in tips per post is healthy (beyond the opening quote-block answer)
- 5+ becomes noise
- Match the callout to the moment — don't dress every aside as a warning

---

## The core content blocks (answer, how-to-use, themed affirmation lists)

The load-bearing content of an AuraSyncs post is the **leading quote-block answer**, the **how-to-use note**, the **themed affirmation lists**, and (for clinical topics) the **honest support note**. These are the scannability events that carry the page.

### The leading quote-block answer

Lead with the answer. The very first text in the body (often right after the featured/inline image) is a `quote` block — this *is* the answer box, the featured-snippet target, and the orienting beat:

```
quote:  These 25 anxiety affirmations are short, calming lines for when your mind
        races — at your desk, in the car, or at 2am. Say one slowly on a long
        exhale and repeat it until the wave eases. They won't switch anxiety off,
        but they give you something steady to hold. You've got this.
```

40-60 words. Warm and grounded. Every factual or scriptural claim must hold up, and every affirmation must be well-formed — see `affirmation-craft-skill.md` and `accuracy-and-trust-skill.md`.

### The how-to-use note

Right under the answer, a short note (paragraph, list, or callout) on how to actually use the set — spoken vs written, when, how often:

```
callout (💡):  How to use these: pick two or three that resonate, say them out
               loud and slowly, and come back to them daily. You don't have to
               believe them fully yet — saying them is the practice.
```

### The themed affirmation lists

This is the heart of the post. Group affirmations into themed `heading_3` sub-sections under a `heading_2`, each with a `bulleted_list_item` (or `numbered_list_item`) list:

```
heading_2:  Affirmations for a racing mind

heading_3:  When you can't slow your thoughts
  • This feeling is uncomfortable, and it will pass.
  • I am safe in this moment.
  • I don't have to fix everything right now.

heading_3:  When you're lying awake at 2am
  • My body knows how to rest, even when my mind is loud.
  • I can let this thought go and come back to my breath.
```

Keep every line well-formed (first person, present tense, positive, believable) and consistent with the post's framing.

### The honest support note (clinical topics)

For anxiety, depression, grief, and other clinical needs, include a light, non-alarmist note that affirmations support but don't replace professional care — as a callout or a short paragraph near the end. This is part of the trust gate, not optional.

### Don't use the quote block for:
- Emphasis (use bold)
- Ordinary tips (use a callout block or a bold lead-in)
- General commentary (it's not a quote)

### Sourcing rule

Every affirmation must be well-formed and not harmful (no toxic positivity for someone in real distress), and every load-bearing factual claim — the psychology of affirmations, any study, any scripture quote/citation, any health or money claim — must be correct and verifiable against a real authority and cited. Research is WebSearch + WebFetch (there is no brief folder or SEO pipeline). Never fabricate a study or a statistic, never quote scripture inaccurately or without naming the translation, and never frame manifestation as a guaranteed outcome. See `accuracy-and-trust-skill.md` for the trust gate every post must pass before publishing.

---

## Code / formula blocks

An affirmation blog almost never needs program code or fenced blocks. The rare legitimate uses:

- An exact field/route/file name you want set off in inline code (`content/posts/<slug>.json`, `/blog/<slug>`, `migrate-notion.mjs`)

Otherwise, prefer prose, lists, callouts, and images. Use inline code (`backticks`) only for: route/field names, file paths, and exact technical tokens — not for ordinary emphasis, and never for affirmations (they're list items, not code).

---

## Images in flow

See `media-and-images-skill.md` for the full image discipline. Quick scannability points:

- Featured image set via the Notion **Featured Image** property → `/blog/<slug>.webp`, rendered by the route above the body
- Inline images as `image` blocks → `/blog/<slug>-content-N.webp`
- Long collections and daily sets want a calming inline image every 600-1,000 words to break the scroll
- Every image has real alt text
- No decorative-only filler — every image earns its presence (a calm, on-theme visual is part of the mood, but it still needs alt text and a reason)

---

## Bold and italic

Bold and italic are emphasis types with different jobs:

- **Bold** for the load-bearing phrase in a paragraph — what the skimmer needs to see; also the lead-in label for an inline callout
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

There is **no on-page TOC** and **no auto heading IDs** on this renderer. Don't write a manual jump-link list (the anchors won't resolve), and don't add a `toc` field. Your job is to make the heading phrasing so clear that the heading list *is* the visual outline. For pillar posts that want a contents overview, write a short prose "what this covers" paragraph near the top instead of a linked TOC.

---

## The visual rhythm budget

For every 250-300 words of body, there should be a scannability event. On this renderer the events are:

- A new `heading_2` or `heading_3` (a themed affirmation group)
- A bulleted or numbered list (the affirmation lines, a how-to-use checklist)
- An inline image (a calming, on-theme visual that earns its place)
- A `quote` block (the answer, a highlighted affirmation, or a cited source/scripture line)
- A `callout` block (a how-to-use tip or an honest note)

**Not** events here: tables (no renderer support) and any unsupported block type.

A 1,500-word post should have 6-9 scannability events distributed across the body — not clustered at the top, not absent for a 600-word stretch. On an affirmation post the easiest way to hit this is to keep the themed groups short and frequent: a wall of prose with no affirmation list is a bounce.

The audit catches: any 300-word run with zero scannability events.

---

## Pre-publish formatting checklist

- [ ] Exactly one H1 (from the Notion Title; no H1 or heading_1 in the body)
- [ ] Top-level sections are `heading_2`, sub-sections `heading_3` (no heading_1 in body; nothing below heading_3)
- [ ] No `{#id}` anchors written (renderer doesn't support them)
- [ ] Headings use need/question phrasing, not labels
- [ ] No orphan `heading_3` (a single sub-heading under one `heading_2`)
- [ ] No paragraph > 6 sentences (unless a pillar piece)
- [ ] No 3+ short paragraphs in a row
- [ ] First sentence of every paragraph is load-bearing
- [ ] Affirmation lists are genuinely parallel and well-formed (first person, present tense, positive)
- [ ] No tables (use themed `heading_3` groups + lists; the renderer has no table support)
- [ ] Only supported Notion blocks used (no invented block types, no raw HTML)
- [ ] Callouts are `callout` blocks or bold lead-ins; the `quote` block is reserved for the answer/source lines
- [ ] Opening quote block is the direct, grounded answer (40-60 words)
- [ ] How-to-use note sits right under the answer
- [ ] Themed affirmation lists present and grouped; for clinical topics an honest support note is included
- [ ] Bold used for load-bearing phrases, not keywords or affirmations
- [ ] Every affirmation well-formed and every fact/scripture verified per `accuracy-and-trust-skill.md`
- [ ] Scannability event every 200-300 words

---

**BlogOS** — structure is content.
