---
title: Require Access protection
description: Require Access protection in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Require Access protection

Cloudflare Access allows you to require Access protection for all hostnames in your account. When this setting is turned on, traffic to any hostname without a matching [Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/) is automatically blocked.

This deny-by-default approach prevents accidental exposure of internal resources to the public Internet. Without this setting, a developer could deploy a new application or create a DNS record and inadvertently expose the resource before configuring an Access application.

## Turn on Access protection

Warning

Turning on Access protection blocks traffic to any hostname that does not have an Access application. Before turning on this setting, verify that all publicly accessible hostnames have an [Access application with an Allow or Bypass policy](#allow-traffic-to-a-hostname).

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and go to **Zero Trust** \> **Access controls** \> **Access settings**.
2. Turn on **Block traffic to all domains in this account**. You will see a dialog confirming you understand the scope of this change. Select **Confirm**.  
Traffic to all hostnames in the account is now blocked unless an Access application exists for the hostname.
3. (Optional) Under **Hostnames to Exempt**, select specific domains to exempt from the **Block traffic to all domains in this account** setting. Traffic to exempted hostnames is allowed even if no Access application exists.  
Note  
Cloudflare recommends limiting exemptions to hostnames that host only public-facing content. Internal applications should have an Access application configured.

## Allow traffic to a hostname

To allow traffic to a hostname when **Block traffic to all domains in this account** is turned on:

1. [Create an Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) for the hostname.
2. Add an [Allow policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#allow) to grant access to authorized users.
3. (Optional) Add a [Bypass policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#bypass) if the hostname should be publicly accessible without authentication.

## Blocked request behavior

When a user attempts to access a hostname without an Access application, Cloudflare displays a block page with `Error 1050: This resource is blocked by this account's Default-Deny policy.` The user cannot proceed until an administrator creates an Access application for that hostname.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/require-access-protection/#page","headline":"Require Access protection · Cloudflare One docs","description":"Require Access protection in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/require-access-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Security"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/access-settings/","name":"Access settings"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/access-settings/require-access-protection/","name":"Require Access protection"}}]}
```
