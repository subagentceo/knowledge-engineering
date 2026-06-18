---
title: Get started
description: Upload your first video or start your first live stream with Cloudflare Stream.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Media Transformations is now GA:

Billing for Media Transformations will begin on November 1st, 2025.

* [Upload your first video](https://developers.cloudflare.com/stream/get-started#upload-your-first-video)
* [Start your first live stream](https://developers.cloudflare.com/stream/get-started#start-your-first-live-stream)

## Upload your first video

### Step 1: Upload an example video from a public URL

You can upload videos using the API or directly on the **Stream** page of the Cloudflare dashboard.

[ Go to **Videos** ](https://dash.cloudflare.com/?to=/:account/stream/videos) 

For a list of accepted file types, refer to [Supported video formats](https://developers.cloudflare.com/stream/uploading-videos/#supported-video-formats).

To use the API, replace the `API_TOKEN` and `ACCOUNT_ID` values with your credentials in the example below.

* [ REST API ](#tab-panel-10757)
* [ Workers Binding API ](#tab-panel-10758)

* [ cURL ](#tab-panel-10750)
* [ TypeScript ](#tab-panel-10751)

Terminal window

```

curl \

-X POST \

-d '{"url":"https://storage.googleapis.com/stream-example-bucket/video.mp4","meta":{"name":"My First Stream Video"}}' \

-H "Authorization: Bearer <API_TOKEN>" \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/copy


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


const video = await client.stream.copy.create({

  account_id: '<ACCOUNT_ID>',

  url: 'https://storage.googleapis.com/stream-example-bucket/video.mp4',

  meta: { name: 'My First Stream Video' },

});


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

* [ index.ts ](#tab-panel-10752)
* [ wrangler.jsonc ](#tab-panel-10753)

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const videoDetails = await env.STREAM.upload(

      "https://storage.googleapis.com/stream-example-bucket/video.mp4",

      { meta: { name: "My First Stream Video" } }

    );

    return new Response(JSON.stringify(videoDetails));

  },

} satisfies ExportedHandler<{ STREAM: StreamBinding }>;


```

```

{

  "$schema": "node_modules/wrangler/config-schema.json",

  "name": "<ENTER_WORKER_NAME>",

  "main": "src/index.ts",

  "compatibility_date": "$today",

  "observability": {

    "enabled": true

  },

  "stream": {

    "binding": "STREAM"

  }

}


```

See the full [Workers Stream binding API reference](https://developers.cloudflare.com/stream/manage-video-library/bindings/).

### Step 2: Wait until the video is ready to stream

Because Stream must download and process the video, the video might not be available for a few seconds depending on the length of your video. You should poll the Stream API until `readyToStream` is `true`, or use [webhooks](https://developers.cloudflare.com/stream/manage-video-library/using-webhooks/) to be notified when a video is ready for streaming.

Use the video UID from the first step to poll the video:

Request

```

curl \

-H "Authorization: Bearer <API_TOKEN>" \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>


```

Response

```

{

  "result": {

    "uid": "6b9e68b07dfee8cc2d116e4c51d6a957",

    "preview": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/watch",

    "thumbnail": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/thumbnails/thumbnail.jpg",

    "readyToStream": true,

    "status": {

      "state": "ready"

    },

    "meta": {

      "downloaded-from": "https://storage.googleapis.com/stream-example-bucket/video.mp4",

      "name": "My First Stream Video"

    },

    "created": "2020-10-16T20:20:17.872170843Z",

    "size": 9032701

    //...

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

### Step 3: Play the video in your website or app

Videos uploaded to Stream can be played on any device and platform, from websites to native apps. See [Play videos](https://developers.cloudflare.com/stream/viewing-videos) for details and examples of video playback across platforms.

To play video on your website with the [Stream Player](https://developers.cloudflare.com/stream/viewing-videos/using-the-stream-player/), copy the `uid` of the video from the request above, along with your unique customer code, and replace `<CODE>` and `<VIDEO_UID>` in the embed code below:

```

<iframe

  src="https://customer-<CODE>.cloudflarestream.com/<VIDEO_UID>/iframe"

  title="Example Stream video"

  frameborder="0"

  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"

  allowfullscreen

>

</iframe>


```

The embed code above can also be found on the **Stream** page of the Cloudflare dashboard.

[ Go to **Videos** ](https://dash.cloudflare.com/?to=/:account/stream/videos) 

### Next steps

* [Edit your video](https://developers.cloudflare.com/stream/edit-videos/) and add captions or watermarks
* [Customize the Stream player](https://developers.cloudflare.com/stream/viewing-videos/using-the-stream-player/)

## Start your first live stream

### Step 1: Create a live input

You can create a live input using the API or the **Live inputs** page of the Cloudflare dashboard.

[ Go to **Live inputs** ](https://dash.cloudflare.com/?to=/:account/stream/inputs) 

To use the API, replace the `API_TOKEN` and `ACCOUNT_ID` values with your credentials in the example below.

* [ REST API ](#tab-panel-10756)

* [ cURL ](#tab-panel-10754)
* [ TypeScript ](#tab-panel-10755)

Terminal window

```

curl -X POST \

-H "Authorization: Bearer <API_TOKEN>" \

-D '{"meta": {"name":"test stream"},"recording": { "mode": "automatic" }}' \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/live_inputs


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


const liveInput = await client.stream.liveInputs.create({

  account_id: '<ACCOUNT_ID>',

  meta: { name: 'test stream' },

  recording: { mode: 'automatic' },

});


```

Response

```

{

  "uid": "f256e6ea9341d51eea64c9454659e576",

  "rtmps": {

    "url": "rtmps://live.cloudflare.com:443/live/",

    "streamKey": "MTQ0MTcjM3MjI1NDE3ODIyNTI1MjYyMjE4NTI2ODI1NDcxMzUyMzcf256e6ea9351d51eea64c9454659e576"

  },

  "created": "2021-09-23T05:05:53.451415Z",

  "modified": "2021-09-23T05:05:53.451415Z",

  "meta": {

    "name": "test stream"

  },

  "status": null,

  "recording": {

    "mode": "automatic",

    "requireSignedURLs": false,

    "allowedOrigins": null

  }

}


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

### Step 2: Copy the RTMPS URL and key, and use them with your live streaming application.

We recommend using [Open Broadcaster Software (OBS) ↗](https://obsproject.com/) to get started.

### Step 3: Play the live stream in your website or app

Live streams can be played on any device and platform, from websites to native apps, using the same video players as videos uploaded to Stream. See [Play videos](https://developers.cloudflare.com/stream/viewing-videos) for details and examples of video playback across platforms.

To play the live stream you just started on your website with the [Stream Player](https://developers.cloudflare.com/stream/viewing-videos/using-the-stream-player/), copy the `uid` of the live input from the request above, along with your unique customer code, and replace `<CODE>` and `<VIDEO_UID>` in the embed code below:

```

<iframe

  src="https://customer-<CODE>.cloudflarestream.com/<VIDEO_UID>/iframe"

  title="Example Stream video"

  frameborder="0"

  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"

  allowfullscreen

>

</iframe>


```

The embed code above can also be found on the **Stream** page of the Cloudflare dashboard.

[ Go to **Videos** ](https://dash.cloudflare.com/?to=/:account/stream/videos) 

### Next steps

* [Secure your stream](https://developers.cloudflare.com/stream/viewing-videos/securing-your-stream/)
* [View live viewer counts](https://developers.cloudflare.com/stream/getting-analytics/live-viewer-count/)

## Accessibility considerations

To make your video content more accessible, include [captions](https://developers.cloudflare.com/stream/edit-videos/adding-captions/) and [high-quality audio recording ↗](https://www.w3.org/WAI/media/av/av-content/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/get-started/#page","headline":"Get started · Cloudflare Stream docs","description":"Upload your first video or start your first live stream with Cloudflare Stream.","url":"https://developers.cloudflare.com/stream/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/get-started/","name":"Get started"}}]}
```
