---
title: Logpush alerts and analytics
description: Monitor Logpush job health with alerts and analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Logpush alerts and analytics

Logpush jobs may fail for a few reasons, for instance because the destination is unreachable, because of a change in permissions at the customers’ origin, or because a Logpush job did not complete at least one successful push in the last 24 hour.

With analytics and alerting, you can monitor your Logpush job health and find out for yourself when a job fails. You can get alerted and you can also get analytics about your Logpush jobs health via GraphQL.

Alerts are sent via the [Cloudflare Notifications](https://developers.cloudflare.com/notifications/) system. They can be sent via email or webhook. When subscribed to job disablement notification, you will receive at most one alert per job per 24 hours. The notification email contains the job ID and destination configuration.

Failing Logpush Job Disabled

**Who is it for?**

Enterprise customers who use [Logpush](https://developers.cloudflare.com/logs/) and want to monitor their job health.

**Other options / filters**

* Notification Name: A custom name for the notification.
* Description (optional): A custom description for the notification.
* Notification Email (can be multiple emails): The email address of the recipient for the notification.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

In the email for the notification, you can find the destination name for the failing Logpush job. With this destination name, you should be able to figure out which zone this relates to. There can be multiple reasons why a job fails, but it is best to test that the destination endpoint is healthy, and that necessary credentials are still working. You can also check that the destination has allowlisted [Cloudflare IPs](https://www.cloudflare.com/ips/).

## Enable alerts

You can add an alert for **Failing Logpush Job Disabled** via the **Notifications** section of the dashboard. Note that alerts can be configured at the account level and apply to all jobs within an account.

1. In the Cloudflare dashboard, go to the **Notifications** page.  
[ Go to **Notifications** ](https://dash.cloudflare.com/?to=/:account/notifications)
2. Next, select **Add**.
3. Select the alert **Failing Logpush Job Disabled**.
4. Configure the alert: choose a name, add a description (optional), select the notification services, Webhooks and enter the email where you want to be notified.
5. Select **Save**.

When you complete these steps, you will receive an email alert if your Logpush job is disabled.

## Enable Logpush health analytics

Customers can query Logpush job health metrics via the [GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/). The name of the dataset is `logpushHealthAdaptiveGroups` and the schema can be explored using the [GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/).

Here is a query to get the count of how many times jobs pushing to S3 failed.

```

query

{

  viewer

  {

    zones(filter: { zoneTag: $zoneTag})

    {

      logpushHealthAdaptiveGroups(filter: {

        datetime_gt:"2022-08-15T00:00:00Z",

        destinationType:"s3",

        status_neq:200

      },

      limit:10)

      {

        count,

        dimensions {

          jobId,

          status,

          destinationType

        }

      }

    }

  }

}


```

Note

If you get a `1105` status code error when checking your Logpush job health, it indicates a DNS resolution issue. This means Cloudflare is unable to resolve the target hostname for the Logpush job. To resolve this, check with your DNS service provider and confirm the hostname can be publicly resolved.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/alerts-and-analytics/#page","headline":"Logpush alerts and analytics · Cloudflare Logs docs","description":"Monitor Logpush job health with alerts and analytics.","url":"https://developers.cloudflare.com/logs/logpush/alerts-and-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/alerts-and-analytics/","name":"Logpush alerts and analytics"}}]}
```
