---
title: Audit logs
description: Actions logged for Secrets Store operations, including create, update, and delete.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/secrets-store/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Audit logs

[Audit logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/) provide a comprehensive summary of changes made within your Cloudflare account. This page lists the actions that are logged for Secrets Store.

* Access
* Create  
   * Duplicating a secret is presented as a `create` log with a field `duplicated_from_id`.
* Update  
   * A boolean `"value_modified": true` is presented when the secret value is edited.
* Delete

For information on how to access and use audit logs, refer to [Fundamentals](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/secrets-store/audit-logs/#page","headline":"Audit logs · Cloudflare Secrets Store docs","description":"Actions logged for Secrets Store operations, including create, update, and delete.","url":"https://developers.cloudflare.com/secrets-store/audit-logs/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/secrets-store/","name":"Secrets Store"}},{"@type":"ListItem","position":3,"item":{"@id":"/secrets-store/audit-logs/","name":"Audit logs"}}]}
```
