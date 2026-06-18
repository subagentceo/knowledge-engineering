---
title: Direct Upload
description: Upload your prebuilt assets to Pages and deploy them via the Wrangler CLI or the Cloudflare dashboard.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Direct Upload

Direct Upload enables you to upload your prebuilt assets to Pages and deploy them to the Cloudflare global network. You should choose Direct Upload over Git integration if you want to [integrate your own build platform](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/) or upload from your local computer.

This guide will instruct you how to upload your assets using Wrangler or the drag and drop method.

You cannot switch to Git integration later

If you choose Direct Upload, you cannot switch to [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/) later. You will have to create a new project with Git integration to use automatic deployments.

## Prerequisites

Before you deploy your project with Direct Upload, run the appropriate [build command](https://developers.cloudflare.com/pages/configuration/build-configuration/#framework-presets) to build your project.

## Upload methods

After you have your prebuilt assets ready, there are two ways to begin uploading:

* [Wrangler](https://developers.cloudflare.com/pages/get-started/direct-upload/#wrangler-cli).
* [Drag and drop](https://developers.cloudflare.com/pages/get-started/direct-upload/#drag-and-drop).

Note

Within a Direct Upload project, you can switch between creating deployments with either Wrangler or drag and drop. For existing Git-integrated projects, you can manually create deployments using [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy). However, you cannot use drag and drop on the dashboard with existing Git-integrated projects.

## Supported file types

Below is the supported file types for each Direct Upload options:

* Wrangler: A single folder of assets. (Zip files are not supported.)
* Drag and drop: A zip file or single folder of assets.

## Wrangler CLI

### Set up Wrangler

To begin, install [npm ↗](https://docs.npmjs.com/getting-started). Then [install Wrangler, the Developer Platform CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

#### Create your project

Log in to Wrangler with the [wrangler login command](https://developers.cloudflare.com/workers/wrangler/commands/general/#login). Then run the [pages project create command](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-project-create):

Terminal window

```

npx wrangler pages project create


```

You will then be prompted to specify the project name. Your project will be served at `<PROJECT_NAME>.pages.dev` (or your project name plus a few random characters if your project name is already taken). You will also be prompted to specify your production branch.

Subsequent deployments will reuse both of these values (saved in your `node_modules/.cache/wrangler` folder).

#### Deploy your assets

From here, you have created an empty project and can now deploy your assets for your first deployment and for all subsequent deployments in your production environment. To do this, run the [wrangler pages deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) command:

Terminal window

```

npx wrangler pages deploy <BUILD_OUTPUT_DIRECTORY>


```

Find the appropriate build output directory for your project in [Build directory under Framework presets](https://developers.cloudflare.com/pages/configuration/build-configuration/#framework-presets).

Your production deployment will be available at `<PROJECT_NAME>.pages.dev`.

Note

Before using the `wrangler pages deploy` command, you will need to make sure you are inside the project. If not, you can also pass in the project path.

To deploy assets to a preview environment, run:

Terminal window

```

npx wrangler pages deploy <OUTPUT_DIRECTORY> --branch=<BRANCH_NAME>


```

For every branch you create, a branch alias will be available to you at `<BRANCH_NAME>.<PROJECT_NAME>.pages.dev`.

Note

If you are in a Git workspace, Wrangler will automatically pull the branch information for you. Otherwise, you will need to specify your branch in this command.

If you would like to streamline the project creation and asset deployment steps, you can also use the deploy command to both create and deploy assets at the same time. If you execute this command first, you will still be prompted to specify your project name and production branch. These values will still be cached for subsequent deployments as stated above. If the cache already exists and you would like to create a new project, you will need to run the [create command](#create-your-project).

#### Other useful commands

If you would like to use Wrangler to obtain a list of all available projects for Direct Upload, use [pages project list](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-project-list):

Terminal window

```

npx wrangler pages project list


```

To get the output as JSON for programmatic use or scripting, use the `--json` flag:

Terminal window

```

npx wrangler pages project list --json


```

If you would like to use Wrangler to obtain a list of all unique preview URLs for a particular project, use [pages deployment list](https://developers.cloudflare.com/workers/wrangler/commands/pages/#pages-deployment-list):

Terminal window

```

npx wrangler pages deployment list


```

For step-by-step directions on how to use Wrangler and continuous integration tools like GitHub Actions, Circle CI, and Travis CI together for continuous deployment, refer to [Use Direct Upload with continuous integration](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/).

## Drag and drop

#### Deploy your project with drag and drop

To deploy with drag and drop:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select **Create application** \> **Get started** \> **Drag and drop your files**.
3. Enter your project name in the provided field and drag and drop your assets.
4. Select **Deploy site**.

Your project will be served from `<PROJECT_NAME>.pages.dev`. Next drag and drop your build output directory into the uploading frame. Once your files have been successfully uploaded, select **Save and Deploy** and continue to your newly deployed project.

#### Create a new deployment

After you have your project created, select **Create a new deployment** to begin a new version of your site. Next, choose whether your new deployment will be made to your production or preview environment. If choosing preview, you can create a new deployment branch or enter an existing one.

## Troubleshoot

### Limits

| Upload method | File limit   | File size |
| ------------- | ------------ | --------- |
| Wrangler      | 20,000 files | 25 MiB    |
| Drag and drop | 1,000 files  | 25 MiB    |

If using the drag and drop method, a red warning symbol will appear next to an asset if too large and thus unsuccessfully uploaded. In this case, you may choose to delete that asset but you cannot replace it. In order to do so, you must reupload the entire project.

### Production branch configuration

If your project is a [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) project, you will not have the option to configure production branch controls. To update your production branch, you will need to manually call the [Update Project](https://developers.cloudflare.com/api/resources/pages/subresources/projects/methods/edit/) endpoint in the API.

Terminal window

```

curl --request PATCH \

"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects/{project_name}" \

--header "Authorization: Bearer <API_TOKEN>" \

--header "Content-Type: application/json" \

--data "{\"production_branch\": \"main\"}"


```

### Functions

Drag and drop deployments made from the Cloudflare dashboard do not currently support compiling a `functions` folder of [Pages Functions](https://developers.cloudflare.com/pages/functions/). To deploy a `functions` folder, you must use Wrangler. When deploying a project using Wrangler, if a `functions` folder exists where the command is run, that `functions` folder will be uploaded with the project.

However, note that a `_worker.js` file is supported by both Wrangler and drag and drop deployments made from the dashboard.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/get-started/direct-upload/#page","headline":"Direct Upload · Cloudflare Pages docs","description":"Upload your prebuilt assets to Pages and deploy them via the Wrangler CLI or the Cloudflare dashboard.","url":"https://developers.cloudflare.com/pages/get-started/direct-upload/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/get-started/","name":"Getting started"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/get-started/direct-upload/","name":"Direct Upload"}}]}
```
