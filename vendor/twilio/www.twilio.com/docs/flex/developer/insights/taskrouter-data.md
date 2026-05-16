# TaskRouter Data in Flex Insights

> \[!WARNING]
>
> For Customers building HIPAA-compliant workflows, Twilio will redact any [TaskRouter Attributes](/docs/flex/developer/insights/enhance-integration) that could contain PII (per definition of the Attribute field) from ingressing into Flex Historical Insights. For more information on HIPAA for Flex Insights, please review [our detailed documentation](/docs/flex/developer/insights/hipaa-flex-insights-historical-reporting).

> \[!IMPORTANT]
>
> Flex Insights (also known as Historical Reporting) is currently available as a public beta release and the information contained in the Flex Insights documentation is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as generally available. Public beta products are not covered by a Twilio SLA.
>
> Any reference to "Historical Reporting", "Flex Insights API", "Flex Insights Historical Reporting", or "Flex Insights Historical Reporting API" in the Flex Insights documentation refers to Flex Insights.

Individual TaskRouter events are connected into a single [Analytics Data Model](/docs/flex/end-user-guide/insights/data-model) that provides a unified look at conversations and their contexts across multiple contact centers and customer management systems. We transform and clean data to make it ready to consume and analyze.

Flex Insights provides a wide context for conversations, giving you the most insight possible. Not all data is available from Twilio out-of-the-box, as this data might include CRM customer details, customer satisfaction surveys, data from non-voice channels, or data from other call center solutions.

## Naming

TaskRouter's **Worker** is an **Agent** in Insights. We call people who handle conversations with customers **Agents**. There are a number of different names for workers in contact centers including Advisors, Agents, Associates, Customer Support Specialists, Operators, Representatives, Workers, and more. We historically use **Agents** in documentation to make it consistent for the widest audience possible.

TaskRouter's **Task** has no direct representation in Insights. You can say that a **Task** is roughly one **Segment** of a **Conversation**. This may, however, differ, as Insights may split tasks into multiple **Segments** to properly represent transfers and other scenarios. See [Datasets in Analytics Data Model](/docs/flex/end-user-guide/insights/data-model) and [Conversation Structure](/docs/flex/end-user-guide/insights/conversation-structure) for how conversations look like in Insights.

TaskRouter's **Call** may be directly represented as a **Conversation** in Insights. However multiple **Calls** in TaskRouter may be represented as a single **Conversation** to better represent the actual scenario. One of the examples is when a customer calls in and TaskRouter creates another **Call** to connect the customer with the **Agent**. This appears as two **Calls** in TaskRouter but as a single **Conversation** in Insights.

## Data Available from TaskRouter

Measures based on this data will be available out-of-the-box:

* **Abandoned Conversations** - the number of conversations where Agent and Customer have not talked to each other.
* **Abandonment Time** - time a Customer or an Agent spends waiting on the other party before giving up.
* **Handled Conversations** - the number of conversations handled by an Agent.
* **Queue Time** - time a customer spends waiting in a queue before reaching an Agent.
* **Talk Time** - time Agents spend talking to customers.
* **Wrap Up Time** - time Agents spend after talking to customers to do after call work.

All the available measures can be sliced by the following attributes:

* **Agent**
* **Channel**
* **Customer City**
* **Customer Country**
* **Customer Phone**
* **Customer ZIP**
* **Date and Time** including **Days of Week**, **Days of Month** and similar
* **Direction**
* **Queue**
* **Team**

## Built-in Task Attributes

TaskRouter provides a set of attributes that are provided with each task by default. We extract these and save them as corresponding attributes and measures in Insights.

The list of attributes that we extract from [TaskRouter events](/docs/taskrouter/api/task#task-lifecycle):

* `Sid` is not used in Insights
* `AccountSid` is used for splitting TaskRouter traffic to individual analytical workspaces
* `WorkspaceSid` is not used in Insights
* `WorkflowSid` is not used in Insights
* `WorkflowName` to Conversations ▸ Workflow
* `Attributes` used for extracting [properties added by VoiceML](/docs/taskrouter/twiml-queue-calls#task-attributes-linking-tasks-to-calls) and [custom properties](/docs/flex/developer/insights/enhance-integration#add-custom-attributes-and-measures)
* `Age` is not used in Insights, we use events timestamps instead
* `Priority` is not used in Insights
* `TaskQueueSid` to Conversations ▸ Handling Team
* `AssignmentStatus` is not used in Insights
* `Reason` to Conversations ▸ Outcome
* `DateCreated` is not used in Insights
* `DateUpdated` is not used in Insights
* `Timeout` is not used in Insights
* `TaskChannelSid` is not used in Insights
* `TaskChannelUniqueName` to Conversations ▸ Channel
* `Addons` is not used in Insights

Properties extracted from Task events:

* `TaskSid` used to uniquely identify the task within Insights
* `TaskAttributes` used for extracting [properties added by VoiceML](/docs/taskrouter/twiml-queue-calls#task-attributes-linking-tasks-to-calls) and [custom properties](/docs/flex/developer/insights/enhance-integration#add-custom-attributes-and-measures)
* `TaskAge` is not used in Insights, we use events timestamps instead
* `TaskQueueName` to Conversations ▸ Handling Team Name
* `TaskQueueSid` to Conversations ▸ Handling Team ID
* `TaskPriority` is not used in Insights
* `TaskAssignmentStatus` is not used in Insights
* `TaskCanceledReason` to Conversations ▸ Outcome
* `TaskCompletedReason` to Conversations ▸ Outcome

Properties extracted from `Worker` events:

* `WorkerSid` is used to uniquely identify agents in Insights
* `WorkerName` to Agents ▸ Full Name
* `WorkerAttributes` used for extracting [custom properties](/docs/flex/developer/insights/enhance-integration#add-custom-attributes-and-measures)
* `WorkerActivitySid` is not used in Insights
* `WorkerActivityName` to Activities ▸ Activity

Properties extracted from the `TaskAttributes` property:

* `from_country` to Customers ▸ Country for inbound calls
* `called` to Customers ▸ Phone for outbound calls
* `to_country` to Customers ▸ Country for outbound calls
* `to_city` to Customers ▸ City for outbound calls
* `to_state` to Customers ▸ State for outbound calls
* `caller_country` to Customers ▸ Country for inbound calls
* `call_status` is not used in Insights
* `call_sid` is used for connecting tasks into a single Conversation with multiple Segments
* `account_sid` is used for splitting TaskRouter traffic to individual analytical workspaces
* `from_zip` to Customers ▸ ZIP for inbound calls
* `from` to Customers ▸ Phone for inbound calls
* `direction` to Conversations ▸ Direction
* `called_zip` to Customers ▸ ZIP for outbound calls
* `caller_state` to Customers ▸ State for inbound calls
* `to_zip` to Customers ▸ ZIP for outbound calls
* `called_country` to Customers ▸ Country for outbound calls
* `from_city` to Customers ▸ City for inbound calls
* `called_city` to Customers ▸ City for outbound calls
* `caller_zip` to Customers ▸ ZIP for inbound calls
* `api_version` is not used in Insights
* `called_state` to Customers ▸ State for outbound calls
* `from_state` to Customers ▸ State for inbound calls
* `caller` to Customers ▸ Phone for inbound calls
* `caller_city` to Customers ▸ City for inbound calls
* `to` to Customers ▸ Phone for outbound calls
* `flexInteractionSid` ▸ correlation attribute used to identify corresponding Interaction events
* `transfer_sid` ▸ correlation attribute used to identify a transfer in an Interaction
* `previous_task_sid` is used to identify the task from which an agent initiated a transfer

If you need to add data not provided by TaskRouter out-of-the-box, you can check how to add [custom data task and worker attributes](/docs/flex/developer/insights/enhance-integration#add-custom-attributes-and-measures). See the documentation on [TaskRouter built-in task attributes](/docs/taskrouter/twiml-queue-calls#task-attributes-linking-tasks-to-calls).
