# Add additional TaskRouter data

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

## Overview

Insights already has a basic integration with your underlying Task data, but you can choose to provide additional TaskRouter data to enhance your Flex Insights reports.

## Best practices for Flex Insights

When changing your Flex Insights implementation, you should always [use a separate Twilio account for testing](/docs/flex/developer/insights). Once things are behaving as expected, you can implement your changes in your production account. We highly recommend extensive testing in non-production environments due to impact of unexpected data on reporting.

### Requests to modify programmatically added data

Flex Insights keeps input data in its verbatim form as a backup. Any requests to fix or modify programmatically added data requires engagement of Twilio engineering teams. Such requests are prioritized on case-by-case basis. The requests may be rejected depending on the estimated effort to implement them and impact they have.

## Enhance your Conversation data

Flex Insights extracts data directly from TaskRouter attributes. These extracted attributes work without any additional implementation on your side. You can, however, provide additional information to Insights or override default values extracted from TaskRouter.

Insights extracts attributes from the following events:

* `reservation.created`
* `reservation.rejected`
* `reservation.timeout`
* `reservation.canceled`
* `reservation.rescinded`
* `reservation.completed`

Changing task attributes during the task life cycle won't affect data in Flex Insights. Task attributes that are set when task is completed or canceled are passed to Flex Insights. No later updates to task attributes have impact on attributes and measures in Flex Insights.

Media links, such as links to recordings, can be updated two minutes after a task is completed. After two minutes, the task is deleted in TaskRouter and media links can no longer be updated. Learn more about how to add task attributes using the [TaskRouter API](/docs/taskrouter/api/task#create-a-task-resource).

### Twilio canceled and completed tasks

When you cancel or complete a task using Twilio's TaskRouter API, you can state the reason the task was completed or canceled. This allows you to segment and filter conversations by their outcome and the reasons why a conversation was canceled or completed. Learn more about [updating and closing tasks](/docs/taskrouter/api/task#update-a-task-resource).

### Add links to recordings

You can append links to call recordings to a task's attributes automatically. This allows your users to listen to calls in the [Insights Player](/docs/flex/end-user-guide/insights/player).

To add an automatic recordings URL to the task attributes, go to **Twilio Console** > **Flex** > **Channel management** > **Voice** and turn on the **Call Recording** setting.

![Flex settings with call recording toggle set to on and legal compliance note.](https://docs-resources.prod.twilio.com/e79a3f9d7fc37a16ff76354ebf4222464154355e134dd0eb21dc85fea10bcd21.png)

The Call Recording setting in Flex Console uses the [Create a Recording Twilio REST API resource](/docs/voice/api/recording#create-a-recording-resource). It records the full task/conference.

If you want to record only a portion of the call, use custom logic for the recording. This requires the same API endpoint updates. We recommend turning off the Call Recording setting in the Flex Console if you use custom logic. In this case, to attach a recording to a task, add the `conversations` object to the task attribute. Then, put a key `segment_link` to the object `conversations` with a value containing the URL of the related recording.

```json
"conversations": {
    "segment_link": "https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

You can send the `segment_link` after a task is completed via a task update once Twilio makes the link to the recording available. However, you must make the update within two minutes after task completion.

The link to your recorded audio must be either publicly accessible or include the authorization information in the link URL - either in the URL path or in the URL query.

#### Legal requirements for recording calls

If you choose to record voice or video calls, you need to comply with certain laws and regulations, including those regarding obtaining consent to record (such as California's Invasion of Privacy Act and similar laws in other jurisdictions). To learn more, see [Legal Considerations](https://help.twilio.com/hc/en-us/articles/360011522553-Legal-Considerations-with-Recording-Voice-and-Video-Communications).

### Link tasks to a Conversation

In Insights, a Conversation encompasses the handling of one customer.

The Conversation is split into Segments of different kinds, for example 'Conversation' or 'Queue' (see the article on [Conversation Structure](/docs/flex/end-user-guide/insights/conversation-structure) for more details). When a handling agent, communication channel or queue changes, a new Segment begins. This often happens when agents transfer customers to other departments or other agents.

A Conversation may consist of several Segments and therefore typically contains multiple TaskRouter tasks.

To link tasks into a single Conversation, add the object `conversations` to the task attributes. Then put the property `conversation_id` to the object `conversations` with a value that's the same for all tasks related to the Conversation. We recommend using the Task SID of the first task as the `conversation_id`. You don't need to set `conversation_id` for the first task.

```json
"conversations": {
    "conversation_id": "WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

You can provide additional details about individual conversations using Twilio's `task_attributes` property. Custom task attributes help you to build a more complete picture of what's happening in your contact center.

### Add Custom Attributes and Measures

You can set up to ten Custom Conversation Measures (numeric values) and set up to ten Custom Conversation Attributes (text values) to hold custom fields data next to conversations. The code sample below shows an example of task attributes that you can add to tasks using Twilio's TaskRouter API. Unknown task attributes are silently ignored.

> \[!WARNING]
>
> We recommend [using Labels for numbered custom attributes](/docs/flex/developer/insights/labels) if you store IDs or similar high cardinality values in custom attributes. High cardinality values are values that are very often unique for a given conversation, customer, or agent.

All custom attributes are optional. The more details you provide, the more details will be available for analytics.

```javascript
{
  "conversations" : {
    "segment_link" : "https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "abandoned" : "No",
    "abandoned_phase" : null,
    "activity" : "On a Break",
    "campaign" : "Pension Insurance 2",
    "case" : "Retention #24567",
    "channel" : "Call",
    "content" : "bonus retention",
    "conversation_id" : "WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "conversation_attribute_1" : "Attribute Value 1",
    "conversation_attribute_2" : "Attribute Value 2",
    "conversation_attribute_3" : "Attribute Value 3",
    "conversation_attribute_4" : "Attribute Value 4",
    "conversation_attribute_5" : "Attribute Value 5",
    "conversation_attribute_6" : "Attribute Value 6",
    "conversation_attribute_7" : "Attribute Value 7",
    "conversation_attribute_8" : "Attribute Value 8",
    "conversation_attribute_9" : "Attribute Value 9",
    "conversation_attribute_10" : "Attribute Value 10",
    "conversation_label_1" : "Label 1",
    "conversation_label_2" : "Label 2",
    "conversation_label_3" : "Label 3",
    "conversation_label_4" : "Label 4",
    "conversation_label_5" : "Label 5",
    "conversation_label_6" : "Label 6",
    "conversation_label_7" : "Label 7",
    "conversation_label_8" : "Label 8",
    "conversation_label_9" : "Label 9",
    "conversation_label_10" : "Label 10",
    "destination": "External Queue",
    "direction" : "Outbound",
    "external_contact" : "+18001234567",
    "followed_by" : "External Transfer",
    "handling_department_id" : "1",
    "handling_department_name" : "Department 1",
    "handling_department_name_in_hierarchy" : "Company ▸ Department 1",
    "handling_team_id" : "2",
    "handling_team_name" : "Sales 2",
    "handling_team_name_in_hierarchy" : "London ▸ Sales ▸ Sales 2",
    "hang_up_by" : "Customer",
    "in_business_hours" : "Yes",
    "initiated_by" : "Customer",
    "initiative" : "Leader in Insurance",
    "ivr_path" : "1 ▸ 2",
    "language" : "English",
    "order" : 1,
    "outcome" : "Retention - Success",
    "preceded_by" : "Warm Transfer",
    "productive" : null,
    "queue" : "Outbound Dialer - England",
    "service_level" : "OK",
    "source": "Waiting Room",
    "virtual" : "No",
    "workflow" : "Outbound UK",
    "activity_time" : null,
    "average_response_time": 13,
    "conversation_measure_1" : 101,
    "conversation_measure_2" : 102,
    "conversation_measure_3" : 103,
    "conversation_measure_4" : 104,
    "conversation_measure_5" : 105,
    "conversation_measure_6" : 106,
    "conversation_measure_7" : 107,
    "conversation_measure_8" : 108,
    "conversation_measure_9" : 109,
    "conversation_measure_10" : 110,
    "first_response_time": 30,
    "focus_time": 20,
    "hold_time" : 0,
    "ivr_time" : 0
  },

  "customers" : {
    "name" : "John Doe",
    "customer_link" : null,
    "customer_attribute_1" : "Attribute Value 1",
    "customer_attribute_2" : "Attribute Value 2",
    "customer_attribute_3" : "Attribute Value 3",
    "customer_label_1" : "Label 1",
    "customer_label_2" : "Label 2",
    "customer_label_3" : "Label 3",
    "acquisition_date" : null,
    "category" : "VIP",
    "customer_manager" : "Financial Partners Corp.",
    "email" : "john.doe@example.com",
    "gender" : "Male",
    "geo_location":"-22.5743922;17.0790688",
    "market_segment" : "Pensioners",
    "organization" : "Prosperity Inc.",
    "phone" : "+44xxxxxxxxx",
    "year_of_birth" : "1947",
    "zip" : "ZC000000",
    "acquisition_cost" : 150,
    "business_value" : 7500
  }
}
```

To learn more about individual task attributes, see our documentation on [Conversations and Customers Data Sets](/docs/flex/end-user-guide/insights/data-model).

> \[!WARNING]
>
> When passing conversation attribute values via task attributes, avoid using high cardinality values. High cardinality values are values that are different for every or almost every conversation or customer. Typically IDs are high cardinality attributes. Using such attribute values may cause loads into Historical Reporting to take longer. This may prevent you from loading data every 15 minutes or even require shorter data retention.

Considerations:

* Attribute values can have a maximum of 128 characters. For values longer than 128 characters, only the first 128 characters are loaded into Historical Reporting.
* All dates and times have to be in range from the year 1901 to 2049 (both inclusive).
* If no `team_id` is provided, then the queue SID is used as the unique ID. The `team_id` attribute is required to display `team_name`.
* The `department_id` attribute is required to display `department_name`.

## Enhance agent data

You can provide additional details about agent data through customizable worker attributes. This data enhances the Agents data set in the [Data Model](/docs/flex/end-user-guide/insights/data-model).

Note that the TaskRouter term Worker converts to a more user-friendly Agent attribute in Insights. To learn more about data point mapping, see [TaskRouter Data in Flex Insights](/docs/flex/developer/insights/taskrouter-data), or check out the Insights [Dictionary](/docs/flex/end-user-guide/insights/dictionary).

The following code sample shows how you can populate your Worker attributes by using either the Twilio Console or the API. Unknown agent attributes are silently ignored. You can use your own attributes alongside those supported in Insights.

```json
{
    "agent_id": "Custom Agent ID 123",
    "agent_attribute_1": "Attribute 1",
    "agent_attribute_2": "Attribute 2",
    "agent_attribute_3": "Attribute 3",
    "agent_label_1": "Label 1",
    "agent_label_2": "Label 2",
    "agent_label_3": "Label 3",
    "full_name": "Mary Smith",
    "department_id": "1",
    "department_name": "Sales",
    "department_name_in_hierarchy": "London ▸ Sales",
    "email": "mary.smith@example.com",
    "location": "London",
    "manager": "Adam Shepherd",
    "phone": "+15555555555",
    "role": "Agent - Level 2",
    "state": "Active",
    "team_id": "2",
    "team_name": "Sales 2",
    "team_name_in_hierarchy": "London ▸ Sales ▸ Sales 2"
}
```

> \[!NOTE]
>
> If no `team_id` is provided, then the queue SID is used as the unique ID. The `team_id` attribute is required to display `team_name`.

> \[!NOTE]
>
> The `department_id` attribute is required to display `department_name`.

> \[!NOTE]
>
> Agents with new attributes must log in to Flex and change their status in order to trigger an Agent Status segment and load new data into Flex Insights.

### Option 1: Set up agents using the TaskRouter API

You can use the [Twilio TaskRouter API](/docs/taskrouter/api/worker) to set worker attributes by sending a `POST` request for all workers that you want to enhance with such data. This is the recommended method as it can be automated and well-integrated with the rest of your systems.

```xml
POST /v1/Workspaces/{WorkspaceSid}/Workers/{WorkerSid}
```

### Option 2: Set up agents in Twilio Console

You can set up agent details manually in Twilio Console.

> \[!WARNING]
>
> We don't recommend using this method in a production deployment. Updating hundreds and even thousands of agents manually is prone to errors. This method is useful for quick evaluation of whether worker attributes work well for you.

> \[!WARNING]
>
> For Flex accounts with SSO enabled, the agent attributes need to be set on the Identity Provider (IdP) site. Attributes set via Twilio Console or TaskRouter API will be overwritten once the agent logs in Flex with SSO.

To edit worker attributes:

* Navigate to the [Twilio Console Workspaces](https://www.twilio.com/console/taskrouter/workspaces).

  ![Flex Task Assignment workspace with SID and offline status.](https://docs-resources.prod.twilio.com/7270d3bd17d39941e4015b90edaa4f2609c9ee766534de4aa827ba57f702e02b.png)
* Click on the Workspace that includes the agents that you want to set up.
* Click **Workers** in the left navigation.

  ![Workers navigation showing task queues and recent workers with activity status.](https://docs-resources.prod.twilio.com/72580dc79754969e4e8b1acf946f6aa2e7af7b83d33ebebd776941507db4f1cd.png)
* Click on the agent whose attributes you want to update.

  ![Worker list with Daria highlighted, showing SID, activity status, and duration.](https://docs-resources.prod.twilio.com/e4489551dc39ca27f1c9c039145da440111d9427bcd75b677e38a3910ba82434.png)
* Edit **Attributes** with the properties you want to provide.

  ![Worker profile for Daria with attributes JSON and save button highlighted.](https://docs-resources.prod.twilio.com/89cdd61e04e773fda9f14c4a2fa87330ca8614e28671f95f26adb6d3bf9e34a5.png)
* Click **Save**.

Congratulations! More details about your agents will show up in Flex Insights shortly.

> \[!WARNING]
>
> Note that you need to wait until the next set of data loads into Flex Insights (once per hour by default) in order to see the new information in reports.

## Enhance customer data

> \[!WARNING]
>
> For Customers building HIPAA-compliant workflows, Twilio will redact any [TaskRouter Attributes](/docs/flex/developer/insights/enhance-integration) that could contain PII (per definition of the Attribute field) from ingressing into Flex Historical Insights. For more information on HIPAA for Flex Insights, please review [our detailed documentation](/docs/flex/developer/insights/hipaa-flex-insights-historical-reporting).

Flex Insights references each conversation with a customer based on a phone number or other contact information. You can set additional task attributes to provide details about the customer.

Using additional customer data, you can segment and filter by demographics in Flex Insights:

```json
"customers" : {
    "name" : "John Doe",
    "customer_link" : "https://crm.example.com/customer/123",
    "customer_attribute_1": "Attribute 1",
    "customer_attribute_2": "Attribute 2",
    "customer_attribute_3": "Attribute 3",
    "customer_label_1": "Label 1",
    "customer_label_2": "Label 2",
    "customer_label_3": "Label 3",
    "category" : "VIP",
    "customer_manager" : "Financial Partners Corp.",
    "email" : "john.doe@example.com",
    "external_id": "YourIdToLinkCustomers",
    "gender" : "Male",
    "market_segment" : "Pensioners",
    "organization" : "Prosperity Inc.",
    "phone" : "+44xxxxxxxxx",
    "year_of_birth" : "1947",
    "zip" : "ZC000000",
    "acquisition_cost" : 150,
    "business_value" : 7500
  }
```

## Link common communications to a single customer

Linking all communication related to the same customer enables you to use metrics to segment reports by customers and view customer journeys across channels in Historical Reporting.

Flex Insights links conversations based on task attributes. Flex Insights uses the following attributes to link conversations, in order of priority:

* Customer attribute `customers.external_id`
* Customer attribute `customers.phone`
* Customer attribute `customers.email`
* Default TaskRouter task attributes `from` and `to` (depending on direction)
* Conversation attribute `conversations.conversation_id` - used as a fallback. This leads to creating a new customer for every conversation.

Insights uses these properties to generate a **Customer ID**, which offers you some flexibility in how you link communications to a single customer.

### Link communications with External ID

The `external_id`customer attribute represents an ID as defined from your own application logic. It is the cleanest way to link all conversations related to a single customer into a single unit, because it represents your organization's unique definition of whom a customer is. All conversations (and thus segments) that have the same value in the `external_id` attribute will be linked to the same customer in the `Customers` data set. You can also use `external_id` to connect customer conversations across different channels (e.g., connecting SMS, chat, email and voice conversations via an external ID.)

> \[!WARNING]
>
> You need to provide an `external_id` attribute before the first segment is completed in order to use it to connect all the conversations. Otherwise, Flex Insights will use the value of the next available task attribute to generate the Customer ID.

### Linking conversations that lack an external ID

In some scenarios, an external ID may not be available on conversations. For example:

* Conversations created before Flex Insights introduced support for `external_id`
* Conversations for which you could not provide `external_id` before the first segment was completed

You can connect new conversations to these existing conversations that lack an `external_id` property by setting `external_id` to:

* A phone number
* An email address
* A `conversation_id` of the conversation that has no `external_id` set.

Flex Insights will use this value to generate a Customer ID that matches the previous conversations.

For example, say that an agent previously had a phone call with a customer who had phone number +1-555-123-4567. There was no `external_id` parameter, so Insights used the customer's phone number as a fallback to generate the Customer ID. A subsequent conversation happens via email, and you're aware of the customer phone number, so you provide the following `external_id` in your Task Attributes:

```json
"customers" : {
    "external_id": "+15551234567"
}
```

Insights will use the `external_id` to generate the Customer ID, which of course matches the Customer ID of the phone call. Since the Customer IDs match, Flex Insights will link the conversations.

## Next steps

* Learn how to [use Labels to organize your data](/docs/flex/developer/insights/labels).
* Start [implementing a TaskRouter workspace](/docs/taskrouter).
* Learn how the [Flex Insights Data Model](/docs/flex/end-user-guide/insights/data-model) helps you with the analytical needs of your contact center.
