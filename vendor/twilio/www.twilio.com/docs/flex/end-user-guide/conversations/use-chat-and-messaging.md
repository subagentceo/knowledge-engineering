# Use Chat and Messaging

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0. If you are on Flex UI 1.x, please refer to [Chat and Messaging](/docs/flex/end-user-guide/messaging) pages.

Flex supports various messaging channels, including [SMS, Chat, WhatsApp, and more](/docs/flex/admin-guide/core-concepts/conversations). Using Flex, a contact center agent can handle multiple messaging tasks at one time.

Flex provides multiple features that help agents handle messaging channels more efficiently, like:

* Customer presence indicators
* In-app and browser notifications
* Unread message count badges

## Customer presence in chat

The customer presence indicator shows agents a chat customer's connection status (online or offline) in real-time.

When working on a chat task, agents see an indicator in the Task List and Task Canvas Header. The indicator shows a green icon if the customer is online and a grey one if offline.

![Customer chat interface with live status and end chat button.](https://docs-resources.prod.twilio.com/9cb36fa833aa7ea606a1f38d67a2e803f0b9bfdaf96d8abee043469dfdcbbbff.png)

## In-app and browser notifications

In-app and browser notifications help agents respond to tasks that require their attention in a timely manner. Notifications improve response time and help create a smooth customer experience.

Agents get notifications for the following activity regarding messaging tasks:

* Incoming messaging task
* New messages in a messaging task posted by another participant

> \[!NOTE]
>
> Starting with [@twilio/flex-ui@1.26.0](/docs/flex/release-notes/ui-release-notes), browser notifications is a Generally Available feature that you can turn on from the [Opt-in features page](https://console.twilio.com/us1/develop/flex/settings/features) in Twilio Console.

### In-app notifications for incoming tasks

If a new messaging task comes in while an agent isn't viewing the Agent Desktop, an in-app notification appears in a status bar below the header.

The agent can accept or reject the new task from the notification.

In addition to in-app notifications, a badge also appears in the side navigation to indicate that new tasks are available.

![Incoming chat request from WhatsApp with accept and reject options.](https://docs-resources.prod.twilio.com/c713b9c48b3850b716e167e38b0dd80cae943470686eef9d22302d854d61ab35.png)

### Browser notifications

Agent receives a browser notification if:

* A new messaging task comes in while Flex isn't in focus
* A new message appears in an active messaging task while Flex isn't in focus

![Chrome notification: New message from Bob asking for help with booking.](https://docs-resources.prod.twilio.com/d70c9656528ba92ddfbcb0df10a1d0393c952226e746a24415dc75ead80681af.png)

Flex prompts agents to turn on browser notifications each time they log in or refresh the page. Once they choose to allow or block browser notifications, the prompt no longer appears.

![Twilio Flex dashboard showing new task indicators with red dots on menu icons.](https://docs-resources.prod.twilio.com/fee31ea3f10d5d1124ec5060546717e488234e963215eef438ca27d562376d4f.png)

The Flex UI also provides an interface for developers to customize in-app and browser notifications. Find out more about the [Flex Notifications Framework](/docs/flex/developer/ui/v1/notifications).

## Unread messages

Flex displays an unread message count in the task list to indicate whether an agent has any unread messages in an active messaging task. This allows the agent to see if there's been any activity in the messaging task without clicking on the task itself.

If there are new unaccepted tasks or unread messages in any active messaging tasks in the Agent Desktop view, the side navigation shows a badge without a count.

The following image shows the unread message count in the task list.

![WhatsApp unread message indicator with red badge showing one new message.](https://docs-resources.prod.twilio.com/45b934bf05e0c849518e91c224aa06811136786fd498d94196f550299a48796f.png)

The following image shows the task or new message indicator in side navigation.

![new task indicators.](https://docs-resources.prod.twilio.com/ca9a9f06cccf856d7d658530c2aeefd47fd8b0cdb694701aebf8fd5f8f0c6878.png)

## Supervisor Teams View

As a supervisor, when monitoring Flex Conversations channel tasks, you can:

* See a customer presence indicator in the chat Task Canvas Header
* View the messages sent between the customer and the agent
* View and download attachments sent over Flex Conversations channels

![Twilio Flex dashboard showing agent status and chat task details.](https://docs-resources.prod.twilio.com/e1178507fcad12e68b907ad05710bec44e969b62be1d36a3770f996c30ad4153.png)
