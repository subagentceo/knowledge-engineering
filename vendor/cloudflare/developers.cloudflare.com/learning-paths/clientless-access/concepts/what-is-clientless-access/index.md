---
title: What is clientless access?
description: Understand secure browser-based access without software.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# What is clientless access?

Clientless access is a deployment option of a [Zero Trust Network Access (ZTNA) ↗](https://www.cloudflare.com/learning/access-management/what-is-ztna/) service that provides secure access to internal applications without requiring end users to install any software. Users access corporate resources like intranet web apps, SSH terminals, and Windows servers through RDP from their web browser. Clientless access is commonly used to provide internal, [least-privilege access ↗](https://www.cloudflare.com/learning/access-management/principle-of-least-privilege/) to users on unmanaged devices. Users may include third-party contractors, suppliers, and partners, or employees using personal mobile phones as part of an organization's bring-your-own-device (BYOD) policy.

IT/security admins can decide how users authenticate, whether through their corporate identity provider, social media accounts, a PIN sent to their email, strong MFA, or a combination of options. Admins can also add inline services like Remote Browser Isolation (RBI) and Data Loss Prevention (DLP) to help prevent data exfiltration from unmanaged devices, still through a clientless implementation. Isolated apps can enforce broad data controls through the browser, such as preventing uploads/downloads or copy/paste, or incorporating DLP policies.

## Alternatives to clientless access

### Device client

A device client enables additional capabilities for a ZTNA deployment, like adding full device posture checks to policy evaluations or providing access to private network resources on private hostnames. However, when extending access to third-party or temporary workers, some organizations are reluctant to buy and ship company-managed devices or onboard clients to users' personal devices. Some IT or security teams may have rigorous device compatibility, interoperability, or other software audit processes that could delay user onboarding for a ZTNA rollout. Contractors may also not allow external company software to be installed on their personal devices, whether a legacy VPN or a more modern software client.

### Identity provider workarounds

Some organizations historically have created corporate identities for third-party users within their internal identity provider, or they have spent the time to integrate a third-party's external identity provider with their own. Time and complexity for this work aside, not all resources integrate directly with traditional identity and access management (IAM) products, so a tool like ZTNA can still be needed to aggregate access logistics more broadly across an organization's internal resources.

### Enterprise browsers

Enterprise browsers are another tool sparking interest in the industry for hybrid work and internal access use cases. They aim to consolidate security features and provide similar unified access and data protection to resources, all through a managed browser. However, some users may not want to disrupt their preferred workflows through their existing browser(s), and some third parties may still not wish to install any external software including the managed browser.

## Why Cloudflare for clientless access

One of the biggest challenges in delivering clientless, secure remote access is making it feel native for your end users. Solutions have existed for decades which operate in a way that breaks TLS on a firewall or creates a picture-in-a-picture to access an internal web service. These legacy solutions make it very difficult to apply traditional web security concepts to private apps.

In contrast, Cloudflare is a leading [reverse proxy ↗](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/) provider for public-facing web assets, proxying approximately [20% of all websites ↗](https://w3techs.com/technologies/overview/proxy). Together with our [SASE platform](https://developers.cloudflare.com/reference-architecture/architectures/sase/), this establishes a unique position for Cloudflare to deliver performant browser-based security for both public and private resources. There is no additional overhead in implementation, management, ongoing updates, or routing.

Clientless access accelerates user onboarding for your admins, and it makes private apps feel just like SaaS apps for your end users. Many organizations roll out clientless access use cases toward the start of their larger SASE architecture journey as a “quick win” to develop momentum for a longer [VPN replacement](https://developers.cloudflare.com/learning-paths/replace-vpn/concepts/) project or security modernization initiative.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/concepts/what-is-clientless-access/#page","headline":"What is clientless access? · Cloudflare Learning Paths","description":"Understand secure browser-based access without software.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/concepts/what-is-clientless-access/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/concepts/what-is-clientless-access/","name":"What is clientless access?"}}]}
```
