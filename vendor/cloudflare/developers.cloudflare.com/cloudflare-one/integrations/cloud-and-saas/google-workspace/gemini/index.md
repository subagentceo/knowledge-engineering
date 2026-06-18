---
title: Gemini for Google Workspace
description: Reference information for Gemini for Google Workspace in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Gemini for Google Workspace

The Gemini for Google Workspace integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Google Workspace account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Google Workspace account with a Business Starter, Business Standard, Business Plus or Enterprise plan
* A Google Workspace user with [Super Admin privileges ↗](https://support.google.com/a/answer/2405986) and [Owner permissions ↗](https://cloud.google.com/iam/docs/understanding-roles) in the Google Cloud Platform (GCP) project used

## Integration permissions

Refer to [Google Workspace integration permissions](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/#integration-permissions) for information on which API permissions to enable.

## Security findings

The Gemini for Google Workspace integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/gemini.mdx.atom).

### User account settings

| Finding type                                                                             | FindingTypeID                        | Severity | Description                                                                                                  |
| ---------------------------------------------------------------------------------------- | ------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------ |
| Google Workspace: Admin user with Gemini license with two-factor authentication disabled | 27a0a9a0-13c6-4d8f-a67c-b455dd213cb9 | High     | An administrator with a Gemini for Google Workspace license does not have two-factor authentication enabled. |
| Google Workspace: User with Gemini license with two-factor authentication disabled       | c82024dc-b836-4b86-8c90-ab07971474e4 | Medium   | A user with a Gemini for Google Workspace license does not have two-factor authentication enabled.           |

### Inactive or suspended users

| Finding type                                                 | FindingTypeID                        | Severity | Description                                                                            |
| ------------------------------------------------------------ | ------------------------------------ | -------- | -------------------------------------------------------------------------------------- |
| Google Workspace: Admin user suspended with AI Ultra license | ee7d4ed6-479f-404f-8dbd-f82dce2a0f66 | Low      | An administrator account with an AI Ultra (Gemini for Workspace) license is suspended. |
| Google Workspace: User suspended with AI Ultra license       | cf20e808-29ad-4026-a8f9-6ec3e069376c | Low      | A user account with an AI Ultra (Gemini for Workspace) license is suspended.           |

### Gemini licensing

| Finding type                                       | FindingTypeID                        | Severity | Description                                                                                  |
| -------------------------------------------------- | ------------------------------------ | -------- | -------------------------------------------------------------------------------------------- |
| Google Workspace: Admin user with AI Ultra license | 62fa682a-c2b5-4d5a-a086-8e60bed804d3 | Low      | An administrator in Google Workspace is assigned an AI Ultra (Gemini for Workspace) license. |
| Google Workspace: User with AI Ultra license       | 5b847ed3-6c02-4963-a1ab-82a4aa2b6c64 | Low      | A user in Google Workspace is assigned an AI Ultra (Gemini for Workspace) license.           |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gemini/#page","headline":"Gemini for Google Workspace · Cloudflare One docs","description":"Reference information for Gemini for Google Workspace in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gemini/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google","AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/google-workspace/","name":"Google Workspace"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/google-workspace/gemini/","name":"Gemini for Google Workspace"}}]}
```
