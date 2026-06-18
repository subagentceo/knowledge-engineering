---
title: GitLab integration
description: Learn how to manage your GitLab integration for Workers Builds
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# GitLab integration

Cloudflare supports connecting your GitLab repository to your Cloudflare Worker, and will automatically deploy your code every time you push a change.

## Features

Beyond automatic builds and deployments, the Cloudflare GitLab integration lets you monitor builds directly in GitLab, keeping you informed without leaving your workflow.

### Merge request comment

If a commit is on a merge request, Cloudflare will automatically post a comment on the merge request with the status of the build.

![GitLab merge request comment](https://developers.cloudflare.com/_astro/gitlab-pull-request-comment.CQVsQ21r_jud8J.webp) 

A [preview URL](https://developers.cloudflare.com/workers/configuration/previews/) will be provided for any builds which perform `wrangler versions upload`. This is particularly useful when reviewing your pull request, as it allows you to compare the code changes alongside an updated version of your Worker.

Enabling GitLab Merge Request events for existing connections

New GitLab connections are automatically configured to receive merge request events, which enable commenting functionality. For existing connections, you'll need to manually enable `Merge request events` in the Webhooks tab of your project's settings. You can follow GitLab's documentation for guidance on [managing webhooks ↗](https://docs.gitlab.com/user/project/integrations/webhooks/#manage-webhooks).

### Commit Status

If you have one or multiple Workers connected to a repository (i.e. a [monorepo](https://developers.cloudflare.com/workers/ci-cd/builds/advanced-setups/#monorepos)), you can check on the status of each build within GitLab via [GitLab commit status ↗](https://docs.gitlab.com/ee/user/project/merge%5Frequests/status%5Fchecks.html).

You can see the statuses by selecting the status icon next to a commit or by going to **Build** \> **Pipelines** within your GitLab repository. In the example below, you can select on the green check mark to see the results of the check run.

![GitLab Status](https://developers.cloudflare.com/_astro/gl-status-checks.B9jgSbf7_Z1XRFYR.webp) 

Check runs will appear like the following in your repository. You can select one of the statuses to view the build on the Cloudflare Dashboard.

![GitLab Commit Status](https://developers.cloudflare.com/_astro/gl-commit-status.BghMWpYX_Za7rrg.webp) 

Note that when using [build watch paths](https://developers.cloudflare.com/workers/ci-cd/builds/build-watch-paths/), only projects that trigger a build will generate a commit status.

## Manage access

You can deploy projects to Cloudflare Workers from your company or side project on GitLab using the Cloudflare Pages app.

### Organizational access

When you authorize Cloudflare Workers to access your GitLab account, you automatically give Cloudflare Workers access to organizations, groups, and namespaces accessed by your GitLab account. Managing access to these organizations and groups is handled by GitLab.

### Remove access

You can remove Cloudflare Workers' access to your GitLab account by navigating to [Authorized Applications page ↗](https://gitlab.com/-/profile/applications) on GitLab. Find the applications called Cloudflare Pages and select the **Revoke** button to revoke access.

Note that the GitLab application Cloudflare Workers is shared between Workers and Pages projects, and removing access to GitLab will disable new builds for Workers and Pages, though your previous deployments will continue to be hosted by Cloudflare Workers.

### Reinstall the Cloudflare GitLab App

1. Go to your application settings page on GitLab: [https://gitlab.com/-/profile/applications ↗](https://gitlab.com/-/profile/applications)
2. Click the "Revoke" button on your Cloudflare Workers installation if it exists.
3. Go back to the [**Workers & Pages** overview ↗](https://dash.cloudflare.com) page. Select **Create application** \> **Pages** \> **Connect to Git**.
4. Select the **\+ Add account** button, select the GitLab account you want to add, and then select **Install & Authorize**.
5. You should be redirected to the create project page with your GitLab account or organization in the account list.
6. Attempt to make a new deployment with your project which was previously broken.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/gitlab-integration/#page","headline":"GitLab integration · Cloudflare Workers docs","description":"Learn how to manage your GitLab integration for Workers Builds","url":"https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/gitlab-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/ci-cd/","name":"CI/CD"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/ci-cd/builds/","name":"Builds"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/ci-cd/builds/git-integration/","name":"Git integration"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/ci-cd/builds/git-integration/gitlab-integration/","name":"GitLab integration"}}]}
```
