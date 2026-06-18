---
title: C3 CLI
description: Use C3 (`create-cloudflare` CLI) to set up and deploy new applications using framework-specific setup guides to ensure each new application follows Cloudflare and any third-party best practices for deployment.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# C3 CLI

Cloudflare provides a CLI command for creating new Workers and Pages projects — `npm create cloudflare`, powered by the [create-cloudflare package ↗](https://www.npmjs.com/package/create-cloudflare).

## Create a new application

Open a terminal window and run:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- --platform=pages
```

```
yarn create cloudflare --platform=pages
```

```
pnpm create cloudflare@latest --platform=pages
```

Running this command will prompt you to install the [create-cloudflare ↗](https://www.npmjs.com/package/create-cloudflare) package, and then ask you questions about the type of application you wish to create.

Note

To create a Pages project you must now specify the `--platform=pages` arg, otherwise C3 will always create a Workers project.

## Web frameworks

If you choose the "Framework Starter" option, you will be prompted to choose a framework to use. The following frameworks are currently supported:

* [Angular](https://developers.cloudflare.com/pages/framework-guides/deploy-an-angular-site/)
* [Astro](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)
* [Docusaurus](https://developers.cloudflare.com/pages/framework-guides/deploy-a-docusaurus-site/)
* [Gatsby](https://developers.cloudflare.com/pages/framework-guides/deploy-a-gatsby-site/)
* [Hono](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hono-site/)
* [Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
* [Nuxt](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nuxt-site/)
* [Qwik](https://developers.cloudflare.com/pages/framework-guides/deploy-a-qwik-site/)
* [React](https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/)
* [Redwood](https://developers.cloudflare.com/workers/framework-guides/web-apps/redwoodsdk/)
* [Remix](https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/)
* [SolidStart](https://developers.cloudflare.com/pages/framework-guides/deploy-a-solid-start-site/)
* [SvelteKit](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/)
* [Vue](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vue-site/)

When you use a framework, `npm create cloudflare` directly uses the framework's own command for generating a new projects, which may prompt additional questions. This ensures that the project you create is up-to-date with the latest version of the framework, and you have all the same options when creating you project via `npm create cloudflare` that you would if you created your project using the framework's tooling directly.

## Deploy

Once your project has been configured, you will be asked if you would like to deploy the project to Cloudflare. This is optional.

If you choose to deploy, you will be asked to sign into your Cloudflare account (if you aren't already), and your project will be deployed.

## Creating a new Pages project that is connected to a git repository

To create a new project using `npm create cloudflare`, and then connect it to a Git repository on your Github or Gitlab account, take the following steps:

1. Run `npm create cloudflare@latest`, and choose your desired options
2. Select `no` to the prompt, "Do you want to deploy your application?". This is important — if you select `yes` and deploy your application from your terminal ([Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/)), then it will not be possible to connect this Pages project to a git repository later on. You will have to create a new Cloudflare Pages project.
3. Create a new git repository, using the application that `npm create cloudflare@latest` just created for you.
4. Follow the steps outlined in the [Git integration guide](https://developers.cloudflare.com/pages/get-started/git-integration/)

## CLI Arguments

C3 collects any required input through a series of interactive prompts. You may also specify your choices via command line arguments, which will skip these prompts. To use C3 in a non-interactive context such as CI, you must specify all required arguments via the command line.

This is the full format of a C3 invocation alongside the possible CLI arguments:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- --platform=pages [<DIRECTORY>] [OPTIONS] [-- <NESTED ARGS...>]
```

```
yarn create cloudflare --platform=pages [<DIRECTORY>] [OPTIONS] [-- <NESTED ARGS...>]
```

```
pnpm create cloudflare@latest --platform=pages [<DIRECTORY>] [OPTIONS] [-- <NESTED ARGS...>]
```

* `DIRECTORY` ` string ` optional  
   * The directory where the application should be created. The name of the application is taken from the directory name.
* `NESTED ARGS..` ` string[] ` optional  
   * CLI arguments to pass to eventual third party CLIs C3 might invoke (in the case of full-stack applications).
* `--category` ` string ` optional  
   * The kind of templates that should be created.  
   * The possible values for this option are:  
         * `hello-world`: Hello World example  
         * `web-framework`: Framework Starter  
         * `demo`: Application Starter  
         * `remote-template`: Template from a GitHub repo
* `--type` ` string ` optional  
   * The type of application that should be created.  
   * The possible values for this option are:  
         * `hello-world`: A basic "Hello World" Cloudflare Worker.  
         * `hello-world-durable-object`: A [Durable Object](https://developers.cloudflare.com/durable-objects/) and a Worker to communicate with it.  
         * `common`: A Cloudflare Worker which implements a common example of routing/proxying functionalities.  
         * `scheduled`: A scheduled Cloudflare Worker (triggered via [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/)).  
         * `queues`: A Cloudflare Worker which is both a consumer and produced of [Queues](https://developers.cloudflare.com/queues/).  
         * `openapi`: A Worker implementing an OpenAPI REST endpoint.  
         * `pre-existing`: Fetch a Worker initialized from the Cloudflare dashboard.
* `--framework` ` string ` optional  
   * The type of framework to use to create a web application (when using this option, `--type` is ignored).  
   * The possible values for this option are:  
         * `angular`  
         * `astro`  
         * `docusaurus`  
         * `gatsby`  
         * `hono`  
         * `next`  
         * `nuxt`  
         * `qwik`  
         * `react`  
         * `redwood`  
         * `remix`  
         * `solid`  
         * `svelte`  
         * `vue`
* `--template` ` string ` optional  
   * Create a new project via an external template hosted in a git repository  
   * The value for this option may be specified as any of the following:  
         * `user/repo`  
         * `git@github.com:user/repo`  
         * `https://github.com/user/repo`  
         * `user/repo/some-template` (subdirectories)  
         * `user/repo#canary` (branches)  
         * `user/repo#1234abcd` (commit hash)  
         * `bitbucket:user/repo` (BitBucket)  
         * `gitlab:user/repo` (GitLab)  
   See the `degit` [docs ↗](https://github.com/Rich-Harris/degit) for more details.  
   At a minimum, templates must contain the following:  
         * `package.json`  
         * [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/)  
         * `src/` containing a worker script referenced from the Wrangler configuration file  
   See the [templates folder ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare/templates) of this repo for more examples.
* `--deploy` ` boolean ` (default: true) optional  
   * Deploy your application after it has been created.
* `--lang` ` string ` (default: ts) optional  
   * The programming language of the template.  
   * The possible values for this option are:  
         * `ts`  
         * `js`  
         * `python`
* `--ts` ` boolean ` (default: true) optional  
   * Use TypeScript in your application. Deprecated. Use `--lang=ts` instead.
* `--git` ` boolean ` (default: true) optional  
   * Initialize a local git repository for your application.
* `--open` ` boolean ` (default: true) optional  
   * Open with your browser the deployed application (this option is ignored if the application is not deployed).
* `--existing-script` ` string ` optional  
   * The name of an existing Cloudflare Workers script to clone locally. When using this option, `--type` is coerced to `pre-existing`.  
   * When `--existing-script` is specified, `deploy` will be ignored.
* `-y`, `--accept-defaults` ` boolean ` optional  
   * Use all the default C3 options each can also be overridden by specifying it.
* `--auto-update` ` boolean ` (default: true) optional  
   * Automatically uses the latest version of C3.
* `-v`, `--version` ` boolean ` optional  
   * Show version number.
* `-h`, `--help` ` boolean ` optional  
   * Show a help message.

Note

All the boolean options above can be specified with or without a value, for example `--open` and `--open true` have the same effect, prefixing `no-` to the option's name negates it, so for example `--no-open` and `--open false` have the same effect.

## Telemetry

Cloudflare collects anonymous usage data to improve `create-cloudflare` over time. Read more about this in our [data policy ↗](https://github.com/cloudflare/workers-sdk/blob/main/packages/create-cloudflare/telemetry.md).

You can opt-out if you do not wish to share any information.

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- telemetry disable
```

```
yarn create cloudflare telemetry disable
```

```
pnpm create cloudflare@latest telemetry disable
```

Alternatively, you can set an environment variable:

Terminal window

```

export CREATE_CLOUDFLARE_TELEMETRY_DISABLED=1


```

You can check the status of telemetry collection at any time.

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- telemetry status
```

```
yarn create cloudflare telemetry status
```

```
pnpm create cloudflare@latest telemetry status
```

You can always re-enable telemetry collection.

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- telemetry enable
```

```
yarn create cloudflare telemetry enable
```

```
pnpm create cloudflare@latest telemetry enable
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/get-started/c3/#page","headline":"Create projects with C3 CLI · Cloudflare Pages docs","description":"Use C3 (create-cloudflare CLI) to set up and deploy new applications using framework-specific setup guides to ensure each new application follows Cloudflare and any third-party best practices for deployment.","url":"https://developers.cloudflare.com/pages/get-started/c3/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/get-started/","name":"Getting started"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/get-started/c3/","name":"C3 CLI"}}]}
```
