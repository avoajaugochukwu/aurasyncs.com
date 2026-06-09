---
description: Audit + fix an existing affirmation post against the BlogOS pack
argument-hint: <slug, e.g. "affirmations-for-anxiety-finding-peace-inner-calm">
---

Audit and fix the existing Aurasyncs post: **$ARGUMENTS**

## Resolve the post

Read `content/posts/$ARGUMENTS.mdx` (the slug, with or without the `.mdx` — strip it if given). If it doesn't exist, list near-matches from `content/posts/` and ask. A `gray-matter` MDX file that is **either structured** (a `reader:` frontmatter block drives the Scroll reader — audit *that*) **or legacy prose** (affirmations in the Markdown body — consider migrating it; see `structured-reader-skill.md` §Migration).

## Load the pack

- @protocols/blog/blog-os-master.md
- @protocols/blog/structured-reader-skill.md   ← the output contract (the `reader:` block)
- @protocols/blog/page-structures-skill.md
- @protocols/blog/affirmation-craft-skill.md
- @protocols/blog/accuracy-and-trust-skill.md
- @protocols/blog/google-trust-audit-skill.md
- @protocols/blog/title-meta-slug-skill.md
- @research/voice_profile.md (preserve the voice lock; fall back to @protocols/site-voice-profile.md)

Pull in `featured-snippet`, `scannable-formatting`, `topical-authority`, `research-and-citation`, `conclusion-and-cta`, `update-discipline`, and `analytics-coaching` as the findings require.

## Audit

Run the full re-audit from `blog-os-master.md` §8 against the post:

1. **Frontmatter.** `title` (`"<short phrase>: <keyword payoff>"` — H1 = pre-colon, ≤ ~60 chars), `excerpt` vs `metaDescription` (the latter a full 150–160 chars — many existing posts are truncated to ~100; fix), `author` ("Ugo Charles"), `tags` (1–4), `readingTime`, `createdTime`, `lastEditedTime`, `faq:` (2–4 PAA pairs). No invented fields (no `slug`, `status`, `metaTitle`, `related`).
2. **Reader block (`structured-reader-skill.md`).** `reader:` valid: `tag`, `subtitle` (carries the keyword), `opening.quote`, `intro[]`, ≥1 `section` with `title` + ≥1 `quote`. **Every section has a non-empty `body[]`** of original prose (flag list-only sections as thin). All `reader:` prose is plain text (no Markdown/links). Body is the pointer comment, not a duplicate. *(Legacy prose post: no `#` H1 in body, leading blockquote answer, `##`/`###`, no `{#id}`/`$…$`/JSX — and consider migrating to `reader:`.)*
3. **Affirmation craft (`affirmation-craft-skill.md`).** Every affirmation (`sections[].quotes[]`) present tense, first person, positively framed, believable/laddered, short, grouped. Flag any denial / toxic positivity / future-tense / guaranteed-outcome lines and rewrite them.
4. **Attribution + accuracy gate (`accuracy-and-trust-skill.md`).** Read every affirmation as the reader (safe, non-denying). **Every `quote.author` is a verified real source or `"Anonymous"` — fix any `"AI-generated"`, invented name, "Adapted from <real author>", pseudo-source ("songwriter"/"song lyric"/"Meditation teaching"/"Unknown"), fabricated credential, or false provenance claim in the prose** (verify named sources via WebSearch/WebFetch). Verify every load-bearing claim; cut/fix fabricated statistics and non-existent studies; confirm scripture quote + reference + translation; ensure a support-not-replace note where clinical; manifestation/money framed as mindset, not guaranteed outcome.
5. **Anti-AI-slop, scannability, cross-links, voice.** Fix slop phrases; the reader's sections/bands/prompts are the scannability events; cross-links are the auto Related cards (don't fake inline links in `reader:` prose); preserve the voice lock.

## Fix and write back

Patch the issues (literal swaps; don't reorganize during verification). Write the corrected MDX back to `content/posts/$ARGUMENTS.mdx` and **bump `lastEditedTime`** in the frontmatter (it feeds JSON-LD `dateModified` / og:modifiedTime).

**Gate:** if any affirmation is unsafe/denying and can't be salvaged, or any load-bearing claim is unverifiable (fabricated study, misquoted verse, guaranteed outcome), do NOT overwrite — emit the audit with `❌ NOT SHIPPED — claims unverified / affirmations unsafe` and report what needs a human decision.

## Output

The `===AUDIT===` block listing every finding and patch. Append a rotation-log entry to `protocols/rotation-log.md` if the structure changed materially.
