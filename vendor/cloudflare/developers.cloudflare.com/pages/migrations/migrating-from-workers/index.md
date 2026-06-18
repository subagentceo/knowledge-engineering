---
title: Migrating from Workers Sites to Pages
description: Learn how to migrate from Workers Sites to Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Migrating from Workers Sites to Pages

**Last reviewed:**  almost 6 years ago 

In this tutorial, you will learn how to migrate an existing [Cloudflare Workers Sites](https://developers.cloudflare.com/workers/configuration/sites/) application to Cloudflare Pages.

As a prerequisite, you should have a Cloudflare Workers Sites project, created with [Wrangler ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler).

Cloudflare Pages provides built-in defaults for every aspect of serving your site. You can port custom behavior in your Worker — such as custom caching logic — to your Cloudflare Pages project using [Functions](https://developers.cloudflare.com/pages/functions/). This enables an easy-to-use, file-based routing system. You can also migrate your custom headers and redirects to Pages.

You may already have a reasonably complex Worker and/or it would be tedious to splice it up into Pages' file-based routing system. For these cases, Pages offers developers the ability to define a `_worker.js` file in the output directory of your Pages project.

Note

When using a `_worker.js` file, the entire `/functions` directory is ignored - this includes its routing and middleware characteristics. Instead, the `_worker.js` file is deployed as is and must be written using the [Module Worker syntax](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/).

By migrating to Cloudflare Pages, you will be able to access features like [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) and automatic branch deploys with no extra configuration needed.

## Remove unnecessary code

Workers Sites projects consist of the following pieces:

1. An application built with a [static site tool](https://developers.cloudflare.com/pages/how-to/) or a static collection of HTML, CSS and JavaScript files.
2. If using a static site tool, a build directory (called `bucket` in the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/)) where the static project builds your HTML, CSS, and JavaScript files.
3. A Worker application for serving that build directory. For most projects, this is likely to be the `workers-site` directory.

When moving to Cloudflare Pages, remove the Workers application and any associated Wrangler configuration files or build output. Instead, note and record your `build` command (if you have one), and the `bucket` field, or build directory, from the Wrangler file in your project's directory.

## Migrate headers and redirects

You can migrate your redirects to Pages, by creating a `_redirects` file in your output directory. Pages currently offers limited support for advanced redirects. More support will be added in the future. For a list of support types, refer to the [Redirects documentation](https://developers.cloudflare.com/pages/configuration/redirects/).

Note

A project is limited to 2,000 static redirects and 100 dynamic redirects, for a combined total of 2,100 redirects. Each redirect declaration has a 1,000-character limit. Malformed definitions are ignored. If there are multiple redirects for the same source path, the topmost redirect is applied.

Make sure that static redirects are before dynamic redirects in your `_redirects` file.

In addition to a `_redirects` file, Cloudflare also offers [Bulk Redirects](https://developers.cloudflare.com/pages/configuration/redirects/#surpass-%5Fredirects-limits), which handles redirects that surpasses the 2,100 redirect rules limit set by Pages.

Your custom headers can also be moved into a `_headers` file in your output directory. It is important to note that custom headers defined in the `_headers` file are not currently applied to responses from Functions, even if the Function route matches the URL pattern. To learn more about handling headers, refer to [Headers](https://developers.cloudflare.com/pages/configuration/headers/).

## Create a new Pages project

### Connect to your git provider

After you have recorded your **build command** and **build directory** in a separate location, remove everything else from your application, and push the new version of your project up to your git provider. Follow the [Get started guide](https://developers.cloudflare.com/pages/get-started/) to add your project to Cloudflare Pages, using the **build command** and **build directory** that you saved earlier.

If you choose to use a custom domain for your Pages project, you can set it to the same custom domain as your currently deployed Workers application. Follow the steps for [adding a custom domain](https://developers.cloudflare.com/pages/configuration/custom-domains/#add-a-custom-domain) to your Pages project.

Note

Before you deploy, you will need to delete your old Workers routes to start sending requests to Cloudflare Pages.

### Using Direct Upload

If your Workers site has its custom build settings, you can bring your prebuilt assets to Pages with [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/). In addition, you can serve your website's assets right to the Cloudflare global network by either using the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) or the drag and drop option.

These options allow you to create and name a new project from the CLI or dashboard. After your project deployment is complete, you can set the custom domain by following the [adding a custom domain](https://developers.cloudflare.com/pages/configuration/custom-domains/#add-a-custom-domain) steps to your Pages project.

## Cleaning up your old application and assigning the domain

After you have deployed your Pages application, to delete your Worker:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Worker.
3. Go to **Manage** \> **Delete Worker**.

With your Workers application removed, requests will go to your Pages application. You have successfully migrated your Workers Sites project to Cloudflare Pages by completing this guide.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/migrations/migrating-from-workers/#page","headline":"Migrating from Workers Sites to Pages · Cloudflare Pages docs","description":"Learn how to migrate from Workers Sites to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/migrations/migrating-from-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/migrations/","name":"Migration guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/migrations/migrating-from-workers/","name":"Migrating from Workers Sites to Pages"}}]}
```
