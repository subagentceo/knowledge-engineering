---
title: Zola
description: Deploy a Zola static site to Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Zola

[Zola ↗](https://www.getzola.org/) is a fast static site generator in a single binary with everything built-in. In this guide, you will create a new Zola application and deploy it using Cloudflare Pages. You will use the `zola` CLI to create a new Zola site.

## Installing Zola

First, [install ↗](https://www.getzola.org/documentation/getting-started/installation/) the `zola` CLI, using the specific instructions for your operating system below:

### macOS (Homebrew)

If you use the package manager [Homebrew ↗](https://brew.sh), run the `brew install` command in your terminal to install Zola:

Terminal window

```

brew install zola


```

### Windows (Chocolatey)

If you use the package manager [Chocolatey ↗](https://chocolatey.org/), run the `choco install` command in your terminal to install Zola:

Terminal window

```

choco install zola


```

### Windows (Scoop)

If you use the package manager [Scoop ↗](https://scoop.sh/), run the `scoop install` command in your terminal to install Zola:

Terminal window

```

scoop install zola


```

### Linux (pkg)

Your Linux distro's package manager may include Zola. If this is the case, you can install it directly using your distro's package manager -- for example, using `pkg`, run the following command in your terminal:

Terminal window

```

pkg install zola


```

If your package manager does not include Zola or you would like to download a release directly, refer to the [**Manual**](https://developers.cloudflare.com/pages/framework-guides/deploy-a-zola-site/#manual-installation) section below.

### Manual installation

The Zola GitHub repository contains pre-built versions of the Zola command-line tool for various operating systems, which can be found on [the Releases page ↗](https://github.com/getzola/zola/releases).

For more instruction on installing these releases, refer to [Zola's install guide ↗](https://www.getzola.org/documentation/getting-started/installation/).

## Creating a new project

With Zola installed, create a new project by running the `zola init` command in your terminal using the default template:

Terminal window

```

zola init my-zola-project


```

Upon running `zola init`, you will prompted with three questions:

1. What is the URL of your site? ([https://example.com ↗](https://example.com)): You can leave this one blank for now.
2. Do you want to enable Sass compilation? \[Y/n\]: Y
3. Do you want to enable syntax highlighting? \[y/N\]: y
4. Do you want to build a search index of the content? \[y/N\]: y

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

## Deploy with Cloudflare Pages

| Configuration option | Value      |  | Production branch | main |
| -------------------- | ---------- |  | ----------------- | ---- |
| Build command        | zola build |  |                   |      |
| Build directory      | public     |  |                   |      |

Zola is preinstalled in the Cloudflare Pages build environment, so no additional configuration is required. You can optionally set the `ZOLA_VERSION` environment variable under **Environment Variables (advanced)** to pin a specific version.

For example, `ZOLA_VERSION`: `0.19.2`.

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages building your site with Zola, before deploying it.

Note

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](https://developers.cloudflare.com/pages/get-started/).

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`.

You can now add that subdomain as the `base_url` in your `config.toml` file.

For example:

YAML

```

# The URL the site will be built for

base_url = "https://my-zola-project.pages.dev"


```

Every time you commit new code to your Zola site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

### Handling Preview Deployments

When working with Cloudflare Pages, you might use preview deployments for testing changes before merging to your main branch. However, these preview deployments use different URLs (like `https://your-branch-name.my-zola-project.pages.dev`), which can cause issues with asset loading if your `base_url` is hardcoded.

To fix this, modify your build command in the Cloudflare Pages configuration to dynamically set the base URL depending on the environment:

Terminal window

```

if [ "$CF_PAGES_BRANCH" = "main" ]; then zola build; else zola build --base-url $CF_PAGES_URL; fi


```

This command uses:

* The `base_url` set in `config.toml` when building from the `main` branch
* The preview deployment URL (automatically provided by Cloudflare Pages as `$CF_PAGES_URL`) for all other branches

## Learn more

By completing this guide, you have successfully deployed your Zola site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](https://developers.cloudflare.com/pages/framework-guides/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-zola-site/#page","headline":"Zola · Cloudflare Pages docs","description":"Deploy a Zola static site to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-zola-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/framework-guides/deploy-a-zola-site/","name":"Zola"}}]}
```
