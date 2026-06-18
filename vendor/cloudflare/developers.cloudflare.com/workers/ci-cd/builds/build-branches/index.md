---
title: Build branches
description: Configure which git branches should trigger a Workers Build
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build branches

When you connect a git repository to Workers, commits made on the production git branch will produce a Workers Build. If you want to take advantage of [preview URLs](https://developers.cloudflare.com/workers/configuration/previews/) and [pull request comments](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/#pull-request-comment), you can additionally enable "non-production branch builds" in order to trigger a build on all branches of your repository.

## Change production branch

To change the production branch of your project:

1. In **Overview**, select your Workers project.
2. Go to **Settings** \> **Build** \> **Branch control**. Workers will default to the default branch of your git repository, but this can be changed in the dropdown.

Every push event made to this branch will trigger a build and execute the [build command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#deploy-command), followed by the [deploy command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#deploy-command).

## Configure non-production branch builds

To enable or disable non-production branch builds:

1. In **Overview**, select your Workers project.
2. Go to **Settings** \> **Build** \> **Branch control**. The checkbox **Builds for non-production branches** allows you to enable or disable builds for non-production branches.

When enabled, every push event made to a non-production branch will trigger a build and execute the [build command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#deploy-command), followed by the [non-production branch deploy command](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#non-production-branch-deploy-command).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/#page","headline":"Build branches · Cloudflare Workers docs","description":"Configure which git branches should trigger a Workers Build","url":"https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/ci-cd/","name":"CI/CD"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/ci-cd/builds/","name":"Builds"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/ci-cd/builds/build-branches/","name":"Build branches"}}]}
```
