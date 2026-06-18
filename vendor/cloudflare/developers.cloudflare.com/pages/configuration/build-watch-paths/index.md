---
title: Build watch paths
description: Configure which file paths trigger or skip a Cloudflare Pages build when changes are pushed.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build watch paths

When you connect a git repository to Pages, by default a change to any file in the repository will trigger a Pages build. You can configure Pages to include or exclude specific paths to specify if Pages should skip a build for a given path. This can be especially helpful if you are using a monorepo project structure and want to limit the amount of builds being kicked off.

## Configure paths

To configure which paths are included and excluded:

1. Go to the **Workers & Pages** in the Cloudflare dashboard.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Find your Pages project.
3. Go to **Settings** \> **Build** \> **Build watch paths**. Pages will default to setting your project's includes paths to everything (\[\*\]) and excludes paths to nothing (`[]`).

The configuration fields can be filled in two ways:

* **Static filepaths**: Enter the precise name of the file you are looking to include or exclude (for example, `docs/README.md`).
* **Wildcard syntax:** Use wildcards to match multiple paths. You can specify wildcards at the start or end of your rule.

Wildcard syntax

A wildcard (`*`) matches zero or more characters, **including path separators (`/`)**. This means a single `*` at the end of a path pattern will match files in nested subdirectories as well. For example:

* `docs/*` matches `docs/README.md`, `docs/guides/setup.md`, and `docs/guides/advanced/config.md`.
* `*.md` matches `README.md`, `docs/README.md`, and `src/content/guide.md`.
* `*` alone matches all files in the repository.

For each path in a push event, build watch paths will be evaluated as follows:

* Paths satisfying excludes conditions are ignored first
* Any remaining paths are checked against includes conditions
* If any matching path is found, a build is triggered. Otherwise the build is skipped

Pages will bypass the path matching for a push event and default to building the project if:

* A push event contains 0 file changes, in case a user pushes an empty push event to trigger a build
* A push event contains 3000+ file changes or 20+ commits

## Examples

### Trigger builds for specific directories (monorepo)

If you want to trigger a build only when files change within specific directories, such as `project-a/` and `packages/`. Because `*` matches across path separators, this includes changes in nested subdirectories like `project-a/src/index.js` or `packages/utils/lib/helpers.ts`.

* Include paths: `project-a/*, packages/*`
* Exclude paths: \`\`

### Exclude a directory from triggering builds

If you want to trigger a build for any changes, but want to exclude changes to a certain directory, such as all changes in a `docs/` directory (including nested paths like `docs/guides/setup.md`).

* Include paths: `*`
* Exclude paths: `docs/*`

### Trigger builds for a specific filetype

If you want to trigger a build for a specific file or specific filetype, for example all `.md` files anywhere in the repository.

* Include paths: `*.md`
* Exclude paths: \`\`

### Trigger builds for a directory but exclude a subdirectory

If you want to trigger a build for changes in `src/` but want to ignore changes in `src/tests/`.

* Include paths: `src/*`
* Exclude paths: `src/tests/*`

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/build-watch-paths/#page","headline":"Build watch paths · Cloudflare Pages docs","description":"Configure which file paths trigger or skip a Cloudflare Pages build when changes are pushed.","url":"https://developers.cloudflare.com/pages/configuration/build-watch-paths/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/configuration/build-watch-paths/","name":"Build watch paths"}}]}
```
