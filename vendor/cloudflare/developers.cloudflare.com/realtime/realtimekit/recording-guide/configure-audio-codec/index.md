---
title: Set Audio Configurations
description: Configure audio codec format and channel settings for RealtimeKit recordings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set Audio Configurations

Recording audio requires configuring the **codec** and **channel** parameters to guarantee optimal quality and compatibility with your application's demands. The codec determines the encoding format for the audio, and the channel specifies the number of audio channels for the recording. You can modify the following `audio_config` used for recording the audio:

## Codec

Codec determines the audio encoding format for recording, with MP3 and AAC being the supported formats.

* AAC (default)
* MP3

Note

If [VP8](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-codecs/) is selected for `video_config`, changing `audio_config` is not allowed. In this case, the codec in the `audio_config` is automatically set to `vorbis`.

## Channel

Audio signal pathway within an audio file that carries a specific sound source. The following channels are supported:

* stereo (default)
* mono

You can modify the configs by specifying it in the `audio_config` field in the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/), for example:

```

{

  "audio_config": {

    "codec": "AAC"

    "channel": "stereo"

  }

}


```

## Download Audio Files

The audio file for your recording is generated only if you passed the `audio_config` parameters in the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/).

When the recording is completed, you can use the `audio_download_url` provided in the response body of the [Fetch details of a recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Fone%5Frecording/) to download and export the audio file.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-audio-codec/#page","headline":"Set Audio Configurations · Cloudflare Realtime docs","description":"Configure audio codec format and channel settings for RealtimeKit recordings.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-audio-codec/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/recording-guide/","name":"Recording"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/recording-guide/configure-audio-codec/","name":"Set Audio Configurations"}}]}
```
