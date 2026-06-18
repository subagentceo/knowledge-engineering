---
title: Securely access and upload assets with Cloudflare R2
description: This tutorial explains how to create a TypeScript-based Cloudflare Workers project that can securely access files from and upload files to a CloudFlare R2 bucket.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Securely access and upload assets with Cloudflare R2

**Last reviewed:**  about 3 years ago 

This tutorial explains how to create a TypeScript-based Cloudflare Workers project that can securely access files from and upload files to a [Cloudflare R2](https://developers.cloudflare.com/r2/) bucket. Cloudflare R2 allows developers to store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

## Prerequisites

To continue:

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [npm ↗](https://docs.npmjs.com/getting-started).
3. Install [Node.js ↗](https://nodejs.org/en/). Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) requires a Node version of `16.17.0` or later.

## Create a Worker application

First, use the [create-cloudflare CLI ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) to create a new Worker. To do this, open a terminal window and run the following command:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- upload-r2-assets
```

```
yarn create cloudflare upload-r2-assets
```

```
pnpm create cloudflare@latest upload-r2-assets
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Move into your newly created directory:

Terminal window

```

cd upload-r2-assets


```

## Create an R2 bucket

Before you integrate R2 bucket access into your Worker application, an R2 bucket must be created:

Terminal window

```

npx wrangler r2 bucket create <YOUR_BUCKET_NAME>


```

Replace `<YOUR_BUCKET_NAME>` with the name you want to assign to your bucket. List your account's R2 buckets to verify that a new bucket has been added:

Terminal window

```

npx wrangler r2 bucket list


```

## Configure access to an R2 bucket

After your new R2 bucket is ready, use it inside your Worker application.

Use your R2 bucket inside your Worker project by modifying the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to include an R2 bucket [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/). Add the following R2 bucket binding to your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-12205)
* [  wrangler.toml ](#tab-panel-12206)

JSONC

```

{

  "r2_buckets": [

    {

      "binding": "MY_BUCKET",

      "bucket_name": "<YOUR_BUCKET_NAME>"

    }

  ]

}


```

TOML

```

[[r2_buckets]]

binding = "MY_BUCKET"

bucket_name = "<YOUR_BUCKET_NAME>"


```

Give your R2 bucket binding name. Replace `<YOUR_BUCKET_NAME>` with the name of the R2 bucket you created earlier.

Your Worker application can now access your R2 bucket using the `MY_BUCKET` variable. You can now perform CRUD (Create, Read, Update, Delete) operations on the contents of the bucket.

## Fetch from an R2 bucket

After setting up an R2 bucket binding, you will implement the functionalities for the Worker to interact with the R2 bucket, such as, fetching files from the bucket and uploading files to the bucket.

To fetch files from the R2 bucket, use the `BINDING.get` function. In the below example, the R2 bucket binding is called `MY_BUCKET`. Using `.get(key)`, you can retrieve an asset based on the URL pathname as the key. In this example, the URL pathname is `/image.png`, and the asset key is `image.png`.

TypeScript

```

interface Env {

  MY_BUCKET: R2Bucket;

}

export default {

  async fetch(request, env): Promise<Response> {

    // For example, the request URL my-worker.account.workers.dev/image.png

    const url = new URL(request.url);

    const key = url.pathname.slice(1);

    // Retrieve the key "image.png"

    const object = await env.MY_BUCKET.get(key);


    if (object === null) {

      return new Response("Object Not Found", { status: 404 });

    }


    const headers = new Headers();

    object.writeHttpMetadata(headers);

    headers.set("etag", object.httpEtag);


    return new Response(object.body, {

      headers,

    });

  },

} satisfies ExportedHandler<Env>;


```

The code written above fetches and returns data from the R2 bucket when a `GET` request is made to the Worker application using a specific URL path.

## Upload securely to an R2 bucket

Next, you will add the ability to upload to your R2 bucket using authentication. To securely authenticate your upload requests, use [Wrangler's secret capability](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret). Wrangler was installed when you ran the `create cloudflare@latest` command.

Create a secret value of your choice -- for instance, a random string or password. Using the Wrangler CLI, add the secret to your project as `AUTH_SECRET`:

Terminal window

```

npx wrangler secret put AUTH_SECRET


```

Now, add a new code path that handles a `PUT` HTTP request. This new code will check that the previously uploaded secret is correctly used for authentication, and then upload to R2 using `MY_BUCKET.put(key, data)`:

TypeScript

```

interface Env {

  MY_BUCKET: R2Bucket;

  AUTH_SECRET: string;

}

export default {

  async fetch(request, env): Promise<Response> {

    if (request.method === "PUT") {

      // Note that you could require authentication for all requests

      // by moving this code to the top of the fetch function.

      const auth = request.headers.get("Authorization");

      const expectedAuth = `Bearer ${env.AUTH_SECRET}`;


      if (!auth || auth !== expectedAuth) {

        return new Response("Unauthorized", { status: 401 });

      }


      const url = new URL(request.url);

      const key = url.pathname.slice(1);

      await env.MY_BUCKET.put(key, request.body);

      return new Response(`Object ${key} uploaded successfully!`);

    }


    // include the previous code here...

  },

} satisfies ExportedHandler<Env>;


```

This approach ensures that only clients who provide a valid bearer token, via the `Authorization` header equal to the `AUTH_SECRET` value, will be permitted to upload to the R2 bucket. If you used a different binding name than `AUTH_SECRET`, replace it in the code above.

## Deploy your Worker application

After completing your Cloudflare Worker project, deploy it to Cloudflare. Make sure you are in your Worker application directory that you created for this tutorial, then run:

Terminal window

```

npx wrangler deploy


```

Your application is now live and accessible at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

You have successfully created a Cloudflare Worker that allows you to interact with an R2 bucket to accomplish tasks such as uploading and downloading files. You can now use this as a starting point for your own projects.

## Next steps

To build more with R2 and Workers, refer to [Tutorials](https://developers.cloudflare.com/workers/tutorials/) and the [R2 documentation](https://developers.cloudflare.com/r2/).

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord ↗](https://discord.cloudflare.com) to connect with fellow developers and the Cloudflare team.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/upload-assets-with-r2/#page","headline":"Securely access and upload assets with Cloudflare R2 · Cloudflare Workers docs","description":"This tutorial explains how to create a TypeScript-based Cloudflare Workers project that can securely access files from and upload files to a CloudFlare R2 bucket.","url":"https://developers.cloudflare.com/workers/tutorials/upload-assets-with-r2/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-03-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TypeScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/tutorials/upload-assets-with-r2/","name":"Securely access and upload assets with Cloudflare R2"}}]}
```
