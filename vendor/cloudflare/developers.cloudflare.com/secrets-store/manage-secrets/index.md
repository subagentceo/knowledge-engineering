---
title: Manage account secrets
description: Learn about different operations to manage your secrets in Cloudflare Secrets Store.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/secrets-store/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage account secrets

Secrets can be API tokens, public/private keys, authorization keys, passwords, or even code variables. The only limitation is that a secret must be a string that does not exceed 1024 bytes.

Once a secret is added to the Secrets Store, it can no longer be decrypted or accessed via API or on the dashboard. Only the service associated with a given secret will be able to access it.

## Limits

Customers who create a secrets store in the open beta can have up to 100 secrets per account. Also, there can only be one store per account.

Production secrets

If you use [Wrangler](https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/#manage-via-wrangler), there is a difference between production secrets and secrets that are only created locally (without the `--remote` flag). The limit of 100 secrets per account only considers production secrets.

## Resources

* [Manage via Wrangler](https://developers.cloudflare.com/workers/wrangler/commands/secrets-store/#secrets-store-secret)
* [Create a secret](https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/#create-a-secret)
* [Duplicate a secret](https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/#duplicate-a-secret)
* [Edit a secret](https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/#edit-a-secret)
* [Delete a secret](https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/#delete-a-secret)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/secrets-store/manage-secrets/#page","headline":"Manage account secrets · Cloudflare Secrets Store docs","description":"Learn about different operations to manage your secrets in Cloudflare Secrets Store.","url":"https://developers.cloudflare.com/secrets-store/manage-secrets/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/secrets-store/","name":"Secrets Store"}},{"@type":"ListItem","position":3,"item":{"@id":"/secrets-store/manage-secrets/","name":"Manage account secrets"}}]}
```
