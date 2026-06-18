---
title: View and submit reports
description: Submit abuse reports to Cloudflare via the dashboard, public form, or API, and view reports filed against your account.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# View and submit reports

## Submit reports

Cloudflare helps you prevent online abuse and make your website more secure. If abuse is identified on your website, Cloudflare gives you a mechanism to present your grievances to the party best positioned to address them.

Cloudflare offers three ways for you to submit an abuse report:

* Public form: Refer to [Submit an Abuse Report ↗](https://abuse.cloudflare.com/) to learn more.
* The Cloudflare dashboard, on the **Abuse reports** page.  
[ Go to **Abuse reports** ](https://dash.cloudflare.com/?to=/:account/abuse-reports)  
Optionally, filter the reports based on date, report status, report type, and domain.
* The Cloudflare API: Use the [Abuse Reports API](https://developers.cloudflare.com/api/resources/abuse%5Freports/) to submit an abuse report.

## View submitted reports

Users with Admin, Super Admin, or Trust & Safety roles can view any abuse reports submitted and accepted against the content associated with their account.

1. In the Cloudflare dashboard, go to the **Abuse reports** page.  
[ Go to **Abuse reports** ](https://dash.cloudflare.com/?to=/:account/abuse-reports)
2. Optionally, filter the reports based on date, report status, report type, and domain.

If there was a mitigation against your website due to the abuse allegation, you may have the opportunity to request a review on that mitigation. Cloudflare will then review your request and potentially remove the mitigation.

## Receive notifications

You can enable abuse notifications for your account to configure email, webhook, or PagerDuty alerts about new abuse reports against your websites.

For help setting up alerts, refer to [Configure Cloudflare notifications](https://developers.cloudflare.com/notifications/get-started/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/fundamentals/reference/report-abuse/submit-report/#page","headline":"View and submit reports · Cloudflare Fundamentals docs","description":"Submit abuse reports to Cloudflare via the dashboard, public form, or API, and view reports filed against your account.","url":"https://developers.cloudflare.com/fundamentals/reference/report-abuse/submit-report/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/report-abuse/","name":"Abuse"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/reference/report-abuse/submit-report/","name":"View and submit reports"}}]}
```
