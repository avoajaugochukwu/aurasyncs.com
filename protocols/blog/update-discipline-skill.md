---
name: update-discipline
description: When to update an existing post vs publish a new one. When to redirect. How to track updates via the `lastEditedTime` frontmatter field you bump by hand. When to sunset stale posts. This is the skill that prevents content rot, link decay, claim/scripture drift, and accidental duplicate-intent posts from accumulating across Aurasyncs's affirmations corpus.
---

# Update Discipline — the long maintenance game

> Most blog content rots. A "money affirmations" collection that ranked in year one drifts out of relevance, cited sources move, a "morning affirmations" set falls out of sync with a fresher competitor, a stale novelty post sits dead weight, and the site quietly loses traffic without anyone noticing why. This skill is the maintenance discipline that prevents that.

---

## The three lifecycle decisions

For any post that has been published for ≥ 6 months, you face one of three decisions:

1. **Leave alone** — post is still ranking, still accurate, still serving readers
2. **Update in place** — post needs refreshing but the intent and angle are still valid
3. **Replace** — post is fundamentally outdated, off-strategy, or the angle has changed

The wrong decision rots the corpus. The right decision compounds.

---

## What triggers a re-check

An affirmations site refreshes on a mix of **the calendar** (some content is seasonal/occasion-bound) and **events**. Re-check a post when any of these happens:

- **A season, occasion, or moment comes around** — a "New Year affirmations" set or a "Monday affirmations" post wants a yearly pass before its window so it's fresh when search demand spikes
- **A claim needs correcting** — a "why they work" line that overclaims, a science claim that can't be sourced, a manifestation/abundance promise that implies a guaranteed outcome, or a wellbeing line that should point to professional care and doesn't
- **A scripture or translation error surfaces** — a verse mis-quoted, attributed to the wrong book, or quoted without noting the translation (faith sets, trust model)
- **A new related set or practice guide ships that this post should link to** — when a sibling collection or a "how to use affirmations" guide lands, re-link the relevant posts to it
- **A set drifts from a stronger competitor** — a thinner, older list that a fresher, more complete competitor has out-classed
- **A better source appears** — a clearer study or reputable reference supersedes a weaker citation in a "why they work" section

When any trigger fires, run the post through the update / replace / merge / sunset decision below.

---

## Tracking updates via the `lastEditedTime` frontmatter field

**Important:** Aurasyncs posts carry a `lastEditedTime` frontmatter field that you **bump by hand on every meaningful edit**. It's the modified-date — it feeds `og:modifiedTime` and the JSON-LD `dateModified` that ship automatically from `app/blog/[slug]/page.tsx`, so a stale `lastEditedTime` means a stale `dateModified`. Alongside it, `createdTime` is the original publish date. Track update history through:

- **`lastEditedTime` + git history** — the canonical edit happens by editing the `.mdx` file directly at `content/posts/<slug>.mdx`. When you update the body or frontmatter, set `lastEditedTime` to the current ISO timestamp; that value is what `dateModified` renders. The commit of the edited `.mdx` is the repo-side record. (`git log content/posts/<slug>.mdx` is your update trail.) There's no Notion round-trip and no migrate step — the file *is* the source of truth, and the file existing publishes it.
- **`createdTime`** — the original publish date. For a *replacement* you write a new `.mdx` file at a new slug with its own fresh `createdTime`. For a substantial in-place refresh the `createdTime` stays the post's original — don't fake a new publish date; bumping `lastEditedTime` already reflects the refresh.
- **A visible correction note in the body** — when an update *corrects* a previous claim, say so in the post (see below). That's the reader-facing freshness signal that complements the `dateModified` stamp.

Freshness on Aurasyncs is therefore communicated by *the content actually being current and accurate*, a bumped `lastEditedTime`, plus honest correction notes.

---

## When to UPDATE in place

Update the existing post (do not publish a new one) when:

- The target query and intent are unchanged
- The structural skeleton is still sound
- Specific affirmations, framings, or sources need refreshing (e.g. swapping a few weak lines for stronger ones, or adding a missing "how to use them" section)
- A seasonal/occasion post needs its yearly pass before its window
- A "why they work" claim needs re-sourcing or softening to meet the trust model
- A new related set or practice guide should now be linked from the post
- The post predates the current frontmatter shape and needs the new fields (`metaDescription`, `tags`, `excerpt`, `featuredImage`)
- New internal links should be added (because new sibling collections / practice guides / hubs have been published)

### How to update in place

1. Open the post's `.mdx` file at `content/posts/<slug>.mdx` and edit it directly — the file is the source of truth.
2. Make the changes
3. Add or update inline citations where you've touched a factual claim — link a reputable, real source (no fabricated studies); for faith sets quote scripture accurately and note the translation
4. If the update *corrects* a previous claim — a wrong/overclaimy line, a mis-quoted verse, a manifestation promise — add a correction note (see below) as a blockquote or a bold "**Correction:**" lead-in line
5. Refresh internal links to point at any newly-shipped related sets or practice guides
6. **Bump `lastEditedTime`** in the frontmatter to the current ISO timestamp — this feeds `dateModified`/`og:modifiedTime`
7. Run `/b-review` to audit the updated post
8. Commit with a clear message — the commit *is* your repo-side update record: `Refresh "money affirmations": swap 6 weak lines, re-source the self-affirmation study, link abundance practice guide`

### What counts as a "substantive" update

(These are the changes worth doing.)

- New section or new affirmations added (e.g. 10 fresh, well-formed lines)
- A "why they work" claim corrected or re-sourced to a real study
- A scripture quote corrected or its translation noted
- An overclaimy manifestation/health line softened to meet the trust model
- A newly-shipped related set or practice guide linked in
- Seasonal/occasion refresh for the upcoming window
- New internal links added (3+)

What does NOT count as substantive:
- Typo fix
- Formatting tweak
- Single-link replacement (without changing a claim)
- Image swap with no content change

Never fake freshness by bumping `lastEditedTime` without changing the substance — readers and Google both notice over time (and a fresh `dateModified` doesn't make a stale post fresh).

### How to write a correction (plain Markdown — no custom component)

The renderer (`components/MdxContent.tsx`) maps plain-Markdown elements; there is no `<CorrectionNote>` component. Write the correction as a Markdown blockquote (`> …`, the styled answer box), or a paragraph led with a bold **Correction:**. Add it when the update *changes a previous claim*. Examples:

- "This set previously implied saying money affirmations would 'guarantee' abundance. Reworded — affirmations support a mindset, they don't promise an outcome."
- "The post previously linked our old morning set, which has moved. Updated to the current [Morning Affirmations](/blog/morning-affirmations)."
- "The post previously quoted Philippians 4:13 without noting a translation, and slightly mis-worded it. Corrected, with the translation (NIV) now noted."

Format — blockquote form (rendered as the left-bordered italic box):

```
> Correction: This collection previously said affirmations could
> "replace" therapy for anxiety. They don't. The line now states they
> support — and never replace — care from a qualified professional.
```

Or the bold-line form, inline where the correction applies:

```
**Correction:** the earlier version cited a study we couldn't verify.
That sentence is removed; the claim below links a real, reputable source.
```

Even though `dateModified` ships, a visible, honestly-worded correction is *the* reader-facing trust signal — and on a wellbeing-adjacent (YMYL) site, a reader leaning on these words in a hard moment deserves to know what changed. Sites that log corrections are taken more seriously than sites that quietly edit.

---

## When to REPLACE (publish a new post + redirect the old)

Replace when:

- The target query has *shifted* (e.g. a dated "2021 affirmations" post now competes against a 2026-intent query)
- The angle has *changed* (the new post takes a substantially different approach — say, from a thin flat list to a real grouped collection with a "why they work" section)
- The post architecture is wrong (e.g. it was a one-paragraph dump and you need a full grouped pillar set)
- The post would require >50% rewrite to update

### How to replace

1. Write the new post's `.mdx` file at a new slug — `content/posts/<new-slug>.mdx` (do not reuse the old slug — the URL is stamped on history; the slug *is* the filename), with its own fresh `createdTime`, `lastEditedTime`, and `metaDescription`. The file existing publishes it — there's no status to set.
2. Set up a 301 redirect from the old slug to the new slug
3. Update any internal links pointing to the old slug (use `Grep` / repo-wide search across `content/posts/`)
4. Remove the old post from publication — delete `content/posts/<old-slug>.mdx` (the 301 keeps the URL alive); git history preserves the old version

### The 301 redirect

Redirects live in `next.config.js` via `redirects()`. The convention:

```js
async redirects() {
  return [
    {
      source: '/blog/old-slug',
      destination: '/blog/new-slug',
      permanent: true,
    },
  ]
}
```

301 (permanent) signals to Google that the old URL is gone and the new URL inherits its SEO equity. 302 (temporary) does not transfer equity. Always 301 for retirements.

### When NOT to replace

- The old post still ranks #1 — leave it alone, even if you'd write it differently today
- The old post is the canonical reference for inbound links you don't control (round-ups, resource lists, Pinterest pins) — leave the URL alive

---

## When to MERGE two posts

If two posts target overlapping intents (e.g. two near-identical "confidence affirmations" collections, or "anxiety affirmations" and "affirmations for anxiety" that say the same thing):

1. Pick the stronger of the two as the survivor
2. Move the unique, verified material (an extra set of well-formed lines, a clearer "how to use" section, a better-sourced "why they work") from the weaker into the survivor's `.mdx` file
3. Expand the survivor's target in the keyword brief, bump its `lastEditedTime`, run `/b-review`
4. 301-redirect the weaker's slug to the survivor's slug
5. Update any internal links that pointed at the weaker slug
6. Delete `content/posts/<weaker-slug>.mdx`

### Detecting overlap

Run a periodic audit:

- For each post in the corpus, list its primary target query (from the keyword brief / the post's intended angle)
- Group posts by that query
- Any group with > 1 post is a merge candidate

On an affirmations site, near-duplicate intents are common ("anxiety affirmations" vs "affirmations for anxiety," "money affirmations" vs "abundance affirmations") — catch these before they're written by checking the existing corpus (the `.mdx` files in `content/posts/`) for the intent first.

---

## When to SUNSET (delete and 410)

Sunset when:

- The topic is genuinely irrelevant to the site's current direction (e.g. a stale novelty/joke post like a "disappointing affirmations" bit that draws nothing and fits nothing)
- The post is harming the site's quality profile (thin, off-topic, or built around a claim you can't make trust-compliant)
- The URL has no inbound links worth preserving

### How to sunset

1. Confirm no internal links point to the slug (search `content/posts/`)
2. Delete `content/posts/<slug>.mdx`
3. Either:
   - Return HTTP 410 Gone (preferred for content that should be deindexed quickly)
   - Or 301 to the closest topical post — usually a relevant themed collection (preferred if there's a natural successor)

Sunsetting is rare. Most "old" posts should be updated, replaced, or merged — not sunset.

An interim option short of deletion: move the post's `.mdx` file out of `content/posts/` (e.g. into a `drafts/` folder outside the published directory) to pull it from listings while you decide. The file existing in `content/posts/` is what publishes it, so removing it from that directory hides it everywhere — useful when a post is wrong but a fix is pending. `lib/posts.ts` reads the `.mdx` files via `gray-matter`, and `app/blog/[slug]/page.tsx` reads the same files, so there's a single source to pull.

---

## The freshness model

Different content has different freshness expectations. On an affirmations site the cadence is occasion-and-event-driven:

| Content type | Re-check trigger | Calendar backstop |
|---|---|---|
| Themed affirmation collection | A weak line or a competitor pulls ahead; a claim needs re-sourcing | Every 18-24 months |
| Daily / occasion set (morning, Monday, sleep) | Lines feel stale or a stronger set ranks | Every 12 months |
| Seasonal / moment set (New Year, birth) | Its window is coming up | Yearly, 4-6 weeks before |
| Faith / scripture set | A verse or translation needs correcting | Every 18-24 months |
| Practice guide ("how to use affirmations") | A claim or method changes; a new study appears | Every 18-24 months |
| Pillar / topic hub (e.g. "self-love affirmations" hub) | A new sibling set ships under it | Every 12-18 months |

When a post is due, the orchestrator can flag it via a maintenance run that checks `createdTime` and `lastEditedTime` (and git's last-touched date on the `.mdx` file) against this model and the event/season triggers above.

---

## The maintenance run

Periodically (monthly is fine, plus a pre-season sweep), the site runs a maintenance audit:

```
For each .mdx post in content/posts/:
  - Check createdTime + lastEditedTime + git last-modified against
    the freshness model and occasion/season triggers
  - Flag seasonal/occasion posts whose window is within 6 weeks
  - Check every outbound URL for 200 status (no 404s)
  - Check every internal link (to related sets / practice guides) for resolution
  - Confirm the post is present in content/posts/ (its presence publishes it)
    or intentionally pulled
  - Re-verify headline claims (the "why they work" science, any health/money
    line) against current reputable sources — no fabricated studies
  - Confirm scripture quotes are accurate with translation noted
  - Confirm no guaranteed-outcome / replace-professional-care framing slipped in
  - Confirm every affirmation is well-formed and non-harmful
  - Confirm posts link to any newly-shipped relevant set / practice guide
  - Flag posts ranking below position 20 for the target query
  - Flag posts with declining traffic in Search Console
```

The output is a triage list. Each post gets one of the three decisions (leave / update / replace) and the corresponding action. Any post whose claim can't be sourced, whose scripture is wrong, that promises a guaranteed outcome, or that tells a reader to use affirmations *instead* of professional help, is escalated immediately.

---

## Tracking versions with a reader-facing change log (advanced)

Beyond the `lastEditedTime` stamp, for a handful of high-traffic posts where updates happen often you may want an in-body, visible change log near the bottom — plain Markdown (a sub-heading + bulleted list), reader-facing, honest:

```
What's changed
- Refreshed for 2026: swapped 8 weaker lines, added a "how to use these" section.
- Added a gentler "when anxiety spikes" sub-set.
- First published.
```

This is optional and reader-facing — not a frontmatter field. The `lastEditedTime` stamp and the git log remain the authoritative history; this in-body note is for readers who want to know the post is maintained. Reserve it for posts that get cited externally or drive significant traffic.

---

## Redirect hygiene

Over time the redirects pile up. Rules:

- Never redirect a redirect (A → B → C). Update the A redirect to point directly to C.
- Audit redirects quarterly. Remove redirects for slugs that have been gone for > 2 years and have zero referrer traffic.
- Never repurpose a slug. If `/blog/affirmations-for-anxiety` was once a thin list and is now a full collection at the same URL that's fine — but never point an old slug at unrelated content; Google notices the bait-and-switch.

---

## What kills update discipline

- **Faking freshness by bumping `lastEditedTime` without changing content** — Google and readers notice the dishonesty over time (a fresh `dateModified` won't hide a stale post)
- **Forgetting to bump `lastEditedTime` after a real update** — `dateModified`/`og:modifiedTime` then misreport the post as untouched; set it on every meaningful edit
- **Leaving 404s on outbound links** — reference sites move; the maintenance run catches them
- **Letting an overclaimy or unsourced claim sit** — the moment a "why they work" line can't be sourced, or a manifestation line promises an outcome, or a wellbeing line should point to real help and doesn't, fix it; on a YMYL topic a reader trusting these words deserves accuracy
- **Missing the seasonal/occasion window** — a New Year set refreshed in February is wasted; do the pass before the window
- **Not re-linking to new sets/guides** — when a related collection ships, the posts that should point to it are orphaned value
- **Sunsetting posts without redirects** — every dead URL is wasted SEO equity
- **Duplicate intent across posts** — kills both, since neither concentrates ranking signals (very common with affirmation near-synonyms)
- **Never updating anything** — the corpus rots quietly

---

## Pre-update checklist

- [ ] Decision (update / replace / merge / sunset) is correct for this post
- [ ] If updating, all changes are substantive (not cosmetic)
- [ ] `lastEditedTime` frontmatter bumped to current ISO timestamp (feeds `dateModified`/`og:modifiedTime`) + clear git commit
- [ ] Canonical edit made by editing `content/posts/<slug>.mdx` directly
- [ ] Post present in `content/posts/` (its presence publishes it) or intentionally pulled
- [ ] If a seasonal/occasion post, refreshed ahead of its window
- [ ] Every affirmation is well-formed and non-harmful
- [ ] Any newly-cited fact verified against a reputable source (no fabricated studies)
- [ ] Scripture quoted accurately with translation noted (faith sets)
- [ ] No guaranteed-outcome / replace-professional-care framing
- [ ] Correction note (Markdown blockquote or bold "Correction:" line) added if a previous claim was corrected
- [ ] New citations added as inline links
- [ ] Internal links updated to any newly-shipped related set or practice guide
- [ ] If replacing, new slug differs from old slug, with its own fresh `createdTime`
- [ ] If replacing, 301 redirect configured
- [ ] If replacing/merging, internal links to old slug have been updated
- [ ] `/b-review` run on the updated post

---

**blogOS** — content compounds when you maintain it.
