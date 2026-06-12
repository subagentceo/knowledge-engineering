> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Data residency

Data residency is an Enterprise feature. For details on enabling this for your organization,
please see the "Getting Access" section below.

## Overview

ElevenLabs offers "data residency" through isolated environments in certain jurisdictions, allowing customers to limit data storage to those locations. As a standard, ElevenLabs' customer data is hosted/stored in the U.S., however ElevenLabs has released additional storage locations in the EU, India, and Singapore.

Depending on the customer's location, isolated environments in a particular region may also provide the benefit of reduced latency.

## Data residency in isolated environments

ElevenLabs offers data residency in certain jurisdictions to allow customers to choose where their data is stored. While storage will take place in the selected location, processing may nevertheless occur outside of the selected location, including by ElevenLabs' international affiliates and subprocessors, for support purposes, and for content moderation purposes. This detail is captured within ElevenLabs' Data Processing Agreement.

In certain locations, configurations may be available to limit processing to the selected residency location. For example, with respect to EU residency, users may restrict processing to the EU by using Zero Retention Mode and the API. In such case, content submitted to the Service will not be processed outside of the EU, provided the use of certain optional integrations (ex. Custom LLMs or post-call webhooks that require out-of-region processing) may result in processing outside of such jurisdiction.

## Existing core compliance features

Isolated environments complement ElevenLabs' existing suite of security and compliance measures designed to safeguard customer data:

**GDPR Compliance**: Our platform and practices are designed to align with applicable GDPR requirements, including measures designed to ensure lawful data processing, adherence to data subject rights, and the implementation of appropriate security measures as required by GDPR.

**SOC2 Certification**: ElevenLabs maintains SOC2 certification, demonstrating our commitment to high standards for security, availability and confidentiality.

**Zero Retention Mode (Optional)**: Customers can enable Zero Retention Mode, ensuring that sensitive content and data processed by our models are not retained on ElevenLabs servers. This is a powerful feature for minimizing data footprint.

**End-to-End Encryption**: Data transmitted to and from ElevenLabs models is protected by end-to-end encryption, securing it in transit.

**HIPAA Compliance**: For qualifying healthcare enterprises, ElevenLabs offers Business Associate Agreements (BAAs), which offer additional protections in relation to its HIPAA-Eligible Services.

## Developer considerations

Isolated environments are completely separate ElevenLabs workspaces, available via a different address on the web. As such, you will need to get access to this feature first to be able to sign in to an isolated environment with data residency.

### EU

* **Web**: [https://eu.residency.elevenlabs.io](https://eu.residency.elevenlabs.io)
* **API**: `https://api.eu.residency.elevenlabs.io`
* **WebSockets**: `wss://api.eu.residency.elevenlabs.io`

### India

* **Web**: [https://in.residency.elevenlabs.io](https://in.residency.elevenlabs.io)
* **API**: `https://api.in.residency.elevenlabs.io`
* **WebSockets**: `wss://api.in.residency.elevenlabs.io`

### Singapore

* **Web**: [https://sg.residency.elevenlabs.io](https://sg.residency.elevenlabs.io)
* **API**: `https://api.sg.residency.elevenlabs.io`
* **WebSockets**: `wss://api.sg.residency.elevenlabs.io`

Your account on the isolated environment will be separate to the one on elevenlabs.io, and your workspace will be blank. This means that when using an isolated environment via API, you will need to hit a different API URL with a different API key.

### SDK configuration

When using ElevenLabs SDKs, you can specify the environment to connect to an isolated region. Below are examples for each SDK.

```python
from elevenlabs import ElevenLabs, ElevenLabsEnvironment

# e.g. EU data residency
client = ElevenLabs(
    api_key="your-api-key",
    environment=ElevenLabsEnvironment.PRODUCTION_EU
)

```

```typescript
import { ElevenLabsClient, ElevenLabsEnvironment } from "@elevenlabs/elevenlabs-js";

// e.g. For EU data residency
const client = new ElevenLabsClient({
  apiKey: "your-api-key",
  environment: ElevenLabsEnvironment.ProductionEu,
});
```

```javascript
import { Conversation } from "@elevenlabs/client";

// e.g. For EU data residency
const conversation = await Conversation.startSession({
  agentId: "<your-agent-id>",
  origin: "https://api.eu.residency.elevenlabs.io",
  // Required when using WebRTC transport
  livekitUrl: "wss://livekit.rtc.eu.residency.elevenlabs.io"
});
```

```tsx
import { useConversation } from "@elevenlabs/react";

// e.g. For EU data residency
const conversation = useConversation({
  serverLocation: "eu-residency",
});
```

For more details on the React SDK, see the [React SDK documentation](/docs/eleven-agents/libraries/react#data-residency).

## Limitations

Currently, ElevenLabs provides limited support for migrating your resources from non-isolated to isolated environments. However, you can enable professional voice clone link sharing from a non-isolated environment and add it to your isolated environment; please refer to the FAQ below for instructions.
Reach out to us if you intend to move instant voice clones. For other resources, such as agents in the Agents Platform, we recommend recreation via the API where possible.

Dubbing is not currently available in isolated environments.

Different regions have different LLMs available depending on model provider availability. Custom LLMs and self-hosted LLMs are always supported. If you intend to use Zero Retention Mode (ZRM), which comes with stricter requirements, reach out to your account team to confirm exactly which models are available in your region.

## Getting access

Data residency is an exclusive feature available to ElevenLabs' Enterprise customers.

**Existing Enterprise Customers**: If you are an existing Enterprise customer, please contact [success@elevenlabs.io](mailto:success@elevenlabs.io) to discuss enabling an isolated environment for your account.

**New Customers**: Organizations interested in ElevenLabs Enterprise and requiring an isolated environment should contact [sales@elevenlabs.io](mailto:sales@elevenlabs.io) to discuss specific needs and implementation.

## FAQ

Yes, it is possible to do this and to bill the usage for both of them on the same invoice. For
more details on unified billing across multiple workspaces, see [consolidated
billing](/docs/overview/administration/consolidated-billing).

For customers subject to GDPR, ElevenLabs provides options to limit storage and, in some cases,
processing to the EU to support customers' compliance efforts.

For users inside the isolated environment region, data residency may potentially reduce latency
due to localized processing. For users outside the isolated environment region, performance is
expected to remain consistent with our global infrastructure. While there may be benefits as it
relates to latency, the purpose of these data residency options are not specifically to improve
latency.

No, Zero Retention Mode is an optional feature that can be enabled separately, even for accounts
with data residency. It provides an additional layer of data minimization by preventing storage of
content on our servers.

Double check that you are using the correct API URL and the correct API key for the account on the
isolated environment.

When you create the ElevenLabs client object, it takes an environment parameter which is by
default US but you can set it to your desired environment. See the [SDK
configuration](#sdk-configuration) section above for code examples in Python, TypeScript,
JavaScript, and React.

To share a PVC with an isolated environment, first enable link sharing for that voice. Then copy
the link, and add the prefix of the isolated environment to the voice link: From:
`elevenlabs.io/...` → To: `eu.residency.elevenlabs.io/...`