---
title: Sandbox SDK
description: Build secure, isolated code execution environments powered by Cloudflare Workers and Containers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sandbox SDK

Build secure, isolated code execution environments

 Available on Workers Paid plan 

The Sandbox SDK enables you to run untrusted code securely in isolated environments. Built on [Containers](https://developers.cloudflare.com/containers/), Sandbox SDK provides a simple API for executing commands, managing files, running background processes, and exposing services — all from your [Workers](https://developers.cloudflare.com/workers/) applications.

Sandboxes are ideal for building AI agents that need to execute code, interactive development environments, data analysis platforms, CI/CD systems, and any application that needs secure code execution at the edge. Each sandbox runs in its own isolated container with a full Linux environment, providing strong security boundaries while maintaining performance.

With Sandbox, you can execute Python scripts, run Node.js applications, analyze data, compile code, and perform complex computations — all with a simple TypeScript API and no infrastructure to manage.

* [ Execute Commands ](#tab-panel-10069)
* [ Code interpreter ](#tab-panel-10070)
* [ File Operations ](#tab-panel-10071)
* [ File watching ](#tab-panel-10072)
* [ Terminal Access ](#tab-panel-10073)
* [ WebSocket connections ](#tab-panel-10074)

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';


export { Sandbox } from '@cloudflare/sandbox';


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const sandbox = getSandbox(env.Sandbox, 'user-123');


    // Execute a command and get the result

    const result = await sandbox.exec('python --version');


    return Response.json({

      output: result.stdout,

      exitCode: result.exitCode,

      success: result.success

    });

  }

};


```

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';


export { Sandbox } from '@cloudflare/sandbox';


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const sandbox = getSandbox(env.Sandbox, 'user-123');


    // Create a Python execution context

    const ctx = await sandbox.createCodeContext({ language: 'python' });


    // Execute Python code with automatic result capture

    const result = await sandbox.runCode(`

import pandas as pd

data = {'product': ['A', 'B', 'C'], 'sales': [100, 200, 150]}

df = pd.DataFrame(data)

df['sales'].sum()  # Last expression is automatically returned

  `, { context: ctx });


      return Response.json({

        result: result.results?.[0]?.text,

        logs: result.logs

      });

    }

  };


```

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';


export { Sandbox } from '@cloudflare/sandbox';


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const sandbox = getSandbox(env.Sandbox, 'user-123');


    // Create a project structure

    await sandbox.mkdir('/workspace/project/src', { recursive: true });


    // Write files

    await sandbox.writeFile(

      '/workspace/project/package.json',

      JSON.stringify({ name: 'my-app', version: '1.0.0' })

    );


    // Read a file back

    const content = await sandbox.readFile('/workspace/project/package.json');


    return Response.json({ content });

  }

};


```

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';


export { Sandbox } from '@cloudflare/sandbox';


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const sandbox = getSandbox(env.Sandbox, 'user-123');


    // Watch for file changes in real-time

    const watcher = await sandbox.watch('/workspace/src', {

      include: ['*.js', '*.ts'],

      onEvent: (event) => {

        console.log(`${event.type}: ${event.path}`);

        if (event.type === 'modify') {

          // Trigger rebuild or hot reload

          console.log('Code changed, recompiling...');

        }

      },

      onError: (error) => {

        console.error('Watch error:', error);

      }

    });


    // Stop watching when done

    setTimeout(() => watcher.stop(), 60000);


    return Response.json({ message: 'File watcher started' });

  }

};


```

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';


export { Sandbox } from '@cloudflare/sandbox';


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const url = new URL(request.url);


    // Terminal WebSocket connection

    if (url.pathname === '/ws/terminal') {

      const sandbox = getSandbox(env.Sandbox, 'user-123');

      return sandbox.terminal(request, { cols: 80, rows: 24 });

    }


    return Response.json({ message: 'Terminal endpoint' });

  }

};


```

Connect browser terminals directly to sandbox shells via WebSocket. Learn more: [Browser terminals](https://developers.cloudflare.com/sandbox/guides/browser-terminals/).

TypeScript

```

import { getSandbox } from '@cloudflare/sandbox';


export { Sandbox } from '@cloudflare/sandbox';


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    // Connect to WebSocket services in sandbox

    if (request.headers.get('Upgrade')?.toLowerCase() === 'websocket') {

      const sandbox = getSandbox(env.Sandbox, 'user-123');

      return await sandbox.wsConnect(request, 8080);

    }


    return Response.json({ message: 'WebSocket endpoint' });

  }

};


```

Connect to WebSocket servers running in sandboxes. Learn more: [WebSocket Connections](https://developers.cloudflare.com/sandbox/guides/websocket-connections/).

[ Get started ](https://developers.cloudflare.com/sandbox/get-started/) [ API Reference ](https://developers.cloudflare.com/sandbox/api/) 

---

## Features

###  Execute commands securely 

Run shell commands, Python scripts, Node.js applications, and more with streaming output support and automatic timeout handling.

[ Learn about command execution ](https://developers.cloudflare.com/sandbox/guides/execute-commands/) 

###  Manage files and processes 

Read, write, and manipulate files in the sandbox filesystem. Run background processes, monitor output, and manage long-running operations.

[ Learn about file operations ](https://developers.cloudflare.com/sandbox/guides/manage-files/) 

###  Expose services with preview URLs 

Expose HTTP services running in your sandbox with automatically generated preview URLs, perfect for interactive development environments and application hosting.

[ Learn about preview URLs ](https://developers.cloudflare.com/sandbox/guides/expose-services/) 

###  Execute code directly 

Execute Python and JavaScript code with rich outputs including charts, tables, and images. Maintain persistent state between executions for AI-generated code and interactive workflows.

[ Learn about code execution ](https://developers.cloudflare.com/sandbox/guides/code-execution/) 

###  Build interactive terminals 

Create browser-based terminal interfaces that connect directly to sandbox shells via WebSocket. Build collaborative terminals, interactive development environments, and real-time shell access with automatic reconnection.

[ Learn about terminal UIs ](https://developers.cloudflare.com/sandbox/guides/browser-terminals/) 

###  Persistent storage with object storage 

Mount S3-compatible object storage (R2, S3, GCS, and more) as local filesystems. Access buckets using standard file operations with data that persists across sandbox lifecycles. Production deployment required.

[ Learn about bucket mounting ](https://developers.cloudflare.com/sandbox/guides/mount-buckets/) 

###  Watch files for real-time changes 

Monitor files and directories for changes using native filesystem events. Perfect for building hot reloading development servers, build automation systems, and configuration monitoring tools.

[ Learn about file watching ](https://developers.cloudflare.com/sandbox/guides/file-watching/) 

###  Proxy external API requests securely 

Keep credentials in your Worker while allowing sandboxes to access external APIs. A Worker proxy validates short-lived JWT tokens from the sandbox and injects real credentials at request time.

[ Learn about request proxying ](https://developers.cloudflare.com/sandbox/guides/proxy-requests/) 

---

## Use Cases

Build powerful applications with Sandbox:

### AI Code Execution

Execute code generated by Large Language Models safely and reliably. Native integration with [Workers AI](https://developers.cloudflare.com/workers-ai/) models like GPT-OSS enables function calling with sandbox execution. Perfect for AI agents, code assistants, and autonomous systems that need to run untrusted code.

### Data Analysis & Notebooks

Create interactive data analysis environments with pandas, NumPy, and Matplotlib. Generate charts, tables, and visualizations with automatic rich output formatting.

### Interactive Development Environments

Build cloud IDEs, coding playgrounds, and collaborative development tools with full Linux environments and preview URLs.

### CI/CD & Build Systems

Run tests, compile code, and execute build pipelines in isolated environments with parallel execution and streaming logs.

---

## Related products

**[Containers](https://developers.cloudflare.com/containers/)** 

Serverless container runtime that powers Sandbox, enabling you to run any containerized workload on the edge.

**[Workers AI](https://developers.cloudflare.com/workers-ai/)** 

Run machine learning models and LLMs on the network. Combine with Sandbox for secure AI code execution workflows.

**[Durable Objects](https://developers.cloudflare.com/durable-objects/)** 

Stateful coordination layer that enables Sandbox to maintain persistent environments with strong consistency.

---

## More resources

[Tutorials](https://developers.cloudflare.com/sandbox/tutorials/) 

Explore complete examples including AI code execution, data analysis, and interactive environments.

[How-to Guides](https://developers.cloudflare.com/sandbox/guides/) 

Learn how to solve specific problems and implement features with the Sandbox SDK.

[API reference](https://developers.cloudflare.com/sandbox/api/) 

Explore the complete API documentation for the Sandbox SDK.

[Concepts](https://developers.cloudflare.com/sandbox/concepts/) 

Learn about the key concepts and architecture of the Sandbox SDK.

[Configuration](https://developers.cloudflare.com/sandbox/configuration/) 

Learn about the configuration options for the Sandbox SDK.

[GitHub Repository](https://github.com/cloudflare/sandbox-sdk) 

View the SDK source code, report issues, and contribute to the project.

[Pricing](https://developers.cloudflare.com/sandbox/platform/pricing/) 

Understand Sandbox pricing based on the underlying Containers platform.

[Limits](https://developers.cloudflare.com/sandbox/platform/limits/) 

Learn about resource limits, quotas, and best practices for working within them.

[Discord Community](https://discord.cloudflare.com) 

Connect with the community on Discord. Ask questions, share what you're building, and get help from other developers.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/sandbox/#page","headline":"Overview · Cloudflare Sandbox SDK docs","description":"Build secure, isolated code execution environments powered by Cloudflare Workers and Containers.","url":"https://developers.cloudflare.com/sandbox/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/sandbox/","name":"Sandbox SDK"}}]}
```
