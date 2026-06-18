---
title: API
description: Vite plugin API
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# API

## `cloudflare()`

The `cloudflare` plugin should be included in the Vite `plugins` array:

vite.config.ts

```

import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";


export default defineConfig({

  plugins: [cloudflare()],

});


```

It accepts an optional `PluginConfig` parameter.

## `interface PluginConfig`

* `configPath` ` string ` optional  
An optional path to your entry Worker config file.  
For the entry Worker, the plugin resolves the config path in this order:  
   1. `configPath`  
   2. `CLOUDFLARE_VITE_WRANGLER_CONFIG_PATH` (typically set by a framework or other external tool)  
   3. `wrangler.jsonc`, `wrangler.json`, or `wrangler.toml` in the root of your application  
This applies in `vite dev` and `vite build`.  
For more information about the Worker configuration, see [Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/).
* `config` ` WorkerConfigCustomizer<true> ` optional  
Customize or override Worker configuration programmatically. Accepts a partial configuration object or a function that receives the current config.  
Applied after any config file loads. Use it to override values, modify the existing config, or define Workers entirely in code.  
See [Programmatic configuration](https://developers.cloudflare.com/workers/vite-plugin/reference/programmatic-configuration/) for details.
* `viteEnvironment` ` { name?: string; childEnvironments?: string[] } ` optional  
Optional Vite environment options. By default, the environment name is the Worker name with `-` characters replaced with `_`. Setting the name here will override this. A typical use case is setting `viteEnvironment: { name: "ssr" }` to apply the Worker to the SSR environment.  
The `childEnvironments` option is for supporting React Server Components via [@vitejs/plugin-rsc ↗](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc) and frameworks that build on top of it. This enables embedding additional environments with separate module graphs inside a single Worker.  
See [Vite Environments](https://developers.cloudflare.com/workers/vite-plugin/reference/vite-environments/) for more information.
* `persistState` ` boolean | { path: string } ` optional  
An optional override for state persistence. By default, state is persisted to `.wrangler/state`. A custom `path` can be provided or, alternatively, persistence can be disabled by setting the value to `false`.
* `inspectorPort` ` number | false ` optional  
An optional override for debugging your Workers. By default, the debugging inspector is enabled and listens on port `9229`. A custom port can be provided or, alternatively, setting this to `false` will disable the debugging inspector.  
See [Debugging](https://developers.cloudflare.com/workers/vite-plugin/reference/debugging/) for more information.
* `tunnel` ` boolean | { name?: string; autoStart?: boolean } ` optional  
Expose your local dev server over a [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/).  
Provide an object to configure a named tunnel or control whether the tunnel starts automatically. Press `t + Enter` to start or close the tunnel. Set `tunnel.autoStart` to `true` if you want the tunnel to open when Vite starts.  
   * [  JavaScript ](#tab-panel-12211)  
   * [  TypeScript ](#tab-panel-12212)  
vite.config.js  
```  
import { defineConfig } from "vite";  
import { cloudflare } from "@cloudflare/vite-plugin";  
export default defineConfig({  
  plugins: [  
    cloudflare({  
      tunnel: { name: "my-tunnel" },  
    }),  
  ],  
});  
```  
vite.config.ts  
```  
import { defineConfig } from "vite";  
import { cloudflare } from "@cloudflare/vite-plugin";  
export default defineConfig({  
  plugins: [  
    cloudflare({  
      tunnel: { name: "my-tunnel" },  
    }),  
  ],  
});  
```  
See [Share a local dev server](https://developers.cloudflare.com/workers/development-testing/local-dev-tunnels/) for more information.
* `auxiliaryWorkers` ` Array<AuxiliaryWorkerConfig> ` optional  
An optional array of auxiliary Workers. Auxiliary Workers are additional Workers that are used as part of your application. You can use [service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) to call auxiliary Workers from your main (entry) Worker. All requests are routed through your entry Worker. During the build, each Worker is output to a separate subdirectory of `dist`.  
Note  
When running `wrangler deploy`, only your main (entry) Worker will be deployed. If using multiple Workers, each auxiliary Worker must be deployed individually. You can inspect the `dist` directory and then run `wrangler deploy -c dist/<auxiliary-worker>/wrangler.json` for each.
* `remoteBindings` ` boolean ` optional  
Whether or not [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) should be enabled. Defaults to `true`.

## `interface AuxiliaryWorkerConfig`

Auxiliary Workers require a `configPath`, a `config` option, or both.`CLOUDFLARE_VITE_WRANGLER_CONFIG_PATH` only applies to the entry Worker. Auxiliary Workers do not use this environment variable. If you use a config file for an auxiliary Worker, set `configPath` explicitly.

* `configPath` ` string ` optional  
The path to your Worker config file. This field is required unless `config` is provided.  
For more information about the Worker configuration, see [Configuration](https://developers.cloudflare.com/workers/wrangler/configuration/).
* `config` ` WorkerConfigCustomizer<false> ` optional  
Customize or override Worker configuration programmatically. When used without `configPath`, this allows defining auxiliary Workers entirely in code.  
See [Programmatic configuration](https://developers.cloudflare.com/workers/vite-plugin/reference/programmatic-configuration/) for usage examples.
* `viteEnvironment` ` { name?: string; childEnvironments?: string[] } ` optional  
Optional Vite environment options. By default, the environment name is the Worker name with `-` characters replaced with `_`. Setting the name here will override this.  
The `childEnvironments` option is for supporting React Server Components via [@vitejs/plugin-rsc ↗](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-rsc) and frameworks that build on top of it. This enables embedding additional environments with separate module graphs inside a single Worker.  
See [Vite Environments](https://developers.cloudflare.com/workers/vite-plugin/reference/vite-environments/) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/reference/api/#page","headline":"API · Cloudflare Workers docs","description":"Vite plugin API","url":"https://developers.cloudflare.com/workers/vite-plugin/reference/api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/vite-plugin/","name":"Vite plugin"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/vite-plugin/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/vite-plugin/reference/api/","name":"API"}}]}
```
