---
title: Rollbacks
description: Revert to an older version of your Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Rollbacks

You can roll back to a previously deployed [version](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#versions) of your Worker using [Wrangler](https://developers.cloudflare.com/workers/wrangler/commands/general/#rollback) or the Cloudflare dashboard. Rolling back to a previous version of your Worker will immediately create a new [deployment](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#deployments) with the version specified and become the active deployment across all your deployed routes and domains.

You can roll back from any deployment, including:

* A single-version deployment (rolling back replaces the current version with the selected version).
* A [split deployment](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/) with two versions (rolling back replaces both versions with the selected version at 100% traffic).

## Via Wrangler

To roll back to a specified version of your Worker via Wrangler, use the [wrangler rollback](https://developers.cloudflare.com/workers/wrangler/commands/general/#rollback) command.

## Via the Cloudflare Dashboard

To roll back to a specified version of your Worker via the Cloudflare dashboard:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker > **Deployments**.
3. Select the three dot icon on the right of the version you would like to roll back to and select **Rollback**.

## Rolling back from a split deployment

If you are using a [gradual deployment](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/gradual-deployments/) with two versions splitting traffic, rolling back will:

1. Replace the split deployment with a single-version deployment.
2. Route 100% of traffic to the version you selected for rollback.

This effectively promotes one version to handle all traffic, which is useful if you notice issues with one of the versions in your split deployment and want to revert to a stable version immediately.

To roll back from a split deployment:

1. Identify which version in your split deployment is stable and performing correctly.
2. Use the [rollback procedure](#via-wrangler) or [dashboard rollback](#via-the-cloudflare-dashboard) to roll back to that version.
3. The split deployment will be replaced with the selected version at 100% traffic.

Warning

**[Resources connected to your Worker](https://developers.cloudflare.com/workers/runtime-apis/bindings/) will not be changed during a rollback.**

Errors could occur if using code for a prior version if the structure of data has changed between the version in the active deployment and the version selected to rollback to.

## Limits

### Rollbacks limit

You can only roll back to the 100 most recently published versions.

Note

When using Wrangler in interactive mode, you can select from up to 100 recent versions. To roll back to a specific version, you can also specify the version ID directly on the command line. Refer to the [wrangler rollback](https://developers.cloudflare.com/workers/wrangler/commands/general/#rollback) documentation for details on specifying version IDs.

### Bindings

You cannot roll back to a previous version of your Worker if the [Cloudflare Developer Platform resources](https://developers.cloudflare.com/workers/runtime-apis/bindings/) (such as [KV](https://developers.cloudflare.com/kv/) and [D1](https://developers.cloudflare.com/d1/)) have been deleted or modified between the version selected to roll back to and the version in the active deployment. Specifically, rollbacks will not be allowed if:

* A [Durable Object migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) has occurred between the version in the active deployment and the version selected to roll back to.
* If the target deployment has a [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to an R2 bucket, KV namespace, or queue that no longer exists.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/configuration/versions-and-deployments/rollbacks/#page","headline":"Rollbacks · Cloudflare Workers docs","description":"Revert to an older version of your Worker.","url":"https://developers.cloudflare.com/workers/configuration/versions-and-deployments/rollbacks/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/versions-and-deployments/","name":"Versions & Deployments"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/configuration/versions-and-deployments/rollbacks/","name":"Rollbacks"}}]}
```
