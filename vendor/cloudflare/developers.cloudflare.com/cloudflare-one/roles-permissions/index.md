---
title: Roles and permissions
description: Reference information for Roles and permissions in Cloudflare One.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Roles and permissions

When creating a Cloudflare Zero Trust account, you will be given the Super Administrator role. As a Super Administrator, you can invite members to join your Zero Trust account and assign them different roles. There is no limit to the number of members which can be added to a given account. Any members with the proper permissions will be able to make configuration changes while actively logged into Zero Trust (unless [read-only mode](https://developers.cloudflare.com/cloudflare-one/api-terraform/#set-dashboard-to-read-only) is enabled).

To check the list of members in your account, or to manage roles and permissions, refer to our [Account setup](https://developers.cloudflare.com/fundamentals/manage-members/) documentation.

## Zero Trust roles

Only Super Administrators will be able to assign or remove the following roles from users in their account. Scroll to the right to see a full list of permissions for each role.

| Access Read                                                      | Access Edit | Gateway Read | Gateway Edit | Gateway Report | DNS Location Read | DNS Location Edit | Billing Read | Billing Edit | DEX Read | DEX Edit | CASB Read | CASB Edit |   |
| ---------------------------------------------------------------- | ----------- | ------------ | ------------ | -------------- | ----------------- | ----------------- | ------------ | ------------ | -------- | -------- | --------- | --------- | - |
| Super Administrator                                              | ✅           | ✅            | ✅            | ✅              | ✅                 | ✅                 | ✅            | ✅            | ✅        | ✅        | ✅         | ✅         | ✅ |
| Cloudflare Zero Trust[1](#user-content-fn-1)                     | ✅           | ✅            | ✅            | ✅              | ✅                 | ✅                 | ✅            | ✅            | ❌        | ✅        | ✅         | ✅         | ✅ |
| Cloudflare Access                                                | ✅           | ✅            | ✅            | ❌              | ✅                 | ❌                 | ❌            | ✅            | ❌        | ❌        | ❌         | ❌         | ❌ |
| Cloudflare Gateway                                               | ✅           | ❌            | ✅            | ✅              | ✅                 | ✅                 | ✅            | ✅            | ❌        | ❌        | ❌         | ❌         | ❌ |
| Cloudflare Zero Trust Read Only                                  | ✅           | ❌            | ✅            | ❌              | ✅                 | ✅                 | ❌            | ✅            | ❌        | ✅        | ❌         | ✅         | ❌ |
| Cloudflare Zero Trust Reporting                                  | ❌           | ❌            | ❌            | ❌              | ✅                 | ❌                 | ❌            | ✅            | ❌        | ✅        | ❌         | ❌         | ❌ |
| Cloudflare Zero Trust DNS Locations Write[2](#user-content-fn-2) | ❌           | ❌            | ❌            | ❌              | ❌                 | ✅                 | ✅            | ❌            | ❌        | ❌        | ❌         | ❌         | ❌ |
| Cloudflare DEX                                                   | ❌           | ❌            | ❌            | ❌              | ❌                 | ❌                 | ❌            | ❌            | ❌        | ✅        | ✅         | ❌         | ❌ |
| Cloudflare CASB Read                                             | ❌           | ❌            | ✅            | ❌              | ❌                 | ❌                 | ❌            | ❌            | ❌        | ❌        | ❌         | ✅         | ❌ |
| Cloudflare CASB                                                  | ❌           | ❌            | ✅            | ❌              | ❌                 | ❌                 | ❌            | ❌            | ❌        | ❌        | ❌         | ✅         | ✅ |

### Cloudflare Zero Trust PII

By default, only Super Administrators can view end users' PII in the Gateway activity logs, such as Device IDs, Source IPs, or user emails. No other roles will have the ability to read PII unless Super Administrators explicitly assign the **Cloudflare Zero Trust PII** role to them.

The Cloudflare Zero Trust PII role should be considered an add-on role, to be combined with any role from the table above. For example, Super Administrators may decide to assign the Cloudflare Gateway role to a user, and add the Cloudflare Zero Trust PII role to allow that user to access PII in the Gateway logs.

Note

The Cloudflare Zero Trust PII role does not apply to Access authentication logs. PII is always visible in Access logs.

## Email security roles

For more information on Email security roles, refer to [Account-scoped roles](https://developers.cloudflare.com/fundamentals/manage-members/roles/#account-scoped-roles).

* **Cloudflare Zero Trust**: Can edit Cloudflare [Zero Trust](https://developers.cloudflare.com/cloudflare-one/). Grants administrator access to all Zero Trust products including Access, Gateway, the Cloudflare One Client, Tunnel, Browser Isolation, CASB, DLP, DEX, and Email security.
* **Cloudflare Zero Trust PII**: Can read PII in Zero Trust. This includes Email security.
* **Email security Analyst** and **Email security Configuration Admin**: Has full access to all admin features in Email security.
* **Email security Integration Admin**: Can read and set up integrations only.
* **Email security Configuration Admin**: Has administrator access. Cannot take actions on emails, or read emails.
* **Email security Analyst**: Has analyst access. Can take action on emails and read emails.
* **Email security Reporting**: Can read metrics.
* **Email security Read Only**: Can read all information, but cannot take action on anything.
* **Email security Policy Admin**: Can read all settings, but only write [allow policies](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/allow-policies/), [trusted domains](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/trusted-domains/), and [blocked senders](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/blocked-senders/).

## Footnotes

1. The **Cloudflare Zero Trust** role grants administrator access to all Zero Trust products including Access, Gateway, the Cloudflare One Client, Tunnel, Browser Isolation, CASB, DLP, DEX, and Email security. [↩](#user-content-fnref-1)
2. Users with the **Cloudflare Zero Trust DNS Locations Write** role can view all DNS locations for an organization but can only create and edit [secure DNS locations](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/#secure-dns-locations). [↩](#user-content-fnref-2)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/roles-permissions/#page","headline":"Roles and permissions · Cloudflare One docs","description":"Reference information for Roles and permissions in Cloudflare One.","url":"https://developers.cloudflare.com/cloudflare-one/roles-permissions/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/roles-permissions/","name":"Roles and permissions"}}]}
```
