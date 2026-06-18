---
title: Organizations
description: Manage multiple Cloudflare accounts from a single organization with centralized access control and audit logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Organizations

 Enterprise-only 

An organization is a top-level container in Cloudflare for managing multiple accounts. It allows administrators to govern accounts, members, and resources from a single location rather than managing each account individually. Organization Super Administrators have implicit access to all accounts within the organization. This means they do not need explicit membership on each account.

Note

Cloudflare Organizations is currently in public beta.

## Features

* **Centralized account management**: Assign Enterprise Accounts to your Organization and manage them from a single dashboard.
* **Implicit access**: Organization Super Administrators can access any account in the organization without requiring explicit per-account membership.
* **Aggregate audit logs**: View, filter, and download aggregate HTTP analytics across all Organization child accounts.
* **Organization-level membership**: Invite members to the organization once, granting them access to all child accounts.
* **Terraform support**: Manage Organizations with infrastructure as code from day one.

---

* [ Set up ](https://developers.cloudflare.com/fundamentals/organizations/setup/)
* [ Manage members ](https://developers.cloudflare.com/fundamentals/organizations/manage-members/)
* [ Manage organizations ](https://developers.cloudflare.com/fundamentals/organizations/manage-organization/)
* [ Limitations ](https://developers.cloudflare.com/fundamentals/organizations/limitations/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/fundamentals/organizations/#page","headline":"Organizations · Cloudflare Fundamentals docs","description":"Manage multiple Cloudflare accounts from a single organization with centralized access control and audit logs.","url":"https://developers.cloudflare.com/fundamentals/organizations/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/organizations/","name":"Organizations"}}]}
```
