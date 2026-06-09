---
name: topical-authority
description: The hub-and-spoke (pillar-cluster) content architecture that signals topical authority to Google for aurasyncs.com's affirmation content. This skill is how a site of 100 posts becomes a recognized authority on affirmations rather than 100 disconnected pages. Covers pillar selection (a Money/Abundance pillar, a Faith pillar, an Anxiety/Mental-Health pillar, a Daily-Practice pillar), cluster mapping, inline internal-linking discipline via Notion rich-text hrefs, and when to write a new cluster vs expand an existing post.
---

# Topical Authority — hub-and-spoke

> Google does not just rank individual pages anymore. It ranks sites for *topics*. A site with a well-organized pillar plus 8-15 supporting cluster pages will outrank a site with 50 disconnected pages on the same topic, even if the disconnected pages are individually better written.

---

## The model in one diagram

```
                        Pillar page (head term)
                        e.g. "Money Affirmations"
                              ▲
                              │  internal links
                              │
            ┌────────┬────────┼────────┬────────┐
            │        │        │        │        │
        Cluster 1  Cluster 2  ...   Cluster 4   Cluster 5
        "money     "abundance      "manifesta-  "money
         affirma-   affirmations"   tion         affirma-
         tions for                  affirmations tions while
         financial                  for          you sleep"
         abundance"                 beginners"

                    (clusters link to each other
                     AND back up to the pillar)
```

The pillar covers the head term comprehensively. Each cluster covers one specific long-tail under it — a themed collection, a daily/occasion set, a faith set, or a practice guide. Clusters link **up** to the pillar and **across** to siblings. The pillar links **down** to every cluster. That dense cross-linking is the spine of the whole graph.

This is the structure Google's notion of "topical authority" was built to recognize.

---

## How linking physically works on this site

Internal links live in the **body**, as **inline Notion rich-text `href`s**. In the `blocks` array, a link is a run of rich text inside a paragraph (or list item) with its `href` set to the relative path of the target post:

- To a sibling post: a rich-text run with `href: "/blog/<sibling-slug>"` and the anchor text = the sibling's target query.
- To the pillar: a rich-text run with `href: "/blog/<pillar-slug>"`.

`components/NotionRenderer.tsx` renders these rich-text runs as styled `<a>` links. There is **no Markdown `[text](url)` in the body** — the body is Notion blocks, so every link is a rich-text run with an `href`. Relative paths resolve against the site root. Posts live flat under `/blog/<slug>`.

There is **no separate "related posts" property and no coloring-collection namespace** — the only internal-link mechanism is the inline body href. So put real editorial links in the prose where the sibling topic genuinely relates; that *is* the topical signal.

The real link targets you'll pair posts with are other posts in `content/posts/` (verify the slug in `content/posts/_index.json` before linking — never link a 404):

| Cluster | Real slugs to link (examples) |
|---|---|
| money / abundance / manifestation | `/blog/money-affirmations-for-financial-abundance`, `/blog/abundance-affirmations-manifest-prosperity-and-success`, `/blog/money-manifestation-affirmations-quotes`, `/blog/manifestation-affirmations-for-beginners` |
| faith (Bible / Christian) | `/blog/bible-affirmations-verses-faith`, `/blog/biblical-affirmations-strengthening-faith-through-gods-promises`, `/blog/i-am-affirmations-from-the-bible`, `/blog/christian-affirmations-for-work-strengthen-your-faith-and-success` |
| anxiety / mental-health | `/blog/affirmations-for-anxiety-finding-peace-inner-calm`, `/blog/anxiety-affirmations-calm-your-mind`, `/blog/mental-health-positive-affirmations-quotes` |
| daily / occasion | `/blog/365-daily-affirmations-year-of-empowering-words`, `/blog/morning-affirmations-to-transform-your-day`, `/blog/monday-affirmations-start-your-week-with-positivity-and-motivation`, `/blog/friday-affirmations-to-end-your-week-strong` |

---

## Selecting pillars

A pillar is worth writing only when:

1. The head term has meaningful search demand (judged from autocomplete strength + competitor count — see `keyword-research-skill.md`; there's no stored volume number to look up)
2. You have or can write ≥ 6 cluster pages under it
3. The topic is genuinely within the site's domain (affirmations for a need, audience, or practice)
4. You can credibly take an angle that beats the existing top 3

aurasyncs.com's natural pillars map onto the site's real clusters:

- **PILLAR "Money Affirmations"** — hubs the money/abundance/manifestation spokes (`money-affirmations-for-financial-abundance`, `abundance-affirmations-manifest-prosperity-and-success`, `money-manifestation-affirmations-quotes`, `manifestation-affirmations-for-beginners`). Frame money/manifestation as a mindset practice, never a guaranteed outcome (see `accuracy-and-trust-skill.md`).
- **PILLAR "Bible Affirmations"** — hubs the faith spokes (`bible-affirmations-verses-faith`, `biblical-affirmations-strengthening-faith-through-gods-promises`, `i-am-affirmations-from-the-bible`, `christian-affirmations-for-work-strengthen-your-faith-and-success`). Every scripture quoted accurately with a named translation.
- **PILLAR "Affirmations for Anxiety"** — hubs the anxiety/mental-health spokes (`affirmations-for-anxiety-finding-peace-inner-calm`, `anxiety-affirmations-calm-your-mind`, `mental-health-positive-affirmations-quotes`, and the calming `sleep-affirmations-relax-your-mind-and-enjoy-restful-sleep`). Carry the light "support, not a replacement for care" note throughout.
- **PILLAR "Daily Affirmations"** — hubs the time-anchored sets (`365-daily-affirmations-year-of-empowering-words`, `morning-affirmations-to-transform-your-day`, `monday-affirmations-start-your-week-with-positivity-and-motivation`, `friday-affirmations-to-end-your-week-strong`, `good-morning-affirmations-quotes`).

Other ready clusters worth a pillar as the library grows: **self-love** (`affirmations-for-self-love`, `self-love-affirmations-confidence-worth`), **confidence**, **chakra** (`root-`/`sacral-`/`crown-chakra-affirmations`), and **audience** (women/men/kids/teens variants).

For each candidate pillar, list 6+ candidate clusters before committing. If you can't list 6, the pillar is too narrow and should be a cluster instead. The blog index (`content/posts/_index.json`) is the source for what exists.

---

## Mapping a cluster

For a chosen pillar, the cluster map enumerates every spoke. Example for the Money pillar:

| Cluster slug | Target query | Type | Status |
|---|---|---|---|
| `money-affirmations` | "money affirmations" | Pillar | Pillar |
| `money-affirmations-for-financial-abundance` | "money affirmations for financial abundance" | Themed collection | Published |
| `abundance-affirmations-manifest-prosperity-and-success` | "abundance affirmations" | Themed collection | Published |
| `money-manifestation-affirmations-quotes` | "money manifestation affirmations" | Daily/quote set | Published |
| `manifestation-affirmations-for-beginners` | "manifestation affirmations for beginners" | Practice guide | Published |
| `empower-your-mind-wealth-affirmations-abundance-prosperity` | "wealth affirmations" | Themed collection | Published |

Example for the Faith pillar:

| Cluster slug | Target query | Type | Status |
|---|---|---|---|
| `bible-affirmations` | "bible affirmations" | Pillar | Pillar |
| `bible-affirmations-verses-faith` | "bible affirmations verses" | Faith/scripture set | Published |
| `i-am-affirmations-from-the-bible` | "I am affirmations from the Bible" | Faith/scripture set | Published |
| `biblical-affirmations-strengthening-faith-through-gods-promises` | "biblical affirmations" | Faith/scripture set | Published |
| `christian-affirmations-for-work-strengthen-your-faith-and-success` | "Christian affirmations for work" | Faith × work set | Published |

This map lives in context for the write (and in `content/posts/_index.json` for what's already shipped). It is the source of truth for what clusters exist and which siblings each spoke pairs with. The writer reads it when writing any post in the cluster so the inline body hrefs resolve to the right real slugs.

---

## Internal-link discipline

Every post links **up** and **across** — and pillars also link **down** — via inline body rich-text hrefs.

### Cluster post internal-link rules

- **1 link up to the pillar** — in the introduction or first major section. Anchor text = the pillar's exact target query. ("…this is one piece of our bigger guide to [money affirmations](/blog/money-affirmations)…")
- **≥ 3 links across to sibling posts** — placed where the sibling topic genuinely relates, not dumped in the conclusion. ("…ready to focus on the mindset behind it? Try [manifestation affirmations for beginners](/blog/manifestation-affirmations-for-beginners).")
- **0-2 links to posts outside the cluster**, only when relevant — e.g. an anxiety set linking across to a calming [sleep affirmations](/blog/sleep-affirmations-relax-your-mind-and-enjoy-restful-sleep) set.

Total internal-link minimum per post: pillar (1, where one exists) + ≥ 3 siblings — landing around the 3–6 internal links the writing guide calls for. Keep links contextual so they read as editorial, not stuffed. (Each link is a Notion rich-text run with an `href`; there is no related-posts array to maintain alongside it.)

### Pillar internal-link rules

- **Link down to every cluster post** in the relevant "where to start" or "popular sets" section.
- **Group cluster links by sub-topic** when there are > 8 clusters (e.g. for a Daily pillar: morning, Monday/Friday, 365, kids/women variants).
- **No "see also" appendix** — surface links in the body where they're relevant.

### Anchor text rules

The anchor text on an internal link is the single most powerful internal-SEO signal Google has. Rules:

- Anchor text = the linked page's target query, or very close
- Anchor reads naturally and warmly in the surrounding sentence
- Never "click here," "this article," "learn more"
- Never the exact same anchor text linking to the same page twice on one page

Example body sentence from a money collection:

> "If you're just starting out, our guide to [money affirmations](/blog/money-affirmations) ties it all together; for the mindset behind manifesting, try [manifestation affirmations for beginners](/blog/manifestation-affirmations-for-beginners), and to keep the abundance feeling going, read [abundance affirmations](/blog/abundance-affirmations-manifest-prosperity-and-success)."

Each anchor is the target query of the linked page — natural English that doubles as the SEO signal, and each is a real, published slug.

---

## Hub-and-spoke math: what good looks like

For a healthy pillar:

- 1 pillar post (2,000-3,500 words)
- 8-15 cluster pages (themed collections ~900–1,600 words; daily sets and practice guides similar)
- Every cluster links up to the pillar (so the pillar gets 8-15 inbound internal links)
- Each cluster links to ≥ 3 siblings (so each cluster accrues many inbound links from siblings)
- The pillar links down to every cluster (so each cluster gets 1 link from the pillar)

Net per cluster: a handful of outbound contextual links, many inbound from siblings + pillar. This density is what Google reads as "this page is a recognized part of a topic the site covers seriously."

---

## When to write a new cluster vs expand an existing post

A common mistake: writing 20 short posts on adjacent sub-questions when one comprehensive post would serve users better and rank harder. (Synonym intents like "anxiety affirmations" / "affirmations for anxiety" should be **one** canonical page targeting the variants on-page, not separate posts — note the site currently has both `affirmations-for-anxiety-finding-peace-inner-calm` and `anxiety-affirmations-calm-your-mind`; if they cannibalize, consolidate to one canonical page and redirect the other.)

### Write a NEW cluster when:
- The query has a meaningfully different intent (themed collection vs daily set vs practice guide vs faith set)
- The query targets a different need, audience, or life moment
- Combining would push the post past ~2,000 words and dilute focus
- The existing post is already optimized and ranking well — don't disturb it

### EXPAND an existing post when:
- The new question shares the existing post's intent
- The existing post is short (< 1,000 words) and would benefit from depth
- The new question is a natural sub-section of the existing post
- The existing post isn't ranking well yet — expansion is cheaper than a new post

When expanding, the workflow is:

1. Open the post in **Notion** (the source of truth) and add the new heading_2 + content blocks
2. Add any new source citations inline where a load-bearing claim is made (psychology of affirmations, any study, any scripture, any health/money claim)
3. Add any new sibling inline links (rich-text hrefs) where the new section genuinely relates
4. Re-verify any psychology/scripture/health/money claim per `accuracy-and-trust-skill.md`, and confirm every affirmation is still well-formed
5. Set **Status** to "Done" and re-run `node --env-file=.env scripts/migrate-notion.mjs` so the updated `content/posts/<slug>.json` ships (there is **no `dateModified` property** — track the change via git history; **Created** is the only date the post carries)
6. Re-audit the expanded post

---

## Topical map maintenance

The cluster map lives in context for each write, anchored to `content/posts/_index.json` (what's shipped). Keep your mental map current:

- When a new post in the cluster is planned or published (Status → Done, migrate script run)
- When a post is retired
- When a post is consolidated into another (redirect the old slug)

The writer reads `content/posts/_index.json` to know which siblings exist and link to when writing a new post. Keeping that current is what makes the inline internal linking reliable and 404-free.

---

## When the cluster is multi-pillar

Some topics genuinely sit between two pillars — e.g. `christian-affirmations-for-work-strengthen-your-faith-and-success` belongs to the Faith pillar but also feeds a Work cluster. The post links up to both, with anchor text that differentiates which aspect goes where:

> "Grounded in scripture? See our [Bible affirmations](/blog/bible-affirmations-verses-faith). Looking for steadiness on the job specifically? Try our [positive work affirmations](/blog/positive-work-affirmations-motivation-success-daily)."

Multi-pillar links are the exception. If half a cluster's posts link to two pillars, the pillars probably need consolidating or the cluster splitting.

---

## The semantic neighborhood

Beyond explicit linking, posts in a cluster share *semantic* signals — the same needs, questions, affirmation-craft vocabulary, and sources. Google's modern understanding picks up on this.

To strengthen it:

- Reuse the same canonical way of describing how affirmations work, the same affirmation-craft terms (present tense, first person, believable "ladder" affirmations), and the same trusted sources across cluster posts (see `affirmation-craft-skill.md`)
- Use consistent guidance — don't say "you must believe it 100%" in one post and "believability doesn't matter" in another; pick the sound version (believable, within-reach affirmations) and reuse it
- Cross-reference the same verified psychology/scripture and worked example affirmations across posts where they genuinely apply

This makes the cluster read as one warm, coherent voice across the set (AuraSyncs' warm, empowering voice), not a content farm's scattered coverage.

---

## What kills topical authority

- **Orphan posts** — posts with zero inbound internal links. They signal the site doesn't recognize the post as part of any topic.
- **Tag-only architecture** — relying on Notion **Tags** for navigation instead of explicit body links. Tags are weak signals.
- **Duplicate-intent posts** — two posts targeting the same query (e.g. the two anxiety pages, or the two money-manifestation pages). Pick one canonical page, redirect the rest.
- **Pillar without clusters** — a long pillar with no supporting spokes reads as a one-off, not a hub.
- **Clusters without a pillar** — 10 related posts with no central pillar to anchor them.
- **Broken links** — an inline href pointing at a slug that isn't in `content/posts/_index.json`. Verify every link target is real before publishing.

---

## Pre-publish topical authority checklist

- [ ] Post's cluster and pillar identified (from `content/posts/_index.json` + the cluster map)
- [ ] Inline body link UP to the pillar present (for clusters), as a rich-text href
- [ ] ≥ 3 inline body links across to sibling posts (for clusters), as rich-text hrefs
- [ ] Anchor text = the target query of each linked page
- [ ] No "click here" / "learn more" anchors
- [ ] Contextual internal links kept to a readable density (~3-6)
- [ ] All links use real `/blog/<slug>` routes verified against `content/posts/_index.json` (no 404s)
- [ ] Money/manifestation framed as mindset (not guaranteed); scripture cited with translation; clinical topics carry the support-not-replacement note
- [ ] Cluster map / `_index.json` reflects the new post once it ships (Status → Done, migrate script run)

---

**BlogOS** — sites that rank cover topics, not pages.
