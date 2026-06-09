# Aurasyncs Blog Playbook — Writing & Editing Posts

The operator runbook for shipping affirmation posts on aurasyncs.com. This is the **how-to**; the deep references are the BlogOS pack files (linked at the bottom). If you read one thing first, read **`structured-reader-skill.md`** — it's the output contract.

---

## Mental model (read once)

- A post is one file: **`content/posts/<slug>.mdx`**. The slug **is** the filename. The file existing = published. No database, no `status`.
- A modern post's content lives in a **`reader:` block in the frontmatter** (parsed by `lib/posts.ts`, rendered by `components/reader/ScrollReader.tsx`). The Markdown body is a pointer comment.
- The route auto-emits all schema/meta (`BlogPosting`, `BreadcrumbList`, `FAQPage` when `faq:` exists, canonical, OG, Twitter). **You never hand-author schema.**
- The differentiator vs every thin affirmation list on the web is **original per-section writing** wrapped around grouped, honestly-attributed affirmations. A section that's just a list of quotes fails.
- Two themes ship (Sand light / Dusk dark). Write nothing that assumes a background color or an image on the page (it's text-editorial; `featuredImage` is OG-only).

---

## Which job are you doing?

| You want to… | Do this |
|---|---|
| Write a brand-new post | `/b-write <topic>` (or the manual flow below) |
| Improve / fix an existing post | `/b-review <slug>` |
| Convert a legacy prose post to the new reader | `/b-review <slug>` → migrate (see §Migration) |
| Just brainstorm / load the pack | `/blog` |

The commands wrap the same discipline; the manual flow below is what they run.

---

## The non-negotiables (the contract cheat-sheet)

1. **Title/colon rule.** `title` = `"<short evocative phrase>: <keyword payoff>"`. The on-page H1 renders only the **pre-colon** part; the full `title` feeds `<title>`/OG/headline. Set **`reader.subtitle`** to the keyword payoff so the keyword still shows on-page.
2. **Every section needs a non-empty `body[]`** of original prose (how/why these work, when to use them). This is the anti-thin-content rule. A list-only section is a fail.
3. **Attribution.** Every `quote.author` is a **verified real source** (confirmed via WebSearch) **or `"Anonymous"`**. Never `"AI-generated"`. Never a fabricated name, credential, or provenance ("Maya Liu", "Adapted from <real author>", "Anonymous songwriter", "X, a licensed therapist"). A strong, relevant `"Anonymous"` line may lead its section.
4. **Plain text in all `reader:` prose** (`intro`, `body`, `whenToUse`, `prompt`, `opening.*`, `subtitle`). No Markdown, no inline links, no headings — they render literally. Cross-links are the auto Related cards (don't author `related:`).
5. **FAQ → `faq:` frontmatter** (2–4 `q:`/`a:` pairs from People-Also-Ask). It renders on-page **and** emits `FAQPage`.
6. **Affirmation craft.** Present tense, first person, positively framed, believable or laddered, short. No denial/toxic positivity, no guaranteed-outcome phrasing.
7. **Accuracy gate (blocking).** Every load-bearing claim verified against a reputable source; scripture exact with translation named; a support-not-replace note where clinical (good home: `opening.note`); manifestation/money framed as mindset, not a guaranteed outcome. No fabricated stats/studies.
8. **`metaDescription`** is a full **150–160 chars**, separate from `excerpt`. Bump **`lastEditedTime`** on every edit.

---

## Write a new post (step by step)

1. **Type + angle.** Identify the content type (`page-structures-skill.md`: 💫 collection / 📅 daily / 🙏 faith / 🧘 practice guide). Name the angle that beats the SERP — almost always: real how-to-use + sourced why-it-works + honest grouping, not a bare list.
2. **Slug.** Kebab-case = the filename. Check `content/posts/` so you don't collide or duplicate intent. Note 3 sibling posts (the route will surface related, but knowing the cluster guides the writing).
3. **Research (WebSearch/WebFetch).** Read the top results + the PAA box. Confirm any load-bearing fact (psychology, scripture+translation, health/money). If you can't make it non-generic or can't source a needed fact → stop and mark `NEEDS MORE RESEARCH`.
4. **Plan the sections.** 3–5 themed groups, ordered as a believability ladder (gentle/grounding first). For each: a `title`, a `keyword`, the grouping logic.
5. **Draft the `reader:` block** (skeleton below). Write real `body[]` prose per section. Put 2–4 PAA pairs in `faq:`. Pull the orienting line into `opening.quote` and the framing into `intro[]`.
6. **Affirmations + attribution.** Write/curate the `quotes[]`. Verify any named author; everything else is `"Anonymous"`. Read each line as the reader at a low moment — safe, non-denying, laddered.
7. **Run the gate** (`accuracy-and-trust-skill.md`): verify claims, scripture, the support-not-replace note. Any unverifiable claim or unsalvageable affirmation → don't ship.
8. **Re-audit** (`blog-os-master.md` §8 → "Reader scan"): every section has `body[]`; no `"AI-generated"`/fabricated source; `subtitle` carries the keyword; `reader:` prose is plain text; body is the pointer comment.
9. **Write the file** + drop images under `public/blog/` (`featuredImage` for OG). Append a `protocols/rotation-log.md` entry.
10. **Verify locally** (§Review).

### Copy-paste `reader:` skeleton

```mdx
---
title: "Calm the Storm: 25+ Anxiety Affirmations to Soothe Your Mind"
excerpt: "Short warm on-page hook."
metaDescription: "Full 150–160 char SERP line with the keyword, separate from excerpt."
author: "Ugo Charles"
tags: ["affirmations", "anxiety"]
readingTime: 6
createdTime: "2026-06-09T00:00:00.000Z"
lastEditedTime: "2026-06-09T00:00:00.000Z"
featuredImage: "/blog/anxiety-affirmations-calm-your-mind.webp"
faq:
  - q: "Do affirmations really help with anxiety?"
    a: "40–60 word, self-contained, honest answer."
reader:
  tag: "Affirmations"
  subtitle: "25+ anxiety affirmations to soothe your mind and find peace"
  opening:
    quote: "One orienting line the reader sees first."
    note: "One warm sentence — a good home for the support-not-replace note."
  intro:
    - "1–2 short paragraphs of original framing prose (plain text, no Markdown)."
  sections:
    - id: "grounding"
      title: "Grounding & Safety"
      keyword: "anxiety affirmations"
      intro: "One framing sentence for this group."
      body:
        - "Original depth prose — how/why these work, how to say them. THIS is the differentiation."
      whenToUse: "When to reach for these (panic's first wave, a sleepless 3am)."
      quotes:
        - { text: "I am safe. I am here. I am grounded.", author: "Anonymous" }
        - { text: "This too shall pass.", author: "Persian adage" }
      prompt: "A reflection/breath prompt that closes the group."
---

{/* This post renders from the structured `reader:` frontmatter above. Edit `reader:` to change the post. */}
```

---

## Edit an existing post

1. Open `content/posts/<slug>.mdx`. Is it **structured** (has `reader:`) or **legacy prose** (affirmations in the body)?
2. **Structured:** edit the `reader:` fields directly. Re-run the gate on anything you touched (attribution, claims). Bump `lastEditedTime`.
3. **Legacy prose:** prefer migrating it (next section). If you only need a small fix, edit the body, but know it renders as styled prose, not the full reader.
4. Re-audit (or `/b-review <slug>`). The gate still blocks on harmful affirmations or unverifiable claims.

### Migration (prose → structured)

1. Lift each themed group into a `sections[]` entry: framing line → `intro`; explanatory paragraphs → `body[]`; bullet affirmations → `quotes[]`; per-group tip → `whenToUse`; add a `prompt`.
2. **Re-attribute every quote** (most legacy "— AI-generated"/"— Unknown" → `"Anonymous"`; verify any named source). Don't carry over fabricated sources or false provenance ("from songs/poets").
3. Lift FAQ → `faq:`. Pull the opening blockquote → `opening`. Write `subtitle` from the title's keyword payoff.
4. **Replace the body** with the pointer comment (don't leave a duplicate prose copy — it drifts and hides fabrications).
5. Bump `lastEditedTime`; run the gate; verify locally.

---

## Review locally (always do this)

```bash
npm run dev          # http://localhost:3000
```

- Open `/blog/<slug>` and read it in **both themes** (Sand/Dusk toggle in the header).
- Check: H1 is the short title, subtitle carries the keyword, every section has real prose before its affirmations, the copy buttons work, Related + FAQ render.
- Quick screenshot check (headless): `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --hide-scrollbars --window-size=1200,2400 --screenshot=/tmp/p.png http://localhost:3000/blog/<slug>`.

---

## Pitfalls we have actually hit

- **Fabricated attributions survive in the body.** When migrating, delete the old body — don't keep a prose duplicate. (A fake "licensed therapist" bio hid there once.)
- **Markdown in `reader:` prose** renders as literal `[text](/url)` / `**bold**`. Keep it plain text; cross-link via Related.
- **FAQ in the body** no longer emits schema — it must be `faq:` frontmatter now.
- **Naming a source you didn't verify.** "Adapted from <real author>" for a line they never wrote is a trust violation worse than `"Anonymous"`. Verify or use `"Anonymous"`.
- **Thin sections.** A section with `quotes[]` but empty `body[]` is just a styled list — it fails the whole reason the format exists.

---

## Reference map (go deep)

| Need | File |
|---|---|
| The output contract (the `reader:` schema) | `structured-reader-skill.md` |
| Master system + the §8 re-audit | `blog-os-master.md` |
| Content types + section plans | `page-structures-skill.md` |
| Affirmation craft + the attribution rule | `affirmation-craft-skill.md` |
| The accuracy & trust gate (blocking) | `accuracy-and-trust-skill.md` |
| Title / meta / slug artifacts | `title-meta-slug-skill.md` |
| FAQ / PAA + snippet capture | `featured-snippet-skill.md` |
| Schema/meta the route emits | `seo-and-schema-skill.md` |
| Voice lock | `research/voice_profile.md` |
| Variety log | `protocols/rotation-log.md` |
| Commands | `.claude/commands/{blog,b-write,b-review}.md` |

---

**One post at a time, each researched and gated.** The format carries the differentiation; the gate carries the trust.
