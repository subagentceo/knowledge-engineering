---
title: Google Chat
description: Create a Google Chat bot with the Pages Plugin for responding to messages and sending alerts.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Google Chat

The Google Chat Pages Plugin creates a Google Chat bot which can respond to messages. It also includes an API for interacting with Google Chat (for example, for creating messages) without the need for user input. This API is useful for situations such as alerts.

## Installation

 npm  yarn  pnpm  bun 

```
npm i @cloudflare/pages-plugin-google-chat
```

```
yarn add @cloudflare/pages-plugin-google-chat
```

```
pnpm add @cloudflare/pages-plugin-google-chat
```

```
bun add @cloudflare/pages-plugin-google-chat
```

## Usage

TypeScript

```

import googleChatPlugin from "@cloudflare/pages-plugin-google-chat";


export const onRequest: PagesFunction = googleChatPlugin(async (message) => {

  if (message.text.includes("ping")) {

    return { text: "pong" };

  }


  return { text: "Sorry, I could not understand your message." };

});


```

The Plugin takes a function, which in turn takes an incoming message, and returns a `Promise` of a response message (or `void` if there should not be any response).

The Plugin only exposes a single route, which is the URL you should set in the Google Cloud Console when creating the bot.

![Google Cloud Console's Connection Settings for the Google Chat API showing 'App URL' selected and 'https://example.com/google-chat' entered into the 'App URL' text input.](https://developers.cloudflare.com/_astro/google-chat.PImk30WB_X6Wtm.webp) 

### API

The Google Chat API can be called directly using the `GoogleChatAPI` class:

TypeScript

```

import { GoogleChatAPI } from "@cloudflare/pages-plugin-google-chat/api";


export const onRequest: PagesFunction = () => {

  // Initialize a GoogleChatAPI with your service account's credentials

  const googleChat = new GoogleChatAPI({

    credentials: {

      client_email: "SERVICE_ACCOUNT_EMAIL_ADDRESS",

      private_key: "SERVICE_ACCOUNT_PRIVATE_KEY",

    },

  });


  // Post a message

  // https://developers.google.com/chat/api/reference/rest/v1/spaces.messages/create

  const message = await googleChat.createMessage(

    { parent: "spaces/AAAAAAAAAAA" },

    undefined,

    {

      text: "I'm an alert!",

    },

  );


  return new Response("Alert sent.");

};


```

We recommend storing your service account's credentials in KV rather than in plain text as above.

The following functions are available on a `GoogleChatAPI` instance. Each take up to three arguments: an object of path parameters, an object of query parameters, and an object of the request body; as described in the [Google Chat API's documentation ↗](https://developers.google.com/chat/api/reference/rest).

* [downloadMedia ↗](https://developers.google.com/chat/api/reference/rest/v1/media/download)
* [getSpace ↗](https://developers.google.com/chat/api/reference/rest/v1/spaces/get)
* [listSpaces ↗](https://developers.google.com/chat/api/reference/rest/v1/spaces/list)
* [getMember ↗](https://developers.google.com/chat/api/reference/rest/v1/spaces.members/get)
* [listMembers ↗](https://developers.google.com/chat/api/reference/rest/v1/spaces.members/list)
* [createMessage ↗](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages/create)
* [deleteMessage ↗](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages/delete)
* [getMessage ↗](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages/get)
* [updateMessage ↗](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages/update)
* [getAttachment ↗](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages.attachments/get)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/plugins/google-chat/#page","headline":"Google Chat · Cloudflare Pages docs","description":"Create a Google Chat bot with the Pages Plugin for responding to messages and sending alerts.","url":"https://developers.cloudflare.com/pages/functions/plugins/google-chat/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pages/","name":"Pages"}},{"@type":"ListItem","position":3,"item":{"@id":"/pages/functions/","name":"Functions"}},{"@type":"ListItem","position":4,"item":{"@id":"/pages/functions/plugins/","name":"Pages Plugins"}},{"@type":"ListItem","position":5,"item":{"@id":"/pages/functions/plugins/google-chat/","name":"Google Chat"}}]}
```
