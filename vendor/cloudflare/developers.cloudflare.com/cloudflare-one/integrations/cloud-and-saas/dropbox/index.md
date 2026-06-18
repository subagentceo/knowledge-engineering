---
title: Dropbox
description: Reference information for Dropbox in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Dropbox

The Dropbox integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Dropbox account that could leave you and your organization vulnerable.

## Integration prerequisites

* A Dropbox Business plan (Standard, Advanced, Enterprise, or Education)
* Access to a Dropbox Business account with Team admin permissions

## Integration permissions

For the Dropbox integration to function, Cloudflare CASB requires the following Dropbox permissions via an OAuth 2.0 app:

* `account_info.read`
* `files.metadata.read`
* `files.content.read`
* `sharing.read`
* `team_info.read`
* `team_data.member`
* `team_data.governance.write`
* `team_data.governance.read`
* `files.team_metadata.read`
* `members.read`
* `groups.read`
* `sessions.list`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted. To learn more about each permission, refer to the [Dropbox API Permissions documentation ↗](https://developers.dropbox.com/oauth-guide#dropbox-api-permissions).

## Security findings

The Dropbox integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/dropbox.mdx.atom).

### File and folder sharing

Identify files and folders that have been shared in a potentially insecure fashion.

| Finding type                                                           | FindingTypeID                        | Severity |
| ---------------------------------------------------------------------- | ------------------------------------ | -------- |
| Dropbox: File publicly accessible with edit access                     | 7fefad57-371b-4f27-b1f0-7d500c863bd0 | Critical |
| Dropbox: File shared company-wide with edit access                     | 265ed167-435c-4626-99ba-2fafd766c096 | High     |
| Dropbox: File publicly accessible with view access                     | e8c057e4-d6ce-431b-9d03-d9aadff610d4 | High     |
| Dropbox: Shared link create policy set to default 'Public'             | 0afabc9a-3a98-4a67-941a-d1f0ce0cfbfe | High     |
| Dropbox: File shared company-wide with view access                     | 02a14d67-27fa-4621-a280-1a25925d506f | Medium   |
| Dropbox: Folder shared company-wide with edit access                   | ac4da5b9-ddb0-4285-ba52-2ba4de43b530 | Medium   |
| Dropbox: Shared folder policy set to default 'Anyone'                  | 5d479ad5-d0f1-4c8f-b439-a39b399fe6c5 | Medium   |
| Dropbox: Group creation policy set to 'Admins and Members'             | 6f54b5eb-6867-490e-b823-08e91878eb40 | Medium   |
| Dropbox: Folder join policy set to 'Can join folders shared by Anyone' | e5ffaecc-f61a-4019-a54f-2e5ac882d3f3 | Medium   |
| Dropbox: Folder member policy set to 'Can share folders with Anyone'   | 99d4a2af-12ec-43a1-9630-27ac4adf625c | Medium   |
| Dropbox: Shared link create policy set to default 'Team-wide'          | a3d02f04-4372-4ae3-99f9-e2caccee6e76 | Low      |

### Data Loss Prevention (optional)

These findings will only appear if you [added DLP profiles](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/) to your CASB integration.

| Finding type                                                   | Severity | Description                                                                           |
| -------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------- |
| File Publicly Accessible Read and Write with DLP Profile match | Critical | A Dropbox file contains sensitive data that anyone on the Internet can read or write. |
| File Publicly Accessible Read Only with DLP Profile match      | Critical | A Dropbox file contains sensitive data that anyone on the Internet can read.          |
| File Shared Company Wide Read and Write with DLP Profile match | Medium   | A Dropbox file is shared with the entire company with read and write permissions.     |
| File Shared Company Wide Read Only with DLP Profile match      | Medium   | A Dropbox file is shared with the entire company with read permissions.               |

### Suspicious applications

Detect when suspicious Dropbox applications are linked by members.

| Finding type                                     | FindingTypeID                        | Severity |
| ------------------------------------------------ | ------------------------------------ | -------- |
| Dropbox: Suspicious application linked by member | 8384c58c-1fc2-4caa-9836-c8ede7ca440d | High     |

### User access and account misconfigurations

Flag user access issues, including users misusing accounts or not following best practices.

| Finding type                                         | FindingTypeID                        | Severity |
| ---------------------------------------------------- | ------------------------------------ | -------- |
| Dropbox: Admin user with unverified secondary email  | cebb4104-1235-4049-a664-9fcd003ece71 | Medium   |
| Dropbox: Admin user with restricted directory access | 19378bb3-a3b7-4ee5-8ea7-39eec0a2ca7c | Medium   |
| Dropbox: User with unverified email                  | 2b5804f7-4888-4872-a85a-a64805d10654 | Medium   |
| Dropbox: Invited user                                | 44d34aab-82fb-4a60-8e35-d7a75cfc789c | Low      |
| Dropbox: Suspended user                              | e356cfe6-97e6-4e30-9cb9-4a42a387844e | Low      |
| Dropbox: User with secondary email configured        | 4bbb795a-cd34-41ba-865d-9bf9de61a592 | Low      |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/dropbox/#page","headline":"Dropbox · Cloudflare One docs","description":"Reference information for Dropbox in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/dropbox/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/dropbox/","name":"Dropbox"}}]}
```
