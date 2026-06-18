---
title: UI snippets
description: Add AI Search to your website using pre-built, customizable web components for search and chat.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# UI snippets

You can add AI Search easily into your website using the [Cloudflare AI Search UI snippet library ↗](https://search.ai.cloudflare.com/), which provides production-ready, customizable web components.

The library is open source at [github.com/cloudflare/ai-search-snippet ↗](https://github.com/cloudflare/ai-search-snippet).

## Available components

The snippet library provides four web components. Each component connects to your AI Search instance using the `api-url` attribute, which should point to your public endpoint URL.

| Component              | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| <search-bar-snippet>   | An inline search bar that displays results in a dropdown    |
| <search-modal-snippet> | A search modal that opens with Cmd/Ctrl+K keyboard shortcut |
| <chat-bubble-snippet>  | A floating chat bubble in the corner of the page            |
| <chat-page-snippet>    | A full-page chat interface with conversation history        |

For advanced styling and configuration, visit [search.ai.cloudflare.com ↗](https://search.ai.cloudflare.com/).

## Prerequisites

UI snippets connect to your AI Search instance through a public endpoint. You need to enable this endpoint before using the snippets.

1. Go to **AI Search** in the Cloudflare dashboard.  
[ Go to **AI Search** ](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your AI Search instance.
3. Go to **Settings** \> **Public Endpoint**.
4. Turn on **Enable Public Endpoint**.
5. Copy the public endpoint URL. You will use this as the `api-url` attribute in your snippets.

## Use with HTML

1. Add the script tag to your HTML file (for example, `index.html`). Replace `<INSTANCE_ID>` with your AI Search instance's public endpoint ID, which you can find in your AI Search instance's **Settings** \> **Public Endpoint**.  
```  
<script  
  type="module"  
  src="https://<INSTANCE_ID>.search.ai.cloudflare.com/assets/v0.0.25/search-snippet.es.js"  
></script>  
```
2. Add a component with your `api-url`.  
```  
<search-bar-snippet  
  api-url="https://<INSTANCE_ID>.search.ai.cloudflare.com/"  
  placeholder="Search..."  
></search-bar-snippet>  
```
3. Before testing, [configure CORS](#configure-cors-for-local-testing) to allow your local origin. Then open the HTML file in your browser to test.

### Full HTML example

The following example shows a complete HTML page with a search bar. When a user types in the search bar, results appear in a dropdown below.

```

<!doctype html>

<html>

  <head>

    <script

      type="module"

      src="https://<INSTANCE_ID>.search.ai.cloudflare.com/assets/v0.0.25/search-snippet.es.js"

    ></script>

  </head>

  <body>

    <search-bar-snippet

      api-url="https://<INSTANCE_ID>.search.ai.cloudflare.com/"

      placeholder="Search..."

      max-results="10"

    ></search-bar-snippet>

  </body>

</html>


```

## Use with a framework

* [ React ](#tab-panel-6621)
* [ Vue ](#tab-panel-6622)

1. Open your React project and install the package:  
Terminal window  
```  
npm install @cloudflare/ai-search-snippet  
```
2. In your component file (for example, `src/App.tsx`), import the package:  
```  
import "@cloudflare/ai-search-snippet";  
```
3. Add a component to your JSX:  
```  
export default function App() {  
  return (  
    <search-bar-snippet  
      api-url="https://<INSTANCE_ID>.search.ai.cloudflare.com/"  
      placeholder="Search..."  
    />  
  );  
}  
```
4. Before testing, [configure CORS](#configure-cors-for-local-testing) to allow your local origin. Then run your development server:  
Terminal window  
```  
npm run dev  
```

The package includes TypeScript types and works with React, Next.js, and other React frameworks.

1. Open your Vue project and install the package:  
Terminal window  
```  
npm install @cloudflare/ai-search-snippet  
```
2. In your component file (for example, `src/App.vue`), import the package and add the component:  
```  
<template>  
  <search-bar-snippet :api-url="apiUrl" placeholder="Search..." />  
</template>  
<script setup>  
import "@cloudflare/ai-search-snippet";  
const apiUrl = "https://<INSTANCE_ID>.search.ai.cloudflare.com/";  
</script>  
```
3. Before testing, [configure CORS](#configure-cors-for-local-testing) to allow your local origin. Then run your development server:  
Terminal window  
```  
npm run dev  
```

## Configure CORS for local testing

When testing locally (for example, `http://localhost:3000`), you need to allow your local origin in the public endpoint settings.

1. Go to **AI Search** in the Cloudflare dashboard.  
[ Go to **AI Search** ](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your AI Search instance.
3. Go to **Settings** \> **Public Endpoint**.
4. Under **Authorized hosts**, add your local URL (for example, `http://localhost:3000`) or `*` to allow all origins during testing.
5. Select **Save**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/embed-search-snippets/#page","headline":"UI snippets · Cloudflare AI Search docs","description":"Add AI Search to your website using pre-built, customizable web components for search and chat.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/embed-search-snippets/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/retrieval/","name":"Retrieval"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/configuration/retrieval/embed-search-snippets/","name":"UI snippets"}}]}
```
