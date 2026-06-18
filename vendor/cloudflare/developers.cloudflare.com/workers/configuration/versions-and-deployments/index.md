---
title: Versions &amp; Deployments
description: Upload versions of Workers and create deployments to release new versions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Versions & Deployments

Versions track changes to your Worker. Deployments configure how those changes are deployed to your traffic.

You can upload changes (versions) to your Worker independent of changing the version that is actively serving traffic (deployment).

![Versions and Deployments](https://developers.cloudflare.com/_astro/versions-and-deployments.Dnwtp7bX_1XrgKm.webp) 

Using versions and deployments is useful if:

* You are running critical applications on Workers and want to reduce risk when deploying new versions of your Worker using a rolling deployment strategy.
* You want to monitor for performance differences when deploying new versions of your Worker.
* You have a CI/CD pipeline configured for Workers but want to cut manual releases.

## Versions

A version is defined by the state of code as well as the state of configuration in a Worker's [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). Versions track historical changes to [bundled code](https://developers.cloudflare.com/workers/wrangler/bundling/), [static assets](https://developers.cloudflare.com/workers/static-assets/) and changes to configuration like [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) and [compatibility date and compatibility flags](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) over time.

Versions also track metadata associated with a version, including: the version ID, the user that created the version, deploy source, and timestamp. Optionally, a version message and version tag can be configured on version upload.

Note

State changes for associated Workers [storage resources](https://developers.cloudflare.com/workers/platform/storage-options/) such as [KV](https://developers.cloudflare.com/kv/), [R2](https://developers.cloudflare.com/r2/), [Durable Objects](https://developers.cloudflare.com/durable-objects/) and [D1](https://developers.cloudflare.com/d1/) are not tracked with versions.

## Deployments

Deployments track the version(s) of your Worker that are actively serving traffic. A deployment can consist of one or two versions of a Worker.

By default, Workers supports an all-at-once deployment model where traffic is immediately shifted from one version to the newly deployed version automatically. Alternatively, you can use [gradual deployments](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/) to create a rolling deployment strategy.

You can also track metadata associated with a deployment, including: the user that created the deployment, deploy source, timestamp and the version(s) in the deployment. Optionally, you can configure a deployment message when you create a deployment.

## Use versions and deployments

### Create a new version

Review the different ways you can create versions of your Worker and deploy them.

#### Upload a new version and deploy it immediately

A new version that is automatically deployed to 100% of traffic when:

* Changes are uploaded with [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) via the Cloudflare dashboard
* Changes are deployed with the command [npx wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) via [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds)
* Changes are uploaded with the [Workers Script Upload API](https://developers.cloudflare.com/api/resources/workers/subresources/scripts/methods/update/)

#### Upload a new version to be gradually deployed or deployed at a later time

Note

Wrangler versions before 3.73.0 require you to specify a `--x-versions` flag.

To create a new version of your Worker that is not deployed immediately, use the [wrangler versions upload](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-upload) command or create a new version in the Cloudflare dashboard code editor by selecting **Edit code**, then the **Save** option from the **Deploy** button dropdown.

Versions created in this way can then be deployed all at once or gradually deployed using the [wrangler versions deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-deploy) command or via the Cloudflare dashboard under the **Deployments** tab.

Note

When using [Wrangler](https://developers.cloudflare.com/workers/wrangler/), changes made to a Worker's triggers [routes, domains](https://developers.cloudflare.com/workers/configuration/routing/) or [cron triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) need to be applied with the command [wrangler triggers deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#triggers-deploy).

Note

New versions are not created when you make changes to [resources connected to your Worker](https://developers.cloudflare.com/workers/runtime-apis/bindings/). For example, if two Workers (Worker A and Worker B) are connected via a [service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/), changing the code of Worker B will not create a new version of Worker A. Changing the code of Worker B will only create a new version of Worker B. Changes to the service binding (such as, deleting the binding or updating the [environment](https://developers.cloudflare.com/workers/wrangler/environments/) it points to) on Worker A will also not create a new version of Worker B.

#### Directly manage Versions and Deployments

See examples of creating a Worker, Versions, and Deployments directly with the API, library SDKs, and Terraform in [Infrastructure as Code](https://developers.cloudflare.com/workers/platform/infrastructure-as-code/).

### View versions and deployments

#### Via Wrangler

Wrangler allows you to view the 100 most recent versions and deployments. Refer to the [versions list](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-list) and [deployments list](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deployments-list) documentation to view the commands.

#### Via the Cloudflare dashboard

To view your deployments in the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker > **Deployments**.

## Limits

### First upload

You must use [C3](https://developers.cloudflare.com/workers/get-started/guide/#1-create-a-new-worker-project) or [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) the first time you create a new Workers project. Using [wrangler versions upload](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-upload) the first time you upload a Worker will fail.

### Service worker syntax

Service worker syntax is not supported for versions that are uploaded through [wrangler versions upload](https://developers.cloudflare.com/workers/wrangler/commands/workers/#versions-upload). You must use ES modules format.

Refer to [Migrate from Service Workers to ES modules](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/#advantages-of-migrating) to learn how to migrate your Workers from the service worker format to the ES modules format.

### Durable Object migrations

Uploading a version with [Durable Object migrations](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) is not supported. Use [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/workers/#deploy) if you are applying a [Durable Object migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#page","headline":"Versions & Deployments · Cloudflare Workers docs","description":"Upload versions of Workers and create deployments to release new versions.","url":"https://developers.cloudflare.com/workers/configuration/versions-and-deployments/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/versions-and-deployments/","name":"Versions & Deployments"}}]}
```
