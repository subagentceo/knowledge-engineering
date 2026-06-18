---
title: Build a Retrieval Augmented Generation (RAG) AI
description: Build your first AI app with Cloudflare AI. This guide uses Workers AI, Vectorize, D1, and Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build a Retrieval Augmented Generation (RAG) AI

**Last reviewed:**  over 1 year ago 

This guide will instruct you through setting up and deploying your first application with Cloudflare AI. You will build a fully-featured AI-powered application, using tools like Workers AI, Vectorize, D1, and Cloudflare Workers.

Looking for a managed option?

[AI Search](https://developers.cloudflare.com/ai-search/) offers a fully managed way to build RAG pipelines on Cloudflare, handling ingestion, indexing, and querying out of the box. [Get started](https://developers.cloudflare.com/ai-search/get-started/).

At the end of this tutorial, you will have built an AI tool that allows you to store information and query it using a Large Language Model. This pattern, known as Retrieval Augmented Generation, or RAG, is a useful project you can build by combining multiple aspects of Cloudflare's AI toolkit. You do not need to have experience working with AI tools to build this application.

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You will also need access to [Vectorize](https://developers.cloudflare.com/vectorize/platform/pricing/). During this tutorial, we will show how you can optionally integrate with [Anthropic Claude ↗](http://anthropic.com) as well. You will need an [Anthropic API key ↗](https://docs.anthropic.com/en/api/getting-started) to do so.

## 1\. Create a new Worker project

C3 (`create-cloudflare-cli`) is a command-line tool designed to help you setup and deploy Workers to Cloudflare as fast as possible.

Open a terminal window and run C3 to create your Worker project:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- rag-ai-tutorial
```

```
yarn create cloudflare rag-ai-tutorial
```

```
pnpm create cloudflare@latest rag-ai-tutorial
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `JavaScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

In your project directory, C3 has generated several files.

What files did C3 create?

1. `wrangler.jsonc`: Your [Wrangler](https://developers.cloudflare.com/workers/wrangler/configuration/#sample-wrangler-configuration) configuration file.
2. `index.js` (in `/src`): A minimal `'Hello World!'` Worker written in [ES module](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/) syntax.
3. `package.json`: A minimal Node dependencies configuration file.
4. `package-lock.json`: Refer to [npm documentation on package-lock.json ↗](https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json).
5. `node_modules`: Refer to [npm documentation node\_modules ↗](https://docs.npmjs.com/cli/v7/configuring-npm/folders#node-modules).

Now, move into your newly created directory:

Terminal window

```

cd rag-ai-tutorial


```

## 2\. Develop with Wrangler CLI

The Workers command-line interface, [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), allows you to [create](https://developers.cloudflare.com/workers/wrangler/commands/general/#init), [test](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev), and [deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) your Workers projects. C3 will install Wrangler in projects by default.

After you have created your first Worker, run the [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) command in the project directory to start a local server for developing your Worker. This will allow you to test your Worker locally during development.

Terminal window

```

npx wrangler dev


```

You will now be able to go to [http://localhost:8787 ↗](http://localhost:8787) to see your Worker running. Any changes you make to your code will trigger a rebuild, and reloading the page will show you the up-to-date output of your Worker.

## 3\. Adding the AI binding

To begin using Cloudflare's AI products, you can add the `ai` block to the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) as a [remote binding](https://developers.cloudflare.com/workers/development-testing/#remote-bindings). This will set up a binding to Cloudflare's AI models in your code that you can use to interact with the available AI models on the platform.

Note

If you have not used Wrangler before, it will try to open your web browser to login with your Cloudflare account.

If you have issues with this step or you do not have access to a browser interface, refer to the [wrangler login](https://developers.cloudflare.com/workers/wrangler/commands/general/#login) documentation for more information.

This example features the [@cf/meta/llama-3-8b-instruct model](https://developers.cloudflare.com/workers-ai/models/llama-3-8b-instruct/), which generates text.

* [  wrangler.jsonc ](#tab-panel-11317)
* [  wrangler.toml ](#tab-panel-11318)

JSONC

```

{

  "ai": {

    "binding": "AI",

    "remote": true

  }

}


```

TOML

```

[ai]

binding = "AI"

remote = true


```

Now, find the `src/index.js` file. Inside the `fetch` handler, you can query the `AI` binding:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    const answer = await env.AI.run("@cf/meta/llama-3-8b-instruct", {

      messages: [{ role: "user", content: `What is the square root of 9?` }],

    });


    return new Response(JSON.stringify(answer));

  },

};


```

By querying the LLM through the `AI` binding, we can interact directly with Cloudflare AI's large language models directly in our code. In this example, we are using the [@cf/meta/llama-3-8b-instruct model](https://developers.cloudflare.com/workers-ai/models/llama-3-8b-instruct/), which generates text.

Deploy your Worker using `wrangler`:

Terminal window

```

npx wrangler deploy


```

Making a request to your Worker will now generate a text response from the LLM, and return it as a JSON object.

Terminal window

```

curl https://example.username.workers.dev


```

```

{"response":"Answer: The square root of 9 is 3."}


```

## 4\. Adding embeddings using Cloudflare D1 and Vectorize

Embeddings allow you to add additional capabilities to the language models you can use in your Cloudflare AI projects. This is done via **Vectorize**, Cloudflare's vector database.

To begin using Vectorize, create a new embeddings index using `wrangler`. This index will store vectors with 768 dimensions, and will use cosine similarity to determine which vectors are most similar to each other:

Terminal window

```

npx wrangler vectorize create vector-index --dimensions=768 --metric=cosine


```

Then, add the configuration details for your new Vectorize index to the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-11319)
* [  wrangler.toml ](#tab-panel-11320)

JSONC

```

{

  // ... existing wrangler configuration

  "vectorize": [

    {

      "binding": "VECTOR_INDEX",

      "index_name": "vector-index"

    }

  ]

}


```

TOML

```

[[vectorize]]

binding = "VECTOR_INDEX"

index_name = "vector-index"


```

A vector index allows you to store a collection of dimensions, which are floating point numbers used to represent your data. When you want to query the vector database, you can also convert your query into dimensions. **Vectorize** is designed to efficiently determine which stored vectors are most similar to your query.

To implement the searching feature, you must set up a D1 database from Cloudflare. In D1, you can store your app's data. Then, you change this data into a vector format. When someone searches and it matches the vector, you can show them the matching data.

Create a new D1 database using `wrangler`:

Terminal window

```

npx wrangler d1 create database


```

Then, paste the configuration details output from the previous command into the [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-11321)
* [  wrangler.toml ](#tab-panel-11322)

JSONC

```

{

  // ... existing wrangler configuration

  "d1_databases": [

    {

      "binding": "DB", // available in your Worker on env.DB

      "database_name": "database",

      "database_id": "abc-def-geh" // replace this with a real database_id (UUID)

    }

  ]

}


```

TOML

```

[[d1_databases]]

binding = "DB"

database_name = "database"

database_id = "abc-def-geh"


```

In this application, we'll create a `notes` table in D1, which will allow us to store notes and later retrieve them in Vectorize. To create this table, run a SQL command using `wrangler d1 execute`:

Terminal window

```

npx wrangler d1 execute database --remote --command "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, text TEXT NOT NULL)"


```

Now, we can add a new note to our database using `wrangler d1 execute`:

Terminal window

```

npx wrangler d1 execute database --remote --command "INSERT INTO notes (text) VALUES ('The best pizza topping is pepperoni')"


```

## 5\. Creating a workflow

Before we begin creating notes, we will introduce a [Cloudflare Workflow](https://developers.cloudflare.com/workflows). This will allow us to define a durable workflow that can safely and robustly execute all the steps of the RAG process.

To begin, add a new `[[workflows]]` block to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-11323)
* [  wrangler.toml ](#tab-panel-11324)

JSONC

```

{

  // ... existing wrangler configuration

  "workflows": [

    {

      "name": "rag",

      "binding": "RAG_WORKFLOW",

      "class_name": "RAGWorkflow"

    }

  ]

}


```

TOML

```

[[workflows]]

name = "rag"

binding = "RAG_WORKFLOW"

class_name = "RAGWorkflow"


```

In `src/index.js`, add a new class called `RAGWorkflow` that extends `WorkflowEntrypoint`:

JavaScript

```

import { WorkflowEntrypoint } from "cloudflare:workers";


export class RAGWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    await step.do("example step", async () => {

      console.log("Hello World!");

    });

  }

}


```

This class will define a single workflow step that will log "Hello World!" to the console. You can add as many steps as you need to your workflow.

On its own, this workflow will not do anything. To execute the workflow, we will call the `RAG_WORKFLOW` binding, passing in any parameters that the workflow needs to properly complete. Here is an example of how we can call the workflow:

JavaScript

```

env.RAG_WORKFLOW.create({ params: { text } });


```

## 6\. Creating notes and adding them to Vectorize

To expand on your Workers function in order to handle multiple routes, we will add `hono`, a routing library for Workers. This will allow us to create a new route for adding notes to our database. Install `hono` using `npm`:

 npm  yarn  pnpm  bun 

```
npm i hono
```

```
yarn add hono
```

```
pnpm add hono
```

```
bun add hono
```

Then, import `hono` into your `src/index.js` file. You should also update the `fetch` handler to use `hono`:

JavaScript

```

import { Hono } from "hono";

const app = new Hono();


app.get("/", async (c) => {

  const answer = await c.env.AI.run("@cf/meta/llama-3-8b-instruct", {

    messages: [{ role: "user", content: `What is the square root of 9?` }],

  });


  return c.json(answer);

});


export default app;


```

This will establish a route at the root path `/` that is functionally equivalent to the previous version of your application.

Now, we can update our workflow to begin adding notes to our database, and generating the related embeddings for them.

This example features the [@cf/baai/bge-base-en-v1.5 model](https://developers.cloudflare.com/workers-ai/models/bge-base-en-v1.5/), which can be used to create an embedding. Embeddings are stored and retrieved inside [Vectorize](https://developers.cloudflare.com/vectorize/), Cloudflare's vector database. The user query is also turned into an embedding so that it can be used for searching within Vectorize.

JavaScript

```

import { WorkflowEntrypoint } from "cloudflare:workers";


export class RAGWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    const env = this.env;

    const { text } = event.payload;


    const record = await step.do(`create database record`, async () => {

      const query = "INSERT INTO notes (text) VALUES (?) RETURNING *";


      const { results } = await env.DB.prepare(query).bind(text).run();


      const record = results[0];

      if (!record) throw new Error("Failed to create note");

      return record;

    });


    const embedding = await step.do(`generate embedding`, async () => {

      const embeddings = await env.AI.run("@cf/baai/bge-base-en-v1.5", {

        text: text,

      });

      const values = embeddings.data[0];

      if (!values) throw new Error("Failed to generate vector embedding");

      return values;

    });


    await step.do(`insert vector`, async () => {

      return env.VECTOR_INDEX.upsert([

        {

          id: record.id.toString(),

          values: embedding,

        },

      ]);

    });

  }

}


```

The workflow does the following things:

1. Accepts a `text` parameter.
2. Insert a new row into the `notes` table in D1, and retrieve the `id` of the new row.
3. Convert the `text` into a vector using the `embeddings` model of the LLM binding.
4. Upsert the `id` and `vectors` into the `vector-index` index in Vectorize.

By doing this, you will create a new vector representation of the note, which can be used to retrieve the note later.

To complete the code, we will add a route that allows users to submit notes to the database. This route will parse the JSON request body, get the `note` parameter, and create a new instance of the workflow, passing the parameter:

JavaScript

```

app.post("/notes", async (c) => {

  const { text } = await c.req.json();

  if (!text) return c.text("Missing text", 400);

  await c.env.RAG_WORKFLOW.create({ params: { text } });

  return c.text("Created note", 201);

});


```

## 7\. Querying Vectorize to retrieve notes

To complete your code, you can update the root path (`/`) to query Vectorize. You will convert the query into a vector, and then use the `vector-index` index to find the most similar vectors.

The `topK` parameter limits the number of vectors returned by the function. For instance, providing a `topK` of 1 will only return the _most similar_ vector based on the query. Setting `topK` to 5 will return the 5 most similar vectors.

Given a list of similar vectors, you can retrieve the notes that match the record IDs stored alongside those vectors. In this case, we are only retrieving a single note - but you may customize this as needed.

You can insert the text of those notes as context into the prompt for the LLM binding. This is the basis of Retrieval-Augmented Generation, or RAG: providing additional context from data outside of the LLM to enhance the text generated by the LLM.

We'll update the prompt to include the context, and to ask the LLM to use the context when responding:

JavaScript

```

import { Hono } from "hono";

const app = new Hono();


// Existing post route...

// app.post('/notes', async (c) => { ... })


app.get("/", async (c) => {

  const question = c.req.query("text") || "What is the square root of 9?";


  const embeddings = await c.env.AI.run("@cf/baai/bge-base-en-v1.5", {

    text: question,

  });

  const vectors = embeddings.data[0];


  const vectorQuery = await c.env.VECTOR_INDEX.query(vectors, { topK: 1 });

  let vecId;

  if (

    vectorQuery.matches &&

    vectorQuery.matches.length > 0 &&

    vectorQuery.matches[0]

  ) {

    vecId = vectorQuery.matches[0].id;

  } else {

    console.log("No matching vector found or vectorQuery.matches is empty");

  }


  let notes = [];

  if (vecId) {

    const query = `SELECT * FROM notes WHERE id = ?`;

    const { results } = await c.env.DB.prepare(query).bind(vecId).run();

    if (results) notes = results.map((vec) => vec.text);

  }


  const contextMessage = notes.length

    ? `Context:\n${notes.map((note) => `- ${note}`).join("\n")}`

    : "";


  const systemPrompt = `When answering the question or responding, use the context provided, if it is provided and relevant.`;


  const { response: answer } = await c.env.AI.run(

    "@cf/meta/llama-3-8b-instruct",

    {

      messages: [

        ...(notes.length ? [{ role: "system", content: contextMessage }] : []),

        { role: "system", content: systemPrompt },

        { role: "user", content: question },

      ],

    },

  );


  return c.text(answer);

});


app.onError((err, c) => {

  return c.text(err);

});


export default app;


```

## 8\. Adding Anthropic Claude model (optional)

If you are working with larger documents, you have the option to use Anthropic's [Claude models ↗](https://claude.ai/), which have large context windows and are well-suited to RAG workflows.

To begin, install the `@anthropic-ai/sdk` package:

 npm  yarn  pnpm  bun 

```
npm i @anthropic-ai/sdk
```

```
yarn add @anthropic-ai/sdk
```

```
pnpm add @anthropic-ai/sdk
```

```
bun add @anthropic-ai/sdk
```

In `src/index.js`, you can update the `GET /` route to check for the `ANTHROPIC_API_KEY` environment variable. If it is set, we can generate text using the Anthropic SDK. If it is not set, we'll fall back to the existing Workers AI code:

JavaScript

```

import Anthropic from '@anthropic-ai/sdk';


app.get('/', async (c) => {

  // ... Existing code

  const systemPrompt = `When answering the question or responding, use the context provided, if it is provided and relevant.`


  let modelUsed = ""

  let response = null


  if (c.env.ANTHROPIC_API_KEY) {

    const anthropic = new Anthropic({

      apiKey: c.env.ANTHROPIC_API_KEY

    })


    const model = "claude-3-5-sonnet-latest"

    modelUsed = model


    const message = await anthropic.messages.create({

      max_tokens: 1024,

      model,

      messages: [

        { role: 'user', content: question }

      ],

      system: [systemPrompt, notes ? contextMessage : ''].join(" ")

    })


    response = {

      response: message.content.map(content => content.text).join("\n")

    }

  } else {

    const model = "@cf/meta/llama-3.1-8b-instruct"

    modelUsed = model


    response = await c.env.AI.run(

      model,

      {

        messages: [

          ...(notes.length ? [{ role: 'system', content: contextMessage }] : []),

          { role: 'system', content: systemPrompt },

          { role: 'user', content: question }

        ]

      }

    )

  }


  if (response) {

    c.header('x-model-used', modelUsed)

    return c.text(response.response)

  } else {

    return c.text("We were unable to generate output", 500)

  }

})


```

Finally, you'll need to set the `ANTHROPIC_API_KEY` environment variable in your Workers application. You can do this by using `wrangler secret put`:

Terminal window

```

$ npx wrangler secret put ANTHROPIC_API_KEY


```

## 9\. Deleting notes and vectors

If you no longer need a note, you can delete it from the database. Any time that you delete a note, you will also need to delete the corresponding vector from Vectorize. You can implement this by building a `DELETE /notes/:id` route in your `src/index.js` file:

JavaScript

```

app.delete("/notes/:id", async (c) => {

  const { id } = c.req.param();


  const query = `DELETE FROM notes WHERE id = ?`;

  await c.env.DB.prepare(query).bind(id).run();


  await c.env.VECTOR_INDEX.deleteByIds([id]);


  return c.status(204);

});


```

## 10\. Text splitting (optional)

For large pieces of text, it is recommended to split the text into smaller chunks. This allows LLMs to more effectively gather relevant context, without needing to retrieve large pieces of text.

To implement this, we'll add a new NPM package to our project, \`@langchain/textsplitters':

 npm  yarn  pnpm  bun 

```
npm i @langchain/textsplitters
```

```
yarn add @langchain/textsplitters
```

```
pnpm add @langchain/textsplitters
```

```
bun add @langchain/textsplitters
```

The `RecursiveCharacterTextSplitter` class provided by this package will split the text into smaller chunks. It can be customized to your liking, but the default config works in most cases:

JavaScript

```

import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


const text = "Some long piece of text...";


const splitter = new RecursiveCharacterTextSplitter({

  // These can be customized to change the chunking size

  // chunkSize: 1000,

  // chunkOverlap: 200,

});


const output = await splitter.createDocuments([text]);

console.log(output); // [{ pageContent: 'Some long piece of text...' }]


```

To use this splitter, we'll update the workflow to split the text into smaller chunks. We'll then iterate over the chunks and run the rest of the workflow for each chunk of text:

JavaScript

```

export class RAGWorkflow extends WorkflowEntrypoint {

  async run(event, step) {

    const env = this.env;

    const { text } = event.payload;

    let texts = await step.do("split text", async () => {

      const splitter = new RecursiveCharacterTextSplitter();

      const output = await splitter.createDocuments([text]);

      return output.map((doc) => doc.pageContent);

    });


    console.log(

      "RecursiveCharacterTextSplitter generated ${texts.length} chunks",

    );


    for (const index in texts) {

      const text = texts[index];

      const record = await step.do(

        `create database record: ${index}/${texts.length}`,

        async () => {

          const query = "INSERT INTO notes (text) VALUES (?) RETURNING *";


          const { results } = await env.DB.prepare(query).bind(text).run();


          const record = results[0];

          if (!record) throw new Error("Failed to create note");

          return record;

        },

      );


      const embedding = await step.do(

        `generate embedding: ${index}/${texts.length}`,

        async () => {

          const embeddings = await env.AI.run("@cf/baai/bge-base-en-v1.5", {

            text: text,

          });

          const values = embeddings.data[0];

          if (!values) throw new Error("Failed to generate vector embedding");

          return values;

        },

      );


      await step.do(`insert vector: ${index}/${texts.length}`, async () => {

        return env.VECTOR_INDEX.upsert([

          {

            id: record.id.toString(),

            values: embedding,

          },

        ]);

      });

    }

  }

}


```

Now, when large pieces of text are submitted to the `/notes` endpoint, they will be split into smaller chunks, and each chunk will be processed by the workflow.

## 11\. Deploy your project

If you did not deploy your Worker during [step 1](https://developers.cloudflare.com/workers/get-started/guide/#1-create-a-new-worker-project), deploy your Worker via Wrangler, to a `*.workers.dev` subdomain, or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), if you have one configured. If you have not configured any subdomain or domain, Wrangler will prompt you during the publish process to set one up.

Terminal window

```

npx wrangler deploy


```

Preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`.

Note

When pushing to your `*.workers.dev` subdomain for the first time, you may see [523 errors](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-523/) while DNS is propagating. These errors should resolve themselves after a minute or so.

## Related resources

A full version of this codebase is available on GitHub. It includes a frontend UI for querying, adding, and deleting notes, as well as a backend API for interacting with the database and vector index. You can find it here: [github.com/kristianfreeman/cloudflare-retrieval-augmented-generation-example ↗](https://github.com/kristianfreeman/cloudflare-retrieval-augmented-generation-example/).

To do more:

* Explore the reference diagram for a [Retrieval Augmented Generation (RAG) Architecture](https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-rag/).
* Review Cloudflare's [AI documentation](https://developers.cloudflare.com/workers-ai).
* Review [Tutorials](https://developers.cloudflare.com/workers/tutorials/) to build projects on Workers.
* Explore [Examples](https://developers.cloudflare.com/workers/examples/) to experiment with copy and paste Worker code.
* Understand how Workers works in [Reference](https://developers.cloudflare.com/workers/reference/).
* Learn about Workers features and functionality in [Platform](https://developers.cloudflare.com/workers/platform/).
* Set up [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) to programmatically create, test, and deploy your Worker projects.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/guides/tutorials/build-a-retrieval-augmented-generation-ai/#page","headline":"Build a Retrieval Augmented Generation (RAG) AI · Cloudflare Workers AI docs","description":"Build your first AI app with Cloudflare AI. This guide uses Workers AI, Vectorize, D1, and Cloudflare Workers.","url":"https://developers.cloudflare.com/workers-ai/guides/tutorials/build-a-retrieval-augmented-generation-ai/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-03-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","Hono","JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/guides/","name":"Guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/guides/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/guides/tutorials/build-a-retrieval-augmented-generation-ai/","name":"Build a Retrieval Augmented Generation (RAG) AI"}}]}
```
