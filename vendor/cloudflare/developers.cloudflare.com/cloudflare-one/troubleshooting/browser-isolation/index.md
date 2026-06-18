---
title: Browser Isolation
description: Browser Isolation for Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Browser Isolation

Review common troubleshooting scenarios for Cloudflare Browser Isolation.

## Connectivity and sessions

### No Browsers Available

If you encounter a `No Browsers Available` alert, please file feedback via the Cloudflare One Client. This error typically indicates a temporary capacity issue in the data center or a connectivity problem between your client and the remote browser.

### Maximum Sessions Reached

This alert appears if your device attempts to establish more than two concurrent remote browser instances. A browser isolation session is shared across all tabs and windows within the same browser (for example, all Chrome tabs share one session). You can use two different browsers (such as Chrome and Firefox) concurrently, but opening a third will trigger this alert. To release a session, close all tabs and windows in one of your local browsers.

## Rendering and performance

### WebGL Rendering Error

Cloudflare Browser Isolation uses Network Vector Rendering (NVR), which does not support WebGL (Web Graphics Library) in all environments. If a website requires WebGL and your device lacks the necessary hardware resources in the virtualized environment, you may see a rendering error.

To resolve this, try enabling software rasterization in your browser:

1. Go to `chrome://flags/#override-software-rendering-list`.
2. Set **Override software rendering list** to _Enabled_.
3. Select **Relaunch**.

### Blank screen on Windows

On Windows devices, Clientless Web Isolation may load with a blank screen if there is a conflict between browser mDNS settings and Windows IGMP configuration.

| IGMPLevel    | WebRTC Anonymization | Result         |
| ------------ | -------------------- | -------------- |
| 0 (disabled) | Enabled / Default    | ❌ Blank screen |
| 0 (disabled) | Disabled             | ✅ Works        |
| 2 (enabled)  | Enabled / Default    | ✅ Works        |

To fix this, either disable **Anonymize local IPs exposed by WebRTC** in your browser flags or ensure `IGMPLevel` is enabled (set to `2`) in your Windows network settings.

### Rendering issues (CSS/Images)

If a website displays incorrectly (for example, broken CSS or missing images), it may indicate that the remote browser is unable to fetch specific resources from the origin server. Check your [Gateway HTTP logs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/troubleshooting/) for any blocked subresources that might be required by the page.

---

## More Browser Isolation resources

For more information, refer to the full Browser Isolation documentation.

[ Browser Isolation troubleshooting ❯ ](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/troubleshooting/) 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/cloudflare-one/troubleshooting/browser-isolation/#page","headline":"Browser Isolation · Cloudflare One docs","description":"Browser Isolation for Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/troubleshooting/browser-isolation/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/troubleshooting/browser-isolation/","name":"Browser Isolation"}}]}
```
