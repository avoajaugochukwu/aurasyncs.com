---
name: media-and-images
description: Featured-image rules, Markdown alt-text craft, file naming, social-card dimensions, Markdown image syntax, inline image placement, and licensing for aurasyncs.com. Images set the tone of an affirmations post — a calm, warm, on-theme visual signals care before a reader reads a word. One featured image per post (frontmatter `featuredImage`) for the header and index card, plus inline images placed with Markdown `![alt](…)`, with descriptive alt text, sized so nothing shifts. Covers the discipline of media that signals quality to readers, helps accessibility, and feeds the SEO signals Google rewards.
---

# Media & Images — the visual layer

> Images on an aurasyncs post serve four audiences at once: the skimming reader (visual calm and interest), the person looking for a feeling (a serene image that matches the theme), the accessibility user (alt text), and Google's crawler (alt text + filename). The same image either serves all four or fails all four. On aurasyncs the house style is **warm, calm, on-theme**: soft light, gentle scenes, nothing harsh or clinical. Every post ships with one **featured image** for the header and index card; longer collections and practice guides use a few **inline images** to break the body and reinforce the mood.

---

## How images actually get into a post (place files, reference in Markdown)

Image files live under `public/blog/`, and you reference them from the post:

- **Featured image** — set the frontmatter `featuredImage: "/blog/<slug>.webp"` (or omit it). The file lives at `public/blog/<slug>.webp`.
- **Inline images** — place each in the body with Markdown: `![alt](/blog/<slug>-content-1.webp)`, `-content-2.webp`, and so on. The files live at `public/blog/<slug>-content-N.webp`.

You place the image files under `public/blog/` yourself (no Notion, no download-and-migrate step). The optional `scripts/gen-assets.mjs` can process assets — e.g. converting to WebP and capping the dimensions — but the file simply existing at the referenced path is what makes it render. There's no caption-as-alt indirection and no `image.__local` rewrite; the Markdown `src` path and `alt` are exactly what ship.

`components/MdxContent.tsx` maps Markdown `img` to `next/image`, using the path in the Markdown `src` and the **alt text from the Markdown alt** (falling back to `"Affirmation illustration"` when alt is empty). `app/blog/[slug]/page.tsx` renders the featured image in the header from `featuredImage`, and `components/BlogPostCard.tsx` renders the index-card thumbnail from `featuredImage`.

---

## The featured image

Every post ships with one featured image, set in the frontmatter as `featuredImage`. The file lives at:

```
public/blog/<slug>.webp   →   frontmatter: featuredImage: "/blog/<slug>.webp"
```

It is used for the **post header** (rendered above the body) and the **index-page card thumbnail** (`BlogPostCard.tsx`). The featured-image alt is set by the card to `Featured image for <title>` — there is no separate featured `alt` field, so the image itself has to carry the meaning at a glance.

> Note on social cards: a per-post `og:image` **is wired** — `app/blog/[slug]/page.tsx` emits OpenGraph (and a Twitter `summary_large_image` card) using the post's `featuredImage`. So the featured image **is** the social-share image; author as if it ships, because it does.

### Featured image rules

- **Source quality first.** Provide a clean source image at least ~1200px on the long edge so a 1200 × 800-ish target has real pixels to work with. A small, soft, or upscaled source stays soft.
- **Aspect ratio: aim landscape, roughly 3:2.** The index card renders inside a fixed landscape frame (it object-covers a ~600 × 400 / 16:9-ish box). A landscape source crops predictably; a tall portrait source gets center-cropped on the card and can lose its subject.
- **Format/size: WebP, ~1200 × 800.** Export (or run `scripts/gen-assets.mjs`) to WebP at around quality 80, capped near 1200 × 800. Place the result at `public/blog/<slug>.webp`. Just start from a good, properly-licensed source.
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
- **Unreadable text-on-image.** Don't rely on the affirmation text baked into the picture — downscaling can soften it and it won't be real, indexable text. Keep the words in the post body; let the image carry mood.
- **Harsh, clinical, or chaotic visuals** that fight the warm, calm house style — neon glare, busy collages, cold stock blue.

### When the post has no obvious image

Some topics resist a literal picture. Fallbacks that stay on-brand:

- A single warm symbol tied to the theme (a sunrise for a morning set, soft hands for a gratitude set).
- A calm textured background (warm light, gentle gradient, soft natural scene) that carries mood without a literal subject.
- A small, tasteful scene that evokes the feeling rather than illustrating a noun.

Never use a generic "person at a desk" or stock-smile image as a filler.

---

## Alt text craft (it's the Markdown image alt)

On aurasyncs the alt text is the **Markdown image alt** — the text inside the brackets of `![alt](/blog/<slug>-content-N.webp)`. The renderer uses it directly and falls back to `"Affirmation illustration"` when the alt is empty. So **every meaningful inline image should have descriptive alt text**, written as descriptive, keyword-aware prose for the screen-reader user and the crawler.

### Rules

- **Describe the image, not the post.** The alt is for someone who can't see the picture, not a place to keyword-stuff.
- **Keep it tight, ~125 characters or so.** Screen readers read better short; aim for one clear sentence.
- **Sentence-case prose, not phrase fragments.** "A woman resting her hands over her heart in soft morning light" beats "self love affirmations confidence hands heart".
- **Target the query naturally if relevant** — don't force it. If the image actually shows the theme, the honest description already carries the keyword.
- **No "image of," "picture of," "photo of"** — screen readers already announce it's an image.
- **Leaning on the fallback is a last resort.** An image with empty alt becomes `"Affirmation illustration"`, which helps no one — write real alt instead.

### Examples

| Image | Good alt | Bad alt |
|---|---|---|
| Featured for a morning-affirmations post | "A calm sunrise over a still lake, soft golden light starting the day." | "morning affirmations daily positive sunrise best" |
| Inline in a self-love collection | "A person resting both hands gently over their heart in warm window light." | "self love affirmations woman happy" |
| Inline in a faith / scripture set | "An open book on a wooden table with soft light falling across the pages." | "bible affirmations scripture faith verses" |
| Inline in an anxiety / calm guide | "Still water under a quiet morning sky, a few slow ripples spreading out." | "anxiety affirmations calm relax" |

### Keep each alt distinct

If a post has several inline images, give each its **own** alt describing that specific image. Don't paste the same line into every `![…]` — repeated identical alt text is noise to a screen reader and a wasted signal to search.

---

## Attribution (where a license requires it)

There is **no separate visible caption / `<figcaption>`** on this renderer — the Markdown `img` maps straight to `next/image`, so the alt text is the only string attached to each image. Where a license requires visible attribution, add it as a short Markdown line directly beneath the image (e.g. an italic credit), since the alt text alone isn't displayed to sighted readers.

### Attribution format

- A short Markdown line under the image — e.g. `*Photo by [name] on Unsplash.*`
- Keep it to the credit the license actually requires; don't clutter every image.
- Keep alt text and attribution separate: the alt describes the picture; the line credits the source.

### Example

```markdown
![A calm sunrise over a still lake, soft golden light spreading across the water.](/blog/morning-affirmations-content-1.webp)

*Photo by [name] on Unsplash.*
```

---

## File naming (name them from the slug)

Name image files yourself from the slug, then reference them in the post. The convention:

- **Featured:** `public/blog/<slug>.webp` → frontmatter `featuredImage: "/blog/<slug>.webp"`.
- **Inline (body) images:** `public/blog/<slug>-content-N.webp`, where `N` is `1, 2, 3…` in the order the images appear in the body. The first inline image is `-content-1.webp`, the second `-content-2.webp`, and so on.
- **Format is `.webp`** — export (or run `scripts/gen-assets.mjs`) to WebP regardless of the source format.

Example for a morning-affirmations post (slug `morning-affirmations-to-start-your-day`):

```
public/blog/morning-affirmations-to-start-your-day.webp             (featured)
public/blog/morning-affirmations-to-start-your-day-content-1.webp   (first inline image)
public/blog/morning-affirmations-to-start-your-day-content-2.webp   (second inline image)
public/blog/morning-affirmations-to-start-your-day-content-3.webp   (third, etc.)
```

To re-order or replace an inline image, swap the file under `public/blog/` and update the matching `![alt](…)` reference in the body — keep the `-content-N` numbers in sync with the order the images appear.

---

## Embedding images in the body (Markdown)

In the body, images are plain **Markdown**: `![alt](/blog/<slug>-content-N.webp)`, placed where you want them in the flow. `components/MdxContent.tsx` maps each to a `next/image`.

### Rules

- **Add images with Markdown `![alt](/blog/<slug>-content-N.webp)`**, placed where you want them. There's no Notion step and no `<Image>` JSX component to call.
- **Always write descriptive alt** inside the brackets — it's the alt text the renderer uses. Apply the full alt-text discipline above (descriptive, ~125 chars, no keyword stuffing, no "image of").
- **Use the local path** under `public/blog/` — `/blog/<slug>-content-N.webp`. You don't hotlink and you don't manage remote URLs.
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

**Keep license proof somewhere durable and private (out of the public repo if confidentiality matters) — a license-tracking note or store of your choosing.**

### Tier 3 — Free with attribution
- Unsplash / Pexels photos (free; attribution recommended)
- Wikimedia Commons (varies by image)
- Public-domain reference imagery

**Add the required attribution as a short Markdown line beneath the image** (see "Attribution" above), per the license's requirements — keep it short.

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
- Disclose AI generation when material — e.g. an italic Markdown line beneath the image, "Illustration generated with an AI tool." (Keep it separate from the descriptive alt text.)
- **Never use AI-generated images of real people** (consent and likeness issues) — this matters for testimonial-style or "real person" framing.
- For YMYL trust, don't use AI to fabricate anything that reads as evidence (fake "before/after," fake people, fake scenes presented as real).
- Quality bar: if the image has the AI "tells" (extra fingers, melted edges, garbled text), don't ship it.

---

## Featured image and social sharing

The featured image is the post header, the index-card thumbnail, **and the social-share image**: `app/blog/[slug]/page.tsx` wires per-post `og:image` from `featuredImage` and ships a Twitter `summary_large_image` card, so shares on social platforms use the post's own image.

- Make the **header / index thumbnail** work: recognizable, calm, on-theme at small sizes.
- Provide a good landscape source so the card crop stays centered on the subject — it doubles as the social card.
- Because `featuredImage` *is* the OG/Twitter image, it's worth making sure it reads well at social-card dimensions too, not just as a thumbnail.

---

## Decorative graphics, icons, dividers

A clean blog doesn't need extra decorative clutter. Sections are separated by `##` headings and the rhythm of the real images, not by horizontal-rule graphics or fancy dividers. The renderer styles a Markdown thematic break (`---` → `<hr>`) where a visual break helps — that's enough. Don't add competing decoration inside the post body.

---

## Image performance

Images are usually the largest assets on a page. Exporting to WebP at quality 80, capped at ~1200 × 800 (by hand or via `scripts/gen-assets.mjs`), already helps a lot — but you still influence the outcome:

- **Start from a reasonably-sized source**, not a 6000px camera original, and cap it near 1200 × 800 on export — a sane size keeps pages fast.
- **Don't over-image.** A text-forward affirmations post rarely needs more than a handful of inline images; each one is bytes the reader downloads.
- **Prefer simple, calm compositions** — they compress smaller in WebP than busy, high-detail frames.
- **Standardize format/size/quality** — WebP, ~q80, capped near 1200 × 800. The biggest levers are *how many* images you use and *how good the sources are*.

---

## Pre-publish media checklist

- [ ] `featuredImage: "/blog/<slug>.webp"` set in frontmatter, with the file placed at `public/blog/<slug>.webp`
- [ ] Featured source is landscape-ish (~3:2) and at least ~1200px on the long edge
- [ ] Featured image is calm, warm, and on-theme — not cliché stock, not text-on-image
- [ ] Featured image reads well at thumbnail size, as a social card, and on both light and dark themes
- [ ] Every inline image is Markdown `![alt](/blog/<slug>-content-N.webp)`, with the file placed under `public/blog/`
- [ ] Every meaningful image has descriptive, keyword-aware **alt text** in the `![…]` brackets
- [ ] No image relies on the `"Affirmation illustration"` fallback alt
- [ ] Each inline image's alt is distinct — no copy-pasted identical alt text
- [ ] No alt is keyword-stuffed; none start with "image of / picture of / photo of"
- [ ] Featured image is not also re-embedded in the body
- [ ] License source clear for every image; attribution added as a Markdown line beneath the image where required
- [ ] No AI-generated images of real people; AI disclosed (Markdown line beneath the image) when material
- [ ] Image files exported to WebP (~q80, ~1200 × 800), by hand or via `scripts/gen-assets.mjs`
- [ ] `featuredImage` is the per-post `og:image`/Twitter card — make sure it works as a social share image

---

**BlogOS** — images that earn their bytes.
