---
title: Attaching a Debugger
description: Attach a Node.js debugger to Miniflare for setting breakpoints and inspecting Cloudflare Workers code.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Attaching a Debugger

Warning

This documentation describes breakpoint debugging when using Miniflare directly, which is only relevant for advanced use cases. Instead, most users should refer to the [Workers Observability documentation for how to set this up when using Wrangler](https://developers.cloudflare.com/workers/observability/dev-tools/breakpoints/).

You can use regular Node.js tools to debug your Workers. Setting breakpoints, watching values and inspecting the call stack are all examples of things you can do with a debugger.

## Visual Studio Code

### Create configuration

The easiest way to debug a Worker in VSCode is to create a new configuration.

Open the **Run and Debug** menu in the VSCode activity bar and create a`.vscode/launch.json` file that contains the following:

```

---

filename: .vscode/launch.json

---

{

  "configurations": [

    {

      "name": "Miniflare",

      "type": "node",

      "request": "attach",

      "port": 9229,

      "cwd": "/",

      "resolveSourceMapLocations": null,

      "attachExistingChildren": false,

      "autoAttachChildProcesses": false,

    }

  ]

}


```

From the **Run and Debug** menu in the activity bar, select the `Miniflare`configuration, and click the green play button to start debugging.

## WebStorm

Create a new configuration, by clicking **Add Configuration** in the top right.

![WebStorm add configuration button](https://developers.cloudflare.com/_astro/debugger-webstorm-node-add.1Aka_l-1_1vHfDB.webp) 

Click the **plus** button in the top left of the popup and create a new**Node.js/Chrome** configuration. Set the **Host** field to `localhost` and the**Port** field to `9229`. Then click **OK**.

![WebStorm Node.js debug configuration](https://developers.cloudflare.com/_astro/debugger-webstorm-settings.CxmegMYm_Z1NsdxH.webp) 

With the new configuration selected, click the green debug button to start debugging.

![WebStorm configuration debug button](https://developers.cloudflare.com/_astro/debugger-webstorm-node-run.BodpA57u_Z1SMC98.webp) 

## DevTools

Breakpoints can also be added via the Workers DevTools. For more information,[read the guide](https://developers.cloudflare.com/workers/observability/dev-tools)in the Cloudflare Workers docs.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/developing/debugger/#page","headline":"Attaching a Debugger · Cloudflare Workers docs","description":"Attach a Node.js debugger to Miniflare for setting breakpoints and inspecting Cloudflare Workers code.","url":"https://developers.cloudflare.com/workers/testing/miniflare/developing/debugger/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/miniflare/","name":"Miniflare"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/miniflare/developing/","name":"Developing"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/testing/miniflare/developing/debugger/","name":"Attaching a Debugger"}}]}
```
