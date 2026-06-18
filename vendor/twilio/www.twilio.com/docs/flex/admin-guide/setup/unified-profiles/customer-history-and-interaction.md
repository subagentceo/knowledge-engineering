# Add Flex customer history (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Unified Profiles is not a HIPAA Eligible Service or PCI compliant and should not be used in workflows that are subject to HIPAA or PCI.

> \[!NOTE]
>
> Use this page for Unified Profiles information that's Flex-specific, or [refer to the Unified Profiles docs](/docs/unified-profiles/) for a more comprehensive guide.

## Overview

With Flex customer history, you can use customer history data and interaction events for additional customer context.

After connecting a source to Unified Profiles, your Flex interaction events are available. You can then use the steps below to [enable customer history](#enable-customer-history).

Customer history orders events by Segment's `timestamp` property. Visit Segment's docs to [learn more about the `timestamp` property](/docs/segment/connections/spec/common/#timestamp).

## Enable customer history

The [customer history UI component](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/customer-history) displays selected customer events to your agents in Flex. This includes interactions with your contact center, registration on your website, and recent orders. By default, customer history includes Flex interaction activity from Unified Profiles.

To enable customer history:

1. From Twilio Console, navigate to **Flex** > **Contact center settings** > **UI components** > **Customer history**.
2. Turn on **Enable for Flex agents**.

After you enable this component, you can [configure customer history](/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui/customer-history) to display events that are most relevant to your business use cases.
