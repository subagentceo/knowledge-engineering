---
title: MkDocs
description: Deploy an MkDocs documentation site to Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# MkDocs

[MkDocs ↗](https://www.mkdocs.org/) is a modern documentation platform where teams can document products, internal knowledge bases and APIs.

## Install MkDocs

MkDocs requires a recent version of Python and the Python package manager, pip, to be installed on your system. To install pip, refer to the [MkDocs Installation guide ↗](https://www.mkdocs.org/user-guide/installation/). With pip installed, run:

Terminal window

```

pip install mkdocs


```

## Create an MkDocs project

Use the `mkdocs new` command to create a new application:

Terminal window

```

mkdocs new <PROJECT_NAME>


```

Then `cd` into your project, take MkDocs and its dependencies and put them into a `requirements.txt` file:

Terminal window

```

pip freeze > requirements.txt


```

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

You have successfully created a GitHub repository and pushed your MkDocs project to that repository.

## Deploy with Cloudflare Pages

To deploy your site to Pages:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application**.
3. Select the **Pages** tab.
4. Select **Import an existing Git repository**.
5. Select the new GitHub repository that you created and then select **Begin setup**.
6. In the **Set up builds and deployments** section, provide the following information:

| Configuration option | Value        |  | Production branch | main |
| -------------------- | ------------ |  | ----------------- | ---- |
| Build command        | mkdocs build |  |                   |      |
| Build directory      | site         |  |                   |      |

1. Go to **Environment variables (advanced)** \> **Add variable** \> and add the variable `PYTHON_VERSION` with a value of `3.7`.

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.

Every time you commit new code to your MkDocs site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) on new pull requests and be able to preview how changes to your site look before deploying them to production.

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](https://developers.cloudflare.com/pages/get-started/).

## Learn more

By completing this guide, you have successfully deployed your MkDocs site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](https://developers.cloudflare.com/pages/framework-guides/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/framework-guides/deploy-an-mkdocs-site/#page","headline":"MkDocs · Cloudflare Pages docs","description":"Deploy an MkDocs documentation site to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/framework-guides/deploy-an-mkdocs-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/framework-guides/deploy-an-mkdocs-site/","name":"MkDocs"}}]}
```
