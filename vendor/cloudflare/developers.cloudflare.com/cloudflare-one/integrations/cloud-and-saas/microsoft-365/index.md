---
title: Microsoft 365
description: Reference information for Microsoft 365 in Zero Trust integrations.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Microsoft 365

The Microsoft 365 (M365) integration detects a variety of data loss prevention, account misconfiguration, and user security risks in an integrated Microsoft 365 account that could leave you and your organization vulnerable.

This integration covers the following Microsoft 365 products:

* [ Admin Center ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/admin-center/)
* [ OneDrive ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/onedrive/)
* [ Outlook ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/outlook/)
* [ SharePoint ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/sharepoint/)
* [ Microsoft 365 Copilot ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/m365-copilot/)
* [ Admin Center (FedRAMP) ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/admin-center-fedramp/)
* [ OneDrive (FedRAMP) ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/onedrive-fedramp/)
* [ Outlook (FedRAMP) ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/outlook-fedramp/)
* [ SharePoint (FedRAMP) ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/sharepoint-fedramp/)
* [ Microsoft 365 Copilot (FedRAMP) ](https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/m365-copilot-fedramp/)

## Integration prerequisites

* A Microsoft 365 account with an active Microsoft Business Basic, Microsoft Business Standard, Microsoft 365 E3, Microsoft 365 E5, or Microsoft 365 F3 subscription
* [Global admin role ↗](https://docs.microsoft.com/en-us/microsoft-365/admin/add-users/about-admin-roles?view=o365-worldwide#commonly-used-microsoft-365-admin-center-roles) or equivalent permissions in Microsoft 365

## Integration permissions

For the Microsoft 365 integration to function, Cloudflare CASB requires the following delegated Microsoft Graph API permissions:

* `Application.Read.All`
* `Calendars.Read`
* `Domain.Read.All`
* `Group.Read.All`
* `InformationProtectionPolicy.Read.All`
* `MailboxSettings.Read`
* `offline_access`
* `RoleManagement.Read.All`
* `User.Read.All`
* `UserAuthenticationMethod.Read.All`
* `Files.Read.All`
* `AuditLog.Read.All`
* `AiEnterpriseInteraction.Read.All`

These permissions follow the principle of least privilege to ensure that only the minimum required access is granted.

Additionally, to [remediate findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#remediate-findings), CASB requires the following permissions:

* `Application.ReadWrite.All`
* `AuditLog.Read.All`
* `AiEnterpriseInteraction.Read.All`
* `Calendars.ReadWrite`
* `Domain.ReadWrite.All`
* `Files.ReadWrite.All`
* `Group.ReadWrite.All`
* `InformationProtectionPolicy.Read.All`
* `MailboxSettings.ReadWrite`
* `IdentityRiskyUser.ReadWrite.All`
* `RoleManagement.ReadWrite.Directory`
* `User.ReadWrite.All`
* `UserAuthenticationMethod.ReadWrite.All`
* `Directory.ReadWrite.All`
* `GroupMember.ReadWrite.All`
* `Organization.ReadWrite.All`
* `Mail.ReadWrite`

To learn more about each permission, refer to the [Microsoft Graph permissions documentation ↗](https://docs.microsoft.com/en-us/graph/permissions-reference).

## Security findings

The Microsoft 365 integration currently scans for the following findings, or security risks. Findings are grouped by category and then ordered by [severity level](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#severity-levels).

To stay up-to-date with new CASB findings as they are added, bookmark this page or subscribe to its [RSS feed](https://github.com/cloudflare/cloudflare-docs/commits/production/src/content/docs/cloudflare-one/integrations/cloud-and-saas/microsoft-365.mdx.atom).

### User account settings

Keep user accounts safe by ensuring the following settings are maintained. Review password configurations and password strengths to ensure alignment to your organization's security policies and best practices.

| Finding type                                            | FindingTypeID                        | Severity |
| ------------------------------------------------------- | ------------------------------------ | -------- |
| Microsoft: FIDO2 authentication method unattested       | 5a9fd288-c04f-4f7a-8976-bfd5464c6cf1 | Low      |
| Microsoft: Provisioning error for on-prem user          | 3123d99e-a83c-4d9d-9a10-80da5af6dee5 | Low      |
| Microsoft: Password expiration disabled for user        | ce8cc363-7cbb-445e-8385-79ae7348e430 | Low      |
| Microsoft: Password not changed for 90+ days            | 93be1fd1-b6c6-4b98-a04c-121d5ea66745 | Low      |
| Microsoft: Strong password disabled for user            | aecfdcb2-ec1f-4571-be3c-4ae46c93125e | Low      |
| Microsoft: Cloud sync disabled for on-prem user         | 8370628b-73f1-41a5-bbff-4d5adee7bf33 | Low      |
| Microsoft: Weak Windows Hello for Business key strength | 6fae390f-07a3-4577-9821-034a7b29e18e | Low      |
| Microsoft: On-prem user not synced in 7+ days           | 1eefc5a1-e665-431a-b939-cfbb76a309f5 | Low      |
| Microsoft: User is not a legal adult                    | 329030a3-db43-4959-9d92-2616a42f1731 | Low      |
| Microsoft: User configured proxy addresses              | 61406f68-feea-43c5-bda8-b7c4ef9b83cf | Low      |
| Microsoft: User account disabled                        | 0a8bd094-9138-4e7f-8ce8-bebdf5c27c4e | Low      |
| Microsoft: Reusable temporary access pass               | 98571e6b-c323-48bc-8c60-f0425c7f9342 | Low      |
| Microsoft: Long-lived temporary access pass             | 45cdbd9c-1594-488b-973e-7c62c6e7234e | Low      |

### File sharing

Get alerted when files in your Microsoft 365 account have their permissions changed to a less secure setting. Additionally, you can automatically remediate certain finding types directly from CASB. For more information, refer to [Remediate findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#remediate-findings).

| Finding type                                           | FindingTypeID                        | Severity |
| ------------------------------------------------------ | ------------------------------------ | -------- |
| Microsoft: File publicly accessible with edit access   | 85241e6b-205f-4de6-a1d1-325656130995 | Critical |
| Microsoft: Folder publicly accessible with edit access | c9662c5c-c3d6-453b-9367-281e024f7e7a | Critical |
| Microsoft: File publicly accessible with view access   | a2b40dc9-b96a-4ace-b8f8-739c2be37dbd | High     |
| Microsoft: Folder publicly accessible with view access | 7c673785-8b70-41bc-b7d4-d0f346487ff6 | High     |
| Microsoft: File shared company-wide with edit access   | a81a79c8-a0bf-4c60-aa46-7547b4d34266 | Medium   |
| Microsoft: File shared company-wide with view access   | 364c9c0e-684b-4a83-bf28-fdbb1430bb59 | Medium   |
| Microsoft: Folder shared company-wide with edit access | 80f73d47-7dcf-4997-8ed3-6564c8388bd1 | Medium   |
| Microsoft: Folder shared company-wide with view access | f3fc8ae6-815e-4d5f-a57e-b00d5413f98c | Medium   |

To access some file findings, you may need to review shared links. For more information, refer to [View shared files](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#view-shared-files).

### Data Loss Prevention (optional)

These findings will only appear if you [added DLP profiles](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/) to your CASB integration.

Additionally, you can automatically remediate certain finding types directly from CASB. For more information, refer to [Remediate findings](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/manage-findings/#remediate-findings).

| Finding type                                                                | FindingTypeID                        | Severity |
| --------------------------------------------------------------------------- | ------------------------------------ | -------- |
| Microsoft: File publicly accessible with edit access with DLP Profile match | 7b6ecb52-852f-4184-bf19-175fe59202b7 | Critical |
| Microsoft: File publicly accessible with view access with DLP Profile match | 8150f237-576d-4b48-8839-0c257f612171 | High     |
| Microsoft: File shared company-wide with edit access with DLP Profile match | f838ec6b-7d7a-4c1c-9c61-958ac24c27fa | Medium   |
| Microsoft: File shared company-wide with view access with DLP Profile match | 0b882cf3-7e33-4c58-b425-0202206a2c10 | Medium   |

### Microsoft 365 Copilot / AI

These findings will only appear if you [added DLP profiles](https://developers.cloudflare.com/cloudflare-one/cloud-and-saas-findings/casb-dlp/) to your CASB integration.

Detect DLP matches in content used and shared within Microsoft's artificial intelligence (AI) offering, Microsoft 365 Copilot.

| Finding type                                              | FindingTypeID                        | Severity |
| --------------------------------------------------------- | ------------------------------------ | -------- |
| Microsoft: Copilot Referenced File with DLP Profile match | fa7b06bd-cf63-41fc-9afa-a20598f7a52d | High     |
| Microsoft: Copilot AI Response with DLP Profile match     | 176b9299-0cee-4bbb-9c59-b18611228454 | High     |
| Microsoft: Copilot User Prompt with DLP Profile match     | 1c5f1cdf-3e08-4a83-baf9-fc8e123877ab | High     |

### Third-party apps

Identify and get alerted about the third-party apps that have access to at least one service in your Microsoft 365 domain. Additionally, receive information about which services are being accessed and by whom to get full visibility into [shadow IT](https://www.cloudflare.com/learning/access-management/what-is-shadow-it/).

| Finding type                              | FindingTypeID                        | Severity |
| ----------------------------------------- | ------------------------------------ | -------- |
| Microsoft: App not certified by Microsoft | 3f049bb1-3709-4d8f-8591-59dd034cf396 | Low      |
| Microsoft: App not attested by publisher  | d7390d6b-f466-4293-8528-6218e29b1179 | Low      |
| Microsoft: App disabled by Microsoft      | b5156b76-caaa-4ca8-bdb7-ea282da62356 | Low      |

### Calendar sharing

Get alerted when calendars in your Microsoft 365 account have their permissions changed to a less secure setting.

| Finding type                          | FindingTypeID                        | Severity |
| ------------------------------------- | ------------------------------------ | -------- |
| Microsoft: Calendar shared externally | 7d2d9b00-3871-4abf-9e65-f29cf00c428b | Low      |

### Email administrator settings

Discover suspicious or insecure email configurations in your Microsoft domain. Missing SPF and DMARC records make it easier for bad actors to spoof email, while SPF records configured to another domain can be a potential warning sign of malicious activity.

| Finding type                                        | FindingTypeID                        | Severity |
| --------------------------------------------------- | ------------------------------------ | -------- |
| Microsoft: Domain SPF record allows any IP address  | 27893e48-663e-43f9-83d4-c158c50259d0 | High     |
| Microsoft: Domain SPF record not present            | 009093d9-43df-45a2-bdc6-2f35fc3a0c71 | Medium   |
| Microsoft: Domain DMARC record not present          | bb3d3760-2c4e-4161-9164-cff92e809f9c | Medium   |
| Microsoft: Domain DMARC not enforced                | a020d87d-332b-49d1-acc3-16c19d72fba4 | Medium   |
| Microsoft: Domain DMARC not enforced for subdomains | 1837a549-4d4e-4101-917c-e9a4036e0c08 | Medium   |
| Microsoft: Domain DMARC only partially enforced     | 943414ed-7c79-4d17-a253-8d73f34dcc1d | Medium   |
| Microsoft: Domain not verified                      | dd1e9aba-57ee-4cf1-a895-dd2f1fc166a7 | Medium   |
| Microsoft: App certification expires within 90 Days | d5ede282-0339-4983-88f3-849ac59ba840 | Low      |

### Email forwarding

Get alerted when users set their email to be forwarded externally. This can either be a sign of unauthorized activity, or an employee unknowingly sending potentially sensitive information to a personal email.

| Finding type                                                     | FindingTypeID                        | Severity |
| ---------------------------------------------------------------- | ------------------------------------ | -------- |
| Microsoft: Active message rule forwards externally as attachment | 9efca21a-aba2-452f-bb17-e66d34b58765 | Low      |
| Microsoft: Active message rule forwards externally               | 42fa3fe6-da72-4bf0-9bc9-5faa4a118ec4 | Low      |
| Microsoft: Active message rule redirects externally              | b75ba81e-c98d-4b78-b5a1-47a2f54499e8 | Low      |

## Microsoft Information Protection (MIP) sensitivity labels

Note

Requires [Cloudflare Data Loss Prevention (DLP)](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/).

Microsoft provides [MIP sensitivity labels ↗](https://learn.microsoft.com/en-us/microsoft-365/compliance/sensitivity-labels?view=o365-worldwide) to classify and protect sensitive data. When you add the CASB Microsoft 365 integration, Cloudflare will automatically retrieve the labels from your Microsoft account and populate them in a [DLP Profile](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/integration-profiles/).

Warning

DLP does not filter or log [MIP sublabels ↗](https://learn.microsoft.com/purview/sensitivity-labels#sublabels-that-use-parent-labels-or-label-groups). Only top-level sensitivity labels will be detected, filtered, and logged.

To ensure DLP will detect and filter all sensitive data, use only [MIP top-level labels ↗](https://learn.microsoft.com/purview/sensitivity-labels#top-level-labels).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/#page","headline":"Microsoft 365 · Cloudflare One docs","description":"Reference information for Microsoft 365 in Zero Trust integrations.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/cloud-and-saas/microsoft-365/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Microsoft"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/","name":"Cloud and SaaS integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/cloud-and-saas/microsoft-365/","name":"Microsoft 365"}}]}
```
