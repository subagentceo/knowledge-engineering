---
title: RealtimeKitClient
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RealtimeKitClient

The RealtimeKitClient class is the main class of the web core library. An object of the RealtimeKitClient class can be created using`await RealtimeKitClient.init({ ... })`. Typically, an object of `RealtimeKitClient` is named `meeting`.

* [RealtimeKitClient](#module%5FRealtimeKitClient)  
   * [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports) ⏏  
         * [new module.exports(context, controller)](#new%5Fmodule%5FRealtimeKitClient--module.exports%5Fnew)  
         * _instance_  
                  * [.participants](#module%5FRealtimeKitClient--module.exports+participants)  
                  * [.self](#module%5FRealtimeKitClient--module.exports+self)  
                  * [.meta](#module%5FRealtimeKitClient--module.exports+meta)  
                  * [.ai](#module%5FRealtimeKitClient--module.exports+ai)  
                  * [.plugins](#module%5FRealtimeKitClient--module.exports+plugins)  
                  * [.chat](#module%5FRealtimeKitClient--module.exports+chat)  
                  * [.polls](#module%5FRealtimeKitClient--module.exports+polls)  
                  * [.connectedMeetings](#module%5FRealtimeKitClient--module.exports+connectedMeetings)  
                  * [.**internals**](#module%5FRealtimeKitClient--module.exports+%5F%5Finternals%5F%5F)  
                  * [.join()](#module%5FRealtimeKitClient--module.exports+join)  
                  * [.leave()](#module%5FRealtimeKitClient--module.exports+leave)  
                  * ~~[.joinRoom()](#module%5FRealtimeKitClient--module.exports+joinRoom)~~  
                  * ~~[.leaveRoom(\[state\])](#module%5FRealtimeKitClient--module.exports+leaveRoom)~~  
         * _static_  
                  * [.initMedia(\[options\], \[skipAwaits\], \[cachedUserDetails\])](#module%5FRealtimeKitClient--module.exports.initMedia)  
                  * [.init(options)](#module%5FRealtimeKitClient--module.exports.init)  
                  * [.setupContext(peerId, options, meetingId, args)](#module%5FRealtimeKitClient--module.exports.setupContext)

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(context, controller)

| Param      | Type       |
| ---------- | ---------- |
| context    | IContext   |
| controller | Controller |

#### module.exports.participants

The `participants` object consists of 4 maps of participants,`waitlisted`, `joined`, `active`, `pinned`. The maps are indexed by`peerId`s, and the values are the corresponding participant objects.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)  

#### module.exports.self

The `self` object can be used to manipulate audio and video settings, and other configurations for the local participant. This exposes methods to enable and disable media tracks, share the user's screen, etc.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)  

#### module.exports.meta

The `room` object stores information about the current meeting, such as chat messages, polls, room name, etc.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)  

#### module.exports.ai

The `ai` object is used to interface with AI features. You can obtain the live meeting transcript and use other meeting AI features such as summary, and agenda using this object.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)  

#### module.exports.plugins

The `plugins` object stores information about the plugins available in the current meeting. It exposes methods to activate and deactivate them.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)  

#### module.exports.chat

The chat object stores the chat messages that were sent in the meeting. This includes text messages, images, and files.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)  

#### module.exports.polls

The polls object stores the polls that were initiated in the meeting. It exposes methods to create and vote on polls.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)  

#### module.exports.connectedMeetings

The connectedMeetings object stores the connected meetings states. It exposes methods to create/read/update/delete methods for connected meetings.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)  

#### module.exports.\_\_internals\_\_

The **internals** object exposes the internal tools & utilities such as features and logger so that client can utilise the same to build their own feature based UI. Logger (**internals**.logger) can be used to send logs to servers to inform of issues, if any, proactively.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)  

#### module.exports.join()

The `join()` method can be used to join the meeting. A `roomJoined` event is emitted on `self` when the room is joined successfully.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)  

#### module.exports.leave()

The `leave()` method can be used to leave a meeting.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)  

#### ~~module.exports.joinRoom()~~

_**Deprecated**_

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)  

#### ~~module.exports.leaveRoom(\[state\])~~

_**Deprecated**_

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)

| Param     | Type           |
| --------- | -------------- |
| \[state\] | LeaveRoomState |

#### module.exports.initMedia(\[options\], \[skipAwaits\], \[cachedUserDetails\])

**Kind**: static method of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)

| Param                   | Type              | Default |
| ----------------------- | ----------------- | ------- |
| \[options\]             | Object            |         |
| \[options.video\]       | boolean           |         |
| \[options.audio\]       | boolean           |         |
| \[options.constraints\] | MediaConstraints  |         |
| \[skipAwaits\]          | boolean           | false   |
| \[cachedUserDetails\]   | CachedUserDetails |         |

#### module.exports.init(options)

The `init` method can be used to instantiate the RealtimeKitClient class. This returns an instance of RealtimeKitClient, which can be used to perform actions on the meeting.

**Kind**: static method of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)

| Param             | Description                                     |
| ----------------- | ----------------------------------------------- |
| options           | The options object.                             |
| options.authToken | The authorization token received using the API. |
| options.baseURI   | The base URL of the API.                        |
| options.defaults  | The default audio and video settings.           |

#### module.exports.setupContext(peerId, options, meetingId, args)

**Kind**: static method of [module.exports](#exp%5Fmodule%5FRealtimeKitClient--module.exports)

| Param     | Type                     |
| --------- | ------------------------ |
| peerId    | string                   |
| options   | RealtimeKitClientOptions |
| meetingId | string                   |
| args      | any                      |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/realtimekitclient/#page","headline":"RealtimeKitClient · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/realtimekitclient/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-02-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/realtimekitclient/","name":"RealtimeKitClient"}}]}
```
