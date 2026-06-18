---
title: Shadow IT SaaS analytics
description: Reference information for Shadow IT SaaS analytics in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Shadow IT SaaS analytics

Shadow IT SaaS analytics provides visibility into the SaaS applications your users are visiting. The dashboard aggregates data from Gateway HTTP traffic to track application usage across your organization. This information allows you to create identity and device-driven Cloudflare One policies to secure your users and data.

To access Shadow IT SaaS analytics:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights**.
2. Go to **Dashboards**.
3. Select **Shadow IT: SaaS analytics**.

Refer to [Insights overview](https://developers.cloudflare.com/cloudflare-one/insights/) to learn how to use Analytics dashboards together with [Analytics Overview](https://developers.cloudflare.com/cloudflare-one/insights/analytics-overview/) and [Digital Experience Monitoring (DEX)](https://developers.cloudflare.com/cloudflare-one/insights/dex/) for complete visibility and troubleshooting.

## Prerequisites

To allow Cloudflare to discover shadow IT in your traffic, you must set up [HTTP filtering](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/http/).

## Use Shadow IT SaaS analytics

### 1\. Review applications

The first step in using the Shadow IT SaaS analytics dashboard is to review applications in the [Application Library](https://developers.cloudflare.com/cloudflare-one/team-and-resources/app-library/). The App Library synchronizes application review statuses with approval statuses from the Shadow IT Discovery SaaS analytics dashboard.

To organize applications into their approval status for your organization, you can mark them as **Unreviewed** (default), **In review**, **Approved**, and **Unapproved**.

| Status     | API value  | Description                                                                                            |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------ |
| Approved   | approved   | Applications that have been marked as sanctioned by your organization.                                 |
| Unapproved | unapproved | Applications that have been marked as unsanctioned by your organization.                               |
| In review  | in review  | Applications in the process of being reviewed by your organization.                                    |
| Unreviewed | unreviewed | Unknown applications that are neither sanctioned nor being reviewed by your organization at this time. |

To set the status of an application:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Applications**.
2. Locate the card for the application.
3. In the three-dot menu, select the option to mark your desired status.

Once you mark the status of an application, its badge will change. You can filter applications by their status to review each application in the list for your organization. The review status for an application in the App Library and Shadow IT Discovery will update within one hour.

Note

Approval status does not impact a user's ability to access an application. Users are allowed or blocked according to your [Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) and [Gateway policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/). To filter traffic based on approval status, use the [_Application Status_](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/#application-approval-status) selector.

### 2\. Monitor usage

Review the Shadow IT SaaS analytics dashboard for application usage. Filter the view based on:

| Field            | Description                                                                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Application      | SaaS application's name and logo.                                                                                                                  |
| Application type | [Application type](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/#app-types) assigned by Cloudflare One. |
| Status           | Application's approval status.                                                                                                                     |
| Secured          | Whether the application is currently secured behind Cloudflare Access.                                                                             |
| Users            | Number of users who connected to the application over the period of time specified on the Shadow IT Discovery overview page.                       |

To manage application statuses in bulk, select **Set Application Statuses** to review applications your users commonly visit and update their approval statuses.

### 3\. Create policies

After marking applications, you can create [HTTP policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) based on application review status. For example, you can create policies that:

* Launch all **Unreviewed** and **In review** applications in an [isolated browser](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/common-policies/#1-isolate-unreviewed-or-in-review-applications).
* [Block access](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/common-policies/#2-block-unapproved-applications) to all **Unapproved** applications.
* Limit file upload capabilities for specific application statuses.

To create an HTTP status policy directly from Shadow IT Discovery:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Insights**.
2. Select **Dashboards** \> **Shadow IT: SaaS analytics**.
3. Select **Set application statuses**.
4. Select **Manage HTTP status policies**, then choose an application status and select **Create policy**.

## Available insights

The Shadow IT SaaS analytics dashboard includes several insights to help you monitor and manage SaaS application usage.

* **Number of applications by status**: A breakdown of how many applications have been categorized into each [approval status](#1-review-applications). The list of applications is available in the [App Library](https://developers.cloudflare.com/cloudflare-one/team-and-resources/app-library/).
* **Data uploaded per application status**: A time-series graph showing the amount of data uploaded to applications in the given status.
* **Data downloaded per application status**: A time-series graph showing the amount of data downloaded from applications in the given status.
* **User count per application status**: A time-series graph showing the number of unique users who have interacted with at least one application in a given status. A single user can appear in multiple status categories if they access applications with different statuses. For example, a user who accesses both an **Approved** application and an **Unapproved** application will be counted in both status categories.
* **Top-N metrics**: A collection of metrics providing insights into top applications, users, devices, and countries.

### Understanding user counts

The user count chart displays unique users in two ways:

* **Time-series bars**: Show unique users per time interval (for example, per hour or per day). The same user can appear in multiple time intervals if they were active during those periods.
* **Legend totals**: Show unique users across the entire selected time range, deduplicated. Each user is counted only once per status, regardless of how many time intervals they appeared in.

For example, if User A accesses an Approved application every hour for three hours, they will appear in each hourly bar but will only be counted once in the legend total.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/analytics/shadow-it-discovery/#page","headline":"Shadow IT SaaS analytics · Cloudflare One docs","description":"Reference information for Shadow IT SaaS analytics in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/analytics/shadow-it-discovery/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/analytics/","name":"Dashboards"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/analytics/shadow-it-discovery/","name":"Shadow IT SaaS analytics"}}]}
```
