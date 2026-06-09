#!/usr/bin/env python3
"""Build a human-style SEO keyword report from the DataForSEO fanout
(keywords.csv) + the Apify autocomplete suggestions (enriched with volume).
Collapses word-order near-duplicates, clusters by pillar, scores opportunity,
and writes research/keyword-fanout/REPORT.md + master_keywords.csv.
"""
import os, json, csv, base64, urllib.request, re, sys

OUT = "research/keyword-fanout"
AUTH = base64.b64encode(
    f"{os.environ['DATAFORSEO_LOGIN']}:{os.environ['DATAFORSEO_PASSWORD']}".encode()
).decode()

STOP = {"for", "the", "of", "a", "to", "and", "your", "you", "my", "i"}

def norm(kw):
    """Collapse word-order / filler variants to one canonical key."""
    toks = re.findall(r"[a-z0-9]+", kw.lower())
    toks = [t for t in toks if t not in STOP]
    # crude singular/plural fold
    toks = [t[:-1] if t.endswith("s") and len(t) > 3 else t for t in toks]
    return " ".join(sorted(toks))

# ---- load DataForSEO rows ----
dfs = list(csv.DictReader(open(f"{OUT}/keywords.csv")))
for r in dfs:
    r["search_volume"] = int(r["search_volume"]) if r["search_volume"] else 0
    r["cpc"] = float(r["cpc"]) if r["cpc"] else None
    r["competition"] = float(r["competition"]) if r["competition"] else None
    r["keyword_difficulty"] = int(r["keyword_difficulty"]) if r["keyword_difficulty"] else None
    r["source"] = "dataforseo"

# ---- load + enrich Apify autocomplete (if present) ----
apify_rows = []
ap_path = f"{OUT}/apify_autocomplete.json"
if os.path.exists(ap_path):
    try:
        ap = json.load(open(ap_path))
    except Exception:
        ap = []
    if isinstance(ap, list):
        # extract the suggestion strings (schema-tolerant)
        sugg = set()
        seed_of = {}
        for it in ap:
            if not isinstance(it, dict):
                continue
            s = it.get("suggestion") or it.get("keyword") or it.get("query") or it.get("value")
            seed = it.get("seed") or it.get("seedKeyword") or it.get("input") or ""
            if isinstance(s, str) and s.strip():
                sugg.add(s.strip().lower())
                seed_of.setdefault(s.strip().lower(), seed)
        # which autocomplete suggestions are NOT already in the DFS set?
        have = {norm(r["keyword"]) for r in dfs}
        new_terms = sorted({s for s in sugg if norm(s) not in have})
        json.dump({"raw_suggestions": len(sugg), "net_new": len(new_terms),
                   "new_terms": new_terms}, open(f"{OUT}/apify_new_terms.json", "w"), indent=2)
        # enrich net-new terms with search volume in bulk (DataForSEO Labs bulk_search_volume)
        def bulk_vol(terms):
            out = {}
            for i in range(0, len(terms), 1000):
                chunk = terms[i:i+1000]
                task = [{"keywords": chunk, "location_code": 2840, "language_code": "en"}]
                req = urllib.request.Request(
                    "https://api.dataforseo.com/v3/dataforseo_labs/google/bulk_keyword_difficulty/live",
                    data=json.dumps(task).encode(),
                    headers={"Authorization": f"Basic {AUTH}", "Content-Type": "application/json"},
                    method="POST")
                # bulk_keyword_difficulty only gives KD; use search_volume endpoint for volume
            return out
        # use google_ads search_volume (has volume + cpc + competition) for net-new terms
        def ads_volume(terms):
            res = {}
            for i in range(0, len(terms), 700):
                chunk = terms[i:i+700]
                task = [{"keywords": chunk, "location_code": 2840, "language_code": "en"}]
                req = urllib.request.Request(
                    "https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live",
                    data=json.dumps(task).encode(),
                    headers={"Authorization": f"Basic {AUTH}", "Content-Type": "application/json"},
                    method="POST")
                d = json.loads(urllib.request.urlopen(req, timeout=180).read())
                for t in (d.get("tasks") or []):
                    for it in (t.get("result") or []):
                        res[it.get("keyword")] = it
            return res
        cache = f"{OUT}/apify_enriched.json"
        if os.path.exists(cache):
            vol = json.load(open(cache))
            print("loaded apify enrichment from cache", file=sys.stderr)
        else:
            vol = ads_volume(new_terms) if new_terms else {}
            json.dump(vol, open(cache, "w"))
        for term in new_terms:
            v = vol.get(term, {})
            apify_rows.append({
                "pillar": "autocomplete",
                "keyword": term,
                "search_volume": v.get("search_volume") or 0,
                "cpc": v.get("cpc"),
                "competition": v.get("competition"),
                "competition_level": v.get("competition_level") or v.get("competition_index"),
                "low_bid": v.get("low_top_of_page_bid"),
                "high_bid": v.get("high_top_of_page_bid"),
                "keyword_difficulty": None,
                "main_intent": None,
                "source": "apify-autocomplete",
            })

all_rows = dfs + apify_rows

def is_junk(kw):
    """Drop mis-tokenized surface forms with a stray single letter (keep 'a'/'i')."""
    return any(len(t) == 1 and t not in ("a", "i") for t in re.findall(r"[a-z]+", kw.lower()))

def natural_score(kw):
    """Higher = reads more like a real query. Used to pick a group's canonical form."""
    toks = kw.lower().split()
    s = 0.0
    if toks and toks[-1].rstrip("s") == "affirmation":   # "X affirmations" canonical shape
        s += 3
    if any(c in toks for c in ("for", "about", "on", "to")):
        s += 1
    if toks and toks[0] == "affirmations":               # "affirmations daily/positives" = mangled
        s -= 2
    if len(set(toks)) < len(toks):                        # repeated word
        s -= 3
    s -= 0.1 * len(toks)
    return s

# ---- collapse near-duplicates: keep highest-volume; pick most natural surface form ----
best = {}
for r in all_rows:
    if is_junk(r["keyword"]):
        continue
    k = norm(r["keyword"])
    if not k:
        continue
    cur = best.get(k)
    if cur is None:
        r = dict(r); r["variants"] = 1
        best[k] = r
    else:
        cur["variants"] = cur.get("variants", 1) + 1
        # keep richest metrics (max volume) but swap surface form if more natural
        if (r["search_volume"] or 0) > (cur["search_volume"] or 0):
            keep_kw = cur["keyword"] if natural_score(cur["keyword"]) >= natural_score(r["keyword"]) else r["keyword"]
            v = cur["variants"]; cur.update(r); cur["keyword"] = keep_kw; cur["variants"] = v
        elif natural_score(r["keyword"]) > natural_score(cur["keyword"]):
            cur["keyword"] = r["keyword"]

# second pass: collapse cross-norm word-order siblings that share identical volume+cpc
groups = {}
for r in best.values():
    if (r["search_volume"] or 0) >= 1000 and r["cpc"]:
        gk = (r["search_volume"], round(r["cpc"], 2), r["pillar"])
    else:
        gk = id(r)  # unique -> not grouped
    groups.setdefault(gk, []).append(r)

master = []
for gk, members in groups.items():
    if len(members) == 1:
        master.append(members[0]); continue
    members.sort(key=lambda r: natural_score(r["keyword"]), reverse=True)
    winner = members[0]
    winner["variants"] = sum(m.get("variants", 1) for m in members)
    master.append(winner)

master.sort(key=lambda r: (r["search_volume"] or 0), reverse=True)

# opportunity score: reward volume, penalize difficulty (quick wins = high vol, low KD)
def opp(r):
    v = r["search_volume"] or 0
    kd = r["keyword_difficulty"]
    if v == 0:
        return 0.0
    if kd is None:
        return v ** 0.5
    return (v ** 0.5) * (1 - kd / 100.0)

for r in master:
    r["opp_score"] = round(opp(r), 1)

# ---- write master CSV ----
cols = ["pillar", "keyword", "search_volume", "cpc", "competition_level",
        "competition", "keyword_difficulty", "main_intent", "opp_score",
        "variants", "source"]
with open(f"{OUT}/master_keywords.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
    w.writeheader()
    w.writerows(master)

print(f"master unique keywords: {len(master)}", file=sys.stderr)
print(f"apify net-new enriched: {len(apify_rows)}", file=sys.stderr)

# ---- map existing posts -> which pillars are already covered ----
posts = []
pd = "content/posts"
if os.path.isdir(pd):
    posts = [f[:-4] for f in os.listdir(pd) if f.endswith(".mdx")]

# ---- build markdown report ----
def fmt_v(v):
    return f"{v:,}" if v else "—"
def fmt_c(c):
    return f"${c:.2f}" if c not in (None, "") else "—"
def fmt_kd(k):
    return str(k) if k not in (None, "") else "—"

PILLAR_LABELS = {
    "core": "Core / head term", "positive": "Positive affirmations",
    "daily": "Daily affirmations", "morning": "Morning affirmations",
    "anxiety": "Anxiety", "confidence": "Confidence & self-esteem",
    "self-love": "Self-love", "money": "Money", "abundance": "Abundance",
    "manifestation": "Manifestation", "women": "Women", "men": "Men",
    "kids": "Kids", "biblical": "Bible / scripture", "christian": "Christian",
    "chakra": "Chakra", "sleep": "Sleep", "work": "Work / career",
    "love": "Love & relationships", "gratitude": "Gratitude",
    "healing": "Health & healing", "spiritual": "Spiritual",
    "i-am": '"I am" affirmations', "short": "Short affirmations",
    "funny": "Funny / novelty", "autocomplete": "Autocomplete discovery",
}

by_pillar = {}
for r in master:
    by_pillar.setdefault(r["pillar"], []).append(r)

lines = []
A = lines.append
A("# Keyword Fanout — aurasyncs.com")
A("")
A("**Niche:** positive affirmations blog · **Market:** United States (en) · "
  "**Sources:** DataForSEO Labs `keyword_suggestions` (volume, CPC, competition, "
  "keyword difficulty, intent) + Apify Google Autocomplete (alphabet-soup discovery, "
  "volume back-filled via DataForSEO Google Ads).")
A("")
A(f"- **{len(master):,}** unique keywords after collapsing word-order/plural duplicates")
A(f"- **{sum((r['search_volume'] or 0) for r in master):,}** combined monthly US search volume")
A(f"- **{len([r for r in master if (r['search_volume'] or 0) >= 1000])}** keywords with ≥1,000 searches/mo")
A(f"- **{len([r for r in master if (r['keyword_difficulty'] or 100) <= 20 and (r['search_volume'] or 0) >= 300])}** "
  "quick-win targets (KD ≤ 20 and ≥ 300 searches/mo)")
A("")
A("> **How to read this:** *Volume* = avg monthly US searches. *CPC* = advertiser cost-per-click "
  "(commercial value). *Comp* = Google Ads paid competition (LOW/MEDIUM/HIGH). *KD* = organic "
  "keyword difficulty 0–100 (lower = easier to rank). *Score* = √volume × (1 − KD/100); a blunt "
  "volume-vs-difficulty opportunity rank.")
A("")

# ---- top opportunities overall ----
A("## Top 25 opportunities (volume × low difficulty)")
A("")
A("| # | Keyword | Vol/mo | CPC | Comp | KD | Score | Pillar |")
A("|---|---------|-------:|----:|:----:|---:|------:|--------|")
ranked = sorted(master, key=lambda r: r["opp_score"], reverse=True)
for i, r in enumerate([x for x in ranked if (x["search_volume"] or 0) >= 200][:25], 1):
    A(f"| {i} | {r['keyword']} | {fmt_v(r['search_volume'])} | {fmt_c(r['cpc'])} | "
      f"{r['competition_level'] or '—'} | {fmt_kd(r['keyword_difficulty'])} | {r['opp_score']} | {r['pillar']} |")
A("")

# ---- quick wins ----
qw = [r for r in master if (r["keyword_difficulty"] or 100) <= 20 and (r["search_volume"] or 0) >= 300]
qw.sort(key=lambda r: (r["search_volume"] or 0), reverse=True)
A("## Quick wins (KD ≤ 20, ≥ 300 searches/mo)")
A("")
if qw:
    A("| Keyword | Vol/mo | CPC | KD | Pillar |")
    A("|---------|-------:|----:|---:|--------|")
    for r in qw[:40]:
        A(f"| {r['keyword']} | {fmt_v(r['search_volume'])} | {fmt_c(r['cpc'])} | "
          f"{fmt_kd(r['keyword_difficulty'])} | {r['pillar']} |")
else:
    A("_None matched the threshold._")
A("")

# ---- content gap: strong keywords not clearly covered by an existing post ----
post_tok = []
for slug in posts:
    toks = set(t for t in re.findall(r"[a-z0-9]+", slug.lower()) if t not in STOP)
    toks = {t[:-1] if t.endswith("s") and len(t) > 3 else t for t in toks}
    post_tok.append(toks)

def covered(kw):
    kt = set(t for t in re.findall(r"[a-z0-9]+", kw.lower()) if t not in STOP)
    kt = {t[:-1] if t.endswith("s") and len(t) > 3 else t for t in kt}
    kt.discard("affirmation")
    if not kt:
        return True  # bare "affirmations" -> homepage/core
    return any(kt <= pt for pt in post_tok)

gaps = [r for r in master
        if (r["search_volume"] or 0) >= 500
        and (r["keyword_difficulty"] or 100) <= 30
        and r["pillar"] != "autocomplete"
        and not covered(r["keyword"])]
gaps.sort(key=lambda r: (r["search_volume"] or 0), reverse=True)
A("## Content gaps — strong keywords with no clear matching post")
A("")
A(f"_{len(posts)} existing posts checked. Filter: ≥ 500 vol, KD ≤ 30, no post whose slug "
  "covers the keyword's terms. These are the clearest new-post / expansion candidates._")
A("")
A("| Keyword | Vol/mo | CPC | KD | Pillar |")
A("|---------|-------:|----:|---:|--------|")
for r in gaps[:35]:
    A(f"| {r['keyword']} | {fmt_v(r['search_volume'])} | {fmt_c(r['cpc'])} | "
      f"{fmt_kd(r['keyword_difficulty'])} | {r['pillar']} |")
A("")

# ---- per-pillar tables ----
A("## Clusters")
A("")
order = ["core","positive","daily","morning","anxiety","confidence","self-love",
         "money","abundance","manifestation","love","gratitude","healing","spiritual",
         "sleep","work","women","men","kids","biblical","christian","chakra",
         "i-am","short","funny","autocomplete"]
for p in order:
    rs = by_pillar.get(p)
    if not rs:
        continue
    rs.sort(key=lambda r: (r["search_volume"] or 0), reverse=True)
    tot = sum((r["search_volume"] or 0) for r in rs)
    A(f"### {PILLAR_LABELS.get(p,p)}  ·  {len(rs)} keywords · {tot:,} searches/mo")
    A("")
    A("| Keyword | Vol/mo | CPC | Comp | KD | Intent |")
    A("|---------|-------:|----:|:----:|---:|--------|")
    for r in rs[:30]:
        A(f"| {r['keyword']} | {fmt_v(r['search_volume'])} | {fmt_c(r['cpc'])} | "
          f"{r['competition_level'] or '—'} | {fmt_kd(r['keyword_difficulty'])} | {r['main_intent'] or '—'} |")
    if len(rs) > 30:
        A(f"| _…+{len(rs)-30} more in master_keywords.csv_ | | | | | |")
    A("")

open(f"{OUT}/REPORT.md", "w").write("\n".join(lines))
print(f"wrote {OUT}/REPORT.md", file=sys.stderr)
