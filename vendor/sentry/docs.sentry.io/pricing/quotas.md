---
title: "Billing Quota Management"
description: "Learn about what counts towards your quota and how to manage your quota."
url: https://docs.sentry.io/pricing/quotas/
---

# Billing Quota Management

Data and quotas are interconnected in Sentry. When you [subscribe to Sentry](https://sentry.io/pricing/), you pay for the amount of data - events (errors, replays, spans or transactions, and profiles), logs, application metrics, and attachments - to be tracked. Each data category has its own quota that you can adjust. When Sentry tracks an event, log, metric, or attachment, it counts toward your quota for that type of data.

To see which projects are using up your quota, you can review the "Usage" tab of **Stats**. This page can be viewed by any member of your organization. In addition, you can come back to this page to check if the changes you've made are having the desired effect:

You can also download a project breakdown report by clicking the "View all usage" button in **Settings > Subscription** (only accessible to Owner and Billing members of your Sentry organization).

Sentry's flexibility means you can exercise fine-grained control over which events and attachments count toward your quota. This page provides you with high-level information about strategies for managing your quota, but you can get more detailed information in:

* [Spike Protection](https://docs.sentry.io/pricing/quotas/spike-protection.md)
* [Manage Your Error Quota](https://docs.sentry.io/pricing/quotas/manage-event-stream-guide.md)
* [Manage Your Span Quota](https://docs.sentry.io/pricing/quotas/manage-transaction-quota.md)
* [Manage Your Replay Quota](https://docs.sentry.io/pricing/quotas/manage-replay-quota.md)
* [Manage Your Attachments Quota](https://docs.sentry.io/pricing/quotas/manage-attachments-quota.md)
* [Manage Your Logs Quota](https://docs.sentry.io/pricing/quotas/manage-logs-quota.md)
* [Manage Your Application Metrics Quota](https://docs.sentry.io/pricing/quotas/manage-application-metrics-quota.md)

## [How to Manage Your Quota](https://docs.sentry.io/pricing/quotas.md#how-to-manage-your-quota)

There are a number of things you can do to manage your quota, as shown in the table below. Actions are listed in order from easiest and fastest, to most challenging and potentially time-consuming. The checkmarks tell you whether the action helps you manage errors, spans, replays, attachments, logs, application metrics, or some combination.

The first 6 actions in the list can all be done in [sentry.io](https://sentry.io), while the rest have to be done in an SDK.

| Action                                                                                                             | Errors | Spans | Replays | Attachments | Logs | Application Metrics |
| ------------------------------------------------------------------------------------------------------------------ | ------ | ----- | ------- | ----------- | ---- | ------------------- |
| [Ensure spike protection is enabled](https://docs.sentry.io/pricing/quotas.md#spike-protection)                    | ✓      | ✓     |         | ✓           |      |                     |
| [Adjust your quota](https://docs.sentry.io/pricing/quotas.md#adjusting-your-quota)                                 | ✓      | ✓     | ✓       | ✓           | ✓    | ✓                   |
| [Rate limit your events or attachments](https://docs.sentry.io/pricing/quotas.md#rate-limits)                      | ✓      |       |         | ✓           |      |                     |
| [Review repeated events](https://docs.sentry.io/pricing/quotas.md#event-repetition)                                | ✓      |       |         |             |      |                     |
| [Filter your events](https://docs.sentry.io/pricing/quotas.md#inbound-filters)                                     | ✓      | ✓     |         | ✓           | ✓    | ✓                   |
| [Update your SDK sample rate](https://docs.sentry.io/pricing/quotas.md#sdk-sample-rate)                            | ✓      | ✓     |         |             |      |                     |
| [Apply SDK filtering](https://docs.sentry.io/pricing/quotas.md#sdk-filtering-beforesend-and-beforesendtransaction) | ✓      | ✓     |         |             | ✓    | ✓                   |
| [Update your SDK configuration](https://docs.sentry.io/pricing/quotas.md#sdk-configuration)                        | ✓      | ✓     |         |             | ✓    | ✓                   |
| [Manage data size](https://docs.sentry.io/pricing/quotas.md#size-limits)                                           | ✓      | ✓     |         | ✓           | ✓    | ✓                   |

## [What Counts Towards Your Quota](https://docs.sentry.io/pricing/quotas.md#what-counts-towards-your-quota)

Sentry completes a thorough evaluation of each event to determine if it counts toward your quota, as outlined in this overview. Detailed documentation for each evaluation is linked throughout.

Before completing any of these evaluations, Sentry confirms that each event includes a valid DSN and project as well as whether the event can be parsed. In addition, for error events, Sentry validates that the event contains valid fingerprint information. If any of these items are missing or incorrect, the event is rejected.

This list is ordered from easiest or least time-consuming, to most challenging or potentially time-consuming.

### [Spike Protection](https://docs.sentry.io/pricing/quotas.md#spike-protection)

Spike Protection protects users from spiking event volume. Typically, spikes are caused by anomalies and have the potential to deplete your available event volume rapidly. Your baseline consumption is used to compute a threshold and spike protection is triggered if event volume exceeds this threshold. When spike protection is triggered, events start getting dropped, ensuring that you don't get charged for the excess volume.

Spike Protection can be enabled on a per-project basis for your organization by any team member with either **Billing or Owner-level permissions**. To select which project to set it up for, go to **Settings > Spike Protection**. You'll be able to toggle it on for individual projects or click “Enable All” to set it up for all your projects at once. Learn more about how spike protection works and how to manage spikes in [Spike Protection](https://docs.sentry.io/pricing/quotas/spike-protection.md).

### [Adjusting Your Quota](https://docs.sentry.io/pricing/quotas.md#adjusting-your-quota)

Events and attachments that exceed your quota will not be accepted, so you may want to increase your quota. Conversely, you might want to decrease your quota or adjust your reserved and pay-as-you-go quotas to better control your spending. Learn about adjusting your quota in [Manage Your Error Quota](https://docs.sentry.io/pricing/quotas/manage-event-stream-guide.md#adjusting-quotas), [Manage Your Span Quota](https://docs.sentry.io/pricing/quotas/manage-transaction-quota.md), [Manage your Replay Quota](https://docs.sentry.io/pricing/quotas/manage-replay-quota.md), [Manage Your Attachments Quota](https://docs.sentry.io/pricing/quotas/manage-attachments-quota.md#adjusting-quotas), [Manage Your Logs Quota](https://docs.sentry.io/pricing/quotas/manage-logs-quota.md#adjusting-payg-budget), and [Manage Your Application Metrics Quota](https://docs.sentry.io/pricing/quotas/manage-application-metrics-quota.md#adjusting-payg-budget).

### [Rate Limits](https://docs.sentry.io/pricing/quotas.md#rate-limits)

You can add limits for error events on a per-project basis in **\[Project] > Settings > SDK Setup > Client Keys (DSN)**. If the event rate limit for a project has been exceeded, and your subscription allows, the event won't be counted. You can also rate limit attachments on an organization level in **Settings > Security & Privacy**. Learn more in [Manage Your Error Quota](https://docs.sentry.io/pricing/quotas/manage-event-stream-guide.md#rate-limiting) and [Manage Your Attachments Quota](https://docs.sentry.io/pricing/quotas/manage-attachments-quota.md#rate-limiting).

### [Event Repetition](https://docs.sentry.io/pricing/quotas.md#event-repetition)

In some cases, repeated events can count against your quota, so it's important to know how event repetition is treated in Sentry. Learn more in [Manage Your Error Quota](https://docs.sentry.io/pricing/quotas/manage-event-stream-guide.md#review-event-repetition).

### [Inbound Filters](https://docs.sentry.io/pricing/quotas.md#inbound-filters)

If an inbound filter is applied for a type of error, transaction/span, attachment, log, or application metric, and your subscription allows, it won't be counted. You can manage these in **\[Project] > Settings > Inbound Filters**. Learn more in [Manage Your Error Quota](https://docs.sentry.io/pricing/quotas/manage-event-stream-guide.md#inbound-data-filters), [Manage Your Span Quota](https://docs.sentry.io/pricing/quotas/manage-transaction-quota.md#inbound-filters), [Manage your Replay Quota](https://docs.sentry.io/pricing/quotas/manage-replay-quota.md), [Manage Your Attachments Quota](https://docs.sentry.io/pricing/quotas/manage-attachments-quota.md#inbound-data-filters), [Manage Your Logs Quota](https://docs.sentry.io/pricing/quotas/manage-logs-quota.md#logs-filtering), and [Manage Your Application Metrics Quota](https://docs.sentry.io/pricing/quotas/manage-application-metrics-quota.md#application-metrics-filtering).

### [SDK Sample Rate](https://docs.sentry.io/pricing/quotas.md#sdk-sample-rate)

If a sample rate is defined for the SDK, the SDK evaluates whether this event should be sent as a representative fraction of events, effectively limiting the number of errors and transactions/spans you send to Sentry. Setting a sample rate is documented [for each SDK](https://docs.sentry.io/platform-redirect.md?next=/configuration/sampling/), but you can also learn more in [Manage Your Error Quota](https://docs.sentry.io/pricing/quotas/manage-event-stream-guide.md#sdk-sample-rate) and [Manage Your Span Quota](https://docs.sentry.io/pricing/quotas/manage-transaction-quota.md#sdk-configuration-tracing-options/).

### [SDK Filtering: `beforeSend` and `beforeSendTransaction`](https://docs.sentry.io/pricing/quotas.md#sdk-filtering-beforesend-and-beforesendtransaction)

All Sentry SDKs support the `beforeSend` callback method, which you can use to modify the data of an error event or to drop it completely. Many also support `beforeSendTransaction`. For logs, many SDKs support `beforeSendLog` for filtering log entries, and for application metrics, many SDKs support `beforeSendMetric` for filtering metric events. Learn more in [Manage Your Error Quota](https://docs.sentry.io/pricing/quotas/manage-event-stream-guide.md#sdk-filtering-beforesend), [Manage Your Span Quota](https://docs.sentry.io/pricing/quotas/manage-transaction-quota.md#sdk-filtering-beforesendtransaction), [Manage Your Logs Quota](https://docs.sentry.io/pricing/quotas/manage-logs-quota.md#sdk-configuration), and [Manage Your Application Metrics Quota](https://docs.sentry.io/pricing/quotas/manage-application-metrics-quota.md#sdk-configuration).

### [SDK Configuration](https://docs.sentry.io/pricing/quotas.md#sdk-configuration)

The SDK configuration either allows an event to be sent to Sentry or filters it out. Configuration is documented [for each SDK](https://docs.sentry.io/platform-redirect.md?next=/configuration/filtering/), but you can also learn more in [Manage Your Error Quota](https://docs.sentry.io/pricing/quotas/manage-event-stream-guide.md#sdk-configuration), [Manage Your Span Quota](https://docs.sentry.io/pricing/quotas/manage-transaction-quota.md#sdk-configuration-tracing-options), [Manage Your Logs Quota](https://docs.sentry.io/pricing/quotas/manage-logs-quota.md#sdk-configuration), and [Manage Your Application Metrics Quota](https://docs.sentry.io/pricing/quotas/manage-application-metrics-quota.md#sdk-configuration).

### [Size Limits](https://docs.sentry.io/pricing/quotas.md#size-limits)

Sentry imposes limits on various fields within an event, as well as the size of full events and the requests they are sent in, which can affect your attachments quota. Learn more in [Manage Your Attachments Quota](https://docs.sentry.io/pricing/quotas/manage-attachments-quota.md#attachments-size).

## [What Counts Toward Your Quota - Quick Guide](https://docs.sentry.io/pricing/quotas.md#what-counts-toward-your-quota---quick-guide)

Use this table as a quick reference for what does and doesn't count towards your quota:

| Scenario                                                                                                                                                                                 | Yes, this data counts |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| [Spike protection](https://docs.sentry.io/pricing/quotas.md#spike-protection) activation threshold has been reached (errors)                                                             |                       |
| [Spike protection](https://docs.sentry.io/pricing/quotas/spike-protection.md#how-sentry-detects-spikes) no longer active (errors)                                                        | ✓                     |
| Your [quota](https://docs.sentry.io/pricing/quotas.md#increasing-quotas) hasn't been reached                                                                                             | ✓                     |
| Your [quota](https://docs.sentry.io/pricing/quotas.md#increasing-quotas) has been exceeded                                                                                               |                       |
| A [rate limit](https://docs.sentry.io/pricing/quotas.md#rate-limits) for a project has been applied (errors, attachments)                                                                |                       |
| This is a [repeated event](https://docs.sentry.io/pricing/quotas/manage-event-stream-guide.md#review-event-repetition) for which issues were previously set to Delete & Discard (errors) |                       |
| This is a [repeated event](https://docs.sentry.io/pricing/quotas/manage-event-stream-guide.md#review-event-repetition) for a previously resolved issue (errors)                          | ✓                     |
| This is a [repeated event](https://docs.sentry.io/pricing/quotas/manage-event-stream-guide.md#review-event-repetition) for an issue that you've set to Ignore                            | ✓                     |
| The event defies [inbound filters](https://docs.sentry.io/pricing/quotas.md#inbound-filters) configured in sentry.io                                                                     |                       |
| The event is sent after the [SDK sample rate](https://docs.sentry.io/pricing/quotas.md#sdk-sample-rate) has been exceeded                                                                |                       |
| The event isn't sent based on [SDK filters](https://docs.sentry.io/pricing/quotas.md#sdk-filtering-beforesend-and-beforesendtransaction)                                                 |                       |
| The event isn't sent based on [SDK configuration](https://docs.sentry.io/pricing/quotas.md#sdk-configuration)                                                                            |                       |
| The log is filtered by [logs filtering](https://docs.sentry.io/pricing/quotas.md#inbound-filters) configured in sentry.io                                                                |                       |
| The Application Metric isn't sent based on [SDK filters](https://docs.sentry.io/pricing/quotas.md#sdk-filtering-beforesend-and-beforesendtransaction)                                    |                       |
| The Application Metric is filtered by [Application Metrics filtering](https://docs.sentry.io/pricing/quotas.md#inbound-filters) configured in sentry.io                                  |                       |
| [Size limits](https://docs.sentry.io/pricing/quotas.md#size-limits) have been exceeded                                                                                                   |                       |

Sentry groups accepted errors and spans into issues. The issues themselves don't count towards your quota, but the errors and spans that comprise an issue are counted. Logs and Application Metrics are counted individually and do not get grouped into issues.

## [Key Terms](https://docs.sentry.io/pricing/quotas.md#key-terms)

Let's clarify a few terms:

* **Application Metrics** - Counters, gauges, and distributions sent from your applications to Sentry to track application health signals (for example, `email.sent`, `checkout.failed`, `queue.depth`). Each metric event is trace-connected.
* **Attachment** - Attachments are stored additional files, such as config files, log files, or stored mini-dumps, that are related to an error event. Unless the option to store crash reports is enabled, Sentry will use these files only to create an event, and then drop them.
* **Cron Monitor** - A Cron Monitor represents a set of configurations for a scheduled, recurring job such as a "Data Backup" job that runs daily on production and development.
* **Data** - Anything you send to Sentry. This includes events (errors, spans, or replays), logs, application metrics, attachments, and event metadata.
* **Error** - What counts as an error varies by platform, but in general, if there's something that looks like an exception, it can be captured as an error in Sentry. Sentry automatically captures errors, uncaught exceptions, and unhandled rejections, as well as other types of errors, depending on platform. A grouping of similar errors makes [an issue](https://docs.sentry.io/product/issues.md).
* **Event** - An event is one instance of you sending data to Sentry, excluding attachments. Generally, this data is an error or a transaction/span.
* **Logs** - Structured log entries sent from your applications that provide visibility into application behavior, debugging information, and user interactions.
* **Replay** - Session Replays are video-like reproductions of users' sessions as they navigate your app or website.
* **Span** - A billing unit in Sentry that maps to span usage. Also the basic unit that [traces](https://docs.sentry.io/concepts/key-terms/tracing/distributed-tracing.md) are composed of. Multiple spans make up a trace in Sentry and share a trace\_id.
* **Profile** - A snapshot of your code's resource usage obtained by periodically capturing the call stack as your application runs.
* **Quota** - Your quota is the amount of data (errors, spans, replays, logs, application metrics, attachments) that you pay Sentry to track.

## Pages in this section

- [Spike Protection](https://docs.sentry.io/pricing/quotas/spike-protection.md)
- [Spend Allocation](https://docs.sentry.io/pricing/quotas/spend-allocation.md)
- [Manage Your Error Quota](https://docs.sentry.io/pricing/quotas/manage-event-stream-guide.md)
- [Manage Your Performance Units Quota (before June 11, 2024)](https://docs.sentry.io/pricing/quotas/legacy-manage-transaction-quota.md)
- [Manage Your Seer Spend](https://docs.sentry.io/pricing/quotas/manage-seer-budget.md)
- [Manage Your Span Quota](https://docs.sentry.io/pricing/quotas/manage-transaction-quota.md)
- [Manage Your Logs Quota](https://docs.sentry.io/pricing/quotas/manage-logs-quota.md)
- [Manage Your Application Metrics Quota](https://docs.sentry.io/pricing/quotas/manage-application-metrics-quota.md)
- [Manage Your Replay Quota](https://docs.sentry.io/pricing/quotas/manage-replay-quota.md)
- [Manage Your Continuous Profile Hours](https://docs.sentry.io/pricing/quotas/manage-continuous-profile-hours.md)
- [Manage Your UI Profile Hours](https://docs.sentry.io/pricing/quotas/manage-ui-profile-hours.md)
- [Manage Your Attachments Quota](https://docs.sentry.io/pricing/quotas/manage-attachments-quota.md)
- [Manage Your Cron and Uptime Monitors](https://docs.sentry.io/pricing/quotas/manage-cron-monitors.md)
