# Comic art direction — revision 2

## Social sharing banner — October 2026

Mode: built-in image_gen; new composition using `workshop-comic.webp` as a character and style reference. Final asset: `public/static/images/studio/social-comic.jpg` (1200 × 630). The original artwork is preserved. JPEG encoding and resizing do not alter the creative composition.

Prompt:

```text
Use case: ads-marketing
Asset type: social sharing / Open Graph banner for Coooder's engineering blog, wide 1.905:1 landscape, intended final 1200x630.
Input image 1: character and art style reference. Create a new horizontal composition matching it, not a website screenshot.
Primary request: bold exuberant American comic-book title card. Left half features the same curly black-haired young adult developer with round glasses and red jacket alongside the friendly cyan robot at a retro electronics workbench. Right half a clear bright yellow field with subtle halftone dots and legible headline, heavy black ink outlines, cyan/magenta accents, hard graphic shadows.
Text verbatim: large dominant italic cobalt headline "COOODER" (C O O O D E R, exactly three O's), below "AI AGENTS / DEV TOOLS" and "BUILD. BREAK. LEARN."
Keep all lettering and faces 60 pixels equivalent inside outer edges. Crop-safe, readable as a small link preview. Preserve recognizable characters, saturated yellow red cyan blue palette, Ben-Day dots, 2D handmade ink illustration. No 3D, no fake browser chrome, no tiny body copy, no additional lettering, no watermark. Full-bleed rectangular design.
```

Responsive site illustrations are generated from the existing WebP masters with `yarn images:optimize`. Widths: 480, 768, and 1200 pixels, in `public/static/images/studio/responsive/`. Keep these outputs in the repository for static hosting; no image server or API is required.

Mode: built-in image_gen, style-transfer edits of the original generated illustrations. Previous assets are preserved. Selected results are compressed to WebP without changing their composition.

## workshop

Source reference: `public/static/images/studio/workshop.webp`

Final asset: `public/static/images/studio/workshop-comic.webp`

```text
Use case: style-transfer. Input image 1 is the existing illustration to restyle. Replace the quiet sepia look with a exuberant high-impact American comic book splash panel. Thick confident black brush outlines, dramatic chunky ink shadows, vivid flat CMYK print colors, visible Ben-Day halftone dots, offset-print edges, energetic diagonal shapes and speed lines, strong readable silhouettes. Hot vermilion red, sunflower yellow, electric cyan, cobalt blue, punchy pink and near-black. Bold saturated colors dominate, with small ivory highlights. Illustrated on paper, absolutely NO 3D rendering, no glossy shading, no muted beige/olive palette. No text, lettering, logos, watermarks or speech bubbles (all UI lettering is added in code). Keep the main subjects recognizable, original characters only. Preserve the young adult developer's messy black hair, round glasses, red jacket, CRT workbench and friendly robot, but recompose them into a dynamic celebratory moment: the developer leans forward with an excited grin while the cyan robot raises one hand, their other hands working at the electronics. Low-angle energetic comic framing, bold yellow lightning shapes and magenta/cyan radial background, orange-lit gadgets, expressive American graphic novel faces, not manga. Square hero illustration with the face and robot in the center-safe area, all key subjects visible. Do not preserve the sleepy chin-rest pose.
```

## health

Source reference: `public/static/images/studio/health.webp`

Final asset: `public/static/images/studio/health-comic.webp`

```text
Use case: style-transfer. Input image 1 is the existing illustration to restyle. Replace the quiet sepia look with a exuberant high-impact American comic book splash panel. Thick confident black brush outlines, dramatic chunky ink shadows, vivid flat CMYK print colors, visible Ben-Day halftone dots, offset-print edges, energetic diagonal shapes and speed lines, strong readable silhouettes. Hot vermilion red, sunflower yellow, electric cyan, cobalt blue, punchy pink and near-black. Bold saturated colors dominate, with small ivory highlights. Illustrated on paper, absolutely NO 3D rendering, no glossy shading, no muted beige/olive palette. No text, lettering, logos, watermarks or speech bubbles (all UI lettering is added in code). Keep the main subjects recognizable, original characters only. Preserve the friendly robot holding a heart-shaped electronic sensor, the connected small monitor with heartbeat line, and privacy padlock. Make the robot cyan/blue, heart brilliant red, against a yellow and magenta comic burst backdrop. Landscape 3:2 panel with dramatic black hatching and bold action lines. Only these main subjects, readable at thumbnail scale.
```

## map

Source reference: `public/static/images/studio/map.webp`

Final asset: `public/static/images/studio/map-comic.webp`

```text
Use case: style-transfer. Input image 1 is the existing illustration to restyle. Replace the quiet sepia look with a exuberant high-impact American comic book splash panel. Thick confident black brush outlines, dramatic chunky ink shadows, vivid flat CMYK print colors, visible Ben-Day halftone dots, offset-print edges, energetic diagonal shapes and speed lines, strong readable silhouettes. Hot vermilion red, sunflower yellow, electric cyan, cobalt blue, punchy pink and near-black. Bold saturated colors dominate, with small ivory highlights. Illustrated on paper, absolutely NO 3D rendering, no glossy shading, no muted beige/olive palette. No text, lettering, logos, watermarks or speech bubbles (all UI lettering is added in code). Keep the main subjects recognizable, original characters only. Preserve the research index cards linked by red strings, magnifying glass and little computer displaying graph nodes. Make a vivid cobalt-and-cyan detective/research board, with yellow and hot pink cards and powerful red connecting lines. Landscape 3:2 comic panel, dramatic perspective, heavy black outlines, halftone shadows. No words or numbers on the cards.
```

## notes

Source reference: `public/static/images/studio/notes.webp`

Final asset: `public/static/images/studio/notes-comic.webp`

```text
Use case: style-transfer. Input image 1 is the existing illustration to restyle. Replace the quiet sepia look with a exuberant high-impact American comic book splash panel. Thick confident black brush outlines, dramatic chunky ink shadows, vivid flat CMYK print colors, visible Ben-Day halftone dots, offset-print edges, energetic diagonal shapes and speed lines, strong readable silhouettes. Hot vermilion red, sunflower yellow, electric cyan, cobalt blue, punchy pink and near-black. Bold saturated colors dominate, with small ivory highlights. Illustrated on paper, absolutely NO 3D rendering, no glossy shading, no muted beige/olive palette. No text, lettering, logos, watermarks or speech bubbles (all UI lettering is added in code). Keep the main subjects recognizable, original characters only. Preserve the open notebook, portable writing terminal, fountain pen and small connected paper notes. Turn it into a vivid American comic illustration: bright yellow/orange portable terminal, cyan and pink desk and backdrop, offwhite notebook with abstract ink strokes, dynamic flying paper corners. Landscape 3:2 panel, punchy black hatching and halftone dots. No actual text on screens or pages.
```
