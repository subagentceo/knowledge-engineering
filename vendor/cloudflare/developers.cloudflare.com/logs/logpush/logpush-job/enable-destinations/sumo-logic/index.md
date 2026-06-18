---
title: Enable Sumo Logic
description: Push Cloudflare logs to Sumo Logic.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Sumo Logic

Cloudflare Logpush supports pushing logs directly to Sumo Logic via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Logpush** page at the account or or domain (also known as zone) level.  
For account: [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)  
For domain (also known as zone): [ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/:zone/analytics/logs)
2. Depending on your choice, you have access to [account-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) and [zone-scoped datasets](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/), respectively.
3. Select **Create a Logpush job**.
1. In **Select a destination**, choose **Sumo Logic**.
2. Enter the **HTTP Source Address**. To get the HTTP Source Address (URL) configure a [Sumo Logic Hosted Collector ↗](https://help.sumologic.com/docs/send-data/hosted-collectors/) with an [HTTP Logs & Metrics Source ↗](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/). Note that the same collector can be used for multiple Logpush jobs, but each job must have a dedicated source. When you are done entering the destination details, select **Continue**.
3. Select the dataset to push to the storage service.
4. In the next step, you need to configure your logpush job:  
   * Enter the **Job name**.  
   * Under **If logs match**, you can select the events to include and/or remove from your logs. Refer to [Filters](https://developers.cloudflare.com/logs/logpush/logpush-job/filters/) for more information. Not all datasets have this option available.  
   * In **Send the following fields**, you can choose to either push all logs to your storage destination or selectively choose which logs you want to push.
5. In **Advanced Options**, you can:  
   * Choose the format of timestamp fields in your logs (`RFC3339` (default), `Unix`, or `UnixNano`).  
   * Select a [sampling rate](https://developers.cloudflare.com/logs/logpush/logpush-job/api-configuration/#sampling-rate) for your logs or push a randomly-sampled percentage of logs.  
   * Enable redaction for `CVE-2021-44228`. This option will replace every occurrence of `${` with `x{`.
6. Select **Submit** once you are done configuring your logpush job.

## Configure a Hosted Collector

Cloudflare can send logs to a Hosted Collector with **HTTP Logs & Metrics** as the source. Once you have set up a collector, you simply provide the HTTP Source Address (a unique URL) to which logs can be posted.

Ensure **Log Share** permissions are enabled, before attempting to read or configure a Logpush job. For more information refer to the [Roles section](https://developers.cloudflare.com/logs/logpush/permissions/#roles).

  
To enable Logpush to Sumo Logic:

1. Configure a Hosted Collector. Refer to [instructions from Sumo Logic ↗](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/).
2. Configure an HTTP Logs & Metrics Source. Refer to [instructions from Sumo Logic ↗](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/). The last step indicates how to get the HTTP Source Address (URL).
3. Provide the HTTP Source Address (URL) when prompted by the Logpush API or UI.

Notes

* Logpush will stop working if you regenerate the HTTP Source Address (URL). Refer to [generate a new URL for an HTTP Source from Sumo Logic ↗](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/generate-new-url/). To use the new URL, you will have to get a new ownership challenge and update the destination for your job.
* Sumo Logic may impose throttling and caps on your log ingestion to prevent your account from using **On-Demand Capacity**. Refer to [manage ingestion ↗](https://help.sumologic.com/docs/manage/ingestion-volume/log-ingestion/).
* To analyze and visualize Cloudflare Logs using the Cloudflare App for Sumo Logic, follow the steps in the Sumo Logic integration documentation to [install the Cloudflare App ↗](https://help.sumologic.com/docs/integrations/saas-cloud/cloudflare/#installing-the-cloudflare-app) and [view the Cloudflare dashboards ↗](https://help.sumologic.com/docs/integrations/saas-cloud/cloudflare/#viewing-the-cloudflare-dashboards).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/sumo-logic/#page","headline":"Enable Logpush to Sumo Logic · Cloudflare Logs docs","description":"Push Cloudflare logs to Sumo Logic.","url":"https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/sumo-logic/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/logpush-job/","name":"Logpush job setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/","name":"Enable destinations"}},{"@type":"ListItem","position":6,"item":{"@id":"/logs/logpush/logpush-job/enable-destinations/sumo-logic/","name":"Enable Sumo Logic"}}]}
```
