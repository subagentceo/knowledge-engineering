# Unified Profiles (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Unified Profiles is not a HIPAA Eligible Service or PCI compliant and should not be used in workflows that are subject to HIPAA or PCI.

## Overview

Unified Profiles is a Twilio service that combines communication and interaction data from Twilio products with data collected directly from customers. Using this data, you can create personalized experiences for your customers across messaging, email, and other communication channels. Currently, you can use Unified Profiles to enhance customer interactions in Flex and interactive voice response (IVR) flows that you build in Twilio Studio.

To use Unified Profiles, you need to have a business-tier Twilio Segment plan that includes either Segment Unify Plus or Segment Engage Plus. In your Segment workspace, you'll collect real-time customer data from sources such as your website, mobile app, CRM, and data warehouse. If you already use Segment Unify, you can connect your existing workspace with Unified Profiles.

In addition, connecting Unified Profiles to a Segment business-tier workspace lets you access the following features:

* With Unify:
  * Profiles Sync to sync enriched Segment profile data with your data warehouse
  * Protocols to enforce event schema
* With Engage:
  * Real time audiences and journeys
  * Engage campaigns

For more information about Segment's customer data platform, or for help deciding which plan is right for you, see [Segment's website](https://segment.com/pricing/customer-data-platform/).

With Unified Profiles, you can use Segment customer data in Flex or Studio to personalize customer care and sales use cases, like IVR flows, chatbots, routing, and the agent experience. As a result, you can track interactions across a customer's journey to create unified, real-time customer profiles that help you build trust and enhance your customers' experiences.

> \[!NOTE]
>
> To use Unified Profiles, you need to have access to Unified Profiles in Flex.

## Provide real-time context about customers

When you enable and configure Unified Profiles, you can provide your teams with information about each customer to enhance their understanding of customer intent and enable them to personalize every conversation. This information includes:

* Customer profile details
* Interaction history
* [Computed traits](/docs/segment/unify/traits/computed-traits/), such as number of website visits
* [Predictive traits](/docs/segment/unify/traits/predictions), such as likelihood to churn and predicted lifetime customer value

If you're using Unified Profiles with Flex, your agents can view this detailed information for each customer both before accepting a task and while helping the customer.

## What if you created a free limited entitlement Segment workspace for Unified Profiles?

Unified Profiles uses Segment to connect your Twilio services to customer data from cloud sources such as [Salesforce Cloud](/docs/segment/connections/destinations/catalog/actions-segment-profiles/salesforce-source), [HubSpot](/docs/segment/connections/destinations/catalog/actions-segment-profiles/hubspot-source), data warehouses, and more. To learn more, see the full catalog of [available sources](/docs/segment/connections/sources/catalog/).

Previously, if you didn't use Segment, you could set up a free Segment workspace to use with Unified Profiles. As of March 13, 2025, Unified Profiles requires a [Segment Unify or Engage Plus](https://segment.com/pricing/customer-data-platform/?_gl=1*1e8g82n*_gcl_au*MTIyNTQ5NjY3Mi4xNzQwNTk1MzE2*_ga*NjQ2NTY4ODI2LjE3MjI0NjIwNjM.*_ga_RRP8K4M4F3*MTc0NDIxNTU1My42NjMuMS4xNzQ0MjE1OTE1LjAuMC4w) plan.

If you're currently using a free Segment workspace, reach out to your Twilio account team for more information. If you don't have an account team, [connect with a Segment expert](https://segment.com/demo/?utm_source=twilio\&utm_medium=referral\&utm_campaign=unified-profiles-workspace\&utm_content=demo-request).

Between July 10 and August 10, 2025, your Segment workspace will be disconnected from Flex, Studio, and AI assistants. During this time, you can still access existing profile data in the Segment Console.

Starting August 11, 2025, if you haven't upgraded your free limited entitlement workspace, the workspace will be deactivated, and profile data will be deleted.

## AI Nutrition facts for Unified Profiles (Public Beta)

Although Unified Profiles itself doesn't use machine learning technology, Unified Profiles can incorporate certain third-party machine learning technologies through Agent Copilot and Predictive Traits. For detailed information about each feature's AI qualities, see the [AI Nutrition Facts for Agent Copilot](/docs/flex/admin-guide/setup/copilot/nutritionfacts) and the [Predictions Nutrition Facts Label](/docs/segment/unify/traits/predictions/predictions-nutrition-facts/).

Twilio's AI Nutrition Facts provide an overview of the AI features you're using so you can better understand how AI works with your data. For more information, see [Twilio's AI Nutrition Facts page](https://nutrition-facts.ai/).
