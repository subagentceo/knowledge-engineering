---
title: Service API token
description: Create a service API token to grant AI Search read access to R2 buckets for indexing.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Service API token

A service API token grants AI Search permission to access [R2](https://developers.cloudflare.com/r2/) buckets in your account. This token is only required if you connect an R2 bucket as a data source. If you use a website or upload files directly through the [Items API](https://developers.cloudflare.com/ai-search/api/items/workers-binding/), you do not need a service API token.

## When you need a service API token

You need a service API token when you create an AI Search instance with `type: "r2"`. The token authorizes AI Search to read objects from your R2 bucket for indexing.

## Create via the dashboard or Wrangler

The simplest way to get a service API token is to create an R2-backed AI Search instance through the [dashboard](https://developers.cloudflare.com/ai-search/get-started/dashboard/) or [Wrangler CLI](https://developers.cloudflare.com/ai-search/get-started/wrangler/) at least once. Cloudflare creates and registers a service token for you automatically during the setup flow.

Once created, the token is saved to your account and reused across all AI Search instances. You do not need to create a new token for each instance.

## Create via the API

If you need to create a service API token programmatically, follow these steps.

### 1\. Create an API token with token creation permissions

You need an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with permission to create other tokens.

1. In the Cloudflare dashboard, go to **My Profile** \> **API Tokens**.  
[ Go to **API Tokens** ](https://dash.cloudflare.com/profile/api-tokens)
2. Select **Create Token**.
3. Select **Create Custom Token**.
4. Enter a **Token name**, for example `Token Creator`.
5. Under **Permissions**, select **User** \> **API Tokens** \> **Edit**.
6. Select **Continue to summary**, then select **Create Token**.
7. Copy and save the token value. This is your `CREATOR_TOKEN`.

### 2\. Create the service token

Use the [Create token API](https://developers.cloudflare.com/api/resources/user/subresources/tokens/methods/create/) to create a service token with the AI Search Index Engine permission. Replace `<CREATOR_TOKEN>` with the token from step 1 and `<ACCOUNT_ID>` with your [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/user/tokens" \

  -H "Authorization: Bearer <CREATOR_TOKEN>" \

  -H "Content-Type: application/json" \

  --data '{

    "name": "AI Search Service API Token",

    "policies": [

      {

        "effect": "allow",

        "resources": {

          "com.cloudflare.api.account.<ACCOUNT_ID>": "*"

        },

        "permission_groups": [

          { "id": "9e9b428a0bcd46fd80e580b46a69963c" }

        ]

      }

    ]

  }'


```

Save the `id` and `value` from the response:

```

{

  "result": {

    "id": "<CF_API_ID>",

    "name": "AI Search Service API Token",

    "status": "active",

    "value": "<CF_API_KEY>"

  },

  "success": true

}


```

### 3\. Register the token with AI Search

Use the [AI Search tokens API](https://developers.cloudflare.com/api/resources/ai%5Fsearch/subresources/tokens/methods/create/) to register the service token. Replace `<API_TOKEN>` with an API token that has AI Search Edit permissions.

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/tokens" \

  -H "Authorization: Bearer <API_TOKEN>" \

  -H "Content-Type: application/json" \

  --data '{

    "cf_api_id": "<CF_API_ID>",

    "cf_api_key": "<CF_API_KEY>",

    "name": "AI Search Service Token"

  }'


```

Save the `id` from the response. This is your `token_id` to pass when creating R2-backed instances:

```

{

  "success": true,

  "result": {

    "id": "<TOKEN_ID>",

    "name": "AI Search Service Token",

    "cf_api_id": "<CF_API_ID>",

    "created_at": "2025-12-25 01:52:28",

    "enabled": true

  }

}


```

### 4\. Use the token when creating an instance

Pass the `token_id` when creating an R2-backed instance:

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/instances" \

  -H "Authorization: Bearer <API_TOKEN>" \

  -H "Content-Type: application/json" \

  --data '{

    "id": "my-r2-docs",

    "type": "r2",

    "source": "<R2_BUCKET_NAME>",

    "token_id": "<TOKEN_ID>"

  }'


```

## Manage your token

Once registered, the service API token is stored securely and reused across all AI Search instances in your account.

Warning

Do not delete your service API token. If you revoke or delete the token, any R2-backed AI Search instances will lose access to their data source and stop indexing.

### Rotate your token

To create a new service API token from the dashboard:

1. Go to an existing AI Search instance in the Cloudflare dashboard.  
[ Go to **AI Search** ](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select **Settings**.
3. Under **General**, find **Service API Token** and select the edit icon.
4. Select **Create a new token**.
5. Select **Save**.

To create a new token via the API, follow [steps 1 through 3](#1-create-an-api-token-with-token-creation-permissions) above.

### View registered tokens

List the service API tokens registered with AI Search in your account:

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai-search/tokens \

  -H "Authorization: Bearer <API_TOKEN>"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/#page","headline":"Service API token · Cloudflare AI Search docs","description":"Create a service API token to grant AI Search read access to R2 buckets for indexing.","url":"https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/indexing/","name":"Indexing"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/configuration/indexing/service-api-token/","name":"Service API token"}}]}
```
