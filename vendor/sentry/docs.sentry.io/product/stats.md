---
title: "Stats"
description: "The Sentry Stats page displays important metrics such as Usage, and Issues that help teams track project health. Learn how to get started here."
url: https://docs.sentry.io/product/stats/
---

# Stats

The [**Stats**](https://sentry.io/orgredirect/organizations/:orgslug/stats/) page is an overview of the usage data that Sentry receives across your entire organization. It allows you to spot projects that have experienced recent spikes in activity or are showing more errors than others and may require a closer look. You can also adjust the displayed date range, enabling you to narrow down to a specific time period or zoom out for a broader view.

With the dropdowns at the top of the page, you can set whether the page displays stats for errors, transactions, or attachments, as well as the date range. With the date selector, the time period can be set from an hour to a maximum of 90 days, and all of the page elements change dynamically when you update this setting.

This page does not include data about sessions because they are not a billable event type.

There are three tabs available on the page: [Usage](https://docs.sentry.io/product/stats.md#usage-stats), [Issues](https://docs.sentry.io/product/stats.md#issue-stats), and [Health](https://docs.sentry.io/product/stats.md#health-stats).

The "Usage" tab shows your organization’s event and attachments usage, while also providing a high-level overview of how different projects are using Sentry. The "Issues" tab shows a breakdown of the issues assigned to your team and how they triaged them, while the "Health" tab provides an overview of your team’s project health.

## [Usage Stats](https://docs.sentry.io/product/stats.md#usage-stats)

The "Usage" tab provides an overview of the events (errors and transactions) and attachments that Sentry has received across your entire organization. It includes a detailed breakdown of each project's consumption categorized as *Accepted*, *Filtered*, *Rate Limited*, *Invalid* or *Client Discard*.

### [Accepted](https://docs.sentry.io/product/stats.md#accepted)

Events and attachments that were successfully processed and stored.

### [Filtered](https://docs.sentry.io/product/stats.md#filtered)

Filtered events and attachments intentionally excluded based on defined settings. Common reasons include:

* **Browser Extensions**: Filtered by browser extension.
* **Chunk Load Errors**: Filtered when code chunks can’t be found on the server.
* **Discarded Hash**: Filtered based on fingerprints of previously deleted and discarded issues.
* **Error Message**: Filtered based on specific error messages.
* **Filtered Transaction**: Filtered because it was a call to a filtered transaction.
* **Invalid CSP**: Filtered due to an invalid Content Security Policy (CSP) policy.
* **Ip Address**: Filtered by IP address.
* **Legacy Browsers**: Filtered by certain legacy versions of browsers that are known to cause problems.
* **Localhost**: Filtered due to localhost restriction.
* **Release Version**: Filtered by release name (version).
* **React Hydration Errors**: Filtered due to a mismatch between the server-rendered and initial client User Interface.
* **Web Crawlers**: Identified as a known web crawler.

For more details, please consult the [Inbound Filters](https://docs.sentry.io/concepts/data-management/filtering.md) documentation.

### [Rate Limited](https://docs.sentry.io/product/stats.md#rate-limited)

Events and attachments discarded due to rate limits or quota. The following reasons are currently defined:

* **Disabled**: Data was received for a feature or function that is not available to your organization.
* **DSN Limit**: Traffic exceeded a rate limit defined on the client key (DSN). See [Rate Limits](https://docs.sentry.io/pricing/quotas.md#rate-limits) for more information.
* **Global Limit**: Traffic exceeded an organization-wider or project-wide rate limit. This setting is no longer available to most organizations.
* **Quota**: The monthly quota of your subscription was depleted and there is no pay-as-you-go budget left. See [Adjusting your Quota](https://docs.sentry.io/pricing/quotas.md#adjusting-your-quota) for more information.
* **Spike Protection**: Activated to protect from a sudden spike in event volume. See [Spike Protection](https://docs.sentry.io/pricing/quotas/spike-protection.md) for more information.
* **Internal Limit**: A rate limit for excessive volume was enforced by Sentry. These limits are not configurable.

### [Invalid](https://docs.sentry.io/product/stats.md#invalid)

Events and attachments might be discarded if they don't match the expected format or contain data that can't be processed. The following reasons are currently defined:

* **Disallowed Domain**: A request from an unallowed origin was sent to Sentry. Check project settings to configure allowed domains.
* **Duplicate**: An event with the same id has already been processed for this project. Sentry does not allow duplicate events and only stores the first one.
* **Empty**: An empty request or a request missing its primary data component was submitted.
* **Invalid Data**: Data sent by the SDK was invalid and does not meet the basic schema. This likely indicates an SDK implementation bug. Please report a bug if this issue persists.
* **Invalid Request**: The HTTP submission was invalid or was missing required information. This is likely due to a problem in the SDK implementation. Please report a bug if this issue persists.
* **Minidump**: The minidump in a minidump upload request was missing or invalid. See the [Minidumps documentation](https://docs.sentry.io/platforms/native/guides/minidumps.md) for details on how to upload minidumps.
* **Payload**: The HTTP submission was incomplete and could not be processed. This is likely due to a network failure.
* **Project Missing**: The specified Sentry project is disabled or project information in the submitted request was inconclusive.
* **Sampling**: Tracing data that is discarded during sampling.
* **Security Report**: An invalid or unsupported security report was submitted. If this report originates from an up-to-date browser, please report a bug to Sentry. See [Security Policy Reporting](https://docs.sentry.io/security-legal-pii/security/security-policy-reporting.md) for more information.
* **Too Large**: The HTTP submission or its contained data exceeds size limits. If available, what exactly exceeded might be provided as "Too Large \<what>", where \<what> specifies the specific size limit that was exceeded (e.g., "Too Large Event") else "Too Large Other". For the exact size limits, refer to [this document](https://develop.sentry.dev/sdk/data-model/envelopes/#size-limits)
* **Unreal**: An unsupported or invalid Unreal Engine crash report was submitted. If this request originates from a recent or development version of the Unreal Engine, please report a bug to Sentry. See [Unreal Engine](https://docs.sentry.io/platforms/unreal.md) for more information.
* **Internal**: An internal problem at Sentry prevented regular processing or storage of the submitted information.

### [Client Discard](https://docs.sentry.io/product/stats.md#client-discard)

Events and attachments discarded by the SDK. The following reasons are currently defined:

* **Queue Overflow**: An SDK internal queue (for example, a transport queue) overflowed.
* **Cache Overflow**: An SDK internal cache (for example, an offline event cache) overflowed.
* **Ratelimit Backoff**: The SDK dropped events because a previous rate limit instructed the SDK to back off.
* **Network Error**: Events were dropped due to network errors, and were not retried.
* **Sample Rate**: An event was dropped because of the configured sample rate.
* **Before Send**: An event was dropped in `before_send`.
* **Event Processor**: An event was dropped by an event processor; this may also be used for ignored exception/errors.
* **Send Error**: An event was dropped because of an error when sending it (for example, a 400 response).
* **Internal SDK Error**: An event was dropped due to an internal SDK error (for example, a web worker crash).
* **Insufficient Data**: An event was dropped due to a lack of data in the event (for example, not enough samples in a profile).
* **Backpressure**: An event was dropped due to downsampling caused by the system being under load.
* **Invalid**: An event was dropped because it contained invalid data (e.g. replay session exceeded maximum allowed length).
* **Ignored**: An event was ignored by the SDK (for example, a span was ignored by `ignore_spans`).
* **No Parent Span**: A span was not started or dropped because no parent span was present at span start (for example, auto-instrumented request spans suppressed when the request happens outside an active span).

For more details, please consult the [Client Reports](https://develop.sentry.dev/sdk/telemetry/client-reports/#envelope-item-payload) documentation.

### [Usage Cards](https://docs.sentry.io/product/stats.md#usage-cards)

The cards on the page provide high-level usage stats about events and attachments, including the total number of either for the time period specified. You can also see which ones were accepted, filtered, rate limited, or invalid.

### [Summary Chart](https://docs.sentry.io/product/stats.md#summary-chart)

The chart on this page displays a breakdown of events and attachments over the selected date range. Depending on the date range that you set the chart to display, each bar in the chart represents a different amount of time or interval. For example, if you set the chart to display seven days, each bar in the chart represents one hour, but if you set it to display 90 days, each bar represents one day. You can also use the “Type” dropdown to set whether the chart shows a cumulative count of events or attachments, or a daily (or hourly) count.

When you set a date range that results in intervals of one day or more, the time zone is displayed in UTC to ensure consistency for users across different time zones. For time periods with intervals of less than 24 hours, the time zone is based on your "Timezone" setting in **User Settings > Account Details**.

### [Project Usage Stats Table](https://docs.sentry.io/product/stats.md#project-usage-stats-table)

The “Project” table provides insight into per-project usage of your errors, transactions, and attachments over time. The table shows you the total errors, transactions, or attachments. Those are further broken down into the accepted, filtered, and dropped categories.

Each project in the table has individual settings, which you can access from by clicking the settings icon (gear wheel) next to the name of the project. For instance, you might want to go to the project settings so you can limit the quota consumed by its DSNs. Clicking the name of the project takes you to the **[Project Details](https://docs.sentry.io/product/projects/project-details.md)** page.

The table displays only the projects of the teams that you belong to, unless you have permissions to see all projects.

## [Issues Stats](https://docs.sentry.io/product/stats.md#issues-stats)

This feature is available only if your organization is on a [Business or Enterprise plan](https://sentry.io/pricing/).

The "Issues" tab shows activity about issues assigned to your team; how many new issues were detected, how many resolved issues regressed, and how they were triaged.

#### [All Unresolved Issues](https://docs.sentry.io/product/stats.md#all-unresolved-issues)

The "All Unresolved Issues" chart and table show new and returning issues per project in the last seven days, as well as those that haven’t been resolved or archived in the past.

#### [New and Returning Issues](https://docs.sentry.io/product/stats.md#new-and-returning-issues)

The "New and Returning Issues" chart and table show the new, regressed, and escalating issues that were assigned to your team.

#### [Issues Triaged](https://docs.sentry.io/product/stats.md#issues-triaged)

The "Issues Triaged" chart and table show how many new and returning issues were reviewed by your team each week. Reviewing an issue includes marking it as reviewed, resolving it, assigning it to another team, or deleting it.

#### [Age of Unresolved Issues](https://docs.sentry.io/product/stats.md#age-of-unresolved-issues)

The "Age of Unresolved Issues" chart and table show how long ago the oldest seven unresolved issues were first created for the projects your team owns, sorted by their age.

#### [Time to Resolution](https://docs.sentry.io/product/stats.md#time-to-resolution)

The "Time to Resolution" chart shows the mean time it took for issues to be resolved by your team each week.

## [Health Stats](https://docs.sentry.io/product/stats.md#health-stats)

This feature is available only if your organization is on a [Business or Enterprise plan](https://sentry.io/pricing/).

The "Health" tab shows information about the overall health of your projects; the crash free sessions, user misery of your team’s key transactions, the number of alerts triggered by your team’s alert rules, and the number of releases per project.

#### [Crash Free Sessions](https://docs.sentry.io/product/stats.md#crash-free-sessions)

The "Crash Free Sessions" table shows the percentage of sessions that didn’t cause a crash for the selected date range.

#### [User Misery](https://docs.sentry.io/product/stats.md#user-misery)

The "User Misery" table shows transactions where users experienced load times four times the project’s configured threshold, with the number of unique users for each of those transactions.

#### [Metric Alerts Triggered](https://docs.sentry.io/product/stats.md#metric-alerts-triggered)

The "Metric Alerts Triggered" chart and table show alert rules that have been triggered for the projects your team owns.

#### [Number of Releases](https://docs.sentry.io/product/stats.md#number-of-releases)

The "Number of Releases" chart and table show the releases that were created for each of your team's projects.

## [Continuous Profiling Stats](https://docs.sentry.io/product/stats.md#continuous-profiling-stats)

#### [Dropped Profile Hours](https://docs.sentry.io/product/stats.md#dropped-profile-hours)

[Relay](https://docs.sentry.io/product/relay.md) calculates profile durations for accepted outcomes rather than for every profile chunk received. Both profile hours and UI profile hours stats are derived from these accepted profile chunks or UI profile chunks, respectively, with no duration data stored for dropped outcomes (which are simply counted). Each profile chunk has a maximum duration of 66 seconds. Based on internal testing data the 10th and 25th percentiles of accepted profile chunk durations are approximately 9.9 seconds. This metric was used to select 9.0 seconds as the estimation multiplier for each dropped profile chunk.
