---
title: Debugging
description: Debug your Workers tests with Vitest.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Debugging

This guide shows you how to debug your Workers tests with Vitest. This is available with `@cloudflare/vitest-pool-workers` v0.7.5 or later.

## Open inspector with Vitest

To start debugging, run Vitest with the following command and attach a debugger to port `9229`:

Terminal window

```

vitest --inspect --no-file-parallelism


```

## Customize the inspector port

By default, the inspector will be opened on port `9229`. If you need to use a different port (for example, `3456`), you can run the following command:

Terminal window

```

vitest --inspect=3456 --no-file-parallelism


```

Alternatively, you can define it in your Vitest configuration file:

TypeScript

```

import { cloudflareTest } from "@cloudflare/vitest-pool-workers";

import { defineConfig } from "vitest/config";


export default defineConfig({

  plugins: [

    cloudflareTest({

      // ...

    }),

  ],

  test: {

    inspector: {

      port: 3456,

    },

  },

});


```

## Setup VS Code to use breakpoints

To setup VS Code for breakpoint debugging in your Worker tests, create a `.vscode/launch.json` file that contains the following configuration:

```

{

  "configurations": [

    {

      "type": "node",

      "request": "launch",

      "name": "Open inspector with Vitest",

      "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",

      "console": "integratedTerminal",

      "args": ["--inspect=9229", "--no-file-parallelism"]

    },

    {

      "name": "Attach to Workers Runtime",

      "type": "node",

      "request": "attach",

      "port": 9229,

      "cwd": "/",

      "resolveSourceMapLocations": null,

      "attachExistingChildren": false,

      "autoAttachChildProcesses": false

    }

  ],

  "compounds": [

    {

      "name": "Debug Workers tests",

      "configurations": [

        "Open inspector with Vitest",

        "Attach to Workers Runtime"

      ],

      "stopAll": true

    }

  ]

}


```

Select **Debug Workers tests** at the top of the **Run & Debug** panel to open an inspector with Vitest and attach a debugger to the Workers runtime. Then you can add breakpoints to your test files and start debugging.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/debugging/#page","headline":"Debugging · Cloudflare Workers docs","description":"Debug your Workers tests with Vitest.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/debugging/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/vitest-integration/","name":"Vitest integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/vitest-integration/debugging/","name":"Debugging"}}]}
```
