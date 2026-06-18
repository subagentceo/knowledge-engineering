---
title: Container Interface
description: API reference for the Container interface and utility functions
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Container Interface

The [Container class ↗](https://github.com/cloudflare/containers) from [@cloudflare/containers ↗](https://www.npmjs.com/package/@cloudflare/containers) is the most common way to interact with container instances from a Worker.

**`Container` extends [DurableObject](https://developers.cloudflare.com/durable-objects/api/base/).** The Durable Object manages routing, persistent state, and lifecycle hooks, while the container process runs your image inside a Linux VM. Because your subclass is a Durable Object, you have access to the full Durable Object API — including [this.ctx.storage](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/) for persistent SQLite-backed storage and [this.ctx.id](https://developers.cloudflare.com/durable-objects/api/id/) for the unique instance identifier. Use Durable Object storage to persist state that should survive container restarts, such as configuration, user data, or task results.

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/containers
```

```
yarn add @cloudflare/containers
```

```
pnpm add @cloudflare/containers
```

```
bun add @cloudflare/containers
```

Then, define a class that extends `Container` and set the shared properties on the class:

* [  JavaScript ](#tab-panel-7800)
* [  TypeScript ](#tab-panel-7801)

JavaScript

```

import { Container, getContainer } from "@cloudflare/containers";


export class SandboxContainer extends Container {

  defaultPort = 8080;

  requiredPorts = [8080, 9222];

  sleepAfter = "5m";

  envVars = {

    NODE_ENV: "production",

    LOG_LEVEL: "info",

  };

  entrypoint = ["npm", "run", "start"];

  enableInternet = false;

  pingEndpoint = "localhost/ready";

}


export default {

  async fetch(request, env) {

    return getContainer(env.SANDBOX_CONTAINER, "workspace-123").fetch(request);

  },

};


```

TypeScript

```

import { Container, getContainer } from "@cloudflare/containers";


export class SandboxContainer extends Container {

  defaultPort = 8080;

  requiredPorts = [8080, 9222];

  sleepAfter = "5m";

  envVars = {

    NODE_ENV: "production",

    LOG_LEVEL: "info",

  };

  entrypoint = ["npm", "run", "start"];

  enableInternet = false;

  pingEndpoint = "localhost/ready";

}


export default {

  async fetch(request: Request, env) {

    return getContainer(env.SANDBOX_CONTAINER, "workspace-123").fetch(request);

  },

};


```

The `Container` class extends `DurableObject`, so all [Durable Object](https://developers.cloudflare.com/durable-objects/) functionality is available — including [SQLite storage](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/), [alarms](https://developers.cloudflare.com/durable-objects/api/alarms/), and [RPC methods](https://developers.cloudflare.com/durable-objects/api/base/#rpc-methods). Container disk is ephemeral by default, but Durable Object storage persists across container restarts.

* [  JavaScript ](#tab-panel-7798)
* [  TypeScript ](#tab-panel-7799)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


  async runAndPersist() {

    const res = await this.fetch("/run-task");

    const body = await res.text();

    await this.ctx.storage.sql.exec(

      "INSERT OR REPLACE INTO results (value) VALUES (?)",

      body,

    );

    return body;

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


  async runAndPersist() {

    const res = await this.fetch("/run-task");

    const body = await res.text();

    await this.ctx.storage.sql.exec(

      "INSERT OR REPLACE INTO results (value) VALUES (?)",

      body,

    );

    return body;

  }

}


```

## Properties

Configure these as class fields on your subclass. They apply to every instance of the container.

* **`defaultPort`** (`number`, optional) — the port your container process listens on. [fetch()](#fetch) and[containerFetch()](#containerfetch) forward requests here unless you specify a different port via [switchPort()](#switchport) or the `port` argument to[containerFetch()](#containerfetch). Most subclasses set this.
* **`requiredPorts`** (`number[]`, optional) — ports that must be accepting connections before the container is considered ready. Used by [startAndWaitForPorts()](#startandwaitforports) when no`ports` argument is passed. Set this when your container runs multiple services that all need to be healthy before serving traffic.
* **`sleepAfter`** (`string | number`, default:`"10m"`) — how long to keep the container alive without activity before shutting it down. Accepts a number of seconds or a duration string such as`"30s"`, `"5m"`, or `"1h"`. Activity resets the timer — see[renewActivityTimeout()](#renewactivitytimeout) for manual resets.
* **`envVars`** (`Record<string, string>`, default: `{}`) — environment variables passed to the container on every start. For per-instance variables, pass `envVars` through [startAndWaitForPorts()](#startandwaitforports) instead.
* **`entrypoint`** (`string[]`, optional) — overrides the image's default entrypoint. Useful when you want to run a different command without rebuilding the image, such as a dev server or a one-off task.
* **`enableInternet`** (`boolean`, default:`true`) — controls whether the container can make outbound HTTP requests. Set to `false` for sandboxed environments where you want to intercept or block all outbound traffic. For more information, refer to [Handle outbound traffic](https://developers.cloudflare.com/containers/platform-details/outbound-traffic/).
* **`pingEndpoint`** (`string`, default:`"ping"`) — the host and path the class uses to health-check the container during startup. Most users do not need to change this.

## Lifecycle hooks

Override these methods to run Worker code when the container changes state. Refer to the [status hooks example](https://developers.cloudflare.com/containers/examples/status-hooks/) for a full example.

### `onStart`

Run Worker code after the container has started.

TypeScript

```

onStart(): void | Promise<void>


```

**Returns**: `void | Promise<void>`. Resolve after any startup logic finishes.

Use this to log startup, seed data, or schedule recurring tasks with [schedule()](#schedule).

* [  JavaScript ](#tab-panel-7794)
* [  TypeScript ](#tab-panel-7795)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


  async onStart() {

    await this.containerFetch("http://localhost/bootstrap", {

      method: "POST",

    });

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


    override async onStart() {

      await this.containerFetch("http://localhost/bootstrap", {

        method: "POST",

      });

    }


}


```

### `onStop`

Run Worker code after the container process exits.

TypeScript

```

onStop(params: StopParams): void | Promise<void>


```

**Parameters**:

* `params.exitCode` \- Container process exit code.
* `params.reason` \- Why the container stopped: `'exit'` when the process exited on its own, or `'runtime_signal'` when the runtime signalled it.

**Returns**: `void | Promise<void>`. Resolve after your shutdown logic finishes.

Use this to log, alert, or restart the container.

* [  JavaScript ](#tab-panel-7792)
* [  TypeScript ](#tab-panel-7793)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  onStop({ exitCode, reason }) {

    console.log("Container stopped", { exitCode, reason });

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  override onStop({ exitCode, reason }) {

    console.log("Container stopped", { exitCode, reason });

  }

}


```

### `onError`

Handle startup and port-checking errors.

TypeScript

```

onError(error: unknown): any


```

**Parameters**:

* `error` \- The error thrown during startup or port checks.

**Returns**: `any`. The default implementation logs the error and re-throws it.

Override this to suppress errors, notify an external service, or attempt a restart.

* [  JavaScript ](#tab-panel-7796)
* [  TypeScript ](#tab-panel-7797)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  onError(error) {

    console.error("Container failed to start", error);

    throw error;

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  override onError(error: unknown) {

    console.error("Container failed to start", error);

    throw error;

  }

}


```

### `onActivityExpired`

Run Worker code when the [sleepAfter](#sleepafter) timer expires.

TypeScript

```

onActivityExpired(): Promise<void>


```

**Returns**: `Promise<void>`. Resolve after your idle-time logic finishes.

Called when the [sleepAfter](#sleepafter) timeout expires with no incoming requests. The default implementation calls [stop()](#stop).

Warning

If you override `onActivityExpired()`, call [await this.stop()](#stop) or [await this.destroy()](#destroy). Otherwise, the container does not go to sleep.

If you override this method without stopping the container, the timer renews and the hook fires again on the next expiry.

* [  JavaScript ](#tab-panel-7802)
* [  TypeScript ](#tab-panel-7803)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  sleepAfter = "2m";


  async onActivityExpired() {

    const state = await this.getState();

    console.log("Container is idle, stopping it now", state.status);


    await this.stop();

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  sleepAfter = "2m";


    override async onActivityExpired() {

      const state = await this.getState();

      console.log("Container is idle, stopping it now", state.status);


      await this.stop();

    }


}


```

## Request methods

### `fetch`

Handle incoming HTTP or WebSocket requests.

TypeScript

```

fetch(request: Request): Promise<Response>


```

**Parameters**:

* `request` \- The incoming request to proxy to the container.

**Returns**: `Promise<Response>` from the container or from your custom routing logic.

By default, `fetch` forwards the request to the container process at [defaultPort](#defaultport). The container is started automatically if it is not already running.

Override `fetch` when you need routing logic, authentication, or other middleware before forwarding to the container. Inside the override, call [this.containerFetch()](#containerfetch) rather than `this.fetch()` to avoid infinite recursion:

* [  JavaScript ](#tab-panel-7804)
* [  TypeScript ](#tab-panel-7805)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


  async fetch(request) {

    const url = new URL(request.url);


    if (url.pathname === "/health") {

      return new Response("ok");

    }


    return this.containerFetch(request);

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


    override async fetch(request: Request): Promise<Response> {

      const url = new URL(request.url);


      if (url.pathname === "/health") {

        return new Response("ok");

      }


      return this.containerFetch(request);

    }


}


```

`fetch` is the only method that supports WebSocket proxying. Refer to the [WebSocket example](https://developers.cloudflare.com/containers/examples/websocket/) for a full example.

### `containerFetch`

Send an HTTP request directly to the container process. Generally, users should prefer to use [fetch](#fetch) unless it has been overridden.

TypeScript

```

containerFetch(request: Request, port?: number): Promise<Response>

containerFetch(url: string | URL, init?: RequestInit, port?: number): Promise<Response>


```

**Parameters**:

* `request` \- Existing `Request` object to forward.
* `url` \- URL to request when you are constructing a new request.
* `init` \- Standard `RequestInit` options for the URL-based overload.
* `port` \- Optional target port. If omitted, the class uses [defaultPort](#defaultport).

**Returns**: `Promise<Response>` from the container.

This is what the default [fetch()](#fetch) implementation calls internally, and it is what you should call from within an overridden [fetch()](#fetch) method to avoid infinite recursion. It also accepts a standard fetch-style signature with a URL string and `RequestInit`, which is useful when you are constructing a new request rather than forwarding an existing one.

Does not support WebSockets. Use [fetch()](#fetch) with [switchPort()](#switchport) for those.

* [  JavaScript ](#tab-panel-7814)
* [  TypeScript ](#tab-panel-7815)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


  async fetch(request) {

    const url = new URL(request.url);


    if (url.pathname === "/metrics") {

      return this.containerFetch(

        "http://localhost/internal/metrics",

        {

          headers: {

            authorization: request.headers.get("authorization") ?? "",

          },

        },

        9090,

      );

    }


    return this.containerFetch(request);

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


    override async fetch(request: Request): Promise<Response> {

      const url = new URL(request.url);


      if (url.pathname === "/metrics") {

        return this.containerFetch(

          "http://localhost/internal/metrics",

          {

            headers: {

              authorization: request.headers.get("authorization") ?? "",

            },

          },

          9090,

        );

      }


      return this.containerFetch(request);

    }


}


```

## Start and stop

In most cases you do not need to call these methods directly. [fetch()](#fetch) and [containerFetch()](#containerfetch) start the container automatically. Call these explicitly when you need to pre-warm a container, run a task on a schedule, or control the lifecycle from within a lifecycle hook.

### `startAndWaitForPorts`

Start the container and wait until the target ports are accepting connections.

TypeScript

```

startAndWaitForPorts(args?: StartAndWaitForPortsOptions): Promise<void>

startAndWaitForPorts(

  ports?: number | number[],

  cancellationOptions?: CancellationOptions,

  startOptions?: ContainerStartConfigOptions,

): Promise<void>


```

**Parameters**:

* `args.ports` \- Port or ports to wait for. Port resolution order is explicit `ports`, then [requiredPorts](#requiredports), then [defaultPort](#defaultport).
* `args.startOptions` \- Per-instance startup overrides.
* `args.startOptions.envVars` \- Per-instance environment variables.
* `args.startOptions.entrypoint` \- Entrypoint override for this start only.
* `args.startOptions.enableInternet` \- Whether outbound internet access is allowed for this start.
* `args.cancellationOptions.abort` \- Abort signal to cancel startup.
* `args.cancellationOptions.instanceGetTimeoutMS` \- Maximum time to get a container instance and issue the start command. Default: `8000`.
* `args.cancellationOptions.portReadyTimeoutMS` \- Maximum time to wait for all ports to become ready. Default: `20000`.
* `args.cancellationOptions.waitInterval` \- Polling interval in milliseconds. Default: `300`.

**Returns**: `Promise<void>`. Resolves after the target ports are ready and [onStart()](#onstart) has run.

This is the safest way to explicitly start a container when you need to be certain it is ready before sending traffic.

This method also supports positional `ports`, `cancellationOptions`, and `startOptions` arguments, but the object form is easier to read.

* [  JavaScript ](#tab-panel-7810)
* [  TypeScript ](#tab-panel-7811)

JavaScript

```

import { getContainer } from "@cloudflare/containers";


export default {

  async scheduled(_event, env) {

    const container = getContainer(env.API_CONTAINER, "tenant-42");


    await container.startAndWaitForPorts({

      ports: [8080, 9222],

      startOptions: {

        envVars: {

          API_KEY: env.API_KEY,

          TENANT_ID: "tenant-42",

        },

      },

      cancellationOptions: {

        portReadyTimeoutMS: 30_000,

      },

    });

  },

};


```

TypeScript

```

import { getContainer } from "@cloudflare/containers";


export default {

  async scheduled(_event, env) {

    const container = getContainer(env.API_CONTAINER, "tenant-42");


      await container.startAndWaitForPorts({

        ports: [8080, 9222],

        startOptions: {

          envVars: {

            API_KEY: env.API_KEY,

            TENANT_ID: "tenant-42",

          },

        },

        cancellationOptions: {

          portReadyTimeoutMS: 30_000,

        },

      });

    },


};


```

Refer to the [env vars and secrets example](https://developers.cloudflare.com/containers/examples/env-vars-and-secrets/) for a full example.

### `start`

Start the container without waiting for all ports to become ready.

TypeScript

```

start(startOptions?: ContainerStartConfigOptions, waitOptions?: WaitOptions): Promise<void>


```

**Parameters**:

* `startOptions` \- Per-instance startup overrides.
* `startOptions.envVars` \- Per-instance environment variables.
* `startOptions.entrypoint` \- Entrypoint override for this start only.
* `startOptions.enableInternet` \- Whether outbound internet access is allowed for this start.
* `waitOptions.portToCheck` \- Port to probe while starting. If omitted, the class uses [defaultPort](#defaultport), the first [requiredPorts](#requiredports) entry, or a fallback port.
* `waitOptions.signal` \- Abort signal to cancel startup.
* `waitOptions.retries` \- Maximum number of start attempts before the method throws.
* `waitOptions.waitInterval` \- Polling interval in milliseconds between retries.

**Returns**: `Promise<void>`. Resolves after the start attempt succeeds and [onStart()](#onstart) has run.

Use this when the container does not expose ports, such as a batch job or a cron task, or when you want to manage readiness yourself with [waitForPort()](#waitforport). If you need to wait for all ports to be ready, use [startAndWaitForPorts()](#startandwaitforports) instead.

* [  JavaScript ](#tab-panel-7806)
* [  TypeScript ](#tab-panel-7807)

JavaScript

```

import { getContainer } from "@cloudflare/containers";


export default {

  async scheduled(_event, env) {

    const container = getContainer(env.JOB_CONTAINER, "nightly-report");


    await container.start({

      entrypoint: ["node", "scripts/nightly-report.js"],

      envVars: {

        REPORT_DATE: new Date().toISOString(),

      },

      enableInternet: false,

    });

  },

};


```

TypeScript

```

import { getContainer } from "@cloudflare/containers";


export default {

  async scheduled(_event, env) {

    const container = getContainer(env.JOB_CONTAINER, "nightly-report");


      await container.start({

        entrypoint: ["node", "scripts/nightly-report.js"],

        envVars: {

          REPORT_DATE: new Date().toISOString(),

        },

        enableInternet: false,

      });

    },


};


```

Refer to the [cron example](https://developers.cloudflare.com/containers/examples/cron/) for a full example.

### `waitForPort`

Poll a single port until it accepts connections.

TypeScript

```

waitForPort(waitOptions: WaitOptions): Promise<number>


```

**Parameters**:

* `waitOptions.portToCheck` \- Port number to check.
* `waitOptions.signal` \- Abort signal to cancel waiting.
* `waitOptions.retries` \- Maximum number of retries before the method throws.
* `waitOptions.waitInterval` \- Polling interval in milliseconds.

**Returns**: `Promise<number>`. The numeric return value is mainly useful when you are coordinating custom readiness logic across multiple waits.

Throws if the port does not become available within the retry limit. Use this after [start()](#start) when you need to check multiple ports independently or in a specific sequence.

* [  JavaScript ](#tab-panel-7808)
* [  TypeScript ](#tab-panel-7809)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  async warmInspector() {

    await this.start();


    const retryCount = await this.waitForPort({

      portToCheck: 9222,

      retries: 20,

      waitInterval: 500,

    });


    console.log("Inspector port became ready:", retryCount);

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  async warmInspector() {

    await this.start();


      const retryCount = await this.waitForPort({

        portToCheck: 9222,

        retries: 20,

        waitInterval: 500,

      });


      console.log("Inspector port became ready:", retryCount);

    }


}


```

### `stop`

Send a signal to the container process.

TypeScript

```

stop(signal?: 'SIGTERM' | 'SIGINT' | 'SIGKILL' | number): Promise<void>


```

**Parameters**:

* `signal` \- Signal to send. Defaults to `'SIGTERM'`.

**Returns**: `Promise<void>`. Resolves after the signal is sent and pending stop handling has completed.

Defaults to `SIGTERM`, which gives the process a chance to shut down gracefully. Triggers [onStop()](#onstop).

* [  JavaScript ](#tab-panel-7812)
* [  TypeScript ](#tab-panel-7813)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


  async fetch(request) {

    if (new URL(request.url).pathname === "/admin/stop") {

      await this.stop();

      return new Response("Container is stopping");

    }


    return this.containerFetch(request);

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


    override async fetch(request: Request): Promise<Response> {

      if (new URL(request.url).pathname === "/admin/stop") {

        await this.stop();

        return new Response("Container is stopping");

      }


      return this.containerFetch(request);

    }


}


```

### `destroy`

Immediately kill the container process.

TypeScript

```

destroy(): Promise<void>


```

**Returns**: `Promise<void>`. Resolves after the runtime has destroyed the container.

This sends `SIGKILL`. Use it when you need the container gone immediately and cannot wait for a graceful shutdown. Triggers [onStop()](#onstop).

* [  JavaScript ](#tab-panel-7816)
* [  TypeScript ](#tab-panel-7817)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


  async fetch(request) {

    if (new URL(request.url).pathname === "/admin/destroy") {

      await this.destroy();

      return new Response("Container destroyed");

    }


    return this.containerFetch(request);

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


    override async fetch(request: Request): Promise<Response> {

      if (new URL(request.url).pathname === "/admin/destroy") {

        await this.destroy();

        return new Response("Container destroyed");

      }


      return this.containerFetch(request);

    }


}


```

## State and monitoring

### `getState`

Read the current container state.

TypeScript

```

getState(): Promise<State>


```

**Returns**: `Promise<State>` with:

* `status` \- One of `'running'`, `'healthy'`, `'stopping'`, `'stopped'`, or `'stopped_with_code'`.
* `lastChange` \- Unix timestamp in milliseconds for the last state change.
* `exitCode` \- Optional exit code when `status` is `'stopped_with_code'`.

`running` means the container is starting and has not yet passed its health check. `healthy` means it is up and accepting requests.

* [  JavaScript ](#tab-panel-7818)
* [  TypeScript ](#tab-panel-7819)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  async logState() {

    const state = await this.getState();


    if (state.status === "stopped_with_code") {

      console.error("Container exited with code", state.exitCode);

      return;

    }


    console.log("Container status:", state.status);

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  async logState() {

    const state = await this.getState();


      if (state.status === "stopped_with_code") {

        console.error("Container exited with code", state.exitCode);

        return;

      }


      console.log("Container status:", state.status);

    }


}


```

### `renewActivityTimeout`

Reset the [sleepAfter](#sleepafter) timer.

TypeScript

```

renewActivityTimeout(): void


```

**Returns**: `void`.

Incoming requests reset the timer automatically. Call this manually from background work, such as a scheduled task or a long-running operation, that should count as activity and prevent the container from sleeping.

* [  JavaScript ](#tab-panel-7822)
* [  TypeScript ](#tab-panel-7823)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


  async processJobs(jobIds) {

    for (const jobId of jobIds) {

      this.renewActivityTimeout();


      await this.containerFetch(`http://localhost/jobs/${jobId}`, {

        method: "POST",

      });

    }

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


    async processJobs(jobIds: string[]) {

      for (const jobId of jobIds) {

        this.renewActivityTimeout();


        await this.containerFetch(`http://localhost/jobs/${jobId}`, {

          method: "POST",

        });

      }

    }


}


```

## Scheduling

### `schedule`

Schedule a method on the class to run later.

TypeScript

```

schedule<T>(when: Date | number, callback: string, payload?: T): Promise<Schedule<T>>


```

**Parameters**:

* `when` \- Either a `Date` for a specific time or a number of seconds to delay.
* `callback` \- Name of the class method to call.
* `payload` \- Optional data passed to the callback method.

**Returns**: `Promise<Schedule<T>>` with:

* `taskId` \- Unique schedule ID.
* `callback` \- Method name that will be called.
* `payload` \- Payload that will be passed to the callback.
* `type` \- `'scheduled'` for an absolute time or `'delayed'` for a relative delay.
* `time` \- Unix timestamp in seconds when the task will run.
* `delayInSeconds` \- Delay in seconds when `type` is `'delayed'`.

Do not override [alarm() ↗](https://developers.cloudflare.com/durable-objects/api/alarms/) directly. The `Container` class uses the alarm handler to manage the container lifecycle, so use [schedule()](#schedule) instead.

The following example schedules a recurring health report starting at container startup:

* [  JavaScript ](#tab-panel-7826)
* [  TypeScript ](#tab-panel-7827)

JavaScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


  async onStart() {

    await this.schedule(60, "healthReport");

  }


  async healthReport() {

    const state = await this.getState();

    console.log("Container status:", state.status);

    await this.schedule(60, "healthReport");

  }

}


```

TypeScript

```

import { Container } from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;


    override async onStart() {

      await this.schedule(60, "healthReport");

    }


    async healthReport() {

      const state = await this.getState();

      console.log("Container status:", state.status);

      await this.schedule(60, "healthReport");

    }


}


```

## Outbound interception

Outbound interception lets you intercept, mock, or block HTTP requests that the container makes to external hosts. This is useful for sandboxing, testing, or proxying outbound traffic through Worker code.

* [  JavaScript ](#tab-panel-7830)
* [  TypeScript ](#tab-panel-7831)

JavaScript

```

import {

  Container,

  ContainerProxy,

  getContainer,

} from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;

  enableInternet = true;


  static outboundByHost = {

    "blocked.example.com": () => {

      return new Response("Blocked", { status: 403 });

    },

  };


  static outbound = async (request, _env, ctx) => {

    console.log(`[${ctx.containerId}] outbound:`, request.url);

    return fetch(request);

  };

}


export { ContainerProxy };


export default {

  async fetch(request, env) {

    return getContainer(env.MY_CONTAINER).fetch(request);

  },

};


```

TypeScript

```

import {

  Container,

  ContainerProxy,

  getContainer,

} from "@cloudflare/containers";


export class MyContainer extends Container {

  defaultPort = 8080;

  enableInternet = true;


    static outboundByHost = {

      "blocked.example.com": () => {

        return new Response("Blocked", { status: 403 });

      },

    };


    static outbound = async (request, _env, ctx) => {

      console.log(`[${ctx.containerId}] outbound:`, request.url);

      return fetch(request);

    };


}


export { ContainerProxy };


export default {

  async fetch(request: Request, env) {

    return getContainer(env.MY_CONTAINER).fetch(request);

  },

};


```

For more information, refer to [Handle outbound traffic](https://developers.cloudflare.com/containers/platform-details/outbound-traffic/).

## Utility functions

These functions are exported alongside the `Container` class from `@cloudflare/containers`.

### `getContainer`

Get a stub for a named container instance.

TypeScript

```

getContainer<T>(binding: DurableObjectNamespace<T>, name?: string): DurableObjectStub<T>


```

**Parameters**:

* `binding` \- Durable Object namespace binding for your container class.
* `name` \- Stable instance name. Defaults to `cf-singleton-container`.

**Returns**: `DurableObjectStub<T>` for the named container instance.

Use this when you want one container per logical entity, such as a user session, a document, or a game room, identified by a stable name.

* [  JavaScript ](#tab-panel-7820)
* [  TypeScript ](#tab-panel-7821)

JavaScript

```

import { getContainer } from "@cloudflare/containers";


export default {

  async fetch(request, env) {

    const { sessionId } = await request.json();

    return getContainer(env.MY_CONTAINER, sessionId).fetch(request);

  },

};


```

TypeScript

```

import { getContainer } from "@cloudflare/containers";


export default {

  async fetch(request: Request, env) {

    const { sessionId } = await request.json();

    return getContainer(env.MY_CONTAINER, sessionId).fetch(request);

  },

};


```

### `getRandom`

Get a stub for a randomly selected container instance.

TypeScript

```

getRandom<T>(binding: DurableObjectNamespace<T>, instances?: number): Promise<DurableObjectStub<T>>


```

**Parameters**:

* `binding` \- Durable Object namespace binding for your container class.
* `instances` \- Total number of instances to choose from. Defaults to `3`.

**Returns**: `Promise<DurableObjectStub<T>>` for the randomly selected instance.

Use this for stateless workloads where any container can handle any request and you want to spread load across multiple instances.

* [  JavaScript ](#tab-panel-7824)
* [  TypeScript ](#tab-panel-7825)

JavaScript

```

import { getRandom } from "@cloudflare/containers";


export default {

  async fetch(request, env) {

    const container = await getRandom(env.WORKER_POOL, 5);

    return container.fetch(request);

  },

};


```

TypeScript

```

import { getRandom } from "@cloudflare/containers";


export default {

  async fetch(request: Request, env) {

    const container = await getRandom(env.WORKER_POOL, 5);

    return container.fetch(request);

  },

};


```

Refer to the [stateless instances example](https://developers.cloudflare.com/containers/examples/stateless/) for a full example.

### `switchPort`

Target a different container port while still using `fetch()`.

TypeScript

```

switchPort(request: Request, port: number): Request


```

**Parameters**:

* `request` \- Request to copy.
* `port` \- Port to encode into the request headers.

**Returns**: `Request` copy with the target port set.

Use this when you need to target a specific port and also need WebSocket support. If you do not need WebSockets, pass the port directly to [containerFetch()](#containerfetch) instead.

* [  JavaScript ](#tab-panel-7828)
* [  TypeScript ](#tab-panel-7829)

JavaScript

```

import { getContainer, switchPort } from "@cloudflare/containers";


export default {

  async fetch(request, env) {

    const container = getContainer(env.MY_CONTAINER);

    return container.fetch(switchPort(request, 9090));

  },

};


```

TypeScript

```

import { getContainer, switchPort } from "@cloudflare/containers";


export default {

  async fetch(request: Request, env) {

    const container = getContainer(env.MY_CONTAINER);

    return container.fetch(switchPort(request, 9090));

  },

};


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/container-class/#page","headline":"Container Interface · Cloudflare Containers docs","description":"API reference for the Container interface and utility functions","url":"https://developers.cloudflare.com/containers/container-class/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/containers/","name":"Containers"}},{"@type":"ListItem","position":3,"item":{"@id":"/containers/container-class/","name":"Container Interface"}}]}
```
