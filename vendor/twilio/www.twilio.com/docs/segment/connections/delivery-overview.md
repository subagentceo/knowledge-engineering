# Delivery Overview

Delivery Overview is a visual observability tool designed to help Segment users diagnose event delivery issues for any cloud-streaming destination receiving events from cloud-streaming sources.

## Key features

Delivery Overview has three core features:

* [Pipeline view](#pipeline-view): a visual overview of each step your data takes during the delivery process
* [Breakdown table](#breakdown-table): contains more detail about the events that were processed at each pipeline step
* [Discard table](#discard-table): contains details about the events that failed or were filtered out of your process and allows you to inspect samples of them

You can refine these tables using the time picker and the metric toggle, located under the destination header. With the time picker, you can specify a time period (last 10 minutes, 1 hour, 24 hours, 7 days, 2 weeks, or a custom date range over the last two weeks) for which you'd like to see data. With the metric toggle, you can switch between seeing metrics represented as percentages (for example, *85% of events* or *a 133% increase in events*) or as counts (*13 events* or *an increase of 145 events*.) Delivery Overview shows percentages by default.

### Pipeline view

The pipeline view provides insights into each step your data is processed by enroute to the destination, with an emphasis on the steps where data can be discarded due to errors or your filter preferences. Each step provides details into counts, change rates, and event details (like the associated Event Type or Event Names), and the discard steps (Failed on ingest, Filtered at source, Filtered at destination, & Failed delivery) provide you with the reasons events were dropped before reaching the destination. Discard steps also include how to control or alter that outcome, when possible. The pipeline view also includes a label between the Filtered at destination and Failed delivery steps indicating how many events are currently pending retry.

> \[!NOTE]
>
> Delivery Overview applies a 5-minute lookback period to provide stable, accurate metrics across all pipeline steps. This interval accounts for processing delays and ensures the data Segment displays reflects a reliable snapshot of recent events.

#### Classic destinations

The pipeline view for classic destinations includes the following steps:

* **Successfully received**: Events that Segment ingested from your source.
* **Failed on ingest**: Events that Segment received, but were dropped due to internal data validation rules.
* **Filtered at source**: Events that were discarded due to schema settings or [Protocols](/docs/segment/protocols/) Tracking Plans.
* **Filtered at destination**: Events that were discarded due to [Destination Filters](/docs/segment/guides/filtering-data/#destination-filters), [filtering in the Integrations object](/docs/segment/guides/filtering-data/#filtering-with-the-integrations-object), [Destination Insert functions](/docs/segment/connections/functions/insert-functions/), or [per source schema integration filters](/docs/segment/guides/filtering-data/#per-source-schema-integrations-filters). [Actions destinations](/docs/segment/connections/destinations/actions/) also have a filtering capability: for example, if your Action is set to only send Identify events, all other event types will be filtered out. Actions destinations with incomplete triggers or disabled mappings are filtered out at this step. [Consent Management](/docs/segment/privacy/consent-management/) users also see events discarded due to consent preferences.
* **Failed delivery**: Events that have been discarded due to errors or unmet destination requirements.
* **Successful delivery**: Events that were successfully delivered to the destination.

#### Actions destinations

The pipeline view for Actions destination includes the following steps:

* **Successfully received**: Events that Segment ingested from your source. You can filter these events by event type, event name, app version, and [enrichment status](/docs/segment/unify/data-graph/linked-events/).
* **Failed on ingest**: Events that Segment received, but were dropped due to internal data validation rules.
* **Filtered at source**: Events that were discarded due to schema settings or [Protocols](/docs/segment/protocols/) Tracking Plans.
* **Mapping dropdown**: Select a [mapping](/docs/segment/connections/destinations/actions/#customize-mappings) to filter the events in the Filtered at destination, Failed delivery and Successful delivery pipeline steps.
* **Filtered at destination**: Events that were discarded due to [Destination Filters](/docs/segment/guides/filtering-data/#destination-filters), [filtering in the Integrations object](/docs/segment/guides/filtering-data/#filtering-with-the-integrations-object), [Destination Insert functions](/docs/segment/connections/functions/insert-functions/), or [per source schema integration filters](/docs/segment/guides/filtering-data/#per-source-schema-integrations-filters). [Actions destinations](/docs/segment/connections/destinations/actions/) also have a filtering capability: for example, if your Action is set to only send Identify events, all other event types will be filtered out. Actions destinations with incomplete triggers or disabled mappings are filtered out at this step. [Consent Management](/docs/segment/privacy/consent-management/) users also see events discarded due to consent preferences.
* **Retry count**: The number of events currently pending retry.
* **Failed delivery**: Events that have been discarded due to errors or unmet destination requirements.
* **Successful delivery**: Events that were successfully delivered to the destination.

![Delivery Overview showing metrics for Track Page View events.](https://docs-resources.prod.twilio.com/7e4c72a0bb61fba56a89016762e4cbb863d5990bfa7e83c7f1e38e19c5d8fa77.jpeg)

#### Storage destinations

The pipeline view for storage destination includes the following steps:

* **Successfully received**: Events that Segment ingested from your source.
* **Failed on ingest**: Events that Segment received, but were dropped due to internal data validation rules.
* **Filtered at source**: Events that were discarded due to schema settings or [Protocols](/docs/segment/protocols/) Tracking Plans.
* **Filtered at destination**: Events that were discarded due to [Destination Filters](/docs/segment/guides/filtering-data/#destination-filters), [filtering in the Integrations object](/docs/segment/guides/filtering-data/#filtering-with-the-integrations-object), [Destination Insert functions](/docs/segment/connections/functions/insert-functions/), or [per source schema integration filters](/docs/segment/guides/filtering-data/#per-source-schema-integrations-filters). [Actions destinations](/docs/segment/connections/destinations/actions/) also have a filtering capability: for example, if your Action is set to only send Identify events, all other event types will be filtered out. Actions destinations with incomplete triggers or disabled mappings are filtered out at this step. [Consent Management](/docs/segment/privacy/consent-management/) users also see events discarded due to consent preferences.
* **Events pending retry**: A read-only box that shows the number of events that are awaiting retry.
* **Failed to sync**: Syncs that either failed to sync or were partially successful. Selecting this step takes you to a table of all syncs with one or more failed collections. Select a sync from the table to view the discard reason, any collections that failed, the status, and the number of rows that synced for each collection.
* **Successfully synced**: A record of all successful or partially successful syncs made with your destination. To view the reason a partially successfully sync was not fully successful, see the Failed to sync step.

The following image shows a storage destination with 23 partially successful syncs:

![Delivery Overview with the 'Failed to Sync' step selected and a table of recent syncs.](https://docs-resources.prod.twilio.com/0fd410f706f2777e82e50f892391e9b6ed7642cb6d0e55b309384dc94c30fa9a.png)

##### Linked Audiences to Snowflake destination

You can view information about events sent from Linked Audiences downstream to the Snowflake destination with the following pipeline view:

* **Events from audience**: Events that Segment created for your activation. The number of events for each compute depends on the changes detected in your audience membership.
* **Filtered at source**: Events discarded by Protocols: either by the [schema settings](/docs/segment/protocols/enforce/schema-configuration/) or [Tracking Plans](/docs/segment/protocols/tracking-plan/create/).
* **Filtered at destination**: Events that were discarded due to [Destination Filters](/docs/segment/guides/filtering-data/#destination-filters), [filtering in the Integrations object](/docs/segment/guides/filtering-data/#filtering-with-the-integrations-object), [Destination Insert functions](/docs/segment/connections/functions/insert-functions/), or [per source schema integration filters](/docs/segment/guides/filtering-data/#per-source-schema-integrations-filters). [Actions destinations](/docs/segment/connections/destinations/actions/) also have a filtering capability: for example, if your Action is set to only send Identify events, all other event types will be filtered out. Actions destinations with incomplete triggers or disabled mappings are filtered out at this step. [Consent Management](/docs/segment/privacy/consent-management/) users also see events discarded due to consent preferences.
* **Events pending retry**: A read-only box that shows the number of events that are awaiting retry.
* **Failed delivery**: Events that have been discarded due to errors or unmet destination requirements. Select a discard reason from the table to view all events that failed, sorted by collection. For information about common errors, see [Warehouse Errors](/docs/segment/connections/storage/warehouses/warehouse-errors).
* **Successful delivery**: Events that were successfully delivered to Snowflake.

#### Destinations connected to Engage Destinations

> \[!NOTE]
>
> During the Public Beta, you can filter your pipeline view by audience.

Destinations connected to an Audience have the following steps in the pipeline view:

* **Events from audience**<sup>\*</sup>: Events that Segment created for your activation. The number of events for each compute depends on the changes detected in your audience membership.
* **Filtered at source**: Events discarded by Protocols: either by the [schema settings](/docs/segment/protocols/enforce/schema-configuration/) or [Tracking Plans](/docs/segment/protocols/tracking-plan/create/).
* **Filtered at destination**: If any events aren't eligible to be sent (for example, due to destination filters, insert function logic, and so on), Segment displays them at this step.
* **Events pending retry**: A step that reveals the number of events that are awaiting retry. Unlike the other steps, you cannot click into this step to view the breakdown table.
* **Failed delivery**: Events that Segment *attempted* to deliver to your destination, but that ultimately *failed* to be delivered. Failed delivery might indicate an issue with the destination, like invalid credentials, rate limits, or other error statuses received during delivery.
* **Successful delivery**: Events that Segment successfully delivered to your destination. You'll see these events in your downstream integrations.

<sup>\*</sup>*The "Events from audience" step is currently only available for Linked Audiences.*

### Breakdown table

The breakdown table provides you with greater detail about the selected events.

To open the breakdown table, select either the first step in the pipeline view, the last step in the pipeline view, or select a discard step and then click on a discard reason.

The breakdown table displays the following details:

* **Event type**: The Segment spec event type (Track call vs. Identify call, for example)
* **Event name**: The event name, provided by you or the source (*not available for inspection at all steps*)
* **App version**: The app/release version, provided by you or the source (*not available for inspection at all steps*)
* **Event count**: How many of each event either successfully made it through this pipeline step (in the case of the first or last steps in the pipeline view) or were filtered out (if you access it from a discard table)
* **% Change**: Insight into how the event counts differ from the last comparable time range as a percentage<sup>1</sup>

<sup>1:</sup> *Segment calculates the related change percentage by subtracting the percent of events impacted in the previous time period from the percent of impacted events in the current time period. For example, if last week 15% of your events were filtered at a source, but this week, 22% of your events were filtered at a source, you would have a related change percentage of 7%.*

### Discard table

The discard table provides you with greater detail about the events that failed to deliver or were filtered out of your sources and destinations.

To open the discard table, click on one of the discard steps. If you click on a row in the discard table, you can see the breakdown table for the discarded events.

The discard table displays the following details:

* **Discard reason**: Any relevant error code, message, or description associated with the event's failure. When possible, Delivery Overview links to any troubleshooting information you can use to get your events up and running again. Clicking on a discard reason brings you to the [breakdown table](#breakdown-table) where you can see more detail about discarded events. For more context about discard reasons, see the [Troubleshooting](#troubleshooting) documentation.
* **Details & Samples**: View up to ten samples over the selected time range. Examine the error message and reason for the error or discard and inspect the payloads involved with the attempted transaction (*not available for inspection at all steps*)
* **Event count**: How many of each event were discarded in this pipeline step
* **% Change**: Insight into how the event counts differ from the last comparable time range as a percentage<sup>1</sup>

<sup>1:</sup> *Segment calculates the related change percentage by subtracting the percent of events impacted in the previous time period from the percent of impacted events in the current time period. For example, if last week 15% of your events were filtered at a source, but this week, 22% of your events were filtered at a source, you would have a related change percentage of 7%.*

## When should I use Delivery Overview?

Delivery Overview is useful to diagnose delivery errors in the following scenarios:

* **When setting up a destination, tracking plan, or filter for the first time**: With Delivery Overview, you can verify that the data you're sending to a new destination, a new tracking plan, or a new filter arrives in your destination as expected.
* **When data is missing from your destination**: The pipeline view can help you see where your data is getting "stuck" on the way to your destination, which can help you quickly diagnose and address problems in your data pipeline.
* **When emission or delivery volume fluctuates out of expected norms**: Delivery Overview will highlight where the largest rate change(s) occurred and what events were associated with the change.

> \[!NOTE]
>
> Because Engage uses sources for multiple purposes, you can expect to see `filtered at destination` events with the integrations object in destinations linked to Engage. Engage uses the integrations object to route events to destinations you've added to your audiences, traits, and journey steps. As a result, some events aren't meant to be delivered by the destination, so the integrations object filters them.

## Where do I find Delivery Overview?

To view the Delivery Overview page:

1. Sign into Segment.
2. From the homepage, navigate to **Connection** > **Destinations** and click on the destination you'd like to investigate.
3. Select the **Delivery Overview** tab from the destination header.

## How do I use Delivery Overview?

To use Delivery Overview:

1. Navigate to the destination you'd like to review, and select **Delivery Overview** from the destination header.
2. On the **Delivery Overview** tab, select a time period from the time picker. The time picker reflects data in the user's local time. <br /> ***Optional***: *Turn the metric toggle off if you'd like to see the quantity of events as counts instead of percentages. Delivery Overview shows percentages by default.*
3. Select a success or discard step to view additional context about the events that passed through that step.

## How does Delivery Overview differ from other Segment monitoring and observability tools?

With Source Debugger or Event Delivery, you can only verify that events are successfully making it from your source or to your destination. If events fail, you have to troubleshoot to see where in the pipeline your events are getting stuck. With Event Tester, you can verify that your event makes it from your source to your destination, but if the results aren't what you expected, you're stuck troubleshooting your source, filters, tracking plans, and destinations.

With Delivery Overview, you can verify that your source receives your events, that any filters and tracking plans work as expected, and that events successfully make it to your destination. Any errors or unexpected behavior can be identified using the pipeline view, leading to quicker resolution.

## How can I configure alerts?

You can use the Event Delivery alerting features (Delivery Alerts) by selecting the **Alerts** tab in the destination header. Once you enable alerts, if the successful delivery rate of all events is less than the threshold percentage in the last 24 hours, you'll be notified through in-app notification and/or workspace email.

Note that this is dependent on your [notification settings](/docs/segment/segment-app/#segment-settings). For example, if the threshold is set to 99%, then you'll be notified each time less than 100% of events fail.

You can also use [Connections Alerting](/docs/segment/connections/alerting), a feature that allows Segment users to receive in-app, email, and Slack notifications related to the performance and throughput of an event-streaming connection.

Connections Alerting allows you to create two different alerts:

* **Source volume alerts**: These alerts notify you if your source ingests an abnormally small or large amount of data. For example, if you set a change percentage of 4%, you would be notified when your source ingests less than 96% or more than 104% of the typical event volume.
* **Successful delivery rate alerts**: These alerts notify you if your destination's successful delivery rate falls outside of a percentage that you set. For example, if you set a percentage of 99%, you would be notified if you destination had a successful delivery rate of 98% or below.

## How "fresh" is the data in Delivery Overview?

The data in Delivery Overview has an expected latency of approximately 30 seconds after event ingestion, but this may vary, depending on the features you've enabled in your workspace and spikes in volume. Segment delays the data visible in the Delivery Overview UI by 5 minutes to allow for more precise metric correlation. Segment does not impose the 5 minute delay if you access data using the Public API.

## Why is the Delivery Overview page only available for cloud-mode destinations?

Similar to Segment's [Event Delivery](/docs/segment/connections/event-delivery/) feature, the Delivery Overview page is only available for server-side integrations (also known as cloud-mode destinations). You won't be able to use the Delivery Overview page for client side integrations (also known as device-mode destinations) because device-mode data is sent directly to the destination tool's API. In order to report on deliverability, data must be sent to destinations using a server-side connection.

## Troubleshooting

The Delivery Overview pipeline steps Failed on Ingest, Filtered at Source, Filtered at Destination, and Failed Delivery display a [discard table](#discard-table) with information about why your events failed or were discarded.

This table provides a list of all possible discard reasons available at each pipeline step.

***

Category: Failed on Ingest
Discard Reason: Empty batch result
Error Code: empty\_batch\_result
What Happened?: No messages found for batch result. After processing messages within batch, no messages returned
Remedy: Check the event payload and client instrumentation

***

Category: Failed on Ingest
Discard Reason: Source disabled
Error Code: source\_disabled
What Happened?: Source is not enabled
Remedy: Check the source settings

***

Category: Failed on Ingest
Discard Reason: Multi user error
Error Code: multi\_user\_error
What Happened?: One or more messages within the batch had an error. Only messages without errors were published
Remedy: Review individual payloads for each error. For more information, see the HTTP API Errors documentation

***

Category: Failed on Ingest
Discard Reason: Batch is empty
Error Code: empty\_batch
What Happened?: The batch request contained no messages
Remedy: Check the event payload and client instrumentation. For more information, see the HTTP API Batch documentation

***

Category: Failed on Ingest
Discard Reason: No userID or anonymousID
Error Code: no\_user\_anon\_id
What Happened?: The userID or anonymousID was not provided
Remedy: Check the event payload and client instrumentation.  For more information, see the Anatomy of a Segment message documentation

***

Category: Failed on Ingest
Discard Reason: Event not defined
Error Code: event\_not\_defined
What Happened?: Track event did not have event name
Remedy: Check the event payload and client instrumentation.  For more information, see the Spec: Track documentation

***

Category: Failed on Ingest
Discard Reason: Track event not a string
Error Code: event\_not\_string
What Happened?: Track event name is not a string
Remedy: Check the event payload and client instrumentation.  For more information, see the Spec: Track documentation

***

Category: Failed on Ingest
Discard Reason: Properties field not an object
Error Code: properties\_not\_object
What Happened?: The properties field must be an object type
Remedy: Check the event payload and client instrumentation.  For more information, see the Spec: Track documentation

***

Category: Failed on Ingest
Discard Reason: Traits must be an object
Error Code: traits\_not\_object
What Happened?: The traits field must be an object type
Remedy: Check the event payload and client instrumentation.  For more information, see the Spec: Track documentation

***

Category: Failed on Ingest
Discard Reason: Name must be non-empty string
Error Code: name\_not\_string
What Happened?: For Page or Screen calls, name field was an empty string or not a string
Remedy: Check the event payload and client instrumentation.  For more information, see the Spec: Page documentation

***

Category: Failed on Ingest
Discard Reason: Category field must be a string
Error Code: category\_not\_string
What Happened?: For Page or Screen calls, category field was an empty string or not a string
Remedy: Check the event payload and client instrumentation.  For more information, see the Spec: Page documentation

***

Category: Failed on Ingest
Discard Reason: Identifier missing from payload
Error Code: id\_required
What Happened?: All payloads require a userId and/or an anonymousId
Remedy: Ensure all payloads have a userId and/or anonymousId.  For more information, see the Anatomy of a Segment message documentation

***

Category: Failed on Ingest
Discard Reason: Identifier not a string
Error Code: id\_not\_string
What Happened?: The userID or anonymousId was an empty string or not a string
Remedy: Check the event payload and client instrumentation.  For more information, see the Anatomy of a Segment message documentation

***

Category: Failed on Ingest
Discard Reason: Consent categoryPreference object does not exist
Error Code: consent\_categorypreferences\_should\_exist
What Happened?: context.consent.categoryPreferences object is required
Remedy: Check the event payload and instrumentation for the Segment Consent Preference Updated Track event. For more information, see the Segment Consent Preference Updated event documentation

***

Category: Failed on Ingest
Discard Reason: Consent Categories field must be an object for "Segment Consent Preference Updated" event
Error Code: consent\_categorypreferences\_fields\_should\_be\_object
What Happened?: context.consent.categoryPreferences must be an object
Remedy: Check the event payload and instrumentation for the Segment Consent Preference Updated Track event. For more information, see the Segment Consent Preference Updated event documentation

***

Category: Failed on Ingest
Discard Reason: Consent category preferences not boolean
Error Code: consent\_categorypreferences\_fields\_should\_be\_bool
What Happened?: Consent preferences for the categories must be boolean
Remedy: Check the event payload and instrumentation for the Segment Consent Preference Updated Track event. For more information, see the Segment Consent Preference Updated event documentation

***

Category: Failed on Ingest
Discard Reason: Device advertisingId not a string
Error Code: device\_advertisingid\_should\_be\_string
What Happened?: advertisingId must be a string
Remedy: Check the event payload and instrumentation for the Segment Consent Preference Updated Track event.

***

Category: Failed on Ingest
Discard Reason: Consent version not a number
Error Code: consent\_version\_should\_be\_number
What Happened?: Version must be a number
Remedy: Check the event payload and instrumentation for the Segment Consent Preference Updated Track event.

***

Category: Failed on Ingest
Discard Reason: Could not decode payload
Error Code: bad\_request
What Happened?: The payload could have an incorrect content type, body, or something else
Remedy: Fix the payload and include any missing details.  For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Could not read write key from url
Error Code: unknown\_source
What Happened?: Failed to find source with \[write\_key]
Remedy: Verify and use the appropriate function webhook URL.  For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Could not find source from write key
Error Code: unknown\_source
What Happened?: Failed to find source with \[write\_key]
Remedy: Verify and use the appropriate function webhook URL.  For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Source missing write key
Error Code: unknown\_source
What Happened?: Failed to find source with \[write\_key]
Remedy: Verify and use the appropriate function webhook URL.  For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Could not decode internal settings of the source
Error Code: invalid\_settings
What Happened?: Function internal settings are invalid
Remedy: Fix the function settings. If you need more information to troubleshoot the function settings, contact support. For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Could not parse content-type
Error Code: BAD\_REQUEST
What Happened?: The payload has an incorrect content type
Remedy: Fix the payload and include any missing details.Make sure you're using 'application/json' or 'application/x-www-form-urlencoded' as your content-type header value.  For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Could not parse request body
Error Code: BAD\_REQUEST
What Happened?: The payload has an incorrect body
Remedy: Ensure the payload uses accurate JSON. For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Unsupported content-type
Error Code: BAD\_REQUEST
What Happened?: The payload has an incorrect content type
Remedy: Fix the payload and include any missing details. Make sure you're using 'application/json' or 'application/x-www-form-urlencoded' as your content-type header value.  For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Source/project is disabled
Error Code: source\_disabledorSOURCE\_DISABLED
What Happened?: The source/project instance is disabled
Remedy: Enable the source/project instance.  For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Workspace is locked out
Error Code: locked\_workspace
What Happened?: The workspace is disabled
Remedy: Contact support for more details

***

Category: Failed on Ingest
Discard Reason: Function not deployed
Error Code: internal
What Happened?: The function is not deployed properly
Remedy: Re-deploy the function. Contact support if the issue persists. For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Unexpected deploy type
Error Code: internal
What Happened?: The function must be deployed as an AWS lambda type
Remedy: Re-deploy the function. Contact support if the issue persists. For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Invalid deploy ID
Error Code: internal
What Happened?: The function is missing the lambda ARN
Remedy: Re-deploy the function. Contact support if the issue persists. For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Could not call tracking API
Error Code: TRACKING\_API\_FAILED
What Happened?: Failed to call tracking API
Remedy: Check the payload. Contact support if issue persists. For more information, see the HTTP API documentation

***

Category: Failed on Ingest
Discard Reason: Could not call set API
Error Code: SET\_API\_FAILED
What Happened?: Failed to call set API because the client was closed
Remedy: Check the payload. Contact support for more details. For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Could not call set API
Error Code: SET\_API\_FAILED
What Happened?: Failed to call set API
Remedy: Check the payload. Contact support for more details. For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Failed to encode into lambda input format
Error Code: lambda\_errorinternal
What Happened?: Internal encoding error
Remedy: Contact support for more details

***

Category: Failed on Ingest
Discard Reason: Failed to create lambda client
Error Code: lambda\_err
What Happened?: Unexpected lambda error
Remedy: Contact support for more details

***

Category: Failed on Ingest
Discard Reason: Lambda API permanent error
Error Code: lambda\_err
What Happened?: Unexpected lambda error
Remedy: Contact support for more details

***

Category: Failed on Ingest
Discard Reason: Lambda API temporary error
Error Code: lambda\_err
What Happened?: Unexpected lambda error
Remedy: Contact support for more details

***

Category: Failed on Ingest
Discard Reason: Too many lambda API requests
Error Code: too\_many\_requests
What Happened?: The incoming event traffic rate exceeds the expected rate.
Remedy: Contact support for more details.  For more information, see the Rate Limits documentation

***

Category: Failed on Ingest
Discard Reason: Function timeout
Error Code: FUNCTION\_TIMEOUT
What Happened?: The function timed out
Remedy: Optimize the function code.  For more information, see the Functions Usage documentation

***

Category: Failed on Ingest
Discard Reason: Function retry error
Error Code: RETRY\_ERROR
What Happened?: Retry error from function code. Retry attempt will be done
Remedy: Function will be retried. Segment's systems have a retry mechanism where an event will be retried 6 times over a four-hour period with exponential backoff.  For more information, see the Source Functions documentation

***

Category: Failed on Ingest
Discard Reason: Function execution error
Error Code: INVOKE\_ERROR
What Happened?: The function failed to execute
Remedy: Check the function code for syntax and config issues. Contact support if issue persists.

***

Category: Failed on Ingest
Discard Reason: Failed to decode function output
Error Code: internal
What Happened?: Internal error
Remedy: Reach out to support for more details

***

Category: Failed on Ingest
Discard Reason: Failed is not deployed
Error Code: BAD\_DEPLOY
What Happened?: The function is not deployed properly
Remedy: Re-deploy the function and then reach out to support if issue persists. For more information, see the Source Functions documentation.

***

Category: Failed on Ingest
Discard Reason: Unexpected DeployType. Supported is aws::lambda
Error Code: BAD\_DEPLOY
What Happened?: The function is not deployed properly
Remedy: Reach out to support if issue persists. For more information, see the Source Functions documentation.

***

Category: Failed on Ingest
Discard Reason: Invalid deploy ID, missing lambda ARN
Error Code: BAD\_DEPLOY
What Happened?: The function is not deployed properly
Remedy: Re-deploy the function and then reach out to support if issue persists. For more information, see the Source Functions documentation.

***

Category: Filtered at Source
Discard Reason: Common schema violation
Error Code: common\_schema\_violation
What Happened?: Event violated common JSON schema of Tracking Plan
Remedy: Check event payload against the connected Tracking Plan Common JSON Schema. If the event passes the correct information, then update the tracking plan common JSON schema with the new information. or:Update the source configurations settings to allow events that violate the connected Tracking Plan JSON schema:Source > Settings > Schema Configurations > Advanced Blocking Controls  For more information, see the Common JSON schema documentation

***

Category: Filtered at Source
Discard Reason: Event discard setting
Error Code: event\_setting
What Happened?: The Source is configured to discard events of this type
Remedy: Check source schema filters.  For more information, see the  Source Schema Integrations Filters documentation

***

Category: Filtered at Source
Discard Reason: Schema violation
Error Code: schema\_violation
What Happened?: Source schema is configured to block events that violate the connected Tracking Plan JSON schema.
Remedy: Check event payload against the connected Tracking Plan Common JSON Schema. If the event passes the correct information, then update the tracking plan common JSON schema with the new information. or:Update the source configurations settings to allow events that violate the connected Tracking Plan JSON schema:Source > Settings > Schema Configurations > Advanced Blocking Controls  For more information, see the Customize your schema controls documentation

***

Category: Filtered at Source
Discard Reason: Unplanned event
Error Code: unplanned
What Happened?: Source schema configured to block events not defined in the connected Tracking Plan
Remedy: Check source Configurations:Settings > Schema Configurations > to allow unplanned events.OR:Add the new event in the connected tracking plan so it's recognized as a planned event. For more information, see the Customize your schema controls documentation

***

Category: Filtered at Source
Discard Reason: Unplanned and schema violation
Error Code: unplanned\_and\_schema\_violation
What Happened?: Source schema configured to block events not defined in the connected tracking plan. The event also violated the connected tracking plan JSON schema
Remedy: Update the source schema configurations to allow unplanned eventsOR:Add the new event in the connected tracking plan so it's recognized as a planned event.

***

Category: Filtered at Destination
Discard Reason: Filtered by rules
Error Code: FILTERED\_BY\_RULES
What Happened?: Event matched a Destination Filter rule
Remedy: To include events like this, change the Destination Filter to be more specific or exclude this event. For more information, see the Destination Filters documentation

***

Category: Filtered at Destination
Discard Reason: Filtered by integrations object
Error Code: FILTERED\_BY\_INTEGRATIONS\_OBJECT
What Happened?: The event was filtered because sending to the destination in the integrations object is disabled
Remedy: To include events like this, remove filtering from the integrations object.  For more information, see the Filtering with the integrations object documentation

***

Category: Filtered at Destination
Discard Reason: Unkown integration
Error Code: UNKNOWN\_INTEGRATION
What Happened?: Destination not registered in the integrations info
Remedy: Check the event payloads integrations object to ensure all listed destinations are valid. Refer to the destination's documentation for acceptable names.  For more information, see the Filtering with the integrations object documentation

***

Category: Filtered at Destination
Discard Reason: Message sent client side
Error Code: MESSAGE\_SENT\_CLIENT\_SIDE
What Happened?: The message was already sent client side
Remedy: These events are being sent client side in Device Mode and will not be sent from Segment's servers. Events in this category are sent directly from your website or app to the downstream destination.  For more information, see the Destination methods comparison documentation

***

Category: Filtered at Destination
Discard Reason: Unsupported event type
Error Code: UNSUPPORTED\_EVENT\_TYPE
What Happened?: The destination does not support this event type
Remedy: For more information about the events your destination can consume, see the Filtering with the integrations object documentation

***

Category: Filtered at Destination
Discard Reason: Invalid settings
Error Code: INVALID\_SETTINGS
What Happened?: The event type is missing one or more required settings
Remedy: Check your integration type. For more information, see the Destination settings documentation

***

Category: Filtered at Destination
Discard Reason: Functions lock out
Error Code: FUNCTIONS\_LOCK\_OUT
What Happened?: The function wasn't executed because the workspace reached its paid limit for functions
Remedy: To increase your functions limits, upgrade your workspace plan. For more information, see the Functions usage limits documentation

***

Category: Filtered at Destination
Discard Reason: Internal error
Error Code: INTERNAL
What Happened?: Something went wrong
Remedy: Contact support for more information

***

Category: Filtered at Destination
Discard Reason: Action missing mapping or trigger
Error Code: NO\_MATCHING\_MAPPING
What Happened?: The Actions destination is missing either a mapping or trigger for this event
Remedy: Your event does not meet any trigger cases for your Actions mappings. Please add a mapping with a trigger that accepts this event. For more information, see the Actions destination FAQ

***

Category: Filtered at Destination
Discard Reason: Filtered at mapping
Error Code: FILTERED\_AT\_MAPPING
What Happened?: The event was filtered because it did not match the Actions destination mapping
Remedy: Contact support for more information

***

Category: Filtered at Destination
Discard Reason: Failed data encryption
Error Code: FAILED\_DATA\_ENCRYPTION
What Happened?: Message delivery failed due to data encryption; either there was an issue encrypting data or failed to deliver data with encrypted values
Remedy: Check if the destination can accept encrypted data in the fields being encrypted

***

Category: Filtered at Destination
Discard Reason: Invalid request
Error Code: bad\_request
What Happened?: The request is either malformed or the function threw an unknown exception
Remedy: Review the payload to ensure that it aligns with Segment's expectations. For more information, see the HTTP API Errors documentation

***

Category: Filtered at Destination
Discard Reason: Invalid settings
Error Code: invalid\_settings
What Happened?: The function's internal settings are invalid
Remedy: Fix the function's settings or reach out to support for more details.

***

Category: Filtered at Destination
Discard Reason: Invalid event
Error Code: message\_rejected
What Happened?: The function threw exceptions such as InvalidEventPayload or ValidationError
Remedy: Fix the payload to contain the data needed by the function

***

Category: Filtered at Destination
Discard Reason: Unsupported content-type
Error Code: unsupported\_event\_type
What Happened?: EventNotSupported or Missing event handler
Remedy: Add the missing handler to the function code

***

Category: Filtered at Destination
Discard Reason: Failed to process request
Error Code: internal
What Happened?: Segment failed to process the request
Remedy: Contact support for more information

***

Category: Filtered at Destination
Discard Reason: Too many incoming lambda API requests
Error Code: too\_many\_requests
What Happened?: The incoming event traffic rate exceeds the expected rate
Remedy: Contact support for more information

***

Category: Filtered at Destination
Discard Reason: Function timeout
Error Code: gateway\_timeout
What Happened?: The function timed out
Remedy: Check the function code or contact support to increase the timeout

***

Category: Filtered at Destination
Discard Reason: Function retry error
Error Code: retry
What Happened?: Retry errror from function code
Remedy: Function will be retried automatically

***

Category: Filtered at Destination
Discard Reason: Filtered by end user consent
Error Code: FILTERED\_BY\_END\_USER\_CONSENT
What Happened?: The message was dropped due to the user's consent preferences
Remedy: Contact support for more information

***

Category: Failed Delivery
Discard Reason: Invalid settings
Error Code: INVALID\_SETTINGS
What Happened?: The event is missing some required settings as configured for that integration per event type
Remedy: Review your Segment settings and make any necessary updates.  For more information, see the Integration Error Codes documentation

***

Category: Failed Delivery
Discard Reason: 429
Error Code: 429
What Happened?: Too many requests were sent in a time frame
Remedy: These events will be retried automatically.  If the events eventually fail due to too much volume, contact the partner to raise your rate limit.  If the destination allows batching in Segment, you may be able to reduce the total number of requests. For more information, see the Integration Error Codes documentation

***

Category: Failed Delivery
Discard Reason: Erefused
Error Code: EREFUSED
What Happened?: There was a temporary problem connecting to the destination's API
Remedy: This event will be retried automatically.  If the event eventually fails, your Segment configuration settings may contain some invalid settings, or the integration may not be operational.  If your configurations are valid, consider disabling this integration or conact the intagration partner.  For more information, see the Integration Error Codes documentation

***

Category: Failed Delivery
Discard Reason: Unsupported event type
Error Code: UNSUPPORTED\_EVENT\_TYPE
What Happened?: The destination does not support this event type
Remedy: Contact support for more information

***

Category: Failed Delivery
Discard Reason: Message rejected
Error Code: MESSAGE\_REJECTED
What Happened?: Request was blocked
Remedy: Check the event payload for required fields and data types for all fields and compare it to your destination configuration.  For more information, see the Integration Error Codes documentation

***

Category: Failed Delivery
Discard Reason: 400/Bad request
Error Code: 400orBAD\_REQUEST
What Happened?: The downstream API rejected the payload
Remedy: Review the Response from Destination tab for more information.  For more context, see the Integration Error Codes documentation

***

Category: Failed Delivery
Discard Reason: Etimedout
Error Code: ETIMEDOUToretimedout
What Happened?: The downstream destination did not send an API response back to Segment in a reasonable amount of time
Remedy: No action is needed. The delivery will be retried automatically

***

Category: Failed Delivery
Discard Reason: Enotfound
Error Code: ENOTFOUND
What Happened?: The endpoint URL cannot be found or does not exist
Remedy: Check the Request from Segment tab to see which URL the request is being sent to and verify that the URL there is correct

***

Category: Failed Delivery
Discard Reason: Internal
Error Code: INTERNAL
What Happened?: There was a problem connecting to the destination's server
Remedy: No action needed. Events will be retried when there's a successful connection

***

Category: Failed Delivery
Discard Reason: 404
Error Code: 404
What Happened?: The server cannot find the requested resource
Remedy: The server cannot find the requested resource. This can happen for a number of reasons, such as:  The requested resource does not exist.  The requested resource has been moved or deleted.  There is a typo in the URL.  The server is experiencing technical difficulties.

***

Category: Failed Delivery
Discard Reason: 307
Error Code: 307
What Happened?: The requested resource was temporarily redirected
Remedy: Segment will automatically retry the request using the redirected URL

***

Category: Failed Delivery
Discard Reason: 502
Error Code: 502
What Happened?: The server recieved an invalid response from the upstream server
Remedy: No action needed. Segment will try to send the payload again.  For more information, see the Integration Error Codes documentation

***

Category: Failed Delivery
Discard Reason: 503
Error Code: 503
What Happened?: Server could not handle the request
Remedy: No action needed. Segment will try to send the payload again.  For more information, see the Integration Error Codes documentation

***

Category: Failed Delivery
Discard Reason: Retry
Error Code: RETRY
What Happened?: The intitial request was unsuccessful. The request was sent again
Remedy: No action needed. Segment will continue to retry sending the payload.  For more information, see the Integration Error Codes documentation

***

Category: Failed Delivery
Discard Reason: 401
Error Code: 401
What Happened?: The request could not be completed because the authentication credentials are either invalid or expired
Remedy: Re-authenticate your account with the partner and update your authentication settings in Segment. For more information, see the Integration Error Codes documentation

***

Category: Failed Delivery
Discard Reason: Econnreset
Error Code: ECONNRESET
What Happened?: Segment could not establish a connection to the partner server
Remedy: Your Segment configurations might contain some invalid settings or the integration may no longer be operational. If your configurations are valid, disable this integration or contact the integration partner.For more information, see the Integration Error Codes documentation

***
