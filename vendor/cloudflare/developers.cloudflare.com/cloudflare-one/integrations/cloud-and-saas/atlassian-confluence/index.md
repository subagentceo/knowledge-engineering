---
title: Atlassian Confluence
description: Reference information for Atlassian Confluence in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Atlassian Confluence

The Atlassian Confluence integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Atlassian Confluence Cloud account that could leave you and your organization vulnerable.

Note

At this time, the CASB integration for Confluence is only compatible with Confluence Cloud accounts. Support for Confluence Data Center will come at a future date.

## Integration prerequisites

* A Confluence Cloud plan (Free, Standard, Premium, Enterprise)
* Access to a Confluence Cloud account with Site admin and/or Organization admin permissions

## Integration permissions

For the Confluence Cloud integration to function, Cloudflare CASB requires the following permissions via an OAuth 2.0 app:

* `read:confluence-space.summary`
* `read:confluence-props`
* `read:confluence-content.all`
* `read:confluence-content.summary`
* `read:confluence-content.permission`
* `read:confluence-user`
* `read:confluence-groups`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Atlassian scopes documentation ↗](https://developer.atlassian.com/cloud/confluence/scopes-for-oauth-2-3LO-and-forge-apps/).

## Security findings

The Atlassian Confluence integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/atlassian-confluence.mdx.atom).

### Access security

Flag user and third-party app access issues, including account misuse, sharing security, and users not following best practices.

| Finding type                                                      | FindingTypeID                        | Severity |
| ----------------------------------------------------------------- | ------------------------------------ | -------- |
| Confluence: Unknown or anonymous user with edit access to content | d5ad6f5e-3e7a-4409-a9dc-9707caca047e | Critical |
| Confluence: Unknown or anonymous user with edit access to space   | a531c40f-76f5-404e-9c9b-3b21a6da7b98 | High     |
| Confluence: Third-party app with edit access to space             | aac0ac18-25ad-442a-9a24-01ecd85b0b2b | Medium   |
| Confluence: Third-party app with edit access to content           | 8214431e-b708-49c9-b28b-3214f1b491d8 | Medium   |
| Confluence: Unknown or anonymous user with access                 | a1d0d098-2602-4312-85a8-a62d3bc56aca | Low      |
| Confluence: Third-party app with content access                   | 5ccf7326-386d-4afb-867a-fbf25978c33a | Low      |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/atlassian-confluence/#page","headline":"Atlassian Confluence · Cloudflare One docs","description":"Reference information for Atlassian Confluence in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/atlassian-confluence/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/atlassian-confluence/","name":"Atlassian Confluence"}}]}
```
