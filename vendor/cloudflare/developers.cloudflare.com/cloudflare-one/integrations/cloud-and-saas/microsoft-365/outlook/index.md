---
title: Outlook
description: Reference information for Outlook in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Outlook

The Outlook integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Microsoft 365 account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Microsoft 365 account with an active Microsoft Business Basic, Microsoft Business Standard, Microsoft 365 E3, Microsoft 365 E5, or Microsoft 365 F3 subscription
* [Global admin role ↗](https://docs.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) or equivalent permissions in Microsoft 365

## Integration permissions

Refer to [Microsoft 365 integration permissions](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/#integration-permissions) for information on which API permissions to enable.

## Security findings

The Outlook integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/microsoft-365/outlook.mdx.atom).

### Calendar sharing

Get alerted when calendars in your Microsoft 365 account have their permissions changed to a less secure setting.

| Finding type                          | FindingTypeID                        | Severity |
| ------------------------------------- | ------------------------------------ | -------- |
| Microsoft: Calendar shared externally | 7d2d9b00-3871-4abf-9e65-f29cf00c428b | Low      |

### Email administrator settings

Discover suspicious or insecure email configurations in your Microsoft domain. Missing SPF and DMARC records make it easier for bad actors to spoof email, while SPF records configured to another domain can be a potential warning sign of malicious activity.

| Finding type                                        | FindingTypeID                        | Severity |
| --------------------------------------------------- | ------------------------------------ | -------- |
| Microsoft: Domain SPF record allows any IP address  | 27893e48-663e-43f9-83d4-c158c50259d0 | High     |
| Microsoft: Domain SPF record not present            | 009093d9-43df-45a2-bdc6-2f35fc3a0c71 | Medium   |
| Microsoft: Domain DMARC record not present          | bb3d3760-2c4e-4161-9164-cff92e809f9c | Medium   |
| Microsoft: Domain DMARC not enforced                | a020d87d-332b-49d1-acc3-16c19d72fba4 | Medium   |
| Microsoft: Domain DMARC not enforced for subdomains | 1837a549-4d4e-4101-917c-e9a4036e0c08 | Medium   |
| Microsoft: Domain DMARC only partially enforced     | 943414ed-7c79-4d17-a253-8d73f34dcc1d | Medium   |
| Microsoft: Domain not verified                      | dd1e9aba-57ee-4cf1-a895-dd2f1fc166a7 | Medium   |
| Microsoft: App certification expires within 90 Days | d5ede282-0339-4983-88f3-849ac59ba840 | Low      |

### Email forwarding

Get alerted when users set their email to be forwarded externally. This can either be a sign of unauthorized activity, or an employee unknowingly sending potentially sensitive information to a personal email.

| Finding type                                                     | FindingTypeID                        | Severity |
| ---------------------------------------------------------------- | ------------------------------------ | -------- |
| Microsoft: Active message rule forwards externally as attachment | 9efca21a-aba2-452f-bb17-e66d34b58765 | Low      |
| Microsoft: Active message rule forwards externally               | 42fa3fe6-da72-4bf0-9bc9-5faa4a118ec4 | Low      |
| Microsoft: Active message rule redirects externally              | b75ba81e-c98d-4b78-b5a1-47a2f54499e8 | Low      |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/outlook/#page","headline":"Outlook · Cloudflare One docs","description":"Reference information for Outlook in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/outlook/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/microsoft-365/","name":"Microsoft 365"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/microsoft-365/outlook/","name":"Outlook"}}]}
```
