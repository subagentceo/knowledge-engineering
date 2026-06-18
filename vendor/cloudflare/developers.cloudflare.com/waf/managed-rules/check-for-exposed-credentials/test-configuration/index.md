---
title: Test your exposed credentials checks configuration
description: Test your exposed credentials check configuration.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Test your exposed credentials checks configuration

Deprecation notice

Exposed credentials check has been deprecated.

Switch from exposed credentials check to [leaked credentials detection](https://developers.cloudflare.com/waf/detections/leaked-credentials/) for improved security. To upgrade your current configuration, refer to the [upgrade guide](https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/upgrade-to-leaked-credentials-detection/).

After enabling and configuring exposed credentials checks, you may want to test if the checks are working properly.

Cloudflare provides a special set of case-sensitive credentials for this purpose:

* Login: `CF_EXPOSED_USERNAME` or `CF_EXPOSED_USERNAME@example.com`
* Password: `CF_EXPOSED_PASSWORD`

The WAF always considers these specific credentials as having been previously exposed. Use them to force an "exposed credentials" event, which allows you to check the behavior of your current configuration.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/test-configuration/#page","headline":"Test your exposed credentials checks configuration · Cloudflare Web Application Firewall (WAF) docs","description":"Test your exposed credentials check configuration.","url":"https://developers.cloudflare.com/waf/managed-rules/check-for-exposed-credentials/test-configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/check-for-exposed-credentials/","name":"Check for exposed credentials"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/managed-rules/check-for-exposed-credentials/test-configuration/","name":"Test your exposed credentials checks configuration"}}]}
```
