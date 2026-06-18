---
title: Build caching
description: Improve build times by caching build outputs and dependencies
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build caching

Improve Workers build times by caching dependencies and build output between builds with a project-wide shared cache.

The first build to occur after enabling build caching on your Workers project will save relevant artifacts to cache. Every subsequent build will restore from cache unless configured otherwise.

## About build cache

When enabled, build caching will automatically detect which package manager and framework the project is using from its `package.json` and cache data accordingly for the build.

The following shows which package managers and frameworks are supported for dependency and build output caching respectively.

### Package managers

Workers build cache will cache the global cache directories of the following package managers:

| Package Manager                 | Directories cached |
| ------------------------------- | ------------------ |
| [npm ↗](https://www.npmjs.com/) | .npm               |
| [yarn ↗](https://yarnpkg.com/)  | .cache/yarn        |
| [pnpm ↗](https://pnpm.io/)      | .pnpm-store        |
| [bun ↗](https://bun.sh/)        | .bun/install/cache |

### Frameworks

Some frameworks provide a cache directory that is typically populated by the framework with intermediate build outputs or dependencies during build time. Workers Builds will automatically detect the framework you are using and cache this directory for reuse in subsequent builds.

The following frameworks support build output caching:

| Framework  | Directories cached                       |
| ---------- | ---------------------------------------- |
| Astro      | node\_modules/.astro                     |
| Docusaurus | node\_modules/.cache, .docusaurus, build |
| Eleventy   | .cache                                   |
| Gatsby     | .cache, public                           |
| Next.js    | .next/cache                              |
| Nuxt       | node\_modules/.cache/nuxt                |
| SvelteKit  | node\_modules/.cache/imagetools          |

Note

[Static assets](https://developers.cloudflare.com/workers/static-assets/) and [frameworks](https://developers.cloudflare.com/workers/framework-guides/) are now supported in Cloudflare Workers.

### Limits

The following limits are imposed for build caching:

* **Retention**: Cache is purged 7 days after its last read date. Unread cache artifacts are purged 7 days after creation.
* **Storage**: Every project is allocated 10 GB. If the project cache exceeds this limit, the project will automatically start deleting artifacts that were read least recently.

## Enable build cache

To enable build caching:

1. Navigate to [Workers & Pages Overview ↗](https://dash.cloudflare.com) on the Dashboard.
2. Find your Workers project.
3. Go to **Settings** \> **Build** \> **Build cache**.
4. Select **Enable** to turn on build caching.

## Clear build cache

The build cache can be cleared for a project when needed, such as when debugging build issues. To clear the build cache:

1. Navigate to [Workers & Pages Overview ↗](https://dash.cloudflare.com) on the Dashboard.
2. Find your Workers project.
3. Go to **Settings** \> **Build** \> **Build cache**.
4. Select **Clear Cache** to clear the build cache.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/build-caching/#page","headline":"Build caching · Cloudflare Workers docs","description":"Improve build times by caching build outputs and dependencies","url":"https://developers.cloudflare.com/workers/ci-cd/builds/build-caching/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/ci-cd/","name":"CI/CD"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/ci-cd/builds/","name":"Builds"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/ci-cd/builds/build-caching/","name":"Build caching"}}]}
```
