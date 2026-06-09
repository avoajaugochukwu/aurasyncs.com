#!/usr/bin/env python3
"""Keyword fanout for aurasyncs.com via DataForSEO Labs keyword_suggestions.
One seed per content pillar -> all long-tail phrases containing the seed,
each with search volume, CPC, competition, and keyword difficulty (US/English).
Writes raw JSON, a flat CSV, and per-pillar JSON to research/keyword-fanout/.
"""
import os, json, csv, base64, urllib.request, urllib.error, sys

LOGIN = os.environ["DATAFORSEO_LOGIN"]
PWD = os.environ["DATAFORSEO_PASSWORD"]
AUTH = base64.b64encode(f"{LOGIN}:{PWD}".encode()).decode()
OUT = "research/keyword-fanout"

# (pillar label, seed phrase) -- seeds mirror the site's existing post clusters
SEEDS = [
    ("core",            "affirmations"),
    ("positive",        "positive affirmations"),
    ("daily",           "daily affirmations"),
    ("morning",         "morning affirmations"),
    ("anxiety",         "affirmations for anxiety"),
    ("confidence",      "confidence affirmations"),
    ("self-love",       "self love affirmations"),
    ("money",           "money affirmations"),
    ("abundance",       "abundance affirmations"),
    ("manifestation",   "manifestation affirmations"),
    ("women",           "affirmations for women"),
    ("men",             "affirmations for men"),
    ("kids",            "affirmations for kids"),
    ("biblical",        "bible affirmations"),
    ("christian",       "christian affirmations"),
    ("chakra",          "chakra affirmations"),
    ("sleep",           "sleep affirmations"),
    ("work",            "work affirmations"),
    ("love",            "love affirmations"),
    ("gratitude",       "gratitude affirmations"),
    ("healing",         "healing affirmations"),
    ("spiritual",       "spiritual affirmations"),
    ("i-am",            "i am affirmations"),
    ("short",           "short affirmations"),
    ("funny",           "funny affirmations"),
]

def post(tasks):
    req = urllib.request.Request(
        "https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_suggestions/live",
        data=json.dumps(tasks).encode(),
        headers={"Authorization": f"Basic {AUTH}", "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.loads(r.read().decode())

def fetch_seed(seed):
    """keyword_suggestions allows only one task per request."""
    task = [{
        "keyword": seed,
        "location_code": 2840,
        "language_code": "en",
        "include_serp_info": False,
        "include_seed_keyword": True,
        "limit": 120,
        "order_by": ["keyword_info.search_volume,desc"],
    }]
    return post(task)

os.makedirs(OUT, exist_ok=True)
rows = []
seen = set()
total_cost = 0.0
raw_all = {}

for pillar, seed in SEEDS:
    try:
        resp = fetch_seed(seed)
    except urllib.error.HTTPError as e:
        print(f"  [{pillar}] HTTP error:", e.code, e.read().decode()[:200], file=sys.stderr)
        continue
    total_cost += (resp.get("cost") or 0)
    raw_all[pillar] = resp
    t = (resp.get("tasks") or [{}])[0]
    if t.get("status_code") != 20000:
        print(f"  [{pillar}] task error:", t.get("status_message"), file=sys.stderr)
        continue
    n = 0
    for res in (t.get("result") or []):
        for item in (res.get("items") or []):
            kw = item.get("keyword")
            if kw in seen:
                continue
            seen.add(kw)
            ki = item.get("keyword_info") or {}
            kp = item.get("keyword_properties") or {}
            si = item.get("search_intent_info") or {}
            rows.append({
                "pillar": pillar,
                "keyword": kw,
                "search_volume": ki.get("search_volume"),
                "cpc": ki.get("cpc"),
                "competition": ki.get("competition"),          # 0..1 index
                "competition_level": ki.get("competition_level"),
                "low_bid": ki.get("low_top_of_page_bid"),
                "high_bid": ki.get("high_top_of_page_bid"),
                "keyword_difficulty": kp.get("keyword_difficulty"),
                "main_intent": si.get("main_intent"),
            })
            n += 1
    print(f"  [{pillar}] +{n} (seed: {seed})", file=sys.stderr)

with open(f"{OUT}/dfs_raw.json", "w") as f:
    json.dump(raw_all, f)
print("total cost: $%.4f" % total_cost, file=sys.stderr)

# sort by volume desc
rows.sort(key=lambda r: (r["search_volume"] or 0), reverse=True)
with open(f"{OUT}/keywords.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
    w.writeheader()
    w.writerows(rows)

print(f"Collected {len(rows)} unique keywords -> {OUT}/keywords.csv", file=sys.stderr)
