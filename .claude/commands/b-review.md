---
description: Audit + fix an existing affirmation post against the BlogOS pack
argument-hint: <slug, e.g. "affirmations-for-anxiety-finding-peace-inner-calm">
---

Audit and fix the existing Aurasyncs post: **$ARGUMENTS**

## Resolve the post

Read `content/posts/$ARGUMENTS.mdx` (the slug, with or without the `.mdx` — strip it if given). If it doesn't exist, list near-matches from `content/posts/` and ask. It's a plain-Markdown MDX file: `gray-matter` frontmatter + a Markdown body.

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

1. **Frontmatter.** `title` (= H1 + meta title, front-loads the keyword), `excerpt` vs `metaDescription` (the latter a full 150–160 chars — many existing posts are truncated to ~100; fix), `author` ("Ugo Charles"), `tags` (1–4), `readingTime`, `createdTime`, `lastEditedTime`. No invented fields (no `slug`, `status`, `metaTitle`).
2. **Body.** No `#` H1 in the body (top sections `##`, sub `###`). A leading blockquote answer box (40–60 words). No `{#id}` anchors, no `$…$` math, no invented JSX. Tables only where genuinely tabular (GFM renders, but prose/lists usually read better). A `## Frequently asked questions` section where the type calls for it.
3. **Affirmation craft (`affirmation-craft-skill.md`).** Every affirmation present tense, first person, positively framed, believable/laddered, short, grouped. Flag any denial / toxic positivity / future-tense / guaranteed-outcome lines and rewrite them.
4. **Accuracy & trust (the gate, `accuracy-and-trust-skill.md`).** Read every affirmation as the reader (safe, non-denying). Verify every load-bearing claim against a reputable source via WebSearch/WebFetch; cut or fix fabricated statistics and non-existent studies; confirm any scripture quote + reference + translation; ensure a support-not-replace note where the topic is clinical; ensure manifestation/money is framed as mindset, not a guaranteed outcome.
5. **Anti-AI-slop, scannability, internal links, voice.** Fix slop phrases, ensure a scannability event every 200–300 words, 3–6 sibling cross-links (inline Markdown links to `/blog/<slug>`), one clean CTA, and the voice lock.

## Fix and write back

Patch the issues (literal swaps; don't reorganize during verification). Write the corrected MDX back to `content/posts/$ARGUMENTS.mdx` and **bump `lastEditedTime`** in the frontmatter (it feeds JSON-LD `dateModified` / og:modifiedTime).

**Gate:** if any affirmation is unsafe/denying and can't be salvaged, or any load-bearing claim is unverifiable (fabricated study, misquoted verse, guaranteed outcome), do NOT overwrite — emit the audit with `❌ NOT SHIPPED — claims unverified / affirmations unsafe` and report what needs a human decision.

## Output

The `===AUDIT===` block listing every finding and patch. Append a rotation-log entry to `protocols/rotation-log.md` if the structure changed materially.
