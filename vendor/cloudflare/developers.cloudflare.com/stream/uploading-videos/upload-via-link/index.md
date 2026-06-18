---
title: Upload with a link
description: Upload videos to Cloudflare Stream by providing an HTTP link to a file in cloud storage.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Upload with a link

If you have videos stored in a cloud storage bucket, you can pass a HTTP link for the file, and Stream will fetch the file on your behalf.

* [ REST API ](#tab-panel-10825)
* [ Workers Binding API ](#tab-panel-10826)

* [ cURL ](#tab-panel-10821)
* [ TypeScript ](#tab-panel-10822)

Make a `POST` request to the Stream API using the link to your video.

Terminal window

```

    curl \

    --data '{"url":"https://storage.googleapis.com/zaid-test/Watermarks%20Demo/cf-ad-original.mp4","meta":{"name":"My First Stream Video"}}' \

    --header "Authorization: Bearer <API_TOKEN>" \

    https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/copy


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'], // This is the default and can be omitted

  apiKey: process.env['CLOUDFLARE_API_KEY'], // This is the default and can be omitted

});


const video = await client.stream.copy.create({

  account_id: '<ACCOUNT_ID>',

  url: 'https://storage.googleapis.com/zaid-test/Watermarks%20Demo/cf-ad-original.mp4',

});


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

* [ index.ts ](#tab-panel-10823)
* [ wrangler.jsonc ](#tab-panel-10824)

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    // upload a video with a link

    const videoDetails = await env.STREAM.upload(

      "https://storage.googleapis.com/zaid-test/Watermarks%20Demo/cf-ad-original.mp4",

      // (optional) attach metadata

      { meta: { name: "My First Stream Video" } }

    );


    // return a Workers response

    return new Response(

      JSON.stringify(videoDetails),

    );

  },


} satisfies ExportedHandler<{ STREAM: StreamBinding }>;


```

```

{

  "$schema": "node_modules/wrangler/config-schema.json",

  "name": "<ENTER_WORKER_NAME>",

  "main": "src/index.ts",

  "compatibility_date": "2026-04-14",

  "observability": {

    "enabled": true

  },

  "stream": {

    "binding": "STREAM"

  }

}


```

See the full [Workers Stream binding API reference](https://developers.cloudflare.com/stream/manage-video-library/bindings/).

If you have videos stored in a cloud storage bucket, you can pass a HTTP link for the file, and Stream will fetch the file on your behalf.

## Check video status

Stream must download and encode the video, which can take a few seconds to a few minutes depending on the length of your video.

When the `readyToStream` value returns `true`, your video is ready for streaming.

You can optionally use [webhooks](https://developers.cloudflare.com/stream/manage-video-library/using-webhooks/) which will notify you when the video is ready to stream or if an error occurs.

```

{

  "result": {

    "uid": "6b9e68b07dfee8cc2d116e4c51d6a957",

    "thumbnail": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/thumbnails/thumbnail.jpg",

    "thumbnailTimestampPct": 0,

    "readyToStream": false,

    "status": {

      "state": "downloading"

    },

    "meta": {

      "downloaded-from": "https://storage.googleapis.com/zaid-test/Watermarks%20Demo/cf-ad-original.mp4",

      "name": "My First Stream Video"

    },

    "created": "2020-10-16T20:20:17.872170843Z",

    "modified": "2020-10-16T20:20:17.872170843Z",

    "size": 9032701,

    "preview": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/watch",

    "allowedOrigins": [],

    "requireSignedURLs": false,

    "uploaded": "2020-10-16T20:20:17.872170843Z",

    "uploadExpiry": null,

    "maxSizeBytes": 0,

    "maxDurationSeconds": 0,

    "duration": -1,

    "input": {

      "width": -1,

      "height": -1

    },

    "playback": {

      "hls": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.m3u8",

      "dash": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.mpd"

    },

    "watermark": null

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

After the video is uploaded, you can use the video `uid` shown in the example response above to play the video using the [Stream video player](https://developers.cloudflare.com/stream/viewing-videos/using-the-stream-player/).

If you are using your own player or rendering the video in a mobile app, refer to [using your own player](https://developers.cloudflare.com/stream/viewing-videos/using-the-stream-player/using-the-player-api/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/uploading-videos/upload-via-link/#page","headline":"Upload with a link · Cloudflare Stream docs","description":"Upload videos to Cloudflare Stream by providing an HTTP link to a file in cloud storage.","url":"https://developers.cloudflare.com/stream/uploading-videos/upload-via-link/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/uploading-videos/","name":"Upload videos"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/uploading-videos/upload-via-link/","name":"Upload with a link"}}]}
```
