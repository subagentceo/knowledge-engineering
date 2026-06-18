# Enqueue Call widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

The Enqueue Call widget allows you to enqueue the current call into a call queue. The caller will hear hold music until the call is dequeued via TaskRouter or a custom-built dequeuing mechanism. See the [\<Enqueue> documentation](/docs/voice/twiml/enqueue) for more information on working with enqueued calls.

![Send to agent widget with enqueue call options and status paths.](https://docs-resources.prod.twilio.com/a0a7a42f3a7bf047804e200c7fa5d306223f46da279711afc0ce6e5ae7c337bb.png)

## Required Configuration for Enqueue Call

The Enqueue Call widget requires several pieces of information to function properly. You must select a **Queue** or **TaskRouter Task** when configuring this widget. The choice may be selected from a dropdown, with additional configuration fields appearing based on the selection.

| Name                  | Description                                                                                                                           | Example          | Default |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------- |
| Queue Name            | The name of the Queue to place the call into. If this Queue doesn't exist, it will be created on demand. Max length of 64 characters. | Everyone         | N/A     |
| Task Router Workspace | The TaskRouter Workspace where the desired Workflow is located.                                                                       | Customer Support | N/A     |
| Task Router Workflow  | The TaskRouter Workflow responsible for handling the queue.                                                                           | Returns          | N/A     |

## Optional Configuration for Enqueue Call

The Enqueue Call widget also accepts a number of configuration options that you can use to declare **task attributes**, **priority**, **timeout**, a **hold music TwiML URL**, and the **TwiML request method** for the request initiated by this widget.

| Name                 | Description                                                                                                                                                                               | Example                                                                                                                          | Default |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Task Attributes      | JSON representing task attributes (max 1024 characters)                                                                                                                                   | See below                                                                                                                        | N/A     |
| Priority             | The priority of this task in the TaskQueue. Tasks with a higher priority are assigned before older tasks with a lower priority. If not specified, will be treated as 0 during evaluation. | 0                                                                                                                                | N/A     |
| Timeout              | The number of seconds you want the task to remain in this TaskQueue. Must be a positive integer \< 2 weeks in seconds. If not specified, defaults to infinity.                            | 600                                                                                                                              | N/A     |
| Hold Music TwiML URL | The URL for custom hold music TwiML. If not specified, the default hold music will play upon enqueue.                                                                                     | [https://twimlets.com/holdmusic?Bucket=com.twilio.music.ambient](https://twimlets.com/holdmusic?Bucket=com.twilio.music.ambient) | N/A     |
| TwiML Request Method | The request method to be used.                                                                                                                                                            | `GET` or `POST`                                                                                                                  | `GET`   |

### Task Attributes Example

```json
"{
    "type": "call",
    "contact": "+15558675309",
    "customer-value": "gold",
    "task-reason": "support",
    "callSid": "CA42ed11..."
}"
```

## Enqueue Call Transitions

These events trigger transitions from this widget to another widget in your Flow. For more information on working with Studio transitions, [see this guide](/docs/studio/user-guide/get-started#define-widget-transitions).

| Name              | Description                                                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Call Complete     | Transition is triggered when the Enqueue action URL is requested. Due to the underlying behavior of the Enqueue action URL, Studio can only regain control of the live call after dequeueing if the call was originally dequeued using \<Dial>\<Queue>. |
| Failed to Enqueue | Transition is triggered if enqueuing of the call fails due to full call queue (each call queue cannot exceed 100 calls), returning QueueResult as "queue-full".                                                                                         |
| Call Failed       | Transition is triggered if QueueResult is "system-error".                                                                                                                                                                                               |

> \[!NOTE]
>
> QueueResult information can be found in the [TwiML enqueue documentation](/docs/voice/twiml/enqueue#attributes-action-parameters-QueueResult).

## Enqueue Call Variables

When the Enqueue Call widget executes, it will have stored the following variables for use throughout your Studio Flow (where `MY_WIDGET_NAME` is the name of your actual widget). For more information on working with variables in Studio, [see this guide](/docs/studio/user-guide/get-started#use-variables-in-your-studio-flow).

Find definitions and examples for these variables at the [Voice: \<Enqueue>](/docs/voice/twiml/enqueue#attributes-action-parameters) and [Call Resource](/docs/voice/api/call-resource#call-properties) pages.

| Name            | Liquid Template Language                     |
| --------------- | -------------------------------------------- |
| Account SID     | \{\{widgets.MY\_WIDGET\_NAME.AccountSid}}    |
| API Version     | \{\{widgets.MY\_WIDGET\_NAME.ApiVersion}}    |
| Call SID        | \{\{widgets.MY\_WIDGET\_NAME.CallSid}}       |
| Call Status     | \{\{widgets.MY\_WIDGET\_NAME.CallStatus}}    |
| Caller Name     | \{\{widgets.MY\_WIDGET\_NAME.CallerName}}    |
| Direction       | \{\{widgets.MY\_WIDGET\_NAME.Direction}}     |
| Forward From    | \{\{widgets.MY\_WIDGET\_NAME.ForwardedFrom}} |
| From            | \{\{widgets.MY\_WIDGET\_NAME.From}}          |
| Parent Call SID | \{\{widgets.MY\_WIDGET\_NAME.ParentCallSid}} |
| Queue Result    | \{\{widgets.MY\_WIDGET\_NAME.QueueResult}}   |
| Queue SID       | \{\{widgets.MY\_WIDGET\_NAME.QueueSid}}      |
| Queue Time      | \{\{widgets.MY\_WIDGET\_NAME.QueueTime}}     |
| To              | \{\{widgets.MY\_WIDGET\_NAME.To}}            |

## Example: Hold For Support Agent

Once the customer calls the phone number associated to the Studio Flow, they will be greeted and told that they are being put on hold while a representative is found to help them. They will be enqueued into a call queue which will be handled by the assigned TaskRouter Workflow. Once a Worker accepts the Task and the call is complete, you may engage with the contact further using the transitions given by the Enqueue Call widget.

![Twilio Studio flow with say\_welcome and find\_agent\_queue widgets for call handling.](https://docs-resources.prod.twilio.com/acfb3f7dd688ace45d0f94928e4d64c472503b2d3b845c153b251829e20cdca4.png)

This is the configuration for widget with the TaskRouter Workspace and Workflow assigned.

![Twilio Studio Enqueue Call widget configuration with fields for widget name, task, workspace, and workflow.](https://docs-resources.prod.twilio.com/14e6b0af5ada5033dc7c3cc91269be829bf2d1221518bc0a6aa06cfdc1369446.png)

> \[!NOTE]
>
> Learn [How to Customize Phone Call Workflows with Twilio Studio and TaskRouter](https://www.twilio.com/blog/customize-phone-call-workflows-twilio-studio-taskrouter-html).

## Learn More

Now that you know the basics of the Enqueue Call widget, why not learn more about a Call Resource?

* Learn how to work with a call in the [Call Resource documentation](/docs/voice/api/call-resource).
* Learn more about TaskRouter Workspaces, Workflows, and Tasks starting from the [TaskRouter Quickstart](/docs/taskrouter/quickstart).

Let's build something amazing.
