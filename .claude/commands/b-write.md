---
description: Research + draft an affirmation post → content/posts/<slug>.mdx
argument-hint: <topic or keyword, e.g. "affirmations for anxiety">
---

Write one high-quality Aurasyncs affirmation post for: **$ARGUMENTS**

Follow the BlogOS pack end to end. Do not skip the research or the gate. One post, one research pass — do not fan out multiple keywords.

## Load the pack

Read before drafting:
- @protocols/blog/blog-os-master.md
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
5. **Draft** as plain-Markdown MDX per the type's skeleton: frontmatter, then a leading blockquote answer box (40–60 words: what the set is for, roughly how many affirmations, how to use them), the grouped affirmation lists (first person, present tense, laddered where tender), the how-to-use, the sourced why-it-works with a light support-not-replace note where the topic is clinical, tips, a `## Frequently asked questions` section (2–4 `###` questions from PAA), and one CTA linking to a sibling post.
6. **Affirmation + fact verification (Pass 2 — the gate, `accuracy-and-trust-skill.md`).** Read every affirmation as the reader: present tense, first person, positive framing, believable/laddered, non-harmful. Verify every load-bearing claim against a reputable source and cite it; quote scripture exactly with the translation named; hedge honestly where evidence is modest. Patch inline (literal swaps only).
7. **Mandatory re-audit** (`blog-os-master.md` §8). Fix every violation. If any affirmation is unsafe or any claim is unverifiable, emit ONLY the audit with `❌ POST NOT SHIPPED` and stop.
8. **Write the file** to `content/posts/<slug>.mdx` and output the `===AUDIT===` block.

## The MDX file shape

```mdx
---
title: "..."                 # also the H1 + meta title; front-load the keyword, ≤ ~60 chars
excerpt: "..."               # short on-page/card hook
metaDescription: "..."       # full 150–160 chars, separate from excerpt
author: "Ugo Charles"
tags: ["affirmations", "<theme>"]
readingTime: 6
createdTime: "<ISO datetime>"
lastEditedTime: "<ISO datetime>"
featuredImage: "/blog/<slug>.webp"   # omit if no image exists yet
---

![descriptive alt](/blog/<slug>-content-1.webp)   # optional featured/inline image

> [the 40–60 word answer-box blockquote]

## How to use these affirmations
...
```

No `slug`/`status`/`metaTitle` frontmatter (slug = filename; the file existing = published). The route auto-emits `BlogPosting` + `BreadcrumbList` JSON-LD, canonical, OG, and Twitter — don't hand-author them.

## Hard rules

- No `#` H1 in the body (the `title` frontmatter is the H1; use `##`/`###`). No `{#id}` anchors, no `$…$` math, no invented JSX. GFM tables render but use sparingly (prose/grouped lists usually read better).
- Every affirmation present tense, first person, positively framed, believable or laddered; no denial/toxic positivity, no guaranteed-outcome phrasing.
- No fabricated statistics or studies; scripture exact with translation named; support-not-replace note where clinical.
- `metaDescription` is a full 150–160 chars and separate from `excerpt`.

Append a rotation-log entry to `protocols/rotation-log.md`.
