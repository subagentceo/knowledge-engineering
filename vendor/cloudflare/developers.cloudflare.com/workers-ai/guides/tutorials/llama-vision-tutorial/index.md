---
title: Llama 3.2 11B Vision Instruct model on Cloudflare Workers AI
description: Learn how to use the Llama 3.2 11B Vision Instruct model on Cloudflare Workers AI.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Llama 3.2 11B Vision Instruct model on Cloudflare Workers AI

**Last reviewed:**  over 1 year ago 

## Prerequisites

Before you begin, ensure you have the following:

1. A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up) with Workers and Workers AI enabled.
2. Your `CLOUDFLARE_ACCOUNT_ID` and `CLOUDFLARE_AUTH_TOKEN`.  
   * You can generate an API token in your Cloudflare dashboard under API Tokens.
3. Node.js installed for working with Cloudflare Workers (optional but recommended).

## 1\. Agree to Meta's license

The first time you use the [Llama 3.2 11B Vision Instruct](https://developers.cloudflare.com/workers-ai/models/llama-3.2-11b-vision-instruct) model, you need to agree to Meta's License and Acceptable Use Policy.

curl

```

curl https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/run/@cf/meta/llama-3.2-11b-vision-instruct \

  -X POST \

  -H "Authorization: Bearer $CLOUDFLARE_AUTH_TOKEN" \

  -d '{ "prompt": "agree" }'


```

Replace `$CLOUDFLARE_ACCOUNT_ID` and `$CLOUDFLARE_AUTH_TOKEN` with your actual account ID and token.

## 2\. Set up your Cloudflare Worker

1. Create a Worker Project You will create a new Worker project using the `create-cloudflare` CLI (`C3`). This tool simplifies setting up and deploying new applications to Cloudflare.  
Run the following command in your terminal:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- llama-vision-tutorial
```

```
yarn create cloudflare llama-vision-tutorial
```

```
pnpm create cloudflare@latest llama-vision-tutorial
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `JavaScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

After completing the setup, a new directory called `llama-vision-tutorial` will be created.

1. Navigate to your application directory Change into the project directory:  
Terminal window  
```  
cd llama-vision-tutorial  
```
2. Project structure Your `llama-vision-tutorial` directory will include:  
   * A "Hello World" Worker at `src/index.ts`.  
   * A `wrangler.json` configuration file for managing deployment settings.

## 3\. Write the Worker code

Edit the `src/index.ts` (or `index.js` if you are not using TypeScript) file and replace the content with the following code:

JavaScript

```

export interface Env {

  AI: Ai;

}


export default {

  async fetch(request, env): Promise<Response> {

    const messages = [

      { role: "system", content: "You are a helpful assistant." },

      { role: "user", content: "Describe the image I'm providing." },

    ];


    // Replace this with your image data encoded as base64 or a URL

    const imageBase64 = "data:image/png;base64,IMAGE_DATA_HERE";


    const response = await env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", {

      messages,

      image: imageBase64,

    });


    return Response.json(response);

  },

} satisfies ExportedHandler<Env>;


```

## 4\. Bind Workers AI to your Worker

1. Open the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) and add the following configuration:

* [  wrangler.jsonc ](#tab-panel-11329)
* [  wrangler.toml ](#tab-panel-11330)

JSONC

```

{

  "env": {},

  "ai": {

    "binding": "AI"

  }

}


```

TOML

```

env = { }


[ai]

binding = "AI"


```

1. Save the file.

## 5\. Deploy the Worker

Run the following command to deploy your Worker:

Terminal window

```

wrangler deploy


```

## 6\. Test Your Worker

1. After deployment, you will receive a unique URL for your Worker (e.g., `https://llama-vision-tutorial.<your-subdomain>.workers.dev`).
2. Use a tool like `curl` or Postman to send a request to your Worker:

Terminal window

```

curl -X POST https://llama-vision-tutorial.<your-subdomain>.workers.dev \

  -d '{ "image": "BASE64_ENCODED_IMAGE" }'


```

Replace `BASE64_ENCODED_IMAGE` with an actual base64-encoded image string.

## 7\. Verify the response

The response will include the output from the model, such as a description or answer to your prompt based on the image provided.

Example response:

```

{

  "result": "This is a golden retriever sitting in a grassy park."

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/guides/tutorials/llama-vision-tutorial/#page","headline":"Llama 3.2 11B Vision Instruct model on Cloudflare Workers AI · Cloudflare Workers AI docs","description":"Learn how to use the Llama 3.2 11B Vision Instruct model on Cloudflare Workers AI.","url":"https://developers.cloudflare.com/workers-ai/guides/tutorials/llama-vision-tutorial/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/guides/","name":"Guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/guides/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/guides/tutorials/llama-vision-tutorial/","name":"Llama 3.2 11B Vision Instruct model on Cloudflare Workers AI"}}]}
```
