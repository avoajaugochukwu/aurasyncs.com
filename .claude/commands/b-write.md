---
description: Research + draft an affirmation post → content/posts/<slug>.mdx
argument-hint: <topic or keyword, e.g. "affirmations for anxiety">
---

Write one high-quality Aurasyncs affirmation post for: **$ARGUMENTS**

Follow the BlogOS pack end to end. Do not skip the research or the gate. One post, one research pass — do not fan out multiple keywords.

## Load the pack

Read before drafting:
- @protocols/blog/blog-os-master.md
- @protocols/blog/structured-reader-skill.md   ← the output contract (the `reader:` block)
- @protocols/blog/page-structures-skill.md
- @protocols/blog/affirmation-craft-skill.md
- @protocols/blog/accuracy-and-trust-skill.md
- @protocols/blog/title-meta-slug-skill.md
- @protocols/blog/featured-snippet-skill.md
- @protocols/blog/variety-rotation-skill.md
- @research/voice_profile.md (the `===SITE VOICE LOCK===` — preserve its language; if absent, fall back to @protocols/site-voice-profile.md)

Pull in `BLOG-INTRO-SWIPE.md`, `conclusion-and-cta-skill.md`, `scannable-formatting-skill.md`, `topical-authority-skill.md`, `research-and-citation-skill.md`, `media-and-images-skill.md`, and `engagement-mechanics-skill.md` as needed.

## Steps

1. **Identify the content type** (`page-structures-skill.md`): 💫 themed collection, 📅 daily/occasion, 🙏 faith/scripture, or 🧘 practice guide — plus any audience/tone modifier. If genuinely ambiguous, ask; otherwise default to 💫 collection.
2. **Derive the slug** (kebab-case = the `.mdx` filename; check `content/posts/` for an existing/sibling slug — don't collide or duplicate intent). Find 3–6 sibling posts in the same cluster to cross-link.
3. **Research (Pass 1).** WebSearch the keyword → read the top results and the People-Also-Ask box. WebFetch any source needed to confirm a load-bearing fact: the psychology of affirmations (peer-reviewed/.edu/.gov), any scripture quote + reference + translation, any health/money claim. Note the angle that makes this non-generic (the grouping scheme, the real how-to-use, the sourced why-it-works).
4. **Consult `variety-rotation-skill.md`** + the recent entries in `protocols/rotation-log.md` and pick slots that differ from recent posts in this cluster.
5. **Draft the `reader:` block** (`structured-reader-skill.md`): `tag`, a `subtitle` carrying the keyword, `opening.quote` (+ `note`), `intro[]` framing prose, and 3–5 `sections[]` — each with a `keyword`, framing `intro`, **original `body[]` prose** (the differentiation; how/why these work, the support-not-replace note where clinical), `whenToUse`, grouped `quotes[]` (first person, present tense, laddered where tender), and a `prompt`. Put 2–4 PAA questions in `faq:`. Body = the pointer comment. Don't author `related:` (auto).
6. **Affirmation + attribution + fact verification (Pass 2 — the gate, `accuracy-and-trust-skill.md`).** Read every affirmation as the reader: present tense, first person, positive framing, believable/laddered, non-harmful. **Attribution: every `quote.author` is a verified real source or `"Anonymous"` — never `"AI-generated"`, never a fabricated name/credential/provenance.** Verify every load-bearing claim against a reputable source and cite it; quote scripture exactly with the translation named; hedge honestly where evidence is modest. Patch inline (literal swaps only).
7. **Mandatory re-audit** (`blog-os-master.md` §8). Fix every violation. If any affirmation is unsafe or any claim is unverifiable, emit ONLY the audit with `❌ POST NOT SHIPPED` and stop.
8. **Write the file** to `content/posts/<slug>.mdx` and output the `===AUDIT===` block.

## The MDX file shape (structured)

```mdx
---
title: "Calm the Storm: 25+ Anxiety Affirmations to Soothe Your Mind"  # H1 = pre-colon part; full string → <title>/og/headline
excerpt: "..."               # short on-page/card hook
metaDescription: "..."       # full 150–160 chars, separate from excerpt
author: "Ugo Charles"
tags: ["affirmations", "<theme>"]
readingTime: 6
createdTime: "<ISO datetime>"
lastEditedTime: "<ISO datetime>"
featuredImage: "/blog/<slug>.webp"   # OG/social only; omit if none
faq:
  - q: "..."
    a: "..."
reader:
  tag: "Affirmations"
  subtitle: "..."            # the dek; carries the keyword
  opening: { quote: "...", note: "..." }
  intro: ["...framing prose..."]
  sections:
    - id: "<id>"
      title: "..."
      keyword: "..."
      intro: "..."
      body: ["...original depth prose..."]
      whenToUse: "..."
      quotes:
        - { text: "...", author: "Anonymous" }   # verified source or "Anonymous"; never "AI-generated"
      prompt: "..."
---

{/* This post renders from the structured `reader:` frontmatter above. Edit `reader:` to change the post. */}
```

No `slug`/`status`/`metaTitle`/`related` frontmatter (slug = filename; the file existing = published; Related is auto). The route auto-emits `BlogPosting` + `BreadcrumbList` + (when `faq:` present) `FAQPage` JSON-LD, canonical, OG, and Twitter — don't hand-author them. Full schema: `structured-reader-skill.md`.

## Hard rules

- Affirmations + writing go in the `reader:` block, not the body. Every `reader:` prose field is **plain text** (no Markdown/links/headings — they render literally). Body = the pointer comment.
- `title` is `"<short phrase>: <keyword payoff>"` (H1 = pre-colon); `reader.subtitle` carries the keyword. `metaDescription` a full 150–160 chars, separate from `excerpt`.
- **Every section has a non-empty `body[]`** of original prose — a section that's just a list is thin content.
- Every affirmation present tense, first person, positively framed, believable or laddered; no denial/toxic positivity, no guaranteed-outcome phrasing.
- **Every `quote.author` is a verified real source or `"Anonymous"`** — never `"AI-generated"`, never a fabricated name/credential/provenance.
- No fabricated statistics or studies; scripture exact with translation named; support-not-replace note where clinical (often `opening.note`).

Append a rotation-log entry to `protocols/rotation-log.md`.
