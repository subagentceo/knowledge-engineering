---
title: Bind to Workers API
description: A binding connects your Worker to external resources on the Developer Platform, like Stream, R2 buckets, or KV namespaces.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Bind to Workers API

A [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) connects your [Worker](https://developers.cloudflare.com/workers/) to external resources on the Developer Platform, like [Stream](https://developers.cloudflare.com/stream/), [R2 buckets](https://developers.cloudflare.com/r2/buckets/), or [KV namespaces](https://developers.cloudflare.com/kv/concepts/kv-namespaces/).

For example, when you use Stream within Workers, you can:

* Upload videos from a URL and manage their lifecycle
* Create direct uploads for client-side uploads without having to expose API keys
* List and search videos
* Manage captions and downloads for videos
* Create and manage watermark profiles

## Setup

The Stream binding is enabled on a per-Worker basis.

To bind Stream to your Worker, add the following to the end of your Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-10759)
* [  wrangler.toml ](#tab-panel-10760)

JSONC

```

{

  "stream": {

    "binding": "STREAM"

  }

}


```

TOML

```

[stream]

binding = "STREAM"


```

For more detailed information on configuring your Worker, refer to the [Wrangler Configuration documentation](https://developers.cloudflare.com/workers/wrangler/configuration/).

## Methods

### Binding-level methods

The following methods are available on the `env.STREAM` binding directly.

#### `upload(url, params?)`

Upload a video from a URL. Returns `Promise<`[StreamVideo](#streamvideo)`>`.

* `url` (required): The URL of the video to upload.
* `params` (optional): A [StreamUrlUploadParams](#streamurluploadparams) object with the following properties:  
   * `allowedOrigins`: Array of allowed origins for the video.  
   * `creator`: Creator identifier.  
   * `meta`: Arbitrary metadata object.  
   * `requireSignedURLs`: Whether signed URLs are required.  
   * `scheduledDeletion`: ISO 8601 timestamp for scheduled deletion.  
   * `thumbnailTimestampPct`: Thumbnail timestamp as a percentage (0.0 to 1.0).  
   * `watermarkId`: ID of a watermark profile to apply.

Throws: `BadRequestError`, `QuotaReachedError`, `MaxFileSizeError`, `RateLimitedError`, `AlreadyUploadedError`, `InternalError`.

#### `createDirectUpload(params)`

Create a basic direct upload URL for client-side uploads without an API key. Returns `Promise<`[StreamDirectUpload](#streamdirectupload)`>` with `uploadURL` and `id`.

_This method does not currently support files over 200MB._ For larger direct uploads, refer to the [API request for provisioning a TUS endpoint ↗](http://localhost:1111/stream/uploading-videos/direct-creator-uploads/#direct-creator-uploads-with-tus-protocol).\_

* `params` (required): A [StreamDirectUploadCreateParams](#streamdirectuploadcreateparams) object with the following properties:  
   * `maxDurationSeconds` (required): Maximum duration of the uploaded video in seconds.  
   * `expiry` (optional): ISO 8601 timestamp when the upload URL expires.  
   * `creator` (optional): Creator identifier.  
   * `meta` (optional): Arbitrary metadata object.  
   * `allowedOrigins` (optional): Array of allowed origins for the video.  
   * `requireSignedURLs` (optional): Whether signed URLs are required.  
   * `thumbnailTimestampPct` (optional): Thumbnail timestamp as a percentage (0.0 to 1.0).  
   * `scheduledDeletion` (optional): ISO 8601 timestamp for scheduled deletion.  
   * `watermark` (optional): ID of a watermark profile to apply.

#### `videos.list(params?)`

List all videos in the account. Returns `Promise<`[StreamVideo](#streamvideo)`[]>`.

* `params` (optional): A [StreamVideosListParams](#streamvideoslistparams) object with the following properties:  
   * `limit`: Maximum number of videos to return.  
   * `before`: Return videos created before this ISO 8601 timestamp.  
   * `beforeComp`: Comparison operator for `before` — `eq`, `gt`, `gte`, `lt`, or `lte`.  
   * `after`: Return videos created after this ISO 8601 timestamp.  
   * `afterComp`: Comparison operator for `after` — `eq`, `gt`, `gte`, `lt`, or `lte`.

### Video-scoped methods

Calling `env.STREAM.video(id)` returns a handle scoped to a single video, with the following methods.

#### `details()`

Get full video details. Returns `Promise<`[StreamVideo](#streamvideo)`>`.

#### `update(params)`

Update video metadata. Returns `Promise<`[StreamVideo](#streamvideo)`>`.

* `params` (required): A [StreamUpdateVideoParams](#streamupdatevideoparams) object with the following properties:  
   * `allowedOrigins`: Array of allowed origins for the video.  
   * `creator`: Creator identifier.  
   * `maxDurationSeconds`: Maximum duration in seconds.  
   * `meta`: Arbitrary metadata object.  
   * `requireSignedURLs`: Whether signed URLs are required.  
   * `scheduledDeletion`: ISO 8601 timestamp for scheduled deletion.  
   * `thumbnailTimestampPct`: Thumbnail timestamp as a percentage (0.0 to 1.0).

#### `delete()`

Delete a video and its copies. Returns `Promise<void>`.

#### `generateToken()`

Create a signed URL token for a video. Returns `Promise<string>`.

#### `downloads`

Namespace for download operations on a video.

* `generate(downloadType?)`: Generate a download. `downloadType` is a [StreamDownloadType](#streamdownloadtype) of `default` or `audio`. Defaults to `default`. Returns `Promise<`[StreamDownloadGetResponse](#streamdownloadgetresponse)`>`.
* `get()`: List existing downloads. Returns `Promise<`[StreamDownloadGetResponse](#streamdownloadgetresponse)`>`.
* `delete(downloadType?)`: Delete downloads. `downloadType` is `default` or `audio`.

#### `captions`

Namespace for caption operations on a video.

* `upload(language, input)`: Upload a caption file for a BCP 47 language tag. `input` is a `ReadableStream`. Returns `Promise<`[StreamCaption](#streamcaption)`>`.
* `generate(language)`: Generate captions via AI for a BCP 47 language tag. Returns `Promise<`[StreamCaption](#streamcaption)`>`.
* `list(language?)`: List captions, optionally filtered by language. Returns `Promise<`[StreamCaption](#streamcaption)`[]>`.
* `delete(language)`: Delete captions for a language. Returns `Promise<void>`.

### Watermark methods

The following methods are available on the `env.STREAM.watermarks` namespace.

#### `watermarks.generate(input, params)`

Create a watermark profile. Accepts either a `ReadableStream` or a URL string. Returns `Promise<`[StreamWatermark](#streamwatermark)`>`.

* `input` (required): A `ReadableStream` or URL string of the watermark image.
* `params` (optional): A [StreamWatermarkCreateParams](#streamwatermarkcreateparams) object with the following properties:  
   * `name`: Name of the watermark profile.  
   * `opacity`: Opacity of the watermark (0.0 to 1.0).  
   * `padding`: Padding around the watermark as a proportion of the video resolution.  
   * `scale`: Scale of the watermark as a proportion of the video resolution.  
   * `position`: Position of the watermark — `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, or `center`.

#### `watermarks.list()`

List all watermark profiles. Returns `Promise<`[StreamWatermark](#streamwatermark)`[]>`.

#### `watermarks.get(watermarkId)`

Get a single watermark profile. Returns `Promise<`[StreamWatermark](#streamwatermark)`>`.

* `watermarkId` (required): The ID of the watermark profile.

#### `watermarks.delete(watermarkId)`

Delete a watermark profile. Returns `Promise<void>`.

* `watermarkId` (required): The ID of the watermark profile.

## Examples

### Upload a video from a URL

* [  JavaScript ](#tab-panel-10761)
* [  TypeScript ](#tab-panel-10762)

JavaScript

```

export default {

  async fetch(request, env) {

    const video = await env.STREAM.upload("https://example.com/video.mp4", {

      creator: "user-123",

      meta: { category: "tutorial" },

      allowedOrigins: ["example.com"],

    });

    return Response.json(video);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const video = await env.STREAM.upload("https://example.com/video.mp4", {

      creator: "user-123",

      meta: { category: "tutorial" },

      allowedOrigins: ["example.com"],

    });

    return Response.json(video);

  },

};


```

### Create a direct upload

* [  JavaScript ](#tab-panel-10763)
* [  TypeScript ](#tab-panel-10764)

JavaScript

```

export default {

  async fetch(request, env) {

    const directUpload = await env.STREAM.createDirectUpload({

      maxDurationSeconds: 300,

      creator: "user-123",

      meta: { source: "browser-upload" },

    });

    return Response.json(directUpload);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const directUpload = await env.STREAM.createDirectUpload({

      maxDurationSeconds: 300,

      creator: "user-123",

      meta: { source: "browser-upload" },

    });

    return Response.json(directUpload);

  },

};


```

### List videos

* [  JavaScript ](#tab-panel-10767)
* [  TypeScript ](#tab-panel-10768)

JavaScript

```

export default {

  async fetch(request, env) {

    const videos = await env.STREAM.videos.list({

      limit: 10,

      after: "2025-01-01T00:00:00Z",

    });

    return Response.json(videos);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const videos = await env.STREAM.videos.list({

      limit: 10,

      after: "2025-01-01T00:00:00Z",

    });

    return Response.json(videos);

  },

};


```

### Get video details

* [  JavaScript ](#tab-panel-10765)
* [  TypeScript ](#tab-panel-10766)

JavaScript

```

export default {

  async fetch(request, env) {

    const videoDetails = await env.STREAM.video("VIDEO_ID").details();

    return Response.json(videoDetails);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const videoDetails = await env.STREAM.video("VIDEO_ID").details();

    return Response.json(videoDetails);

  },

};


```

### Update video metadata

* [  JavaScript ](#tab-panel-10771)
* [  TypeScript ](#tab-panel-10772)

JavaScript

```

export default {

  async fetch(request, env) {

    const videoDetails = await env.STREAM.video("VIDEO_ID").update({

      meta: { category: "updated-tutorial" },

      allowedOrigins: ["example.com", "*.example.com"],

    });

    return Response.json(videoDetails);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const videoDetails = await env.STREAM.video("VIDEO_ID").update({

      meta: { category: "updated-tutorial" },

      allowedOrigins: ["example.com", "*.example.com"],

    });

    return Response.json(videoDetails);

  },

};


```

### Delete a video

* [  JavaScript ](#tab-panel-10769)
* [  TypeScript ](#tab-panel-10770)

JavaScript

```

export default {

  async fetch(request, env) {

    await env.STREAM.video("VIDEO_ID").delete();

    return new Response("Video deleted", { status: 200 });

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    await env.STREAM.video("VIDEO_ID").delete();

    return new Response("Video deleted", { status: 200 });

  },

};


```

### Generate a signed URL token

* [  JavaScript ](#tab-panel-10773)
* [  TypeScript ](#tab-panel-10774)

JavaScript

```

export default {

  async fetch(request, env) {

    const token = await env.STREAM.video("VIDEO_ID").generateToken();

    return Response.json({ token });

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const token = await env.STREAM.video("VIDEO_ID").generateToken();

    return Response.json({ token });

  },

};


```

### Upload captions

* [  JavaScript ](#tab-panel-10777)
* [  TypeScript ](#tab-panel-10778)

JavaScript

```

export default {

  async fetch(request, env) {

    const captionResponse = await fetch("https://example.com/captions-en.vtt");

    const caption = await env.STREAM.video("VIDEO_ID").captions.upload(

      "en",

      captionResponse.body,

    );

    return Response.json(caption);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const captionResponse = await fetch("https://example.com/captions-en.vtt");

    const caption = await env.STREAM.video("VIDEO_ID").captions.upload(

      "en",

      captionResponse.body,

    );

    return Response.json(caption);

  },

};


```

### Generate AI captions

* [  JavaScript ](#tab-panel-10775)
* [  TypeScript ](#tab-panel-10776)

JavaScript

```

export default {

  async fetch(request, env) {

    const caption = await env.STREAM.video("VIDEO_ID").captions.generate("en");

    return Response.json(caption);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const caption = await env.STREAM.video("VIDEO_ID").captions.generate("en");

    return Response.json(caption);

  },

};


```

### List and delete captions

* [  JavaScript ](#tab-panel-10779)
* [  TypeScript ](#tab-panel-10780)

JavaScript

```

export default {

  async fetch(request, env) {

    const video = env.STREAM.video("VIDEO_ID");

    const captions = await video.captions.list();

    await video.captions.delete("en");

    return Response.json(captions);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const video = env.STREAM.video("VIDEO_ID");

    const captions = await video.captions.list();

    await video.captions.delete("en");

    return Response.json(captions);

  },

};


```

### Generate and list downloads

* [  JavaScript ](#tab-panel-10781)
* [  TypeScript ](#tab-panel-10782)

JavaScript

```

export default {

  async fetch(request, env) {

    const video = env.STREAM.video("VIDEO_ID");

    const downloads = await video.downloads.generate();

    const audioDownloads = await video.downloads.generate("audio");

    const allDownloads = await video.downloads.get();

    return Response.json({ downloads, audioDownloads, allDownloads });

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const video = env.STREAM.video("VIDEO_ID");

    const downloads = await video.downloads.generate();

    const audioDownloads = await video.downloads.generate("audio");

    const allDownloads = await video.downloads.get();

    return Response.json({ downloads, audioDownloads, allDownloads });

  },

};


```

### Create a watermark profile

* [  JavaScript ](#tab-panel-10785)
* [  TypeScript ](#tab-panel-10786)

JavaScript

```

export default {

  async fetch(request, env) {

    const watermark = await env.STREAM.watermarks.generate(

      "https://example.com/watermark.png",

      {

        name: "My Watermark",

        opacity: 0.5,

        position: "lowerRight",

        padding: 0.05,

        scale: 0.1,

      },

    );

    return Response.json(watermark);

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const watermark = await env.STREAM.watermarks.generate(

      "https://example.com/watermark.png",

      {

        name: "My Watermark",

        opacity: 0.5,

        position: "lowerRight",

        padding: 0.05,

        scale: 0.1,

      },

    );

    return Response.json(watermark);

  },

};


```

### List and delete watermark profiles

* [  JavaScript ](#tab-panel-10783)
* [  TypeScript ](#tab-panel-10784)

JavaScript

```

export default {

  async fetch(request, env) {

    const watermarks = await env.STREAM.watermarks.list();

    const watermark = await env.STREAM.watermarks.get("WATERMARK_ID");

    await env.STREAM.watermarks.delete("WATERMARK_ID");

    return Response.json({ watermarks, watermark });

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const watermarks = await env.STREAM.watermarks.list();

    const watermark = await env.STREAM.watermarks.get("WATERMARK_ID");

    await env.STREAM.watermarks.delete("WATERMARK_ID");

    return Response.json({ watermarks, watermark });

  },

};


```

## Type definitions

### StreamVideo

`StreamVideo` is returned by operations that retrieve or create a video. It contains the full metadata for a video.

* `id` ` string `  
   * The unique identifier for the video.
* `creator` ` string | null `  
   * A user-defined identifier for the media creator.
* `thumbnail` ` string `  
   * The thumbnail URL for the video.
* `thumbnailTimestampPct` ` number `  
   * The thumbnail timestamp percentage.
* `readyToStream` ` boolean `  
   * Indicates whether the video is ready to stream.
* `readyToStreamAt` ` string | null `  
   * The date and time the video became ready to stream.
* `status` ` StreamVideoStatus `  
   * Processing status information. Refer to [StreamVideoStatus](#streamvideostatus).
* `meta` ` Record<string, string> `  
   * A user modifiable key-value store.
* `created` ` string `  
   * The date and time the video was created.
* `modified` ` string `  
   * The date and time the video was last modified.
* `scheduledDeletion` ` string | null `  
   * The date and time at which the video will be deleted.
* `size` ` number `  
   * The size of the video in bytes.
* `preview` ` string ` optional  
   * The preview URL for the video.
* `allowedOrigins` ` Array<string> `  
   * Origins allowed to display the video.
* `requireSignedURLs` ` boolean | null `  
   * Indicates whether signed URLs are required.
* `uploaded` ` string | null `  
   * The date and time the video was uploaded.
* `uploadExpiry` ` string | null `  
   * The date and time when the upload URL expires.
* `maxSizeBytes` ` number | null `  
   * The maximum size in bytes for direct uploads.
* `maxDurationSeconds` ` number | null `  
   * The maximum duration in seconds for direct uploads.
* `duration` ` number `  
   * The video duration in seconds. `-1` indicates unknown.
* `input` ` StreamVideoInput `  
   * Input metadata for the original upload. Refer to [StreamVideoInput](#streamvideoinput).
* `hlsPlaybackUrl` ` string `  
   * The HLS playback URL for the video.
* `dashPlaybackUrl` ` string `  
   * The DASH playback URL for the video.
* `watermark` ` StreamWatermark | null `  
   * The watermark applied to the video, if any. Refer to [StreamWatermark](#streamwatermark).
* `liveInputId` ` string | null ` optional  
   * The live input ID associated with the video, if any.
* `clippedFromId` ` string | null `  
   * The source video ID if this is a clip.
* `publicDetails` ` StreamPublicDetails | null `  
   * Public details associated with the video. Refer to [StreamPublicDetails](#streampublicdetails).

### StreamVideoStatus

Processing status information for a video.

* `state` ` string `  
   * The current processing state.
* `step` ` string ` optional  
   * The current processing step.
* `pctComplete` ` string ` optional  
   * The percent complete as a string.
* `errorReasonCode` ` string `  
   * An error reason code, if applicable.
* `errorReasonText` ` string `  
   * An error reason text, if applicable.

### StreamVideoInput

Input metadata for the original upload.

* `width` ` number `  
   * The input width in pixels.
* `height` ` number `  
   * The input height in pixels.

### StreamPublicDetails

Public details associated with a video.

* `title` ` string | null `  
   * The public title for the video.
* `share_link` ` string | null `  
   * The public share link.
* `channel_link` ` string | null `  
   * The public channel link.
* `logo` ` string | null `  
   * The public logo URL.

### StreamDirectUpload

Returned by `createDirectUpload()`. Contains the upload URL and video identifier for a direct upload.

* `uploadURL` ` string `  
   * The URL an unauthenticated upload can use for a single multipart request.
* `id` ` string `  
   * A Cloudflare-generated unique identifier for a media item.
* `watermark` ` StreamWatermark | null `  
   * The watermark profile applied to the upload. Refer to [StreamWatermark](#streamwatermark).
* `scheduledDeletion` ` string | null `  
   * The scheduled deletion time, if any.

### StreamCaption

Represents a caption or subtitle track for a video.

* `generated` ` boolean ` optional  
   * Whether the caption was generated via AI.
* `label` ` string `  
   * The language label displayed in the native language to users.
* `language` ` string `  
   * The language tag in BCP 47 format.
* `status` ` 'ready' | 'inprogress' | 'error' ` optional  
   * The status of a generated caption.

### StreamDownloadGetResponse

An object with download type keys. Each key is optional and only present if that download type has been created.

* `default` ` StreamDownload ` optional  
   * The default video download. Only present if this download type has been created. Refer to [StreamDownload](#streamdownload).
* `audio` ` StreamDownload ` optional  
   * The audio-only download. Only present if this download type has been created. Refer to [StreamDownload](#streamdownload).

### StreamDownload

Represents a generated download for a video.

* `percentComplete` ` number `  
   * Indicates the progress as a percentage between 0 and 100.
* `status` ` StreamDownloadStatus `  
   * The status of a generated download.
* `url` ` string ` optional  
   * The URL to access the generated download.

### StreamWatermark

Represents a watermark profile.

* `id` ` string `  
   * The unique identifier for a watermark profile.
* `name` ` string `  
   * A short description of the watermark profile.
* `opacity` ` number `  
   * The translucency of the image. A value of `0.0` makes the image completely transparent, and `1.0` makes the image completely opaque. Note that if the image is already semi-transparent, setting this to `1.0` will not make the image completely opaque.
* `padding` ` number `  
   * The whitespace between the adjacent edges (determined by position) of the video and the image. `0.0` indicates no padding, and `1.0` indicates a fully padded video width or length.
* `scale` ` number `  
   * The size of the image relative to the overall size of the video. `0.0` indicates no scaling, and `1.0` fills the entire video.
* `position` ` StreamWatermarkPosition `  
   * The location of the image. Refer to [StreamWatermarkPosition](#streamwatermarkposition).
* `size` ` number `  
   * The size of the image in bytes.
* `height` ` number `  
   * The height of the image in pixels.
* `width` ` number `  
   * The width of the image in pixels.
* `created` ` string `  
   * The date and time a watermark profile was created.
* `downloadedFrom` ` string | null `  
   * The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is `null`.

### StreamWatermarkPosition

The position of a watermark on a video.

` 'upperRight' | 'upperLeft' | 'lowerLeft' | 'lowerRight' | 'center' ` 
* `upperRight` — Top-right corner of the video.
* `upperLeft` — Top-left corner of the video.
* `lowerLeft` — Bottom-left corner of the video.
* `lowerRight` — Bottom-right corner of the video.
* `center` — Center of the video. Note that `center` ignores the `padding` parameter.

### StreamDownloadStatus

The status of a generated download.

` 'ready' | 'inprogress' | 'error' ` 
* `ready` — The download is ready.
* `inprogress` — The download is being generated.
* `error` — An error occurred during generation.

### StreamDownloadType

The type of download to generate.

` 'default' | 'audio' ` 
* `default` — A video download.
* `audio` — An audio-only download.

### StreamUrlUploadParams

Parameters for uploading a video from a URL.

* `allowedOrigins` ` Array<string> ` optional  
   * Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.
* `creator` ` string ` optional  
   * A user-defined identifier for the media creator.
* `meta` ` Record<string, string> ` optional  
   * A user modifiable key-value store used to reference other systems of record for managing videos.
* `requireSignedURLs` ` boolean ` optional  
   * Indicates whether the video can be accessed using the ID. When set to `true`, a signed token must be generated with a signing key to view the video.
* `scheduledDeletion` ` string | null ` optional  
   * Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.
* `thumbnailTimestampPct` ` number ` optional  
   * The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video. If this value is not set, the default thumbnail image is taken from 0s of the video.
* `watermarkId` ` string ` optional  
   * The identifier for the watermark profile.

### StreamDirectUploadCreateParams

Parameters for creating a direct upload.

* `maxDurationSeconds` ` number `  
   * The maximum duration in seconds for a video upload.
* `expiry` ` string ` optional  
   * The date and time after upload when videos will not be accepted.
* `creator` ` string ` optional  
   * A user-defined identifier for the media creator.
* `meta` ` Record<string, string> ` optional  
   * A user modifiable key-value store used to reference other systems of record for managing videos.
* `allowedOrigins` ` Array<string> ` optional  
   * Lists the origins allowed to display the video.
* `requireSignedURLs` ` boolean ` optional  
   * Indicates whether the video can be accessed using the ID. When set to `true`, a signed token must be generated with a signing key to view the video.
* `thumbnailTimestampPct` ` number ` optional  
   * The timestamp for a thumbnail image calculated as a percentage value of the video's duration.
* `scheduledDeletion` ` string | null ` optional  
   * The date and time at which the video will be deleted. Include `null` to remove a scheduled deletion.
* `watermark` ` StreamDirectUploadWatermark ` optional  
   * The watermark profile to apply. Refer to [StreamDirectUploadWatermark](#streamdirectuploadwatermark).

### StreamDirectUploadWatermark

Watermark configuration for a direct upload.

* `id` ` string `  
   * The unique identifier for the watermark profile.

### StreamUpdateVideoParams

Parameters for updating a video.

* `allowedOrigins` ` Array<string> ` optional  
   * Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.
* `creator` ` string ` optional  
   * A user-defined identifier for the media creator.
* `maxDurationSeconds` ` number ` optional  
   * The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of `-1` means the value is unknown.
* `meta` ` Record<string, string> ` optional  
   * A user modifiable key-value store used to reference other systems of record for managing videos.
* `requireSignedURLs` ` boolean ` optional  
   * Indicates whether the video can be accessed using the ID. When set to `true`, a signed token must be generated with a signing key to view the video.
* `scheduledDeletion` ` string | null ` optional  
   * Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.
* `thumbnailTimestampPct` ` number ` optional  
   * The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video. If this value is not set, the default thumbnail image is taken from 0s of the video.

### StreamVideosListParams

Parameters for listing videos.

* `limit` ` number ` optional  
   * The maximum number of videos to return.
* `before` ` string ` optional  
   * Return videos created before this timestamp (RFC3339/RFC3339Nano).
* `beforeComp` ` StreamPaginationComparison ` optional  
   * Comparison operator for the `before` field. Defaults to `lt`. Refer to [StreamPaginationComparison](#streampaginationcomparison).
* `after` ` string ` optional  
   * Return videos created after this timestamp (RFC3339/RFC3339Nano).
* `afterComp` ` StreamPaginationComparison ` optional  
   * Comparison operator for the `after` field. Defaults to `gte`. Refer to [StreamPaginationComparison](#streampaginationcomparison).

### StreamPaginationComparison

Comparison operators for pagination queries.

` 'eq' | 'gt' | 'gte' | 'lt' | 'lte' ` 
* `eq` — Equal to
* `gt` — Greater than
* `gte` — Greater than or equal to
* `lt` — Less than
* `lte` — Less than or equal to

### StreamWatermarkCreateParams

Parameters for creating a watermark profile.

* `name` ` string ` optional  
   * A short description of the watermark profile.
* `opacity` ` number ` optional  
   * The translucency of the image. A value of `0.0` makes the image completely transparent, and `1.0` makes the image completely opaque. Note that if the image is already semi-transparent, setting this to `1.0` will not make the image completely opaque.
* `padding` ` number ` optional  
   * The whitespace between the adjacent edges (determined by position) of the video and the image. `0.0` indicates no padding, and `1.0` indicates a fully padded video width or length.
* `scale` ` number ` optional  
   * The size of the image relative to the overall size of the video. `0.0` indicates no scaling, and `1.0` fills the entire video.
* `position` ` StreamWatermarkPosition ` optional  
   * The location of the image. Refer to [StreamWatermarkPosition](#streamwatermarkposition).

## Error handling

Errors throw a `StreamError`, which extends the standard `Error` interface with additional information:

* `code`: A numeric error code.
* `statusCode`: An HTTP status code.
* `message`: A description of the error.
* `stack`: Optional stack trace.

The following error subtypes may be thrown:

| Error type             | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| InternalError          | An internal server error occurred.                         |
| BadRequestError        | The request was malformed or contained invalid parameters. |
| NotFoundError          | The requested resource was not found.                      |
| ForbiddenError         | The request was not authorized.                            |
| RateLimitedError       | The request was rate limited.                              |
| QuotaReachedError      | The account has reached its video quota.                   |
| MaxFileSizeError       | The uploaded file exceeds the maximum allowed size.        |
| InvalidURLError        | The provided URL is invalid or unreachable.                |
| AlreadyUploadedError   | The video has already been uploaded.                       |
| TooManyWatermarksError | The account has reached the watermark profile limit.       |

Use a `try...catch` block to handle errors:

* [  JavaScript ](#tab-panel-10787)
* [  TypeScript ](#tab-panel-10788)

JavaScript

```

export default {

  async fetch(request, env) {

    try {

      const videoDetails = await env.STREAM.upload(

        "https://example.com/video.mp4",

      );

      return Response.json(videoDetails);

    } catch (e) {

      if (e instanceof Error) {

        return new Response(`Stream error: ${e.message}`, { status: 500 });

      }

      throw e;

    }

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    try {

      const videoDetails = await env.STREAM.upload("https://example.com/video.mp4");

      return Response.json(videoDetails);

    } catch (e) {

      if (e instanceof Error) {

        return new Response(`Stream error: ${e.message}`, { status: 500 });

      }

      throw e;

    }

  },

};


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/manage-video-library/bindings/#page","headline":"Bind to Workers API · Cloudflare Stream docs","description":"A binding connects your Worker to external resources on the Developer Platform, like Stream, R2 buckets, or KV namespaces.","url":"https://developers.cloudflare.com/stream/manage-video-library/bindings/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/manage-video-library/","name":"Manage videos"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/manage-video-library/bindings/","name":"Bind to Workers API"}}]}
```
