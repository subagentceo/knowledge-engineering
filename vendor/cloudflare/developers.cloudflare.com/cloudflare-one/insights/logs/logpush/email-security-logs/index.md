---
title: Email security logs
description: Email security logs in Zero Trust analytics.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Email security logs

Email security allows you to configure Logpush to export two types of log data: detection logs (records of threats identified in email traffic) and user action logs (records of administrative actions taken via the API or the dashboard). Each log type requires separate configuration.

## Enable detection logs

Detection logs record each threat identified by Email security, including metadata such as the message sender, recipient, and detection verdict.

To enable detection logs, refer to [Enable destinations](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/). When configuring the Logpush job, select **Email security alerts** as the dataset.

## Enable user action logs

User action logs record all administrative actions taken via the [API](https://developers.cloudflare.com/api/resources/email%5Fsecurity/) or the dashboard.

Before you can enable user action logs for Email security, you must have a Logpush job configured for your storage destination. Refer to [Enable destinations](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/) to enable logs on destinations such as Cloudflare R2, HTTP, Amazon S3, and more.

Once you have configured your destination, you can set up user action logs:

1. In the Cloudflare dashboard, go to the **Logpush** page.  
[ Go to **Logpush** ](https://dash.cloudflare.com/?to=/:account/logs)
2. Select your storage destination.
3. Select the three dots > **Edit**.
4. Under **Configure logpush job**:
* **Job name**: Enter the job name, if it is not already prepopulated.
* **If logs match** \> Select **Filtered logs** to capture only Email security events:  
   * **Field**: Choose `ResourceType` (the type of resource that was changed).  
   * **Operator**: Choose `starts with`.  
   * **Value**: Enter `email_security`.
1. Select **Submit**.

You can now view logs via the Cloudflare dashboard.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/email-security-logs/#page","headline":"Email security logs · Cloudflare One docs","description":"Email security logs in Zero Trust analytics.","url":"https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/email-security-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/logs/","name":"Logs"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/logs/logpush/","name":"Logpush integration"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/logs/logpush/email-security-logs/","name":"Email security logs"}}]}
```
