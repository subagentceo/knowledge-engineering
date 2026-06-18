---
title: Debugging
description: Debugging with the Vite plugin
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Debugging

The Cloudflare Vite plugin has debugging enabled by default and listens on port `9229`. You may choose a custom port or disable debugging by setting the `inspectorPort` option in the [plugin config](https://developers.cloudflare.com/workers/vite-plugin/reference/api#interface-pluginconfig). There are two recommended methods for debugging your Workers during local development:

## DevTools

When running `vite dev` or `vite preview`, a `/__debug` route is added that provides access to [Cloudflare's implementation ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/chrome-devtools-patches) of [Chrome's DevTools ↗](https://developer.chrome.com/docs/devtools/overview). Navigating to this route will open a DevTools tab for each of the Workers in your application.

Once the tab(s) are open, you can make a request to your application and start debugging your Worker code.

Note

When debugging multiple Workers, you may need to allow your browser to open pop-ups.

## VS Code

To set up [VS Code ↗](https://code.visualstudio.com/) to support breakpoint debugging in your application, you should create a `.vscode/launch.json` file that contains the following configuration:

.vscode/launch.json

```

{

  "configurations": [

    {

      "name": "<NAME_OF_WORKER>",

      "type": "node",

      "request": "attach",

      "websocketAddress": "ws://localhost:9229/<NAME_OF_WORKER>",

      "resolveSourceMapLocations": null,

      "attachExistingChildren": false,

      "autoAttachChildProcesses": false,

      "sourceMaps": true

    }

  ],

  "compounds": [

    {

      "name": "Debug Workers",

      "configurations": ["<NAME_OF_WORKER>"],

      "stopAll": true

    }

  ]

}


```

Here, `<NAME_OF_WORKER>` indicates the name of the Worker as specified in your Worker config file. If you have used the `inspectorPort` option to set a custom port then this should be the value provided in the `websocketaddress` field.

Note

If you have more than one Worker in your application, you should add a configuration in the `configurations` field for each and include the configuration name in the `compounds` `configurations` array.

With this set up, you can run `vite dev` or `vite preview` and then select **Debug Workers** at the top of the **Run & Debug** panel to start debugging.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/reference/debugging/#page","headline":"Debugging · Cloudflare Workers docs","description":"Debugging with the Vite plugin","url":"https://developers.cloudflare.com/workers/vite-plugin/reference/debugging/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/vite-plugin/","name":"Vite plugin"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/vite-plugin/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/vite-plugin/reference/debugging/","name":"Debugging"}}]}
```
