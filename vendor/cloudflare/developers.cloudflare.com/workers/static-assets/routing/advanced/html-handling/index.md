---
title: HTML handling
description: How to configure a HTML handling and trailing slashes for the static assets of your Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# HTML handling

Forcing or dropping trailing slashes on request paths (for example, `example.com/page/` vs. `example.com/page`) is often something that developers wish to control for cosmetic reasons. Additionally, it can impact SEO because search engines often treat URLs with and without trailing slashes as different, separate pages. This distinction can lead to duplicate content issues, indexing problems, and overall confusion about the correct canonical version of a page.

The [assets.html\_handling configuration](https://developers.cloudflare.com/workers/wrangler/configuration/#assets) determines the redirects and rewrites of requests for HTML content. It is used to specify the pattern for canonical URLs, thus where Cloudflare serves HTML content from, and additionally, where Cloudflare redirects non-canonical URLs to.

Take the following directory structure:

* Directorydist  
   * file.html  
   * Directoryfolder  
         * index.html

## Automatic trailing slashes (default)

This will usually give you the desired behavior automatically: individual files (e.g. `foo.html`) will be served _without_ a trailing slash and folder index files (e.g. `foo/index.html`) will be served _with_ a trailing slash.

* [  wrangler.jsonc ](#tab-panel-12131)
* [  wrangler.toml ](#tab-panel-12132)

JSONC

```

{

  "name": "my-worker",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "assets": {

    "directory": "./dist/",

    "html_handling": "auto-trailing-slash"

  }

}


```

TOML

```

name = "my-worker"

# Set this to today's date

compatibility_date = "2026-06-18"


[assets]

directory = "./dist/"

html_handling = "auto-trailing-slash"


```

Based on the incoming requests, the following assets would be served:

| Incoming Request   | Response        | Asset Served            |
| ------------------ | --------------- | ----------------------- |
| /file              | 200             | /dist/file.html         |
| /file.html         | 307 to /file    | \-                      |
| /file/             | 307 to /file    | \-                      |
| /file/index        | 307 to /file    | \-                      |
| /file/index.html   | 307 to /file    | \-                      |
| /folder            | 307 to /folder/ | \-                      |
| /folder.html       | 307 to /folder  | \-                      |
| /folder/           | 200             | /dist/folder/index.html |
| /folder/index      | 307 to /folder  | \-                      |
| /folder/index.html | 307 to /folder  | \-                      |

## Force trailing slashes

Alternatively, you can force trailing slashes (`force-trailing-slash`).

* [  wrangler.jsonc ](#tab-panel-12133)
* [  wrangler.toml ](#tab-panel-12134)

JSONC

```

{

  "name": "my-worker",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "assets": {

    "directory": "./dist/",

    "html_handling": "force-trailing-slash"

  }

}


```

TOML

```

name = "my-worker"

# Set this to today's date

compatibility_date = "2026-06-18"


[assets]

directory = "./dist/"

html_handling = "force-trailing-slash"


```

Based on the incoming requests, the following assets would be served:

| Incoming Request   | Response        | Asset Served            |
| ------------------ | --------------- | ----------------------- |
| /file              | 307 to /file/   | \-                      |
| /file.html         | 307 to /file/   | \-                      |
| /file/             | 200             | /dist/file.html         |
| /file/index        | 307 to /file/   | \-                      |
| /file/index.html   | 307 to /file/   | \-                      |
| /folder            | 307 to /folder/ | \-                      |
| /folder.html       | 307 to /folder/ | \-                      |
| /folder/           | 200             | /dist/folder/index.html |
| /folder/index      | 307 to /folder/ | \-                      |
| /folder/index.html | 307 to /folder/ | \-                      |

## Drop trailing slashes

Or you can drop trailing slashes (`drop-trailing-slash`).

* [  wrangler.jsonc ](#tab-panel-12135)
* [  wrangler.toml ](#tab-panel-12136)

JSONC

```

{

  "name": "my-worker",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "assets": {

    "directory": "./dist/",

    "html_handling": "drop-trailing-slash"

  }

}


```

TOML

```

name = "my-worker"

# Set this to today's date

compatibility_date = "2026-06-18"


[assets]

directory = "./dist/"

html_handling = "drop-trailing-slash"


```

Based on the incoming requests, the following assets would be served:

| Incoming Request   | Response       | Asset Served            |
| ------------------ | -------------- | ----------------------- |
| /file              | 200            | /dist/file.html         |
| /file.html         | 307 to /file   | \-                      |
| /file/             | 307 to /file   | \-                      |
| /file/index        | 307 to /file   | \-                      |
| /file/index.html   | 307 to /file   | \-                      |
| /folder            | 200            | /dist/folder/index.html |
| /folder.html       | 307 to /folder | \-                      |
| /folder/           | 307 to /folder | \-                      |
| /folder/index      | 307 to /folder | \-                      |
| /folder/index.html | 307 to /folder | \-                      |

## Disable HTML handling

Alternatively, if you have bespoke needs, you can disable the built-in HTML handling entirely (`none`).

* [  wrangler.jsonc ](#tab-panel-12137)
* [  wrangler.toml ](#tab-panel-12138)

JSONC

```

{

  "name": "my-worker",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "assets": {

    "directory": "./dist/",

    "html_handling": "none"

  }

}


```

TOML

```

name = "my-worker"

# Set this to today's date

compatibility_date = "2026-06-18"


[assets]

directory = "./dist/"

html_handling = "none"


```

Based on the incoming requests, the following assets would be served:

| Incoming Request   | Response                        | Asset Served                    |
| ------------------ | ------------------------------- | ------------------------------- |
| /file              | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /file.html         | 200                             | /dist/file.html                 |
| /file/             | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /file/index        | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /file/index.html   | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /folder            | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /folder.html       | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /folder/           | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /folder/index      | Depends on not\_found\_handling | Depends on not\_found\_handling |
| /folder/index.html | 200                             | /dist/folder/index.html         |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/#page","headline":"HTML handling · Cloudflare Workers docs","description":"How to configure a HTML handling and trailing slashes for the static assets of your Worker.","url":"https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/static-assets/","name":"Static Assets"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/static-assets/routing/","name":"Routing"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/static-assets/routing/advanced/","name":"Advanced"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers/static-assets/routing/advanced/html-handling/","name":"HTML handling"}}]}
```
