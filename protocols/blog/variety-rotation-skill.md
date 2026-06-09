---
name: variety-rotation
description: Anti-repetition rotation system for BlogOS on Aurasyncs. Prevents same-y "Affirmations for X" posts by rotating content archetype, audience/tone, intro patterns, how the affirmations are grouped, the "why they work" evidence framing, transitions, sub-head phrasings, emphasis types, and conclusion shapes. The writer must pick ONE option from each relevant bank and log selections so the next post avoids the same combo. Originally adapted from FacelessOS, retuned for blog mechanics.
---

# Variety Rotation — every post should feel like its own thing

> Originally created by Joey Sergio for FacelessOS, retuned here for blog posts. Same principle: AI writers default to the same mechanical choices, post after post. Rotation forces variety into the slots where the default is sameness.

**MANDATORY:** Before drafting, consult this file. After drafting, append a rotation log to the audit (NOT to the Notion body / `content/posts/<slug>.json` — the orchestrator persists the log separately). When the next post is written, pass the last log so the new post avoids the same combo.

If you don't rotate, three consecutive posts on the same site read as templated even if individually each is good — and on an affirmations site, where many posts share an "Affirmations for X → why they work → the list → how to use them" backbone, the risk is acute. A reader browsing "affirmations for anxiety," then "affirmations for confidence," then "affirmations for money" should not feel they're reading one article with the topic swapped. Rotation is the antidote.

---

## How the system works

Each post has a set of mechanical slots where the writer defaults to the same choices. This file provides **numbered rotation banks** for each slot — including content-level slots unique to Aurasyncs (the content archetype, the audience/tone, how the affirmations are grouped) and the usual prose slots (intro, transitions, conclusions). The writer must:

1. Pick ONE number from each relevant bank per post
2. Never reuse the same combination across consecutive posts on the same site
3. Log selections in the audit (separate from the Notion body)

The orchestrator persists the log to `protocols/rotation-log.md` (one level up from this skill, already created) and feeds it to the next run with: *"Avoid these rotation numbers from the last post: [paste log]"*

---

## SLOT 0A — CONTENT ARCHETYPE (content-level)

The single biggest "same-y" risk on Aurasyncs: every post being the same *kind* of set. Rotate the archetype across the corpus so the front page isn't five identical themed lists in a row.

| Code | Archetype | Shape | Lives at |
|---|---|---|---|
| 0A-1 | Themed affirmation collection (CORE) | hook → why they work → the affirmations (grouped) → how to use → close | `content/posts/<slug>.json` |
| 0A-2 | Daily / occasion set | a time-bound or moment-bound set (morning, Monday, before sleep, before a hard conversation) with a use-in-the-moment frame | `content/posts/<slug>.json` |
| 0A-3 | Faith / scripture set | affirmations paired with accurately quoted scripture (with translation noted) | `content/posts/<slug>.json` |
| 0A-4 | Practice guide | how to *build* an affirmation habit — writing your own, when to say them, anchoring to a routine | `content/posts/<slug>.json` |

**Rule:** don't publish two posts of the same archetype back to back unless a cluster build calls for it (and even then, vary everything below). Most posts are 0A-1 collections — so when you ship two collections in a row, rotate Slot 0B (audience/tone), Slot 0C (grouping), and Slot 5 (evidence framing) hard.

---

## SLOT 0B — AUDIENCE / TONE (content-level)

Rotate who the post is pitched at and the emotional register, so the corpus serves the whole audience and doesn't sound like one narrator on repeat.

| Code | Audience / register | Voice & scope |
|---|---|---|
| 0B-1 | General / warm-default | the house Aurasyncs voice — encouraging, plain, inclusive |
| 0B-2 | Women / men / specific audience | tuned to that reader's language and lived context, still inclusive |
| 0B-3 | Kids / teens | shorter lines, simpler words, "say it with a grown-up if you like" |
| 0B-4 | Crisis-adjacent / gentle | for anxiety, grief, hard seasons — softer, slower, explicitly non-prescriptive, points to real support |
| 0B-5 | Energized / motivational | for confidence, success, morning, abundance — brighter, more momentum |

**Rule:** if the last two posts were both warm-default (0B-1), push the next one to a distinct register (e.g. 0B-4 gentle or 0B-5 energized). A money post and an anxiety post should not feel narrated by the same mood.

---

## SLOT 0C — HOW THE AFFIRMATIONS ARE GROUPED (content-level)

The body of a collection is a list — and the *organizing principle* of that list is the easiest thing to leave on default ("here are 30 affirmations"). Rotate how the affirmations are grouped so two collections never have the same spine.

| Code | Grouping principle | Best for |
|---|---|---|
| 0C-1 | By time of day | morning / daily / sleep / Monday sets — group as "as you wake," "midday reset," "before sleep" |
| 0C-2 | By sub-theme | a broad topic split into facets (self-love → body, worth, self-talk, boundaries) |
| 0C-3 | By intensity ladder | gentle/believable first → bolder/stretch last, so a skeptical reader can start where they actually are |
| 0C-4 | By life-area | work, relationships, health, money — when the topic spans areas |
| 0C-5 | By situation / trigger | "when you feel X, say Y" — strong for anxiety, confidence, hard moments |
| 0C-6 | Flat, curated, numbered | a single strong run with no sub-heads — use sparingly, and only for short sets |

**Rule:** never use the same grouping (0C) two collection posts in a row. If the last post laddered by intensity, group the next by sub-theme or time of day. The grouping is most of what makes a list feel like *its own* article.

---

## SLOT 1 — INTRO PATTERN

The opening paragraph shape — the hook *before* the top-of-body quote answer box. See `BLOG-INTRO-SWIPE.md` for the full patterns. Pick one per post.

| Code | Pattern | Best for |
|---|---|---|
| 1A | Direct Answer | "affirmations for X" collections — name the set and its purpose right away |
| 1B | Cold Open | a pillar set, a story-led practice guide |
| 1C | Stake-First | "does saying affirmations actually help?" decision/explainer posts |
| 1D | Contrarian | myth-busting ("you don't have to 'believe it' yet for it to work") |
| 1E | Story-First | a "the morning I started saying these out loud" walkthrough |
| 1F | Specific Number | counted collections ("50 affirmations for confidence") |
| 1G | Question Opener | "what should you say to yourself when anxiety hits?" |
| 1H | Practical Promise | daily/occasion sets and practice guides — "say these in two minutes before you get up" |
| 1I | Friction Opener | topics readers feel self-conscious about (self-love, worth, money, "this feels cheesy") |
| 1J | Cross-Reference | a post inside a larger cluster/hub |

**Rule:** never use the same Slot 1 + Slot 9 (conclusion) combo two posts in a row.

---

## SLOT 2 — CONTEXT BRIDGE (after intro → into the body)

The transition from intro to the first H2's content. Default crutches: *"To understand this, we need to..."*, *"But before we dive in..."*

### Rotation bank (pick one)

**2A — The Specifics Drop**
Jump straight to the most specific thing the body will do.
```
The first affirmation on this list is the one to say before your feet hit the floor.
```

**2B — The Common-Belief Bridge**
Frame the body as a response to what readers usually believe.
```
Most people think affirmations only work if you already believe them. You don't. Here's why.
```

**2C — The Personal Bridge**
Use real, warm engagement with the practice.
```
The first time I said "I am enough" out loud, I half-rolled my eyes. By day five it landed.
```

**2D — The Hard Question Bridge**
Lead with the part readers actually worry about.
```
The part that stops most people is the voice saying "this is cheesy." Let's deal with that first.
```

**2E — The Tradition Bridge**
Anchor the practice in something older and steadier.
```
People have steadied themselves with spoken words — prayers, mantras, vows — for a very long time. This is that, made simple.
```

**2F — The Cold Cut**
No bridge. Hard cut from intro to the first H2 with no connector at all.

**2G — The In-The-Moment Bridge**
Open with exactly when and how to use the set.
```
Pick three from below. Say them slowly, once each, the next time your chest goes tight. That's the whole method.
```

**2H — The Stakes Bridge**
Restate what makes this worth doing.
```
The reason this matters: the words you repeat to yourself become the ones you believe. Choose them on purpose.
```

---

## SLOT 3 — SUB-HEAD PHRASING

H2s default to label phrasings ("Affirmations", "Section 1", "The list"). Rotate phrasing across the post.

### Rotation bank (pick at least 3 different styles per post)

**3A — Question H2:** "Why do affirmations work even when you don't believe them yet?"
**3B — Claim H2:** "The gentlest affirmations are the ones that actually stick"
**3C — Specific anchor H2:** "As you wake: five affirmations to start the day grounded"
**3D — Direct-instruction H2:** "Say these three the moment anxiety spikes"
**3E — Comparison H2:** "Spoken out loud vs. written down: which lands deeper?"
**3F — Number H2:** "10 affirmations for the hardest part of the morning"
**3G — Contrarian H2:** "You don't need to feel positive to say these"
**3H — Setup H2:** "How to use the affirmations below"  *(use sparingly — but a how-to-use H2 is genuinely useful)*
**3I — Story H2:** "The line I came back to on my worst Monday"

**Rule:** in a post with 5+ H2s, use at least 3 different H2 styles. Mixing styles is itself a quality signal.

---

## SLOT 4 — TRANSITIONS BETWEEN SECTIONS

Default: *"Now let's look at..."*, *"Moving on to..."*, *"Another important aspect is..."*

### Rotation bank (pick one per transition, vary across sections)

**4A — Consequence Cut**
```
Say that one enough and the next few get easier to mean.
```

**4B — Contrast Cut**
```
The next set asks something different of you — less calming down, more standing up.
```

**4C — Question Cut**
```
Which raises the question most people reach next: [next H2 question].
```

**4D — Specific Detail Cut**
```
Notice the word "choose" in that last one — it's doing the heavy lifting.
```

**4E — Quiet Cut**
No transition line — just end the section on a warm beat and start the next with a new H2 and a fresh first sentence.

**4F — Foreshadow Cut**
```
This won't fully click until you've paired it with the breathing step at the end.
```

**4G — Reversal Cut**
```
The line you just read has one exception, and it's the one most people need most.
```

**4H — Scope Expansion Cut**
```
Once these feel natural, they stop being a "morning thing" and start showing up all day.
```

---

## SLOT 5 — "WHY THEY WORK" EVIDENCE FRAMING

Every collection should explain, briefly and honestly, *why* affirmations help — but the framing defaults to the same vague "they rewire your brain" line. Rotate the angle. (All claims must follow the trust model: real, sourced science; no fabricated studies; support-not-replace professional care; no guaranteed outcomes.)

### Rotation bank (pick one primary framing per post)

**5A — Self-talk / inner-voice framing**
```
The words you repeat become the default voice in your head. Affirmations swap a harsh default for a kinder one.
```

**5B — Sourced-science framing** *(cite a real source; see `research-and-citation-skill.md`)*
```
Research on self-affirmation suggests it can lower defensiveness and stress under pressure — link the study, state it plainly, don't overclaim.
```

**5C — Practice / repetition framing**
```
A belief is just a thought you've practiced. Say a steadier thought often enough and it gets easier to reach for.
```

**5D — Reframe / counter-thought framing**
```
You can't argue a feeling away, but you can offer it a second sentence. That's what each line below is — a second sentence.
```

**5E — Faith / scripture framing** *(for 0A-3; quote accurately, note the translation)*
```
These pair each affirmation with a verse so the words rest on something you already trust.
```

**5F — Honest-limits framing**
```
Affirmations won't fix everything, and they don't replace care from a doctor or therapist. What they do is give your mind a steadier place to stand.
```

**Rule:** never lead two consecutive posts with the same evidence framing. An anxiety post leaning on 5B (science) and a faith post leaning on 5E (scripture) should not both also open with 5A. And any post that touches health, money, or outcomes MUST include 5F somewhere, regardless of its primary framing.

---

## SLOT 6 — COMMENTARY / VOICE LINES

Personality phrases — the warm Aurasyncs voice showing up between sections. Defaults: "It's worth noting that...", "Importantly..."

### Rotation bank (pick 2-4 per post)

**6A** — "Yes, this felt a little silly to me at first too."
**6B** — "[Short warm observation specific to the theme]."
**6C** — "Read that one again, slowly. You deserve to hear it."  *(use max once per 5 posts)*
**6D** — "Which, once it lands, you'll catch yourself reaching for on a hard day."
**6E** — "Pick the one that's hardest to say — that's usually the one you need."
**6F** — "[Plain-language rephrasing of a heavier line]."
**6G** — "And this is where it stops being a list and starts being a habit."
**6H** — "Which is not the same as pretending everything is fine."
**6I** — "No belief required yet — just say it."
**6J** — "I'd phrase this a touch gentler than most lists do — [your softer version]."

---

## SLOT 7 — EMPHASIS TYPE

When a section needs pulled emphasis, rotate the type. The Notion renderer (`components/NotionRenderer.tsx`) supports a fixed block set — there are no custom components, and **no tables in post bodies**. "Emphasis" here means a `quote` block (renders as the answer box), a `callout` block (renders as a tip), a bolded lead line, or a pulled key sentence. Pick the *kind of emphasis*, then render it with a supported block.

### Rotation bank (pick the type that fits)

**7A — Tip:** practical advice, as a `callout` block (the tip box)
**7B — Gentle caution:** what to watch for (forcing it, using affirmations instead of real help), as a `callout` or a bold **A note:** line
**7C — Key Takeaway:** the load-bearing single sentence, as a standalone bolded line
**7D — Sidebar:** related context that breaks the main flow, as a `quote` or `callout`
**7E — Definition:** an inline definition of a term (*self-affirmation*, *reframe*), as a bolded term + plain prose
**7F — Pull Quote:** a sourced fact, a verse, or a warm line pulled out as a `quote` block
**7G — Comparison:** a two-line "X vs Y" contrast in prose (NO tables in the body)

**Rule:** not every post needs pulled emphasis. But every post over 1,500 words should have at least one. Remember the top-of-body answer is itself a `quote` block — don't double up with a redundant one right beside it.

---

## SLOT 8 — FAQ BLOCK STYLE (when applicable)

When the post includes a FAQ block at the bottom, the questions and answers can be styled in different ways. All in supported blocks (heading_3 questions, paragraph answers — no tables, and note no schema is auto-emitted).

### Rotation bank

**8A — Plain Q/A:** Question heading_3, answer paragraph
**8B — Inline question + bolded answer first line + supporting prose**
**8C — Q/A with a linked related set or practice guide per answer**
**8D — Q/A with "short answer / longer answer" two-paragraph structure**

---

## SLOT 9 — CONCLUSION SHAPE

The final beat before the CTA. Defaults: *"In conclusion..."*, *"To summarize..."*, *"At the end of the day..."*

### Rotation bank (pick one)

**9A — Full Circle**
Reference a detail from the opening and reframe it.
```
That line you half-rolled your eyes at up top? Say it now and notice it's a little easier to mean.
```

**9B — Open Invitation**
Leave the reader with the next thing to try.
```
Tomorrow morning, pick just one and say it before you check your phone. That's the whole assignment.
```

**9C — Quiet Landing**
End on a single warm statement. Let it sit.
```
[Plain, kind closing line — "You are allowed to speak to yourself like someone you love."]
```

**9D — Wider Lens**
Pull out to show what this unlocks beyond the one set.
```
[How a steadier inner voice shows up far beyond the moment you practice it.]
```

**9E — Practical Synthesis**
Restate what to do right now.
```
If you want to start today: pick three from above, save this page, and say them tomorrow morning.
```

**9F — Honest Acknowledgement**
Acknowledge what the post doesn't cover or where it kept things gentle.
```
This is a starting place, not a cure. If the heavy days don't lift, please reach out to someone who can help in person.
```

**9G — Specific Recommendation**
Recommend one specific next action or read.
```
The single thing I'd do next is pair these with a calm morning — see [Morning Affirmations to Start the Day Grounded](/blog/morning-affirmations).
```

**9H — Restatement of Stakes**
Why this mattered.
```
[Sentence restating why the words you repeat to yourself shape the day, in the post's new framing.]
```

---

## ROTATION LOG TEMPLATE

After every post, append this block to the audit (not the Notion body — orchestrator persists it):

```
Rotation Log — <slug> — <date>
- Slot 0A (Archetype): 0A-1
- Slot 0B (Audience/Tone): 0B-4
- Slot 0C (Grouping): 0C-5
- Slot 1 (Intro Pattern): 1H
- Slot 2 (Context Bridge): 2G
- Slot 3 (H2 Phrasing Mix): 3C, 3D, 3F, 3H  (across the H2s)
- Slot 4 (Section Transitions): 4A, 4B, 4D, 4H
- Slot 5 (Why-They-Work Framing): 5B, 5F
- Slot 6 (Commentary Lines): 6A, 6G, 6I
- Slot 7 (Emphasis): 7A, 7B
- Slot 8 (FAQ Style): 8C
- Slot 9 (Conclusion): 9G
```

The orchestrator stores the log in `protocols/rotation-log.md` (one level up; already created). The next run reads recent logs and avoids the same combos.

---

## CROSS-POST RULES

1. **Never reuse the Slot 1 + Slot 9 combo** two posts in a row on the same site (these define how the post *feels*).
2. **Never repeat Slot 0A (archetype) two posts in a row** unless deliberately building a cluster — and rotate 0B/0C/5 hard if you do. Because most posts are 0A-1 collections, treat 0C (grouping) as the de-facto "archetype" rotation for back-to-back collections.
3. **Slot 4 transitions:** use at least 3 different codes per post AND swap at least one between consecutive posts.
4. **Slot 5 (why-they-work):** never lead two consecutive posts with the same framing; any health/money/outcome post must include 5F.
5. **Slot 6 commentary lines:** rotate at least 2 of 3-4 selections between consecutive posts.
6. **Slot 3 sub-head phrasing:** if the last post had a question-heavy H2 mix, the next post should lean claim-heavy or instruction-heavy.
7. **If a slot's options have all been used in the last 3 posts**, force yourself into older options or write a new one in.

---

## CLUSTER-LEVEL VARIETY

On an affirmations site, the sharpest repetition risk is *within a theme or audience cluster* — three "Affirmations for X" collections, or four faith sets, written back to back land as a template. Extra guard rails by cluster:

- **Themed-collection cluster** (self-love, confidence, anxiety, abundance): these almost beg for the identical "hook → why they work → the list → how to use → close" shape. Force different Slot 1 / Slot 9 combos, a different Slot 0C grouping, and a different Slot 5 framing between any two collections. Vary whether the post opens with the promise or the in-the-moment use, and rotate Slot 0B tone (the anxiety set should feel gentler than the confidence set).
- **Daily / occasion cluster** (morning, daily, Monday, Friday, sleep): these share a time-bound spine. Rotate whether the post opens practical-promise (1H) or story-first (1E), and alternate the Slot 0C grouping between "by time of day" (0C-1) and "by situation" (0C-5) so the morning set and the Monday set don't read identically.
- **Faith / scripture cluster** (Bible, Christian, biblical, work-faith): these share a "verse-paired affirmation" shape. Rotate which book/theme of scripture anchors the set, the translation noted, and whether the framing leads with the verse or the affirmation. Always quote scripture accurately (trust model).
- **Audience cluster** (for women, for men, for kids, for teens): these share an "affirmations tuned to this reader" shape. Rotate the Slot 0B register, the life-areas covered (0C-4), and the example situations so two audience posts never read as the same list with the pronouns swapped.
- **Chakra / energy cluster** (root, crown, balance-your-energy): rotate which center anchors the set, the imagery, and whether the framing leans practice (5C) or self-talk (5A) — and keep claims grounded.

When two posts in the same cluster ship close together, treat the second as "consecutive" for the cross-post rules even if other posts came between them.

---

## EMERGENCY VARIETY CHECK

If a post STILL feels templated after rotation, scan for these sneaky defaults that no slot fully catches:

| Sneaky default | Fix |
|---|---|
| "The reality is..." | Just state the reality. |
| "In fact..." | Usually unnecessary; delete. |
| "You see..." | Filler. Cut. |
| "Here's the thing:" | AI tell. Rewrite. |
| "At the end of the day..." | Cliché. Use a specific. |
| "Simply repeat these affirmations..." | List tell. Show when and how to say them. |
| "It's important to note that..." | Note it without the preamble. |
| "Let's dive in." | Cut. Start with the first affirmation or the why. |
| "Needless to say..." | If it's needless, don't say it. |
| "Rewire your brain" / "manifest your dream life" | Overused and overclaimy. State the honest mechanism; never promise a guaranteed outcome. |

---

## When variety is the wrong move

Variety for variety's sake isn't the goal. Some patterns are best because they fit the archetype:

- **Themed collections almost always start with Pattern 1A (Direct Answer) or 1F (Specific Number)** — readers came for "affirmations for X"; name the set and start. Rotating to "Cold Open" would lose the snippet and the reader.
- **Daily / occasion sets almost always start with 1H (Practical Promise)** — the in-the-moment use is the hook ("say these in two minutes before you get up").
- **Self-conscious topics (self-love, worth, money, "this feels cheesy") earn 1I (Friction Opener)** — name the awkwardness, then dissolve it.
- **Practice guides and story-led pieces earn 1B or 1E (Cold Open or Story-First)** — they need narrative pull.

The rotation log catches the *sub-slots* (transitions, commentary, conclusions) more than the structural choices. The structural choices follow archetype — but the **archetype (0A), audience/tone (0B), grouping (0C), and why-they-work framing (5) must always rotate** so the corpus stays fresh.

---

**BlogOS** — every post should feel like its own thing.
