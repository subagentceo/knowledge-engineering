# Agent Copilot for administrators (public beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Overview

Agent Copilot uses generative AI to assist agents during and after customer interactions in your contact center. With Agent Copilot in Flex, you can:

* Provide agents with customer insights, like past purchases and activities, to improve interactions.
* Use customer data to create personalized experiences.
* Automate conversation transfer and wrap-up notes to save agents time.
* Standardize agent response quality with AI-powered knowledge lookup.

## Summarization features

Agent Copilot automatically summarizes customer information and conversational outcomes. These features include:

* [Customer highlights](/docs/flex/admin-guide/setup/copilot/highlights): Provides a one-paragraph summary of customer profiles, including past purchases and preferences, using data from Unified Profiles.
* [Wrap-up notes](/docs/flex/admin-guide/setup/copilot/setup): Automatically generates notes after a task ends, and summarizes the conversation, customer sentiment, disposition codes, and topic.
* [Transfer summary](/docs/flex/admin-guide/setup/conversations/messaging-transfers): Creates a summary of conversations for handoffs between agents. Requires [messaging transfers](/docs/flex/admin-guide/setup/conversations/messaging-transfers#turn-on-messaging-transfers) to be enabled.

![Wrap-up and highlights in agent view.](https://docs-resources.prod.twilio.com/441c01f2b0e508b13d3c75c70bb7469b862a4cdfac32927460ee273d37380fc4.png)

## Real-time assist features

During live customer interactions, agents can use the following features to respond faster. These features use your uploaded [knowledge sources](/docs/flex/admin-guide/setup/copilot/knowledge) for information.

* [Ask Copilot](/docs/flex/admin-guide/setup/copilot/real-time-assist): Enables agents to ask questions and receive AI-powered answers.
* [Suggested responses](/docs/flex/admin-guide/setup/copilot/real-time-assist): Automatically creates response suggestions for agents during live interactions.

![Suggested responses for agent.](https://docs-resources.prod.twilio.com/03058f508fbde88692f1782769daf15bf257ab4a093c590136698bae270d980e.png)

## Permissions

As an admin, you can:

* Select which queues to use with Agent Copilot.
* Allow agents to see and edit wrap-up notes in Flex UI.
* Hide the sentiment field from agents in Flex UI.
* [Allow agents to send a transfer summary](/docs/flex/admin-guide/setup/conversations/messaging-transfers) when transferring a message.

## Supported channels

* Voice
* [Conversations](/docs/flex/admin-guide/core-concepts/conversations), with the following exceptions:
  * Facebook Messenger isn't supported for customer highlights.
  * Email isn't supported for wrap-up notes or real-time assist features.

## Supported queues

You can configure which queues use Agent Copilot from **[Access control settings](/docs/flex/admin-guide/setup/copilot/configure#turn-on-access-control)** in Console.

## Supported languages

### Customer highlights

* English

### Ask Copilot and suggested responses

* English

### Wrap-up notes

* English
* Spanish
* Portuguese

For more details, see [Enable additional languages](/docs/flex/admin-guide/setup/copilot/languages).

## AI data use

By default, transcriptions and conversations sent to Agent Copilot are not PII-redacted. To request redaction, see [How to turn on PII redaction](#how-to-turn-on-pii-redaction-for-agent-copilot). Knowledge sources shared with Agent Copilot are kept private and are not used to train AI.

### PII redaction (beta)

If PII redaction is turned on for your account, Agent Copilot removes personally identifiable information from Voice and Conversations transcripts to help protect sensitive data. This removal prevents PII from being disclosed to the AI and LLM models that Agent Copilot uses. Agent Copilot uses artificial intelligence and machine learning technologies to redact PII.

### How Agent Copilot redacts PII

#### Redacted fields

The following fields are redacted:

* Name
* Social security number
* Address
* City
* Country
* Zip code
* State
* Date of birth
* Date
* Organization
* Phone number
* Email
* Credit card number, expiration date, and CVV

While our PII redaction system is designed to identify and redact sensitive information with a high degree of accuracy, we can't guarantee a perfect accuracy score. For example, if a customer mentions their credit card number and adds long pauses as they talk, their card number may not be redacted.
For more information about how Agent Copilot uses AI, see [AI Nutrition Facts for Agent Copilot](/docs/flex/admin-guide/setup/copilot/nutritionfacts).

### How to turn on PII redaction for Agent Copilot

To turn on PII redaction for your account as an Agent Copilot beta feature, contact [Twilio Support](https://help.twilio.com/).

### Data retention

Agent Copilot defines the following as data:

* Transcripts for Voice and Conversations. These are deleted after 7 days.
* Output that Agent Copilot generates, such as summaries. These are deleted after 30 days.

## Security controls

If you prefer Ask Copilot not to use customer conversation data, keep [interaction context](/docs/flex/admin-guide/setup/copilot/real-time-assist#step-1-select-channels-for-interaction-context) disabled. This is recommended for conversations involving sensitive information, like financial data. By default, this setting is off, and Ask Copilot relies only on uploaded knowledge sources.

## Pricing

Agent Copilot uses consumption-based pricing. You're charged based on all communication channels you use with Agent Copilot. For example, if using Agent Copilot with Voice, you'll be charged for transcription. If you use non-English languages, you'll see an additional charge for media streams.

To learn more about pricing, see [Twilio Flex Pricing](https://www.twilio.com/en-us/flex/pricing).

## Next steps

* [AI Nutrition Facts](/docs/flex/admin-guide/setup/copilot/nutritionfacts)
* [Configure access control](/docs/flex/admin-guide/setup/copilot/configure)
