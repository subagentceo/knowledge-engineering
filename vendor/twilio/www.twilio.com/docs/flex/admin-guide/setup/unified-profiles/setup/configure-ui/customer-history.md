# Configure customer history (Public Beta)

> \[!IMPORTANT]
>
> Unified Profiles in Flex is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a Twilio SLA.

> \[!WARNING]
>
> Unified Profiles in Flex is not a HIPAA Eligible Service or PCI compliant and should not be used in Flex or Segment workflows that are subject to HIPAA or PCI.

## Overview

Enable the customer history component to display selected customer events to your agents in Flex UI. This tab typically displays things like interactions with your contact center, registration on your website, and recent orders. You can use the refresh button to manually refresh this tab and view the most recent activities.

By default, this component is disabled. If you want your agents to see this information, you must enable and configure this component. When enabled, this information appears to agents on the [History tab](/docs/flex/end-user-guide/copilot/customerprofiles#history-tab).

![Twilio Flex UI showing Ana Smith's task history with details of calls and test drive bookings.](https://docs-resources.prod.twilio.com/81faf2d65d967a8e6957de9c3849d63421c51afb2e237039a967bdae4a9725d8.png)

When you enable this component, the customer header component is also enabled automatically (if it wasn't already enabled).

Before you configure these settings, make sure you've already configured [identifiers](/docs/flex/admin-guide/setup/unified-profiles/identifiers) and [traits](/docs/unified-profiles/traits).

> \[!WARNING]
>
> In the event of a partial service outage, profile data may be incomplete or outdated. During this time, agents can still view basic customer history, complete tasks, and view past interactions.

## Activity types

There are two types of activities available in the customer history:

* Internal activities: Inbound and outbound customer interactions that happen in Flex, such as phone calls, chats, and emails.
  * You can't edit any settings for the default **Flex internal communication activities**.
  * For activities that occurred before Unified Profiles was enabled, some details, such as the name of the agent, are not shown. Because some details are saved by Unified Profiles, they aren't available for earlier interactions.
* External activities: Activities that your organization tracks outside of Flex, such as activities from your company's website.
  * For example, you can configure Flex to show when the customer placed an order or register on your website.
  * You can configure additional details for these activities, such as what items were included in an order. These activities appear to agents with a star to indicate that they happened outside of Flex.

## Add external activities

It can be helpful for your agents to be able to see specific types of events from the customer profiles in your Segment Unify space. You can add them to the customer history component as external activities. Each activity represents one Segment source event type.

For example, if you want to show orders, you might choose theSegment event `order_placed` as the source event for the activity. The customer history component would begin displaying recent  `order_placed` events.

To add a new activity to the customer history, click **Create an activity** and select a source event.

Then, enter the following information:

* **Activity name**: The display name for the activity.
* **Event date property**: Select the date property that you want to use to order activity instances on the timeline. For example, for an `order_placed` activity, you might choose `orderCreatedDate`.
* **Primary property**:
  * **Label**: The display name for this property.
  * **Property**: The property name, such as `order_number`.
* **Secondary properties**: Optionally, add additional properties. For example, for an order activity, you might want to include secondary properties like order value, order created date, number of items, delivery address, and a link to the order locator.

> \[!NOTE]
>
> Configure these settings in [Agent Copilot](/docs/flex/admin-guide/setup/copilot).
