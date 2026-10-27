# Harshini Suresha · archives site

A one-page archive of projects, paper replications and personal sites, in a watermelon theme.
Plain HTML, CSS and JavaScript. No build step, no dependencies.

```
index.html          page structure, header, personal links, footer
css/style.css       all styling (colours are variables at the top, with a dark theme)
js/projects.js      ★ the project list: edit this to add or change projects
js/app.js           search, filters, sort, list view, theme toggle, shortcuts
assets/             favicon and seed patterns
404.html            themed "not found" page
robots.txt          allow all crawlers
.nojekyll           tells GitHub Pages to serve the files as they are
```

## Put it on GitHub Pages

1. Create a new empty repository on GitHub. Two common choices:
   - `Harshini-Suresha.github.io` → the site is served at `https://harshini-suresha.github.io/` (only if you don't already have a repo with that name).
   - any other name, e.g. `archives` → served at `https://harshini-suresha.github.io/archives/`.
2. In a terminal, from this folder:

```bash
git init -b main
git add .
git commit -m "Add archives site"
git remote add origin https://github.com/Harshini-Suresha/YOUR-REPO-NAME.git
git push -u origin main
```

3. On GitHub open **Settings → Pages**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then **Save**. The site goes live in a minute or two.

For a custom domain, add a file called `CNAME` containing only the domain (for example `links.example.com`), then point your DNS at GitHub Pages.

## Edit things

- **Add a project:** copy a line in `js/projects.js`, change the fields (the file explains each one) and save. Set `pin:1` to pin it at the top.
- **Add a personal link:** in `index.html`, find the *personal* card. To turn a "link coming soon" box (consumedlog, get in touch, inpassing) into a real link, replace `<div class="item idle">` with `<a class="item" href="YOUR-URL" target="_blank" rel="noopener">`, close it with `</a>`, and add `<span class="go" aria-hidden="true">→</span>` just before the `</a>`.
- **Status line, tagline, email, footer:** all in `index.html`. The copy-email button uses the address set in `js/app.js` (`var E = ...`).
- **Colours:** the variables at the top of `css/style.css` (`--bg`, `--sky`, `--rind`, …). The dark theme has its own set just below.

## Try it on your computer

```bash
python3 -m http.server 8000
```

then open http://localhost:8000.

## Features

Search (press `/`, clear with `Esc`) · topic filters with counts · "has live app" filter · pinned projects · sort A–Z · "updated X ago" and a recently-updated sort, read live from GitHub (one request, cached for an hour; if GitHub is unreachable the page just hides it) · grid or list view · surprise me · night mode (remembered) · copy email · back-to-top · seed pop on click · shareable filter links such as `?tag=bio&q=docking` · keyboard and screen-reader friendly · respects "reduce motion" · prints cleanly.

© 2026 Harshini Suresha. All rights reserved.
