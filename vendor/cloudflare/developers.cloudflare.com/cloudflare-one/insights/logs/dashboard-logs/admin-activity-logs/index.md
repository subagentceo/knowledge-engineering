---
title: Admin activity logs
description: Monitor when a member on your account creates, updates, or deletes configurations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Admin activity logs

Admin activity logs record configuration changes made by members of your Cloudflare account. These logs are useful for auditing who changed a policy or setting and investigating unexpected configuration changes. Use these logs to monitor when a member creates, updates, or deletes configurations in your [Zero Trust organization](https://developers.cloudflare.com/cloudflare-one/setup/#create-a-zero-trust-organization).

To view admin activity logs, log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and go to **Zero Trust** \> **Insights** \> **Logs** \> **Admin activity logs**.

## Explanation of the fields

| Field           | Description                                      | Example Value                                                                              |
| --------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Email           | User who performed the action                    | [josephli@cloudflare.com](mailto:josephli@cloudflare.com)                                  |
| Product         | Cloudflare product being modified                | Tunnel                                                                                     |
| Resource        | Specific resource type within the product        | Route                                                                                      |
| Event           | Action performed (Create, Update, Delete)        | Create                                                                                     |
| Date            | Timestamp of when the action occurred            | April 30, 2026 • 12:19 AM                                                                  |
| User IP Address | IP address of the user who made the change       | 2a09:bac6:6447:523::83:30                                                                  |
| Interface       | How the change was initiated                     | API                                                                                        |
| Audit record    | Unique identifier for the audit log entry        | caf1a547-17cc-484a-b4ce-5d3b32771a8f                                                       |
| Old value       | Previous configuration state (empty for creates) |                                                                                            |
| New value       | New configuration state after the change         | JSON object with fields like comment, network, tun\_type, tunnel\_id, virtual\_network\_id |

## Export admin activity logs

Enterprise users can export admin activity logs to a third-party storage destination or SIEM using [Logpush](https://developers.cloudflare.com/cloudflare-one/insights/logs/logpush/). For a list of all available fields, refer to [Audit Logs V2](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/audit%5Flogs%5Fv2/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/admin-activity-logs/#page","headline":"Admin activity logs · Cloudflare One docs","description":"Monitor when a member on your account creates, updates, or deletes configurations.","url":"https://developers.cloudflare.com/cloudflare-one/insights/logs/dashboard-logs/admin-activity-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/logs/","name":"Logs"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/logs/dashboard-logs/","name":"Dashboard logs"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/insights/logs/dashboard-logs/admin-activity-logs/","name":"Admin activity logs"}}]}
```
