---
title: Audit logs
description: View audit log entries for AI Gateway configuration changes such as gateway creation, deletion, and updates.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Audit logs

[Audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/) provide a comprehensive summary of changes made within your Cloudflare account, including those made to gateways in AI Gateway. This functionality is available on all plan types, free of charge, and is enabled by default.

## Viewing Audit Logs

To view audit logs for AI Gateway, in the Cloudflare dashboard, go to the **Audit logs** page.

[ Go to **Audit logs** ](https://dash.cloudflare.com/?to=/:account/audit-log) 

For more information on how to access and use audit logs, refer to [review audit logs documentation](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/).

## Logged Operations

The following configuration actions are logged:

| Operation       | Description                      |
| --------------- | -------------------------------- |
| gateway created | Creation of a new gateway.       |
| gateway deleted | Deletion of an existing gateway. |
| gateway updated | Edit of an existing gateway.     |

## Example Log Entry

Below is an example of an audit log entry showing the creation of a new gateway:

```

{

 "action": {

     "info": "gateway created",

     "result": true,

     "type": "create"

 },

 "actor": {

     "email": "<ACTOR_EMAIL>",

     "id": "3f7b730e625b975bc1231234cfbec091",

     "ip": "fe32:43ed:12b5:526::1d2:13",

     "type": "user"

 },

 "id": "5eaeb6be-1234-406a-87ab-1971adc1234c",

 "interface": "UI",

 "metadata": {},

 "newValue": "",

 "newValueJson": {

     "cache_invalidate_on_update": false,

     "cache_ttl": 0,

     "collect_logs": true,

     "id": "test",

     "rate_limiting_interval": 0,

     "rate_limiting_limit": 0,

     "rate_limiting_technique": "fixed"

 },

 "oldValue": "",

 "oldValueJson": {},

 "owner": {

     "id": "1234d848c0b9e484dfc37ec392b5fa8a"

 },

 "resource": {

     "id": "89303df8-1234-4cfa-a0f8-0bd848e831ca",

     "type": "ai_gateway.gateway"

 },

 "when": "2024-07-17T14:06:11.425Z"

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/reference/audit-logs/#page","headline":"Audit logs · Cloudflare AI Gateway docs","description":"View audit log entries for AI Gateway configuration changes such as gateway creation, deletion, and updates.","url":"https://developers.cloudflare.com/ai-gateway/reference/audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/reference/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/reference/audit-logs/","name":"Audit logs"}}]}
```
