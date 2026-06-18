---
title: Google Admin
description: Reference information for Google Admin in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Google Admin

The Google Admin integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Google Workspace account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Google Workspace account with a Business Starter, Business Standard, Business Plus or Enterprise plan
* A Google Workspace user with [Super Admin privileges ↗](https://support.google.com/a/answer/2405986) and [Owner permissions ↗](https://cloud.google.com/iam/docs/understanding-roles) in the Google Cloud Platform (GCP) project used

## Integration permissions

Refer to [Google Workspace integration permissions](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/#integration-permissions) for information on which API permissions to enable.

## Security findings

The Google Admin integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-admin.mdx.atom).

### User account settings

| Finding type                                                                             | FindingTypeID                        | Severity | Description                                                                                                  |
| ---------------------------------------------------------------------------------------- | ------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------ |
| Google Workspace: Admin user with two-factor authentication disabled                     | 5f7c1f62-0ac6-4422-b3d3-d0566dd4e3f2 | Critical | An administrator in Google Workspace does not have two-factor authentication enabled.                        |
| Google Workspace: User with two-factor authentication disabled                           | 739e1965-2ab4-4946-8a56-73fd75154efa | High     | A user in Google Workspace does not have two-factor authentication enabled.                                  |
| Google Workspace: Admin user with Gemini license with two-factor authentication disabled | 27a0a9a0-13c6-4d8f-a67c-b455dd213cb9 | High     | An administrator with a Gemini for Google Workspace license does not have two-factor authentication enabled. |
| Google Workspace: User with Gemini license with two-factor authentication disabled       | c82024dc-b836-4b86-8c90-ab07971474e4 | Medium   | A user with a Gemini for Google Workspace license does not have two-factor authentication enabled.           |
| Google Workspace: User without recovery email                                            | 2e2383bb-51e8-47fc-8ba7-2dd255c2545f | Low      | A user in Google Workspace does not have a recovery email set.                                               |
| Google Workspace: User without recovery phone number                                     | ec326c68-f331-4597-9ec4-43dc197c86f4 | Low      | A user in Google Workspace does not have a recovery phone number set.                                        |

### Inactive or suspended users

| Finding type                                                 | FindingTypeID                        | Severity | Description                                                                                                |
| ------------------------------------------------------------ | ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| Google Workspace: Inactive admin user                        | 391ee66d-10e0-4b26-91b3-741a2a4c39d0 | Medium   | An administrator account in Google Workspace has not logged in for 30 days.                                |
| Google Workspace: Suspended admin user                       | 31e02a11-aa3b-4278-97d3-9c0f7e8fd2c7 | Medium   | An administrator account in Google Workspace is suspended.                                                 |
| Google Workspace: Inactive user                              | 7c098546-2e67-4f01-9fb7-bd48412bd178 | Low      | A user account in Google Workspace has not logged in for 30 days.                                          |
| Google Workspace: Suspended user                             | 84f514e3-f12d-49e5-bdfe-9073e336d89e | Low      | A user account in Google Workspace is suspended.                                                           |
| Google Workspace: Admin user suspended with AI Ultra license | ee7d4ed6-479f-404f-8dbd-f82dce2a0f66 | Low      | An administrator account in Google Workspace with an AI Ultra (Gemini for Workspace) license is suspended. |
| Google Workspace: User suspended with AI Ultra license       | cf20e808-29ad-4026-a8f9-6ec3e069376c | Low      | A user account in Google Workspace with an AI Ultra (Gemini for Workspace) license is suspended.           |

### Third-party apps

| Finding type                                                          | FindingTypeID                        | Severity | Description                                                                          |
| --------------------------------------------------------------------- | ------------------------------------ | -------- | ------------------------------------------------------------------------------------ |
| Google Workspace: Installed 3rd-party app with Drive access           | 191f0751-7087-4588-9e99-93c5dd834b5b | High     | A third-party application has been granted permissions to a user's Google Drive.     |
| Google Workspace: Installed 3rd-party app with Gmail access           | 431aecad-20e5-4a20-80ba-4b66eaaa1be4 | High     | A third-party application has been granted permissions to a user's Gmail.            |
| Google Workspace: Installed 3rd-party app with Google Docs access     | fe41d53b-3bc3-45ef-95d2-75ba159ce60d | Medium   | A third-party application has been granted permissions to a user's Google Documents. |
| Google Workspace: Installed 3rd-party app with Google Calendar access | 80102f46-43d4-437e-b694-e8ee2c077ade | Medium   | A third-party application has been granted permissions to a user's Google Calendar.  |
| Google Workspace: Installed 3rd-party app with Google Slides access   | d88e106c-1f2e-4b63-acae-5cee19ded9ec | Medium   | A third-party application has been granted permissions to a user's Google Slides.    |
| Google Workspace: Installed 3rd-party app with Google Sheets access   | ece9a2fd-4248-4f11-bc45-8b4189eedb54 | Medium   | A third-party application has been granted permissions to a user's Google Sheets.    |
| Google Workspace: Installed 3rd-party app with Google Sign In access  | 26b938ea-8d24-4ea5-8e81-2eae26830061 | Low      | A user has used their Google Workspace account to sign up for a third party service. |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-admin/#page","headline":"Google Admin · Cloudflare One docs","description":"Reference information for Google Admin in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-admin/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Google"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/google-workspace/","name":"Google Workspace"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/google-workspace/google-admin/","name":"Google Admin"}}]}
```
