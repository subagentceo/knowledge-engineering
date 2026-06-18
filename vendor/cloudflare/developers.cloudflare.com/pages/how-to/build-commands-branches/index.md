---
title: Set build commands per branch
description: Run different build commands on specific branches in your Cloudflare Pages project.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set build commands per branch

**Last reviewed:**  almost 4 years ago 

This guide will instruct you how to set build commands on specific branches. You will use the `CF_PAGES_BRANCH` environment variable to run a script on a specified branch as opposed to your Production branch. This guide assumes that you have a Cloudflare account and a Pages project.

## Set up

Create a `.sh` file in your project directory. You can choose your file's name, but we recommend you name the file `build.sh`.

In the following script, you will use the `CF_PAGES_BRANCH` environment variable to check which branch is currently being built. Populate your `.sh` file with the following:

Terminal window

```

# !/bin/bash


if [ "$CF_PAGES_BRANCH" == "production" ]; then

  # Run the "production" script in `package.json` on the "production" branch

  # "production" should be replaced with the name of your Production branch


  npm run production


elif [ "$CF_PAGES_BRANCH" == "staging" ]; then

  # Run the "staging" script in `package.json` on the "staging" branch

  # "staging" should be replaced with the name of your specific branch


  npm run staging


else

  # Else run the dev script

  npm run dev

fi


```

## Publish your changes

To put your changes into effect:

1. In the Cloudflare dashboard, go to the **Workers & Pages** page.  
[ Go to **Workers & Pages** ](https://dash.cloudflare.com/?to=/:account/workers-and-pages)
2. Select your Pages project.
3. Go to **Settings** \> **Build & deployments** \> **Build configurations** \> **Edit configurations**.
4. Update the **Build command** field value to `bash build.sh` and select **Save**.

To test that your build is successful, deploy your project.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/how-to/build-commands-branches/#page","headline":"Set build commands per branch · Cloudflare Pages docs","description":"Run different build commands on specific branches in your Cloudflare Pages project.","url":"https://developers.cloudflare.com/pages/how-to/build-commands-branches/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/how-to/","name":"How to"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/how-to/build-commands-branches/","name":"Set build commands per branch"}}]}
```
