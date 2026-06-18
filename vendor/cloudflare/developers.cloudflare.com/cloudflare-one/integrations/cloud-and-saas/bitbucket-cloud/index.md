---
title: Bitbucket Cloud
description: Reference information for Bitbucket Cloud in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bitbucket Cloud

The Bitbucket Cloud integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Bitbucket Cloud Cloud account that could leave you and your organization vulnerable.

Note

Currently, the CASB integration for Bitbucket is only compatible with Bitbucket Cloud accounts. Support for Bitbucket Data Center will come at a future date.

## Integration prerequisites

* A Bitbucket Cloud plan (Free, Standard, Premium, Enterprise)
* Access to a Bitbucket Cloud account with Site admin and/or Organization admin permissions

## Integration permissions

For the Bitbucket Cloud integration to function, Cloudflare CASB requires the following permission scopes via an OAuth 2.0 app:

* `account`
* `email`
* `issue`
* `pipeline`
* `project`
* `project:admin`
* `pullrequest`
* `repository`
* `repository:admin`
* `runner`
* `snippet`
* `webhook`
* `wiki`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission scope, refer to the [Atlassian scopes documentation ↗](https://developer.atlassian.com/cloud/bitbucket/rest/intro/#oauth-2-0).

## Security findings

The Bitbucket Cloud integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/bitbucket-cloud.mdx.atom).

### Repository security

Flag repository issues, including branch protection, access, and update frequency.

| Finding type                                                                                              | FindingTypeID                        | Severity |
| --------------------------------------------------------------------------------------------------------- | ------------------------------------ | -------- |
| Bitbucket Cloud: Repository is publicly accessible                                                        | be273f0a-678e-49af-b9f8-8f3913acef97 | Critical |
| Bitbucket Cloud: Repository Default Branch Protection does not have PR Review Required                    | 6ad95c13-0d13-4595-bc76-bd86f4eba4b9 | High     |
| Bitbucket Cloud: Repository has no Default Branch Protection                                              | 324f2014-4d4b-4aa6-89a8-72a6c7da09d7 | Medium   |
| Bitbucket Cloud: Repository not updated in 12+ months                                                     | a1bd3076-a68d-492e-9947-a01e15a4d1b3 | Medium   |
| Bitbucket Cloud: Repository Default Branch Protection does not disable direct pushes for all users/groups | c60a7b00-1592-429a-8a32-d58101e4551f | Medium   |
| Bitbucket Cloud: Repository Default Branch Protection does not have Stale PR Approvals Disabled           | 738c9839-5e1e-4048-85a3-7935ec4c647a | Medium   |
| Bitbucket Cloud: Repository Default Branch Protection does not have Force Pushes Disabled                 | 4c52f441-0c24-4dbd-8f5e-0e5b829ee8e2 | Medium   |
| Bitbucket Cloud: Repository Default Branch Protection does not require passing builds to merge            | afe4a27e-ee01-4ebe-914c-d480ac49a5c2 | Low      |
| Bitbucket Cloud: Repository Default Branch Protection allows branch deletion                              | 86411562-4b85-4677-b048-7887cc5b1567 | Low      |
| Bitbucket Cloud: Repository Default Branch Protection does not enforce merge checks                       | 64440d40-91de-4d13-9280-d5afa418ccf0 | Low      |
| Bitbucket Cloud: Key is older than 180 days                                                               | 0a135600-a109-434f-877c-1a6594dcd76d | Low      |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/bitbucket-cloud/#page","headline":"Bitbucket Cloud · Cloudflare One docs","description":"Reference information for Bitbucket Cloud in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/bitbucket-cloud/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/bitbucket-cloud/","name":"Bitbucket Cloud"}}]}
```
