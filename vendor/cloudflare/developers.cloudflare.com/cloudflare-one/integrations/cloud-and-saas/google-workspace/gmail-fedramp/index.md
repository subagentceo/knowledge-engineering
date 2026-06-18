---
title: Gmail (FedRAMP)
description: Reference information for Gmail (FedRAMP) in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Gmail (FedRAMP)

Availability

The Gmail (FedRAMP) CASB integration requires a special entitlement on your account. To request access, contact your account team.

The Gmail (FedRAMP) integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Google Workspace account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Google Workspace account with a Business Starter, Business Standard, Business Plus or Enterprise plan
* A Google Workspace user with [Super Admin privileges ↗](https://support.google.com/a/answer/2405986) and [Owner permissions ↗](https://cloud.google.com/iam/docs/understanding-roles) in the Google Cloud Platform (GCP) project used

## Integration permissions

Refer to [Google Workspace integration permissions](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/#integration-permissions) for information on which API permissions to enable.

## Security findings

The Gmail (FedRAMP) integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/google-workspace/gmail-fedramp.mdx.atom).

### Gmail administrator settings

| Finding type                                               | FindingTypeID                        | Severity | Description                                                                                                                  |
| ---------------------------------------------------------- | ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Google Workspace: Domain SPF record allows any IP address  | f28dcc8d-1f0c-4b5a-b254-4169095c16e5 | High     | A Google Workspace Domain SPF record allows any email to be sent from any IP address on your behalf.                         |
| Google Workspace: Domain SPF record not present            | 2e13e5dd-88ed-4d65-8d0a-d3fdff9ee7bb | Medium   | An SPF record does not exist for a Google Workspace Domain.                                                                  |
| Google Workspace: Domain DMARC record not present          | ec39eabf-3536-4005-940b-22d815c628ec | Medium   | A DMARC record does not exist for a Google Workspace Domain.                                                                 |
| Google Workspace: Domain DMARC not enforced                | 8971666d-c049-436d-b4d1-6816a70650ef | Medium   | A DMARC record for a Google Workspace Domain is not enforced.                                                                |
| Google Workspace: Domain DMARC not enforced for subdomains | fe485f42-b158-4187-85fe-79acdd92055b | Medium   | A DMARC record for a Google Workspace Subdomain is not configured to quarantine or reject messages that fail authentication. |
| Google Workspace: Domain DMARC only partially enforced     | b682c603-9bc6-485e-be8c-a6e58a989407 | Medium   | A DMARC record for a Google Workspace Domain is not configured to quarantine or reject messages that fail authentication.    |

### Email forwarding

| Finding type                                  | FindingTypeID                        | Severity | Description                                                                                                                      |
| --------------------------------------------- | ------------------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Google Workspace: User delegates email access | 66897c22-29a5-4f55-b39a-1bfcdd3c12c5 | High     | A user has delegated access to their inbox to another party. Delegates can read, send, and delete messages on the user's behalf. |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gmail-fedramp/#page","headline":"Gmail (FedRAMP) · Cloudflare One docs","description":"Reference information for Gmail (FedRAMP) in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/gmail-fedramp/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/google-workspace/","name":"Google Workspace"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/google-workspace/gmail-fedramp/","name":"Gmail (FedRAMP)"}}]}
```
