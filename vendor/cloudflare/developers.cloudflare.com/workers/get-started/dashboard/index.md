---
title: Dashboard
description: Create and deploy a Cloudflare Worker using the Cloudflare dashboard.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Dashboard

Follow this guide to create a Workers application using the Cloudflare dashboard.

Try the Playground

The quickest way to experiment with Cloudflare Workers is in the [Playground ↗](https://workers.cloudflare.com/playground). The Playground does not require any setup. It is an instant way to preview and test a Worker directly in the browser.

## Prerequisites

[Create a Cloudflare account](https://developers.cloudflare.com/fundamentals/account/create-account/), if you have not already.

## Setup

To get started with a new Workers application:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**. From here, you can:  
   * Select from the gallery of production-ready templates  
   * Import an existing Git repository on your own account  
   * Let Cloudflare clone and bootstrap a public repository containing a Workers application.
3. Once you have connected to your chosen [Git provider](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/), configure your project and select **Deploy**.
4. Cloudflare will kick off a new build and deployment. Once deployed, preview your Worker at its provided `workers.dev` subdomain.

## Continue development

Applications started in the dashboard are set up with Git to help kickstart your development workflow. To continue developing on your repository, you can run:

Terminal window

```

# clone your repository locally

git clone <git repo URL>


# make sure you are in the root directory

cd <directory>


```

Now, you can preview and test your changes by [running Wrangler in your local development environment](https://developers.cloudflare.com/workers/development-testing/). Once you are ready to deploy you can run:

Terminal window

```

# adds the files to git tracking

git add .


# commits the changes

git commit -m "your message"


# push the changes to your Git provider

git push origin main


```

To do more:

* Review our [Examples](https://developers.cloudflare.com/workers/examples/) and [Tutorials](https://developers.cloudflare.com/workers/tutorials/) for inspiration.
* Set up [bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) to allow your Worker to interact with other resources and unlock new functionality.
* Learn how to [test and debug](https://developers.cloudflare.com/workers/testing/) your Workers.
* Read about [Workers limits and pricing](https://developers.cloudflare.com/workers/platform/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/get-started/dashboard/#page","headline":"Get started - Dashboard · Cloudflare Workers docs","description":"Create and deploy a Cloudflare Worker using the Cloudflare dashboard.","url":"https://developers.cloudflare.com/workers/get-started/dashboard/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/get-started/","name":"Getting started"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/get-started/dashboard/","name":"Dashboard"}}]}
```
