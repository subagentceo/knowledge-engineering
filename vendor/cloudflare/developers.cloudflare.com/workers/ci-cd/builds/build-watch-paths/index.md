---
title: Build watch paths
description: Reduce compute for your monorepo by specifying paths for Workers Builds to skip
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build watch paths

When you connect a git repository to Workers, by default a change to any file in the repository will trigger a build. You can configure Workers to include or exclude specific paths to specify if Workers should skip a build for a given path. This can be especially helpful if you are using a monorepo project structure and want to limit the number of builds being kicked off.

## Configure Paths

To configure which paths are included and excluded:

1. In **Overview**, select your Workers project.
2. Go to **Settings** \> **Build** \> **Build watch paths**. Workers will default to setting your project’s includes paths to everything (\[\*\]) and excludes paths to nothing (`[]`).

The configuration fields can be filled in two ways:

* **Static filepaths**: Enter the precise name of the file you are looking to include or exclude (for example, `docs/README.md`).
* **Wildcard syntax:** Use wildcards to match multiple path directories. You can specify wildcards at the start or end of your rule.

Wildcard syntax

A wildcard (`*`) is a character that is used within rules. It can be placed alone to match anything or placed at the start or end of a rule to allow for better control over branch configuration. A wildcard will match zero or more characters. For example, if you wanted to match all branches that started with `fix/` then you would create the rule `fix/*` to match strings like `fix/1`, `fix/bugs`, or `fix/`.

For each path in a push event, build watch paths will be evaluated as follows:

* Paths satisfying excludes conditions are ignored first
* Any remaining paths are checked against includes conditions
* If any matching path is found, a build is triggered. Otherwise the build is skipped

Workers will bypass the path matching for a push event and default to building the project if:

* A push event contains 0 file changes, in case a user pushes an empty push event to trigger a build
* A push event contains 3000+ file changes or 20+ commits

## Examples

### Example 1

If you want to trigger a build from all changes within a set of directories, such as all changes in the folders `project-a/` and `packages/`

* Include paths: `project-a/*, packages/*`
* Exclude paths: \`\`

### Example 2

If you want to trigger a build for any changes, but want to exclude changes to a certain directory, such as all changes in a docs/ directory

* Include paths: `*`
* Exclude paths: `docs/*`

### Example 3

If you want to trigger a build for a specific file or specific filetype, for example all files ending in `.md`.

* Include paths: `*.md`
* Exclude paths: \`\`

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/#page","headline":"Build watch paths · Cloudflare Workers docs","description":"Reduce compute for your monorepo by specifying paths for Workers Builds to skip","url":"https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/ci-cd/","name":"CI/CD"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/ci-cd/builds/","name":"Builds"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/ci-cd/builds/build-watch-paths/","name":"Build watch paths"}}]}
```
