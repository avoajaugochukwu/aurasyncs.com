#!/usr/bin/env python3
"""Build plan/journaling.md — the Journaling & Prompts content track for Aurasyncs.
Reads the journal fanout (research/keyword-fanout/journal_raw.json), dedupes
word-order/plural variants, tiers by difficulty, tags NEW vs EXPAND against
existing posts, and writes a self-contained brief (strategy + keyword tables +
per-post briefs) for the writing agent.
"""
import os, json, re

SRC = "research/keyword-fanout/journal_raw.json"
OUT = "plan/journaling.md"
POSTS_DIR = "content/posts"
STOP = {"for", "the", "of", "a", "to", "and", "your", "you", "my", "i", "on", "about", "with", "in", "at"}

raw = json.load(open(SRC))  # list of [kw, vol, kd, comp, cpc, seed]

def lem(toks):
    return {t[:-1] if t.endswith("s") and len(t) > 3 else t for t in toks}
def toks_of(kw):
    return lem({t for t in re.findall(r"[a-z0-9]+", kw.lower()) if t not in STOP})

# coverage vs existing posts
posts = [f[:-4] for f in os.listdir(POSTS_DIR) if f.endswith(".mdx")] if os.path.isdir(POSTS_DIR) else []
post_tok = [toks_of(s) for s in posts]
def status(kw):
    kt = toks_of(kw)
    return "EXPAND" if any(kt and kt <= pt for pt in post_tok) else "NEW"

# branded / wrong-intent terms to drop (product searches, not our content)
DROP = ("5 minute journal", "5-minute journal", "five minute journal", "tim ferris",
        "tim ferriss", "intelligent change", "amazon", "barnes", "etsy", "papier", "moleskine")
def is_branded(kw):
    return any(b in kw.lower() for b in DROP)

# dedupe to richest representative per normalized key, prefer natural surface form
def natural(kw):
    t = kw.lower().split(); s = -0.1*len(t)
    if t and t[0] in ("journal", "journaling", "affirmation", "manifestation", "shadow", "gratitude"):
        s += 1
    if "prompt" in t and t[-1].rstrip("s") == "prompt":
        s += 2
    if len(set(t)) < len(t): s -= 3
    return s

best = {}
for kw, v, kd, comp, cpc, seed in raw:
    if is_branded(kw):
        continue
    k = frozenset(toks_of(kw))
    if not k:
        continue
    row = {"keyword": kw, "v": v or 0, "kd": kd, "comp": comp, "cpc": cpc, "seed": seed}
    cur = best.get(k)
    if cur is None:
        best[k] = row
    else:
        if row["v"] > cur["v"]:
            keep = cur["keyword"] if natural(cur["keyword"]) >= natural(row["keyword"]) else row["keyword"]
            cur.update(row); cur["keyword"] = keep
        elif natural(row["keyword"]) > natural(cur["keyword"]):
            cur["keyword"] = row["keyword"]

rows = [r for r in best.values() if r["v"] >= 150]
for r in rows:
    r["status"] = status(r["keyword"])

def fmt_c(c): return f"${c}" if c not in (None, "", 0) else "—"
def kd(r): return str(r["kd"]) if r["kd"] is not None else "—"
def act(r): return "🆕 NEW" if r["status"] == "NEW" else "♻️ expand"

def table(rs, num=False):
    rs = sorted(rs, key=lambda r: (-(r["v"]), r["kd"] if r["kd"] is not None else 99))
    out = ["| Keyword | Vol/mo | KD | Comp | CPC | Action |",
           "|---------|-------:|---:|:----:|----:|--------|"]
    for r in rs:
        out.append(f"| {r['keyword']} | {r['v']:,} | {kd(r)} | {r['comp'] or '—'} | {fmt_c(r['cpc'])} | {act(r)} |")
    return "\n".join(out)

# buckets
pillar = [r for r in rows if frozenset(toks_of(r["keyword"])) in
          (frozenset(toks_of("journal prompts")), frozenset(toks_of("journal entry prompts")))]
def has(r, *w):
    kl = r["keyword"].lower(); return all(x in kl for x in w)
spokes_def = [
    ("Anxiety & mental health", lambda r: has(r,"anxiety") or has(r,"mental health") or has(r,"stress") or has(r,"depression")),
    ("Gratitude", lambda r: has(r,"gratitude") or has(r,"grateful")),
    ("Self-love & self-discovery", lambda r: has(r,"self love") or has(r,"self-love") or has(r,"self discovery") or has(r,"self-discovery") or has(r,"self esteem")),
    ("Manifestation", lambda r: has(r,"manifest")),
    ("Shadow work", lambda r: has(r,"shadow")),
    ("Teens & kids", lambda r: has(r,"teen") or has(r,"kid") or has(r,"middle school") or has(r,"junior") or has(r,"child")),
    ("Morning / daily", lambda r: has(r,"morning") or has(r,"daily")),
    ("Healing & growth", lambda r: has(r,"healing") or has(r,"growth") or has(r,"recovery") or has(r,"grief")),
]
printables = [r for r in rows if any(w in r["keyword"].lower() for w in
              ("printable","card","pdf","template","worksheet","coloring","colouring","deck"))]

L = []; A = L.append
A("# Journaling & Prompts — content track")
A("")
A("New track added 2026-06-09. Same audience as our affirmations, mostly **KD 0**, and "
  "printables double as **Pinterest pins + email lead magnets** (our highest-leverage "
  "channel). See **[writing-brief.md](./writing-brief.md)** for voice + MDX format; pull "
  "posts from this file in the order below.")
A("")
A("## Why this track")
A("- **Big, easy anchor:** `journal prompts` does **49,500/mo at KD 5** — larger and "
  "easier than almost every core affirmations term we target.")
A("- **Same reader, perfect cross-linking:** every spoke pairs with an affirmations post "
  "we already have (anxiety, gratitude, self-love, manifestation, teens). Internal links "
  "between them is exactly the authority play our ranking problem needs.")
A("- **Lead magnets:** printable cards/PDFs are low-volume individually but are the "
  "classic affirmations-niche freebie — pin → capture email → link back.")
A("")
A("## How to go about it — hub & spoke")
A("")
A("1. **Build the hub first:** write the pillar post for `journal prompts` (slug "
  "`journal-prompts`). Make it a broad, scannable mega-list organized by theme, with a "
  "short 'how to start a journaling practice' intro. This page links *out* to every spoke.")
A("2. **Then publish spokes** (below), one per sub-topic. Each spoke: a focused prompt "
  "list + a 2–3 sentence intro, and **two links** — up to the hub, and across to its "
  "matching affirmations post (e.g. *journaling for anxiety* ↔ *affirmations for anxiety*).")
A("3. **Wire internal links both ways.** Add the new posts to `lib/clusters.ts` so the "
  "related-posts block renders, and add in-body contextual links. The affirmations posts "
  "should also gain a line linking to their journaling spoke.")
A("4. **Ship one lead magnet:** a *free printable affirmation cards (PDF)*. Design it for "
  "Pinterest (vertical), gate the download behind an email, and embed it in the hub + the "
  "self-love/gratitude posts.")
A("5. **Sequence by impact:** hub → anxiety → gratitude → manifestation → shadow work → "
  "teens. All KD 0–6, so order by what best reinforces existing posts.")
A("")
A("## Tier 1 — write first (the anchor)")
A("")
A(table(pillar))
A("")
A("_Pillar post. Target the head term; absorb the long-tail variants in your H2s._")
A("")
A("## Tier 2 — spokes (all KD ≤ ~6, cross-link to the matching affirmations post)")
A("")
for name, fn in spokes_def:
    rs = [r for r in rows if fn(r) and r not in pillar]
    if not rs:
        continue
    A(f"### {name}")
    A("")
    A(table(rs))
    A("")
A("## Lead-magnet / printable targets")
A("")
A("_Low volume each, but ideal for a Pinterest-pinned free PDF + email capture. The HIGH "
  "'competition' is advertisers selling decks, not organic difficulty._")
A("")
A(table(printables))
A("")
A("## Skip (wrong intent)")
A("")
A("- **5-Minute Journal / Tim Ferriss / Intelligent Change** — branded product searches, "
  "not our content. Excluded from the tables above.")
A("")
A("## Suggested post order")
A("")
order = [
    ("journal-prompts", "journal prompts", "Pillar / hub — broad themed mega-list"),
    ("journaling-for-anxiety", "journaling for anxiety", "↔ affirmations-for-anxiety"),
    ("gratitude-journal-prompts", "gratitude journal prompts", "↔ gratitude-affirmations"),
    ("manifestation-journal-prompts", "manifestation journal", "↔ manifestation-affirmations"),
    ("shadow-work-prompts", "shadow work prompts", "↔ spiritual / self-love posts"),
    ("journal-prompts-for-teens", "journal prompts for teens", "↔ teen affirmations"),
    ("self-love-journal-prompts", "self love journal prompts", "↔ self-love-affirmations"),
    ("free-printable-affirmation-cards", "printable affirmation cards", "Lead magnet (PDF + Pinterest)"),
]
A("| # | Slug | Primary keyword | Note |")
A("|---|------|-----------------|------|")
for i, (slug, kw, note) in enumerate(order, 1):
    A(f"| {i} | `{slug}` | {kw} | {note} |")
A("")

os.makedirs("plan", exist_ok=True)
open(OUT, "w").write("\n".join(L))
print(f"wrote {OUT} | {len(rows)} curated keywords, pillar rows={len(pillar)}, printables={len(printables)}")
