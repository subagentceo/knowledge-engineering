---
title: Workers API
description: Process incoming emails with the email() handler in Cloudflare Workers to forward, reply, or reject messages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers API

Process incoming emails with the email() handler in Cloudflare Workers. Forward, reply, reject, or process emails programmatically.

Process incoming emails using the `email()` handler in your Cloudflare Workers. This allows you to programmatically handle email routing with custom logic.

## Email handler syntax

Add the `email` handler function to your Worker's exported handlers:

* [  TypeScript ](#tab-panel-8466)
* [  Python ](#tab-panel-8467)

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    // Process incoming email

    await message.forward("destination@example.com");

  },

} satisfies ExportedHandler<Env>;


```

Python

```

from workers import WorkerEntrypoint


class Default(WorkerEntrypoint):

    async def email(self, message, env, ctx):

        await message.forward("destination@example.com")


```

### Parameters

| Parameter | Type                    | Description                                   |
| --------- | ----------------------- | --------------------------------------------- |
| message   | ForwardableEmailMessage | The incoming email message                    |
| env       | object                  | Worker environment bindings (KV, EMAIL, etc.) |
| ctx       | object                  | Execution context with waitUntil function     |

## `ForwardableEmailMessage` interface

The `message` parameter provides access to the incoming email:

TypeScript

```

interface ForwardableEmailMessage {

  readonly from: string; // Sender email address (envelope MAIL FROM)

  readonly to: string; // Recipient email address (envelope RCPT TO)

  readonly headers: Headers; // Email headers (Subject, Message-ID, etc.)

  readonly raw: ReadableStream; // Raw MIME email content stream

  readonly rawSize: number; // Size of raw email in bytes

  readonly canBeForwarded: boolean; // Whether the message can be forwarded


  // Actions

  setReject(reason: string): void;

  forward(rcptTo: string, headers?: Headers): Promise<EmailSendResult>;

  reply(message: EmailMessage): Promise<EmailSendResult>;

}


```

### Properties

* [ Basic properties ](#tab-panel-8468)
* [ Parse email content ](#tab-panel-8469)

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    // Access email metadata

    console.log(`From: ${message.from}`);

    console.log(`To: ${message.to}`);

    console.log(`Size: ${message.rawSize} bytes`);


    // Access headers

    const subject = message.headers.get("subject");

    const date = message.headers.get("date");

    const messageId = message.headers.get("message-id");


    console.log(`Subject: ${subject}`);

    console.log(`Date: ${date}`);

    console.log(`Message-ID: ${messageId}`);

  },

};


```

Use [postal-mime ↗](https://www.npmjs.com/package/postal-mime) to parse the MIME structure of an incoming email. The parser handles multipart boundaries, transfer encodings, and character sets correctly.

TypeScript

```

import PostalMime from "postal-mime";


export default {

  async email(message, env, ctx): Promise<void> {

    const email = await PostalMime.parse(message.raw);


    console.log(`Subject: ${email.subject}`);

    console.log(`Text: ${email.text}`);

    console.log(`HTML: ${email.html}`);

  },

};


```

## Email actions

### Forward emails

Forward incoming emails to verified destination addresses:

* [ Simple forwarding ](#tab-panel-8470)
* [ Conditional forwarding ](#tab-panel-8471)
* [ Multiple forwarding ](#tab-panel-8472)

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    // Forward to a single address

    await message.forward("team@example.com");

  },

};


```

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    const recipient = message.to;

    const subject = message.headers.get("subject") || "";


    // Route based on recipient

    if (recipient.includes("support@")) {

      await message.forward("support-team@example.com");

    } else if (recipient.includes("sales@")) {

      await message.forward("sales-team@example.com");

    } else if (subject.toLowerCase().includes("urgent")) {

      await message.forward("urgent@example.com");

    } else {

      // Default routing

      await message.forward("general@example.com");

    }

  },

};


```

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    const subject = message.headers.get("subject") || "";


    if (subject.toLowerCase().includes("security")) {

      // Forward to multiple addresses for security issues

      await Promise.all([

        message.forward("security@example.com"),

        message.forward("admin@example.com"),

        message.forward("ciso@example.com"),

      ]);

    } else {

      await message.forward("general@example.com");

    }

  },

};


```

### Forward with custom headers

Add custom headers when forwarding. Only headers with an `X-` prefix can be added through `forward()`. Other headers are removed.

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    // Create custom headers

    const customHeaders = new Headers();

    customHeaders.set("X-Processed-By", "Email-Worker");

    customHeaders.set("X-Processing-Time", new Date().toISOString());

    customHeaders.set("X-Original-Recipient", message.to);

    customHeaders.set("X-Spam-Score", "0.1"); // Example spam score


    // Forward with custom headers

    await message.forward("processed@example.com", customHeaders);

  },

};


```

### Reply to emails

Send automatic replies with `message.reply()`. Replies built this way are threaded with the original message and pass through the same SMTP session, so they preserve the original `Message-ID` chain.

Replies through the Workers API must satisfy the following requirements, otherwise `reply()` throws an exception:

* The incoming email must have a valid DMARC result.
* An email can only be replied to once per `EmailMessage` event.
* The recipient in the reply must match the sender of the incoming email.
* The outgoing sender domain must match the domain that received the email.
* The reply is rejected if the incoming email has more than 100 entries in its `References` header, to prevent reply loops and abuse.

The reply payload is an `EmailMessage` built from a raw MIME string. The examples below use [mimetext ↗](https://www.npmjs.com/package/mimetext) to build the MIME body. The `mimetext` package requires the [nodejs\_compat](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) compatibility flag.

* [ Simple auto-reply ](#tab-panel-8473)
* [ Smart auto-reply ](#tab-panel-8474)

TypeScript

```

import { EmailMessage } from "cloudflare:email";

import { createMimeMessage } from "mimetext";


export default {

  async email(message, env, ctx): Promise<void> {

    const subject = message.headers.get("subject") || "";

    const messageId = message.headers.get("Message-ID");


    const reply = createMimeMessage();

    if (messageId) {

      reply.setHeader("In-Reply-To", messageId);

      reply.setHeader("References", messageId);

    }

    reply.setSender(message.to);

    reply.setRecipient(message.from);

    reply.setSubject(`Re: ${subject}`);

    reply.addMessage({

      contentType: "text/plain",

      data: "Thank you for your message. We have received your email and will respond shortly.",

    });

    reply.addMessage({

      contentType: "text/html",

      data: "<h1>Thank you for your message</h1><p>We have received your email and will respond shortly.</p>",

    });


    await message.reply(

      new EmailMessage(message.to, message.from, reply.asRaw()),

    );


    // Also forward to human team

    await message.forward("team@example.com");

  },

};


```

TypeScript

```

import { EmailMessage } from "cloudflare:email";

import { createMimeMessage } from "mimetext";


export default {

  async email(message, env, ctx): Promise<void> {

    const sender = message.from;

    const recipient = message.to;

    const subject = message.headers.get("subject") || "";

    const messageId = message.headers.get("Message-ID");


    // Don't reply to automated emails

    if (

      sender.includes("noreply") ||

      sender.includes("no-reply") ||

      subject.toLowerCase().includes("automated")

    ) {

      await message.forward("team@example.com");

      return;

    }


    // Customized auto-reply based on recipient

    let html = "";


    if (recipient.includes("support@")) {

      html = `

                <h1>Support Request Received</h1>

                <p>Thank you for contacting support. Your request has been assigned ticket #${Date.now()}.</p>

                <p>Expected response time: 2-4 hours during business hours.</p>

            `;

    } else if (recipient.includes("sales@")) {

      html = `

                <h1>Sales Inquiry Received</h1>

                <p>Thank you for your interest in our products.</p>

                <p>A sales representative will contact you within 24 hours.</p>

            `;

    } else {

      html = `

                <h1>Message Received</h1>

                <p>Thank you for your message. We will respond within 2 business days.</p>

            `;

    }


    const reply = createMimeMessage();

    if (messageId) {

      reply.setHeader("In-Reply-To", messageId);

      reply.setHeader("References", messageId);

    }

    reply.setSender(recipient);

    reply.setRecipient(sender);

    reply.setSubject(`Re: ${subject}`);

    reply.addMessage({

      contentType: "text/plain",

      data: html.replace(/<[^>]*>/g, ""),

    });

    reply.addMessage({ contentType: "text/html", data: html });


    await message.reply(new EmailMessage(recipient, sender, reply.asRaw()));


    // Forward to appropriate team

    await message.forward("team@example.com");

  },

};


```

### Reject emails

Reject emails with a permanent SMTP error:

* [ Simple rejection ](#tab-panel-8475)
* [ Content-based rejection ](#tab-panel-8476)

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    const sender = message.from;


    // Block specific senders

    const blockedDomains = ["spam.com", "unwanted.net"];

    const senderDomain = sender.split("@")[1];


    if (blockedDomains.includes(senderDomain)) {

      message.setReject("Sender domain not allowed");

      return;

    }


    // Continue processing

    await message.forward("inbox@example.com");

  },

};


```

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    const subject = message.headers.get("subject") || "";


    // Reject based on subject content

    const spamKeywords = ["buy now", "limited time", "act fast", "urgent"];

    const containsSpam = spamKeywords.some((keyword) =>

      subject.toLowerCase().includes(keyword),

    );


    if (containsSpam) {

      message.setReject("Message appears to be spam");

      return;

    }


    // Check message size

    if (message.rawSize > 25 * 1024 * 1024) {

      // 25 MiB limit (inbound message size)

      message.setReject("Message too large");

      return;

    }


    // Continue processing

    await message.forward("inbox@example.com");

  },

};


```

## Error handling

Handle errors gracefully in email processing:

TypeScript

```

export default {

  async email(message, env, ctx): Promise<void> {

    try {

      // Main email processing logic

      await processEmail(message, env);

    } catch (error) {

      console.error("Email processing failed:", error);


      // Log error for monitoring

      if (env.ERROR_LOGS) {

        await env.ERROR_LOGS.put(

          `error-${Date.now()}`,

          JSON.stringify({

            error: error.message,

            stack: error.stack,

            from: message.from,

            to: message.to,

            timestamp: new Date().toISOString(),

          }),

        );

      }


      // Fallback: forward to admin

      try {

        await message.forward("admin@example.com");

      } catch (fallbackError) {

        console.error("Fallback forwarding failed:", fallbackError);

        // Last resort: reject the email

        message.setReject("Internal processing error");

      }

    }

  },

};


async function processEmail(message, env) {

  // Your main email processing logic here

  const recipient = message.to;


  if (recipient.includes("support@")) {

    await message.forward("support@example.com");

  } else if (recipient.includes("sales@")) {

    await message.forward("sales@example.com");

  } else {

    await message.forward("general@example.com");

  }

}


```

## Next steps

* Test locally: [Email routing development](https://developers.cloudflare.com/email-service/local-development/routing/)
* Manage rules and addresses programmatically with the [Email Routing REST API](https://developers.cloudflare.com/email-service/platform/email-routing-rest-api/)
* Set up [email routing configuration](https://developers.cloudflare.com/email-service/configuration/email-routing-addresses/)
* See [email routing examples](https://developers.cloudflare.com/email-service/examples/email-routing/) for advanced email processing
* Learn about [spam filtering](https://developers.cloudflare.com/email-service/examples/email-routing/spam-filtering/) with Workers

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/api/route-emails/email-handler/#page","headline":"Workers API · Cloudflare Email Service docs","description":"Process incoming emails with the email() handler in Cloudflare Workers to forward, reply, or reject messages.","url":"https://developers.cloudflare.com/email-service/api/route-emails/email-handler/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/email-service/","name":"Email Service"}},{"@type":"ListItem","position":3,"item":{"@id":"/email-service/api/","name":"API reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/email-service/api/route-emails/","name":"Route emails"}},{"@type":"ListItem","position":5,"item":{"@id":"/email-service/api/route-emails/email-handler/","name":"Workers API"}}]}
```
