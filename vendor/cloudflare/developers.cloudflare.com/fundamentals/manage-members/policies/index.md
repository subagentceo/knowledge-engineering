---
title: Policies
description: Understand how Cloudflare account member policies combine actors, roles, and scopes to define access permissions.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Policies

Policies define what access a given user has to your account or domains, and are constructed out of three parts:

1. An actor (your user).
2. A `ResourceGroup` (a scope).
3. A `PermissionGroup` (roles).

An account member can have one or several of these policies to represent the most appropriate access. A member’s effective permissions are the union of all policies assigned to them—whether directly, or through group membership.

To increase the usability and flexibility of Cloudflare's role system, changes to the API have been made to expose these underlying data principles and allow users to interact with them.

For example, you may want to assign multiple policies and use scopes to control access to an account where you have a single account with both Production and Staging domains, and a user that should be able see the whole account, purge the production domains, but have the ability to configure the staging domains.

## Manage policies

A set of standard API endpoints is present on every account that allow access to your members, which has recently been enhanced by a list of `resourceGroups` and `PermissionGroups`.

* A `resourceGroup` is a unique identifier for the scope for which a policy applies.
* A `permissionGroup` is a unique identifier for the set of roles that are assigned to a given policy.

Refer to the [API documentation](https://developers.cloudflare.com/api/) for more information.

## Viewing Effective Permissions

Cloudflare supports assigning permissions to members both directly and through [User Groups](https://developers.cloudflare.com/fundamentals/manage-members/user-groups/). A member’s effective permissions are additive; they represent the union of all permissions granted directly to a member and those inherited through a member's group membership.

Note

To understand a member’s full access, check both the **Members** and **User Groups** views:

* The **Members** view shows only the permissions explicitly assigned to the user.
* Permissions inherited through [User Groups](https://developers.cloudflare.com/fundamentals/manage-members/user-groups/) are not shown on the Members page. To see these, go to the Groups tab, find the groups the user belongs to, and review the policies assigned to each group.

Cloudflare is actively working on improvements to consolidate this view in a future update.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/manage-members/policies/#page","headline":"Policies · Cloudflare Fundamentals docs","description":"Understand how Cloudflare account member policies combine actors, roles, and scopes to define access permissions.","url":"https://developers.cloudflare.com/fundamentals/manage-members/policies/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/manage-members/","name":"Members and permissions"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/manage-members/policies/","name":"Policies"}}]}
```
