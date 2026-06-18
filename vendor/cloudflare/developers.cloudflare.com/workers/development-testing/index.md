---
title: Development &amp; testing
description: Develop and test your Workers locally.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Development & testing

You can build, run, and test your Worker code on your own local machine before deploying it to Cloudflare's network. This is made possible through [Miniflare](https://developers.cloudflare.com/workers/testing/miniflare/), a simulator that executes your Worker code using the same runtime used in production, [workerd ↗](https://github.com/cloudflare/workerd).

[By default](https://developers.cloudflare.com/workers/development-testing/#defaults), your Worker's bindings [connect to locally simulated resources](https://developers.cloudflare.com/workers/development-testing/#bindings-during-local-development), but can be configured to interact with the real, production resource with [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings).

## Core concepts

### Worker execution vs Bindings

When developing Workers, it's important to understand two distinct concepts:

* **Worker execution**: Where your Worker code actually runs (on your local machine vs on Cloudflare's infrastructure).
* [**Bindings**](https://developers.cloudflare.com/workers/runtime-apis/bindings/): How your Worker interacts with Cloudflare resources (like [KV namespaces](https://developers.cloudflare.com/kv), [R2 buckets](https://developers.cloudflare.com/r2), [D1 databases](https://developers.cloudflare.com/d1), [Queues](https://developers.cloudflare.com/queues/), [Durable Objects](https://developers.cloudflare.com/durable-objects/), etc). In your Worker code, these are accessed via the `env` object (such as `env.MY_KV`).

## Local development

**You can start a local development server using:**

1. The Cloudflare Workers CLI [**Wrangler**](https://developers.cloudflare.com/workers/wrangler/), using the built-in [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) command.

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

1. [**Vite** ↗](https://vite.dev/), using the [**Cloudflare Vite plugin**](https://developers.cloudflare.com/workers/vite-plugin/).

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

Both Wrangler and the Cloudflare Vite plugin use [Miniflare](https://developers.cloudflare.com/workers/testing/miniflare/) under the hood, and are developed and maintained by the Cloudflare team. For guidance on choosing when to use Wrangler versus Vite, see our guide [Choosing between Wrangler & Vite](https://developers.cloudflare.com/workers/development-testing/wrangler-vs-vite/).

* [Get started with Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
* [Get started with the Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/get-started/)

### Defaults

By default, running `wrangler dev` / `vite dev` (when using the [Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/get-started/)) means that:

* Your Worker code runs on your local machine.
* All resources your Worker is bound to in your [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) are simulated locally.
* The local `workerd` runtime runs with `TZ=UTC` so that `Date` and `Intl` APIs inside your Worker observe UTC, matching the production Cloudflare runtime regardless of your machine's timezone.

### Bindings during local development

[Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) are interfaces that allow your Worker to interact with various Cloudflare resources (like [KV namespaces](https://developers.cloudflare.com/kv), [R2 buckets](https://developers.cloudflare.com/r2), [D1 databases](https://developers.cloudflare.com/d1), [Queues](https://developers.cloudflare.com/queues/), [Durable Objects](https://developers.cloudflare.com/durable-objects/), etc). In your Worker code, these are accessed via the `env` object (such as `env.MY_KV`).

During local development, your Worker code interacts with these bindings using the exact same API calls (such as `env.MY_KV.put()`) as it would in a deployed environment. These local resources are initially empty, but you can populate them with data, as documented in [Adding local data](https://developers.cloudflare.com/workers/development-testing/local-data/).

* By default, bindings connect to **local resource simulations** (except for [AI bindings](https://developers.cloudflare.com/workers-ai/configuration/bindings/), as AI models always run remotely).
* You can override this default behavior and **connect to the remote resource** on a per-binding basis with [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings). This lets you connect to real, production resources while still running your Worker code locally.
* When using `wrangler dev`, you can temporarily disable all [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) (and connect only to local resources) by providing the `--local` flag (i.e. `wrangler dev --local`)

## Remote bindings

**Remote bindings** are bindings that are configured to connect to the deployed, remote resource during local development _instead_ of the locally simulated resource. Remote bindings are supported by [**Wrangler**](https://developers.cloudflare.com/workers/wrangler/), the [**Cloudflare Vite plugin**](https://developers.cloudflare.com/workers/vite-plugin/), and the `@cloudflare/vitest-pool-workers` package. You can configure remote bindings by setting `remote: true` in the binding definition.

### Example configuration

* [  wrangler.jsonc ](#tab-panel-11547)
* [  wrangler.toml ](#tab-panel-11548)

JSONC

```

{

  "name": "my-worker",

  // Set this to today's date

  "compatibility_date": "2026-06-18",


  "r2_buckets": [

    {

      "bucket_name": "screenshots-bucket",

      "binding": "screenshots_bucket",

      "remote": true,

    },

  ],

}


```

TOML

```

name = "my-worker"

# Set this to today's date

compatibility_date = "2026-06-18"


[[r2_buckets]]

bucket_name = "screenshots-bucket"

binding = "screenshots_bucket"

remote = true


```

When remote bindings are configured, your Worker still **executes locally**, only the underlying resources your bindings connect to change. For all bindings marked with `remote: true`, Miniflare will route its operations (such as `env.MY_KV.put()`) to the deployed resource. All other bindings not explicitly configured with `remote: true` continue to use their default local simulations.

### Integration with environments

Remote Bindings work well together with [Workers Environments](https://developers.cloudflare.com/workers/wrangler/environments). To protect production data, you can create a development or staging environment and specify different resources in your [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/) than you would use for production.

**For example:**

* [  wrangler.jsonc ](#tab-panel-11559)
* [  wrangler.toml ](#tab-panel-11560)

JSONC

```

{

  "name": "my-worker",

  // Set this to today's date

  "compatibility_date": "2026-06-18",


  "env": {

    "production": {

      "r2_buckets": [

        {

          "bucket_name": "screenshots-bucket",

          "binding": "screenshots_bucket",

        },

      ],

    },

    "staging": {

      "r2_buckets": [

        {

          "bucket_name": "preview-screenshots-bucket",

          "binding": "screenshots_bucket",

          "remote": true,

        },

      ],

    },

  },

}


```

TOML

```

name = "my-worker"

# Set this to today's date

compatibility_date = "2026-06-18"


[[env.production.r2_buckets]]

bucket_name = "screenshots-bucket"

binding = "screenshots_bucket"


[[env.staging.r2_buckets]]

bucket_name = "preview-screenshots-bucket"

binding = "screenshots_bucket"

remote = true


```

Running `wrangler dev -e staging` (or `CLOUDFLARE_ENV=staging vite dev`) with the above configuration means that:

* Your Worker code runs locally
* All calls made to `env.screenshots_bucket` will use the `preview-screenshots-bucket` resource, rather than the production `screenshots-bucket`.

### Recommended remote bindings

We recommend configuring specific bindings to connect to their remote counterparts. These services often rely on Cloudflare's network infrastructure or have complex backends that are not fully simulated locally.

The following bindings are recommended to have `remote: true` in your Wrangler configuration:

#### [Browser Run](https://developers.cloudflare.com/workers/wrangler/configuration/#browser-run):

To interact with a real headless browser for rendering. There is no current local simulation for Browser Run.

* [  wrangler.jsonc ](#tab-panel-11545)
* [  wrangler.toml ](#tab-panel-11546)

JSONC

```

{

  "browser": {

    "binding": "MY_BROWSER",

    "remote": true

  },

}


```

TOML

```

[browser]

binding = "MY_BROWSER"

remote = true


```

#### [Workers AI](https://developers.cloudflare.com/workers/wrangler/configuration/#workers-ai):

To utilize actual AI models deployed on Cloudflare's network for inference. There is no current local simulation for Workers AI.

* [  wrangler.jsonc ](#tab-panel-11549)
* [  wrangler.toml ](#tab-panel-11550)

JSONC

```

{

  "ai": {

    "binding": "AI",

    "remote": true

  },

}


```

TOML

```

[ai]

binding = "AI"

remote = true


```

#### [Vectorize](https://developers.cloudflare.com/workers/wrangler/configuration/#vectorize-indexes):

To connect to your production Vectorize indexes for accurate vector search and similarity operations. There is no current local simulation for Vectorize.

* [  wrangler.jsonc ](#tab-panel-11551)
* [  wrangler.toml ](#tab-panel-11552)

JSONC

```

{

  "vectorize": [

    {

      "binding": "MY_VECTORIZE_INDEX",

      "index_name": "my-prod-index",

      "remote": true

    }

  ],

}


```

TOML

```

[[vectorize]]

binding = "MY_VECTORIZE_INDEX"

index_name = "my-prod-index"

remote = true


```

#### [mTLS](https://developers.cloudflare.com/workers/wrangler/configuration/#mtls-certificates):

To verify that the certificate exchange and validation process work as expected. There is no current local simulation for mTLS bindings.

* [  wrangler.jsonc ](#tab-panel-11555)
* [  wrangler.toml ](#tab-panel-11556)

JSONC

```

{

  "mtls_certificates": [

    {

      "binding": "MY_CLIENT_CERT_FETCHER",

      "certificate_id": "<YOUR_UPLOADED_CERT_ID>",

      "remote": true

      }

  ]

}


```

TOML

```

[[mtls_certificates]]

binding = "MY_CLIENT_CERT_FETCHER"

certificate_id = "<YOUR_UPLOADED_CERT_ID>"

remote = true


```

#### [Images](https://developers.cloudflare.com/workers/wrangler/configuration/#images):

To connect to a high-fidelity version of the Images API, and verify that all transformations work as expected. Local simulation for Cloudflare Images is [limited with only a subset of features](https://developers.cloudflare.com/images/optimization/binding/#interact-with-your-images-binding-locally).

* [  wrangler.jsonc ](#tab-panel-11553)
* [  wrangler.toml ](#tab-panel-11554)

JSONC

```

{

  "images": {

    "binding": "IMAGES" ,

    "remote": true

  }

}


```

TOML

```

[images]

binding = "IMAGES"

remote = true


```

Note

If `remote: true` is not specified for Browser Run, Vectorize, mTLS, or Images, Cloudflare **will issue a warning**. This prompts you to consider enabling it for a more production-like testing experience.

If a Workers AI binding has `remote` set to `false`, Cloudflare will **produce an error**. If the property is omitted, Cloudflare will connect to the remote resource and issue a warning to add the property to configuration.

#### [Dispatch Namespaces](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/local-development/):

Workers for Platforms users can configure `remote: true` in dispatch namespace binding definitions:

* [  wrangler.jsonc ](#tab-panel-11557)
* [  wrangler.toml ](#tab-panel-11558)

JSONC

```

{

  "dispatch_namespaces": [

    {

      "binding": "DISPATCH_NAMESPACE",

      "namespace": "testing",

      "remote":true

    }

  ]

}


```

TOML

```

[[dispatch_namespaces]]

binding = "DISPATCH_NAMESPACE"

namespace = "testing"

remote = true


```

This allows you to run your [dynamic dispatch Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dynamic-dispatch-worker) locally, while connecting it to your remote dispatch namespace binding. This allows you to test changes to your core dispatching logic against real, deployed [user Workers](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#user-workers).

### Unsupported remote bindings

Certain bindings are not supported for remote connections (i.e. with `remote: true`) during local development. These will always use local simulations or local values.

If `remote: true` is specified in Wrangler configuration for any of the following unsupported binding types, Cloudflare **will issue an error**. See [all supported and unsupported bindings for remote bindings](https://developers.cloudflare.com/workers/development-testing/bindings-per-env/).

* [**Durable Objects**](https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects): Enabling remote connections for Durable Objects may be supported in the future, but currently will always run locally. However, using Durable Objects in combination with remote bindings is possible. Refer to [Using remote resources with Durable Objects and Workflows](#using-remote-resources-with-durable-objects-and-workflows) below.
* [**Workflows**](https://developers.cloudflare.com/workflows/): Enabling remote connections for Workflows may be supported in the future, but currently will only run locally. However, using Workflows in combination with remote bindings is possible. Refer to [Using remote resources with Durable Objects and Workflows](#using-remote-resources-with-durable-objects-and-workflows) below.
* [**Environment Variables (vars)**](https://developers.cloudflare.com/workers/wrangler/configuration/#environment-variables): Environment variables are intended to be distinct between local development and deployed environments. They are easily configurable locally (such as in a `.dev.vars` file or directly in Wrangler configuration).
* [**Secrets**](https://developers.cloudflare.com/workers/wrangler/configuration/#secrets): Like environment variables, secrets are expected to have different values in local development versus deployed environments for security reasons. Use `.dev.vars` for local secret management.
* [**Static Assets**](https://developers.cloudflare.com/workers/wrangler/configuration/#assets) Static assets are always served from your local disk during development for speed and direct feedback on changes.
* [**Version Metadata**](https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/): Since your Worker code is running locally, version metadata (like commit hash, version tags) associated with a specific deployed version is not applicable or accurate.
* [**Analytics Engine**](https://developers.cloudflare.com/analytics/analytics-engine/): Local development sessions typically don't contribute data directly to production Analytics Engine.
* [**Hyperdrive**](https://developers.cloudflare.com/workers/wrangler/configuration/#hyperdrive): This is being actively worked on, but is currently unsupported.
* [**Rate Limiting**](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/#configuration): Local development sessions typically should not share or affect rate limits of your deployed Workers. Rate limiting logic should be tested against local simulations.

Note

If you have use-cases for connecting to any of the remote resources above, please [open a feature request ↗](https://github.com/cloudflare/workers-sdk/issues) in our [workers-sdk repository ↗](https://github.com/cloudflare/workers-sdk).

#### Using remote resources with Durable Objects and Workflows

While Durable Object and Workflow bindings cannot currently be remote, you can still use them during local development and have them interact with remote resources.

There are two recommended patterns for this:

* **Local Durable Objects/Workflows with remote bindings:**  
When you enable remote bindings in your [Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration), your locally running Durable Objects and Workflows can access remote resources. This allows such bindings, although run locally, to interact with remote resources during local development.
* **Accessing remote Durable Objects/Workflows via service bindings:**  
To interact with remote Durable Object or Workflow instances, deploy a Worker that defines those. Then, in your local Worker, configure a remote [service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) pointing to the deployed Worker. Your local Worker will be then able to interact with the remote deployed Worker, which in turn can communicate with the remote Durable Objects/Workflows. Using this method, you can create a communication channel via the remote service binding, effectively using the deployed Worker as a proxy interface to the remote bindings during local development.

### Important Considerations

* **Cloudflare Access**: If your Worker is protected by [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/), Wrangler must authenticate with Access when connecting to remote bindings. Refer to [Connect to Access-protected Workers](#connect-to-access-protected-workers).
* **Data modification**: Operations (writes, deletes, updates) on bindings connected remotely will affect your actual data in the targeted Cloudflare resource (be it preview or production).
* **Billing**: Interactions with remote Cloudflare services through these connections will incur standard operational costs for those services (such as KV operations, R2 storage/operations, AI requests, D1 usage).
* **Network latency**: Expect network latency for operations on these remotely connected bindings, as they involve communication over the internet.

### Connect to Access-protected Workers

If your Worker is deployed behind a [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/) application — for example, if the `*.workers.dev` subdomain on your account is protected by Access, or if you have placed an Access policy on the custom route of the Worker — Wrangler must authenticate with Access when connecting to your remote bindings.

There are two ways you can authenticate against Access:

* **Interactive login** (local development): If you have a policy defined that accepts user login, then Wrangler launches the interactive `cloudflared access login` flow in your browser. No additional setup is required beyond being signed in to the correct account. If the policy only allows service token authentication, Wrangler will skip the interactive flow and throw an error indicating that service token credentials are required.
* **Service token** (CI / non-interactive environments): In CI/CD pipelines and other non-interactive contexts, or where the policy only allows service token authentication, Wrangler cannot trigger the interactive flow via the browser. Authentication must be via a [Cloudflare Access service token](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) instead. If you do not configure a service token in a non-interactive environment, Wrangler will throw an error rather than attempting the interactive flow.

To set up service token authentication:

1. **Create a service token.**  
In the Cloudflare dashboard, go to **Zero Trust** \> **Access** \> **Service Auth** \> **Service Tokens** and create a new token. Refer to [Service tokens](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/service-tokens/) for the full reference. You will be shown a Client ID and a Client Secret — save them somewhere safe, as the secret is not shown again.
2. **Add a Service Auth policy to the Access application that protects your Worker.**  
Open the _existing_ Access application that already covers the hostname of the Worker — typically the wildcard application for `*.<account>.workers.dev`, or the application that protects your custom domain — and attach a new policy with:  
   * **Action**: Service Auth  
   * **Include**: The service token you created, or "Any Access Service Token" if you want to allow any service token to access the Worker.  
Warning  
Do not create a _separate_ Access application scoped only to the Worker's hostname. Doing so has been observed to block requests even when the existing wildcard application is left in place — refer to [opennextjs-cloudflare#1171 ↗](https://github.com/opennextjs/opennextjs-cloudflare/issues/1171). Attach the Service Auth policy to the existing application that already protects the hostname.
3. **Expose the credentials to Wrangler.**  
Set the `CLOUDFLARE_ACCESS_CLIENT_ID` and `CLOUDFLARE_ACCESS_CLIENT_SECRET` [system environment variables](https://developers.cloudflare.com/workers/wrangler/system-environment-variables/) in the environment that runs Wrangler:  
Terminal window  
```  
export CLOUDFLARE_ACCESS_CLIENT_ID=<CLIENT_ID>  
export CLOUDFLARE_ACCESS_CLIENT_SECRET=<CLIENT_SECRET>  
```  
In CI, store the values as secrets and expose them as environment variables to the step that runs Wrangler.

### API

Wrangler provides programmatic utilities to help tooling authors support remote binding connections when running Workers code with [Miniflare](https://developers.cloudflare.com/workers/testing/miniflare/).

**Key APIs include:**

* [startRemoteProxySession](#startRemoteProxySession): Starts a proxy session that allows interaction with remote bindings.
* [unstable\_convertConfigBindingsToStartWorkerBindings](#unstable%5Fconvertconfigbindingstostartworkerbindings): Utility for converting binding definitions.
* [experimental\_maybeStartOrUpdateProxySession](#experimental%5Fmaybestartorupdatemixedmodesession): Convenience function to easily start or update a proxy session.

#### `startRemoteProxySession`

This function starts a proxy session for a given set of bindings. It accepts options to control session behavior, including an `auth` option with your Cloudflare account ID and API token for remote binding access.

It returns an object with:

* `ready` ` Promise<void> `: Resolves when the session is ready.
* `dispose` ` () => Promise<void> `: Stops the session.
* `updateBindings` ` (bindings: StartDevWorkerInput['bindings']) => Promise<void> `: Updates session bindings.
* `remoteProxyConnectionString` ` remoteProxyConnectionString `: String to pass to Miniflare for remote binding access.

#### `unstable_convertConfigBindingsToStartWorkerBindings`

The `unstable_readConfig` utility returns an `Unstable_Config` object which includes the definition of the bindings included in the configuration file. These bindings definitions are however not directly compatible with `startRemoteProxySession`. It can be quite convenient to however read the binding declarations with `unstable_readConfig` and then pass them to `startRemoteProxySession`, so for this wrangler exposes `unstable_convertConfigBindingsToStartWorkerBindings` which is a simple utility to convert the bindings in an `Unstable_Config` object into a structure that can be passed to `startRemoteProxySession`.

Note

This type conversion is temporary. In the future, the types will be unified so you can pass the config object directly to `startRemoteProxySession`.

#### `maybeStartOrUpdateRemoteProxySession`

This wrapper simplifies proxy session management. It takes:

* An object that contains either:  
   * the path to a Wrangler configuration and a potential target environment  
   * the name of the Worker and the bindings it is using
* The current proxy session details (this parameter can be set to `null` or not being provided if none).
* Potentially the auth data to use for the remote proxy session.

It returns an object with the proxy session details if started or updated, or `null` if no proxy session is needed.

The function:

* Based on the first argument prepares the input arguments for the proxy session.
* If there are no remote bindings to be used (nor a pre-existing proxy session) it returns null, signaling that no proxy session is needed.
* If the details of an existing proxy session have been provided it updates the proxy session accordingly.
* Otherwise if starts a new proxy session.
* Returns the proxy session details (that can later be passed as the second argument to `maybeStartOrUpdateRemoteProxySession`).

#### Example

Here's a basic example of using Miniflare with `maybeStartOrUpdateRemoteProxySession` to provide a local dev session with remote bindings. This example uses a single hardcoded KV binding.

* [  JavaScript ](#tab-panel-11561)
* [  TypeScript ](#tab-panel-11562)

JavaScript

```

import { Miniflare, MiniflareOptions } from "miniflare";

import { maybeStartOrUpdateRemoteProxySession } from "wrangler";


let mf;


let remoteProxySessionDetails = null;


async function startOrUpdateDevSession() {

  remoteProxySessionDetails = await maybeStartOrUpdateRemoteProxySession(

    {

      bindings: {

        MY_KV: {

          type: "kv_namespace",

          id: "kv-id",

          remote: true,

        },

      },

    },

    remoteProxySessionDetails,

  );


  const miniflareOptions = {

    scriptPath: "./worker.js",

    kvNamespaces: {

      MY_KV: {

        id: "kv-id",

        remoteProxyConnectionString:

          remoteProxySessionDetails?.session.remoteProxyConnectionString,

      },

    },

  };


  if (!mf) {

    mf = new Miniflare(miniflareOptions);

  } else {

    mf.setOptions(miniflareOptions);

  }

}


// ... tool logic that invokes `startOrUpdateDevSession()` ...


// ... once the dev session is no longer needed run

// `remoteProxySessionDetails?.session.dispose()`


```

TypeScript

```

import { Miniflare, MiniflareOptions } from "miniflare";

import { maybeStartOrUpdateRemoteProxySession } from "wrangler";


let mf: Miniflare | null;


let remoteProxySessionDetails: Awaited<

  ReturnType<typeof maybeStartOrUpdateRemoteProxySession>

> | null = null;


async function startOrUpdateDevSession() {

  remoteProxySessionDetails = await maybeStartOrUpdateRemoteProxySession(

    {

      bindings: {

        MY_KV: {

          type: "kv_namespace",

          id: "kv-id",

          remote: true,

        },

      },

    },

    remoteProxySessionDetails,

  );


  const miniflareOptions: MiniflareOptions = {

    scriptPath: "./worker.js",

    kvNamespaces: {

      MY_KV: {

        id: "kv-id",

        remoteProxyConnectionString:

          remoteProxySessionDetails?.session.remoteProxyConnectionString,

      },

    },

  };


  if (!mf) {

    mf = new Miniflare(miniflareOptions);

  } else {

    mf.setOptions(miniflareOptions);

  }

}


// ... tool logic that invokes `startOrUpdateDevSession()` ...


// ... once the dev session is no longer needed run

// `remoteProxySessionDetails?.session.dispose()`


```

## `wrangler dev --remote` (Legacy)

Separate from Miniflare-powered local development, Wrangler also offers a fully remote development mode via [wrangler dev --remote](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev). Remote development is [**not** supported in the Vite plugin](https://developers.cloudflare.com/workers/development-testing/wrangler-vs-vite/).

 npm  yarn  pnpm 

```
npx wrangler dev --remote
```

```
yarn wrangler dev --remote
```

```
pnpm wrangler dev --remote
```

During **remote development**, all of your Worker code is uploaded to a temporary preview environment on Cloudflare's infrastructure, and changes to your code are automatically uploaded as you save.

When using remote development, all bindings automatically connect to their remote resources. Unlike local development, you cannot configure bindings to use local simulations - they will always use the deployed resources on Cloudflare's network.

### When to use Remote development

* For most development tasks, the most efficient and productive experience will be local development along with [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) when needed.
* You may want to use `wrangler dev --remote` for testing features or behaviors that are highly specific to Cloudflare's network and cannot be adequately simulated locally or tested via remote bindings.

### Considerations

* Iteration is significantly slower than local development due to the upload/deployment step for each change.

### Limitations

* When you run a remote development session using the `--remote` flag, a limit of 50 [routes](https://developers.cloudflare.com/workers/configuration/routing/routes/) per zone is enforced. Learn more in[ Workers platform limits](https://developers.cloudflare.com/workers/platform/limits/#routes-and-domains-when-using-wrangler-dev---remote).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/development-testing/#page","headline":"Development & testing · Cloudflare Workers docs","description":"Develop and test your Workers locally.","url":"https://developers.cloudflare.com/workers/development-testing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/development-testing/","name":"Development & testing"}}]}
```
