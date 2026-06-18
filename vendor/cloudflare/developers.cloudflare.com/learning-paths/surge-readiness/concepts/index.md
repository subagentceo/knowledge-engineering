---
title: Prerequisites
description: Prepare your site for traffic surges.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Prerequisites

Reach out to your Customer Success Manager at least 30 days prior to the expected traffic surge to schedule a Security Optimization walkthrough with your Customer Solution Engineer.

To learn more about our service offerings, refer to [Customer Success offerings ↗](https://www.cloudflare.com/success-offerings/).

## Register your users

For the security and protection of your account, be sure to register all account users.

1. In the Cloudflare dashboard, go to the **Manage Account** \> **Members** page.  
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members)
2. Select more than one Super Administrator to ensure appropriate access when needed.

Note

Refer to [Manage members](https://developers.cloudflare.com/fundamentals/manage-members/) to learn how to review and update registered account users.

Failure to register account users can create issues with our ticketing system. Unverified users who contact support will be funneled to the self-serve queue rather than the Enterprise queue which can result in long wait times.

We strongly advise against credential-sharing which can jeopardize the trust and safety of your account.

## Confirm user and domain administration

* **Multi-User:** Provide role-based permissions to a group of users to better control the administration of your domains. Each user has their own role and limited API key.
* **Enforce 2FA:** Ensure your entire dashboard is secure by [enforcing 2-factor authentication](https://developers.cloudflare.com/fundamentals/user-profiles/2fa/) for your organization.  
   * To disable 2FA, submit a support ticket and allow 1-2 business days to validate your request.
* **Leverage API Access:** Work easily with our system programmatically using our [API ↗](https://api.cloudflare.com).

## Additional items

* Check when your [SSL Certificates expire (only custom and origin certificates)](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/renewing/)  
Note  
Certificates managed by Cloudflare are auto-renewed.
* Review your Operational and Disaster recovery preparedness  
   * Enable Load Balancing with smart cache strategies: Use [Cloudflare Load Balancing](https://developers.cloudflare.com/reference-architecture/architectures/load-balancing) to distribute traffic across multiple healthy origins, and increase cache-hit ratios by leveraging [custom cache rules](https://developers.cloudflare.com/cache/performance-review/cache-analytics) and [edge compute ↗](https://www.cloudflare.com/learning/cdn/caching-static-and-dynamic-content/) (e.g., Cloudflare Workers) to offload origin traffic during high-demand periods.  
   * Configure failover pools and back up DNS with a playbook: Set up [Cloudflare Load Balancer failover pools](https://developers.cloudflare.com/reference-architecture/architectures/load-balancing) to automatically redirect traffic to healthy origins if one fails. Export DNS records for safekeeping and prepare a clear [incident response plan ↗](https://www.cloudflare.com/learning/performance/preventing-downtime) that includes steps for re-routing or recovery.
* Review and update your current users' access
* Check your domain registry validity

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/surge-readiness/concepts/#page","headline":"Prerequisites · Cloudflare Learning Paths","description":"Prepare your site for traffic surges.","url":"https://developers.cloudflare.com/learning-paths/surge-readiness/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/surge-readiness/concepts/","name":"Prerequisites"}}]}
```
