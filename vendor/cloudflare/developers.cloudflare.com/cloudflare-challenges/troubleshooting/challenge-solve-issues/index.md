---
title: Challenge solve issues
description: Fix challenge loops, unsupported browser errors, and other solve failures.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Challenge solve issues

## Challenge loops

You may encounter a challenge loop where the challenge keeps reappearing without being solved. This is in very specific cases where we detect strong bot signals. If you are a legitimate human, you can follow the troubleshooting guide below to resolve the issue or submit a feedback report. Challenge loops can happen for several reasons:

* **Network issues**: Poor or unstable network connections can prevent the challenge from being completed.
* **Browser configuration**: Some browser settings or extensions may block the scripts needed to execute the challenge.
* **Unsupported browsers**: Using a browser that is not supported by Turnstile.
* **JavaScript disabled**: Turnstile relies on JavaScript to function properly.
* **Detection errors**: If Turnstile suspects bot-like behavior, you may encounter repeated challenges for verification.

Most challenges are quick to complete and typically take only a few seconds. If it takes longer, ensure your network is stable and follow the [troubleshooting steps](#troubleshooting).

Note

If the issue persists, try switching to a different network or device to rule out any issues with your browser environment.

Ensure your browser is updated to the latest version to maintain compatibility.

## Troubleshooting

Follow the steps below to ensure that your environment is properly configured.

1. Verify your browser compatibility.  
   * Turnstile supports all major browsers, except Internet Explorer.  
   * Ensure your browser is up to date. For more information, refer to our [Supported browsers](https://developers.cloudflare.com/cloudflare-challenges/reference/supported-browsers/).  
   * Run a test on the [compatibility checking tool ↗](https://browser-compat.turnstile.workers.dev/).
2. Disable your browser extensions.  
   * Some browser extensions, such as ad blockers, may block the scripts Turnstile needs to operate.  
   * Temporarily disable all extensions and reload the page.
3. Enable JavaScript.  
   * Turnstile requires JavaScript to run. Ensure it is enabled in your browser settings. Refer to your browser's documentation for instructions on enabling JavaScript.
4. Try Incognito or Private mode.  
   * Use your browser's incognito or private mode to rule out issues caused by extensions or cached data.
5. Test another browser or device.  
   * Switch to a different browser or device to see if the issue is specific to your current setup.
6. Avoid VPNs or proxies.  
   * Some virtual private networks (VPN) or proxies may interfere with Turnstile. Disable them temporarily to test.
7. Switch to a different network.  
   * Your current network may have restrictions causing Turnstile challenges to fail. Try switching to another network, such as a mobile hotspot.

If none of the above resolves your issue, contact the website administrator with the [error code](https://developers.cloudflare.com/turnstile/troubleshooting/client-side-errors/error-codes/) and Ray ID or submit a [feedback report](https://developers.cloudflare.com/turnstile/troubleshooting/feedback-reports/) through the Turnstile widget by selecting **Submit Feedback**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-challenges/troubleshooting/challenge-solve-issues/#page","headline":"Challenge solve issues · Cloudflare challenges docs","description":"Fix challenge loops, unsupported browser errors, and other solve failures.","url":"https://developers.cloudflare.com/cloudflare-challenges/troubleshooting/challenge-solve-issues/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-challenges/","name":"Challenges"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-challenges/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-challenges/troubleshooting/challenge-solve-issues/","name":"Challenge solve issues"}}]}
```
