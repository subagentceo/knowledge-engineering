# Set up and configure Unified Profiles in Flex (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles in Flex is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a Twilio SLA.

> \[!WARNING]
>
> Unified Profiles in Flex is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex or Segment workflows that are subject to HIPAA or PCI.

> \[!NOTE]
>
> Use this page for Unified Profiles information that's Flex-specific, or [refer to the Unified Profiles docs](/docs/unified-profiles/) for a more comprehensive guide.

## Prerequisites

* Flex UI version:
  * Unified Profiles in Flex requires at least Flex UI version 2.6.0 or later.
  * We recommend using Flex UI version 2.9.x or later for the best experience. If you're using Flex UI version between 2.6.x and 2.8.x, you have to add the [Search for a Profile widget](/docs/studio/widget-library/search-for-a-profile) into your Studio Flows for automatic profile lookup to work.
  * We also recommend keeping your Flex UI version up-to-date so that you get the fixes and improvements introduced with each new release.
* You need access to a [Segment Unify](/docs/segment/unify/) workspace. If you don't have access, [contact Segment sales](https://segment.com/product/unify/) to get started.

## Set up Unified Profiles in Flex

Follow these steps to set up Unified Profiles in Flex:

1. [Connect your Segment workspace to Twilio](https://www.twilio.com/docs/flex/admin-guide/setup/unified-profiles/segment-space).
2. Configure [your customer identifier settings](https://www.twilio.com/docs/flex/admin-guide/setup/unified-profiles/identifiers) in Segment.
3. [Configure customer history and interaction data](https://www.twilio.com/docs/flex/admin-guide/setup/unified-profiles/customer-history-and-interaction) so agents can see past interaction events.
4. Connect your data source systems with your Segment Unify space. Available sources include [Salesforce Cloud](/docs/segment/connections/destinations/catalog/actions-segment-profiles/salesforce-source), [HubSpot](/docs/segment/connections/destinations/catalog/actions-segment-profiles/hubspot-source), data warehouses, and more.

* You can also [use a CSV file](/docs/segment/unify/csv-upload) to upload profiles and traits.

5. [Choose the traits that you want to use](https://www.twilio.com/docs/unified-profiles/traits) in Flex.
6. [Configure the agent experience with Unified Profiles data](https://www.twilio.com/docs/flex/admin-guide/setup/unified-profiles/setup/configure-ui). You can configure which information is shown to agents and how it appears.
7. [Set up the Search for a Profile widget](https://www.twilio.com/docs/studio/widget-library/search-for-a-profile) (Optional). This widget enables you to look up customer profiles in Twilio Segment by identifier attribute, such as phone number or email address.

> \[!NOTE]
>
> For setup help or to file a ticket, [contact our support team](https://help.twilio.com/).
