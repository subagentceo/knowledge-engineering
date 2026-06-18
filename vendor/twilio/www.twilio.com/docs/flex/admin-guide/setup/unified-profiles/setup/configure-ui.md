# Configure Flex UI components (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles in Flex is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a Twilio SLA.

> \[!WARNING]
>
> Unified Profiles in Flex is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex or Segment workflows that are subject to HIPAA or PCI.

## Overview

In this section, you can configure how customer profile data is shown to agents in your contact center. You can enable and configure the following:

* [Customer header and search](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/header-search): This component is automatically enabled when you enable customer details component, customer history component, or both. Customer header and settings for the profile search are read-only.
* [Customer details:](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/customer-details) Enable this component to display selected customer profile information to your agents in Flex UI. It can display any Segment traits and is typically used for things like customer contact information, demographic information, purchasing preferences, and past behavior metrics.
* [Customer history](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/customer-history): Enable this component to display selected customer events to your agents in Flex UI. You can display any events from your Segment data. For example, you might choose to show interactions with your contact center, registration on your company website, and recent orders.

For Flex UI components related to Agent Copilot, you'll need to configure auto-generation service

* [Customer highlights](/docs/flex/admin-guide/setup/copilot/highlights): As agents talk with customers, this component displays a short paragraph with key customer information, such as previous purchases and customer data. In Flex UI, customer highlights are located under the customer header component.
* [Wrap-up notes](/docs/flex/admin-guide/setup/copilot/setup): Agents see this component during task wrap-up. Wrap-up notes include customer sentiment, a disposition code, and conversation summary. Agents with relevant permissions can edit these fields if needed.
