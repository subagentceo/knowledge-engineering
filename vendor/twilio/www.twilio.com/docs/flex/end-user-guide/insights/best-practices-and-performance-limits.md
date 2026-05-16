# Best Practices and Performance Limits for Flex Insights

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

## Before you begin

This guide assumes you have a good understanding of the [Flex Insights Data Model](/docs/flex/end-user-guide/insights/data-model).

## Overview

The performance of reports in your Flex Insights workspace depends on several factors. Some include size of the workspace, frequency and size of data loads, and the complexity of the reports/dashboards in the workspace. These factors could interfere with each other and have a combined impact on the performance of your workspace reports.
We recommend the following best practices and performance limits for optimal performance of reporting dashboards in your Flex Insights workspace.

## Best Practices

We recommend reviewing the following settings to reduce rendering/execution time of reports in a dashboard:

* **Metric definition.** Metrics that have complex calculations or data (facts or attributes) from multiple Data Sets usually take longer to compute. Reducing the number of complex metrics in a report will help in faster execution of the report.
* **Overall load of the workspace.** Users rendering the same reports share cached resources and experience better performance. If there are many users accessing different reports, it is difficult for the workspace to leverage caching, impacting performance of the reports. Users accessing fewer reports per dashboard will increase chances of caching and performance of the reports.
* **Data refresh interval.** The lower the frequency of data refresh, the faster the report load time will be. This is because every data refresh invalidates caching so the more frequently workspaces are refreshed there will be less caching of reporting data. **We recommend keeping the default 60-minute refresh interval as Flex Insights is not designed for real-time monitoring purposes.**
* **Size of your Flex Insights workspace.** As the size of reporting data in your workspace increases, it adds latency to execution of the reports. This is because the metrics are calculated for a larger duration of reporting data. Report filters and dashboard filters significantly reduce the size of reported data (for example by filtering by a shorter date range).
* **Save dashboard filters.** [Enabling "Saved Views"](/docs/flex/end-user-guide/insights/dashboards#saved-views) lets you save frequently used dashboard filter settings as a named dashboard view. This feature is especially convenient if you need to switch frequently between multiple filter settings.
* **Method of accessing the reports.** Rendering reports in the user interface has the highest priority and provides interactive data exploration. Rendering reports via API and sending scheduled emails has lower priority and may take longer.

Please refer to our [Twilio Support page](https://help.twilio.com/hc/en-us/articles/12035074129691-Best-Practices-for-Flex-Insights-Performance) for more details on best practices of using Flex Insights.

## Performance Limits

### Dashboard Definition

We have soft limits on the number of dashboards you can define. Staying within these limits ensures good user interface performance.

| **Parameters**            | **Limits** | **Description**                                                                                                      |
| ------------------------- | ---------- | -------------------------------------------------------------------------------------------------------------------- |
| Dashboards                | 20         | Maximum number of dashboards in a single workspace                                                                   |
| Tabs per dashboard        | 15         | The maximum number of tabs in a single dashboard                                                                     |
| Objects per dashboard tab | 40         | The maximum number of all objects (reports, widgets, lines, texts, iframe elements, images. etc.) on a dashboard tab |
| Reports per dashboard tab | 20         | The maximum number of reports (including a single value measure) on a dashboard tab                                  |
| Filters per dashboard tab | 8          | The maximum number of dropdown filters on a dashboard tab                                                            |

### Report Definition

Reports have a limited number of measures and attributes you can use in them. If you need to see more attributes or measures, you can build a dashboard that contains multiple reports on one canvas.

| **Parameters**             | **Limits**                                      | **Description**                                                                                              |
| -------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Attributes per report      | 20                                              | The maximum number of attributes used in a single report                                                     |
| Measures per report        | 20                                              | The maximum number of measures used in a single report                                                       |
| Filters per report         | 20                                              | The maximum number of filters used in a single report                                                        |
| Selected values per filter | 500 for dashboard and<br /><br />200 for report | The maximum number of attribute values (elements) that can be used in a filter (included or excluded values) |

### Email Scheduling

Flex Insights enables you to send CSV reports and PDF dashboards by email to other users in Flex and also to other people in the company that do not have a Flex account.

| **Parameters**                  | **Limits** | **Description**                                                                     |
| ------------------------------- | ---------- | ----------------------------------------------------------------------------------- |
| Scheduled emails                | 2,000      | The maximum number of scheduled emails                                              |
| Scheduled email frequency       | 30 minutes | The highest frequency for sending scheduled emails                                  |
| Recipients per single workspace | 500        | The maximum number of people receiving scheduled emails                             |
| Scheduled email size            | 14 MB      | The maximum size of a scheduled email including all reports included in attachments |

We highly recommend using the Flex Insights user interface instead of sending reports by emails. The user interface always shows the latest data and enables users to interact with the data and explore it if they want to do so.

### API Limits

These pertain to limits enforced in Flex Insights Historical Reporting API. You can use the API to export data from any report created from your [**Flex Insights Analytics Portal**](https://analytics.ytica.com/)**.**

| **Parameters**                                      | **Limits** | **Description**                                                                              |
| --------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| Total REST API requests per user per 10 seconds     | 1,000      | The maximum number of REST API requests an authenticated user can generate within 10 seconds |
| Simultaneously executing REST API requests per user | 50         | The maximum number of REST API requests an authenticated user can generate simultaneously    |
| Size of REST API request payload                    | 1 MB       | The maximum size of the REST API request payload that can be processed                       |
| Concurrent connections per IP address               | 100        | The maximum size of the REST API request payload that can be processed                       |
