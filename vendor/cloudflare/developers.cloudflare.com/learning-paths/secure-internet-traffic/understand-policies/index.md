---
title: Understand and streamline policy creation
description: Secure Internet traffic and SaaS apps.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Understand and streamline policy creation

Before you begin building security policies, there are a few key details about Gateway to review.

The next few modules will cover the breadth of types of policies and actions that can be accomplished by sending traffic through the Cloudflare Gateway inspection engine. This implementation guide assumes that your goals are to block threat actors from using attack vectors on your user base (such as malware, complex phishing attempts, and credential theft), as well as detection and prevention of threats to your corporate data (data loss prevention). These security threats may take internal and external forms. Separately, we will detail building threat prevention that uses our Remote Browser Isolation technology to maximally reduce the theoretical attack surface for your users.

This guide will provide you with a baseline of recommended policies to build and address common questions about policy building and accomplishing explicit outcomes.

## Objectives

By the end of this module, you will be able to:

* Understand the order Gateway enforces policies for filtering traffic.
* Create reusable lists for Gateway policies.
* Subscribe to indicator feeds for advanced threat intelligence.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/#page","headline":"Understand and streamline policy creation · Cloudflare Learning Paths","description":"Secure Internet traffic and SaaS apps.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/understand-policies/","name":"Understand and streamline policy creation"}}]}
```
