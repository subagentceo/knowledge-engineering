---
title: RtkEmojiPicker
description: API reference for RtkEmojiPicker component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkEmojiPicker

A very simple emoji picker component.

## Properties

| Property        | Type     | Required | Default         | Description                               |
| --------------- | -------- | -------- | --------------- | ----------------------------------------- |
| focusWhenOpened | boolean  | ✅        | \-              | Controls whether or not to focus on mount |
| iconPack        | IconPack | ❌        | defaultIconPack | Icon pack                                 |
| t               | RtkI18n  | ❌        | useLanguage()   | Language                                  |

## Usage Examples

### Basic Usage

```

import { RtkEmojiPicker } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkEmojiPicker />;

}


```

### With Properties

```

import { RtkEmojiPicker } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkEmojiPicker

      focusWhenOpened={true}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkemojipicker/#page","headline":"RtkEmojiPicker · Cloudflare Realtime docs","description":"API reference for RtkEmojiPicker component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkemojipicker/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkemojipicker/","name":"RtkEmojiPicker"}}]}
```
