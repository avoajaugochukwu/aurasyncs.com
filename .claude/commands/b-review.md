---
description: Audit + fix an existing affirmation post against the BlogOS pack
argument-hint: <slug, e.g. "affirmations-for-anxiety-finding-peace-inner-calm">
---

Audit and fix the existing Aurasyncs post: **$ARGUMENTS**

## Resolve the post

Read `content/posts/$ARGUMENTS.json` (the slug, with or without the `.json` — strip it if given). If it doesn't exist, list near-matches from `content/posts/_index.json` and ask. This JSON is a Notion export (a `blocks` array + metadata). Remember the **canonical source is the Notion page** — a direct edit to this JSON is a preview that the next `node --env-file=.env scripts/migrate-notion.mjs` run will reconcile, so also report the changes so they can be mirrored into Notion.

## Load the pack

- @protocols/blog/blog-os-master.md
- @protocols/blog/page-structures-skill.md
- @protocols/blog/affirmation-craft-skill.md
- @protocols/blog/accuracy-and-trust-skill.md
- @protocols/blog/google-trust-audit-skill.md
- @protocols/blog/title-meta-slug-skill.md
- @research/voice_profile.md (preserve the voice lock; fall back to @protocols/site-voice-profile.md)

Pull in `featured-snippet`, `scannable-formatting`, `topical-authority`, `research-and-citation`, `conclusion-and-cta`, `update-discipline`, and `analytics-coaching` as the findings require.

## Audit

Run the full re-audit from `blog-os-master.md` §8 against the post:

1. **Properties.** Title (= H1 + meta title, front-loads the keyword), Slug, Excerpt vs Meta Description (the latter a full 150–160 chars — many existing posts are truncated to ~100; fix), Author ("Ugo Charles"), Tags (1–4), ReadingTime, Status. No invented fields.
2. **Body / blocks.** No H1 / `heading_1` in the body (top sections `heading_2`, sub `heading_3`). A leading `quote` answer box (40–60 words). No tables (convert to grouped lists), no math, only supported block types. A `heading_2` "Frequently asked questions" where the type calls for it.
3. **Affirmation craft (`affirmation-craft-skill.md`).** Every affirmation present tense, first person, positively framed, believable/laddered, short, grouped. Flag any denial / toxic positivity / future-tense / guaranteed-outcome lines and rewrite them.
4. **Accuracy & trust (the gate, `accuracy-and-trust-skill.md`).** Read every affirmation as the reader (safe, non-denying). Verify every load-bearing claim against a reputable source via WebSearch/WebFetch; cut or fix fabricated statistics and non-existent studies; confirm any scripture quote + reference + translation; ensure a support-not-replace note where the topic is clinical; ensure manifestation/money is framed as mindset, not a guaranteed outcome.
5. **Anti-AI-slop, scannability, internal links, voice.** Fix slop phrases, ensure a scannability event every 200–300 words, 3–6 sibling cross-links, one clean CTA, and the voice lock.

## Fix and write back

Patch the issues (literal swaps; don't reorganize during verification). Write the corrected post back to `content/posts/$ARGUMENTS.json` (preserve the block `id`s and the metadata shape; update `lastEditedTime`). Update the `_index.json` title if it changed.

**Gate:** if any affirmation is unsafe/denying and can't be salvaged, or any load-bearing claim is unverifiable (fabricated study, misquoted verse, guaranteed outcome), do NOT overwrite — emit the audit with `❌ NOT SHIPPED — claims unverified / affirmations unsafe` and report what needs a human decision.

## Output

The `===AUDIT===` block listing every finding and patch, plus a one-line note of what to mirror back into the Notion page (since Notion is the source of truth). Append a rotation-log entry to `protocols/rotation-log.md` if the structure changed materially.
