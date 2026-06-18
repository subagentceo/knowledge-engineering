---
title: Build a QR code generator
description: This tutorial shows you how to build and publish a Worker application that generates QR codes. The final version of the codebase is available on GitHub.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Build a QR code generator

**Last reviewed:**  almost 3 years ago 

In this tutorial, you will build and publish a Worker application that generates QR codes.

If you would like to review the code for this tutorial, the final version of the codebase is [available on GitHub ↗](https://github.com/kristianfreeman/workers-qr-code-generator). You can take the code provided in the example repository, customize it, and deploy it for use in your own projects.

## Before you start

All of the tutorials assume you have already completed the [Get started guide](https://developers.cloudflare.com/workers/get-started/guide/), which gets you set up with a Cloudflare Workers account, [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare), and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## 1\. Create a new Workers project

First, use the [create-cloudflare CLI](https://developers.cloudflare.com/pages/get-started/c3) to create a new Cloudflare Workers project. To do this, open a terminal window and run the following command:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- qr-code-generator
```

```
yarn create cloudflare qr-code-generator
```

```
pnpm create cloudflare@latest qr-code-generator
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `JavaScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Then, move into your newly created directory:

Terminal window

```

cd qr-code-generator


```

Inside of your new `qr-code-generator` Worker project directory, `index.js` represents the entry point to your Cloudflare Workers application.

All Cloudflare Workers applications start by listening for `fetch` events, which are triggered when a client makes a request to a Workers route. After a request is received by the Worker, the response your application constructs will be returned to the user. This tutorial will guide you through understanding how the request/response pattern works and how you can use it to build fully featured applications.

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    return new Response("Hello Worker!");

  },

};


```

In your default `index.js` file, you can see that request/response pattern in action. The `fetch` constructs a new `Response` with the body text `'Hello Worker!'`.

When a Worker receives a `fetch` event, the Worker returns the newly constructed response to the client. Your Worker will serve new responses directly from [Cloudflare's global network ↗](https://www.cloudflare.com/network) instead of continuing to your origin server. A standard server would accept requests and return responses. Cloudflare Workers allows you to respond quickly by constructing responses directly on the Cloudflare global network.

## 2\. Handle Incoming Request

Any project you publish to Cloudflare Workers can make use of modern JavaScript tooling like ES modules, `npm` packages, and [async/await ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async%5Ffunction) functions to build your application. In addition to writing Workers, you can use Workers to [build full applications](https://developers.cloudflare.com/workers/tutorials/build-a-slackbot/) using the same tooling and process as in this tutorial.

The QR code generator you will build in this tutorial will be a Worker that runs on a single route and receives requests. Each request will contain a text message (a URL, for example), which the function will encode into a QR code. The function will then respond with the QR code in PNG image format.

At this point in the tutorial, your Worker function can receive requests and return a simple response with the text `"Hello Worker!"`. To handle data coming into your Worker, check if the incoming request is a `POST` request:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    if (request.method === "POST") {

      return new Response("Hello Worker!");

    }

  },

};


```

Currently, if an incoming request is not a `POST`, the function will return `undefined`. However, a Worker always needs to return a `Response`. Since the function should only accept incoming `POST` requests, return a new `Response` with a [405 status code ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/405) if the incoming request is not a `POST`:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    if (request.method === "POST") {

      return new Response("Hello Worker!");

    }


    return new Response("Expected POST request", {

      status: 405,

    });

  },

};


```

You have established the basic flow of the request. You will now set up a response to incoming valid requests. If a `POST` request comes in, the function should generate a QR code. To start, move the `"Hello Worker!"` response into a new function, `generateQRCode`, which will ultimately contain the bulk of your function’s logic:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    if (request.method === "POST") {

    }

  },

};


async function generateQRCode(request) {

  // TODO: Include QR code generation

  return new Response("Hello worker!");

}


```

With the `generateQRCode` function filled out, call it within `fetch` function and return its result directly to the client:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    if (request.method === "POST") {

      return generateQRCode(request);

    }

  },

};


```

## 3\. Build a QR code generator

All projects deployed to Cloudflare Workers support npm packages. This support makes it easy to rapidly build out functionality in your Workers. The ['qrcode-svg' ↗](https://github.com/papnkukn/qrcode-svg) package is a great way to take text and encode it into a QR code. In the command line, install and save 'qrcode-svg' to your project’s 'package.json':

 npm  yarn  pnpm  bun 

```
npm i qrcode-svg
```

```
yarn add qrcode-svg
```

```
pnpm add qrcode-svg
```

```
bun add qrcode-svg
```

In `index.js`, import the `qrcode-svg` package as the variable `QRCode`. In the `generateQRCode` function, parse the incoming request as JSON using `request.json`, and generate a new QR code using the `qrcode-svg` package. The QR code is generated as an SVG. Construct a new instance of `Response`, passing in the SVG data as the body, and a `Content-Type` header of `image/svg+xml`. This will allow browsers to properly parse the data coming back from your Worker as an image:

JavaScript

```

import QRCode from "qrcode-svg";


async function generateQRCode(request) {

  const { text } = await request.json();

  const qr = new QRCode({ content: text || "https://workers.dev" });

  return new Response(qr.svg(), {

    headers: { "Content-Type": "image/svg+xml" },

  });

}


```

## 4\. Test in an application UI

The Worker will execute when a user sends a `POST` request to a route, but it is best practice to also provide a proper interface for testing the function. At this point in the tutorial, if any request is received by your function that is not a `POST`, a `405` response is returned. The new version of `fetch` should return a new `Response` with a static HTML document instead of the `405` error:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    if (request.method === "POST") {

      return generateQRCode(request);

    }


    return new Response(landing, {

      headers: {

        "Content-Type": "text/html",

      },

    });

  },

};


async function generateQRCode(request) {

  const { text } = await request.json();

  const qr = new QRCode({ content: text || "https://workers.dev" });

  return new Response(qr.svg(), {

    headers: { "Content-Type": "image/svg+xml" },

  });

}


const landing = `

<h1>QR Generator</h1>

<p>Click the below button to generate a new QR code. This will make a request to your Worker.</p>

<input type="text" id="text" value="https://workers.dev"></input>

<button onclick="generate()">Generate QR Code</button>

<p>Generated QR Code Image</p>

<img id="qr" src="#" />

<script>

  function generate() {

    fetch(window.location.pathname, {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ text: document.querySelector("#text").value })

    })

    .then(response => response.blob())

    .then(blob => {

      const reader = new FileReader();

      reader.onloadend = function () {

        document.querySelector("#qr").src = reader.result; // Update the image source with the newly generated QR code

      }

      reader.readAsDataURL(blob);

    })

  }

</script>

`;


```

The `landing` variable, which is a static HTML string, sets up an `input` tag and a corresponding `button`, which calls the `generateQRCode` function. This function will make an HTTP `POST` request back to your Worker, allowing you to see the corresponding QR code image returned on the page.

With the above steps complete, your Worker is ready. The full version of the code looks like this:

JavaScript

```

const QRCode = require("qrcode-svg");


export default {

  async fetch(request, env, ctx) {

    if (request.method === "POST") {

      return generateQRCode(request);

    }


    return new Response(landing, {

      headers: {

        "Content-Type": "text/html",

      },

    });

  },

};


async function generateQRCode(request) {

  const { text } = await request.json();

  const qr = new QRCode({ content: text || "https://workers.dev" });

  return new Response(qr.svg(), {

    headers: { "Content-Type": "image/svg+xml" },

  });

}


const landing = `

<h1>QR Generator</h1>

<p>Click the below button to generate a new QR code. This will make a request to your Worker.</p>

<input type="text" id="text" value="https://workers.dev"></input>

<button onclick="generate()">Generate QR Code</button>

<p>Generated QR Code Image</p>

<img id="qr" src="#" />

<script>

  function generate() {

    fetch(window.location.pathname, {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ text: document.querySelector("#text").value })

    })

    .then(response => response.blob())

    .then(blob => {

      const reader = new FileReader();

      reader.onloadend = function () {

        document.querySelector("#qr").src = reader.result; // Update the image source with the newly generated QR code

      }

      reader.readAsDataURL(blob);

    })

  }

</script>

`;


```

## 5\. Deploy your Worker

With all the above steps complete, you have written the code for a QR code generator on Cloudflare Workers.

Wrangler has built-in support for bundling, uploading, and releasing your Cloudflare Workers application. To do this, run `npx wrangler deploy`, which will build and deploy your code.

Deploy your Worker project

```

npx wrangler deploy


```

## Related resources

In this tutorial, you built and deployed a Worker application for generating QR codes. If you would like to see the full source code for this application, you can find it [on GitHub ↗](https://github.com/kristianfreeman/workers-qr-code-generator).

If you want to get started building your own projects, review the existing list of [Quickstart templates](https://developers.cloudflare.com/workers/get-started/quickstarts/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/build-a-qr-code-generator/#page","headline":"Build a QR code generator · Cloudflare Workers docs","description":"This tutorial shows you how to build and publish a Worker application that generates QR codes. The final version of the codebase is available on GitHub.","url":"https://developers.cloudflare.com/workers/tutorials/build-a-qr-code-generator/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/tutorials/build-a-qr-code-generator/","name":"Build a QR code generator"}}]}
```
