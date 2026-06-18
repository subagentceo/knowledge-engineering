---
title: Environment variables and secrets
description: Configuring environment variables and secrets for local development
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Environment variables and secrets

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

### Basic setup

Here are steps to set up environment variables for local development using either `.dev.vars` or `.env` files.

1. Create a `.dev.vars` / `.env` file in your project root.
2. Add key-value pairs:  
.dev.vars/.env  
```  
API_HOST="localhost:3000"  
DEBUG="true"  
SECRET_TOKEN="my-local-secret-token"  
```
3. Run your `dev` command  
**Wrangler**  
 npm  yarn  pnpm  
```  
npx wrangler dev  
```  
```  
yarn wrangler dev  
```  
```  
pnpm wrangler dev  
```  
**Vite plugin**  
 npm  yarn  pnpm  
```  
npx vite dev  
```  
```  
yarn vite dev  
```  
```  
pnpm vite dev  
```

## Multiple local environments

To simulate different local environments, you can provide environment-specific files. For example, you might have a `staging` environment that requires different settings than your development environment.

1. Create a file named `.dev.vars.<environment-name>`/`.env.<environment-name>`. For example, we can use `.dev.vars.staging`/`.env.staging`.
2. Add key-value pairs:  
.dev.vars.staging/.env.staging  
```  
API_HOST="staging.localhost:3000"  
DEBUG="false"  
SECRET_TOKEN="staging-token"  
```
3. Specify the environment when running the `dev` command:  
**Wrangler**  
 npm  yarn  pnpm  
```  
npx wrangler dev --env staging  
```  
```  
yarn wrangler dev --env staging  
```  
```  
pnpm wrangler dev --env staging  
```  
**Vite plugin**  
 npm  yarn  pnpm  
```  
CLOUDFLARE_ENV=staging npx vite dev  
```  
```  
CLOUDFLARE_ENV=staging yarn vite dev  
```  
```  
CLOUDFLARE_ENV=staging pnpm vite dev  
```  
   * If using `.dev.vars.staging`, only the values from that file will be applied instead of `.dev.vars`.  
   * If using `.env.staging`, the values will be merged with `.env` files, with the most specific file taking precedence.

## Learn more

* To learn how to configure multiple environments in Wrangler configuration, [read the documentation](https://developers.cloudflare.com/workers/wrangler/environments/#%5Ftop).
* To learn how to use Wrangler environments and Vite environments together, [read the Vite plugin documentation](https://developers.cloudflare.com/workers/vite-plugin/reference/cloudflare-environments/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/development-testing/environment-variables/#page","headline":"Environment variables and secrets · Cloudflare Workers docs","description":"Configuring environment variables and secrets for local development","url":"https://developers.cloudflare.com/workers/development-testing/environment-variables/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/development-testing/","name":"Development & testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/development-testing/environment-variables/","name":"Environment variables and secrets"}}]}
```
