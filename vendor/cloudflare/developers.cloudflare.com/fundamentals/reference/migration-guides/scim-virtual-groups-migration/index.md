---
title: SCIM v1 to v2 Migration
description: Migrate from SCIM v1 Virtual Groups to Cloudflare's GA SCIM User Groups
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SCIM v1 to v2 Migration

Cloudflare's first iteration of SCIM integration introduced a concept called _Virtual Groups_, typically identified by the pattern `CF-<accountID>-<Role Name>` in your IdP. Virtual Groups were an early implementation of group-based access control: they acted as placeholders created automatically by SCIM to map IdP groups to account memberships.

While customers could add or remove members from these groups within their IdP, Virtual Groups had important limitations:

* They could not be renamed or deleted in the IdP.
* They could not be managed within Cloudflare.
* Functionally, managing a Virtual Group was equivalent to syncing users and editing each member’s policies individually.

With the GA of [User Groups](https://developers.cloudflare.com/changelog/2025-06-23-user-groups-ga/), Virtual Groups are now deprecated. Customers should migrate to [User Groups](https://developers.cloudflare.com/fundamentals/manage-members/user-groups/), which provide a more flexible and scalable way to assign and manage policies. To maintain SCIM synchronization with the Cloudflare Dashboard, we strongly recommend migrating to **SCIM User Groups**.

If you have never synced a group linked to a `CF-<accountID>-<Role Name>` Virtual Group from your IdP to Cloudflare, no action is needed.

## Migration steps

1. **Create a new SCIM integration** in your IdP using an [Account Owned Token](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/) provisioned in Cloudflare.
2. **Assign users & groups to your new Application** in your IdP, following a naming convention that aligns with your internal processes.
3. **Sync groups to Cloudflare** and verify they appear in the **User Groups** pane of the Cloudflare Dashboard.
4. **Attach permission policies** to the new User Groups so members inherit the correct access upon assignment to the group.
5. **Migrate users** into the new groups incrementally, testing synchronization of users & groups into the Cloudflare Dashboard.
6. **Clean up legacy resources** by removing SCIM v1 Virtual Groups and IdP mappings that follow the `CF-<accountID>-<Role Name>` pattern.

## More resources

* [User Groups changelog](https://developers.cloudflare.com/changelog/2025-06-02-user-groups-beta/)
* [User Groups documentation](https://developers.cloudflare.com/fundamentals/manage-members/user-groups/)
* [Create an Account Owned Token](https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/#create-an-account-owned-token)
* [SCIM provisioning setup guide](https://developers.cloudflare.com/fundamentals/account/account-security/scim-setup/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/migration-guides/scim-virtual-groups-migration/#page","headline":"SCIM v1 to v2 Migration · Cloudflare Fundamentals docs","description":"Migrate from SCIM v1 Virtual Groups to Cloudflare's GA SCIM User Groups","url":"https://developers.cloudflare.com/fundamentals/reference/migration-guides/scim-virtual-groups-migration/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/migration-guides/","name":"Migration guides"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/reference/migration-guides/scim-virtual-groups-migration/","name":"SCIM v1 to v2 Migration"}}]}
```
