import sharp from 'sharp';
import fs from 'node:fs';

const svg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7c3aed"/>
      <stop offset="50%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#f59e0b"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#g)"/>
  <text x="50%" y="50%" dy="0.36em" text-anchor="middle"
    font-family="Helvetica, Arial, sans-serif" font-weight="800" font-size="300" fill="#ffffff">A</text>
</svg>`;

await sharp(Buffer.from(svg(512))).resize(512, 512).png().toFile('public/logo.png');
await sharp(Buffer.from(svg(180))).resize(180, 180).png().toFile('app/apple-icon.png');
console.log('Generated public/logo.png and app/apple-icon.png');
