---
name: structured-reader
description: THE OUTPUT CONTRACT for Aurasyncs as of the 2026 reader redesign. Posts are no longer affirmation lists in the Markdown body — the affirmations and their surrounding original writing now live in a structured `reader:` block in the frontmatter, which `lib/posts.ts` parses and `components/reader/ScrollReader.tsx` renders as the warm Scroll reader (eyebrow → H1 → subtitle → opening quote → drop-cap intro → themed sections, each with original prose + grouped affirmation "bands" + a reflection prompt → auto Related cards → FAQ). This skill defines the exact `reader:` schema, how each field renders, the title/colon rule, the attribution rule (a verified real source or "Anonymous" — never "AI-generated", never a fabricated source/credential), the per-section original-writing requirement that is the site's anti-thin-content differentiation, and the prose-fallback path for un-migrated posts. Pairs with blog-os-master, page-structures, affirmation-craft, and accuracy-and-trust.
---

# Structured Reader — The Aurasyncs Output Contract

> **This supersedes the old "affirmations are Markdown bullet lists in the body" contract.** A modern Aurasyncs post carries its affirmations and the writing around them in a **`reader:` block in the YAML frontmatter**. `lib/posts.ts` parses it into a `Reader` object; `app/blog/[slug]/page.tsx` renders it through `components/reader/ScrollReader.tsx` (a client component). The Markdown body is **not** where the affirmations live anymore.

The reason this format exists is the site's whole competitive bet (see `blog-os-master.md` rule 2): the web is drowning in interchangeable affirmation lists. Aurasyncs differentiates by giving **each line room to land** and by **wrapping every group of affirmations in original writing** — a framing line, a couple of paragraphs of genuine depth prose, a practitioner "when to reach for these" note, and a reflection prompt. That surrounding writing *is* the original value. A `reader:` block with empty `body` paragraphs is just a styled list — it fails the same way a bare Markdown list did.

---

## How a post renders (so you know what each field does)

`app/blog/[slug]/page.tsx`:

1. If the post has a valid `reader:` block → renders **`<ScrollReader>`** (the full warm reader). The Markdown body is ignored.
2. If it does not → renders the **styled-prose fallback** (`<MdxContent>` over the Markdown body in the new design system). This is the path the ~58 not-yet-migrated posts take.

Either way the route still auto-emits `BlogPosting` + `BreadcrumbList` JSON-LD, canonical, OpenGraph (per-post og:image from `featuredImage`), and a Twitter card. **New as of this redesign: if `faq:` is present, the route also emits `FAQPage` JSON-LD** and the author byline links to `/author/<slug>` (the author's `url` is added to the `BlogPosting` author for E-E-A-T).

The reader is text-editorial: **no thumbnails, no hero image** on the page (the `featuredImage` is used for OG/social only). Each affirmation has a hover-reveal **copy-to-clipboard** button. The site has two themes, **Sand (light)** and **Dusk (dark)**; write nothing that assumes a background color.

---

## The `reader:` schema (exactly what `lib/posts.ts` parses)

```yaml
reader:
  tag: "Affirmations"          # eyebrow above the H1 (kicker). Defaults to "Affirmations".
  subtitle: "25+ anxiety affirmations to soothe your mind and find peace"
                               # italic dek under the H1. CARRIES THE KEYWORD (see title rule).
  opening:                     # the answer box (optional but expected)
    quote: "You are not your anxiety — you are the calm observer beside it."
    note: "Even reading this can feel like a gentle exhale. Let the words ahead sink in slowly."
  intro:                       # 1–2 paragraphs of original framing prose (drop-cap). Plain text.
    - "Anxiety affirmations are short, present-tense statements you repeat to steady a racing mind. They won’t stop a panic attack on command or replace care when anxiety is severe — but with repetition they wear a calmer groove into your self-talk."
  sections:                    # the heart of the post — REQUIRED, ≥1
    - id: "grounding"          # anchor id; defaults to section-N
      title: "Grounding & Safety"
      keyword: "anxiety affirmations"   # SEO keyword shown as the section eyebrow
      intro: "When anxiety surges, grounding affirmations are like a steady hand on your shoulder."
      body:                    # the ORIGINAL DEPTH PROSE — 1–2 paragraphs. This is the differentiation.
        - "Anxiety usually arrives in the body before it reaches words…"
        - "Reach for these at 3am when thoughts spiral…"
      whenToUse: "Reach for these in panic’s first wave, at a sleepless 3am, or the moment before you walk in."
      quotes:                  # the affirmations (the "bands")
        - { text: "I am safe. I am here. I am grounded.", author: "Anonymous" }
        - { text: "This too shall pass.", author: "Persian adage" }
      prompt: "Take three deep breaths. Then journal: what in my surroundings feels steady right now?"
```

Field reference and render target:

| Field | Required | Renders as | Notes |
|---|---|---|---|
| `tag` | no (default "Affirmations") | clay eyebrow above the H1 | short kicker |
| `subtitle` | strongly recommended | italic serif dek under the H1 | **carries the keyword** (title rule below) |
| `opening.quote` | recommended | large centered serif "answer box" + bottom border | the single line that orients the reader |
| `opening.note` | optional | sans note under the opening quote | 1 warm sentence; can hold the support-not-replace note |
| `intro[]` | recommended | drop-cap framing prose (sans), under the opening | 1–2 paragraphs; **plain text only** |
| `sections[]` | **required (≥1)** | each = eyebrow → title → intro → body prose → "When" note → affirmation bands → prompt | a section needs a `title` **and** ≥1 `quote` or it is dropped |
| `sections[].keyword` | recommended | section eyebrow (kicker) | where the per-section SEO keyword lives |
| `sections[].intro` | recommended | one framing sentence under the section title | |
| `sections[].body[]` | **required for differentiation** | depth-prose paragraphs (sans) | 1–2 paragraphs of genuine, original writing. Skipping this makes the post thin. |
| `sections[].whenToUse` | recommended | clay-bordered "When" practitioner note | when to reach for this group |
| `sections[].quotes[]` | **required (≥1)** | standalone affirmation "bands" with a copy button | `{ text, author }`; see attribution rule |
| `sections[].prompt` | recommended | "Reflection" box (tinted) | a journaling/breathing prompt that closes the group |

**Plain-text only in all prose fields.** `intro[]`, `body[]`, `intro`, `whenToUse`, `prompt`, `opening.*` are rendered as React text nodes, **not** through MDX — so Markdown (`**bold**`, `[links](/blog/x)`, `#`) renders as literal characters. No inline links, no bold, no headings inside these strings. Em dashes and curly quotes are fine and on-brand.

---

## FAQ and Related (no longer body sections)

- **FAQ** lives in the **`faq:` frontmatter list** (`- q: … / a: …`), same as before, and the reader renders it as the "Questions, gently answered" section. **It now also emits `FAQPage` JSON-LD** from the route. 2–4 questions drawn from People-Also-Ask. Plain text in `q`/`a`.
- **Related collections** are **auto-generated** by the route from the cluster map (`lib/clusters.ts`, `getRelatedPosts`) and rendered as the three Related cards. **Do not author a `related:` list** — it's computed. Cross-linking is handled here, not by inline links (which the reader prose can't render).

> **Internal-linking caveat.** Because reader prose is plain text, the old "3–6 inline sibling links in the body" rule does **not** apply to structured posts — the auto Related cards carry the cluster links. If a post genuinely needs richer inline cross-linking, that's a renderer enhancement (render Markdown in `body[]`), not something to fake with literal `[text](/url)` strings. Flag it; don't ship literal link syntax.

---

## The title / colon rule (site behavior — write to it)

The route renders the **H1 from only the part of `title` before the first colon**, and shows `reader.subtitle` as the dek beneath it. The full `title` still feeds `<title>`, OpenGraph, and the JSON-LD headline. So:

- Write `title` as **`<short evocative phrase>: <keyword-rich payoff>`**, e.g. `"Calm the Storm: 25+ Anxiety Affirmations to Soothe Your Mind"`. The H1 becomes "Calm the Storm"; the `<title>`/OG/schema keep the full keyword.
- Set **`reader.subtitle`** to the keyword-rich payoff (≈ the part after the colon), e.g. `"25+ anxiety affirmations to soothe your mind and find peace"`. This keeps the primary keyword visible on-page even though the H1 is short.
- Also place the keyword in: `metaDescription`, the slug (filename), at least one `sections[].keyword`, and naturally in `opening.quote`/`intro`. (See `title-meta-slug-skill.md` — the artifacts are unchanged; only where the on-page keyword surfaces moved from the H1 to the subtitle + section eyebrows.)

If a `title` has no colon, the whole title is the H1 — fine for short titles.

---

## The attribution rule (a hard trust rule)

Every affirmation's `author` is one of:

1. **A verified, real source** — a named person, text, or tradition you have confirmed via WebSearch/WebFetch actually said/wrote it (e.g. `Eleanor Roosevelt`, `Ram Dass`, `Persian adage`). Verify before you attribute. Naming the work is a bonus (`Eleanor Roosevelt`).
2. **`"Anonymous"`** — for everything else: original lines we wrote, common affirmations with no single author, or a line whose source you cannot verify.

Hard rules:

- **Never `"AI-generated"`.** If a line was generated and has no real source, its author is `"Anonymous"`.
- **Never fabricate a source or credential.** Inventing a poet ("Maya Liu"), misattributing to a real author ("Adapted from Richard Rohr" for a line he never wrote), or pseudo-sourcing ("Anonymous songwriter", "Indie song lyric", "Meditation teaching") is a **trust violation worse than "Anonymous"** and a publish blocker (see `accuracy-and-trust-skill.md`). A fabricated *credential* ("X, a licensed therapist…") is a YMYL violation.
- **A strong, relevant `"Anonymous"` line can lead its section.** Don't bury the best line to put a "named" one first. Order by what lands.
- **Don't claim provenance you don't have.** If a section's prose says the lines come "from songs and poets," the lines had better actually come from songs and poets. Otherwise frame them honestly as original/uncommon affirmations.

A healthy post mixes a few verified attributions with many honest `"Anonymous"` lines. That mix is more credible than a wall of suspiciously-named quotes.

---

## The Markdown body in a structured post

For a post with a `reader:` block, the body is **not rendered**. Leave it as a one-line pointer comment so no one edits dead, drifting content:

```mdx
---
…frontmatter incl. reader:…
---

{/* This post renders from the structured `reader:` frontmatter above (the Scroll reader).
    The affirmations, per-section writing, prompts, and FAQ live there — not in this body. */}
```

Do **not** keep a duplicate prose copy of the affirmations in the body — it drifts from the `reader:` block and, in this codebase's history, is exactly where fabricated attributions survived a cleanup.

---

## Migration (prose post → structured)

The ~58 legacy posts still render as styled prose. To migrate one:

1. Read the body; lift each themed group into a `sections[]` entry: `title`, a `keyword`, the framing line into `intro`, the explanatory paragraphs into `body[]`, the bullet affirmations into `quotes[]`.
2. **Re-attribute** every quote per the attribution rule (most legacy "— AI-generated" / "— Unknown" become `"Anonymous"`; verify any named source).
3. Lift the FAQ into the `faq:` frontmatter list. Pull the opening blockquote into `opening`.
4. Write `subtitle` from the title's keyword payoff. Replace the body with the pointer comment.
5. Bump `lastEditedTime`. Run the accuracy gate over the new `quotes`/`body`.

A migration is a `/b-review` job; it must not lose the original framing prose (that's the value) and must pass the attribution + accuracy gates.

---

## Re-audit hook (structured posts)

Folded into the master re-audit:

- [ ] `reader:` present and valid: `tag`, `subtitle`, `opening.quote`, `intro[]`, and ≥1 `section` with a `title`, ≥1 `quote`, AND a non-empty `body[]` (the original writing — not just a list).
- [ ] Every `sections[].body[]` is genuine original prose (framing/how/why), not filler — this is the anti-thin-content requirement.
- [ ] Every `quote.author` is a **verified real source or `"Anonymous"`** — no `"AI-generated"`, no fabricated name/credential, no unverifiable pseudo-source; no false provenance claims in the prose.
- [ ] `subtitle` carries the primary keyword (since the H1 is the pre-colon part); keyword also in `metaDescription`, slug, ≥1 `sections[].keyword`.
- [ ] All reader prose fields are **plain text** (no Markdown/links/headings rendered literally).
- [ ] `faq:` holds 2–4 PAA questions (emits `FAQPage`); no `related:` authored (auto).
- [ ] Markdown body is the pointer comment, not a duplicate of the affirmations.
- [ ] Every affirmation still passes `affirmation-craft-skill.md` (present tense, first person, positive, believable/laddered) and the support-not-replace note is present where clinical (often in `opening.note` or a section `body`).

---

**The format carries the differentiation.** Structured sections + original per-section writing + honestly-attributed, well-formed affirmations, each given room to land — that is why an Aurasyncs page deserves to rank where a bare list does not.
