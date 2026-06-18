---
title: Routing
description: Learn how Pages Functions uses file-based routing to map URL patterns to function files.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Routing

Functions utilize file-based routing. Your `/functions` directory structure determines the designated routes that your Functions will run on. You can create a `/functions` directory with as many levels as needed for your project's use case. Review the following directory:

* ...
* Directoryfunctions  
   * index.js  
   * helloworld.js  
   * howdyworld.js  
   * Directoryfruits  
         * index.js  
         * apple.js  
         * banana.js

The following routes will be generated based on the above file structure. These routes map the URL pattern to the `/functions` file that will be invoked when a visitor goes to the URL:

| File path                   | Route                     |
| --------------------------- | ------------------------- |
| /functions/index.js         | example.com               |
| /functions/helloworld.js    | example.com/helloworld    |
| /functions/howdyworld.js    | example.com/howdyworld    |
| /functions/fruits/index.js  | example.com/fruits        |
| /functions/fruits/apple.js  | example.com/fruits/apple  |
| /functions/fruits/banana.js | example.com/fruits/banana |

Trailing slash

Trailing slash is optional. Both `/foo` and `/foo/` will be routed to `/functions/foo.js` or `/functions/foo/index.js`. If your project has both a `/functions/foo.js` and `/functions/foo/index.js` file, `/foo` and `/foo/` would route to `/functions/foo/index.js`.

If no Function is matched, it will fall back to a static asset if there is one. Otherwise, the Function will fall back to the [default routing behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/) for Pages' static assets.

## Dynamic routes

Dynamic routes allow you to match URLs with parameterized segments. This can be useful if you are building dynamic applications. You can accept dynamic values which map to a single path by changing your filename.

### Single path segments

To create a dynamic route, place one set of brackets around your filename – for example, `/users/[user].js`. By doing this, you are creating a placeholder for a single path segment:

| Path               | Matches? |
| ------------------ | -------- |
| /users/nevi        | Yes      |
| /users/daniel      | Yes      |
| /profile/nevi      | No       |
| /users/nevi/foobar | No       |
| /nevi              | No       |

### Multipath segments

By placing two sets of brackets around your filename – for example, `/users/[[user]].js` – you are matching any depth of route after `/users/`:

| Path                  | Matches? |
| --------------------- | -------- |
| /users/nevi           | Yes      |
| /users/daniel         | Yes      |
| /profile/nevi         | No       |
| /users/nevi/foobar    | Yes      |
| /users/daniel/xyz/123 | Yes      |
| /nevi                 | No       |

Route specificity

More specific routes (routes with fewer wildcards) take precedence over less specific routes.

#### Dynamic route examples

Review the following `/functions/` directory structure:

* ...
* Directoryfunctions  
   * date.js  
   * Directoryusers  
         * special.js  
         * \[user\].js  
         * \[\[catchall\]\].js

The following requests will match the following files:

| Request               | File                                              |
| --------------------- | ------------------------------------------------- |
| /foo                  | Will route to a static asset if one is available. |
| /date                 | /date.js                                          |
| /users/daniel         | /users/\[user\].js                                |
| /users/nevi           | /users/\[user\].js                                |
| /users/special        | /users/special.js                                 |
| /users/daniel/xyz/123 | /users/\[\[catchall\]\].js                        |

The URL segment(s) that match the placeholder (`[user]`) will be available in the request [context](https://developers.cloudflare.com/pages/functions/api-reference/#eventcontext) object. The [context.params](https://developers.cloudflare.com/pages/functions/api-reference/#eventcontext) object can be used to find the matched value for a given filename placeholder.

For files which match a single URL segment (use a single set of brackets), the values are returned as a string:

JavaScript

```

export function onRequest(context) {

  return new Response(context.params.user);

}


```

The above logic will return `daniel` for requests to `/users/daniel`.

For files which match against multiple URL segments (use a double set of brackets), the values are returned as an array:

JavaScript

```

export function onRequest(context) {

  return new Response(JSON.stringify(context.params.catchall));

}


```

The above logic will return `["daniel", "xyz", "123"]` for requests to `/users/daniel/xyz/123`.

## Functions invocation routes

On a purely static project, Pages offers unlimited free requests. However, once you add Functions on a Pages project, all requests by default will invoke your Function. To continue receiving unlimited free static requests, exclude your project's static routes by creating a `_routes.json` file. This file will be automatically generated if a `functions` directory is detected in your project when you publish your project with Pages CI or Wrangler.

Note

Some frameworks (such as [Remix](https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/), [SvelteKit](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/)) will also automatically generate a `_routes.json` file. However, if your preferred framework does not, create an issue on their framework repository with a link to this page or let us know on [Discord ↗](https://discord.cloudflare.com). Refer to the [Framework guide](https://developers.cloudflare.com/pages/framework-guides/) for more information on full-stack frameworks.

### Create a `_routes.json` file

Create a `_routes.json` file to control when your Function is invoked. It should be placed in the build directory of your project.

Default build directories

Below are some standard build commands and directories for popular frameworks and tools.

| Framework/tool               | Build command                   | Build directory        |
| ---------------------------- | ------------------------------- | ---------------------- |
| React (Vite)                 | npm run build                   | dist                   |
| Gatsby                       | npx gatsby build                | public                 |
| Next.js                      | npx @cloudflare/next-on-pages@1 | .vercel/output/static  |
| Next.js (Static HTML Export) | npx next build                  | out                    |
| Nuxt.js                      | npm run build                   | dist                   |
| Qwik                         | npm run build                   | dist                   |
| Remix                        | npm run build                   | build/client           |
| Svelte                       | npm run build                   | public                 |
| SvelteKit                    | npm run build                   | .svelte-kit/cloudflare |
| Vue                          | npm run build                   | dist                   |
| Analog                       | npm run build                   | dist/analog/public     |
| Astro                        | npm run build                   | dist                   |
| Angular                      | npm run build                   | dist/cloudflare        |
| Brunch                       | npx brunch build --production   | public                 |
| Docusaurus                   | npm run build                   | build                  |
| Elder.js                     | npm run build                   | public                 |
| Eleventy                     | npx @11ty/eleventy              | \_site                 |
| Ember.js                     | npx ember-cli build             | dist                   |
| GitBook                      | npx gitbook-cli build           | \_book                 |
| Gridsome                     | npx gridsome build              | dist                   |
| Hugo                         | hugo                            | public                 |
| Jekyll                       | jekyll build                    | \_site                 |
| MkDocs                       | mkdocs build                    | site                   |
| Pelican                      | pelican content                 | output                 |
| React Static                 | react-static build              | dist                   |
| Slate                        | ./deploy.sh                     | build                  |
| Umi                          | npx umi build                   | dist                   |
| VitePress                    | npx vitepress build             | .vitepress/dist        |
| Zola                         | zola build                      | public                 |

This file will include three different properties:

* **version**: Defines the version of the schema. Currently there is only one version of the schema (version 1), however, we may add more in the future and aim to be backwards compatible.
* **include**: Defines routes that will be invoked by Functions. Accepts wildcard behavior.
* **exclude**: Defines routes that will not be invoked by Functions. Accepts wildcard behavior. `exclude` always take priority over `include`.

Note

Wildcards match any number of path segments (slashes). For example, `/users/*` will match everything after the`/users/` path.

#### Example configuration

Below is an example of a `_routes.json`.

```

{

  "version": 1,

  "include": ["/*"],

  "exclude": []

}


```

This `_routes.json` will invoke your Functions on all routes.

Below is another example of a `_routes.json` file. Any route inside the `/build` directory will not invoke the Function and will not incur a Functions invocation charge.

```

{

  "version": 1,

  "include": ["/*"],

  "exclude": ["/build/*"]

}


```

## Fail open / closed

If on the Workers Free plan, you can configure how Pages behaves when your daily free tier allowance of Pages Functions requests is exhausted. If, for example, you are performing authentication checks or other critical functionality in your Pages Functions, you may wish to disable your Pages project when the allowance is exhausted.

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Runtime** \> **Fail open / closed**.

"Fail open" means that static assets will continue to be served, even if Pages Functions would ordinarily have run first. "Fail closed" means an error page will be returned, rather than static assets.

The daily request limit for Pages Functions can be removed entirely by upgrading to [Workers Standard](https://developers.cloudflare.com/workers/platform/pricing/#workers).

### Limits

Functions invocation routes have the following limits:

* You must have at least one include rule.
* You may have no more than 100 include/exclude rules combined.
* Each rule may have no more than 100 characters.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/routing/#page","headline":"Routing · Cloudflare Pages docs","description":"Learn how Pages Functions uses file-based routing to map URL patterns to function files.","url":"https://developers.cloudflare.com/pages/functions/routing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/routing/","name":"Routing"}}]}
```
