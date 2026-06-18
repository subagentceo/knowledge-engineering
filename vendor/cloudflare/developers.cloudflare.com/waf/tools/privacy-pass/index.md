---
title: Privacy Pass
description: Allow Privacy Pass token holders to bypass challenges.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Privacy Pass

[Privacy Pass ↗](https://datatracker.ietf.org/wg/privacypass/about/) specifies an extensible protocol for creating and redeeming anonymous and transferable tokens. Its specification is maintained by the IETF. Cloudflare provides "Silk - Privacy Pass Client". This is a Chrome and Firefox browser extension used for research, which provides a better visitor experience for Cloudflare-protected websites. Privacy Pass is especially helpful for visitors from shared networks, VPNs, and Tor that tend to have poorer IP reputations.

For instance, a visitor IP address with poor reputation may receive a Cloudflare challenge page before gaining access to a Cloudflare-protected website. Privacy Pass allows the visitor to solve a challenge with or without interaction, depending on the device. Solving this challenge is coordinated with a third party attester in such a way that Cloudflare does not see the attestation method or the interaction, preserving visitors' privacy while maintaining a high level of security.

---

## Set up Privacy Pass

### For your end users

Your end users should download the Privacy Pass extension for either Google Chrome or Firefox:

* [Chrome extension ↗](https://chrome.google.com/webstore/detail/privacy-pass/ajhmfdgkijocedmfjonnpjfojldioehi)
* [Firefox extension ↗](https://addons.mozilla.org/en-US/firefox/addon/privacy-pass/)

The Privacy Pass code is [available on GitHub ↗](https://github.com/cloudflare/pp-browser-extension). You can report any issues in this repository.

---

## Support for Privacy Pass v1 (legacy)

In 2017 Cloudflare [announced support ↗](https://blog.cloudflare.com/cloudflare-supports-privacy-pass/) for Privacy Pass, a recent protocol to let users prove their identity across multiple sites anonymously without enabling tracking. The initial use case was to provide untraceable tokens to sites to vouch for users who might otherwise have been presented with a CAPTCHA challenge. In the time since this release, Privacy Pass has evolved both at the [IETF ↗](https://datatracker.ietf.org/wg/privacypass/documents/) and within Cloudflare. The version announced in 2017 is now considered legacy, and these legacy Privacy Pass tokens are no longer supported as an alternative to Cloudflare challenges. As has been discussed on our blog [The end road for CAPTCHA ↗](https://blog.cloudflare.com/end-cloudflare-captcha/), Cloudflare uses a variety of signals to infer if incoming traffic is likely automated. The (legacy) Privacy Pass zone setting is no longer meaningful to Cloudflare customers as Cloudflare now operates [CAPTCHA free ↗](https://blog.cloudflare.com/turnstile-ga/), and supports the latest [Privacy Pass draft ↗](https://blog.cloudflare.com/eliminating-captchas-on-iphones-and-macs-using-new-standard/).

In September 2023, Cloudflare removed support for Privacy Pass v1 (legacy) tokens as an alternative to Cloudflare managed challenges, and in March 2024 the current public-facing API was removed.

The full deprecation notice for the first version of Privacy Pass is available on the [API deprecations](https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2024-03-31) page.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/privacy-pass/#page","headline":"Privacy Pass · Cloudflare Web Application Firewall (WAF) docs","description":"Allow Privacy Pass token holders to bypass challenges.","url":"https://developers.cloudflare.com/waf/tools/privacy-pass/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Privacy"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/privacy-pass/","name":"Privacy Pass"}}]}
```
