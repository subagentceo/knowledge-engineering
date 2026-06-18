---
title: Profiling Memory
description: Profile memory usage with DevTools snapshots to optimize Workers and avoid OOM errors.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Profiling Memory

Understanding Worker memory usage can help you optimize performance, avoid Out of Memory (OOM) errors when hitting [Worker memory limits](https://developers.cloudflare.com/workers/platform/limits/#memory), and fix memory leaks.

You can profile memory usage with snapshots in DevTools. Memory snapshots let you view a summary of memory usage, see how much memory is allocated to different data types, and get details on specific objects in memory.

When using DevTools to profile memory, it may be difficult to replicate specific behavior you are seeing in production. To mimic production behavior, make sure the requests you send to the local Worker are similar to requests in production. This might mean sending a large volume of requests, making requests to specific routes, or using production-like data with the [\--remote flag](https://developers.cloudflare.com/workers/development-testing/#remote-bindings).

## Taking a snapshot

To generate a memory snapshot:

* Run `wrangler dev` to start your Worker
* Press the `D` from your terminal to open DevTools
* Select on the "Memory" tab
* Send requests to your Worker to start allocating memory  
   * Optionally include a debugger to make sure you can pause execution at the proper time
* Select `Take snapshot`

You can now inspect Worker memory.

## An Example Snapshot

Let's look at an example to learn how to read a memory snapshot. Imagine you have the following Worker:

index.js

```

let responseText = "Hello world!";


export default {

  async fetch(request, env, ctx) {

    let now = new Date().toISOString();

    responseText = responseText + ` (Requested at: ${now})`;

    return new Response(responseText.slice(0, 53));

  },

};


```

While this code worked well initially, over time you notice slower responses and Out of Memory errors. Using DevTools, you can find out if this is a memory leak.

First, as mentioned above, you open DevTools by pressing the `D` key after running `wrangler dev`. Then, you navigate to the "Memory" tab.

Next, generate a large volume of traffic to the Worker by sending requests. You can do this with `curl` or by repeatedly reloading the browser. Note that other Workers may require more specific requests to reproduce a memory leak.

Then, click the "Take Snapshot" button and view the results.

First, navigate to "Statistics" in the dropdown to get a general sense of what takes up memory.

![Memory Statistics](https://developers.cloudflare.com/_astro/memory-stats.BkZs-j29_IdQLM.webp) 

Looking at these statistics, you can see that a lot of memory is dedicated to strings at 67 kB. This is likely the source of the memory leak. If you make more requests and take another snapshot, you would see this number grow.

![Memory Summary](https://developers.cloudflare.com/_astro/memory-summary.CPf4-TMr_Z16f24m.webp) 

The memory summary lists data types by the amount of memory they take up. When you click into "(string)", you can see a string that is far larger than the rest. The text shows that you are appending "Requested at" and a date repeatedly, inadvertently overwriting the global variable with an increasingly large string:

JavaScript

```

responseText = responseText + ` (Requested at: ${now})`;


```

Using Memory Snapshotting in DevTools, you've identified the object and line of code causing the memory leak. You can now fix it with a small code change.

## Additional Resources

To learn more about how to use Memory Snapshotting, see [Google's documentation on Memory Heap Snapshots ↗](https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots).

To learn how to use DevTools to gain insight into CPU usage, see the [CPU Profiling Documentation](https://developers.cloudflare.com/workers/observability/dev-tools/cpu-usage/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/dev-tools/memory-usage/#page","headline":"Profiling Memory · Cloudflare Workers docs","description":"Profile memory usage with DevTools snapshots to optimize Workers and avoid OOM errors.","url":"https://developers.cloudflare.com/workers/observability/dev-tools/memory-usage/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/observability/dev-tools/","name":"DevTools"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/observability/dev-tools/memory-usage/","name":"Profiling Memory"}}]}
```
