# Tahir Ahmad Bijran — Admin CMS

This package adds a browser-based CMS to your GitHub Pages website.

## What it can manage

- Profile
- Research
- Projects
- Digital Library
- Journey / Timeline
- Categories
- Images
- Videos
- PDF / PPT / PPTX / DOC / DOCX / TXT / CSV and other files
- Delete repository files
- Edit existing JSON content
- Add new entries
- Publish changes directly to `BijranTahir/BijranTahir.github.io`

## Important security note

GitHub Pages itself is static. This CMS therefore uses the GitHub API directly from your browser.

**Do not put a GitHub token inside `admin.js`.** The included page asks for your token at login and stores it only in `sessionStorage`.

For the token, create a **fine-grained personal access token** restricted to:

- Repository: `BijranTahir/BijranTahir.github.io`
- Repository permissions:
  - Contents: Read and write

Do not give the token access to unrelated repositories.

## Install

Upload these files to the root of your repository:

- `admin.html`
- `admin.css`
- `admin.js`

Then open:

`https://bijrantahir.github.io/admin.html`

## Existing JSON files

The CMS uses these root files:

- `profile.json`
- `research.json`
- `projects.json`
- `library.json`
- `timeline.json`
- `categories.json`

If `profile.json` or `categories.json` does not exist yet, the CMS will create it automatically the first time you save it.

## Media folders

Uploads are automatically routed to:

- `assets/images/`
- `assets/videos/`
- `assets/documents/`
- `assets/presentations/`
- `assets/files/`

## Large videos

GitHub is not ideal for large video hosting. For large videos, use YouTube/Vimeo/Cloudflare R2/Supabase Storage and store the URL in the Library instead of uploading the video to the repository.

## One important website change

Your current public site should continue working as it does now. The CMS is an additional page and does not replace your existing `index.html`.

If you want the admin page to be visually hidden from normal navigation, simply do not add it to the public navigation menu.
