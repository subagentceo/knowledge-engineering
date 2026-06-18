---
title: CI/CD
description: Set up continuous integration and continuous deployment for your Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# CI/CD

You can set up continuous integration and continuous deployment (CI/CD) for your Workers by using either the integrated build system, [Workers Builds](#workers-builds), or using [external providers](#external-cicd) to optimize your development workflow.

## Why use CI/CD?

Using a CI/CD pipeline to deploy your Workers is a best practice because it:

* Automates the build and deployment process, removing the need for manual `wrangler deploy` commands.
* Ensures consistent builds and deployments across your team by using the same source control management (SCM) system.
* Reduces variability and errors by deploying in a uniform environment.
* Simplifies managing access to production credentials.

## Which CI/CD should I use?

Choose [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds) if you want a fully integrated solution within Cloudflare's ecosystem that requires minimal setup and configuration for GitHub or GitLab users.

We recommend using [external CI/CD providers](https://developers.cloudflare.com/workers/ci-cd/external-cicd) if:

* You have a self-hosted instance of GitHub or GitLabs, which is currently not supported in Workers Builds' [Git integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/)
* You are using a Git provider that is not GitHub or GitLab

## Workers Builds

[Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds) is Cloudflare's native CI/CD system that allows you to integrate with GitHub or GitLab to automatically deploy changes with each new push to a selected branch (e.g. `main`).

![Workers Builds Workflow Diagram](https://developers.cloudflare.com/_astro/workers-builds-workflow.Bmy3qIVc_Z1wM0ch.webp) 

Ready to streamline your Workers deployments? Get started with [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/#get-started).

## External CI/CD

You can also choose to set up your CI/CD pipeline with an external provider.

* [GitHub Actions](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/)
* [GitLab CI/CD](https://developers.cloudflare.com/workers/ci-cd/external-cicd/gitlab-cicd/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/#page","headline":"CI/CD · Cloudflare Workers docs","description":"Set up continuous integration and continuous deployment for your Workers.","url":"https://developers.cloudflare.com/workers/ci-cd/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/ci-cd/","name":"CI/CD"}}]}
```
