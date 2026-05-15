---
title: "Snapshots"
description: "Catch visual changes on every pull request with snapshots."
url: https://docs.sentry.io/product/snapshots/
---

# Snapshots

This feature is available only if you're in the [Early Adopter program](https://docs.sentry.io/organization/early-adopter-features.md). Features available to Early Adopters are still in-progress and may have bugs. We recognize the irony.

Snapshots helps you catch unintended visual changes before they reach users. Sentry handles image storage, diffing, CI checks, and more.

## [How It Works](https://docs.sentry.io/product/snapshots.md#how-it-works)

1. **Generate snapshots** — Your CI job produces screenshots however you like: Playwright, Paparazzi, or any tool that outputs images
2. **Upload to Sentry** — `sentry-cli` uploads the snapshot directory to Sentry
3. **Sentry diffs against the baseline** — Sentry [compares images](https://docs.sentry.io/product/snapshots/reviewing-snapshots.md#snapshot-comparisons) against corresponding base build. With Sentry, you do not have to manage "Golden" images and everything is determined via git metadata.
4. **Results post to your PR** — Snapshot results post to your PR\* via a GitHub status check. See [Integrating Into CI](https://docs.sentry.io/product/snapshots/integrating-into-ci.md) for setup. You can [configure settings](https://docs.sentry.io/product/snapshots/reviewing-snapshots.md#status-check-settings) to control status check and comment behavior.
5. **Review and approve** — View snapshot results on the Sentry UI. If the Snapshot "failed" you can approve it from either the PR or the Sentry UI.

\*Note: Snapshots EA only supports Github

## [Prerequisites](https://docs.sentry.io/product/snapshots.md#prerequisites)

* **Early Adopter access** — Enable the Early Adopter toggle in your [organization settings](https://docs.sentry.io/organization/early-adopter-features.md).
* **Auth token** — A Sentry auth token with `project:write` scope (personal token) or `org:ci` scope (org-level token).
* **sentry-cli >= 3.4.0** — The `build snapshots` command requires version 3.4.0 or later.
* **GitHub integration** — Snapshots can be used with any VCS provider, but only Github is supported for status check integration and PR comments. Install the [Sentry GitHub App](https://docs.sentry.io/organization/integrations/source-code-mgmt/github.md) and grant it access to your repository for PR integration.

## [Recommended Platform Workflows](https://docs.sentry.io/product/snapshots.md#recommended-platform-workflows)

Snapshots works for any platform with a frontend and most platforms have a number of tools to help you generate snapshots. Sentry has a recommended workflow for the following platforms:

* [iOS](https://docs.sentry.io/platforms/apple/guides/ios/snapshots.md)
* [Android](https://docs.sentry.io/platforms/android/snapshots.md)

- #### [Uploading Snapshots](https://docs.sentry.io/product/snapshots/uploading-snapshots.md)

  Structure your snapshot directory and upload from CI with sentry-cli.

- #### [Integrating Into CI](https://docs.sentry.io/product/snapshots/integrating-into-ci.md)

  Set up Snapshots in CI to receive automated visual diff status checks on every pull request.

- #### [Reviewing Snapshots](https://docs.sentry.io/product/snapshots/reviewing-snapshots.md)

  Review snapshot diffs on your pull request and approve changes.

## Pages in this section

- [Uploading Snapshots](https://docs.sentry.io/product/snapshots/uploading-snapshots.md)
- [Integrating Into CI](https://docs.sentry.io/product/snapshots/integrating-into-ci.md)
- [Reviewing Snapshots](https://docs.sentry.io/product/snapshots/reviewing-snapshots.md)
