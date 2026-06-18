# Conversation Memory overview

> \[!NOTE]
>
> Conversation Memory, including the APIs, may use artificial intelligence or machine learning technologies and is subject to the terms of the [Predictive and Generative AI/ML Features Addendum](https://www.twilio.com/en-us/legal/ai-terms/predictive-generative-ai-features). For more details on AI usage and data, see the [AI Nutrition Facts](/docs/conversations/memory/nutrition-facts).
>
> Conversation Memory is not a HIPAA Eligible Service or PCI compliant and should not be enabled in workflows that are subject to HIPAA or PCI.
>
> Conversation Memory is not intended for use with sensitive information about individuals. Twilio does not control what information comes from conversation channels and relies on you to ensure the data in customer profiles aligns with our acceptable use policy. Twilio does have limited guardrails in the form of a prompt exclusion that is designed to provide a minimal screening against inclusion of GDPR [special category data](https://gdpr-info.eu/art-9-gdpr/). As a reminder our profile technology uses generative artificial intelligence. Because generative artificial intelligence can make mistakes, review all outputs to ensure that the profile is correct.
>
> Conversations products are only available in the [new Twilio Console](https://1console.twilio.com). If your account hasn't been migrated, you'll be redirected to the legacy Console where these products won't appear.

Conversation Memory provides AI and human agents with real-time, contextual data about your customers. Rather than treating every interaction as isolated, Conversation Memory allows agents to build on previous conversations, adapt to individual users over time, and reference business knowledge to personalize every interaction.

| Without Conversation Memory                                                                                                      | With Conversation Memory                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| *"Hi there, can you let me know which flight and hotel I should book for you?"*                                                  | *"Hey Jim, great to hear you're ready to book. Let me confirm your itinerary — SFO at 10 AM, aisle seat, 2 nights at the Marriott downtown with a firm mattress. Shall I go ahead?"* |
| - Every session starts from scratch <br />- Past context is lost between sessions <br />- Customers repeat themselves every time | - Profiles are updated with preferences and history <br />- Context persists across sessions and channels <br />- Agents adapt and personalize responses                             |

## Use cases

Conversation Memory works together with AI agents to power a range of contact center and customer engagement experiences:

|                                                                                                                                                                                  |                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Instant recognition** AI agents recognize returning customers, greet them by name, and provide assistance without previously supplied information.                             | **Agent handoff** When an issue is escalated to a human agent, Conversation Memory ensures the agent has full context from the customer's history so they never have to repeat their story. |
| **Customer care and support** Human and AI agents have real-time, granular context about a customer's history, preferences, and open issues across every channel they have used. | **Sales interactions** Sales agents and AI tools access deep insights into a lead's past engagement, interests, and potential objections, allowing them to tailor pitches effectively.      |

## How Conversation Memory works

Conversation Memory operates in two complementary phases.

* **Capture and Store:** Conversations flowing through Twilio channels are first handled by Conversation Orchestrator — a product that turns what would otherwise be fragmented interactions into a single continuous conversation. Those unified conversations are then processed by Conversation Memory where identity is resolved, observations are extracted, and the customer's profile is created or updated.
* **Recall and Respond:** Agents query the Recall API mid-conversation to retrieve the most relevant context from that profile in real time.

![How Conversation Memory works](https://docs-resources.prod.twilio.com/1906b5017e49517aecb8397c09ce48764ff9f688b24cd9b20fd6350054058e15.png)

## What Conversation Memory stores

Conversation Memory organizes stored data into two distinct memory types:

| Memory Type               | Contains                | Description                                                                                                                                                            |
| ------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Conversational Memory** | Observations, Summaries | Unstructured insights automatically extracted from conversations — behaviors, preferences, mood, and key discussion points. Updated after each interaction.            |
| **Factual Memory**        | Traits, Identifiers     | Structured, durable facts about a customer — name, contact details, account tier, and unique identifiers used to link their interactions across channels and sessions. |

> \[!NOTE]
>
> Use the Recall endpoint to retrieve the most relevant memories about a customer during an active conversation. Recall uses a combination of semantic and lexical search against the customer's profile and returns a ranked set of observations, summaries, and recent communications. When used with Twilio Agentic Framework (TAC), Recall is called automatically on every conversation turn.

## Identity Resolution

When a customer contacts you through any channel — Voice, SMS, WhatsApp, or Email — Conversation Memory determines who that customer is and whether a profile already exists for them. Identity Resolution decides whether to create a new profile, add data to an existing one, or merge profiles where identifiers overlap.

Identity Resolution uses traits, identifiers, and priority rules to match conversations to the correct customer profile across all channels. For detailed information about how Identity Resolution works, including multichannel resolution, default rules, and best practices, see [Identity Resolution](/docs/conversations/memory/identity-resolution).

## Next steps

* To set up Conversation Memory in Console, see the [Getting started guide](/docs/conversations/memory/getting-started).
* To get started with Conversation Memory APIs, see [Using APIs to get started](/docs/conversations/memory/api-quickstart).
* See the [Conversation Memory key terms](/docs/conversations/memory/key-terms) docs to learn more about Conversation Memory key terms and concepts.
