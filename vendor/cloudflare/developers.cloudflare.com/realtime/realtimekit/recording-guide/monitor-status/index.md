---
title: Monitor Recording Status
description: Track RealtimeKit recording states from invocation through upload completion.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Monitor Recording Status

## Recording states

The recording of a meeting can have the following states:

| Name      | Description                                                                                                                                                                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| INVOKED   | RealtimeKit backend servers have received the recording request, and the master is looking for a ready worker to assign the recording job.                                                                                                                 |
| RECORDING | The meeting is currently being recorded by a worker; note that this will also hold true if the meeting is being live streamed.                                                                                                                             |
| UPLOADING | The recording has been stopped and the file is being uploaded to the cloud storage. If you have not specified storage details, then the files will be uploaded only to RealtimeKit's server. Any RTMP and livestreaming link will also stop at this stage. |
| UPLOADED  | The recording file upload is complete and the status webhook is also triggered.                                                                                                                                                                            |
| ERRORED   | There was an irrecoverable error while recording the meeting and the file will not be available.                                                                                                                                                           |

## Fetching the state

There are two ways you can track what state a recording is in or view more details about a recording:

### Using the `recording.statusUpdate` webhook

RealtimeKit sends a `recording.statusUpdate` webhook when the recording transitions between states during its lifecycle. Add `recording.statusUpdate` to your webhook's `events` array to receive these notifications.

Terminal window

```

curl --request POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks" \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --header "Content-Type: application/json" \

  --data '{

    "name": "Recording status webhook",

    "url": "https://example.com/webhook",

    "events": ["recording.statusUpdate"],

    "enabled": true

  }'


```

The webhook payload includes the current recording status, recording metadata, and associated meeting details. When the status is `UPLOADED`, the payload can include `downloadUrl`, `audioDownloadUrl`, and `downloadUrlExpiry` fields for accessing the uploaded files.

For setup, signature verification, retry behavior, and a full payload example, refer to [RealtimeKit webhooks](https://developers.cloudflare.com/realtime/realtimekit/webhooks/#recordingstatusupdate).

### By polling HTTP APIs

Alternatively, you can also use the following APIs:

* [List recordings](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Frecordings/): This endpoint gets all past and ongoing recordings linked to a meeting.
* [Fetch active recording](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Factive%5Frecordings/): This endpoint gets all ongoing recordings of a meeting.
* [Fetch details of a recording](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Fone%5Frecording/): This endpoint gets a specific recording using a recording ID.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/monitor-status/#page","headline":"Monitor Recording Status · Cloudflare Realtime docs","description":"Track RealtimeKit recording states from invocation through upload completion.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/monitor-status/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/recording-guide/","name":"Recording"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/recording-guide/monitor-status/","name":"Monitor Recording Status"}}]}
```
