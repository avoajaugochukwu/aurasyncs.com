---
name: title-meta-slug
description: The title artifacts every aurasyncs.com post has and how each one is different. In this project the `title` frontmatter field is BOTH the on-page H1 AND the meta title (one field), `metaDescription` is the SERP snippet (150–160), and `excerpt` is the on-page hook — they are SEPARATE frontmatter keys. The slug is the `.mdx` filename and is permanent. Lazy writers paste the same string everywhere; real writers tune the `title` for the SERP, write a distinct `metaDescription` that earns the click, and a warm `excerpt` that hooks the reader.
---

# Title, Meta, Slug — the artifacts

> On most sites the H1 and the meta title are separate fields. On **aurasyncs they collapse**: the `title` frontmatter field does double duty as the H1 *and* the meta title. But the description does NOT collapse — `metaDescription` (the SERP snippet, 150–160 chars) and `excerpt` (the on-page hook) are **separate frontmatter keys**. Treat each piece with its own rules, knowing the `title` is doing two jobs at once.

---

## The artifacts at a glance

| Artifact | Lives in (frontmatter key) | Doubles as | Max length | Purpose |
|---|---|---|---|---|
| **Title** | `title` | On-page H1 **and** SERP/`<title>` meta title | ≤ 60 chars | The heading the reader sees AND what Google shows in results |
| **Meta description** | `metaDescription` | SERP snippet only | 150–160 chars | The snippet under the title in search results |
| **Excerpt** | `excerpt` | On-page hook / dek only | ~1–2 sentences | The warm orienting line on the page (not the SERP) |
| **URL slug** | the `.mdx` filename (`content/posts/<slug>.mdx`) — no `slug` frontmatter field | — | ≤ 60 chars | The permanent URL |

There is **no separate `metaTitle` or `ogTitle` key** — the route derives `<title>`, canonical, and the Open Graph / Twitter title from `title` + `metaDescription` (both auto-emitted). Don't look for one; the single `title` field is both surfaces. The featured image is the `featuredImage` frontmatter key (`/blog/<slug>.webp`). There is **no `dateModified` key** — but `lastEditedTime` feeds `dateModified`/`og:modifiedTime`, and `createdTime` is the publish date.

> One existing-content gotcha: several live posts have a `metaDescription` of only ~100 chars (truncated). When you touch any post, lengthen it to the full 150–160 band — see the `metaDescription` rules below.

---

## The title (H1 + meta title in one)

Because one property is both surfaces, the title has to satisfy two readers at once: the searcher scanning the SERP, and the person who just landed on the page looking for affirmations.

### Rules

- **≤ 60 chars** — longer wraps badly on mobile and Google truncates the SERP title around 60. This is the binding constraint since the property is also the H1.
- **Front-load the target query** — the keyword goes near the start (good for the SERP) while still reading naturally and warmly (good for the lander).
- **No brand suffix** — do **not** append `| AuraSyncs`. There is no separate meta title to brand, and the suffix eats your 60-char budget.
- **Title Case or sentence case** — pick one for the site and stay consistent.
- **A modifier that signals what's inside** is welcome when it fits in 60 chars — a count (`25+`, `40+`, `365`), an audience (`for Women`, `for Kids`), or a payoff (`to Calm Your Mind`, `to Build Self-Esteem`).
- **Match the slug and `metaDescription`** — all three describe the same page and share the query.
- **Stay warm.** This is AuraSyncs' warm, empowering, plain voice. "Affirmations for Anxiety: 25+ Calming Phrases to Quiet Your Mind" reads friendlier than "Anxiety Affirmation Compendium: A Methodology".

### Title patterns by content type

#### Pattern A — Themed affirmation collection ("Affirmations for X")
```
Affirmations for Anxiety: 25+ Calming Phrases to Quiet Your Mind
Affirmations for Confidence: Unlock Your Inner Power
Self-Love Affirmations to Build Confidence and Worth
```

#### Pattern B — Daily / occasion set (time-anchored)
```
365 Daily Affirmations: A Year of Empowering Words
Morning Affirmations to Transform Your Day
Friday Affirmations to End Your Week Strong
```

#### Pattern C — Faith / scripture set
```
Bible Affirmations: 30+ Verses to Strengthen Your Faith
I Am Affirmations from the Bible: Declare Your Identity in Christ
```

#### Pattern D — Practice guide (how it works / write your own / manifestation)
```
Do Affirmations Really Work? A Beginner's Guide
Manifestation Affirmations for Beginners: How to Start
How to Write Your Own Affirmations That Actually Stick
```

#### Pattern E — Audience- or tone-tuned variant (modifier on A/B)
```
Affirmations for Men: Confidence, Success, and Strength
Daily Affirmations for Kids: Positive Self-Talk That Sticks
Funny Affirmations to Brighten Your Day
```

#### Pattern F — Pillar (topic hub)
```
Positive Affirmations: The Complete Guide to Daily Practice
```

### Title anti-patterns

- Stuffing: "Affirmations Anxiety Calm Positive Affirmations for Anxiety Mantras"
- All caps: "STOP THE PANIC — SAY THESE AFFIRMATIONS NOW"
- Vague: "Some Thoughts on Feeling More Positive"
- Brand-first or brand-suffixed: "AuraSyncs: Affirmations for Anxiety" or "… | AuraSyncs" — no brand in the title at all.
- Over 60 chars (the audit catches this — it truncates the SERP title and bloats the H1).
- An H1 inside the body — the `title` frontmatter already renders the page H1, so use `##`/`###` in the body; a stray `#` H1 maps to `<h2>` anyway (no `#` H1 in the body).
- A claim the post can't deliver, or one that over-promises an outcome ("Affirmations That Guarantee You'll Get Rich" — never guarantee a result; see `accuracy-and-trust-skill.md`).

### When to iterate the title

If a post ranks but doesn't get clicked, the title is the lever (it is your only SERP title). Try: adding a modifier (`25+`, `to Calm Your Mind`), restating a question as a claim or vice versa, or front-loading the query harder. Track CTR in Search Console.

---

## The meta description (the `metaDescription` frontmatter key)

`metaDescription` is emitted as the meta description and shown as the SERP snippet under the title. It doesn't directly rank, but it drives click-through — so it has to sell the click in 150–160 characters.

### Rules

- **150–160 chars** — Google truncates around 155 on desktop; aim for the upper band to use the space, but don't blow past 160. **Many existing posts sit at ~100 chars — fix those up to the full band when you touch them.**
- **Active verb in the first half** — "Calm a racing mind with 25+ affirmations for anxiety…" not "This article covers…".
- **Target query appears once**, naturally.
- **Specific, not abstract** — name the payoff: how many affirmations, how they're grouped, how to use them, the audience.
- **No HTML, no Markdown** — plain text only.
- **Stands alone** — it should make sense in the SERP without the title above it.
- **Distinct from `excerpt`** — these are different frontmatter keys shown in different places; don't paste the same string into both.
- **No guaranteed-outcome language** — for money/manifestation/health, describe the practice, never promise the result.

### Meta description patterns

#### Pattern A — Themed collection
```
Calm a racing mind with 25+ affirmations for anxiety, grouped by what you're feeling. Learn how to use them, why they help, and when to reach for extra support.
```

#### Pattern B — Daily / occasion set
```
Start every day with 365 daily affirmations, one for each morning of the year. Short, warm, and easy to say, with simple ways to build them into a real routine.
```

#### Pattern C — Faith / scripture set
```
Strengthen your faith with 30+ Bible affirmations, each paired with a cited verse. Declare God's promises over your life with scripture you can return to daily.
```

#### Pattern D — Practice guide
```
Do affirmations really work? Here's what the psychology actually says, how to write affirmations you believe, and how to practice them without expecting magic.
```

### Meta description anti-patterns

- Starts with "In this article, we will…".
- Duplicates the title verbatim (wastes the snippet).
- Generic: "Learn everything about positive affirmations."
- Promises something the post doesn't deliver, or guarantees an outcome.
- Under 150 or over 160 chars (the most common real fault on this site is *under* — those ~100-char descriptions).

---

## The excerpt (on-page hook)

The `excerpt` is the warm 1–2 sentence hook shown on the page (and in post listings), *not* the SERP snippet. It's where AuraSyncs' warm, empowering voice gets to shine — encouraging, inclusive, never salesy.

### Rules

- **1–2 sentences**, friendly and inviting.
- **Talk to the reader** ("you", "your"). Warm and steady, never hype.
- **Include the primary keyword once**, naturally.
- **Don't just repeat the `metaDescription`** — this one can be warmer since it's read on-page, not in a results list.
- **Write one** — a good hook lifts on-page engagement.

Example for "affirmations for anxiety":

> "When your mind is racing, the right words can be an anchor. These affirmations for anxiety are grouped by what you're feeling, so you can find one that fits the moment and breathe a little easier."

---

## The URL slug

The slug **is the `.mdx` filename** — `content/posts/<slug>.mdx` resolves to `/blog/<slug>`. There is **no `slug` frontmatter field**; you set the slug by naming the file. The slug is **permanent** — changing it (renaming the file) after publish requires a 301 redirect and loses some SEO equity. Get it right the first time.

### Rules

- **Kebab-case:** `affirmations-for-anxiety-finding-peace-inner-calm`, never `Affirmations_For_Anxiety` or `affirmationsForAnxiety`.
- **Front-load the keyword:** `money-affirmations-for-financial-abundance` not `attract-wealth-the-easy-way`.
- **Drop stop words unless load-bearing:** `morning-affirmations-for-women` beats `the-best-affirmations-to-say-each-morning`. Keep words that change meaning or are part of the query.
- **No dates** — keep the slug evergreen and update the body over time (currency is tracked via `lastEditedTime`, not the slug).
- **No numbers** unless the number is core (`365-daily-affirmations-year-of-empowering-words` — the count *is* the query).
- **No filler suffixes** in general (`-article`, `-post`) — but a short descriptive tail (`-calm-your-mind`, `-for-financial-abundance`) is fine and is used across this site to disambiguate.
- **No leading/trailing hyphens. All lowercase. Under 60 chars** ideally, under 80 max. (Some real slugs run long — `chakra-affirmations-balance-your-energy-centers-for-healing-and-harmony` — keep new ones tighter where you can.)

### Slug patterns by content type

| Content type | Slug pattern | Example |
|---|---|---|
| Themed collection | `affirmations-for-<need>` (+ descriptive tail) | `affirmations-for-anxiety-finding-peace-inner-calm` |
| Themed collection (need-first) | `<need>-affirmations-<payoff>` | `money-affirmations-for-financial-abundance` |
| Daily / occasion set | `<time>-affirmations-<payoff>` | `morning-affirmations-to-transform-your-day` |
| Daily set (count) | `<count>-daily-affirmations-<theme>` | `365-daily-affirmations-year-of-empowering-words` |
| Faith / scripture set | `bible-affirmations-<theme>` / `i-am-affirmations-from-the-bible` | `bible-affirmations-verses-faith` |
| Practice guide | `manifestation-affirmations-for-beginners` / `how-affirmations-work` | `manifestation-affirmations-for-beginners` |
| Audience-tuned | `<base>-for-<audience>` | `positive-affirmations-for-teens-boosting-confidence-and-self-worth` |
| Pillar (hub) | `<topic>` (root term) | `positive-affirmations` |

### When to change a slug

Almost never. If you must:

1. Rename the `.mdx` file in `content/posts/` (the filename *is* the slug).
2. Add a 301 redirect from old to new in `next.config.js`.
3. Update all internal links from old slug to new slug (grep `content/posts/` for the old `/blog/<slug>` Markdown link).
4. Update the sitemap.

Cost of a slug change: 1–3 months of partial ranking dilution. Don't do it casually.

---

## Target query placement

The target query should appear in:

1. **`title`** (verbatim or close, front-loaded — covers both the H1 and the meta title).
2. **`metaDescription`** (once, naturally — the SERP snippet).
3. **Slug** (the filename — verbatim or close, front-loaded).
4. **First paragraph** of the body — i.e. the answer **blockquote** (`> …`, within the first ~100 words).
5. **At least one `##` heading** (verbatim or close).
6. **`featuredImage` alt / inline image alt or surrounding text** (naturally, if it fits).

Do this naturally; don't stuff. If the query is "affirmations for anxiety" and a `##` heading reads "How to use these affirmations for anxiety," that repetition is fine.

---

## Brand placement

- **Site name** in `title`: no — there is no separate meta title to carry it.
- **Site name** in the slug (filename): no.
- **Site name** in `metaDescription`/`excerpt`: only if it genuinely adds warmth or credibility. Usually skip it.

---

## Reuse and consistency

Across the site:

- **Capitalization consistency** — pick title case or sentence case for titles and stick to it.
- **Slug pattern consistency** — within a content type, slugs follow the same pattern (see the table).
- **Query consistency** — the `title`, `metaDescription`, and slug all describe the same page and share the target query.
- **Voice consistency** — warm, empowering, inclusive, plain (~grade 7); no stiff or salesy language (see `protocols/site-voice-profile.md`).

---

## The audit

The pre-publish audit checks the four artifacts:

- [ ] **`title`** set, ≤ 60 chars, includes the target query, no brand suffix, no H1 duplicated in the body.
- [ ] **`metaDescription`** set, 150–160 chars (lengthen any ~100-char description), includes the target query, no "in this article" preamble, not a verbatim copy of the `title`, no guaranteed-outcome language.
- [ ] **`excerpt`** set as a warm on-page hook, distinct from `metaDescription`.
- [ ] **Slug** kebab-case, no dates, front-loaded query; *is* the `content/posts/<slug>.mdx` filename (no `slug` frontmatter field).
- [ ] All artifacts include the target query (verbatim or close paraphrase) and describe the same page.
- [ ] No phantom keys relied on (no separate `metaTitle`/`ogTitle`, no `slug` field, no `dateModified`) — use `title`, `metaDescription`, `excerpt`, the filename slug, `featuredImage`, `createdTime`/`lastEditedTime`.

---

**BlogOS** — get the artifacts right, earn the click.
