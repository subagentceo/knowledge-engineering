---
title: Dockerfile reference
description: Customize the Sandbox SDK container image with packages, tools, and configurations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Dockerfile reference

Customize the sandbox container image with your own packages, tools, and configurations by extending the base runtime image.

## Base images

The Sandbox SDK provides multiple Ubuntu-based image variants. Choose the one that fits your use case:

| Image    | Tag suffix | Use case                                       |
| -------- | ---------- | ---------------------------------------------- |
| Default  | (none)     | Lean image for JavaScript/TypeScript workloads |
| Python   | \-python   | Data science, ML, Python code execution        |
| OpenCode | \-opencode | AI coding agents with OpenCode CLI             |

```

# Default - lean, no Python

FROM docker.io/cloudflare/sandbox:0.7.0


# Python - includes Python 3.11 + data science packages

FROM docker.io/cloudflare/sandbox:0.7.0-python


# OpenCode - includes OpenCode CLI for AI coding

FROM docker.io/cloudflare/sandbox:0.7.0-opencode


```

Version synchronization required

Always match the Docker image version to your npm package version. If you're using `@cloudflare/sandbox@0.7.0`, use `docker.io/cloudflare/sandbox:0.7.0` (or variant) as your base image.

**Why this matters**: The SDK automatically checks version compatibility on startup. Mismatched versions can cause features to break or behave unexpectedly. If versions don't match, you'll see warnings in your logs.

See [Version compatibility](https://developers.cloudflare.com/sandbox/concepts/sandboxes/#version-compatibility) for troubleshooting version mismatch warnings.

### Default image

The default image is optimized for JavaScript and TypeScript workloads:

* Ubuntu 22.04 LTS base
* Node.js 20 LTS with npm
* Bun 1.x (JavaScript/TypeScript runtime)
* System utilities: curl, wget, git, jq, zip, unzip, file, procps, ca-certificates

### Python image

The `-python` variant includes everything in the default image plus:

* Python 3.11 with pip and venv
* Pre-installed packages: matplotlib, numpy, pandas, ipython

### OpenCode image

The `-opencode` variant includes everything in the default image plus:

* [OpenCode CLI ↗](https://opencode.ai) for AI-powered coding agents

## Creating a custom image

Create a `Dockerfile` in your project root:

Dockerfile

```

FROM docker.io/cloudflare/sandbox:0.7.0-python


# Install additional Python packages

RUN pip install --no-cache-dir \

    scikit-learn==1.3.0 \

    tensorflow==2.13.0 \

    transformers==4.30.0


# Install Node.js packages globally

RUN npm install -g typescript ts-node prettier


# Install system packages

RUN apt-get update && apt-get install -y \

    postgresql-client \

    redis-tools \

    && rm -rf /var/lib/apt/lists/*


```

Update `wrangler.jsonc` to reference your Dockerfile:

wrangler.jsonc

```

{

  "containers": [

    {

      "class_name": "Sandbox",

      "image": "./Dockerfile",

    },

  ],

}


```

When you run `wrangler dev` or `wrangler deploy`, Wrangler automatically builds your Docker image and pushes it to Cloudflare's container registry. You don't need to manually build or publish images.

## Using arbitrary base images

You can add sandbox capabilities to any Docker image using the standalone binary. This approach lets you use your existing images without depending on the Cloudflare base images:

Dockerfile

```

FROM your-custom-image:tag


# Copy the sandbox binary from the official image

COPY --from=docker.io/cloudflare/sandbox:0.7.0 /container-server/sandbox /sandbox


ENTRYPOINT ["/sandbox"]


```

The `/sandbox` binary starts the HTTP API server that enables SDK communication. You can optionally run your own startup command:

Dockerfile

```

FROM node:20-slim


COPY --from=docker.io/cloudflare/sandbox:0.7.0 /container-server/sandbox /sandbox


# Copy your application

COPY . /app

WORKDIR /app


ENTRYPOINT ["/sandbox"]

CMD ["node", "server.js"]


```

When using `CMD`, the sandbox binary runs your command as a child process with proper signal forwarding.

## Custom startup scripts

For more complex startup sequences, create a custom startup script:

Dockerfile

```

FROM docker.io/cloudflare/sandbox:0.7.0-python


COPY my-app.js /workspace/my-app.js

COPY startup.sh /workspace/startup.sh

RUN chmod +x /workspace/startup.sh


CMD ["/workspace/startup.sh"]


```

The base image already sets the correct `ENTRYPOINT`, so you only need to provide a `CMD`. The sandbox binary starts the HTTP API server, then spawns your `CMD` as a child process with proper signal forwarding.

startup.sh

```

#!/bin/bash


# Start your services in the background

node /workspace/my-app.js &


# Start additional services

redis-server --daemonize yes

until redis-cli ping; do sleep 1; done


# Keep the script running (the sandbox binary handles the API server)

wait


```

Legacy startup scripts

If you have existing startup scripts that end with `exec bun /container-server/dist/index.js`, they will continue to work for backwards compatibility. However, we recommend migrating to the new approach using `CMD` for your startup script. Do not override `ENTRYPOINT` when extending the base image.

## Related resources

* [Image Management](https://developers.cloudflare.com/containers/platform-details/image-management/) \- Building and pushing images to Cloudflare's registry
* [Wrangler configuration](https://developers.cloudflare.com/sandbox/configuration/wrangler/) \- Using custom images in wrangler.jsonc
* [Docker documentation ↗](https://docs.docker.com/reference/dockerfile/) \- Complete Dockerfile syntax
* [Container concepts](https://developers.cloudflare.com/sandbox/concepts/containers/) \- Understanding the runtime environment

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/configuration/dockerfile/#page","headline":"Dockerfile reference · Cloudflare Sandbox SDK docs","description":"Customize the Sandbox SDK container image with packages, tools, and configurations.","url":"https://developers.cloudflare.com/sandbox/configuration/dockerfile/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/configuration/dockerfile/","name":"Dockerfile reference"}}]}
```
