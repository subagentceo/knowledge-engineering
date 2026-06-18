---
title: Hexo
description: Deploy a Hexo static site to Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Hexo

[Hexo ↗](https://hexo.io/) is a tool for generating static websites, powered by Node.js. Hexo's benefits include speed, simplicity, and flexibility, allowing it to render Markdown files into static web pages via Node.js.

In this guide, you will create a new Hexo application and deploy it using Cloudflare Pages. You will use the `hexo` CLI to create a new Hexo site.

## Installing Hexo

First, install the Hexo CLI with `npm` or `yarn` by running either of the following commands in your terminal:

Terminal window

```

npm install hexo-cli -g

# or

yarn global add hexo-cli


```

On macOS and Linux, you can install with [brew ↗](https://brew.sh/):

Terminal window

```

brew install hexo


```

## Before you continue

All of the framework guides assume you already have a fundamental understanding of [Git ↗](https://git-scm.com/). If you are new to Git, refer to this [summarized Git handbook ↗](https://guides.github.com/introduction/git-handbook/) on how to set up Git on your local machine.

If you clone with SSH, you must [generate SSH keys ↗](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) on each computer you use to push or pull from GitHub.

Refer to the [GitHub documentation ↗](https://guides.github.com/introduction/git-handbook/) and [Git documentation ↗](https://git-scm.com/book/en/v2) for more information.

## Creating a new project

With Hexo CLI installed, create a new project by running the `hexo init` command in your terminal:

Terminal window

```

hexo init my-hexo-site

cd my-hexo-site


```

Hexo sites use themes to customize the appearance of statically built HTML sites. Hexo has a default theme automatically installed, which you can find on [Hexo's Themes page ↗](https://hexo.io/themes/).

## Creating a post

Create a new post to give your Hexo site some initial content. Run the `hexo new` command in your terminal to generate a new post:

Terminal window

```

hexo new "hello hexo"


```

Inside of `hello-hexo.md`, use Markdown to write the content of the article. You can customize the tags, categories or other variables in the article. Refer to the [Front Matter section ↗](https://hexo.io/docs/front-matter) of the [Hexo documentation ↗](https://hexo.io/docs/) for more information.

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
| Build directory      | public        |

After completing configuration, click the **Save and Deploy** button. You should see Cloudflare Pages installing `hexo` and your project dependencies, and building your site, before deploying it.

Note

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](https://developers.cloudflare.com/pages/get-started/).

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`. Every time you commit new code to your Hexo site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Using a specific Node.js version

Some Hexo themes or plugins have additional requirements for different Node.js versions. To use a specific Node.js version for Hexo:

1. Go to your Pages project.
2. Go to **Settings** \> **Environment variables**.
3. Set the environment variable `NODE_VERSION` and a value of your required Node.js version (for example, `14.3`).
![Follow the instructions above to set up an environment variable in the Pages dashboard](https://developers.cloudflare.com/_astro/node-version-pages.19kURO88_2l4njd.webp) 

## Learn more

By completing this guide, you have successfully deployed your Hexo site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](https://developers.cloudflare.com/pages/framework-guides/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-hexo-site/#page","headline":"Hexo · Cloudflare Pages docs","description":"Deploy a Hexo static site to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-hexo-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/framework-guides/deploy-a-hexo-site/","name":"Hexo"}}]}
```
