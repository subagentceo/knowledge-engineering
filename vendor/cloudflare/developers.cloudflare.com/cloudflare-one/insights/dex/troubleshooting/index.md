---
title: Troubleshoot Digital Experience Monitoring
description: Resolve common issues with Digital Experience Monitoring (DEX), including data visibility problems and remote capture failures.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshoot Digital Experience Monitoring

Review common troubleshooting scenarios for Digital Experience Monitoring (DEX).

## Data visibility

### No data displayed for certain users

If you do not see DEX data for specific users in your organization, verify the following:

* **Client version**: Ensure the users are running a version of the Cloudflare One Client that supports DEX.
* **DEX enabled**: Confirm that DEX is enabled for the [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) assigned to those users.
* **Traffic routing**: DEX requires that traffic to Cloudflare's orchestration API is not blocked by local firewalls or SSL-inspecting proxies.

### Fleet status not updating

The Fleet status dashboard can take several minutes to reflect changes in device connectivity. If a device remains in an incorrect state, try disconnecting and reconnecting the Cloudflare One Client to force a status update.

## Remote captures

### Remote capture fails to start

Remote captures require the Cloudflare One Client to be connected and able to communicate with the Cloudflare control plane. If a capture fails to start:

* Verify the device status in the Zero Trust dashboard.
* Ensure the device has sufficient disk space to store the capture files before upload.
* Check for any local firewall rules that might be blocking the capture command.

---

## How to contact Support

If you cannot resolve the issue, [open a support case](https://developers.cloudflare.com/support/contacting-cloudflare-support/). Please provide a [remote capture](https://developers.cloudflare.com/cloudflare-one/insights/dex/diagnostics/client-packet-capture/) from the Zero Trust dashboard for the affected device.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/insights/dex/troubleshooting/#page","headline":"Troubleshoot Digital Experience Monitoring · Cloudflare One docs","description":"Resolve common issues with Digital Experience Monitoring (DEX), including data visibility problems and remote capture failures.","url":"https://developers.cloudflare.com/cloudflare-one/insights/dex/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/insights/","name":"Insights"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/insights/dex/","name":"Digital experience"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/insights/dex/troubleshooting/","name":"Troubleshoot Digital Experience Monitoring"}}]}
```
