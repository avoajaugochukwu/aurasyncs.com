---
name: analytics-coaching
description: Read your web analytics and Google Search Console to diagnose post problems on Aurasyncs. Replaces FacelessOS's retention-coaching-skill (which read YouTube Studio retention graphs). This is the skill for post-publish optimization — what does it mean when an affirmation set has high impressions but low CTR, or high CTR but low time-on-page, or readers who land on a thin list and bounce, or a collection quietly losing to a competitor?
---

# Analytics Coaching — diagnose what the post is actually doing

> A post can be perfectly written and still underperform — and the data tells you specifically what's wrong. This skill is how to read your web analytics + Google Search Console and translate the numbers into the specific writing / SEO fix to apply. It is **tool-agnostic**: whatever analytics package the site runs (a privacy-light tool, GA4, server logs, or none yet), the shapes below are read from whatever pageview / engagement signals you have. Don't assume a specific tool is installed.

---

## The two data sources

### Google Search Console (GSC)

Tells you what's happening *in the SERP* before the click:

- Impressions (how many times the post showed up in search results)
- Clicks (how many times someone clicked through)
- CTR (Clicks ÷ Impressions)
- Average position (1-100, where the post ranks for each query)
- Top queries the post ranks for

GSC is the "is the post discoverable and clickable" signal. It's free and should always be connected. (For this niche, also watch Pinterest referrals — a lot of "affirmations for X" traffic arrives from pins and saved quote-cards, not just Google.)

### Your web analytics

Tells you what's happening *on the page* after the click. Whatever tool you use, the signals that matter are:

- Visitors / pageviews
- Visit duration (average time on page)
- Bounce rate
- Scroll depth (if your tool captures it as an event)
- Outbound / internal clicks — most importantly, the **"opened a related set or practice guide" action** (a click from the post to a sibling collection or a "how to use affirmations" guide), and for longer collections, a **scroll-past-the-list** signal (did they reach the "how to use these" section, or stop at the list?)

If the site doesn't have a "clicked through to a related set / practice guide" event configured yet, set one up — it's the single most useful on-page conversion signal for this corpus (the post's job is to deepen the reader's practice and send them to the next set). Until then, infer it from outbound-click or next-page data.

Together: GSC tells you whether the post is *found and clicked*. Your analytics tell you whether it *keeps the reader and sends them to the next set or a practice guide*.

---

## The five performance shapes

Every published post falls into one of five shapes. Each shape has a specific diagnosis and fix.

### Shape 1: HIGH IMPRESSIONS, LOW CTR (poor SERP attractiveness)

**What you see:**
- GSC: 1,000+ impressions, < 1% CTR, average position 5-15
- The post is being shown to people, but they're clicking competitors instead

**Diagnosis:** the title and/or meta description aren't winning the click. Could also be a SERP feature (People Also Ask, an image pack of quote-cards) eating the click above the organic results — common for "affirmations for X" queries.

**Fix:**
1. Search the target query yourself and look at the SERP
2. Read your title and meta description from a searcher's perspective (remember: the frontmatter **`title`** is both the page H1 and the meta title; the meta description is the separate `metaDescription` field)
3. Compare to the top 3 organic results — what are they offering that yours isn't?
4. Iterate on:
   - Front-loading the query in the `title` ("50 Morning Affirmations to Start the Day Grounded" beats "A Gentle Way to Greet the Morning")
   - Adding a modifier (a count, for Women / for Men, Daily, Short, Powerful, Bible-based, [2026])
   - Rewriting the **`metaDescription`** (150-160 chars) with warm, active phrasing and a specific promise (the number of affirmations, "say these in two minutes," "no belief required to start")
   - Making sure the **`featuredImage`** is a strong, recognizable thumbnail — for image-forward queries the quote-card wins the click
5. Make the edit **in the `.mdx` frontmatter** at `content/posts/<slug>.mdx` (bump `lastEditedTime` while you're there), then wait 2-4 weeks. Compare CTR.

**Not the fix:** changing the body of the post. The body is fine — Google ranks it, but the SERP listing isn't winning the click.

### Shape 2: LOW IMPRESSIONS, ANY CTR (poor discoverability)

**What you see:**
- GSC: < 100 impressions per month, average position > 20
- The post isn't ranking high enough to be seen

**Diagnosis:** the post lacks topical authority signals or has technical SEO problems.

**Fix:**
1. Check the topical map — does this post have inbound internal links from siblings in its cluster (other themed collections, other faith sets, the topic hub)?
2. Check the `title` — is the target query in it?
3. Check the slug (the `.mdx` filename) — is the target query in it?
4. Check the body — does the target query appear naturally throughout, or only once?
5. Build internal links from 2-3 sibling posts to this one
6. Verify the post is in the sitemap and indexed (GSC → Coverage); confirm the `content/posts/<slug>.mdx` file exists (its existence is what publishes it — there's no status field or build step)
7. Wait 4-8 weeks. Re-check.

**Not the fix:** rewriting the body before fixing the topical authority and technical SEO.

### Shape 3: HIGH CTR, LOW ENGAGEMENT TIME (the bounce shape)

**What you see:**
- GSC: 2-5% CTR (above average)
- Analytics: visit duration < 30 seconds, bounce rate > 80%
- People click, see the page, and leave fast

**Diagnosis:** the title / description is over-promising or mis-framing what the post delivers — OR, common on a thin affirmation list, **the page is just a bare list with no framing**. They clicked "affirmations for anxiety" and got 40 lines with no "why these work" and no "how to use them," so there's nothing to hold them; they copy a couple and bounce (or bounce without copying any).

**Fix:**
1. Read the Title and Meta Description
2. Read the first thing on the page — is the warm direct answer in the **leading Markdown blockquote** (the answer box), and is the reader oriented within the first screen?
3. If the list is thin, add the missing scaffolding: a short **"why these work"** section (honest, sourced — see the trust model) and a **"how to use these"** section (when to say them, out loud vs. written, how many to pick). That framing is what turns a bounce into a read.
4. Either:
   - Align the Title/Description to what the post actually delivers
   - Or add the framing the title implied (a "for anxiety" set should feel calming and offer a method, not just dump lines)
5. The reader should know within the first screen that this is a caring, usable set — not a scraped list.

**Not the fix:** assuming the post is "just not what they were looking for" — it is, it's just missing the framing that makes a list usable.

### Shape 4: LONG ENGAGEMENT TIME, LOW SCROLL DEPTH (early payoff, no journey)

**What you see:**
- Analytics: visit duration 1-2 minutes
- Scroll-depth event (if captured): most readers stop at 25-40%
- People are reading, but only the top

**Diagnosis:** the top of the post is satisfying — they got the first group of affirmations — but the rest isn't pulling them through. A collection where readers stall at 40% means many never reach the later groups, the "how to use them" section, or the CTA; the strongest lines may all be front-loaded.

**Fix:**
1. Look at the H2 (`##`) list of the post
2. Are the H2s phrased as claims/questions that *promise specific value* ("The affirmations for the moment anxiety actually spikes") rather than labels ("More affirmations")?
3. Does the post have an arc (why they work → the affirmations, grouped → the harder/bolder ones → how to use them → close)? See the grouping slots in `variety-rotation-skill.md`.
4. Spread the strongest, most resonant lines through the groups, not all at the top
5. Add a re-hook around 30-40% — a "here's the one most people skip, and why it's the one to say" beat
6. Make sure any inline images (quote-cards) are light enough to load, so a slow image isn't where readers drop
7. Add internal links so a reader who finishes a section can keep going (to a related set or a practice guide)

**Not the fix:** writing a longer post. Scroll depth is a quality signal, not a length signal.

### Shape 5: HIGH ENGAGEMENT, HIGH SCROLL DEPTH, NO RELATED-SET/GUIDE CLICKS (engaged readers don't act)

**What you see:**
- Analytics: 3+ minutes visit duration, 75%+ scroll depth
- "Opened a related set / practice guide" action: 0 — they finish the post and leave without trying the next set or learning how to build the habit

**Diagnosis:** the reader is engaged but the CTA isn't right. Could be:
- CTA is too generic ("learn more")
- CTA is buried after a wall of closing text
- The reader has no obvious next step that matches their mood (they just read self-love affirmations — offer the confidence set, or a "how to make these a daily habit" guide)
- The post gives the affirmations but never points to the next set or the practice guide

**Fix:**
1. Look at the conclusion shape — is the warm close followed by a single specific CTA?
2. Is the CTA descriptive ("Make these a habit: read How to Use Affirmations Every Morning") or generic ("see more")?
3. Is a related set linked *early* — right under the answer box, at the moment a reader thinks "I'd love a calmer morning" — not only at the very bottom?
4. Are the internal cross-links actually set so they exist?
5. Add or rewrite: a single, specific link to the matching set or practice guide (e.g. `[Morning Affirmations](/blog/morning-affirmations)`). Plus an internal link at the peak-interest moment.

**Not the fix:** adding three competing CTAs.

---

## The query-level diagnosis (GSC)

Beyond per-post analytics, look at *what queries* each post ranks for.

### Healthy pattern
- Top query matches the post's intended target
- 5-10 supporting long-tail queries also rank
- All queries are topically aligned

### Unhealthy patterns

#### Pattern A: Mismatched top query
- The post ranks for a query you didn't target
- It doesn't rank for the query you did target

**Diagnosis:** Google has decided the post is about a different topic than you intended. Either your `title`/headings are mis-signaling, or the body is genuinely off-topic from your declared target. (Example: an "affirmations for anxiety" set that ranks for "sleep affirmations" instead — Google read it as a sleep post.)

**Fix:** Either re-align the post (rewrite `title`/headings/intro to actually target the declared query) or, if the post genuinely serves the other intent better, lean into that — and make sure a dedicated set exists for the original intent.

#### Pattern B: Long-tail without head term
- Post ranks for 20+ specific queries ("affirmations for social anxiety," "affirmations for anxiety at work")
- Doesn't rank for the main head term ("affirmations for anxiety")

**Diagnosis:** the post is a thin cluster competing with a non-existent pillar. The site needs the pillar.

**Fix:** Write the pillar (the comprehensive "affirmations for anxiety" collection/hub). Link the existing post(s) up to it.

#### Pattern C: Cannibalization / losing to a competitor
- Two posts on the same site rank for the same query, both poorly (e.g. "anxiety affirmations" and "affirmations for anxiety"), OR your collection is steadily losing position to a competitor's stronger one
- Neither of yours hits position 1-5; both float around 10-30

**Diagnosis:** duplicate intent diluting each other, or a single post that's been out-classed by a fresher, more complete competitor.

**Fix:** If it's two of your own, merge them (see `update-discipline-skill.md`) — pick the stronger as survivor, redirect the other. If you're losing to a competitor, study their post: more (and better-formed) affirmations, a clearer "how to use them," a real "why they work" section, fresher framing — then do a substantive refresh that beats it.

---

## Tracking the right metrics

You don't need 50 metrics. The five that matter:

| Metric | Where | Target |
|---|---|---|
| **Impressions** | GSC, last 28 days | Growing month over month |
| **CTR** | GSC, last 28 days | > 2% on average; > 5% on top posts |
| **Average position** | GSC, last 28 days | < 15 within 6 months of publish; < 10 within 12 |
| **Visit duration** | Your analytics | > 90 seconds on collections; > 3 min on pillars / practice guides |
| **Related-set/guide-click rate** | Your analytics (custom action) | Site-specific — track the trend (the core conversion: post → next set or practice guide) |

Set up GSC alerts for:
- Posts dropping > 50% impressions month-over-month (something broke)
- Posts dropping > 20% CTR month-over-month (SERP competition changed)
- Sudden new high-impression query (an opportunity to update the post to capture more)
- A seasonal/occasion post climbing (its window is arriving — make sure it's freshened)

---

## When to update vs leave alone

GSC + your analytics tell you which posts deserve attention:

| Signal | Action |
|---|---|
| Post is ranking #1-3 + good CTR + good engagement | Leave alone. Don't touch a winner. |
| Post is ranking #5-15 + good CTR + good engagement | Update lightly — refresh a few affirmations, add a quote-card, link a new set. |
| Post is ranking #15-30 + decent CTR + okay engagement | Substantive update — new groups/lines, better internal linking, surface the related-set link earlier. |
| Post is ranking > 30 + low CTR + low engagement | Question whether to rewrite, replace, or sunset. |
| Post is ranking #1-3 + good CTR + low engagement | The opening is right but the body is failing. Rewrite the middle — spread the strong lines, add a re-hook, add "how to use these." |
| Post is ranking #5-15 + low CTR + low engagement | `title` / `metaDescription` rewrite. The post itself might be fine. |

See `update-discipline-skill.md` for the full update / replace / sunset decision tree.

---

## The monthly analytics rhythm

A reasonable cadence for a site of 30-100 posts:

### Weekly (5 min)
- Glance at GSC top performers and top decliners (and Pinterest referrals)
- Note any post with a sudden 50%+ change

### Monthly (45 min)
- Review every post's impressions / CTR / visit duration / related-set-click rate
- Triage: leave / light update / substantive update / replace / sunset
- For each substantive update, schedule the work
- Flag any seasonal/occasion post whose window is within 6 weeks

### Quarterly (3 hours)
- Topical map review — are clusters (self-love, anxiety, confidence, abundance, faith, daily) healthy?
- Pillar refresh — are pillars still ranking? Do they need new groups?
- Stale post audit — anything ranking poorly or losing to a competitor that should be refreshed or retired

### Annually
- Full corpus audit — every post checked against the freshness model
- Voice profile updated based on the year's audience signals (`protocols/site-voice-profile.md`)
- Topical map redrawn if site direction has shifted

---

## What the data does NOT tell you

Some things analytics can't measure:

- Whether the post is *good* — only whether it's engaged with
- Whether the post is *trustworthy* — only whether it's clicked
- Whether the affirmations are *well-formed and non-harmful* — no analytics tool catches a line that's subtly shaming or a "why they work" claim that's overstated; only a content review does (see `accuracy-and-trust-skill.md`)
- Whether a scripture quote is accurate or a manifestation claim overpromises — only a content review catches that
- Whether the post is *helpful* — visit duration is a proxy, not a measure
- Whether the post will rank *next month* — past performance isn't future ranking

So: read the data, but also read the post. The data is a flashlight on what's happening, not the judgment of what to do.

---

## Pre-update analytics checklist

Before deciding to update a post, check:

- [ ] What's the current impression count?
- [ ] What's the current CTR?
- [ ] What's the average position for the target query?
- [ ] What other queries does the post rank for?
- [ ] What's the visit duration?
- [ ] What's the scroll depth (if available)? Do readers reach the "how to use these" section / the CTA?
- [ ] What's the related-set/guide-click rate for this post?
- [ ] How are Pinterest / referral sources trending?
- [ ] What changed in the last 28 days?

Then decide which of the five shapes the post is in, and apply the matching fix.

---

**BlogOS** — read the data, then read the post.
