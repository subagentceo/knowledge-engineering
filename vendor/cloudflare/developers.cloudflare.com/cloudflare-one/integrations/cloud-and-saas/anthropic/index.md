---
title: Anthropic
description: Reference information for Anthropic in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Anthropic

The Anthropic integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Anthropic account that could leave you and your organization vulnerable.

This integration covers the following Anthropic products:

* Claude Console (organizations, workspaces/projects, users, invites)
* Anthropic API Platform (organization and project API keys)

Note

To detect data loss prevention and posture findings, your organization must have Anthropic's Compliance API enabled. Contact your Anthropic representative to request access. When enabled, admin keys created in the Claude Console automatically include the `read:compliance_activities` scope.

## Integration prerequisites

* An Anthropic [Enterprise or Platform organization ↗](https://www.anthropic.com/pricing#team-&-enterprise)
* [Organization-level admin (or equivalent) privileges in Anthropic ↗](https://support.anthropic.com/articles/10186004-api-console-roles-and-permissions) to view organization metadata and manage API keys

## Integration permissions

For the Anthropic integration to function, Cloudflare CASB requires authorization via **API keys**:

* `Admin API key (organization-level)`: Grants read-only access to organization/workspace metadata, members and invites, key metadata, and compliance activities used for findings.
* (Optional) `Project API key (project-level)`: Grants read-only access to project metadata and keys when you include project scopes in the scan.

These credentials follow the principle of least privilege so that only the minimum required access is granted.

## Security findings

The Anthropic integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/anthropic.mdx.atom).

### API key hygiene

Detect API keys that may be unused or overdue for rotation.

| Finding type              | Severity |
| ------------------------- | -------- |
| Anthropic: Unused API key | Medium   |

### Access security

Flag organization access issues to help enforce best practices.

| Finding type                                                | Severity |
| ----------------------------------------------------------- | -------- |
| Anthropic: High-privilege invite                            | High     |
| Anthropic: Stale pending invite                             | Low      |
| Anthropic: Claude Project visible across organization       | Low      |
| Anthropic: Claude Cowork enabled for role                   | High     |
| Anthropic: Claude Connector always allowed enabled for role | High     |
| Anthropic: Claude for Chrome enabled for role               | High     |

### Data Loss Prevention (optional)

These findings will only appear if you [added DLP profiles](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/) to your CASB integration.

| Finding type                                                     | Severity |
| ---------------------------------------------------------------- | -------- |
| Anthropic: Downloadable File with DLP Profile match              | High     |
| Anthropic: Claude Chat User Prompt with DLP Profile match        | High     |
| Anthropic: Claude Chat Assistant Response with DLP Profile match | High     |
| Anthropic: Claude Chat Uploaded File with DLP Profile match      | High     |
| Anthropic: Claude Chat Generated File with DLP Profile match     | High     |
| Anthropic: Claude Project File with DLP Profile match            | High     |
| Anthropic: Claude Project Document with DLP Profile match        | High     |
| Anthropic: Claude Chat Artifact with DLP Profile match           | High     |
| Anthropic: Claude Project Instructions with DLP Profile match    | High     |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/#page","headline":"Anthropic · Cloudflare One docs","description":"Reference information for Anthropic in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/anthropic/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/anthropic/","name":"Anthropic"}}]}
```
