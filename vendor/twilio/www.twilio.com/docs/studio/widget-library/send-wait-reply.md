# Send and Wait For Reply widget

Studio widgets represent various parts of Twilio's functionality that you can combine in your Studio Flow to build out robust applications that don't require you to do any coding.

> \[!NOTE]
>
> New to Twilio Studio? Check out our [Getting Started guide](/docs/studio/user-guide/get-started).

The **Send and Wait For Reply** allows you to send an outgoing message, wait for a reply, and collect the user's response.

Use this widget to collect replies to your messages, such as a YES to confirm an appointment or answering survey questions. You can also configure a timeout to wait for the response, after which we will assume "No Reply" and transition accordingly. You can use this to send a followup reminder message, trigger an outgoing voice call, or update your database with no response.

![Reminder prompt asking users to reply YES for daily reminders with options for reply, no reply, and delivery fails.](https://docs-resources.prod.twilio.com/4bce411d1d37eb1323240c221d091004fb17a3c053be297f6a641cbf38d9044c.png)

## Required Configuration for Send and Wait For Reply

The Send and Wait For Reply widget requires several pieces of information to function properly. You will need to include who the message is being sent to, what the message is, and how long to wait for a reply.

| Name                 | Description                                                                                                                                                                                                                                     | Default                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| Message Body         | The text of the message to send.                                                                                                                                                                                                                | None                                |
| Send Message From    | The "from" number — choose one from Phone Number, MessagingServiceSid, OTT Id                                                                                                                                                                   | Flow Default `flow.channel.address` |
| Stop Gathering After | The number of seconds to wait for a reply. Best practice is to limit the timeout to 4 hours or less. The entire Execution cannot live longer than 30 days due to our [data retention policy](/docs/studio/user-guide#data-retention-in-studio). | `3600 seconds`                      |

## Optional Configuration for Send and Wait for Reply

The Send and Wait For Reply widget also accepts a number of configuration options that you can use to send media or other message attributes.

| Name                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| Use Link Shortening       | Enables [link shortening](/docs/messaging/features/link-shortening) on your message. This requires sending the message from a Messaging Service that has been [onboarded to link shortening](/docs/messaging/features/link-shortening/onboarding-guide).<br /><br />Studio looks for a Messaging Service SID in the 'Send message from' address, `{{flow.channel.address}}`, and `{{trigger.message.MessagingServiceSid}}`, in that order.<br /><br />Link shortening is not currently supported in Flows triggered by an incoming Conversation. | Unchecked                     |
| Media URL                 | The URL of the media you wish you send out with the message (i.e. [https://demo.twilio.com/owl.png](https://demo.twilio.com/owl.png))                                                                                                                                                                                                                                                                                                                                                                                                            | N/A                           |
| Programmable Chat Service | Only applies for Flows used with [Programmable Chat](/docs/chat). A Chat service contains all the channels, messages, users, and other resources within a Chat deployment. See the [Chat Services Resource](/docs/chat/rest/service-resource) for more information.                                                                                                                                                                                                                                                                              | `trigger.message.InstanceSid` |
| Programmable Chat Channel | Only applies for Flows used with [Programmable Chat](/docs/chat). Channels are the center of all chat activity within a Chat Service. Chat messages are sent to a particular channel. See the [Channels Resource](/docs/chat/rest/channel-resource) for more information.                                                                                                                                                                                                                                                                        | `trigger.message.ChannelSid`  |
| Message Attributes        | Only applies for Flows working with [Programmable Chat](/docs/chat). An optional string metadata field you can use to store any data you wish along with the sent message. The string value must contain structurally valid JSON if specified. See the \[Programmable Chat Message Resource]\(/docs/chat/rest/message-resource for more information.                                                                                                                                                                                             | N/A                           |

> \[!NOTE]
>
> For a list of fully supported media content types, [please see the Accepted Content Types for Media doc.](/docs/messaging/guides/accepted-mime-types#supported-mime-types)

Chat Services REST API docs: [https://www.twilio.com/docs/chat/rest/services](/docs/chat/rest/service-resource)

Chat Channels REST API docs: [https://www.twilio.com/docs/chat/rest/channels](/docs/chat/rest/channel-resource)

Chat Messages REST API docs: [https://www.twilio.com/docs/chat/rest/messages](/docs/chat/rest/message-resource)

## Using Programmable Chat

Messages from a user in a Programmable Chat Channel can be received by Studio and responded to using the Send and Wait for Reply widget. To enable incoming Chat messages, add the Studio Flow's webhook URL as a Chat Channel webhook.

**Example:**

```bash
curl -X POST https://chat.twilio.com/v2/Services/ISxxxxxxxx/Channels/CHxxxxxxxxxx/Webhooks \
--data-urlencode "Type=studio" \
--data-urlencode "Configuration.FlowSid=FWxxxxxxxxx" \
-u ACCOUNT_SID:AUTH_TOKEN
```

New messages posted in the Chat Channel will create a new Studio Execution, enabling the Studio Flow to interact with the Chat user.

## Send and Wait For Reply Transitions

These events trigger transitions from this widget to another widget in your Flow. For more information on working with Studio transitions, [see this guide](/docs/studio/user-guide/get-started#define-widget-transitions).

| Name           | Description                         |
| -------------- | ----------------------------------- |
| Reply          | Contact successfully replied.       |
| No Reply       | Contact did not reply.              |
| Delivery Fails | The message could not be delivered. |

## Send and Wait For Reply Variables

When the Send and Wait For Reply widget executes, it will have stored the following variables for use throughout your Studio Flow (where `MY_WIDGET_NAME` is the name of your actual widget). For more information on working with variables in Studio, [see this guide](/docs/studio/user-guide/get-started#use-variables-in-your-studio-flow).

Find definitions and examples for these variables at the [Message Resource](/docs/messaging/api/message-resource#message-properties) page.

### Outbound Variables

The message Studio sent to the user.

| Name               | Liquid Template Language                       |
| ------------------ | ---------------------------------------------- |
| Body               | \{\{widgets.MY\_WIDGET\_NAME.outbound.Body}}   |
| From (Studio Flow) | \{\{widgets.MY\_WIDGET\_NAME.outbound.From}}   |
| SID                | \{\{widgets.MY\_WIDGET\_NAME.outbound.Sid}}    |
| Status             | \{\{widgets.MY\_WIDGET\_NAME.outbound.Status}} |
| To (User)          | \{\{widgets.MY\_WIDGET\_NAME.outbound.To}}     |

### Inbound Variables

The message sent by the user.

| Name             | Liquid Template Language                          |
| ---------------- | ------------------------------------------------- |
| Body             | \{\{widgets.MY\_WIDGET\_NAME.inbound.Body}}       |
| From (User)      | \{\{widgets.MY\_WIDGET\_NAME.inbound.From}}       |
| MediaUrl\{N}     | \{\{widgets.MY\_WIDGET\_NAME.inbound.MediaUrl0}}  |
| SID              | \{\{widgets.MY\_WIDGET\_NAME.inbound.MessageSid}} |
| To (Studio Flow) | \{\{widgets.MY\_WIDGET\_NAME.inbound.To}}         |

> \[!NOTE]
>
> If more than one media element is indicated by NumMedia then MediaUrl\{N} will be used, where N is the zero-based index of the Media (for example, `MediaUrl0`). Note that this behavior does not apply for WhatsApp Channels, and only one image will be accessible.

## Example: an SMS Prompt

In the following example, we have asked the user if they are enjoying their time creating Flows with Twilio Studio using the **Send and Wait For Reply widget**. We've named the widget `first_message`. Our Flow will wait for a reply from the user and then send them another message using the [Send Message widget](/docs/studio/widget-library/send-message) named `first_reply`, once they respond.

If they don't respond, our Flow will use the Send Message widget named `no_reply_response` to follow up with the user.

![Twilio Studio flow with trigger and send-wait-reply configuration, showing message paths for reply and no reply.](https://docs-resources.prod.twilio.com/1071ea281ae09bf9e2bc7f4906bd2047381f1a8cc4762461000e77676979a4f6.png)

You can even extend this Studio Flow by adding some conditional logic based on how the user responds with the Split Based On... widget. [Head over to the Split Based On... widget documentation to learn more!](/docs/studio/widget-library/split-based-on)

## Learn More

Now that you know the basics of the Send and Wait For Reply widget, you may want to dig into the [Liquid Templating Language](/docs/studio/user-guide/liquid-template-language). We also have step-by-step tutorials that will show you how to implement the Send and Wait For Reply widget in Studio:

* [Conduct an SMS Survey with Studio](/docs/studio/tutorials/how-to-conduct-a-survey)
* [Send Appointment Reminders with Studio](/docs/studio/tutorials/how-to-send-appointment-reminders)

Let's build something amazing.
