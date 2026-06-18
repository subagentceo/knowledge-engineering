---
title: Use event notification to summarize PDF files on upload
description: Use event notification to summarize PDF files on upload. Use Workers AI to summarize the PDF and store the summary as a text file.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use event notification to summarize PDF files on upload

**Last reviewed:**  over 1 year ago 

In this tutorial, you will learn how to use [event notifications](https://developers.cloudflare.com/r2/buckets/event-notifications/) to process a PDF file when it is uploaded to an R2 bucket. You will use [Workers AI](https://developers.cloudflare.com/workers-ai/) to summarize the PDF and store the summary as a text file in the same bucket.

## Prerequisites

To continue, you will need:

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages) with access to R2.
* Have an existing R2 bucket. Refer to [Get started tutorial for R2](https://developers.cloudflare.com/r2/get-started/#2-create-a-bucket).
* Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or[nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

## 1\. Create a new project

You will create a new Worker project that will use [Static Assets](https://developers.cloudflare.com/workers/static-assets/) to serve the front-end of your application. A user can upload a PDF file using this front-end, which will then be processed by your Worker.

Create a new Worker project by running the following commands:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- pdf-summarizer
```

```
yarn create cloudflare pdf-summarizer
```

```
pnpm create cloudflare@latest pdf-summarizer
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Navigate to the `pdf-summarizer` directory:

```

cd pdf-summarizer


```

## 2\. Create the front-end

Using Static Assets, you can serve the front-end of your application from your Worker. To use Static Assets, you need to add the required bindings to your Wrangler file.

* [  wrangler.jsonc ](#tab-panel-9924)
* [  wrangler.toml ](#tab-panel-9925)

JSONC

```

{

  "assets": {

    "directory": "public"

  }

}


```

TOML

```

[assets]

directory = "public"


```

Next, create a `public` directory and add an `index.html` file. The `index.html` file should contain the following HTML code:

Select to view the HTML code

```

<!doctype html>

<html lang="en">

  <head>

    <meta charset="UTF-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>PDF Summarizer</title>

    <style>

      body {

        font-family: Arial, sans-serif;

        display: flex;

        flex-direction: column;

        min-height: 100vh;

        margin: 0;

        background-color: #fefefe;

      }

      .content {

        flex: 1;

        display: flex;

        justify-content: center;

        align-items: center;

      }

      .upload-container {

        background-color: #f0f0f0;

        padding: 20px;

        border-radius: 8px;

        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      }

      .upload-button {

        background-color: #4caf50;

        color: white;

        padding: 10px 15px;

        border: none;

        border-radius: 4px;

        cursor: pointer;

        font-size: 16px;

      }

      .upload-button:hover {

        background-color: #45a049;

      }

      footer {

        background-color: #f0f0f0;

        color: white;

        text-align: center;

        padding: 10px;

        width: 100%;

      }

      footer a {

        color: #333;

        text-decoration: none;

        margin: 0 10px;

      }

      footer a:hover {

        text-decoration: underline;

      }

    </style>

  </head>

  <body>

    <div class="content">

      <div class="upload-container">

        <h2>Upload PDF File</h2>

        <form id="uploadForm" onsubmit="return handleSubmit(event)">

          <input

            type="file"

            id="pdfFile"

            name="pdfFile"

            accept=".pdf"

            required

          />

          <button type="submit" id="uploadButton" class="upload-button">

            Upload

          </button>

        </form>

      </div>

    </div>


    <footer>

      <a

        href="https://developers.cloudflare.com/r2/buckets/event-notifications/"

        target="_blank"

        >R2 Event Notification</a

      >

      <a

        href="https://developers.cloudflare.com/queues/get-started/#3-create-a-queue"

        target="_blank"

        >Cloudflare Queues</a

      >

      <a href="https://developers.cloudflare.com/workers-ai/" target="_blank"

        >Workers AI</a

      >

      <a

        href="https://github.com/harshil1712/pdf-summarizer-r2-event-notification"

        target="_blank"

        >GitHub Repo</a

      >

    </footer>


    <script>

      handleSubmit = async (event) => {

        event.preventDefault();


        // Disable the upload button and show a loading message

        const uploadButton = document.getElementById("uploadButton");

        uploadButton.disabled = true;

        uploadButton.textContent = "Uploading...";


        // get form data

        const formData = new FormData(event.target);

        const file = formData.get("pdfFile");


        if (file) {

          // call /api/upload endpoint and send the file

          await fetch("/api/upload", {

            method: "POST",

            body: formData,

          });


          event.target.reset();

        } else {

          console.log("No file selected");

        }

        uploadButton.disabled = false;

        uploadButton.textContent = "Upload";

      };

    </script>

  </body>

</html>


```

To view the front-end of your application, run the following command and navigate to the URL displayed in the terminal:

Terminal window

```

npm run dev


```

```

 ⛅️ wrangler 3.80.2

-------------------


⎔ Starting local server...

[wrangler:inf] Ready on http://localhost:8787

╭───────────────────────────╮

│  [b] open a browser       │

│  [d] open devtools        │

│  [l] turn off local mode  │

│  [c] clear console        │

│  [x] to exit              │

╰───────────────────────────╯


```

When you open the URL in your browser, you will see that there is a file upload form. If you try uploading a file, you will notice that the file is not uploaded to the server. This is because the front-end is not connected to the back-end. In the next step, you will update your Worker that will handle the file upload.

## 3\. Handle file upload

To handle the file upload, you will first need to add the R2 binding. In the Wrangler file, add the following code:

* [  wrangler.jsonc ](#tab-panel-9926)
* [  wrangler.toml ](#tab-panel-9927)

JSONC

```

{

  "r2_buckets": [

    {

      "binding": "MY_BUCKET",

      "bucket_name": "<R2_BUCKET_NAME>"

    }

  ]

}


```

TOML

```

[[r2_buckets]]

binding = "MY_BUCKET"

bucket_name = "<R2_BUCKET_NAME>"


```

Replace `<R2_BUCKET_NAME>` with the name of your R2 bucket.

Next, update the `src/index.ts` file. The `src/index.ts` file should contain the following code:

src/index.ts

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    // Get the pathname from the request

    const pathname = new URL(request.url).pathname;


    if (pathname === "/api/upload" && request.method === "POST") {

      // Get the file from the request

      const formData = await request.formData();

      const file = formData.get("pdfFile") as File;


      // Upload the file to Cloudflare R2

      const upload = await env.MY_BUCKET.put(file.name, file);

      return new Response("File uploaded successfully", { status: 200 });

    }


    return new Response("incorrect route", { status: 404 });

  },

} satisfies ExportedHandler<Env>;


```

The above code does the following:

* Check if the request is a POST request to the `/api/upload` endpoint. If it is, it gets the file from the request and uploads it to Cloudflare R2 using the [Workers API](https://developers.cloudflare.com/r2/api/workers/).
* If the request is not a POST request to the `/api/upload` endpoint, it returns a 404 response.

Since the Worker code is written in TypeScript, you should run the following command to add the necessary type definitions. While this is not required, it will help you avoid errors.

Prevent potential errors when accessing request.body

The body of a [Request ↗](https://developer.mozilla.org/en-US/docs/Web/API/Request) can only be accessed once. If you previously used `request.formData()` in the same request, you may encounter a TypeError when attempting to access `request.body`.

To avoid errors, create a clone of the Request object with `request.clone()` for each subsequent attempt to access a Request's body. Keep in mind that Workers have a [memory limit of 128 MB per Worker](https://developers.cloudflare.com/workers/platform/limits/#memory) and loading particularly large files into a Worker's memory multiple times may reach this limit. To ensure memory usage does not reach this limit, consider using [Streams](https://developers.cloudflare.com/workers/runtime-apis/streams/).

Terminal window

```

npm run cf-typegen


```

You can restart the developer server to test the changes:

Terminal window

```

npm run dev


```

## 4\. Create a queue

Event notifications capture changes to data in your R2 bucket. You will need to create a new queue `pdf-summarize` to receive notifications:

Terminal window

```

npx wrangler queues create pdf-summarizer


```

Add the binding to the Wrangler file:

* [  wrangler.jsonc ](#tab-panel-9930)
* [  wrangler.toml ](#tab-panel-9931)

JSONC

```

{

  "queues": {

    "consumers": [

      {

        "queue": "pdf-summarizer"

      }

    ]

  }

}


```

TOML

```

[[queues.consumers]]

queue = "pdf-summarizer"


```

## 5\. Handle event notifications

Now that you have a queue to receive event notifications, you need to update the Worker to handle the event notifications. You will need to add a Queue handler that will extract the textual content from the PDF, use Workers AI to summarize the content, and then save it in the R2 bucket.

Update the `src/index.ts` file to add the Queue handler:

src/index.ts

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    // No changes in the fetch handler

  },

  async queue(batch, env) {

    for (let message of batch.messages) {

      console.log(`Processing the file: ${message.body.object.key}`);

    }

  },

} satisfies ExportedHandler<Env>;


```

The above code does the following:

* The `queue` handler is called when a new message is added to the queue. It loops through the messages in the batch and logs the name of the file.

For now the `queue` handler is not doing anything. In the next steps, you will update the `queue` handler to extract the textual content from the PDF, use Workers AI to summarize the content, and then add it to the bucket.

## 6\. Extract the textual content from the PDF

To extract the textual content from the PDF, the Worker will use the [unpdf ↗](https://github.com/unjs/unpdf) library. The `unpdf` library provides utilities to work with PDF files.

Install the `unpdf` library by running the following command:

 npm  yarn  pnpm  bun 

```
npm i unpdf
```

```
yarn add unpdf
```

```
pnpm add unpdf
```

```
bun add unpdf
```

Update the `src/index.ts` file to import the required modules from the `unpdf` library:

src/index.ts

```

import { extractText, getDocumentProxy } from "unpdf";


```

Next, update the `queue` handler to extract the textual content from the PDF:

src/index.ts

```

async queue(batch, env) {

  for(let message of batch.messages) {

    console.log(`Processing file: ${message.body.object.key}`);

    // Get the file from the R2 bucket

    const file = await env.MY_BUCKET.get(message.body.object.key);

    if (!file) {

        console.error(`File not found: ${message.body.object.key}`);

        continue;

      }

    // Extract the textual content from the PDF

    const buffer = await file.arrayBuffer();

    const document = await getDocumentProxy(new Uint8Array(buffer));


    const {text} = await extractText(document, {mergePages: true});

    console.log(`Extracted text: ${text.substring(0, 100)}...`);

    }

}


```

The above code does the following:

* The `queue` handler gets the file from the R2 bucket.
* The `queue` handler extracts the textual content from the PDF using the `unpdf` library.
* The `queue` handler logs the textual content.

## 7\. Use Workers AI to summarize the content

To use Workers AI, you will need to add the Workers AI binding to the Wrangler file. The Wrangler file should contain the following code:

* [  wrangler.jsonc ](#tab-panel-9928)
* [  wrangler.toml ](#tab-panel-9929)

JSONC

```

{

  "ai": {

    "binding": "AI"

  }

}


```

TOML

```

[ai]

binding = "AI"


```

Execute the following command to add the AI type definition:

Terminal window

```

npm run cf-typegen


```

Update the `src/index.ts` file to use Workers AI to summarize the content:

src/index.ts

```

async queue(batch, env) {

  for(let message of batch.messages) {

    // Extract the textual content from the PDF

    const {text} = await extractText(document, {mergePages: true});

    console.log(`Extracted text: ${text.substring(0, 100)}...`);


    // Use Workers AI to summarize the content

    const result: AiSummarizationOutput = await env.AI.run(

    "@cf/facebook/bart-large-cnn",

      {

        input_text: text,

      }

    );

    const summary = result.summary;

    console.log(`Summary: ${summary.substring(0, 100)}...`);

  }

}


```

The `queue` handler now uses Workers AI to summarize the content.

## 8\. Add the summary to the R2 bucket

Now that you have the summary, you need to add it to the R2 bucket. Update the `src/index.ts` file to add the summary to the R2 bucket:

src/index.ts

```

async queue(batch, env) {

  for(let message of batch.messages) {

    // Extract the textual content from the PDF

    // ...

    // Use Workers AI to summarize the content

    // ...


    // Add the summary to the R2 bucket

    const upload = await env.MY_BUCKET.put(`${message.body.object.key}-summary.txt`, summary, {

          httpMetadata: {

            contentType: 'text/plain',

          },

    });

    console.log(`Summary added to the R2 bucket: ${upload.key}`);

  }

}


```

The queue handler now adds the summary to the R2 bucket as a text file.

## 9\. Enable event notifications

Your `queue` handler is ready to handle incoming event notification messages. You need to enable event notifications with the [wrangler r2 bucket notification create command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-notification-create) for your bucket. The following command creates an event notification for the `object-create` event type for the `pdf` suffix:

Terminal window

```

npx wrangler r2 bucket notification create <R2_BUCKET_NAME> --event-type object-create --queue pdf-summarizer --suffix "pdf"


```

Replace `<R2_BUCKET_NAME>` with the name of your R2 bucket.

An event notification is created for the `pdf` suffix. When a new file with the `pdf` suffix is uploaded to the R2 bucket, the `pdf-summarizer` queue is triggered.

## 10\. Deploy your Worker

To deploy your Worker, run the [wrangler deploy](https://developers.cloudflare.com/workers/wrangler/commands/general/#deploy) command:

Terminal window

```

npx wrangler deploy


```

In the output of the `wrangler deploy` command, copy the URL. This is the URL of your deployed application.

## 11\. Test

To test the application, navigate to the URL of your deployed application and upload a PDF file. Alternatively, you can use the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) to upload a PDF file.

To view the logs, you can use the [wrangler tail](https://developers.cloudflare.com/workers/wrangler/commands/general/#tail) command.

Terminal window

```

npx wrangler tail


```

You will see the logs in your terminal. You can also navigate to the Cloudflare dashboard and view the logs in the Workers Logs section.

If you check your R2 bucket, you will see the summary file.

## Conclusion

In this tutorial, you learned how to use R2 event notifications to process an object on upload. You created an application to upload a PDF file, and created a consumer Worker that creates a summary of the PDF file. You also learned how to use Workers AI to summarize the content of the PDF file, and upload the summary to the R2 bucket.

You can use the same approach to process other types of files, such as images, videos, and audio files. You can also use the same approach to process other types of events, such as object deletion, and object update.

If you want to view the code for this tutorial, you can find it on [GitHub ↗](https://github.com/harshil1712/pdf-summarizer-r2-event-notification).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/tutorials/summarize-pdf/#page","headline":"Use event notification to summarize PDF files on upload · Cloudflare R2 docs","description":"Use event notification to summarize PDF files on upload. Use Workers AI to summarize the PDF and store the summary as a text file.","url":"https://developers.cloudflare.com/r2/tutorials/summarize-pdf/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-03-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TypeScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/tutorials/summarize-pdf/","name":"Use event notification to summarize PDF files on upload"}}]}
```
