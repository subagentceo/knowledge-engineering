---
title: "Size Analysis"
description: "Monitor mobile builds for size changes before they reach users."
url: https://docs.sentry.io/product/size-analysis/
---

# Size Analysis

Size Analysis monitors your mobile app size to prevent regressions before they reach users. Upload builds from CI to spot regressions early, understand what's inside each bundle, and keep release artifacts lean.

## [Why Track App Size?](https://docs.sentry.io/product/size-analysis.md#why-track-app-size)

* Faster downloads reduce install drop-off
* Install size is linked to uninstall rates, particularly for customers with limited storage or slower connections
* Size bloat can have downstream technical impact: longer build times, startup times, code complexity, etc.

## [Configuring Size Analysis Uploads](https://docs.sentry.io/product/size-analysis.md#configuring-size-analysis-uploads)

All Sentry accounts have an included 100 builds of Size Analysis per month. Below are mechanisms to control which builds are processed for Size Analysis.

### [Uploading Select Builds](https://docs.sentry.io/product/size-analysis.md#uploading-select-builds)

Control which builds get uploaded by configuring your CI workflow triggers. For example, upload when commits land on main or release branches:

```yml
on:
  push:
    branches:
      - main
      - release/*

jobs:
  build_and_upload:
    # ...
```

See [Integrating Into CI](https://docs.sentry.io/product/size-analysis/integrating-into-ci.md) for end-to-end setup, and our sample GitHub actions for [Android](https://github.com/EmergeTools/hackernews/blob/main/.github/workflows/android_emerge_upload.yml) and [iOS](https://github.com/EmergeTools/hackernews/blob/main/.github/workflows/ios_emerge_upload_pr.yml). Platform-specific upload steps are covered in the [Upload Guides](https://docs.sentry.io/product/size-analysis.md#upload-guides) below.

## [Features](https://docs.sentry.io/product/size-analysis.md#features)

### [Build Details](https://docs.sentry.io/product/size-analysis.md#build-details)

Size Analysis breaks down your mobile app so you can see exactly where size is coming from. It surfaces Insights that recommend concrete fixes, such as compressing images or stripping debug info.

Size Analysis also provides actionable insights on how you can reduce your app's size. Insights are tailored to each platform. Dive deeper in:

* [Android](https://docs.sentry.io/platforms/android/size-analysis/insights.md)
* [iOS](https://docs.sentry.io/platforms/apple/guides/ios/size-analysis/insights.md)
* [React Native](https://docs.sentry.io/platforms/react-native/size-analysis/insights.md)
* [Flutter](https://docs.sentry.io/platforms/dart/guides/flutter/size-analysis/insights.md)

### [Build Comparison](https://docs.sentry.io/product/size-analysis.md#build-comparison)

Compare any two builds to see what changed, review module-level diffs, and confirm that optimizations worked. Build comparisons are automatically generated when [uploading as part of CI](https://docs.sentry.io/product/size-analysis/integrating-into-ci.md), but can also be manually triggered for any two builds.

#### [Insight Diff](https://docs.sentry.io/product/size-analysis.md#insight-diff)

The Insight diff shows the changes in insights between the two builds. This diff will show if a new insight is present in the build or if an insight as been addressed.

#### [Table Diff](https://docs.sentry.io/product/size-analysis.md#table-diff)

The table diff shows every file change between the two builds. This diff will show if the file was added, removed, or changed. By default, the table hides changes under 500 B, but you can toggle this directly in the table.

#### [X-Ray Diff](https://docs.sentry.io/product/size-analysis.md#x-ray-diff)

The X-Ray diff shows a visual representation of the file changes between the two builds. This diff will show if the file was added, removed, or changed.

### [Status Checks](https://docs.sentry.io/product/size-analysis.md#status-checks)

Integrate into CI Size Analysis results on pull requests. You can track size on every commit to ensure there are no unnecessary size increases. You can configure rules to automatically fail checks when thresholds are exceeded.

Learn how to set it up in the [CI integration guide](https://docs.sentry.io/product/size-analysis/integrating-into-ci.md).

### [Monitoring and Alerting](https://docs.sentry.io/product/size-analysis.md#monitoring-and-alerting)

To get a Slack alert (or other notifications) when a build crosses a size threshold, use [Mobile Builds Monitors](https://docs.sentry.io/product/monitors-and-alerts/monitors.md#mobile-builds-monitor-settings). Monitors complement [Status Checks](https://docs.sentry.io/product/size-analysis.md#status-checks) by alerting on cadenced uploads, not just PRs.

Common workflows:

* **Nightly builds** — alert when last night's build grew more than 2% vs. the prior night
* **Weekly release branch** — alert when the release candidate exceeds an absolute size limit (e.g. 200 MB Download Size)

## [Finding Uploaded Builds](https://docs.sentry.io/product/size-analysis.md#finding-uploaded-builds)

You can find uploaded builds through the Releases page. Builds will show up in two places:

1. When a Mobile Project is selected on the Releases page, you will see a "Mobile Builds" tab. This tab will list all the builds for the project.

2. Mobile Builds will show up in a single Release's details page. Here you will see every build for the Release's version.

## [Upload Guides](https://docs.sentry.io/product/size-analysis.md#upload-guides)

You can follow the platform guides to learn how to upload builds for Size Analysis:

* [Android](https://docs.sentry.io/platforms/android/size-analysis.md)
* [iOS](https://docs.sentry.io/platforms/apple/guides/ios/size-analysis.md)
* [React Native](https://docs.sentry.io/platforms/react-native/size-analysis.md)
* [Flutter](https://docs.sentry.io/platforms/dart/guides/flutter/size-analysis.md)

### [Upload Metadata](https://docs.sentry.io/product/size-analysis.md#upload-metadata)

Below is the metadata included in your build, regardless of the platform.

We use build metadata to organize builds in the UI and ensure correct comparisons.

| Field                   | Description                                                                                                                                                                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `org`\*                 | Sentry organization slug                                                                                                                                                                                                                                 |
| `project`\*             | Sentry project slug                                                                                                                                                                                                                                      |
| `build-configuration`\* | Build configuration describing how the app was built, for example `Release` or `Debug` or `Release-Bazel`                                                                                                                                                |
| `head-sha`              | Current commit SHA                                                                                                                                                                                                                                       |
| `base-sha`              | Base commit SHA (for comparisons, recommended to use the branch's merge-base)                                                                                                                                                                            |
| `vcs-provider`          | VCS provider name (for example `github`, `gitlab`, `bitbucket`, `azure`, `github_enterprise`). If not provided, the provider will be auto-detected from the git remote URL. Note: Only `github` and `github_enterprise` are supported for status checks. |
| `head-repo-name`        | Repository name (`org/repo`)                                                                                                                                                                                                                             |
| `pr-number`             | Pull request number                                                                                                                                                                                                                                      |
| `head-ref`              | Branch or tag name                                                                                                                                                                                                                                       |
| `base-ref`              | Base branch name                                                                                                                                                                                                                                         |
| `install-group`         | [Install group(s)](https://docs.sentry.io/product/build-distribution.md#install-groups) to control update visibility between builds. Can be specified multiple times                                                                                     |

\* *required field*

### [Configuring Processing Filters in Sentry Settings](https://docs.sentry.io/product/size-analysis.md#configuring-processing-filters-in-sentry-settings)

You can further tune your builds for Size Analysis in Sentry Settings. Go to your project's [Mobile Builds](https://sentry.io/orgredirect/organizations/:orgslug/settings/projects/:projectId/mobile-builds/) settings.

By default, Size Analysis processes all uploaded builds. You can configure filters to only process builds for specific criteria, e.g. `git_head_ref: main`, `build_configuration_name: Release`, etc. Below is an example filter for a specific bundle (`com.emergetools.hackernews`) and branch (`main`).

## [Using Webhooks](https://docs.sentry.io/product/size-analysis.md#using-webhooks)

You can use webhooks to be notified when a new build is uploaded for Size Analysis. To enable, you can follow these [docs](https://docs.sentry.io/integrations/integration-platform/webhooks/preprod-artifacts.md).

* #### [Integrating Into CI](https://docs.sentry.io/product/size-analysis/integrating-into-ci.md)

  Set up the integration in CI to receive automated size change notifications

## Pages in this section

- [Integrating Into CI](https://docs.sentry.io/product/size-analysis/integrating-into-ci.md)
