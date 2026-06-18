---
title: Container runtime
description: Sandbox SDK containers run isolated Linux environments with Python, Node.js, and common dev tools.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Container runtime

Each sandbox runs in an isolated Linux container with Python, Node.js, and common development tools pre-installed. For a complete list of pre-installed software and how to customize the container image, see [Dockerfile reference](https://developers.cloudflare.com/sandbox/configuration/dockerfile/).

## Runtime software installation

Install additional software at runtime using standard package managers:

Terminal window

```

# Python packages

pip install scikit-learn tensorflow


# Node.js packages

npm install express


# System packages (requires apt-get update first)

apt-get update && apt-get install -y redis-server


```

## Filesystem

The container provides a standard Linux filesystem. You can read and write anywhere you have permissions.

**Standard directories**:

* `/workspace` \- Default working directory for user code
* `/tmp` \- Temporary files
* `/home` \- User home directory
* `/usr/bin`, `/usr/local/bin` \- Executable binaries

**Example**:

TypeScript

```

await sandbox.writeFile('/workspace/app.py', 'print("Hello")');

await sandbox.writeFile('/tmp/cache.json', '{}');

await sandbox.exec('ls -la /workspace');


```

## Process management

Processes run as you'd expect in a regular Linux environment.

**Foreground processes** (`exec()`):

TypeScript

```

const result = await sandbox.exec('npm test');

// Waits for completion, returns output


```

**Background processes** (`startProcess()`):

TypeScript

```

const process = await sandbox.startProcess('node server.js');

// Returns immediately, process runs in background


```

## Network capabilities

**Outbound connections** work:

Terminal window

```

curl https://api.example.com/data

pip install requests

npm install express


```

**Inbound connections** require port exposure:

TypeScript

```

const { hostname } = new URL(request.url);

await sandbox.startProcess('python -m http.server 8000');

const exposed = await sandbox.exposePort(8000, { hostname });

console.log(exposed.url); // Public URL


```

Local development

When using `wrangler dev`, you must add `EXPOSE` directives to your Dockerfile for each port. See [Local development with ports](https://developers.cloudflare.com/sandbox/guides/expose-services/#local-development).

**Localhost** works within sandbox:

Terminal window

```

redis-server &      # Start server

redis-cli ping      # Connect locally


```

## Security

**Between sandboxes** (isolated):

* Each sandbox is a separate container
* Filesystem, memory and network are all isolated

**Within sandbox** (shared):

* All processes see the same files
* Processes can communicate with each other
* Environment variables are session-scoped

To run untrusted code, use separate sandboxes per user:

TypeScript

```

const sandbox = getSandbox(env.Sandbox, `user-${userId}`);


```

## Limitations

**Cannot**:

* Load kernel modules or access host hardware

## Related resources

* [Architecture](https://developers.cloudflare.com/sandbox/concepts/architecture/) \- How containers fit in the system
* [Security model](https://developers.cloudflare.com/sandbox/concepts/security/) \- Container isolation details
* [Sandbox lifecycle](https://developers.cloudflare.com/sandbox/concepts/sandboxes/) \- Container lifecycle management
* [Docker-in-Docker](https://developers.cloudflare.com/sandbox/guides/docker-in-docker/) \- Run Docker containers inside a Sandbox

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/concepts/containers/#page","headline":"Container runtime · Cloudflare Sandbox SDK docs","description":"Sandbox SDK containers run isolated Linux environments with Python, Node.js, and common dev tools.","url":"https://developers.cloudflare.com/sandbox/concepts/containers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/concepts/containers/","name":"Container runtime"}}]}
```
