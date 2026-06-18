---
title: Domain joined
description: Domain joined in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Domain joined

The Domain Joined device posture attribute ensures that a user is a member of a specific Windows Active Directory domain.

## Prerequisites

* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Cloudflare One Client Checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/).

## Enable the Domain Joined check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks**.
2. Go to **Cloudflare One Client checks** and select **Add a check**.
3. Select **Domain Joined**.
4. Enter a descriptive name for the check.
5. Select your operating system.
6. Enter the domain you want to check for, such as `example.com`.  
Note  
The **Domain** field is case-sensitive. If your domain is `example.com`, entering `Example.com` will fail the posture check.
7. Select **Save**.

Next, go to **Insights** \> **Logs** \> **Posture logs** and verify that the Domain Joined check is returning the expected results.

## Validate the domain value

To check the domain value on your Windows device:

1. Open a PowerShell window.
2. Run the following command:  
PowerShell  
```  
(Get-WmiObject Win32_ComputerSystem).Domain  
```

The command will return the Active Directory domain to which your device belongs.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/domain-joined/#page","headline":"Domain joined · Cloudflare One docs","description":"Domain joined in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/domain-joined/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/","name":"Posture checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/","name":"Cloudflare One Client checks"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/domain-joined/","name":"Domain joined"}}]}
```
