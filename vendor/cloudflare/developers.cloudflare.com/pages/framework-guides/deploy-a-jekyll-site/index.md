---
title: Jekyll
description: Deploy a Jekyll site to Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Jekyll

[Jekyll ↗](https://jekyllrb.com/) is an open-source framework for creating websites, based around Markdown with Liquid templates. In this guide, you will create a new Jekyll application and deploy it using Cloudflare Pages. You use the `jekyll` CLI to create a new Jekyll site.

Note

If you have an existing Jekyll site on GitHub Pages, refer to [the Jekyll migration guide](https://developers.cloudflare.com/pages/migrations/migrating-jekyll-from-github-pages/).

## Installing Jekyll

Jekyll is written in Ruby, meaning that you will need a functioning Ruby installation, like `rbenv`, to install Jekyll.

To install Ruby on your computer, follow the [rbenv installation instructions ↗](https://github.com/rbenv/rbenv#installation) and select a recent version of Ruby by running the `rbenv` command in your terminal. The Ruby version you install will also be used to configure the Pages deployment for your application.

Terminal window

```

rbenv install <RUBY_VERSION> # For example, 3.1.3


```

With Ruby installed, you can install the `jekyll` Ruby gem:

Terminal window

```

gem install jekyll


```

## Creating a new project

With Jekyll installed, you can create a new project running the `jekyll new` in your terminal:

Terminal window

```

jekyll new my-jekyll-site


```

Create a base `index.html` in your newly created folder to give your site content:

```

<!doctype html>

<html>

  <head>

    <meta charset="utf-8" />

    <title>Hello from Cloudflare Pages</title>

  </head>

  <body>

    <h1>Hello from Cloudflare Pages</h1>

  </body>

</html>


```

Optionally, you may use a theme with your new Jekyll site if you would like to start with great styling defaults. For example, the [minimal-mistakes ↗](https://github.com/mmistakes/minimal-mistakes) theme has a ["Starting from jekyll new" ↗](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/#starting-from-jekyll-new) section to help you add the theme to your new site.

## Before you continue

All of the framework guides assume you already have a fundamental understanding of [Git ↗](https://git-scm.com/). If you are new to Git, refer to this [summarized Git handbook ↗](https://guides.github.com/introduction/git-handbook/) on how to set up Git on your local machine.

If you clone with SSH, you must [generate SSH keys ↗](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) on each computer you use to push or pull from GitHub.

Refer to the [GitHub documentation ↗](https://guides.github.com/introduction/git-handbook/) and [Git documentation ↗](https://git-scm.com/book/en/v2) for more information.

## Create a GitHub repository

Create a new GitHub repository by visiting [repo.new ↗](https://repo.new). After creating a new repository, go to your newly created project directory to prepare and push your local application to GitHub by running the following commands in your terminal:

Terminal window

```

git remote add origin https://github.com/<your-gh-username>/<repository-name>

git branch -M main

git push -u origin main


```

If you are migrating an existing Jekyll project to Pages, confirm that your `Gemfile` is committed as part of your codebase. Pages will look at your Gemfile and run `bundle install` to install the required dependencies for your project, including the `jekyll` gem.

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
| Build command        | jekyll build |  |                   |      |
| Build directory      | \_site       |  |                   |      |

Add an [environment variable](https://developers.cloudflare.com/pages/configuration/build-image/) that matches the Ruby version that you are using locally. Set this as `RUBY_VERSION` on both your preview and production deployments. Below, `3.1.3` is used as an example:

| Environment variable | Value |
| -------------------- | ----- |
| RUBY\_VERSION        | 3.1.3 |

After configuring your site, you can begin your first deployment. You should see Cloudflare Pages installing `jekyll`, your project dependencies, and building your site before deploying it.

Note

For the complete guide to deploying your first site to Cloudflare Pages, refer to [the Get started guide](https://developers.cloudflare.com/pages/get-started/).

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`. Every time you commit new code to your Jekyll site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Learn more

By completing this guide, you have successfully deployed your Jekyll site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](https://developers.cloudflare.com/pages/framework-guides/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-jekyll-site/#page","headline":"Jekyll · Cloudflare Pages docs","description":"Deploy a Jekyll site to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-jekyll-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/framework-guides/deploy-a-jekyll-site/","name":"Jekyll"}}]}
```
