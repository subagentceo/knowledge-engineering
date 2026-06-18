---
title: How it works
description: Learn how Workers AI pre-processes and converts HTML, images, and other files to Markdown.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# How it works

## Pre-processing

When parsing files before converting them to Markdown, there are some cleanup tasks we do depending on the type of file you are trying to convert.

### HTML

When we detect an HTML file, a series of things happen to the HTML content before it is converted:

* Some elements are ignored, including `script` and `style` tags.
* Meta tags are extracted. These include `title`, `description`, `og:title`, `og:description` and `og:image`.
* [JSON-LD ↗](https://json-ld.org/) content is extracted, if it exists. This will be appended at the end of the converted markdown.
* The base URL to use for resolving relative links is extracted from the `<base>` element1, if it exists, according to the spec (that is, only the first instance of the base URL is counted).
* If the `cssSelector` option is:  
   * present, then only those elements that match the selector are kept for further processing;  
   * missing, then elements such as `<header>`, `<footer>` and `<head>` are removed from the text.
* If a base URL was obtained previously, relative links in the remaining HTML are resolved to fully qualified URLs

1 The host can also be set per request, using the HTML conversion options. Refer to [Conversion Options](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/#html) for more details.

### Images

Images take a bit more work to prepare for conversion.

As a first step, we detect what type the image is. If it is an SVG (Scalable Vector Graphics) file, we need to convert it into a raster format so that using the necessary Workers AI models does not fail. In this case, SVGs are converted into PNGs internally.

Afterwards:

* We try to determine the image's dimensions. If successful, we determine if the image is considered "too big" or not. An image is "too big" if its width is bigger than 1280px or its height is bigger than 720px.
* If the image is too big, we try to resize it to conform with those dimensions. If resizing fails, we simply try to use the original image data
* The image is sent to an **object-detection model**. Specifically, we use the [@cf/facebook/detr-resnet-50](https://developers.cloudflare.com/workers-ai/models/detr-resnet-50/) from Workers AI.
* If any objects were detected in the previous step, they are appended to a prompt that is used to instruct an **image-to-text model** on how to describe the image.
* If a preferred conversion language is specified in the request's conversion options, the previous prompt is enriched with a directive for the model to output the content in the desired language. Refer to [Conversion Options](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/#images) for more details.
* The final prompt is sent, along with the image data, to the [@cf/google/gemma-3-12b-it](https://developers.cloudflare.com/workers-ai/models/gemma-3-12b-it/) model, also from Workers AI.

### PDFs

* Metadata is extracted. This can be removed from the final result. Refer to [Conversion Options](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/#pdf) for more details.
* Each page is parsed in sequence.
* We try to obtain a `StructTree` object from the PDF file. This data structure is a tree of tagged elements that make up the PDF contents, as specified by [ISO 14289 (PDF/UA) ↗](https://www.iso.org/standard/64599.html).
* If none is obtained, we extract the text of the page _as-is_ and return it.
* If we manage to obtain a `StructTree`, we traverse its nodes to build a semantic Markdown representation of its contents.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/how-it-works/#page","headline":"How it works · Cloudflare Workers AI docs","description":"Learn how Workers AI pre-processes and converts HTML, images, and other files to Markdown.","url":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/how-it-works/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/features/markdown-conversion/","name":"Markdown Conversion"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/features/markdown-conversion/how-it-works/","name":"How it works"}}]}
```
