---
name: keyword-research
description: The pre-draft research routine. Takes an affirmation keyword and produces a synthesized brief covering SERP shape, People Also Ask boxes, related queries, audience voice, and competitor angles for aurasyncs.com's affirmation collections, daily/occasion sets, faith sets, and practice guides. There is no keyword API or stored plan on this site — research is done by hand with WebSearch + WebFetch SERP/PAA recon, plus fact/scripture verification, before you draft.
---

# Keyword Research — assembling the brief

> The writer cannot produce a Google-grade post from a keyword alone. The keyword must be turned into a *brief* — SERP shape, what's actually ranking, what real searchers asked next, what audience pain looks like in their own words, what angle is open. On aurasyncs there is no keyword pipeline and no stored plan: you build the brief by hand with live SERP/PAA recon. The rigor comes from *how* you read the SERP and verify the facts, not from an API.

---

## Inputs

The routine accepts one of:

1. **A bare keyword**: `affirmations for anxiety`
2. **A keyword + content type**: `affirmations for anxiety` (themed affirmation collection)
3. **A keyword + slug + content type** (full manual override)

If the input is just a keyword and it has multiple plausible content types, decide it from the SERP intent (Pass 3) — a "for X" search usually wants a themed collection; a "Monday/morning/365" search wants a daily/occasion set; a "Bible/Christian" search wants a faith/scripture set; a "how affirmations work / write your own / manifestation for beginners" search wants a practice guide.

The four canonical content types on this site:

1. **Themed affirmation collection (CORE)** — "Affirmations for X" (self-love, anxiety, confidence, money, etc.).
2. **Daily / occasion set** — time-anchored ("365 daily affirmations", "Monday/Friday affirmations", "morning affirmations").
3. **Faith / scripture set** — "Bible/Christian affirmations", each affirmation paired with an accurately quoted + cited verse.
4. **Practice guide** — "how affirmations work / write your own / manifestation for beginners".

Audience-tuning (women/men/kids/teens) and tone-tuning (funny/sweary) are cross-cutting modifiers on types 1–2, not separate types.

---

## No stored pipeline — you build the brief from the live SERP

There is **no DataForSEO/Apify keyword tool, no `MASTER_keywords.csv`, no `plan/` folder of briefs, and no `site-infra/` research code on this site.** Do not reference them, do not try to grep them, do not invent a "volume" or "KD" number you can't see. If you need a sense of demand, you read it off the live SERP signals below — autocomplete order, PAA presence, how many strong competitors are ranking — and mark it as an *inferred* high/medium/low, never a fabricated figure.

Your only research tools are **WebSearch** and **WebFetch** — the same tools any reader has. Nothing to install, nothing to configure, no credentials.

### The site's real clusters (use these to place a keyword)

Every affirmation keyword belongs to one of the site's clusters. Knowing the cluster tells you the pillar it links up to and the siblings it links across to:

- **self-love** — self-love, self-worth, confidence-adjacent self-acceptance.
- **anxiety / mental-health** — anxiety, calm, peace, mental health, depression-adjacent (clinical — handle with the responsible-claims note).
- **confidence** — confidence, self-esteem, short daily confidence.
- **money / abundance / manifestation** — money, wealth, financial abundance, prosperity, manifestation.
- **faith (Bible / Christian)** — Bible affirmations, Christian affirmations, "I am" from the Bible, scripture-paired sets.
- **chakra** — root/sacral/crown chakra, energy-center healing.
- **daily / occasion** — Monday, Friday, 365 daily, morning/good-morning, daily routines.
- **audience** — women, men, kids, teens (and intersections like Black women).
- **sleep** — sleep, restful sleep, bedtime.
- **work** — work, productivity, career, Christian-at-work.
- **health** — healing, wellness, weight-loss, scientific healing.
- **gratitude** — gratitude, abundant mindset.
- **love** — manifesting love, deepening connection.
- **spiritual** — growth, healing, awakening.
- **novelty** — funny, sweary, celebrity-styled (a light-touch, on-brand variant — still must be well-formed).

When you place the keyword, name its cluster in the brief; that's what the internal-link plan (see `topical-authority-skill.md`) hangs off.

---

## How the live recon is run

Four passes. Passes 1–3 cover the SERP, the related space, and the competitors; Pass 4 captures audience voice; the synthesis at the end is something you write, not something an API returns.

### Pass 1 — Study the live SERP (what's actually ranking)

Run the keyword as a WebSearch exactly as a user would type it. Read the result page the way Google presents it and capture every signal:

- **The top 10 organic results** — URL, title, and the snippet Google chose. These are the pages you have to beat.
- **The featured snippet** (if present) — which URL holds it, its shape (paragraph / numbered list / bulleted list / definition), and its exact text. This is your snippet target; you are trying to take it.
- **People Also Ask (PAA)** — capture the questions verbatim. Expand a couple and note the answers Google is surfacing. PAA is the richest source of sub-questions to cover as headings or in the FAQ block (e.g. "Do affirmations really work?", "How many times should I say an affirmation?", "What are the most powerful affirmations?").
- **Related searches** ("people also search for" at the bottom) — capture the terms verbatim. These become heading candidates, internal-link targets, or sibling-post ideas.
- **SERP feature mix** — is there a PAA stack, a "things to know" carousel, a video block, an image pack? Affirmation SERPs are usually long lists of phrases plus a heavy PAA stack — which means the post must lead with a tight answer paragraph and deliver a genuinely usable, well-grouped list of affirmations.

Run 2–4 variant queries to widen the picture. For `affirmations for anxiety`, also search `anxiety affirmations`, `affirmations for anxiety and overthinking`, and `calming affirmations` — the PAA and related-searches sets differ across variants and together map the topic.

### Pass 2 — Map the related-keyword space (demand by proxy)

There is no stored volume figure to pull, so infer demand from signals you *can* see:

- **Autocomplete** — start typing the seed into the search box and record the suggestions. Google orders autocomplete roughly by popularity, so `affirmations for` → `anxiety`, `confidence`, `women`, `self love`, `money` tells you the dominant needs. Typing `money affirmations` → `for financial abundance`, `that work`, `while you sleep` shows the live modifier families.
- **"People also search for"** from Pass 1 — already a ranked-ish related set.
- **Modifier families** — group the related terms into families the post should cover: the *audience* family (`affirmations for women`, `…for men`, `…for kids`, `…for teens`), the *count/length* family (`short affirmations`, `25 affirmations`, `365 affirmations`), the *time* family (`morning affirmations`, `Monday affirmations`, `affirmations while you sleep`), the *outcome* family (`affirmations that work`, `affirmations for healing`), the *faith* family (`Bible affirmations`, `Christian affirmations`, `I am affirmations from the Bible`).
- **Trend sanity check** — if you doubt a term has demand, a quick WebSearch plus "Google Trends" confirms it isn't dead or purely seasonal (occasion sets like Monday/Friday/365 are evergreen; some are mildly cyclical).

Mark volume as "inferred: high / medium / low" from autocomplete position, PAA presence, and how many strong sites already rank. The brief needs *relative* priority (which modifiers to cover, in what order), not a fabricated number.

### Pass 3 — Read the top 3 competitors (find the open angle)

Use WebFetch on the top 3 organic URLs from Pass 1 and read what they actually say. For each, record:

- **URL** and **H1**
- **The heading list** — what sections they cover, in order
- **Rough word count** — how long the post is
- **How they open** — do they answer in the first paragraph, or bury the affirmations behind 600 words of preamble?
- **Whether the affirmations are actually usable** — are they grouped into themed sub-sets a reader can scan and pick from, or one undifferentiated wall of 100 phrases?
- **Whether they ground the "why"** — do they cite real psychology (self-affirmation theory) or just assert "studies show affirmations rewire your brain" with no source? Do faith posts quote scripture accurately with a named translation, or paraphrase loosely?

This is what shapes the angle. The pattern you are hunting for is *what all three do badly*:

- If all three open with "In this article we will explore the power of affirmations…" — yours opens with the warm hook and a tight answer paragraph, then the affirmations.
- If all three dump 100 ungrouped affirmations — yours groups them into 4–6 named themed sub-sets a reader can actually use (e.g. for anxiety: *for a racing mind*, *for the body's panic signals*, *for getting through the moment*, *for the bigger picture*).
- If all three cite a vague "studies show 90%…" stat with no link — yours cites real self-affirmation research and frames affirmations honestly as a support, not a cure.
- If all three are 1,200 words of identical filler — yours either goes tighter (a clean answer-first set that wins the snippet) or substantially deeper (a fuller collection with a how-to-use section, a sourced why-they-work section, and a genuine FAQ).
- If all three leave the reader with nothing next — yours links to the natural sibling (e.g. an anxiety set linking to a calming-sleep set and a confidence set) and to its pillar.

Also classify the **dominant intent** from the SERP makeup: if the top 10 are big grouped affirmation lists, the intent is *give me affirmations for X* (themed collection); if they're time-anchored sets, it's a daily/occasion set; if they're scripture-paired, it's a faith set; if they're prose "how affirmations work" explainers, it's a practice guide. The intent decides the content type and the skeleton (see `page-structures-skill.md`).

### Pass 4 — Capture audience voice (optional but high-signal)

For collection and practice-guide topics, find how real people phrase the need and where they get stuck. WebSearch the keyword with a community qualifier and read the threads with WebFetch:

- `affirmations for anxiety reddit`
- `do affirmations actually work site:reddit.com`
- `<keyword> tips` on a community
- `<keyword> quora`

For mental-health and self-worth topics, try `r/Anxiety`, `r/selfimprovement`, `r/DecidingToBeBetter`; for faith, Christian-life communities; for money/manifestation, `r/lawofattraction` and personal-finance-mindset threads; for parenting/kids, `r/Parenting` and teacher communities.

Stash:

- **5–10 verbatim reader questions** (their exact phrasing — do not paraphrase)
- **3–5 verbatim pain-point quotes** ("I say the affirmations but they feel like lies — 'I am confident' when I'm clearly not just makes me feel worse…")
- **Common sticking points** — especially the ones a good post fixes: affirmations that feel fake because they're too far from the truth (the fix: believable "ladder" affirmations — see `affirmation-craft-skill.md`), not knowing how often or when to say them, expecting affirmations to *replace* therapy or to *guarantee* money.
- **Beliefs the audience holds** — and whether they're actually sound (e.g. "you have to believe it 100% or it won't work" — worth gently correcting).

This is the highest-signal source of *real audience voice*. SERP research gives you keywords; communities give you the language readers actually use and the exact spot where affirmations stop feeling believable — which is where your how-to-use section and tips box should focus.

### Synthesis — you write the brief

With Passes 1–4 in hand, compress the research into the brief yourself (template below). There is no synthesis API call — you are the synthesizer. Read across the four passes and answer: what are the reader intents, what is the open angle, which facts (psychology, any study, any scripture, any health/money claim) must be exactly right and cited, which PAA to cover, what to link to internally.

---

## The assembled brief (output of this routine)

After the four passes, you have assembled a brief covering:

```
## TARGET QUERY
"<keyword>"  (demand inferred: high|medium|low — from autocomplete position + PAA presence + competitor strength)

## CONTENT TYPE
<themed collection | daily/occasion set | faith/scripture set | practice guide>
(+ any audience/tone modifier: women | men | kids | teens | funny | sweary)
(from SERP intent in Pass 3)

## CLUSTER
<self-love | anxiety/mental-health | confidence | money/abundance/manifestation | faith | chakra |
 daily/occasion | audience | sleep | work | health | gratitude | love | spiritual | novelty>

## SLUG
<kebab-case slug — see title-meta-slug-skill.md>
content/posts/<slug>.mdx   (the slug is the filename; the body is plain-Markdown MDX)

## SERP shape
- Featured snippet currently: <yes/no, shape, holding URL>
- PAA questions: [<5-10 verbatim — e.g. "Do affirmations really work?", "How many times should I say an affirmation?">]
- Top 3 ranking: <URLs + heading lists + word counts + opening style + affirmations-grouped? + cites-real-sources?>
- Related searches / autocomplete: [<terms>]
- Dominant intent: <give-me-affirmations | time-anchored-set | scripture-paired | how-it-works>

## OPEN ANGLE
<2-3 sentences on what the top 3 are missing — specific, not "more comprehensive">

## AUDIENCE VOICE (from communities)
- Real questions readers ask: [<5-10 verbatim>]
- Pain points: [<verbatim quotes>]
- Sticking points: [<bullets — including "affirmations feel fake", how-often, replace-therapy expectations>]

## PRIMARY SOURCES (for the load-bearing claims)
- [<URL, outlet, relevance — peer-reviewed psychology / APA / a named Bible translation / a health authority>] × 3-8

## VERIFIED FACTS / CLAIMS TO FEATURE
- <claim about the psychology/science of affirmations> — <source: peer-reviewed or APA> — <verification confidence>
- <any study referenced> — <real citation, no fabricated "90% of people…" stat>
- <any scripture> — <exact quote + book chapter:verse + named translation>
- <any health/money claim> — <framed as support/mindset, never guaranteed outcome>

## RESPONSIBLE-CLAIMS FLAG (YMYL)
- Is the topic clinical (anxiety, depression, grief, health/weight)? <yes/no>
- If yes: include the light, non-alarmist note that affirmations SUPPORT but don't REPLACE professional care.
- Is the topic faith? Scripture quoted accurately, translation named.
- Is the topic money/manifestation? Framed as a mindset practice, never a guaranteed result.
(See accuracy-and-trust-skill.md — the trust gate.)

## HEADING PLAN (per content type)
<heading list per the content type's template in page-structures-skill.md
 — use ## for top-level sections and ### for sub-sections; a body `#` H1 would be
 rewritten to an h2 by the component map, so never use one;
 the page H1 comes from the frontmatter `title`, so the body has NO H1>

## INTERNAL LINK TARGETS
<1 pillar slug + 3-5 sibling slugs from the same/adjacent cluster, drawn from the existing
content/posts/ directory — verified real, never a 404>

## FAQ QUESTIONS (PAA capture)
- <PAA question 1> — <40-60 word answer plan>
- × 2-4

## FEATURED SNIPPET TARGET
- query: <the snippet target>
- shape: paragraph | numbered list | bulleted list | definition | table
  (NOTE: GFM tables DO render via remark-gfm — use them sparingly where a table is the
   clearest shape; the leading Markdown blockquote is the answer box.)
- answer: <40-60 word answer plan — this becomes the opening blockquote>
```

This brief is what the writer receives. It does not exist as a saved file by default — it lives in context for the duration of the write. You can choose to save it as `research/briefs/<slug>.md` for audit / review purposes.

---

## When to save the brief vs run inline

Two modes:

### Inline (default)
The brief is assembled, the writer drafts immediately, the brief is discarded after the post ships. Faster, simpler.

### Saved
The brief is saved to `research/briefs/<slug>.md` before drafting. Useful for:

- Topics where you want to review the brief before drafting
- Posts that may need re-drafting later with the same research base
- Topics with heavy trust risk (anything clinical, any scripture set, any money/manifestation claim) where extra review is warranted

The default is inline.

---

## When to skip or trim the passes

The routine assembles a brief from scratch. Skip or trim the relevant passes if:

- **The keyword is a settled, well-understood collection** (e.g. *morning affirmations*, where the shape is standard and the SERP is settled) — run Pass 1 (snippet + PAA) and Pass 3 (open angle) only; skip Pass 4.
- **You're writing a sibling in an already-mapped cluster** — you already know the pillar and siblings; lean on Pass 1 (PAA + snippet) and Pass 3 (competitors), and just confirm the internal-link targets still exist.
- **The topic is clinical, faith, or money** — do NOT skip the responsible-claims flag and source verification; that check is mandatory regardless of which passes you trim.

---

## Quality bar

A bad brief produces a bad post no matter how good the writer is. The brief is the load-bearing artifact. Specifically:

- **The open angle must be specific.** "More comprehensive than competitors" is not an angle. "Every competitor dumps 80 ungrouped affirmations and cites a vague 'studies show' stat; we group ours into five named sub-sets you can actually pick from, cite real self-affirmation research, and add the believable-ladder fix for affirmations that feel fake" is an angle.
- **The featured facts and claims must be correct and verifiable, not guessed.** The writer should not assert "studies show affirmations rewire your brain in 21 days" or invent a statistic. Where a psychology/science claim appears it traces to a real source (peer-reviewed work or APA). Where a scripture appears it's quoted exactly with book chapter:verse and a named translation. (See `accuracy-and-trust-skill.md` — the trust gate.)
- **The affirmations themselves must be well-formed and not harmful.** Present tense, first person, positively framed, believable. No toxic positivity or denial framing for someone in real distress. (See `affirmation-craft-skill.md`.)
- **Clinical, faith, and money topics carry the responsible-claims note.** Affirmations support but don't replace professional care; scripture accurate with translation named; money/manifestation framed as mindset, never guaranteed.
- **The audience voice should be verbatim.** Reader quotes from communities aren't paraphrased — they're stored as exact strings.
- **The internal-link targets must exist.** Before listing `/blog/anxiety-affirmations-calm-your-mind` or `/blog/money-affirmations-for-financial-abundance` as a link target, confirm the matching `content/posts/<slug>.mdx` file exists. Never link a 404.

---

## Pre-write checklist (run this on the assembled brief)

- [ ] Target query is specific and matches a real search intent
- [ ] Content type is decided (themed collection / daily-occasion set / faith set / practice guide) + any audience/tone modifier
- [ ] Cluster identified (so the pillar + siblings are known)
- [ ] Slug is kebab-case, front-loaded, and not yet taken
- [ ] Demand marked as inferred high/medium/low (no fabricated volume/KD number)
- [ ] At least 3 competitor pages were read (Pass 3)
- [ ] At least 3 primary sources identified for the load-bearing claims (psychology / APA / named translation / health authority)
- [ ] Every psychology/science/scripture/health/money claim is correct and traced to a citable source — no fabricated studies or "90%…" stats
- [ ] Clinical/faith/money topics carry the responsible-claims note
- [ ] The affirmations to feature are well-formed (present tense, first person, positive, believable) and not harmful
- [ ] Heading plan matches the content type's template in `page-structures-skill.md` (body has NO H1; `##` for top-level sections, `###` for sub-sections)
- [ ] Internal-link targets are real slugs (verified against `content/posts/`)
- [ ] PAA questions are real (lifted from Pass 1, not invented)
- [ ] Featured-snippet target is set, with a render-safe shape (GFM tables render via remark-gfm — use sparingly)

---

**BlogOS** — the keyword becomes the brief becomes the post.
