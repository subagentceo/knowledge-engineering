---
title: Upload videos
description: Review upload methods, supported formats, and recommendations for Cloudflare Stream.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Upload videos

Before you upload your video, review the options for uploading a video, supported formats, and recommendations.

## Upload options

| Upload method                                                                                               | When to use                                                                             |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [Stream Dashboard ↗](https://dash.cloudflare.com/?to=/:account/stream)                                      | Upload videos from the Stream Dashboard without writing any code.                       |
| [Upload with a link](https://developers.cloudflare.com/stream/uploading-videos/upload-via-link/)            | Upload videos using a link, such as an S3 bucket or content management system.          |
| [Upload video file](https://developers.cloudflare.com/stream/uploading-videos/upload-video-file/)           | Upload videos stored on a computer.                                                     |
| [Direct creator uploads](https://developers.cloudflare.com/stream/uploading-videos/direct-creator-uploads/) | Allows end users of your website or app to upload videos directly to Cloudflare Stream. |

## Supported video formats

Note

Files must be less than 30 GB, and content should be encoded and uploaded in the same frame rate it was recorded.

* MP4
* MKV
* MOV
* AVI
* FLV
* MPEG-2 TS
* MPEG-2 PS
* MXF
* LXF
* GXF
* 3GP
* WebM
* MPG
* Quicktime

## Recommendations for on-demand videos

* Optional but ideal settings:  
   * MP4 containers  
   * AAC audio codec  
   * H264 video codec  
   * 60 or fewer frames per second
* Closed GOP (_Only required for live streaming._)
* Mono or Stereo audio. Stream will mix audio tracks with more than two channels down to stereo.

## Frame rates

Stream accepts video uploads at any frame rate. During encoding, Stream re-encodes videos for a maximum of 70 FPS playback. If the original video has a frame rate lower than 70 FPS, Stream re-encodes at the original frame rate.

For variable frame rate content, Stream drops extra frames. For example, if there is more than one frame within a 1/30 second window, Stream drops the extra frames within that period.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/stream/uploading-videos/#page","headline":"Upload videos · Cloudflare Stream docs","description":"Review upload methods, supported formats, and recommendations for Cloudflare Stream.","url":"https://developers.cloudflare.com/stream/uploading-videos/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/uploading-videos/","name":"Upload videos"}}]}
```
