#!/usr/bin/env python3
"""Turn master_keywords.csv into a human, prioritized plan/plan.md.
Strategy: the site isn't RANKING (not an indexing problem), so easy-to-rank
(low keyword difficulty / low paid competition) keywords come first, weighted by
volume. High-competition terms go to a back-burner section. Each keyword is
tagged NEW (no covering post) or EXPAND (improve an existing post).
"""
import os, csv, re

SRC = "research/keyword-fanout/master_keywords.csv"
OUT_DIR = "plan"
POSTS_DIR = "content/posts"
STOP = {"for", "the", "of", "a", "to", "and", "your", "you", "my", "i", "on", "about", "with", "in", "at"}

rows = list(csv.DictReader(open(SRC)))
for r in rows:
    r["search_volume"] = int(r["search_volume"]) if r["search_volume"] else 0
    r["cpc"] = float(r["cpc"]) if r["cpc"] else None
    r["keyword_difficulty"] = int(r["keyword_difficulty"]) if r["keyword_difficulty"] not in ("", None) else None

# ---- coverage check against existing posts ----
posts = [f[:-4] for f in os.listdir(POSTS_DIR) if f.endswith(".mdx")] if os.path.isdir(POSTS_DIR) else []
def lemma(toks):
    return {t[:-1] if t.endswith("s") and len(t) > 3 else t for t in toks}
post_tok = [lemma({t for t in re.findall(r"[a-z0-9]+", s.lower()) if t not in STOP}) for s in posts]

def status(kw):
    kt = lemma({t for t in re.findall(r"[a-z0-9]+", kw.lower()) if t not in STOP})
    kt.discard("affirmation")
    if not kt:
        return "EXPAND"   # bare head term -> existing hub
    return "EXPAND" if any(kt <= pt for pt in post_tok) else "NEW"

# ---- scoring: reward volume, penalize difficulty; LOW paid comp gets a nudge ----
COMP_MULT = {"LOW": 1.15, "MEDIUM": 1.0, "HIGH": 0.8}
def score(r):
    v = r["search_volume"] or 0
    kd = r["keyword_difficulty"]
    if v <= 0:
        return 0.0
    ease = 1 - (kd if kd is not None else 50) / 100.0
    return round((v ** 0.5) * ease * COMP_MULT.get(r["competition_level"], 1.0), 1)

for r in rows:
    r["score"] = score(r)
    r["status"] = status(r["keyword"])

# only actionable keywords (real volume), drop the noisy generic autocomplete bucket w/ 0 vol
actionable = [r for r in rows if (r["search_volume"] or 0) >= 150 and r["keyword_difficulty"] is not None]

def tier(r):
    kd = r["keyword_difficulty"]
    comp = r["competition_level"]
    if kd <= 15:
        return 1
    if kd <= 30:
        return 2
    if kd <= 45 and comp != "HIGH":
        return 3
    return 4  # back burner

for r in actionable:
    r["tier"] = tier(r)

# ---- emit markdown ----
def fmt_v(v): return f"{v:,}" if v else "—"
def fmt_c(c): return f"${c:.2f}" if c not in (None, "") else "—"
def fmt_kd(k): return str(k) if k not in (None, "") else "—"

PILLAR = {
    "core":"Core","positive":"Positive","daily":"Daily","morning":"Morning","anxiety":"Anxiety",
    "confidence":"Confidence","self-love":"Self-love","money":"Money","abundance":"Abundance",
    "manifestation":"Manifestation","women":"Women","men":"Men","kids":"Kids","biblical":"Bible",
    "christian":"Christian","chakra":"Chakra","sleep":"Sleep","work":"Work","love":"Love",
    "gratitude":"Gratitude","healing":"Healing","spiritual":"Spiritual","i-am":'"I am"',
    "short":"Short","funny":"Funny","autocomplete":"Discovery",
}

def table(rs, n=None, num=True):
    rs = sorted(rs, key=lambda r: r["score"], reverse=True)
    if n: rs = rs[:n]
    out = []
    head = ("| # | Keyword | Vol/mo | KD | Comp | CPC | Cluster | Action |\n"
            "|---|---------|-------:|---:|:----:|----:|---------|--------|") if num else (
            "| Keyword | Vol/mo | KD | Comp | CPC | Cluster | Action |\n"
            "|---------|-------:|---:|:----:|----:|---------|--------|")
    out.append(head)
    for i, r in enumerate(rs, 1):
        act = "🆕 NEW post" if r["status"] == "NEW" else "♻️ expand"
        cells = [r["keyword"], fmt_v(r["search_volume"]), fmt_kd(r["keyword_difficulty"]),
                 r["competition_level"] or "—", fmt_c(r["cpc"]), PILLAR.get(r["pillar"], r["pillar"]), act]
        out.append(("| %d | " % i + " | ".join(cells) + " |") if num else ("| " + " | ".join(cells) + " |"))
    return "\n".join(out)

t1 = [r for r in actionable if r["tier"] == 1]
t2 = [r for r in actionable if r["tier"] == 2]
t3 = [r for r in actionable if r["tier"] == 3]
t4 = [r for r in actionable if r["tier"] == 4]

L = []
A = L.append
A("# Aurasyncs SEO Keyword Plan")
A("")
A("**Goal:** we're an aging blog with a *ranking* problem (pages are indexed, not "
  "ranking). So this plan leads with **easy-to-rank, low-competition keywords** that "
  "still have real volume — pick any row near the top and it should move the needle. "
  "High-competition / high-difficulty terms are parked in **Back burner** until domain "
  "authority grows.")
A("")
A("**Market:** United States (en). **Data:** DataForSEO Labs + Apify Google Autocomplete "
  "(fanout in `research/keyword-fanout/`). Re-run `scripts/keyword_plan.py` to refresh/expand.")
A("")
A("### Files in this folder")
A("- **plan.md** (this file) — the prioritized keyword queue, tiered easy → hard.")
A("- **[new-posts.md](./new-posts.md)** — ready-to-write briefs for each 🆕 NEW keyword "
  "(suggested slug, primary + secondary keywords to target in one post).")
A("- **[journaling.md](./journaling.md)** — the **Journaling & Prompts** track (hub-and-"
  "spoke plan around `journal prompts`, 49.5K/mo KD 5, + printable lead magnets).")
A("- **[writing-brief.md](./writing-brief.md)** — the voice + MDX format contract the "
  "writing agent must follow (where to save, frontmatter, structure, internal linking).")
A("- Background: full metrics + raw fanout data in `../research/keyword-fanout/`.")
A("")
A("> **For the writing agent:** start with **writing-brief.md**, then pull your next post "
  "from **new-posts.md** (top = highest impact). Use the repo's `/b-write` command — it "
  "injects the site voice lock automatically.")
A("")
A("### How to read")
A("- **Vol/mo** — avg monthly US searches. **KD** — organic difficulty 0–100 (lower = "
  "easier to rank; this is the number that matters for us). **Comp** — Google Ads paid "
  "competition. **CPC** — commercial value per click.")
A("- **Action** — 🆕 **NEW post** (no existing page targets it) · ♻️ **expand** (we have a "
  "related post — add a section / refresh it to capture this).")
A("- **Ordering** — by impact score = √volume × ease × competition nudge. Top of each "
  "tier = highest impact for least effort.")
A("")
A(f"**Snapshot:** {len(t1)} easy wins (KD ≤ 15) · {len(t2)} moderate (KD 16–30) · "
  f"{len(t3)} stretch (KD 31–45) · {len(t4)} back-burner. "
  f"{sum(1 for r in actionable if r['status']=='NEW')} are net-new post ideas.")
A("")
A("---")
A("")
A("## 🟢 Tier 1 — Easy wins (KD ≤ 15) — do these first")
A("")
A("_Lowest difficulty with real volume. These are where we can rank fastest._")
A("")
A(table(t1))
A("")
A("## 🟡 Tier 2 — Moderate (KD 16–30) — next up")
A("")
A("_Still attainable; pick the low-KD / higher-volume rows first._")
A("")
A(table(t2))
A("")
A("## 🟠 Tier 3 — Stretch (KD 31–45) — build toward these")
A("")
A("_Worth it once Tier 1–2 posts start ranking and authority builds._")
A("")
A(table(t3, n=40))
A("")
A("## 🔴 Back burner — high competition / KD > 45")
A("")
A("_High volume but we won't rank yet. Revisit after the easy wins land. Top 20 by volume:_")
A("")
A(table(sorted(t4, key=lambda r: r['search_volume'], reverse=True)[:20], num=False))
A("")
A("---")
A("")
A("## New-post shortlist (highest-impact gaps)")
A("")
A("_NEW keywords only (no page targets them yet), KD ≤ 30, sorted by impact — the "
  "cleanest list of posts to commission next._")
A("")
gaps = [r for r in actionable if r["status"] == "NEW" and r["tier"] in (1, 2)]
A(table(gaps, n=40))
A("")
A("---")
A("")
A("## By cluster (for topical depth)")
A("")
A("_Same keywords grouped by theme so a single post can target a cluster. Only KD ≤ 30 "
  "shown per cluster; full data in `research/keyword-fanout/`._")
A("")
order = ["core","positive","daily","morning","confidence","self-love","money","abundance",
         "manifestation","anxiety","love","gratitude","healing","spiritual","sleep","work",
         "women","men","biblical","christian","chakra","i-am","short","funny"]
by = {}
for r in actionable:
    if r["tier"] in (1, 2):
        by.setdefault(r["pillar"], []).append(r)
for p in order:
    rs = by.get(p)
    if not rs:
        continue
    rs = sorted(rs, key=lambda r: r["score"], reverse=True)
    A(f"### {PILLAR.get(p,p)}")
    A("")
    A(table(rs, n=12, num=False))
    A("")
A("---")
A("")
A("## Expansion log")
A("")
A("This list grows. To add the next batch:")
A("1. Add seeds to `scripts/keyword_fanout.py` and re-run (DataForSEO fanout).")
A("2. Re-run `scripts/keyword_report.py` then `scripts/keyword_plan.py` to rebuild this file.")
A("3. New rows slot into the right tier automatically.")
A("")
A("| Date | Added | Notes |")
A("|------|-------|-------|")
A("| 2026-06-08 | Initial fanout: 25 pillars, 3,018 keywords | DataForSEO + Apify autocomplete |")
A("| 2026-06-09 | Added Journaling & Prompts track (`journaling.md`) | journal/prompt/printable seeds; anchor `journal prompts` 49.5K KD 5 |")
A("")

os.makedirs(OUT_DIR, exist_ok=True)
open(f"{OUT_DIR}/plan.md", "w").write("\n".join(L))
print(f"wrote {OUT_DIR}/plan.md")

# ============================================================
# new-posts.md — one brief per NEW primary keyword, with secondaries
# ============================================================
def slugify(kw):
    s = re.sub(r"[^a-z0-9]+", "-", kw.lower()).strip("-")
    return s

def toks_of(kw):
    return lemma({t for t in re.findall(r"[a-z0-9]+", kw.lower()) if t not in STOP})

# pool of all actionable keywords to draw secondaries from (any status)
pool = [r for r in rows if (r["search_volume"] or 0) >= 50 and r["keyword_difficulty"] is not None]

new_primaries = sorted(
    [r for r in actionable if r["status"] == "NEW" and r["tier"] in (1, 2)],
    key=lambda r: r["score"], reverse=True)

used_as_secondary = set()
briefs = []
for r in new_primaries:
    if r["keyword"] in used_as_secondary:
        continue
    pt = toks_of(r["keyword"]); pt.discard("affirmation")
    secs = []
    for c in pool:
        if c["keyword"] == r["keyword"]:
            continue
        ct = toks_of(c["keyword"]); ct.discard("affirmation")
        # secondary = same sub-topic: primary's distinctive tokens are all present
        if pt and pt <= ct:
            secs.append(c)
    secs = sorted(secs, key=lambda c: (c["search_volume"] or 0), reverse=True)[:6]
    for c in secs:
        used_as_secondary.add(c["keyword"])
    briefs.append((r, secs))

NL = []
B = NL.append
B("# New-post briefs — write these in priority order")
B("")
B("Each block = one new post. **Primary** is the main target (title + slug + "
  "meta should center it). **Also target** = secondary keywords to weave into H2s / "
  "the body so one post captures the whole sub-topic. Ordered highest-impact first.")
B("")
B("See **[writing-brief.md](./writing-brief.md)** for voice + MDX format. Save output to "
  "`content/posts/<slug>.mdx`. Prefer running `/b-write <primary keyword>`.")
B("")
B(f"_{len(briefs)} briefs · easy-ranking (KD ≤ 30) gaps with no existing page._")
B("")
for i, (r, secs) in enumerate(briefs, 1):
    B(f"## {i}. {r['keyword']}")
    B("")
    B(f"- **Suggested slug:** `{slugify(r['keyword'])}`")
    B(f"- **Primary keyword:** {r['keyword']} — **{fmt_v(r['search_volume'])}/mo**, "
      f"KD {fmt_kd(r['keyword_difficulty'])}, {r['competition_level'] or '—'} comp, "
      f"CPC {fmt_c(r['cpc'])}")
    B(f"- **Cluster:** {PILLAR.get(r['pillar'], r['pillar'])}  ·  **Intent:** "
      f"{r.get('main_intent') or 'informational'}")
    if secs:
        sec_str = "; ".join(f"{c['keyword']} ({fmt_v(c['search_volume'])}, KD {fmt_kd(c['keyword_difficulty'])})" for c in secs)
        B(f"- **Also target:** {sec_str}")
    B("")
open(f"{OUT_DIR}/new-posts.md", "w").write("\n".join(NL))
print(f"wrote {OUT_DIR}/new-posts.md  ({len(briefs)} briefs)")
print(f"tiers: T1={len(t1)} T2={len(t2)} T3={len(t3)} T4={len(t4)} | NEW gaps(T1-2)={len(gaps)}")
