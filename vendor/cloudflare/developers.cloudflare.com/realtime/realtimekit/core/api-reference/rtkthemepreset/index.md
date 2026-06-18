---
title: RTKThemePreset
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKThemePreset

The RTKThemePreset class represents the meeting theme for the current participant

* [RTKThemePreset](#module%5FRTKThemePreset)  
   * [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports) ⏏  
         * [new module.exports(preset)](#new%5Fmodule%5FRTKThemePreset--module.exports%5Fnew)  
         * _instance_  
                  * ~~[.setupScreen](#module%5FRTKThemePreset--module.exports+setupScreen)~~  
                  * ~~[.waitingRoom](#module%5FRTKThemePreset--module.exports+waitingRoom)~~  
                  * ~~[.controlBar](#module%5FRTKThemePreset--module.exports+controlBar)~~  
                  * ~~[.header](#module%5FRTKThemePreset--module.exports+header)~~  
                  * ~~[.pipMode](#module%5FRTKThemePreset--module.exports+pipMode)~~  
                  * [.viewType](#module%5FRTKThemePreset--module.exports+viewType)  
                  * [.livestreamViewerQualities](#module%5FRTKThemePreset--module.exports+livestreamViewerQualities)  
                  * [.maxVideoStreams](#module%5FRTKThemePreset--module.exports+maxVideoStreams)  
                  * [.maxScreenShareCount](#module%5FRTKThemePreset--module.exports+maxScreenShareCount)  
                  * ~~[.plugins](#module%5FRTKThemePreset--module.exports+plugins)~~  
                  * [.disabledPlugins](#module%5FRTKThemePreset--module.exports+disabledPlugins)  
         * _static_  
                  * [.fromResponse(preset)](#module%5FRTKThemePreset--module.exports.fromResponse)  
                  * [.default()](#module%5FRTKThemePreset--module.exports.default)  
                  * [.init(\[preset\], \[useDefault\])](#module%5FRTKThemePreset--module.exports.init)

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(preset)

| Param  | Type               |
| ------ | ------------------ |
| preset | PresetV2CamelCased |

#### ~~module.exports.setupScreen~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  

#### ~~module.exports.waitingRoom~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  

#### ~~module.exports.controlBar~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  

#### ~~module.exports.header~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  

#### ~~module.exports.pipMode~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  

#### module.exports.viewType

The `viewType` tells the type of the meeting possible values are: GROUP\_CALL| LIVESTREAM | CHAT | AUDIO\_ROOM

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  

#### module.exports.livestreamViewerQualities

The `livestreamViewerQualities` specifies the allowed qualities of a stream, that can be viewed by a livestream viewer

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  

#### module.exports.maxVideoStreams

The `maxVideoStreams` contains the maximum video streams for mobile and desktop

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  

#### module.exports.maxScreenShareCount

The `maxScreenShareCount` contains the maximum possible concurrent screen shares

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  

#### ~~module.exports.plugins~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  

#### module.exports.disabledPlugins

The `disabledPlugins` property returns id of all disabled plugins

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  

#### module.exports.fromResponse(preset)

**Kind**: static method of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  
**Deprecated.**: Use init()

| Param  | Type               |
| ------ | ------------------ |
| preset | PresetV2CamelCased |

#### module.exports.default()

**Kind**: static method of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)  
**Deprecated.**: Use init()  

#### module.exports.init(\[preset\], \[useDefault\])

**Kind**: static method of [module.exports](#exp%5Fmodule%5FRTKThemePreset--module.exports)

| Param          | Type               | Default |
| -------------- | ------------------ | ------- |
| \[preset\]     | PresetV2CamelCased |         |
| \[useDefault\] | boolean            | true    |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkthemepreset/#page","headline":"RTKThemePreset · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkthemepreset/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-02-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkthemepreset/","name":"RTKThemePreset"}}]}
```
