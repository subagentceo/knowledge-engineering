---
title: Log the payload of matched rules
description: Log the request content that triggered a managed ruleset match.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Log the payload of matched rules

The WAF allows you to log the request information that triggered a specific rule of a managed ruleset. This information is known as the payload. Payload information includes the specific string that triggered the rule, along with the text that appears immediately before and after the match.

Payload logging is especially useful when diagnosing the behavior of WAF rules. Since the values that triggered a rule may contain sensitive data, they are encrypted with a customer-provided public key so that only you can examine them later.

Note

This feature is only available for customers on an Enterprise plan.

## Turn on payload logging

Each managed ruleset has its own payload logging configuration. To turn on payload logging, configure a public key to encrypt the logged payload by doing one of the following:

* Generate a key pair directly in the Cloudflare dashboard
* Use your own public key

Once enabled, the WAF saves the payload of rule matches for the managed ruleset configured with payload logging, encrypting the payload with your public key. If multiple rules checking the same request field match (for example, for the field `http.cookie`), the logged payload for that field will refer to the last matched rule.

For more information, refer to [Configure payload logging in the dashboard](https://developers.cloudflare.com/waf/managed-rules/payload-logging/configure/) or [Configure payload logging via API](https://developers.cloudflare.com/waf/managed-rules/payload-logging/configure-api/).

Important

When you generate a key pair in the dashboard, Cloudflare will only save the generated public key, not the private key. You must store your private key safely.

## View payload content

To view the content of the payload in clear text, do one of the following:

* In the [Security Events](https://developers.cloudflare.com/waf/analytics/security-events/) page, enter your private key to decrypt the payload of a log entry directly in the browser. Refer to [View the payload content in the dashboard](https://developers.cloudflare.com/waf/managed-rules/payload-logging/view/) for details.
* Decrypt the payload in the command line using the `matched-data-cli` tool. Refer to [Decrypt the payload content in the command line](https://developers.cloudflare.com/waf/managed-rules/payload-logging/command-line/decrypt-payload/) for details.
* Decrypt the matched payload in your [Logpush](https://developers.cloudflare.com/logs/logpush/) job using a Worker before storing the logs in your SIEM system. Refer to [Store decrypted matched payloads in logs](https://developers.cloudflare.com/waf/managed-rules/payload-logging/decrypt-in-logs/) for details.

Important

All Cloudflare logs are encrypted at rest. Encrypting the payload content adds a second layer of encryption for the matched values that triggered a rule.

Make sure you store your private key safely. If you lose the private key, configure payload logging with a new public key. The payload of new requests will be encrypted with the new public key.

Cloudflare cannot decrypt encrypted payloads, since this operation requires your private key. Cloudflare staff will never ask for the private key.

## User role requirements

Only users with the [Super Administrator role](https://developers.cloudflare.com/fundamentals/manage-members/roles/) can enable payload logging or edit the payload logging configuration.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/#page","headline":"Log the payload of matched rules · Cloudflare Web Application Firewall (WAF) docs","description":"Log the request content that triggered a managed ruleset match.","url":"https://developers.cloudflare.com/waf/managed-rules/payload-logging/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/managed-rules/","name":"Managed Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/managed-rules/payload-logging/","name":"Log the payload of matched rules"}}]}
```
