---
title: Track recording
description: Record separate audio tracks for selected RealtimeKit participants and download per-participant WebM files.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Track recording

Track recording lets you record participant audio as separate WebM files instead of one composite meeting recording. Use it when you need speaker-level control over what you store, process, or review.

With track recording, you can record specific participant tracks by passing `user_ids`, which is useful for content-sensitive or regulated workflows where recording every participant is unnecessary. If you do not provide `user_ids`, RealtimeKit will record all participant audio tracks as separate WebM files by default.

To pass `user_ids` for specific participant track recording, use the following minimum SDK versions:

* Web Core: `@cloudflare/realtimekit` version `1.4.0` or later
* Web UI Kit: `@cloudflare/realtimekit-ui`, `@cloudflare/realtimekit-react-ui`, or `@cloudflare/realtimekit-angular-ui` version `1.1.2` or later
* Android Core or iOS Core: version `2.0.0` or later
* Android UI Kit or iOS UI Kit: version `1.1.0` or later

Track recording creates one file per recorded participant.

Note

Track recording currently supports audio tracks only. Video track recording is in development.

## Availability and limits

Track recording has the following requirements and limits:

| Limit                 | Description                                                                  |
| --------------------- | ---------------------------------------------------------------------------- |
| Active meeting        | The meeting must have an active live session.                                |
| Media kind            | Only audio layers are recorded.                                              |
| Participant selection | Pass up to 100 values in user\_ids.                                          |
| Storage               | Files are uploaded to RealtimeKit's managed R2 bucket with zero-egress fees. |
| File retention        | RealtimeKit bucket download URLs expire after seven days.                    |

## Start track recording

### Record specific participants

To record separate audio tracks for specific participants, call [POST /recordings/track](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Ftrack%5Frecording/) with the meeting ID and the participant `user_ids`.

Terminal window

```

curl --request POST \

  --url https://api.cloudflare.com/client/v4/accounts/<account_id>/realtime/kit/<app_id>/recordings/track \

  --header 'Authorization: Bearer <api_token>' \

  --header 'Content-Type: application/json' \

  --data '{

  "meeting_id": "97440c6a-140b-40a9-9499-b23fd7a3868a",

  "user_ids": ["user-123", "user-456"]

}'


```

RealtimeKit records current and future participants whose `user_id` matches the allowlist. Participants whose `user_id` is not listed are not recorded.

### Record all participants as separate tracks

Omit `user_ids` to record separate audio tracks for all participants in the live meeting. RealtimeKit creates one WebM file for each recorded participant.

Terminal window

```

curl --request POST \

  --url https://api.cloudflare.com/client/v4/accounts/<account_id>/realtime/kit/<app_id>/recordings/track \

  --header 'Authorization: Bearer <api_token>' \

  --header 'Content-Type: application/json' \

  --data '{

  "meeting_id": "97440c6a-140b-40a9-9499-b23fd7a3868a"

}'


```

The response includes a recording ID. Use this ID to stop or fetch the recording.

```

{

  "success": true,

  "data": {

    "recording": {

      "id": "fff40c6a-140b-40a9-9499-b23fd7a3868a",

      "meeting_id": "97440c6a-140b-40a9-9499-b23fd7a3868a",

      "status": "INVOKED",

      "type": "TRACK",

      "output_file_name": "{{file_name_prefix}}_{{user_id}}_{{peer_id}}_{{stream_kind}}_{{media_kind}}_{{date_time}}.webm"

    }

  }

}


```

## Customize file names with prefixes

Use `layers.default.file_name_prefix` to prefix every generated track recording file.

```

{

  "meeting_id": "97440c6a-140b-40a9-9499-b23fd7a3868a",

  "layers": {

    "default": {

      "media_kind": "audio",

      "file_name_prefix": "speaker"

    }

  }

}


```

If you omit `layers`, RealtimeKit uses `default` as the file name prefix.

## Stop track recording

Use the [recording update endpoint](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/pause%5Fresume%5Fstop%5Frecording/) to stop a track recording.

Terminal window

```

curl --request PUT \

  --url https://api.cloudflare.com/client/v4/accounts/<account_id>/realtime/kit/<app_id>/recordings/<recording_id> \

  --header 'Authorization: Bearer <api_token>' \

  --header 'Content-Type: application/json' \

  --data '{

  "action": "stop"

}'


```

Track recording also stops when the meeting session ends.

After track recording stops, RealtimeKit uploads the per-participant WebM files and moves the recording to `UPLOADED`.

## Download track files

Track recording uses the same recording status lifecycle as composite recording. To monitor status, refer to [Monitor Recording Status](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/monitor-status/).

When the recording reaches `UPLOADED`, fetch the recording details or listen for the `recording.statusUpdate` webhook. For track recordings, `download_url` contains per-participant WebM file URLs grouped by layer.

```

{

  "download_url": [

    {

      "layer_name": "default",

      "download_urls": {

        "speaker_user-123_peer-456_peer_audio_1760000000000.webm": {

          "download_url": "https://example.com/presigned-url"

        }

      }

    }

  ]

}


```

File names use this format:

```

{{file_name_prefix}}_{{user_id}}_{{peer_id}}_{{stream_kind}}_{{media_kind}}_{{date_time}}.webm


```

The `date_time` value is the Unix timestamp in milliseconds when the file was generated.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/track-recording/#page","headline":"Track recording · Cloudflare Realtime docs","description":"Record separate audio tracks for selected RealtimeKit participants and download per-participant WebM files.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/track-recording/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/recording-guide/","name":"Recording"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/recording-guide/track-recording/","name":"Track recording"}}]}
```
