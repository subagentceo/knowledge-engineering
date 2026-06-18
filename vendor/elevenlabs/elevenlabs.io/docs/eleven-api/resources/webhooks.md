> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Webhooks

## Overview

Certain events within ElevenLabs can be configured to trigger webhooks, allowing external applications and systems to receive and process these events as they occur. Currently supported event types include:

| Event type                       | Description                                                  |
| -------------------------------- | ------------------------------------------------------------ |
| `post_call_transcription`        | A Agents Platform call has finished and analysis is complete |
| `voice_removal_notice`           | A shared voice is scheduled to be removed                    |
| `voice_removal_notice_withdrawn` | A shared voice is no longer scheduled for removal            |
| `voice_removed`                  | A shared voice has been removed and is no longer useable     |

## Configuration

Webhooks can be created, disabled and deleted from the general settings page. For users within [Workspaces](/docs/overview/administration/workspaces/overview), only the workspace admins can configure the webhooks for the workspace.

![HMAC webhook configuration](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/9ea298daac1c64eb43c802a12f7824e83accca44ba2edd1d01a39bcd62c0b9d6/assets/images/product-guides/administration/hmacwebhook.png)

After creation, the webhook can be selected to listen for events within product settings such as [Agents Platform](/docs/eleven-agents/workflows/post-call-webhooks).

Webhooks can be disabled from the general settings page at any time. Webhooks that repeatedly fail are auto-disabled if there are 10 or more consecutive failures and the last successful delivery was more than 7 days ago or has never been successfully delivered. Auto-disabled webhooks require re-enabling from the settings page. Webhooks can be deleted if not in use by any products.

## Retries

Webhook retries can be enabled per webhook to automatically reattempt delivery when a request fails. Retries are disabled by default. Enable retries when creating or updating a webhook through the [API](/docs/api-reference/webhooks/create) or in the webhook settings.

Retries are currently only supported for `post_call_transcription` webhooks.

### Retry schedule

When a delivery attempt fails with a retryable error, the system retries up to 5 times with increasing delays between attempts:

| Attempt | Delay      |
| ------- | ---------- |
| 1       | Immediate  |
| 2       | 30 seconds |
| 3       | 2 minutes  |
| 4       | 8 minutes  |
| 5       | 30 minutes |

A small random jitter (up to 10% of the delay) is added to each retry to distribute load and avoid thundering herd problems.

### Retryable errors

Not all failures trigger a retry. Only the following HTTP status codes are considered retryable:

* `5xx` status codes (server errors such as 500, 502, 503, 504).
* `429` (Too Many Requests).
* `408` (Request Timeout).

Request errors in the `4xx` range (such as 400, 401, 403, 404) are **not** retried, since they typically indicate a configuration issue that requires manual correction.

### Per-webhook queue limits

Each webhook is limited to 100 pending retry jobs. If a webhook accumulates more than 100 queued retries, additional jobs are dropped until existing retries are processed. This prevents a single misconfigured webhook from consuming excessive resources.

### Auto-disable behavior

The system tracks consecutive delivery failures for each webhook. A webhook is automatically disabled when both of the following conditions are met:

* 10 or more consecutive delivery failures have occurred.
* The webhook has never been successfully delivered, or the last successful delivery was more than 7 days ago.

When a webhook is auto-disabled, workspace admins receive an email notification. The webhook must be manually re-enabled from the settings page before it resumes delivery.

## Integration

To integrate with webhooks, create an endpoint handler to receive webhook event data as POST requests. After validating the signature, the handler should return HTTP 200 promptly to indicate successful receipt. Repeated failure to return a success response may result in the webhook becoming automatically disabled.

The retry payload is identical to the original delivery attempt. Webhook consumers cannot distinguish between an initial delivery and a retry from the payload alone, so design your handler to be **idempotent** — processing the same event multiple times should produce the same result. Use the `event_timestamp` and event-specific identifiers (such as `conversation_id`) to deduplicate events if needed.

### Top-level fields

| Field             | Type   | Description              |
| ----------------- | ------ | ------------------------ |
| `type`            | string | Type of event            |
| `data`            | object | Data for the event       |
| `event_timestamp` | string | When this event occurred |

## Example webhook payload

```json
{
  "type": "post_call_transcription",
  "event_timestamp": 1739537297,
  "data": {
    "agent_id": "xyz",
    "conversation_id": "abc",
    "status": "done",
    "transcript": [
      {
        "role": "agent",
        "message": "Hey there angelo. How are you?",
        "tool_calls": null,
        "tool_results": null,
        "feedback": null,
        "time_in_call_secs": 0,
        "conversation_turn_metrics": null
      },
      {
        "role": "user",
        "message": "Hey, can you tell me, like, a fun fact about 11 Labs?",
        "tool_calls": null,
        "tool_results": null,
        "feedback": null,
        "time_in_call_secs": 2,
        "conversation_turn_metrics": null
      },
      {
        "role": "agent",
        "message": "I do not have access to fun facts about Eleven Labs. However, I can share some general information about the company. Eleven Labs is an AI voice technology platform that specializes in voice cloning and text-to-speech...",
        "tool_calls": null,
        "tool_results": null,
        "feedback": null,
        "time_in_call_secs": 9,
        "conversation_turn_metrics": {
          "convai_llm_service_ttfb": {
            "elapsed_time": 0.3704247010173276
          },
          "convai_llm_service_ttf_sentence": {
            "elapsed_time": 0.5551181449554861
          }
        }
      }
    ],
    "metadata": {
      "start_time_unix_secs": 1739537297,
      "call_duration_secs": 22,
      "cost": 296,
      "deletion_settings": {
        "deletion_time_unix_secs": 1802609320,
        "deleted_logs_at_time_unix_secs": null,
        "deleted_audio_at_time_unix_secs": null,
        "deleted_transcript_at_time_unix_secs": null,
        "delete_transcript_and_pii": true,
        "delete_audio": true
      },
      "feedback": {
        "overall_score": null,
        "likes": 0,
        "dislikes": 0
      },
      "authorization_method": "authorization_header",
      "charging": {
        "dev_discount": true
      },
      "termination_reason": ""
    },
    "analysis": {
      "evaluation_criteria_results": {},
      "data_collection_results": {},
      "call_successful": "success",
      "transcript_summary": "The conversation begins with the agent asking how Angelo is, but Angelo redirects the conversation by requesting a fun fact about 11 Labs. The agent acknowledges they don't have specific fun facts about Eleven Labs but offers to provide general information about the company. They briefly describe Eleven Labs as an AI voice technology platform specializing in voice cloning and text-to-speech technology. The conversation is brief and informational, with the agent adapting to the user's request despite not having the exact information asked for."
    },
    "conversation_initiation_client_data": {
      "conversation_config_override": {
        "agent": {
          "prompt": null,
          "first_message": null,
          "language": "en"
        },
        "tts": {
          "voice_id": null
        }
      },
      "custom_llm_extra_body": {},
      "dynamic_variables": {
        "user_name": "angelo"
      }
    }
  }
}
```

## Authentication

It is important for the listener to validate all incoming webhooks. Webhooks currently support authentication via HMAC signatures. Set up HMAC authentication by:

* Securely storing the shared secret generated upon creation of the webhook
* Verifying the ElevenLabs-Signature header in your endpoint using the SDK

The JavaScript SDK exposes `constructEvent`; the Python SDK exposes `construct_event` with **`rawBody`**, **`sig_header`**, and **`secret`** (these are not named `payload` / `signature` in Python). Both verify the signature, validate the timestamp, and parse the JSON payload.

Example webhook handler using FastAPI:

```python
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from elevenlabs.client import ElevenLabs
import os

load_dotenv()

app = FastAPI()
elevenlabs = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

WEBHOOK_SECRET = os.getenv("WEBHOOK_SECRET")

@app.post("/webhook")
async def receive_message(request: Request):
    payload = await request.body()
    signature = request.headers.get("elevenlabs-signature")

    try:
        event = elevenlabs.webhooks.construct_event(
            rawBody=payload.decode("utf-8"),
            sig_header=signature,
            secret=WEBHOOK_SECRET,
        )
    except Exception as e:
        return JSONResponse(content={"error": "Invalid signature"}, status_code=401)

    # construct_event returns a dict (parsed JSON), not an object with attributes
    if event.get("type") == "post_call_transcription":
        print(f"Received transcription: {event.get('data')}")

    return {"status": "received"}
```

Example webhook handler using Express:

```javascript
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import express from 'express';

const app = express();

const elevenlabs = new ElevenLabsClient();
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

// Use express.text() to preserve raw body for signature verification
app.post('/webhook', express.text({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['elevenlabs-signature'];
  const payload = req.body; // Raw string body

  let event;
  try {
    event = await elevenlabs.webhooks.constructEvent(payload, signature, WEBHOOK_SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  // Process the webhook event
  if (event.type === 'post_call_transcription') {
    console.log('Received transcription:', event.data);
  }

  res.status(200).json({ received: true });
});
```

Example webhook handler using Next.js API route:

```typescript app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const elevenlabs = new ElevenLabsClient();
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('elevenlabs-signature');

  let event;
  try {
    event = await elevenlabs.webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // Process the webhook event
  if (event.type === 'post_call_transcription') {
    console.log('Received transcription:', event.data);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
```