---
title: Permissions
description: Review API permissions required for Cloudflare Logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Permissions

Below is a description of the available permissions for tokens and roles as they relate to Logs. For information about how to create an API token, refer to [Creating API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

## Tokens

* **Logs: Read** \- Grants read access to logs using Logpull or Instant Logs.
* **Logs: Write** \- Grants read and write access to Logpull and Logpush, and read access to Instant Logs. Note that all Logpush API operations require **Logs: Write** permission because Logpush jobs contain sensitive information.

Note

* **Zone-scoped datasets** require a **zone-scoped token**.
* **Account-scoped datasets** require an **account-scoped token**.

Permissions must be explicitly configured at the appropriate level (zone or account) to ensure access to the desired API endpoints.

## Roles

**Super Administrator**, **Administrator** and the **Log Share** roles have full access to Logpull, Logpush and Instant Logs.

Only roles with **Log Share** edit permissions can read and configure Logpush jobs because job configurations may contain sensitive information.

The **Administrator Read only** and **Log Share Reader** roles only have access to Instant Logs and Logpull. This role does not have permissions to view the configuration of Logpush jobs.

### Zero Trust datasets

To view, create, update, or delete Logpush jobs for Zero Trust datasets (Access, Gateway, and DEX) users must have both the `Logs Edit` and `Zero Trust: PII Read` permissions.

Note

The **Administrator** role includes `Logs Edit` but does not include `Zero Trust: PII Read`. A Super Administrator must explicitly assign the **Cloudflare Zero Trust PII** role as an add-on to any user who needs to manage Logpush jobs for Zero Trust datasets. Refer to [Zero Trust roles and permissions](https://developers.cloudflare.com/cloudflare-one/roles-permissions/) for more information.

If you encounter the error `reading job for product '<product>' is not allowed (1004)`, this indicates that the API token you are using does not have the required permissions. Ensure your token or user account has both permissions listed above.

For more details, refer to the [Logpush Permission Update for Zero Trust Datasets ↗](https://developers.cloudflare.com/changelog/2025-11-05-logpush-permissions-update/).

### Assign or remove a role

To check the list of members in your account, or to manage roles and permissions:

1. Navigate to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login) and select your account.
2. From your Account Home, go to **Manage Account** \> **Members**.
3. Enter a member’s email address to add them to your account, and select **Invite**.
4. Alternatively, scroll down to the **Members** card to find a list of members with their status and role.

For more information, refer to [Managing roles within your Cloudflare account](https://developers.cloudflare.com/fundamentals/manage-members/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/logpush/permissions/#page","headline":"Permissions · Cloudflare Logs docs","description":"Review API permissions required for Cloudflare Logs.","url":"https://developers.cloudflare.com/logs/logpush/permissions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/logpush/","name":"Logpush"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/logpush/permissions/","name":"Permissions"}}]}
```
