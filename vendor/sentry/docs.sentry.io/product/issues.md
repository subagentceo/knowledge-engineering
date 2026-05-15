---
title: "Issues"
description: "Learn how to use Sentry’s Issues page, where you can see and start to debug errors and performance problems that are affecting your application."
url: https://docs.sentry.io/product/issues/
---

# Issues

The [**Issues**](https://sentry.io/orgredirect/organizations/:orgslug/issues/) page in Sentry displays information about problems in your application. This page allows you to filter by properties such as browser, device, impacted users, or whether an error is unhandled. You can then inspect issue details to better understand the problem and [triage](https://docs.sentry.io/product/issues/states-triage.md) effectively.

A typical application sends a large number of events to Sentry. You can think of an [issue](https://sandbox.sentry.io/?scenario=oneIssue\&projectSlug=react\&source=docs) as a single bug or problem with your app. To make them manageable, we [group similar events into issues](https://docs.sentry.io/concepts/data-management/event-grouping.md) based on a fingerprint. This grouping of events into issues allows you to see how frequently a problem is happening and how many users it's affecting.

[](https://docs.sentry.io/product/issues.md)

**Issues and Event Quotas**

Your quota is consumed by *events*, not *issues*. Issues are generated from your accepted error or transaction events. Generating issues does not cause Sentry to accept more events for you and **does not** directly impact your quota. Sentry does provide tools, however, to control the type and amount of error and transaction events that are accepted. Learn more in [Quota Management](https://docs.sentry.io/pricing/quotas.md).

For each issue, the page displays:

* Issue type and description
* Associated project
* Issue timing, such as last and first time seen

For error issues, to see the stack trace of the latest event, you can hover over the issue title. You can also hover over the colored square to the left of the issue information to see the error level (error, info, fatal, warning, debug, or sample) of the latest event:

You can save your issue queries and access them later by clicking the "Saved Searches" button in the header. Learn more in [Saved Searches](https://docs.sentry.io/concepts/search/saved-searches.md). You can also add issues data to your [custom dashboards](https://docs.sentry.io/product/dashboards/custom-dashboards.md) as widgets using the [dataset selector](https://docs.sentry.io/product/dashboards/widget-builder.md#choose-your-dataset).

When you click on an issue on the main **Issues** page, the **Issue Details** page for that issue is displayed. Learn more in [Issue Details](https://docs.sentry.io/product/issues/issue-details.md).

## [Issue Categories](https://docs.sentry.io/product/issues.md#issue-categories)

There are two categories of issues: [*error issues*](https://docs.sentry.io/product/issues/issue-details/error-issues.md) and [*performance issues*](https://docs.sentry.io/product/issues/issue-details/performance-issues.md). An error issue is a grouping of error events; a performance issue is a grouping of poorly-performing transactions. To learn more about each issue category and what kind of information is captured in their detailed view, check out our full [Error Issues](https://docs.sentry.io/product/issues/issue-details/error-issues.md) and [Performance Issues](https://docs.sentry.io/product/issues/issue-details/performance-issues.md) documentation.

## [Issue Triage](https://docs.sentry.io/product/issues.md#issue-triage)

From the **Issues** page, you can begin to triage. The page is organized into tabs, each corresponding to a filtered list of issues, and these different lists help you with triaging:

* All Unresolved (`is:unresolved`): All unresolved issues, including issues that need review.
* For Review (`is:unresolved is:for_review`). Also called **Review List**, for-review issues are a subset of all unresolved issues and can include new issues or regressions that haven't been reviewed yet.
* Regressed (`is:regressed`): All regressed issues; resolved issues that have come up again.
* Archived (`is:archived`): All archived issues.
* Escalating (`is:escalating`): All escalating issues; previously archived issues that have exceeded their forecasted event volume.

Learn more about triaging issues and their different states in [Issue States and Triage](https://docs.sentry.io/product/issues/states-triage.md).

## [How to Sort Issues](https://docs.sentry.io/product/issues.md#how-to-sort-issues)

Change how issues are sorted in the issues stream by selecting from the sort dropdown:

* **Last Seen**: The most recent events are shown first.

* **First Seen**: The newest issues are shown first.

* **Trends**: New issues and escalating issues (with event volumes trending upward) are shown first. Older issues and issues with fewer recent events are sorted lower. The ranking currently relies on three primary factors:

  * Relative volume: Escalating issues that have a higher recent volume (relative to their baseline) are ranked higher.
  * Absolute volume: Issues with more event volume are weighted more highly. Recent events are weighted more than old events.
  * Issue age: New issues are prioritized — an exponential decay factor halves the weight every 12 hours.

* **Events**: Issues are sorted by total event volume.

* **Users**: Issues are sorted by number of users affected.

## [Learn More](https://docs.sentry.io/product/issues.md#learn-more)

* #### [Issue Views](https://docs.sentry.io/product/issues/issue-views.md)

  Learn how to create, customize, and share your Issues experience in Sentry.

* #### [Issue Details](https://docs.sentry.io/product/issues/issue-details.md)

  Learn how to navigate the Issue Details page to help you efficiently triage an issue.

* #### [Issue Monitors and Alerts](https://docs.sentry.io/product/issues/monitors-and-alerts.md)

  Use Monitors to detect problems and create issues, and use Alerts to be notified when those issues change state or match your filters.

* #### [Issue Status](https://docs.sentry.io/product/issues/states-triage.md)

  Learn how issue status works and and how to triage issues.

* #### [Issue Priority](https://docs.sentry.io/product/issues/issue-priority.md)

  Learn how Sentry prioritizes issue actionability.

* #### [Suspect Commits](https://docs.sentry.io/product/issues/suspect-commits.md)

  With suspect commits, you can see the most recent commit to your code in the stack trace. Learn more about how integrations enable suspect commits here.

* #### [Ownership Rules](https://docs.sentry.io/product/issues/ownership-rules.md)

  Learn how to set up ownership rules to automatically assign issues to the right owners.

* #### [Reprocessing](https://docs.sentry.io/product/issues/reprocessing.md)

  Learn about reprocessing errors with new debug files.

* #### [Grouping Issues](https://docs.sentry.io/product/issues/grouping-and-fingerprints.md)

  Learn more about how Sentry groups issues together as well as different ways to change how events are grouped.

## Pages in this section

- [Issue Views](https://docs.sentry.io/product/issues/issue-views.md)
- [Issue Details](https://docs.sentry.io/product/issues/issue-details.md)
- [Issue Monitors and Alerts](https://docs.sentry.io/product/issues/monitors-and-alerts.md)
- [Issue Status](https://docs.sentry.io/product/issues/states-triage.md)
- [Issue Priority](https://docs.sentry.io/product/issues/issue-priority.md)
- [Suspect Commits](https://docs.sentry.io/product/issues/suspect-commits.md)
- [Ownership Rules](https://docs.sentry.io/product/issues/ownership-rules.md)
- [Reprocessing](https://docs.sentry.io/product/issues/reprocessing.md)
- [Grouping Issues](https://docs.sentry.io/product/issues/grouping-and-fingerprints.md)
