---
title: Blazor
description: Deploy a Blazor WebAssembly application to Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Blazor

[Blazor ↗](https://blazor.net) is an SPA framework that can use C# code, rather than JavaScript in the browser. In this guide, you will build a site using Blazor, and deploy it using Cloudflare Pages.

## Install .NET

Blazor uses C#. You will need the latest version of the [.NET SDK ↗](https://dotnet.microsoft.com/download) to continue creating a Blazor project. If you don't have the SDK installed on your system please download and run the installer.

## Creating a new Blazor WASM project

There are two types of Blazor hosting models: [Blazor Server ↗](https://learn.microsoft.com/en-us/aspnet/core/blazor/hosting-models?view=aspnetcore-8.0#blazor-server) which requires a server to serve the Blazor application to the end user, and [Blazor WebAssembly ↗](https://learn.microsoft.com/en-us/aspnet/core/blazor/hosting-models?view=aspnetcore-8.0#blazor-webassembly) which runs in the browser. Blazor Server is incompatible with the Cloudflare edge network model, thus this guide only use Blazor WebAssembly.

Create a new Blazor WebAssembly (WASM) application by running the following command:

Terminal window

```

dotnet new blazorwasm -o my-blazor-project


```

## Create the build script

To deploy, Cloudflare Pages will need a way to build the Blazor project. In the project's directory root, create a `build.sh` file. Populate the file with this (updating the `.dotnet-install.sh` line appropriately if you're not using the latest .NET SDK):

```

#!/bin/sh

curl -sSL https://dot.net/v1/dotnet-install.sh > dotnet-install.sh

chmod +x dotnet-install.sh

./dotnet-install.sh -c 8.0 -InstallDir ./dotnet

./dotnet/dotnet --version

./dotnet/dotnet publish -c Release -o output


```

Your `build.sh` file needs to be executable for the build command to work. You can make it so by running `chmod +x build.sh`.

## Before you continue

All of the framework guides assume you already have a fundamental understanding of [Git ↗](https://git-scm.com/). If you are new to Git, refer to this [summarized Git handbook ↗](https://guides.github.com/introduction/git-handbook/) on how to set up Git on your local machine.

If you clone with SSH, you must [generate SSH keys ↗](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) on each computer you use to push or pull from GitHub.

Refer to the [GitHub documentation ↗](https://guides.github.com/introduction/git-handbook/) and [Git documentation ↗](https://git-scm.com/book/en/v2) for more information.

## Create a `.gitignore` file

Creating a `.gitignore` file ensures that only what is needed gets pushed onto your GitHub repository. Create a `.gitignore` file by running the following command:

Terminal window

```

dotnet new gitignore


```

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

| Configuration option | Value          |
| -------------------- | -------------- |
| Production branch    | main           |
| Build command        | ./build.sh     |
| Build directory      | output/wwwroot |

After configuring your site, you can begin your first deploy. You should see Cloudflare Pages installing `dotnet`, your project dependencies, and building your site, before deploying it.

Note

For the complete guide to deploying your first site to Cloudflare Pages, refer to the [Get started guide](https://developers.cloudflare.com/pages/get-started/).

After deploying your site, you will receive a unique subdomain for your project on `*.pages.dev`. Every time you commit new code to your Blazor site, Cloudflare Pages will automatically rebuild your project and deploy it. You will also get access to [preview deployments](https://developers.cloudflare.com/pages/configuration/preview-deployments/) on new pull requests, so you can preview how changes look to your site before deploying them to production.

## Troubleshooting

### A file is over the 25 MiB limit

If you receive the error message `Error: Asset "/opt/buildhome/repo/output/wwwroot/_framework/dotnet.wasm" is over the 25MiB limit`, resolve this by doing one of the following actions:

1. Reduce the size of your assets with the following [guide ↗](https://docs.microsoft.com/en-us/aspnet/core/blazor/performance?view=aspnetcore-6.0#minimize-app-download-size).

Or

1. Remove the `*.wasm` files from the output (`rm output/wwwroot/_framework/*.wasm`) and modify your Blazor application to [load the Brotli compressed files ↗](https://docs.microsoft.com/en-us/aspnet/core/blazor/host-and-deploy/webassembly?view=aspnetcore-6.0#compression) instead.

## Learn more

By completing this guide, you have successfully deployed your Blazor site to Cloudflare Pages. To get started with other frameworks, [refer to the list of Framework guides](https://developers.cloudflare.com/pages/framework-guides/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-blazor-site/#page","headline":"Blazor · Cloudflare Pages docs","description":"Deploy a Blazor WebAssembly application to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/framework-guides/deploy-a-blazor-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/framework-guides/","name":"Framework guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/framework-guides/deploy-a-blazor-site/","name":"Blazor"}}]}
```
