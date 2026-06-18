---
title: OpenAI GPT function calling with JavaScript and Cloudflare Workers
description: Build a project that leverages OpenAI's function calling feature, available in OpenAI's latest Chat Completions API models.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# OpenAI GPT function calling with JavaScript and Cloudflare Workers

**Last reviewed:**  about 3 years ago 

In this tutorial, you will build a project that leverages [OpenAI's function calling ↗](https://platform.openai.com/docs/guides/function-calling) feature, available in OpenAI's latest Chat Completions API models.

The function calling feature allows the AI model to intelligently decide when to call a function based on the input, and respond in JSON format to match the function's signature. You will use the function calling feature to request for the model to determine a website URL which contains information relevant to a message from the user, retrieve the text content of the site, and, finally, return a final response from the model informed by real-time web data.

## What you will learn

* How to use OpenAI's function calling feature.
* Integrating OpenAI's API in a Cloudflare Worker.
* Fetching and processing website content using Cheerio.
* Handling API responses and function calls in JavaScript.
* Storing API keys as secrets with Wrangler.

---

## Before you start

All of the tutorials assume you have already completed the [Get started guide](https://developers.cloudflare.com/workers/get-started/guide/), which gets you set up with a Cloudflare Workers account, [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare), and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## 1\. Create a new Worker project

Create a Worker project in the command line:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- openai-function-calling-workers
```

```
yarn create cloudflare openai-function-calling-workers
```

```
pnpm create cloudflare@latest openai-function-calling-workers
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `JavaScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Go to your new `openai-function-calling-workers` Worker project:

Terminal window

```

cd openai-function-calling-workers


```

Inside of your new `openai-function-calling-workers` directory, find the `src/index.js` file. You will configure this file for most of the tutorial.

You will also need an OpenAI account and API key for this tutorial. If you do not have one, [create a new OpenAI account ↗](https://platform.openai.com/signup) and [create an API key ↗](https://platform.openai.com/account/api-keys) to continue with this tutorial. Make sure to store you API key somewhere safe so you can use it later.

## 2\. Make a request to OpenAI

With your Worker project created, make your first request to OpenAI. You will use the OpenAI node library to interact with the OpenAI API. In this project, you will also use the Cheerio library to handle processing the HTML content of websites

 npm  yarn  pnpm  bun 

```
npm i openai cheerio
```

```
yarn add openai cheerio
```

```
pnpm add openai cheerio
```

```
bun add openai cheerio
```

Now, define the structure of your Worker in `index.js`:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    // Initialize OpenAI API

    // Handle incoming requests

    return new Response("Hello World!");

  },

};


```

Above `export default`, add the imports for `openai` and `cheerio`:

JavaScript

```

import OpenAI from "openai";

import * as cheerio from "cheerio";


```

Within your `fetch` function, instantiate your `OpenAI` client:

JavaScript

```

async fetch(request, env, ctx) {

  const openai = new OpenAI({

    apiKey: env.OPENAI_API_KEY,

  });


  // Handle incoming requests

  return new Response('Hello World!');

},


```

Use [wrangler secret put](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret-put) to set `OPENAI_API_KEY`. This [secret's](https://developers.cloudflare.com/workers/configuration/secrets/) value is the API key you created earlier in the OpenAI dashboard:

Terminal window

```

npx wrangler secret put <OPENAI_API_KEY>


```

For local development, create a new file `.dev.vars` in your Worker project and add this line. Make sure to replace `OPENAI_API_KEY` with your own OpenAI API key:

```

OPENAI_API_KEY = "<YOUR_OPENAI_API_KEY>"


```

Now, make a request to the OpenAI [Chat Completions API ↗](https://platform.openai.com/docs/guides/gpt/chat-completions-api):

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    const openai = new OpenAI({

      apiKey: env.OPENAI_API_KEY,

    });


    const url = new URL(request.url);

    const message = url.searchParams.get("message");


    const messages = [

      {

        role: "user",

        content: message ? message : "What's in the news today?",

      },

    ];


    const tools = [

      {

        type: "function",

        function: {

          name: "read_website_content",

          description: "Read the content on a given website",

          parameters: {

            type: "object",

            properties: {

              url: {

                type: "string",

                description: "The URL to the website to read",

              },

            },

            required: ["url"],

          },

        },

      },

    ];


    const chatCompletion = await openai.chat.completions.create({

      model: "gpt-4o-mini",

      messages: messages,

      tools: tools,

      tool_choice: "auto",

    });


    const assistantMessage = chatCompletion.choices[0].message;

    console.log(assistantMessage);


    //Later you will continue handling the assistant's response here

    return new Response(assistantMessage.content);

  },

};


```

Review the arguments you are passing to OpenAI:

* **model**: This is the model you want OpenAI to use for your request. In this case, you are using `gpt-4o-mini`.
* **messages**: This is an array containing all messages that are part of the conversation. Initially you provide a message from the user, and we later add the response from the model. The content of the user message is either the `message` query parameter from the request URL or the default "What's in the news today?".
* **tools**: An array containing the actions available to the AI model. In this example you only have one tool, `read_website_content`, which reads the content on a given website.  
   * **name**: The name of your function. In this case, it is `read_website_content`.  
   * **description**: A short description that lets the model know the purpose of the function. This is optional but helps the model know when to select the tool.  
   * **parameters**: A JSON Schema object which describes the function. In this case we request a response containing an object with the required property `url`.
* **tool\_choice**: This argument is technically optional as `auto` is the default. This argument indicates that either a function call or a normal message response can be returned by OpenAI.

## 3\. Building your `read_website_content()` function

You will now need to define the `read_website_content` function, which is referenced in the `tools` array. The `read_website_content` function fetches the content of a given URL and extracts the text from `<p>` tags using the `cheerio` library:

Add this code above the `export default` block in your `index.js` file:

JavaScript

```

async function read_website_content(url) {

  console.log("reading website content");


  const response = await fetch(url);

  const body = await response.text();

  let cheerioBody = cheerio.load(body);

  const resp = {

    website_body: cheerioBody("p").text(),

    url: url,

  };

  return JSON.stringify(resp);

}


```

In this function, you take the URL that you received from OpenAI and use JavaScript's [Fetch API ↗](https://developer.mozilla.org/en-US/docs/Web/API/Fetch%5FAPI/Using%5FFetch) to pull the content of the website and extract the paragraph text. Now we need to determine when to call this function.

## 4\. Process the Assistant's Messages

Next, we need to process the response from the OpenAI API to check if it includes any function calls. If a function call is present, you should execute the corresponding function in your Worker. Note that the assistant may request multiple function calls.

Modify the fetch method within the `export default` block as follows:

JavaScript

```

// ... your previous code ...


if (assistantMessage.tool_calls) {

  for (const toolCall of assistantMessage.tool_calls) {

    if (toolCall.function.name === "read_website_content") {

      const url = JSON.parse(toolCall.function.arguments).url;

      const websiteContent = await read_website_content(url);

      messages.push({

        role: "tool",

        tool_call_id: toolCall.id,

        name: toolCall.function.name,

        content: websiteContent,

      });

    }

  }


  const secondChatCompletion = await openai.chat.completions.create({

    model: "gpt-4o-mini",

    messages: messages,

  });


  return new Response(secondChatCompletion.choices[0].message.content);

} else {

  // this is your existing return statement

  return new Response(assistantMessage.content);

}


```

Check if the assistant message contains any function calls by checking for the `tool_calls` property. Because the AI model can call multiple functions by default, you need to loop through any potential function calls and add them to the `messages` array. Each `read_website_content` call will invoke the `read_website_content` function you defined earlier and pass the URL generated by OpenAI as an argument. \`

The `secondChatCompletion` is needed to provide a response informed by the data you retrieved from each function call. Now, the last step is to deploy your Worker.

Test your code by running `npx wrangler dev` and open the provided url in your browser. This will now show you OpenAI’s response using real-time information from the retrieved web data.

## 5\. Deploy your Worker application

To deploy your application, run the `npx wrangler deploy` command to deploy your Worker application:

Terminal window

```

npx wrangler deploy


```

You can now preview your Worker at `<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev`. Going to this URL will display the response from OpenAI. Optionally, add the `message` URL parameter to write a custom message: for example, `https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/?message=What is the weather in NYC today?`.

## 6\. Next steps

Reference the [finished code for this tutorial on GitHub ↗](https://github.com/LoganGrasby/Cloudflare-OpenAI-Functions-Demo/blob/main/src/worker.js).

To continue working with Workers and AI, refer to [the guide on using LangChain and Cloudflare Workers together ↗](https://blog.cloudflare.com/langchain-and-cloudflare/) or [how to build a ChatGPT plugin with Cloudflare Workers ↗](https://blog.cloudflare.com/magic-in-minutes-how-to-build-a-chatgpt-plugin-with-cloudflare-workers/).

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord ↗](https://discord.cloudflare.com) to connect with fellow developers and the Cloudflare team.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/openai-function-calls-workers/#page","headline":"OpenAI GPT function calling with JavaScript and Cloudflare Workers · Cloudflare Workers docs","description":"Build a project that leverages OpenAI's function calling feature, available in OpenAI's latest Chat Completions API models.","url":"https://developers.cloudflare.com/workers/tutorials/openai-function-calls-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/tutorials/openai-function-calls-workers/","name":"OpenAI GPT function calling with JavaScript and Cloudflare Workers"}}]}
```
