---
title: Expose services
description: Create preview URLs and expose ports for web services.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Expose services

Production requires custom domain

Preview URLs require a custom domain with wildcard DNS routing in production. See [Production Deployment](https://developers.cloudflare.com/sandbox/guides/production-deployment/) for setup instructions.

Prefer `sandbox.tunnels` for public URLs

[sandbox.tunnels](https://developers.cloudflare.com/sandbox/api/tunnels/) is the recommended option for most public-URL use cases, including production. Quick tunnels give you a zero-config `*.trycloudflare.com` URL; named tunnels bind a stable `<name>.<your-zone>` hostname. Follow this guide when you specifically want the Worker itself to front the request (for example, to inject authentication or rewrite responses).

This guide shows you how to expose services running in your sandbox to the internet via preview URLs.

## When to expose ports

Expose ports when you need to:

* **Test web applications** \- Preview frontend or backend apps
* **Share demos** \- Give others access to running applications
* **Develop APIs** \- Test endpoints from external tools
* **Debug services** \- Access internal services for troubleshooting
* **Build dev environments** \- Create shareable development workspaces

## Basic port exposure

The typical workflow is: start service → wait for ready → expose port → handle requests with `proxyToSandbox`.

* [  JavaScript ](#tab-panel-10365)
* [  TypeScript ](#tab-panel-10366)

JavaScript

```

import { getSandbox, proxyToSandbox } from "@cloudflare/sandbox";


export { Sandbox } from "@cloudflare/sandbox";


export default {

  async fetch(request, env) {

    // Proxy requests to exposed ports first

    const proxyResponse = await proxyToSandbox(request, env);

    if (proxyResponse) return proxyResponse;


    // Extract hostname from request

    const { hostname } = new URL(request.url);

    const sandbox = getSandbox(env.Sandbox, "my-sandbox");


    // 1. Start a web server

    await sandbox.startProcess("python -m http.server 8000");


    // 2. Wait for service to start

    await new Promise((resolve) => setTimeout(resolve, 2000));


    // 3. Expose the port

    const exposed = await sandbox.exposePort(8000, { hostname });


    // 4. Preview URL is now available (public by default)

    console.log("Server accessible at:", exposed.url);

    // Production: https://8000-abc123.yourdomain.com

    // Local dev: http://localhost:8787/...


    return Response.json({ url: exposed.url });

  },

};


```

TypeScript

```

import { getSandbox, proxyToSandbox } from '@cloudflare/sandbox';


export { Sandbox } from '@cloudflare/sandbox';


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    // Proxy requests to exposed ports first

    const proxyResponse = await proxyToSandbox(request, env);

    if (proxyResponse) return proxyResponse;


    // Extract hostname from request

    const { hostname } = new URL(request.url);

    const sandbox = getSandbox(env.Sandbox, 'my-sandbox');


    // 1. Start a web server

    await sandbox.startProcess('python -m http.server 8000');


    // 2. Wait for service to start

    await new Promise(resolve => setTimeout(resolve, 2000));


    // 3. Expose the port

    const exposed = await sandbox.exposePort(8000, { hostname });


    // 4. Preview URL is now available (public by default)

    console.log('Server accessible at:', exposed.url);

    // Production: https://8000-abc123.yourdomain.com

    // Local dev: http://localhost:8787/...


    return Response.json({ url: exposed.url });

  }

};


```

Warning

**Preview URLs are public by default.** Anyone with the URL can access your service. Add authentication if needed.

Local development requirement

When using `wrangler dev`, you must add `EXPOSE` directives to your Dockerfile for each port you plan to expose. Without this, you'll see "Connection refused: container port not found". See [Local development](#local-development) section below for setup details.

Uppercase sandbox IDs don't work with preview URLs

Preview URLs extract the sandbox ID from the hostname, which is always lowercase (e.g., `8000-myproject-123.yourdomain.com`). If you created your sandbox with an uppercase ID like `"MyProject-123"`, the URL routes to `"myproject-123"` (a different Durable Object), making your sandbox unreachable.

To fix this, use `normalizeId: true` when creating sandboxes for port exposure:

TypeScript

```

const sandbox = getSandbox(env.Sandbox, 'MyProject-123', { normalizeId: true });


```

This lowercases the ID during creation so it matches preview URL routing. Without this, `exposePort()` throws an error.

**Best practice**: Use lowercase IDs from the start (`'my-project-123'`).

See [Sandbox options](https://developers.cloudflare.com/sandbox/configuration/sandbox-options/#normalizeid) for details.

## Stable URLs with custom tokens

For production deployments or when sharing URLs with users, use custom tokens to maintain consistent preview URLs across container restarts:

* [  JavaScript ](#tab-panel-10347)
* [  TypeScript ](#tab-panel-10348)

JavaScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


// Without custom token - URL changes on restart

const exposed = await sandbox.exposePort(8080, { hostname });

// https://8080-sandbox-id-random16chars12.yourdomain.com


// With custom token - URL stays the same across restarts

const stable = await sandbox.exposePort(8080, {

  hostname,

  token: "api-v1",

});

// https://8080-sandbox-id-api-v1.yourdomain.com

// Same URL after container restart ✓


return Response.json({

  "Temporary URL (changes on restart)": exposed.url,

  "Stable URL (consistent)": stable.url,

});


```

TypeScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


// Without custom token - URL changes on restart

const exposed = await sandbox.exposePort(8080, { hostname });

// https://8080-sandbox-id-random16chars12.yourdomain.com


// With custom token - URL stays the same across restarts

const stable = await sandbox.exposePort(8080, {

  hostname,

  token: 'api-v1'

});

// https://8080-sandbox-id-api-v1.yourdomain.com

// Same URL after container restart ✓


return Response.json({

  'Temporary URL (changes on restart)': exposed.url,

  'Stable URL (consistent)': stable.url

});


```

**Token requirements:**

* 1-16 characters long
* Lowercase letters (a-z), numbers (0-9), hyphens (-), and underscores (\_) only
* Must be unique within each sandbox

**Use cases:**

* Production APIs with stable endpoints
* Sharing demo URLs with external users
* Integration testing with predictable URLs
* Documentation with consistent examples

## Name your exposed ports

When exposing multiple ports, use names to stay organized:

* [  JavaScript ](#tab-panel-10363)
* [  TypeScript ](#tab-panel-10364)

JavaScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


// Start and expose API server with stable token

await sandbox.startProcess("node api.js", { env: { PORT: "8080" } });

await new Promise((resolve) => setTimeout(resolve, 2000));

const api = await sandbox.exposePort(8080, {

  hostname,

  name: "api",

  token: "api-prod",

});


// Start and expose frontend with stable token

await sandbox.startProcess("npm run dev", { env: { PORT: "5173" } });

await new Promise((resolve) => setTimeout(resolve, 2000));

const frontend = await sandbox.exposePort(5173, {

  hostname,

  name: "frontend",

  token: "web-app",

});


console.log("Services:");

console.log("- API:", api.url);

console.log("- Frontend:", frontend.url);


```

TypeScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


// Start and expose API server with stable token

await sandbox.startProcess('node api.js', { env: { PORT: '8080' } });

await new Promise(resolve => setTimeout(resolve, 2000));

const api = await sandbox.exposePort(8080, {

  hostname,

  name: 'api',

  token: 'api-prod'

});


// Start and expose frontend with stable token

await sandbox.startProcess('npm run dev', { env: { PORT: '5173' } });

await new Promise(resolve => setTimeout(resolve, 2000));

const frontend = await sandbox.exposePort(5173, {

  hostname,

  name: 'frontend',

  token: 'web-app'

});


console.log('Services:');

console.log('- API:', api.url);

console.log('- Frontend:', frontend.url);


```

## Wait for service readiness

Always verify a service is ready before exposing. Use a simple delay for most cases:

* [  JavaScript ](#tab-panel-10345)
* [  TypeScript ](#tab-panel-10346)

JavaScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


// Start service

await sandbox.startProcess("npm run dev", { env: { PORT: "8080" } });


// Wait 2-3 seconds

await new Promise((resolve) => setTimeout(resolve, 2000));


// Now expose

await sandbox.exposePort(8080, { hostname });


```

TypeScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


// Start service

await sandbox.startProcess('npm run dev', { env: { PORT: '8080' } });


// Wait 2-3 seconds

await new Promise(resolve => setTimeout(resolve, 2000));


// Now expose

await sandbox.exposePort(8080, { hostname });


```

For critical services, poll the health endpoint:

* [  JavaScript ](#tab-panel-10359)
* [  TypeScript ](#tab-panel-10360)

JavaScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


await sandbox.startProcess("node api-server.js", { env: { PORT: "8080" } });


// Wait for health check

for (let i = 0; i < 10; i++) {

  await new Promise((resolve) => setTimeout(resolve, 1000));


  const check = await sandbox.exec(

    'curl -f http://localhost:8080/health || echo "not ready"',

  );

  if (check.stdout.includes("ok")) {

    break;

  }

}


await sandbox.exposePort(8080, { hostname });


```

TypeScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


await sandbox.startProcess('node api-server.js', { env: { PORT: '8080' } });


// Wait for health check

for (let i = 0; i < 10; i++) {

  await new Promise(resolve => setTimeout(resolve, 1000));


  const check = await sandbox.exec('curl -f http://localhost:8080/health || echo "not ready"');

  if (check.stdout.includes('ok')) {

    break;

  }

}


await sandbox.exposePort(8080, { hostname });


```

## Multiple services

Expose multiple ports for full-stack applications:

* [  JavaScript ](#tab-panel-10367)
* [  TypeScript ](#tab-panel-10368)

JavaScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


// Start backend

await sandbox.startProcess("node api/server.js", {

  env: { PORT: "8080" },

});

await new Promise((resolve) => setTimeout(resolve, 2000));


// Start frontend

await sandbox.startProcess("npm run dev", {

  cwd: "/workspace/frontend",

  env: { PORT: "5173", API_URL: "http://localhost:8080" },

});

await new Promise((resolve) => setTimeout(resolve, 3000));


// Expose both

const api = await sandbox.exposePort(8080, { hostname, name: "api" });

const frontend = await sandbox.exposePort(5173, { hostname, name: "frontend" });


return Response.json({

  api: api.url,

  frontend: frontend.url,

});


```

TypeScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


// Start backend

await sandbox.startProcess('node api/server.js', {

  env: { PORT: '8080' }

});

await new Promise(resolve => setTimeout(resolve, 2000));


// Start frontend

await sandbox.startProcess('npm run dev', {

  cwd: '/workspace/frontend',

  env: { PORT: '5173', API_URL: 'http://localhost:8080' }

});

await new Promise(resolve => setTimeout(resolve, 3000));


// Expose both

const api = await sandbox.exposePort(8080, { hostname, name: 'api' });

const frontend = await sandbox.exposePort(5173, { hostname, name: 'frontend' });


return Response.json({

  api: api.url,

  frontend: frontend.url

});


```

## Manage exposed ports

### List currently exposed ports

* [  JavaScript ](#tab-panel-10351)
* [  TypeScript ](#tab-panel-10352)

JavaScript

```

const { ports, count } = await sandbox.getExposedPorts();


console.log(`${count} ports currently exposed:`);


for (const port of ports) {

  console.log(`  Port ${port.port}: ${port.url}`);

  if (port.name) {

    console.log(`    Name: ${port.name}`);

  }

}


```

TypeScript

```

const { ports, count } = await sandbox.getExposedPorts();


console.log(`${count} ports currently exposed:`);


for (const port of ports) {

  console.log(`  Port ${port.port}: ${port.url}`);

  if (port.name) {

    console.log(`    Name: ${port.name}`);

  }

}


```

### Unexpose ports

* [  JavaScript ](#tab-panel-10349)
* [  TypeScript ](#tab-panel-10350)

JavaScript

```

// Unexpose a single port

await sandbox.unexposePort(8000);


// Unexpose multiple ports

for (const port of [3000, 5173, 8080]) {

  await sandbox.unexposePort(port);

}


```

TypeScript

```

// Unexpose a single port

await sandbox.unexposePort(8000);


// Unexpose multiple ports

for (const port of [3000, 5173, 8080]) {

  await sandbox.unexposePort(port);

}


```

## Best practices

* **Wait for readiness** \- Don't expose ports immediately after starting processes
* **Use named ports** \- Easier to track when exposing multiple ports
* **Clean up** \- Unexpose ports when done to prevent abandoned URLs
* **Add authentication** \- Preview URLs are public; protect sensitive services

## Local development

When developing locally with `wrangler dev`, you must expose ports in your Dockerfile:

Dockerfile

```

FROM docker.io/cloudflare/sandbox:0.3.3


# Expose ports you plan to use

EXPOSE 8000

EXPOSE 8080

EXPOSE 5173


```

Update `wrangler.jsonc` to use your Dockerfile:

wrangler.jsonc

```

{

  "containers": [

    {

      "class_name": "Sandbox",

      "image": "./Dockerfile"

    }

  ]

}


```

In production, all ports are available and controlled programmatically via `exposePort()` / `unexposePort()`.

## Troubleshooting

### Port 3000 is reserved

Port 3000 is used by the internal Bun server and cannot be exposed:

* [  JavaScript ](#tab-panel-10355)
* [  TypeScript ](#tab-panel-10356)

JavaScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


// ❌ This will fail

await sandbox.exposePort(3000, { hostname }); // Error: Port 3000 is reserved


// ✅ Use a different port

await sandbox.startProcess("node server.js", { env: { PORT: "8080" } });

await sandbox.exposePort(8080, { hostname });


```

TypeScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


// ❌ This will fail

await sandbox.exposePort(3000, { hostname });  // Error: Port 3000 is reserved


// ✅ Use a different port

await sandbox.startProcess('node server.js', { env: { PORT: '8080' } });

await sandbox.exposePort(8080, { hostname });


```

### Port not ready

Wait for the service to start before exposing:

* [  JavaScript ](#tab-panel-10353)
* [  TypeScript ](#tab-panel-10354)

JavaScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


await sandbox.startProcess("npm run dev");

await new Promise((resolve) => setTimeout(resolve, 3000));

await sandbox.exposePort(8080, { hostname });


```

TypeScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


await sandbox.startProcess('npm run dev');

await new Promise(resolve => setTimeout(resolve, 3000));

await sandbox.exposePort(8080, { hostname });


```

### Port already exposed

Check before exposing to avoid errors:

* [  JavaScript ](#tab-panel-10361)
* [  TypeScript ](#tab-panel-10362)

JavaScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


const { ports } = await sandbox.getExposedPorts();

if (!ports.some((p) => p.port === 8080)) {

  await sandbox.exposePort(8080, { hostname });

}


```

TypeScript

```

// Extract hostname from request

const { hostname } = new URL(request.url);


const { ports } = await sandbox.getExposedPorts();

if (!ports.some(p => p.port === 8080)) {

  await sandbox.exposePort(8080, { hostname });

}


```

### Uppercase sandbox ID error

**Error**: `Preview URLs require lowercase sandbox IDs`

**Cause**: You created a sandbox with uppercase characters (e.g., `"MyProject-123"`) but preview URLs always use lowercase in routing, causing a mismatch.

**Solution**:

* [  JavaScript ](#tab-panel-10357)
* [  TypeScript ](#tab-panel-10358)

JavaScript

```

// Create sandbox with normalization

const sandbox = getSandbox(env.Sandbox, "MyProject-123", { normalizeId: true });

await sandbox.exposePort(8080, { hostname });


```

TypeScript

```

// Create sandbox with normalization

const sandbox = getSandbox(env.Sandbox, 'MyProject-123', { normalizeId: true });

await sandbox.exposePort(8080, { hostname });


```

This creates the Durable Object with ID `"myproject-123"`, matching the preview URL routing.

See [Sandbox options - normalizeId](https://developers.cloudflare.com/sandbox/configuration/sandbox-options/#normalizeid) for details.

## Preview URL Format

**Production**: `https://{port}-{sandbox-id}-{token}.yourdomain.com`

* Auto-generated token: `https://8080-abc123-random16chars12.yourdomain.com`
* Custom token: `https://8080-abc123-my-api-v1.yourdomain.com`

**Local development**: `http://localhost:8787/...`

**Note**: Port 3000 is reserved for the internal Bun server and cannot be exposed.

## Related resources

* [Ports API reference](https://developers.cloudflare.com/sandbox/api/ports/) \- Complete port exposure API
* [Background processes guide](https://developers.cloudflare.com/sandbox/guides/background-processes/) \- Managing services
* [Execute commands guide](https://developers.cloudflare.com/sandbox/guides/execute-commands/) \- Starting services
* [Tunnels API reference](https://developers.cloudflare.com/sandbox/api/tunnels/) \- Recommended alternative for most public-URL use cases (quick or named tunnels)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/expose-services/#page","headline":"Expose services · Cloudflare Sandbox SDK docs","description":"Create preview URLs and expose ports for web services.","url":"https://developers.cloudflare.com/sandbox/guides/expose-services/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/guides/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/guides/expose-services/","name":"Expose services"}}]}
```
