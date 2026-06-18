> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# OpenTelemetry traces

ElevenLabs Agents can export conversations as **OpenTelemetry traces** encoded as **OTLP JSON** (`resourceSpans`). Forward them to Datadog, Grafana Tempo, Honeycomb, or any backend that ingests OTLP.

ElevenLabs does not push traces directly to your OTLP collector. You receive OTLP-shaped JSON from
a webhook, API, or monitoring WebSocket and forward it to your backend.

## Overview

Export traces from three surfaces. All three share the same **trace ID per conversation** and `elevenlabs.*` attribute naming. Span shape and timing differ between post-call/GET (transcript-based) and monitoring (event-based).

### Export surfaces

| Surface              | When you get data                                  | Best for                                         |
| -------------------- | -------------------------------------------------- | ------------------------------------------------ |
| Post-call webhook    | After the conversation ends and analysis completes | Batch pipelines, billing and QA, durable storage |
| GET conversation API | On demand, after the conversation exists           | Backfill, debugging, re-processing               |
| Monitoring WebSocket | During a live conversation                         | Live dashboards, alerting, human-in-the-loop     |

### Choosing a surface

* **Every completed call in your data warehouse**: post-call webhook
* **One-off export or repair**: GET conversation with `format=opentelemetry`
* **Live supervisor UI or alerting**: monitoring WebSocket
* **Full fidelity timeline after the fact**: post-call webhook or GET conversation
* **Tool, MCP, or guardrail events as they happen**: monitoring WebSocket

Use `traceId` or `elevenlabs.conversation_id` to join data across surfaces. Combine monitoring for live operations, webhooks for durable analytics, and GET for backfill.

You need an OTLP-capable collector or observability vendor for every surface. Post-call webhooks require a workspace webhook endpoint. The GET API and monitoring WebSocket each have their own API key scopes and setup; see the sections below.

## Post-call webhook

After a conversation finishes, ElevenLabs sends a `POST` request when a post-call webhook is configured, `events` includes `transcript`, and `transcript_format` is `opentelemetry`.

The webhook `type` is `post_call_transcription_otel` (not `post_call_transcription`, which returns JSON transcripts).

### Webhook payload

```json
{
  "type": "post_call_transcription_otel",
  "event_timestamp": 1700000000,
  "data": {
    "conversation_id": "conv_9001k1zph3fkeh5s8xg9z90swaqa",
    "agent_id": "agent_7101k5zvyjhmfg983brhmhkd98n6",
    "otlp_traces": {
      "resourceSpans": []
    }
  }
}
```

### Enable OpenTelemetry transcripts

### Create a workspace webhook

In the ElevenAgents Dashboard, create a workspace webhook with your HTTPS URL and authentication.

### Attach the post-call webhook

Open [Agents settings](https://elevenlabs.io/app/agents/settings), assign the webhook as the post-call webhook, enable the **Transcript** event, and turn on **OpenTelemetry transcript payloads**.

![Post-call webhook settings](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/f5edf1792c3791281ade98202614e51d7e93b7b3f6e25db1fdb261d71c13b5ef/assets/images/conversational-ai/postcallwebhooksettings.png)

Workspace-wide post-call webhooks are configured in the Dashboard or API tab. Use the CLI to
override webhook settings on a specific agent.

### Pull the agent configuration

```bash
elevenlabs agents pull --agent "<agent-name>"
```

### Edit `agent_configs/<agent-name>.json`

Set `platform_settings.workspace_overrides.webhooks`:

```json
{
  "platform_settings": {
    "workspace_overrides": {
      "webhooks": {
        "post_call_webhook_id": "wh_01jqz7x8y9z0a1b2c3d4e5f6",
        "events": ["transcript"],
        "transcript_format": "opentelemetry"
      }
    }
  }
}
```

### Push your changes

```bash
elevenlabs agents push --agent "<agent-name>"
```

```python title="Python"
import os

from dotenv import load_dotenv
from elevenlabs import ElevenLabs

load_dotenv()
elevenlabs = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

elevenlabs.conversational_ai.settings.update(
    webhooks={
        "post_call_webhook_id": "wh_01jqz7x8y9z0a1b2c3d4e5f6",
        "events": ["transcript"],
        "transcript_format": "opentelemetry",
    },
)
```

```typescript title="TypeScript"
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

await elevenlabs.conversationalAi.settings.update({
  webhooks: {
    postCallWebhookId: "wh_01jqz7x8y9z0a1b2c3d4e5f6",
    events: ["transcript"],
    transcriptFormat: "opentelemetry",
  },
});
```

For a single agent, pass the same `webhooks` object under `platform_settings.workspace_overrides` in [Update agent](/docs/api-reference/agents/update).

OpenTelemetry transcript webhooks do not include audio. Use `post_call_audio` if you need
recordings.

Return **2xx** for success. **4xx** and **5xx** count as failures.

Retries apply to transcript webhooks (including OpenTelemetry) only when **Enable retries** is on
for the workspace webhook. Transient errors (**5xx**, **429**, **408**) retry up to 5 times; **4xx**
does not. Audio webhooks are never retried. Repeated failures can auto-disable the webhook. See
[Post-call webhooks](/docs/eleven-agents/workflows/post-call-webhooks) for details and HIPAA
exceptions.

### Delivery

| Topic   | Detail                                                                                  |
| ------- | --------------------------------------------------------------------------------------- |
| Method  | `POST` with JSON body                                                                   |
| Auth    | `ElevenLabs-Signature: t={unix},v0={hmac}` over `{timestamp}.{body}`                    |
| Retries | Transcript webhooks only; requires **Enable retries** on the webhook; see warning above |
| Size    | Long tool parameters and results truncate at 4 KB per span attribute                    |

### Trace shape

Each delivery is one complete trace: a root span plus children.

```text
elevenlabs.conversation
├── elevenlabs.recv.user_transcript
├── elevenlabs.recv.agent_response
│   └── elevenlabs.tool.{name}
└── ...
```

Timing comes from transcript `time_in_call_secs` and call metadata. The root span sets `elevenlabs.source` = `post_call_webhook` and status `ERROR` when the call did not end with a normal client disconnect.

## GET conversation

Request OpenTelemetry format on [Get conversation](/docs/api-reference/conversations/get) to receive the same `otlp_traces` object as the post-call OpenTelemetry webhook, plus the full conversation model.

```http
GET /v1/convai/conversations/{conversation_id}?format=opentelemetry
```

Requires an API key with `CONVAI_READ`. With `format=json` (default), `otlp_traces` is omitted.

```json
{
  "conversation_id": "conv_9001k1zph3fkeh5s8xg9z90swaqa",
  "agent_id": "agent_7101k5zvyjhmfg983brhmhkd98n6",
  "status": "done",
  "transcript": [],
  "otlp_traces": {
    "resourceSpans": []
  }
}
```

| Topic      | Detail                                                       |
| ---------- | ------------------------------------------------------------ |
| Timing     | Same transcript-based builder as the post-call webhook       |
| Transcript | `transcript` is still returned; `otlp_traces` is additive    |
| File URLs  | Signed URLs in span attributes expire after about 15 minutes |

```python title="Python"
import os

from dotenv import load_dotenv
from elevenlabs import ElevenLabs

load_dotenv()
elevenlabs = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

conversation = elevenlabs.conversational_ai.conversations.get(
    conversation_id="conv_9001k1zph3fkeh5s8xg9z90swaqa",
    format="opentelemetry",
)

otlp_traces = conversation.otlp_traces
```

```typescript title="TypeScript"
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

const conversation = await elevenlabs.conversationalAi.conversations.get({
  conversationId: "conv_9001k1zph3fkeh5s8xg9z90swaqa",
  format: "opentelemetry",
});

const otlpTraces = conversation.otlpTraces;
```

```bash title="cURL"
curl -s "https://api.elevenlabs.io/v1/convai/conversations/conv_9001k1zph3fkeh5s8xg9z90swaqa?format=opentelemetry" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  | jq '.otlp_traces.resourceSpans[0].scopeSpans[0].spans[].name'
```

Expected span names include `elevenlabs.conversation`, `elevenlabs.recv.user_transcript`, and `elevenlabs.recv.agent_response`.

## Monitoring WebSocket

Real-time monitoring requires an Enterprise workspace or the `realtime-monitoring` feature flag.
See [Real-time monitoring](/docs/eleven-agents/guides/realtime-monitoring) for configuration,
control commands, and access requirements.

Stream OpenTelemetry trace data as OTLP JSON while a conversation is in progress. Each message is a small `resourceSpans` batch, not one end-of-call trace.

```
wss://api.elevenlabs.io/v1/convai/conversations/{conversation_id}/monitor?events_format=opentelemetry
```

Authentication requires `CONVAI_WRITE`, `xi-api-key` (or `Authorization`), and **EDITOR** access on the agent workspace. Connect after the conversation starts.

### Enable monitoring on the agent

Set `monitoring_enabled: true` and configure `monitoring_events` before the call. See [Real-time monitoring](/docs/eleven-agents/guides/realtime-monitoring#configuration).

### Connect with OpenTelemetry format

Append `events_format=opentelemetry` to the monitoring WebSocket URL.

VAD, turn probability, and ping events are not available when custom `monitoring_events` are
configured. The stream includes text and metadata only, not raw audio.

### Session protocol

1. Connect with authentication headers.
2. Receive `{"type": "connected"}`.
3. Receive a root span batch (`elevenlabs.conversation`, `elevenlabs.source` = `monitoring`).
4. Receive cached history (around the last 100 events), then `{"type": "history_complete"}`.
5. Receive live span batches as events occur.

With `events_format=json` (default), the WebSocket returns raw client events instead of `resourceSpans`. Control commands match [Real-time monitoring](/docs/eleven-agents/guides/realtime-monitoring#control-commands).

### Trace shape

```text
elevenlabs.conversation
├── elevenlabs.turn.0
│   ├── elevenlabs.event.user_transcript
│   └── elevenlabs.tool.{name}
└── elevenlabs.turn.1
```

| Aspect        | Post-call and GET                | Monitoring                                          |
| ------------- | -------------------------------- | --------------------------------------------------- |
| Granularity   | One trace per webhook or request | Many messages per conversation                      |
| Event spans   | Transcript turns                 | `elevenlabs.event.{type}`                           |
| Turn grouping | Implicit in transcript order     | Explicit `elevenlabs.turn.N`                        |
| Order         | Stable transcript order          | Events may arrive out of strict chronological order |

Structured events map to dedicated attributes (for example `elevenlabs.user.text`, `elevenlabs.agent.text`). Unknown events use `elevenlabs.event.data` with truncated JSON.

Do not assume event order matches speaking order. Correlate live spans with post-call data using
the same `traceId`.

### Example connection

```typescript title="TypeScript"
import WebSocket from "ws";

const ws = new WebSocket(
  "wss://api.elevenlabs.io/v1/convai/conversations/conv_9001k1zph3fkeh5s8xg9z90swaqa/monitor?events_format=opentelemetry",
  {
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY!,
    },
  }
);

ws.on("message", (raw) => {
  const msg = JSON.parse(raw.toString());
  if (msg.type === "connected" || msg.type === "history_complete") return;

  if (msg.resourceSpans) {
    forwardToCollector({ resourceSpans: msg.resourceSpans });
  }
});
```

```python title="Python"
import asyncio
import json
import os

import websockets
from dotenv import load_dotenv

load_dotenv()

async def monitor_opentelemetry():
    uri = (
        "wss://api.elevenlabs.io/v1/convai/conversations/conv_9001k1zph3fkeh5s8xg9z90swaqa/monitor"
        "?events_format=opentelemetry"
    )
    headers = {"xi-api-key": os.getenv("ELEVENLABS_API_KEY")}

    async with websockets.connect(uri, extra_headers=headers) as ws:
        async for raw in ws:
            msg = json.loads(raw)
            if msg.get("type") in ("connected", "history_complete"):
                continue
            if msg.get("resourceSpans"):
                forward_to_collector({"resourceSpans": msg["resourceSpans"]})

asyncio.run(monitor_opentelemetry())
```

## OTLP JSON structure

OpenTelemetry traces from all surfaces share the same OTLP JSON batch layout:

```json
{
  "resourceSpans": [
    {
      "resource": {
        "attributes": [
          { "key": "service.name", "value": { "stringValue": "elevenlabs-convai" } },
          {
            "key": "elevenlabs.conversation_id",
            "value": { "stringValue": "conv_9001k1zph3fkeh5s8xg9z90swaqa" }
          }
        ]
      },
      "scopeSpans": [
        {
          "scope": { "name": "elevenlabs.convai", "version": "1.0.0" },
          "spans": [
            {
              "traceId": "32_hex_chars",
              "spanId": "16_hex_chars",
              "name": "elevenlabs.recv.agent_response",
              "startTimeUnixNano": "1700000000000000000",
              "endTimeUnixNano": "1700000001000000000",
              "status": { "code": 1 }
            }
          ]
        }
      ]
    }
  ]
}
```

## Limitations

* No direct push to your OTLP gRPC endpoint.
* Payloads are JSON shaped like OTLP export, not raw protobuf on the wire.

## Related documentation

* [Post-call webhooks](/docs/eleven-agents/workflows/post-call-webhooks)
* [Real-time monitoring](/docs/eleven-agents/guides/realtime-monitoring)