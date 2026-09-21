# Tahir Ahmad Bijran — High-Tech Website Upgrade

## What this adds

- Expanded academic/profile content
- Dedicated Research, Expertise, Projects, Library, Field Notes and Journey sections
- Dynamic profile, skills, lab skills, tools and working principles
- Dynamic categories
- **Content Studio**: upload a photo/video/audio/document, enter a title + description + body text, choose a category and publish
- Published media + text automatically appears in the public **Field Notes** section
- File Manager for repository uploads/deletion
- Searchable library
- Responsive high-tech UI with dark/light mode, animated ambient background and responsive navigation

## Files

Replace the matching root files in `BijranTahir/BijranTahir.github.io`:
`index.html`, `style.css`, `app.js`, `profile.json`, `research.json`, `projects.json`, `library.json`, `timeline.json`, `admin.html`, `admin.css`, `admin.js`.

Add:
`content.json`, `categories.json`.

Keep your existing `assets/` directory and profile image.

## Admin

Open `/admin.html` on your GitHub Pages site. The admin is restricted in code to the GitHub account `BijranTahir`.

For the static GitHub Pages version, the admin uses a fine-grained GitHub token entered in the browser session. Restrict the token to this repository and Contents: Read and write. A production-grade OAuth/backend implementation can later remove the need for a browser-entered token.


## IMPORTANT — Central Logo

The hero's central BT / BIO-TECH circle has been changed to use:

`assets/images/profile.jpg`

Place your original logo at exactly that path. The surrounding orbital animation remains unchanged.


## Central Hero Logo Fix

The hero core now contains NO generated text. It loads:
`assets/images/profile.jpg`

The central hero directly uses your saved `profile.jpg`.

For the exact logo you requested, upload your original `picture.jpg` to:
`assets/images/profile.jpg`
