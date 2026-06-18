---
title: Workers integration
description: Cloudflare Secrets Store is a secure, centralized location in which account-level secrets are stored and managed. The secrets are securely encrypted and stored across all Cloudflare data centers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/secrets-store/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers integration

[Cloudflare Secrets Store](https://developers.cloudflare.com/secrets-store/) is a secure, centralized location in which account-level secrets are stored and managed. The secrets are securely encrypted and stored across all Cloudflare data centers.

Consider the steps below to learn how to use values from your account secrets store with [Cloudflare Workers](https://developers.cloudflare.com/workers/).

Note

This is different from Workers [Variables and Secrets](https://developers.cloudflare.com/workers/configuration/secrets/), where you define and manage your secrets on a per-Worker level.

## Before you begin

* If [using the Dashboard](#via-dashboard), make sure you already have a Workers application. Refer to the [Workers get started](https://developers.cloudflare.com/workers/get-started/dashboard/) for guidance.
* You should also have a store created under the **Secrets Store** tab on the Dashboard. The first store in your account is created automatically when a user with [Super Administrator or Secrets Store Admin role](https://developers.cloudflare.com/secrets-store/access-control/) interacts with it.  
   * If no store exists in your account yet and you have the necessary permissions, you can use the [Wrangler command](https://developers.cloudflare.com/workers/wrangler/commands/secrets-store/#secrets-store-store) `secrets-store store create <name> --remote` to create your first store.

Local development mode

This guide assumes you are working in production. To use Secrets Store locally, you must use `secrets-store secret` [Wrangler commands](https://developers.cloudflare.com/workers/wrangler/commands/) without the `--remote` flag.

## 1\. Set up account secrets in Secrets Store

Follow the steps below to create secrets. You must have a [Super Administrator or a Secrets Store Admin role](https://developers.cloudflare.com/secrets-store/access-control/) within your Cloudflare account.

Note

You may also add account secrets directly from the Workers settings on the dashboard. You can skip to [step 2](#via-dashboard) to do that.

* [ Wrangler ](#tab-panel-10527)
* [ Dashboard ](#tab-panel-10528)
* [ API ](#tab-panel-10529)

Use the [Wrangler command](https://developers.cloudflare.com/workers/wrangler/commands/secrets-store/#secrets-store-secret) `secrets-store secret create`.

To use the following example, replace the store ID and secret name by your actual data. You can find and copy the store ID from the [Secrets Store tab ↗](https://dash.cloudflare.com/?to=/:account/secrets-store/) on the dashboard or use `wrangler secrets-store store list`.

Note that a secret name cannot contain spaces.

Terminal window

```

npx wrangler secrets-store secret create <STORE_ID> --name MY_SECRET_NAME --scopes workers --remote


```

```

✓ Enter a secret value: › ***


🔐 Creating secret... (Name: MY_SECRET_NAME, Value: REDACTED, Scopes: workers, Comment: undefined)

✓ Select an account: › My account

✅ Created secret! (ID: 13bc7498c6374a4e9d13be091c3c65f1)


```

1. In the Cloudflare dashboard, go to the **Secrets Store** page.  
[ Go to **Secrets Store** ](https://dash.cloudflare.com/?to=/:account/secrets-store)
2. Select **Create secret**.
3. Fill in the required fields, choosing _Workers_ as the **Permission scope**. Once the secret is saved, the secret value will no longer be available for viewing.
4. (Optional) Select **Add additional secret** to create more than one secret at a time.
5. Select **Save** to confirm.

You can find and copy the store ID from the [Secrets Store tab ↗](https://dash.cloudflare.com/?to=/:account/secrets-store/) on the dashboard or use the [Wrangler command](https://developers.cloudflare.com/workers/wrangler/commands/secrets-store/#secrets-store-store). Also, make sure your secret `name` does not contain spaces.

Refer to [Secrets Store API](https://developers.cloudflare.com/api/resources/secrets%5Fstore/) for the full API documentation.

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

Refer to [manage account secrets](https://developers.cloudflare.com/secrets-store/manage-secrets/) for further options.

## 2\. Bind an account secret to your Worker

[Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Worker to interact with resources on your Cloudflare account.

To bind an account secret to your Worker, you must have one of the following [roles within your Cloudflare account](https://developers.cloudflare.com/secrets-store/access-control/):

* Super Administrator
* Secrets Store Deployer

### Via Wrangler

1. Add a Secrets Store binding to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):  
   * `binding`: a descriptive name for your binding. This will be used in the Workers application when [accessing your secret on the env object](https://developers.cloudflare.com/secrets-store/integrations/workers/#3-access-the-secret-on-the-env-object).  
   * `store_id`: the corresponding Secrets Store ID where your account secret was created.  
   * `secret_name`: the unique secret name, defined when your account secret was created.

* [  wrangler.jsonc ](#tab-panel-10525)
* [  wrangler.toml ](#tab-panel-10526)

JSONC

```

{

  "main": "./src/index.js",

  "secrets_store_secrets": [

    {

      "binding": "<BINDING_VARIABLE>",

      "store_id": "<STORE_ID>",

      "secret_name": "<MY_SECRET_NAME>"

    }

  ]

}


```

TOML

```

main = "./src/index.js"


[[secrets_store_secrets]]

binding = "<BINDING_VARIABLE>"

store_id = "<STORE_ID>"

secret_name = "<MY_SECRET_NAME>"


```

### Via Dashboard

1. In the Cloudflare dashboard, go to **Workers & Pages**.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select a Workers application.
3. Go to **Settings** \> **Bindings** and select **Add**.
4. On the **Add a resource binding** side panel, choose **Secrets Store**.
5. Fill in the required fields:  
   * **Variable name**: a name for the binding. This will be used for your Worker to access the secret ([step 3](#3-access-the-secret-on-the-env-object) below).  
   * **Secret name**: select from the list of available account secrets created in [step 1](#1-set-up-account-secrets-in-secrets-store).  
   * (Optional - Admins only) If the secret you need does not exist yet, select **Create secret**. This will add an account level secret in the same way as if you had [created it on the Secrets Store](https://developers.cloudflare.com/secrets-store/manage-secrets/).
6. Select **Deploy** to deploy your binding. When deploying, there are two options:  
   * **Deploy:** Immediately deploy the binding to 100% of your audience.  
   * **Save version:** Save a version of the binding which you can deploy in the future.

## 3\. Access the secret on the `env` object

[Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) are located on the `env` object. To access the secret you first need an asynchronous call.

### Call `get()` on the binding variable

Local development mode

You cannot access production secrets (created on the dashboard, via API, or with the `--remote` flag) from your local development setup. To use Secrets Store locally, you must use `secrets-store secret` [Wrangler commands](https://developers.cloudflare.com/workers/wrangler/commands/) without the `--remote` flag.

JavaScript

```

export default {

  async fetch(request, env) {

    // Example of using the secret safely in an API request

    const APIkey = await env.<BINDING_VARIABLE>.get()


    const response = await fetch("https://api.example.com/data", {

      headers: { "Authorization": `Bearer ${APIKey}` },

    });


    if (!response.ok) {

      return new Response("Failed to fetch data", { status: response.status });

    }


    const data = await response.json();

    return new Response(JSON.stringify(data), {

      headers: { "Content-Type": "application/json" },

    });

  },

};


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/secrets-store/integrations/workers/#page","headline":"Workers integration · Cloudflare Secrets Store docs","description":"Cloudflare Secrets Store is a secure, centralized location in which account-level secrets are stored and managed. The secrets are securely encrypted and stored across all Cloudflare data centers.","url":"https://developers.cloudflare.com/secrets-store/integrations/workers/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/secrets-store/","name":"Secrets Store"}},{"@type":"ListItem","position":3,"item":{"@id":"/secrets-store/integrations/","name":"Secrets Store integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/secrets-store/integrations/workers/","name":"Workers integration"}}]}
```
