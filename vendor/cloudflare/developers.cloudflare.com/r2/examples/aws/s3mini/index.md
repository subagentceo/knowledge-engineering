---
title: s3mini
description: Configure s3mini, a lightweight TypeScript S3 client, to work with Cloudflare R2.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# s3mini

**Last reviewed:**  4 months ago 

You must [generate an Access Key](https://developers.cloudflare.com/r2/api/tokens/) before getting started. All examples will utilize `access_key_id` and `access_key_secret` variables which represent the **Access Key ID** and **Secret Access Key** values you generated.

  
[s3mini ↗](https://www.npmjs.com/package/s3mini) is a zero-dependency, lightweight (\~20 KB minified) TypeScript S3 client that uses AWS SigV4 signing. It runs natively on Node.js, Bun, and Cloudflare Workers without polyfills.

Unlike the AWS SDKs, s3mini expects a **bucket-scoped endpoint** — the bucket name is part of the endpoint URL, so you do not pass a separate `bucket` parameter to each operation.

## Install

Terminal window

```

npm install s3mini


```

## Node.js / Bun

TypeScript

```

import { S3mini } from "s3mini";


const s3 = new S3mini({

  accessKeyId: process.env.R2_ACCESS_KEY_ID!,

  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,

  // Bucket-scoped endpoint — include your bucket name in the path

  endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com/my-bucket`,

  region: "auto",

});


// Upload an object

await s3.putObject("hello.txt", "Hello from s3mini!");


// Download an object as a string

const text = await s3.getObject("hello.txt");

console.log(text);


// List objects with a prefix

const objects = await s3.listObjects("/", "hello");

console.log(objects);


// Delete an object

await s3.deleteObject("hello.txt");


```

## Cloudflare Workers

Prefer R2 bindings inside Workers

When your Worker and R2 bucket live in the same Cloudflare account, [R2 bindings](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) give you zero-latency access without managing API credentials. Use the S3 API when you need cross-account access or interoperability with S3-compatible tooling.

s3mini works natively in Workers without the `nodejs_compat` compatibility flag.

TypeScript

```

import { S3mini } from "s3mini";


interface Env {

  R2_ACCESS_KEY_ID: string;

  R2_SECRET_ACCESS_KEY: string;

  ACCOUNT_ID: string;

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    const s3 = new S3mini({

      accessKeyId: env.R2_ACCESS_KEY_ID,

      secretAccessKey: env.R2_SECRET_ACCESS_KEY,

      endpoint: `https://${env.ACCOUNT_ID}.r2.cloudflarestorage.com/my-bucket`,

      region: "auto",

    });


    const url = new URL(request.url);

    const key = url.pathname.slice(1); // strip leading "/"


    if (!key) {

      return new Response("Missing object key", { status: 400 });

    }


    switch (request.method) {

      case "PUT": {

        const data = await request.arrayBuffer();

        const contentType =

          request.headers.get("content-type") ?? "application/octet-stream";

        await s3.putObject(key, new Uint8Array(data), contentType);

        return new Response("Created", { status: 201 });

      }


      case "GET": {

        const response = await s3.getObjectResponse(key);

        if (!response) {

          return new Response("Not Found", { status: 404 });

        }

        return new Response(response.body, {

          headers: {

            "content-type":

              response.headers.get("content-type") ??

              "application/octet-stream",

            etag: response.headers.get("etag") ?? "",

          },

        });

      }


      case "DELETE": {

        await s3.deleteObject(key);

        return new Response(null, { status: 204 });

      }


      default:

        return new Response("Method Not Allowed", { status: 405 });

    }

  },

};


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/examples/aws/s3mini/#page","headline":"s3mini · Cloudflare R2 docs","description":"Configure s3mini, a lightweight TypeScript S3 client, to work with Cloudflare R2.","url":"https://developers.cloudflare.com/r2/examples/aws/s3mini/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/examples/aws/","name":"S3 SDKs"}},{"@type":"ListItem","position":5,"item":{"@id":"/r2/examples/aws/s3mini/","name":"s3mini"}}]}
```
