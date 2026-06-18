---
title: Cloudflare Access
description: Validate Cloudflare Access JWT assertions in Pages Functions using this Plugin.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Access

The Cloudflare Access Pages Plugin is a middleware to validate Cloudflare Access JWT assertions. It also includes an API to lookup additional information about a given user's JWT.

## Installation

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/pages-plugin-cloudflare-access
```

```
yarn add @cloudflare/pages-plugin-cloudflare-access
```

```
pnpm add @cloudflare/pages-plugin-cloudflare-access
```

```
bun add @cloudflare/pages-plugin-cloudflare-access
```

## Usage

TypeScript

```

import cloudflareAccessPlugin from "@cloudflare/pages-plugin-cloudflare-access";


export const onRequest: PagesFunction = cloudflareAccessPlugin({

  domain: "https://test.cloudflareaccess.com",

  aud: "4714c1358e65fe4b408ad6d432a5f878f08194bdb4752441fd56faefa9b2b6f2",

});


```

The Plugin takes an object with two properties: the `domain` of your Cloudflare Access account, and the policy `aud` (audience) to validate against. Any requests which fail validation will be returned a `403` status code.

### Access the JWT payload

If you need to use the JWT payload in your application (for example, you need the user's email address), this Plugin will make this available for you at `data.cloudflareAccess.JWT.payload`.

For example:

TypeScript

```

import type { PluginData } from "@cloudflare/pages-plugin-cloudflare-access";


export const onRequest: PagesFunction<unknown, any, PluginData> = async ({

  data,

}) => {

  return new Response(

    `Hello, ${data.cloudflareAccess.JWT.payload.email || "service user"}!`,

  );

};


```

The [entire JWT payload](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/#payload) will be made available on `data.cloudflareAccess.JWT.payload`. Be aware that the fields available differ between identity authorizations (for example, a user in a browser) and non-identity authorizations (for example, a service token).

### Look up identity

In order to get more information about a given user's identity, use the provided `getIdentity` API function:

TypeScript

```

import { getIdentity } from "@cloudflare/pages-plugin-cloudflare-access/api";


export const onRequest: PagesFunction = async ({ data }) => {

  const identity = await getIdentity({

    jwt: "eyJhbGciOiJIUzI1NiIsImtpZCI6IjkzMzhhYmUxYmFmMmZlNDkyZjY0NmE3MzZmMjVhZmJmN2IwMjVlMzVjNjI3YmU0ZjYwYzQxNGQ0YzczMDY5YjgiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOlsiOTdlMmFhZTEyMDEyMWY5MDJkZjhiYzk5ZmMzNDU5MTNhYjE4NmQxNzRmMzA3OWVhNzI5MjM2NzY2YjJlN2M0YSJdLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiZXhwIjoxNTE5NDE4MjE0LCJpYXQiOjE1MTkzMzE4MTUsImlzcyI6Imh0dHBzOi8vdGVzdC5jbG91ZGZsYXJlYWNjZXNzLmNvbSIsIm5vbmNlIjoiMWQ4MDgzZjcwOGE0Nzk4MjI5NmYyZDk4OTZkNzBmMjA3YTI3OTM4ZjAyNjU0MGMzOTJiOTAzZTVmZGY0ZDZlOSIsInN1YiI6ImNhNjM5YmI5LTI2YWItNDJlNS1iOWJmLTNhZWEyN2IzMzFmZCJ9.05vGt-_0Mw6WEFJF3jpaqkNb88PUMplsjzlEUvCEfnQ",

    domain: "https://test.cloudflareaccess.com",

  });


  return new Response(`Hello, ${identity.name || "service user"}!`);

};


```

The `getIdentity` function takes an object with two properties: a `jwt` string, and a `domain` string. It returns a `Promise` of [the object returned by the /cdn-cgi/access/get-identity endpoint](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/#user-identity). This is particularly useful if you want to use a user's group membership for something like application permissions.

For convenience, this same information can be fetched for the current request's JWT with the `data.cloudflareAccess.JWT.getIdentity` function, (assuming you have already validated the request with the Plugin as above):

TypeScript

```

import type { PluginData } from "@cloudflare/pages-plugin-cloudflare-access";


export const onRequest: PagesFunction<unknown, any, PluginData> = async ({

  data,

}) => {

  const identity = await data.cloudflareAccess.JWT.getIdentity();


  return new Response(`Hello, ${identity.name || "service user"}!`);

};


```

### Login and logout URLs

If you want to force a login or logout, use these utility functions to generate URLs and redirect a user:

TypeScript

```

import { generateLoginURL } from "@cloudflare/pages-plugin-cloudflare-access/api";


export const onRequest = () => {

  const loginURL = generateLoginURL({

    redirectURL: "https://example.com/greet",

    domain: "https://test.cloudflareaccess.com",

    aud: "4714c1358e65fe4b408ad6d432a5f878f08194bdb4752441fd56faefa9b2b6f2",

  });


  return new Response(null, {

    status: 302,

    headers: { Location: loginURL },

  });

};


```

TypeScript

```

import { generateLogoutURL } from "@cloudflare/pages-plugin-cloudflare-access/api";


export const onRequest = () =>

  new Response(null, {

    status: 302,

    headers: {

      Location: generateLogoutURL({

        domain: "https://test.cloudflareaccess.com",

      }),

    },

  });


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/plugins/cloudflare-access/#page","headline":"Cloudflare Access · Cloudflare Pages docs","description":"Validate Cloudflare Access JWT assertions in Pages Functions using this Plugin.","url":"https://developers.cloudflare.com/pages/functions/plugins/cloudflare-access/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/plugins/","name":"Pages Plugins"}},{"@type":"ListItem","position":5,"item":{"@id":"/pages/functions/plugins/cloudflare-access/","name":"Cloudflare Access"}}]}
```
