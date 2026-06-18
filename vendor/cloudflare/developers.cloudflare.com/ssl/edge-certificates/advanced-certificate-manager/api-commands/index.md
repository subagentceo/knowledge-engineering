---
title: API commands
description: API commands for managing advanced certificates.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# API commands

Use the following API commands to manage advanced certificates. If you are using our API for the first time, review our [API documentation](https://developers.cloudflare.com/fundamentals/api/).

| Command                                                                                                                                                                                       | Method | Endpoint                                             | Additional notes                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| [Order advanced certificate](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/create/)                                                            | POST   | zones/<<ZONE\_ID>>/ssl/certificate\_packs/order      |                                                                                             |
| [Restart certificate validation](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/edit/)                                                          | PATCH  | zones/<<ZONE\_ID>>/ssl/certificate\_packs/<<ID>>     | For a Certificate Pack in a validation\_timed\_out status.                                  |
| [Delete certificate pack](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/delete/)                                                               | DELETE | zones/<<ZONE\_ID>>/ssl/certificate\_packs/<<ID>>     |                                                                                             |
| [List certificate packs in a zone](https://developers.cloudflare.com/api/resources/ssl/subresources/certificate%5Fpacks/methods/list/)                                                        | GET    | zones/<<ZONE\_ID>>/ssl/certificate\_packs?status=all | This API call returns all certificate packs for a domain (Universal, Custom, and Advanced). |
| List Cipher Suite settings: [Get zone setting](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/get/) with ciphers as the setting name in the URI path     | GET    | zones/<<ZONE\_ID>>/settings/ciphers                  |                                                                                             |
| Change Cipher Suite settings: [Edit zone setting](https://developers.cloudflare.com/api/resources/zones/subresources/settings/methods/edit/) with ciphers as the setting name in the URI path | PATCH  | zones/<<ZONE\_ID>>/settings/ciphers                  | To restore default settings, send a blank array in the value parameter.                     |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/api-commands/#page","headline":"API commands · Cloudflare SSL/TLS docs","description":"API commands for managing advanced certificates.","url":"https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/api-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/advanced-certificate-manager/","name":"Advanced certificates"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/advanced-certificate-manager/api-commands/","name":"API commands"}}]}
```
