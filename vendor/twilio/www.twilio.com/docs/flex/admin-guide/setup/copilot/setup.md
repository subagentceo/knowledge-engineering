# Agent Copilot: Configure wrap-up notes (public beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Wrap-up note features

Automated wrap-up notes include topics, subtopics, disposition codes, sentiment, and a summary.

![Wrap-up notes for Parker Smith on used vehicles with a neutral sentiment and scheduled test drive.](https://docs-resources.prod.twilio.com/0f0ce7aaf0335a323de4d806506a9d9ff2b495b50694ae8c665a55fcb1e27b93.png)

### Topics

Topics are a high-level category that describes why a customer is contacting you. Within a topic, you can configure a subtopic and disposition code to provide more details and reflect the outcome of a conversation. To learn more, see [Topics, subtopics, and disposition codes](/docs/flex/admin-guide/setup/topics). If you've already created disposition codes without topics, see [Disposition codes without a topic](/docs/flex/admin-guide/setup/topics#disposition-codes-without-a-topic).

### Sentiment

Sentiment describes the customer's overall attitude during the interaction. When an agent ends a conversation task, Agent Copilot uses AI to detect customer sentiment and automatically assigns one of the following:

* Positive
* Neutral
* Negative

As an admin, you can decide whether or not an agent can see and edit this field in the Flex UI component.

### Summary

Agent Copilot generates a conversation summary during agent wrap-up. You can set the preferred summary length as short, medium, or long. If your settings allow agents to review notes, then agents can also view and edit the summary.

## Prerequisites

Make sure you also have:

* [Flex UI 2.6.x and above](https://console.twilio.com/us1/develop/flex/settings/ui-versions)
* [Flex Conversations](/docs/flex/admin-guide/core-concepts/conversations) (not legacy Messaging)
* [Access control](/docs/flex/admin-guide/setup/copilot/configure) configured

## Configure wrap-up notes

### Step 1: Start configuration

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **AI features** > **Agent Copilot**.
2. Under **Wrap-up notes**, click **Configure**.
3. Optionally, to turn on wrap-up notes for voice, under **Auto-generation settings** > **Wrap-up notes for voice**, check **Enable wrap-up notes for voice**.

### Step 2: Manage topics and disposition codes

1. Under **Auto-generation settings**, click **Manage topics and disposition codes**.
2. Complete the steps in [Topics, subtopics, and disposition codes](/docs/flex/admin-guide/setup/topics).

### Step 3: Select summary length

Under **Summary field** choose the preferred summary length from short, medium, or long. By default, the summary is set to medium.

**Note**: There may be occasional variation in summary sentence length.

### Step 4: Turn on additional languages

1. Under **Language**, select **Enable language detection**.
2. Select additional languages.

For more details, see [Enable additional languages for wrap-up notes](/docs/flex/admin-guide/setup/copilot/languages).

### Step 5: (Optional) Add a webhook URL

If you'd like to send wrap-up note data to your own system, like a CRM or database, you can add a webhook URL to receive events. There are two types of note events: **note\_created** and **note\_updated**. For more details, including payload information, see [Agent Copilot webhook](/docs/flex/developer/copilot-webhooks).

1. Under **Wrap-up notes webhook URL**, enter your URL.
2. Select your preferred method: `HTTP POST` or `HTTP GET`. Regardless of the request method, Twilio sends the same request headers and payload to your webhook URL.
3. To receive data, make sure to [validate the request against the signature](/docs/usage/webhooks/webhooks-security#validating-signatures-from-twilio).

### Step 6: Save settings

After configuring wrap-up notes, click **Save auto-generation settings**.

### Step 7: Turn on wrap-up notes service

* Before turning on wrap-up notes, check your [access control settings](/docs/flex/admin-guide/setup/copilot/configure) to make sure Agent Copilot is using the queues you want. Your queue settings apply to all services that use Agent Copilot, not just wrap-up notes.

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **AI features** > **Agent Copilot**.
2. Under **Wrap-up notes**, click **Configure**.
3. Turn on **Auto-generation service**.
4. In the pop-up, check **Also enable wrap-up notes UI component**, if you want agents to see wrap-up notes in Flex UI. If you don't want to turn on the UI component right away, you can do it later in a separate step.
5. Click **Confirm**.

## Configure wrap-up notes UI component for agents

If you want agents to see and edit wrap-up notes in the Flex UI, follow these steps. Within the UI component, you can choose to hide the sentiment field from agents.

1. Under **Wrap-up notes UI component**, click **Manage UI component**.
2. Under **Wrap-up notes fields**, you can interact with the preview component.
   By default, agents can see **Disposition code** and **Summary**. However, you can deselect **Sentiment** if you don't want agents to see or change the generated customer sentiment.
3. Click **Save changes**.
4. Under **Component status**, click **Enable for Flex agents**.

**Note** If you use a custom plugin that affects the End Chat functionality, wrap-up notes may not work as described in Flex UI.

## Turn off wrap-up notes

You can turn off wrap-up notes at any time.

* When you turn off wrap-up notes, webhook events stop firing for agents in wrap-up.
* Any notes generated when the setting was turned on still show under customer history.
* If you turn off notes while they're in use, notes won't generate, but agents can still add notes manually. Wrap-up notes aren't deactivated until agents refresh Flex UI.

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **AI features** > **Agent Copilot**.
2. Under **Wrap-up notes**, click **Manage auto-generation service**.
3. Uncheck **Enable wrap-up notes for voice**, then click **Save auto-generation settings**. If you skip this step and only turn off auto-generation service, then wrap-up notes for Conversations will turn off, but Voice channel notes will remain on.
4. Turn off **Auto-generation service**.

## Troubleshooting

To troubleshoot in [Twilio Console](https://console.twilio.com/), go to **Monitor** > **Errors** > **Error Logs**. The error log lists the reason wrap-up notes failed with recommended next actions.
