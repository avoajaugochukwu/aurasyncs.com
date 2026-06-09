---
description: Research + draft an affirmation post → Notion-ready (+ optional content/posts/<slug>.json)
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
2. **Derive the slug** (kebab-case; check `content/posts/_index.json` for an existing/sibling slug — don't collide or duplicate intent). Find 3–6 sibling posts in the same cluster to cross-link.
3. **Research (Pass 1).** WebSearch the keyword → read the top results and the People-Also-Ask box. WebFetch any source needed to confirm a load-bearing fact: the psychology of affirmations (peer-reviewed/.edu/.gov), any scripture quote + reference + translation, any health/money claim. Note the angle that makes this non-generic (the grouping scheme, the real how-to-use, the sourced why-it-works).
4. **Consult `variety-rotation-skill.md`** + the recent entries in `protocols/rotation-log.md` and pick slots that differ from recent posts in this cluster.
5. **Draft** as a property set + a body of supported Notion blocks per the type's skeleton: a leading `quote` answer box (40–60 words: what the set is for, roughly how many affirmations, how to use them), the grouped affirmation lists (first person, present tense, laddered where tender), the how-to-use, the sourced why-it-works with a light support-not-replace note where the topic is clinical, tips, a `heading_2` "Frequently asked questions" (2–4 `heading_3` questions from PAA), and one CTA linking to a sibling post.
6. **Affirmation + fact verification (Pass 2 — the gate, `accuracy-and-trust-skill.md`).** Read every affirmation as the reader: present tense, first person, positive framing, believable/laddered, non-harmful. Verify every load-bearing claim against a reputable source and cite it; quote scripture exactly with the translation named; hedge honestly where evidence is modest. Patch inline (literal swaps only).
7. **Mandatory re-audit** (`blog-os-master.md` §8). Fix every violation. If any affirmation is unsafe or any claim is unverifiable, emit ONLY the audit with `❌ POST NOT SHIPPED` and stop.
8. **Output** in the `===AUDIT===` / `===POST===` format: the property set (Title, Slug, Excerpt, Meta Description [150–160], Author "Ugo Charles", Tags [1–4], ReadingTime, Featured Image, Status: Done) and the body as Notion blocks, ready to paste into Notion.
9. **Append a rotation-log entry** to `protocols/rotation-log.md`.

## Optional repo preview

If the user wants to preview in the repo without round-tripping through Notion, also write `content/posts/<slug>.json` in the compact Notion-block shape the renderer accepts (each block needs `type`, an `id`, and `<type>.rich_text` items of `{plain_text, annotations{bold,italic,strikethrough,underline,code,color}, href}`; images use `image.__local`), set the metadata fields (slug, title, excerpt, metaDescription, author, tags, readingTime, createdTime, lastEditedTime, featuredImage), and append `{slug, title, createdTime}` to `content/posts/_index.json`. Note that the canonical source is the Notion page — a direct JSON write is a preview that the next migrate run will reconcile, and the `app/blog/[slug]` route currently still reads live from Notion.

## Hard rules

- No H1 in the body (the Title property is the H1; `heading_1` mis-renders as an h2 — use `heading_2`/`heading_3`). No tables, no math, only supported blocks.
- Every affirmation present tense, first person, positively framed, believable or laddered; no denial/toxic positivity, no guaranteed-outcome phrasing.
- No fabricated statistics or studies; scripture exact with translation named; support-not-replace note where clinical.
- Meta Description is a full 150–160 chars and separate from Excerpt.
