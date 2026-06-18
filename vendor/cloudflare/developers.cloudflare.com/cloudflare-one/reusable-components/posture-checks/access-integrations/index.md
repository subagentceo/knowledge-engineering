---
title: Access integrations
description: Access integrations for Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Access integrations

The following device posture checks do not require the Cloudflare One Client and can only be used in [Cloudflare Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/). They cannot be used in Gateway network policies.

## Supported operating systems

| Device posture check                                                                                                             | macOS | Windows | Linux | iOS | Android/ChromeOS |
| -------------------------------------------------------------------------------------------------------------------------------- | ----- | ------- | ----- | --- | ---------------- |
| [Microsoft Entra ID Conditional Access](https://developers.cloudflare.com/cloudflare-one/tutorials/entra-id-conditional-access/) | ✅     | ✅       | ❌     | ❌   | ❌                |
| [Mutual TLS](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/)    | ✅     | ✅       | ✅     | ✅   | ✅                |

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/access-integrations/#page","headline":"Access integrations · Cloudflare One docs","description":"Access integrations for Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/access-integrations/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/","name":"Posture checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/access-integrations/","name":"Access integrations"}}]}
```
