---
title: FAQ
description: Frequently asked questions about Cloudflare Stream video uploads, playback, and billing.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# FAQ

## Stream

### Can I download original video files from Stream?

You cannot download the _exact_ input file that you uploaded. However, depending on your use case, you can use the [Downloadable Videos](https://developers.cloudflare.com/stream/viewing-videos/download-videos/) feature to get encoded MP4s for use cases like offline viewing.

### Is there a limit to the amount of videos I can upload?

* By default, a video upload can be at most 30 GB.
* By default, you can have up to 120 videos queued or being encoded simultaneously. Videos in the `ready` status are playable but may still be encoding certain quality levels until the `pctComplete` reaches 100\. Videos in the `error`, `ready`, or `pendingupload` state do not count toward this limit. If you need the concurrency limit raised, [contact Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) explaining your use case and why you would like the limit raised.

Note

The limit to the number of videos only applies to videos being uploaded to Cloudflare Stream. This limit is not related to the number of end users streaming videos.

* An account cannot upload videos if the total video duration exceeds the video storage capacity purchased.

Limits apply to Direct Creator Uploads at the time of upload URL creation.

Uploads over these limits will receive a [429 (Too Many Requests)](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-429/) or [413 (Payload too large)](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/4xx-client-error/error-413/) HTTP status codes with more information in the response body. Please write to Cloudflare support or your customer success manager for higher limits.

### Can I embed videos on Stream even if my domain is not on Cloudflare?

Yes. Stream videos can be embedded on any domain, even domains not on Cloudflare.

### Does Stream support High Dynamic Range (HDR) video content?

When HDR videos are uploaded to Stream, they are re-encoded and delivered in SDR format, to ensure compatibility with the widest range of viewing devices.

### What are the recommended upload settings for video uploads?

If you are producing a brand new file for Cloudflare Stream, we recommend you use the following settings:

* MP4 containers, AAC audio codec, H264 video codec, 30 or below frames per second
* moov atom should be at the front of the file (Fast Start)
* H264 progressive scan (no interlacing)
* H264 high profile
* Closed GOP
* Content should be encoded and uploaded in the same frame rate it was recorded
* Mono or Stereo audio (Stream will mix audio tracks with more than 2 channels down to stereo)

Below are bitrate recommendations for encoding new videos for Stream:

| Resolution | Recommended bitrate |
| ---------- | ------------------- |
| 1080p      | 8 Mbps              |
| 720p       | 4.8 Mbps            |
| 480p       | 2.4 Mbps            |
| 360p       | 1 Mbps              |

### If I cancel my stream subscription, are the videos deleted?

Videos are removed if the subscription is not renewed within 30 days.

### I use Content Security Policy (CSP) on my website. What domains do I need to add to which directives?

If your website uses [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy) directives, depending on your configuration, you may need to add Cloudflare Stream's domains to particular directives, in order to allow videos to be viewed or uploaded by your users.

If you use the provided [Stream Player](https://developers.cloudflare.com/stream/viewing-videos/using-the-stream-player/), `videodelivery.net` and `*.cloudflarestream.com` must be included in the `frame-src` or `default-src` directive to allow the player's `<iframe>` element to load.

```

Content-Security-Policy: frame-src 'self' videodelivery.net *.cloudflarestream.com


```

If you use your **own** Player, add `*.videodelivery.net` and `*.cloudflarestream.com` to the `media-src`, `img-src` and `connect-src` CSP directives to allow video files and thumbnail images to load.

```

Content-Security-Policy: media-src 'self' videodelivery.net *.cloudflarestream.com; img-src 'self' *.videodelivery.net *.cloudflarestream.com; connect-src 'self' *.videodelivery.net *.cloudflarestream.com


```

If you allow users to upload their own videos directly to Cloudflare Stream, add `*.videodelivery.net` and `*.cloudflarestream.com` to the `connect-src` CSP directive.

```

Content-Security-Policy: connect-src 'self' *.videodelivery.net *.cloudflarestream.com


```

To ensure **only** videos from **your** Cloudflare Stream account can be played on your website, replace `*` in `*.cloudflarestream.com` and `*.videodelivery.net` in the examples above with `customer-<CODE>`, replacing `<CODE>` with your unique customer code. To find your unique customer code in the Cloudflare dashboard, go to the **Stream** page.

[ Go to **Videos** ](https://dash.cloudflare.com/?to=/:account/stream/videos) 

This code is unique to your Cloudflare Account.

### Why is PageSpeed Insights giving a bad score when using the Stream Player?

If your website loads in a lot of player instances, PageSpeed Insights will penalize the JavaScript load for each player instance. Our testing shows that when actually loading the page, the script itself is only downloaded once with the local browser cache retrieving the script for the other player objects on the same page. Therefore, we believe that the PageSpeed Insights score is not matching real-world behavior in this situation.

If you are using thumbnails, you can use [animated thumbnails](https://developers.cloudflare.com/stream/viewing-videos/displaying-thumbnails/#animated-gif-thumbnails) that link to the video pages.

If multiple players are on the same page, you can lazy load any players that are not visible in the initial viewport. For more information about lazy loading, refer to [Mozilla's lazy loading documentation ↗](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#lazy).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/faq/#page","headline":"Frequently asked questions about Cloudflare Stream · Cloudflare Stream docs","description":"Frequently asked questions about Cloudflare Stream video uploads, playback, and billing.","url":"https://developers.cloudflare.com/stream/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/faq/","name":"FAQ"}}]}
```
