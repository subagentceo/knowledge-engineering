---
title: GitHub SMS notifications using Twilio
description: This tutorial shows you how to build an SMS notification system on Workers to receive updates on a GitHub repository. Your Worker will send you a text update using Twilio when there is new activity on your repository.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# GitHub SMS notifications using Twilio

**Last reviewed:**  over 2 years ago 

In this tutorial, you will learn to build an SMS notification system on Workers to receive updates on a GitHub repository. Your Worker will send you a text update using Twilio when there is new activity on your repository.

You will learn how to:

* Build webhooks using Workers.
* Integrate Workers with GitHub and Twilio.
* Use Worker secrets with Wrangler.
![Animated gif of receiving a text message on your phone after pushing changes to a repository](https://developers.cloudflare.com/images/workers/tutorials/github-sms/video-of-receiving-a-text-after-pushing-to-a-repo.gif) 

---

## Before you start

All of the tutorials assume you have already completed the [Get started guide](https://developers.cloudflare.com/workers/get-started/guide/), which gets you set up with a Cloudflare Workers account, [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare), and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## Create a Worker project

Start by using `npm create cloudflare@latest` to create a Worker project in the command line:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- github-twilio-notifications
```

```
yarn create cloudflare github-twilio-notifications
```

```
pnpm create cloudflare@latest github-twilio-notifications
```

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `JavaScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

Make note of the URL that your application was deployed to. You will be using it when you configure your GitHub webhook.

Terminal window

```

cd github-twilio-notifications


```

Inside of your new `github-sms-notifications` directory, `src/index.js` represents the entry point to your Cloudflare Workers application. You will configure this file for most of the tutorial.

You will also need a GitHub account and a repository for this tutorial. If you do not have either setup, [create a new GitHub account ↗](https://github.com/join) and [create a new repository ↗](https://docs.github.com/en/get-started/quickstart/create-a-repo) to continue with this tutorial.

First, create a webhook for your repository to post updates to your Worker. Inside of your Worker, you will then parse the updates. Finally, you will send a `POST` request to Twilio to send a text message to you.

You can reference the finished code at this [GitHub repository ↗](https://github.com/rickyrobinett/workers-sdk/tree/main/templates/examples/github-sms-notifications-using-twilio).

---

## Configure GitHub

To start, configure a GitHub webhook to post to your Worker when there is an update to the repository:

1. Go to your GitHub repository's **Settings** \> **Webhooks** \> **Add webhook**.
2. Set the Payload URL to the `/webhook` path on the Worker URL that you made note of when your application was first deployed.
3. In the **Content type** dropdown, select _application/json_.
4. In the **Secret** field, input a secret key of your choice.
5. In **Which events would you like to trigger this webhook?**, select **Let me select individual events**. Select the events you want to get notifications for (such as **Pull requests**, **Pushes**, and **Branch or tag creation**).
6. Select **Add webhook** to finish configuration.
![Following instructions to set up your webhook in the GitHub webhooks settings dashboard](https://developers.cloudflare.com/_astro/github-config-screenshot.BR7flpMR_Z1Yrdgb.webp) 

---

## Parsing the response

With your local environment set up, parse the repository update with your Worker.

Initially, your generated `index.js` should look like this:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    return new Response("Hello World!");

  },

};


```

Use the `request.method` property of [Request](https://developers.cloudflare.com/workers/runtime-apis/request/) to check if the request coming to your application is a `POST` request, and send an error response if the request is not a `POST` request.

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    if (request.method !== "POST") {

      return new Response("Please send a POST request!");

    }

  },

};


```

Next, validate that the request is sent with the right secret key. GitHub attaches a hash signature for [each payload using the secret key ↗](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks). Use a helper function called `checkSignature` on the request to ensure the hash is correct. Then, you can access data from the webhook by parsing the request as JSON.

JavaScript

```

async fetch(request, env, ctx) {

  if(request.method !== 'POST') {

    return new Response('Please send a POST request!');

  }

  try {

    const rawBody = await request.text();


    if (!checkSignature(rawBody, request.headers, env.GITHUB_SECRET_TOKEN)) {

      return new Response("Wrong password, try again", {status: 403});

    }

  } catch (e) {

    return new Response(`Error:  ${e}`);

  }

},


```

The `checkSignature` function will use the Node.js crypto library to hash the received payload with your known secret key to ensure it matches the request hash. GitHub uses an HMAC hexdigest to compute the hash in the SHA-256 format. You will place this function at the top of your `index.js` file, before your export.

JavaScript

```

import { createHmac, timingSafeEqual } from "node:crypto";

import { Buffer } from "node:buffer";


function checkSignature(text, headers, githubSecretToken) {

  const hmac = createHmac("sha256", githubSecretToken);

  hmac.update(text);

  const expectedSignature = hmac.digest("hex");

  const actualSignature = headers.get("x-hub-signature-256");


  const trusted = Buffer.from(`sha256=${expectedSignature}`, "ascii");

  const untrusted = Buffer.from(actualSignature, "ascii");


  return (

    trusted.byteLength == untrusted.byteLength &&

    timingSafeEqual(trusted, untrusted)

  );

}


```

To make this work, you need to use [wrangler secret put](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret-put) to set your `GITHUB_SECRET_TOKEN`. This token is the secret you picked earlier when configuring you GitHub webhook:

Terminal window

```

npx wrangler secret put GITHUB_SECRET_TOKEN


```

Add the nodejs\_compat flag to your Wrangler file:

* [  wrangler.jsonc ](#tab-panel-12189)
* [  wrangler.toml ](#tab-panel-12190)

JSONC

```

{

  "compatibility_flags": [

    "nodejs_compat"

  ]

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]


```

---

## Sending a text with Twilio

You will send a text message to you about your repository activity using Twilio. You need a Twilio account and a phone number that can receive text messages. [Refer to the Twilio guide to get set up ↗](https://www.twilio.com/messaging/sms). (If you are new to Twilio, they have [an interactive game ↗](https://www.twilio.com/quest) where you can learn how to use their platform and get some free credits for beginners to the service.)

You can then create a helper function to send text messages by sending a `POST` request to the Twilio API endpoint. [Refer to the Twilio reference ↗](https://www.twilio.com/docs/sms/api/message-resource#create-a-message-resource) to learn more about this endpoint.

Create a new function called `sendText()` that will handle making the request to Twilio:

JavaScript

```

async function sendText(accountSid, authToken, message) {

  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;


  const encoded = new URLSearchParams({

    To: "%YOUR_PHONE_NUMBER%",

    From: "%YOUR_TWILIO_NUMBER%",

    Body: message,

  });


  const token = btoa(`${accountSid}:${authToken}`);


  const request = {

    body: encoded,

    method: "POST",

    headers: {

      Authorization: `Basic ${token}`,

      "Content-Type": "application/x-www-form-urlencoded",

    },

  };


  const response = await fetch(endpoint, request);

  const result = await response.json();


  return Response.json(result);

}


```

To make this work, you need to set some secrets to hide your `ACCOUNT_SID` and `AUTH_TOKEN` from the source code. You can set secrets with [wrangler secret put](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret-put) in your command line.

Terminal window

```

npx wrangler secret put TWILIO_ACCOUNT_SID

npx wrangler secret put TWILIO_AUTH_TOKEN


```

Modify your `githubWebhookHandler` to send a text message using the `sendText` function you just made.

JavaScript

```

async fetch(request, env, ctx) {

  if(request.method !== 'POST') {

    return new Response('Please send a POST request!');

  }

  try {

    const rawBody = await request.text();

    if (!checkSignature(rawBody, request.headers, env.GITHUB_SECRET_TOKEN)) {

      return new Response('Wrong password, try again', {status: 403});

    }


    const action = request.headers.get('X-GitHub-Event');

    const json = JSON.parse(rawBody);

    const repoName = json.repository.full_name;

    const senderName = json.sender.login;


    return await sendText(

      env.TWILIO_ACCOUNT_SID,

      env.TWILIO_AUTH_TOKEN,

      `${senderName} completed ${action} onto your repo ${repoName}`

    );

  } catch (e) {

    return new Response(`Error:  ${e}`);

  }

};


```

Run the `npx wrangler deploy` command to redeploy your Worker project:

Terminal window

```

npx wrangler deploy


```

![Video of receiving a text after pushing to a repo](https://developers.cloudflare.com/images/workers/tutorials/github-sms/video-of-receiving-a-text-after-pushing-to-a-repo.gif) 

Now when you make an update (that you configured in the GitHub **Webhook** settings) to your repository, you will get a text soon after. If you have never used Git before, refer to the [GIT Push and Pull Tutorial ↗](https://www.datacamp.com/tutorial/git-push-pull) for pushing to your repository.

Reference the finished code [on GitHub ↗](https://github.com/rickyrobinett/workers-sdk/tree/main/templates/examples/github-sms-notifications-using-twilio).

By completing this tutorial, you have learned how to build webhooks using Workers, integrate Workers with GitHub and Twilio, and use Worker secrets with Wrangler.

## Related resources

* [Build a JAMStack app](https://developers.cloudflare.com/workers/tutorials/build-a-jamstack-app/)
* [Build a QR code generator](https://developers.cloudflare.com/workers/tutorials/build-a-qr-code-generator/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/github-sms-notifications-using-twilio/#page","headline":"GitHub SMS notifications using Twilio · Cloudflare Workers docs","description":"This tutorial shows you how to build an SMS notification system on Workers to receive updates on a GitHub repository. Your Worker will send you a text update using Twilio when there is new activity on your repository.","url":"https://developers.cloudflare.com/workers/tutorials/github-sms-notifications-using-twilio/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/tutorials/github-sms-notifications-using-twilio/","name":"GitHub SMS notifications using Twilio"}}]}
```
