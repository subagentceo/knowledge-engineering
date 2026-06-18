---
title: Token formats
description: Scannable API credential formats and leaked token detection.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Token formats

Cloudflare API credentials use a prefixed, scannable format that makes them identifiable by credential scanning tools. Each credential type has a distinct prefix followed by 40 characters and a checksum.

| Credential type   | Description                                             | Format                              |
| ----------------- | ------------------------------------------------------- | ----------------------------------- |
| Global API Key    | Global key tied to your user account (full access)      | cfk\_\[40 characters\]\[checksum\]  |
| User API Token    | Scoped token you create for specific permissions        | cfut\_\[40 characters\]\[checksum\] |
| Account API Token | Token owned by the account, not tied to a specific user | cfat\_\[40 characters\]\[checksum\] |

Existing tokens continue to work. Every new token you create or [roll](https://developers.cloudflare.com/fundamentals/api/how-to/roll-token/) uses the scannable format automatically.

## Leaked token detection

The prefixed format and checksum allow credential scanning tools to detect leaked Cloudflare tokens with high confidence. Cloudflare partners with credential scanning providers to proactively find your leaked tokens and revoke them before they can be used maliciously.

### GitHub Secret Scanning

Cloudflare participates in [GitHub's Secret Scanning program ↗](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning). GitHub scans every commit for Cloudflare API credentials in both public and private repositories.

* **Public repositories** — When GitHub detects a leaked Cloudflare token, it verifies the token using the checksum and sends Cloudflare a webhook. Cloudflare automatically revokes the token and notifies you by email so you can generate a replacement.
* **Private repositories** — GitHub notifies you about any leaked Cloudflare tokens so you can rotate them.

## Pre-2026 formats

Tokens created before the scannable format was introduced use unprefixed strings. These tokens continue to work. Cloudflare scans for and revokes leaked tokens in both the old and new formats.

| Credential type   | Old format                           |
| ----------------- | ------------------------------------ |
| Global API Key    | 37–45 character lowercase hex string |
| User API Token    | 40-character alphanumeric string     |
| Account API Token | 40-character alphanumeric string     |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/get-started/token-formats/#page","headline":"Token formats · Cloudflare Fundamentals docs","description":"Scannable API credential formats and leaked token detection.","url":"https://developers.cloudflare.com/fundamentals/api/get-started/token-formats/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/api/","name":"Cloudflare's API"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/api/get-started/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/api/get-started/token-formats/","name":"Token formats"}}]}
```
