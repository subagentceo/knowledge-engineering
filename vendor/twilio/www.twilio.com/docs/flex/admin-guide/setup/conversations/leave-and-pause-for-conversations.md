# Leave and pause options for Conversations

> \[!WARNING]
>
> Email, WhatsApp, and Facebook Messenger in Twilio Flex are not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

Flex provides Leave and Pause options that enable agents to temporarily close a conversation and move on to other tasks.

If you want these options to be available to agents, you must turn them on. They are turned off by default. Leave and Pause are available for all [Flex Conversations-based channels](/docs/flex/conversations).

If you don't turn on Leave or Pause, then agents only have the option to end a task. Then, if the customer contacts an agent again, a new conversation starts with no history of previous messages.

## How does Leave work?

When an agent sends a message and waits for a customer to reply, they can click **Leave** to keep the conversation open while the agent moves on to other work to free up their capacity. The conversation remains open until the customer replies, up to 90 days.

When the customer replies, the conversation is reactivated and a new task is created and routed to an agent. The task is not automatically routed to the same agent. The agent who opens the new task can see all previous messages in the conversation history as well as the new message.

The default Leave behavior is as follows:

1. Agent selects **Leave**.
2. Agent is removed from the channel conversation.
3. Agent enters wrap-up for the task. The conversation stays open, but the channel state changes from `active` to `inactive`.
4. Agent closes the task.
5. If the customer replies to the conversation, the channel becomes active again. A new task is created with the same conversation SID and the previous conversation history is included. The conversation can be routed to any agent.

Instead of creating a new task by default, you can select **Use custom routing**. This option lets you set up routing logic through [Studio](/docs/flex/admin-guide/core-concepts/studio-flows-functions-assets-twiml), or you can create your own custom logic using [Interactions events](/docs/flex/admin-guide/setup/conversations/configure-interactions-webhook) to determine what happens when a customer responds.

## How does Pause work?

When an agent receives a task that they can't handle right now, but want to remain in their queue, they can select **Task** > **Pause** to put the task on hold. The task remains assigned to the agent in a paused state, and their capacity is released. This state is helpful when an agent needs to do some research or gather more information before responding.

When the agent is ready to resume work on the task, they can go to the task, scroll to the bottom, and click **Resume**.

The default Pause behavior is as follows:

1. Agent clicks **Pause**.
2. Agent enters wrap-up for the task.
3. The task is closed, but the conversation stays open. The channel state moves from `active` to `pause`.
4. When the agent resumes the conversation, the channel moves from `pause` to `active`. A new task with the same conversation SID is created and is auto-accepted by the same agent, unless the agent is at capacity. In this case, you can decide where the conversation goes using the logic in [TaskRouter](/docs/taskrouter/how-taskrouter-works).

### Time limit for paused tasks

To ensure that paused tasks are not ignored, a time limit of 14 days automatically applies to paused tasks. Tasks are then rerouted to the queue and reassigned to the next available agent. You can shorten the time limit in Console if you want tasks to return to the queue sooner.

In Flex UI, agents can see a status for each paused task that shows when it will be reassigned if they don't resume work before then. The pause status highlights the 24-hour mark and 1-hour mark before the time limit is reached.

**Note**: In Flex UI versions before Flex UI 2.11.0, agents won't see the status of when their paused tasks will be reassigned. To enable agents to see this information, upgrade to Flex UI 2.11.x or later.

## Turn on the Leave and Pause options

Leave and Pause is available for the following channels:

* **Email**: Flex UI 2.5.0 later for leave functionality and Flex UI 2.7.0 and later for pause functionality
* **All Flex Conversations channels**: Flex UI 2.9.0 and later

If you want to turn on the Leave and Pause options, follow these steps:

1. In Console, navigate to **Flex** > **Channel management** > [**Leave and pause**](https://www.twilio.com/console//flex/channels/leave-and-pause).
2. Under **Leave and pause actions for agents**, select **Leave**, **Pause**, or both.
   1. Under **Leave**, choose whether you want to create a new task or use your own custom routing to detect specific [Interactions state change events](/docs/flex/admin-guide/setup/conversations/configure-interactions-webhook).
   2. Under **Pause**, set the time limit for paused tasks.
3. Click **Save**.

### Considerations

* When you change the time limit, the change only applies to newly paused tasks. Existing paused tasks keep the time limit that was in place when they were paused.
* Leave and Pause was only available for email tasks for Flex UI versions 2.7.x to 2.10.x. To use Leave and Pause for other channels, upgrade to Flex UI 2.11.x or later.
* If you don't see the Leave and Pause options described in this page, [contact our support team for assistance](https://help.twilio.com/).
* [UI actions](/docs/flex/developer/ui/use-ui-actions) for leave, pause, and resume are not supported for 2.12.0. Watch [the Flex release notes](/docs/flex/release-notes/flex-ui-release-notes-for-v2xx) for updates.
