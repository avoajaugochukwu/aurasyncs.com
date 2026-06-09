# Aurasyncs SEO Content Queue

Data basis: Google Search Console, last 3 months (export 2026-06-08).
Snapshot: 7 clicks / 5,940 impressions, avg position ~60. 57 posts indexed (indexing is healthy — this is a **rankings** problem). Only 11 of 816 queries rank in the top 20.

The site already ships (done in code): topical **internal-linking clusters**, **related-posts** blocks, **FAQ schema** support (frontmatter `faq:`), a de-thinned **/blog** hub grouped by topic, and the first **cannibalization merge** (self-love).

Work the tracks top-down. For every `b-review`/`b-write` pass, do the standard moves:
- Match list intent: strong numbered lists, scannable H2 questions.
- Add a `faq:` frontmatter block (4+ Q&A) → triggers FAQ schema + "People Also Ask" capture.
- Bump `lastEditedTime` to today (freshness signal → re-crawl).
- Tighten the title for CTR: numbers + brackets (e.g. "50+ … (2026)").

---

## Track A — Win the winnable niche: Funny & Sweary (highest ROI)

This is the ONE cluster already on page 1–2. Low competition; the domain can rank here now.

| Action | Target | Current | Why |
|---|---|---|---|
| `b-review` | `sweary-affirmations-bold-funny-motivating-quotes` | **pos 14.8**, 170 imp, 8 clicks | Closest to the top of anything we have — push to top 5. |
| `b-review` | `funny-affirmations-to-brighten-your-day` | pos 47.9, 423 imp | Big impressions, adjacent intent. |
| `b-write` | **"sweary affirmation cards"** | query at pos 19.6 | Striking distance, demand confirmed in GSC. |
| `b-write` | **"sweary / swearing motivational quotes"** | queries pos 22–24 | Same cluster, easy wins. |
| `b-write` | "sweary affirmations for work" / "for the gym" | net-new long-tail | Extends the cluster's topical authority. |

New posts auto-join the "Funny & Sweary" cluster and cross-link automatically.

---

## Track B — Differentiate the Work cluster (cannibalization, content not redirect)

Three pages fight over "work affirmations." Don't redirect — give each a distinct primary target via `b-review`:

| Page | imp / pos | Retarget to |
|---|---|---|
| `positive-work-affirmations-motivation-success-daily` | 467 / 72.7 | **Primary:** "positive work affirmations" / "work affirmations" |
| `positive-affirmations-for-work-confidence-productivity` | 472 / 80.8 | "affirmations for **work stress**" / "work confidence" (query "positive affirmations for work stress" = 69 imp, pos 91 → real demand) |
| `work-affirmations-for-success-and-balance` | 106 / 73.5 | "**work–life balance** affirmations" |

Sharpen each H1/title/intro to its distinct angle; they then reinforce (not cannibalize) each other.

---

## Track C — Lift the high-impression pages (`b-review`, in this order)

Prioritized by **closeness to page 1 × impressions** (least distance to climb first):

1. `money-manifestation-affirmations-quotes` — 346 imp, **pos 37** ← best-positioned head term, do first
2. `scientific-healing-affirmations` — 225 imp, **pos 39**
3. `empower-your-mind-wealth-affirmations-abundance-prosperity` — 371 imp, pos 49, 5 clicks
4. `abundance-affirmations-manifest-prosperity-and-success` — 118 imp, pos 46
5. `health-affirmations-for-healing-and-wellness` — 464 imp, pos 57
6. `confidence-affirmations-to-build-self-esteem` — 511 imp, pos 67
7. `self-love-affirmations-confidence-worth` — 980 imp (just merged + refreshed — **monitor**, don't touch yet)
8. **Chakra cluster** — build a pillar post ("chakra affirmations" parent, pos 76) that links to root/sacral/crown; classic hub-and-spoke.

---

## Track D — Authority (outside b-write/b-review — the honest gap)

Head terms like "self love affirmations" (238 imp, pos 69) and "health affirmations" (pos 53) are gated by **backlinks/domain authority**, not on-page. On-page work alone won't crack page 1 for these. Pursue in parallel:

- **Pinterest** — affirmations are a top Pinterest category; branded quote pins drive real traffic + referral links. Highest-leverage channel for this niche.
- Digital PR / guest posts / HARO for a handful of authoritative backlinks.
- Internal linking (now shipped) compounds as new cluster posts land.

**Realistic outcome:** Tracks A + B + internal linking move long-tail and low-competition terms to page 1–2 over weeks; head terms need links + continued domain aging.

---

## Done (shipped in code)
- Internal-linking clusters + related-posts blocks (was: zero internal links between posts).
- FAQ schema capability (`faq:` frontmatter) — use it on every reviewed/new post.
- `/blog` de-thinned + grouped by topic with a browse-by-topic nav (fixes "crawled – not indexed").
- Self-love consolidation: merged `affirmations-for-self-love` → `self-love-affirmations-confidence-worth` (50+ affirmations, FAQ, refreshed) + **301** redirect.
