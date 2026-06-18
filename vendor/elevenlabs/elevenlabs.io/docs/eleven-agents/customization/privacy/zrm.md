> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Zero Retention Mode (per-agent)

## Overview

Zero Retention Mode (ZRM) enhances data privacy by ensuring that no Personally Identifiable Information (PII) is logged during or stored after a call. This feature can be enabled on a per-agent basis for workspaces that do not have ZRM enforced globally. For workspaces with global ZRM enabled, all agents will automatically operate in Zero Retention Mode.

When ZRM is active for an agent:

* No call recordings will be stored.
* No transcripts or call metadata containing PII will be logged or stored by our systems post-call.

For more information about setting your workspace to have Zero Retention Mode across all eligible ElevenLabs products, see our [Zero Retention Mode](/docs/eleven-api/resources/zero-retention-mode) documentation.

For workspaces where Zero Retention Mode is enforced globally, this setting will be automatically
enabled for all agents and cannot be disabled on a per-agent basis.

To retrieve information about calls made with ZRM-enabled agents, you must use [post-call webhooks](/docs/eleven-agents/workflows/post-call-webhooks).

Enabling Zero Retention Mode may impact ElevenLabs' ability to debug call-related issues for the
specific agent, as limited logs or call data will be available for review.

## How to Enable ZRM per Agent

For workspaces not operating under global Zero Retention Mode, you can enable ZRM for individual agents:

Open your agent in the dashboard, navigate to the **Privacy** settings block, select the **Advanced** tab, and toggle **Zero Retention Mode** on. Save your changes.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/b11c36caf8829dd90829c3b51df2be879a77f718834af8988ecd33e9ae44a071/assets/images/conversational-ai/enabled-zrm.png" alt="Enable Zero Retention Mode for Agent" />

```bash
elevenlabs agents pull --agent "<agent-name>"
```

Set `platform_settings.privacy.zero_retention_mode`:

```json
{
  "platform_settings": {
    "privacy": {
      "zero_retention_mode": true
    }
  }
}
```

```bash
elevenlabs agents push --agent "<agent-name>"
```

```python
from elevenlabs import ElevenLabs

elevenlabs = ElevenLabs()

elevenlabs.conversational_ai.agents.update(
    agent_id="agent_7101k5zvyjhmfg983brhmhkd98n6",
    platform_settings={
        "privacy": {"zero_retention_mode": True},
    },
)
```

```typescript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient();

await elevenlabs.conversationalAi.agents.update("agent_7101k5zvyjhmfg983brhmhkd98n6", {
  platformSettings: {
    privacy: { zeroRetentionMode: true },
  },
});
```