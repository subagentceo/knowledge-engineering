---
title: Pay cart and send invoice
description: Send invoice when shopping cart is checked out and paid for
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pay cart and send invoice

**Last reviewed:**  over 1 year ago 

Send invoice when shopping cart is checked out and paid for

In this example, we implement a Workflow for an e-commerce website that is triggered every time a shopping cart is created.

Once a Workflow instance is triggered, it starts polling a [D1](https://developers.cloudflare.com/d1) database for the cart ID until it has been checked out. Once the shopping cart is checked out, we proceed to process the payment with an external provider doing a fetch POST. Finally, assuming everything goes well, we try to send an email using [Email Workers](https://developers.cloudflare.com/email-service/api/route-emails/email-handler/) with the invoice to the customer.

As you can see, Workflows handles all the different service responses and failures; it will retry D1 until the cart is checked out, retry the payment processor if it fails for some reason, and retry sending the email with the invoice if it can't. The developer doesn't have to care about any of that logic, and the workflow can run for hours, handling all the possible conditions until it is completed.

This is a simplified example of processing a shopping cart. We would assume more steps and additional logic in a real-life scenario, but this example gives you a good idea of what you can do with Workflows.

TypeScript

```

import {

  WorkflowEntrypoint,

  WorkflowStep,

  WorkflowEvent,

} from "cloudflare:workers";

import { EmailMessage } from "cloudflare:email";

import { createMimeMessage } from "mimetext";


// We are using Email Routing to send emails out and D1 for our cart database

type Env = {

  CART_WORKFLOW: Workflow;

  SEND_EMAIL: any;

  DB: any;

};


// Workflow parameters: we expect a cartId

type Params = {

  cartId: string;

};


// Adjust this to your Cloudflare zone using Email Routing

const merchantEmail = "merchant@example.com";


// Uses mimetext npm to generate Email

const genEmail = (email: string, amount: number) => {

  const msg = createMimeMessage();

  msg.setSender({ name: "Pet shop", addr: merchantEmail });

  msg.setRecipient(email);

  msg.setSubject("You invoice");

  msg.addMessage({

    contentType: "text/plain",

    data: `Your invoice for ${amount} has been paid. Your products will be shipped shortly.`,

  });


  return new EmailMessage(merchantEmail, email, msg.asRaw());

};


// Workflow logic

export class cartInvoicesWorkflow extends WorkflowEntrypoint<Env, Params> {

  async run(event: WorkflowEvent<Params>, step: WorkflowStep) {

    await step.sleep("sleep for a while", "10 seconds");


    // Retrieve the cart from the D1 database

    // if the cart hasn't been checked out yet retry every 2 minutes, 10 times, otherwise give up

    const cart = await step.do(

      "retrieve cart",

      {

        retries: {

          limit: 10,

          delay: 2000 * 60,

          backoff: "constant",

        },

        timeout: "30 seconds",

      },

      async () => {

        const { results } = await this.env.DB.prepare(

          `SELECT * FROM cart WHERE id = ?`,

        )

          .bind(event.payload.cartId)

          .run();

        // should return { checkedOut: true, amount: 250 , account: { email: "celsomartinho@gmail.com" }};

        if (results[0].checkedOut === false) {

          throw new Error("cart hasn't been checked out yet");

        }

        return results[0];

      },

    );


    // Proceed to payment, retry 10 times every minute or give up

    const payment = await step.do(

      "payment",

      {

        retries: {

          limit: 10,

          delay: 1000 * 60,

          backoff: "constant",

        },

        timeout: "30 seconds",

      },

      async () => {

        let resp = await fetch("https://payment-processor.example.com/", {

          method: "POST",

          headers: {

            "Content-Type": "application/json; charset=utf-8",

          },

          body: JSON.stringify({ amount: cart.amount }),

        });


        if (!resp.ok) {

          throw new Error("payment has failed");

        }


        return { success: true, amount: cart.amount };

      },

    );


    // Send invoice to the customer, retry 10 times every 5 minutes or give up

    // Requires that cart.account.email has previously been validated in Email Routing,

    // See https://developers.cloudflare.com/email-service/api/route-emails/email-handler/

    await step.do(

      "send invoice",

      {

        retries: {

          limit: 10,

          delay: 5000 * 60,

          backoff: "constant",

        },

        timeout: "30 seconds",

      },

      async () => {

        const message = genEmail(cart.account.email, payment.amount);

        try {

          await this.env.SEND_EMAIL.send(message);

        } catch (e) {

          throw new Error("failed to send invoice");

        }

      },

    );

  }

}


// Default page for admin

// Remove in production


export default {

  async fetch(req: Request, env: Env): Promise<Response> {

    let url = new URL(req.url);


    let id = new URL(req.url).searchParams.get("instanceId");


    // Get the status of an existing instance, if provided

    if (id) {

      let instance = await env.CART_WORKFLOW.get(id);

      return Response.json({

        status: await instance.status(),

      });

    }


    if (url.pathname.startsWith("/new")) {

      let instance = await env.CART_WORKFLOW.create({

        params: {

          cartId: "123",

        },

      });

      return Response.json({

        id: instance.id,

        details: await instance.status(),

      });

    }


    return new Response(

      `<html><body><a href="https://developers.cloudflare.com/new">new instance</a> or add ?instanceId=...</body></html>`,

      {

        headers: {

          "content-type": "text/html;charset=UTF-8",

        },

      },

    );

  },

};


```

Here's a minimal package.json:

```

{

  "devDependencies": {

    "wrangler": "^3.83.0"

  },

  "dependencies": {

    "mimetext": "^3.0.24"

  }

}


```

And finally [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/):

* [  wrangler.jsonc ](#tab-panel-13061)
* [  wrangler.toml ](#tab-panel-13062)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "cart-invoices",

  "main": "src/index.ts",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": [

    "nodejs_compat"

  ],

  "workflows": [

    {

      "name": "cart-invoices-workflow",

      "binding": "CART_WORKFLOW",

      "class_name": "cartInvoicesWorkflow"

    }

  ],

  "send_email": [

    {

      "name": "SEND_EMAIL"

    }

  ]

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "cart-invoices"

main = "src/index.ts"

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = [ "nodejs_compat" ]


[[workflows]]

name = "cart-invoices-workflow"

binding = "CART_WORKFLOW"

class_name = "cartInvoicesWorkflow"


[[send_email]]

name = "SEND_EMAIL"


```

If you're using TypeScript, run [wrangler types](https://developers.cloudflare.com/workers/wrangler/commands/general/#types) whenever you modify your Wrangler configuration file. This generates types for the `env` object based on your bindings, as well as [runtime types](https://developers.cloudflare.com/workers/languages/typescript/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workflows/examples/send-invoices/#page","headline":"Pay cart and send invoice · Cloudflare Workflows docs","description":"Send invoice when shopping cart is checked out and paid for","url":"https://developers.cloudflare.com/workflows/examples/send-invoices/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TypeScript"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/examples/send-invoices/","name":"Pay cart and send invoice"}}]}
```
