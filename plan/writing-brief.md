# Writing brief — how to write Aurasyncs posts

Read this before writing anything from [new-posts.md](./new-posts.md). It is the
format + voice contract for this site. Follow it exactly.

## The fastest path

This repo ships a BlogOS skill pack. **Prefer running the slash command** rather than
writing from scratch — it injects the site voice lock, accuracy gate, and structure rules
automatically:

```
/b-write <primary keyword>      # research + draft a new post → content/posts/<slug>.mdx
/b-review <slug>                # audit + fix an existing post against the pack
```

Pack lives in `protocols/blog/` (start at `blog-os-master.md` / `USAGE.md`). If you write
by hand instead, you must still satisfy everything below.

## Where output goes

- One post = one file at **`content/posts/<slug>.mdx`** (MDX, **not** Notion).
- Slug = the suggested slug in the brief (kebab-case). Keep it stable once published.
- Images referenced as `/blog/<slug>.webp` (featured) and `/blog/<slug>-content-N.webp`
  (inline). Don't invent image files that won't exist — use the featured image pattern and
  leave inline images only where the pipeline generates them.

## Frontmatter contract (required)

Match existing posts exactly. Example from `content/posts/affirmations-for-success.mdx`:

```yaml
---
title: "Empower Your Journey: 50 Affirmations for Success to Inspire and Motivate"
excerpt: "Discover 50 powerful affirmations to inspire success, build confidence..."
metaDescription: "50 success affirmations to motivate, inspire action, and build resilience..."
author: "Ugo Charles"
tags: ["affirmations"]
readingTime: 5
createdTime: "2025-06-03T20:49:00.000Z"
lastEditedTime: "2025-06-04T06:39:00.000Z"
featuredImage: "/blog/affirmations-for-success.webp"
---
```

- **title** — lead with the primary keyword, then a benefit hook. Title-case.
- **metaDescription** — ≤ ~155 chars, include the primary keyword + a reason to click.
- **author** — always `"Ugo Charles"`.
- **tags** — `["affirmations"]` plus the cluster where relevant.
- Optional **`faq:`** frontmatter is supported and renders FAQ schema — add 3–5 Q&As when
  the keyword has clear "People also ask" intent (great for featured snippets).

## Voice lock (load-bearing — do not flatten)

The site has an earned voice. The full lock is at **`research/voice_profile.md`** and is
injected verbatim by `/b-write`. The one-line audience frame:

> The reader is reaching for affirmations at a low or hopeful moment — lying awake anxious,
> rebuilding self-worth, worried about money or steadying their faith — tired of
> interchangeable lists and of affirmations that feel like lying to themselves. They want
> **warm, believable** words that meet them exactly where they are.

Rules that follow from that:
- **Warm and honest, never fake-positive.** Use a believability ladder ("you don't need to
  believe this perfectly yet…") instead of denial or hype.
- **Match the register to the cluster.** Faith clusters (Bible/Christian) → reverent,
  scripturally accurate. Anxiety/sleep → calm, low-arousal. Funny/sweary → playful but the
  affirmations underneath are still well-formed. Kids → simple, parent-facing intro.
- No guru tone, no clinical tone, no AI-slop throat-clearing.

## Structure that ranks here

Look at any existing post in `content/posts/` for the pattern. In short:
1. **Hook intro** — a short quote or scene, then 2–3 short paragraphs that name the reader's
   moment and the believability promise. Primary keyword in the first ~100 words.
2. **Themed H2 sections** of affirmations (e.g. "Morning affirmations for confidence",
   "…for anxiety"), each with a 1–2 sentence lead-in then a list. Weave the brief's
   **secondary keywords** into these H2s.
3. **A "how to use these" / FAQ section** — supports snippets and dwell time.
4. **Warm conclusion + soft CTA** (save, come back tomorrow, share).

## Internal linking (important for our ranking problem)

We are fixing a **rankings/authority** problem, so internal links matter:
- Link each new post to 2–4 sibling posts in the same cluster. Cluster wiring lives in
  `lib/clusters.ts`; related-posts blocks render automatically, but still add 2–3
  in-body contextual links to relevant existing posts in `content/posts/`.
- When a NEW post overlaps an existing one, link them rather than duplicating; if they truly
  compete, flag it for a 301 merge (`next.config.js` has the redirect mechanism).

## Accuracy gate

Anything factual (scripture references, any health/medical claim, "studies show…") must pass
`protocols/blog/accuracy-and-trust-skill.md`. When in doubt, soften to experience-based
language rather than asserting a claim.

## Definition of done

- Saves to `content/posts/<slug>.mdx` with valid frontmatter.
- Primary keyword in title, meta, first 100 words, and one H2.
- Secondary keywords from the brief appear naturally across H2s/body.
- 2–4 internal links to sibling posts. Voice lock honored. Accuracy gate passed.
