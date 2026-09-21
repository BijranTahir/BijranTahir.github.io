# Fix for the mobile rendering issue

Replace the existing `index.html` with this one and upload
`assets/images/profile-placeholder.svg`.

The `?v=20260921` cache-busters force the browser to request the current
`style.css` and `app.js`, fixing the stale-CSS problem visible on mobile.

The placeholder prevents the broken-image icon until you upload your own:
`assets/images/profile.jpg`

Keep the existing `style.css`, `app.js`, and JSON files unchanged.
