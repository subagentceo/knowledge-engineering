---
title: Getting started
description: Create your first Sandbox SDK Worker to execute Python code in isolated containers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Getting started

Build your first application with Sandbox SDK - a secure code execution environment. In this guide, you'll create a Worker that can execute Python code and work with files in isolated containers.

What you're building

A simple API that can safely execute Python code and perform file operations in isolated sandbox environments.

## Prerequisites

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

### Ensure Docker is running locally

Sandbox SDK uses [Docker ↗](https://www.docker.com/) to build container images alongside your Worker.

You must have Docker running locally when you run `wrangler deploy`. For most people, the best way to install Docker is to follow the [docs for installing Docker Desktop ↗](https://docs.docker.com/desktop/). Other tools like [Colima ↗](https://github.com/abiosoft/colima) may also work.

You can check that Docker is running properly by running the `docker info` command in your terminal. If Docker is running, the command will succeed. If Docker is not running, the `docker info` command will hang or return an error including the message "Cannot connect to the Docker daemon".

## 1\. Create a new project

Create a new Sandbox SDK project:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- my-sandbox --template=cloudflare/sandbox-sdk/examples/minimal
```

```
yarn create cloudflare my-sandbox --template=cloudflare/sandbox-sdk/examples/minimal
```

```
pnpm create cloudflare@latest my-sandbox --template=cloudflare/sandbox-sdk/examples/minimal
```

This creates a `my-sandbox` directory with everything you need:

* `src/index.ts` \- Worker with sandbox integration
* `wrangler.jsonc` \- Configuration for Workers and Containers
* `Dockerfile` \- Container environment definition

Terminal window

```

cd my-sandbox


```

## 2\. Explore the template

The template provides a minimal Worker that demonstrates core sandbox capabilities:

TypeScript

```

import { getSandbox, proxyToSandbox, type Sandbox } from "@cloudflare/sandbox";


export { Sandbox } from "@cloudflare/sandbox";


type Env = {

  Sandbox: DurableObjectNamespace<Sandbox>;

};


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const url = new URL(request.url);


    // Get or create a sandbox instance. For user-facing apps,

    // derive this ID from the authenticated user.

    const sandbox = getSandbox(env.Sandbox, "my-sandbox");


    // Execute Python code

    if (url.pathname === "/run") {

      const result = await sandbox.exec('python3 -c "print(2 + 2)"');

      return Response.json({

        output: result.stdout,

        error: result.stderr,

        exitCode: result.exitCode,

        success: result.success,

      });

    }


    // Work with files

    if (url.pathname === "/file") {

      await sandbox.writeFile("/workspace/hello.txt", "Hello, Sandbox!");

      const file = await sandbox.readFile("/workspace/hello.txt");

      return Response.json({

        content: file.content,

      });

    }


    return new Response("Try /run or /file");

  },

};


```

**Key concepts**:

* `getSandbox()` \- Gets or creates a sandbox instance by ID. Use a stable ID to reconnect to the same sandbox. In user-facing apps, scope IDs to a single user.
* `sandbox.exec()` \- Execute shell commands in the sandbox and capture stdout, stderr, and exit codes.
* `sandbox.writeFile()` / `readFile()` \- Write and read files in the sandbox filesystem.

## 3\. Test locally

Start the development server:

Terminal window

```

npm run dev

# If you expect to have multiple sandbox instances, you can increase `max_instances`.


```

Note

First run builds the Docker container (2-3 minutes). Subsequent runs are much faster due to caching.

Test the endpoints:

Terminal window

```

# Execute Python code

curl http://localhost:8787/run


# File operations

curl http://localhost:8787/file


```

You should see JSON responses with the command output and file contents.

## 4\. Deploy to production

Deploy your Worker and container:

Terminal window

```

npx wrangler deploy


```

This will:

1. Build your container image using Docker
2. Push it to Cloudflare's Container Registry
3. Deploy your Worker globally

Wait for provisioning

After first deployment, wait 2-3 minutes before making requests. The Worker deploys immediately, but the container needs time to provision.

Check deployment status:

Terminal window

```

npx wrangler containers list


```

## 5\. Test your deployment

Visit your Worker URL (shown in deploy output):

Terminal window

```

# Replace with your actual URL

curl https://my-sandbox.YOUR_SUBDOMAIN.workers.dev/run


```

Your sandbox is now deployed and can execute code in isolated containers.

## Understanding the configuration

Your `wrangler.jsonc` connects three pieces together:

* [  wrangler.jsonc ](#tab-panel-10243)
* [  wrangler.toml ](#tab-panel-10244)

JSONC

```

{

  "containers": [

    {

      "class_name": "Sandbox",

      "image": "./Dockerfile",

      "instance_type": "lite",

      "max_instances": 1,

    },

  ],

  "durable_objects": {

    "bindings": [

      {

        "class_name": "Sandbox",

        "name": "Sandbox",

      },

    ],

  },

  "migrations": [

    {

      "new_sqlite_classes": ["Sandbox"],

      "tag": "v1",

    },

  ],

}


```

TOML

```

[[containers]]

class_name = "Sandbox"

image = "./Dockerfile"

instance_type = "lite"

max_instances = 1


[[durable_objects.bindings]]

class_name = "Sandbox"

name = "Sandbox"


[[migrations]]

new_sqlite_classes = [ "Sandbox" ]

tag = "v1"


```

* **containers** \- Defines the [container image, instance type, and resource limits](https://developers.cloudflare.com/workers/wrangler/configuration/#containers) for your sandbox environment. If you expect to have multiple sandbox instances, you can increase `max_instances`.
* **durable\_objects** \- You need not be familiar with [Durable Objects](https://developers.cloudflare.com/durable-objects) to use Sandbox SDK, but if you'd like, you can [learn more about Cloudflare Containers and Durable Objects](https://developers.cloudflare.com/containers/get-started/#each-container-is-backed-by-its-own-durable-object). This configuration creates a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings#what-is-a-binding) that makes the `Sandbox` Durable Object accessible in your Worker code.
* **migrations** \- Registers the `Sandbox` class, implemented by the Sandbox SDK, with [SQLite storage backend](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage) (required once)

For detailed configuration options including environment variables, secrets, and custom images, see the [Wrangler configuration reference](https://developers.cloudflare.com/sandbox/configuration/wrangler/).

## Next steps

Now that you have a working sandbox, explore more capabilities:

* [Code interpreter with Workers AI](https://developers.cloudflare.com/sandbox/tutorials/workers-ai-code-interpreter/) \- Build an AI-powered code execution system
* [Execute commands](https://developers.cloudflare.com/sandbox/guides/execute-commands/) \- Run shell commands and stream output
* [Manage files](https://developers.cloudflare.com/sandbox/guides/manage-files/) \- Work with files and directories
* [Expose services](https://developers.cloudflare.com/sandbox/guides/expose-services/) \- Get public URLs for services running in your sandbox
* [Quick tunnels](https://developers.cloudflare.com/sandbox/api/tunnels/) \- Zero-config `*.trycloudflare.com` URLs for development and `.workers.dev` deployments
* [Production Deployment](https://developers.cloudflare.com/sandbox/guides/production-deployment/) \- Set up custom domains for preview URLs
* [API reference](https://developers.cloudflare.com/sandbox/api/) \- Complete API documentation

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/get-started/#page","headline":"Getting started · Cloudflare Sandbox SDK docs","description":"Create your first Sandbox SDK Worker to execute Python code in isolated containers.","url":"https://developers.cloudflare.com/sandbox/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/get-started/","name":"Getting started"}}]}
```
