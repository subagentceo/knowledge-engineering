---
title: Introduction to Vectorize
description: Create your first Vectorize index, connect a Worker, and run a similarity search.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/vectorize/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Introduction to Vectorize

Vectorize is now Generally Available

To report bugs or give feedback, go to the [#vectorize Discord channel ↗](https://discord.cloudflare.com). If you are having issues with Wrangler, report issues in the [Wrangler GitHub repository ↗](https://github.com/cloudflare/workers-sdk/issues/new/choose).

Vectorize is Cloudflare's vector database. Vector databases allow you to use machine learning (ML) models to perform semantic search, recommendation, classification and anomaly detection tasks, as well as provide context to LLMs (Large Language Models).

This guide will instruct you through:

* Creating your first Vectorize index.
* Connecting a [Cloudflare Worker](https://developers.cloudflare.com/workers/) to your index.
* Inserting and performing a similarity search by querying your index.

## Prerequisites

Workers Free or Paid plans required

Vectorize is available to all users on the [Workers Free or Paid plans](https://developers.cloudflare.com/workers/platform/pricing/#workers).

To continue, you will need:

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages) if you have not already.
2. Install [npm ↗](https://docs.npmjs.com/getting-started).
3. Install [Node.js ↗](https://nodejs.org/en/). Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) requires a Node version of `16.17.0` or later.

## 1\. Create a Worker

New to Workers?

Refer to [How Workers works](https://developers.cloudflare.com/workers/reference/how-workers-works/) to learn about the Workers serverless execution model works. Go to the [Workers Get started guide](https://developers.cloudflare.com/workers/get-started/guide/) to set up your first Worker.

You will create a new project that will contain a Worker, which will act as the client application for your Vectorize index.

Create a new project named `vectorize-tutorial` by running:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- vectorize-tutorial
```

```
yarn create cloudflare vectorize-tutorial
```

```
pnpm create cloudflare@latest vectorize-tutorial
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

This will create a new `vectorize-tutorial` directory. Your new `vectorize-tutorial` directory will include:

* A `"Hello World"` [Worker](https://developers.cloudflare.com/workers/get-started/guide/#3-write-code) at `src/index.ts`.
* A [wrangler.jsonc](https://developers.cloudflare.com/workers/wrangler/configuration/) configuration file. `wrangler.jsonc` is how your `vectorize-tutorial` Worker will access your index.

Note

If you are familiar with Cloudflare Workers, or initializing projects in a Continuous Integration (CI) environment, initialize a new project non-interactively by setting `CI=true` as an [environmental variable](https://developers.cloudflare.com/workers/configuration/environment-variables/) when running `create cloudflare@latest`.

For example: `CI=true npm create cloudflare@latest vectorize-tutorial --type=simple --git --ts --deploy=false` will create a basic "Hello World" project ready to build on.

## 2\. Create an index

A vector database is distinct from a traditional SQL or NoSQL database. A vector database is designed to store vector embeddings, which are representations of data, but not the original data itself.

To create your first Vectorize index, change into the directory you just created for your Workers project:

Terminal window

```

cd vectorize-tutorial


```

Using legacy Vectorize (V1) indexes?

Please use the `wrangler vectorize --deprecated-v1` flag to create, get, list, delete and insert vectors into legacy Vectorize V1 indexes.

Please note that by December 2024, you will not be able to create legacy Vectorize indexes. Other operations will remain functional.

Refer to the [legacy transition](https://developers.cloudflare.com/vectorize/reference/transition-vectorize-legacy) page for more details on transitioning away from legacy indexes.

To create an index, you will need to use the `wrangler vectorize create` command and provide a name for the index. A good index name is:

* A combination of lowercase and/or numeric ASCII characters, shorter than 32 characters, starts with a letter, and uses dashes (-) instead of spaces.
* Descriptive of the use-case and environment. For example, "production-doc-search" or "dev-recommendation-engine".
* Only used for describing the index, and is not directly referenced in code.

In addition, you will need to define both the `dimensions` of the vectors you will store in the index, as well as the distance `metric` used to determine similar vectors when creating the index. A `metric` can be euclidean, cosine, or dot product. **This configuration cannot be changed later**, as a vector database is configured for a fixed vector configuration.

Wrangler version 3.71.0 required

Vectorize V2 requires [wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) version `3.71.0` or later. Ensure you have the latest version of `wrangler` installed, or use `npx wrangler@latest vectorize` to always use the latest version.

Run the following `wrangler vectorize` command:

Terminal window

```

npx wrangler vectorize create tutorial-index --dimensions=32 --metric=euclidean


```

```

🚧 Creating index: 'tutorial-index'

✅ Successfully created a new Vectorize index: 'tutorial-index'

📋 To start querying from a Worker, add the following binding configuration into 'wrangler.toml':


[[vectorize]]

binding = "VECTORIZE" # available in your Worker on env.VECTORIZE

index_name = "tutorial-index"


```

The command above will create a new vector database, and output the [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) configuration needed in the next step.

## 3\. Bind your Worker to your index

You must create a binding for your Worker to connect to your Vectorize index. [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to access resources, like Vectorize or R2, from Cloudflare Workers. You create bindings by updating the worker's Wrangler file.

To bind your index to your Worker, add the following to the end of your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-11101)
* [  wrangler.toml ](#tab-panel-11102)

JSONC

```

{

  "vectorize": [

    {

      "binding": "VECTORIZE", // available in your Worker on env.VECTORIZE

      "index_name": "tutorial-index"

    }

  ]

}


```

TOML

```

[[vectorize]]

binding = "VECTORIZE"

index_name = "tutorial-index"


```

Specifically:

* The value (string) you set for `<BINDING_NAME>` will be used to reference this database in your Worker. In this tutorial, name your binding `VECTORIZE`.
* The binding must be [a valid JavaScript variable name ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar%5Fand%5Ftypes#variables). For example, `binding = "MY_INDEX"` or `binding = "PROD_SEARCH_INDEX"` would both be valid names for the binding.
* Your binding is available in your Worker at `env.<BINDING_NAME>` and the Vectorize [client API](https://developers.cloudflare.com/vectorize/reference/client-api/) is exposed on this binding for use within your Workers application.

## 4\. \[Optional\] Create metadata indexes

Vectorize allows you to add up to 10KiB of metadata per vector into your index, and also provides the ability to filter on that metadata while querying vectors. To do so you would need to specify a metadata field as a "metadata index" for your Vectorize index.

When to create metadata indexes?

As of today, the metadata fields on which vectors can be filtered need to be specified before the vectors are inserted, and it is recommended that these metadata fields are specified right after the creation of a Vectorize index.

To enable vector filtering on a metadata field during a query, use a command like:

Terminal window

```

npx wrangler vectorize create-metadata-index tutorial-index --property-name=url --type=string


```

```

📋 Creating metadata index...

✅ Successfully enqueued metadata index creation request. Mutation changeset identifier: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.


```

Here `url` is the metadata field on which filtering would be enabled. The `--type` parameter defines the data type for the metadata field; `string`, `number` and `boolean` types are supported.

It typically takes a few seconds for the metadata index to be created. You can check the list of metadata indexes for your Vectorize index by running:

Terminal window

```

npx wrangler vectorize list-metadata-index tutorial-index


```

```

📋 Fetching metadata indexes...

┌──────────────┬────────┐

│ propertyName │ type   │

├──────────────┼────────┤

│ url          │ String │

└──────────────┴────────┘


```

You can create up to 10 metadata indexes per Vectorize index.

For metadata indexes of type `number`, the indexed number precision is that of float64.

For metadata indexes of type `string`, each vector indexes the first 64B of the string data truncated on UTF-8 character boundaries to the longest well-formed UTF-8 substring within that limit, so vectors are filterable on the first 64B of their value for each indexed property.

See [Vectorize Limits](https://developers.cloudflare.com/vectorize/platform/limits/) for a complete list of limits.

## 5\. Insert vectors

Before you can query a vector database, you need to insert vectors for it to query against. These vectors would be generated from data (such as text or images) you pass to a machine learning model. However, this tutorial will define static vectors to illustrate how vector search works on its own.

First, go to your `vectorize-tutorial` Worker and open the `src/index.ts` file. The `index.ts` file is where you configure your Worker's interactions with your Vectorize index.

Clear the content of `index.ts`, and paste the following code snippet into your `index.ts` file. On the `env` parameter, replace `<BINDING_NAME>` with `VECTORIZE`:

TypeScript

```

export interface Env {

  // This makes your vector index methods available on env.VECTORIZE.*

  // For example, env.VECTORIZE.insert() or query()

  VECTORIZE: Vectorize;

}


// Sample vectors: 32 dimensions wide.

//

// Vectors from popular machine-learning models are typically ~100 to 1536 dimensions

// wide (or wider still).

const sampleVectors: Array<VectorizeVector> = [

  {

    id: "1",

    values: [

      0.12, 0.45, 0.67, 0.89, 0.23, 0.56, 0.34, 0.78, 0.12, 0.9, 0.24, 0.67,

      0.89, 0.35, 0.48, 0.7, 0.22, 0.58, 0.74, 0.33, 0.88, 0.66, 0.45, 0.27,

      0.81, 0.54, 0.39, 0.76, 0.41, 0.29, 0.83, 0.55,

    ],

    metadata: { url: "/products/sku/13913913" },

  },

  {

    id: "2",

    values: [

      0.14, 0.23, 0.36, 0.51, 0.62, 0.47, 0.59, 0.74, 0.33, 0.89, 0.41, 0.53,

      0.68, 0.29, 0.77, 0.45, 0.24, 0.66, 0.71, 0.34, 0.86, 0.57, 0.62, 0.48,

      0.78, 0.52, 0.37, 0.61, 0.69, 0.28, 0.8, 0.53,

    ],

    metadata: { url: "/products/sku/10148191" },

  },

  {

    id: "3",

    values: [

      0.21, 0.33, 0.55, 0.67, 0.8, 0.22, 0.47, 0.63, 0.31, 0.74, 0.35, 0.53,

      0.68, 0.45, 0.55, 0.7, 0.28, 0.64, 0.71, 0.3, 0.77, 0.6, 0.43, 0.39, 0.85,

      0.55, 0.31, 0.69, 0.52, 0.29, 0.72, 0.48,

    ],

    metadata: { url: "/products/sku/97913813" },

  },

  {

    id: "4",

    values: [

      0.17, 0.29, 0.42, 0.57, 0.64, 0.38, 0.51, 0.72, 0.22, 0.85, 0.39, 0.66,

      0.74, 0.32, 0.53, 0.48, 0.21, 0.69, 0.77, 0.34, 0.8, 0.55, 0.41, 0.29,

      0.7, 0.62, 0.35, 0.68, 0.53, 0.3, 0.79, 0.49,

    ],

    metadata: { url: "/products/sku/418313" },

  },

  {

    id: "5",

    values: [

      0.11, 0.46, 0.68, 0.82, 0.27, 0.57, 0.39, 0.75, 0.16, 0.92, 0.28, 0.61,

      0.85, 0.4, 0.49, 0.67, 0.19, 0.58, 0.76, 0.37, 0.83, 0.64, 0.53, 0.3,

      0.77, 0.54, 0.43, 0.71, 0.36, 0.26, 0.8, 0.53,

    ],

    metadata: { url: "/products/sku/55519183" },

  },

];


export default {

  async fetch(request, env, ctx): Promise<Response> {

    let path = new URL(request.url).pathname;

    if (path.startsWith("/favicon")) {

      return new Response("", { status: 404 });

    }


    // You only need to insert vectors into your index once

    if (path.startsWith("/insert")) {

      // Insert some sample vectors into your index

      // In a real application, these vectors would be the output of a machine learning (ML) model,

      // such as Workers AI, OpenAI, or Cohere.

      const inserted = await env.VECTORIZE.insert(sampleVectors);


      // Return the mutation identifier for this insert operation

      return Response.json(inserted);

    }


    return Response.json({ text: "nothing to do... yet" }, { status: 404 });

  },

} satisfies ExportedHandler<Env>;


```

In the code above, you:

1. Define a binding to your Vectorize index from your Workers code. This binding matches the `binding` value you set in the `wrangler.jsonc` file under the `"vectorise"` key.
2. Specify a set of example vectors that you will query against in the next step.
3. Insert those vectors into the index and confirm it was successful.

In the next step, you will expand the Worker to query the index and the vectors you insert.

## 6\. Query vectors

In this step, you will take a vector representing an incoming query and use it to search your index.

First, go to your `vectorize-tutorial` Worker and open the `src/index.ts` file. The `index.ts` file is where you configure your Worker's interactions with your Vectorize index.

Clear the content of `index.ts`. Paste the following code snippet into your `index.ts` file. On the `env` parameter, replace `<BINDING_NAME>` with `VECTORIZE`:

TypeScript

```

export interface Env {

  // This makes your vector index methods available on env.VECTORIZE.*

  // For example, env.VECTORIZE.insert() or query()

  VECTORIZE: Vectorize;

}


// Sample vectors: 32 dimensions wide.

//

// Vectors from popular machine-learning models are typically ~100 to 1536 dimensions

// wide (or wider still).

const sampleVectors: Array<VectorizeVector> = [

  {

    id: "1",

    values: [

      0.12, 0.45, 0.67, 0.89, 0.23, 0.56, 0.34, 0.78, 0.12, 0.9, 0.24, 0.67,

      0.89, 0.35, 0.48, 0.7, 0.22, 0.58, 0.74, 0.33, 0.88, 0.66, 0.45, 0.27,

      0.81, 0.54, 0.39, 0.76, 0.41, 0.29, 0.83, 0.55,

    ],

    metadata: { url: "/products/sku/13913913" },

  },

  {

    id: "2",

    values: [

      0.14, 0.23, 0.36, 0.51, 0.62, 0.47, 0.59, 0.74, 0.33, 0.89, 0.41, 0.53,

      0.68, 0.29, 0.77, 0.45, 0.24, 0.66, 0.71, 0.34, 0.86, 0.57, 0.62, 0.48,

      0.78, 0.52, 0.37, 0.61, 0.69, 0.28, 0.8, 0.53,

    ],

    metadata: { url: "/products/sku/10148191" },

  },

  {

    id: "3",

    values: [

      0.21, 0.33, 0.55, 0.67, 0.8, 0.22, 0.47, 0.63, 0.31, 0.74, 0.35, 0.53,

      0.68, 0.45, 0.55, 0.7, 0.28, 0.64, 0.71, 0.3, 0.77, 0.6, 0.43, 0.39, 0.85,

      0.55, 0.31, 0.69, 0.52, 0.29, 0.72, 0.48,

    ],

    metadata: { url: "/products/sku/97913813" },

  },

  {

    id: "4",

    values: [

      0.17, 0.29, 0.42, 0.57, 0.64, 0.38, 0.51, 0.72, 0.22, 0.85, 0.39, 0.66,

      0.74, 0.32, 0.53, 0.48, 0.21, 0.69, 0.77, 0.34, 0.8, 0.55, 0.41, 0.29,

      0.7, 0.62, 0.35, 0.68, 0.53, 0.3, 0.79, 0.49,

    ],

    metadata: { url: "/products/sku/418313" },

  },

  {

    id: "5",

    values: [

      0.11, 0.46, 0.68, 0.82, 0.27, 0.57, 0.39, 0.75, 0.16, 0.92, 0.28, 0.61,

      0.85, 0.4, 0.49, 0.67, 0.19, 0.58, 0.76, 0.37, 0.83, 0.64, 0.53, 0.3,

      0.77, 0.54, 0.43, 0.71, 0.36, 0.26, 0.8, 0.53,

    ],

    metadata: { url: "/products/sku/55519183" },

  },

];


export default {

  async fetch(request, env, ctx): Promise<Response> {

    let path = new URL(request.url).pathname;

    if (path.startsWith("/favicon")) {

      return new Response("", { status: 404 });

    }


    // You only need to insert vectors into your index once

    if (path.startsWith("/insert")) {

      // Insert some sample vectors into your index

      // In a real application, these vectors would be the output of a machine learning (ML) model,

      // such as Workers AI, OpenAI, or Cohere.

      let inserted = await env.VECTORIZE.insert(sampleVectors);


      // Return the mutation identifier for this insert operation

      return Response.json(inserted);

    }


    // return Response.json({text: "nothing to do... yet"}, { status: 404 })


    // In a real application, you would take a user query. For example, "what is a

    // vector database" - and transform it into a vector embedding first.

    //

    // In this example, you will construct a vector that should

    // match vector id #4

    const queryVector: Array<number> = [

      0.13, 0.25, 0.44, 0.53, 0.62, 0.41, 0.59, 0.68, 0.29, 0.82, 0.37, 0.5,

      0.74, 0.46, 0.57, 0.64, 0.28, 0.61, 0.73, 0.35, 0.78, 0.58, 0.42, 0.32,

      0.77, 0.65, 0.49, 0.54, 0.31, 0.29, 0.71, 0.57,

    ]; // vector of dimensions 32


    // Query your index and return the three (topK = 3) most similar vector

    // IDs with their similarity score.

    //

    // By default, vector values are not returned, as in many cases the

    // vector id and scores are sufficient to map the vector back to the

    // original content it represents.

    const matches = await env.VECTORIZE.query(queryVector, {

      topK: 3,

      returnValues: true,

      returnMetadata: "all",

    });


    return Response.json({

      // This will return the closest vectors: the vectors are arranged according

      // to their scores. Vectors that are more similar would show up near the top.

      // In this example, Vector id #4 would turn out to be the most similar to the queried vector.

      // You return the full set of matches so you can check the possible scores.

      matches: matches,

    });

  },

} satisfies ExportedHandler<Env>;


```

You can also use the Vectorize `queryById()` operation to search for vectors similar to a vector that is already present in the index.

## 7\. Deploy your Worker

Before deploying your Worker globally, log in with your Cloudflare account by running:

Terminal window

```

npx wrangler login


```

You will be directed to a web page asking you to log in to the Cloudflare dashboard. After you have logged in, you will be asked if Wrangler can make changes to your Cloudflare account. Scroll down and select **Allow** to continue.

From here, you can deploy your Worker to make your project accessible on the Internet. To deploy your Worker, run:

Terminal window

```

npx wrangler deploy


```

Once deployed, preview your Worker at `https://vectorize-tutorial.<YOUR_SUBDOMAIN>.workers.dev`.

## 8\. Query your index

To insert vectors and then query them, use the URL for your deployed Worker, such as `https://vectorize-tutorial.<YOUR_SUBDOMAIN>.workers.dev/`. Open your browser and:

1. Insert your vectors first by visiting `/insert`. This should return the below JSON:

```

// https://vectorize-tutorial.<YOUR_SUBDOMAIN>.workers.dev/insert

{

  "mutationId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

}


```

The mutationId here refers to a unique identifier that corresponds to this asynchronous insert operation. Typically it takes a few seconds for inserted vectors to be available for querying.

You can use the index info operation to check the last processed mutation:

Terminal window

```

npx wrangler vectorize info tutorial-index


```

```

📋 Fetching index info...

┌────────────┬─────────────┬──────────────────────────────────────┬──────────────────────────┐

│ dimensions │ vectorCount │ processedUpToMutation                │ processedUpToDatetime    │

├────────────┼─────────────┼──────────────────────────────────────┼──────────────────────────┤

│ 32         │ 5           │ xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx │ YYYY-MM-DDThh:mm:ss.SSSZ │

└────────────┴─────────────┴──────────────────────────────────────┴──────────────────────────┘


```

Subsequent inserts using the same vector ids will return a mutation id, but it would not change the index vector count since the same vector ids cannot be inserted twice. You will need to use an `upsert` operation instead to update the vector values for an id that already exists in an index.

1. Query your index - expect your query vector of `[0.13, 0.25, 0.44, ...]` to be closest to vector ID `4` by visiting the root path of `/` . This query will return the three (`topK: 3`) closest matches, as well as their vector values and metadata.

You will notice that `id: 4` has a `score` of `0.46348256`. Because you are using `euclidean` as our distance metric, the closer the score to `0.0`, the closer your vectors are.

```

// https://vectorize-tutorial.<YOUR_SUBDOMAIN>.workers.dev/

{

  "matches": {

    "count": 3,

    "matches": [

      {

        "id": "4",

        "score": 0.46348256,

        "values": [

          0.17, 0.29, 0.42, 0.57, 0.64, 0.38, 0.51, 0.72, 0.22, 0.85, 0.39,

          0.66, 0.74, 0.32, 0.53, 0.48, 0.21, 0.69, 0.77, 0.34, 0.8, 0.55, 0.41,

          0.29, 0.7, 0.62, 0.35, 0.68, 0.53, 0.3, 0.79, 0.49

        ],

        "metadata": {

          "url": "/products/sku/418313"

        }

      },

      {

        "id": "3",

        "score": 0.52920616,

        "values": [

          0.21, 0.33, 0.55, 0.67, 0.8, 0.22, 0.47, 0.63, 0.31, 0.74, 0.35, 0.53,

          0.68, 0.45, 0.55, 0.7, 0.28, 0.64, 0.71, 0.3, 0.77, 0.6, 0.43, 0.39,

          0.85, 0.55, 0.31, 0.69, 0.52, 0.29, 0.72, 0.48

        ],

        "metadata": {

          "url": "/products/sku/97913813"

        }

      },

      {

        "id": "2",

        "score": 0.6337869,

        "values": [

          0.14, 0.23, 0.36, 0.51, 0.62, 0.47, 0.59, 0.74, 0.33, 0.89, 0.41,

          0.53, 0.68, 0.29, 0.77, 0.45, 0.24, 0.66, 0.71, 0.34, 0.86, 0.57,

          0.62, 0.48, 0.78, 0.52, 0.37, 0.61, 0.69, 0.28, 0.8, 0.53

        ],

        "metadata": {

          "url": "/products/sku/10148191"

        }

      }

    ]

  }

}


```

From here, experiment by passing a different `queryVector` and observe the results: the matches and the `score` should change based on the change in distance between the query vector and the vectors in our index.

In a real-world application, the `queryVector` would be the vector embedding representation of a query from a user or system, and our `sampleVectors` would be generated from real content. To build on this example, read the [vector search tutorial](https://developers.cloudflare.com/vectorize/get-started/embeddings/) that combines Workers AI and Vectorize to build an end-to-end application with Workers.

By finishing this tutorial, you have successfully created and queried your first Vectorize index, a Worker to access that index, and deployed your project globally.

## Related resources

* [Build an end-to-end vector search application](https://developers.cloudflare.com/vectorize/get-started/embeddings/) using Workers AI and Vectorize.
* Learn more about [how vector databases work](https://developers.cloudflare.com/vectorize/reference/what-is-a-vector-database/).
* Read [examples](https://developers.cloudflare.com/vectorize/reference/client-api/) on how to use the Vectorize API from Cloudflare Workers.
* [Euclidean Distance vs Cosine Similarity ↗](https://www.baeldung.com/cs/euclidean-distance-vs-cosine-similarity).
* [Dot product ↗](https://en.wikipedia.org/wiki/Dot%5Fproduct).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/vectorize/get-started/intro/#page","headline":"Introduction to Vectorize · Cloudflare Vectorize docs","description":"Create your first Vectorize index, connect a Worker, and run a similarity search.","url":"https://developers.cloudflare.com/vectorize/get-started/intro/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/vectorize/","name":"Vectorize"}},{"@type":"ListItem","position":3,"item":{"@id":"/vectorize/get-started/","name":"Get started"}},{"@type":"ListItem","position":4,"item":{"@id":"/vectorize/get-started/intro/","name":"Introduction to Vectorize"}}]}
```
