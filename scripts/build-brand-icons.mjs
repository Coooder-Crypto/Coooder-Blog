import sharp from 'sharp';
import path from 'node:path';

const directory = path.resolve('public/static/favicons');
for (const size of [32, 180, 192, 512]) {
  await sharp(path.join(directory, 'coooder.svg'))
    .resize(size, size)
    .png()
    .toFile(path.join(directory, `coooder-${size}.png`));
}
console.log('Generated Coooder browser and install icons.');
