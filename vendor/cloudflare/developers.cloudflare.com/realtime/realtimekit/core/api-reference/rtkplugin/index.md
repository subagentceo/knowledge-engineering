---
title: RTKPlugin
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKPlugin

The RTKPlugin module represents a single plugin in the meeting. A plugin can be obtained from one of the plugin arrays in `meeting.plugins`. For example,

TypeScript

```

const plugin1 = meeting.plugins.active.get(pluginId);

const plugin2 = meeting.plugins.all.get(pluginId);


```

* [RTKPlugin](#module%5FRTKPlugin)  
   * [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports) ⏏  
         * [new module.exports(context, plugin, pluginSocketHandler, self, participants, chat, meetingTitle)](#new%5Fmodule%5FRTKPlugin--module.exports%5Fnew)  
         * [.telemetry](#module%5FRTKPlugin--module.exports+telemetry)  
         * [.sendIframeEvent(message)](#module%5FRTKPlugin--module.exports+sendIframeEvent)  
         * [.handleIframeMessage(iframeMessage)](#module%5FRTKPlugin--module.exports+handleIframeMessage)  
         * [.sendData(payload)](#module%5FRTKPlugin--module.exports+sendData)  
         * [.removeRTKPluginView(viewId)](#module%5FRTKPlugin--module.exports+removeRTKPluginView)  
         * [.addRTKPluginView(iframe, viewId)](#module%5FRTKPlugin--module.exports+addRTKPluginView)  
         * [.setActive(active)](#module%5FRTKPlugin--module.exports+setActive)  
         * [.activateForSelf()](#module%5FRTKPlugin--module.exports+activateForSelf)  
         * [.deactivateForSelf()](#module%5FRTKPlugin--module.exports+deactivateForSelf)  
         * ~~[.enable()](#module%5FRTKPlugin--module.exports+enable)~~  
         * ~~[.disable()](#module%5FRTKPlugin--module.exports+disable)~~  
         * [.activate()](#module%5FRTKPlugin--module.exports+activate)  
         * [.deactivate()](#module%5FRTKPlugin--module.exports+deactivate)

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(context, plugin, pluginSocketHandler, self, participants, chat, meetingTitle)

| Param               | Type                   |
| ------------------- | ---------------------- |
| context             | Context                |
| plugin              | RTKPluginResponse      |
| pluginSocketHandler | RTKPluginSocketHandler |
| self                | Self                   |
| participants        | Participants           |
| chat                | Chat                   |
| meetingTitle        | string                 |

#### module.exports.telemetry

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)  

#### module.exports.sendIframeEvent(message)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)

| Param   | Type                   | Description                              |
| ------- | ---------------------- | ---------------------------------------- |
| message | RTKPluginIframeMessage | Socket message forwarded to this plugin. |

#### module.exports.handleIframeMessage(iframeMessage)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)

| Param         | Type                   |
| ------------- | ---------------------- |
| iframeMessage | RTKPluginIframeMessage |

#### module.exports.sendData(payload)

This method is used to send arbitrary data to the plugin.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)

| Param             | Type            | Description                                                            |
| ----------------- | --------------- | ---------------------------------------------------------------------- |
| payload           | SendDataOptions | The payload that you want to send inside the plugin.                   |
| payload.eventName | string          | Name of the event. This is used to listen for the event in plugin SDK. |
| payload.data      | any             | Data you wish to emit. It can assume any data type.                    |

#### module.exports.removeRTKPluginView(viewId)

This method is used for cleaning up event listeners attached to an iframe. It must be used before the iframe is removed from the DOM.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)

| Param  | Type   | Default   | Description                                                        |
| ------ | ------ | --------- | ------------------------------------------------------------------ |
| viewId | string | "default" | ID of the view corresponding to this iframe. Default is 'default'. |

#### module.exports.addRTKPluginView(iframe, viewId)

This method adds the communication layer between the plugin inside the iframe and the core application (meeting object) in the main window.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)

| Param  | Type                                    | Default                                | Description                                                        |
| ------ | --------------------------------------- | -------------------------------------- | ------------------------------------------------------------------ |
| iframe | HTMLIFrameElement \| ReactNativeWebView | Iframe element to display this plugin. |                                                                    |
| viewId | string                                  | "default"                              | ID of the view corresponding to this iframe. Default is 'default'. |

#### module.exports.setActive(active)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)

| Param  | Type    |
| ------ | ------- |
| active | boolean |

#### module.exports.activateForSelf()

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)  

#### module.exports.deactivateForSelf()

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)  

#### ~~module.exports.enable()~~

_**Deprecated**_

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)  

#### ~~module.exports.disable()~~

_**Deprecated**_

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)  

#### module.exports.activate()

Activate this plugin for all participants.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)  

#### module.exports.deactivate()

Deactivate this plugin for all participants.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKPlugin--module.exports)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkplugin/#page","headline":"RTKPlugin · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkplugin/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkplugin/","name":"RTKPlugin"}}]}
```
