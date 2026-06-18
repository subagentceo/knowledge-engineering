---
title: Google Drive
description: Reference information for Google Drive in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Google Drive

The Google Drive integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Google Workspace account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Google Workspace account with a Business Starter, Business Standard, Business Plus or Enterprise plan
* A Google Workspace user with [Super Admin privileges ↗](https://support.google.com/a/answer/2405986) and [Owner permissions ↗](https://cloud.google.com/iam/docs/understanding-roles) in the Google Cloud Platform (GCP) project used

## Integration permissions

Refer to [Google Workspace integration permissions](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/#integration-permissions) for information on which API permissions to enable.

## Security findings

The Google Drive integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-drive.mdx.atom).

### File sharing

| Finding type                                                   | FindingTypeID                        | Severity | Description                                                                                               |
| -------------------------------------------------------------- | ------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------- |
| Google Workspace: File publicly accessible with edit access    | 29b01269-025f-4249-b5c1-0b9ec39823e0 | Critical | A Google Drive file is publicly accessible on the Internet that anyone can read or write.                 |
| Google Workspace: File publicly accessible with view access    | d5132bc7-4c41-4824-b879-3918bf7f6ee7 | High     | A Google Drive file is publicly accessible on the Internet that anyone can read.                          |
| Google Workspace: File shared outside company with edit access | 71ec135e-3d4c-4d35-a2b7-4fd1e5b65b99 | High     | A Google Drive file is shared with another organization or outside party with read and write permissions. |
| Google Workspace: File shared outside company with view access | d4b231ad-9a8c-40d3-8654-5bd5bb86bf1a | Medium   | A Google Drive file is shared with another organization or outside party with read permissions.           |
| Google Workspace: File shared company-wide with edit access    | 0ed79f27-32fd-415a-a919-ea4af3bd25fd | Medium   | A Google Drive file is shared with the entire company with read and write permissions.                    |
| Google Workspace: File shared company-wide with view access    | a34753f3-aec7-4134-a30b-2ebb1d7e47de | Medium   | A Google Drive file is shared with the entire company with read permissions.                              |

### Data Loss Prevention (optional)

These findings will only appear if you [added DLP profiles](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/) to your CASB integration.

| Finding type                                                                          | FindingTypeID                        | Severity | Description                                                                                     |
| ------------------------------------------------------------------------------------- | ------------------------------------ | -------- | ----------------------------------------------------------------------------------------------- |
| Google Workspace: File publicly accessible with edit access with DLP Profile match    | 868a21e9-62b2-4e4a-8150-92cf9eb0c2e3 | Critical | A Google Drive file contains sensitive data that anyone on the Internet can read or write.      |
| Google Workspace: File publicly accessible with view access with DLP Profile match    | bfe54b22-5ee5-4ccc-b62b-ea822b34c164 | High     | A Google Drive file contains sensitive data that anyone on the Internet can read.               |
| Google Workspace: File shared outside company with edit access with DLP Profile match | 124cfac5-12c6-4b55-8691-9c11776b365a | High     | A Google Drive file contains sensitive data that anyone the file is shared to can read.         |
| Google Workspace: File shared company-wide with edit access with DLP Profile match    | 5b2ad0d2-f35f-47a3-96cb-6e8fbb1fcb36 | Medium   | A Google Drive file contains sensitive data that anyone in your organization can read or write. |
| Google Workspace: File shared company-wide with view access with DLP Profile match    | b9fa5fef-c1d0-44da-8364-2c0887be0820 | Medium   | A Google Drive file contains sensitive data that anyone in your organization can read.          |
| Google Workspace: File shared outside company with view access with DLP Profile match | aebdda6d-ab48-4408-9941-881683972d83 | Medium   | A Google Drive file contains sensitive data that anyone the file is shared to can read.         |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-drive/#page","headline":"Google Drive · Cloudflare One docs","description":"Reference information for Google Drive in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-drive/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/google-workspace/","name":"Google Workspace"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-drive/","name":"Google Drive"}}]}
```
