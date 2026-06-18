---
title: Salesforce
description: Reference information for Salesforce in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Salesforce

The Salesforce integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Salesforce environment that could leave you and your organization vulnerable.

## Integration prerequisites

* A Salesforce environment (most editions are compatible)
* Permissions to a Salesforce organization with either:  
   * System Administrator permission  
   * Permissions for View Setup and Configuration, Customize Applications, and Modify All Data

## Integration permissions

For the Salesforce integration to function, Cloudflare CASB requires the following Salesforce permissions via a Connected App:

* `Manage user data via APIs (api)`
* `Manage user data via Web browsers (web)`
* `Perform requests at any time (refresh_token, offline_access)`
* `Access unique user identifiers (openid)`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Salesforce OAuth Tokens and Scopes documentation ↗](https://help.salesforce.com/s/articleView?id=sf.remoteaccess%5Foauth%5Ftokens%5Fscopes.htm).

## Security findings

The Salesforce integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/salesforce.mdx.atom).

### File sharing

Identify uploaded content, files, and attachments that have been shared in a potentially insecure fashion.

| Finding type                                                                        | FindingTypeID                        | Severity |
| ----------------------------------------------------------------------------------- | ------------------------------------ | -------- |
| Salesforce: Content Document publicly accessible without a password                 | 4cde56ed-19db-4cdb-a6c6-3aede5e17785 | Critical |
| Salesforce: Content Document publicly accessible with weak password                 | 68c43ab8-733d-4798-b25f-202f6fcf435f | High     |
| Salesforce: Content Document publicly accessible and password protected             | 75194f6b-5a95-48fa-b485-37181d2d19c8 | Medium   |
| Salesforce: Content Document shared and not viewed in 12+ months (stale permission) | 7125e209-234a-4f10-89d2-1af0601c277f | Medium   |
| Salesforce: Content Document larger than 2 GB                                       | 3d21de13-4b9f-483c-921a-44cdef7a58c5 | Medium   |

### Account misconfigurations

Discover account and admin-level settings that have been configured in an insecure way.

| Finding type                                              | FindingTypeID                        | Severity |
| --------------------------------------------------------- | ------------------------------------ | -------- |
| Salesforce: Domain without HTTPS                          | 20916e32-442e-4622-9e54-e1f37eb7d79f | High     |
| Salesforce: Default Account record access allows edit     | 316f1d9a-447e-432c-add7-7adde67c4f19 | Medium   |
| Salesforce: Default Case record access allows edit        | a7c8eb3e-b5be-4bfc-969a-358186bf927a | Medium   |
| Salesforce: Default Contact record access allows edit     | e7be14f0-24d6-4d6c-9e12-ca3f23d34ba9 | Medium   |
| Salesforce: Default Lead record access allows edit        | 12fde974-45e8-4449-8bf4-dc319370d5ca | Medium   |
| Salesforce: Default Opportunity record access allows edit | 2ab78d14-e804-4334-9d46-213d8798dd2a | Medium   |
| Salesforce: Organization with active compliance BCC email | 43e5fd20-1cba-4f1d-aa39-90c7ce2e088a | Low      |

### User access

Flag user access issues, including account misuse and users not following best practices.

| Finding type                                                | FindingTypeID                        | Severity |
| ----------------------------------------------------------- | ------------------------------------ | -------- |
| Salesforce: User sending email with different email address | a2790c4f-03f5-449f-b209-5f4447f417af | Medium   |
| Salesforce: Inactive user                                   | 57e44995-c7ad-46fe-9c55-59706e663adf | Low      |
| Salesforce: User has never logged in                        | a0bf74df-c796-4574-ac1c-0f239ea8c9ac | Low      |
| Salesforce: User has not logged in for 90+ days             | 8395c824-bc44-4c12-b300-40f2477384d4 | Low      |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/salesforce/#page","headline":"Salesforce - CASB · Cloudflare One docs","description":"Reference information for Salesforce in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/salesforce/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Salesforce"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/salesforce/","name":"Salesforce"}}]}
```
