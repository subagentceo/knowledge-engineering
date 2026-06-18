---
title: RTKPip
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKPip

## Functions

[getInitials()](#getInitials)

Code from ui-kit. Same method used in the avatar component

[\_init(context, self)](#%5Finit)

[init(\[options\])](#init)

Initialize PiP and prepare sources

[disableSource(source)](#disableSource)

[addSource(id, element, enabled, \[displayText\])](#addSource)

Add a video source from the participant grid

[updateSource(id, source)](#updateSource)

Update a video source

[removeSource(id)](#removeSource)

Remove the video source for the participant

[removePinnedSource(id)](#removePinnedSource)

Remove the pinned source

[removeAllSources()](#removeAllSources)

Remove all sources

[enable()](#enable)

Enable PiP

Code from ui-kit. Same method used in the avatar component

**Kind**: global function  

**Kind**: global function

| Param   | Type    |
| ------- | ------- |
| context | Context |
| self    | Self    |

Initialize PiP and prepare sources

**Kind**: global function

| Param              | Type   |
| ------------------ | ------ |
| \[options\]        | Object |
| \[options.height\] | number |
| \[options.width\]  | number |

**Kind**: global function

| Param  | Type   |
| ------ | ------ |
| source | string |

Add a video source from the participant grid

**Kind**: global function

| Param           | Type             | Description                            |
| --------------- | ---------------- | -------------------------------------- |
| id              | string           | id for the source (ex. participant id) |
| element         | HTMLVideoElement | HTMLVideoElement for the video source  |
| enabled         | boolean          | if source is enabled                   |
| \[displayText\] | string           | two character display text             |

Update a video source

**Kind**: global function

| Param  | Type   |
| ------ | ------ |
| id     | string |
| source | any    |

Remove the video source for the participant

**Kind**: global function

| Param | Description                            |
| ----- | -------------------------------------- |
| id    | id for the source (ex. participant id) |

Remove the pinned source

**Kind**: global function

| Param | Description                            |
| ----- | -------------------------------------- |
| id    | id for the source (ex. participant id) |

Remove all sources

**Kind**: global function  

Enable PiP

**Kind**: global function

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpip/#page","headline":"RTKPip · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpip/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-02-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkpip/","name":"RTKPip"}}]}
```
