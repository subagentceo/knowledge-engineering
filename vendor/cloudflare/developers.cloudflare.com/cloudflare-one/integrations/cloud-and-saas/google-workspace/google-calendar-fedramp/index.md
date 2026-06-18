---
title: Google Calendar (FedRAMP)
description: Reference information for Google Calendar (FedRAMP) in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Google Calendar (FedRAMP)

Availability

The Google Calendar (FedRAMP) CASB integration requires a special entitlement on your account. To request access, contact your account team.

The Google Calendar (FedRAMP) integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Google Workspace account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Google Workspace account with a Business Starter, Business Standard, Business Plus or Enterprise plan
* A Google Workspace user with [Super Admin privileges ↗](https://support.google.com/a/answer/2405986) and [Owner permissions ↗](https://cloud.google.com/iam/docs/understanding-roles) in the Google Cloud Platform (GCP) project used

## Integration permissions

Refer to [Google Workspace integration permissions](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/#integration-permissions) for information on which API permissions to enable.

## Security findings

The Google Calendar (FedRAMP) integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-calendar-fedramp.mdx.atom).

### Calendar sharing

| Finding type                                      | FindingTypeID                        | Severity | Description                                                                           |
| ------------------------------------------------- | ------------------------------------ | -------- | ------------------------------------------------------------------------------------- |
| Google Workspace: Calendar is publicly accessible | ec68bf68-b0c0-47b3-ad48-fcb3d7eaf8b6 | Medium   | A user's Google Calendar is publicly accessible on the Internet that anyone can read. |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-calendar-fedramp/#page","headline":"Google Calendar (FedRAMP) · Cloudflare One docs","description":"Reference information for Google Calendar (FedRAMP) in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-calendar-fedramp/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/google-workspace/","name":"Google Workspace"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-calendar-fedramp/","name":"Google Calendar (FedRAMP)"}}]}
```
