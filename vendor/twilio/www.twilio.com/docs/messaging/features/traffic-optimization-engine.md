# Traffic Optimization Engine

> \[!IMPORTANT]
>
> Traffic Optimization Engine is in Public Beta. The information in this document could change. We might add or update features before the product becomes Generally Available. Beta products don't have a Service Level Agreement (SLA). Learn more about [beta product support](https://help.twilio.com/articles/115002413087-Twilio-Beta-product-support).

## Overview

[Traffic Optimization Engine (TOE)](https://www.twilio.com/en-us/blog/signal-2023-product-announcements) is Twilio's delivery optimization solution for Messaging customers to send high-velocity, high-volume messages anywhere in the world. TOE dynamically allocates Messages Per Second (MPS) capacity across sender types, channels, and destination countries.

TOE is a premium Messaging add-on that is ideal for delivering large volumes of messages at faster speeds and lower latency.

## TOE core products and features

The Traffic Optimization Engine includes several products that work together, or individually, to provide granular control over your messaging deliverability, throughput allocation, and prioritization of their messaging solution at scale. All TOE products are interoperable with the Programmable Messaging API.

The TOE product suite includes:

* **Market Throughput:** Aggregates messaging MPS at the account level for better control and utilization of higher levels of throughput capacity in each destination country.
* **Multi-Tenancy:** Dynamically assigns equal or proportional messaging throughput across all of your subaccounts to ensure a fair distribution of throughput across all of your messages.
* **Traffic Shaping:** Enables throughput allocation by use case, which creates dynamic traffic lanes for messages of different priority levels.
* **Messaging Insights:** Provides real-time, out-of-the-box analytics and reporting on messaging deliverability, capacity allocation, and queuing so you have more granular insights into the performance of your global messaging traffic.

### Market Throughput

In this context, the term "market" refers to a country such as the United States. Within a country or market, there are carrier networks or destinations. With Market Throughput, all of the traffic produced across all of your phone numbers is serviced at rate limits configured for each destination you send towards. For example, in the United States, Market Throughput may optimize your messages across Verizon, AT\&T, and any other destinations you send toward.

Market Throughput offers several advantages over [sender throughput](https://help.twilio.com/articles/115002943027-Understanding-Twilio-Rate-Limits-and-Message-Queues) and [Account Based Throughput](/docs/messaging/guides/account-based-throughput-overview), including:

* Messaging capacity is set at the parent account level per country, allowing you to achieve high throughput on as many numbers as you need.
* Traffic is separated by destination carrier, which eliminates the risk of congestion in one network from affecting traffic going to other networks.
* Support for very high levels of messaging MPS that are otherwise inaccessible using other throughput products.

Enablement of Market Throughput is required for access to increased throughput capacity and other TOE products, including Multi-Tenancy and Traffic Shaping. To learn more, visit the [Market Throughput Overview](/docs/messaging/guides/market-throughput-overview#onboarding-and-maintenance) guide.

### Multi-Tenancy

Multi-Tenancy allows you to prevent specific subaccounts and/or senders from using all of the parent Account's available throughput, when competing subaccounts and/or senders also need throughput. Multi-Tenancy allows you to skip manual configuration of throughput on each subaccount to achieve fair distribution. Instead, Twilio algorithmically determines capacity distribution in accordance with your parent Account's configuration for each destination country's sender type and channel combinations.

With Multi-Tenancy enabled, Twilio algorithmically distributes a minimum share of throughput to each subaccount in a fair manner at the moment it's needed. When the subaccount's messages have finished processing, Twilio dynamically redistributes the newly-available throughput across the remaining queues that contain messages waiting to leave the Twilio platform.

Multi-Tenancy applies to SMS and MMS messaging traffic from any of your senders (short code, toll-free, alphanumeric senders, and ten-digit long code phone numbers) except for US and Canada A2P 10DLC traffic.

To enable Multi-Tenancy, you will need to onboard Market Throughput as a prerequisite. Learn more about [Multi-Tenancy](/docs/messaging/features/multi-tenancy).

### Traffic Shaping

Traffic Shaping allows high-volume Twilio customers to fine-tune messaging throughput by allocating capacity by messaging use case. It provides three different Service Levels, which you can think of as three separate queues, where each queue contains messages of the same priority. Each Service Level queue can be assigned a different throughput allocation, based on the relative priority of the messages within that Service Level. You decide the speed at which messages are sent from each Service Level queue by allocating a percentage of your Account's total throughput to each Service Level that you plan to use.

When combined with Market Throughput, Traffic Shaping provides more fine-tuned, flexible controls for prioritizing your messages based on Service Level and use case, while ensuring your most important messages get a greater share of throughput. With Traffic Shaping, you can:

* **Distribute your total throughput capacity based on use case:** Messages that need to be delivered more quickly are mapped to Service Levels receiving a higher share of throughput. A use case is a configurable parameter that can be set on each message, and indicates the corresponding Service Level for that message. Messages without a use case specified will automatically be assigned to the lowest Service Level.
* **Eliminate congestion at the sender level:** Message deliverability in one Service Level does not interfere with performance in another level, even when the messages are sent from the same number.

To enable Traffic Shaping, you will need to onboard Market Throughput as a prerequisite. Learn more about [Traffic Shaping](/docs/messaging/features/traffic-shaping).

### Messaging Insights

Messaging Insights provides analytics and reporting on metrics for messaging deliverability, queueing, and latency. With real-time dashboards, you can use Messaging Insights to:

* Visualize and analyze your application's messaging activities.
* Identify and debug issues.
* Optimize delivery.
* Find areas to boost engagement with your end-users.

To enable specialized Insights dashboards related to TOE, you will need to onboard Market Throughput as a prerequisite. Learn more about [Messaging Insights](/docs/messaging/features/messaging-insights).

## TOE onboarding and maintenance

### Traffic Optimization Engine Pro (TOE Pro)

Throughput upgrades on TOE are available to all Twilio Messaging customers, through subscription of Traffic Optimization Engine Pro(TOE Pro). Available today in Public Beta, TOE Pro is a premium Messaging add-on subscription that enables your account for continuous access to increased MPS on Market Throughput in any country. For more information on TOE Pro pricing and availability by country, refer to the [Twilio Pricing](https://www.twilio.com/en-us/pricing) page or [contact Sales](https://www.twilio.com/en-us/help/sales).

In the United States and Canada, increased MPS on TOE Pro is available for short code and toll-free messages sent as Programmable SMS/MMS. Outside of the United States and Canada, increased MPS TOE is available in every country for all Programmable SMS/MMS sender types including: alphanumeric, long code, short code, and toll-free.

### Onboarding options

If you need more throughput on short code or toll free messages sent to the United States, you can turn on TOE Pro on the Subscriptions page in the Twilio Console ([Console](https://1console.twilio.com/us1/billing/manage-billing/subscriptions) | [Legacy Console](https://console.twilio.com/us1/billing/manage-billing/subscriptions)). If you can't turn on TOE Pro in the Twilio Console, contact [Twilio Support](https://help.twilio.com).

**Whether you onboard directly in Console or through Twilio Support, you will not need to make any changes to your existing Twilio integration in order to turn on the increased throughput included in your TOE Pro subscription. After onboarding is completed, you can start sending more traffic right away.**

## Get started with TOE

### TOE Pro Self-serve onboarding in the Twilio Console

You can onboard to TOE Pro by creating a subscription in a few steps:

## Console

1. Log in to the [Twilio Console](https://1console.twilio.com).
2. Go to [**Admin** > **Account billing**](https://1console.twilio.com/us1/billing/manage-billing/billing-overview).
3. On the **Billing Overview** page, in the navigation menu, click [**Subscriptions**](https://1console.twilio.com/us1/billing/manage-billing/subscriptions), then click **Subscribe Now** on the MPS option you want to configure.\
   The page contains all TOE Pro options available to your account for increased MPS on short code and toll-free messages sent to the United States.
4. On the **Order Summary** page, review the subscription terms. Click **Pay and Subscribe** to accept the terms and create a new subscription for your throughput upgrade.\
   TOE Pro is now active on your account, and you can start using the increased throughput on your messages.

## Legacy Console

1. Log in to the [Twilio Console](https://console.twilio.com).
2. Go to [**Admin** > **Account billing**](https://console.twilio.com/us1/billing/manage-billing/billing-overview).
3. On the **Billing Overview** page, in the navigation menu, click [**Subscriptions**](https://console.twilio.com/us1/billing/manage-billing/subscriptions), then click **Subscribe Now** on the MPS option you want to configure.\
   The page contains all TOE Pro options available to your account for increased MPS on short code and toll-free messages sent to the United States.
4. On the **Order Summary** page, review the subscription terms. Click **Pay and Subscribe** to accept the terms and create a new subscription for your throughput upgrade.\
   TOE Pro is now active on your account, and you can start using the increased throughput on your messages.

### TOE Pro onboarding with Twilio Support

If you have a Twilio account owner, then Twilio Support can help you set up TOE Pro on your account in a few steps:

1. **Forecast:** Work with your Twilio account owner to determine your estimated volumes per country. This forecast is used to calculate the MPS recommended for each sender type and channel, where applicable.
2. **Review:** Your Twilio account owner submits an onboarding ticket to the Twilio Support team, who review and approve the MPS to be configured on your parent account. Your Twilio account owner also reaches out to you to initiate billing for TOE Pro with an order form.
3. **Configuration and Activation:** After approval, Twilio Support configures the MPS values on your account and activates TOE Pro. Your Twilio account owner sends you a confirmation that TOE Pro onboarding is complete.

### What's next?

Now that you have an overview of Traffic Optimization Engine, you can learn more about:

* [How Market Throughput works](/docs/messaging/guides/market-throughput-overview#onboarding-and-maintenance) and compares to legacy throughput offerings like [Account Based Throughput](/docs/messaging/guides/account-based-throughput-overview)
* Tips and strategies for using [Multi-Tenancy](/docs/messaging/features/multi-tenancy) or [Traffic Shaping](/docs/messaging/features/traffic-shaping) on your account, after you onboard to TOE Pro and enable Market Throughput
* Customized onboarding options for TOE Pro beyond throughput upgrades. For more information, [contact Twilio Support](https://help.twilio.com/).
