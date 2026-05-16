---
title: "Troubleshooting Integrations"
description: "Learn more about troubleshooting and repairing your integrations."
url: https://docs.sentry.io/integrations/troubleshooting/
---

# Troubleshooting Integrations

Sentry integrates with many third party services to make your development experience easier. Unfortunately, we can’t always automatically update some of these services when critical data within Sentry is changed. This document is meant to help you navigate any expected behaviour resulting from these settings being changed. In some cases, we may need your team to manually intervene to get the integration working smoothly again.

## [If you've changed your organization slug](https://docs.sentry.io/integrations/troubleshooting.md#if-youve-changed-your-organization-slug)

* Any integration that creates links directly to Sentry issues will continue creating correct links going forward, **but existing links will no longer work as expected**. This includes, for example, Slack notifications containing links to Sentry alerts, and Jira tickets that link to Sentry issues.

* Most [deployment integrations](https://docs.sentry.io/integrations.md#deployment) use [Sentry CLI](https://github.com/getsentry/sentry-cli) under the hood, which requires providing your organization slug by way of the `SENTRY_ORG` environment variable. For these integrations to continue working, **you must manually update this variable on the appropriate service**.

* If you're using any of the following integrations, you need to manually update the organization slug to maintain functionality:

  * [Bitbucket Pipelines](https://docs.sentry.io/product/releases/setup/release-automation/bitbucket-pipelines.md)
  * [GitHub Actions](https://docs.sentry.io/product/releases/setup/release-automation/github-actions.md)
  * [Netlify](https://docs.sentry.io/product/releases/setup/release-automation/netlify.md)
  * [Vercel](https://docs.sentry.io/integrations/deployment/vercel.md)
  * [Grafana](https://docs.sentry.io/integrations/data-forwarding/grafana.md)
  * [Split](https://docs.sentry.io/integrations/feature-flag/split.md)
  * [FullStory](https://docs.sentry.io/integrations/session-replay/fullstory.md)
  * [OpenReplay](https://docs.sentry.io/integrations/session-replay/openreplay.md)
  * [SourceGraph](https://docs.sentry.io/integrations/issue-tracking/sourcegraph.md)
