#!/usr/bin/env node
/*
 * Regenerate the downloadable printable assets from their print routes.
 * The dev (or prod) server must be running on BASE (default http://localhost:3000).
 *
 *   node scripts/gen-printables.mjs
 *
 * Outputs:
 *   public/printables/affirmation-cards.pdf          (the 4-set card sheets)
 *   public/printables/affirmation-cards-coloring.pdf (line-art coloring set)
 *   public/printables/affirmation-cards-pin.png      (vertical Pinterest pin)
 *
 * Cards live in code (app/printables/**), so editing an affirmation means
 * re-running this to refresh the PDF a visitor downloads.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:3000';
const CHROME =
  process.env.CHROME ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = path.join(process.cwd(), 'public', 'printables');
mkdirSync(OUT, { recursive: true });

const PDFS = [
  ['/printables/affirmation-cards', 'affirmation-cards.pdf'],
  ['/printables/affirmation-cards-coloring', 'affirmation-cards-coloring.pdf'],
];
const PNGS = [
  // 1000x1500 vertical pin; window sized to match the 2:3 ratio.
  ['/printables/pin', 'affirmation-cards-pin.png', '1000,1500'],
];

for (const [route, file] of PDFS) {
  const dest = path.join(OUT, file);
  execFileSync(CHROME, [
    '--headless',
    '--disable-gpu',
    `--print-to-pdf=${dest}`,
    '--no-pdf-header-footer',
    '--virtual-time-budget=5000',
    `${BASE}${route}`,
  ]);
  console.log('pdf  →', dest);
}

for (const [route, file, size] of PNGS) {
  const dest = path.join(OUT, file);
  execFileSync(CHROME, [
    '--headless',
    '--disable-gpu',
    '--hide-scrollbars',
    `--window-size=${size}`,
    `--screenshot=${dest}`,
    '--virtual-time-budget=5000',
    `${BASE}${route}`,
  ]);
  console.log('png  →', dest);
}

console.log('Done. Re-run after editing app/printables/**.');
