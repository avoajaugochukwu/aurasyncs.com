# Blog & Reader — Design System & Flow (read before changing the look)

This is the **design** context for aurasyncs.com's reader/blog UI. It is deliberately separate from the content pipeline: **`/b-write` and `protocols/blog/` are the content writer and do NOT own design.** When you're changing how a page *looks* (the reader, chrome, spacing, type, themes), this file is the source of truth for the flow and the gotchas.

The site runs one **warm-earthy reading system** (sand + clay, Newsreader serif + Public Sans), two themes (Sand light / Dusk dark), text-editorial — each affirmation given room to land, no card thumbnails, no article hero images.

---

## ⭐ THE canonical example — match this every time

**The reference implementation of the whole design is the anxiety post. Open it and make new pages look like it.**

- **Rendered (the gold standard):** `/blog/anxiety-affirmations-calm-your-mind` — the Scroll reader.
- **Source:** `content/posts/anxiety-affirmations-calm-your-mind.mdx` (its `reader:` block shows the exact field shape; the matching classes are in `app/globals.css`).

Before you design, restyle, or build any blog/reader page, **look at this post first** — its layout, typography, spacing, rhythm, copy buttons, prompts, related cards, and Sand/Dusk treatment are the bar. When a choice is ambiguous, make the new thing look like this one. Any new page (a new section type, a landing page, the author page, `/daily`) should feel like it came from the same hand.

---

## The design language (the bias)

- **Text-editorial.** No thumbnails on lists, no hero image on articles. `featuredImage` is OG/social only. Type, space, and one clay accent carry everything.
- **Each line room to land.** Affirmations render as standalone "bands," not dense lists. Generous spacing is the point — but tighten dead space at the top of pages (we iterate on this).
- **Warm, calm, quiet.** Serif display for emotional weight (titles, affirmations), sans for the practical voice (framing prose, eyebrows, meta). One accent (clay). A slow breathing dot, hover-reveal copy buttons, gentle scroll-reveal.
- **Two themes, always.** Every color comes from a token so Sand and Dusk both work. Never hardcode a hex in a component.

---

## Where the system lives (file map)

| Concern | File |
|---|---|
| **The entire design system** — tokens + every component class | `app/globals.css` |
| Fonts (next/font) + no-flash theme script + shell | `app/layout.tsx` |
| Chrome | `components/Header.tsx`, `components/Footer.tsx`, `components/ThemeToggle.tsx` |
| The article reader (structured posts) | `components/reader/ScrollReader.tsx`, `components/reader/CopyButton.tsx` |
| Prose fallback styling (legacy posts) | `components/MdxContent.tsx` (uses the `.prose-body` rules) |
| Pages | `app/page.tsx` (home), `app/blog/page.tsx` (index), `app/blog/[slug]/page.tsx` (article), `app/author/[slug]/page.tsx` |

**`app/globals.css` is the single source of truth for styling.** Pages/components are mostly class names from it (`.hero`, `.entry`, `.article-head`, `.qband`, `.sec`, `.prompt`, `.related-card`, `.faq`, …). We do **not** style the reader with Tailwind utilities — keep new design work in `globals.css` under the same class system so both themes and the tokens apply.

---

## The tokens (use these, never raw hex)

Defined in `:root` (Sand) and overridden in `[data-theme="dusk"]` (Dusk):

```
--bg --bg-warm --surface          backgrounds (page → warm → tinted panels)
--ink --ink-soft --muted --faint  text (strongest → faintest)
--clay --clay-soft                the one accent (links, eyebrows, emphasis)
--line --line-soft                hairlines/borders
--serif → Newsreader (display)    --sans → Public Sans (UI/prose)
--qscale                          affirmation type-scale multiplier (reader)
```

- **Color a thing with a token** so Dusk follows automatically. A raw `#…` in a component is a theme bug.
- Tailwind sees these via `@theme inline` (`bg-background`, `text-foreground`, `text-muted`, `border-border`, `font-serif`, `font-sans`) — fine for one-off layout, but the reader uses the named classes.
- Eyebrow = `.eyebrow` (sans, tracked, uppercase, clay). Meta = `.meta` (sans, muted). Reuse them.

---

## The edit → review loop (the flow)

1. **Run once:** `npm run dev` (→ http://localhost:3000). Leave it running.
2. **Make the change** in `app/globals.css` (most design work) or a component.
3. **CSS/component edits hot-reload.** But **font or `layout.tsx` changes need a clean restart** — HMR silently keeps the old compiled chunks:
   ```bash
   pkill -f "next dev"; rm -rf .next; npm run dev
   ```
4. **Verify with a headless screenshot** (don't eyeball from memory):
   ```bash
   CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
   "$CH" --headless --disable-gpu --hide-scrollbars --virtual-time-budget=4000 \
     --window-size=1200,1600 --screenshot=/tmp/p.png http://localhost:3000/blog/<slug>
   sips -c 320 1100 --cropOffset 110 120 /tmp/p.png   # crop a region to inspect detail
   ```
   `--virtual-time-budget` lets fonts finish loading before the shot (catches font/swap issues).
5. **Read the screenshot.** Check the change AND that nothing else shifted.
6. **User reviews via CleanShot + red arrows.** Translate "reduce this space" → the specific padding/margin rule (e.g. `.article-head`/`.opening`/`.back-link` padding). Make the smallest token/spacing change that fixes it.

> **Editing `globals.css` programmatically?** A linter sometimes rewrites the file between a Read and an Edit ("File has been modified since read"). Apply exact-string replacements via a small `python3` heredoc to avoid the race.

**Reviewing Dusk:** the no-flash script defaults to Sand, so a plain headless shot renders Sand. To check Dusk, toggle in a real browser or temporarily set `data-theme="dusk"` while shooting. **Any color change must be eyeballed in both themes.**

---

## Gotchas (hard-won — do not relearn)

1. **next/font variable classes must be on `<html>`, not `<body>`.** `--serif` is declared in `:root` and nests `var(--font-newsreader)`. If the next/font class is on `<body>`, that nested var is undefined at `:root` scope → `--serif` invalid → every "serif" element falls through to Tailwind's sans default. Symptom: **headings render sans-serif though the CSS says serif.** Fix: `<html className={`${serif.variable} ${sans.variable}`}>`.
2. **Newsreader needs the optical-size axis.** Load it as a *variable* font (no fixed `weight`) with `axes: ["opsz"]`, and set `font-optical-sizing: auto` on `body`. A pinned `weight` array loads the static text cut → large headings look heavy/flat instead of the refined display cut.
3. **Flex auto-margin shrink-wrap.** An element centered with `margin: 0 auto` that becomes a flex *item* (inside the `min-h-screen flex flex-col` shell) shrink-wraps and `justify-content` collapses. Symptom: **header bunches center.** Fix: `width: 100%`.
4. **Dev HMR + font/layout changes.** After editing `layout.tsx`/font config, the served HTML can keep stale next/font class hashes until a clean restart (`rm -rf .next`). If anything font-related looks wrong, restart before debugging.
5. **Tailwind v4 cascade.** `@import "tailwindcss"` is layered; our component rules in `globals.css` are unlayered, so they win without `!important`. Tokens via `@theme inline`. `dark:` maps to `[data-theme="dusk"]`.
6. **Reader prose is plain text.** `ScrollReader` renders `intro`/`body`/`prompt`/etc. as React text nodes — Markdown/links render literally. An inline-link need in reader prose is a renderer change, not a content fix.

---

## Conventions for any design change

- **Token-first:** colors/borders from `var(--…)`; spacing in `rem`; respect `@media (prefers-reduced-motion: reduce)` (the breathing dot and scroll-reveal already do).
- **Class system:** add to `globals.css` under the existing class vocabulary; don't sprinkle Tailwind color utilities into the reader.
- **Both themes:** verify Sand and Dusk after any color/contrast change. ("Make this darker" usually means bumping that element from `--ink-soft` → `--ink`, not a new color.)
- **Text-editorial:** don't add thumbnails/hero images; keep it typographic.
- **Spacing:** prefer tightening top-of-page dead space (header→back-link→title, opening→intro) over adding more.
- **Title rule is shared with content:** the route shows the H1 as the *pre-colon* part of `title` and the dek from `reader.subtitle`. Don't "fix" a short H1 in CSS — it's intended (see `protocols/blog/PLAYBOOK.md`).

---

## Anatomy of the article reader (so changes land in the right class)

`components/reader/ScrollReader.tsx` renders these `globals.css` blocks in order:

```
.article-head   eyebrow (reader.tag) → .article-title (H1) → .article-sub (subtitle) → .article-meta
.opening        .opening-quote + .opening-note            (the answer box)
.article-intro  drop-cap framing prose (reader.intro[])
.sec  (×N)      .sec-head (.eyebrow keyword, .sec-title, .sec-intro, .sec-body, .when-note)
                .qlist → .qband (× quotes): .qband-text + .qband-foot (.qband-author, .copy-btn)
                .prompt (reflection)
.related        .related-grid → .related-card (auto)
.faq            .faq-head → .faq-list → .faq-q / .faq-a
```

Change the class, not the component. Home/index editorial rows are `.hero`, `.intro-band`, `.section-label`, `.list`/`.entry`. Chrome is `.site-head`/`.brand`/`.site-nav`/`.theme-toggle` and `.site-foot`. Note `.article-head` is shared by the structured reader AND the prose-fallback header — check both when you touch it.

---

**Design = the tokens + the class vocabulary in `globals.css`. Flow = edit → restart-if-fonts → headless screenshot → both themes. Keep color in tokens and the serif on `<html>`, and most of the pain above never returns.** (Content/affirmation rules live in `protocols/blog/PLAYBOOK.md` — that's the writer's job, not this file's.)
