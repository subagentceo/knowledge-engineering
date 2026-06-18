---
title: Transcription
description: Turn on real-time and post-meeting speech-to-text transcription in RealtimeKit.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Transcription

RealtimeKit provides two transcription modes powered by [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/):

| Mode                                            | Model                                                                                                 | Processing time        | Use case                                                                                                             |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------- |
| [**Real-time**](#real-time-transcription)       | [Deepgram Nova-3](https://developers.cloudflare.com/workers-ai/models/nova-3/)                        | During the meeting     | Live captions for attendees                                                                                          |
| [**Post-meeting**](#post-meeting-transcription) | [Whisper Large v3 Turbo](https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/) | After the meeting ends | [Transcript files](#output-formats) and [webhooks](https://developers.cloudflare.com/realtime/realtimekit/webhooks/) |

RealtimeKit processes each participant audio stream separately. This helps identify each speaker in the final transcript.

We recommend upgrading to the Workers Paid plan to avoid Workers AI processing limits on the Free plan. Learn more in [Billing and Free plan limits](#billing-and-free-plan-limits).

## Real-time transcription

Real-time transcription streams participant audio to [Deepgram Nova-3](https://developers.cloudflare.com/workers-ai/models/nova-3/) on Workers AI and sends [transcript events](#consume-real-time-transcripts) to meeting participants during the meeting.

### Turn on real-time transcription

You can turn on real-time transcription for participants by setting `permissions.transcription_enabled: true` in the participant's [preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/). This lets you decide which participant audio is transcribed. For example, you can transcribe speaker audio without transcribing audience audio.

To update an existing preset, use the [Update a preset API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/presets/methods/update/):

Terminal window

```

curl -X PATCH "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/presets/$PRESET_ID" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "permissions": {

      "transcription_enabled": true

    }

  }'


```

To create a preset, refer to the [Create a preset API reference](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/presets/methods/create/).

RealtimeKit transcribes audio only for participants who join with a preset that has `permissions.transcription_enabled: true`.

During the meeting, RealtimeKit streams transcript updates to the client SDK. To access existing transcripts from `meeting.ai.transcripts` or listen for new transcript events with `meeting.ai.on("transcript", ...)`, refer to [Consume real-time transcripts](#consume-real-time-transcripts).

### Configure transcription settings

The preset controls whose audio is transcribed. The meeting configuration controls how RealtimeKit transcribes that audio. Use `ai_config.transcription` to set the [spoken language](#real-time-supported-languages), boost recognition for custom terms, and control profanity filtering for a specific meeting.

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "title": "Weekly product review",

    "ai_config": {

      "transcription": {

        "language": "en-US",

        "keywords": ["RealtimeKit", "Cloudflare"],

        "profanity_filter": false

      }

    }

  }'


```

| Option            | Type       | Default | Description                                |
| ----------------- | ---------- | ------- | ------------------------------------------ |
| language          | string     | en-US   | Language code for transcription            |
| keywords          | string\[\] | \[\]    | Terms to boost recognition (names, jargon) |
| profanity\_filter | boolean    | false   | Filter offensive language                  |

### Real-time supported languages

Real-time transcription is powered by [Deepgram Nova-3](https://developers.cloudflare.com/workers-ai/models/nova-3/) on Workers AI.

Nova-3 on Workers AI supports the following languages for transcription:

| Language   | Code(s)                               |
| ---------- | ------------------------------------- |
| English    | en, en-US, en-AU, en-GB, en-IN, en-NZ |
| Spanish    | es, es-419                            |
| French     | fr, fr-CA                             |
| German     | de, de-CH                             |
| Hindi      | hi                                    |
| Russian    | ru                                    |
| Portuguese | pt, pt-BR, pt-PT                      |
| Japanese   | ja                                    |
| Italian    | it                                    |
| Dutch      | nl                                    |

Use `multi` for automatic multilingual detection across all of the languages listed above.

If no language is specified, the model defaults to `en-US`. For best accuracy, explicitly set the language code matching your audio.

### Consume real-time transcripts

Real-time transcription sends interim and final transcript updates to the client SDK. Use interim updates for live captions, and use final updates for transcript history or saved UI state.

#### Client SDK

JavaScript

```

// Get transcript entries already received by the client.

const transcripts = meeting.ai.transcripts;


// Listen for transcript updates during the meeting.

meeting.ai.on("transcript", (transcript) => {

  if (transcript.isPartialTranscript) {

    updateLiveCaption(transcript.peerId, transcript.transcript);

    return;

  }


  appendFinalTranscript(transcript);

});


```

#### Transcript payload

```

{

  "id": "1a2b3c4d-5678-90ab-cdef-1234567890ab",

  "name": "Alice",

  "peerId": "4f5g6h7i-8j9k-0lmn-opqr-1234567890st",

  "userId": "uvwxyz-1234-5678-90ab-cdefghijklmn",

  "customParticipantId": "abc123xyz",

  "transcript": "Hello everyone",

  "isPartialTranscript": false,

  "timestamp": 1716700000000

}


```

| Field               | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| id                  | Unique transcript entry ID                                    |
| name                | Display name of the participant who spoke                     |
| peerId              | Peer ID of the participant who spoke. Changes if they rejoin. |
| userId              | Persistent participant ID                                     |
| customParticipantId | Participant identifier set when the participant was added     |
| transcript          | Transcribed text                                              |
| isPartialTranscript | true for interim updates, false for final updates             |
| timestamp           | Unix epoch timestamp in milliseconds                          |

---

## Post-meeting transcription

Post-meeting transcription generates a transcript after the meeting ends using [Whisper Large v3 Turbo](https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/) on Workers AI and delivers it through a [webhook](https://developers.cloudflare.com/realtime/realtimekit/webhooks/) or [REST API](#rest-api). To identify speakers, RealtimeKit processes each participant's audio separately before creating the [final transcript](#output-formats).

### Turn on post-meeting transcription

You can turn on post-meeting transcription when you create a meeting. Set `transcribe_on_end: true` to generate a transcript after the meeting ends. To also generate a [summary](https://developers.cloudflare.com/realtime/realtimekit/ai/summary/) automatically after the transcript is available, set `summarize_on_end: true`.

Terminal window

```

curl -X POST "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  -H "Content-Type: application/json" \

  -d '{

    "title": "Weekly product review",

    "transcribe_on_end": true,

    "summarize_on_end": true,

    "ai_config": {

      "transcription": {

        "language": "en"

      }

    }

  }'


```

Use `ai_config.transcription.language` to set the transcript language. For supported values, refer to [Post-meeting supported languages](#post-meeting-supported-languages). If `transcribe_on_end` is not set, RealtimeKit does not generate a post-meeting transcript.

### Post-meeting supported languages

Post-meeting transcription supports [Whisper Large v3 Turbo](https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/) language codes. Omit `ai_config.transcription.language` to let Whisper detect the spoken language.

Common language codes include:

| Language | Code | Language | Code | Language   | Code |
| -------- | ---- | -------- | ---- | ---------- | ---- |
| English  | en   | Spanish  | es   | French     | fr   |
| German   | de   | Hindi    | hi   | Portuguese | pt   |
| Japanese | ja   | Italian  | it   | Dutch      | nl   |
| Russian  | ru   | Chinese  | zh   | Cantonese  | yue  |

Additional post-meeting language codes

| Language          | Code |
| ----------------- | ---- |
| Afrikaans         | af   |
| Albanian          | sq   |
| Amharic           | am   |
| Arabic            | ar   |
| Assamese          | as   |
| Azerbaijani       | az   |
| Bashkir           | ba   |
| Basque            | eu   |
| Belarusian        | be   |
| Bengali           | bn   |
| Bosnian           | bs   |
| Breton            | br   |
| Bulgarian         | bg   |
| Catalan           | ca   |
| Croatian          | hr   |
| Czech             | cs   |
| Danish            | da   |
| Estonian          | et   |
| Faroese           | fo   |
| Finnish           | fi   |
| Galician          | gl   |
| Georgian          | ka   |
| Greek             | el   |
| Gujarati          | gu   |
| Haitian Creole    | ht   |
| Hausa             | ha   |
| Hawaiian          | haw  |
| Hebrew            | he   |
| Hungarian         | hu   |
| Icelandic         | is   |
| Indonesian        | id   |
| Javanese          | jw   |
| Kannada           | kn   |
| Kazakh            | kk   |
| Khmer             | km   |
| Korean            | ko   |
| Lao               | lo   |
| Latin             | la   |
| Latvian           | lv   |
| Lingala           | ln   |
| Lithuanian        | lt   |
| Luxembourgish     | lb   |
| Macedonian        | mk   |
| Malagasy          | mg   |
| Malay             | ms   |
| Malayalam         | ml   |
| Maltese           | mt   |
| Maori             | mi   |
| Marathi           | mr   |
| Mongolian         | mn   |
| Myanmar           | my   |
| Nepali            | ne   |
| Norwegian         | no   |
| Norwegian Nynorsk | nn   |
| Occitan           | oc   |
| Pashto            | ps   |
| Persian           | fa   |
| Polish            | pl   |
| Punjabi           | pa   |
| Romanian          | ro   |
| Sanskrit          | sa   |
| Serbian           | sr   |
| Shona             | sn   |
| Sindhi            | sd   |
| Sinhala           | si   |
| Slovak            | sk   |
| Slovenian         | sl   |
| Somali            | so   |
| Sundanese         | su   |
| Swahili           | sw   |
| Swedish           | sv   |
| Tagalog           | tl   |
| Tajik             | tg   |
| Tamil             | ta   |
| Tatar             | tt   |
| Telugu            | te   |
| Thai              | th   |
| Tibetan           | bo   |
| Turkmen           | tk   |
| Turkish           | tr   |
| Ukrainian         | uk   |
| Urdu              | ur   |
| Uzbek             | uz   |
| Vietnamese        | vi   |
| Welsh             | cy   |
| Yiddish           | yi   |
| Yoruba            | yo   |

### Output formats

Post-meeting transcripts are available in multiple formats. Use CSV or JSON for application workflows, and use SRT or VTT when you need subtitle files.

| Format   | Use case                             |
| -------- | ------------------------------------ |
| **CSV**  | Spreadsheets and data analysis       |
| **JSON** | Programmatic access                  |
| **SRT**  | Video subtitle files                 |
| **VTT**  | Web video captions (<track> element) |

#### Examples

* [ CSV ](#tab-panel-9940)
* [ JSON ](#tab-panel-9941)
* [ SRT ](#tab-panel-9942)

```

"1000","peer-123","user-456","cust-789","Alice","Hello everyone"

"3000","peer-234","user-567","cust-890","Bob","Hi Alice"


```

CSV rows use the following field order: start time in milliseconds, peer ID, user ID, custom participant ID, participant name, and transcript text.

```

[

  {

    "startTime": 1000,

    "endTime": 2500,

    "sentence": "Hello everyone",

    "peerData": {

      "id": "peer-123",

      "userId": "user-456",

      "displayName": "Alice",

      "cpi": "cust-789",

      "joinedAt": "2024-08-07T10:15:29.000Z",

      "leftAt": ""

    }

  }

]


```

```

1

00:00:01,000 --> 00:00:02,500

Alice: Hello everyone


2

00:00:03,000 --> 00:00:04,500

Bob: Hi Alice


```

### Consume post-meeting transcripts

After RealtimeKit finishes processing a post-meeting transcript, you can receive the transcript download URL through a webhook or fetch it with the REST API. Use webhooks for asynchronous backend workflows, and use the REST API when you need to retrieve the transcript for a specific session.

#### Webhook

Configure the `meeting.transcript` event in [RealtimeKit webhooks](https://developers.cloudflare.com/realtime/realtimekit/webhooks/#meetingtranscript):

```

{

  "event": "meeting.transcript",

  "meeting": {

    "id": "bbb8940e-1b97-402a-97d6-2708b7feca41",

    "title": "Weekly sync",

    "endedAt": "2026-06-03T10:30:00.000Z",

    "createdAt": "2026-06-03T10:00:00.000Z",

    "sessionId": "05e57591-d89e-45c9-ae44-08dc1eaad0e0",

    "startedAt": "2026-06-03T10:00:00.000Z",

    "status": "LIVE",

    "organizedBy": {

      "id": "c94c437b-592a-4a39-b9e2-47ef1451e43b",

      "name": "Example organization"

    }

  },

  "transcriptDownloadUrl": "https://example.com/transcript.csv",

  "transcriptDownloadUrlExpiry": "2026-06-10T10:30:00.000Z"

}


```

#### REST API

Refer to [Fetch the complete transcript for a session](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/sessions/methods/get%5Fsession%5Ftranscripts/).

Terminal window

```

curl -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/transcript" \

  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

#### Transcript availability

Transcripts are available for **7 days** after the meeting ends. Download or copy transcript files before the URL expiry time returned by the webhook or REST API.

## Billing and Free plan limits

RealtimeKit's default transcription records each participant's audio track and processes it with Workers AI. Workers AI usage is billed to your Cloudflare account using [audio model pricing](https://developers.cloudflare.com/workers-ai/platform/pricing/#audio-model-pricing), which scales by participant audio minutes, not meeting duration.

On the Workers Free plan, Workers AI includes 10,000 Neurons per day. To use more than 10,000 Neurons per day, upgrade to the [Workers Paid plan](https://developers.cloudflare.com/workers/platform/pricing/#workers). Workers Paid includes the same 10,000 daily free Neurons, then bills additional usage at `$0.011` per 1,000 Neurons.

You can upgrade to the Workers Paid plan in the Cloudflare dashboard under **Manage account**.

RealtimeKit transcription uses these Workers AI audio model rates:

| Transcription mode | Workers AI model                  | Neurons per audio minute |
| ------------------ | --------------------------------- | ------------------------ |
| Post-meeting       | @cf/openai/whisper-large-v3-turbo | 46.63                    |
| Real-time          | @cf/deepgram/nova-3 WebSocket     | 836.36                   |

## Data processing and storage

RealtimeKit transcription is a managed transcription workflow. When transcription is turned on, RealtimeKit processes participant audio with Workers AI and stores [transcript outputs](#output-formats) in RealtimeKit-managed storage.

For real-time transcription, RealtimeKit streams audio from participants with transcription turned on to Workers AI and sends transcript updates to meeting participants during the meeting.

For post-meeting transcription, RealtimeKit processes each participant's audio separately after the meeting ends, creates the final transcript files, and makes them available through a webhook or REST API.

Storage for sensitive workloads

Post-meeting transcription uses RealtimeKit-managed storage for intermediate participant audio tracks and transcript outputs. If you configured external storage for regular recordings, that storage configuration is not used for transcription processing.

For workloads with stricter storage, retention, or processing requirements, use [RealtimeKit recording with custom cloud storage](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/custom-cloud-storage/) instead of managed transcription. You can then run your own transcription pipeline with your preferred infrastructure, access controls, and retention policy.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/#page","headline":"Transcription · Cloudflare Realtime docs","description":"Turn on real-time and post-meeting speech-to-text transcription in RealtimeKit.","url":"https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ai/","name":"AI"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ai/transcription/","name":"Transcription"}}]}
```
