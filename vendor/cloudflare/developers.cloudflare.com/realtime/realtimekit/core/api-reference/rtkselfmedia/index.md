---
title: RTKSelfMedia
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKSelfMedia

## Members

[audioTrack](#audioTrack)

Returns the `audioTrack`.

[rawAudioTrack](#rawAudioTrack)

Returns the `rawAudioTrack` having no middleware executed on it.

[mediaPermissions](#mediaPermissions)

Returns the current audio and video permissions given by the user. 'ACCEPTED' if the user has given permission to use the media. 'CANCELED' if the user has canceled the screenshare. 'DENIED' if the user has denied permission to use the media. 'SYS\_DENIED' if the user's system has denied permission to use the media. 'UNAVAILABLE' if the media is not available (or being used by a different application).

[videoTrack](#videoTrack)

Returns the `videoTrack`.

[rawVideoTrack](#rawVideoTrack)

Returns the `videoTrack` having no middleware executed on it.

[screenShareTracks](#screenShareTracks)

Returns the screen share tracks.

[audioEnabled](#audioEnabled)

Returns true if audio is enabled.

[videoEnabled](#videoEnabled)

Returns true if video is enabled.

[screenShareEnabled](#screenShareEnabled)

Returns true if screen share is enabled.

## Functions

[init(options, \[skipAwaits\], \[context\])](#init)

[addAudioMiddleware(audioMiddleware)](#addAudioMiddleware)

Adds the audio middleware to be executed on the raw audio stream. If there are more than 1 audio middlewares, they will be executed in the sequence they were added in. If you want the sequence to be altered, please remove all previous middlewares and re-add.

[removeAudioMiddleware(audioMiddleware)](#removeAudioMiddleware)

Removes the audio middleware, if it is there.

[removeAllAudioMiddlewares()](#removeAllAudioMiddlewares)

Removes all audio middlewares, if they are there.

[addVideoMiddleware(videoMiddleware)](#addVideoMiddleware)

Adds the video middleware to be executed on the raw video stream. If there are more than 1 video middlewares, they will be executed in the sequence they were added in. If you want the sequence to be altered, please remove all previous middlewares and re-add.

[setVideoMiddlewareGlobalConfig(config)](#setVideoMiddlewareGlobalConfig)

Sets global config to be used by video middlewares.

[removeVideoMiddleware(videoMiddleware)](#removeVideoMiddleware)

Removes the video middleware, if it is there.

[removeAllVideoMiddlewares()](#removeAllVideoMiddlewares)

Removes all video middlewares, if they are there.

[getCurrentDevices()](#getCurrentDevices)

Returns the media devices currently being used.

[getAudioDevices()](#getAudioDevices)

Returns the local participant's audio devices.

[getVideoDevices()](#getVideoDevices)

Returns the local participant's video devices.

[getSpeakerDevices()](#getSpeakerDevices)

Returns the local participant's speaker devices.

[getDeviceById(deviceId, kind)](#getDeviceById)

Returns the local participant's device, indexed by ID and kind.

[setDevice(device)](#setDevice)

Change the current media device that is being used by the local participant.

Returns the `audioTrack`.

**Kind**: global variable  

Returns the `rawAudioTrack` having no middleware executed on it.

**Kind**: global variable  

Returns the current audio and video permissions given by the user. 'ACCEPTED' if the user has given permission to use the media. 'CANCELED' if the user has canceled the screenshare. 'DENIED' if the user has denied permission to use the media. 'SYS\_DENIED' if the user's system has denied permission to use the media. 'UNAVAILABLE' if the media is not available (or being used by a different application).

**Kind**: global variable  

Returns the `videoTrack`.

**Kind**: global variable  

Returns the `videoTrack` having no middleware executed on it.

**Kind**: global variable  

Returns the screen share tracks.

**Kind**: global variable  

Returns true if audio is enabled.

**Kind**: global variable  

Returns true if video is enabled.

**Kind**: global variable  

Returns true if screen share is enabled.

**Kind**: global variable  

**Kind**: global function

| Param                   | Type             | Default |
| ----------------------- | ---------------- | ------- |
| options                 | Object           |         |
| \[options.video\]       | boolean          |         |
| \[options.audio\]       | boolean          |         |
| \[options.constraints\] | MediaConstraints |         |
| \[skipAwaits\]          | boolean          | false   |
| \[context\]             | Context          |         |

Adds the audio middleware to be executed on the raw audio stream. If there are more than 1 audio middlewares, they will be executed in the sequence they were added in. If you want the sequence to be altered, please remove all previous middlewares and re-add.

**Kind**: global function

| Param           | Type            |
| --------------- | --------------- |
| audioMiddleware | AudioMiddleware |

Removes the audio middleware, if it is there.

**Kind**: global function

| Param           | Type            |
| --------------- | --------------- |
| audioMiddleware | AudioMiddleware |

Removes all audio middlewares, if they are there.

**Kind**: global function  

Adds the video middleware to be executed on the raw video stream. If there are more than 1 video middlewares, they will be executed in the sequence they were added in. If you want the sequence to be altered, please remove all previous middlewares and re-add.

**Kind**: global function

| Param           | Type            |
| --------------- | --------------- |
| videoMiddleware | VideoMiddleware |

Sets global config to be used by video middlewares.

**Kind**: global function

| Param                                 | Type                        | Description                                                                                                                                                                                                                                                                                             |
| ------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| config                                | VideoMiddlewareGlobalConfig | config                                                                                                                                                                                                                                                                                                  |
| config.disablePerFrameCanvasRendering | boolean                     | If set to true, Instead of calling Middleware for every frame, Middleware will only be called once that too with empty canvas, it is the responsibility of the middleware author to keep updating this canvas. meeting.self.rawVideoTrack can be used to retrieve video track for the periodic updates. |

Removes the video middleware, if it is there.

**Kind**: global function

| Param           | Type            |
| --------------- | --------------- |
| videoMiddleware | VideoMiddleware |

Removes all video middlewares, if they are there.

**Kind**: global function  

Returns the media devices currently being used.

**Kind**: global function  

Returns the local participant's audio devices.

**Kind**: global function  

Returns the local participant's video devices.

**Kind**: global function  

Returns the local participant's speaker devices.

**Kind**: global function  

Returns the local participant's device, indexed by ID and kind.

**Kind**: global function

| Param    | Type               | Description           |                                                   |
| -------- | ------------------ | --------------------- | ------------------------------------------------- |
| deviceId | string             | The ID of the device. |                                                   |
| kind     | 'audio' \| 'video' | 'speaker'             | The kind of the device: audio, video, or speaker. |

Change the current media device that is being used by the local participant.

**Kind**: global function

| Param  | Type            | Description                                                                                    |
| ------ | --------------- | ---------------------------------------------------------------------------------------------- |
| device | MediaDeviceInfo | The device that is to be used. A device of the same kind will be replaced. the primary stream. |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkselfmedia/#page","headline":"RTKSelfMedia · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkselfmedia/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-02-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkselfmedia/","name":"RTKSelfMedia"}}]}
```
