# Set up and configure Unified Profiles (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a SLA.

> \[!WARNING]
>
> Unified Profiles is not a HIPAA Eligible Service or PCI compliant and should not be used in workflows that are subject to HIPAA or PCI.

## Prerequisites

* You have access to a Segment Unify workspace.

## Set up Unified Profiles

The setup process for Unified Profiles includes the following steps:

> \[!WARNING]
>
> If you're using Unified Profiles with Flex, [view the Flex-specific documentation](/docs/flex/admin-guide/setup/unified-profiles/setup) for all setup steps.

1. [Connect your Segment space to Twilio](/docs/unified-profiles/segment-space#connect-an-existing-segment-space-with-unified-profiles). During setup, complete the following tasks in Segment:
   * Connect your data source systems with your Segment Unify space. Available sources include [Salesforce Cloud](/docs/segment/connections/destinations/catalog/actions-segment-profiles/salesforce-source), [HubSpot](/docs/segment/connections/destinations/catalog/actions-segment-profiles/hubspot-source), data warehouses, and more.
   * Add identifiers and traits.
2. [Confirm your customer identifier settings](/docs/unified-profiles/identifiers).
3. [Choose the traits that you want to use](/docs/unified-profiles/traits).
4. [Set up the Search for a Profile widget](/docs/studio/widget-library/search-for-a-profile) (Optional). This widget enables you to look up customer profiles in Twilio Segment by identifier attribute, such as phone number or email address.

> \[!NOTE]
>
> For setup help or to file a ticket, [contact our support team](https://help.twilio.com/).
