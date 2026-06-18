> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Real-time monitoring

Real-time monitoring enables live observation of agent conversations via WebSocket and remote control of active calls. This feature provides real-time visibility into conversation events and allows intervention through control commands.

This is an enterprise-only feature.

## Overview

Monitoring sessions stream conversation events in real-time, including transcripts, agent responses, and corrections. You can also send control commands to end calls, transfer to phone numbers, or enable human takeover during active chat conversations.

## WebSocket endpoint

Connect to a live conversation using the monitoring endpoint:

```
wss://api.elevenlabs.io/v1/convai/conversations/{conversation_id}/monitor
```

Replace `{conversation_id}` with the ID of the conversation you want to monitor.

## Authentication

Authentication requires:

* **API key permissions**: Your API key must have `ElevenLabs Agents Write` scope
* **Workspace access**: You must have `EDITOR` access to the agent's workspace
* **Header format**: Include your API key via the `xi-api-key` header

### Example connection

```javascript
const ws = new WebSocket('wss://api.elevenlabs.io/v1/convai/conversations/conv_123/monitor', {
  headers: {
    'xi-api-key': 'your_api_key_here',
  },
});
```

```python
import websockets
import asyncio

async def monitor_conversation():
    uri = "wss://api.elevenlabs.io/v1/convai/conversations/conv_123/monitor"
    headers = {
        "xi-api-key": "your_api_key_here"
    }

    async with websockets.connect(uri, extra_headers=headers) as websocket:
        # Connection established
        pass
```

## Configuration

Before monitoring conversations, enable the feature in your agent's settings:

### Navigate to agent settings

Open your agent's configuration page in the dashboard.

### Enable monitoring

In the Advanced settings panel, toggle the "Monitoring" option.

![Monitoring toggle in agent settings](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/1a4b5507a39ddf6a517772b8c01ede5f7d12429175fdf89e04c8ba910f646f8e/assets/images/agents/realtime-monitoring-toggle.png)

### Select events

Choose which events you want to monitor. See [Client Events](/docs/eleven-agents/customization/events/client-events) for a full list of available events.

The following events cannot be monitored: VAD scores, turn probability metrics, and pings.

The conversation must be active before you can connect to monitor it. You cannot monitor a
conversation before it begins.

## Control commands

Send JSON commands through the WebSocket to control the conversation:

Terminate the active conversation immediately.

```javascript
// End the active conversation
ws.send(JSON.stringify({
  command_type: "end_call"
}));
```

```python
import json

# End the active conversation
await websocket.send(json.dumps({
    "command_type": "end_call"
}))
```

Transfer the call to a specified phone number.

```javascript
// Transfer to a phone number
ws.send(JSON.stringify({
  command_type: "transfer_to_number",
  parameters: {
    phone_number: "+1234567890"
  }
}));
```

```python
import json

# Transfer to a phone number
await websocket.send(json.dumps({
    "command_type": "transfer_to_number",
    "parameters": {
        "phone_number": "+1234567890"
    }
}))
```

The `transfer_to_number` system tool must already be configured in the agent.

Inject context or instructions into the active conversation so the agent can use the new
information in its responses.

```javascript
// Send a contextual update to the agent
ws.send(JSON.stringify({
  command_type: "contextual_update",
  parameters: {
    contextual_update: "<your update text>"
  }
}));
```

```python
import json

# Send a contextual update to the agent
await websocket.send(json.dumps({
    "command_type": "contextual_update",
    "parameters": {
        "contextual_update": "<your update text>"
    }
}))
```

Switch from AI agent to human operator mode for chat conversations.

```javascript
// Enable human takeover
ws.send(JSON.stringify({
  command_type: "enable_human_takeover"
}));
```

```python
import json

# Enable human takeover
await websocket.send(json.dumps({
    "command_type": "enable_human_takeover"
}))
```

Send a message to the user as a human operator in chat conversations.

```javascript
// Send a message as a human operator
ws.send(JSON.stringify({
  command_type: "send_human_message",
  parameters: {
    text: "How can I help you?"
  }
}));
```

```python
import json

# Send a message as a human operator
await websocket.send(json.dumps({
    "command_type": "send_human_message",
    "parameters": {
        "text": "How can I help you?"
    }
}))
```

Return control from human operator back to the AI agent.

```javascript
// Disable human takeover and return to AI
ws.send(JSON.stringify({
  command_type: "disable_human_takeover"
}));
```

```python
import json

# Disable human takeover and return to AI
await websocket.send(json.dumps({
    "command_type": "disable_human_takeover"
}))
```

## Use cases

Real-time monitoring enables several operational scenarios:

Monitor agent conversations in real-time to ensure quality standards and identify training
opportunities.

Detect conversations requiring human intervention and seamlessly take over from the AI agent.

Build real-time monitoring dashboards that aggregate conversation metrics and performance
indicators.

Supervise multiple agent conversations simultaneously and intervene when necessary.

Implement automated systems that analyze conversation content and trigger actions based on
specific conditions.

Use live conversations as training material and provide real-time feedback to improve agent
performance.

## Limitations

Monitoring events are sent asynchronously to the conversation and may not arrive in the same
order as the core conversation events. When processing events, do not rely on event order to
reconstruct exact conversation timing.

The monitoring endpoint streams only text events and metadata. Raw audio data is not included in
monitoring events.

Only approximately the last 100 events are cached and available when connecting to an active
conversation. Earlier events cannot be retrieved.

VAD scores, turn probability metrics, and ping events cannot be monitored when custom event
selection is enabled.

You must connect after the conversation has started. The monitoring endpoint cannot be used
before conversation initiation.

API keys must have `ElevenLabs Agents Write` scope, and you must have `EDITOR` workspace access
to monitor conversations.

## Related resources

Receive conversation data and analysis after calls complete.

Configure success evaluation and data collection for conversations.

Understand events received during conversational applications.

Learn about the WebSocket API for real-time conversations.