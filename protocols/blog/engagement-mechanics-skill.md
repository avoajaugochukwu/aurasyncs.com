---
name: engagement-mechanics
description: Scroll-depth psychology and scannability mechanics for blog posts. This is how an AuraSyncs affirmation post keeps a skimming reader scrolling and a real reader engaged — through scannability cadence, the But/Therefore rule, the Dopamine Ladder adapted for text, and the four web-specific retention killers. Calibrated for the Notion renderer: the scannability events are the leading quote-block answer, the affirmation lists themselves, themed sub-headings, callout tips, and inline images — NOT tables, which the renderer does not support.
---

# Engagement Mechanics — keeping the scroll alive

> A blog reader is a different animal from a video viewer. They are skimming first, reading second. They scroll faster than they read. They make stay-or-leave decisions in 8-15 seconds on every screen. Your post has to win the skim test before the read test ever happens.

This is the psychology of retention, mapped onto a page built from Notion blocks and rendered through `components/NotionRenderer.tsx` with a fixed set of supported block types. Same psychology, different surface — and a surface with real constraints (only the supported blocks: paragraph, headings, lists, to_do, toggle, code, image, divider, quote, callout — no tables).

---

## The Dopamine Ladder (web version)

Every reader's journey releases increasing dopamine as they progress. The six levels, mapped to blog reality:

### Level 1: STIMULATION (first 0.5 seconds)
- The page loads
- They see the headline, the featured image, the visual rhythm
- Subconscious processing in milliseconds

**For blogs:** the H1 (rendered from the Notion Title in `app/blog/[slug]/page.tsx`) + featured image + the visible first lines are the stun gun. If those don't earn 2 more seconds, the reader bounces. On an "Affirmations for Anxiety" post, the calm featured image carries half the work before a single word is read.

### Level 2: CAPTIVATION (first 8-15 seconds)
- The reader reads the opening quote block
- They evaluate: "is this what I came for, and will it actually help me right now?"
- A curiosity gap forms or doesn't

**Trigger:** the opening quote block answer satisfies them in 40-60 words AND opens a loop they need scrolled to close. On this site the quote block *is* the answer box — it's the first thing in the body and the styled, left-border italic break that orients the reader. "These 25 anxiety affirmations are short, calming lines you can say slowly when your mind races — here's the one habit that makes them actually stick."

### Level 3: ANTICIPATION (first scroll, ~30 seconds)
- They scan the heading_2 skeleton
- They form a hypothesis about whether the rest of the post is worth their time
- HIGHEST engagement happens when the headings preview specific value they didn't expect

**For blogs:** every heading_2 must promise something specific. "Background" is not a promise. "Affirmations for the 2am spiral, when sleep won't come" is.

### Level 4: VALIDATION (every section they reach)
- They scan-read or fully read a section
- They get either: a payoff (a set of affirmations that lands) or a setup for the next loop
- Unclosed loops compound — readers who stop mid-post don't return

**Critical:** every section should close the loop opened by the previous one AND open the next. The "morning affirmations" group delivers; the last line teases that the real shift happens when you pair them with a single breath.

### Level 5: AFFECTION (second visit)
- Reader returns to this site for another affirmation set or practice guide
- They start to recognize the voice
- Why trust matters — affection requires *someone* to be affectionate toward

**For blogs:** build trust through the warm, encouraging AuraSyncs voice, consistency, and reliable delivery on the headline promise — the affirmations are well-formed and believable, the practice advice actually helps, and nobody in real distress is met with empty toxic positivity.

### Level 6: REVELATION (bookmark / save / share)
- Reader trusts the site as a consistent source of value
- They bookmark it, share a post, screenshot a few affirmations to their lock screen, or — the real conversion here — click through to a sibling affirmation set in the same cluster
- This is what compounds into a real readership

**Action:** every post earns one CTA, usually the inline link to a related affirmation post (`/blog/<slug>`). See `conclusion-and-cta-skill.md`.

---

## The four web-specific retention killers

### Killer 1: THE WALL OF TEXT

**What it looks like:**
> 1,200 words of unbroken prose about why affirmations work — no sub-headings, no affirmation list, no callout, no inline image, no quote block.

**Why it kills:** the skimming reader scrolls past it because they cannot tell what's in it. On an affirmation post the readers came for the *affirmations* — a wall of prose with no affirmation list is a bounce. Someone anxious at 2am looking for a line to repeat will leave the instant they can't find one.

**The fix:** every 200-300 words gets a *scannability event* — a themed sub-head, a bulleted or numbered affirmation list, a callout tip, an inline image, or a quote block. (Note: a table is **not** a usable event here — the renderer has no table support. If you need to group affirmations, use sub-headings + lists, not a grid.)

A 1,500-word post should have 5-7 scannability events minimum. Otherwise it reads as undifferentiated mass.

### Killer 2: THE DELAY DISEASE

**What it looks like:**
> "In this article, we will explore the wonderful practice of positive affirmations, examining their history, the psychology behind them, and how you might begin. Before we begin, it's important to understand…"

**Why it kills:** the first lines are supposed to *answer the query*, not announce what the article will cover. The reader has 8 seconds; you spent them on a menu.

**The fix:** the opening quote block IS the direct answer — "These 30 money affirmations reframe how you think about earning, saving, and abundance. Say a few out loud each morning, or pick one to carry through the day. They're a mindset practice, not a magic spell — here's how to make them land." 40-60 words. Then the first heading_2 with a section worth scrolling for.

### Killer 3: THE CONTEXT DUMP

**What it looks like:**
> heading_2: "A Brief History of Positive Thinking"
> 800 words on Norman Vincent Peale and the New Thought movement — before the post offers a single affirmation to actually say.

**Why it kills:** brains cannot store abstract context without anchoring it to a stake. Front-loaded history = mass exit. The reader came to *feel calmer*, not to read a lecture.

**The fix:** the Golden Ratio:
- 30 seconds of context maximum at the top
- Followed by the first real affirmations (a short, usable set)
- The "why it works" psychology shows up later, when the reader has motivation to absorb it

For a blog: never let "Background" or "The Science of Affirmations" be the first heading_2. Lead with the affirmations the reader can use right now; backfill the sourced "why they work" section only when the reader is already invested.

### Killer 4: THE PAYOFF VOID

**What it looks like:** the reader hits the affirmation set they came for, finds three lines that resonate, and the post stops being interesting from that point on.

**Why it kills:** there's a 30-second window after each payoff where the reader thinks "got what I came for, leaving now."

**The fix:** within the same paragraph that delivers a payoff, open the next loop:

> "Those are the affirmations for when anxiety spikes. But the ones that change anything long-term are the calmer, ladder-style lines you repeat on the *good* days too — so the practice is already in place when the hard ones hit."
> [next heading_2 shows the daily-practice set]

The loop closes, then opens immediately. The reader scrolls to the next section to close the new loop.

---

## The But/Therefore rule (still works)

If your transitions between paragraphs and sections read as "and then" — you have boring content. Every transition should be:

- **But** (contrast)
- **However** (contrast)
- **Therefore** (consequence)
- **So** (consequence)
- **Which is why** (consequence)
- A question (open new loop)

If "and then" works, the connection isn't earned. Rewrite with conflict or consequence.

### The test

Read just the first sentence of each new paragraph. Does it follow from the last sentence of the previous paragraph by *contrast* or *consequence*? If half are "And then…" or "Also…", you have a list dressed as an argument.

---

## Sentence rhythm (Gary Provost principle)

Three short sentences in a row is an AI fingerprint. So is a paragraph of identical-length sentences. Vary the rhythm.

**Bad:**
> Say the affirmation. Believe it. Feel calmer.

**Good:**
> Start with one line — just one — and say it slowly enough that you actually hear yourself. Let the words land. Then say it again, a little softer, because the second time is when your body starts to believe the first, and that small shift from saying to *feeling* is the whole point of the practice.

Mix punchy (5-10 words) with flowing (20-30 words). The post should look jagged on the page, not smooth.

---

## Scannability cadence (the web's rehook)

The rule is one **scannability event every 200-300 words**. On this site the events are the ones that *actually render* through `NotionRenderer.tsx`:

- **Sub-head** (heading_2 or heading_3) — a themed affirmation group
- **Bulleted or numbered list** — the affirmation lines themselves, the strongest event on an affirmation post
- **A callout** (emoji + tinted box) — a how-to-use tip or gentle note
- **An inline image** — a calming or thematic image, `/blog/<slug>-content-N.webp`
- **A quote block** — the opening answer box, or a single highlighted affirmation / cited line

What does **not** count as an event on this renderer:

- **Tables** — the renderer has no table block support. To group affirmations, use themed sub-headings with lists underneath, never a grid.
- **Custom callout components** — they don't exist. A tip is a Notion **callout** block; the answer is a **quote** block.

For affirmation sets, the leading quote-block answer and the themed affirmation lists are the strongest events — they break the prose visually and reward the skimmer exactly when they're scanning for "just give me the affirmations." A set grouped into five themed sub-sections is five visual beats. For practice guides, each method step or example affirmation is its own beat.

Without a scannability event, the prose becomes wallpaper. The skimming reader scrolls past wallpaper.

### Cadence rules by length

For each band, count only events that render here (quote-block answer, affirmation lists, themed sub-heads, inline images, callout tips):

| Body length | Minimum scannability events | Distribution |
|---|---|---|
| 300-600 | 3-4 | answer + first affirmation list + one themed group minimum |
| 700-1,200 | 4-6 | one every 200-250 words |
| 1,200-2,000 | 6-9 | one every 200-300 words |
| 2,000-2,500 | 9-12 | one every 200-250 words |

(That table above is in this skill *doc*, not in a published post — published post bodies must not use tables, which the Notion renderer doesn't support.)

---

## The skim-then-read pattern

Realistic reader behavior on a blog post:

1. **Skim H1 + featured image** (1 second)
2. **Read the opening quote block** (8 seconds)
3. **Skim the heading_2 list** (5 seconds)
4. **Decide:** scroll to a specific group (often the one that names their exact need), read top-down, or leave
5. **Scan the chosen section** by reading the first sentence + the affirmation list under it
6. **Read full prose** only after the scan rewards them

Designing for this pattern:

- **First sentence of every paragraph** is the most load-bearing. The skim reader reads only first sentences.
- **First sentence of every section** is the second-most. Often the snippet target.
- **Bold the load-bearing phrase** in each paragraph — gives the skimmer their anchor.
- **Lists for the affirmations themselves** — the skimmer scans the lines without reading prose.
- **The themed affirmation lists** are skim magnets — readers scrolling for "just show me the affirmations" stop on them.
- **Heading phrasing** = the search query they typed, restated as a need or question.

Posts written for the read-only reader (long prose, no bolds, no affirmation lists) lose the skim reader by paragraph 3.

---

## Stakes escalation across the post

A post should feel like each section is more rewarding than the last, until the wrap-up. The post earns its length by escalating, not flattening.

For a themed affirmation collection (e.g., "affirmations for confidence"):
- Section 1: the simplest, most universal lines (the easy "I am" starters anyone can say)
- Section 2: the most-searched sub-need (affirmations for speaking up / being seen)
- Section 3: the surprising angle (believable "ladder" affirmations for when "I am confident" feels like a lie)
- Section 4: why they work (the sourced self-affirmation note)
- Section 5: how to build the habit (morning, mirror, written)
- Conclusion: what to do next — and the inline link to a sibling set

Each section takes the reader one step deeper into a practice they can actually keep. The post is "worth scrolling for" because the payoff keeps growing.

For a daily / occasion set, escalation is grouping: open with the easiest, warmest lines, build toward the more specific or moving ones, so the reader feels the set deepening as they scroll.

---

## Pace variety inside sections

Within a section, mix:

- A short setup paragraph (1-3 sentences)
- A longer "here's how to use these and why" paragraph (3-5 sentences)
- A scannability event (affirmation list, inline image, callout tip)
- A short consequence paragraph ("now you have a line for the hard mornings")
- A transition that opens the next loop

This rhythm — short → long → visual → short → transition — keeps both the skimmer and the reader engaged. A section that is just five 4-sentence paragraphs is monotone, even if each paragraph is well-written.

---

## The post's emotional arc

Even a simple affirmation collection has an emotional arc. Label the intended emotion of each section as you outline:

- Recognition (name the reader's feeling — "your mind won't slow down")
- Relief (deliver the first usable affirmations — "say this one slowly")
- Empowerment (the lines that make them feel capable, not just calmed)
- Honesty (the gentle note — affirmations support, they don't replace real care)
- Resolution (the practice that makes it stick)
- Forward momentum (what to do next — a sibling set, a morning routine)

A post that hits the same emotional note in every section is flat. A post that swings recognition → relief → empowerment → resolution is alive — and leaves the reader feeling steadier, which is the whole AuraSyncs promise.

For pillar guides and large sets, the arc matters even more. See `narrative-arc-skill.md`.

---

## Read-aloud test

Before publishing, read the post out loud — or have a TTS engine read it. Listen for:

- **Robotic patches:** "It is important to note that…", "It can be observed that…" → rewrite
- **Awkward word sequences** — if it doesn't roll, it doesn't write
- **Identical sentence lengths in a row** — sentence-length variation is rhythm
- **Affirmations that don't sound like something a real person would say to themselves** → rewrite to plain, first-person, present-tense lines
- **Where you naturally pause** — those are your paragraph breaks
- **Anything that would ring false to someone in real pain** — this is a warm, grounded voice; if a line tips into toxic positivity or denial, soften it to something honest

It applies just as much to prose written for the eye as to anything spoken — and an affirmation that doesn't sound right out loud won't get repeated out loud.

---

## What kills engagement that anti-AI-slop doesn't catch

- **No scannability events** — the wall of text problem
- **No affirmation list** — readers came for the affirmations; a prose-only "affirmations" post is a bounce
- **Relying on a table for the visual break** — the renderer has no table support; the "event" is invisible
- **No inline images** — a long set with no visual breaks is a hard scroll
- **No emotional arc** — the flat report problem
- **No stakes escalation** — every section feels like the same depth
- **All paragraphs same length** — the AI-rhythm problem
- **First sentence of paragraph is generic** — the skimmer loses their anchor
- **Headings phrased as labels not as needs** — "Background" vs "Affirmations for the 2am spiral"
- **A cold or clinical tone** — anxious or hurting readers need warmth, not a textbook
- **No internal links in the body** — the post feels like a dead end (link a sibling affirmation set)

---

## Pre-publish engagement checklist

- [ ] A scannability event every 200-300 words (events that render: quote block, affirmation lists, callout tips, inline images, sub-heads — NOT tables)
- [ ] Opening quote block delivers the answer in 40-60 words
- [ ] First sentence of every paragraph is load-bearing
- [ ] Bold the load-bearing phrase per paragraph
- [ ] Heading phrasing is a need or question, never a label
- [ ] Sentence-length variation visible (jagged edge if printed)
- [ ] Stakes / payoff escalate across sections
- [ ] Each section has a clear emotional beat
- [ ] But/Therefore over And/Then
- [ ] Each loop closes and opens another
- [ ] At least one themed affirmation list (and for longer sets, inline images) present
- [ ] Voice is warm and encouraging — never toxic positivity or denial
- [ ] Read aloud sounds natural — and the affirmations sound sayable

---

**BlogOS** — engagement is structure plus rhythm.
