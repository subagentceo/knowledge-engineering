---
title: Start Recording
description: Start composite recording of a RealtimeKit meeting using the API, SDK, or auto-record flag.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Start Recording

This topic explains how to use RealtimeKit to implement composite recording.

Before getting started with this guide, we recommend that you read[Get Started with RealtimeKit](https://developers.cloudflare.com/realtime/realtimekit/quickstart/) to familiarize yourself with RealtimeKit.

To familiarize yourself with the RealtimeKit REST APIs, we recommend exploring the [RealtimeKit REST API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/).

There are three ways to start recording a RealtimeKit meeting:

* Using the `record_on_start` flag when[creating a meeting](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/)
* Using the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/)
* Client side start recording methods on the SDK

RealtimeKit stores recordings for a period of 7 days, after which they will expire and no longer be accessible. It is important to either download a copy of your recording or [set up storage](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/custom-cloud-storage/) before the link expires.

Note

1. Our system does not currently support recordings of brief durations that are less than five seconds. In such cases, it is possible that the recording APIs may experience occasional failures. Due to limitations in encoding recordings of short duration, these failures may result in an ERRORED state.
2. Recording will stop if there are no participants in a meeting for 60 seconds.
3. The average file size for one hour of recording is approximately 300MB.
4. There can only be one active recording of a meeting at any given time, unless the `allow_multiple_recording` field is set in the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/).
5. Maximum recording time is 24 hours. Recording will automatically stop after 24 hours have elapsed since the recording's start time. This option can be configured to any value up to 24 hours by passing the `max_seconds` parameter in the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/) request.

## Using the `record_on_start` parameter

When [creating a meeting](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/), you can specify the `record_on_start` parameter to start the recording as soon as someone joins the meeting.

Specify storage config

If you're using this method to start the recording, you must specify the`storage-config` using the Developer Portal.

### Request

Specify the `record_on_start` parameter. If this flag is true, then a recording will be started as soon as a meeting starts on RealtimeKit, i.e, when the first participant joins the meeting.

Terminal window

```

curl --location 'https://api.cloudflare.com/client/v4/accounts/<account_id>/realtime/kit/<app_id>/meetings' \

  --header 'Content-Type: application/json' \

  --header 'Authorization: Bearer <api_token>' \

  --data '{

  "title": "Lorem Ipsum",

  "record_on_start": true

}'


```

### Response

```

{

  "success": true,

  "data": {

    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",

    "record_on_start": true,

    "created_at": "2025-08-24T14:15:22Z",

    "updated_at": "2025-08-24T14:15:22Z"

  }

}


```

## Using the Start Recording API

You can also start a recording using the[Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/).

Specify the `meeting ID` of the meeting that you want to record.

Use the [List meetings API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/get/) for an app or [Create a meeting API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/) to get the meeting ID. The API returns a parameter called `id`, which is your meeting ID.

### Request

Calling Start Recording API

```

curl --location 'https://api.cloudflare.com/client/v4/accounts/<account_id>/realtime/kit/<app_id>/recordings' \

  --header 'Content-Type: application/json' \

  --header 'Authorization: Bearer <api_token>' \

  --data '{

  "meeting_id": "97440c6a-140b-40a9-9499-b23fd7a3868a"

}'


```

### Response

```

{

  "success": true,

  "data": {

    "id": "97440c6a-140b-40a9-9499-b23fd7a3868a",

    "download_url": "http://example.com",

    "download_url_expiry": "2025-08-24T14:15:22Z",

    "download_audio_url": "http://example1.com",

    "file_size": 0,

    "session_id": "1ffd059c-17ea-40a8-8aef-70fd0307db82",

    "output_file_name": "string",

    "status": "INVOKED",

    "invoked_time": "2025-08-24T14:15:22Z",

    "started_time": "2025-08-24T14:15:22Z",

    "stopped_time": "2025-08-24T14:15:22Z",

    "storage_config": {

      "type": "cloudflare",

      "secret_key": "string",

      "bucket": "string",

      "path": "string"

    }

  }

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/start-recording/#page","headline":"Start Recording · Cloudflare Realtime docs","description":"Start composite recording of a RealtimeKit meeting using the API, SDK, or auto-record flag.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/start-recording/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/recording-guide/","name":"Recording"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/recording-guide/start-recording/","name":"Start Recording"}}]}
```
