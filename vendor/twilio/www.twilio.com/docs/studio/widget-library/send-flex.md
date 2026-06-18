# Send to Flex widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

**Send to Flex** is a Studio widget that can be used for transferring incoming calls, messages, or conversations to Flex.

![incoming-conversation-studio-flex.](https://docs-resources.prod.twilio.com/78aaf4bd67edf1ed7f16256be18bc1c3bb848d055226325e1c0b9312ab70ace9.png)

The **Send To Flex** widget is a Studio widget that transfers a call, message, or conversation to Flex.

For the incoming Call trigger, **Send to Flex** will enqueue the Voice and the caller will hear hold music while waiting for an agent to respond.

For the incoming Message trigger, Messages are transferred to Flex as new tasks for assignment to an agent. The widget requires a Workflow and a Task Channel.

In Flex Conversations (which requires Flex UI 2.0), a new Trigger widget, **Incoming Conversation**, has been added. In this case, **Send to Flex** will create a new Interaction using the [/Interactions endpoint](/docs/flex/developer/conversations/interactions-api/interactions) which then creates new tasks for assignment to a [worker](/docs/flex/admin-guide/core-concepts/routing#workers).

> \[!WARNING]
>
> If you are using [Flex Conversations](/docs/flex/developer/conversations), remember to handle certain terminal TaskRouter events according to your application's needs, as conversations may stay orphaned with an `open` state.
>
> See [Conversations Best Practices](/docs/flex/developer/conversations/best-practices) for details.

## Out-of-the-box Studio Flows for Flex

While you can use the Send to Flex widget from any Studio Flow you build, Twilio Flex accounts come enabled with three Studio Flows out of the box. These Flows use the Send to Flex widget with the following default attributes:

### **Voice IVR Flow**

```json
{ "type": "inbound", "name": "{{trigger.call.From}}" }
```

### **Messaging and Chat Flows**

For legacy [SMS](/docs/flex/admin-guide/tutorials/sms-setup) and [Webchat](/docs/flex/admin-guide/tutorials/webchat-setup) addresses, the following default attributes are set on the Send to Flex widget for incoming messages:

```json
{
  "name": "{{trigger.message.ChannelAttributes.from}}",
  "channelType": "{{trigger.message.ChannelAttributes.channel_type}}",
  "channelSid": "{{trigger.message.ChannelSid}}"
}
```

For [SMS](/docs/flex/admin-guide/setup/conversations/manage-conversations-sms-addresses), [WhatsApp](/docs/flex/admin-guide/setup/conversations/manage-conversations-whatsapp-addresses), and [Chat](/docs/flex/admin-guide/setup/conversations/manage-conversations-chat-addresses) Conversations, SendToFlex widget adds `channelType`, `customerAddress`, `from`, `name`, and `customerName` when it creates the interaction. These are all set to the phone number of the sender ([E.164 format](/docs/glossary/what-e164) for SMS and whatsapp:E.164 for WhatsApp numbers).

Furthermore, the default [Chat](/docs/flex/admin-guide/setup/conversations/manage-conversations-chat-addresses) address's Studio flow adds the following attribute:

```json
{"from": "{{trigger.conversation.ChannelAttributes.pre_engagement_data.friendlyName}}"}


```

This `pre_engagement_data.friendlyName` is what the demo Chat app sends.

After creating your Flex instance, you will be able to find these default Studio Flows in [the Studio section of the Twilio Console](https://console.twilio.com/us1/develop/studio/flows?frameUrl=%2Fconsole%2Fstudio%2Fflows%3Fx-target-region%3Dus1).

## Required configuration for Send to Flex

When working with the Send to Flex widget, you must select both a Workflow and a Channel so that your Studio Flow can properly route the inbound request to your Flex instance.

| Name     | Description                                                                                                                                                                                                  | Example           |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| Workflow | The name of the TaskRouter [Workflow](/docs/taskrouter/lifecycle-task-workflows-and-assignment) you want to assign to your Studio Flow (the SID of your selected Workflow is reflected on the widget itself) | Assign to Anyone  |
| Channel  | The Task Channel used by your Studio Flow when forwarding to your Flex Instance                                                                                                                              | Programmable Chat |

With these two pieces of information, the Send to Flex widget will be able to enqueue the call and play hold music while waiting for a matched Flex Worker to accept the task, or transfer a message to Flex as a new task for worker assignment.

## Optional configuration for Send to Flex

The Send to Flex widget also accepts a number of configuration options that you can use to customize task priority, hold music, and other specifics for this transfer:

| Name                 | Description                                                                                                                                                 | Default                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Priority             | The priority of this task in the TaskQueue. Tasks with a higher priority are assigned before older tasks with a lower priority - 0 is the highest priority. | 0                                                                   |
| Timeout              | The amount of time in seconds that the task is allowed to live, with a maximum value of two weeks (1209600 seconds).                                        | 3600 (1 hour)                                                       |
| Attributes           | JSON representing the Task attributes (maximum 1024 characters). See [below for more details](#considerations-for-json-attributes).                         | Default [values shown above](#out-of-the-box-studio-flows-for-flex) |
| URL method           | HTTP method to be used when requesting the Hold Music TwiML URL - `GET` or `POST`.                                                                          | None                                                                |
| Hold music TwiML URL | The URL for custom hold music while the customer waits in the queue.                                                                                        | If no URL is specified, Flex's default hold music will play         |

## Considerations for JSON attributes

When working with the JSON for custom attributes in the Send to Flex widget, make sure to consider the [Flex Insights Data Model](/docs/flex/end-user-guide/insights/data-model). Flex Insights is opinionated about where you put metadata about the [Task (conversation)](/docs/flex/developer/insights/enhance-integration#add-custom-attributes-and-measures) and [customer](/docs/flex/developer/insights/enhance-integration#enhance-customer-data). For a list of known Conversations attributes consumed by Flex Insights and/or the Flex UI, see [Task Attributes](/docs/flex/developer/conversations/interactions-api#task-attributes) on the Interactions API overview.

## How to pass objects as an attribute in Send to Flex widget

If you want to pass an object — for instance, data that you retrieved via a function — as an attribute value in the **Attributes** configuration, you can use the [to\_json Liquid Template Filter](/docs/studio/user-guide/liquid-template-language#standard-filters) like this:

```json
"customer_attributes": {{widgets.CustomerFunction.parsed | to_json}}
```

Note that for incoming Message and Conversation triggers, attributes set on the `message` are treated as string and cannot be parsed to JSON. Only attributes set on the Channel /Conversation, `ChannelAttributes`, data are parsed as JSON by default.

## Send to Flex transitions

These events trigger transitions from the Send to Flex widget to another widget in your Flow. For more information on working with Studio Transitions, see the [Getting Started Guide](/docs/studio/user-guide/get-started#define-widget-transitions).

| Name                  | Description                                                                                                                                                                                                                                                                                                                            |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Task created          | For Voice calls, transition is triggered when the [Enqueue action URL is requested](/docs/voice/twiml/enqueue#attributes-action). For Messages, transition is triggered as soon as the TaskRouter Task is created. For Conversations, the transition is triggered when an Interaction and a corresponding TaskRouter task are created. |
| Failed to create task | For Voice calls, transition is triggered if enqueuing of the call fails. For Messages and Conversations, transition is triggered immediately when TaskRouter returns an error for Task creation.                                                                                                                                       |
| Call failed           | Only applies to Voice calls. Transition is triggered if [QueueResult is "system-error"](/docs/voice/twiml/enqueue#attributes-action-parameters-QueueResult).                                                                                                                                                                           |

## Send to Flex variables

When the Send to Flex widget executes, it will have stored the following variables for use throughout your Studio Flow (where `MY_WIDGET_NAME` is the name of your actual widget). For more information on working with variables in Studio, [see this guide](/docs/studio/user-guide/get-started#use-variables-in-your-studio-flow).

Find definitions and examples for these variables at the [Task Resource](/docs/taskrouter/api/task#task-lifecycle) page.

| Name       | Liquid Template Language                  |
| ---------- | ----------------------------------------- |
| Age        | \{\{widgets.MY\_WIDGET\_NAME.Age}}        |
| Attributes | \{\{widgets.MY\_WIDGET\_NAME.Attributes}} |
| Task SID   | \{\{widgets.MY\_WIDGET\_NAME.TaskSid}}    |

## Example: Studio IVR with Send to Flex

This example Studio Flow takes an incoming call and asks the caller if they'd like information (business hours or location), or to talk to a customer support representative. If the caller opts to speak to an agent, Send to Flex handles passing off the call to Flex.

![IVR Studio Flow: Incoming call triggers prompt for 1, 2, or 3. Selecting 1 executes Send to Flex, forwarding the call.](https://docs-resources.prod.twilio.com/ebc691d6f5dfe08f8204e357b7846fab2fca0c50b11b34f53c5ff8b155b4b1c2.png)

## Learn more

Want to further explore customizing your Studio Flow with the Send to Flex widget? Follow along with these guides to see Studio and Flex in action:

* [Step-by-step, learn how to build an IVR (Interactive Voice Response) system for Flex with Twilio Studio](/docs/flex/admin-guide/tutorials/ivr)
* [Change the hold music your callers hear](https://help.twilio.com/hc/en-us/articles/360024055153-Change-the-Queue-Music-with-Twilio-Flex)
* [Add a custom greeting or initial response to your Studio Flow before sending customers to Flex](https://help.twilio.com/hc/en-us/articles/360024011993-Add-a-Custom-Greeting-or-Initial-Response-to-Twilio-Flex)

Let's build something amazing.
