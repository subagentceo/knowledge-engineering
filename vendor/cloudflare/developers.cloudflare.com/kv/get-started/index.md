---
title: Getting started
description: Create a KV namespace, write key-value pairs, and read data from Workers KV using Wrangler or the dashboard.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Getting started

**Last reviewed:**  about 1 year ago 

Create a basic key-value store which stores the notification configuration of all users in an application, where each user may have `enabled` or `disabled` notifications.

Workers KV provides low-latency, high-throughput global storage to your [Cloudflare Workers](https://developers.cloudflare.com/workers/) applications. Workers KV is ideal for storing user configuration data, routing data, A/B testing configurations and authentication tokens, and is well suited for read-heavy workloads.

This guide instructs you through:

* Creating a KV namespace.
* Writing key-value pairs to your KV namespace from a Cloudflare Worker.
* Reading key-value pairs from a KV namespace.

You can perform these tasks through the Wrangler CLI or through the Cloudflare dashboard.

## Quick start

If you want to skip the setup steps and get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/update/kv/kv/kv-get-started)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers. Use this option if you are familiar with Cloudflare Workers, and wish to skip the step-by-step guidance.

You may wish to manually follow the steps if you are new to Cloudflare Workers.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a Worker project

New to Workers?

Refer to [How Workers works](https://developers.cloudflare.com/workers/reference/how-workers-works/) to learn about the Workers serverless execution model works. Go to the [Workers Get started guide](https://developers.cloudflare.com/workers/get-started/guide/) to set up your first Worker.

* [ CLI ](#tab-panel-8972)
* [ Dashboard ](#tab-panel-8973)

Create a new Worker to read and write to your KV namespace.

1. Create a new project named `kv-tutorial` by running:  
 npm  yarn  pnpm  
```  
npm create cloudflare@latest -- kv-tutorial  
```  
```  
yarn create cloudflare kv-tutorial  
```  
```  
pnpm create cloudflare@latest kv-tutorial  
```  
For setup, select the following options:  
   * For _What would you like to start with?_, choose `Hello World example`.  
   * For _Which template would you like to use?_, choose `Worker only`.  
   * For _Which language do you want to use?_, choose `TypeScript`.  
   * For _Do you want to use git for version control?_, choose `Yes`.  
   * For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).  
This creates a new `kv-tutorial` directory, illustrated below.  
   * Directorykv-tutorial/  
         * Directorynode\_modules/  
                  * …  
         * Directorytest/  
                  * …  
         * Directorysrc  
                  * **index.ts**  
         * package-lock.json  
         * package.json  
         * testconfig.json  
         * vitest.config.mts  
         * worker-configuration.d.ts  
         * **wrangler.jsonc**  
Your new `kv-tutorial` directory includes:  
   * A `"Hello World"` [Worker](https://developers.cloudflare.com/workers/get-started/guide/#3-write-code) in `index.ts`.  
   * A [wrangler.jsonc](https://developers.cloudflare.com/workers/wrangler/configuration/) configuration file. `wrangler.jsonc` is how your `kv-tutorial` Worker accesses your kv database.
2. Change into the directory you just created for your Worker project:  
Terminal window  
```  
cd kv-tutorial  
```  
Note  
If you are familiar with Cloudflare Workers, or initializing projects in a Continuous Integration (CI) environment, initialize a new project non-interactively by setting `CI=true` as an [environmental variable](https://developers.cloudflare.com/workers/configuration/environment-variables/) when running `create cloudflare@latest`.  
For example: `CI=true npm create cloudflare@latest kv-tutorial --type=simple --git --ts --deploy=false` creates a basic "Hello World" project ready to build on.

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**.
3. Select **Start with Hello World!** \> **Get started**.
4. Name your Worker. For this tutorial, name your Worker `kv-tutorial`.
5. Select **Deploy**.

## 2\. Create a KV namespace

A [KV namespace](https://developers.cloudflare.com/kv/concepts/kv-namespaces/) is a key-value database replicated to Cloudflare's global network.

* [ CLI ](#tab-panel-8964)
* [ Dashboard ](#tab-panel-8965)

You can use [Wrangler](https://developers.cloudflare.com/workers/wrangler/) to create a new KV namespace. You can also use it to perform operations such as put, list, get, and delete within your KV namespace.

Note

KV operations are scoped to your account.

To create a KV namespace via Wrangler:

1. Open your terminal and run the following command:  
Terminal window  
```  
npx wrangler kv namespace create <BINDING_NAME>  
```  
The `npx wrangler kv namespace create <BINDING_NAME>` subcommand takes a new binding name as its argument. A KV namespace is created using a concatenation of your Worker's name (from your Wrangler file) and the binding name you provide. A `<BINDING_ID>` is randomly generated for you.  
For this tutorial, use the binding name `USERS_NOTIFICATION_CONFIG`.  
Terminal window  
```  
npx wrangler kv namespace create USERS_NOTIFICATION_CONFIG  
```  
```  
🌀 Creating namespace with title "USERS_NOTIFICATION_CONFIG"  
✨ Success!  
Add the following to your configuration file in your kv_namespaces array:  
{  
  "kv_namespaces": [  
    {  
      "binding": "USERS_NOTIFICATION_CONFIG",  
      "id": "<BINDING_ID>"  
    }  
  ]  
}  
```

1. In the Cloudflare dashboard, go to the **Workers KV** page.  
[ Go to **Workers KV** ](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces)
2. Select **Create instance**.
3. Enter a name for your namespace. For this tutorial, use `kv_tutorial_namespace`.
4. Select **Create**.

## 3\. Bind your Worker to your KV namespace

You must create a binding to connect your Worker with your KV namespace. [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to access resources, like KV, on the Cloudflare developer platform.

Bindings

A binding is how your Worker interacts with external resources such as [KV namespaces](https://developers.cloudflare.com/kv/concepts/kv-namespaces/). A binding is a runtime variable that the Workers runtime provides to your code. You can declare a variable name in your Wrangler file that binds to these resources at runtime, and interact with them through this variable. Every binding's variable name and behavior is determined by you when deploying the Worker.

Refer to [Environment](https://developers.cloudflare.com/kv/reference/environments/) for more information.

To bind your KV namespace to your Worker:

* [ CLI ](#tab-panel-8976)
* [ Dashboard ](#tab-panel-8977)

1. In your Wrangler file, add the following with the values generated in your terminal from [step 2](https://developers.cloudflare.com/kv/get-started/#2-create-a-kv-namespace):  
   * [  wrangler.jsonc ](#tab-panel-8974)  
   * [  wrangler.toml ](#tab-panel-8975)  
JSONC  
```  
{  
  "kv_namespaces": [  
    {  
      "binding": "USERS_NOTIFICATION_CONFIG",  
      "id": "<BINDING_ID>"  
    }  
  ]  
}  
```  
TOML  
```  
[[kv_namespaces]]  
binding = "USERS_NOTIFICATION_CONFIG"  
id = "<BINDING_ID>"  
```  
Binding names do not need to correspond to the namespace you created. Binding names are only a reference. Specifically:  
   * The value (string) you set for `binding` is used to reference this KV namespace in your Worker. For this tutorial, this should be `USERS_NOTIFICATION_CONFIG`.  
   * The binding must be [a valid JavaScript variable name ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar%5Fand%5Ftypes#variables). For example, `binding = "MY_KV"` or `binding = "routingConfig"` would both be valid names for the binding.  
   * Your binding is available in your Worker at `env.<BINDING_NAME>` from within your Worker. For this tutorial, the binding is available at `env.USERS_NOTIFICATION_CONFIG`.

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select the `kv-tutorial` Worker you created in [step 1](https://developers.cloudflare.com/kv/get-started/#1-create-a-worker-project).
3. Got to the **Bindings** tab, then select **Add binding**.
4. Select **KV namespace** \> **Add binding**.
5. Name your binding (`BINDING_NAME`) in **Variable name**, then select the KV namespace (`kv_tutorial_namespace`) you created in [step 2](https://developers.cloudflare.com/kv/get-started/#2-create-a-kv-namespace) from the dropdown menu.
6. Select **Add binding** to deploy your binding.

## 4\. Interact with your KV namespace

You can interact with your KV namespace via [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) or directly from your [Workers](https://developers.cloudflare.com/workers/) application.

### 4.1\. Write a value

* [ CLI ](#tab-panel-8966)
* [ Dashboard ](#tab-panel-8967)

To write a value to your empty KV namespace using Wrangler:

1. Run the `wrangler kv key put` subcommand in your terminal, and input your key and value respectively. `<KEY>` and `<VALUE>` are values of your choice.  
Terminal window  
```  
npx wrangler kv key put --binding=<BINDING_NAME> "<KEY>" "<VALUE>"  
```  
In this tutorial, you will add a key `user_1` with value `enabled` to the KV namespace you created in [step 2](https://developers.cloudflare.com/kv/get-started/#2-create-a-kv-namespace).  
Terminal window  
```  
npx wrangler kv key put --binding=USERS_NOTIFICATION_CONFIG "user_1" "enabled"  
```  
```  
Writing the value "enabled" to key "user_1" on namespace <BINDING_ID>.  
```

Using `--namespace-id`

Instead of using `--binding`, you can also use `--namespace-id` to specify which KV namespace should receive the operation:

Terminal window

```

npx wrangler kv key put --namespace-id=<BINDING_ID> "<KEY>" "<VALUE>"


```

```

Writing the value "<VALUE>" to key "<KEY>" on namespace <BINDING_ID>.


```

Storing values in remote KV namespace

By default, the values are written locally. To create a key and a value in your remote KV namespace, add the `--remote` flag at the end of the command:

Terminal window

```

npx wrangler kv key put --namespace-id=xxxxxxxxxxxxxxxx "<KEY>" "<VALUE>" --remote


```

1. In the Cloudflare dashboard, go to the **Workers KV** page.  
[ Go to **Workers KV** ](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces)
2. Select the KV namespace you created (`kv_tutorial_namespace`).
3. Go to the **KV Pairs** tab.
4. Enter a `<KEY>` of your choice.
5. Enter a `<VALUE>` of your choice.
6. Select **Add entry**.

### 4.2\. Get a value

* [ CLI ](#tab-panel-8970)
* [ Dashboard ](#tab-panel-8971)

To access the value from your KV namespace using Wrangler:

1. Run the `wrangler kv key get` subcommand in your terminal, and input your key value:  
Terminal window  
```  
npx wrangler kv key get --binding=<BINDING_NAME> "<KEY>"  
```  
In this tutorial, you will get the value of the key `user_1` from the KV namespace you created in [step 2](https://developers.cloudflare.com/kv/get-started/#2-create-a-kv-namespace).  
Note  
To view the value directly within the terminal, you use the `--text` flag.  
Terminal window  
```  
npx wrangler kv key get --binding=USERS_NOTIFICATION_CONFIG "user_1" --text  
```  
Similar to the `put` command, the `get` command can also be used to access a KV namespace in two ways - with `--binding` or `--namespace-id`:

Warning

Exactly **one** of `--binding` or `--namespace-id` is required.

Refer to the [kv bulk documentation](https://developers.cloudflare.com/kv/reference/kv-commands/#kv-bulk) to write a file of multiple key-value pairs to a given KV namespace.

You can view key-value pairs directly from the dashboard.

1. In the Cloudflare dashboard, go to the **Workers KV** page.  
[ Go to **Workers KV** ](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces)
2. Go to the KV namespace you created (`kv_tutorial_namespace`).
3. Go to the **KV Pairs** tab.

## 5\. Access your KV namespace from your Worker

* [ CLI ](#tab-panel-8982)
* [ Dashboard ](#tab-panel-8983)

Note

When using [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) to develop locally, Wrangler defaults to using a local version of KV to avoid interfering with any of your live production data in KV. This means that reading keys that you have not written locally returns null.

To have `wrangler dev` connect to your Workers KV namespace running on Cloudflare's global network, you can set `"remote" : true` in the KV binding configuration. Refer to the [remote bindings documentation](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) for more information.

Also refer to [KV binding docs](https://developers.cloudflare.com/kv/concepts/kv-bindings/#use-kv-bindings-when-developing-locally).

1. In your Worker script, add your KV binding in the `Env` interface. If you have bootstrapped your project with JavaScript, this step is not required.  
TypeScript  
```  
interface Env {  
  USERS_NOTIFICATION_CONFIG: KVNamespace;  
  // ... other binding types  
}  
```
2. Use the `put()` method on `USERS_NOTIFICATION_CONFIG` to create a new key-value pair. You will add a new key `user_2` with value `disabled` to your KV namespace.  
TypeScript  
```  
let value = await env.USERS_NOTIFICATION_CONFIG.put("user_2", "disabled");  
```
3. Use the KV `get()` method to fetch the data you stored in your KV namespace. You will fetch the value of the key `user_2` from your KV namespace.  
TypeScript  
```  
let value = await env.USERS_NOTIFICATION_CONFIG.get("user_2");  
```

Your Worker code should look like this:

* [  JavaScript ](#tab-panel-8980)
* [  TypeScript ](#tab-panel-8981)

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    try {

      await env.USERS_NOTIFICATION_CONFIG.put("user_2", "disabled");

      const value = await env.USERS_NOTIFICATION_CONFIG.get("user_2");

      if (value === null) {

        return new Response("Value not found", { status: 404 });

      }

      return new Response(value);

    } catch (err) {

      console.error(`KV returned error:`, err);

      const errorMessage =

        err instanceof Error

          ? err.message

          : "An unknown error occurred when accessing KV storage";

      return new Response(errorMessage, {

        status: 500,

        headers: { "Content-Type": "text/plain" },

      });

    }

  },

};


```

TypeScript

```

export interface Env {

  USERS_NOTIFICATION_CONFIG: KVNamespace;

}


export default {

  async fetch(request, env, ctx): Promise<Response> {

    try {

      await env.USERS_NOTIFICATION_CONFIG.put("user_2", "disabled");

      const value = await env.USERS_NOTIFICATION_CONFIG.get("user_2");

      if (value === null) {

        return new Response("Value not found", { status: 404 });

      }

      return new Response(value);

    } catch (err) {

      console.error(`KV returned error:`, err);

      const errorMessage =

        err instanceof Error

          ? err.message

          : "An unknown error occurred when accessing KV storage";

      return new Response(errorMessage, {

        status: 500,

        headers: { "Content-Type": "text/plain" },

      });

    }

  },

} satisfies ExportedHandler<Env>;


```

The code above:

1. Writes a key to your KV namespace using KV's `put()` method.
2. Reads the same key using KV's `get()` method.
3. Checks if the key is null, and returns a `404` response if it is.
4. If the key is not null, it returns the value of the key.
5. Uses JavaScript's [try...catch ↗](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/try...catch) exception handling to catch potential errors. When writing or reading from any service, such as Workers KV or external APIs using `fetch()`, you should expect to handle exceptions explicitly.

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Go to the `kv-tutorial` Worker you created.
3. Select **Edit Code**.
4. Clear the contents of the `workers.js` file, then paste the following code.  
   * [  JavaScript ](#tab-panel-8978)  
   * [  TypeScript ](#tab-panel-8979)  
JavaScript  
```  
export default {  
  async fetch(request, env, ctx) {  
    try {  
      await env.USERS_NOTIFICATION_CONFIG.put("user_2", "disabled");  
      const value = await env.USERS_NOTIFICATION_CONFIG.get("user_2");  
      if (value === null) {  
        return new Response("Value not found", { status: 404 });  
      }  
      return new Response(value);  
    } catch (err) {  
      console.error(`KV returned error:`, err);  
      const errorMessage =  
        err instanceof Error  
          ? err.message  
          : "An unknown error occurred when accessing KV storage";  
      return new Response(errorMessage, {  
        status: 500,  
        headers: { "Content-Type": "text/plain" },  
      });  
    }  
  },  
};  
```  
TypeScript  
```  
export interface Env {  
  USERS_NOTIFICATION_CONFIG: KVNamespace;  
}  
export default {  
  async fetch(request, env, ctx): Promise<Response> {  
    try {  
      await env.USERS_NOTIFICATION_CONFIG.put("user_2", "disabled");  
      const value = await env.USERS_NOTIFICATION_CONFIG.get("user_2");  
      if (value === null) {  
        return new Response("Value not found", { status: 404 });  
      }  
      return new Response(value);  
    } catch (err) {  
      console.error(`KV returned error:`, err);  
      const errorMessage =  
        err instanceof Error  
          ? err.message  
          : "An unknown error occurred when accessing KV storage";  
      return new Response(errorMessage, {  
        status: 500,  
        headers: { "Content-Type": "text/plain" },  
      });  
    }  
  },  
} satisfies ExportedHandler<Env>;  
```  
The code above:  
   1. Writes a key to `BINDING_NAME` using KV's `put()` method.  
   2. Reads the same key using KV's `get()` method, and returns an error if the key is null (or in case the key is not set, or does not exist).  
   3. Uses JavaScript's [try...catch ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) exception handling to catch potential errors. When writing or reading from any service, such as Workers KV or external APIs using `fetch()`, you should expect to handle exceptions explicitly.  
The browser should simply return the `VALUE` corresponding to the `KEY` you have specified with the `get()` method.
5. Select the dropdown arrow next to **Deploy** and select **Save**.

## 6\. Deploy your Worker

Deploy your Worker to Cloudflare's global network.

* [ CLI ](#tab-panel-8968)
* [ Dashboard ](#tab-panel-8969)

1. Run the following command to deploy KV to Cloudflare's global network:  
Terminal window  
```  
npm run deploy  
```
2. Visit the URL for your newly created Workers KV application.  
For example, if the URL of your new Worker is `kv-tutorial.<YOUR_SUBDOMAIN>.workers.dev`, accessing `https://kv-tutorial.<YOUR_SUBDOMAIN>.workers.dev/` sends a request to your Worker that writes (and reads) from Workers KV.

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your `kv-tutorial` Worker.
3. Select **Deployments**.
4. From the **Version History** table, select **Deploy version**.
5. From the **Deploy version** page, select **Deploy**.  
This deploys the latest version of the Worker code to production.

## Summary

By finishing this tutorial, you have:

1. Created a KV namespace
2. Created a Worker that writes and reads from that namespace
3. Deployed your project globally.

## Next steps

If you have any feature requests or notice any bugs, share your feedback directly with the Cloudflare team by joining the [Cloudflare Developers community on Discord ↗](https://discord.cloudflare.com).

* Learn more about the [KV API](https://developers.cloudflare.com/kv/api/).
* Understand how to use [Environments](https://developers.cloudflare.com/kv/reference/environments/) with Workers KV.
* Read the Wrangler [kv command documentation](https://developers.cloudflare.com/kv/reference/kv-commands/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/get-started/#page","headline":"Getting started · Cloudflare Workers KV docs","description":"Create a KV namespace, write key-value pairs, and read data from Workers KV using Wrangler or the dashboard.","url":"https://developers.cloudflare.com/kv/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/kv/","name":"KV"}},{"@type":"ListItem","position":3,"item":{"@id":"/kv/get-started/","name":"Getting started"}}]}
```
