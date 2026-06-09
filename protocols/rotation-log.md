# Rotation Log — aurasyncs.com

Append-only log of the variety-rotation slot picks used by each `/b-write` and `/b-review` run. The next run reads the recent entries and avoids repeating the same intro pattern, the same affirmation-grouping scheme, the same "why they work" framing, and the same conclusion shape — so a reader browsing several "Affirmations for X" posts doesn't feel like they're reading one article with the topic swapped. See `protocols/blog/variety-rotation-skill.md` for the slot definitions.

Track variety across the slots that matter for aurasyncs:

- **Content archetype** (💫 themed collection · 📅 daily/occasion · 🙏 faith/scripture · 🧘 practice guide) — most posts are 💫 collections, so the *grouping scheme* below is the real differentiator.
- **Audience / tone register** (general · audience-specific: women/men/kids/teens · gentle/clinical-adjacent · energized/novelty).
- **Affirmation grouping scheme** (by time of day · by sub-theme · by intensity ladder · by life-area · by situation-trigger · flat) — don't reuse the same scheme back-to-back within a cluster.
- **"Why they work" evidence framing** (self-talk · sourced science · repetition · reframe · scripture · honest-limits).
- **Intro pattern** (the opening hook before the `quote` answer box).
- **Conclusion shape** and **CTA target** (which sibling cluster).

Format per entry (see `variety-rotation-skill.md` for the slot codes):

```
## <slug> — <YYYY-MM-DD> — <archetype>
- Slot 0A (archetype): <code>
- Slot 0B (audience/tone): <code>
- Slot 0C (grouping scheme): <code>
- Slot 1 (intro pattern): <code>
- Slot 3 (H2 phrasing): <codes>
- Slot 5 (why-they-work framing): <codes>
- Slot 8 (conclusion shape): <code>
- Slot 9 (CTA target): <code>
```

---

<!-- New entries appended below by /b-write and /b-review. No entries yet — corpus reset for aurasyncs. -->
