---
title: Add a custom domain to a branch
description: Point a custom domain to a specific branch deployment of your Cloudflare Pages project.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add a custom domain to a branch

In this guide, you will learn how to add a custom domain (`staging.example.com`) that will point to a specific branch (`staging`) on your Pages project.

This will allow you to have a custom domain that will always show the latest build for a specific branch on your Pages project.

Note

This setup is only supported when using a proxied Cloudflare DNS record.

If you attempt to follow this guide using an external DNS provider or an unproxied DNS record, your custom alias will be sent to the production branch of your Pages project.

First, make sure that you have a successful deployment on the branch you would like to set up a custom domain for.

Next, add a custom domain under your Pages project for your desired custom domain, for example, `staging.example.com`.

![Follow the instructions below to access the custom domains overview in the Pages dashboard.](https://developers.cloudflare.com/_astro/pages_custom_domain-1.CiOZm32-_ZsGTtK.webp) 

To do this:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Select **Custom domains** \> **Setup a custom domain**.
4. Input the domain you would like to use, such as `staging.example.com`
5. Select **Continue** \> **Activate domain**
![After selecting your custom domain, you will be asked to activate it.](https://developers.cloudflare.com/_astro/pages_custom_domain-2.BTtd80-v_PiF5f.webp) 

After activating your custom domain, go to [DNS ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns) for the `example.com` zone and find the `CNAME` record with the name `staging` and change the target to include your branch alias.

In this instance, change `your-project.pages.dev` to `staging.your-project.pages.dev`.

![After activating your custom domain, change the CNAME target to include your branch name.](https://developers.cloudflare.com/_astro/pages_custom_domain-3.DhnYG8VS_17qKV4.webp) 

Now the `staging` branch of your Pages project will be available on `staging.example.com`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/how-to/custom-branch-aliases/#page","headline":"Add a custom domain to a branch · Cloudflare Pages docs","description":"Point a custom domain to a specific branch deployment of your Cloudflare Pages project.","url":"https://developers.cloudflare.com/pages/how-to/custom-branch-aliases/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/how-to/custom-branch-aliases/","name":"Add a custom domain to a branch"}}]}
```
