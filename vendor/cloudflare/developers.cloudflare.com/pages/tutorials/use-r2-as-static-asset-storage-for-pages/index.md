---
title: Use R2 as static asset storage with Cloudflare Pages
description: This tutorial will teach you how to use R2 as a static asset storage bucket for your Pages app.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use R2 as static asset storage with Cloudflare Pages

**Last reviewed:**  almost 2 years ago 

This tutorial will teach you how to use [R2](https://developers.cloudflare.com/r2/) as a static asset storage bucket for your [Pages](https://developers.cloudflare.com/pages/) app. This is especially helpful if you're hitting the [file limit](https://developers.cloudflare.com/pages/platform/limits/#files) or the [max file size limit](https://developers.cloudflare.com/pages/platform/limits/#file-size) on Pages.

To illustrate how this is done, we will use R2 as a static asset storage for a fictional cat blog.

## The Cat blog

Imagine you run a static cat blog containing funny cat videos and helpful tips for cat owners. Your blog is growing and you need to add more content with cat images and videos.

The blog is hosted on Pages and currently has the following directory structure:

```

.

├── public

│   ├── index.html

│   ├── static

│   │   ├── favicon.ico

│   │   └── logo.png

│   └── style.css

└── wrangler.jsonc


```

Adding more videos and images to the blog would be great, but our asset size is above the [file limit on Pages](https://developers.cloudflare.com/pages/platform/limits/#file-size). Let us fix this with R2.

## Create an R2 bucket

The first step is creating an R2 bucket to store the static assets. A new bucket can be created with the dashboard or via Wrangler.

Using the dashboard, navigate to the R2 tab, then click on _Create bucket._ We will name the bucket for our blog _cat-media_. Always remember to give your buckets descriptive names:

![Dashboard](https://developers.cloudflare.com/_astro/dash.B3yWT1et_jlQ8M.webp) 

With the bucket created, we can upload media files to R2\. I’ll drag and drop two folders with a few cat images and videos into the R2 bucket:

![Upload](https://developers.cloudflare.com/images/pages/tutorials/pages-r2/upload.gif) 

Alternatively, an R2 bucket can be created with Wrangler from the command line by running:

Terminal window

```

npx wrangler r2 bucket create <bucket_name>

# i.e

# npx wrangler r2 bucket create cat-media


```

Files can be uploaded to the bucket with the following command:

Terminal window

```

npx wrangler r2 object put <bucket_name>/<file_name> -f <path_to_file>

# i.e

# npx wrangler r2 object put cat-media/videos/video1.mp4 -f ~/Downloads/videos/video1.mp4


```

## Bind R2 to Pages

To bind the R2 bucket we have created to the cat blog, we need to update the Wrangler configuration.

Open the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/), and add the following binding to the file. `bucket_name` should be the exact name of the bucket created earlier, while `binding` can be any custom name referring to the R2 resource:

* [  wrangler.jsonc ](#tab-panel-9447)
* [  wrangler.toml ](#tab-panel-9448)

JSONC

```

{

  "r2_buckets": [

    {

      "binding": "MEDIA",

      "bucket_name": "cat-media"

    }

  ]

}


```

TOML

```

[[r2_buckets]]

binding = "MEDIA"

bucket_name = "cat-media"


```

Note

Note: The keyword `ASSETS` is reserved and cannot be used as a resource binding.

Save the [Wrangler configuration file](https://developers.cloudflare.com/pages/functions/wrangler-configuration/), and we are ready to move on to the last step.

Alternatively, you can add a binding to your Pages project on the dashboard by navigating to the project’s _Settings_ tab > _Functions_ \> _R2 bucket bindings_.

## Serve R2 Assets From Pages

The last step involves serving media assets from R2 on the blog. To do that, we will create a function to handle requests for media files.

In the project folder, create a _functions_ directory. Then, create a _media_ subdirectory and a file named `[[all]].js` in it. All HTTP requests to `/media` will be routed to this file.

After creating the folders and JavaScript file, the blog directory structure should look like:

```

.

├── functions

│   └── media

│       └── [[all]].js

├── public

│   ├── index.html

│   ├── static

│   │   ├── favicon.ico

│   │   └── icon.png

│   └── style.css

└── wrangler.jsonc


```

Finally, we will add a handler function to `[[all]].js`. This function receives all media requests, and returns the corresponding file asset from R2:

JavaScript

```

export async function onRequestGet(ctx) {

  const path = new URL(ctx.request.url).pathname.replace("/media/", "");

  const file = await ctx.env.MEDIA.get(path);

  if (!file) return new Response(null, { status: 404 });

  return new Response(file.body, {

    headers: { "Content-Type": file.httpMetadata.contentType },

  });

}


```

## Deploy the blog

Before deploying the changes made so far to our cat blog, let us add a few new posts to `index.html`. These posts depend on media assets served from R2:

```

<!doctype html>

<html lang="en">

  <body>

    <h1>Awesome Cat Blog! 😺</h1>

    <p>Today's post:</p>

    <video width="320" controls>

      <source src="/media/videos/video1.mp4" type="video/mp4" />

    </video>

    <p>Yesterday's post:</p>

    <img src="/media/images/cat1.jpg" width="320" />

  </body>

</html>


```

With all the files saved, open a new terminal window to deploy the app:

Terminal window

```

npx wrangler deploy


```

Once deployed, media assets are fetched and served from the R2 bucket.

![Deployed App](https://developers.cloudflare.com/images/pages/tutorials/pages-r2/deployed.gif) 

## **Related resources**

* [Learn how function routing works in Pages.](https://developers.cloudflare.com/pages/functions/routing/)
* [Learn how to create public R2 buckets](https://developers.cloudflare.com/r2/buckets/public-buckets/).
* [Learn how to use R2 from Workers](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/tutorials/use-r2-as-static-asset-storage-for-pages/#page","headline":"Use R2 as static asset storage with Cloudflare Pages · Cloudflare Pages docs","description":"This tutorial will teach you how to use R2 as a static asset storage bucket for your Pages app.","url":"https://developers.cloudflare.com/pages/tutorials/use-r2-as-static-asset-storage-for-pages/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-01-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Hono","JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/tutorials/use-r2-as-static-asset-storage-for-pages/","name":"Use R2 as static asset storage with Cloudflare Pages"}}]}
```
