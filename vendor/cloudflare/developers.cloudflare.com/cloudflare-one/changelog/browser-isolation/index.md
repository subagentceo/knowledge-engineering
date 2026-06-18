---
title: Browser Isolation
description: Review recent changes to Cloudflare Browser Isolation.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Browser Isolation

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/browser-isolation.xml) 

## 2026-04-10

  
**Canvas Remoting optimizes performance for productivity applications**   

Remote Browser Isolation now supports **Canvas Remoting**, improving performance for HTML5 Canvas applications by sending vector draw commands instead of rasterized bitmaps.

#### Key improvements

* **10x bandwidth reduction:** Microsoft Word and other Office apps use 90% less bandwidth
* **Smooth performance:** Google Sheets maintains consistent 30fps rendering
* **Responsive terminals:** Web-based development environments and AI notebooks work in real-time
* **Zero configuration:** Enabled by default for all Browser Isolation customers

#### How it works

Instead of sending rasterized bitmaps for every Canvas update, Browser Isolation now:

1. Captures Canvas draw commands at the source
2. Converts them to lightweight vector instructions
3. Renders Canvas content on the client

This reduces bandwidth from hundreds of kilobytes per second to tens of kilobytes per second.

#### Managing Canvas Remoting

To temporarily disable for troubleshooting:

* Right-click the isolated webpage background
* Select **Disable Canvas Remoting**
* Re-enable the same way by selecting **Enable Canvas Remoting**

#### Limitations

Currently supports 2D Canvas contexts only. WebGL and 3D graphics applications continue using bitmap rendering. For more information, refer to [Canvas Remoting](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/canvas-remoting/).

## 2025-05-13

  
**SAML HTTP-POST bindings support for RBI**   

Remote Browser Isolation (RBI) now supports SAML HTTP-POST bindings, enabling seamless authentication for SSO-enabled applications that rely on POST-based SAML responses from Identity Providers (IdPs) within a Remote Browser Isolation session. This update resolves a previous limitation that caused `405` errors during login and improves compatibility with multi-factor authentication (MFA) flows.

With expanded support for major IdPs like Okta and Azure AD, this enhancement delivers a more consistent and user-friendly experience across authentication workflows. Learn how to [set up Remote Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/).

## 2025-05-01

  
**Browser Isolation Overview page for Zero Trust**   

A new **Browser Isolation Overview** page is now available in the Cloudflare Zero Trust dashboard. This centralized view simplifies the management of [Remote Browser Isolation (RBI)](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) deployments, providing:

* **Streamlined Onboarding:** Easily set up and manage isolation policies from one location.
* **Quick Testing:** Validate [clientless web application isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/setup/clientless-browser-isolation/) with ease.
* **Simplified Configuration:** Configure [isolated access applications](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/isolate-application/) and policies efficiently.
* **Centralized Monitoring:** Track aggregate usage and blocked actions.

This update consolidates previously disparate settings, accelerating deployment, improving visibility into isolation activity, and making it easier to ensure your protections are working effectively.

![Browser Isolation Overview](https://developers.cloudflare.com/_astro/browser-isolation-overview.Ljd5ax_O_Z1SURww.webp) 

To access the new overview, log in to your Cloudflare [Zero Trust dashboard ↗](https://one.dash.cloudflare.com/) and find Browser Isolation in the side navigation bar.

## 2025-03-04

  
**Gain visibility into user actions in Zero Trust Browser Isolation sessions**   

We're excited to announce that new logging capabilities for [Remote Browser Isolation (RBI)](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/) through [Logpush](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/account/) are available in Beta starting today!

With these enhanced logs, administrators can gain visibility into end user behavior in the remote browser and track blocked data extraction attempts, along with the websites that triggered them, in an isolated session.

```

{

  "AccountID": "$ACCOUNT_ID",

  "Decision": "block",

  "DomainName": "www.example.com",

  "Timestamp": "2025-02-27T23:15:06Z",

  "Type": "copy",

  "UserID": "$USER_ID"

}


```

User Actions available:

* **Copy & Paste**
* **Downloads & Uploads**
* **Printing**

Learn more about how to get started with Logpush in our [documentation](https://developers.cloudflare.com/logs/logpush/).

## 2024-11-21

  
**Improved non-English keyboard support**   

You can now type in languages that use diacritics (like á or ç) and character-based scripts (such as Chinese, Japanese, and Korean) directly within the remote browser. The isolated browser now properly recognizes non-English keyboard input, eliminating the need to copy and paste content from a local browser or device.

## 2024-03-21

**Removed third-party cookie dependencies**

Removed dependency on third-party cookies in the isolated browser, fixing an issue that previously caused intermittent disruptions for users maintaining multi-site, cross-tab sessions in the isolated browser.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/cloudflare-one/changelog/browser-isolation/#page","headline":"Browser Isolation Changelog · Cloudflare One docs","description":"Review recent changes to Cloudflare Browser Isolation.","url":"https://developers.cloudflare.com/cloudflare-one/changelog/browser-isolation/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/changelog/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/changelog/browser-isolation/","name":"Browser Isolation"}}]}
```
