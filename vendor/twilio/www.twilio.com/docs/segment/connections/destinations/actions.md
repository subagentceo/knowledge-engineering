# Destination Actions

* FREE: ✓
* TEAM: ✓
* BUSINESS: ✓
* ADDON: x

Destination Actions are available for all Segment plans. Self-service plans are limited to two conditions per Trigger.

See the [available plans](https://segment.com/pricing), or [contact Support](https://segment.com/help/contact/)

The Destination Actions framework improves on classic destinations by enabling you to see and control how Segment sends the event data it receives from your sources to actions-based destinations. Each Action in a destination lists the event data it requires, and the event data that is optional.

You can also choose which event types, event names, or event property values trigger an Action. These Triggers and Mappings make it possible to send different versions of the Action, depending on the context from which it is triggered.

Each Actions-framework Destination you see in the Segment catalog represents a feature or capability of the destination which can consume data from your Segment source. The Action clearly lists which data from the events is required and which is optional. For example, [Amplitude](/docs/segment/connections/destinations/catalog/actions-amplitude) requires that you always send a `LogEvent` and [Slack](/docs/segment/connections/destinations/catalog/actions-slack) always requires a `PostMessage`. Each Action also includes a default mapping which you can modify.

## Benefits of Destination Actions

The advantages of using Destination Actions include:

* **Easier setup**: Destination Actions have fewer initial settings, which can decrease the time spent configuring the destination.
* **Increased transparency**: You can see the exact data that is sent to the destination and when Segment sends it. For example, users can see exactly when Segment sends an IP address to [FullStory](https://www.fullstory.com/) or an AnonymousId to [Amplitude](https://amplitude.com/).
* **Improved customization**: You can determine which events from your sources trigger actions, and map the events to destination-supported actions. For example, you can define exactly which events are considered purchases by [Braze](https://www.braze.com/).
* **Partner ownership**: Partners can own and contribute to any Actions-based destination that uses [cloud or device (web) connection modes](/docs/segment/connections/destinations/#connection-modes).

## Available Actions-based Destinations

The following Actions-based Destinations are available:

| Destination                                                                                                                                     | Status |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| [1Flow Web (Actions)](/docs/segment/connections/destinations/catalog/actions-1flow)                                                             | Beta   |
| [Aampe (Actions)](/docs/segment/connections/destinations/catalog/actions-aampe)                                                                 | Beta   |
| [ABsmartly (Actions)](/docs/segment/connections/destinations/catalog/actions-absmartly)                                                         | GA     |
| [Accoil Analytics](/docs/segment/connections/destinations/catalog/actions-accoil-analytics)                                                     | GA     |
| [Acoustic (Actions)](/docs/segment/connections/destinations/catalog/actions-acoustic)                                                           | GA     |
| [Actable Predictive](/docs/segment/connections/destinations/catalog/actions-actable-predictive)                                                 | Beta   |
| [Actions Pipedrive](/docs/segment/connections/destinations/catalog/actions-pipedrive)                                                           | Beta   |
| [Adobe Target Cloud Mode](/docs/segment/connections/destinations/catalog/actions-adobe-target-cloud)                                            | GA     |
| [Adobe Target Web](/docs/segment/connections/destinations/catalog/actions-adobe-target-web)                                                     | GA     |
| [Aggregations.io (Actions)](/docs/segment/connections/destinations/catalog/actions-aggregations-io)                                             | Beta   |
| [Airship (Actions)](/docs/segment/connections/destinations/catalog/actions-airship)                                                             | GA     |
| [Algolia Insights (Actions)](/docs/segment/connections/destinations/catalog/actions-algolia-insights)                                           | GA     |
| [Amazon Ads DSP and AMC](/docs/segment/connections/destinations/catalog/actions-amazon-amc)                                                     | Beta   |
| [Amazon Conversions Api](/docs/segment/connections/destinations/catalog/amazon-conversions-api)                                                 | Beta   |
| [Amazon EventBridge (Actions)](/docs/segment/connections/destinations/catalog/amazon-eventbridge-actions)                                       | Beta   |
| [Amplitude (Actions)](/docs/segment/connections/destinations/catalog/actions-amplitude)                                                         | GA     |
| [Angler AI](/docs/segment/connections/destinations/catalog/actions-angler-ai)                                                                   | Beta   |
| [AppFit](/docs/segment/connections/destinations/catalog/actions-app-fit)                                                                        | Beta   |
| [Attio (Actions)](/docs/segment/connections/destinations/catalog/actions-attio)                                                                 | Beta   |
| [Batch (Actions)](/docs/segment/connections/destinations/catalog/batch-actions)                                                                 | Beta   |
| [Blackbaud Raiser's Edge NXT](/docs/segment/connections/destinations/catalog/actions-blackbaud-raisers-edge-nxt)                                | Beta   |
| [Blend Ai](/docs/segment/connections/destinations/catalog/actions-blend-ai)                                                                     | Beta   |
| [Braze Cloud Mode (Actions)](/docs/segment/connections/destinations/catalog/actions-braze-cloud)                                                | GA     |
| [Braze Cohorts](/docs/segment/connections/destinations/catalog/actions-braze-cohorts)                                                           | GA     |
| [Braze Web Device Mode (Actions)](/docs/segment/connections/destinations/catalog/actions-braze-web)                                             | GA     |
| [Canny (Actions)](/docs/segment/connections/destinations/catalog/actions-canny)                                                                 | GA     |
| [ChartMogul](/docs/segment/connections/destinations/catalog/actions-chartmogul)                                                                 | Beta   |
| [CleverTap (Actions)](/docs/segment/connections/destinations/catalog/actions-clevertap)                                                         | GA     |
| [Close](/docs/segment/connections/destinations/catalog/close)                                                                                   | GA     |
| [Collab Travel CRM](/docs/segment/connections/destinations/catalog/collab-travel-crm)                                                           | Beta   |
| [CommandBar](/docs/segment/connections/destinations/catalog/actions-commandbar)                                                                 | GA     |
| [Contentstack Cloud](/docs/segment/connections/destinations/catalog/actions-contentstack)                                                       | Beta   |
| [Contentstack Web](/docs/segment/connections/destinations/catalog/contentstack-web)                                                             | Beta   |
| [Cordial (Actions)](/docs/segment/connections/destinations/catalog/actions-cordial)                                                             | GA     |
| [Criteo Audiences](/docs/segment/connections/destinations/catalog/actions-criteo-audiences)                                                     | GA     |
| [Customer.io (Actions)](/docs/segment/connections/destinations/catalog/actions-customerio)                                                      | GA     |
| [Delivr.ai Resolve](/docs/segment/connections/destinations/catalog/actions-cdpresolution)                                                       | Beta   |
| [Display and Video 360 (Actions)](/docs/segment/connections/destinations/catalog/actions-display-video-360)                                     | GA     |
| [Dotdigital](/docs/segment/connections/destinations/catalog/dotdigital)                                                                         | Beta   |
| [Drip (Actions)](/docs/segment/connections/destinations/catalog/drip-actions)                                                                   | Beta   |
| [Dub (Actions)](/docs/segment/connections/destinations/catalog/dub-actions)                                                                     | Beta   |
| [Dynamic Yield by Mastercard Audiences](/docs/segment/connections/destinations/catalog/actions-dynamic-yield-audiences)                         | Beta   |
| [Eagle Eye](/docs/segment/connections/destinations/catalog/eagle-eye)                                                                           | Beta   |
| [Emarsys (Actions)](/docs/segment/connections/destinations/catalog/actions-emarsys)                                                             | Beta   |
| [Encharge (Actions)](/docs/segment/connections/destinations/catalog/encharge-cloud-actions)                                                     | GA     |
| [Equals](/docs/segment/connections/destinations/catalog/actions-equals)                                                                         | Beta   |
| [Extensible Webhook](/docs/segment/connections/destinations/catalog/extensible-webhook)                                                         | GA     |
| [Facebook Conversions API (Actions)](/docs/segment/connections/destinations/catalog/actions-facebook-conversions-api)                           | GA     |
| [Facebook Custom Audiences (Actions)](/docs/segment/connections/destinations/catalog/actions-facebook-custom-audiences)                         | GA     |
| [First Party Dv360](/docs/segment/connections/destinations/catalog/first-party-dv360)                                                           | Beta   |
| [Friendbuy (Cloud Destination)](/docs/segment/connections/destinations/catalog/actions-friendbuy-cloud)                                         | GA     |
| [Friendbuy (Web Destination)](/docs/segment/connections/destinations/catalog/actions-friendbuy)                                                 | GA     |
| [Fullstory (Actions)](/docs/segment/connections/destinations/catalog/actions-fullstory)                                                         | GA     |
| [Fullstory Cloud Mode (Actions)](/docs/segment/connections/destinations/catalog/actions-fullstory-cloud)                                        | GA     |
| [Gainsight Px Cloud (Actions)](/docs/segment/connections/destinations/catalog/actions-gainsight-px-cloud)                                       | GA     |
| [Gameball (Actions)](/docs/segment/connections/destinations/catalog/actions-gameball)                                                           | Beta   |
| [Gleap (Action)](/docs/segment/connections/destinations/catalog/gleap-cloud-actions)                                                            | Beta   |
| [Google Ads Conversions](/docs/segment/connections/destinations/catalog/actions-google-enhanced-conversions)                                    | GA     |
| [Google Analytics 4 Cloud](/docs/segment/connections/destinations/catalog/actions-google-analytics-4)                                           | GA     |
| [Google Analytics 4 Web](/docs/segment/connections/destinations/catalog/actions-google-analytics-4-web)                                         | GA     |
| [Google Sheets](/docs/segment/connections/destinations/catalog/actions-google-sheets)                                                           | GA     |
| [GWEN (Actions)](/docs/segment/connections/destinations/catalog/actions-gwen-cloud)                                                             | Beta   |
| [Hubble (Actions)](/docs/segment/connections/destinations/catalog/hubble-web)                                                                   | Beta   |
| [HubSpot Cloud Mode (Actions)](/docs/segment/connections/destinations/catalog/actions-hubspot-cloud)                                            | GA     |
| [HubSpot Web (Actions)](/docs/segment/connections/destinations/catalog/actions-hubspot-web)                                                     | GA     |
| [Inleads AI](/docs/segment/connections/destinations/catalog/inleads-ai)                                                                         | GA     |
| [Insider Audiences](/docs/segment/connections/destinations/catalog/actions-insider-audiences)                                                   | GA     |
| [Insider Cloud Mode (Actions)](/docs/segment/connections/destinations/catalog/actions-insider-cloud)                                            | GA     |
| [Intercom Cloud Mode (Actions)](/docs/segment/connections/destinations/catalog/actions-intercom-cloud)                                          | GA     |
| [Intercom Web (Actions)](/docs/segment/connections/destinations/catalog/actions-intercom-web)                                                   | GA     |
| [Iterable (Actions)](/docs/segment/connections/destinations/catalog/actions-iterable)                                                           | GA     |
| [Iterate Web (Actions)](/docs/segment/connections/destinations/catalog/actions-iterate)                                                         | GA     |
| [Jimo (Actions)](/docs/segment/connections/destinations/catalog/actions-jimo)                                                                   | Beta   |
| [June (Actions)](/docs/segment/connections/destinations/catalog/june-actions)                                                                   | GA     |
| [Kafka](/docs/segment/connections/destinations/catalog/actions-kafka)                                                                           | Beta   |
| [Kameleoon (Actions)](/docs/segment/connections/destinations/catalog/actions-kameleoon)                                                         | Beta   |
| [Klaviyo (Actions)](/docs/segment/connections/destinations/catalog/actions-klaviyo)                                                             | GA     |
| [Koala](/docs/segment/connections/destinations/catalog/actions-koala)                                                                           | GA     |
| [Koala (Cloud)](/docs/segment/connections/destinations/catalog/actions-koala-cloud)                                                             | GA     |
| [LaunchDarkly (Actions)](/docs/segment/connections/destinations/catalog/actions-launchdarkly)                                                   | GA     |
| [LaunchDarkly Audiences](/docs/segment/connections/destinations/catalog/actions-launchdarkly-audiences)                                         | GA     |
| [LinkedIn Audiences](/docs/segment/connections/destinations/catalog/actions-linkedin-audiences)                                                 | GA     |
| [LinkedIn Conversions API](/docs/segment/connections/destinations/catalog/actions-linkedin-conversions)                                         | GA     |
| [Listrak (Actions)](/docs/segment/connections/destinations/catalog/actions-listrak)                                                             | GA     |
| [LiveLike](/docs/segment/connections/destinations/catalog/actions-livelike-cloud)                                                               | Beta   |
| [LiveRamp Audiences](/docs/segment/connections/destinations/catalog/actions-liveramp-audiences)                                                 | Beta   |
| [LogRocket](/docs/segment/connections/destinations/catalog/actions-logrocket)                                                                   | GA     |
| [Loops (Actions)](/docs/segment/connections/destinations/catalog/actions-loops)                                                                 | GA     |
| [Marketo Static Lists (Actions)](/docs/segment/connections/destinations/catalog/actions-marketo-static-lists)                                   | GA     |
| [Metronome (Actions)](/docs/segment/connections/destinations/catalog/metronome-actions)                                                         | GA     |
| [Microsoft Bing CAPI](/docs/segment/connections/destinations/catalog/microsoft-bing-capi)                                                       | GA     |
| [Mixpanel (Actions)](/docs/segment/connections/destinations/catalog/actions-mixpanel)                                                           | GA     |
| [Mixpanel Web (actions)](/docs/segment/connections/destinations/catalog/mixpanel-web-actions)                                                   | Beta   |
| [Moengage (Actions)](/docs/segment/connections/destinations/catalog/actions-moengage)                                                           | GA     |
| [Moloco MCM](/docs/segment/connections/destinations/catalog/actions-moloco-rmp)                                                                 | GA     |
| [Movable Ink (Actions)](/docs/segment/connections/destinations/catalog/actions-movable-ink)                                                     | GA     |
| [Nudge (Actions)](/docs/segment/connections/destinations/catalog/actions-nudge)                                                                 | Beta   |
| [Optimizely Advanced Audience Targeting](/docs/segment/connections/destinations/catalog/actions-optimizely-advanced-audience-targeting)         | Beta   |
| [Optimizely Data Platform](/docs/segment/connections/destinations/catalog/actions-optimizely-data-platform)                                     | Beta   |
| [Optimizely Feature Experimentation (Actions)](/docs/segment/connections/destinations/catalog/actions-optimizely-feature-experimentation-cloud) | GA     |
| [Ortto (Actions)](/docs/segment/connections/destinations/catalog/actions-ortto)                                                                 | Beta   |
| [Pardot (Actions)](/docs/segment/connections/destinations/catalog/actions-pardot)                                                               | GA     |
| [Pendo Web (Actions)](/docs/segment/connections/destinations/catalog/actions-pendo-web)                                                         | Beta   |
| [Pinterest Conversions API](/docs/segment/connections/destinations/catalog/actions-pinterest-conversions-api)                                   | GA     |
| [PlayerZero Web](/docs/segment/connections/destinations/catalog/actions-playerzero-web)                                                         | GA     |
| [Podscribe (Actions)](/docs/segment/connections/destinations/catalog/actions-podscribe)                                                         | GA     |
| [Postscript](/docs/segment/connections/destinations/catalog/postscript)                                                                         | Beta   |
| [Pushwoosh](/docs/segment/connections/destinations/catalog/actions-pushwoosh)                                                                   | Beta   |
| [Qualified](/docs/segment/connections/destinations/catalog/actions-qualified)                                                                   | Beta   |
| [Qualtrics](/docs/segment/connections/destinations/catalog/actions-qualtrics)                                                                   | GA     |
| [Recombee](/docs/segment/connections/destinations/catalog/recombee)                                                                             | GA     |
| [Reddit Audiences](/docs/segment/connections/destinations/catalog/reddit-audiences)                                                             | GA     |
| [Reddit Conversions API](/docs/segment/connections/destinations/catalog/reddit-conversions-api)                                                 | GA     |
| [Reddit Pixel](/docs/segment/connections/destinations/catalog/reddit-pixel)                                                                     | Beta   |
| [Rehook](/docs/segment/connections/destinations/catalog/actions-rehook)                                                                         | Beta   |
| [RevX Cloud (Actions)](/docs/segment/connections/destinations/catalog/actions-revx)                                                             | Beta   |
| [Rokt Audiences (Actions)](/docs/segment/connections/destinations/catalog/rokt-audiences-actions)                                               | Beta   |
| [Rupt](/docs/segment/connections/destinations/catalog/actions-rupt)                                                                             | Beta   |
| [Salesforce (Actions)](/docs/segment/connections/destinations/catalog/actions-salesforce)                                                       | GA     |
| [Salesforce Marketing Cloud (Actions)](/docs/segment/connections/destinations/catalog/actions-salesforce-marketing-cloud)                       | GA     |
| [Saleswings (Actions)](/docs/segment/connections/destinations/catalog/actions-saleswings)                                                       | GA     |
| [Schematic](/docs/segment/connections/destinations/catalog/actions-schematic)                                                                   | Beta   |
| [Screeb Web (Actions)](/docs/segment/connections/destinations/catalog/actions-screeb-web)                                                       | Beta   |
| [Segment Connections](/docs/segment/connections/destinations/catalog/actions-segment)                                                           | GA     |
| [Segment Profiles](/docs/segment/connections/destinations/catalog/actions-segment-profiles)                                                     | GA     |
| [SendGrid](/docs/segment/connections/destinations/catalog/sendgrid)                                                                             | GA     |
| [SingleStore](/docs/segment/connections/destinations/catalog/singlestore)                                                                       | GA     |
| [Slack (Actions)](/docs/segment/connections/destinations/catalog/actions-slack)                                                                 | GA     |
| [Snapchat Conversions API](/docs/segment/connections/destinations/catalog/actions-snap-conversions)                                             | GA     |
| [Sprig (Actions)](/docs/segment/connections/destinations/catalog/sprig-web)                                                                     | GA     |
| [StackAdapt Events & Conversions ](/docs/segment/connections/destinations/catalog/stackadapt-events-conversions-)                               | Beta   |
| [Survicate (Actions)](/docs/segment/connections/destinations/catalog/actions-survicate)                                                         | GA     |
| [Taboola (Actions)](/docs/segment/connections/destinations/catalog/actions-taboola-actions)                                                     | Beta   |
| [Talon.One (Actions)](/docs/segment/connections/destinations/catalog/actions-talon-one)                                                         | GA     |
| [The Trade Desk Crm](/docs/segment/connections/destinations/catalog/actions-the-trade-desk-crm)                                                 | Beta   |
| [TikTok Audiences](/docs/segment/connections/destinations/catalog/actions-tiktok-audiences)                                                     | GA     |
| [TikTok Conversions](/docs/segment/connections/destinations/catalog/tiktok-conversions)                                                         | GA     |
| [Tiktok Offline Conversions](/docs/segment/connections/destinations/catalog/actions-tiktok-offline-conversions)                                 | Beta   |
| [TikTok Pixel](/docs/segment/connections/destinations/catalog/actions-tiktok-pixel)                                                             | Beta   |
| [Toplyne Cloud Mode (Actions)](/docs/segment/connections/destinations/catalog/actions-toplyne-cloud)                                            | Beta   |
| [Topsort](/docs/segment/connections/destinations/catalog/actions-topsort)                                                                       | Beta   |
| [Twilio Messaging](/docs/segment/connections/destinations/catalog/twilio-messaging)                                                             | GA     |
| [Usermaven (Actions)](/docs/segment/connections/destinations/catalog/actions-usermaven)                                                         | Beta   |
| [UserMotion (Actions)](/docs/segment/connections/destinations/catalog/actions-usermotion)                                                       | Beta   |
| [Userpilot Cloud (Actions)](/docs/segment/connections/destinations/catalog/actions-userpilot-cloud)                                             | GA     |
| [Userpilot Web (Actions)](/docs/segment/connections/destinations/catalog/actions-userpilot-web)                                                 | GA     |
| [Voucherify (Actions)](/docs/segment/connections/destinations/catalog/voucherify-actions)                                                       | GA     |
| [VWO Cloud Mode (Actions)](/docs/segment/connections/destinations/catalog/actions-vwo-cloud)                                                    | GA     |
| [VWO Web Mode (Actions)](/docs/segment/connections/destinations/catalog/actions-vwo-web)                                                        | Beta   |
| [Webhooks (Actions)](/docs/segment/connections/destinations/catalog/actions-webhook)                                                            | GA     |
| [Wisepops](/docs/segment/connections/destinations/catalog/actions-wisepops)                                                                     | GA     |
| [Xtremepush (Actions)](/docs/segment/connections/destinations/catalog/actions-xtremepush)                                                       | Beta   |
| [Yahoo Audiences](/docs/segment/connections/destinations/catalog/actions-yahoo-audiences)                                                       | Beta   |

## Destination Actions compatibility

Destination Actions are available to all customers on all Segment plans. You do not need to disable or change existing destinations to use Destination Actions. However, to prevent data duplication in the destination tool, ensure that you are not sending data through both a standard destination and the Actions destination at the same time.

* You can use the [Event Tester](/docs/segment/connections/test-connections) with Destination Actions. Event delivery metrics are collected and available in the destination information pages.
* If you are using [Protocols](/docs/segment/protocols/), Destination Actions actions are applied **after** [schema filters](/docs/segment/protocols/enforce/schema-configuration/) and [transformations](/docs/segment/protocols/transform/).
* If you are using [Destination Filters](/docs/segment/connections/destinations/destination-filters/), Actions are applied after the filters. They are not applied to data that is filtered out.

## Components of a Destination Action

A Destination Action contains a hierarchy of components that work together to ensure the right data is sent to the destination.

| Component       | Description                                                                                                                                                                                                                                                                                                                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Global Settings | Define authentication and connection-related information like API and Secret keys.                                                                                                                                                                                                                                                                                                                   |
| Mappings        | Handle the individual calls to the destination. In them, you define what type of call you want to make to the destination and what triggers that call. Individual Destination Actions may come enabled with some predefined mappings to handle common events like Screen calls, Identify calls, and Track calls. Mappings have 2 components that make this possible: **Triggers** and an **Action**. |
| Triggers        | Allow you to define when the corresponding Action fires. As part of a Trigger, you can use condition-based filters to narrow the scope of the Trigger. Triggers don't support matching on event fields containing `.$` or `.$.`, which reference an array type. <br /> <br /> Self-service users can add a maximum of 2 conditions per Trigger.                                                      |
| Actions         | Determine the information sent to the destination. In the **Configure action** section, you map the fields that come from your source to fields that the destination expects to find. Fields on the destination-side depend on the type of action selected.                                                                                                                                          |

For example, in the Amplitude (Actions) destination, you define your API and Secret keys in the destination's global settings. Then the provided Page Calls mapping:

1. Triggers the action on all incoming Page events.
2. Runs the Log Event action, to map your incoming data to Amplitudes properties.

## Set up a destination action

To set up a new Actions-framework destination:

1. Log in to the Segment Workspace you want to add your destination to. Go to the **Connections > Catalog** page and click the **Destinations** tab. You can also click **Add Destination** either from an existing Source or from your list of existing destinations.
2. Select the **Destination Actions** category and select the destination you want to add.
3. Click **Add destination** and configure your destination, selecting the source you want to connect to the new destination.
4. Enter your credentials in the **Settings** of your new destination. This could be an API Key and Secret Key, or similar information that allows the destination to connect to your account.
5. Next, go to **Mappings** to configure Actions. Add new mappings and select the Action you would like to use.
   * **(Optional)** Click **Suggest Mappings** to get suggested mappings. Learn more about [suggested mappings](#suggested-mappings).
6. Once you're satisfied with your mappings, click **Save and enable**.

You must configure and enable at least 1 mapping to handle a connected source's event(s) in an Actions-framework destination for data to flow downstream.
Events flow downstream in the order in which they appear in the mappings UI. There is no mechanism available where you can control the order of events sent to the downstream destinations.

## Migrate a classic destination to an actions-based destination

Moving from a classic destination to an actions-based destination is a manual process. Segment recommends that you use the following steps to do this:

1. Create the actions-based destination with your development or test source.
2. Copy API keys, connection details, and other settings from the classic destination to the actions-based destination.
3. Refer to the actions-based destination's documentation for information about how to migrate specific settings.
4. Disable the classic version of the destination and enable the actions-based version.
5. Verify that data is flowing from the development or test source to the partner tool.
6. Repeat steps 1-5 with your production source.

### Migrate your destination filters from the classic destination to the actions destination

> \[!WARNING]
>
> You can only migrate your destination filters using the Public API if you're
> on the Segment Business Tier plan. This functionality isn't available in the
> Segment app.

To migrate your destination filters to your actions destination from the classic destination:

1. Send a request to the Public API endpoint.
   * Use [List Filters from Destination](https://docs.segmentapis.com/tag/Destination-Filters#operation/listFiltersFromDestination). You can find `destinationId` in the page URL while viewing the destination in your Segment workspace.
2. Grab the response and parse through the `data.filters` object. Each object returned inside the `data.filters` object is an individual filter associated with the specified destination.
3. Send individual `POST` requests to the Public API endpoint.
   * Use [Create Filter for Destination](https://docs.segmentapis.com/tag/Destination-Filters/#operation/createFilterForDestination), for each of the filters from step 2.
   * Specify the Actions `destinationId`, found in the URL of that destination. The body of the request is the individual filters from step 2.
4. If the bodies of those requests don't already include the field `"enabled": true`, make sure to enable each of those filters after you create them.

### Migrate to an actions-based destination using Destination Filters

For a more comprehensive migration from a classic destination to an actions-based destination, use [Destination Filters](/docs/segment/connections/destinations/destination-filters/). This implementation strategy is only available to customers on a Segment Business Tier plan with access to Destination Filters. By adding an extra line of defense with Destination Filters, you reduce the chance of duplicate events or dropped events and ensure that only events sent before or after a specified `received_at` timestamp are sent to each destination.

This approach involves configuring a destination filter on both the Classic and Actions destinations.

1. Configure the classic destination filter to block events by the `received_at` field with a certain value.
2. Set up the Actions destination to drop events until the `received_at` timestamp field reaches that same value.

While Destination Filters within the UI cannot access any top-level fields, like `received_at`, this is not a limitation for [Destination Filters](https://docs.segmentapis.com/tag/Destination-Filters/) created by the [Public API](/docs/segment/api/public-api/) using [Filter Query Language (FQL)](/docs/segment/api/public-api/fql/). Since `received_at` is a top-level field in the payload, you need to create a destination filter with the Public API and submit the request with that FQL information described below.

By combining these Filters, Segment sends events through the Classic integration up until a specified time and then blocks events after that. The Actions integration then blocks events until that specified time and only allows events beginning at that specified time.

The following code samples show you how you can create filters for your destinations using the [Create Filter for Destination](https://docs.segmentapis.com/tag/Destination-Filters#operation/createFilterForDestination) Public API operation.

#### Classic destination

Endpoint: `POST` `https://api.segmentapis.com/destination/classic_destination_id_from_url/filters`

```json
{
  "sourceId": "add_source_id_here",
  "destinationId": "classic_destination_id_from_url",
  "title": "drop event after (timestamp) received_at > value April 4, 2023 19:55pm",
  "description": "drop event after (timestamp) received_at > value April 4, 2023 19:55pm",
  "if": "(received_at >= '2023-04-21T19:55:00.933Z')",
  "actions": [
    {
      "type":"DROP"
    }
  ],
  "enabled": true
}
```

#### Actions destination

Endpoint: `POST` `https://api.segmentapis.com/destination/actions_destination_id_from_url/filters`

```json
{
  "sourceId": "add_source_id_here",
  "destinationId": "actions_destination_id_from_url",
  "title": "drop event before (timestamp) received_at < value April 4, 2023 19:55pm",
  "description": "drop event before (timestamp) received_at < value April 4, 2023 19:55pm",
  "if": "(received_at < '2023-04-21T19:55:00.933Z')",
  "actions": [
    {
      "type":"DROP"
    }
  ],
  "enabled": true
}
```

After configuring the Destination Filter on both the Classic and Actions destination, go to each destination's **Filters** tab and enable the filters. After completing the migration, you can disable the Classic destination on the Settings page and remove each of the filters from both destinations.

## Edit a destination action

You can add or remove, disable and re-enable, and rename individual actions from the Actions tab on the destination's information page in the Segment app. Click an individual action to edit it.

From the edit screen you can change the action's name and mapping, and toggle it on or off. See [Customizing mappings](#customize-mappings) for more information.

![Mappings table showing enabled actions for Identify, Page, Screen, and Track calls.](https://docs-resources.prod.twilio.com/236f9218b59e05c375233d78678a1329a51a842f9abce6f096d7ca09aceff98f.png)

When an Action is created, it's disabled by default. This ensures that it's only used after being fully configured. To begin sending data through an Action, enable it on the Actions page by clicking the toggle so that it appears blue.

## Disable a destination action

If you find that you need to stop an action from running, but don't want to delete it completely, you can select the action and click the toggle next to the action's name to disable it. This takes effect within minutes, and disables the action until you re-enable it.

## Delete a destination action

To delete a destination action, select the action, click **...** and select **Delete**.

This takes effect within minutes, and removes the action completely. Any data that would have gone to the destination is not delivered. Once deleted, the saved action cannot be restored.

## Test a destination action

To test a destination action, follow the instructions outlined in the [Event Tester](/docs/segment/connections/test-connections/) documentation. You must enable a mapping to test the destination. If a mapping is not enabled, the following error message will appear: `You may not have any subscriptions that match this event.`

You can also test within the mapping itself. To test the mapping:

1. Navigate to the **Mappings** tab of your destination.
2. Select a mapping and click the **...** and select **Edit Mapping**.
3. In the "Define event trigger" step, click **Load event from source** to add a test event from the source. You can also select **Generate sample event** which allows Segment to generate a sample event for you, or enter your own event.
4. In the "Send test record" step, click **Send test event** to test the mapping and view the response from the destination.

> \[!NOTE]
>
> Segment only surfaces a small subset of events for the Test Mapping feature
> and might not always return the event you're looking for. To test with a
> specific event, copy a specific event from your [Source
> Debugger](/docs/segment/connections/sources/debugger/) and paste it into the
> **Add test event** interface.

## Customize mappings

If you use the default mappings for a destination action, you don't need to customize the mapping template for the action. You can edit the fields later if you find that the defaults no longer meet your needs.

> \[!NOTE]
>
> Actions-based destinations have a limit of 50 individual mappings.

To create a custom destination action, start from the Actions tab. If necessary, click **New Mapping** to create a new action.

1. In the edit panel, define the [conditions](#conditions) under which the action should run.
2. Test those conditions to make sure that they correctly match an expected event. This step looks for events that match the criteria in the [debugger queue](/docs/segment/connections/sources/debugger/), so you might need to trigger some events with the expected criteria to test your conditions. You can skip the test step if needed, and re-try it at any time.
3. Select data models to [enrich your events](/docs/segment/unify/data-graph/linked-events) with.
4. Set up the data mapping from the Segment format to the destination tool format.
   * You can click the Source field, then select previously configured Enrichments from the Event Properties tab.
5. Test the mapping with data from a sample event. The edit panel shows you the mapping output in the format for the destination tool. The **Select Object** option sends the entire object from the event, while the **Edit Object** option lets you map each individual property. You can change your mapping as needed and re-test.
6. When you're satisfied with the mapping, click **Save**. Segment returns you to the Mappings table.
7. In the Mappings table **Status** column, verify that the **Enabled** toggle is on for the mapping you just customized.

The required fields for a destination mapping appear automatically. Click **+** to see optional fields.

## Suggested Mappings

> \[!NOTE]
>
> Suggested Mappings is generally available for RETL mappings, and is in public beta
> for event streams and connections.

Segment offers suggested mappings that automatically propose relevant destination fields for both model columns and payload elements. For example, if your model includes a column or payload field named `transaction_amount`, the feature might suggest mapping it to a destination field like `Amount` or `TransactionValue`. This automation, powered by intelligent autocompletion, matches and identifies near-matching field names to streamline the setup.

To use Suggested Mappings, a user with the [Workspace Owner role](/docs/segment/segment-app/iam/roles/) must first accept the Customer AI Terms and Conditions. Ensure that you review the suggested mappings for accuracy before finalizing them as the suggestions are not guaranteed to be 100% accurate.

For more information, see [Segment's Suggested Mappings blog post](https://www.twilio.com/en-us/blog/developers/best-practices/ai-assisted-magical-mappings) and the [Suggested Mappings Nutrition Label](/docs/segment/connections/reverse-etl/suggested-mappings-nutrition-facts).

## Static values

Segment supports 4 static value types in Destination Actions mappings: `string`, `boolean`, `number`, and `null`.

* To create a `string` static value, type the string directly into the input field.
* To create `boolean`, `number`, and `null` values, use the **Static values** tab to create the appropriate static value based on its type.

## Functions

In Destination Actions mappings, functions transform event data before it sends to the destination. This enables custom data handling, such as selecting non-null values or formatting fields.

### Coalesce function

The Coalesce function takes a primary value and uses it if it is available. If the value isn't available, the function uses the fallback value instead.

### Case function

The Case function allows you to change the casing of a given string value.

### JSON function

The JSON function allows you to convert an object or array to a JSON encoded string, or to convert from JSON to objects.

### Flatten function

The Flatten function allows you to flatten a nested object to an object with a depth of 1. Keys are delimited by the configured separator. For example, an object like `{a: { b: { c: 1 }, d: 2 } }` will be converted to `{ 'a.b.c': 1, 'a.d': 2 }`.

### Replace function

The Replace function allows you to replace a `string`, `integer`, or `boolean` with a new value. You have the option to replace up to 2 values within a single field.

### Concatenate function

To combine 2 values in the event variable field, you can concatenate them using plain text and variables together. For example, to prepend the country code to a phone number, enter `+1{{Phone Number}}`. Segment evaluates this field as a `string`, so placing text next to a variable automatically concatenates them.

You can't concatenate event variables and plain text with static values and functions. Adding a static value or function into an input field replaces any previously added event variables and plain text.

![Mapping UI showing two concatenated fields: "+1 phone" and "context.page.url context.page.path".](https://docs-resources.prod.twilio.com/df69123fde1c71f2e955c8bbdd9b6b15ddfab735e608081d5b0b2b634f7313f2.png)

### Liquid syntax

The Liquid syntax function enables you to transform event data with fine-grain control before it reaches cloud-mode destinations using the [LiquidJS templating language](https://liquidjs.com/tutorials/intro-to-liquid.html). Use Liquid templates to clean, format, or conditionally transform data such as user properties, timestamps, or event metadata to meet the requirements of your downstream tools. Liquid templates are applied in the **Mappings** tab of your Segment workspace for you to integrate with your event pipeline.

> \[!NOTE]
>
> Segment limits each mapping to five Liquid syntax functions to protect the performance of your mappings. The limit can't be increased by Segment support and engineering teams on your behalf.

#### Whitespace

By default, Liquid will generate a newline when inputing multi-line templates. To strip these newlines you can use hyphens in the syntax (`{{-`, `-}}`, `{%-`, `-%}` ). See the [LiquidJS docs](https://liquidjs.com/tutorials/whitespace-control.html) for more information.

#### Liquid template limits

Segment enforces the following limits on liquid templates to protect performance and security:

* Maximum template length: 1,000 characters per function
* Maximum evaluation time: 500 ms
* Maximum memory usage: 100 MB

#### Supported Liquid tags and filters

Segment supports the following LiquidJS tags and filters for mappings. Segment selected these to ensure performance, security, and compatibility with real-time event processing. Segment disabled unsupported tags and filters to prevent performance degradation or security risks.

#### Supported tags

| Tag Name    | Description                                                     |
| ----------- | --------------------------------------------------------------- |
| `assign`    | Assigns a value to a variable for reuse in the template.        |
| `capture`   | Captures output into a variable for complex transformations.    |
| `case`      | Implements switch-like logic for conditional processing.        |
| `comment`   | Ignores content during rendering; useful for documentation.     |
| `decrement` | Decrements a counter variable; useful for simple counting.      |
| `echo`      | Outputs variable values; operates on provided event data.       |
| `else`      | Provides an alternative branch in `if` or `case` statements.    |
| `elsif`     | Adds additional conditions in `if` statements.                  |
| `if`        | Enables conditional logic based on event data.                  |
| `increment` | Increments a counter variable; useful for simple counting.      |
| `liquid`    | Allows nested Liquid code execution in a sandboxed environment. |
| `raw`       | Outputs content verbatim without escaping.                      |
| `unless`    | Executes logic if a condition is not true (negation of `if`).   |
| `when`      | Part of `case` statements for matching specific values.         |

#### Supported filters

| Filter Name            | Description                                                                     |
| ---------------------- | ------------------------------------------------------------------------------- |
| `abs`                  | Returns the absolute value of a number.                                         |
| `append`               | Concatenates a string to the end of another string.                             |
| `at_least`             | Returns the greater of two numbers.                                             |
| `at_most`              | Returns the lesser of two numbers.                                              |
| `capitalize`           | Capitalizes the first letter of a string.                                       |
| `ceil`                 | Rounds a number up to the next integer.                                         |
| `cgi_escape`           | Escapes strings for CGI contexts.                                               |
| `compact`              | Removes null values from an array.                                              |
| `date`                 | Formats a date using a specified format (for example, `%s` for Unix timestamp). |
| `date_to_long_string`  | Formats a date into a long string (for example, `01 July 2025`).                |
| `date_to_rfc822`       | Formats a date in RFC822 format.                                                |
| `date_to_string`       | Converts a date to a short string format.                                       |
| `date_to_xmlschema`    | Formats a date in XML schema format.                                            |
| `default`              | Provides a default value for null inputs.                                       |
| `divided_by`           | Divides a number by another number.                                             |
| `downcase`             | Converts a string to lowercase.                                                 |
| `escape`               | Escapes HTML characters in a string.                                            |
| `escape_once`          | Escapes HTML characters only once.                                              |
| `first`                | Retrieves the first element of an array.                                        |
| `floor`                | Rounds a number down to the previous integer.                                   |
| `inspect`              | Converts an object to a JSON string.                                            |
| `join`                 | Joins array elements into a string with a separator.                            |
| `json`                 | Converts an object to a JSON string.                                            |
| `jsonify`              | Similar to `json`; converts an object to a JSON string.                         |
| `last`                 | Retrieves the last element of an array.                                         |
| `lstrip`               | Removes leading whitespace from a string.                                       |
| `minus`                | Subtracts a number from another number.                                         |
| `modulo`               | Returns the remainder of a division operation.                                  |
| `normalize_whitespace` | Normalizes whitespace in a string.                                              |
| `number_of_words`      | Counts the number of words in a string.                                         |
| `plus`                 | Adds two numbers.                                                               |
| `pop`                  | Removes the last element from an array.                                         |
| `push`                 | Adds an element to the end of an array.                                         |
| `prepend`              | Adds a string to the start of another string.                                   |
| `raw`                  | Outputs content verbatim without escaping.                                      |
| `remove`               | Removes all occurrences of a substring.                                         |
| `remove_first`         | Removes the first occurrence of a substring.                                    |
| `remove_last`          | Removes the last occurrence of a substring.                                     |
| `replace`              | Replaces all occurrences of a substring with another string.                    |
| `replace_first`        | Replaces the first occurrence of a substring.                                   |
| `replace_last`         | Replaces the last occurrence of a substring.                                    |
| `round`                | Rounds a number to a specified number of decimal places.                        |
| `rstrip`               | Removes trailing whitespace from a string.                                      |
| `shift`                | Removes the first element from an array.                                        |
| `size`                 | Returns the length of a string or array.                                        |
| `slice`                | Extracts a portion of a string or array.                                        |
| `slugify`              | Converts a string into a URL-friendly format.                                   |
| `split`                | Splits a string into an array based on a delimiter.                             |
| `strip`                | Removes whitespace from both ends of a string.                                  |
| `strip_html`           | Removes HTML tags from a string.                                                |
| `strip_newlines`       | Removes newline characters from a string.                                       |
| `sum`                  | Sums numeric values in an array.                                                |
| `times`                | Multiplies a number by another number.                                          |
| `to_integer`           | Converts a value to an integer.                                                 |
| `truncate`             | Truncates a string to a specified length.                                       |
| `truncatewords`        | Truncates a string to a specified word count.                                   |
| `unshift`              | Adds an element to the start of an array.                                       |
| `upcase`               | Converts a string to uppercase.                                                 |
| `uri_escape`           | Escapes a string for use in a URI.                                              |
| `url_decode`           | Decodes a URL-encoded string.                                                   |
| `url_encode`           | Encodes a string for use in a URL.                                              |
| `where`                | Filters an array based on a property and value.                                 |
| `xml_escape`           | Escapes characters for XML compatibility.                                       |

#### Examples

Below are two examples demonstrating how to use Liquid templates in Segment mappings to transform event data for cloud-mode destinations. These examples showcase common use cases like string manipulation and conditional logic.

##### Example 1: Standardize email addresses

This example converts an email address to lowercase and removes extra whitespace, ensuring consistency for a destination.

```liquid
    {% if event.properties.email %}
    {{ event.properties.email | downcase | strip }}
  {% else %}
    {{ event.properties.email | default: "unknown@example.com" }}
  {% endif %}
```

Input: `event.properties.email` = " [User@Example.com](mailto:User@Example.com) "

Output: [user@example.com](mailto:user@example.com)

Explanation:

* The `if` tag checks if `event.properties.email` exists.
* The `downcase` filter converts the email to lowercase.
* The `strip` filter removes leading or trailing whitespace.
* The `default` filter provides a fallback email if the input is missing.

##### Example 2: Transform phone number with conditional logic

This example formats a phone number by removing non-digit characters, adding a country code, and prepending a plus sign.

```liquid
    {% if event.properties.phone %}
    {% assign phone = event.properties.phone | strip | remove: "-" | remove: "(" | remove: ")" | remove: " " %}
    {% if phone | slice: 0, 1 != "1" %}
      {% assign phone = phone | prepend: "1" %}
    {% endif %}
    {{ phone | prepend: "+" }}
  {% else %}
    {{ event.properties.phone | default: "" }}
  {% endif %}
```

Input: `event.properties.phone` = "(234) 567-8901"

Output: +12345678901

Explanation:

* The `assign` tag stores the cleaned phone number after applying `strip` and `remove` filters to eliminate whitespace and non-digit characters (for example, `-`, `(`, `)`).
* The `slice: 0, 1` filter checks if the phone number starts with `1`; if not, `prepend: "1"` adds the country code.
* The `prepend: "+"` filter adds the `+` prefix.
* The `default` filter outputs an empty string if the phone number is missing.

## Conditions

> \[!NOTE]
>
> Self-service users can add a maximum of 2 conditions per Trigger. All other users can add up to 250 conditions per Trigger. Any conditions beyond these limits may cause event delivery issues and may trigger an 'Action missing mapping or trigger' error.

Mapping fields are case-sensitive. The following type filters and operators are available to help you build conditions:

* **Event type** (`is`/`is not`). This allows you to filter by the [event types in the Segment Spec](/docs/segment/connections/spec).
* **Event name** (`is`, `is not`, `contains`, `does not contain`, `starts with`, `ends with`). Use these filters to find events that match a specific name, regardless of the event type.
* **Event property** (`is`, `is equals to`, `is not`, `is not equals to`, `less than`, `less than or equal to`, `greater than`, `greater than or equal to`, `contains`, `does not contain`, `starts with`, `ends with`, `exists`, `does not exist`). Use these filters to trigger the action only when an event with a specific property occurs.

You can specify nested properties using dot notation, for example `context.app.name`. If a property might appear in multiple formats or locations, you can use an `ANY` statement and add conditions for each of those formats. For example, you might filter for both `context.device.type = ios` and `context.os.name = "iPhone OS "`. The `does not exist` operator matches both a `null` value or a missing property.

The available operators depend on the property's data type:

| Data Type         | Supported Operators                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------- |
| string            | `is`, `is not`, `contains`, `does not contain`, `starts with`, `ends with`                   |
| string or numeric | `is less than`, `is less than or equal to`, `is greater than`, `is greater than or equal to` |
| boolean           | `is true`, `is false`                                                                        |

You can combine criteria in a single group using **`ALL`** or **`ANY`**. Use an `ANY` to "subscribe" to multiple conditions. Use `ALL` when you need to filter for very specific conditions. You can only create one group condition per destination action. You cannot created nested conditions.

> \[!NOTE]
>
> Trigger fields don't support double quotes (`"`) or the tilde (`~`) character.

## Mapping field limitations

In **destination** fields, you can use dot notation to create nested objects and arrays, like `info.name` or `info[0].email`. This isn't the case if the field is enclosed in double quotes. For example, `"user.email"` creates a literal key, not a nested structure.

In **source** fields, dots are only supported for accessing object keys. Literal strings that include a dot, like `user.email`, aren't supported as property names.

## Destination Filters

Destination Filters are compatible with Destination Actions. Consider a Destination Filter when:

* You need to remove properties from the data sent to the destination.
* You need to filter data from multiple call types, for example, Track, Page, and Identify calls.

If your use case doesn't match these criteria, you might benefit from using Mapping-level Triggers to match only certain events.

## Duplicate Mappings

You can use the Duplicate Mappings feature to create an exact copy of a mapping. The duplicated mapping has the same configurations and enrichments as your original mapping.

Duplicate Mappings supports [Actions destinations](#actions-destination), [Reverse ETL destinations](/docs/segment/connections/reverse-etl/reverse-etl-catalog), and destinations connected to Engage [Audiences](/docs/segment/engage/audiences) and [Journeys](/docs/segment/engage/journeys).

To duplicate your mappings:

1. Navigate to **Connections > Destinations** and select the destination with the mappings you'd like to copy.
2. On the destination's **Mappings** tab, select the menu button (**...**) and click **Duplicate Mapping**.
3. Review the popup and click **Duplicate Mapping**.

Segment creates a disabled mapping with the name "Original Mapping Name (Copy)". You must enable the mapping for data to flow.

## FAQs and troubleshooting

### Why does a validation error appears when using the Event Tester?

When you send an event with an actions destination Event Tester that doesn't match the trigger of any configured and enabled mappings, you'll see an error message that states `You may not have any subscriptions that match this event`.

To resolve the error, create a mapping with a trigger to handle the event being tested, or update the test event's payload to match the trigger of any existing mappings.

### Why is the data not sending downstream?

If no mappings are enabled to trigger on an event that has been received from the connected source, the destination won't send any events. Ensure that you've configured and enabled at least 1 mapping in the destination mappings for an event that you'd like to reach downstream.

> \[!NOTE]
>
> Events without mappings enabled to handle them display as being discarded due
> to "No matching mapping" in a destination's Delivery Overview.

### Why are multiple mappings triggered by the same event?

When an event triggers multiple mappings, a request is generated for each mapping configured to trigger on the event. For example, if two mappings are enabled for the `Subscription Updated` event and both mappings have conditions defined to trigger on the 'Subscription Updated' event, 2 requests are generated and sent to the destination for each event - 1 for each mapping.

### Why is an OAuth "access token expired" message appearing in Segment?

Access tokens generated during initial authorization are short-lived, for example, when you connect a destination via OAuth. The token typically remains valid for 30 minutes to 1 hour. When Segment receives a `401 error` response from a destination after a token expires, it will automatically request the destination for a new token and will then retry the event. Therefore, `401` responses are sometimes expected and do not indicate an event failure. There are 3 event flows when events are received and sent to a destination:

* Through a source
* Through the event tester
* Through the actions tester on the mapping screen

The underlying systems for these flows have their own copy of the token, which can expire at different points in time. If you see a `401` error in a sample response, it is likely that another request was made afterward to fetch a new token. Then one more request was made to actually send the data in your payload to the downstream destination.

### Is it possible to map a field from one event to another?

No. Segment integrations process events through mappings individially. This means that no context is held that would allow you to map a value from one event to the field of a subsequent event.

Each event must include all of the data you'd like to send downstream. For example, you can't send an `email` field in an Identify call and then access it later on a Track call unless that Track call also includes the `email` field.

### Why do I get a "Couldn't load page" error when viewing or editing a mapping?

This error might occur due to a browser cache conflict or if an event property name includes a `/` character. To fix this:

* Try clearing your browser cache or opening the mapping page in an incognito or private window.
* Check whether the mapped property name contains a `/`. If it does, rename the property to remove the `/` and update the mapping.
