---
title: Extensions
description: Reference information for Extensions in Browser Isolation.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Extensions

Browser Isolation supports running native Chromium Web Extensions in the remote browser.

When a page is isolated, it runs in a remote browser — not in the user's local browser. Extensions installed locally cannot interact with isolated pages because the page content exists only on the remote side. This capability allows extending tools that require DOM access (the ability to read and modify page content and structure), such as password managers and ad blockers, to isolated pages.

## Install an extension inside the remote browser

### Prerequisite: Isolate Chrome Web Store

Note

This step is not required when browsing via Clientless Web Isolation. You can access the Chrome Web Store at `https://<authdomain>.cloudflareaccess.com/browser/https://chromewebstore.google.com/`.

Installing extensions requires Chrome Web Store isolation. Create an [HTTP policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) to isolate the Chrome Web Store (chromewebstore.google.com).

### Install an extension

1. Go to `https://chromewebstore.google.com/` while isolated.
2. Choose your desired extension.
3. Select **Add to Chrome**. To confirm extension installation, select **Add extension**.

Remote browser extensions are automatically reinstalled across isolated sessions.

## Remove an extension from the remote browser

1. Go to any isolated webpage.
2. Right-click anywhere to open the context menu and select **Show isolation toolbar**.
3. Select the jigsaw icon in the isolation toolbar to open the extension manager.
4. Select the hamburger icon for the desired extension to open the extension controls.
5. Select **Remove from Chromium**. To confirm removal, select **Remove**.

## Useful extensions

### Modify remote browser user agent

[User-Agent Switcher for Chrome ↗](https://chromewebstore.google.com/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg) enables controlling the User Agent sent from the remote browser to an isolated website.

### Control remote browser request headers

[ModHeader ↗](https://chromewebstore.google.com/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj) enables controlling arbitrary request headers sent from the remote browser to an isolated website.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/extensions/#page","headline":"Extensions · Cloudflare One docs","description":"Reference information for Extensions in Browser Isolation.","url":"https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/extensions/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/remote-browser-isolation/","name":"Remote browser isolation"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/remote-browser-isolation/extensions/","name":"Extensions"}}]}
```
