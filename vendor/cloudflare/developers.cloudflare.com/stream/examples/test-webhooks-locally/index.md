---
title: Test webhooks locally
description: Test Cloudflare Stream webhook notifications locally using a Cloudflare Worker and Cloudflare Tunnel.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Test webhooks locally

Test Cloudflare Stream webhook notifications locally using a Cloudflare Worker and Cloudflare Tunnel.

Cloudflare Stream cannot send [webhook notifications](https://developers.cloudflare.com/stream/manage-video-library/using-webhooks/) to `localhost` or local IP addresses. To test webhooks during local development, you need a publicly accessible URL that forwards requests to your local machine.

Note

This example covers webhooks for on-demand (VOD) videos only. Live stream webhooks are configured differently. For more information, refer to [Receive live webhooks](https://developers.cloudflare.com/stream/stream-live/webhooks/).

This example shows how to:

1. Start a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/trycloudflare/) to get a public URL for your local environment.
2. Register that URL as your webhook endpoint, which returns the signing secret.
3. Create a Cloudflare Worker that receives Stream webhook events and verifies their signatures.

## Prerequisites

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up) with Stream enabled
* [Node.js ↗](https://nodejs.org/) (v18 or later)
* The [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed (`npm install -g wrangler`)

## 1\. Create a Worker project

Create a new Worker project that will receive webhook requests:

Terminal window

```

npm create cloudflare@latest stream-webhook-handler


```

## 2\. Start a Cloudflare Tunnel

Before registering a webhook URL, you need a public URL that points to your local machine. In a terminal, start a [quick tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/do-more-with-tunnels/trycloudflare/) that forwards to the default Wrangler dev server port (`8787`):

Terminal window

```

npx cloudflared tunnel --url http://localhost:8787


```

`cloudflared` will output a public URL similar to:

```

https://example-words-here.trycloudflare.com


```

Copy this URL. It changes every time you restart the tunnel.

## 3\. Register the tunnel URL as your webhook endpoint

Use the Stream API to set the tunnel URL as your webhook notification URL. The API response includes a `secret` field — you will need this to verify webhook signatures.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Stream Write`

Create webhooks

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/webhook" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "notificationUrl": "https://example-words-here.trycloudflare.com"

  }'


```

The response will include a `secret` field:

Example response

```

{

  "result": {

    "notificationUrl": "https://example-words-here.trycloudflare.com",

    "modified": "2024-01-01T00:00:00.000000Z",

    "secret": "85011ed3a913c6ad5f9cf6c5573cc0a7"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

Save the `secret` value. You will use it in the next step.

## 4\. Store the webhook secret for local development

Create a `.dev.vars` file in the root of your Worker project and add the webhook secret from the API response:

.dev.vars

```

WEBHOOK_SECRET=85011ed3a913c6ad5f9cf6c5573cc0a7


```

Replace the value with the actual secret from step 3\. Wrangler automatically loads `.dev.vars` when running `wrangler dev`.

Warning

Do not commit `.dev.vars` to version control. Add it to your `.gitignore` file. For more information, refer to [Local development with secrets](https://developers.cloudflare.com/workers/configuration/secrets/#local-development-with-secrets).

## 5\. Add the webhook handler

Replace the contents of `src/index.ts` in your Worker project with the following code. This Worker receives webhook `POST` requests, [verifies the signature](https://developers.cloudflare.com/stream/manage-video-library/using-webhooks/#verify-webhook-authenticity), and logs the payload.

src/index.ts

```

export interface Env {

  WEBHOOK_SECRET: string;

}


async function verifyWebhookSignature(

  request: Request,

  secret: string,

): Promise<{ valid: boolean; body: string }> {

  const signatureHeader = request.headers.get("Webhook-Signature");

  if (!signatureHeader) {

    return { valid: false, body: "" };

  }


  const body = await request.text();


  // Parse "time=<unix_ts>,sig1=<hex_signature>"

  const parts = Object.fromEntries(

    signatureHeader.split(",").map((part) => {

      const [key, value] = part.split("=");

      return [key, value];

    }),

  );


  const time = parts["time"];

  const receivedSig = parts["sig1"];


  if (!time || !receivedSig) {

    return { valid: false, body };

  }


  // Build the source string: "<time>.<body>"

  const sourceString = `${time}.${body}`;

  const encoder = new TextEncoder();


  const key = await crypto.subtle.importKey(

    "raw",

    encoder.encode(secret),

    { name: "HMAC", hash: "SHA-256" },

    false,

    ["sign"],

  );


  const signature = await crypto.subtle.sign(

    "HMAC",

    key,

    encoder.encode(sourceString),

  );


  const expectedSig = [...new Uint8Array(signature)]

    .map((b) => b.toString(16).padStart(2, "0"))

    .join("");


  // Use a timing-safe comparison.

  // Do not return early when lengths differ — that leaks the expected

  // signature's length through timing.  Compare against self and negate instead.

  const expectedBytes = encoder.encode(expectedSig);

  const receivedBytes = encoder.encode(receivedSig);


  const lengthsMatch = expectedBytes.byteLength === receivedBytes.byteLength;

  const signaturesMatch = lengthsMatch

    ? crypto.subtle.timingSafeEqual(expectedBytes, receivedBytes)

    : !crypto.subtle.timingSafeEqual(expectedBytes, expectedBytes);


  return { valid: signaturesMatch, body };

}


export default {

  async fetch(request: Request, env: Env): Promise<Response> {

    if (request.method !== "POST") {

      return new Response("Method not allowed", { status: 405 });

    }


    if (!env.WEBHOOK_SECRET) {

      console.error("WEBHOOK_SECRET is not set");

      return new Response("Server misconfigured", { status: 500 });

    }


    const { valid, body } = await verifyWebhookSignature(

      request,

      env.WEBHOOK_SECRET,

    );


    if (!valid) {

      console.error("Invalid webhook signature");

      return new Response("Invalid signature", { status: 403 });

    }


    console.log("Webhook signature verified successfully");


    const payload = JSON.parse(body);


    console.log("Stream webhook received:", JSON.stringify(payload, null, 2));

    console.log("Video UID:", payload.uid);

    console.log("Status:", payload.status?.state);

    console.log("Ready to stream:", payload.readyToStream);


    // Add your own processing logic here — for example, update a database

    // or notify a downstream service.


    return new Response("OK", { status: 200 });

  },

} satisfies ExportedHandler<Env>;


```

## 6\. Start the local dev server

In a separate terminal (keep the tunnel running), start the Worker locally with Wrangler:

Terminal window

```

npx wrangler dev


```

Wrangler will load the `WEBHOOK_SECRET` from your `.dev.vars` file automatically.

## 7\. Trigger a test event

Upload a video to Stream to trigger a webhook event. Once the video finishes processing, you will see the webhook payload logged in the terminal running `wrangler dev`, along with a confirmation that the signature was verified.

## Moving to production

When you are done testing locally, deploy the Worker and update the webhook URL to your production endpoint:

Terminal window

```

npx wrangler deploy


```

Then update the webhook subscription to point to your deployed Worker URL:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Stream Write`

Create webhooks

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/webhook" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "notificationUrl": "https://your-worker.your-subdomain.workers.dev"

  }'


```

Warning

Updating the webhook URL rotates the signing secret. After you update the URL to your production endpoint, copy the new `secret` from the API response and set it as a secret on your deployed Worker:

Terminal window

```

npx wrangler secret put WEBHOOK_SECRET


```

If you restart the tunnel later for additional local testing, you will need to repeat steps 3 and 4 to register the new tunnel URL and update the secret in `.dev.vars`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/examples/test-webhooks-locally/#page","headline":"Test webhooks locally · Cloudflare Stream docs","description":"Test Cloudflare Stream webhook notifications locally using a Cloudflare Worker and Cloudflare Tunnel.","url":"https://developers.cloudflare.com/stream/examples/test-webhooks-locally/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/examples/test-webhooks-locally/","name":"Test webhooks locally"}}]}
```
