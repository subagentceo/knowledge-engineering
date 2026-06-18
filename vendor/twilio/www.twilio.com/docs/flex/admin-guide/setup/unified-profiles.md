# Unified Profiles in Flex for administrators (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles in Flex is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a Twilio SLA.

> \[!WARNING]
>
> Unified Profiles in Flex is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex or Segment workflows that are subject to HIPAA or PCI.

> \[!NOTE]
>
> Use this page for Unified Profiles information that's Flex-specific, or [refer to the Unified Profiles docs](/docs/unified-profiles/) for a more comprehensive guide.

## Provide agents with real-time context about customers

When Unified Profiles in Flex is enabled and configured, you can provide your teams with information about each customer to enhance their understanding of customer intent and enable them to personalize every conversation. This information includes:

* AI-generated customer highlights
* Customer profile
* Interaction history
* [Computed traits](/docs/segment/unify/traits/computed-traits/), such as number of website visits
* [Predictive traits](/docs/segment/unify/traits/predictions), such as likelihood to churn and predicted lifetime customer value

Your agents can view this detailed information for each customer before accepting a task and while helping the customer. You can also [customize your agent experience](https://assets.flex.twilio.com/docs/releases/flex-ui/latest/programmable-components/components/ProfileTabs/) in Unified Profiles with Container capabilities that leverage programmability in Flex.

Agent Copilot and Unified Profiles are now available together in Public Beta. Unified Profiles provides customer data that powers Agent Copilot's AI features.

![Twilio Flex interface showing a call task with contact Joe Doe in Salesforce.](https://docs-resources.prod.twilio.com/6d2c4bedfc4a1d649597ec197981d3a5fb9d5b9563741e5dcea0118c8c0cb508.png)

![Agent Copilot and Unified Profiles with History tab.](https://docs-resources.prod.twilio.com/d003b5d5abe87091928966247dced139dc4e411a3944594cdc55c755e8baa52b.png)

## Supported channels

Unified Profiles currently supports the following channels:

* Voice
* These [Flex Conversations](/docs/flex/admin-guide/core-concepts/conversations) channels:
  * SMS
  * WhatsApp
  * Email
  * Webchat. See the [Webchat 3.x.x docs](/docs/flex/developer/conversations/webchat/setup/) to learn how to configure Webchat to use with Unified Profiles in Flex.

## AI Nutrition facts for Unified Profiles (Public Beta)

Although Unified Profiles itself does not use machine learning technology, Unified Profiles can incorporate certain third-party machine learning technologies through Agent Copilot and Predictive Traits. For detailed information about each feature's AI qualities, see the [AI Nutrition Facts for Agent Copilot](/docs/flex/admin-guide/setup/copilot/nutritionfacts) and the [Predictions Nutrition Facts Label](/docs/segment/unify/traits/predictions/predictions-nutrition-facts/).

Twilio's AI Nutrition Facts provide an overview of the AI features you're using so you can better understand how AI works with your data. For more information, see [Twilio's AI Nutrition Facts page](https://nutrition-facts.ai/).
