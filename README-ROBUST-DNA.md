# Robust actual-DNA hero

The previous WebGL/Three.js version could disappear on some mobile browsers if the
external module failed to load. This version removes that dependency completely.

The DNA is drawn in a self-contained HTML5 Canvas animation:
- recognizable double helix
- two independent backbones
- many base-pair rungs
- perspective/depth scaling
- glowing nodes
- molecular clusters
- orbit lines
- continuous rotation
- pointer interaction
- no external JS library required

Replace:
- index.html
- style.css
- dna.js

Keep your existing app.js and JSON content files.
