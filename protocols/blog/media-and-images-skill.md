---
name: media-and-images
description: Featured-image rules, alt-text-via-caption craft, captions, file naming, social-card dimensions, Notion image blocks, inline image placement, and licensing for aurasyncs.com. Images set the tone of an affirmations post — a calm, warm, on-theme visual signals care before a reader reads a word. One featured image per post for the header and index card, plus inline images pulled from Notion blocks, with descriptive alt text (carried by the image caption), sized so nothing shifts. Covers the discipline of media that signals quality to readers, helps accessibility, and feeds the SEO signals Google rewards.
---

# Media & Images — the visual layer

> Images on an aurasyncs post serve four audiences at once: the skimming reader (visual calm and interest), the person looking for a feeling (a serene image that matches the theme), the accessibility user (alt text), and Google's crawler (alt text + filename). The same image either serves all four or fails all four. On aurasyncs the house style is **warm, calm, on-theme**: soft light, gentle scenes, nothing harsh or clinical. Every post ships with one **featured image** for the header and index card; longer collections and practice guides use a few **inline images** to break the body and reinforce the mood.

---

## How images actually get into a post (the Notion pipeline)

Posts originate in a Notion database and are pulled into the repo by:

```bash
node --env-file=.env scripts/migrate-notion.mjs
```

You do **not** hand-place files in `public/` or export at a target size. The migrate script does the mechanical work:

- It reads the Notion **"Featured Image"** file property, **downloads** it, and writes it to `public/blog/<slug>.webp`. The post JSON gets `featuredImage: "/blog/<slug>.webp"`.
- It walks the body, finds each **Notion image block**, **downloads** each one in order, and writes them to `public/blog/<slug>-content-1.webp`, `-content-2.webp`, `-content-3.webp`, and so on. It sets each block's `image.__local` to that local path.
- Every download is run through **sharp**: resized to **max 1200 × 800** (`fit: inside`, no enlargement), converted to **WebP at quality 80**.

So the authoring job is **choosing and captioning good images inside Notion**, not exporting files or naming them. The script handles resize, format, quality, naming, and the rewrite to local paths.

`components/NotionRenderer.tsx` renders an image block with `next/image`: it uses `image.__local` if present, otherwise the remote Notion URL. The **alt text comes from the image block's caption** (and falls back to `"Affirmation illustration"` when there's no caption). A caption also renders visibly as a `<figcaption>`. `components/BlogPostCard.tsx` renders the index-card thumbnail from `featuredImage`.

---

## The featured image

Every post ships with one featured image, set in Notion as the **"Featured Image"** file property. After migration it lives at:

```
public/blog/<slug>.webp   →   post JSON: featuredImage: "/blog/<slug>.webp"
```

It is used for the **post header** (rendered above the body) and the **index-page card thumbnail** (`BlogPostCard.tsx`). The featured-image alt is set by the card to `Featured image for <title>` — there is no separate featured `alt` or `caption` field, so the image itself has to carry the meaning at a glance.

> Note on social cards: a per-post `og:image` is **not currently wired** in the post route — Open Graph falls back to the site defaults. So the featured image is not yet guaranteed to be the social-share image. Treat per-post `og:image` as a **future enhancement**; don't author as if it already ships.

### Featured image rules

- **Source quality first.** Provide a clean source image at least ~1200px on the long edge so the script's 1200 × 800 cap has real pixels to work with. A small, soft, or upscaled source stays soft after conversion.
- **Aspect ratio: aim landscape, roughly 3:2.** The index card renders inside a fixed landscape frame (it object-covers a ~600 × 400 / 16:9-ish box) and the script fits inside 1200 × 800. A landscape source crops predictably; a tall portrait source gets center-cropped on the card and can lose its subject.
- **Format/size: leave it to the script.** Don't pre-export to WebP or hand-tune quality — the migrate step does WebP q80 and the resize. Just give it a good, properly-licensed source.
- **On-theme, calm imagery > generic stock.** A warm, serene image that matches the post's feeling beats a generic "smiling person" stock shot. Stock clichés signal "any blog could have written this."
- **Recognizable mood at a glance.** Even as a small thumbnail the featured image should read the theme: a soft sunrise for morning affirmations, hands resting over the heart for self-love, gentle light through a window for faith, a still lake for anxiety/calm.

### What good affirmation imagery looks like

The image sets the emotional tone before the words do. Match the visual to the theme:

- **Morning / daily** — a serene sunrise, a window with soft light, a steaming mug; a sense of a calm fresh start.
- **Self-love** — soft hands over the heart, a person looking gently content, warm natural light; tender, not posed.
- **Anxiety / calm / sleep** — still water, a quiet sky, slow breathing scenes, dim warm bedrooms; uncluttered and spacious.
- **Confidence / strength** — open posture, an upward path, mountain light at dawn; grounded, not aggressive.
- **Money / manifestation / abundance** — warm growth imagery (plants, open hands, sunlight), tasteful and hopeful — avoid cash/gold cliché.
- **Faith / scripture** — soft light, open hands, a quiet sanctuary, an open book; reverent and gentle.
- **Chakra / energy** — soft color fields aligned to the chakra, calm meditative scenes; subtle, not garish neon.
- **Audience-specific (women / men / kids / teens)** — pick subjects that genuinely reflect the audience, warmly and respectfully.

### Avoid

- **Cliché stock.** The "businessman jumping," the over-bright fake laughter, the lone "person at a desk." These are the strongest signals of low-effort content.
- **Unreadable text-on-image.** Don't rely on the affirmation text baked into the picture — the script may downscale it and it won't be real, indexable text. Keep the words in the post body; let the image carry mood.
- **Harsh, clinical, or chaotic visuals** that fight the warm, calm house style — neon glare, busy collages, cold stock blue.

### When the post has no obvious image

Some topics resist a literal picture. Fallbacks that stay on-brand:

- A single warm symbol tied to the theme (a sunrise for a morning set, soft hands for a gratitude set).
- A calm textured background (warm light, gentle gradient, soft natural scene) that carries mood without a literal subject.
- A small, tasteful scene that evokes the feeling rather than illustrating a noun.

Never use a generic "person at a desk" or stock-smile image as a filler.

---

## Alt text craft (it lives in the caption)

On aurasyncs there is **no separate alt field**. The renderer derives alt text from the **Notion image block's caption**, and falls back to `"Affirmation illustration"` when a caption is missing. So **every meaningful image should have a caption**, and that caption does double duty: it's the visible `<figcaption>` *and* the alt text a screen reader announces. Write it as descriptive, keyword-aware prose.

Because the caption is both visible and the alt, it should read well to a sighted reader and still describe the image faithfully for someone who can't see it.

### Rules

- **Describe the image, not the post.** The caption/alt is for someone who can't see the picture, not a place to keyword-stuff.
- **Keep it tight, ~125 characters or so.** Screen readers and figcaptions both read better short; aim for one clear sentence.
- **Sentence-case prose, not phrase fragments.** "A woman resting her hands over her heart in soft morning light" beats "self love affirmations confidence hands heart".
- **Target the query naturally if relevant** — don't force it. If the image actually shows the theme, the honest description already carries the keyword.
- **No "image of," "picture of," "photo of"** — the renderer wraps it in a `<figure>` and screen readers already announce it's an image.
- **Leaning on the fallback is a last resort.** An uncaptioned image becomes alt `"Affirmation illustration"`, which helps no one — caption it instead.

### Examples

| Image | Good caption / alt | Bad caption / alt |
|---|---|---|
| Featured for a morning-affirmations post | "A calm sunrise over a still lake, soft golden light starting the day." | "morning affirmations daily positive sunrise best" |
| Inline in a self-love collection | "A person resting both hands gently over their heart in warm window light." | "self love affirmations woman happy" |
| Inline in a faith / scripture set | "An open book on a wooden table with soft light falling across the pages." | "bible affirmations scripture faith verses" |
| Inline in an anxiety / calm guide | "Still water under a quiet morning sky, a few slow ripples spreading out." | "anxiety affirmations calm relax" |

### Keep each caption distinct

If a post has several inline images, give each its **own** caption describing that specific image. Don't paste the same line under every picture — repeated identical alt text is noise to a screen reader and a wasted signal to search.

---

## Captions (visible figcaptions)

A caption is the same string that becomes the alt text — it renders under the image as a `<figcaption>`. Because it's load-bearing for accessibility, treat captions as **recommended on essentially every meaningful image**, not optional decoration.

### When to caption

- **Always when the image carries meaning** — which on this site is almost always, since the caption is also the alt text.
- **Always for sourced or licensed images** — name the source/attribution the license requires, right in the caption.
- **Add value where you can** — a caption can gently reinforce the theme or tie the image to the affirmation it sits near, as long as it still honestly describes the picture.

### Caption format

- Sentence-case prose, a complete sentence preferred.
- Keep it short (~125 chars for the alt-text sweet spot; hard ceiling ~200).
- Include source/attribution where the license requires it.
- It's a Notion caption — no Markdown italics needed; the renderer styles the `<figcaption>`.

### Examples

> A calm sunrise over a still lake, with soft golden light spreading across the water.

> Soft hands resting over the heart — a quiet gesture for self-love affirmations.

> Photo by [name] on Unsplash, used here for a gentle morning scene.

---

## File naming (handled for you)

You don't name image files by hand — the migrate script does, from the slug. Knowing the convention helps you sanity-check the output:

- **Featured:** `public/blog/<slug>.webp` → post JSON `featuredImage: "/blog/<slug>.webp"`.
- **Inline (body) images:** `public/blog/<slug>-content-N.webp`, where `N` is `1, 2, 3…` in the order the image blocks appear in the Notion body. The first image block becomes `-content-1.webp`, the second `-content-2.webp`, and so on.
- **Format is always `.webp`** after migration, regardless of the source format.

Example for a morning-affirmations post (slug `morning-affirmations-to-start-your-day`):

```
public/blog/morning-affirmations-to-start-your-day.webp             (featured)
public/blog/morning-affirmations-to-start-your-day-content-1.webp   (first inline image)
public/blog/morning-affirmations-to-start-your-day-content-2.webp   (second inline image)
public/blog/morning-affirmations-to-start-your-day-content-3.webp   (third, etc.)
```

To re-order or replace an inline image, change the **image blocks in Notion** and re-run the migrate script — don't rename files in `public/blog/` by hand, since the next migration will regenerate them from the Notion order.

---

## Embedding images in the body (Notion image blocks)

In the body, images are **Notion image blocks** — you add them in Notion, not as Markdown or JSX. After migration the renderer turns each block into a `next/image` inside a `<figure>`, using the downloaded local path (`image.__local`) and the caption.

### Rules

- **Add images as Notion image blocks**, placed where you want them in the flow. There is no Markdown `![ ]` step and no `<Image>` component to call.
- **Always write a caption** on each image block — it's both the visible figcaption and the alt text. Apply the full alt-text discipline above (descriptive, ~125 chars, no keyword stuffing, no "image of").
- **Local paths are automatic.** The script downloads remote Notion images and rewrites them to `/blog/<slug>-content-N.webp`. You don't hotlink and you don't manage URLs.
- **Don't re-embed the featured image in the body.** The route already renders it in the header; a duplicate in the body is redundant.

---

## Aesthetic: warm and calm

The visual brand is warm, gentle, and on-theme. Images should live inside that mood, not fight it:

- **Soft over harsh.** Favor natural and warm light, gentle scenes, and uncluttered compositions. Avoid neon glare, cold clinical white, and busy collages.
- **On-theme over generic.** The image should reinforce the post's specific feeling (calm for anxiety, light for faith, fresh start for morning) rather than be a generic "positive" stock shot.
- **Restraint and clarity.** A single, clear, calm subject reads better than a crowded frame — especially as a small index-card thumbnail.
- **Light and dark themes.** The site supports a dark theme. Choose images that survive the toggle; very bright, pure-white images can look harsh in dark mode, while warm mid-tones sit comfortably in both.

---

## Image density by archetype

How many images a post needs. aurasyncs is **text-forward** — the affirmations are the payload — so images set tone and break the body rather than carry the lesson. One strong featured image plus a few well-placed inline images is usually plenty.

| Content type | Featured | Body images | Notes |
|---|---|---|---|
| Themed affirmation collection (core) | 1 | 1 every ~600–1,000 words, or one per major section | Inline images break a long list and reset the mood between clusters |
| Daily / occasion set | 1 | 0–2 | A warm scene matching the day/occasion is enough |
| Faith / scripture set | 1 | 1–2 | Soft light / open-book imagery to reinforce reverence |
| Practice guide | 1 | 1–3 | An image per major step or technique where it genuinely helps |
| Pillar / topic hub | 1 | 2–4 | Images break the long body and signal care |
| "What is / how does" explainer | 1 | 0–2 | A single calm illustration where it clarifies the idea |

### Don't pad, don't skimp

Don't stuff a short daily set with stock filler just to hit a number — one calm featured image can be the whole visual payload. Conversely, a long collection that's a wall of text benefits from a few on-theme inline images to give the reader's eye a rest and reinforce the feeling.

---

## Image licensing

Every image on the site needs a clear license source. Options:

### Tier 1 — Owned by the site
- Original photography or illustration created for aurasyncs
- Images the author/site holds full rights to

**No license file needed; the site owns the image.**

### Tier 2 — Licensed
- Stock from a paid source (Adobe Stock, Shutterstock, etc.)
- Commissioned work with a usage license
- Public domain (clearly marked)

**Keep license proof in `/private/licenses/<image-slug>.txt` (out of the public repo if confidentiality matters).**

### Tier 3 — Free with attribution
- Unsplash / Pexels photos (free; attribution recommended)
- Wikimedia Commons (varies by image)
- Public-domain reference imagery

**The caption must include attribution per the license's requirements** — and since the caption is also the alt text, keep attribution short and tacked to the description.

### Tier 4 — Don't ship
- Any image found via image search with no clear license
- Screenshots of copyrighted material beyond fair use
- Trademarked/branded imagery used in a way that implies endorsement
- AI-generated images from a service whose ToS doesn't allow commercial use

**Don't ship.**

---

## AI-generated images

A nuanced area. Many sites use Midjourney, DALL·E, or Stable Diffusion for calm, on-theme illustrations, and for an affirmations blog the *mood* imagery is a reasonable fit since nothing is load-bearing instruction.

### Rules

- Check the generator's terms of service for commercial use.
- Disclose AI generation in the caption when material — e.g. "Illustration generated with an AI tool." (Remember the caption is also the alt text, so keep it natural.)
- **Never use AI-generated images of real people** (consent and likeness issues) — this matters for testimonial-style or "real person" framing.
- For YMYL trust, don't use AI to fabricate anything that reads as evidence (fake "before/after," fake people, fake scenes presented as real).
- Quality bar: if the image has the AI "tells" (extra fingers, melted edges, garbled text), don't ship it.

---

## Featured image and social sharing

The featured image is the post header and the index-card thumbnail. It is **not yet** guaranteed to be the social-share image: per-post `og:image` is **not currently wired** in the route, so Open Graph falls back to the site defaults.

- Make the **header / index thumbnail** work: recognizable, calm, on-theme at small sizes.
- Provide a good landscape source so the card crop stays centered on the subject.
- **Future enhancement:** wire per-post `og:image` from `featuredImage` so shares on social platforms use the post's own image. Until that lands, don't author copy or checklists that assume the featured image is the social card.

---

## Decorative graphics, icons, dividers

A clean blog doesn't need extra decorative clutter. Sections are separated by H2 headings and the rhythm of the real images, not by horizontal-rule graphics or fancy dividers. The renderer supports a plain `divider` block (`<hr>`) where a visual break helps — that's enough. Don't add competing decoration inside the post body.

---

## Image performance

Images are usually the largest assets on a page. The migrate script already helps a lot — WebP at quality 80, capped at 1200 × 800 — but you still influence the outcome:

- **Give a reasonably-sized source**, not a 6000px camera original — the script will resize, but a sane source keeps the pipeline fast.
- **Don't over-image.** A text-forward affirmations post rarely needs more than a handful of inline images; each one is bytes the reader downloads.
- **Prefer simple, calm compositions** — they compress smaller in WebP than busy, high-detail frames.
- **Trust the conversion.** Since the script standardizes format/size/quality, the lever you control is *how many* images and *how good the sources are*, not export settings.

---

## Pre-publish media checklist

- [ ] "Featured Image" file property set in Notion (so migration produces `public/blog/<slug>.webp` and `featuredImage: "/blog/<slug>.webp"`)
- [ ] Featured source is landscape-ish (~3:2) and at least ~1200px on the long edge
- [ ] Featured image is calm, warm, and on-theme — not cliché stock, not text-on-image
- [ ] Featured image reads well at thumbnail size and on both light and dark themes
- [ ] Every inline image is a Notion image block (no Markdown/JSX, no manual file placement)
- [ ] Every meaningful image has a descriptive, keyword-aware **caption** (it's the alt text too)
- [ ] No image relies on the `"Affirmation illustration"` fallback alt
- [ ] Each inline image's caption is distinct — no copy-pasted identical alt text
- [ ] No caption is keyword-stuffed; none start with "image of / picture of / photo of"
- [ ] Featured image is not also re-embedded in the body
- [ ] License source clear for every image; attribution in the caption where required
- [ ] No AI-generated images of real people; AI disclosed in the caption when material
- [ ] Migrate script run (`node --env-file=.env scripts/migrate-notion.mjs`) so all images are downloaded and rewritten to local paths
- [ ] Heads-up: per-post `og:image` is not wired yet — don't assume the featured image is the social card

---

**BlogOS** — images that earn their bytes.
