# Tahir Ahmad Bijran — BioLab OS Upgrade

This upgrade preserves the existing high-tech portfolio, profile data, content studio, categories, file manager, project/research/library/timeline editors, central profile logo, and both email addresses.

## Added
- Research Command Center / progress dashboard
- Browser BioTools: sequence statistics, reverse complement, translation, GC%, estimated nucleotide mass
- Scientific Data Studio: CSV upload/paste, line plotting, summary statistics, CSV export
- Bacterial growth simulator with ideal exponential model and doubling-time calculation
- Experiment tracker
- Virtual microscopy gallery with fullscreen viewer
- Digital public lab notebook
- Literature / publication library and local research-library assistant
- Educational protocol library
- Academic CV preview with Print / Save PDF
- Collaboration form using the visitor's email client (no server-side storage)
- Global command palette (`Ctrl/Cmd + K`)
- Installable PWA support and service worker
- Expanded Admin → Science Hub for Publications, Experiments, Lab Notes and Protocols
- Existing Admin sections remain intact

## Important
- The local Research Assistant is a deterministic search over public site data; it is not an external AI API.
- The Data Studio and BioTools run in the visitor's browser.
- The public GitHub Pages site should contain only information you intend to publish. Do not put tokens, passwords, unpublished raw research data, or private credentials in served files.
- The existing Admin Studio still uses a GitHub token in the browser session. For production security, migrate that authentication to GitHub OAuth/serverless backend before using it with sensitive repositories.

## Deployment
Upload/replace the files in your GitHub Pages repository. Keep all existing `assets/` files and JSON data that you have already populated.
