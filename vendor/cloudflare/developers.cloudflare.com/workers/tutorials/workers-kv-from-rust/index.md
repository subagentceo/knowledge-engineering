---
title: Use Workers KV directly from Rust
description: This tutorial will teach you how to read and write to KV directly from Rust using workers-rs. You will use Workers KV from Rust to build an app to store and retrieve cities.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Use Workers KV directly from Rust

**Last reviewed:**  about 2 years ago 

This tutorial will teach you how to read and write to KV directly from Rust using [workers-rs ↗](https://github.com/cloudflare/workers-rs).

## Before you start

All of the tutorials assume you have already completed the [Get started guide](https://developers.cloudflare.com/workers/get-started/guide/), which gets you set up with a Cloudflare Workers account, [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare), and [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## Prerequisites

To complete this tutorial, you will need:

* [Git ↗](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
* [Wrangler](https://developers.cloudflare.com/workers/wrangler/) CLI.
* The [Rust ↗](https://www.rust-lang.org/tools/install) toolchain.
* And `cargo-generate` sub-command by running:

Terminal window

```

cargo install cargo-generate


```

## 1\. Create your Worker project in Rust

Open a terminal window, and run the following command to generate a Worker project template in Rust:

Terminal window

```

cargo generate cloudflare/workers-rs


```

Then select `template/hello-world-http` template, give your project a descriptive name and select enter. A new project should be created in your directory. Open the project in your editor and run `npx wrangler dev` to compile and run your project.

In this tutorial, you will use Workers KV from Rust to build an app to store and retrieve cities by a given country name.

## 2\. Create a KV namespace

In the terminal, use Wrangler to create a KV namespace for `cities`. This generates a configuration to be added to the project:

Terminal window

```

npx wrangler kv namespace create cities


```

To add this configuration to your project, open the Wrangler file and create an entry for `kv_namespaces` above the build command:

* [  wrangler.jsonc ](#tab-panel-12207)
* [  wrangler.toml ](#tab-panel-12208)

JSONC

```

{

  "kv_namespaces": [

    {

      "binding": "cities",

      "id": "e29b263ab50e42ce9b637fa8370175e8"

    }

  ]

}


```

TOML

```

[[kv_namespaces]]

binding = "cities"

id = "e29b263ab50e42ce9b637fa8370175e8"


```

With this configured, you can access the KV namespace with the binding `"cities"` from Rust.

## 3\. Write data to KV

For this app, you will create two routes: A `POST` route to receive and store the city in KV, and a `GET` route to retrieve the city of a given country. For example, a `POST` request to `/France` with a body of `{"city": "Paris"}` should create an entry of Paris as a city in France. A `GET` request to `/France` should retrieve from KV and respond with Paris.

Install [Serde ↗](https://serde.rs/) as a project dependency to handle JSON `cargo add serde`. Then create an app router and a struct for `Country` in `src/lib.rs`:

```

use serde::{Deserialize, Serialize};

use worker::*;


#[event(fetch)]

async fn fetch(req: Request, env: Env, _ctx: Context) -> Result<Response> {

    let router = Router::new();


    #[derive(Serialize, Deserialize, Debug)]

    struct Country {

        city: String,

    }


    router

        // TODO:

        .post_async("/:country", |_, _| async move { Response::empty() })

        // TODO:

        .get_async("/:country", |_, _| async move { Response::empty() })

        .run(req, env)

        .await

}


```

For the post handler, you will retrieve the country name from the path and the city name from the request body. Then, you will save this in KV with the country as key and the city as value. Finally, the app will respond with the city name:

```

.post_async("/:country", |mut req, ctx| async move {

    let country = ctx.param("country").unwrap();

    let city = match req.json::<Country>().await {

        Ok(c) => c.city,

        Err(_) => String::from(""),

    };

    if city.is_empty() {

        return Response::error("Bad Request", 400);

    };

    return match ctx.kv("cities")?.put(country, &city)?.execute().await {

        Ok(_) => Response::ok(city),

        Err(_) => Response::error("Bad Request", 400),

    };

})


```

Save the file and make a `POST` request to test this endpoint:

Terminal window

```

curl --json '{"city": "Paris"}' http://localhost:8787/France


```

## 4\. Read data from KV

To retrieve cities stored in KV, write a `GET` route that pulls the country name from the path and searches KV. You also need some error handling if the country is not found:

```

.get_async("/:country", |_req, ctx| async move {

    if let Some(country) = ctx.param("country") {

        return match ctx.kv("cities")?.get(country).text().await? {

            Some(city) => Response::ok(city),

            None => Response::error("Country not found", 404),

        };

    }

    Response::error("Bad Request", 400)

})


```

Save and make a curl request to test the endpoint:

Terminal window

```

curl http://localhost:8787/France


```

## 5\. Deploy your project

The source code for the completed app should include the following:

```

use serde::{Deserialize, Serialize};

use worker::*;


#[event(fetch)]

async fn fetch(req: Request, env: Env, _ctx: Context) -> Result<Response> {

    let router = Router::new();


    #[derive(Serialize, Deserialize, Debug)]

    struct Country {

        city: String,

    }


    router

        .post_async("/:country", |mut req, ctx| async move {

            let country = ctx.param("country").unwrap();

            let city = match req.json::<Country>().await {

                Ok(c) => c.city,

                Err(_) => String::from(""),

            };

            if city.is_empty() {

                return Response::error("Bad Request", 400);

            };

            return match ctx.kv("cities")?.put(country, &city)?.execute().await {

                Ok(_) => Response::ok(city),

                Err(_) => Response::error("Bad Request", 400),

            };

        })

        .get_async("/:country", |_req, ctx| async move {

            if let Some(country) = ctx.param("country") {

                return match ctx.kv("cities")?.get(country).text().await? {

                    Some(city) => Response::ok(city),

                    None => Response::error("Country not found", 404),

                };

            }

            Response::error("Bad Request", 400)

        })

        .run(req, env)

        .await

}


```

To deploy your Worker, run the following command:

Terminal window

```

npx wrangler deploy


```

## Related resources

* [Rust support in Workers](https://developers.cloudflare.com/workers/languages/rust/).
* [Using KV in Workers](https://developers.cloudflare.com/kv/get-started/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/tutorials/workers-kv-from-rust/#page","headline":"Use Workers KV directly from Rust · Cloudflare Workers docs","description":"This tutorial will teach you how to read and write to KV directly from Rust using workers-rs. You will use Workers KV from Rust to build an app to store and retrieve cities.","url":"https://developers.cloudflare.com/workers/tutorials/workers-kv-from-rust/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-01-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Rust"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/tutorials/workers-kv-from-rust/","name":"Use Workers KV directly from Rust"}}]}
```
