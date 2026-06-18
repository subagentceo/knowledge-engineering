---
title: REST API
description: Convert documents to Markdown using the Workers AI REST API endpoint.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# REST API

You can also use the Markdown Conversion REST API to convert your documents into Markdown.

## Prerequisite: Get Workers AI API token

To use the Markdown Conversion service via the REST API, you need an API token with permissions for the [Workers AI](https://developers.cloudflare.com/workers-ai/) REST API. Refer to [Get started with the Workers AI REST API](https://developers.cloudflare.com/workers-ai/get-started/rest-api/) for instructions on obtaining an API token with the correct permissions.

## Transform

This endpoint lets you convert any file given to us into markdown.

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/tomarkdown \

  -X POST \

  -H 'Authorization: Bearer {API_TOKEN}' \

  -F "files=@cat.jpeg" \

  -F "files=@somatosensory.pdf" \

  -F 'conversionOptions={ ... }'


```

Note

You can get your `ACCOUNT_ID` by going to [Workers & Pages on the dashboard](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/#find-account-id-workers-and-pages).

### Parameters

`files` ` File[] ` required

The files you want to convert.

`conversionOptions` ` ConversionOptions ` optional

Options that allow you to control how your files are converted. Refer to [Conversion Options](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/) for further details.

### Response

```

{

  "success": true,

  "result": [

    {

      "id": "...",

      "name": "good.html",

      "mimeType": "text/html",

      "format": "markdown",

      "tokens": 49,

      "data": "# Image Embedded with a Data URI\n\nThis _image_ is directly encoded in the HTML:\n\n\n\nAn image description\n\n \n\nIt's a tiny 5x5 pixel PNG, scaled up to 50x50px.\n\n"

    },

    {

      "id": "...",

      "name": "bad.pdf",

      "mimeType": "application/pdf",

      "format": "error",

      "error": "Some error that prevented this image from being converted"

    }

  ]

}


```

## Supported

This endpoint lets you programmatically retrieve the full set of rich formats that are supported for conversion.

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/tomarkdown/supported \

  -H 'Authorization: Bearer {API_TOKEN}'


```

Note

You can get your `ACCOUNT_ID` by going to [Workers & Pages on the dashboard](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/#find-account-id-workers-and-pages).

### Response

```

{

  "success": true,

  "result": [

    {

      "extension": ".html",

      "mimeType": "text/html"

    },

    {

      "extension": ".pdf",

      "mimeType": "application/pdf"

    },

    ...

  ]

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/rest-api/#page","headline":"REST API · Cloudflare Workers AI docs","description":"Convert documents to Markdown using the Workers AI REST API endpoint.","url":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/rest-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/markdown-conversion/","name":"Markdown Conversion"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/features/markdown-conversion/usage/","name":"Usage"}},{"@type":"ListItem","position":6,"item":{"@id":"/workers-ai/features/markdown-conversion/usage/rest-api/","name":"REST API"}}]}
```
