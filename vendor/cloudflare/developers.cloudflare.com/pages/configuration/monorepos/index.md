---
title: Monorepos
description: Deploy multiple Cloudflare Pages projects from a single monorepo repository.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Monorepos

While some apps are built from a single repository, Pages also supports apps with more complex setups. A monorepo is a repository that has multiple subdirectories each containing its own application.

## Set up

You can create multiple projects using the same repository, [in the same way that you would create any other Pages project](https://developers.cloudflare.com/pages/get-started/git-integration). You have the option to vary the build command and/or root directory of your project to tell Pages where you would like your build command to run. All project names must be unique even if connected to the same repository.

## Builds

When you connect a git repository to Pages, by default a change to any file in the repository will trigger a Pages build.

![Monorepo example diagram](https://developers.cloudflare.com/_astro/pages-path.D3Q_3sei_Z1d0ks6.webp) 

Take for example `my-monorepo` above with two associated Pages projects (`marketing-app` and `ecommerce-app`) and their listed dependencies. By default, if you change a file in the project directory for `marketing-app`, then a build for the `ecommerce-app` project will also be triggered, even though `ecommerce-app` and its dependencies have not changed. To avoid such duplicate builds, you can include and exclude both [build watch paths](https://developers.cloudflare.com/pages/configuration/build-watch-paths) or [branches](https://developers.cloudflare.com/pages/configuration/branch-build-controls) to specify if Pages should skip a build for a given project.

## Git integration

Once you've created a separate Pages project for each of the projects within your Git repository, each Git push will issue a new build and deployment for all connected projects unless specified in your build configuration.

GitHub will display separate comments for each project with the updated project and deployment URL if there is a Pull Request associated with the branch.

### GitHub check runs and GitLab commit statuses

If you have multiple projects associated with your repository, your [GitHub check run ↗](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks#checks) or [Gitlab commit status ↗](https://docs.gitlab.com/ee/user/project/merge%5Frequests/status%5Fchecks.html) will appear like the following on your repository:

![GitHub check run](https://developers.cloudflare.com/_astro/ghcheckrun.Cv3SMhfT_xxJai.webp)![GitLab commit status](https://developers.cloudflare.com/_astro/glcommitstatus.BXV17OMM_1I3UIK.webp) 

If a build skips for any reason (i.e. CI Skip, build watch paths, or branch deployment controls), the check run/commit status will not appear.

## Monorepo management tools:

While Pages does not provide specialized tooling for dependency management in monorepos, you may choose to bring additional tooling to help manage your repository. For simple subpackage management, you can utilize tools like [npm ↗](https://docs.npmjs.com/cli/v8/using-npm/workspaces), [pnpm ↗](https://pnpm.io/workspaces), and [Yarn ↗](https://yarnpkg.com/features/workspaces) workspaces. You can also use more powerful tools such as [Turborepo ↗](https://turbo.build/repo/docs), [NX ↗](https://nx.dev/getting-started/intro), or [Lerna ↗](https://lerna.js.org/docs/getting-started) to additionally manage dependencies and task execution.

## Limitations

* You must be using [Build System V2](https://developers.cloudflare.com/pages/configuration/build-image/#v2-build-system) or later in order for monorepo support to be enabled.
* You can configure a maximum of 5 Pages projects per repository. If you need this limit raised, contact your Cloudflare account team or use the [Limit Increase Request Form ↗](https://docs.google.com/forms/d/e/1FAIpQLSd%5FfwAVOboH9SlutMonzbhCxuuuOmiU1L%5FI5O2CFbXf%5FXXMRg/viewform).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/monorepos/#page","headline":"Monorepos · Cloudflare Pages docs","description":"Deploy multiple Cloudflare Pages projects from a single monorepo repository.","url":"https://developers.cloudflare.com/pages/configuration/monorepos/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/configuration/monorepos/","name":"Monorepos"}}]}
```
