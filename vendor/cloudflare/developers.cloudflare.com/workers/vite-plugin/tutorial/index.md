---
title: Tutorial - React SPA with an API
description: Create a React SPA with an API Worker using the Vite plugin
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Tutorial - React SPA with an API

**Last reviewed:**  about 1 year ago 

This tutorial takes you through the steps needed to adapt a Vite project to use the Cloudflare Vite plugin. Much of the content can also be applied to adapting existing Vite projects and to front-end frameworks other than React.

Note

If you want to start a new app with a template already set up with Vite, React and the Cloudflare Vite plugin, refer to the [React framework guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/react/). To create a standalone Worker, refer to [Get started](https://developers.cloudflare.com/workers/vite-plugin/get-started/).

## Introduction

In this tutorial, you will create a React SPA that can be deployed as a Worker with static assets. You will then add an API Worker that can be accessed from the front-end code. You will develop, build, and preview the application using Vite before finally deploying to Cloudflare.

## Set up and configure the React SPA

### Scaffold a Vite project

Start by creating a React TypeScript project with Vite.

 npm  yarn  pnpm 

```
npm create vite@latest -- cloudflare-vite-tutorial --template react-ts
```

```
yarn create vite cloudflare-vite-tutorial --template react-ts
```

```
pnpm create vite@latest cloudflare-vite-tutorial --template react-ts
```

Next, open the `cloudflare-vite-tutorial` directory in your editor of choice.

### Add the Cloudflare dependencies

 npm  yarn  pnpm  bun 

```
npm i -D @cloudflare/vite-plugin wrangler
```

```
yarn add -D @cloudflare/vite-plugin wrangler
```

```
pnpm add -D @cloudflare/vite-plugin wrangler
```

```
bun add -d @cloudflare/vite-plugin wrangler
```

### Add the plugin to your Vite config

vite.config.ts

```

import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

import { cloudflare } from "@cloudflare/vite-plugin";


export default defineConfig({

  plugins: [react(), cloudflare()],

});


```

The Cloudflare Vite plugin doesn't require any configuration by default and will look for a `wrangler.jsonc`, `wrangler.json` or `wrangler.toml` in the root of your application.

Refer to the [API reference](https://developers.cloudflare.com/workers/vite-plugin/reference/api/) for configuration options.

### Create your Worker config file

* [  wrangler.jsonc ](#tab-panel-12221)
* [  wrangler.toml ](#tab-panel-12222)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "cloudflare-vite-tutorial",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "assets": {

    "not_found_handling": "single-page-application"

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "cloudflare-vite-tutorial"

# Set this to today's date

compatibility_date = "2026-06-18"


[assets]

not_found_handling = "single-page-application"


```

The [not\_found\_handling](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/) value has been set to `single-page-application`. This means that all not found requests will serve the `index.html` file. With the Cloudflare plugin, the `assets` routing configuration is used in place of Vite's default behavior. This ensures that your application's [routing configuration](https://developers.cloudflare.com/workers/static-assets/routing/) works the same way while developing as it does when deployed to production.

Note that the [directory](https://developers.cloudflare.com/workers/static-assets/binding/#directory) field is not used when configuring assets with Vite. The `directory` in the output configuration will automatically point to the client build output. See [Static Assets](https://developers.cloudflare.com/workers/vite-plugin/reference/static-assets/) for more information.

Note

When using the Cloudflare Vite plugin, the Worker config (for example, `wrangler.jsonc`) that you provide is the input configuration file. A separate output `wrangler.json` file is created when you run `vite build`. This output file is a snapshot of your configuration at the time of the build and is modified to reference your build artifacts. It is the configuration that is used for preview and deployment.

### Update the .gitignore file

When developing Workers, additional files are used and/or generated that should not be stored in git. Add the following lines to your `.gitignore` file:

.gitignore

```

.wrangler

.dev.vars*


```

### Run the development server

Run `npm run dev` to start the Vite development server and verify that your application is working as expected.

For a purely front-end application, you could now build (`npm run build`), preview (`npm run preview`), and deploy (`npm exec wrangler deploy`) your application. This tutorial, however, will show you how to go a step further and add an API Worker.

## Add an API Worker

### Configure TypeScript for your Worker code

 npm  yarn  pnpm  bun 

```
npm i -D @cloudflare/workers-types
```

```
yarn add -D @cloudflare/workers-types
```

```
pnpm add -D @cloudflare/workers-types
```

```
bun add -d @cloudflare/workers-types
```

tsconfig.worker.json

```

{

  "extends": "./tsconfig.node.json",

  "compilerOptions": {

    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.worker.tsbuildinfo",

    "types": ["@cloudflare/workers-types/2023-07-01", "vite/client"],

  },

  "include": ["worker"],

}


```

tsconfig.json

```

{

  "files": [],

  "references": [

    { "path": "./tsconfig.app.json" },

    { "path": "./tsconfig.node.json" },

    { "path": "./tsconfig.worker.json" },

  ],

}


```

### Add to your Worker configuration

* [  wrangler.jsonc ](#tab-panel-12223)
* [  wrangler.toml ](#tab-panel-12224)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "cloudflare-vite-tutorial",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "assets": {

    "not_found_handling": "single-page-application"

  },

  "main": "./worker/index.ts"

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "cloudflare-vite-tutorial"

# Set this to today's date

compatibility_date = "2026-06-18"

main = "./worker/index.ts"


[assets]

not_found_handling = "single-page-application"


```

The `main` field specifies the entry file for your Worker code.

### Add your API Worker

worker/index.ts

```

export default {

  fetch(request) {

    const url = new URL(request.url);


    if (url.pathname.startsWith("/api/")) {

      return Response.json({

        name: "Cloudflare",

      });

    }


    return new Response(null, { status: 404 });

  },

} satisfies ExportedHandler;


```

The Worker above will be invoked for any non-navigation request that does not match a static asset. It returns a JSON response if the `pathname` starts with `/api/` and otherwise return a `404` response.

Note

For top-level navigation requests, browsers send a `Sec-Fetch-Mode: navigate` header. If this is present and the URL does not match a static asset, the `not_found_handling` behavior will be invoked rather than the Worker. This implicit routing is the default behavior.

If you would instead like to define the routes that invoke your Worker explicitly, you can provide an array of route patterns to [run\_worker\_first](https://developers.cloudflare.com/workers/static-assets/binding/#run%5Fworker%5Ffirst). This opts out of interpreting the `Sec-Fetch-Mode` header.

* [  wrangler.jsonc ](#tab-panel-12225)
* [  wrangler.toml ](#tab-panel-12226)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "cloudflare-vite-tutorial",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "assets": {

    "not_found_handling": "single-page-application",

    "run_worker_first": [

      "/api/*"

    ]

  },

  "main": "./worker/index.ts"

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "cloudflare-vite-tutorial"

# Set this to today's date

compatibility_date = "2026-06-18"

main = "./worker/index.ts"


[assets]

not_found_handling = "single-page-application"

run_worker_first = [ "/api/*" ]


```

### Call the API from the client

Edit `src/App.tsx` so that it includes an additional button that calls the API and sets some state:

src/App.tsx

```

import { useState } from "react";

import reactLogo from "./assets/react.svg";

import viteLogo from "/vite.svg";

import "./App.css";


function App() {

  const [count, setCount] = useState(0);

  const [name, setName] = useState("unknown");


  return (

    <>

16 collapsed lines

      <div>

        <a href="https://vite.dev" target="_blank">

          <img src={viteLogo} className="logo" alt="Vite logo" />

        </a>

        <a href="https://react.dev" target="_blank">

          <img src={reactLogo} className="logo react" alt="React logo" />

        </a>

      </div>

      <h1>Vite + React</h1>

      <div className="card">

        <button

          onClick={() => setCount((count) => count + 1)}

          aria-label="increment"

        >

          count is {count}

        </button>

        <p>

          Edit <code>src/App.tsx</code> and save to test HMR

        </p>

      </div>

      <div className="card">

        <button

          onClick={() => {

            fetch("/api/")

              .then((res) => res.json() as Promise<{ name: string }>)

              .then((data) => setName(data.name));

          }}

          aria-label="get name"

        >

          Name from API is: {name}

        </button>

        <p>

          Edit <code>api/index.ts</code> to change the name

        </p>

      </div>

      <p className="read-the-docs">

        Click on the Vite and React logos to learn more

      </p>

    </>

  );

}


export default App;


```

Now, if you click the button, it will display 'Name from API is: Cloudflare'.

Increment the counter to update the application state in the browser. Next, edit `api/index.ts` by changing the `name` it returns to `'Cloudflare Workers'`. If you click the button again, it will display the new `name` while preserving the previously set counter value.

With Vite and the Cloudflare plugin, you can iterate on the client and server parts of your app together, without losing UI state between edits.

### Build your application

Run `npm run build` to build your application.

Terminal window

```

npm run build


```

If you inspect the `dist` directory, you will see that it contains two subdirectories:

* `client` \- the client code that runs in the browser
* `cloudflare_vite_tutorial` \- the Worker code alongside the output `wrangler.json` configuration file

### Preview your application

Run `npm run preview` to validate that your application runs as expected.

Terminal window

```

npm run preview


```

This command will run your build output locally in the Workers runtime, closely matching its behaviour in production.

### Deploy to Cloudflare

Run `npm exec wrangler deploy` to deploy your application to Cloudflare.

Terminal window

```

npm exec wrangler deploy


```

This command will automatically use the output `wrangler.json` that was included in the build output.

## Next steps

In this tutorial, we created an SPA that could be deployed as a Worker with static assets. We then added an API Worker that could be accessed from the front-end code. Finally, we deployed both the client and server-side parts of the application to Cloudflare.

Possible next steps include:

* Adding a binding to another Cloudflare service such as a [KV namespace](https://developers.cloudflare.com/kv/) or [D1 database](https://developers.cloudflare.com/d1/)
* Expanding the API to include additional routes
* Using a library, such as [Hono ↗](https://hono.dev/) or [tRPC ↗](https://trpc.io/), in your API Worker

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/tutorial/#page","headline":"Tutorial - React SPA with an API · Cloudflare Workers docs","description":"Create a React SPA with an API Worker using the Vite plugin","url":"https://developers.cloudflare.com/workers/vite-plugin/tutorial/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/vite-plugin/","name":"Vite plugin"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/vite-plugin/tutorial/","name":"Tutorial - React SPA with an API"}}]}
```
