import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('public/static/images/studio');
await mkdir(path.join(root, 'responsive'), { recursive: true });
for (const name of ['workshop', 'health', 'map', 'notes']) {
  for (const width of [480, 768, 1200]) {
    const output = path.join(root, 'responsive', `${name}-${width}.webp`);
    await sharp(path.join(root, `${name}-comic.webp`))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(output);
    console.log(`${name}-${width}.webp: ${Math.round((await stat(output)).size / 1024)} KB`);
  }
}
