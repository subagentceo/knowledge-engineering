# Language Operators

> \[!IMPORTANT]
>
> Use LLM-powered Language Operators for sophisticated and flexible natural language understanding tasks. For more information, see the [Generative Custom Operators docs](/docs/conversation-intelligence-classic/generative-custom-operators).

Language Operators use artificial intelligence and machine learning technologies to provide additional analysis and insights on your Transcripts.

## Operator types

> \[!NOTE]
>
> Use LLM-powered Language Operators for sophisticated and flexible natural language understanding tasks. For more information, see the [Generative Custom Operators docs](/docs/conversation-intelligence-classic/generative-custom-operators).

Language Operators use artificial intelligence and machine learning technologies to provide additional analysis and insights on your Transcripts. You can use two Language Operator Types with an [Intelligence Service](/docs/conversation-intelligence-classic/onboarding#services):

* **Pre-built Language Operators**: Twilio creates these in-house or trains them using third-party AI models. Twilio trains [Pre-built Operators](/docs/conversation-intelligence-classic/pre-built-operators) across a wide swath of data, mapping them to information that's independent of your industry or use case. These are Twilio-maintained Operators that you can't customize.
* **Custom Operators**: You can also create customized Operators. They're Operators specific to your use case and data. We offer two types of Custom Operators:
  * **[Generative](/docs/conversation-intelligence-classic/generative-custom-operators)**: Use LLM-powered analysis for sophisticated and flexible natural language understanding tasks.
  * **Phrase Matching**: Specify a keyword or a phrase to find in a Transcript or use as a category for classifying your Transcripts.

## Operator actions overview

Operators perform specific actions on a conversation or a sentence within a conversation. There are four types of actions that an Operator can perform.

| **Action**       | **Description**                                                                                                       | **Example**                                                                                                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Generative       | Use an LLM to generate text or JSON for sophisticated and flexible natural language understanding tasks               | Score a conversation based on multiple custom-defined categories of agent performance.                                  |
| Classify         | Classify a conversation into a predefined category                                                                    | Classify if the conversation transferred to another agent.                                                              |
| Phrase matching  | Determine if an event occurred or if someone mentioned a piece of data or a phrase during a conversation.             | Determine whether an agent informed a customer that they're recording a voice call.                                     |
| Classify-Extract | Extract relevant information like entities from a conversation and classify those entities into a predefined category | Identify and extract unique entities such as locations, organizations, consumer goods or people, quantities, and times. |

## Multilanguage support

Custom Operators are available for all [Transcription languages](/docs/conversation-intelligence-classic/onboarding#supported-languages).

Pre-built Operator language support varies depending on the Transcription language and the Operator. For detailed information, refer to the [Pre-built Operator table](/docs/conversation-intelligence-classic/pre-built-operators).
