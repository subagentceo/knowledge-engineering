---
title: "Build Distribution"
description: "Distribute app builds to internal teams and beta testers."
url: https://docs.sentry.io/product/build-distribution/
---

# Build Distribution

This feature is available only if you're in the [Early Adopter program](https://docs.sentry.io/organization/early-adopter-features.md). Features available to Early Adopters are still in-progress and may have bugs. We recognize the irony.

Build Distribution enables you to securely distribute app builds to your internal teams and beta testers. Upload builds from CI to streamline your distribution workflow, manage access control, and track installation analytics.

### [CI Integration](https://docs.sentry.io/product/build-distribution.md#ci-integration)

Integrate Build Distribution into your CI pipeline to automatically distribute builds to your teams.

## [Upload Guides](https://docs.sentry.io/product/build-distribution.md#upload-guides)

You can follow the platform guides to learn how to upload builds for distribution:

* [iOS](https://docs.sentry.io/platforms/apple/guides/ios/build-distribution.md)
* [Android](https://docs.sentry.io/platforms/android/build-distribution.md)

### [Upload Metadata](https://docs.sentry.io/product/build-distribution.md#upload-metadata)

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

### [Configuring Processing Filters in Sentry Settings](https://docs.sentry.io/product/build-distribution.md#configuring-processing-filters-in-sentry-settings)

You can control which uploaded builds are processed for Build Distribution in Sentry Settings. Go to your project's [Mobile Builds](https://sentry.io/orgredirect/organizations/:orgslug/settings/projects/:projectId/mobile-builds/) settings.

By default, Build Distribution processes all uploaded builds. You can configure filters to only distribute builds matching specific criteria, such as `git_head_ref: main`, `build_configuration_name: Release`, or `app_id: com.example.app`.

## [Install Groups](https://docs.sentry.io/product/build-distribution.md#install-groups)

Install groups let you tag builds with one or more group names to control update visibility. When the Auto-Update SDK checks for updates, the API returns the single latest build (by semver version, then build number) that shares at least one install group with the request.

This is useful when you have multiple distribution channels (for example, separate branches, teams, or rollout stages) and want to prevent builds from one channel from being offered as updates to another.

### [How It Works](https://docs.sentry.io/product/build-distribution.md#how-it-works)

Install groups are configured in two places, which can be set independently:

1. **At upload time**: Tag each build with one or more group names (for example, `"alpha"`, `"staging"`).
2. **At runtime (optional)**: The Auto-Update SDK can explicitly send install groups when checking for updates to override the default filtering.

When the SDK checks for updates, the API returns the single latest build (highest semver version, with build number as tiebreaker) whose install groups overlap with the filter. Install groups for the filter are determined as follows:

* If the SDK **provides groups explicitly**, the API uses those.
* If the SDK **doesn't provide groups**, the API looks up the uploaded build matching the device's current version and uses that build's upload groups. On iOS, the lookup uses the UUID of the app binary. The UUID only changes when the main binary changes, so uploads that differ only in other files (such as images) won't be differentiated. On Android, it uses `buildVersion` and `buildNumber` — if multiple builds share the same values, the API picks the most recently uploaded one, which may lead to unexpected results.

We recommend configuring the SDK to send install groups explicitly rather than relying on API-side inheritance. On Android, the [Gradle plugin](https://docs.sentry.io/platforms/android/build-distribution/install-groups.md#gradle-plugin) `installGroups` config handles this automatically — it tags the upload **and** embeds the groups in the app so the SDK sends them with every update check.

Matching uses OR logic: a build matches if it shares **at least one** group with the filter. For example, filtering with `["alpha", "staging"]` will match a build tagged `["alpha", "beta"]` because both share `alpha`. Builds with no install groups will not match any filtered request.

### [Use Cases](https://docs.sentry.io/product/build-distribution.md#use-cases)

* **Branch-based testing**: Tag CI builds with the branch name so developers only receive updates from their own branch.
* **Staged rollouts**: Use groups like `"alpha"`, `"beta"`, and `"internal"` to control which teams receive which builds.
* **Team separation**: Give each team its own install group so they only see builds relevant to them.

For platform-specific setup instructions, see:

* [Android Install Groups](https://docs.sentry.io/platforms/android/build-distribution/install-groups.md)
* [iOS Install Groups](https://docs.sentry.io/platforms/apple/guides/ios/build-distribution/install-groups.md)

## [Downloading Builds](https://docs.sentry.io/product/build-distribution.md#downloading-builds)

Once builds are uploaded to Sentry, your team members and beta testers can download them through the Sentry web interface.

1. Open the URL printed to the console after uploading the build
2. Click the **Install** button on the right side of the page

3) Either scan the QR code from a mobile device or click the **Download** button to download the build directly

## [Using Webhooks](https://docs.sentry.io/product/build-distribution.md#using-webhooks)

You can use webhooks to be notified when a new installable build is available. To enable, you can follow these [docs](https://docs.sentry.io/integrations/integration-platform/webhooks/preprod-artifacts.md).
