---
title: How to
description: Create, update, duplicate, and delete secrets using the dashboard, API, or Wrangler.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/secrets-store/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How to

Refer to the sections below to learn about common actions you might want to take when managing your data in Secrets Store.

You must have a [Super Administrator or Secrets Store Admin role](https://developers.cloudflare.com/secrets-store/access-control/) within your Cloudflare account.

## Manage via Wrangler

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) is a command-line interface (CLI) that allows you to manage [Cloudflare Workers](https://developers.cloudflare.com/workers/) projects. Refer to [Wrangler commands](https://developers.cloudflare.com/workers/wrangler/commands/secrets-store/#secrets-store-secret) for guidance on how to use it with Secrets Store.

## Create a secret

* [ Dashboard ](#tab-panel-10536)
* [ API ](#tab-panel-10537)

1. In the Cloudflare dashboard, go to the **Secrets Store** page.  
[ Go to **Secrets Store** ](https://dash.cloudflare.com/?to=/:account/secrets-store)
2. Select **Create secret**.
3. Fill in the required fields. Note that, once the secret is saved, the secret value will no longer be available for viewing.
4. (Optional) Select **Add additional secret** to create more than one secret at a time.
5. Select **Save** to confirm.

Note

A secret `name` cannot contain spaces. Refer to [Secrets Store API](https://developers.cloudflare.com/api/resources/secrets%5Fstore/) for the full API documentation.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Secrets Store Write`

Create a secret

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets" \

  --request POST \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY" \

  --json '[

    {

        "name": "<MY_SECRET_NAME>",

        "value": "<SECRET_VALUE>",

        "scopes": [

            "workers"

        ],

        "comment": ""

    },

    {

        "name": "<MY_SECRET_NAME_2>",

        "value": "<SECRET_VALUE>",

        "scopes": [

            "workers"

        ],

        "comment": ""

    }

  ]'


```

## Duplicate a secret

Duplicate a secret to keep the same secret value but change name, scope, or comments.

* [ Dashboard ](#tab-panel-10530)
* [ API ](#tab-panel-10531)

1. In the Cloudflare dashboard, go to the **Secrets Store** page.  
[ Go to **Secrets Store** ](https://dash.cloudflare.com/?to=/:account/secrets-store)
2. Search for the secret you would like to duplicate within the existing secrets list.
3. Select the three dots next to the secret and choose **Duplicate**.
4. Edit the **Secret name**, **Permission scope**, or **Comment**, according to your needs.
5. Select **Save** to confirm.

Note

A secret `name` cannot contain spaces. Refer to [Secrets Store API](https://developers.cloudflare.com/api/resources/secrets%5Fstore/) for the full API documentation.

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets/$SECRET_ID/duplicate \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

    "name":"<NEW_DUPLICATE_NAME>",

    "scopes":["workers"],

    "comment":""

}'


```

## Edit a secret

Edit a secret to replace an existing value with a new one.

Warning

This action will cause the replacement in all services using the secret.

You can also edit the secret **Permission scope** and **Comment**.

* [ Dashboard ](#tab-panel-10532)
* [ API ](#tab-panel-10533)

1. In the Cloudflare dashboard, go to the **Secrets Store** page.  
[ Go to **Secrets Store** ](https://dash.cloudflare.com/?to=/:account/secrets-store)
2. Search for the secret you would like to edit within the existing secrets list.
3. Select the three dots next to the secret and choose **Edit**.
4. Edit the available fields according to your needs and select **Save** to confirm.

Refer to [Secrets Store API](https://developers.cloudflare.com/api/resources/secrets%5Fstore/) for the full API documentation.

Terminal window

```

curl --request PATCH \

https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets/$SECRET_ID \

--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

--header "Content-Type: application/json" \

--data '{

    "comment":"<NEW_COMMENT>",

    "value":"<NEW_SECRET_VALUE>",

    "scopes":["workers"]

}'


```

## Delete a secret

Warning

Before deleting a secret, make sure it is not deployed in your [Workers applications ↗](https://dash.cloudflare.com/?to=/:account/workers-and-pages/) or [AI gateways ↗](https://dash.cloudflare.com/?to=/:account/ai/ai-gateway).

* [ Dashboard ](#tab-panel-10534)
* [ API ](#tab-panel-10535)

1. In the Cloudflare dashboard, go to the **Secrets Store** page.  
[ Go to **Secrets Store** ](https://dash.cloudflare.com/?to=/:account/secrets-store)
2. Search for the secret you would like to delete within the existing secrets list.
3. Select the three dots next to the secret and choose **Delete**.
4. Type in the secret name and select **Delete** to confirm.

Refer to [Secrets Store API](https://developers.cloudflare.com/api/resources/secrets%5Fstore/) for the full API documentation.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Secrets Store Write`

Delete a secret

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID/secrets/$SECRET_ID" \

  --request DELETE \

  --header "X-Auth-Email: $CLOUDFLARE_EMAIL" \

  --header "X-Auth-Key: $CLOUDFLARE_API_KEY"


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/#page","headline":"How to · Cloudflare Secrets Store docs","description":"Create, update, duplicate, and delete secrets using the dashboard, API, or Wrangler.","url":"https://developers.cloudflare.com/secrets-store/manage-secrets/how-to/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/secrets-store/","name":"Secrets Store"}},{"@type":"ListItem","position":3,"item":{"@id":"/secrets-store/manage-secrets/","name":"Manage account secrets"}},{"@type":"ListItem","position":4,"item":{"@id":"/secrets-store/manage-secrets/how-to/","name":"How to"}}]}
```
