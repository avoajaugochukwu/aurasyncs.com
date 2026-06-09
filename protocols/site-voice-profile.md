# Site Voice Profile — Per-Site Voice Lock for BlogOS

## What it is

A `voice_profile.md` is a per-site artifact that captures **audience-specific voice rules the BlogOS writer must preserve verbatim**. It lives at:

- `research/voice_profile.md` — the Aurasyncs site-wide lock.

It is picked up by `/b-write` as a `SITE VOICE LOCK` block in the writer prompt.

It exists because **BlogOS is generic by design** — anti-AI-slop, scannability cadence, E-E-A-T patterns, conclusion shapes — and the writer runs with zero memory. Without a voice profile, the writer will apply generic patterns even when the site has earned a specific voice that the pack would otherwise flatten.

A voice profile is the site's answer to: *"BlogOS, here's what's load-bearing about how this audience hears us. Touch the rest, but not this."*

For an affirmations site this matters more than usual, because the reader often arrives in a tender state (anxious, grieving, low on confidence, hopeful about money or faith). The wrong register — too clinical, too hype, too guru — loses them in a sentence.

---

## When to build one

Build a voice profile **when the site has a non-obvious voice signal** that generic BlogOS would damage. Trigger conditions:

### 1. Demographic or emotional-state outlier
The reader base arrives in a specific emotional state, or skews to a specific audience (e.g. women, men, kids, teens, new mothers, a faith community). Generic punch-ups assume a generic, neutral reader. Affirmation readers are rarely neutral.

### 2. Comment / email / search-query scrape reveals a load-bearing identity frame
Pull the top reader comments, emails, or the actual search queries hitting the site. Look for:

- First-person statements of why they searched ("I can't sleep", "I'm trying to love myself again", "I want to manifest a better job", "I need God's word over my anxiety")
- Repeated life-situation references (a hard Monday, 2am anxiety, postpartum, a money crisis, a faith season)
- Vocabulary patterns from a specific community (Christian, manifestation/Law-of-Attraction, recovery, parenting)
- Explicit gratitude for a value the site provides ("finally affirmations that don't feel fake")
- Frustration arcs the audience shares ("every affirmation list is the same 50 lines", "these feel like lying to myself")

### 3. Existing post performance reveals voice patterns that win
If certain framings produce higher engagement, codify them. If `/b-review` keeps trimming a phrase you keep wanting back, that phrase is voice-locked.

### 4. The site has an explicit editorial stance
Aurasyncs has one: warm, honest, never-fake positivity — affirmations that meet the reader where they are, with a believability ladder rather than denial. That stance needs to be load-bearing in the voice.

**Skip if:** the site is generic / broad-audience with no signature voice. Aurasyncs is not generic — it has a strong editorial voice, so it warrants a profile (provisional until backed by reader data).

---

## The canonical structure (6 sections, in order)

A voice profile is short — under 400 lines, often closer to 250. Long enough to be load-bearing, short enough to inject whole into a writer prompt.

### Section 1 — The audience identity sentence

Open with one sentence — the most important in the document — that names the audience as a specific *kind of person in a specific moment*, not a content cohort. Lead with what they feel/want/struggle with, not what they read.

**Generic / wrong:**
> "The audience is people interested in affirmations."

**Specific / right:**
> "The audience is someone reaching for affirmations at a low or hopeful moment — lying awake anxious, trying to rebuild self-worth, wanting the right words over their money worries or their faith — who is tired of interchangeable lists and of affirmations that feel like lying to themselves, and who wants warm, believable words that meet them where they actually are."

Follow with 3-5 lines quantifying the signal (search-query data, comment-scrape hit rates, demographics) so the claim has receipts.

### Section 2 — The N voice rules

Numbered list. 5-8 rules. Each rule:

- **Rule name** in bold (one short phrase)
- 1-2 sentences explaining the mechanic
- One ❌ counter-example and one ✅ exemplar

The rules should cover: how to address the reader (a warm friend? a steady guide?), vocabulary expectations (spiritual/faith/clinical terms welcomed or kept plain?), tonal register (warm, encouraging, never hype or guru), what to validate vs. gently challenge ("these feel fake" → ladder them), any explicit value line to say out loud ("pick the two or three that feel true today"), and friction points NOT to smooth away (honesty that affirmations aren't magic).

### Section 3 — Canonical reader quotes

8-15 verbatim quotes from comments, emails, reviews, or search queries that show the audience in their own words. The receipts.

### Section 4 — Touchstone library (when applicable)

The reassuring, honest facts the audience wants to hear and the discouraging myths to gently correct. For an affirmations site: that affirmations work best repeated with attention and laddered to be believable; that they support but don't replace real care; the myth that you must already believe an affirmation for it to "count" (replace with the ladder); the myth that manifestation makes things appear (replace with focus + action). Dropping a correct, encouraging version of something they half-believe is a trust win.

### Section 5 — Anti-patterns

Two-column table: **Don't / Why**. The phrasings that specifically kill *this site's* audience. Generic anti-patterns (em dashes, fake stats) belong in BlogOS, not here.

| Don't | Why |
|---|---|
| Use guru / "the universe is listening" mysticism as filler | The reader came for steady warmth, not a performance. It reads as fake and erodes trust. |
| Hand a struggling reader a denial affirmation ("I am never anxious") | It asks them to lie to themselves and confirms the "these feel fake" fear. Ladder it instead. |
| Promise an outcome ("say this and money/healing comes") | A broken promise to a vulnerable reader is the one failure this site can't afford. |

### Section 6 — Whitelist (recommended)

The preferred outbound sources. For an affirmations site: peer-reviewed psychology and reputable mental-health bodies (APA, NIH/NIMH, university psychology departments) for the science; a reputable Bible reference (translation named) for scripture; recognized practitioners (Louise Hay, etc.) attributed *as cultural sources, not scientific authority*. Plus a blacklist: content-farm "manifest your dream life in 24 hours" pages, sites citing studies that don't exist, and anything promising a guaranteed cure or windfall.

---

## How it's consumed

`/b-write` picks up the voice profile per post:

1. Reads the brief
2. Looks for `research/voice_profile.md`
3. If found, injects the full file as a `===SITE VOICE LOCK===` block in the writer prompt
4. The writer treats the lock with the same protection as the trust gate — do not paraphrase, do not strip voice-locked language, even when a generic rule would flag it

Without a profile, the writer behaves with pack-only voice. The system is opt-in.

---

## How to bootstrap one

1. **Reader data first.** If you have analytics: GA4 demographics, GSC top queries hitting the site, email replies, comments. For a new site without data: build from the *intended* audience, mark it provisional, refine after 90 days of real data.
2. **Quantify signals.** Run pattern passes for repeated phrasings, life-situation references, audience markers (faith, parenting, recovery), frustration markers ("these feel fake"), gratitude markers ("finally…"). Record hit rates.
3. **Draft the 6 sections.** Identity sentence first, then voice rules, quotes, touchstones, anti-patterns, whitelist.
4. **File at `research/voice_profile.md`.** `/b-write` picks it up on the next run.
5. **Re-scrape quarterly.** Audiences drift.

---

## What NOT to put in a voice profile

- **Factual constraints** about specific topics — those go in the per-post brief
- **Structural rules** (heading skeleton, length, hook formula) — BlogOS pack territory
- **Title / meta / slug rules** — `title-meta-slug-skill.md`
- **Generic SEO best practices** — `seo-and-schema-skill.md`
- **The accuracy & trust gate** — `accuracy-and-trust-skill.md` (the *voice* profile says how we sound; the *trust* gate says what's safe and true)

A voice profile is exclusively about **phrasings and identity frames the writer would otherwise damage**.

---

## Existing voice profiles

- `research/voice_profile.md` — aurasyncs.com, site-wide (warm, honest, never-fake positivity; affirmations that ladder rather than deny; ~grade 7; author byline "Ugo Charles"). **Provisional** until backed by real reader data.

Add new ones here as they're built.

---

## When to skip voice profiles

For a brand-new site with no audience data yet, the profile is provisional. Better to ship 5-10 posts with the pack-only voice, observe what resonates, then build from real signals. Premature voice locking can lock in the writer's idea of the audience rather than the actual audience. Aurasyncs already has a strong editorial stance, so a provisional profile is worth keeping — just revisit it once GSC and reader data accrue.

---

**BlogOS** — voice that survives the writer.
