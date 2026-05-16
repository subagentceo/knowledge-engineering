# Handle an email task

> \[!WARNING]
>
> Email in Twilio Flex is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

## Accept, read and reply to an inbound email

Inbound email tasks come in like any other [task](/docs/flex/admin-guide/core-concepts/routing#tasks) for any other [Task](/docs/flex/admin-guide/core-concepts/routing#task-channels)[Channel](/docs/flex/admin-guide/core-concepts/routing#task-channels). When an email arrives, the task appears at the top of the **Task** list. You can click the task to read a summary before accepting or declining it.

![Twilio Flex interface showing an incoming email request from Maria Bermudez with accept and reject options.](https://docs-resources.prod.twilio.com/9a46904dc30b0175103bba96dfd5501f651311243ca50844199134226790972f.png)

If you do not accept the task within your contact center's defined timeout period, it will be reassigned to a different qualified agent. By default, the task reservation timeout period is 2 minutes.

After you accept an email task, the email history appears in the **Task** **Panel** in chronological order, with the newest message shown at the bottom. If the customer replies to your email, their message is appended to your current conversation and all of your messages appear on the same email thread until you [wrap up and complete the task](#end-and-wrap-up-an-email-task).

Click **Reply** below the newest message to compose an email response.

You can type a new message, or copy and paste information or a canned response into the text box. After writing your message, click **Send** to reply to the customer. Your reply is added to the email thread.

## Pause, leave, or end an email task

### Pause a task that you can't handle right now

Select **Task** > **Pause** to temporarily pause a task that you can't handle right now. The task assigned to you in a paused state, and your capacity is released. It's helpful to pause a task when you need to do some research on a task, gather more information, and so on.

Paused tasks appear in a **Paused** category in your tasks list. When you're ready to resume work on the task, go to the task, scroll to the bottom, and click **Resume**.

These options are only available if your administrator has turned on Pause on the **Flex** > **Channel management** > [**Leave and pause**](https://console.twilio.com/us1/develop/flex/channels/leave-and-pause) page.

Paused tasks automatically expire and are routed back into the queue after 14 days. Paused tasks may expire sooner if your admin has configured a shorter time limit, which can be between 1-14 days.

![Task dropdown with options: Leave, Pause, End.](https://docs-resources.prod.twilio.com/b2ac7353d9d0fbb201f651531e649a45e093c85c4955cf487498d5efc0a4a717.png)

### Leave the task while waiting for the customer to respond

If you expect the customer to reply to your email, click **Leave** to temporarily close the conversation so you can move on to other tasks.

This option is only available:

* After you have sent a response. If you don't need to respond, end and wrap up the email task instead.
* If [your administrator has enabled Leave](/docs/flex/admin-guide/setup/conversations/leave-and-pause-for-conversations) on the **Flex** > **Channel management** > [**Leave and pause**](https://console.twilio.com/us1/develop/flex/channels/leave-and-pause) page..

When you leave a thread, your task is ended, but the conversation remains open for up to 90 days until the customer replies. When the customer replies, the conversation is reactivated and a new task is created and routed to an agent. (The task is not automatically routed to you.) The agent who opens the task can see all previous messages in the conversation history as well as the new message.

### End and wrap up an email task

When you've finished handling an email task, you have the following options:

* If you don't expect the customer to reply again, select **Task > End.**

  * If the customer replies after you've ended the task, the new reply creates a new conversation and the conversation history is not available in the new task.
* If you expect the customer to reply, use the **Leave** option. The task moves into a pending state, but is no longer assigned to you. When the customer replies, the task will go back into the queue to be picked up by any agent.

  * The **Leave** option is only available if your Flex administrator has enabled it.

While in wrap-up, you can read the entire email history, but cannot send any additional replies.

When you're done wrapping up the task, click **Complete**.

[\< Email index page](/docs/flex/email)
