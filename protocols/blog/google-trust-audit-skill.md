---
name: google-trust-audit
description: Pre-publish audit for Google's Helpful Content system, E-E-A-T framework, and spam policies (including scaled content abuse, site reputation abuse, and expired-domain abuse). This skill is the gate between a finished draft and "ready to ship." If the post fails any check here, do not publish. For AuraSyncs, an accuracy & trust gate is a first-class check alongside the Google checks: every affirmation must be well-formed and non-harmful, every science/study claim must be true and traceable to a peer-reviewed source / mental-health org / .edu (no fabricated "studies show 90%…" statistics), every Bible verse must be exact with the translation named, and every clinical, faith, or money topic must carry responsible framing (mental-health support-not-replacement; no guaranteed-outcome manifestation).
---

# Google Trust Audit — the gate before publish

> Google does not ban AI-generated content. It bans content that does not help people. This audit is the difference. Run it on every post.

---

## What the audit covers

Four frameworks:

1. **Helpful Content system** — Google's site-wide signal that judges whether content is people-first or search-engine-first. A single bad post can drag the whole site. For affirmations, this is where the "thin list" trap lives: a bare list of 50 affirmations with no original framing, no why-they-work, and no how-to-use is exactly what HCU punishes.
2. **E-E-A-T framework** — Experience, Expertise, Authoritativeness, Trustworthiness.
3. **Accuracy & trust gate** — for this site, every affirmation in a post must be well-formed (first-person, present-tense, positive, believable) and non-harmful; every science/health claim and any statistic must be true and traceable to peer-reviewed psychology, a reputable mental-health organization (APA, NIH/NIMH), or a `.edu` source (no fabricated "studies show 90%…" numbers); every Bible verse must be quoted exactly with the reference correct and the translation named; and every clinical, faith, or money topic must carry responsible framing. A malformed/harmful affirmation, a fabricated statistic, a misquoted verse, or a guaranteed-outcome promise is a publish blocker. (See `accuracy-and-trust-skill.md` — the trust gate for this site.)
4. **Spam policies** — Scaled content abuse, site reputation abuse, expired-domain abuse, cloaking, sneaky redirects.

If a post passes all four, it's eligible to rank. If a post fails any, it should be revised or killed before publish.

Note on YMYL: several of this site's core topics ARE YMYL — affirmations touch **mental health** (anxiety, depression, grief, sleep), **faith** (Bible/Christian/chakra), and **money** (abundance/manifestation). The audit does not require a medical reviewer sign-off, but it does require **responsible framing**: a light, non-alarmist mental-health note where the topic is clinical (affirmations support, not replace, professional care); scripture quoted exactly with the translation named; and manifestation/money framed as mindset practice, never a guaranteed outcome.

---

## Section 1 — Helpful Content audit

The HCU classifier asks (loosely paraphrased from Google's own documentation): *would someone reading this content feel they got what they were looking for, that they trust who wrote it, and that the writer knows the topic well enough to teach it?*

### Helpful Content checks (must pass 8 of 9)

#### Check 1: People-first framing
- [ ] The post is written for someone with a specific need (affirmations for anxiety, what to say to myself on a hard Monday, how to build self-love), not for a keyword
- [ ] The H1 (from the Notion Title) and excerpt describe what the reader will *get* (affirmations they can actually use, a calmer morning, a faith anchor), not what the post *covers*
- [ ] The intent (find affirmations, understand how they work, get a daily set) matches what someone typing the target query actually wants

#### Check 2: Unique angle
- [ ] The angle is not the same as the top 3 results on Google for this query
- [ ] The post takes a position, gives genuinely well-formed and usefully grouped affirmations, explains *why* they work, shows *how* to use them, or synthesizes in a way the top 3 do not
- [ ] If the angle is "more comprehensive than competitors," there is genuinely 30%+ more useful information (original grouping by sub-need, a why-they-work section, a how-to-use practice, a real mental-health note), not padding

#### Check 3: First-hand experience
- [ ] At least one first-person experience marker present (the affirmations actually practiced, the morning routine actually kept), OR
- [ ] At least one named primary source explicitly cited (a peer-reviewed study, the APA, NIH, a `.edu` psychology page, or a reputable Bible source with the translation named)
- [ ] The post does not read as if it could have been written by someone who never said an affirmation out loud or sat with the topic

#### Check 4: Demonstrated expertise
- [ ] The brand has a displayed editorial standard (well-formed affirmations + science checked against a mental-health authority + scripture quoted exactly with the translation named + responsible framing)
- [ ] Specific, non-obvious knowledge present in the post — why first-person present-tense works, the real (cited) science of self-affirmation, the correct verse and translation, how to actually use the affirmations

#### Check 5: Satisfying depth
- [ ] The post fully answers the target query without forcing the reader to leave for another page
- [ ] All natural follow-up questions are addressed (how to use them, how often, do they really work, where the science stands), either in the body or in an FAQ section
- [ ] No "we'll cover that in part 2" deferrals on the core need

#### Check 6: Honest claims
- [ ] No exaggerated headline claims that the body doesn't deliver on (a "100 affirmations" post delivers 100, well-formed)
- [ ] No "the only affirmations you'll ever need" framing unless the post genuinely is comprehensive; no "manifest anything instantly" promise
- [ ] No false certainty — where the effect depends on belief, consistency, or pairing with action/therapy, say so; affirmations are framed as a support, not a guaranteed cure or payout

#### Check 7: Not search-engine-first
- [ ] The post would still be valuable if Google didn't exist
- [ ] Keywords appear naturally in prose, not stuffed into headings, alt text, or paragraphs
- [ ] No "this article will cover" preamble that exists to load keywords into the first paragraph

#### Check 8: Original or value-add to existing information
- [ ] If the post covers a common topic (affirmations for confidence, money affirmations), it adds genuinely well-formed lines, original grouping, a why-they-work explanation, a how-to-use practice, or unique synthesis
- [ ] **Not a thin list** — NOT "just 50 affirmations dumped in a bullet list with no original framing." The why-they-work + how-to-use + original grouping is what lifts it above the content-farm clones. A bare list is an HCU fail.

#### Check 9: Trust foundations
- [ ] Author byline present (default: **Ugo Charles**, via the Notion `Author` property)
- [ ] Brand editorial note / About link present
- [ ] Content is current (`Created` set correctly; there is no `dateModified` field — currency is tracked via git / Notion `lastEditedTime`)
- [ ] Outbound links to primary / reputable sources where science or scripture is asserted
- [ ] No misleading headlines

**Pass threshold:** 8 of 9. Failures on Check 4 or Check 9 are blocking — fix before publish.

---

## Section 2 — E-E-A-T audit

See `eeat-signals-skill.md` for the full discipline. This audit verifies the signals are present.

### E-E-A-T checks (must pass 9 of 10)

#### Experience
- [ ] First-person experience marker present (the affirmations practiced, the routine kept, the verse prayed) or named primary source cited
- [ ] Specific details that suggest real practice (which lines actually landed, that present-tense beat future-tense, what shifted over a month)
- [ ] Affirmations and terminology are **correct and well-formed** — first-person, present-tense, positive, believable; affirmation-craft vocabulary used accurately (see `affirmation-craft-skill.md`). No malformed (future-tense / negation) lines.

#### Expertise
- [ ] The brand has a displayed editorial standard relevant to this post
- [ ] At least 2 named source citations if the content type calls for them (waive only for a simple themed collection that asserts no science/health claim — but it still needs original framing and a how-to-use)
- [ ] Affirmations confirmed well-formed; science/health claims verified against a mental-health authority and scripture verified exact with translation named by the trust pass

#### Authoritativeness
- [ ] Site has an About page linked from the footer
- [ ] The author byline (Ugo Charles) is consistent across the site
- [ ] Site has links from at least 5 other relevant sites (out of scope per post, but the audit notes if the site is new)
- [ ] Internal linking signals topical authority — this post lives in a cluster (themed collection ↔ related collections ↔ the relevant practice guide)

#### Trustworthiness
- [ ] Primary / reputable source citations (≥ 3: study / APA / NIH / .edu / reputable Bible source where facts or scripture are asserted)
- [ ] Content current (`Created` correct; currency via git / Notion `lastEditedTime` — no `dateModified` field)
- [ ] Corrections policy linked
- [ ] Honest framing — no clickbait, no false-certainty "this fixes everything," no guaranteed-outcome promise
- [ ] Every affirmation well-formed and non-harmful; every science/health claim and scripture passed the trust gate
- [ ] Responsible framing present where clinical/faith/money (mental-health support-not-replacement note; scripture exact + translation named; manifestation as mindset, not guaranteed outcome); affiliate links (if any) clearly disclosed
- [ ] Contact / about info reachable from this page

**Pass threshold:** 9 of 10.

### Responsible-claims checks (apply ONLY if the post touches a clinical, faith, or money topic)

Several core AuraSyncs topics are YMYL, so when the post covers mental health, scripture, or money/manifestation, all relevant items must pass:

- [ ] A light, non-alarmist mental-health note is present where the topic is clinical (anxiety, depression, grief, panic, weight, addiction): affirmations support, not replace, professional care
- [ ] No denial framing handed to someone in genuine distress ("I am not depressed"), and no toxic positivity that tells a struggling reader their feelings are wrong
- [ ] Every Bible verse is quoted exactly, the reference correct, and the translation named (NIV/ESV/KJV/NLT)
- [ ] Manifestation/money affirmations are framed as mindset practice, never as a guaranteed outcome; Law of Attraction / Louise Hay attributed as cultural, not scientific, sources
- [ ] No fabricated statistics or invented mechanisms ("rewires your brain in 21 days") presented as science

---

## Section 3 — Accuracy & trust audit (site-specific gate)

This site's defining failure modes are the **fabricated statistic** ("studies show 90% of people…"), the **misquoted scripture** (wrong wording / reference / no translation named), the **harmful affirmation** (denial framing or guaranteed-outcome promise), and the **thin malformed list** (50 future-tense/negation lines with no framing). This section is a hard gate. See `accuracy-and-trust-skill.md` for the full method.

#### Accuracy & trust checks (must have ZERO unresolved violations)

- [ ] Every affirmation in the post is well-formed (first-person, present-tense, positive, believable) and non-harmful (no denial framing for someone in distress, no toxic positivity, no guaranteed-outcome promise)
- [ ] No science/health claim, statistic, or neuroscience mechanism is asserted without a peer-reviewed source, reputable mental-health org (APA, NIH/NIMH), or `.edu` source — and no fabricated "studies show 90%…" number appears
- [ ] Nothing is fabricated; where the effect genuinely varies (belief, consistency, pairing with action/therapy), it's framed honestly — not a false single "this works"
- [ ] Every Bible verse is quoted exactly, the reference correct, and the translation named (NIV/ESV/KJV/NLT), verified against a reputable Bible source
- [ ] Each asserted science/health claim links to its source (study / APA / NIH / .edu)
- [ ] Responsible framing present where clinical/faith/money: mental-health support-not-replacement note; manifestation as mindset practice; scripture accurate
- [ ] The post is **not a thin list** — it has original grouping, a why-they-work explanation, and a how-to-use practice, not just a bare dump of affirmations

#### How to test
Read the affirmations as the target reader would and confirm each is first-person, present-tense, positive, believable, and safe for someone actually in that situation. Independently re-check every science claim and statistic against an authoritative source (the APA, NIH, a `.edu` psychology page, or the named study) — if a "studies show" number can't be located, it's fabricated. Re-check every Bible verse word-for-word against a reputable Bible source and confirm the reference and translation. Confirm any clinical topic carries the mental-health note and any money/manifestation framing avoids a guaranteed outcome. Confirm the post has real framing (why-they-work + how-to-use + grouping), not just a list. If any affirmation is malformed or harmful, any statistic is fabricated or unsourced, any verse is misquoted/mis-cited, any guaranteed-outcome promise is present, or the post is a bare thin list, it is a **blocking fail** — do not ship.

---

## Section 4 — Spam policy audit

Google's spam policies have evolved sharply with AI. The three most relevant for blog production at scale:

### Scaled content abuse

> "Producing many pages with the primary purpose of manipulating search rankings, regardless of whether the content is created by humans or AI."

#### Scaled content checks (must have ZERO violations)

- [ ] This post is NOT one of many near-identical posts where only the topic word varies — the **template-clone trap** (e.g. 200 near-identical "affirmations for X" posts that swap only the theme word, with the same generic lines and no real, distinct framing)
- [ ] This post is NOT a template fill-in where only the theme changes between posts (the trap for "affirmations for X" collections — cloned across hundreds with no genuinely distinct lines, grouping, why-they-work, or how-to-use)
- [ ] If we're publishing many affirmation collections on related needs, each has genuinely topic-specific affirmations, its own grouping, a relevant why-they-work note, and a how-to-use that fits that need
- [ ] Publishing rate is reasonable (not 50 cloned "affirmations for X" posts/day)
- [ ] No `<h1>` keyword stuffing (the H1 comes from the Notion Title; keep it natural)
- [ ] No paragraph keyword stuffing (target query appears naturally, not 10x per paragraph)

#### How to test
Search 3 random sentences from the post in Google with quotes around them. If they return zero results, that's a unique post. If they return results from other AI-spammy affirmation/manifestation sites, the post has the same fingerprint as scaled content. Rewrite — and check that the affirmations themselves aren't just the same generic lines every "affirmations for X" listicle uses.

### Site reputation abuse (formerly "parasite SEO")

> "Publishing pages on a third-party site to take advantage of that site's ranking signals."

Not applicable per post — applies if this site has a section that hosts third-party content disconnected from the site's main purpose. Flag in the audit if the post:

- [ ] Is on a topic completely unrelated to affirmations, wellbeing, faith, or the site's themes
- [ ] Was written by a third party (guest post) that the site has no editorial relationship with
- [ ] Exists to drive traffic to an unrelated affiliate offer

An affirmations site publishing a post about, say, crypto or unrelated product reviews hits this.

### Expired-domain abuse

Not applicable per post — applies at the domain level. The audit confirms:

- [ ] This site is not built on an expired domain that previously had different content
- [ ] If it is, there is a clear continuity story (acquisition, rebrand) declared publicly

Default: this is not a concern for new domains. Flag only if relevant.

### Cloaking
- [ ] The content shown to crawlers matches the content shown to users
- [ ] No JavaScript that hides text from one and shows it to the other
- [ ] No keyword-stuffed alt text invisible to readers

### Hidden text
- [ ] No white text on white background
- [ ] No tiny-font keywords
- [ ] No off-screen keyword blocks

### Doorway pages
- [ ] This post does not exist purely to funnel into another collection or an affiliate link
- [ ] Each post is genuinely useful as a destination on its own (the collection actually helps the reader even before they click through to a related set)

### Link spam
- [ ] No participation in link-trading schemes
- [ ] No purchase of links for ranking
- [ ] Outbound links are editorial, not paid placements (paid get `rel="sponsored"`)
- [ ] Internal links serve readers, not just SEO

---

## Section 5 — AI-content honesty (Google's stance)

Google's published stance (as of 2026): AI-generated content is fine if it is helpful, accurate, and adds value. AI-generated content is contraband if it is scaled, templated, or low-effort.

There is no "AI-generated" disclosure requirement from Google. There is from some industries (legal, regulated finance) and from honesty norms.

**This site's policy:** disclose AI assistance when it materially shaped the content. Example footer line:

> "This post was drafted with AI assistance under AuraSyncs's editorial review by Ugo Charles. Every affirmation is written to be first-person and believable, every science claim is checked against the APA or a peer-reviewed study, every Bible verse is quoted exactly with the translation named, and affirmations are offered as a supportive practice — not a replacement for professional care."

Adding this does not hurt SEO. Not adding it is fine too. What matters is that the post is genuinely helpful, accurate, and — for this site — that the affirmations are well-formed and safe, the science is true and sourced, the scripture is accurate, and clinical/faith/money topics are framed responsibly.

---

## Section 6 — The audit output

The writer / reviewer outputs the audit as a structured block, separate from the post content:

```
===GOOGLE TRUST AUDIT===

**Helpful Content checks (X/9 passing)**
- ✅ People-first framing
- ✅ Unique angle: <one-line description of the unique angle>
- ✅ First-hand experience: <which marker, e.g. "kept these morning affirmations by the mirror for a month">
- ❌ Demonstrated expertise: <what's missing — e.g., "no editorial standard displayed">
- ✅ Satisfying depth
- ✅ Honest claims
- ✅ Not search-engine-first
- ✅ Original value-add: <why it's not a thin list — e.g. "grouped by sub-need + why-they-work + how-to-use">
- ✅ Trust foundations

**E-E-A-T checks (X/10 passing)**
- ✅ Experience
- ✅ Expertise
- ⚠️ Authoritativeness: site is < 6 months old, limited inbound links
- ✅ Trustworthiness

**Accuracy & trust checks (X violations)**
- ✅ All affirmations well-formed (first-person, present-tense, positive, believable) and non-harmful
- ✅ All science/health claims + statistics sourced to a study / APA / NIH / .edu; no fabricated numbers
- ✅ All scripture exact, referenced, translation named
- ✅ Responsible framing present where clinical/faith/money; not a thin list

**Responsible-claims checks (N/A unless clinical / faith / money topic)**
- ✅ Mental-health support-not-replacement note present; scripture accurate; manifestation framed as mindset, not guaranteed outcome

**Spam policy checks (X violations)**
- ✅ No scaled content / template-clone fingerprint
- ✅ No site reputation abuse
- ✅ No cloaking / hidden text / doorway

**Overall risk level:** [LOW / MEDIUM / HIGH]

**Action required before publish:**
1. <specific fix>
2. <specific fix>
```

The orchestrator presents this to the user. If risk is MEDIUM or HIGH, the user decides whether to ship with the flag or fix. An unresolved accuracy/trust violation — a malformed/harmful affirmation, a fabricated statistic, a misquoted verse, or a guaranteed-outcome promise — is always HIGH.

---

## Risk-level guide

| Risk | Trigger | Action |
|---|---|---|
| LOW | All HCU + E-E-A-T pass, all affirmations well-formed and non-harmful, all science/scripture sourced and accurate, responsible framing present where needed, zero spam violations | Ship |
| MEDIUM | 1-2 HCU/E-E-A-T fails OR 1 spam violation OR site is new | Fix the specific issues, then ship |
| HIGH | 3+ HCU fails OR any malformed/harmful affirmation OR any fabricated/unsourced statistic OR any misquoted/mis-cited scripture OR any guaranteed-outcome manifestation promise OR a clinical post missing the mental-health note OR a bare thin list OR multiple spam violations | Do not ship; redo |

---

## What the audit does NOT check

- **Whether the post will rank** — that's a long-term outcome, not an audit gate
- **Whether the writing is "good"** — that's the anti-AI-slop checklist in `blog-os-master.md`
- **Schema validity** — covered by `seo-and-schema-skill.md` (note: the route emits only basic title/meta-description/canonical today; structured data is future work)
- **Snippet eligibility** — covered by `featured-snippet-skill.md`
- **Internal-link math** — covered by `topical-authority-skill.md`

Each skill checks its own scope. This audit specifically checks Google's published quality + policy guidelines, plus the site's accuracy & trust gate (well-formed non-harmful affirmations, true sourced science, accurate scripture, responsible framing).

---

**blogOS** — pass the audit, then ship.
