# BioLab OS V3 — Stability Upgrade

This package is an upgrade of the existing Tahir Ahmad Bijran website. Existing Admin Control Center files and JSON content are preserved.

## Important V3 fixes
- Replaced the fragile front-end controller with a dependency-free event-driven controller.
- Fixed broken navigation markup.
- Fixed stale service-worker caching by moving to a versioned, network-first cache.
- Added safe fallbacks for missing JSON/content/media.
- Fixed sequence-tool interactions.
- Fixed scientific data plotting and summary calculations.
- Added PNG chart export.
- Added growth-simulation chart export.
- Fixed calculators and utility controls.
- Added local research checklist.
- Added additional BioTools: Primer Tm, reading-frame scan, motif search and amino-acid composition.
- Added Beer–Lambert concentration calculator.
- Kept existing Admin files and content JSON collections.

## Existing Admin data
Do not delete your current `content.json`, `projects.json`, `research.json`, `library.json`, `timeline.json`, `profile.json`, `publications.json`, `experiments.json`, `labnotes.json`, or `protocols.json` when merging this package.

## Deployment
1. Upload/merge the V3 files into the website repository.
2. Keep your existing `assets/` folder untouched so your profile logo and uploaded media remain.
3. After deployment, open the site once, then refresh it.
4. If an old service worker was previously installed, V3 updates it automatically. A hard refresh may still be useful on Android Chrome.

## Security note
The existing Admin token-in-browser architecture remains because it is part of the previous system. For a production-grade private admin, move authentication to OAuth + a serverless backend and never expose a GitHub token to browser JavaScript.
