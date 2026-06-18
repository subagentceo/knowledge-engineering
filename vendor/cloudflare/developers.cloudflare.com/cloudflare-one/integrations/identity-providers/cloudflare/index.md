---
title: Cloudflare as identity provider
description: Use Cloudflare as an identity provider for Access policies, allowing authentication based on Cloudflare account membership.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare as identity provider

Cloudflare Access can use Cloudflare itself as an identity provider, allowing you to build Access policies that match on Cloudflare account membership. This is useful for scenarios where you want to restrict access to users who are members of a specific Cloudflare account, without requiring a third-party identity provider.

When a user authenticates through the Cloudflare identity provider, Access verifies their Cloudflare account membership and grants or denies access based on your policy configuration.

## Set up Cloudflare as an identity provider

* [ Dashboard ](#tab-panel-7210)
* [ API ](#tab-panel-7211)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Under **Your identity providers**, select **Add new identity provider**.
3. Select **Cloudflare**.
4. (Optional) Enable **Restrict to account members** if you want to limit authentication to users who are members of your Cloudflare account. When disabled, any user with a Cloudflare account can authenticate.
5. Select **Save**.

Make a `POST` request to the [Identity Providers](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/identity%5Fproviders/methods/create/) endpoint:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Access: Organizations, Identity Providers, and Groups Write`

Add an Access identity provider

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/identity_providers" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Cloudflare",

    "type": "cloudflare",

    "config": {

        "restrict_to_account_members": true

    }

  }'


```

## Configuration options

| Option                          | Description                                                                                                                                                                  | Default  |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| **Restrict to account members** | When enabled, only users who are members of your Cloudflare account can authenticate. When disabled, any Cloudflare user can authenticate (subject to your Access policies). | Disabled |

## Use Cloudflare account membership in policies

After configuring Cloudflare as an identity provider, you can use the **Cloudflare Account Member** selector in your [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/). This selector matches users based on their membership in a Cloudflare account.

* If you omit the account ID, the selector matches members of the current account (the account where the Access policy is configured).
* If you specify an account ID, the selector matches members of that specific account.

This is useful for cross-account access scenarios where you need to grant access to users from a different Cloudflare account.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/cloudflare/#page","headline":"Cloudflare as identity provider · Cloudflare One docs","description":"Use Cloudflare as an identity provider for Access policies, allowing authentication based on Cloudflare account membership.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/cloudflare/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/cloudflare/","name":"Cloudflare as identity provider"}}]}
```
