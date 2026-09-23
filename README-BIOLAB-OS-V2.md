# BioLab OS v2

This package upgrades the existing Tahir Ahmad Bijran portfolio while keeping the existing JSON/Admin architecture.

## Added / hardened
- BioTools: sequence stats, reverse complement, translation, GC%, estimated nucleic-acid mass, primer Tm screening, reading-frame scan.
- Scientific Data Studio: CSV/paste parsing, graph, mean/min/max, linear regression slope, R² and simple doubling-time estimate.
- Growth simulator.
- Virtual microscopy viewer.
- Digital lab notebook, publications, protocols, local research-library search.
- Command palette (Ctrl/Cmd+K).
- Academic CV print/save-to-PDF.
- Collaboration email form.
- Lab calculators: C1V1=C2V2, molarity, centrifuge RCF/RPM.
- Lab utilities: countdown timer, stopwatch/laps, browser-local quick note.
- PWA manifest/service worker support.
- Defensive optional DOM bindings so one missing element does not stop the entire app.

## Important
The package intentionally does not overwrite your existing `assets/` media. Copy/merge these files over the current website so your already-uploaded images, PDFs, videos and Admin-published content remain untouched.

Your actual `assets/images/profile.jpg` should remain in your current website; the included placeholder is only a fallback.
