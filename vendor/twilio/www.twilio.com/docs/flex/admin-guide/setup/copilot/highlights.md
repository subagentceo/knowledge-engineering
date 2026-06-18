# Agent Copilot: Configure customer highlights (public beta)

> \[!IMPORTANT]
>
> Agent Copilot is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Agent Copilot is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex workflows that are subject to HIPAA or PCI. However, we offer mitigation tools such as PII redaction. To learn more, see [AI data use](/docs/flex/admin-guide/setup/copilot#ai-data-use).

## Overview

Customer highlights is an intelligent one-paragraph summary of a customer's profile, shown to agents before and during a task. With relevant information on hand, agents can start the conversation more quickly, empathize with the customer, and have a more informed interaction.

![Twilio Flex UI showing Ana Smith's customer profile with highlights and contact information.](https://docs-resources.prod.twilio.com/91a22c861b8997d3d7e5f785ee286f04c5f8c4df0e930f70fa9bcafd22d553f8.png)

## Data sources

Customer highlights are composed of **customer traits**, such as name and email, and **customer events**, such as recent activity. You can decide which traits to configure in [Unified Profiles](/docs/flex/admin-guide/setup/unified-profiles/setup). You must do this first before you can use customer highlights.

Customer activities from external sources, like your website, and internal sources, like Flex, are included in highlights. To manage which activities are shown in highlights, go to the [customer history UI component](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/customer-history) and the [customer details UI component](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/customer-details) to manage recent activities.

## Configure customer highlights

### Prerequisites

* [Unified Profiles](/docs/flex/admin-guide/setup/unified-profiles/setup) configured
* [Search for a Profile widget](/docs/studio/widget-library/search-for-a-profile) configured
* [Access control](/docs/flex/admin-guide/setup/copilot/configure) configured
* [Flex UI 2.7.x](https://console.twilio.com/us1/develop/flex/settings/ui-versions) or later
* [Flex Conversations](/docs/flex/admin-guide/core-concepts/conversations) (not legacy Messaging)

Before turning on customer highlights, make sure to check your [access control settings](/docs/flex/admin-guide/setup/copilot/configure) so that you're using the queues you want. Your access control settings apply to all Agent Copilot services, not just customer highlights.

Since customer highlights use Unified Profiles data and settings, make sure to configure both [Unified Profiles](/docs/flex/admin-guide/setup/unified-profiles/setup) and the [Search for a Profile widget](/docs/studio/widget-library/search-for-a-profile) first.

### Turn on customer highlights

1. In [Twilio Console](https://console.twilio.com/), go to **Flex** > **AI features** > **Agent Copilot**.
2. Under **Customer highlights**, click **Manage auto-generation service**.
3. Under **Customer highlights generation service**, turn on **Auto-generation service**.
4. Click **Confirm**.
5. Turning on the generation service automatically activates the **Customer highlights UI component**. To preview how the component appears in Flex UI, click **Preview UI Component**.

**Note** Agents can't edit customer highlights.
