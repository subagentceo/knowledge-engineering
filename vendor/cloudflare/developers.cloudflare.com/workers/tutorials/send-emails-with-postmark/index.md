---
title: Send Emails With Postmark
description: This tutorial explains how to send transactional emails from Workers using Postmark.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Send Emails With Postmark

**Last reviewed:**  about 2 years ago 

In this tutorial, you will learn how to send transactional emails from Workers using [Postmark ↗](https://postmarkapp.com/). At the end of this tutorial, you’ll be able to:

* Create a Worker to send emails.
* Sign up and add a Cloudflare domain to Postmark.
* Send emails from your Worker using Postmark.
* Store API keys securely with secrets.

## Prerequisites

To continue with this tutorial, you’ll need:

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages), if you don’t already have one.
* A [registered](https://developers.cloudflare.com/registrar/get-started/register-domain/) domain.
* Installed [npm ↗](https://docs.npmjs.com/getting-started).
* A [Postmark account ↗](https://account.postmarkapp.com/sign%5Fup).

## Create a Worker project

Start by using [C3](https://developers.cloudflare.com/pages/get-started/c3/) to create a Worker project in the command line, then, answer the prompts:

Terminal window

```

npm create cloudflare@latest


```

Alternatively, you can use CLI arguments to speed things up:

Terminal window

```

npm create cloudflare@latest email-with-postmark -- --type=hello-world --ts=false --git=true --deploy=false


```

This creates a simple hello-world Worker having the following content:

JavaScript

```

export default {

  async fetch(request, env, ctx) {

    return new Response("Hello World!");

  },

};


```

## Add your domain to Postmark

If you don’t already have a Postmark account, you can sign up for a [free account here ↗](https://account.postmarkapp.com/sign%5Fup). After signing up, check your inbox for a link to confirm your sender signature. This verifies and enables you to send emails from your registered email address.

To enable email sending from other addresses on your domain, navigate to `Sender Signatures` on the Postmark dashboard, `Add Domain or Signature` \> `Add Domain`, then type in your domain and click on `Verify Domain`.

Next, you’re presented with a list of DNS records to add to your Cloudflare domain. On your Cloudflare dashboard, select the domain you entered earlier and navigate to `DNS` \> `Records`. Copy/paste the DNS records (DKIM, and Return-Path) from Postmark to your Cloudflare domain.

![Image of adding DNS records to a Cloudflare domain](https://developers.cloudflare.com/_astro/add_dns_records.CuwqhmEV_Z1PK0DA.webp) 

Note

If you need more help adding DNS records in Cloudflare, refer to [Manage DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/).

When that’s done, head back to Postmark and click on the `Verify` buttons. If all records are properly configured, your domain status should be updated to `Verified`.

![Image of domain verification on the Postmark dashboard](https://developers.cloudflare.com/_astro/verified_domain.CSwUI8xQ_ZJiRKw.webp) 

To grab your API token, navigate to the `Servers` tab, then `My First Server` \> `API Tokens`, then copy your API key to a safe place.

## Send emails from your Worker

The final step is putting it all together in a Worker. In your Worker, make a post request with `fetch` to Postmark’s email API and include your token and message body:

Note

[Postmark’s JavaScript library ↗](https://www.npmjs.com/package/postmark) is currently not supported on Workers. Use the [email API ↗](https://postmarkapp.com/developer/user-guide/send-email-with-api) instead.

```

export default {

  async fetch(request, env, ctx) {

    return await fetch("https://api.postmarkapp.com/email", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        "X-Postmark-Server-Token": "your_postmark_api_token_here",

      },

      body: JSON.stringify({

        From: "hello@example.com",

        To: "someone@example.com",

        Subject: "Hello World",

        HtmlBody: "<p>Hello from Workers</p>",

      }),

    });

  },

};


```

To test your code locally, run the following command and navigate to [http://localhost:8787/ ↗](http://localhost:8787/) in a browser:

Terminal window

```

npm start


```

Deploy your Worker with `npm run deploy`.

## Move API token to Secrets

Sensitive information such as API keys and token should always be stored in secrets. All secrets are encrypted to add an extra layer of protection. That said, it’s a good idea to move your API token to a secret and access it from the environment of your Worker.

To add secrets for local development, create a `.dev.vars` file which works exactly like a `.env` file:

```

POSTMARK_API_TOKEN=your_postmark_api_token_here


```

Also ensure the secret is added to your deployed worker by running:

Add secret to deployed Worker

```

npx wrangler secret put POSTMARK_API_TOKEN


```

The added secret can be accessed on via the `env` parameter passed to your Worker’s fetch event handler:

```

export default {

  async fetch(request, env, ctx) {

    return await fetch("https://api.postmarkapp.com/email", {

      method: "POST",

      headers: {

        "Content-Type": "application/json",

        "X-Postmark-Server-Token": env.POSTMARK_API_TOKEN,

      },

      body: JSON.stringify({

        From: "hello@example.com",

        To: "someone@example.com",

        Subject: "Hello World",

        HtmlBody: "<p>Hello from Workers</p>",

      }),

    });

  },

};


```

And finally, deploy this update with `npm run deploy`.

## Related resources

* [Storing API keys and tokens with Secrets](https://developers.cloudflare.com/workers/configuration/secrets/).
* [Transferring your domain to Cloudflare](https://developers.cloudflare.com/registrar/get-started/transfer-domain-to-cloudflare/).
* [Send emails from Workers](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/send-emails-with-postmark/#page","headline":"Send Emails With Postmark · Cloudflare Workers docs","description":"This tutorial explains how to send transactional emails from Workers using Postmark.","url":"https://developers.cloudflare.com/workers/tutorials/send-emails-with-postmark/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/tutorials/send-emails-with-postmark/","name":"Send Emails With Postmark"}}]}
```
