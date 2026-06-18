---
title: Sandbox
description: Give agents isolated Linux environments for running code, managing files, and executing commands.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sandbox

Agents can use [Sandbox](https://developers.cloudflare.com/sandbox/) to run code in isolated container environments. Use Sandbox when an agent needs a real filesystem, shell commands, language runtimes, package installation, or long-lived project state that should not run inside the agent's own Worker isolate.

Sandbox is built on [Cloudflare Containers](https://developers.cloudflare.com/containers/) and exposes a TypeScript API for command execution, file operations, background processes, and service previews.

## When to use Sandbox

Use Sandbox for agents that need to:

* Run untrusted or model-generated code in isolation.
* Execute Python, Node.js, shell commands, or package managers.
* Read, write, and manage project files.
* Run tests, linters, build tools, or data analysis scripts.
* Maintain a workspace across multiple agent turns.

## Basic pattern

Bind the Sandbox Durable Object to your Worker, then access a sandbox from your agent methods with `getSandbox()`.

* [  JavaScript ](#tab-panel-6515)
* [  TypeScript ](#tab-panel-6516)

JavaScript

```

import { Agent, callable } from "agents";

import { getSandbox } from "@cloudflare/sandbox";


export { Sandbox } from "@cloudflare/sandbox";


export class CodeAgent extends Agent {

  @callable()

  async runPython(code) {

    const sandbox = getSandbox(this.env.Sandbox, this.name);


    await sandbox.writeFile("/workspace/script.py", code);

    const result = await sandbox.exec("python3 /workspace/script.py");


    this.setState({ lastOutput: result.stdout });


    return {

      success: result.success,

      stdout: result.stdout,

      stderr: result.stderr,

      exitCode: result.exitCode,

    };

  }

}


```

TypeScript

```

import { Agent, callable } from "agents";

import { getSandbox } from "@cloudflare/sandbox";

import type { Sandbox } from "@cloudflare/sandbox";


export { Sandbox } from "@cloudflare/sandbox";


type Env = {

  Sandbox: DurableObjectNamespace<Sandbox>;

};


export class CodeAgent extends Agent<Env, { lastOutput?: string }> {

  @callable()

  async runPython(code: string) {

    const sandbox = getSandbox(this.env.Sandbox, this.name);


    await sandbox.writeFile("/workspace/script.py", code);

    const result = await sandbox.exec("python3 /workspace/script.py");


    this.setState({ lastOutput: result.stdout });


    return {

      success: result.success,

      stdout: result.stdout,

      stderr: result.stderr,

      exitCode: result.exitCode,

    };

  }

}


```

## Configuration

Configure the Sandbox container, Durable Object binding, and migration in `wrangler.jsonc`.

* [  wrangler.jsonc ](#tab-panel-6513)
* [  wrangler.toml ](#tab-panel-6514)

JSONC

```

{

  "containers": [

    {

      "class_name": "Sandbox",

      "image": "./Dockerfile",

      "instance_type": "lite",

      "max_instances": 1

    }

  ],

  "durable_objects": {

    "bindings": [

      {

        "name": "Sandbox",

        "class_name": "Sandbox"

      }

    ]

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": ["Sandbox"]

    }

  ]

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

name = "Sandbox"

class_name = "Sandbox"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "Sandbox" ]


```

## Sandbox and agent state

Use agent state for user-visible progress and small metadata. Use the sandbox filesystem for workspace files, generated code, package installs, logs, and artifacts.

For long-running sandbox work, pair Sandbox with [durable execution with fibers](https://developers.cloudflare.com/agents/runtime/execution/durable-execution/) or [Workflows](https://developers.cloudflare.com/agents/runtime/execution/run-workflows/) so the agent can recover or report progress if work outlives a single request.

## Related resources

[ Sandbox SDK ](https://developers.cloudflare.com/sandbox/) Full Sandbox documentation for commands, files, sessions, and deployment. 

[ Execute commands ](https://developers.cloudflare.com/sandbox/guides/execute-commands/) Run shell commands in a sandbox environment. 

[ Manage files ](https://developers.cloudflare.com/sandbox/guides/manage-files/) Read, write, upload, and download sandbox files. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/sandbox/#page","headline":"Sandbox · Cloudflare Agents docs","description":"Give agents isolated Linux environments for running code, managing files, and executing commands.","url":"https://developers.cloudflare.com/agents/tools/sandbox/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/sandbox/","name":"Sandbox"}}]}
```
