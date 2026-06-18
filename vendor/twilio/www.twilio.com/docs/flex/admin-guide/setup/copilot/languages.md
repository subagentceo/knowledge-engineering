# Agent Copilot: Enable additional languages for wrap-up notes (public beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Overview

By default, Agent Copilot detects English (US). If conversations in your contact center happen in other languages, you can turn on [additional languages](/docs/flex/admin-guide/setup/copilot#supported-languages) to generate wrap-up notes in those languages.

Turning on additional languages allows you to:

* Generate the **summary** and **sentiment** in the language your agents and customers use.
* Use language nuances to correctly determine the customer's sentiment.
* Integrate non-English wrap-up notes with your application via [webhook](/docs/flex/developer/copilot-webhooks).

Turning on additional languages doesn't impact Flex UI strings. If you want Flex to localize UI strings to your agent's language, consider using a [localization plugin](https://github.com/twilio-professional-services/plugin-flex-localization), or reach out to your Twilio support team to learn about more options.

## Prerequisites

* [Flex UI 2.8.x and above](https://console.twilio.com/us1/develop/flex/settings/ui-versions)
* [Agent Copilot](/docs/flex/admin-guide/setup/copilot) is turned on

## Turn on additional languages

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **AI features** > **Agent Copilot**.
2. Under **Wrap-up notes** , click **Manage auto-generation service**.
3. Under **Language**, select **Enable additional languages**.
4. Select your additional languages.
5. Click **Save auto-generation settings**.

## What agents see

![Wrap-up notes in Portuguese for sentiment and summary.](https://docs-resources.prod.twilio.com/0a08afcc130c86f695e761d2dfd94927bbac0bca25f3a7bfc0a87e666e81bdef.png)

During wrap-up, agents see **sentiment** and **summary** in the detected language. The **disposition code** remains in the language it was written in.
**Note** Twilio recommends keeping disposition codes in one language to prevent duplication and keep reporting consistent.

Saved wrap-up notes also show in the [customer's history](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/customer-history), if you've set up [Unified Profiles](/docs/flex/admin-guide/setup/unified-profiles). If notes were completed in Portuguese, for example, those Portuguese notes show in the **history** tab.

### Conversations in more than one language

If a conversation includes multiple languages, wrap-up notes generate in the predominant language. This setting isn't configurable.

### Unsupported and unselected languages

If Agent Copilot detects an unselected or unsupported language, wrap-up notes still generate, but with inconsistency and reduced accuracy.

## If you're using a webhook

Webhook notes are stored in their detected languages and aren't converted to one language. If you want all notes in one language, consider using translation software.
