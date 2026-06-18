> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Burst pricing

## Overview

Burst pricing allows your ElevenLabs agents to temporarily exceed your workspace's subscription concurrency limit during high-demand periods. When enabled, your agents can handle up to 3 times your normal concurrency limit, with excess calls charged at double the standard rate.

This feature helps prevent missed calls during traffic spikes while maintaining cost predictability for your regular usage patterns.

## How burst pricing works

When burst pricing is enabled for an agent:

1. **Normal capacity**: Calls within your subscription limit are charged at standard rates
2. **Burst capacity**: Additional calls (up to a concurrency of 3x your usual limit or 300, whichever is lower) are accepted but charged at 2x the normal rate
3. **Over-capacity rejection**: Calls exceeding the burst limit are rejected with an error

### Capacity calculations

| Subscription limit | Burst capacity | Maximum concurrent calls |
| ------------------ | -------------- | ------------------------ |
| 10 calls           | 30 calls       | 30 calls                 |
| 50 calls           | 150 calls      | 150 calls                |
| 100 calls          | 300 calls      | 300 calls                |
| 200 calls          | 300 calls      | 300 calls (capped)       |

For non-enterprise customers, the maximum burst currency can not go above 300.

## Cost implications

Burst pricing follows a tiered charging model:

* **Within subscription limit**: Standard per-minute rates apply
* **Burst calls**: Charged at 2x the standard rate
* **Deprioritized processing**: Burst calls receive lower priority for speech-to-text and text-to-speech processing

### Example pricing scenario

For a workspace with a 20-call subscription limit:

* Calls 1-20: Standard rate (e.g., \$0.08/minute)
* Calls 21-60: Double rate (e.g., \$0.16/minute)
* Calls 61+: Rejected

Burst calls are deprioritized and may experience higher latency for speech processing, similar to
anonymous-tier requests.

## Configuration

Burst pricing is configured per agent in the call limits settings.

Open your agent in the dashboard, navigate to the **Advanced** tab, scroll to **Call Limits**, and toggle on **Burst pricing**. Save your changes.

```bash
elevenlabs agents pull --agent "<agent-name>"
```

Set `platform_settings.call_limits.bursting_enabled`:

```json
{
  "platform_settings": {
    "call_limits": {
      "agent_concurrency_limit": -1,
      "daily_limit": 1000,
      "bursting_enabled": true
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
        "call_limits": {
            "agent_concurrency_limit": -1,
            "daily_limit": 1000,
            "bursting_enabled": True,
        },
    },
)
```

```typescript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient();

await elevenlabs.conversationalAi.agents.update("agent_7101k5zvyjhmfg983brhmhkd98n6", {
  platformSettings: {
    callLimits: {
      agentConcurrencyLimit: -1,
      dailyLimit: 1000,
      burstingEnabled: true,
    },
  },
});
```