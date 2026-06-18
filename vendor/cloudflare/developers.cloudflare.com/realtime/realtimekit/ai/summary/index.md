---
title: Summary
description: Generate AI-powered meeting summaries from transcript data in RealtimeKit.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Summary

RealtimeKit generates AI-powered meeting summaries from transcript data.

Note

Summarization requires a transcript. To generate summaries automatically when a meeting ends, turn on [real-time transcription](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/#real-time-transcription) or [post-meeting transcription](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/#post-meeting-transcription), and set `summarize_on_end: true`. With post-meeting transcription, RealtimeKit generates the summary after the transcript is available.

## Turn on summarization

Set `summarize_on_end: true` when [creating a meeting](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/). For post-meeting summaries, also set `transcribe_on_end: true` so RealtimeKit generates the summary automatically after the transcript is available:

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "title": "Product Review",

    "transcribe_on_end": true,

    "summarize_on_end": true,

    "ai_config": {

      "transcription": {

        "language": "en-US"

      },

      "summarization": {

        "word_limit": 500,

        "text_format": "markdown",

        "summary_type": "team_meeting"

      }

    }

  }'


```

## Configuration

| Option        | Type   | Default  | Description                            |
| ------------- | ------ | -------- | -------------------------------------- |
| word\_limit   | number | 500      | Summary length (150-1000 words)        |
| text\_format  | string | markdown | Output format: plain\_text or markdown |
| summary\_type | string | general  | Meeting context for tailored summaries |

### Summary types

Choose a type that matches your meeting for better results:

| Type                  | Best for                     |
| --------------------- | ---------------------------- |
| general               | Any meeting (default)        |
| team\_meeting         | Regular team syncs           |
| daily\_standup        | Agile standups               |
| one\_on\_one\_meeting | 1:1 meetings                 |
| sales\_call           | Customer sales conversations |
| client\_check\_in     | Client status updates        |
| interview             | Job interviews               |
| lecture               | Educational content          |
| code\_review          | Technical code reviews       |

## Consume summaries

### Webhook

Configure the `meeting.summary` event in [RealtimeKit webhooks](https://developers.cloudflare.com/realtime/realtimekit/webhooks/#meetingsummary) to receive the summary download URL when it is ready:

```

{

  "event": "meeting.summary",

  "meeting": {

    "id": "bbb8940e-1b97-402a-97d6-2708b7feca41",

    "sessionId": "05e57591-d89e-45c9-ae44-08dc1eaad0e0",

    "organizedBy": {

      "id": "c94c437b-592a-4a39-b9e2-47ef1451e43b",

      "name": "Example organization"

    }

  },

  "summaryDownloadUrl": "https://example.com/summary.txt",

  "summaryDownloadUrlExpiry": "2026-06-10T10:30:00.000Z"

}


```

### REST API

#### Fetch summary

Refer to [Fetch summary of transcripts for a session](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/sessions/methods/get%5Fsession%5Fsummary/).

Terminal window

```

curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/summary" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

#### Trigger manually

Use the [Generate summary of transcripts for the session](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/sessions/methods/generate%5Fsummary%5Fof%5Ftranscripts/) API if `summarize_on_end` was not set and you want to generate a summary manually after the transcript is available.

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/summary" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

## Example output

With `text_format: "markdown"` and `summary_type: "team_meeting"`:

```

## Meeting Summary


### Key Discussion Points


- Reviewed Q4 roadmap priorities

- Discussed deployment timeline for v2.0

- Identified blockers for the auth migration


### Action Items


- @alice: Update design specs by Friday

- @bob: Schedule security review

- @charlie: Create migration runbook


### Decisions Made


- Approved moving forward with Kubernetes migration

- Delayed analytics dashboard to next sprint


```

## Retention

Summaries are stored for **7 days** after the meeting ends.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ai/summary/#page","headline":"Summary · Cloudflare Realtime docs","description":"Generate AI-powered meeting summaries from transcript data in RealtimeKit.","url":"https://developers.cloudflare.com/realtime/realtimekit/ai/summary/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ai/","name":"AI"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ai/summary/","name":"Summary"}}]}
```
