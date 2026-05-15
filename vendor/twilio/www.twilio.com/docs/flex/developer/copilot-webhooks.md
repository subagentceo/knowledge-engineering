# Agent Copilot: wrap-up notes webhook (public beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Overview

You can use a [webhook](/docs/glossary/what-is-a-webhook) so that notes flow from Flex to your own system, like a CRM or database. When a note is created and an agent clicks **Complete**, Twilio sends your web application an HTTP request to the URL you specify.

To learn more about Agent Copilot, see [Agent Copilot for administrators](/docs/flex/admin-guide/setup/copilot).

## Add a webhook URL

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **AI features** > **Agent Copilot**.
2. Under **Wrap-up notes**, click **Manage auto-generation service**.
3. Under **Wrap-up notes webhook URL**, enter your URL where you'd like data sent.
4. Select your preferred method: `HTTP POST` or `HTTP GET`. Regardless of the request method, Twilio sends the same request headers and payload to your webhook URL.
5. Click **Save**.
6. To receive data, make sure to [validate the request against the signature](/docs/usage/webhooks/webhooks-security#validating-signatures-from-twilio).

To learn more about testing your configuration, see [Getting Started with Twilio Webhooks](/docs/usage/webhooks/getting-started-twilio-webhooks).

## Note events

The webhook will trigger when either of the following events occurs:

| **Event**         | **Description**                                                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **note\_created** | Triggers when a note is created. This includes when the note is auto-generated, or if an agent chooses to manually enter a note instead. |
| **note\_updated** | Triggers when an agent clicks Complete. Any updates or edits to the auto-generated note are included in the event payload.               |

### note\_created

Payload sent when a note is created in Flex.

**Example** **response**

```json
{
    "sid": "KQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "event_type": "note_created",
    "instance_sid": "GOxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "interaction_sid": "KDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "channel_sid": "UOxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "participant_sid": "UTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "profile_connect_sid": "YIxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "summary": null,
    "sentiment": null,
    "disposition_code_sid": null,
    "generated_summary": "The customer requested a return for a shoe.",
    "detected_language": "en-US",
    "generated_sentiment": "neutral",
    "generated_disposition_code_sid": null,
    "codes": {
      "generated": [
        {
          "disposition_code": "DC Name",
          "topic_path": "Topic 1|Sub Topic 2"
        }
      ],
      "selected": [
        {
          "disposition_code": "DC Name",
          " topic_path": "Topic 1|Sub Topic 2"
        }
      ]
    },
    "type": "wrapup",
    "date_created": "2024-01-17T21:09:00Z",
    "date_updated": "2024-01-17T21:09:00Z",
    "version": 1,
    "context": {
        "task_sid": "WTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
}
```

### note\_updated

Payload sent when an agent edits or updates a note in Flex.

**Example** **response**

```json
{
    "sid": "KQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "event_type": "note_updated",
    "instance_sid": "GOxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "interaction_sid": "KDxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "channel_sid": "UOxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "participant_sid": "UTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "profile_connect_sid": "YIxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "summary": "test1",
    "sentiment": "positive",
    "disposition_code_sid": null,
    "generated_summary": "The customer requested a return for a shoe.",
    "detected_language": "en-US",
    "generated_sentiment": "neutral",
    "generated_disposition_code_sid": null,
    "codes": {
      "generated": [
        {
          "disposition_code": "DC Name",
          "topic_path": "Topic 1|Sub Topic 2"
        }
      ],
      "selected": [
        {
          "disposition_code": "DC Name",
          " topic_path": "Topic 1|Sub Topic 1"
        }
      ]
    },
    "type": "wrapup",
    "date_created": "2024-01-17T21:09:42Z",
    "date_updated": "2024-01-17T21:09:00Z",
    "version": 2,
    "context": {
        "task_sid": "WTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
}
```

### Parameters

| **Property**                          | **Description**                                                                                                                                                                                                                                      |   |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - |
| **sid**                               | Note identifier.                                                                                                                                                                                                                                     |   |
| **event\_type**                       | The type of action that triggered this webhook event. Either `note_created` or `note_updated`.                                                                                                                                                       |   |
| **instance\_sid**                     | Flex instance identifier.                                                                                                                                                                                                                            |   |
| **channel\_sid**                      | Interaction channel identifier.                                                                                                                                                                                                                      |   |
| **participant\_sid**                  | (Optional) Identifier for the agent who creates the note.                                                                                                                                                                                            |   |
| **profile\_connect\_sid**             | (Optional) Customer Profile identifier.                                                                                                                                                                                                              |   |
| **summary**                           | (Optional) The summary content.<br /><br />Value is the summary present when an agent clicks Complete. Can be auto-generated or edited by the agent.                                                                                                 |   |
| **sentiment**                         | (Optional) The customer sentiment associated with the channel. <br /><br />Value is the sentiment present when an agent clicks Complete. Can be auto-generated or edited by the agent. <br /><br />Values can be: `Positive`, `Neutral`, `Negative`. |   |
| **disposition\_code\_sid**            | (Optional) The unique ID of a disposition code resource associated with the outcome of a channel.<br /><br />Value is the disposition code present when an agent clicks Complete. Can be auto-generated or edited by the agent.                      |   |
| **generated\_summary**                | Summary generated by the LLM.                                                                                                                                                                                                                        |   |
| **detected\_language**                | The supported language detected by the LLM. Values can be `en-US`, `es-MX`, and `pt-BR`.                                                                                                                                                             |   |
| **generated\_sentiment**              | The customer sentiment associated with the channel. Generated by the LLM. Values can be: `Positive`, `Neutral`, `Negative`.                                                                                                                          |   |
| **generated\_disposition\_code\_sid** | The unique ID of a disposition code resource associated with the outcome of a channel. Generated by the LLM.                                                                                                                                         |   |
| **codes**                             | The generated or selected topics and disposition codes for a note.                                                                                                                                                                                   |   |
| **disposition\_code**                 | The disposition code for the note.                                                                                                                                                                                                                   |   |
| **topic\_path**                       | The topic path for the note, represented as a combined string of topic and subtopic. For example, `topic\|subtopic`.                                                                                                                                 |   |
| **type**                              | Type of the note. Currently can be `wrapup`.                                                                                                                                                                                                         |   |
| **date\_created**                     | Date note was created. ISO8601 time.                                                                                                                                                                                                                 |   |
| **date\_updated**                     | Last modification date of the note. ISO8601 time.                                                                                                                                                                                                    |   |
| **version**                           | The version of the wrap-up note resource.                                                                                                                                                                                                            |   |
| **context.task\_sid**                 | Unique task identifier.                                                                                                                                                                                                                              |   |

## Constraints

### Sentiment

Values can be:

* Positive
* Neutral
* Negative

### Topics, subtopics, and disposition codes

* 72 character max for names
* 256 character max for descriptions for AI

### Summary limit

* Max 3000 characters

### Notes rate limit

Agent Copilot can generate 20 notes per second. If you hit the rate limit, you'll see a 429 error.

## Errors

If the webhook fails, the default behavior is to retry once. You can override this behavior as instructed in [Webhooks (HTTP callbacks): Connection Overrides](/docs/usage/webhooks/webhooks-connection-overrides).

In Console Debugger, you can configure an optional webhook to receive data about errors in real-time. [The debugger event](https://console.twilio.com/us1/monitor/logs/debugger/webhook) generated contains all necessary information to retry wrap-up notes. To learn more, see [Debugging Webhook Events](/docs/usage/troubleshooting/debugging-event-webhooks).

Some frontend errors you may encounter are:

| **Error case**           | **Error name**        | **Agent action**                                                |
| ------------------------ | --------------------- | --------------------------------------------------------------- |
| Notes failed to generate | 45600 - Flex UI error | Add notes manually then complete task                           |
| Notes submission failed  | 45600 - Flex UI error | Click **complete without notes** or dismiss error and try again |
