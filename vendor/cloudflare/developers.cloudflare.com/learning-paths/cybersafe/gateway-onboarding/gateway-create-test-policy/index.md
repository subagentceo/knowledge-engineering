---
title: Create a test policy
description: Learn about create a test policy in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a test policy

To ensure a smooth deployment, we recommend testing a simple policy before deploying DNS filtering to your organization.

## Test a policy in the browser

1. Go to **Traffic policies** \> **Firewall policies**.
2. Create a policy to block all security categories:  
| Selector            | Operator | Value                | Action |  
| ------------------- | -------- | -------------------- | ------ |  
| Security Categories | in       | _All security risks_ | Block  |
3. In the browser, go to `malware.testcategory.com`. You should see a generic Gateway block page.
4. In **Logs** \> **Gateway** \> **DNS**, verify that you see the blocked domain.

Note

When testing against frequently-visited sites, you may need to [clear the DNS cache](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/test-dns-filtering/#clear-dns-cache) in your browser or OS. Otherwise, the DNS lookup will return the locally-cached IP address and bypass your DNS policies.

You have now validated DNS filtering!

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/cybersafe/gateway-onboarding/gateway-create-test-policy/#page","headline":"Create a test policy · Cloudflare Learning Paths","description":"Learn about create a test policy in this guide.","url":"https://developers.cloudflare.com/learning-paths/cybersafe/gateway-onboarding/gateway-create-test-policy/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/cybersafe/gateway-onboarding/","name":"Onboarding Cloudflare Gateway"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/cybersafe/gateway-onboarding/gateway-create-test-policy/","name":"Create a test policy"}}]}
```
