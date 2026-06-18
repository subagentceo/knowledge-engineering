---
title: Microsoft 365 Copilot (FedRAMP)
description: Reference information for Microsoft 365 Copilot (FedRAMP) in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Microsoft 365 Copilot (FedRAMP)

Availability

The Microsoft 365 Copilot (FedRAMP) CASB integration requires a special entitlement on your account. To request access, contact your account team.

The Microsoft 365 Copilot (FedRAMP) integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Microsoft 365 account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Microsoft 365 account with an active Microsoft Business Basic, Microsoft Business Standard, Microsoft 365 E3, Microsoft 365 E5, or Microsoft 365 F3 subscription
* [Global admin role ↗](https://docs.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) or equivalent permissions in Microsoft 365

## Integration permissions

Refer to [Microsoft 365 integration permissions](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/#integration-permissions) for information on which API permissions to enable.

## Security findings

The Microsoft 365 Copilot (FedRAMP) integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/microsoft-365/copilot-fedramp.mdx.atom).

### Data Loss Prevention (optional)

These findings will only appear if you [added DLP profiles](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/) to your CASB integration.

Detect DLP matches in content used and shared within Microsoft's artificial intelligence (AI) offering, Microsoft 365 Copilot.

| Finding type                                              | FindingTypeID                        | Severity |
| --------------------------------------------------------- | ------------------------------------ | -------- |
| Microsoft: Copilot Referenced File with DLP Profile match | fa7b06bd-cf63-41fc-9afa-a20598f7a52d | High     |
| Microsoft: Copilot AI Response with DLP Profile match     | 176b9299-0cee-4bbb-9c59-b18611228454 | High     |
| Microsoft: Copilot User Prompt with DLP Profile match     | 1c5f1cdf-3e08-4a83-baf9-fc8e123877ab | High     |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/m365-copilot-fedramp/#page","headline":"Microsoft 365 Copilot (FedRAMP) · Cloudflare One docs","description":"Reference information for Microsoft 365 Copilot (FedRAMP) in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/m365-copilot-fedramp/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft","AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/microsoft-365/","name":"Microsoft 365"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/microsoft-365/m365-copilot-fedramp/","name":"Microsoft 365 Copilot (FedRAMP)"}}]}
```
