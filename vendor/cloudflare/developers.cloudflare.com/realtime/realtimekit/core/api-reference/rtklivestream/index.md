---
title: RTKLivestream
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKLivestream

The RTKLivestream module represents the state of the current livestream, and allows to start/stop live streams.

* [RTKLivestream](#module%5FRTKLivestream)  
   * [module.exports](#exp%5Fmodule%5FRTKLivestream--module.exports) ⏏  
         * [new module.exports(context, self)](#new%5Fmodule%5FRTKLivestream--module.exports%5Fnew)  
         * [.telemetry](#module%5FRTKLivestream--module.exports+telemetry)  
         * [.setRTKLivestreamState(livestreamState)](#module%5FRTKLivestream--module.exports+setRTKLivestreamState)  
         * [.start(\[livestreamConfig\])](#module%5FRTKLivestream--module.exports+start)  
         * [.stop()](#module%5FRTKLivestream--module.exports+stop)

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(context, self)

| Param   | Type    |
| ------- | ------- |
| context | Context |
| self    | Self    |

#### module.exports.telemetry

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKLivestream--module.exports)  

#### module.exports.setRTKLivestreamState(livestreamState)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKLivestream--module.exports)

| Param           | Type               |
| --------------- | ------------------ |
| livestreamState | RTKLivestreamState |

#### module.exports.start(\[livestreamConfig\])

Starts livestreaming the meeting.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKLivestream--module.exports)

| Param                | Type                     |
| -------------------- | ------------------------ |
| \[livestreamConfig\] | StartRTKLivestreamConfig |

#### module.exports.stop()

Stops livestreaming the meeting.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKLivestream--module.exports)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtklivestream/#page","headline":"RTKLivestream · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtklivestream/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-02-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtklivestream/","name":"RTKLivestream"}}]}
```
