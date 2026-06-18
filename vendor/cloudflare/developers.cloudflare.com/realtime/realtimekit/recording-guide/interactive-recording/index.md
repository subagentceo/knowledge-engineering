---
title: Interactive Recordings with Timed Metadata
description: Learn how to enable interactive recording with RealtimeKit's capabilities. Follow our guide for effective configuration and management.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Interactive Recordings with Timed Metadata

RealtimeKit's interactive recording feature allows you to add timed metadata to your video stream. Timed metadata serves as cue points for clients to display information and trigger time-aligned actions. The metadata is available to clients in the form of [ID3 ↗](https://en.wikipedia.org/wiki/ID3) tags on the playback timeline.

## What is interactive recording?

Ever wondered how Netflix displays small images on the seek bar or how additional content is shown while watching a cricket match on Hotstar? It's all metadata inserted at a specific time inside the video feed itself, which is called timed metadata.

Timed metadata is metadata with timestamps. It refers to digital markers added to a video file to provide additional context and information at specific points in the content range. These data points can be inserted into a stream programmatically, using the `interactive_config` in the [Start recording a meeting API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/).

Once RealtimeKit processes the stream, the timed metadata gets synchronized with the audio and video frames. This metadata is available to all viewers during playback at the same time relative to the stream. The timecode acts as a cue point and can trigger specific actions based on the data. For example:

These features are made possible through the use of ID3 tags that are embedded in the video segments, making them available in the recorded video.

## Add interactivity to your RealtimeKit recordings

To add interactivity to your RealtimeKit recording, perform the following steps:

1. In the [Start recording a meeting API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/), pass the `interactive_config` parameter.

This parameter enables you to add timed metadata to your recordings, which is made available to clients in HLS format via ID3 tags. The output files are packaged as a tar file.

1. In [RealtimeKitClient ↗](https://docs.realtime.cloudflare.com/web-core/reference/RealtimeKitClient), call the `broadcastMessage` method with the parameters, `ID3` (as a string) and `yourData` (the data you want to send as timed metadata) on the [participants ↗](https://docs.realtime.cloudflare.com/web-core/reference/RealtimeKitClient#module%5FRealtimeKitClient+participants) object.

TypeScript

```

meeting.participants.broadcastMessage(“ID3Data”, yourData);


```

Note

This action should only be performed after the recording has been initiated and the system is in the `RECORDING` state. If performed earlier, any associated ID3 tags may be lost.

The recommended time to perform this action is after the recording indicator has been displayed for 3 to 4 seconds.

1. To stop sending the data, call the following method. Once you make this call, you will no longer be able to send additional ID3 data.

TypeScript

```

meeting.participants.broadcastMessage(“ID3Data”,”CLOSE_TRANSPORT”)


```

If you do not pass this parameter, the ID3 metadata stream will automatically be closed when the recording is stopped.

1. Once the recording is completed, you can retrieve the tar file that contains video segments and a playlist file. The `download_url` provides the link to the tar file. Below is an example screenshot of a tar file:
![Recording Tar Format](https://developers.cloudflare.com/_astro/interactive-recording-tar-format.JbEcOmI6_ZGSWee.webp) 

It's also important to note that the length of each segment depends on the frames of the video. Therefore, each segment may not have the same length, although it is typically close to the specified segment length when the recording was started. By default, the segment length is set to 10 seconds.

1. You can play the stream using the [hls.js ↗](https://github.com/video-dev/hls.js/).

JavaScript

```

const onFragChanged = (_) => {

  // We first try to find the right metadata track.

  // https://developer.mozilla.org/en-US/docs/Web/API/TextTrack

  const textTrackListCount = videoEl.textTracks.length;

  let metaTextTrack;

  for (let trackIndex = 0; trackIndex < textTrackListCount; trackIndex++) {

    const textTrack = videoEl.textTracks[trackIndex];

    if (textTrack.kind !== 'metadata') {

      continue;

    }

    textTrack.mode = 'showing';

    metaTextTrack = textTrack;

    break;

  }

  if (!metaTextTrack) {

    return;

  }

  // Add an oncuechange listener on that track.

  metaTextTrack.oncuechange = (event) => {

    let cue = metaTextTrack.activeCues[metaTextTrack.activeCues.length - 1];

    console.log(cue.value.data);

  };

};

// listen on Hls.Events.FRAG_CHANGED from hls.js

hls.on(Hls.Events.FRAG_CHANGED, onFragChanged);


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/interactive-recording/#page","headline":"Interactive Recordings with Timed Metadata · Cloudflare Realtime docs","description":"Learn how to enable interactive recording with RealtimeKit's capabilities. Follow our guide for effective configuration and management.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/interactive-recording/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/recording-guide/","name":"Recording"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/recording-guide/interactive-recording/","name":"Interactive Recordings with Timed Metadata"}}]}
```
