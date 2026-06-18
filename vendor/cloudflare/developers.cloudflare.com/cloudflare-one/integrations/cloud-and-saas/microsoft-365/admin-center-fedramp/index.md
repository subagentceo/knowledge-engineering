---
title: Admin Center (FedRAMP)
description: Reference information for Admin Center (FedRAMP) in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Admin Center (FedRAMP)

Availability

The Admin Center (FedRAMP) CASB integration requires a special entitlement on your account. To request access, contact your account team.

The Admin Center (FedRAMP) integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Microsoft 365 account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Microsoft 365 account with an active Microsoft Business Basic, Microsoft Business Standard, Microsoft 365 E3, Microsoft 365 E5, or Microsoft 365 F3 subscription
* [Global admin role ↗](https://docs.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) or equivalent permissions in Microsoft 365

## Integration permissions

Refer to [Microsoft 365 integration permissions](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/#integration-permissions) for information on which API permissions to enable.

## Security findings

The Admin Center (FedRAMP) integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/microsoft-365/admin-center-fedramp.mdx.atom).

### User account settings

Keep user accounts safe by ensuring the following settings are maintained. Review password configurations and password strengths to ensure alignment to your organization's security policies and best practices.

| Finding type                                            | FindingTypeID                        | Severity |
| ------------------------------------------------------- | ------------------------------------ | -------- |
| Microsoft: FIDO2 authentication method unattested       | 5a9fd288-c04f-4f7a-8976-bfd5464c6cf1 | Low      |
| Microsoft: Provisioning error for on-prem user          | 3123d99e-a83c-4d9d-9a10-80da5af6dee5 | Low      |
| Microsoft: Password expiration disabled for user        | ce8cc363-7cbb-445e-8385-79ae7348e430 | Low      |
| Microsoft: Password not changed for 90+ days            | 93be1fd1-b6c6-4b98-a04c-121d5ea66745 | Low      |
| Microsoft: Strong password disabled for user            | aecfdcb2-ec1f-4571-be3c-4ae46c93125e | Low      |
| Microsoft: Cloud sync disabled for on-prem user         | 8370628b-73f1-41a5-bbff-4d5adee7bf33 | Low      |
| Microsoft: Weak Windows Hello for Business key strength | 6fae390f-07a3-4577-9821-034a7b29e18e | Low      |
| Microsoft: On-prem user not synced in 7+ days           | 1eefc5a1-e665-431a-b939-cfbb76a309f5 | Low      |
| Microsoft: User is not a legal adult                    | 329030a3-db43-4959-9d92-2616a42f1731 | Low      |
| Microsoft: User configured proxy addresses              | 61406f68-feea-43c5-bda8-b7c4ef9b83cf | Low      |
| Microsoft: User account disabled                        | 0a8bd094-9138-4e7f-8ce8-bebdf5c27c4e | Low      |
| Microsoft: Reusable temporary access pass               | 98571e6b-c323-48bc-8c60-f0425c7f9342 | Low      |
| Microsoft: Long-lived temporary access pass             | 45cdbd9c-1594-488b-973e-7c62c6e7234e | Low      |

### Third-party apps

Identify and get alerted about the third-party apps that have access to at least one service in your Microsoft 365 domain. Additionally, receive information about which services are being accessed and by whom to get full visibility into [shadow IT](https://www.cloudflare.com/learning/access-management/what-is-shadow-it/).

| Finding type                              | FindingTypeID                        | Severity |
| ----------------------------------------- | ------------------------------------ | -------- |
| Microsoft: App not certified by Microsoft | 3f049bb1-3709-4d8f-8591-59dd034cf396 | Low      |
| Microsoft: App not attested by publisher  | d7390d6b-f466-4293-8528-6218e29b1179 | Low      |
| Microsoft: App disabled by Microsoft      | b5156b76-caaa-4ca8-bdb7-ea282da62356 | Low      |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/admin-center-fedramp/#page","headline":"Admin Center (FedRAMP) · Cloudflare One docs","description":"Reference information for Admin Center (FedRAMP) in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/admin-center-fedramp/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/microsoft-365/","name":"Microsoft 365"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/microsoft-365/admin-center-fedramp/","name":"Admin Center (FedRAMP)"}}]}
```
