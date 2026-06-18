---
title: Apply watermarks
description: Create watermark profiles and apply them to Cloudflare Stream video uploads via the API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Apply watermarks

You can add watermarks to videos uploaded using the Stream API.

To add watermarks to your videos, first create a watermark profile. A watermark profile describes the image you would like to be used as a watermark and the position of that image. Once you have a watermark profile, you can use it as an option when uploading videos.

## Quick start

Watermark profile has many customizable options. However, the default parameters generally work for most cases. Please see "Profiles" below for more details.

### Step 1: Create a profile

* [ REST API ](#tab-panel-10732)
* [ Workers Binding API ](#tab-panel-10733)

* [ cURL ](#tab-panel-10696)
* [ TypeScript ](#tab-panel-10697)

Terminal window

```

curl -X POST -H 'Authorization: Bearer <API_TOKEN>' \

-F file=@/Users/rchen/cloudflare.png \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/watermarks


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


const watermark = await client.stream.watermarks.create({

  account_id: '<ACCOUNT_ID>',

  file: '@/path/to/image.png',

  name: 'marketing videos',

});


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

* [ index.ts ](#tab-panel-10698)
* [ wrangler.jsonc ](#tab-panel-10699)

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const response = await fetch("https://example.com/cloudflare.png");

    const readableStream = response.body!;

    const watermark = await env.STREAM.watermarks.generate(readableStream, {

      name: "marketing videos",

    });

    return new Response(JSON.stringify({ watermark }));

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

### Step 2: Specify the profile UID at upload

* [ REST API ](#tab-panel-10734)
* [ Workers Binding API ](#tab-panel-10735)

* [ cURL ](#tab-panel-10700)
* [ TypeScript ](#tab-panel-10701)

Terminal window

```

tus-upload --chunk-size 5242880 \

--header Authentication 'Bearer <API_TOKEN>' \

--metadata watermark <WATERMARK_UID> \

/Users/rchen/cat.mp4 https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


const video = await client.stream.copy.create({

  account_id: '<ACCOUNT_ID>',

  url: 'https://example.com/video.mp4',

  watermark: { uid: '<WATERMARK_UID>' },

});


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

* [ index.ts ](#tab-panel-10702)
* [ wrangler.jsonc ](#tab-panel-10703)

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const video = await env.STREAM.upload(

      "https://example.com/video.mp4",

      { watermarkId: "<WATERMARK_UID>" },

    );

    return new Response(JSON.stringify({ video }));

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

### Step 3: Done

![Screenshot of a video with Cloudflare watermark at top right](https://developers.cloudflare.com/_astro/cat.fEUyr_sc_kw16.webp) 

## Profiles

To create, list, delete, or get information about the profile, you will need your[Cloudflare API token ↗](https://www.cloudflare.com/a/account/my-account).

### Optional parameters

* `name` string default: _empty string_  
   * A short description for the profile. For example, "marketing videos."
* `opacity` float default: 1.0  
   * Translucency of the watermark. 0.0 means completely transparent, and 1.0 means completely opaque. Note that if the watermark is already semi-transparent, setting this to 1.0 will not make it completely opaque.
* `padding` float default: 0.05  
   * Blank space between the adjacent edges (determined by position) of the video and the watermark. 0.0 means no padding, and 1.0 means padded full video width or length.  
   * Stream will make sure that the watermark will be at about the same position across videos with different dimensions.
* `scale` float default: 0.15  
   * The size of the watermark relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. 0.0 means no scaling (use the size of the watermark as-is), and 1.0 fills the entire video.  
   * The algorithm will make sure that the watermark will look about the same size across videos with different dimensions.
* `position` string (enum) default: "upperRight"  
   * Location of the watermark. Valid positions are: `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, and `center`.  
   Note  
   Note that `center` will ignore the `padding` parameter.

## Creating a Watermark profile

### Use Case 1: Upload a local image file directly

To upload the image directly, please send a POST request using `multipart/form-data` as the content-type and specify the file under the `file` key. All other fields are optional.

* [ REST API ](#tab-panel-10736)
* [ Workers Binding API ](#tab-panel-10737)

* [ cURL ](#tab-panel-10704)
* [ TypeScript ](#tab-panel-10705)

Terminal window

```

curl -X POST -H "Authorization: Bearer <API_TOKEN>" \

-F file=@{path-to-image-locally} \

-F name='marketing videos' \

-F opacity=1.0 \

-F padding=0.05 \

-F scale=0.15 \

-F position=upperRight \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/watermarks


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


const watermark = await client.stream.watermarks.create({

  account_id: '<ACCOUNT_ID>',

  file: '@/path/to/image.png',

  name: 'marketing videos',

  opacity: 1.0,

  padding: 0.05,

  scale: 0.15,

  position: 'upperRight',

});


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

* [ index.ts ](#tab-panel-10706)
* [ wrangler.jsonc ](#tab-panel-10707)

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const response = await fetch("https://example.com/cloudflare.png");

    const readableStream = response.body!;

    const watermark = await env.STREAM.watermarks.generate(readableStream, {

      name: "marketing videos",

      opacity: 1.0,

      padding: 0.05,

      scale: 0.15,

      position: "upperRight",

    });

    return new Response(JSON.stringify({ watermark }));

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

### Use Case 2: Pass a URL to an image

To specify a URL for upload, please send a POST request using `application/json` as the content-type and specify the file location using the `url` key. All other fields are optional.

* [ Workers Binding API ](#tab-panel-10738)
* [ REST API ](#tab-panel-10739)

* [ index.ts ](#tab-panel-10708)
* [ wrangler.jsonc ](#tab-panel-10709)

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const watermark = await env.STREAM.watermarks.generate(

      "https://example.com/logo.png",

      {

        name: "marketing videos",

        opacity: 1.0,

        padding: 0.05,

        scale: 0.15,

        position: "upperRight",

      },

    );

    return new Response(JSON.stringify({ watermark }));

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

* [ cURL ](#tab-panel-10710)
* [ TypeScript ](#tab-panel-10711)

Terminal window

```

curl -X POST -H "Authorization: Bearer <API_TOKEN>" \

-H 'Content-Type: application/json' \

-d '{

  "url": "{url-to-image}",

  "name": "marketing videos",

  "opacity": 1.0,

  "padding": 0.05,

  "scale": 0.15,

  "position": "upperRight"

}' \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/watermarks


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


// The TypeScript SDK does not support URL-based watermark creation.

// Use the file-based approach instead:

const watermark = await client.stream.watermarks.create({

  account_id: '<ACCOUNT_ID>',

  file: '@/path/to/image.png',

  name: 'marketing videos',

  opacity: 1.0,

  padding: 0.05,

  scale: 0.15,

  position: 'upperRight',

});


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

#### Example response to creating a watermark profile

```

{

  "result": {

    "uid": "d6373709b7681caa6c48ef2d8c73690d",

    "size": 11248,

    "height": 240,

    "width": 720,

    "created": "2020-07-29T00:16:55.719265Z",

    "downloadedFrom": null,

    "name": "marketing videos",

    "opacity": 1.0,

    "padding": 0.05,

    "scale": 0.15,

    "position": "upperRight"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

`downloadedFrom` will be populated if the profile was created via downloading from URL.

## Using a watermark profile on a video

Once you created a watermark profile, you can now use the profile at upload time for watermarking videos.

### Basic uploads

Unfortunately, Stream does not currently support specifying watermark profile at upload time for Basic Uploads.

### Upload video with a link

* [ Workers Binding API ](#tab-panel-10740)
* [ REST API ](#tab-panel-10741)

* [ index.ts ](#tab-panel-10712)
* [ wrangler.jsonc ](#tab-panel-10713)

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const video = await env.STREAM.upload(

      "https://example.com/video.mp4",

      { watermarkId: "<WATERMARK_UID>" },

    );

    return new Response(JSON.stringify({ video }));

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

* [ cURL ](#tab-panel-10714)
* [ TypeScript ](#tab-panel-10715)

Terminal window

```

curl -X POST -H "Authorization: Bearer <API_TOKEN>" \

-H 'Content-Type: application/json' \

-d '{

  "url": "{url-to-video}",

  "watermark": {

    "uid": "<WATERMARK_UID>"

  }

}' \

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

  url: 'https://example.com/video.mp4',

  watermark: { uid: '<WATERMARK_UID>' },

});


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

#### Example response to upload video with a link

```

{

  "result": {

    "uid": "8d3a5b80e7437047a0fb2761e0f7a645",

    "thumbnail": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/thumbnails/thumbnail.jpg",


    "playback": {

      "hls": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.m3u8",

      "dash": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.mpd"

    },

    "watermark": {

      "uid": "d6373709b7681caa6c48ef2d8c73690d",

      "size": 11248,

      "height": 240,

      "width": 720,

      "created": "2020-07-29T00:16:55.719265Z",

      "downloadedFrom": null,

      "name": "marketing videos",

      "opacity": 1.0,

      "padding": 0.05,

      "scale": 0.15,

      "position": "upperRight"

    }


}


```

### Upload video with tus

Terminal window

```

tus-upload --chunk-size 5242880 \

--header Authentication 'Bearer <API_TOKEN>' \

--metadata watermark <WATERMARK_UID> \

<PATH_TO_VIDEO> https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream


```

### Direct creator uploads

The video uploaded with the generated unique one-time URL will be watermarked with the profile specified.

* [ Workers Binding API ](#tab-panel-10742)
* [ REST API ](#tab-panel-10743)

* [ index.ts ](#tab-panel-10716)
* [ wrangler.jsonc ](#tab-panel-10717)

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const directUpload = await env.STREAM.createDirectUpload({

      maxDurationSeconds: 3600,

      watermark: { id: "<WATERMARK_UID>" },

    });

    return new Response(JSON.stringify({ directUpload }));

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

* [ cURL ](#tab-panel-10718)
* [ TypeScript ](#tab-panel-10719)

Terminal window

```

curl -X POST -H "Authorization: Bearer <API_TOKEN>" \

-H 'Content-Type: application/json' \

-d '{

  "maxDurationSeconds": 3600,

  "watermark": {

    "uid": "<WATERMARK_UID>"

  }

}' \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/direct_upload


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


const directUpload = await client.stream.directUpload.create({

  account_id: '<ACCOUNT_ID>',

  maxDurationSeconds: 3600,

  watermark: { uid: '<WATERMARK_UID>' },

});


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

#### Example response to direct user uploads

```

{

  "result": {

    "uploadURL": "https://upload.videodelivery.net/c32d98dd671e4046a33183cd5b93682b",

    "uid": "c32d98dd671e4046a33183cd5b93682b",

    "watermark": {

      "uid": "d6373709b7681caa6c48ef2d8c73690d",

      "size": 11248,

      "height": 240,

      "width": 720,

      "created": "2020-07-29T00:16:55.719265Z",

      "downloadedFrom": null,

      "name": "marketing videos",

      "opacity": 1.0,

      "padding": 0.05,

      "scale": 0.15,

      "position": "upperRight"

    }

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

`watermark` will be `null` if no watermark was specified.

## Get a watermark profile

To view a watermark profile that you created:

* [ Workers Binding API ](#tab-panel-10744)
* [ REST API ](#tab-panel-10745)

* [ index.ts ](#tab-panel-10720)
* [ wrangler.jsonc ](#tab-panel-10721)

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const watermark = await env.STREAM.watermarks.get("<WATERMARK_UID>");

    return new Response(JSON.stringify({ watermark }));

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

* [ cURL ](#tab-panel-10722)
* [ TypeScript ](#tab-panel-10723)

Terminal window

```

curl -H "Authorization: Bearer <API_TOKEN>" \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/watermarks/<WATERMARK_UID>


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


const watermark = await client.stream.watermarks.get(

  '<WATERMARK_UID>',

  { account_id: '<ACCOUNT_ID>' },

);


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

### Example response to get a watermark profile

```

{

  "result": {

    "uid": "d6373709b7681caa6c48ef2d8c73690d",

    "size": 11248,

    "height": 240,

    "width": 720,

    "created": "2020-07-29T00:16:55.719265Z",

    "downloadedFrom": null,

    "name": "marketing videos",

    "opacity": 1.0,

    "padding": 0.05,

    "scale": 0.15,

    "position": "center"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

## List watermark profiles

To list watermark profiles that you created:

* [ Workers Binding API ](#tab-panel-10746)
* [ REST API ](#tab-panel-10747)

* [ index.ts ](#tab-panel-10724)
* [ wrangler.jsonc ](#tab-panel-10725)

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    const watermarks = await env.STREAM.watermarks.list();

    return new Response(JSON.stringify({ watermarks }));

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

* [ cURL ](#tab-panel-10726)
* [ TypeScript ](#tab-panel-10727)

Terminal window

```

curl -H "Authorization: Bearer <API_TOKEN>" \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/watermarks/


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


const watermarks = await client.stream.watermarks.list({

  account_id: '<ACCOUNT_ID>',

});


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

### Example response to list watermark profiles

```

{

  "result": [

    {

      "uid": "9de16afa676d64faaa7c6c4d5047e637",

      "size": 207710,

      "height": 626,

      "width": 1108,

      "created": "2020-07-29T00:23:35.918472Z",

      "downloadedFrom": null,

      "name": "marketing videos",

      "opacity": 1.0,

      "padding": 0.05,

      "scale": 0.15,

      "position": "upperLeft"

    },

    {

      "uid": "9c50cff5ab16c4aec0bcb03c44e28119",

      "size": 207710,

      "height": 626,

      "width": 1108,

      "created": "2020-07-29T00:16:46.735377Z",

      "downloadedFrom": "https://company.com/logo.png",

      "name": "internal training videos",

      "opacity": 1.0,

      "padding": 0.05,

      "scale": 0.15,

      "position": "center"

    }

  ],

  "success": true,

  "errors": [],

  "messages": []

}


```

## Delete a watermark profile

To delete a watermark profile that you created:

* [ Workers Binding API ](#tab-panel-10748)
* [ REST API ](#tab-panel-10749)

* [ index.ts ](#tab-panel-10728)
* [ wrangler.jsonc ](#tab-panel-10729)

TypeScript

```

export default {

  async fetch(request, env, ctx): Promise<Response> {

    await env.STREAM.watermarks.delete("<WATERMARK_UID>");

    return new Response(JSON.stringify({ success: true }));

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

* [ cURL ](#tab-panel-10730)
* [ TypeScript ](#tab-panel-10731)

Terminal window

```

curl -X DELETE -H 'Authorization: Bearer <API_TOKEN>' \

https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/watermarks/<WATERMARK_UID>


```

TypeScript

```

const client = new Cloudflare({

  apiEmail: process.env['CLOUDFLARE_EMAIL'],

  apiKey: process.env['CLOUDFLARE_API_KEY'],

});


await client.stream.watermarks.delete(

  '<WATERMARK_UID>',

  { account_id: '<ACCOUNT_ID>' },

);


```

See the full Stream [REST API and SDK reference](https://developers.cloudflare.com/api/resources/stream/) for details on using REST API from external applications, with pre-generated SDK's for external TypeScript, Python, or Go applications.

If the operation was successful, it will return a success response:

```

{

  "result": "",

  "success": true,

  "errors": [],

  "messages": []

}


```

## Limitations

* Once the watermark profile is created, you cannot change its parameters. If you need to edit your watermark profile, please delete it and create a new one.
* Once the watermark is applied to a video, you cannot change the watermark without re-uploading the video to apply a different profile.
* Once the watermark is applied to a video, deleting the watermark profile will not also remove the watermark from the video.
* The maximum file size is 2MiB (2097152 bytes), and only PNG files are supported.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/edit-videos/applying-watermarks/#page","headline":"Apply watermarks · Cloudflare Stream docs","description":"Create watermark profiles and apply them to Cloudflare Stream video uploads via the API.","url":"https://developers.cloudflare.com/stream/edit-videos/applying-watermarks/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/edit-videos/","name":"Edit videos"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/edit-videos/applying-watermarks/","name":"Apply watermarks"}}]}
```
