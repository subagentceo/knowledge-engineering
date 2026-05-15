# Pre-built Language Operators

Pre-built Language Operators are Operators developed by Twilio in-house or trained using third-party AI models. This page covers the AI model used for training, [Operator action](/docs/conversation-intelligence-classic/language-operators#operator-actions-overview), and supported languages for each of Twilio's Pre-built Operators.

The following Pre-built Language Operators are currently available:

| **Name**                                                  | **AI model**       | **Operator action** | **Description**                                                                    | **Languages supported**                                                                           |
| --------------------------------------------------------- | ------------------ | ------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| [Sentiment Analysis](#sentiment-analysis)                 | OpenAI GPT-4o mini | Classify            | Classifies conversation sentiment as `positive`, `negative`, `neutral`, or `mixed` | [All](/docs/conversation-intelligence-classic/onboarding#supported-languages)                     |
| [Summarization](#summarization)                           | OpenAI GPT-4o mini | Text generation     | Creates a summary of the conversation                                              | [All](/docs/conversation-intelligence-classic/onboarding#supported-languages)                     |
| [Entity Recognition](#entity-recognition)                 | Amazon Comprehend  | Classify-Extract    | Identifies and extracts entities from the conversation                             | `de-DE`, `en-AU`, `en-GB`, `en-US`, `es-MX`, `es-ES`, `es-US`, `fr-FR`, `it-IT`, `pt-BR`, `pt-PT` |
| [Agent Introduction](#agent-introduction)                 | Twilio             | Phrase matching     | Detects if a participant introduced themselves during the conversation             | `en-AU`, `en-GB`, `en-US`                                                                         |
| [Escalation Request](#escalation-request)                 | Twilio             | Phrase matching     | Detects if a participant requested an escalation during a conversation             | `en-AU`, `en-GB`, `en-US`                                                                         |
| [Outbound Call Disposition](#outbound-call-disposition)   | Twilio             | Classify            | Classifies the outcome of an outbound conversation                                 | `en-AU`, `en-GB`, `en-US`                                                                         |
| [Recording Disclosure](#recording-disclosure)             | Twilio             | Phrase matching     | Detects if a participant disclosed that a voice call was recorded                  | `en-AU`, `en-GB`, `en-US`                                                                         |
| [Voicemail Detection](#voicemail-detection)               | Twilio             | Classify            | Determines if a call went to voicemail or was answered by a human                  | `en-AU`, `en-GB`, `en-US`                                                                         |
| [Unavailable Party Detector](#unavailable-party-detector) | Twilio             | Classify            | Determines if the contacted party is unavailable                                   | `en-AU`, `en-GB`, `en-US`                                                                         |
| [Do Not Contact Me](#do-not-contact-me)                   | Twilio             | Phrase matching     | Detects if a participant requested not to be contacted                             | `en-AU`, `en-GB`, `en-US`                                                                         |
| [Non English Call](#non-english-conversation)             | Twilio             | Classify            | Determines if the conversation is in English                                       | `en-AU`, `en-GB`, `en-US`                                                                         |
| [Password Reset](#password-reset)                         | Twilio             | Phrase matching     | Detects if a participant requested a password reset                                | `en-AU`, `en-GB`, `en-US`                                                                         |
| [Call Transfer](#conversation-transfer)                   | Twilio             | Classify            | Classifies if the conversation was transferred to another agent                    | `en-AU`, `en-GB`, `en-US`                                                                         |

## Operator Types

### Sentiment Analysis

**Action**: Classify

**Base Model**: OpenAI GPT-4o mini

> \[!NOTE]
>
> Approximately, the first 90,000 words of the transcript are used to evaluate the sentiment of the conversation.

The Sentiment Analysis operator evaluates the sentiment of the conversation. The Sentiment Analysis operator doesn't analyze a specific participant of the conversation.

| **Class**  | **Description**                                           |
| ---------- | --------------------------------------------------------- |
| `positive` | The sentiment of the conversation was positive            |
| `negative` | The sentiment of the conversation was negative            |
| `neutral`  | The sentiment of the conversation was neutral             |
| `mixed`    | There was more than one sentiment during the conversation |

### Summarization

**Action**: Text generation

**Base Model**: OpenAI GPT-4o mini

> \[!NOTE]
>
> Approximately, the first 90,000 words of the transcript are used to create a summary highlighting key points and important information from the conversation.

The Summarization operator creates a summary highlighting key points and important information from the conversation.

### Entity Recognition

**Action**: Classify-Extract

**Base Model**: Amazon Comprehend

The Entity Recognition operator identifies unique entities such as locations, organizations, consumer goods, people, quantities, and times.

| **Entity**      | **Description**                                                                   |
| --------------- | --------------------------------------------------------------------------------- |
| `Person`        | Individuals, groups of people, nicknames, fictional characters                    |
| `Location`      | A specific location, such as a country, city, lake, building, etc.                |
| `Organization`  | Large organizations, such as companies, government, sports teams, etc.            |
| `Consumer_good` | A branded product                                                                 |
| `Date`          | A full date (10/20/1997), day (Wednesday), month (September), or time (10:15 AM.) |
| `Quantity`      | A quantified amount, such as currency, percentages, numbers, or bytes             |

### Agent Introduction

**Action**: Phrase matching

**Base Model**: Twilio

The Agent Introduction operator detects if an agent introduced themselves during a conversation.

The Agent Introduction operator doesn't detect a specific type of introduction. To determine whether an agent introduced themselves in a specific way, we recommend creating a Literal Spot operator that looks for the introductions that you are attempting to find.

| **Class** | **Description**                           |
| --------- | ----------------------------------------- |
| `true`    | The operator spotted an introduction      |
| `false`   | The operator did not spot an introduction |

### Escalation Request

**Action**: Phrase matching

**Base Model**: Twilio

The Escalation Request operator detects if a customer requested an escalation during a conversation. It captures events like a customer asking to speak to a manager or a supervisor.

| **Class** | **Description**                                 |
| --------- | ----------------------------------------------- |
| `true`    | The operator spotted an escalation request      |
| `false`   | The operator did not spot an escalation request |

### Outbound Call Disposition

**Action**: Classify

**Base Model**: Twilio

The Outbound Call Disposition operator categorizes the outcome of an outbound voice call. It's useful for customers who are running outbound dialing campaigns and have a set of outcomes that are focused on campaign list management.

| **Class**          | **Description**                                                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `GhostCall`        | A voice call was picked up and one participant does not provide any audio                                                              |
| `IVR`              | A voice call was picked up by an automated Interactive Voice Response (IVR) system                                                     |
| `NoContent`        | There was no audio during a voice call                                                                                                 |
| `Ordinary`         | A voice call was picked up by a human and proceeded normally                                                                           |
| `StopContactingMe` | A voice call was picked up by a human who requested to be removed from a campaign list or requested to be placed on a do-not-call list |
| `Voicemail`        | A voice call was picked up by a voicemail system                                                                                       |
| `WrongNumber`      | A voice call was picked up by a human who indicated that it was a wrong number                                                         |

### Recording Disclosure

**Action**: Phrase matching

**Base Model**: Twilio

The Recording Disclosure operator detects if an agent informed the customer that a voice call was recorded. A typical use case for the Recording Disclosure operator is for outbound voice calls where a human agent should greet the customer before informing the customer that the call is being recorded.

The Recording Disclosure operator doesn't match a specific type of recording disclosure. If you have a specific disclosure that you want to ensure that agents use, we recommend creating a Literal Spot operator to match the required phrasing.

| **Class** | **Description**                                                                         |
| --------- | --------------------------------------------------------------------------------------- |
| `true`    | The operator spotted a participant mentioning that a voice call was being recorded      |
| `false`   | The operator did not spot a participant mentioning that a voice call was being recorded |

### Voicemail Detection

**Action**: Classify

**Base Model**: Twilio

The Voicemail Detection operator identifies if a voice call went to voicemail. It's useful for customers who are running outbound dialing campaigns and want to use the results to determine whether to call a specific customer back, and to assess the best time to make that call.

Unlike the [Outbound Call Disposition operator](#outbound-call-disposition), the Voicemail Detection operator only indicates whether a call was handed to a voicemail system. It does not use acoustic features to determine whether or not the call was actually picked up by the voicemail system.

| **Class**       | **Description**                                        |
| --------------- | ------------------------------------------------------ |
| `voicemail`     | The voice call was picked up by a voicemail system     |
| `not_voicemail` | The voice call was not picked up by a voicemail system |

### Unavailable Party Detector

**Action**: Classify

**Base Model**: Twilio

The Unavailable Party Detector operator identifies if the person that you called or messaged is unavailable and the conversation was unanswered. It's useful for customers who are running outbound dialing or messaging campaigns and want to use the results to determine whether to try again, and to assess the best time to retry the conversation.

| **Class**          | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NoClass`          | Both parties were available                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `UnavailableParty` | <ol><li>Customer starts a conversation with a specific agent, but the agent is unavailable</li><li>Agent starts a conversation with the customer, but someone tells the agent the customer is not home</li><li>Customers start a conversation with the correct company, but the specialized service is not available to help and the receptionist offers to contact the customer in the future</li><li>Customer needs to be transferred to someone else, but no one is available to take the conversation</li></ol> |

### Do Not Contact Me

**Action**: Phrase matching

**Base Model**: Twilio

The Do Not Contact Me operator detects if a customer requested not to be contacted during a conversation.

| **Class** | **Description**                                         |
| --------- | ------------------------------------------------------- |
| `true`    | Customer requested to stop contacting this number       |
| `false`   | Customer did not request to stop contacting this number |

### Non English Conversation

**Action**: Classify

**Base Model**: Twilio

The Non English Conversation operator identifies if the conversation was in English.

| **Class**                | **Description**                              |
| ------------------------ | -------------------------------------------- |
| `NonEnglishConversation` | Participants spoke in a non-English language |
| `EnglishConversation`    | Participants spoke in English                |

### Password Reset

**Action**: Classify

**Base Model**: Twilio

The Password Reset operator detects if a conversation participant requested a password reset.

| **Class**         | **Description**                  |
| ----------------- | -------------------------------- |
| `NoPasswordReset` | Password Reset was not requested |
| `PasswordReset`   | Password Reset was requested     |

### Conversation Transfer

**Action**: Classify

**Base Model**: Twilio

The Conversation Transfer operator identifies if the conversation was transferred to another agent.

| **Class**    | **Description**                      |
| ------------ | ------------------------------------ |
| `NoTransfer` | The conversation was not transferred |
| `Transfer`   | The conversation was transferred     |

## Non-Speech Tags

When there is audio that doesn't correspond to speech, or isn't recognized by Twilio's speech recognition engine, it will be labeled with a Non-Speech Tag. Currently, there are the following tags:

| **Non-Speech Tag** | **Description**                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[applause]`       | Included if a participant claps on a voice call                                                                                                                                                                                 |
| `[dtmf]`           | Included when a participant provides input via [DTMF](/docs/glossary/what-is-dtmf) (Dual-Tone Multi-Frequency). This tag is only included when DTMF is embedded in the audio of the recording. Out-of-band DTMF is not captured |
| `[foreign]`        | Included when the speech recognition engine does not recognize the audio as being part of a supported language                                                                                                                  |
| `[hes]`            | Included when a participant says a hesitation marker like `umm`, `uhh`, or `hmm`                                                                                                                                                |
| `[inaudible]`      | Included when there is unclear audio that cannot be recognized by the speech recognition engine                                                                                                                                 |
| `[laugh]`          | Included when a participant laughs on a voice call                                                                                                                                                                              |
| `[music]`          | Included when music is detected on a voice call. This marker typically shows up with hold music                                                                                                                                 |
| `[noise]`          | Included when there are noises that are not recognized as speech                                                                                                                                                                |
| `[ring]`           | Included when there is ringing on a voice call. This typically shows up when a call is recorded with the `record-from-ringing` parameter or when a bridged leg plays ringback                                                   |

## Additional reading

To understand how to use Pre-built Language Operators on your Intelligence Service, please visit the following resources:

* Learn about [Language Operators](/docs/conversation-intelligence-classic/language-operators).
* Read the [Onboarding Guide](/docs/conversation-intelligence-classic/onboarding).
* Review Twilio's [AI Base Models and Nutrition Fact Labels](/docs/conversation-intelligence-classic/ai-nutrition-fact-labels).
