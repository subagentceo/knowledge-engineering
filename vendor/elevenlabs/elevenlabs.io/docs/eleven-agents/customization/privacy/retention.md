> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Retention

**Retention** settings allow you to configure how long your conversational agent stores conversation transcripts and audio recordings. These settings help you comply with data privacy regulations.

## Overview

By default, ElevenLabs retains conversation data for 2 years. You can modify this period to:

* Any number of days (e.g., 30, 90, 365)
* Unlimited retention by setting the value to -1
* Scheduled deletion by setting the value to 0

The retention settings apply separately to:

* **Conversation transcripts**: Text records of all interactions
* **Audio recordings**: Voice recordings from both the user and agent

For GDPR compliance, we recommend setting retention periods that align with your data processing
purposes. For HIPAA compliance, retain records for a minimum of 6 years.

## Modifying retention settings

### Prerequisites

* An [ElevenLabs account](https://elevenlabs.io)
* A configured ElevenLabs Conversational Agent ([create one here](/docs/eleven-agents/quickstart))

Navigate to your agent's settings and select the "Advanced" tab. The retention settings are located in the "Data Retention" section.

![Enable overrides](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/39019a60151b8d999d5e1719e1553508a91c3bf7a34e6f5729ea2942c3dc4d57/assets/images/conversational-ai/retention.png)

1. Enter the desired retention period in days
2. Choose whether to apply changes to existing data
3. Click "Save" to confirm changes

![Enable overrides](https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/a5d069a0957ee06672aab4a8784362a72ed7d3f055d548eb54b32998ec246aad/assets/images/conversational-ai/retention-apply-existing.png)

When modifying retention settings, you'll have the option to apply the new retention period to existing conversation data or only to new conversations going forward.

```bash
elevenlabs agents pull --agent "<agent-name>"
```

Set `platform_settings.privacy.retention_days`:

```json
{
  "platform_settings": {
    "privacy": {
      "retention_days": 30
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
        "privacy": {"retention_days": 30},
    },
)
```

```typescript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient();

await elevenlabs.conversationalAi.agents.update("agent_7101k5zvyjhmfg983brhmhkd98n6", {
  platformSettings: {
    privacy: { retentionDays: 30 },
  },
});
```

Reducing the retention period may result in immediate deletion of data older than the new
retention period if you choose to apply changes to existing data.