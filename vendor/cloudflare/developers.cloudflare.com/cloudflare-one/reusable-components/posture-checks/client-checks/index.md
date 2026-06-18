---
title: Cloudflare One Client checks
description: Cloudflare One Client checks resources and guides for Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare One Client checks

These device posture checks are performed by the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/). To use this feature, you must [deploy the Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) to your devices and enable the desired posture checks.

## Supported Client modes

* Traffic and DNS mode
* Traffic only mode
* Posture only mode

## Supported operating systems

| Device posture check                                                                                                                        | macOS | Windows | Linux | iOS | Android/ChromeOS |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ------- | ----- | --- | ---------------- |
| [Antivirus](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/antivirus/)                   | ❌     | ✅       | ❌     | ❌   | ❌                |
| [Application check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/application-check/)   | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Carbon Black](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/carbon-black/)             | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Client certificate](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/client-certificate/) | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Device serial numbers](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/corp-device/)     | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Device UUID](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/device-uuid/)               | ❌     | ❌       | ❌     | ✅   | ✅                |
| [Disk encryption](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/disk-encryption/)       | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Domain joined](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/domain-joined/)           | ❌     | ✅       | ❌     | ❌   | ❌                |
| [File check](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/file-check/)                 | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Firewall](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/firewall/)                     | ✅     | ✅       | ❌     | ❌   | ❌                |
| [OS version](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/os-version/)                 | ✅     | ✅       | ✅     | ✅   | ✅                |
| [Require Gateway](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/require-gateway/)       | ✅     | ✅       | ✅     | ✅   | ✅                |
| [Require WARP](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/require-warp/)             | ✅     | ✅       | ✅     | ✅   | ✅                |
| [SentinelOne](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/sentinel-one/)              | ✅     | ✅       | ✅     | ❌   | ❌                |
| [Tanium (legacy)](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/tanium/)                | ✅     | ✅       | ✅     | ❌   | ❌                |

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/#page","headline":"Cloudflare One Client checks · Cloudflare One docs","description":"Cloudflare One Client checks resources and guides for Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/","name":"Posture checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/","name":"Cloudflare One Client checks"}}]}
```
