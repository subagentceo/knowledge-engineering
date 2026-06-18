---
title: Deploy a static WordPress site
description: Learn how to deploy a static WordPress site using Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Deploy a static WordPress site

**Last reviewed:**  about 3 years ago 

## Overview

In this guide, you will use a WordPress plugin, [Simply Static ↗](https://wordpress.org/plugins/simply-static/), to convert your existing WordPress site to a static website deployed with Cloudflare Pages.

## Prerequisites

This guide assumes that you are:

* The Administrator account on your WordPress site.
* Able to install WordPress plugins on the site.

## Setup

To start, install the [Simply Static ↗](https://wordpress.org/plugins/simply-static/) plugin to export your WordPress site. In your WordPress dashboard, go to **Plugins** \> **Add New**.

Search for `Simply Static` and confirm that the resulting plugin that you will be installing matches the plugin below.

![Simply Static plugin](https://developers.cloudflare.com/_astro/simply-static.B1STKlmC_ZgrRwz.webp) 

Select **Install** on the plugin. After it has finished installing, select **Activate**.

### Export your WordPress site

After you have installed the plugin, go to your WordPress dashboard > **Simply Static** \> **GENERATE STATIC FILES**.

In the **Activity Log**, find the **ZIP archive created** message and select **Click here to download** to download your ZIP file.

### Deploy your WordPress site with Pages

With your ZIP file downloaded, deploy your site to Pages:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application** \> **Pages** \> **Use direct upload**.
3. Name your project, then select **Create project**.
4. Drag and drop your ZIP file (or unzipped folder of assets) or select it from your computer.
5. After your files have been uploaded, select **Deploy site**.

Your WordPress site will now be live on Pages.

Every time you make a change to your WordPress site, you will need to download a new ZIP file from the WordPress dashboard and redeploy to Cloudflare Pages. Automatic updates are not available with the free version of Simply Static.

## Limitations

There are some features available in WordPress sites that will not be supported in a static site environment:

* WordPress Forms.
* WordPress Comments.
* Any links to `/wp-admin` or similar internal WordPress routes.

## Conclusion

By following this guide, you have successfully deployed a static version of your WordPress site to Cloudflare Pages.

With a static version of your site being served, you can:

* Move your WordPress site to a custom domain or subdomain. Refer to [Custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/) to learn more.
* Run your WordPress instance locally, or put your WordPress site behind [Cloudflare Access](https://developers.cloudflare.com/pages/configuration/preview-deployments/#customize-preview-deployments-access) to only give access to your contributors. This has a significant effect on the number of attack vectors for your WordPress site and its content.
* Downgrade your WordPress hosting plan to a cheaper plan. Because the memory and bandwidth requirements for your WordPress instance are now smaller, you can often host it on a cheaper plan, or moving to shared hosting.

Connect with the [Cloudflare Developer community on Discord ↗](https://discord.cloudflare.com) to ask questions and discuss the platform with other developers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/how-to/deploy-a-wordpress-site/#page","headline":"Deploy a static WordPress site · Cloudflare Pages docs","description":"Learn how to deploy a static WordPress site using Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/how-to/deploy-a-wordpress-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["WordPress"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/how-to/deploy-a-wordpress-site/","name":"Deploy a static WordPress site"}}]}
```
