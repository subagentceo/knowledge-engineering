---
title: Workers Binding
description: Convert documents to Markdown using the Workers AI binding and toMarkdown method.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers Binding

Cloudflare’s serverless platform allows you to run code at the edge to build full-stack applications with [Workers](https://developers.cloudflare.com/workers/). A [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) enables your Worker or Pages Function to interact with resources on the Cloudflare Developer Platform.

To use our Markdown Conversion service directly from your Workers, create an AI binding either in the Cloudflare dashboard (refer to [AI bindings](https://developers.cloudflare.com/pages/functions/bindings/#workers-ai) for instructions), or you can update your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/). Add the following to your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-11301)
* [  wrangler.toml ](#tab-panel-11302)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "ai": {

    "binding": "AI"

  }

}


```

TOML

```

[ai]

binding = "AI" # i.e. available in your Worker on env.AI


```

## Examples

### Converting files

In this example, we fetch a PDF document and an image from R2 and feed them both to `env.AI.toMarkdown`. The result is a list of converted documents. Workers AI models are used automatically to detect and summarize the image.

* [  JavaScript ](#tab-panel-11311)
* [  TypeScript ](#tab-panel-11312)

JavaScript

```

import { Env } from "./env";


export default {

  async fetch(request, env, ctx) {

    // https://pub-979cb28270cc461d94bc8a169d8f389d.r2.dev/somatosensory.pdf

    const pdf = await env.R2.get("somatosensory.pdf");


    // https://pub-979cb28270cc461d94bc8a169d8f389d.r2.dev/cat.jpeg

    const cat = await env.R2.get("cat.jpeg");


    return Response.json(

      await env.AI.toMarkdown([

        {

          name: "somatosensory.pdf",

          blob: new Blob([await pdf.arrayBuffer()], {

            type: "application/pdf",

          }),

        },

        {

          name: "cat.jpeg",

          blob: new Blob([await cat.arrayBuffer()], {

            type: "image/jpeg",

          }),

        },

      ]),

    );

  },

};


```

TypeScript

```

import { Env } from "./env";


export default {

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {

    // https://pub-979cb28270cc461d94bc8a169d8f389d.r2.dev/somatosensory.pdf

    const pdf = await env.R2.get("somatosensory.pdf");


    // https://pub-979cb28270cc461d94bc8a169d8f389d.r2.dev/cat.jpeg

    const cat = await env.R2.get("cat.jpeg");


    return Response.json(

      await env.AI.toMarkdown([

        {

          name: "somatosensory.pdf",

          blob: new Blob([await pdf.arrayBuffer()], {

            type: "application/pdf",

          }),

        },

        {

          name: "cat.jpeg",

          blob: new Blob([await cat.arrayBuffer()], {

            type: "image/jpeg",

          }),

        },

      ]),

    );

  },

};


```

### Getting supported file formats

* [  JavaScript ](#tab-panel-11305)
* [  TypeScript ](#tab-panel-11306)

JavaScript

```

import { Env } from "./env";


export default {

  async fetch(request, env, ctx) {

    return Response.json(await env.AI.toMarkdown().supported());

  },

};


```

TypeScript

```

import { Env } from "./env";


export default {

  async fetch(request: Request, env: Env, ctx: ExecutionContext) {

    return Response.json(await env.AI.toMarkdown().supported());

  },

};


```

## Methods

### async env.AI.toMarkdown()

Takes a document or list of documents in different formats and converts them to Markdown.

* [  JavaScript ](#tab-panel-11303)
* [  TypeScript ](#tab-panel-11304)

JavaScript

```

const result = await env.AI.toMarkdown({

  name: "document.pdf",

  blob: new Blob([documentBuffer]),

});


```

TypeScript

```

const result = await env.AI.toMarkdown({

  name: "document.pdf",

  blob: new Blob([documentBuffer]),

});


```

#### Parameter

* `files`: ` MarkdownDocument | MarkdownDocument[] `\- an instance of or an array of `MarkdownDocument`s.
* `conversionOptions`: ` ConversionOptions `\- options that control how conversion happens. See [Conversion Options](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/) for further details.

#### Return values

* `results`:` Promise<ConversionResult | ConversionResult[]> `\- An instance of or an array of `ConversionResult`s.

#### `MarkdownDocument` definition

* `name` ` string `  
   * Name of the document to convert.
* `blob` ` Blob `  
   * A new [Blob ↗](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob) object with the document content.

#### `ConversionResult` definition

* `id` ` string `  
   * ID associated to this object.
* `name` ` string `  
   * Name of the converted document. Matches the input name.
* `format` ` 'markdown' | 'error' `  
   * The format of this `ConversionResult` object
* `mimetype` ` string `  
   * The detected [mime type ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME%5Ftypes/Common%5Ftypes) of the document.
* `tokens` ` number `  
   * The estimated number of tokens of the converted document. Only present if `format` is equal to `markdown`.
* `data` ` string `  
   * The content of the converted document in Markdown format. Only present if `format` is equal to `markdown`.
* `error` ` string `  
   * The error message explaining why this conversion failed. Only present if `format` is equal to `error`.

### async env.AI.toMarkdown().transform()

This method is similar to `env.AI.toMarkdown` except that it is exposed through a new handle. It takes the same arguments and returns the same values.

* [  JavaScript ](#tab-panel-11309)
* [  TypeScript ](#tab-panel-11310)

JavaScript

```

const result = await env.AI.toMarkdown().transform({

  name: "document.pdf",

  blob: new Blob([documentBuffer]),

});


```

TypeScript

```

const result = await env.AI.toMarkdown().transform({

  name: "document.pdf",

  blob: new Blob([documentBuffer]),

});


```

### async env.AI.toMarkdown().supported()

Returns a list of file formats that are currently supported for markdown conversion. See [Supported formats](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/supported-formats/) for the full list of file formats that can be converted into Markdown.

* [  JavaScript ](#tab-panel-11307)
* [  TypeScript ](#tab-panel-11308)

JavaScript

```

const formats = await env.AI.toMarkdown().supported();


```

TypeScript

```

const formats = await env.AI.toMarkdown().supported();


```

#### Return values

* `results`: ` SupportedFormat[] `\- An array of all formats supported for markdown conversion.

#### `SupportedFormat` definition

* `extension` ` string `  
   * Extension of files in this format.
* `mimeType` ` string `  
   * The [mime type ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME%5Ftypes/Common%5Ftypes) of files of this format

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/binding/#page","headline":"Workers Binding · Cloudflare Workers AI docs","description":"Convert documents to Markdown using the Workers AI binding and toMarkdown method.","url":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/binding/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/markdown-conversion/","name":"Markdown Conversion"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/features/markdown-conversion/usage/","name":"Usage"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers-ai/features/markdown-conversion/usage/binding/","name":"Workers Binding"}}]}
```
