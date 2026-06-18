---
title: Picture in Picture
description: Render RealtimeKit participant video as a floating Picture-in-Picture tile in the browser.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Picture in Picture

Picture-in-Picture API allows you to render `meeting.participants.active` participant's video as a floating tile outside of the current webpage's context.

Note

Supported in Chrome, Edge, and Chromium-based browsers only.

WebMobile

ReactWeb ComponentsAngular

Picture-in-Picture is not available on this platform.

## Check support

Picture-in-Picture API might not be supported in your browser. Always check for support before using the API.

JavaScript

```

const isSupported = meeting.participants.pip.isSupported();


```

## Enable Picture-in-Picture

JavaScript

```

await meeting.participants.pip.enable();


```

## Disable Picture-in-Picture

JavaScript

```

await meeting.participants.pip.disable();


```

## Check support

Picture-in-Picture API might not be supported in your browser. Always check for support before using the API.

```

const isSupported = meeting.participants.pip.isSupported();


```

## Enable Picture-in-Picture

```

await meeting.participants.pip.enable();


```

## Disable Picture-in-Picture

```

await meeting.participants.pip.disable();


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/pip/#page","headline":"Picture in Picture · Cloudflare Realtime docs","description":"Render RealtimeKit participant video as a floating Picture-in-Picture tile in the browser.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/pip/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/remote-participants/","name":"Remote Participants"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/remote-participants/pip/","name":"Picture in Picture"}}]}
```
