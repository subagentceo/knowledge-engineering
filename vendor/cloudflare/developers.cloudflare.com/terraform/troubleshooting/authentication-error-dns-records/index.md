---
title: 403 Authentication error when creating DNS records
description: Fix the 403 authentication error caused by incorrect zone data source indexing in Terraform.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/terraform/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 403 Authentication error when creating DNS records

When creating DNS records using Terraform, the API returns the following error:

`Error: failed to create DNS record: HTTP status 403: Authentication error (10000)`

This is caused by an error in your code syntax, when you are not using index `[0]` for the zones. Find an example below and a more detailed thread on [GitHub ↗](https://github.com/cloudflare/terraform-provider-cloudflare/issues/913).

Instead of this:

```

zone_id = data.cloudflare_zones.example_com.id


```

Use this:

```

zone_id = data.cloudflare_zones.example_com.zones[0].id`


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/terraform/troubleshooting/authentication-error-dns-records/#page","headline":"403 Authentication error when creating DNS records · Cloudflare Terraform docs","description":"Fix the 403 authentication error caused by incorrect zone data source indexing in Terraform.","url":"https://developers.cloudflare.com/terraform/troubleshooting/authentication-error-dns-records/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/terraform/","name":"Terraform"}},{"@type":"ListItem","position":3,"item":{"@id":"/terraform/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/terraform/troubleshooting/authentication-error-dns-records/","name":"403 Authentication error when creating DNS records"}}]}
```
