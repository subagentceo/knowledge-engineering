---
title: Migrating from Firebase
description: This tutorial explains how to migrate an existing Firebase application to Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Migrating from Firebase

**Last reviewed:**  over 5 years ago 

In this tutorial, you will learn how to migrate an existing Firebase application to Cloudflare Pages. You should already have an existing project deployed on Firebase that you would like to host on Cloudflare Pages.

## Finding your build command and build directory

To move your application to Cloudflare Pages, you will need to find your build command and build directory.

You will use these to tell Cloudflare Pages how to deploy your project. If you have been deploying manually from your local machine using the `firebase` command-line tool, the `firebase.json` configuration file should include a `public` key that will be your build directory:

firebase.json

```

{

  "public": "public"

}


```

Firebase Hosting does not ask for your build command, so if you are running a standard JavaScript set up, you will probably be using `npm build` or a command specific to the framework or tool you are using (for example, `ng build`).

After you have found your build directory and build command, you can move your project to Cloudflare Pages.

## Creating a new Pages project

If you have not pushed your static site to GitHub before, you should do so before continuing. This will also give you access to features like automatic deployments, and [deployment previews](https://developers.cloudflare.com/pages/configuration/preview-deployments/).

You can create a new repository by visiting [repo.new ↗](https://repo.new) and following the instructions to push your project up to GitHub.

Use the [Get started guide](https://developers.cloudflare.com/pages/get-started/) to add your project to Cloudflare Pages, using the **build command** and **build directory** that you saved earlier.

## Cleaning up your old application and assigning the domain

Once you have deployed your application, go to the Firebase dashboard and remove your old Firebase project. In your Cloudflare DNS settings for your domain, make sure to update the CNAME record for your domain from Firebase to Cloudflare Pages.

By completing this guide, you have successfully migrated your Firebase project to Cloudflare Pages.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/migrations/migrating-from-firebase/#page","headline":"Migrating from Firebase · Cloudflare Pages docs","description":"This tutorial explains how to migrate an existing Firebase application to Cloudflare Pages.","url":"https://developers.cloudflare.com/pages/migrations/migrating-from-firebase/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/migrations/","name":"Migration guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/migrations/migrating-from-firebase/","name":"Migrating from Firebase"}}]}
```
