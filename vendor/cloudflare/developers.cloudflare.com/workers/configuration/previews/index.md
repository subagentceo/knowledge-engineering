---
title: Preview URLs
description: Preview URLs allow you to preview new versions of your project without deploying it to production.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Preview URLs

# Overview

Preview URLs allow you to preview new versions of your Worker without deploying it to production.

There are two types of preview URLs:

* **Versioned Preview URLs**: A unique URL generated automatically for each new version of your Worker.
* **Aliased Preview URLs**: A static, human-readable alias that you can manually assign to a Worker version.

Both preview URL types follow the format: `<VERSION_PREFIX OR ALIAS>-<WORKER_NAME>.<SUBDOMAIN>.workers.dev`.

Preview URLs can be:

* Integrated into CI/CD pipelines, allowing automatic generation of preview environments for every pull request.
* Used for collaboration between teams to test code changes in a live environment and verify updates.
* Used to test new API endpoints, validate data formats, and ensure backward compatibility with existing services.

When testing zone level performance or security features for a version, we recommend using [version overrides](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/version-overrides/) so that your zone's performance and security settings apply.

Note

Preview URLs are only available for Worker versions uploaded after 2024-09-25.

## Types of Preview URLs

### Versioned Preview URLs

Every time you create a new [version](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#versions) of your Worker, a unique static version preview URL is generated automatically. These URLs use a version prefix and follow the format `<VERSION_PREFIX>-<WORKER_NAME>.<SUBDOMAIN>.workers.dev`.

New versions of a Worker are created when you run:

* [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy)
* [wrangler versions upload](https://developers.cloudflare.com/workers/wrangler/commands/general/#versions-upload)
* Or when you make edits via the Cloudflare dashboard

If Preview URLs have been enabled, they are public and available immediately after version creation.

Note

Minimum required Wrangler version: 3.74.0\. Check your version by running `wrangler --version`. To update Wrangler, refer to [Install/Update Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

#### View versioned preview URLs using Wrangler

The [wrangler versions upload](https://developers.cloudflare.com/workers/wrangler/commands/general/#versions-upload) command uploads a new [version](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/#versions) of your Worker and returns a preview URL for each version uploaded.

#### View versioned preview URLs on the Workers dashboard

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker.
3. Go to the **Deployments** tab, and find the version you would like to view.

### Aliased preview URLs

Aliased preview URLs let you assign a persistent, readable alias to a specific Worker version. These are useful for linking to stable previews across many versions (e.g. to share an upcoming but still actively being developed new feature). A common workflow would be to assign an alias for the branch that you're working on. These types of preview URLs follow the same pattern as other preview URLs:`<ALIAS>-<WORKER_NAME>.<SUBDOMAIN>.workers.dev`

Note

Minimum required Wrangler version: `4.21.0`. Check your version by running `wrangler --version`. To update Wrangler, refer to [Install/Update Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

#### Create an Alias

Aliases may be created during `versions upload`, by providing the `--preview-alias` flag with a valid alias name:

Terminal window

```

wrangler versions upload --preview-alias staging


```

The resulting alias would be associated with this version, and immediately available at:`staging-<WORKER_NAME>.<SUBDOMAIN>.workers.dev`

#### Rules and limitations

* Aliases may only be created during version upload.
* Aliases must use only lowercase letters, numbers, and dashes.
* Aliases must begin with a lowercase letter.
* The alias and Worker name combined (with a dash) must not exceed 63 characters due to DNS label limits.
* Only the 1000 most recently deployed aliases are retained. When a new alias is created beyond this limit, the least recently deployed alias is deleted.

## Manage access to Preview URLs

When enabled, all preview URLs are available publicly. You can use [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) to require visitors to authenticate before accessing preview URLs. You can limit access to yourself, your teammates, your organization, or anyone else you specify in your [access policy](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/).

To limit your preview URLs to authorized emails only:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your Worker.
3. Go to **Settings** \> **Domains & Routes**.
4. For Preview URLs, click **Enable Cloudflare Access**.
5. Optionally, to configure the Access application, click **Manage Cloudflare Access**. There, you can change the email addresses you want to authorize. View [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/#selectors) to learn about configuring alternate rules.
6. [Validate the Access JWT ↗](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/#cloudflare-workers-example) in your Worker script using the audience (`aud`) tag and JWKs URL provided.

## Toggle Preview URLs (Enable or Disable)

Note:

* Preview URLs are enabled by default when `workers_dev` is enabled.
* Preview URLs are disabled by default when `workers_dev` is disabled.
* Disabling Preview URLs will disable routing to both versioned and aliased preview URLs.

### From the Dashboard

To toggle Preview URLs for a Worker:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. In **Overview**, select your Worker.
3. Go to **Settings** \> **Domains & Routes**.
4. For Preview URLs, click **Enable** or **Disable**.
5. Confirm your action.

### From the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/)

Note

Wrangler 3.91.0 or higher is required to use this feature.

Note

Older Wrangler versions will default to Preview URLs being enabled.

To toggle Preview URLs for a Worker, include any of the following in your Worker's Wrangler file:

* [  wrangler.jsonc ](#tab-panel-11475)
* [  wrangler.toml ](#tab-panel-11476)

JSONC

```

{

  "preview_urls": true

}


```

TOML

```

preview_urls = true


```

* [  wrangler.jsonc ](#tab-panel-11477)
* [  wrangler.toml ](#tab-panel-11478)

JSONC

```

{

  "preview_urls": false

}


```

TOML

```

preview_urls = false


```

If not given, `preview_urls = workers_dev` is the default.

Warning

If you enable or disable Preview URLs in the Cloudflare dashboard, but do not update your Worker's Wrangler file accordingly, the Preview URLs status will change the next time you deploy your Worker with Wrangler.

## Limitations

* Preview URLs are not generated for Workers that implement a [Durable Object](https://developers.cloudflare.com/durable-objects/).
* Preview URLs are not currently generated for [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/) [user Workers](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#user-workers). This is a temporary limitation, we are working to remove it.
* You cannot currently configure Preview URLs to run on a subdomain other than [workers.dev](https://developers.cloudflare.com/workers/configuration/routing/workers-dev/).
* You cannot view logs for Preview URLs today, this includes Workers Logs, Wrangler tail and Logpush.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/configuration/previews/#page","headline":"Preview URLs · Cloudflare Workers docs","description":"Preview URLs allow you to preview new versions of your project without deploying it to production.","url":"https://developers.cloudflare.com/workers/configuration/previews/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-11","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/previews/","name":"Preview URLs"}}]}
```
