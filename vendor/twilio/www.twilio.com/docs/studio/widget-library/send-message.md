# Send Message widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

The **Send Message** widget allows you to send an SMS or chat message to a user from your Studio Flow.

![A simple Send Message widget, re-named 'reminder\_confirm.' Shows a message of 'Great! I\&#x27;ll send a reminder tomorrow'.](https://docs-resources.prod.twilio.com/0120a08abe5f99e5a03279e6508f04f0e7af94c443bf2d0ad5107d8425600aa2.png)

> \[!WARNING]
>
> If you want to wait for a user's input after a message, [use the Send & Wait For Reply widget](/docs/studio/widget-library/send-wait-reply) instead. The Send Message widget does not wait for user input before moving on to the next step in the Flow.

## Required configuration for Send Message

The Send Message widget requires several pieces of information to send messages successfully. A Message Body represents the text sent to the recipient and is not auto-populated.

| Name              | Description                               | Example                       | Default                       |
| ----------------- | ----------------------------------------- | ----------------------------- | ----------------------------- |
| Message Body      | The text you wish to send in your message | Hello, and welcome to Twilio! | N/A                           |
| Send Message From | The "from" phone number for this message  | +15555555551                  | \{\{flow.channel.address}}    |
| Send Message To   | The "to" number for the message recipient | \{\{contact.channel.address}} | \{\{contact.channel.address}} |

> \[!NOTE]
>
> The Send Message widget will, by default, send a message **from** the phone number connected to your Studio Flow **to** the user interacting with your Flow. You may choose to override either of these numbers under the **Messaging & Chat Config** dropdown in the widget's configuration menu.

## Optional configuration for Send Message

If using a [Programmable Chat Service or Channel](/docs/chat) to manage communications within your Studio Flow, you may send messages with your Service or Channel instead of an SMS-capable phone number.

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Example                                                            | Default                           |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ | --------------------------------- |
| Use Link Shortening       | Enables [link shortening](/docs/messaging/features/link-shortening) on your message. This requires sending the message from a Messaging Service that has been [onboarded to link shortening](/docs/messaging/features/link-shortening/onboarding-guide).<br /><br />Studio looks for a Messaging Service SID in the 'Send message from' address, `{{flow.channel.address}}`, and `{{trigger.message.MessagingServiceSid}}`, in that order.<br /><br />Link shortening is not currently supported in Flows triggered by an incoming Conversation. | Checked or Unchecked                                               | Unchecked                         |
| Media URL                 | The URL of the media to send with your message. See a list of accepted media content types.                                                                                                                                                                                                                                                                                                                                                                                                                                                      | [https://demo.twilio.com/owl.png](https://demo.twilio.com/owl.png) | N/A                               |
| Programmable Chat Service | The SID for the Chat Service your Flow uses, if any.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ISXXXXXXXXXXXXXXXXXXXXX                                            | `{{trigger.message.InstanceSid}}` |
| Programmable Chat Channel | The SID for the Chat Channel your Flow uses, if any.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | CHXXXXXXXXXXXXXXXXXXXXX                                            | `{{trigger.message.ChannelSid}}`  |
| Message Attributes        | A string metadata field you can use to store any data along with your sent message. If specified, the string value must contain structurally valid JSON.                                                                                                                                                                                                                                                                                                                                                                                         | `{"date_contacted": {{date: "%Y %h"}}}`                            | N/A                               |

> \[!NOTE]
>
> Learn more about [structurally valid JSON](https://opis.io/json-schema/2.x/structure.html).

### Using Programmable Chat with Send Message

Programmable Chat Service, Channel, and Message attributes *only* apply to Flows that use Twilio Programmable Chat.

A **Chat Service** houses all Chat Channels, Messages, Users, and other Chat resources within a Programmable Chat deployment. You can find more information on Chat Services in the [Chat Services REST API docs](/docs/chat/rest/service-resource).

**Chat Channels** represent a chat room and are the center of all Chat activities that take place in a Chat Service. All Chat messages are sent to a user via a Chat Channel. You can read more about Chat Channels in the Chat [Channels REST API docs](/docs/chat/rest/channel-resource).

Your Studio Flow can receive messages from a user in a Programmable Chat Channel and send messages back using this Send Message widget. If you want to enable incoming Chat messages in your Flow, you'll need to set your Studio Flow's webhook URL as a Chat Channel webhook.

You can do this in the **Webhooks** section of the Chat Console for your Chat Service, or via the API. The following is an example of setting a Chat Service webhook via the API with CURL:

```bash
curl -X POST https://chat.twilio.com/v2/Services/ISxxxxxxxx/Channels/CHxxxxxxxxxx/Webhooks \
--data-urlencode "Type=studio" \
--data-urlencode "Configuration.FlowSid=FWxxxxxxxxx" \
-u ACCOUNT_SID:AUTH_TOKEN

```

Once you've configured your Chat Service to use your Flow to handle messages, new messages posted in the Chat Channel will create a new Studio Execution, allowing your Studio Flow to interact with a Chat user.

## Send Message transitions

These events trigger transitions from this widget to another widget in your Flow. For more information on working with Studio transitions, [see this guide](/docs/studio/user-guide/get-started#define-widget-transitions).

| Name           | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| Sent           | The message was successfully delivered to the recipient.                   |
| Failed to Send | The request to the Messaging API failed and the message could not be sent. |

## Send Message variables

Each outbound message you send using the Send Message widget stores the following variables for use throughout the rest of your Studio Flow. For more information on working with variables in Studio, [see this guide](/docs/studio/user-guide/get-started#use-variables-in-your-studio-flow).

Find definitions and examples for these variables at the [Message Resource](/docs/messaging/api/message-resource#message-properties) page.

| Name   | Liquid Template Language                       |
| ------ | ---------------------------------------------- |
| Body   | \{\{widgets.MY\_WIDGET\_NAME.outbound.Body}}   |
| From   | \{\{widgets.MY\_WIDGET\_NAME.outbound.From}}   |
| SID    | \{\{widgets.MY\_WIDGET\_NAME.outbound.Sid}}    |
| Status | \{\{widgets.MY\_WIDGET\_NAME.outbound.Status}} |
| To     | \{\{widgets.MY\_WIDGET\_NAME.outbound.To}}     |

## Example: Hello

The following example shows a Studio Flow to send a message with the contents "Hello!" whenever a user messages the phone number connected to the Studio Flow.

![Twilio Studio Send Message Example.](https://docs-resources.prod.twilio.com/ffed3e70d3e48673d64d3063137121ee308a3f621888c380fe17d0757fe16ae9.png)

## Learn more

Want to see how to use the Send Message widget in a real-world example?

* Follow along with [this tutorial that shows how to set up an SMS auto-responder with Twilio Studio](/docs/studio/tutorials/how-to-set-up-auto-responder) to see it in action.

Let's build something amazing.
