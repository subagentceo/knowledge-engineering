---
title: RTKPlugins
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKPlugins

The RTKPlugins module consists of all the plugins in the meeting. It has 2 maps:

* `all`: Consists of all the plugins in the meeting.
* `active`: Consists of the plugins that are currently in use.
* [RTKPlugins](#module%5FRTKPlugins)  
   * [module.exports](#exp%5Fmodule%5FRTKPlugins--module.exports) ⏏  
         * [new module.exports(logger)](#new%5Fmodule%5FRTKPlugins--module.exports%5Fnew)  
         * [.all](#module%5FRTKPlugins--module.exports+all)  
         * [.active](#module%5FRTKPlugins--module.exports+active)

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(logger)

| Param  | Type   |
| ------ | ------ |
| logger | Logger |

#### module.exports.all

All plugins accessible by the current user.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKPlugins--module.exports)  

#### module.exports.active

All plugins that are currently enabled in the room.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKPlugins--module.exports)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkplugins/#page","headline":"RTKPlugins · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkplugins/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-02-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkplugins/","name":"RTKPlugins"}}]}
```
