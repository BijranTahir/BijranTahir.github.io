# BioLab OS V6 — Scrolling Navigation

This upgrade fixes mobile navigation and command-palette scrolling.

## Changes
- Navigation drawer uses `100dvh` and a dedicated scrollable navigation area.
- Drawer header/profile and footer remain stable while the section list scrolls.
- Touch scrolling is enabled on Android/iOS.
- Command palette results are independently scrollable.
- Command palette height adapts to mobile viewport.
- Prevents overlay content from forcing/clipping the page.
- Existing V5 colorful controls and all existing JSON/assets are preserved.

## Merge
Keep your existing `assets/` and JSON content. Replace the V5 `style.css` with this V6 `style.css`.
