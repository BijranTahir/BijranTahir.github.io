# REAL 3D DNA — final hero

This is the correct architecture for the requested effect.

It is a real browser-rendered 3D molecular model, not an image and not two
glowing strings. It contains:
- 42 base-pair positions
- two 3D helical backbone tubes
- phosphate spheres
- sugar-ring geometry
- individual base units
- connecting bonds
- hydrogen-bond detail
- realistic lighting/material depth
- surrounding molecular particles
- continuous 3D rotation
- touch/pointer response

## Install

1. Put `dna3d.js` in the root of the repository.
2. In `index.html`, inside the hero visual, use:
   `<div id="dna3d" class="dna3d"></div>`
3. Add before `</body>`:
   `<script src="dna3d.js"></script>`
4. In `style.css`, the `#dna3d` container must have a real height.

The script loads Three.js with a CDN fallback and creates the DNA entirely in
WebGL. No generated image is used.
