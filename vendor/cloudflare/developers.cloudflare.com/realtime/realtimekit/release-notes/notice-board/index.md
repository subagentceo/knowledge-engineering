---
title: Notices
description: Important notices and announcements for the RealtimeKit platform.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Notices

[ Subscribe to RSS ](https://developers.cloudflare.com/realtime/realtimekit/release-notes/notice-board/index.xml)

## 2026-01-30

**Chat Pagination Overhaul**

**Affected SDKs:** Web Core SDK 1.2.4+ and Web UI Kit 1.0.9+ (Angular/React/Web Components)

To streamline RealtimeKit SDK offerings, non-operational chat channel APIs have been removed. If you have a custom chat implementation using lower-level components instead of `rtk-chat`, please review the release notes thoroughly and test your implementation after upgrading.

## 2025-11-21

**Support for legacy media engine has been removed**

**Affected SDKs:** Web Core SDK 1.2.0+ (Angular/React/Web Components)

Legacy media engine support has been removed. 

If your organization was created before March 1, 2025 and you are upgrading to `1.2.0` or above, you may experience recording issues.

Please contact support to migrate you to the new Cloudflare SFU media engine to ensure continued recording functionality.

## 2025-11-21

**Update on meeting join issues in firefox 144+**

**Affected SDKs:** Web Core SDK < 1.2.0 (Angular/React/Web Components)

In firefox 144+, users were not able to join the meetings, due to the browser's datachannel behavior change.

Error: `x.data.arrayBuffer is not a function`

Please upgrade to atleast `v1.2.0` to fix this. It is advised to periodically upgrade the SDKs.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/notice-board/#page","headline":"Notices · Cloudflare Realtime docs","description":"Important notices and announcements for the RealtimeKit platform.","url":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/notice-board/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/release-notes/","name":"Release Notes"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/release-notes/notice-board/","name":"Notices"}}]}
```
