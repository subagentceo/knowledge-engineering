---
title: Service providers
description: Service providers resources and guides for Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Service providers

Service-to-service integrations allow the Cloudflare One Client to get device posture data from a third-party API. To use this feature, you must [deploy the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) to your devices and enable the desired posture checks.

## Supported Client modes

* Traffic and DNS mode
* Traffic only mode
* Posture only mode

## Supported operating systems

| Device posture check                                                                                                     | macOS | Windows | Linux | iOS | Android/ChromeOS |
| ------------------------------------------------------------------------------------------------------------------------ | ----- | ------- | ----- | --- | ---------------- |
| [Custom integration](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/custom/)            | ✅     | ✅       | ✅     | ✅   | ✅                |
| [Crowdstrike](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/crowdstrike/)              | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Kolide](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/kolide/)                        | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Microsoft Endpoint Manager](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/microsoft/) | ✅     | ✅       | ✅     | ❌   | ❌                |
| [SentinelOne](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/sentinelone/)              | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Tanium](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/taniums2s/)                     | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Uptycs](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/uptycs/)                        | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Workspace ONE](https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/workspace-one/)          | ✅     | ✅       | ✅     | ❌   | ❌                |

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/#page","headline":"Service providers · Cloudflare One docs","description":"Service providers resources and guides for Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/service-providers/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/service-providers/","name":"Service providers"}}]}
```
