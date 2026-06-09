---
name: featured-snippet
description: Win position-zero. The 40-60 word direct-answer paragraph, definition snippets, list snippets, and People Also Ask capture for aurasyncs.com's affirmation collections, daily/occasion sets, faith sets, and practice guides. This skill teaches the writer to structure paragraphs and lists that Google's snippet bot can directly lift and display above the regular search results — using the plain-Markdown MDX elements this site's renderer supports.
---

# Featured Snippet — winning position zero

> Position zero is the box at the top of Google search results that lifts a paragraph or list from a single page and shows it as the direct answer. Pages that win the snippet typically see a ~20-30% lift in click-through, plus voice-assistant inclusion. For an affirmations site this is high-leverage SEO — the reader who sees "yes, affirmations can help by shifting self-talk, but they work best paired with action" in the box still clicks through for the full collection grouped by what they're feeling.

---

## What renders here (constraints before tactics)

Posts are **plain-Markdown MDX files** — one file per post at `content/posts/<slug>.mdx`, rendered by `components/MdxContent.tsx` (`next-mdx-remote/rsc` + `remark-gfm`). The component map styles: h1, h2, h3, p, ul, ol, li, blockquote, hr, code, pre, a, img. So:

- **The snippet "answer box" is a leading Markdown blockquote (`> …`).** Put the direct answer in a blockquote near the **top** of the body. The renderer styles a blockquote as a left-border italic box, so the answer reads as a deliberate callout *and* is the first prose Google sees. There's nothing to declare in frontmatter — what's on the page *is* the source of truth.
- **GFM tables DO render** (remark-gfm), but **prefer prose and lists** — they're what wins paragraph/list snippets anyway and read warmer for affirmations. Use a table only when the data is genuinely 2-D.
- **No auto heading IDs.** No rehype-slug, so don't rely on `#anchor` fragments for snippet structure.
- **No H1 in the body.** The page H1 comes from the frontmatter **`title`**. (And a `#` H1 maps to `<h2>` anyway, so a body H1 isn't even possible the way you'd expect.) The blockquote is the first prose after the title/hook — you may place an image above it.

So the two workable snippet shapes on this site are: **paragraph** (the blockquote) and **list** (a bulleted/numbered list under an `##`).

---

## The snippet shapes Google awards

| Snippet shape | What it looks like in SERP | Source on page | Trigger queries |
|---|---|---|---|
| **Paragraph** | 1-2 sentence answer in a card | The top blockquote (40-60 words) | "do affirmations really work", "what is a positive affirmation", "how do affirmations work" |
| **List** | Numbered or bulleted list of 6-8 items | An `##` + a Markdown list | "morning affirmations", "money affirmations", "affirmations for anxiety" |
| **Table** | A small 2-3 column table | A GFM pipe table (renders via remark-gfm) — but usually a tight list or prose reads better | Comparison queries; use sparingly |
| **Video** | A YouTube thumbnail | A YouTube video, not a blog post | Out of scope for blog SEO |

---

## The paragraph snippet (most common, and the default here)

This is the default shape and the natural target for **practice-guide** queries ("do affirmations work", "what is an affirmation"), **yes/no questions** ("can affirmations help anxiety"), and any "what is X" search. Google lifts a single paragraph and shows it.

### Where the paragraph lives — the top blockquote

Put the direct answer in a **Markdown blockquote (`> …`) at the very top of the body**, before the first `##`. The renderer styles the blockquote as a left-border italic "answer box," so the answer reads as a deliberate callout *and* is the first prose Google sees. This is the site's AnswerBox equivalent — and it's just a Markdown blockquote (there are no custom JSX components).

There is no H1 in the body (the H1 comes from the frontmatter `title`), so the blockquote really is the first prose after the title/hook (you may place a featured or inline image above it).

### Anatomy of a winning paragraph snippet

- **40-60 words.** Under 40 looks incomplete in the card; over 60 gets truncated.
- **First sentence is the answer.** Pattern: `<Direct answer / one-line method / definition>.`
- **Sentences 2-3 add the non-obvious.** The mechanism, a believable qualification, or the next-most-relevant tip.
- **No "in this article" preamble.** Google strips the paragraph from context — it must stand alone.
- **Plain prose.** No links, no bold, no nested lists inside the answer. (It's a blockquote, which is fine — still a single liftable paragraph.)
- **Warm but honest.** AuraSyncs' empowering voice, but the claim has to be true — no toxic positivity, no guaranteed outcome, and any psychology/science claim verified per `accuracy-and-trust-skill.md`.

### Example (yes/no + mechanism answer)

The frontmatter **`title`** is `Do Affirmations Really Work? A Beginner's Guide`. Body opens with an image, then a blockquote:

```
> Yes — affirmations can help, but not by magic. Repeating calm, believable statements about yourself gradually shifts your self-talk and lowers the grip of harsh inner criticism. They work best when the words feel within reach and you pair them with real action, not as a replacement for support when you're struggling.
```

That blockquote is the snippet target. It's ~55 words, leads with the honest answer, names the mechanism (shifting self-talk), and adds the believability + "pair with action" qualifier. Any claim about how affirmations work must be verifiable per `accuracy-and-trust-skill.md` — no fabricated "studies show 90%…" stats.

### Example (definition answer)

Frontmatter **`title`** `What Is a Positive Affirmation? A Simple Guide`. Body opens:

```
> A positive affirmation is a short, present-tense statement you say to yourself on purpose, like "I am calm" or "I can handle this." You repeat it to gently steer your self-talk toward something kinder and steadier. The most effective affirmations are believable and specific, not wishful — close enough to feel true today.
```

Leads with the definition, gives examples, adds the believability rule. Any factual claim about the practice must be correct and verifiable per `accuracy-and-trust-skill.md`.

### Common paragraph-snippet patterns

**"Do affirmations work" (honest yes + mechanism):**
> `Yes — affirmations can help by <the mechanism: shifting self-talk / building a habit of self-encouragement>. <The believability qualifier>. <The "support, not replacement / pair with action" caveat>.`

**"What is X" (definition):**
> `<X> is <one-sentence definition>. <How you do it, with a short example>. <What makes it effective — believable, present-tense, specific.>`

**"How many times should I say an affirmation" (method answer):**
> `There's no magic number — <the practical guidance: a few minutes, morning and night, consistently>. <Why consistency matters more than count>. <The "make it believable" tip so repetition lands>.`

---

## The list snippet

Google lifts a numbered or bulleted list. This is the core shape for **collections and sets** — "morning affirmations", "money affirmations", "affirmations for anxiety" — where the searcher wants a usable list of phrases. Markdown lists (`-` bulleted, `1.` numbered) render cleanly, so this shape is fully available and is the workhorse for collections and daily sets.

### Anatomy of a winning list snippet

- **6-8 items.** Fewer looks thin; more gets truncated.
- **List title is an `##` phrased as the query.**
- **Each item is short** — under ~12 words. A complete affirmation, on its own line.
- **Parallel grammar** — present-tense, first person, all framed the same way ("I am…", "I can…").
- **No deep formatting inside items** — Google's snippet view drops nested lists, bold, and links. Keep each item short plain text.
- **Well-formed and believable** — every affirmation present tense, first person, positively framed, not toxic positivity (see `affirmation-craft-skill.md`).

### Example (collection list snippet target)

```
## Calming affirmations for anxiety

- I am safe in this moment.
- I can handle what this day brings.
- This feeling is uncomfortable, and it will pass.
- I breathe in calm and breathe out tension.
- I have gotten through hard moments before.
- I am allowed to take things one step at a time.
- My worth is not measured by my worries.
- I am doing the best I can, and that is enough.
```

Each item is short, parallel, present-tense, and complete in itself — and none of them denies the reader's real feelings (note "and it will pass," not "I feel no fear"). A liftable, well-formed set. Verify the framing is supportive per `accuracy-and-trust-skill.md`.

### List snippet pitfalls

- **Items too long.** If each item is a paragraph of commentary it won't get pulled. Keep the affirmation tight; save commentary for prose between sub-sets.
- **Inconsistent grammar.** Mixed "I am…" and "You should…" makes Google skip — and breaks the first-person rule.
- **Wrong heading.** "Section 2: A Few More Phrases" doesn't match the query; "Calming affirmations for anxiety" does.
- **Toxic positivity.** "I am never anxious" is both unbelievable and harmful framing — disqualified.

### Numbered vs bulleted

- **Numbered** for ordered sets (a 7-day affirmation challenge; a morning routine in steps; "365" framed as a sequence).
- **Bulleted** for parallel, unordered affirmations (a themed sub-set of calming phrases; a list of money affirmations).

Google rewards numbered lists slightly more often for "how to" and step queries; most affirmation lists are unordered, so bulleted is the common case.

---

## A note on tables (use them sparingly)

Google sometimes lifts small tables, and **GFM pipe tables do render here** (remark-gfm). But for an affirmations blog, a comparison usually reads warmer and wins more snippets as **prose or a tight bulleted list**. For "affirmation vs mantra" or "morning vs evening practice", reach for a list first; reserve a table for data that is genuinely 2-D.

Example — an affirmation-vs-mantra comparison reads cleanly as a list:

```
## Affirmation vs mantra, at a glance

- **An affirmation** is a meaningful statement about yourself ("I am capable") you say to shift self-talk.
- **A mantra** is a word or sound (like "om") repeated mainly to focus and steady the mind.
- **Affirmations** lean on the meaning of the words; **mantras** lean on the rhythm of repetition.
- Both are calming practices — pick whichever helps you settle.
```

That bulleted list is liftable, on-brand, and reads warmer than a grid. If you do need a table, a GFM pipe table renders — just keep it for genuinely tabular reference, not as the default for every comparison.

---

## People Also Ask (PAA) capture

Below or beside the snippet box, Google shows "People Also Ask" — expandable related questions, each pulling a paragraph from some page. Capturing PAA boxes wins extra SERP real estate.

### How to capture PAA on this site

You capture PAA via the **`faq:` frontmatter list** — the reader renders it as the on-page FAQ **and the route emits `FAQPage` JSON-LD** from the same pairs (so the schema answers match the visible answers by construction). Don't put FAQ in the body.

1. **Research the PAA stack.** Search the target query, read the PAA box, write down the 5-8 questions Google shows, and click each to see the source page it pulled. Affirmation PAA is rich — e.g. "Do affirmations really work?", "How many times should I say an affirmation?", "What are the most powerful affirmations?", "Can affirmations help with anxiety?".
2. **Add 2-4 pairs to `faq:`** in the frontmatter. Phrase each `q:` exactly as Google shows it.
3. **Answer each in 40-60 words** of plain prose — a self-contained, liftable answer, same discipline as the opening quote.

### Example

Target query "affirmations for anxiety"; the PAA box shows several related questions. The frontmatter carries:

```yaml
faq:
  - q: "Do affirmations really work for anxiety?"
    a: "Affirmations can help by softening anxious self-talk and reminding you that hard feelings pass. They work best when the words feel believable and you say them consistently. They're a supportive tool, not a cure — if anxiety is overwhelming or ongoing, it's worth talking to a doctor or therapist too."
  - q: "How many times should I say an affirmation?"
    a: "There's no magic number. A few minutes in the morning and again at night, said with attention, beats rushing through a long list once. Consistency matters more than count. Pick two or three affirmations that feel true today and repeat those until they feel natural."
  - q: "What are the most calming affirmations to say?"
    a: "Short, present-tense phrases that acknowledge the feeling without denying it work best, like 'I am safe in this moment' or 'this will pass.' Avoid forcing 'I feel no fear' — affirmations that argue with your real feelings tend to backfire. Choose words that feel within reach."
```

Each answer is 40-60 words, plain prose, self-contained — so any one can be lifted into a PAA box and the emitted `FAQPage` answer matches it word-for-word. Note the clinical topic carries the light "support, not a cure / see a professional" note. Make sure every claim is verifiable and every affirmation well-formed per `accuracy-and-trust-skill.md`.

---

## The Featured Snippet decision tree

Before writing, decide which snippet you're targeting:

1. **Is the target query informational?** (Yes for almost all affirmation searches.)
2. **What shape is the existing snippet on Google?**
   - Search the target query.
   - If a snippet box already shows → that's the shape Google has decided this query wants.
   - If no snippet → opportunity, but harder to predict which shape will win.
3. **Build the matching structure:**
   - Paragraph showing → top blockquote, 40-60 words, plain prose.
   - List showing → `##` (phrased as the query) + 6-8 short parallel affirmations in a Markdown list.
   - Table showing → usually best as a tight list/paragraph; a GFM table renders if the data is genuinely 2-D.
4. **Steal the format, beat the content.** If "do affirmations work" gets a paragraph snippet, your blockquote beats the incumbent because it's honest (names the mechanism, doesn't over-promise), tighter, and warm enough that the click feels welcoming.

---

## Pre-publish snippet checklist

- [ ] Snippet shape decided (paragraph / list)
- [ ] Paragraph target sits in the **top blockquote** of the body, above the first `##`
- [ ] Paragraph: 40-60 words, plain prose, no inline links/bold, no toxic-positivity or guaranteed-outcome framing
- [ ] List: 6-8 short parallel affirmations (present tense, first person), numbered only if genuinely ordered
- [ ] `##` above any list phrased close to the target query
- [ ] Comparisons default to prose/lists; a GFM table only where the data is genuinely 2-D (used sparingly)
- [ ] Voice stays warm and empowering while the claim stays honest
- [ ] PAA questions captured in the **`faq:` frontmatter** list (2-4 `q:`/`a:` pairs, 40-60 word answers) — emits `FAQPage` + renders on-page; not in the body
- [ ] Clinical topics (anxiety, depression, grief, health) carry the light "support, not a replacement" note
- [ ] Every psychology/scripture/health claim in a snippet target is correct per `accuracy-and-trust-skill.md`

---

## What kills snippet eligibility

- The direct answer is buried under an "in this article we'll explore…" preamble instead of leading the blockquote
- The `##` above a list doesn't match the query
- The opening paragraph runs past ~80 words
- The answer paragraph contains inline links or bold
- A table where a tight list would win the snippet — for affirmations, a list usually beats a grid
- The list items are full paragraphs of commentary, or break the first-person/present-tense rule
- The page has zero internal links (Google rewards pages embedded in a topical hub — link ≥ 3 cluster siblings and the pillar)
- The page isn't on page 1 yet — snippets only come from already-ranking pages

**Snippets are a multiplier, not a starter.** A page that doesn't already rank on page 1 won't win the snippet. Write the page well first, then optimize for the box.

---

**BlogOS** — own the box.
