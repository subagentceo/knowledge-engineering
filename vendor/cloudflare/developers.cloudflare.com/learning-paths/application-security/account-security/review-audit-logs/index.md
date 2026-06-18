---
title: Review audit logs - v1
description: Access and review account audit logs.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Review audit logs - v1

Note

Audit Logs version 2 is available in beta. Refer to the [Audit Logs v2 documentation](https://developers.cloudflare.com/fundamentals/account/account-security/audit-logs/) for more details.

Audit logs summarize the history of changes made within your Cloudflare account. Audit logs include account level actions like login, as well as zone configuration changes.

Audit Logs are available on all plan types and are captured for both individual users and for multi-user organizations.

Note

Most beta features will not appear in audit logs until they are out of beta.

Audit logs are available in the dashboard as well as the API.

### Using the dashboard

To access audit logs in the Cloudflare dashboard:

In the Cloudflare dashboard, go to the **Audit Logs** page.

[ Go to **Audit logs** ](https://dash.cloudflare.com/?to=/:account/audit-log) 

You can search these audit logs by user email or domain and filter by date range. To download audit logs, click **Download CSV**.

Note

Depending on the volume of data, the export of large amounts of events from Audit Logs might fail with errors. We always recommend using Cloudflare [Logpush](https://developers.cloudflare.com/logs/logpush/) to make sure Audit Logs are always available and stored externally.

### Using the API

To get audit logs from the Cloudflare API, send a [GET request](https://developers.cloudflare.com/api/resources/audit%5Flogs/methods/list/).

We recommending using the API for downloading historical audit log data.

To maintain Audit Logs query performance, the Audit Logs API was modified on 2019-06-30 to return records with a maximum age of 18 months.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/account-security/review-audit-logs/#page","headline":"Review audit logs - v1 · Cloudflare Learning Paths","description":"Access and review account audit logs.","url":"https://developers.cloudflare.com/learning-paths/application-security/account-security/review-audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/account-security/","name":"Account security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/account-security/review-audit-logs/","name":"Review audit logs - v1"}}]}
```
