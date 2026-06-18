---
title: HTTP Basic Authentication
description: Shows how to restrict access using the HTTP Basic schema.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# HTTP Basic Authentication

**Last reviewed:**  over 2 years ago 

Shows how to restrict access using the HTTP Basic schema.

Note

This example Worker makes use of the [Node.js Buffer API](https://developers.cloudflare.com/workers/runtime-apis/nodejs/buffer/), which is available as part of the Workers runtime [Node.js compatibility mode](https://developers.cloudflare.com/workers/runtime-apis/nodejs/). To run this Worker, you will need to [enable the nodejs\_compat compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

Caution when using in production

This code is provided as a sample, and is not suitable for production use. Basic Authentication sends credentials unencrypted, and must be used with an HTTPS connection to be considered secure. For a production-ready authentication system, consider using [Cloudflare Access ↗](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/).

* [  JavaScript ](#tab-panel-11595)
* [  TypeScript ](#tab-panel-11596)
* [  Rust ](#tab-panel-11597)
* [  Hono ](#tab-panel-11598)

JavaScript

```

/**

 * Shows how to restrict access using the HTTP Basic schema.

 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication

 * @see https://tools.ietf.org/html/rfc7617

 *

 */


import { Buffer } from "node:buffer";


const encoder = new TextEncoder();


/**

 * Protect against timing attacks by safely comparing values using `timingSafeEqual`.

 * Refer to https://developers.cloudflare.com/workers/runtime-apis/web-crypto/#timingsafeequal for more details

 * @param {string} a

 * @param {string} b

 * @returns {boolean}

 */

function timingSafeEqual(a, b) {

  const aBytes = encoder.encode(a);

  const bBytes = encoder.encode(b);


  // Do not return early when lengths differ — that leaks the secret's

  // length through timing.  Compare against self and negate instead.

  if (aBytes.byteLength !== bBytes.byteLength) {

    return !crypto.subtle.timingSafeEqual(aBytes, aBytes);

  }


  return crypto.subtle.timingSafeEqual(aBytes, bBytes);

}


export default {

  /**

   *

   * @param {Request} request

   * @param {{PASSWORD: string}} env

   * @returns

   */

  async fetch(request, env) {

    const BASIC_USER = "admin";


    // You will need an admin password. This should be

    // attached to your Worker as an encrypted secret.

    // Refer to https://developers.cloudflare.com/workers/configuration/secrets/

    const BASIC_PASS = env.PASSWORD ?? "password";


    const url = new URL(request.url);


    switch (url.pathname) {

      case "/":

        return new Response("Anyone can access the homepage.");


      case "/logout":

        // Invalidate the "Authorization" header by returning a HTTP 401.

        // We do not send a "WWW-Authenticate" header, as this would trigger

        // a popup in the browser, immediately asking for credentials again.

        return new Response("Logged out.", { status: 401 });


      case "/admin": {

        // The "Authorization" header is sent when authenticated.

        const authorization = request.headers.get("Authorization");

        if (!authorization) {

          return new Response("You need to login.", {

            status: 401,

            headers: {

              // Prompts the user for credentials.

              "WWW-Authenticate": 'Basic realm="my scope", charset="UTF-8"',

            },

          });

        }

        const [scheme, encoded] = authorization.split(" ");


        // The Authorization header must start with Basic, followed by a space.

        if (!encoded || scheme !== "Basic") {

          return new Response("Malformed authorization header.", {

            status: 400,

          });

        }


        const credentials = Buffer.from(encoded, "base64").toString();


        // The username & password are split by the first colon.

        //=> example: "username:password"

        const index = credentials.indexOf(":");

        const user = credentials.substring(0, index);

        const pass = credentials.substring(index + 1);


        if (

          !timingSafeEqual(BASIC_USER, user) ||

          !timingSafeEqual(BASIC_PASS, pass)

        ) {

          return new Response("You need to login.", {

            status: 401,

            headers: {

              // Prompts the user for credentials.

              "WWW-Authenticate": 'Basic realm="my scope", charset="UTF-8"',

            },

          });

        }


        return new Response("🎉 You have private access!", {

          status: 200,

          headers: {

            "Cache-Control": "no-store",

          },

        });

      }

    }


    return new Response("Not Found.", { status: 404 });

  },

};


```

TypeScript

```

/**

 * Shows how to restrict access using the HTTP Basic schema.

 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication

 * @see https://tools.ietf.org/html/rfc7617

 *

 */


import { Buffer } from "node:buffer";


const encoder = new TextEncoder();


/**

 * Protect against timing attacks by safely comparing values using `timingSafeEqual`.

 * Refer to https://developers.cloudflare.com/workers/runtime-apis/web-crypto/#timingsafeequal for more details

 */

function timingSafeEqual(a: string, b: string) {

  const aBytes = encoder.encode(a);

  const bBytes = encoder.encode(b);


  // Do not return early when lengths differ — that leaks the secret's

  // length through timing.  Compare against self and negate instead.

  if (aBytes.byteLength !== bBytes.byteLength) {

    return !crypto.subtle.timingSafeEqual(aBytes, aBytes);

  }


  return crypto.subtle.timingSafeEqual(aBytes, bBytes);

}


interface Env {

  PASSWORD: string;

}

export default {

  async fetch(request, env): Promise<Response> {

    const BASIC_USER = "admin";


    // You will need an admin password. This should be

    // attached to your Worker as an encrypted secret.

    // Refer to https://developers.cloudflare.com/workers/configuration/secrets/

    const BASIC_PASS = env.PASSWORD ?? "password";


    const url = new URL(request.url);


    switch (url.pathname) {

      case "/":

        return new Response("Anyone can access the homepage.");


      case "/logout":

        // Invalidate the "Authorization" header by returning a HTTP 401.

        // We do not send a "WWW-Authenticate" header, as this would trigger

        // a popup in the browser, immediately asking for credentials again.

        return new Response("Logged out.", { status: 401 });


      case "/admin": {

        // The "Authorization" header is sent when authenticated.

        const authorization = request.headers.get("Authorization");

        if (!authorization) {

          return new Response("You need to login.", {

            status: 401,

            headers: {

              // Prompts the user for credentials.

              "WWW-Authenticate": 'Basic realm="my scope", charset="UTF-8"',

            },

          });

        }

        const [scheme, encoded] = authorization.split(" ");


        // The Authorization header must start with Basic, followed by a space.

        if (!encoded || scheme !== "Basic") {

          return new Response("Malformed authorization header.", {

            status: 400,

          });

        }


        const credentials = Buffer.from(encoded, "base64").toString();


        // The username and password are split by the first colon.

        //=> example: "username:password"

        const index = credentials.indexOf(":");

        const user = credentials.substring(0, index);

        const pass = credentials.substring(index + 1);


        if (

          !timingSafeEqual(BASIC_USER, user) ||

          !timingSafeEqual(BASIC_PASS, pass)

        ) {

          return new Response("You need to login.", {

            status: 401,

            headers: {

              // Prompts the user for credentials.

              "WWW-Authenticate": 'Basic realm="my scope", charset="UTF-8"',

            },

          });

        }


        return new Response("🎉 You have private access!", {

          status: 200,

          headers: {

            "Cache-Control": "no-store",

          },

        });

      }

    }


    return new Response("Not Found.", { status: 404 });

  },

} satisfies ExportedHandler<Env>;


```

```

use base64::prelude::*;

use worker::*;


#[event(fetch)]

async fn fetch(req: Request, env: Env, _ctx: Context) -> Result<Response> {

    let basic_user = "admin";

    // You will need an admin password. This should be

    // attached to your Worker as an encrypted secret.

    // Refer to https://developers.cloudflare.com/workers/configuration/secrets/

    let basic_pass = match env.secret("PASSWORD") {

        Ok(s) => s.to_string(),

        Err(_) => "password".to_string(),

    };

    let url = req.url()?;


    match url.path() {

        "/" => Response::ok("Anyone can access the homepage."),

        // Invalidate the "Authorization" header by returning a HTTP 401.

        // We do not send a "WWW-Authenticate" header, as this would trigger

        // a popup in the browser, immediately asking for credentials again.

        "/logout" => Response::error("Logged out.", 401),

        "/admin" => {

            // The "Authorization" header is sent when authenticated.

            let authorization = req.headers().get("Authorization")?;

            if authorization == None {

                let mut headers = Headers::new();

                // Prompts the user for credentials.

                headers.set(

                    "WWW-Authenticate",

                    "Basic realm='my scope', charset='UTF-8'",

                )?;

                return Ok(Response::error("You need to login.", 401)?.with_headers(headers));

            }

            let authorization = authorization.unwrap();

            let auth: Vec<&str> = authorization.split(" ").collect();

            let scheme = auth[0];

            let encoded = auth[1];


            // The Authorization header must start with Basic, followed by a space.

            if encoded == "" || scheme != "Basic" {

                return Response::error("Malformed authorization header.", 400);

            }


            let buff = BASE64_STANDARD.decode(encoded).unwrap();

            let credentials = String::from_utf8_lossy(&buff);

            // The username & password are split by the first colon.

            //=> example: "username:password"

            let credentials: Vec<&str> = credentials.split(':').collect();

            let user = credentials[0];

            let pass = credentials[1];


            if user != basic_user || pass != basic_pass {

                let mut headers = Headers::new();

                // Prompts the user for credentials.

                headers.set(

                    "WWW-Authenticate",

                    "Basic realm='my scope', charset='UTF-8'",

                )?;

                return Ok(Response::error("You need to login.", 401)?.with_headers(headers));

            }


            let mut headers = Headers::new();

            headers.set("Cache-Control", "no-store")?;

            Ok(Response::ok("🎉 You have private access!")?.with_headers(headers))

        }

        _ => Response::error("Not Found.", 404),

    }

}


```

TypeScript

```

/**

 * Shows how to restrict access using the HTTP Basic schema with Hono.

 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication

 * @see https://tools.ietf.org/html/rfc7617

 */


import { Hono } from "hono";

import { basicAuth } from "hono/basic-auth";


// Define environment interface

interface Env {

  Bindings: {

    USERNAME: string;

    PASSWORD: string;

  };

}


const app = new Hono<Env>();


// Public homepage - accessible to everyone

app.get("/", (c) => {

  return c.text("Anyone can access the homepage.");

});


// Admin route - protected with Basic Auth

app.get(

  "/admin",

  async (c, next) => {

    const auth = basicAuth({

      username: c.env.USERNAME,

      password: c.env.PASSWORD,

    });


    return await auth(c, next);

  },

  (c) => {

    return c.text("🎉 You have private access!", 200, {

      "Cache-Control": "no-store",

    });

  },

);


export default app;


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/basic-auth/#page","headline":"HTTP Basic Authentication · Cloudflare Workers docs","description":"Shows how to restrict access using the HTTP Basic schema.","url":"https://developers.cloudflare.com/workers/examples/basic-auth/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Security","Authentication","JavaScript","TypeScript","Rust"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/basic-auth/","name":"HTTP Basic Authentication"}}]}
```
