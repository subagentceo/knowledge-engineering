---
title: Static HTML
description: Deploy any static HTML website to Cloudflare Pages without a framework.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Static HTML

Cloudflare supports deploying any static HTML website to Cloudflare Pages. If you manage your website without using a framework or static site generator, or if your framework is not listed in [Framework guides](https://developers.cloudflare.com/pages/framework-guides/), you can still deploy it using this guide.

## Before you continue

All of the framework guides assume you already have a fundamental understanding of [Git ↗](https://git-scm.com/). If you are new to Git, refer to this [summarized Git handbook ↗](https://guides.github.com/introduction/git-handbook/) on how to set up Git on your local machine.

If you clone with SSH, you must [generate SSH keys ↗](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) on each computer you use to push or pull from GitHub.

Refer to the [GitHub documentation ↗](https://guides.github.com/introduction/git-handbook/) and [Git documentation ↗](https://git-scm.com/book/en/v2) for more information.

## Create a GitHub repository

Create a new GitHub repository by visiting [repo.new ↗](https://repo.new). After creating a new repository, go to your newly created project directory to prepare and push your local application to GitHub by running the following commands in your terminal:

Terminal window

```

git init

git remote add origin https://github.com/<your-gh-username>/<repository-name>

git add .

git commit -m "Initial commit"

git branch -M main

git push -u origin main


```

## Deploy with Cloudflare Pages

To deploy your site to Pages:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**.
3. Select the **Pages** tab.
4. Select **Import an existing Git repository**.
5. Select the new GitHub repository that you created and then select **Begin setup**.
6. In the **Set up builds and deployments** section, provide the following information:

| Configuration option     | Value              |
| ------------------------ | ------------------ |
| Production branch        | main               |
| Build command (optional) | exit 0             |
| Build output directory   | <YOUR\_BUILD\_DIR> |

Unlike many of the framework guides, the build command and build output directory for your site are going to be completely custom. If you are not using a preset and do not need to build your site, use `exit 0` as your **Build command**. Cloudflare recommends using `exit 0` as your **Build command** to access features such as Pages Functions. The **Build output directory** is where your application's content lives.

After configuring your site, you can begin your first deploy. Your custom build command (if provided) will run, and Pages will deploy your static site.

Note

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](https://developers.cloudflare.com/pages/get-started/).

After you have deployed your site, you will receive a unique subdomain for your project on `*.pages.dev`. Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

Getting 404 errors on \*.pages.dev?

If you are getting `404` errors when visiting your `*.pages.dev` domain, make sure your website has a top-level file for `index.html`. This `index.html` is what Pages will serve on your apex with no page specified.

## Learn more

By completing this guide, you have successfully deployed your site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](https://developers.cloudflare.com/pages/framework-guides/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/framework-guides/deploy-anything/#page","headline":"Static HTML · Cloudflare Pages docs","description":"Deploy any static HTML website to Cloudflare Pages without a framework.","url":"https://developers.cloudflare.com/pages/framework-guides/deploy-anything/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/framework-guides/deploy-anything/","name":"Static HTML"}}]}
```
