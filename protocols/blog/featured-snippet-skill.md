---
name: featured-snippet
description: Win position-zero. The 40-60 word direct-answer paragraph, definition snippets, list snippets, and People Also Ask capture for aurasyncs.com's affirmation collections, daily/occasion sets, faith sets, and practice guides. This skill teaches the writer to structure paragraphs and lists that Google's snippet bot can directly lift and display above the regular search results — using only the Notion blocks this site's renderer supports.
---

# Featured Snippet — winning position zero

> Position zero is the box at the top of Google search results that lifts a paragraph or list from a single page and shows it as the direct answer. Pages that win the snippet typically see a ~20-30% lift in click-through, plus voice-assistant inclusion. For an affirmations site this is high-leverage SEO — the reader who sees "yes, affirmations can help by shifting self-talk, but they work best paired with action" in the box still clicks through for the full collection grouped by what they're feeling.

---

## What renders here (constraints before tactics)

Posts are **Notion blocks** — `content/posts/<slug>.json` holds a `blocks` array, rendered by `components/NotionRenderer.tsx`. That shapes everything below. The renderer supports **only** these blocks: paragraph, heading_1, heading_2, heading_3, bulleted_list_item, numbered_list_item, to_do, toggle, code, image, divider, quote, callout. So:

- **The snippet "answer box" is the Notion `quote` block.** Put the direct answer in a quote block near the **top** of the body. The renderer styles a quote as a left-border italic block, so the answer reads as a deliberate callout *and* is the first prose Google sees. There is nothing to declare in any property — what's on the page *is* the source of truth.
- **No tables.** The renderer has no table block — a table in the body simply doesn't render. **Prefer prose and lists** — they're what the renderer styles cleanly and what wins paragraph/list snippets anyway.
- **No auto heading IDs.** Don't rely on `#anchor` fragments for snippet structure.
- **No H1 in the body.** The page H1 comes from the Notion **Title**. (And `heading_1` styles as `<h2>` anyway, so a body H1 isn't even possible the way you'd expect.) The quote block is the first prose after the title/hook — you may place an image above it.

So the two workable snippet shapes on this site are: **paragraph** (the quote block) and **list** (a bulleted/numbered list under a heading_2).

---

## The snippet shapes Google awards

| Snippet shape | What it looks like in SERP | Source on page | Trigger queries |
|---|---|---|---|
| **Paragraph** | 1-2 sentence answer in a card | The top quote block (40-60 words) | "do affirmations really work", "what is a positive affirmation", "how do affirmations work" |
| **List** | Numbered or bulleted list of 6-8 items | A heading_2 + a Notion list | "morning affirmations", "money affirmations", "affirmations for anxiety" |
| **Table** | A small 2-3 column table | (not available — the renderer has no table block) | Reframe as a tight list or prose instead |
| **Video** | A YouTube thumbnail | A YouTube video, not a blog post | Out of scope for blog SEO |

---

## The paragraph snippet (most common, and the default here)

This is the default shape and the natural target for **practice-guide** queries ("do affirmations work", "what is an affirmation"), **yes/no questions** ("can affirmations help anxiety"), and any "what is X" search. Google lifts a single paragraph and shows it.

### Where the paragraph lives — the top quote block

Put the direct answer in a **`quote` block at the very top of the body**, before the first heading_2. The renderer styles the quote as a left-border italic "answer box," so the answer reads as a deliberate callout *and* is the first prose Google sees. This is the site's AnswerBox equivalent — and it's just a Notion block.

There is no H1 in the body (the H1 comes from the Notion Title), so the quote really is the first prose after the title/hook (you may place a featured or inline image above it).

### Anatomy of a winning paragraph snippet

- **40-60 words.** Under 40 looks incomplete in the card; over 60 gets truncated.
- **First sentence is the answer.** Pattern: `<Direct answer / one-line method / definition>.`
- **Sentences 2-3 add the non-obvious.** The mechanism, a believable qualification, or the next-most-relevant tip.
- **No "in this article" preamble.** Google strips the paragraph from context — it must stand alone.
- **Plain prose.** No links, no bold, no nested lists inside the answer. (It's a quote block, which is fine — still a single liftable paragraph.)
- **Warm but honest.** AuraSyncs' empowering voice, but the claim has to be true — no toxic positivity, no guaranteed outcome, and any psychology/science claim verified per `accuracy-and-trust-skill.md`.

### Example (yes/no + mechanism answer)

The Notion **Title** is `Do Affirmations Really Work? A Beginner's Guide`. Body opens with an image, then a quote block:

```
> Yes — affirmations can help, but not by magic. Repeating calm, believable statements about yourself gradually shifts your self-talk and lowers the grip of harsh inner criticism. They work best when the words feel within reach and you pair them with real action, not as a replacement for support when you're struggling.
```

That quote is the snippet target. It's ~55 words, leads with the honest answer, names the mechanism (shifting self-talk), and adds the believability + "pair with action" qualifier. Any claim about how affirmations work must be verifiable per `accuracy-and-trust-skill.md` — no fabricated "studies show 90%…" stats.

### Example (definition answer)

Notion **Title** `What Is a Positive Affirmation? A Simple Guide`. Body opens:

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

Google lifts a numbered or bulleted list. This is the core shape for **collections and sets** — "morning affirmations", "money affirmations", "affirmations for anxiety" — where the searcher wants a usable list of phrases. Notion list blocks (`bulleted_list_item`, `numbered_list_item`) render cleanly, so this shape is fully available and is the workhorse for collections and daily sets.

### Anatomy of a winning list snippet

- **6-8 items.** Fewer looks thin; more gets truncated.
- **List title is a heading_2 phrased as the query.**
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

## A note on tables (don't use them here)

Google sometimes lifts small tables, but **this site's Notion renderer has no table block** — a table simply doesn't render in the body. Don't fight the renderer. For any comparison or reference you'd reach for a table for ("affirmation vs mantra", "morning vs evening practice"), **reframe it as prose or a tight bulleted list** — which is what wins snippets on this site anyway and reads warmer.

Example — instead of an affirmation-vs-mantra table, write:

```
## Affirmation vs mantra, at a glance

- **An affirmation** is a meaningful statement about yourself ("I am capable") you say to shift self-talk.
- **A mantra** is a word or sound (like "om") repeated mainly to focus and steady the mind.
- **Affirmations** lean on the meaning of the words; **mantras** lean on the rhythm of repetition.
- Both are calming practices — pick whichever helps you settle.
```

That bulleted list is liftable, on-brand, and renders cleanly — a table would not. (Tables are fine *inside these skill docs*; they are forbidden in shipped **post bodies** because the renderer drops them.)

---

## People Also Ask (PAA) capture

Below or beside the snippet box, Google shows "People Also Ask" — expandable related questions, each pulling a paragraph from some page. Capturing PAA boxes wins extra SERP real estate.

### How to capture PAA on this site

Because there's **no FAQPage schema shipping today** (see the OPTIONAL section of `seo-and-schema-skill.md`), you capture PAA with a plain FAQ section built from Notion blocks in the body — not from any property.

1. **Research the PAA stack.** Search the target query, read the PAA box, write down the 5-8 questions Google shows, and click each to see the source page it pulled. Affirmation PAA is rich — e.g. "Do affirmations really work?", "How many times should I say an affirmation?", "What are the most powerful affirmations?", "Can affirmations help with anxiety?".
2. **Add a `heading_2` titled "Frequently asked questions"** near the end of the body.
3. **Phrase each question exactly as Google shows it, as a `heading_3`.**
4. **Answer each in 40-60 words** of plain prose (a paragraph block) directly under the heading_3 — a self-contained, liftable answer, same discipline as the top quote block.

### Example

Target query "affirmations for anxiety"; the PAA box shows several related questions. The body carries:

```
## Frequently asked questions

### Do affirmations really work for anxiety?
Affirmations can help by softening anxious self-talk and reminding you that hard feelings pass. They work best when the words feel believable and you say them consistently. They're a supportive tool, not a cure — if anxiety is overwhelming or ongoing, it's worth talking to a doctor or therapist too.

### How many times should I say an affirmation?
There's no magic number. A few minutes in the morning and again at night, said with attention, beats rushing through a long list once. Consistency matters more than count. Pick two or three affirmations that feel true today and repeat those until they feel natural.

### What are the most calming affirmations to say?
Short, present-tense phrases that acknowledge the feeling without denying it work best, like "I am safe in this moment" or "this will pass." Avoid forcing "I feel no fear" — affirmations that argue with your real feelings tend to backfire. Choose words that feel within reach.
```

Each answer is 40-60 words, plain prose, self-contained — so any one can be lifted into a PAA box. Note the clinical topic carries the light "support, not a cure / see a professional" note. Make sure every claim is verifiable and every affirmation well-formed per `accuracy-and-trust-skill.md`.

> Note: FAQPage rich results require FAQPage JSON-LD, which isn't emitted yet (see the OPTIONAL section of `seo-and-schema-skill.md`). The Notion FAQ section still earns PAA placement on its own; if/when FAQPage is wired up, the answer text must match these visible answers word-for-word.

---

## The Featured Snippet decision tree

Before writing, decide which snippet you're targeting:

1. **Is the target query informational?** (Yes for almost all affirmation searches.)
2. **What shape is the existing snippet on Google?**
   - Search the target query.
   - If a snippet box already shows → that's the shape Google has decided this query wants.
   - If no snippet → opportunity, but harder to predict which shape will win.
3. **Build the matching structure:**
   - Paragraph showing → top quote block, 40-60 words, plain prose.
   - List showing → heading_2 (phrased as the query) + 6-8 short parallel affirmations in a Notion list.
   - Table showing → reframe as a tight list/paragraph (no table block renders here).
4. **Steal the format, beat the content.** If "do affirmations work" gets a paragraph snippet, your quote block beats the incumbent because it's honest (names the mechanism, doesn't over-promise), tighter, and warm enough that the click feels welcoming.

---

## Pre-publish snippet checklist

- [ ] Snippet shape decided (paragraph / list)
- [ ] Paragraph target sits in the **top quote block** of the body, above the first heading_2
- [ ] Paragraph: 40-60 words, plain prose, no inline links/bold, no toxic-positivity or guaranteed-outcome framing
- [ ] List: 6-8 short parallel affirmations (present tense, first person), numbered only if genuinely ordered
- [ ] heading_2 above any list phrased close to the target query
- [ ] No tables relied on for a snippet — comparisons reframed as prose/lists (the renderer drops tables)
- [ ] Voice stays warm and empowering while the claim stays honest
- [ ] PAA questions captured in a body `## Frequently asked questions` (heading_2 + heading_3 + 40-60 word paragraph answers), not a property
- [ ] Clinical topics (anxiety, depression, grief, health) carry the light "support, not a replacement" note
- [ ] Every psychology/scripture/health claim in a snippet target is correct per `accuracy-and-trust-skill.md`

---

## What kills snippet eligibility

- The direct answer is buried under an "in this article we'll explore…" preamble instead of leading the quote block
- The heading_2 above a list doesn't match the query
- The opening paragraph runs past ~80 words
- The answer paragraph contains inline links or bold
- A table relied on for a snippet (it doesn't render — use a list instead)
- The list items are full paragraphs of commentary, or break the first-person/present-tense rule
- The page has zero internal links (Google rewards pages embedded in a topical hub — link ≥ 3 cluster siblings and the pillar)
- The page isn't on page 1 yet — snippets only come from already-ranking pages

**Snippets are a multiplier, not a starter.** A page that doesn't already rank on page 1 won't win the snippet. Write the page well first, then optimize for the box.

---

**BlogOS** — own the box.
