---
title: Vectorize and Workers AI
description: Generate vector embeddings with Workers AI and store them in a Vectorize index.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/vectorize/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Vectorize and Workers AI

Vectorize is now Generally Available

To report bugs or give feedback, go to the [#vectorize Discord channel ↗](https://discord.cloudflare.com). If you are having issues with Wrangler, report issues in the [Wrangler GitHub repository ↗](https://github.com/cloudflare/workers-sdk/issues/new/choose).

Vectorize allows you to generate [vector embeddings](https://developers.cloudflare.com/vectorize/reference/what-is-a-vector-database/) using a machine-learning model, including the models available in [Workers AI](https://developers.cloudflare.com/workers-ai/).

New to Vectorize?

If this is your first time using Vectorize or a vector database, start with the [Vectorize Get started guide](https://developers.cloudflare.com/vectorize/get-started/intro/).

This guide will instruct you through:

* Creating a Vectorize index.
* Connecting a [Cloudflare Worker](https://developers.cloudflare.com/workers/) to your index.
* Using [Workers AI](https://developers.cloudflare.com/workers-ai/) to generate vector embeddings.
* Using Vectorize to query those vector embeddings.

## Prerequisites

To continue:

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [npm ↗](https://docs.npmjs.com/getting-started).
3. Install [Node.js ↗](https://nodejs.org/en/). Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) requires a Node version of `16.17.0` or later.

## 1\. Create a Worker

You will create a new project that will contain a Worker script, which will act as the client application for your Vectorize index.

Open your terminal and create a new project named `embeddings-tutorial` by running the following command:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- embeddings-tutorial
```

```
yarn create cloudflare embeddings-tutorial
```

```
pnpm create cloudflare@latest embeddings-tutorial
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

This will create a new `embeddings-tutorial` directory. Your new `embeddings-tutorial` directory will include:

* A `"Hello World"` [Worker](https://developers.cloudflare.com/workers/get-started/guide/#3-write-code) at `src/index.ts`.
* A [wrangler.jsonc](https://developers.cloudflare.com/workers/wrangler/configuration/) configuration file. `wrangler.jsonc` is how your `embeddings-tutorial` Worker will access your index.

Note

If you are familiar with Cloudflare Workers, or initializing projects in a Continuous Integration (CI) environment, initialize a new project non-interactively by setting `CI=true` as an [environmental variable](https://developers.cloudflare.com/workers/configuration/environment-variables/) when running `create cloudflare@latest`.

For example: `CI=true npm create cloudflare@latest embeddings-tutorial --type=simple --git --ts --deploy=false` will create a basic "Hello World" project ready to build on.

## 2\. Create an index

A vector database is distinct from a traditional SQL or NoSQL database. A vector database is designed to store vector embeddings, which are representations of data, but not the original data itself.

To create your first Vectorize index, change into the directory you just created for your Workers project:

Terminal window

```

cd embeddings-tutorial


```

Using legacy Vectorize (V1) indexes?

Please use the `wrangler vectorize --deprecated-v1` flag to create, get, list, delete and insert vectors into legacy Vectorize V1 indexes.

Please note that by December 2024, you will not be able to create legacy Vectorize indexes. Other operations will remain functional.

Refer to the [legacy transition](https://developers.cloudflare.com/vectorize/reference/transition-vectorize-legacy) page for more details on transitioning away from legacy indexes.

To create an index, use the `wrangler vectorize create` command and provide a name for the index. A good index name is:

* A combination of lowercase and/or numeric ASCII characters, shorter than 32 characters, starts with a letter, and uses dashes (-) instead of spaces.
* Descriptive of the use-case and environment. For example, "production-doc-search" or "dev-recommendation-engine".
* Only used for describing the index, and is not directly referenced in code.

In addition, define both the `dimensions` of the vectors you will store in the index, as well as the distance `metric` used to determine similar vectors when creating the index. **This configuration cannot be changed later**, as a vector database is configured for a fixed vector configuration.

Wrangler version 3.71.0 required

Vectorize V2 requires [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) version `3.71.0` or later. Ensure you have the latest version of `wrangler` installed, or use `npx wrangler@latest vectorize` to always use the latest version.

Run the following `wrangler vectorize` command, ensuring that the `dimensions` are set to `768`: this is important, as the Workers AI model used in this tutorial outputs vectors with 768 dimensions.

Terminal window

```

npx wrangler vectorize create embeddings-index --dimensions=768 --metric=cosine


```

```

✅ Successfully created index 'embeddings-index'


[[vectorize]]

binding = "VECTORIZE" # available in your Worker on env.VECTORIZE

index_name = "embeddings-index"


```

This will create a new vector database, and output the [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) configuration needed in the next step.

## 3\. Bind your Worker to your index

You must create a binding for your Worker to connect to your Vectorize index. [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to access resources, like Vectorize or R2, from Cloudflare Workers. You create bindings by updating your Wrangler file.

To bind your index to your Worker, add the following to the end of your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-11097)
* [  wrangler.toml ](#tab-panel-11098)

JSONC

```

{

  "vectorize": [

    {

      "binding": "VECTORIZE", // available in your Worker on env.VECTORIZE

      "index_name": "embeddings-index"

    }

  ]

}


```

TOML

```

[[vectorize]]

binding = "VECTORIZE"

index_name = "embeddings-index"


```

Specifically:

* The value (string) you set for `<BINDING_NAME>` will be used to reference this database in your Worker. In this tutorial, name your binding `VECTORIZE`.
* The binding must be [a valid JavaScript variable name ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar%5Fand%5Ftypes#variables). For example, `binding = "MY_INDEX"` or `binding = "PROD_SEARCH_INDEX"` would both be valid names for the binding.
* Your binding is available in your Worker at `env.<BINDING_NAME>` and the Vectorize [client API](https://developers.cloudflare.com/vectorize/reference/client-api/) is exposed on this binding for use within your Workers application.

## 4\. Set up Workers AI

Before you deploy your embedding example, ensure your Worker uses your model catalog, including the [text embedding model](https://developers.cloudflare.com/workers-ai/models/?tasks=Text+Embeddings) built-in.

From within the `embeddings-tutorial` directory, open your Wrangler file in your editor and add the new `[[ai]]` binding to make Workers AI's models available in your Worker:

* [  wrangler.jsonc ](#tab-panel-11099)
* [  wrangler.toml ](#tab-panel-11100)

JSONC

```

{

  "vectorize": [

    {

      "binding": "VECTORIZE",

      "index_name": "embeddings-index"

    }

  ],

  "ai": {

    "binding": "AI" // available in your Worker on env.AI

  }

}


```

TOML

```

[[vectorize]]

binding = "VECTORIZE"

index_name = "embeddings-index"


[ai]

binding = "AI"


```

With Workers AI ready, you can write code in your Worker.

## 5\. Write code in your Worker

To write code in your Worker, go to your `embeddings-tutorial` Worker and open the `src/index.ts` file. The `index.ts` file is where you configure your Worker's interactions with your Vectorize index.

Clear the content of `index.ts`. Paste the following code snippet into your `index.ts` file. On the `env` parameter, replace `<BINDING_NAME>` with `VECTORIZE`:

TypeScript

```

export interface Env {

  VECTORIZE: Vectorize;

  AI: Ai;

}

interface EmbeddingResponse {

  shape: number[];

  data: number[][];

}


export default {

  async fetch(request, env, ctx): Promise<Response> {

    let path = new URL(request.url).pathname;

    if (path.startsWith("/favicon")) {

      return new Response("", { status: 404 });

    }


    // You only need to generate vector embeddings once (or as

    // data changes), not on every request

    if (path === "/insert") {

      // In a real-world application, you could read content from R2 or

      // a SQL database (like D1) and pass it to Workers AI

      const stories = [

        "This is a story about an orange cloud",

        "This is a story about a llama",

        "This is a story about a hugging emoji",

      ];

      const modelResp: EmbeddingResponse = await env.AI.run(

        "@cf/baai/bge-base-en-v1.5",

        {

          text: stories,

        },

      );


      // Convert the vector embeddings into a format Vectorize can accept.

      // Each vector needs an ID, a value (the vector) and optional metadata.

      // In a real application, your ID would be bound to the ID of the source

      // document.

      let vectors: VectorizeVector[] = [];

      let id = 1;

      modelResp.data.forEach((vector) => {

        vectors.push({ id: `${id}`, values: vector });

        id++;

      });


      let inserted = await env.VECTORIZE.upsert(vectors);

      return Response.json(inserted);

    }


    // Your query: expect this to match vector ID. 1 in this example

    let userQuery = "orange cloud";

    const queryVector: EmbeddingResponse = await env.AI.run(

      "@cf/baai/bge-base-en-v1.5",

      {

        text: [userQuery],

      },

    );


    let matches = await env.VECTORIZE.query(queryVector.data[0], {

      topK: 1,

    });

    return Response.json({

      // Expect a vector ID. 1 to be your top match with a score of

      // ~0.89693683

      // This tutorial uses a cosine distance metric, where the closer to one,

      // the more similar.

      matches: matches,

    });

  },

} satisfies ExportedHandler<Env>;


```

## 6\. Deploy your Worker

Before deploying your Worker globally, log in with your Cloudflare account by running:

Terminal window

```

npx wrangler login


```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

From here, deploy your Worker to make your project accessible on the Internet. To deploy your Worker, run:

Terminal window

```

npx wrangler deploy


```

Preview your Worker at `https://embeddings-tutorial.<YOUR_SUBDOMAIN>.workers.dev`.

## 7\. Query your index

You can now visit the URL for your newly created project to insert vectors and then query them.

With the URL for your deployed Worker (for example,`https://embeddings-tutorial.<YOUR_SUBDOMAIN>.workers.dev/`), open your browser and:

1. Insert your vectors first by visiting `/insert`.
2. Query your index by visiting the index route - `/`.

This should return the following JSON:

```

{

  "matches": {

    "count": 1,

    "matches": [

      {

        "id": "1",

        "score": 0.89693683

      }

    ]

  }

}


```

Extend this example by:

* Adding more inputs and generating a larger set of vectors.
* Accepting a custom query parameter passed in the URL, for example via `URL.searchParams`.
* Creating a new index with a different [distance metric](https://developers.cloudflare.com/vectorize/best-practices/create-indexes/#distance-metrics) and observing how your scores change in response to your inputs.

By finishing this tutorial, you have successfully created a Vectorize index, used Workers AI to generate vector embeddings, and deployed your project globally.

## Next steps

* Build a [generative AI chatbot](https://developers.cloudflare.com/workers-ai/guides/tutorials/build-a-retrieval-augmented-generation-ai/) using Workers AI and Vectorize.
* Learn more about [how vector databases work](https://developers.cloudflare.com/vectorize/reference/what-is-a-vector-database/).
* Read [examples](https://developers.cloudflare.com/vectorize/reference/client-api/) on how to use the Vectorize API from Cloudflare Workers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/vectorize/get-started/embeddings/#page","headline":"Vectorize and Workers AI · Cloudflare Vectorize docs","description":"Generate vector embeddings with Workers AI and store them in a Vectorize index.","url":"https://developers.cloudflare.com/vectorize/get-started/embeddings/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/vectorize/","name":"Vectorize"}},{"@type":"ListItem","position":3,"item":{"@id":"/vectorize/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/vectorize/get-started/embeddings/","name":"Vectorize and Workers AI"}}]}
```
