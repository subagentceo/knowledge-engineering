---
title: Build configuration
description: Set build commands, output directories, and framework presets for Cloudflare Pages projects.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build configuration

You may tell Cloudflare Pages how your site needs to be built as well as where its output files will be located.

## Build commands and directories

You should provide a build command to tell Cloudflare Pages how to build your application. For projects not listed here, consider reading the tool's documentation or framework, and submit a pull request to add it here.

Build directories indicates where your project's build command outputs the built version of your Cloudflare Pages site. Often, this defaults to the industry-standard `public`, but you may find that you need to customize it.

Understanding your build configuration

The build command is provided by your framework. For example, the Gatsby framework uses `gatsby build` as its build command. When you are working without a framework, leave the **Build command** field blank. Pages determines whether a build has succeeded or failed by reading the exit code returned from the user supplied build command. Any non-zero return code will cause a build to be marked as failed. An exit code of 0 will cause the Pages build to be marked as successful and assets will be uploaded regardless of if error logs are written to standard error.

The build directory is generated from the build command. Each framework has its own naming convention, for example, the build output directory is named `/public` for many frameworks.

The root directory is where your site’s content lives. If not specified, Cloudflare assumes that your linked git repository is the root directory. The root directory needs to be specified in cases like monorepos, where there may be multiple projects in one repository.

## Framework presets

Cloudflare maintains a list of build configurations for popular frameworks and tools. These are accessible during project creation. Below are some standard build commands and directories for popular frameworks and tools.

If you are not using a preset, use `exit 0` as your **Build command**.

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

## Environment variables

If your project makes use of environment variables to build your site, you can provide custom environment variables:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Select **Settings** \> **Environment variables**.

The following system environment variables are injected by default (but can be overridden):

| Environment Variable   | Injected value                      | Example use-case                                                                      |
| ---------------------- | ----------------------------------- | ------------------------------------------------------------------------------------- |
| CI                     | true                                | Changing build behaviour when run on CI versus locally                                |
| CF\_PAGES              | 1                                   | Changing build behaviour when run on Pages versus locally                             |
| CF\_PAGES\_COMMIT\_SHA | <sha1-hash-of-current-commit>       | Passing current commit ID to error reporting, for example, Sentry                     |
| CF\_PAGES\_BRANCH      | <branch-name-of-current-deployment> | Customizing build based on branch, for example, disabling debug logging on production |
| CF\_PAGES\_URL         | <url-of-current-deployment>         | Allowing build tools to know the URL the page will be deployed at                     |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/configuration/build-configuration/#page","headline":"Build configuration · Cloudflare Pages docs","description":"Set build commands, output directories, and framework presets for Cloudflare Pages projects.","url":"https://developers.cloudflare.com/pages/configuration/build-configuration/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/configuration/build-configuration/","name":"Build configuration"}}]}
```
