> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Audio saving

**Audio Saving** settings allow you to choose whether recordings of your calls are retained in your call history, on a per-agent basis. This control gives you flexibility over data storage and privacy.

## Overview

By default, audio recordings are enabled. You can modify this setting to:

* **Enable audio saving**: Save call audio for later review.
* **Disable audio saving**: Omit audio recordings from your call history.

Disabling audio saving enhances privacy but limits the ability to review calls. However,
transcripts can still be viewed. To modify transcript retention settings, please refer to the
[retention](/docs/eleven-agents/customization/privacy/retention) documentation.

## Modifying Audio Saving Settings

### Prerequisites

* A configured [ElevenLabs Conversational Agent](/docs/eleven-agents/quickstart)

Find your agent in the ElevenAgents [page](https://elevenlabs.io/app/agents/agents) and select
the "Advanced" tab. The audio saving control is located in the "Privacy Settings" section.

![Disable audio saving option](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/e2f7d92f9128bace5d992e76aa500da7e1bc62d22d423841b774c1e20fcaf891/assets/images/conversational-ai/no-audio-setting.png)

Toggle the control to enable or disable audio saving and click save to confirm your selection.

When audio saving is enabled, calls in the call history allow you to review the audio.

![Call with audio saved](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/871a28d699f54774c3e2695091e9af04948e236afded7807c27ea73bc2a8f71f/assets/images/conversational-ai/audio.png)

When audio saving is disabled, calls in the call history do not include audio.

![Call without audio saved](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/5dffbe46545eda166d48328b21f63ff0a6d3a0a8b05224213307da426ba6e47e/assets/images/conversational-ai/no-audio.png)

```bash
elevenlabs agents pull --agent "<agent-name>"
```

Set `platform_settings.privacy.record_voice`:

```json
{
  "platform_settings": {
    "privacy": {
      "record_voice": false
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
        "privacy": {"record_voice": False},
    },
)
```

```typescript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient();

await elevenlabs.conversationalAi.agents.update("agent_7101k5zvyjhmfg983brhmhkd98n6", {
  platformSettings: {
    privacy: { recordVoice: false },
  },
});
```

Disabling audio saving will prevent new call audio recordings from being stored. Existing
recordings will remain until deleted via [retention
settings](/docs/eleven-agents/customization/privacy/retention).