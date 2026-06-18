---
title: IdP federation
description: Share an identity provider across multiple Cloudflare accounts in your organization using IdP federation.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# IdP federation

IdP federation allows organizations with multiple Cloudflare accounts to use a single identity provider (IdP) configuration across accounts. Instead of configuring the same IdP (for example, Okta or Entra ID) separately in every account, you configure it once in a source account and share it with the other accounts in your organization.

Each recipient account gets a read-only IdP connection that routes authentication back to the source account through a bridge — a hidden application in the source account that brokers the cross-account login. End users sign in with their existing IdP credentials, and each account's Access policies evaluate the resulting identity just like any other IdP login.

## How it works

Setting up IdP federation is a two-step process:

1. **Create a federation grant.** A grant permits an IdP to be shared across accounts. Creating a grant also provisions a hidden bridge application in the source account.
2. **Share the grant.** Distribute the grant to other accounts in your organization. Each recipient account is automatically provisioned with a read-only IdP connection that points to the bridge.

When a user in a recipient account authenticates, the request is routed through the bridge to the source IdP. The source IdP handles authentication, and the resulting identity claims are passed back to the recipient account's Access policies.

## Prerequisites

* You must have permission to edit the source IdP in the source account.
* You must be a member of a Cloudflare organization.
* The source account must belong to a Cloudflare organization.

## Share an IdP

* [ Dashboard ](#tab-panel-7222)
* [ API ](#tab-panel-7223)

The dashboard combines grant creation and sharing into a single flow. If a federation grant already exists for the IdP, it will be reused; otherwise, one is created automatically.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Find the IdP you want to share and select the three dots menu.
3. Select **Share**.
4. Select the recipient accounts you want to share the IdP with.
5. Review the sharing configuration and select **Confirm**.

The IdP is shared to the selected accounts automatically. Each recipient account receives a read-only IdP connection that points to the bridge in the source account.

Sharing an IdP via the API is a two-step process: create a federation grant, then share it with recipient accounts.

#### 1\. Create a federation grant

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/access/idp_federation_grants" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "idp_id": "<IDP_UUID>"

  }'


```

The response includes the grant `id`, which you will use in the next step. To list all federation grants in your account:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/access/idp_federation_grants" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

#### 2\. Share the grant with recipient accounts

Share the grant with one or more recipient accounts.

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/shares" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Identity provider: OpenID Connect",

    "recipients": [

        {

            "account_id": "<RECIPIENT_ACCOUNT_ID>"

        }

    ],

    "resources": [

        {

            "resource_account_id": "<SOURCE_ACCOUNT_ID>",

            "resource_id": "<GRANT_ID>",

            "resource_type": "idp-federation-grant",

            "meta": {}

        }

    ]

  }'


```

Each recipient account will be automatically provisioned with a read-only IdP connection that points to the bridge.

## Stop Sharing an IdP

To stop sharing an IdP, delete the federation grant, as well as the share.

Warning

Deleting the federation grant immediately removes the IdP connection from all recipient accounts. Any Access policies in those accounts that reference the federated IdP will no longer match, which may lock users out. Verify that recipient accounts have alternative authentication methods before you stop sharing.

* [ Dashboard ](#tab-panel-7220)
* [ API ](#tab-panel-7221)

The dashboard handles both grant and share deletion in a single flow.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Integrations** \> **Identity providers**.
2. Find the shared IdP and select the three dots menu.
3. Select **Unshare**.
4. Confirm the action.

Unfederating an IdP via the API is a two-step process. Deleting the grant stops the sharing and removes the read-only IdP from recipient accounts. You can optionally clean up the share record afterward.

#### 1\. Delete the federation grant

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/access/idp_federation_grants/%7Bgrant_id%7D" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

#### 2\. (Optional) Delete the share

Terminal window

```

curl "https://api.cloudflare.com/client/v4/accounts/%7Baccount_id%7D/shares/%7Bshare_id%7D" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

## Limitations

* An account can federate at most one IdP as a source.
* A source IdP cannot be deleted while it has a federation grant associated with it. Delete the grant first.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/idp-federation/#page","headline":"IdP federation · Cloudflare One docs","description":"Share an identity provider across multiple Cloudflare accounts in your organization using IdP federation.","url":"https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/idp-federation/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-06-04","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/integrations/identity-providers/","name":"Identity providers"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/integrations/identity-providers/idp-federation/","name":"IdP federation"}}]}
```
