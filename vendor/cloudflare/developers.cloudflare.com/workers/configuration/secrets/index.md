---
title: Secrets
description: Store sensitive information, like API keys and auth tokens, in your Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Secrets

## Background

Secrets are a type of binding that allow you to attach encrypted text values to your Worker. Secrets are used for storing sensitive information like API keys and auth tokens.

You can access secrets in your Worker code through:

* The [env parameter](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/#parameters) passed to your Worker's [fetch event handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/).
* Importing `env` from [cloudflare:workers](https://developers.cloudflare.com/workers/runtime-apis/bindings/#importing-env-as-a-global) to access secrets from anywhere in your code.
* [process.env](https://developers.cloudflare.com/workers/configuration/environment-variables) in Workers that have [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) enabled.

## Access your secrets with Workers

Secrets can be accessed from Workers as you would any other [environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/). For instance, given a `DB_CONNECTION_STRING` secret, you can access it in your Worker code through the `env` parameter:

index.js

```

import postgres from "postgres";


export default {

  async fetch(request, env, ctx) {

    const sql = postgres(env.DB_CONNECTION_STRING);


    const result = await sql`SELECT * FROM products;`;


    return new Response(JSON.stringify(result), {

      headers: { "Content-Type": "application/json" },

    });

  },

};


```

You can also import `env` from `cloudflare:workers` to access secrets from anywhere in your code, including outside of request handlers:

* [  JavaScript ](#tab-panel-11491)
* [  TypeScript ](#tab-panel-11492)

JavaScript

```

import { env } from "cloudflare:workers";

import postgres from "postgres";


// Initialize the database client at the top level using a secret

const sql = postgres(env.DB_CONNECTION_STRING);


export default {

  async fetch(request) {

    const result = await sql`SELECT * FROM products;`;


    return new Response(JSON.stringify(result), {

      headers: { "Content-Type": "application/json" },

    });

  },

};


```

TypeScript

```

import { env } from "cloudflare:workers";

import postgres from "postgres";


// Initialize the database client at the top level using a secret

const sql = postgres(env.DB_CONNECTION_STRING);


export default {

  async fetch(request: Request): Promise<Response> {

    const result = await sql`SELECT * FROM products;`;


    return new Response(JSON.stringify(result), {

      headers: { "Content-Type": "application/json" },

    });

  },

};


```

For more details on accessing `env` globally, refer to [Importing env as a global](https://developers.cloudflare.com/workers/runtime-apis/bindings/#importing-env-as-a-global).

Secrets Store (beta)

Secrets described on this page are defined and managed on a per-Worker level. If you want to use account-level secrets, refer to [Secrets Store](https://developers.cloudflare.com/secrets-store/). Account-level secrets are configured on your Worker as a [Secrets Store binding](https://developers.cloudflare.com/secrets-store/integrations/workers/).

## Local Development with Secrets

Warning

Do not use `vars` to store sensitive information in your Worker's Wrangler configuration file. Use secrets instead.

Put secrets for use in local development in either a `.dev.vars` file or a `.env` file, in the same directory as the Wrangler configuration file.

Note

You can use the [secrets configuration property](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property) to declare which secret names your Worker requires. When defined, only the keys listed in `secrets.required` are loaded from `.dev.vars` or `.env`. Additional keys are excluded and missing keys produce a warning.

Choose to use either `.dev.vars` or `.env` but not both. If you define a `.dev.vars` file, then values in `.env` files will not be included in the `env` object during local development.

These files should be formatted using the [dotenv ↗](https://hexdocs.pm/dotenvy/dotenv-file-format.html) syntax. For example:

.dev.vars / .env

```

SECRET_KEY="value"

API_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"


```

Do not commit secrets to git

The `.dev.vars` and `.env` files should not be committed to git. Add `.dev.vars*` and `.env*` to your project's `.gitignore` file.

To set different secrets for each Cloudflare environment, create files named `.dev.vars.<environment-name>` or `.env.<environment-name>`.

When you select a Cloudflare environment in your local development, the corresponding environment-specific file will be loaded ahead of the generic `.dev.vars` (or `.env`) file.

* When using `.dev.vars.<environment-name>` files, all secrets must be defined per environment. If `.dev.vars.<environment-name>` exists then only this will be loaded; the `.dev.vars` file will not be loaded.
* In contrast, all matching `.env` files are loaded and the values are merged. For each variable, the value from the most specific file is used, with the following precedence:  
   * `.env.<environment-name>.local` (most specific)  
   * `.env.local`  
   * `.env.<environment-name>`  
   * `.env` (least specific)

Controlling `.env` handling

It is possible to control how `.env` files are loaded in local development by setting environment variables on the process running the tools.

* To disable loading local dev vars from `.env` files without providing a `.dev.vars` file, set the `CLOUDFLARE_LOAD_DEV_VARS_FROM_DOT_ENV` environment variable to `"false"`.
* To include every environment variable defined in your system's process environment as a local development variable, ensure there is no `.dev.vars` and then set the `CLOUDFLARE_INCLUDE_PROCESS_ENV` environment variable to `"true"`. This is not needed when using the [secrets configuration property](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property), which loads from `process.env` automatically.

## Secrets on deployed Workers

### Validate secrets before deploy

You can declare the secret names your Worker requires using the [secrets configuration property](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property) in your Wrangler configuration. When defined, `wrangler deploy` and `wrangler versions upload` will fail with a clear error if any required secrets are not configured on the Worker.

### Adding secrets to your project

#### Via Wrangler

Secrets can be added through [wrangler secret put](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret) or [wrangler versions secret put](https://developers.cloudflare.com/workers/wrangler/commands/general/#versions-secret-put) commands.

`wrangler secret put` creates a new version of the Worker and deploys it immediately.

Terminal window

```

npx wrangler secret put <KEY>


```

If using [gradual deployments](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/), instead use the `wrangler versions secret put` command. This will only create a new version of the Worker, that can then be deploying using [wrangler versions deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#versions-deploy).

Note

Wrangler versions before 3.73.0 require you to specify a `--x-versions` flag.

Terminal window

```

npx wrangler versions secret put <KEY>


```

#### Via the dashboard

To add a secret via the dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your Worker > **Settings**.
3. Under **Variables and Secrets**, select **Add**.
4. Select the type **Secret**, input a **Variable name**, and input its **Value**. This secret will be made available to your Worker but the value will be hidden in Wrangler and the dashboard.
5. (Optional) To add more secrets, select **Add variable**.
6. Select **Deploy** to implement your changes.

#### Upload secrets alongside code

You can upload secrets at the same time as your Worker code using the `--secrets-file` flag on [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) or [wrangler versions upload](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-upload). This accepts a path to a JSON or `.env` file — the same formats accepted by [wrangler secret bulk](https://developers.cloudflare.com/workers/wrangler/commands/workers/#secret-bulk). You can upload up to 100 secrets per bulk request for a single version.

Terminal window

```

npx wrangler deploy --secrets-file .env.production


```

Terminal window

```

npx wrangler versions upload --secrets-file secrets.json


```

Secrets not included in the file are preserved from the previous version. This is useful in CI/CD pipelines where you want to deploy code and update secrets in a single operation.

### Delete secrets from your project

#### Via Wrangler

Secrets can be deleted through [wrangler secret delete](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret-delete) or [wrangler versions secret delete](https://developers.cloudflare.com/workers/wrangler/commands/general/#versions-secret-delete) commands.

`wrangler secret delete` creates a new version of the Worker and deploys it immediately.

Terminal window

```

npx wrangler secret delete <KEY>


```

If using [gradual deployments](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/), instead use the `wrangler versions secret delete` command. This will only create a new version of the Worker, that can then be deploying using [wrangler versions deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#versions-deploy).

Terminal window

```

npx wrangler versions secret delete <KEY>


```

#### Via the dashboard

To delete a secret from your Worker project via the dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your Worker > **Settings**.
3. Under **Variables and Secrets**, select **Edit**.
4. In the **Edit** drawer, select **X** next to the secret you want to delete.
5. Select **Deploy** to implement your changes.
6. (Optional) Instead of using the edit drawer, you can click the delete icon next to the secret.

## Compare secrets and environment variables

Use secrets for sensitive information

Do not use plaintext environment variables to store sensitive information. Use [secrets](https://developers.cloudflare.com/workers/configuration/secrets/) or [Secrets Store bindings](https://developers.cloudflare.com/secrets-store/integrations/workers/) instead.

[Secrets](https://developers.cloudflare.com/workers/configuration/secrets/) are [environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/). The difference is secret values are not visible within Wrangler or Cloudflare dashboard after you define them. This means that sensitive data, including passwords or API tokens, should always be encrypted to prevent data leaks. To your Worker, there is no difference between an environment variable and a secret. The secret's value is passed through as defined.

## Related resources

* [Wrangler secret commands](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret) \- Review the Wrangler commands to create, delete and list secrets.
* [secrets configuration property](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets-configuration-property) \- Declare required secret names in your Wrangler configuration. Used for validation during local development and deploy, and as the source of truth for type generation.
* [Cloudflare Secrets Store](https://developers.cloudflare.com/secrets-store/) \- Encrypt and store sensitive information as secrets that are securely reusable across your account.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/configuration/secrets/#page","headline":"Secrets · Cloudflare Workers docs","description":"Store sensitive information, like API keys and auth tokens, in your Worker.","url":"https://developers.cloudflare.com/workers/configuration/secrets/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/secrets/","name":"Secrets"}}]}
```
