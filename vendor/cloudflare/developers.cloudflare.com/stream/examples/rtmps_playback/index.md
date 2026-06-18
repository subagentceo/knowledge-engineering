---
title: RTMPS playback
description: Example of sub 1s latency video playback using RTMPS and ffplay
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTMPS playback

**Last reviewed:**  almost 4 years ago 

Example of sub 1s latency video playback using RTMPS and ffplay

Note

Before you can play live video, you must first be [actively streaming to a live input](https://developers.cloudflare.com/stream/stream-live/start-stream-live).

Copy the RTMPS _playback_ key for your live input from either:

* The **Live inputs** page of the Cloudflare dashboard.  
[ Go to **Live inputs** ](https://dash.cloudflare.com/?to=/:account/stream/inputs)
* The [Stream API](https://developers.cloudflare.com/stream/stream-live/start-stream-live/#use-the-api)

Paste it into the URL below, replacing `<RTMPS_PLAYBACK_KEY>`:

RTMPS playback with ffplay

```

ffplay -analyzeduration 1 -fflags -nobuffer -sync ext 'rtmps://live.cloudflare.com:443/live/<RTMPS_PLAYBACK_KEY>'


```

For more, refer to [Play live video in native apps with less than one second latency](https://developers.cloudflare.com/stream/viewing-videos/using-own-player/#play-live-video-in-native-apps-with-less-than-1-second-latency).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/examples/rtmps_playback/#page","headline":"RTMPS playback · Cloudflare Stream docs","description":"Example of sub 1s latency video playback using RTMPS and ffplay","url":"https://developers.cloudflare.com/stream/examples/rtmps_playback/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Playback"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/examples/rtmps_playback/","name":"RTMPS playback"}}]}
```
