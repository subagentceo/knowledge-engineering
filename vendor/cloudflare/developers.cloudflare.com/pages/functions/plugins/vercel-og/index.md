---
title: vercel/og
description: Generate social images in Pages Functions using the @vercel/og Pages Plugin.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# vercel/og

The `@vercel/og` Pages Plugin is a middleware which renders social images for webpages. It also includes an API to create arbitrary images.

As the name suggests, it is powered by [@vercel/og ↗](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation). This plugin and its underlying [Satori ↗](https://github.com/vercel/satori) library was created by the Vercel team.

## Install

To install the `@vercel/og` Pages Plugin, run:

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/pages-plugin-vercel-og
```

```
yarn add @cloudflare/pages-plugin-vercel-og
```

```
pnpm add @cloudflare/pages-plugin-vercel-og
```

```
bun add @cloudflare/pages-plugin-vercel-og
```

## Use

TypeScript

```

import React from "react";

import vercelOGPagesPlugin from "@cloudflare/pages-plugin-vercel-og";


interface Props {

  ogTitle: string;

}


export const onRequest = vercelOGPagesPlugin<Props>({

  imagePathSuffix: "/social-image.png",

  component: ({ ogTitle, pathname }) => {

    return <div style={{ display: "flex" }}>{ogTitle}</div>;

  },

  extractors: {

    on: {

      'meta[property="og:title"]': (props) => ({

        element(element) {

          props.ogTitle = element.getAttribute("content");

        },

      }),

    },

  },

  autoInject: {

    openGraph: true,

  },

});


```

The Plugin takes an object with six properties:

* `imagePathSuffix`: the path suffix to make the generate image available at. For example, if you mount this Plugin at `functions/blog/_middleware.ts`, set the `imagePathSuffix` as `/social-image.png` and have a `/blog/hello-world` page, the image will be available at `/blog/hello-world/social-image.png`.
* `component`: the React component that will be used to render the image. By default, the React component is given a `pathname` property equal to the pathname of the underlying webpage (for example, `/blog/hello-world`), but more dynamic properties can be provided with the `extractors` option.
* `extractors`: an optional object with two optional properties: `on` and `onDocument`. These properties can be set to a function which takes an object and returns a [HTMLRewriter element handler](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/#element-handlers) or [document handler](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/#document-handlers) respectively. The object parameter can be mutated in order to provide the React component with additional properties. In the example above, you will use an element handler to extract the `og:title` meta tag from the webpage and pass that to the React component as the `ogTitle` property. This is the primary mechanism you will use to create dynamic images which use values from the underlying webpage.
* `options`: [an optional object which is given directly to the @vercel/og library ↗](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-api).
* `onError`: an optional function which returns a `Response` or a promise of a `Response`. This function is called when a request is made to the `imagePathSuffix` and `extractors` are provided but the underlying webpage is not valid HTML. Defaults to returning a `404` response.
* `autoInject`: an optional object with an optional property: `openGraph`. If set to `true`, the Plugin will automatically set the `og:image`, `og:image:height` and `og:image:width` meta tags on the underlying webpage.

### Generate arbitrary images

Use this Plugin's API to generate arbitrary images, not just as middleware.

For example, the below code will generate an image saying "Hello, world!" which is available at `/greet`.

TypeScript

```

import React from "react";

import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";


export const onRequest: PagesFunction = async () => {

  return new ImageResponse(

    <div style={{ display: "flex" }}>Hello, world!</div>,

    {

      width: 1200,

      height: 630,

    }

  );

};


```

This is the same API that the underlying [@vercel/og library ↗](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation/og-image-api) offers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/plugins/vercel-og/#page","headline":"vercel/og · Cloudflare Pages docs","description":"Generate social images in Pages Functions using the @vercel/og Pages Plugin.","url":"https://developers.cloudflare.com/pages/functions/plugins/vercel-og/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/plugins/","name":"Pages Plugins"}},{"@type":"ListItem","position":5,"item":{"@id":"/pages/functions/plugins/vercel-og/","name":"vercel/og"}}]}
```
