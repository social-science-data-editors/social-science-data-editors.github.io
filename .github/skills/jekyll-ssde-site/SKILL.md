
---
name: jekyll-ssde-site
description: "Use when: editing or adding content to the SSDE Jekyll website; modifying navigation, sections, or layout; understanding how posts become page sections; adding images or links to sections; updating _config.yml site settings. Covers site architecture, content model, front matter fields, navigation, and how posts render as alternating sections on the landing page."
---

# SSDE Jekyll Site Structure

## Architecture Overview

This is a **single-page landing site** (with a few auxiliary redirect pages) built on Jekyll with a Bootstrap-based theme. Almost all visible content on the homepage is generated from files in `_posts/`.

```
_config.yml          ← Global settings: title, navigation, social links, logo, copyright
index.html           ← Root page (front matter only: layout, title, subTitle)
_posts/              ← Each file = one content section on the homepage
_layouts/
  default.html       ← Landing page layout: header + post sections iterator
  page.html          ← Standalone page layout: header + page content (no posts)
_includes/
  head.html          ← <head> block (CSS, meta tags)
  header.html        ← Navbar + hero banner (uses page.title, page.subTitle, site.logo)
  page_content.html  ← Iterates site.posts → renders alternating sections
  footer.html        ← Footer nav links, copyright, social buttons
  js.html            ← JS scripts (jQuery, Bootstrap, landing-page.js)
  custom-head.html   ← Favicons injected into <head>
assets/
  css/               ← Bootstrap + landing-page.css (custom theme)
  img/               ← Section images referenced by post front matter
  font-awesome-4.1.0/
dcas/index.html      ← Static HTML redirect (not a Jekyll post)
```

## Layout Chain

Two layouts are available:

**`default`** — used by the landing page and posts. Renders the full post-sections iterator:

```
index.html (front matter: layout: default)
  └── _layouts/default.html
        ├── _includes/head.html
        ├── _includes/header.html        ← navbar + hero section (#home anchor)
        ├── _includes/page_content.html  ← all post-based sections
        ├── _includes/footer.html
        └── _includes/js.html
```

**`page`** — used by standalone pages (e.g. `members.md`). Renders the page's own Markdown content inside a Bootstrap container, with no posts iteration:

```
members.md (front matter: layout: page)
  └── _layouts/page.html
        ├── _includes/head.html
        ├── _includes/header.html        ← same navbar + hero
        ├── {{ content }}               ← page's own Markdown
        ├── _includes/footer.html
        └── _includes/js.html
```

## Content Model: Posts as Sections

`_includes/page_content.html` loops over `site.posts reversed` and renders each post as a full-width Bootstrap section. **The filename date prefix controls section order**: `reversed` means oldest-dated file appears first (top of page), newest last (bottom).

Current section order (top → bottom):
1. `2023-01-01-who-we-are.markdown` — Who We Are (members)
2. `2024-01-01-dcas.markdown` — Data and Code Availability Standard
3. `2024-02-01-readme.markdown` — README template
4. `2024-03-01-guidance.markdown` — Guidance for Authors
5. `2024-03-02-reference.markdown` — Reference materials
6. `2024-05-01-info.markdown` — Participating (contact/info)

To **reorder sections**, rename files with different date prefixes. To **add a section**, create a new `_posts/YYYY-MM-DD-slug.markdown` file.

## Alternating Section Layout

Sections alternate between two Bootstrap column arrangements using `{% cycle 'odd', 'even' %}`:

- **Odd** (`content-section-a`): text/heading in `col-lg-8` (left), image in `col-lg-4` (right)
- **Even** (`content-section-b`): image in `col-lg-4` (left), text/heading in `col-lg-8` (right)

The cycle position is determined by the post's position in the loop (post 1 = odd, post 2 = even, etc.), **not** by any front matter field.

## Post Front Matter Fields

```yaml
---
layout: default       # Always "default"
category: dcas        # Used as the HTML anchor id (href="#dcas" in nav links)
title: "Section Title"
img: filename.png     # Optional. Image filename in assets/img/
imgcredit: "..."      # Optional. Image attribution (not currently rendered in template)
linkurl: /path        # Optional. URL for "To learn more" button and image link
linktext: "Custom"    # Optional. Button label (defaults to "To learn more")
description: |        # Declared but not used in the current template
---
Section body content in Markdown.
```

**Key relationships:**
- `category` → becomes `id` attribute on the anchor element; must match `url: '#category'` in `_config.yml` navigation to create working nav links
- `img` → references `assets/img/{{ post.img }}`; if `linkurl` is also set, the image becomes a clickable link
- `linkurl` → if present, renders a button below the text and wraps the image in a link

## Navigation System

Navigation is defined in `_config.yml` under the `navigation` key:

```yaml
navigation:
  - title: DCAS
    url: '#dcas'          # in-page anchor (matches post category value)
  - title: Reference
    url: '/reference'     # path to a standalone page
```

- Anchor links (`#name`) scroll to the section whose post has `category: name`
- Path links (`/path`) navigate to standalone pages (e.g., `/reference` → a separate Jekyll page or redirect)
- Navigation renders in both the navbar (`header.html`) and footer (`footer.html`)

## Global Site Settings (`_config.yml`)

| Key | Purpose |
|-----|---------|
| `url` | Base URL used in asset paths (`{{ site.url }}/assets/...`) |
| `title` | Site title shown in navbar brand and browser tab |
| `logo` | Path to logo image shown in hero section |
| `description` | Meta description tag |
| `copyright` | Footer copyright line |
| `credits` | Footer credits line (HTML allowed) |
| `navigation` | Array of `{title, url}` nav items |
| `social` | Array of `{title, icon, url}` for footer social buttons (uses Font Awesome icon names) |

## Auxiliary / Redirect Pages

Static HTML files outside `_posts/` are not processed as Jekyll posts and do not appear in the homepage sections:

- `dcas/index.html` — bare HTML with `<meta http-equiv="refresh">` redirect to `https://datacodestandard.org/`

These are used for short URLs that redirect to external resources.

## External Subsites (Separate Repositories)

Several URL paths under `social-science-data-editors.github.io/` are **served by other GitHub repositories**, not by this repo. They appear as subsites because GitHub Pages maps each repo named `<org>/<repo>` to `<org>.github.io/<repo>`.

Known external subsites (incomplete list — verify on GitHub before assuming a path is free):

| URL path | Repository | Notes |
|----------|------------|-------|
| `/reference` | `social-science-data-editors/reference` | Reference materials site |
| `/guidance` | `social-science-data-editors/guidance` | Guidance for authors site |
| `/template_README` | `social-science-data-editors/template_README` | Template README site |

**Implications when adding new pages or paths to this repo:**
- Do **not** create a folder or page at a path that is already used by an external subsite. For example, adding `reference/index.html` here would conflict with the `/reference` subsite.
- Before adding any new top-level path (e.g., a new folder `members/`, `tools/`, etc.), check whether a same-named repository already exists under the `social-science-data-editors` GitHub organization.
- Nav links pointing to `/reference` or `/guidance` (in `_config.yml`) intentionally route to those external subsites — this is expected behavior, not a broken link.

## Adding a New Content Section

1. Create `_posts/YYYY-MM-DD-slug.markdown` with appropriate front matter
2. Choose a date that places the section in the desired position (oldest = top)
3. Set `category` to a unique value; add a matching `{title, url: '#category'}` entry to `_config.yml` navigation if a nav link is needed
4. Place any section image in `assets/img/` and reference it with `img: filename.png`
5. Write the section body in Markdown below the front matter

## Common Pitfalls

- **Section order**: Controlled by filename date, not by any front matter field. To move a section, rename the file.
- **Anchors**: Nav links like `#dcas` will only scroll to the correct section if the post's `category` value matches exactly.
- **Image path**: `img` is relative to `assets/img/` — do not include the directory prefix in the front matter value.
- **`description` field**: Declared in all posts but not rendered by the current `page_content.html` template — it has no visible effect.
- **Standalone pages** (e.g. `/reference`, `/guidance`): These nav links and `linkurl` values point to **external subsites** served from other GitHub repositories, not pages in this repo. See the "External Subsites" section above. Do not create folders here with those names.
