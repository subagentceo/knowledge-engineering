---
title: Run background processes
description: Start and manage long-running services and applications.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Run background processes

This guide shows you how to start, monitor, and manage long-running background processes in the sandbox.

## When to use background processes

Use `startProcess()` instead of `exec()` when:

* **Running web servers** \- HTTP servers, APIs, WebSocket servers
* **Long-running services** \- Database servers, caches, message queues
* **Development servers** \- Hot-reloading dev servers, watch modes
* **Continuous monitoring** \- Log watchers, health checkers
* **Parallel execution** \- Multiple services running simultaneously

Note

For **one-time commands, builds, or scripts that complete and exit**, use `exec()` instead. See the [Execute commands guide](https://developers.cloudflare.com/sandbox/guides/execute-commands/).

## Start a background process

* [  JavaScript ](#tab-panel-10249)
* [  TypeScript ](#tab-panel-10250)

JavaScript

```

import { getSandbox } from "@cloudflare/sandbox";


const sandbox = getSandbox(env.Sandbox, "my-sandbox");


// Start a web server

const server = await sandbox.startProcess("python -m http.server 8000");


console.log("Server started");

console.log("Process ID:", server.id);

console.log("PID:", server.pid);

console.log("Status:", server.status); // 'running'


// Process runs in background - your code continues


```

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';


const sandbox = getSandbox(env.Sandbox, 'my-sandbox');


// Start a web server

const server = await sandbox.startProcess('python -m http.server 8000');


console.log('Server started');

console.log('Process ID:', server.id);

console.log('PID:', server.pid);

console.log('Status:', server.status); // 'running'


// Process runs in background - your code continues


```

## Configure process environment

Set working directory and environment variables:

* [  JavaScript ](#tab-panel-10251)
* [  TypeScript ](#tab-panel-10252)

JavaScript

```

const process = await sandbox.startProcess("node server.js", {

  cwd: "/workspace/api",

  env: {

    NODE_ENV: "production",

    PORT: "8080",

    API_KEY: env.API_KEY,

    DATABASE_URL: env.DATABASE_URL,

  },

});


console.log("API server started");


```

TypeScript

```

const process = await sandbox.startProcess('node server.js', {

  cwd: '/workspace/api',

  env: {

    NODE_ENV: 'production',

    PORT: '8080',

    API_KEY: env.API_KEY,

    DATABASE_URL: env.DATABASE_URL

  }

});


console.log('API server started');


```

## Monitor process status

List and check running processes:

* [  JavaScript ](#tab-panel-10257)
* [  TypeScript ](#tab-panel-10258)

JavaScript

```

const processes = await sandbox.listProcesses();


console.log(`Running ${processes.length} processes:`);


for (const proc of processes) {

  console.log(`${proc.id}: ${proc.command} (${proc.status})`);

}


// Check if specific process is running

const isRunning = processes.some(

  (p) => p.id === processId && p.status === "running",

);


```

TypeScript

```

const processes = await sandbox.listProcesses();


console.log(`Running ${processes.length} processes:`);


for (const proc of processes) {

  console.log(`${proc.id}: ${proc.command} (${proc.status})`);

}


// Check if specific process is running

const isRunning = processes.some(p => p.id === processId && p.status === 'running');


```

## Wait for process readiness

Wait for a process to be ready before proceeding:

* [  JavaScript ](#tab-panel-10247)
* [  TypeScript ](#tab-panel-10248)

JavaScript

```

const server = await sandbox.startProcess("node server.js");


// Wait for server to respond on port 3000

await server.waitForPort(3000);


console.log("Server is ready");


```

TypeScript

```

const server = await sandbox.startProcess('node server.js');


// Wait for server to respond on port 3000

await server.waitForPort(3000);


console.log('Server is ready');


```

Or wait for specific log patterns:

* [  JavaScript ](#tab-panel-10253)
* [  TypeScript ](#tab-panel-10254)

JavaScript

```

const server = await sandbox.startProcess("node server.js");


// Wait for log message

const result = await server.waitForLog("Server listening");

console.log("Server is ready:", result.line);


```

TypeScript

```

const server = await sandbox.startProcess('node server.js');


// Wait for log message

const result = await server.waitForLog('Server listening');

console.log('Server is ready:', result.line);


```

## Monitor process logs

Stream logs in real-time:

* [  JavaScript ](#tab-panel-10259)
* [  TypeScript ](#tab-panel-10260)

JavaScript

```

import { parseSSEStream } from "@cloudflare/sandbox";


const server = await sandbox.startProcess("node server.js");


// Stream logs

const logStream = await sandbox.streamProcessLogs(server.id);


for await (const log of parseSSEStream(logStream)) {

  console.log(log.data);

}


```

TypeScript

```

import { parseSSEStream, type LogEvent } from '@cloudflare/sandbox';


const server = await sandbox.startProcess('node server.js');


// Stream logs

const logStream = await sandbox.streamProcessLogs(server.id);


for await (const log of parseSSEStream<LogEvent>(logStream)) {

  console.log(log.data);

}


```

Or get accumulated logs:

* [  JavaScript ](#tab-panel-10255)
* [  TypeScript ](#tab-panel-10256)

JavaScript

```

const logs = await sandbox.getProcessLogs(server.id);

console.log("Logs:", logs);


```

TypeScript

```

const logs = await sandbox.getProcessLogs(server.id);

console.log('Logs:', logs);


```

## Stop processes

Stop background processes and their children:

* [  JavaScript ](#tab-panel-10261)
* [  TypeScript ](#tab-panel-10262)

JavaScript

```

// Stop specific process (terminates entire process tree)

await sandbox.killProcess(server.id);


// Force kill if needed

await sandbox.killProcess(server.id, "SIGKILL");


// Stop all processes

await sandbox.killAllProcesses();


```

TypeScript

```

// Stop specific process (terminates entire process tree)

await sandbox.killProcess(server.id);


// Force kill if needed

await sandbox.killProcess(server.id, 'SIGKILL');


// Stop all processes

await sandbox.killAllProcesses();


```

`killProcess()` terminates the specified process and all child processes it spawned. This ensures that processes running in the background do not leave orphaned child processes when terminated.

For example, if your process spawns multiple worker processes or background tasks, `killProcess()` will clean up the entire process tree:

* [  JavaScript ](#tab-panel-10263)
* [  TypeScript ](#tab-panel-10264)

JavaScript

```

// This script spawns multiple child processes

const batch = await sandbox.startProcess(

  'bash -c "process1 & process2 & process3 & wait"',

);


// killProcess() terminates the bash process AND all three child processes

await sandbox.killProcess(batch.id);


```

TypeScript

```

// This script spawns multiple child processes

const batch = await sandbox.startProcess(

  'bash -c "process1 & process2 & process3 & wait"'

);


// killProcess() terminates the bash process AND all three child processes

await sandbox.killProcess(batch.id);


```

## Run multiple processes

Start services in sequence, waiting for dependencies:

* [  JavaScript ](#tab-panel-10269)
* [  TypeScript ](#tab-panel-10270)

JavaScript

```

// Start database first

const db = await sandbox.startProcess("redis-server");


// Wait for database to be ready

await db.waitForPort(6379, { mode: "tcp" });


// Now start API server (depends on database)

const api = await sandbox.startProcess("node api-server.js", {

  env: { DATABASE_URL: "redis://localhost:6379" },

});


// Wait for API to be ready

await api.waitForPort(8080, { path: "/health" });


console.log("All services running");


```

TypeScript

```

// Start database first

const db = await sandbox.startProcess('redis-server');


// Wait for database to be ready

await db.waitForPort(6379, { mode: 'tcp' });


// Now start API server (depends on database)

const api = await sandbox.startProcess('node api-server.js', {

  env: { DATABASE_URL: 'redis://localhost:6379' }

});


// Wait for API to be ready

await api.waitForPort(8080, { path: '/health' });


console.log('All services running');


```

## Keep containers alive for long-running processes

By default, containers automatically shut down after 10 minutes of inactivity. For long-running processes that may have idle periods (like CI/CD pipelines, batch jobs, or monitoring tasks), use the [keepAlive option](https://developers.cloudflare.com/sandbox/configuration/sandbox-options/#keepalive):

* [  JavaScript ](#tab-panel-10271)
* [  TypeScript ](#tab-panel-10272)

JavaScript

```

import { getSandbox, parseSSEStream } from "@cloudflare/sandbox";


export { Sandbox } from "@cloudflare/sandbox";


export default {

  async fetch(request, env) {

    // Enable keepAlive for long-running processes

    const sandbox = getSandbox(env.Sandbox, "build-job-123", {

      keepAlive: true,

    });


    try {

      // Start a long-running build process

      const build = await sandbox.startProcess("npm run build:production");


      // Monitor progress

      const logs = await sandbox.streamProcessLogs(build.id);


      // Process can run indefinitely without container shutdown

      for await (const log of parseSSEStream(logs)) {

        console.log(log.data);

        if (log.data.includes("Build complete")) {

          break;

        }

      }


      return new Response("Build completed");

    } finally {

      // Important: Must explicitly destroy when done

      await sandbox.destroy();

    }

  },

};


```

TypeScript

```

import { getSandbox, parseSSEStream, type LogEvent } from '@cloudflare/sandbox';


export { Sandbox } from '@cloudflare/sandbox';


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    // Enable keepAlive for long-running processes

    const sandbox = getSandbox(env.Sandbox, 'build-job-123', {

      keepAlive: true

    });


    try {

      // Start a long-running build process

      const build = await sandbox.startProcess('npm run build:production');


      // Monitor progress

      const logs = await sandbox.streamProcessLogs(build.id);


      // Process can run indefinitely without container shutdown

      for await (const log of parseSSEStream<LogEvent>(logs)) {

        console.log(log.data);

        if (log.data.includes('Build complete')) {

          break;

        }

      }


      return new Response('Build completed');

    } finally {

      // Important: Must explicitly destroy when done

      await sandbox.destroy();

    }

  }

};


```

Always destroy with keepAlive

When using `keepAlive: true`, containers will not automatically timeout. You **must** call `sandbox.destroy()` when finished to prevent containers running indefinitely and counting toward your account limits.

## Best practices

* **Wait for readiness** \- Use `waitForPort()` or `waitForLog()` to detect when services are ready
* **Clean up** \- Always stop processes when done
* **Handle failures** \- Monitor logs for errors and restart if needed
* **Use try/finally** \- Ensure cleanup happens even on errors
* **Use `keepAlive` for long-running tasks** \- Prevent container shutdown during processes with idle periods

## Troubleshooting

### Process exits immediately

Check logs to see why:

* [  JavaScript ](#tab-panel-10267)
* [  TypeScript ](#tab-panel-10268)

JavaScript

```

const process = await sandbox.startProcess("node server.js");

await new Promise((resolve) => setTimeout(resolve, 1000));


const processes = await sandbox.listProcesses();

if (!processes.find((p) => p.id === process.id)) {

  const logs = await sandbox.getProcessLogs(process.id);

  console.error("Process exited:", logs);

}


```

TypeScript

```

const process = await sandbox.startProcess('node server.js');

await new Promise(resolve => setTimeout(resolve, 1000));


const processes = await sandbox.listProcesses();

if (!processes.find(p => p.id === process.id)) {

  const logs = await sandbox.getProcessLogs(process.id);

  console.error('Process exited:', logs);

}


```

### Port already in use

Kill existing processes before starting:

* [  JavaScript ](#tab-panel-10265)
* [  TypeScript ](#tab-panel-10266)

JavaScript

```

await sandbox.killAllProcesses();

const server = await sandbox.startProcess("node server.js");


```

TypeScript

```

await sandbox.killAllProcesses();

const server = await sandbox.startProcess('node server.js');


```

## Related resources

* [Commands API reference](https://developers.cloudflare.com/sandbox/api/commands/) \- Complete process management API
* [Sandbox options configuration](https://developers.cloudflare.com/sandbox/configuration/sandbox-options/) \- Configure `keepAlive` and other options
* [Lifecycle API](https://developers.cloudflare.com/sandbox/api/lifecycle/) \- Create and manage sandboxes
* [Sessions API reference](https://developers.cloudflare.com/sandbox/api/sessions/) \- Create isolated execution contexts
* [Execute commands guide](https://developers.cloudflare.com/sandbox/guides/execute-commands/) \- One-time command execution
* [Expose services guide](https://developers.cloudflare.com/sandbox/guides/expose-services/) \- Make processes accessible
* [Streaming output guide](https://developers.cloudflare.com/sandbox/guides/streaming-output/) \- Monitor process output

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/background-processes/#page","headline":"Run background processes · Cloudflare Sandbox SDK docs","description":"Start and manage long-running services and applications.","url":"https://developers.cloudflare.com/sandbox/guides/background-processes/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}},{"@type":"ListItem","position":3,"item":{"@id":"/sandbox/guides/","name":"How-to guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/sandbox/guides/background-processes/","name":"Run background processes"}}]}
```
