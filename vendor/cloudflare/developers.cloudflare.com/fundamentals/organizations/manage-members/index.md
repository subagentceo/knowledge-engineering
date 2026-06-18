---
title: Manage members
description: Invite and manage members within a Cloudflare Organization, including assigning Super Administrator access.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage members

## Organization Super Administrator

When you create an organization, you become an Organization Super Administrator. This role provides implicit access to all accounts in your organization and allows you to manage memberships at the organization level.

Implicit access means you do not need explicit membership on each account. When you access any account within your organization, you automatically have Super Administrator permissions.

Note

Any Organization Super Administrator can add or remove other Organization Super Administrators at any time.

## Invite members

You can invite additional members to your organization. Invited members receive implicit Super Administrator access to all accounts in the organization.

1. From the organization overview, select **Members**.
2. Select **Invite member**.
3. Enter the email address.
4. Select **Send invitation**.

The user receives an email invitation. After accepting, they have implicit access to all accounts in the organization.

Invited members must have 2FA or SSO enabled to join.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/organizations/manage-members/#page","headline":"Manage members · Cloudflare Fundamentals docs","description":"Invite and manage members within a Cloudflare Organization, including assigning Super Administrator access.","url":"https://developers.cloudflare.com/fundamentals/organizations/manage-members/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/organizations/","name":"Organizations"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/organizations/manage-members/","name":"Manage members"}}]}
```
