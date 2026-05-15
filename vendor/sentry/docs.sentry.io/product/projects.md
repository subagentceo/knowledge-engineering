---
title: "Projects"
description: "View all the projects associated with teams that you're a member of, then dive into their details quickly."
url: https://docs.sentry.io/product/projects/
---

# Projects

A *Project* represents your service or application in Sentry. For example, you might have separate projects for your API server and frontend client.

When you first [create a project](https://docs.sentry.io/product/sentry-basics/integrate-frontend/create-new-project.md), you also assign a team to it. All members of the assigned team have access to the project. Additional teams can be added in your project's [Project Teams](https://sentry.io/orgredirect/organizations/:orgslug/settings/projects/:projectId/teams/) settings.

You can create more projects to reflect your application landscape with finer granularity (for example, a separate project for each repo, mapping components and micro-services to the teams that own them). For most pages in Sentry, including **Issues** and **Discover**, the top-level filter bar defaults to showing information for your projects, so that you only see what's relevant to you and your team(s). How you set up your projects can go a long way in reducing noise and improving productivity. Learn more about best practices for setting up projects in our [account setup documentation](https://docs.sentry.io/organization/getting-started.md#4-create-projects).

Projects differ from [environments](https://docs.sentry.io/product/sentry-basics/environments.md), which are designed to help triage issues, especially in a multi-staged release process.

## [Projects Page](https://docs.sentry.io/product/projects.md#projects-page)

The **Projects** page lists all the projects assigned to teams you're a member of. Projects are displayed in alphabetical order and with a high-level overview of the following:

* A snapshot of both errors and transactions in the last 24 hours
* The percentage of crash free sessions, if you have configured [release health](https://docs.sentry.io/product/releases/health.md)
* Deploys, if you have configured your SDK to [provide a release identifier](https://docs.sentry.io/platform-redirect.md?next=/configuration/releases/) and are tracking [deploys](https://docs.sentry.io/cli/releases.md#creating-deploys)

**Tip:** For faster access, star your favorite projects to move them to the top of the page.

## [View Project Details](https://docs.sentry.io/product/projects.md#view-project-details)

Click on a project from the **Projects** page to open the **Project Details** page.

The [**Project Details**](https://docs.sentry.io/product/projects/project-details.md) page provides an overview of errors, performance, and the health of your releases. Use this page to quickly correlate spikes in error rates with the issues causing them, react to critical alerts, and analyze long-term trends.

## Pages in this section

- [Project Details](https://docs.sentry.io/product/projects/project-details.md)
