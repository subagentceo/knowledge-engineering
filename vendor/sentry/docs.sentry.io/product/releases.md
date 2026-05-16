---
title: "Releases"
description: "Learn how to provide Sentry with important information about your releases, such as release health and release details,  to determine regressions and resolve issues faster."
url: https://docs.sentry.io/product/releases/
---

# Releases

If you're looking for the latest Sentry SDK release details, head on over to [Sentry's GitHub profile](https://github.com/getsentry), find your specific SDK repo, and browse the tags for releases.

A *release* is a version of your code deployed to an environment. When you notify Sentry about a [release](https://sandbox.sentry.io/?scenario=oneRelease\&projectSlug=react\&source=docs), you can easily identify new [issues](https://docs.sentry.io/product/issues.md) and regressions, determine whether an issue was resolved, and monitor the health of your newly deployed app. The **Releases** page provides a visualization of your releases. It presents adoption of releases from the past 24 hours and provides a high-level view of:

* Each release version (a short version of the release name without the hash)
* The associated project
* The adoption stage of each release
* The authors of each commit
* The percentage of crash-free users
* The percentage of crash-free sessions

Notifying Sentry of a release enables auto discovery of which commits to associate with a release and identifies what we consider "the most recent release" when searching in [sentry.io](https://sentry.io).

Each release links to one or more projects. If a release has multiple projects, Sentry will duplicate the release data in relation to each one. From this page, you can also click any release to go to [Release Details](https://docs.sentry.io/product/releases/release-details.md) for more information.

Releases offer significant additional features when [fully configured](https://docs.sentry.io/product/releases/setup.md):

* Determine the issues and regressions introduced in a new release
* Predict which commit caused an issue and who is likely responsible
* Resolve issues by including the issue number in a commit or pull request associated with a release
* [Receive email notifications when your code gets deployed](https://docs.sentry.io/product/notifications.md#deploy-notifications)

We recommend notifying Sentry about a new release before deploying it. But if you don't, Sentry will automatically create a release entity in the system the first time it sees an event with that release identifier.

You don't need a repository integration for any of these features, though we recommend [installing one as part of an automated release option](https://docs.sentry.io/product/releases/setup/release-automation.md) for efficiency.

## [Associate Commits in Releases](https://docs.sentry.io/product/releases.md#associate-commits-in-releases)

With releases, you can [associate commits](https://docs.sentry.io/product/releases/associate-commits.md), which keeps track of the commits that were used in a release.

You can resolve issues quickly using the **Release Details** page to view which commits were used to create a release as the list of authors of those commits.

## [Track Release Health](https://docs.sentry.io/product/releases.md#track-release-health)

*Release health* provides insight into the impact of crashes and bugs as it relates to your user's experience and reveals trends with each new issue. Monitor [release health](https://docs.sentry.io/product/releases/health.md) by observing user adoption, usage of the application, percentage of crashes, and session data. You can explore the health of a release more closely in the [Release Details](https://docs.sentry.io/product/releases/release-details.md) page.

You can view release health data either from the [Issue Details](https://sandbox.sentry.io/?scenario=oneIssue\&projectSlug=react\&source=docs) page by selecting the commit ID listed under Last Seen", or from the **Releases** page.

## [3 Different Ways to Resolve Issues](https://docs.sentry.io/product/releases.md#3-different-ways-to-resolve-issues)

If you'd like to mark an issue as [resolved](https://docs.sentry.io/product/issues/states-triage.md#resolve) in both a current and a future release, you can do so by resolving it in a release via the dropdown on the issue details page.

There are several options for resolving a release issue. If you'd like to leave the release issue unresolved and be notified of it the next time any event is seen in a release, click the main "Resolve" button. But if you'd like to ignore the release issue until it's seen again in your current or next release, you can select "Resolved In The next release" or "Resolved In The current release" from the dropdown.

### [Resolved in the Current Release](https://docs.sentry.io/product/releases.md#resolved-in-the-current-release)

The "Resolved in the current release" option records the current release that's displayed in the UI. New events for the release issue are compared against the recorded release version to determine if the issue should unresolve. If the release version is using semver, the issue will be marked as unresolved if the release is from a semver version that's greater than the resolved version. If the release is not using semver, the release creation dates will be compared.

### [Resolved in the Next Release](https://docs.sentry.io/product/releases.md#resolved-in-the-next-release)

The "Resolved in the next release" option works like resolving in the current release, but since the next release doesn’t exist yet, we record the latest version where the issue was seen. This updates automatically when a new release is created. For semantic versioning, the issue is resolved in the next newest of all current versions. When choosing the release that will resolve the issue, Sentry will skip any releases that you've archived.

### [Resolved in a Commit](https://docs.sentry.io/product/releases.md#resolved-in-a-commit)

The "Resolved in a commit" option allows you to wait for a release with the specified commit to be created. Once the release is created, new events get checked against the release version or release date. If the new events are from a newer release, the issue gets marked as a regression and appears in your [For Review tab](https://docs.sentry.io/product/issues/states-triage.md) to be triaged.

## [Learn More About Releases](https://docs.sentry.io/product/releases.md#learn-more-about-releases)

* #### [Set Up](https://docs.sentry.io/product/releases/setup.md)

  Learn about setting up your SDK to enable Releases and to monitor release health.

* #### [Associate Commits](https://docs.sentry.io/product/releases/associate-commits.md)

  Learn how to associate commits with a release.

* #### [Naming Releases](https://docs.sentry.io/product/releases/naming-releases.md)

  Learn about release naming conventions.

* #### [Usage](https://docs.sentry.io/product/releases/usage.md)

  Learn how to sort, filter, archive, and restore a release.

* #### [Release Details](https://docs.sentry.io/product/releases/release-details.md)

  Learn more about the details of individual releases.

* #### [Release Health](https://docs.sentry.io/product/releases/health.md)

  Monitor the health of releases by observing user adoption, usage of the application, percentage of crashes, and session data.

* #### [Using Releases Across Sentry](https://docs.sentry.io/product/releases/releases-throughout-sentry.md)

  Learn how to use releases throughout Sentry's product.

## Pages in this section

- [Set Up](https://docs.sentry.io/product/releases/setup.md)
- [Associate Commits](https://docs.sentry.io/product/releases/associate-commits.md)
- [Naming Releases](https://docs.sentry.io/product/releases/naming-releases.md)
- [Usage](https://docs.sentry.io/product/releases/usage.md)
- [Release Details](https://docs.sentry.io/product/releases/release-details.md)
- [Release Health](https://docs.sentry.io/product/releases/health.md)
- [Using Releases Across Sentry](https://docs.sentry.io/product/releases/releases-throughout-sentry.md)
