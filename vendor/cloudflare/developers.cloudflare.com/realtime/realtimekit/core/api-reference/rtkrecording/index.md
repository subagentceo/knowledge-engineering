---
title: RTKRecording
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKRecording

The RTKRecording module represents the state of the current recording, and allows to start/stop recordings and check if there's a recording in progress.

* [RTKRecording](#module%5FRTKRecording)  
   * [.telemetry](#module%5FRTKRecording+telemetry)  
   * [.start()](#module%5FRTKRecording+start)  
   * [.stop()](#module%5FRTKRecording+stop)  
   * [.pause()](#module%5FRTKRecording+pause)  
   * [.resume()](#module%5FRTKRecording+resume)

### meeting.recording.telemetry

**Kind**: instance property of [RTKRecording](#module%5FRTKRecording)  

### meeting.recording.start()

Starts recording the meeting.

**Kind**: instance method of [RTKRecording](#module%5FRTKRecording)  

### meeting.recording.stop()

Stops all recording currently in 'RECORDING' state

**Kind**: instance method of [RTKRecording](#module%5FRTKRecording)  

### meeting.recording.pause()

Pauses all recording currently in 'RECORDING' state

**Kind**: instance method of [RTKRecording](#module%5FRTKRecording)  

### meeting.recording.resume()

Resumes all recording currently in 'PAUSED' state

**Kind**: instance method of [RTKRecording](#module%5FRTKRecording)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkrecording/#page","headline":"RTKRecording · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkrecording/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-02-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkrecording/","name":"RTKRecording"}}]}
```
