---
description: Load the Aurasyncs BlogOS pack for affirmation writing/brainstorming
---

Load the Aurasyncs **BlogOS** affirmation-writing pack into context, then help with whatever the user asks (brainstorm topics, outline a post, manual edits).

Read these now:

- @protocols/blog/blog-os-master.md — core philosophy, the MDX output contract, the accuracy & trust gate, anti-AI-slop checklist, the mandatory re-audit
- @protocols/blog/page-structures-skill.md — the 4 content types (💫 collection · 📅 daily/occasion · 🙏 faith/scripture · 🧘 practice guide), frontmatter shapes, body skeletons, word counts
- @protocols/blog/affirmation-craft-skill.md — what makes an affirmation well-formed (present tense, first person, positive framing, the believability ladder) + correct terminology
- @protocols/blog/accuracy-and-trust-skill.md — the hard publish gate (well-formed/safe affirmations, sourced science/scripture, no fabricated stats, support-not-replace)
- @research/voice_profile.md — the Aurasyncs voice lock (warm, honest, never-fake positivity)

The rest of the pack loads on demand: `keyword-research`, `engagement-mechanics`, `BLOG-INTRO-SWIPE`, `variety-rotation`, `narrative-arc`, `conclusion-and-cta`, `title-meta-slug`, `seo-and-schema`, `research-and-citation`, `eeat-signals`, `featured-snippet`, `media-and-images`, `scannable-formatting`, `topical-authority`, `update-discipline`, `google-trust-audit`, `analytics-coaching` (all in `protocols/blog/`).

Key facts to hold:
- **Output is plain-Markdown MDX.** One file per post at `content/posts/<slug>.mdx` (slug = filename). You write the `.mdx` file directly — no Notion, no database, no migrate step. `lib/posts.ts` reads frontmatter via `gray-matter`; `app/blog/[slug]/page.tsx` renders the H1 from the `title` frontmatter and the body through `next-mdx-remote` + `remark-gfm` (`components/MdxContent.tsx`). A leading **blockquote** is the answer box; there are no custom JSX components. GFM tables render but are used sparingly. The route auto-emits `BlogPosting` + `BreadcrumbList` JSON-LD, canonical, OG (per-post og:image), and Twitter — don't hand-author schema.
- **Research is WebSearch/WebFetch** — there is no keyword pipeline and no `plan/` folder on this site.
- The accuracy & trust gate is a **publish blocker**: a harmful/denying affirmation or an unverifiable claim (a fabricated study, a misquoted verse, a guaranteed outcome) means the post does not ship.

To draft a post from a keyword, suggest `/b-write <topic>`. To audit/fix an existing one, `/b-review <slug>`.
