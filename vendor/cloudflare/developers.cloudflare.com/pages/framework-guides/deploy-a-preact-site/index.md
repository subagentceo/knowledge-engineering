---
title: Preact
description: Deploy a Preact application to Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Preact

[Preact ↗](https://preactjs.com) is a popular, open-source framework for building modern web applications. Preact can also be used as a lightweight alternative to React because the two share the same API and component model.

In this guide, you will create a new Preact application and deploy it using Cloudflare Pages. You will use [create-preact ↗](https://github.com/preactjs/create-preact), a lightweight project scaffolding tool to set up a new Preact app in seconds.

## Setting up a new project

Create a new project by running the [npm init ↗](https://docs.npmjs.com/cli/v6/commands/npm-init) command in your terminal, giving it a title:

Terminal window

```

npm init preact

cd your-project-name


```

Note

During initialization, you can accept the `Prerender app (SSG)?` option to have `create-preact` scaffold your app to produce static HTML pages, along with their assets, for production builds. This option is perfect for Pages.

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

| Configuration option | Value         |
| -------------------- | ------------- |
| Production branch    | main          |
| Build command        | npm run build |
| Build directory      | dist          |

Optionally, you can customize the **Project name** field. It defaults to the GitHub repository's name, but it does not need to match. The **Project name** value is assigned as your `*.pages.dev` subdomain.

After completing configuration, select **Save and Deploy**.

You will see your first deploy pipeline in progress. Pages installs all dependencies and builds the project as specified.

After you have deployed your site, you will receive a unique subdomain for your project on `*.pages.dev`.

Cloudflare Pages will automatically rebuild your project and deploy it on every new pushed commit.

Additionally, you will have access to [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/), which repeat the build-and-deploy process for pull requests. With these, you can preview changes to your project with a real URL before deploying them to production.

Note

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](https://developers.cloudflare.com/pages/get-started/).

## Learn more

By completing this guide, you have successfully deployed your Preact site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](https://developers.cloudflare.com/pages/framework-guides/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-preact-site/#page","headline":"Preact · Cloudflare Pages docs","description":"Deploy a Preact application to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-preact-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/framework-guides/deploy-a-preact-site/","name":"Preact"}}]}
```
