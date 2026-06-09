# BlogOS — Usage

> **For the current day-to-day workflow, use [`PLAYBOOK.md`](./PLAYBOOK.md)** — the operator runbook for the structured `reader:` format (the 2026 reader redesign). The "Day-to-day flow" and "hard rules" below describe the **legacy prose-body** flow and are kept for the un-migrated posts; where they say "affirmations are Markdown lists in the body / leading blockquote / FAQ in the body," the structured contract instead puts that content in the `reader:` block and `faq:` frontmatter (see `structured-reader-skill.md`). Commands and path conventions below are still accurate.

One default workflow (manual, research-driven) and three optional commands.

## The workflow at a glance

The default is a manual pipeline you drive yourself. There's no orchestrator and no stored keyword pipeline — research is WebSearch/WebFetch. For each post:

1. **Pick a topic** with clear intent (a keyword like "affirmations for anxiety", or a gap in an existing cluster).
2. **Identify the content type** from `page-structures-skill.md` — 💫 collection, 📅 daily/occasion, 🙏 faith/scripture, or 🧘 practice guide (plus any audience/tone modifier).
3. **Research the SERP with WebSearch** — read the top posts and the People-Also-Ask box, then WebFetch any source you need to confirm a fact (the psychology of affirmations, a scripture quote, a health/money claim).
4. **Assemble a brief** — the angle that makes it non-generic (the grouping scheme, the real how-to-use, the sourced why-it-works), the FAQ from PAA, the heading skeleton, the sibling posts to cross-link.
5. **Draft the post** as plain-Markdown MDX per the content type's spec in `page-structures-skill.md` — frontmatter first, then the body: a leading blockquote answer box, the grouped affirmation lists, the framing, the FAQ, one CTA.
6. **Check every affirmation is well-formed and safe** (`affirmation-craft-skill.md`) — present tense, first person, positive framing, believable or laddered, no denial/toxic positivity.
7. **Verify factual claims** against reputable sources and cite them; quote any scripture exactly with the translation named; add a support-not-replace note where the topic is clinical (`accuracy-and-trust-skill.md`).
8. **Run the re-audit** (`google-trust-audit-skill.md` + the gate in `accuracy-and-trust-skill.md`).
9. **Write the file** to `content/posts/<slug>.mdx`. Drop the featured image at `public/blog/<slug>.webp` and any inline images at `public/blog/<slug>-content-N.webp`.

## Optional commands

These live as plain markdown files in `.claude/commands/<name>.md`.

```
/blog                                           # load the pack into chat
/b-write <topic/keyword>                        # research + draft → content/posts/<slug>.mdx
/b-review <slug>                                # audit + fix an existing post
```

`/b-write` takes a topic, infers the content type, researches via WebSearch, assembles the brief, drafts as plain-Markdown MDX, checks every affirmation, verifies facts/scripture, runs the re-audit, and writes `content/posts/<slug>.mdx`. `/b-review` resolves `content/posts/<slug>.mdx`, audits against the full pack, re-checks the affirmations, re-verifies facts, and writes back — refusing to ship if a harmful affirmation or an unverifiable claim remains. `/blog` just loads the pack for brainstorming or manual edits.

---

## The 4 content types (defined in page-structures-skill.md)

| Type | Use for |
|---|---|
| 💫 Themed affirmation collection | "Affirmations for X" → grouped list + how-to-use + sourced why-it-works ("affirmations for anxiety", "self-love affirmations", "money affirmations") — the core type |
| 📅 Daily / occasion set | A time- or occasion-anchored set ("365 daily affirmations", "Monday affirmations", "morning affirmations") |
| 🙏 Faith / scripture set | Affirmations each paired with an accurately cited verse ("Bible affirmations", "I am affirmations from the Bible") |
| 🧘 Practice guide | Teaches the method, with examples ("how affirmations work", "how to write affirmations", "manifestation for beginners") |

Audience tuning (women, men, kids, teens) and tone tuning (funny, sweary) are modifiers on a type, not separate types. Infer the type from the keyword's intent, or ask if ambiguous.

---

## The hard rules

1. **MDX output, plain Markdown elements only.** Frontmatter first, body second, no preamble, no closer. H1 in frontmatter `title:` only — the body starts (often after an image) with a top blockquote answer box. No `#` H1 in the body (use `##`/`###`), no invented JSX components, no `$…$` math, no `{#id}` anchors. GFM tables render (remark-gfm) but are used sparingly — prose and grouped lists usually read better.
2. **Well-formed affirmations.** Present tense, first person, positively framed (affirm what you want, not what you fear), believable or laddered, short and speakable, grouped so the list helps. No denial / toxic positivity, no guaranteed-outcome phrasing (`affirmation-craft-skill.md`).
3. **Accuracy & trust is a publish gate.** Every affirmation is read as the reader and confirmed safe. Every load-bearing claim (the science of affirmations, a study, a scripture quote, a health/money claim) is verified against a reputable source and cited; use honest hedges where the evidence is modest; no fabricated facts or fake statistics. Scripture is quoted exactly with the translation named. A support-not-replace note appears where the topic is clinical. A harmful affirmation or an unverifiable claim → the post does not ship (`accuracy-and-trust-skill.md`).
4. **Content-type skeletons guide structure.** Read `page-structures-skill.md`. Each type has a frontmatter shape, a body skeleton, and a word-count band. Adapt to what the SERP rewards.
5. **No fake briefs, no invented facts.** The brief comes from WebSearch research, not assumptions. If the brief lacks a way to make the post non-generic or a sourced fact, don't write one — mark it `NEEDS MORE RESEARCH`.

---

## Day-to-day flow

### Writing one post

Worked example: **"affirmations for anxiety"**, a 💫 themed collection.

1. Identify the type (💫 collection) and the angle that beats the SERP (most rank a bare list — we add a real "how to use", a sourced "why they help", and a gentle ladder for an anxious reader).
2. WebSearch the keyword → read the top 10 results, the PAA, and the snippet currently winning. WebFetch a psychology source to confirm what the research actually supports.
3. Synthesize the brief → the grouping (an-anxious-moment / racing-thoughts / grounding), the FAQ from PAA, the heading outline, the sibling posts to link (sleep, self-love).
4. Draft as plain-Markdown MDX: the leading blockquote answer, the grouped affirmation lists, the "why they help" with the citation and a light support-not-replace note, the FAQ, one CTA.
5. Read every affirmation as an anxious reader — present tense, first person, no denial, laddered where tender. Verify the science citation and any stat.
6. Run the re-audit, then write `content/posts/affirmations-for-anxiety-finding-peace-inner-calm.mdx`. Drop the featured image at `public/blog/affirmations-for-anxiety-finding-peace-inner-calm.webp`.

Review at `/blog/<slug>` after `npm run dev`.

### Writing a batch

Do one topic at a time. Each post needs its own research pass and its own affirmation check — don't fan out N keywords at once.

### Updating an existing post

Edit `content/posts/<slug>.mdx` directly → save → re-audit (or `/b-review <slug>`) → re-check the affirmations, re-verify facts, correct what manual edits missed. Bump `lastEditedTime` in the frontmatter — it feeds JSON-LD `dateModified` and og:modifiedTime.

---

## Path conventions

| Artifact | Location |
|---|---|
| Post MDX output | `content/posts/<slug>.mdx` (flat directory) |
| Featured image | `public/blog/<slug>.webp` (frontmatter `featuredImage: "/blog/<slug>.webp"`) |
| Inline images | `public/blog/<slug>-content-N.webp` → `![alt](/blog/<slug>-content-1.webp)` |
| Asset generation (optional) | `scripts/gen-assets.mjs` |
| Post loader | `lib/posts.ts` (`gray-matter`) |
| Renderer | `components/MdxContent.tsx` (`next-mdx-remote` + `remark-gfm`), `app/blog/[slug]/page.tsx` |
| Voice profile | `research/voice_profile.md` (lock), `protocols/site-voice-profile.md` (guide) |
| Rotation log | `protocols/rotation-log.md` |
| Optional commands | `.claude/commands/{blog,b-write,b-review}.md` |

---

## What's NOT needed

- **No research API or keyword pipeline.** This site has no DataForSEO/Apify pipeline and no `plan/` folder. WebSearch / WebFetch cover SERP recon and fact-checking.
- **No manual orchestrator.** You drive the pipeline; the pack supplies the discipline.
- **No install.** The pack is markdown files in `protocols/blog/`. The slash commands are markdown files in `.claude/commands/`. Both load via `@` references.
- **No React templates.** Every post renders through the single `app/blog/[slug]` route via `lib/posts.ts` + the `MdxContent` component map. The content type carries the shape; the CTA is an inline Markdown link to a sibling affirmation post.

---

## Pack file map

See `protocols/blog/README.md` for the full file list. The pack covers writing craft, SEO, E-E-A-T, scannability, the affirmation craft & terminology guide, the accuracy & trust gate, keyword research via WebSearch, and the 4 content types.
