---
title: Recording
description: Record RealtimeKit meetings as composite recordings or separate participant audio tracks.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Recording

Learn how RealtimeKit records meetings as a single composite file or as separate participant audio tracks.

Visit the following pages to learn more about recording meetings:

* [ Configure Video Settings ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-codecs/)
* [ Set Audio Configurations ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-audio-codec/)
* [ Add Watermark ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/add-watermark/)
* [ Disable Upload to RealtimeKit Bucket ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-realtimekit-bucket-config/)
* [ Create Custom Recording App Using Recording SDKs ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/create-record-app-using-sdks/)
* [ Interactive Recordings with Timed Metadata ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/interactive-recording/)
* [ Manage Recording Config Precedence Order ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/manage-recording-config-hierarchy/)
* [ Upload Recording to Your Cloud ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/custom-cloud-storage/)
* [ Start Recording ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/start-recording/)
* [ Stop Recording ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/stop-recording/)
* [ Monitor Recording Status ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/monitor-status/)
* [ Track recording ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/track-recording/)

RealtimeKit can record the audio and video of multiple users in a meeting, as well as interactions with RealtimeKit plugins, in a single file using composite recording mode. RealtimeKit can also record separate participant audio tracks using [track recording](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/track-recording/).

## How composite recording works

Composite recordings are powered by anonymous virtual bot users who join your meeting, record it, and then upload it to RealtimeKit's Cloudflare R2 bucket. For video files, we currently support the[H.264 ↗](https://en.wikipedia.org/wiki/Advanced%5FVideo%5FCoding) and[VP8 ↗](https://en.wikipedia.org/wiki/VP8) codecs.

1. When the recording is finished, it is stored in RealtimeKit's Cloudflare R2 bucket.
2. RealtimeKit generates a downloadable link from which the recording can be downloaded. You can get the download URL using the[Fetch details of a recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Fone%5Frecording/)or from the Developer Portal.  
You can receive notifications of recording status in any of the following ways:  
   * Using the `recording.statusUpdate` webhook. RealtimeKit uses webhooks to notify your application when an event happens.  
   * Using the [Fetch active recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Factive%5Frecordings/).  
   * You can also view the states of recording from the Developer Portal.
3. Download the recording from the download url and store it to your cloud storage. The file is kept on RealtimeKit's server for seven days before being deleted.  
You can get the download URL using the[Fetch active recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Factive%5Frecordings/) or from the Developer Portal.  
We support transferring recordings to AWS, Azure, and DigitalOcean storage buckets. You can also choose to preconfigure the storage configurations using the Developer Portal or the[Start recording a meeting API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/).

## Workflow

A typical workflow for recording a meeting involves the following steps:

1. Start a recording using the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/) or client side SDK.
2. Manage the recording using the [Pause, resume, or stop recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/pause%5Fresume%5Fstop%5Frecording/) or client side SDK.
3. Fetch the download URL for downloading the recording using the [Fetch details of a recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Fone%5Frecording/), webhook, or from the Developer Portal.

For separate participant audio files, refer to [Track recording](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/track-recording/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/#page","headline":"Recording · Cloudflare Realtime docs","description":"Record RealtimeKit meetings as composite recordings or separate participant audio tracks.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/recording-guide/","name":"Recording"}}]}
```
