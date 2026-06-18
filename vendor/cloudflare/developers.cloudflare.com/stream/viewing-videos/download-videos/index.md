---
title: Download video or audio
description: Generate downloadable MP4 video or M4A audio files from Cloudflare Stream.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Download video or audio

When you upload a video to Stream, it can be streamed using HLS/DASH. However, for certain use-cases, you may want to download the MP4 or M4A file. For cases such as offline viewing, you may want to download the MP4 file. Whereas, for downstream tasks like AI summarization, if you want to extract only the audio, downloading an M4A file may be more useful.

## Generate downloadable MP4 files

Note

The `/downloads` endpoint defaults to creating an MP4 download.

You can enable MP4 support on a per video basis by following the steps below:

1. Enable MP4 support by making a POST request to the `/downloads` or `/downloads/default` endpoint.
2. Save the MP4 URL provided by the response to the endpoint. This MP4 URL will become functional when the MP4 is ready in the next step.
3. Poll the `/downloads` endpoint until the `status` field is set to `ready` to inform you when the MP4 is available. You can now use the MP4 URL from step 2.

You can enable downloads for an uploaded video once it is ready to view by making an HTTP request to either the `/downloads` or `/downloads/default` endpoint.

To get notified when a video is ready to view, refer to [Using webhooks](https://developers.cloudflare.com/stream/manage-video-library/using-webhooks/#notifications).

* [ REST API ](#tab-panel-10843)
* [ Workers Binding API ](#tab-panel-10844)

* [ cURL ](#tab-panel-10827)
* [ TypeScript ](#tab-panel-10828)

Terminal window

```

curl -X POST \

-H "Authorization: Bearer <API_TOKEN>" \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>/downloads


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


const download = await client.stream.downloads.create({

  account_id: '<ACCOUNT_ID>',

  identifier: '<VIDEO_UID>',

});


```

The response includes the download type, URL, and processing status:

```

{

  "result": {

    "default": {

      "status": "inprogress",

      "url": "https://customer-<CODE>.cloudflarestream.com/<VIDEO_UID>/downloads/default.mp4",

      "percentComplete": 75.0

    }

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

* [ index.ts ](#tab-panel-10829)
* [ wrangler.jsonc ](#tab-panel-10830)

TypeScript

```

export default {

  async fetch(request, env) {

    const videoHandle = env.STREAM.video("VIDEO_ID");

    const downloads = await videoHandle.downloads.generate();

    return Response.json(downloads);

  },

};


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

## Generate downloadable M4A files

To enable M4A support on a per video basis, follow steps similar to that of generating an MP4 download, but instead send a POST request to the `/downloads/audio` endpoint.

* [ REST API ](#tab-panel-10845)
* [ Workers Binding API ](#tab-panel-10846)

* [ cURL ](#tab-panel-10831)
* [ TypeScript ](#tab-panel-10832)

Terminal window

```

curl -X POST \

-H "Authorization: Bearer <API_TOKEN>" \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>/downloads/audio


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


const download = await client.stream.downloads.audio.create({

  account_id: '<ACCOUNT_ID>',

  identifier: '<VIDEO_UID>',

});


```

The response includes the download type, URL, and processing status:

```

{

  "result": {

    "audio": {

      "status": "inprogress",

      "url": "https://customer-<CODE>.cloudflarestream.com/<VIDEO_UID>/downloads/audio.m4a",

      "percentComplete": 75.0

    }

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

* [ index.ts ](#tab-panel-10833)
* [ wrangler.jsonc ](#tab-panel-10834)

TypeScript

```

export default {

  async fetch(request, env) {

    const videoHandle = env.STREAM.video("VIDEO_ID");

    const downloads = await videoHandle.downloads.generate("audio");

    return Response.json(downloads);

  },

};


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

## Get download links

You can view all available downloads for a video by making a `GET` HTTP request to the downloads API.

* [ REST API ](#tab-panel-10847)
* [ Workers Binding API ](#tab-panel-10848)

* [ cURL ](#tab-panel-10835)
* [ TypeScript ](#tab-panel-10836)

Terminal window

```

curl -X GET \

-H "Authorization: Bearer <API_TOKEN>" \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>/downloads


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


const downloads = await client.stream.downloads.get({

  account_id: '<ACCOUNT_ID>',

  identifier: '<VIDEO_UID>',

});


```

Response

```

{

  "result": {

    "audio": {

      "status": "ready",

      "url": "https://customer-<CODE>.cloudflarestream.com/<VIDEO_UID>/downloads/audio.m4a",

      "percentComplete": 100.0

    }

    "default": {

      "status": "ready",

      "url": "https://customer-<CODE>.cloudflarestream.com/<VIDEO_UID>/downloads/default.mp4",

      "percentComplete": 100.0

    }

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

* [ index.ts ](#tab-panel-10837)
* [ wrangler.jsonc ](#tab-panel-10838)

TypeScript

```

export default {

  async fetch(request, env) {

    const videoHandle = env.STREAM.video("VIDEO_ID");

    const downloads = await videoHandle.downloads.get();

    return Response.json(downloads);

  },

};


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

## Customize download file name

You can customize the name of downloadable files by adding the `filename` query string parameter at the end of the URL.

In the example below, adding `?filename=MY_VIDEO.mp4` to the URL will change the file name to `MY_VIDEO.mp4`.

`https://customer-<CODE>.cloudflarestream.com/<VIDEO_UID>/downloads/default.mp4?filename=MY_VIDEO.mp4`

The `filename` can be a maximum of 120 characters long and composed of `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_` characters. The extension (.mp4) is appended automatically.

## Retrieve downloads

The generated MP4 download files can be retrieved via the link in the download API response.

Terminal window

```

curl -L https://customer-<CODE>.cloudflarestream.com/<VIDEO_UID>/downloads/default.mp4 > download.mp4


```

## Delete downloads

You can delete a download for a video. Available types are `default` and `audio`. Defaults to `default` when omitted.

* [ REST API ](#tab-panel-10849)
* [ Workers Binding API ](#tab-panel-10850)

* [ cURL ](#tab-panel-10839)
* [ TypeScript ](#tab-panel-10840)

Terminal window

```

curl -X DELETE \

-H "Authorization: Bearer <API_TOKEN>" \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/<VIDEO_UID>/downloads/default


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


await client.stream.downloads.default.delete({

  account_id: '<ACCOUNT_ID>',

  identifier: '<VIDEO_UID>',

});


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

* [ index.ts ](#tab-panel-10841)
* [ wrangler.jsonc ](#tab-panel-10842)

TypeScript

```

export default {

  async fetch(request, env) {

    const videoHandle = env.STREAM.video("VIDEO_ID");

    await videoHandle.downloads.delete();

    return new Response("Download deleted", { status: 200 });

  },

};


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

## Secure video downloads

If your video is public, the MP4 will also be publicly accessible. If your video is private and requires a signed URL for viewing, the MP4 will not be publicly accessible. To access the MP4 for a private video, you can generate a signed URL just as you would for regular viewing with an additional flag called `downloadable` set to `true`.

You can generate a signed token using the Stream binding:

TypeScript

```

export default {

  async fetch(request, env) {

    const token = await env.STREAM.video("VIDEO_ID").generateToken();

    return Response.json({ token });

  },

};


```

Download links will not work for videos which already require signed URLs if the `downloadable` flag is not present in the token.

For more details about using signed URLs with videos, refer to [Securing your Stream](https://developers.cloudflare.com/stream/viewing-videos/securing-your-stream/).

**Example token payload**

```

{

    "sub": <VIDEO_UID>,

    "kid": <KEY_ID>,

    "exp": 1537460365,

    "nbf": 1537453165,

    "downloadable": true,

    "accessRules": [

      {

        "type": "ip.geoip.country",

        "action": "allow",

        "country": [

          "GB"

        ]

      },

      {

        "type": "any",

        "action": "block"

      }

    ]

  }


```

## Billing for MP4 downloads

MP4 downloads are billed in the same way as streaming of the video. You will be billed for the duration of the video each time the MP4 for the video is downloaded. For example, if you have a 10 minute video that is downloaded 100 times during the month, the downloads will count as 1000 minutes of minutes served.

You will not incur any additional cost for storage when you enable MP4s.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/viewing-videos/download-videos/#page","headline":"Download video or audio · Cloudflare Stream docs","description":"Generate downloadable MP4 video or M4A audio files from Cloudflare Stream.","url":"https://developers.cloudflare.com/stream/viewing-videos/download-videos/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/viewing-videos/","name":"Play video"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/viewing-videos/download-videos/","name":"Download video or audio"}}]}
```
