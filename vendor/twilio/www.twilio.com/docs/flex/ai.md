# AI overview (Public Beta)

> \[!IMPORTANT]
>
> Agent Copilot and Unified Profiles are currently available as limited Public Beta products and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a Twilio SLA.

> \[!WARNING]
>
> Agent Copilot and Unified Profiles in Flex are not HIPAA Eligible Services or PCI compliant and should not be used in Flex or Segment workflows that are subject to HIPAA or PCI.

Twilio's AI capabilities combine the power of large language models (LLMs) with real-time customer and communications data. Twilio's AI powers these features in Flex:

* Help agents reduce their workload and speed up their workflows with AI-generated post-work automated summaries, disposition codes, and customer sentiment. By automatically generating this information, Agent Copilot reduces agents' workload and speeds up their workflows while providing valuable insights based on customer data and interactions.
* Provide your agents with real-time customer data from multiple enterprise systems within Flex by using Unified Profiles in Flex. Agents can view customer details and a timeline of previous activities, including wrap-up notes from previous interactions. AI-generated highlights combine customer data and recent activity, so agents can start the conversation faster and have a more informed interaction. These details enable agents to provide personalized support based on each customer's history.

We'll continue to add and enhance these features regularly, so watch the [Flex release notes](/docs/flex/release-notes/flex-ui-release-notes-for-v2xx) for updates and details.

![Twilio Flex interface showing a call task with contact Joe Doe in Salesforce.](https://docs-resources.prod.twilio.com/6d2c4bedfc4a1d649597ec197981d3a5fb9d5b9563741e5dcea0118c8c0cb508.png)

![Agent Copilot and Unified Profiles with History tab.](https://docs-resources.prod.twilio.com/d003b5d5abe87091928966247dced139dc4e411a3944594cdc55c755e8baa52b.png)

## Access

You don't need to request beta access to use Agent Copilot or Unified Profiles.

To get started using these features:

* **For Agent Copilot**: Go to the [Agent Copilot](https://console.twilio.com/us1/develop/flex/ai-features/copilot) page in Flex Console, and then follow the steps in [Agent Copilot for administrators](/docs/flex/admin-guide/setup/copilot).
* **For Unified Profiles**: Go to the [Unified Profiles](https://console.twilio.com/us1/develop/flex/settings/unified-profiles) page in Flex Console, and then follow the steps to [set up and configure Unified Profiles in Flex](/docs/flex/admin-guide/setup/unified-profiles/setup).

## Prerequisites

Agent Copilot and Unified Profiles require:

* Flex UI 2.6.0 or later
* A paid Flex account, not a free trial account
* [Flex Conversations](/docs/flex/admin-guide/core-concepts/conversations) (not legacy Messaging)

In addition, Unified Profiles requires a Segment Unify or Segment Engage business-tier plan. For more information about Segment's customer data platform, or for help deciding which plan is right for you, see [Segment's website](https://segment.com/pricing/customer-data-platform/).

## Data privacy and transparency

For information on how we strive to give consumers and businesses more transparency when it comes to AI, see [Twilio's AI Nutrition Facts page](https://nutrition-facts.ai/) as well as:

* [AI nutrition facts for Agent Copilot](/docs/flex/admin-guide/setup/copilot/nutritionfacts)
* [Segment Predictions AI nutrition facts](/docs/segment/unify/traits/predictions/predictions-nutrition-facts/)

### Data retention and GPDR compliance

For details about how Segment handles your data and complies with GDPR, see:

* [Segment Unify and GDPR](/docs/segment/unify/unify-gdpr/)
* [Segment privacy tools overview](/docs/segment/privacy/)

  * [User deletion and data suppression](/docs/segment/privacy/user-deletion-and-suppression/)
  * [Complying with the GDPR](/docs/segment/privacy/complying-with-the-gdpr/)
