---
title: Secrets Store access control
description: Learn about role-based access control with Cloudflare Secrets Store
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/secrets-store/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Secrets Store access control

Secrets Store allows security administrators to have more control by implementing role-based access. For details about roles at Cloudflare, refer to [Fundamentals](https://developers.cloudflare.com/fundamentals/manage-members/).

Availability

While all Cloudflare accounts will have access to the Secrets Store section on the dashboard, only users with the necessary permissions will be able to interact with it, as described below.

## Relevant roles

Refer to the list below for default role definitions.

#### Super Administrator

* Can create, edit, duplicate, delete, and view secrets metadata.
* Can [add a Secrets Store binding to a Worker](https://developers.cloudflare.com/secrets-store/integrations/workers/).
* Can [create an association between a secret and an AI gateway](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

#### Secrets Store Admin

* Can create, edit, duplicate, delete, and view secrets metadata.

#### Secrets Store Deployer

* Can view secrets metadata but cannot create, edit, duplicate, nor delete secrets.
* Can [add a Secrets Store binding to a Worker](https://developers.cloudflare.com/secrets-store/integrations/workers/).
* Can [create an association between a secret and an AI gateway](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

#### Secrets Store Reporter

* Can view secrets metadata.
* Cannot perform any actions (create, edit, duplicate, delete secrets), nor use Secrets Store integrations with other Cloudflare products.

## API token permissions

The following API token permissions can also be used to grant access to Secrets Store resources.

* **Account Secrets Store Edit**: Allows a user to create, edit, duplicate, or delete secrets.
* **Account Secrets Store Read**: Allows a user to view secrets metadata.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/secrets-store/access-control/#page","headline":"Secrets Store access control · Cloudflare Secrets Store docs","description":"Learn about role-based access control with Cloudflare Secrets Store","url":"https://developers.cloudflare.com/secrets-store/access-control/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/secrets-store/","name":"Secrets Store"}},{"@type":"ListItem","position":3,"item":{"@id":"/secrets-store/access-control/","name":"Secrets Store access control"}}]}
```
