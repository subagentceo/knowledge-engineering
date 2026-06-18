---
title: GitHub integration
description: Learn how to manage your GitHub integration for Workers Builds
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# GitHub integration

Cloudflare supports connecting your GitHub repository to your Cloudflare Worker, and will automatically deploy your code every time you push a change.

## Features

Beyond automatic builds and deployments, the Cloudflare GitHub integration lets you monitor builds directly in GitHub, keeping you informed without leaving your workflow.

### Pull request comment

If a commit is on a pull request, Cloudflare will automatically post a comment on the pull request with the status of the build.

![GitHub pull request comment](https://developers.cloudflare.com/_astro/github-pull-request-comment.DIkAC8Yh_yF45V.webp) 

A [preview URL](https://developers.cloudflare.com/workers/configuration/previews/) will be provided for any builds which perform `wrangler versions upload`. This is particularly useful when reviewing your pull request, as it allows you to compare the code changes alongside an updated version of your Worker.

Comment history reveals any builds completed earlier while the PR was open.

![GitHub pull request comment history](https://developers.cloudflare.com/_astro/github-pull-request-comment-history.pAxP7K1u_Z2jBa6y.webp) 

### Check run

If you have one or multiple Workers connected to a repository (i.e. a [monorepo](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#monorepos)), you can check on the status of each build within GitHub via [GitHub check runs ↗](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks#checks).

You can see the checks by selecting on the status icon next to a commit within your GitHub repository. In the example below, you can select the green check mark to see the results of the check run.

![GitHub status](https://developers.cloudflare.com/_astro/gh-status-check-runs.DkY_pO9C_1Obpz1.webp) 

Check runs will appear like the following in your repository. You can select **Details** to view the build (Build ID) and project (Script) associated with each check.

![GitHub check runs](https://developers.cloudflare.com/_astro/workers-builds-gh-check-runs.CuqL6Htu_Z1vG6k.webp) 

Note that when using [build watch paths](https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/), only projects that trigger a build will generate a check run.

## Manage access

You can deploy projects to Cloudflare Workers from your company or side project on GitHub using the [Cloudflare Workers & Pages GitHub App ↗](https://github.com/apps/cloudflare-workers-and-pages).

### Organizational access

When authorizing Cloudflare Workers to access a GitHub account, you can specify access to your individual account or an organization that you belong to on GitHub.

To add Cloudflare Workers installation to an organization, your user account must be an owner or have the appropriate role within the organization (i.e. the GitHub Apps Manager role). More information on these roles can be seen on [GitHub's documentation ↗](https://docs.github.com/en/organizations/managing-peoples-access-to-your-organization-with-roles/roles-in-an-organization#github-app-managers).

GitHub security consideration

A GitHub account should only point to one Cloudflare account. If you are setting up Cloudflare with GitHub for your organization, Cloudflare recommends that you limit the scope of the application to only the repositories you intend to build with Pages. To modify these permissions, go to the [Applications page ↗](https://github.com/settings/installations) on GitHub and select **Switch settings context** to access your GitHub organization settings. Then, select **Cloudflare Workers & Pages** \> For **Repository access**, select **Only select repositories** \> select your repositories.

### Remove access

You can remove Cloudflare Workers' access to your GitHub repository or account by going to the [Applications page ↗](https://github.com/settings/installations) on GitHub (if you are in an organization, select Switch settings context to access your GitHub organization settings). The GitHub App is named Cloudflare Workers and Pages, and it is shared between Workers and Pages projects.

#### Remove Cloudflare access to a GitHub repository

To remove access to an individual GitHub repository, you can navigate to **Repository access**. Select the **Only select repositories** option, and configure which repositories you would like Cloudflare to have access to.

![GitHub Repository Access](https://developers.cloudflare.com/_astro/github-repository-access.DGHekBft_ZyV5F2.webp) 

#### Remove Cloudflare access to the entire GitHub account

To remove Cloudflare Workers and Pages access to your entire Git account, you can navigate to **Uninstall "Cloudflare Workers and Pages"**, then select **Uninstall**. Removing access to the Cloudflare Workers and Pages app will revoke Cloudflare's access to _all repositories_ from that GitHub account. If you want to only disable automatic builds and deployments, follow the [Disable Build](https://developers.cloudflare.com/workers/ci-cd/builds/#disconnecting-builds) instructions.

Note that removing access to GitHub will disable new builds for Workers and Pages projects that were connected to those repositories, though your previous deployments will continue to be hosted by Cloudflare Workers.

### Reinstall the Cloudflare GitHub App

When encountering Git integration related issues, one potential troubleshooting step is attempting to uninstall and reinstall the GitHub or GitLab application associated with the Cloudflare Pages installation. The process for each Git provider is provided below.

1. Go to the installation settings page on GitHub:  
   * Navigate to **Settings > Builds** for the Workers or Pages project and select **Manage** under Git Repository.  
   * Alternatively, visit these links to find the Cloudflare Workers and Pages installation and select **Configure**:

| **Individual**   | https://github.com/settings/installations                                          |
| ---------------- | ---------------------------------------------------------------------------------- |
| **Organization** | https://github.com/organizations/<YOUR\_ORGANIZATION\_NAME>/settings/installations |

1. In the Cloudflare Workers and Pages GitHub App settings page, navigate to **Uninstall "Cloudflare Workers and Pages"** and select **Uninstall**.
2. Go back to the [**Workers & Pages** overview ↗](https://dash.cloudflare.com) page. Select **Create application** \> **Pages** \> **Connect to Git**.
3. Select the **\+ Add account** button, select the GitHub account you want to add, and then select **Install & Authorize**.
4. You should be redirected to the create project page with your GitHub account or organization in the account list.
5. Attempt to make a new deployment with your project which was previously broken.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/#page","headline":"GitHub integration · Cloudflare Workers docs","description":"Learn how to manage your GitHub integration for Workers Builds","url":"https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/ci-cd/","name":"CI/CD"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/ci-cd/builds/","name":"Builds"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/ci-cd/builds/git-integration/","name":"Git integration"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/ci-cd/builds/git-integration/github-integration/","name":"GitHub integration"}}]}
```
