---
title: Carbon Black
description: Carbon Black in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Carbon Black

Cloudflare One can check if [Carbon Black ↗](https://www.carbonblack.com/) is running on a device to determine if a request should be allowed to reach a protected resource.

## Prerequisites

* Carbon Black agent is deployed on the device.
* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Cloudflare One Client Checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/).

## Configure the Carbon Black check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks**.
2. Go to **Cloudflare One Client checks** and select **Add a check**.
3. Select **Carbon Black**.
4. You will be prompted for the following information:  
   1. **Name**: Enter a unique name for this device posture check.  
   2. **Operating system**: Select your operating system. You will need to configure one posture check per operating system (macOS and Windows currently supported).  
   3. **Application Path**: Enter the full path to the Carbon Black process to be checked (for example, `c:\program files\CarbonBlack\CarbonBlack.exe`).  
   4. **Signing certificate thumbprint (recommended)**: Enter the thumbprint of the publishing certificate used to sign the binary. This proves the binary came from Carbon Black and is the recommended way to validate the process.  
   5. **SHA-256 (optional)**: Enter a SHA-256 value. This is used to validate the SHA256 signature of the binary and ensures the integrity of the binary file on the device. Note: do not fill out this field unless you strictly control updates to Carbon Black, as this will change between versions.

Next, go to **Insights** \> **Logs** \> **Posture logs** and verify that the Carbon Black check is returning the expected results.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/carbon-black/#page","headline":"Carbon Black · Cloudflare One docs","description":"Carbon Black in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/carbon-black/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/","name":"Posture checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/","name":"Cloudflare One Client checks"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/carbon-black/","name":"Carbon Black"}}]}
```
