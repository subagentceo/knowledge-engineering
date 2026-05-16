# Conversation Intelligence (classic)

## Conversation Intelligence (classic)

**Unlock business value from every customer conversation.**
<br />Use AI-powered cross-channel analysis to boost lead generation, spot compliance risks early, and improve agent performance, seamlessly and at scale.

[Get started with Conversation Intelligence (classic)](/docs/conversation-intelligence-classic/onboarding)

## Tutorial

```python !sample
import os
from twilio.rest import Client

account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

transcript = client.intelligence.v2.transcripts.create(
    service_sid="GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    channel={"media_properties": {"source_sid": "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}}
)

print(transcript.account_sid)
```

1. Create an Intelligence Service to transcribe voice calls.
2. Create transcripts from voice calls.
3. Add Language Operators to tag transcripts with the concepts and context that matter most to your business.

Tutorial code output: "Extract insights and automate actions from customer conversations."

[Find more examples](/docs/conversation-intelligence-classic/api/transcript-resource)

## Supported Conversations

| **Channel**   | **Source**                                           | **Description**                                                                                      | **Status**                                                                                                                       |
| ------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Voice**     | Twilio Recordings                                    | Transcribe and analyze Twilio call recordings                                                        | ✅ Available                                                                                                                      |
|               | External Recordings                                  | Transcribe and analyze third-party call recordings                                                   | ✅ Available                                                                                                                      |
|               | Calls                                                | Transcribe calls in real time and send to Conversation Intelligence (classic) for post-call analysis | ✅ Available                                                                                                                      |
|               | Conversation Relay<sup><small> **NEW**</small></sup> | Monitor AI agent performance by analyzing transcripts from Conversation Relay virtual agents         | ✅ Available                                                                                                                      |
| **Messaging** | Conversations<sup><small> **NEW**</small></sup>      | Analyze SMS, WhatsApp, Web Chat, and other text channels supported by the Twilio Conversations API   | 🔒 Private beta<br /><small>[Request access](https://www.twilio.com/en-us/lp/conversational-intelligence-messaging-beta)</small> |

## Next steps

Have an idea in mind? Get it to production.

Pick the docs that are right for you. These guides, overviews, and API reference docs will get you across the deploy line, straight to HTTP `200 OK`.

## Generative Custom Operators are now available.

[Go to Guide](/docs/conversation-intelligence-classic/generative-custom-operators)

Our most advanced and flexible language intelligence yet. Use LLM-powered Language Operators for sophisticated natural language understanding tasks. Now available in Public Beta.

### Get Started

* [Check out the Onboarding guide](/docs/conversation-intelligence-classic/onboarding)
* [Learn more about Language Operators](/docs/conversation-intelligence-classic/language-operators)
* [See a live demo](https://twilio.coastdemo.com/share/66e4881f6e695d0e4dcd0d9e)

### API Reference

* [Dive into the Twilio Conversation Intelligence (classic) API](/docs/conversation-intelligence-classic/api)
* [Learn more about the Intelligence Service Resource](/docs/conversation-intelligence-classic/api/service-resource)
* [Explore the Conversation Intelligence (classic) Transcript Resource](/docs/conversation-intelligence-classic/api/transcript-resource)

### Integration Guides

Twilio offers pre-built web applications that you can integrate into your web UI to present and work with transcriptions.

* [List Transcripts single-page application](/docs/conversation-intelligence-classic/integrations/transcripts-single-page-app)
* [Transcription Viewer single-page application](/docs/conversation-intelligence-classic/integrations/transcription-viewer-single-page-app)

## Related Products

Discover more of Twilio Programmable Voice and related products.

### Twilio Voice

Twilio Voice helps you quickly make, receive, and monitor calls within your applications.

[Product Docs](/docs/voice)

### Voice Insights

Voice Insights offers conversation quality analytics and aggregation tools for investigating calls and conferences.

[Product Docs](/docs/voice/voice-insights)

### Branded Calling

Branded Calling displays your business's name, logo, and conversation reason on the recipient's phone.

[Product Docs](/docs/voice/branded-calling)
