> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# ElevenAgents

Agents accomplish tasks through natural dialogue - from quick requests to complex, open-ended workflows. ElevenLabs provides voice-rich, expressive models, developer tools for building multimodal agents, and tools to monitor and evaluate agent performance at scale.

<a href="/docs/eleven-agents/build/overview">
  <img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/b01da89ad7994300673d0932d321cd0f53fe727b6210e6c1f00e765e498f8722/assets/images/agents/agents-overview-build.png" alt="" />

  <h3>
    Configure
  </h3>

  <p>
    Configure multimodal agents with our developer toolkit, dashboard, or visual workflow
    builder
  </p>
</a>

<a href="/docs/eleven-agents/integrate/overview">
  <img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/17a81505a62493491ead763b307b1e854825a0da67ab1a1d86b41b57ad87bc73/assets/images/agents/agents-overview-integrate.png" alt="" />

  <h3>
    Deploy
  </h3>

  <p>
    Integrate multimodal agents across telephony systems, web, and mobile
  </p>
</a>

<a href="/docs/eleven-agents/operate/overview">
  <img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/3790a000d203429c852cd4be74f2635ea41222f31b0edb53ae760c61e4a0f07d/assets/images/agents/agents-overview-operate.png" alt="" />

  <h3>
    Monitor
  </h3>

  <p>
    Evaluate agent performance with built-in testing, evals, and analytics
  </p>
</a>

## Platform capabilities

From design to deployment to optimization, ElevenLabs provides everything you need to build agents at scale.

### Design and configure

| Goal                          | Guide                                                                    | Description                                                            |
| ----------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Create conversation workflows | [Workflows](/docs/eleven-agents/customization/agent-workflows)           | Build multi-step workflows with visual workflow builder                |
| Write system prompts          | [System prompt](/docs/eleven-agents/best-practices/prompting-guide)      | Learn best practices for crafting effective agent prompts              |
| Select language model         | [Models](/docs/eleven-agents/customization/llm)                          | Choose from supported LLMs or bring your own custom model              |
| Control conversation flow     | [Conversation flow](/docs/eleven-agents/customization/conversation-flow) | Configure turn-taking, interruptions, and timeout settings             |
| Configure voice & language    | [Voice & language](/docs/eleven-agents/customization/voice)              | Select from 5k+ voices across 31 languages with customization options  |
| Add knowledge to agent        | [Knowledge base](/docs/eleven-agents/customization/knowledge-base)       | Upload documents and enable RAG for grounded responses                 |
| Connect tools                 | [Tools](/docs/eleven-agents/customization/tools)                         | Enable agents to call clients & APIs to perform actions                |
| Personalize each conversation | [Personalization](/docs/eleven-agents/customization/personalization)     | Use dynamic variables and overrides for per-conversation customization |
| Secure agent access           | [Authentication](/docs/eleven-agents/customization/authentication)       | Implement custom authentication for protected agent access             |

### Connect and deploy

| Goal                        | Guide                                                                             | Description                                                        |
| --------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Build with React components | [ElevenLabs UI](https://ui.elevenlabs.io)                                         | Pre-built components library for audio & agent apps (shadcn-based) |
| Embed widget in website     | [Widget](/docs/eleven-agents/customization/widget)                                | Add a customizable web widget to any website                       |
| Build React web apps        | [React SDK](/docs/eleven-agents/libraries/react)                                  | Voice-enabled React hooks and components                           |
| Build iOS apps              | [Swift SDK](/docs/eleven-agents/libraries/swift)                                  | Native iOS SDK for voice agents                                    |
| Build Android apps          | [Kotlin SDK](/docs/eleven-agents/libraries/kotlin)                                | Native Android SDK for voice agents                                |
| Build React Native apps     | [React Native SDK](/docs/eleven-agents/libraries/react-native)                    | Cross-platform iOS and Android with React Native                   |
| Connect via SIP trunk       | [SIP trunk](/docs/eleven-agents/phone-numbers/sip-trunking)                       | Integrate with existing telephony infrastructure                   |
| Make batch outbound calls   | [Batch calls](/docs/eleven-agents/phone-numbers/batch-calls)                      | Trigger multiple calls programmatically                            |
| Use Twilio integration      | [Twilio](/docs/eleven-agents/phone-numbers/twilio-integration/native-integration) | Native Twilio integration for phone calls                          |
| Build custom integrations   | [WebSocket API](/docs/eleven-agents/libraries/web-sockets)                        | Low-level WebSocket protocol for custom implementations            |
| Receive real-time events    | [Events](/docs/eleven-agents/customization/events)                                | Subscribe to conversation events and updates                       |

### Monitor and optimize

| Goal                         | Guide                                                                                    | Description                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| List users by external ID    | [Users](/docs/eleven-agents/operate/users)                                               | See end users and open their conversations           |
| Search transcripts           | [Searching conversations](/docs/eleven-agents/customization/agent-analysis/smart-search) | Keyword and semantic search in Conversation history  |
| Run A/B tests                | [Experiments](/docs/eleven-agents/operate/experiments)                                   | Test agent configuration changes with live traffic   |
| Test agent behavior          | [Testing](/docs/eleven-agents/customization/agent-testing)                               | Create and run automated tests for your agents       |
| Analyze conversation quality | [Conversation analysis](/docs/eleven-agents/customization/agent-analysis)                | Extract insights and evaluate conversation outcomes  |
| Track metrics & analytics    | [Analytics](/docs/eleven-agents/dashboard)                                               | Monitor performance metrics and conversation history |
| Configure data retention     | [Privacy](/docs/eleven-agents/customization/privacy)                                     | Set retention policies for conversations and audio   |
| Reduce LLM costs             | [Cost optimization](/docs/eleven-agents/customization/llm/optimizing-costs)              | Monitor and optimize language model expenses         |

## Architecture

ElevenAgents coordinates 4 core components:

1. A fine-tuned Speech to Text (ASR) model for speech recognition
2. Your choice of language model or [custom](/docs/eleven-agents/customization/llm/custom-llm) LLM
3. A low-latency Text to Speech (TTS) model across 5k+ voices and 70+ languages
4. A proprietary turn-taking model that handles conversation timing

Build your first agent in 5 minutes