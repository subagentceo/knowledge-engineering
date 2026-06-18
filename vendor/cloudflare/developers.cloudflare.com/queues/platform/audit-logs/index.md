---
title: Audit Logs
description: Review audit log events for configuration changes made to Cloudflare Queues.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Audit Logs

[Audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/) provide a comprehensive summary of changes made within your Cloudflare account, including those made to Queues. This functionality is always enabled.

## Viewing audit logs

To view audit logs for your Queue in the Cloudflare dashboard, go to the **Audit logs** page.

[ Go to **Audit logs** ](https://dash.cloudflare.com/?to=/:account/audit-log) 

For more information on how to access and use audit logs, refer to [Review audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/).

## Logged operations

The following configuration actions are logged:

| Operation              | Description                                                         | |  CreateQueue | Creation of a new queue. |
| ---------------------- | ------------------------------------------------------------------- | -------------- | ------------------------ |
| DeleteQueue            | Deletion of an existing queue.                                      |                |                          |
| UpdateQueue            | Updating the configuration of a queue.                              |                |                          |
| AttachConsumer         | Attaching a consumer, including HTTP pull consumers, to the Queue.  |                |                          |
| RemoveConsumer         | Removing a consumer, including HTTP pull consumers, from the Queue. |                |                          |
| UpdateConsumerSettings | Changing Queues consumer settings.                                  |                |                          |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/platform/audit-logs/#page","headline":"Audit Logs · Cloudflare Queues docs","description":"Review audit log events for configuration changes made to Cloudflare Queues.","url":"https://developers.cloudflare.com/queues/platform/audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/queues/","name":"Queues"}},{"@type":"ListItem","position":3,"item":{"@id":"/queues/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/queues/platform/audit-logs/","name":"Audit Logs"}}]}
```
