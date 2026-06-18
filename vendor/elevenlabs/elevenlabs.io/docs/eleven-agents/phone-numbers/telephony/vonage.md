> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Vonage integration

## Overview

Connect ElevenLabs Agents to Vonage Voice API or Video API calls using a [WebSocket connector application](https://github.com/nexmo-se/elevenlabs-agent-ws-connector). This enables real-time, bi-directional audio streaming for use cases like PSTN calls, SIP trunks, and WebRTC clients.

## How it works

The Node.js connector bridges Vonage and ElevenLabs:

1. Vonage initiates a WebSocket connection to the connector for an active call.
2. The connector establishes a WebSocket connection to the ElevenLabs Agents endpoint.
3. Audio is relayed: Vonage (L16) -> Connector -> ElevenLabs (base64) and vice-versa.
4. The connector manages conversation events (`user_transcript`, `agent_response`, `interruption`).

## Setup

### 1. Get ElevenLabs credentials

* **API Key**: API keys are located in the [API Keys tab on the Developers page](https://elevenlabs.io/app/developers) which can be found linked in the sidebar.
* **Agent ID**: Find the agent in the [ElevenAgents dashboard](https://elevenlabs.io/app/agents/agents/). Once you have selected the agent click on the settings button and select "Copy Agent ID".

### 2. Configure the connector

Clone the repository and set up the environment file.

```bash
git clone https://github.com/nexmo-se/elevenlabs-agent-ws-connector.git
cd elevenlabs-agent-ws-connector
cp .env.example .env
```

Add your credentials to `.env`:

```bash title=".env"
ELEVENLABS_API_KEY = YOUR_API_KEY;
ELEVENLABS_AGENT_ID = YOUR_AGENT_ID;
```

Install dependencies: `npm install`.

### 3. Expose the connector (local development)

Use ngrok, or a similar service, to create a public URL for the connector (default port 6000).

```bash
ngrok http 6000
```

Note the public `Forwarding` URL (e.g., `xxxxxxxx.ngrok-free.app`). **Do not include `https://`** when configuring Vonage.

### 4. Run the connector

Start the application:

```bash
node elevenlabs-agent-ws-connector.cjs
```

### 5. Configure Vonage voice application

Your Vonage app needs to connect to the connector's WebSocket endpoint (`wss://YOUR_CONNECTOR_HOSTNAME/socket`). This is the ngrok URL from step 3.

* **Use Sample App**: Configure the [sample Vonage app](https://github.com/nexmo-se/voice-to-ai-engines) with `PROCESSOR_SERVER` set to your connector's hostname.
* **Update Existing App**: Modify your [Nexmo Call Control Object](https://developer.vonage.com/en/voice/voice-api/ncco-reference) to include a `connect` action targeting the connector's WebSocket URI (`wss://...`) with `content-type: audio/l16;rate=16000`. Pass necessary query parameters like `peer_uuid` and `webhook_url`.

### 6. Test

Make an inbound or outbound call via your Vonage application to interact with the ElevenLabs agent.

## Cloud deployment

For production, deploy the connector to a stable hosting provider (e.g., Vonage Cloud Runtime) with a public hostname.