---
name: eeat-signals
description: Experience, Expertise, Authoritativeness, Trustworthiness — the four signals Google uses to judge whether a page deserves to rank. This skill codifies the concrete on-page elements that demonstrate E-E-A-T for a positive-affirmations blog: the "Ugo Charles" author byline (rendered AND emitted in BlogPosting JSON-LD as the author Person), the publisher signal (Organization "Aurasyncs.com" in the same schema), affirmations that are well-formed and non-harmful, science/health claims traced to peer-reviewed psychology / mental-health orgs / .edu sources, scripture quoted accurately with the translation named, first-person experience markers, keeping content current (the `lastEditedTime` frontmatter feeds `dateModified`; tracked alongside git history), named source citations, and responsible YMYL framing (mental-health-not-medical-advice, no guaranteed-outcome manifestation).
---

# E-E-A-T Signals — the trust layer

> E-E-A-T is not a ranking algorithm. It is the framework Google's human Quality Raters use to evaluate pages, and the algorithm tries to approximate their judgment. So E-E-A-T is real, even though it is not a number.

Every post on this site has to prove four things before it deserves to rank:

1. **Experience** — has the author actually practiced the thing they are writing about (used the affirmations, kept the morning routine, prayed the scripture, watched their own self-talk shift)?
2. **Expertise** — does the author know the field (what makes an affirmation work, the real science of self-affirmation, the correct verse and translation)?
3. **Authoritativeness** — is the site a recognized voice in this space?
4. **Trustworthiness** — is the page honest, current, accurate, and responsible about wellbeing?

This skill is the checklist of on-page elements that make those four claims visible. Without them, the post is a faceless wall of text and Google has no reason to rank it over the thousand other walls of text on the same topic.

For an affirmations blog, the single highest-leverage trust signal is **well-formed, non-harmful affirmations + sourced claims**: the internet is full of "50 affirmations for X" pages that hand the reader malformed lines (future-tense, negation-framed, unbelievable), repeat fabricated "studies show 90%…" statistics, and misquote scripture. A page whose affirmations are first-person, present-tense, believable and safe — and whose science (self-affirmation theory, positive self-talk) traces to the APA, NIH, a peer-reviewed study, or a `.edu`, and whose verses are exact with the translation named — is doing something most competitors don't bother to.

---

## YMYL — when E-E-A-T matters most

Google holds "your money or your life" topics to a higher bar. YMYL topics include:

- Financial advice
- Medical / mental-health information
- Legal information
- News and current events
- Civic information (voting, government)

**An affirmations blog sits adjacent to YMYL — and several of its core topics are squarely inside it.** Affirmations touch **mental health** (anxiety, depression, grief, sleep), **faith** (Bible/Christian/chakra), and **money** (abundance, manifestation). That means trust signals matter *more* here, not less. The bar is met by **well-formed, non-harmful affirmations + true science cited to a mental-health org / study / .edu + scripture quoted exactly with the translation named + a light mental-health note where the topic is clinical + the "Ugo Charles" byline + content kept current** — and by never promising a guaranteed money or healing outcome.

**The real-stakes corners that raise the care bar:**

- **Clinical mental-health topics** — anxiety, depression, grief, panic, weight, addiction. Add a light, non-alarmist note that affirmations *support* but do not *replace* professional care, and never use denial framing ("I am not depressed") that asks a struggling reader to pretend their experience away. (See `accuracy-and-trust-skill.md`.)
- **Faith / scripture** — any quoted verse must be exact, the reference correct, and the translation named (NIV/ESV/KJV/NLT). Don't bend a verse to fit a theme.
- **Money / manifestation** — frame abundance and Law-of-Attraction content as mindset practice, never as a guaranteed outcome; attribute Law of Attraction / Louise Hay as cultural sources, not science. (See `research-and-citation-skill.md`.)

Everything else skates by on the ordinary trust signals — but because most of this blog's topics touch one of these corners, the responsible-claims discipline is in play more often than not.

---

## The on-page signals (mandatory)

### Signal 1 — Author byline ("Ugo Charles")

Every post displays an author in the post header. The blog route (`app/blog/[slug]/page.tsx`) renders a visible byline alongside the published date, and emits `BlogPosting` + `BreadcrumbList` JSON-LD, canonical, OG, and Twitter metadata. In the `BlogPosting`, the byline is emitted as the `author` Person and the publisher as an Organization ("Aurasyncs.com") — so the byline is **machine-readable**, not just visible.

On aurasyncs the byline is a **real author name**, not a brand persona. The `author` frontmatter field defaults to **"Ugo Charles"**, which the route renders as the visible byline and emits as the schema `author`:

```
author: Ugo Charles   # the default byline on every post
```

**Rule:** never publish under "Admin" or "Staff" or a random handle. "Ugo Charles" is the consistent author byline for this site — a real person who writes and reviews the affirmation content to a consistent editorial standard (well-formed affirmations, sourced science, accurate scripture, responsible framing). If a specific guest contributor ever writes a post, name them in the `author` frontmatter; otherwise it stays "Ugo Charles."

### Signal 2 — Brand/editorial standard at footer

At the bottom of every post, the editorial standard should be visible (a short "About AuraSyncs" / editorial-note block):

- The AuraSyncs name and the "Ugo Charles" byline
- A 60–120 word note on what AuraSyncs is and how its affirmation content is made
- One link: to the About page
- Social links if applicable

Editorial-note rule: the note should make the *specific* claim that makes AuraSyncs qualified to publish *this* kind of content. Generic notes ("AuraSyncs writes affirmations") are inert. Specific notes ("Every AuraSyncs affirmation is written to be first-person, present-tense and believable; every science claim is checked against the APA or a peer-reviewed study; every Bible verse is quoted exactly with the translation named; and we never promise a guaranteed outcome") carry weight.

### Signal 3 — About / publisher page

The site has an About page (treat this as the site convention) that backs the author byline. It is a high-E-E-A-T artifact in its own right and contains:

- What AuraSyncs is and who it's for (anyone seeking affirmations for self-love, anxiety, confidence, abundance, faith, sleep, work, and life moments)
- The editorial standard: affirmations written to be well-formed and non-harmful, science checked against mental-health authorities, scripture quoted exactly with translations named, manifestation framed as mindset practice
- Links to the main hubs (the affirmations index, key practice guides)
- Contact info
- Social profiles
- A clear statement of scope ("AuraSyncs offers affirmations as a supportive wellbeing practice; it is not a substitute for professional mental-health care. If you're struggling, please talk to a doctor or licensed therapist.")

Schema note: the route **does** emit a `BlogPosting` whose `publisher` is an Organization ("Aurasyncs.com") and whose `author` is a Person, plus a `BreadcrumbList`, canonical, OG, and Twitter metadata — all auto-generated from the post's frontmatter. So the publisher and author trust signals are machine-readable. Don't hand-author JSON-LD, and don't say "no schema ships." (`FAQPage`/`HowTo` are not emitted — keep any FAQ in the body prose.)

### Signal 4 — Well-formed affirmations & true, sourced claims (the trust spine for this site)

This is the heaviest E-E-A-T signal for an affirmations blog. **Every affirmation in a post must be well-formed and non-harmful, and every science/health/scripture claim must be true and traceable** before publish. The verification chain is:

- **The affirmations** — every line the reader is meant to repeat must be first-person, present-tense, positively framed (state what *is* wanted, not what is feared), and believable enough that the reader can say it without their mind rejecting it (see `affirmation-craft-skill.md`). "I am calm and capable" works; "I will not panic" plants the very word it fights. And nothing harmful: no denial framing for someone in real distress, no toxic positivity, no guaranteed-outcome money/healing promise.
- **The facts** — any science claim (self-affirmation theory, positive self-talk, neuroplasticity), any cited study or statistic, and any health note must trace to **peer-reviewed psychology, a reputable mental-health organization (APA, NIH/NIMH), or a university psychology department (`.edu`)** — not a content-farm "the science of manifestation" blog. No fabricated "studies show 90%…" numbers, ever.
- **The scripture** — every verse must be quoted exactly, the reference correct, and the translation named (NIV/ESV/KJV/NLT), verified against a reputable Bible source.

See `accuracy-and-trust-skill.md` for the full **accuracy & trust gate**. In short: every affirmation is well-formed and safe, every science claim is checked against an authoritative source, every verse is exact with its translation named, and every clinical topic carries a light mental-health note — and a malformed/harmful affirmation, a fabricated statistic, a misquoted verse, or a guaranteed-outcome promise is a **publish blocker**. The post does not ship until it's fixed.

When an effect genuinely varies (belief level, consistency, whether affirmations are paired with action or therapy), say so rather than asserting one universal "this works":

> Affirmations aren't magic, and they work differently for different people. Research links positive self-talk and self-affirmation to lower stress for many people, but the effect depends on saying them consistently, believing them enough to mean them, and pairing them with real action. Think of them as a supportive daily habit — not a switch that fixes everything overnight.

Honest "here's what it can and can't do" framing is itself a trust signal, and it is exactly what AI-slop affirmation sites never do.

### Signal 5 — Keeping content current (the `lastEditedTime` currency signal)

Every post carries a `createdTime` (the publish date the route renders in the header) and a `lastEditedTime` in its frontmatter. **`lastEditedTime` feeds `dateModified` in the `BlogPosting` JSON-LD and `og:modifiedTime`** — so a post's currency *is* machine-readable. Keep `lastEditedTime` accurate when you make a substantive edit.

Track currency by:

- **The `lastEditedTime` frontmatter** — bump it to the edit date when you make a substantive change; the route emits it as `dateModified` and `og:modifiedTime`. `createdTime` stays the original publish date.
- **Git history** — substantive edits (re-checking a science claim, correcting a verse, adding the mental-health note, adding internal links) are also captured in the commit log, a second record of when a post changed.

```yaml
createdTime: 2026-06-06T00:00:00.000Z      # the publish date the post surfaces
lastEditedTime: 2026-06-08T00:00:00.000Z   # feeds dateModified / og:modifiedTime — bump on substantive edits
```

Rule: a *substantive* change is correcting a science claim, fixing a misquoted verse, adding or strengthening the mental-health note, reworking a section, or adding internal links — not fixing a typo. Bump `lastEditedTime` for substantive changes (and let git history back it up).

### Signal 6 — First-person experience markers

This is the "Experience" letter in E-E-A-T, added in Google's December 2022 update specifically to push back against AI-generated theoretical content.

Where it applies, mark first-person experience in the prose:

- "I kept these three morning affirmations on a sticky note by my mirror for a month — saying 'I am steady and ready for today' out loud before checking my phone genuinely changed how the mornings felt."
- "When my anxiety spiked before a presentation, 'I am calm, I am prepared' worked better for me than 'don't be nervous,' which only made me think about being nervous."
- "I tried writing my own gratitude affirmations instead of copying a list, and the ones in my own words were the only ones I actually believed enough to repeat."
- "Praying Philippians 4:13 each morning during a hard season gave me something concrete to come back to."
- "I noticed the present-tense ones ('I am enough') landed, while the future-tense ones ('I will be enough someday') always felt out of reach."

Generic prose:
> "Affirmations can help reduce stress by changing your self-talk."

First-person prose:
> "I was skeptical that saying 'I am enough' to a mirror would do anything — but doing it every morning for two weeks, I noticed I was kinder to myself by default. It didn't fix everything, but it shifted the baseline."

The second version is the same idea, but it has *experience* in it. Google's HCU classifier is built to detect the difference.

**Constraint:** never fabricate experience. If the affirmations weren't actually practiced, don't claim they were. And never invent a "this cured my depression" testimonial — that's both a fabricated experience and a YMYL trust violation. Better to cite a recognized researcher or mental-health org by name than to invent a fake "I tried this and it healed me."

### Signal 7 — Named source citations

Every practice guide, explainer, and any collection that asserts a science or health claim cites at least two named, authoritative sources for its facts. Full citation:

> Self-affirmation theory, developed by psychologist [Claude Steele](URL), holds that affirming core values can buffer people against threats to their sense of self. (source)

> The [American Psychological Association](URL) describes positive self-talk as a tool for managing stress and building resilience. (source)

Citation rule: **source + publication + linked reference** (and **translation named** for any scripture). Anything less is contraband.

Go to the primary source — the peer-reviewed study, the mental-health org, the reputable Bible reference — wherever possible. Quoting a manifestation blog that paraphrases a study is two steps removed and is exactly how fabricated "statistics" spread.

### Signal 8 — Primary-source citations

E-E-A-T's "trustworthiness" letter. The post links to ≥ 3 primary or reputable sources (more for pillars and practice guides). Strong sources for affirmation content are:

- **Peer-reviewed psychology and named researchers** (Claude Steele's self-affirmation theory; Cohen & Sherman reviews) for *why* affirmations can help
- **Reputable mental-health organizations** (APA, NIH/NIMH) for stress, self-talk, and wellbeing claims
- **University psychology / behavioral-science `.edu`** pages for research and teaching material
- **Reputable Bible references with the translation named** (Bible Gateway, recognized NIV/ESV/KJV publishers) for scripture
- **Reputable health references** (Mayo Clinic, Harvard Health) for general wellbeing context

What does **not** count as primary:

- Pinterest, generic "manifestation" blogs, and "50 affirmations" listicles
- A competitor's affirmation page (write and verify your own)
- AI-generated summaries
- Reddit, Quora, Medium (useful for audience voice in research — not as a fact source)
- Coaching / Law-of-Attraction sales copy quoted to imply scientific proof of an outcome

### Signal 9 — Editorial-standard display

Where the post asserts a science claim or covers a clinical topic, display the standard inline somewhere in the post body:

> "Every affirmation here is written to be first-person and believable, every science claim is checked against the APA or a peer-reviewed study, and any Bible verse is quoted exactly with the translation named. Affirmations are a supportive practice — not a replacement for professional care."

This is much stronger than burying the standard in the footer note. The reader sees the editorial rigor in context, where it earns trust for the specific claims.

### Signal 10 — Corrections policy

The site should have a public corrections policy linked from the footer:

> "We fix mistakes in our posts — especially a science claim that's off, a misquoted Bible verse, or an affirmation that didn't land right. Spot something? [Reply to us](mailto:...) and we'll fix it. Corrections are noted at the bottom of the affected post with the date and what changed."

The renderer (`components/MdxContent.tsx`) maps a fixed set of Markdown elements (no custom JSX). When a post has been corrected, log it as a Markdown blockquote (`> …`, the styled answer-box) at the bottom:

> **Correction (2026-05-10):** This post previously cited a "90% of people" statistic with no source; that figure has been removed and replaced with the APA's actual guidance on positive self-talk. The Psalm 23 quote has also been corrected to the NIV wording with the reference named. Corrected.

This is a strong trust signal. Sites that publicly track corrections look serious. Sites that quietly edit look sketchy — and for a wellbeing site, publishing a fabricated statistic or a misquoted verse and silently fixing it is exactly the failure mode readers distrust.

---

## What E-E-A-T is NOT

Common confusions:

- **It is not keyword density.** Stuffing the footer note with keywords doesn't help.
- **It is not link count.** Ten low-quality outbound links hurt more than three primary sources.
- **It is not "AI disclosure".** Google's stated position is that AI use is fine as long as the content is helpful and accurate. Adding "this post was written by AI" doesn't earn or lose ranking by itself. The page either has E-E-A-T or it doesn't.
- **It is not just for YMYL.** Several of this site's core topics ARE YMYL (mental health, faith, money) — and well-formed, non-harmful affirmations + true, sourced claims + accurate scripture + responsible framing are exactly the signals that set a serious affirmations blog apart.

---

## E-E-A-T audit checklist (run on every post before publish)

### Author / brand signals
- [ ] Visible byline present (default: **Ugo Charles**, via the `author` frontmatter)
- [ ] About / publisher page exists and is linked (where the convention is in place)
- [ ] Brand editorial note rendered at the post footer
- [ ] Note contains a *specific* claim of relevant editorial standard (well-formed affirmations, checked science, accurate scripture, responsible framing)
- [ ] Visible byline is "Ugo Charles" (and it ships in the `BlogPosting` JSON-LD as the `author` Person, with the Organization "Aurasyncs.com" as publisher — auto-emitted)

### Accuracy signals (the spine for this site)
- [ ] Every affirmation is well-formed (first-person, present-tense, positive, believable) and non-harmful (no denial framing, toxic positivity, or guaranteed-outcome promise)
- [ ] Every science/health claim and any statistic traces to peer-reviewed psychology / APA / NIH / .edu — no fabricated "studies show 90%…" numbers
- [ ] Every scripture quote is exact, the reference correct, and the translation named (NIV/ESV/KJV/NLT)
- [ ] Where the effect genuinely varies (belief, consistency, pairing with action/therapy) it's given honestly — not a false single "this works"

### Responsible-claims signals (only if the post touches a clinical, faith, or money topic)
- [ ] Light, non-alarmist mental-health note present where the topic is clinical (anxiety, depression, grief, weight) — affirmations support, not replace, professional care
- [ ] Manifestation/money framed as mindset practice, never a guaranteed outcome; Law of Attraction / Louise Hay attributed as cultural, not scientific, sources
- [ ] Scripture handled per the accuracy rule (exact, referenced, translation named)

### Experience signals
- [ ] At least one first-person experience marker in the body (e.g. "I kept these by my mirror for a month and the present-tense ones were the ones I believed") OR a named researcher / mental-health org explicitly cited
- [ ] If the author followed a specific practice (kept a morning routine, prayed the verse, wrote their own affirmations), it is stated inline

### Trust signals
- [ ] `createdTime` set correctly; `lastEditedTime` set and bumped on substantive edits (it feeds `dateModified` / `og:modifiedTime`), with git history as backup
- [ ] ≥ 3 outbound links to primary / reputable sources (more for pillars; study / APA / NIH / .edu / reputable Bible source preferred)
- [ ] ≥ 2 named source citations with full attribution + linked reference (where the post asserts science or health facts)
- [ ] Every science/health fact cited or traceable; every affirmation well-formed; every verse exact with translation named
- [ ] Corrections policy linked in the footer
- [ ] If the post has been previously corrected, the correction is logged at the bottom (a Markdown blockquote)

---

## E-E-A-T anti-patterns

These are the easy-to-spot mistakes:

- **Faceless or wrong byline.** "By Admin" → fix by using the author byline (default: **Ugo Charles**)
- **Generic footer note.** "We love affirmations" → fix by stating the specific editorial standard (well-formed affirmations, checked science, accurate scripture, responsible framing)
- **Fabricated statistic.** "Studies show 90% of people who use affirmations feel happier" with no source → fix by cutting it or replacing with the APA's actual guidance on positive self-talk, cited
- **Malformed affirmations.** A "50 affirmations" list full of future-tense / negation lines ("I will stop being anxious") → fix by rewriting first-person, present-tense, positive per `affirmation-craft-skill.md`
- **Misquoted scripture.** A verse with altered wording, wrong reference, or no translation named → fix by quoting exactly, correcting the reference, naming the translation
- **Guaranteed-outcome promise.** "Repeat these and the money will come" → fix by framing manifestation as mindset practice with no guaranteed result
- **Missing mental-health note.** An anxiety/depression post with no support-not-replacement note → fix by adding the light, non-alarmist note
- **Stale-date confusion.** Leaving `lastEditedTime` unchanged after a substantive edit → bump it to the edit date; it feeds `dateModified` / `og:modifiedTime` (git history backs it up)
- **AI-only voice.** Zero first-person markers across a 1,200-word post → fix by inserting at least one specific moment of actually practicing the affirmations
- **Standards by implication.** Footer says "carefully made" without showing the method → fix by being specific

---

## What to do if there's no named expert author

AuraSyncs publishes under the "Ugo Charles" byline, not a tenured clinical psychologist — and that's fine, because the trust comes from method and responsibility, not titles.

The footer note should declare AuraSyncs's *actual* standard, honestly:

> "AuraSyncs isn't a clinic, and Ugo Charles isn't your doctor. We're people who got tired of affirmation lists full of made-up statistics and lines that don't actually work — so we write every affirmation to be first-person and believable, check every science claim against the APA or a real study, quote every Bible verse exactly with the translation named, and never promise that words alone will fix a hard situation. Affirmations are a supportive practice, not a replacement for professional care."

This honest framing is actually a strong trust signal. It is the AI-slop sites that confidently publish fabricated "90% of people" stats and misquoted verses. A site that writes careful affirmations, sources its science, and is honest about what affirmations can't do earns more trust than a fake authority.

For posts on **clinical topics** specifically (anxiety, depression, grief), the trust gap is closed not by a credential but by the light mental-health note and responsible framing — see the YMYL guidance above.

---

**blogOS** — pages that earn the ranking they get.
