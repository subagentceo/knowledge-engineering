---
title: Atlassian Jira
description: Reference information for Atlassian Jira in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Atlassian Jira

The Atlassian Jira integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Atlassian Jira Cloud account that could leave you and your organization vulnerable.

Note

At this time, the CASB integration for Jira is only compatible with Jira Cloud accounts. Support for Jira Data Center will come at a future date.

## Integration prerequisites

* A Jira Cloud plan (Free, Standard, Premium, Enterprise)
* Access to a Jira Cloud account with Site admin and/or Organization admin permissions

## Integration permissions

For the Jira Cloud integration to function, Cloudflare CASB requires the following permissions via an OAuth 2.0 app:

* `read:jira-work`
* `read:jira-user`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Atlassian scopes documentation ↗](https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3LO-and-forge-apps/).

## Security findings

The Jira Cloud integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/atlassian-jira.mdx.atom).

### Access security

Flag user and third-party app access issues, including account misuse and users not following best practices.

| Finding type                                | FindingTypeID                        | Severity |
| ------------------------------------------- | ------------------------------------ | -------- |
| Jira: Active user with unknown account type | 8dfd390d-911e-47bb-9ded-cb75fd91e793 | Low      |
| Jira: Active third-party app with access    | 01118135-a4ab-4b8f-887d-c814358da217 | Low      |
| Jira: Inactive third-party app with access  | 36f7de49-2938-4a54-b212-b4da74145a58 | Low      |
| Jira: Inactive user                         | 1e1a085c-1ef3-4199-bea5-ff52ccbd6d2d | Low      |

### File security

Identify files that could be potentially problematic and worth deeper investigation.

| Finding type                              | FindingTypeID                        | Severity |
| ----------------------------------------- | ------------------------------------ | -------- |
| Jira: Issue attachment larger than 512 MB | 1e5473b7-588e-4954-b97d-a5a20b4f8c5a | Medium   |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/atlassian-jira/#page","headline":"Atlassian Jira · Cloudflare One docs","description":"Reference information for Atlassian Jira in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/atlassian-jira/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/atlassian-jira/","name":"Atlassian Jira"}}]}
```
