---
title: Firewall
description: Firewall in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Firewall

The Firewall device posture attribute ensures that a firewall is running on a device.

## Prerequisites

* Cloudflare One Client is [deployed](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/) on the device. For a list of supported modes and operating systems, refer to [Cloudflare One Client Checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/).

## Enable the firewall check

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Posture checks**.
2. Go to **Cloudflare One Client checks** and select **Add a check**.
3. Select **Firewall**.
4. Enter a descriptive name for the check.
5. Select your operating system.
6. Configure **Enable firewall check** based on your desired security policy:  
   * **Enabled**: (Recommended) The posture check passes only if the firewall is running.  
   * **Disabled**: The posture check passes only if the firewall is turned off.  
Note  
The **Enable firewall check** toggle does not turn the posture check on or off; rather, the toggle determines whether the Cloudflare One Client looks for an active or inactive firewall.
7. Select **Save**.

Next, go to **Insights** \> **Logs** \> **Posture logs** and verify that the firewall check is returning the expected results.

## Validate firewall status

Operating systems determine firewall configuration in various ways. Follow the steps below to understand how the Cloudflare One Client determines if the firewall is enabled.

### On macOS

macOS has two firewalls: an application-based firewall and a port-based firewall. The Cloudflare One Client will report a firewall is enabled if either firewall is running.

#### Application-based firewall

1. Open **System Settings** and go to **Network**.
2. Verify that **Firewall** is `Active`.

#### Port-based firewall

1. Open Terminal and run:  
Terminal window  
```  
sudo /sbin/pfctl -s info  
```
2. Verify that **Status** is `Enabled`.

### On Windows

1. Open PowerShell and run:  
PowerShell  
```  
Get-NetFirewallProfile -PolicyStore ActiveStore -Name Public  
```
2. Verify that **Enabled** is `True`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/firewall/#page","headline":"Firewall · Cloudflare One docs","description":"Firewall in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/client-checks/firewall/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Posture"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/reusable-components/","name":"Reusable components"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/","name":"Posture checks"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/","name":"Cloudflare One Client checks"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/reusable-components/posture-checks/client-checks/firewall/","name":"Firewall"}}]}
```
