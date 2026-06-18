---
title: Environment variables
description: Pass configuration, secrets, and runtime settings to Sandbox SDK containers using environment variables.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Environment variables

Pass configuration, secrets, and runtime settings to your sandboxes using environment variables.

## SDK configuration variables

These environment variables configure how the Sandbox SDK behaves. Set these as Worker `vars` in your `wrangler.jsonc` file. The SDK reads them from the Worker's environment bindings.

### SANDBOX\_TRANSPORT

| **Type**    | "http" \| "websocket" |
| ----------- | --------------------- |
| **Default** | "http"                |

Controls the transport protocol for SDK-to-container communication. WebSocket transport multiplexes all operations over a single persistent connection, avoiding [subrequest limits](https://developers.cloudflare.com/workers/platform/limits/#subrequests) when performing many SDK operations per request.

* [  wrangler.jsonc ](#tab-panel-10211)
* [  wrangler.toml ](#tab-panel-10212)

JSONC

```

{

  "vars": {

    "SANDBOX_TRANSPORT": "websocket"

  }

}


```

TOML

```

[vars]

SANDBOX_TRANSPORT = "websocket"


```

See [Transport modes](https://developers.cloudflare.com/sandbox/configuration/transport/) for a complete guide including when to use each transport, performance considerations, and migration instructions.

### COMMAND\_TIMEOUT\_MS

| **Type**    | number (milliseconds) |
| ----------- | --------------------- |
| **Default** | None (no timeout)     |

Sets a global default timeout for every `exec()` call. When set, any command that exceeds this duration raises an error on the caller side and closes the connection.

Per-command `timeout` on `exec()` and session-level `commandTimeoutMs` on [createSession()](https://developers.cloudflare.com/sandbox/api/sessions/#createsession) both override this value. For more details on timeout precedence, refer to [Execute commands - Timeouts](https://developers.cloudflare.com/sandbox/guides/execute-commands/#timeouts).

* [  wrangler.jsonc ](#tab-panel-10213)
* [  wrangler.toml ](#tab-panel-10214)

JSONC

```

{

  "vars": {

    "COMMAND_TIMEOUT_MS": "30000"

  }

}


```

TOML

```

[vars]

COMMAND_TIMEOUT_MS = "30000"


```

Note

A timeout does not kill the underlying process. It only terminates the connection to the caller. The process continues running until the session is deleted or the sandbox is destroyed.

## Three ways to set environment variables

The Sandbox SDK provides three methods for setting environment variables, each suited for different use cases:

### 1\. Sandbox-level with setEnvVars()

Set environment variables globally for all commands in the sandbox:

TypeScript

```

const sandbox = getSandbox(env.Sandbox, "my-sandbox");


// Set once, available for all subsequent commands

await sandbox.setEnvVars({

  DATABASE_URL: env.DATABASE_URL,

  API_KEY: env.API_KEY,

});


await sandbox.exec("python migrate.py"); // Has DATABASE_URL and API_KEY

await sandbox.exec("python seed.py"); // Has DATABASE_URL and API_KEY


// Unset variables by passing undefined

await sandbox.setEnvVars({

  API_KEY: "new-key", // Updates API_KEY

  OLD_SECRET: undefined, // Unsets OLD_SECRET

});


```

**Use when:** You need the same environment variables for multiple commands.

**Unsetting variables**: Pass `undefined` or `null` to unset environment variables:

TypeScript

```

await sandbox.setEnvVars({

  API_KEY: 'new-key',     // Sets API_KEY

  OLD_SECRET: undefined,  // Unsets OLD_SECRET

  DEBUG_MODE: null        // Unsets DEBUG_MODE

});


```

### 2\. Per-command with exec() options

Pass environment variables for a specific command:

TypeScript

```

await sandbox.exec("node app.js", {

  env: {

    NODE_ENV: "production",

    PORT: "3000",

  },

});


// Also works with startProcess()

await sandbox.startProcess("python server.py", {

  env: {

    DATABASE_URL: env.DATABASE_URL,

  },

});


```

**Use when:** You need different environment variables for different commands, or want to override sandbox-level variables.

Note

Per-command environment variables with `undefined` values are skipped (treated as "not configured"), unlike `setEnvVars()` where `undefined` explicitly unsets a variable.

### 3\. Session-level with createSession()

Create an isolated session with its own environment variables:

TypeScript

```

const session = await sandbox.createSession({

  env: {

    DATABASE_URL: env.DATABASE_URL,

    SECRET_KEY: env.SECRET_KEY,

  },

});


// All commands in this session have these vars

await session.exec("python migrate.py");

await session.exec("python seed.py");


```

**Use when:** You need isolated execution contexts with different environment variables running concurrently.

## Unsetting environment variables

The Sandbox SDK supports unsetting environment variables by passing `undefined` or `null` values. This enables idiomatic JavaScript patterns for managing configuration:

TypeScript

```

await sandbox.setEnvVars({

  // Set new values

  API_KEY: 'new-key',

  DATABASE_URL: env.DATABASE_URL,


  // Unset variables (removes them from the environment)

  OLD_API_KEY: undefined,

  TEMP_TOKEN: null

});


```

**Before this change**: Passing `undefined` values would throw a runtime error.

**After this change**: `undefined` and `null` values run `unset VARIABLE_NAME` in the shell.

### Use cases for unsetting

**Remove sensitive data after use:**

TypeScript

```

// Use a temporary token

await sandbox.setEnvVars({ TEMP_TOKEN: 'abc123' });

await sandbox.exec('curl -H "Authorization: $TEMP_TOKEN" api.example.com');


// Clean up the token

await sandbox.setEnvVars({ TEMP_TOKEN: undefined });


```

**Conditional environment setup:**

TypeScript

```

await sandbox.setEnvVars({

  API_KEY: env.API_KEY,

  DEBUG_MODE: env.NODE_ENV === 'development' ? 'true' : undefined,

  PROFILING: env.ENABLE_PROFILING ? 'true' : undefined

});


```

**Reset to system defaults:**

TypeScript

```

// Unset to fall back to container's default NODE_ENV

await sandbox.setEnvVars({ NODE_ENV: undefined });


```

## Common patterns

### Pass Worker secrets to sandbox

Securely pass secrets from your Worker to the sandbox. First, set secrets using Wrangler:

Terminal window

```

wrangler secret put OPENAI_API_KEY

wrangler secret put DATABASE_URL


```

Then pass them to your sandbox:

TypeScript

```

import { getSandbox } from "@cloudflare/sandbox";

export { Sandbox } from "@cloudflare/sandbox";


interface Env {

  Sandbox: DurableObjectNamespace<Sandbox>;

  OPENAI_API_KEY: string;

  DATABASE_URL: string;

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const sandbox = getSandbox(env.Sandbox, "user-sandbox");


    // Option 1: Set globally for all commands

    await sandbox.setEnvVars({

      OPENAI_API_KEY: env.OPENAI_API_KEY,

      DATABASE_URL: env.DATABASE_URL,

    });

    await sandbox.exec("python analyze.py");


    // Option 2: Pass per-command

    await sandbox.exec("python analyze.py", {

      env: {

        OPENAI_API_KEY: env.OPENAI_API_KEY,

      },

    });


    return Response.json({ success: true });

  },

};


```

### Combine default and specific variables

TypeScript

```

const defaults = { NODE_ENV: "production", LOG_LEVEL: "info" };


await sandbox.exec("npm start", {

  env: { ...defaults, PORT: "3000", API_KEY: env.API_KEY },

});


```

### Multiple isolated sessions

Run different tasks with different environment variables concurrently:

TypeScript

```

// Production database session

const prodSession = await sandbox.createSession({

  env: { DATABASE_URL: env.PROD_DATABASE_URL },

});


// Staging database session

const stagingSession = await sandbox.createSession({

  env: { DATABASE_URL: env.STAGING_DATABASE_URL },

});


// Run migrations on both concurrently

await Promise.all([

  prodSession.exec("python migrate.py"),

  stagingSession.exec("python migrate.py"),

]);


```

### Configure transport mode

Set `SANDBOX_TRANSPORT` in your Worker's `vars` to switch between HTTP and WebSocket transport. See [Transport modes](https://developers.cloudflare.com/sandbox/configuration/transport/) for details on when and how to configure each transport.

### Bucket mounting credentials

When mounting S3-compatible object storage, the SDK uses **s3fs-fuse** under the hood, which requires AWS-style credentials. For R2, generate API tokens from the Cloudflare dashboard and provide them using AWS environment variable names:

**Get R2 API tokens:**

1. Go to [**R2** \> **Overview** ↗](https://dash.cloudflare.com/?to=/:account/r2) in the Cloudflare dashboard
2. Select **Manage R2 API Tokens**
3. Create a token with **Object Read & Write** permissions
4. Copy the **Access Key ID** and **Secret Access Key**

**Set credentials as Worker secrets:**

Terminal window

```

wrangler secret put AWS_ACCESS_KEY_ID

# Paste your R2 Access Key ID


wrangler secret put AWS_SECRET_ACCESS_KEY

# Paste your R2 Secret Access Key


```

**Mount buckets with automatic credential detection:**

TypeScript

```

import { getSandbox } from "@cloudflare/sandbox";

export { Sandbox } from "@cloudflare/sandbox";


interface Env {

  Sandbox: DurableObjectNamespace<Sandbox>;

  AWS_ACCESS_KEY_ID: string;

  AWS_SECRET_ACCESS_KEY: string;

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const sandbox = getSandbox(env.Sandbox, "data-processor");


    // Credentials automatically detected from environment

    await sandbox.mountBucket("my-r2-bucket", "/data", {

      endpoint: "https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com",

    });


    // Access mounted bucket using standard file operations

    await sandbox.exec("python", { args: ["process.py", "/data/input.csv"] });


    return Response.json({ success: true });

  },

};


```

The SDK automatically detects `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` from your Worker's environment when you call `mountBucket()` without explicit credentials.

**Pass credentials explicitly** (if using custom secret names):

TypeScript

```

await sandbox.mountBucket("my-r2-bucket", "/data", {

  endpoint: "https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com",

  credentials: {

    accessKeyId: env.R2_ACCESS_KEY_ID,

    secretAccessKey: env.R2_SECRET_ACCESS_KEY,

  },

});


```

AWS nomenclature for R2

The SDK uses AWS-style credential names (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`) because bucket mounting is powered by **s3fs-fuse**, which expects S3-compatible credentials. R2's API tokens work with this format since R2 implements the S3 API.

See [Mount buckets guide](https://developers.cloudflare.com/sandbox/guides/mount-buckets/) for complete bucket mounting documentation.

## Environment variable precedence

When the same variable is set at multiple levels, the most specific level takes precedence:

1. **Command-level** (highest) - Passed to `exec()` or `startProcess()` options
2. **Sandbox or session-level** \- Set with `setEnvVars()`
3. **Container default** \- Built into the Docker image with `ENV`
4. **System default** (lowest) - Operating system defaults

Example:

TypeScript

```

// In Dockerfile: ENV NODE_ENV=development


// Sandbox-level

await sandbox.setEnvVars({ NODE_ENV: "staging" });


// Command-level overrides all

await sandbox.exec("node app.js", {

  env: { NODE_ENV: "production" }, // This wins

});


```

## Related resources

* [Transport modes](https://developers.cloudflare.com/sandbox/configuration/transport/) \- Configure HTTP vs WebSocket transport
* [Wrangler configuration](https://developers.cloudflare.com/sandbox/configuration/wrangler/) \- Setting Worker-level environment
* [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/) \- Managing sensitive data
* [Sessions API](https://developers.cloudflare.com/sandbox/api/sessions/) \- Session-level environment variables
* [Security model](https://developers.cloudflare.com/sandbox/concepts/security/) \- Understanding data isolation
* [Proxy requests to external APIs](https://developers.cloudflare.com/sandbox/guides/proxy-requests/) \- Keep credentials out of the sandbox entirely using a Worker proxy

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/configuration/environment-variables/#page","headline":"Environment variables · Cloudflare Sandbox SDK docs","description":"Pass configuration, secrets, and runtime settings to Sandbox SDK containers using environment variables.","url":"https://developers.cloudflare.com/sandbox/configuration/environment-variables/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/configuration/environment-variables/","name":"Environment variables"}}]}
```
