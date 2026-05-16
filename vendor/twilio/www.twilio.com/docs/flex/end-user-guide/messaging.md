# Use Chat and Messaging

> \[!NOTE]
>
> This guide is for Flex UI 1.x.x and channels that use Programmable Chat and Proxy. Programmable Chat for Flex will reach end of life on June 1, 2026. If you're new to Flex or currently using Programmable Chat, [build with Flex Conversations](/docs/flex/conversations) or [migrate](/docs/flex/developer/conversations/programmable-chat-to-flex-conversations).

Flex supports various messaging channels, including SMS, Web Chat and WhatsApp. Using Flex, a contact center agent can handle multiple messaging tasks at one time.

Flex provides multiple features that help agents handle messaging channels more efficiently, like:

* Customer presence indicators
* Typing indicators
* Markdown support
* In-app and browser notifications
* Unread message count badges

## Customer presence

Customer presence indicator allows agents to see a Web Chat customer's connection status (online or offline) in real-time.

> \[!NOTE]
>
> To use the Customer Presence feature, you need to turn on a [Reachability Indicator](/docs/chat/reachability-indicator) in your Programmable Chat service instance. If Customer Presence doesn't display an online status, make sure you have the Reachability Indicator turned on.

**Agent Desktop view**

Agents see a customer presence indicator in the Task List and Task Canvas Header. The indicator is a green icon if the customer is online, and a gray one if the customer is offline.

**Teams View**

When monitoring Web Chat tasks, a supervisor can see a customer presence indicator in the Task Canvas Header.

## Typing indicator

Agents see a typing indicator in the Task List and in the Messaging Canvas if a participant (customer or another agent) of a Web Chat channel is typing.

## Markdown

Markdown support allows agents to format Web Chat messages. This can improve the readability of longer messages. Using bold text, italics, or bulleted lists creates structure and emphasis in your agents' messages and ensures that customers can better read and understand messages.

> \[!NOTE]
>
> Starting with [@twilio/flex-ui@1.26.0](/docs/flex/release-notes/ui-release-notes), Markdown is a Generally available feature that you can turn on from the [**Opt-in features**](https://console.twilio.com/us1/develop/flex/settings/features) page in Twilio Console.
>
> Additionally, the Web Chat user must be using [WebChat v2.2](/docs/flex/release-notes/webchat-ui-release-notes#v-220) or later to see markdown-formatted messages.
>
> Markdown support configuration for customers is turned off by default. You can turn it on using the following [configuration option](/docs/flex/developer/messaging/webchat/configuration):
>
> ```javascript
>     markdownSupport: {
>         enabled: true,
>     },
> ```

Agents can add Markdown to their messages by using Flex standard syntax.

### Flex standard Markdown syntax

| **Options**   | **Syntax**                                    |
| ------------- | --------------------------------------------- |
| Bold          | \*\*Bold\*\*                                  |
| Italic        | \*Italic\*                                    |
| Strikethrough | \~Strikethrough\~                             |
| Bullet list   | \* List<br /><br />\* List<br /><br />\* List |
| Ordered list  | 1. List<br /><br />2. List<br /><br />3. List |
| Blockquote    | >blockquote                                   |
| Code block    | `` `code block` ``                            |

Agents can also send messages using Flex Markdown syntax to the Chat channel with the [Programmable Chat REST API](/docs/chat/rest/message-resource). API-generated messages show as formatted text for Flex and WebChat users.

## In-app and browser notifications

In-app and browser notifications help agents respond to tasks that require their attention in a timely manner. Notifications improve response time and help create a smooth customer experience.

Agents are notified of the following activity regarding messaging tasks:

* New messaging task created
* New message in a messaging task posted by another participant

> \[!NOTE]
>
> Starting with [@twilio/flex-ui@1.26.0](/docs/flex/release-notes/ui-release-notes), browser notifications is a Generally Available feature that you can turn on from the [**Opt-in features**](https://console.twilio.com/us1/develop/flex/settings/features) page in Twilio Console.

### In-app notifications for new tasks

If a new messaging task comes in while an agent isn't viewing the Agent Desktop, an in-app notification appears in a status bar below the header.

The agent can accept or reject the new task from the notification.

In addition to in-app notifications, a badge also appears on the side navigation to indicate that new tasks are available.

![Twilio Flex interface showing incoming chat request with accept and reject options.](https://docs-resources.prod.twilio.com/7808a2700027313383bcbd67ae9c4dbfda4104caab88155b3115d8b989223cb7.png)

### Browser notifications

Agent receives a browser notification if:

* A new messaging task comes in while Flex isn't in focus, or
* A new message appears in an active messaging task while Flex isn't in focus

![Chrome notification: New message from Bob asking for booking help.](https://docs-resources.prod.twilio.com/51af4b8608887952b3666b18657967c112645bf6960f2f4a4bb42ce8bad18efd.png)

**Enabling browser notifications**

Flex prompts agents to turn on browser notifications each time they log in or refresh the page. Once they choose to allow or block browser notifications, the prompt no longer appears.

Flex UI also provides an interface for developers to customize in-app and browser notifications. Find out more about the [Flex Notifications Framework](/docs/flex/developer/ui/v1/notifications).

## Unread messages

Flex displays an unread message count in the task list to indicate whether an agent has any unread messages in an active messaging task. This allows the agent to see if there's been any activity in the messaging task without clicking on the task itself.

If there are new unaccepted tasks or unread messages in any active messaging tasks in the Agent Desktop view, the side navigation shows a badge without a count.
