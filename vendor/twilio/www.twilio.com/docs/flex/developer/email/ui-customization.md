# Customize the Email in Flex UI

> \[!WARNING]
>
> Email in Twilio Flex is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

Email in Flex uses the same programmable model as other parts of the Flex UI. This means that you can add, replace, and remove email editor components or invoke various actions related to email in Flex UI. This section describes the dedicated components and actions in Email in Flex, as well as some ideas for how to use them.

## Email UI components

Flex UI has two main components for email: the email editor and the email messages themselves.

### *EmailMessageItem*

![Email interface showing a message to customer@example.com with a greeting and closing from an agent.](https://docs-resources.prod.twilio.com/881a874cd3295acfad56394d0fa771f52c952c59e2b6808ce3b8657f260cf850.png)

`EmailMessageItem` contains an accordion that displays the email message. You can replace it with a custom component or add components before or after it.

```jsx
const CustomMessage = (props: EmailMessageItemChildrenProps) => {
    return <div>custom message</div>;
};

Flex.EmailMessageItem.Content.replace(<CustomMessage key="custom" />);


```

The replaced or added components receive the following props:

```typescript
export interface EmailMessageItemChildrenProps {
   message: MessageState;
   defaultOpen?: boolean;
   avatarUrl: string;
   conversationSid: string;
}
```

### *EmailMessageEditor*

![Email editor interface with subject line and send button.](https://docs-resources.prod.twilio.com/4768b48e0b1b16b690bdd4ea9e146e40d088dcd24362e0282a24cb7bd34f2808.png)

The EmailEditor contains an accordion. You can replace the accordion with custom components, or add components before or after it.

```jsx
const CustomEditor = (props: EmailEditorChildrenProps) => {
   return <textarea>custom content</textarea>;
};

Flex.EmailEditor.Content.replace(<CustomMessage key="custom" />);
```

The replaced or added components receive the following props:

```typescript
export interface EmailEditorChildrenProps {
   disabledReason: string;
   charLimit: number;
   conversationSid: string;
   conversation: ConversationState;
   messageState: MessageState;
   connectionState: string;
}
```

## Email Actions

Email in Flex uses the [Actions Framework](/docs/flex/developer/ui/v1/actions) to allow you to modify UI interactions. The following actions are standard for sending messages in Flex:

* `SetInputText`

  * This action supports HTML in input text.
* `SendMessage`

The actions for Email in Flex are:

### ***AttachFiles***

Attaches files to the message the agent is drafting.

```javascript
Flex.Actions.invokeAction("AttachFiles", {
   files: [file1, file2],
   conversationSid: "CHxxxxxxxxx",
   conversationType: "email"
});
```

| **Property**     | **Description**                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| files            | Required. An array of files to be attached.                                                                      |
| conversationSID  | Required. The SID for the Conversation to which the media files should be attached.                              |
| conversationType | Required Type: Email. Enforces validation against Conversations limits (max amount of attached files, max size). |

### ***DownloadMedia***

Downloads media files attached to a message.

```javascript
Flex.Actions.invokeAction("DownloadMedia", {
   media: media,
   conversationSid: "CHxxxxxxxxx",
   conversationType: "email"
});
```

| **Property**     | **Description**                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------- |
| media            | Required. The Conversations media object to be downloaded.                               |
| conversationSID  | Required. The SID for the Conversation from which the media will be downloaded..         |
| conversationType | Required Type: Email. Enforces validation against Conversations limits (e.g., max size). |

### ***StartOutboundEmailTask***

Starts a new task for the worker. The only required argument is `destination`.

```javascript
Flex.Actions.invokeAction("StartOutboundEmailTask", {
   destination: "customer@address.com",
   queueSid: "WQxxxx",
   from: "contactCenter@address.com",
   fromName: "My contact center name",
   taskAttributes: {}
});
```

*Arguments*

| **Property**   | **Description**                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------- |
| destination    | Required. The address to which the email should be sent.                                                    |
| queueSid       | Optional. The queue that the new email task should be added to. Falls back to default email outbound queue. |
| from           | Optional. The from email address. Falls back to default email address.                                      |
| fromName       | Optional. The name associated with the From email address. Falls back to the default email name.            |
| taskAttributes | Optional. TaskAttributes for the created Task. Defaults to an empty object.                                 |

## Sample use cases

Flex UI 2.x.x uses a similar programmable interface for [adding, removing, and updating components](/docs/flex/developer/ui/components) and for [invoking actions](/docs/flex/developer/ui/v1/actions). See the Flex Developer documentation to learn more about working with components and actions.

### ***Set a dynamic email signature***

Use the SetInputText action to dynamically update the content of the editor. In the following example, the email signature is set using the worker's attributes before they've even written their email.

```jsx
const { full_name, email } = Twilio.Flex.Manager.getInstance().workerClient.attributes;

Twilio.Flex.Actions.invokeAction("SetInputText", {
   body: <div><p>Your message here</p><p style='margin-top:20px; border-top: 2px dashed; color: tomato; padding-top:20px'>${full_name} - ${email}</p><p style='color:#333333;'>Engineer</p></div>,
   conversationSid: "CH049a1c27f2f14bc5b8eba3244a846a05"
});
```

Editor output:

![Email reply template with subject 'Hello there' and message 'Hi Raffaele, Thanks for your email. Regards, Maria'.](https://docs-resources.prod.twilio.com/f2c184f2d4e17a35c807f883e1183d31969eb48d9020405140e7d45c4ebefae0.png)

### ***Insert a default response***

You can go further and include a default response in the text editor so that agents have a strong template to work from. In this example, the SetInputText action is used alongside the Flex TaskHelper method to populate the response with the customer's name.

```jsx
const conversationSid = "CH..."
const task = Twilio.Flex.TaskHelper.getTaskFromConversationSid(conversationSid);

Twilio.Flex.Actions.invokeAction("SetInputText", {
   body: <div><p>Hi ${task.attributes.customerName},  thanks for your email. </p><p>Regards,  Owl Customer Centre</p></div>,
   conversationSid,
})
```

Editor output:

![Default response template.](https://docs-resources.prod.twilio.com/9f222490e4499a4bae1885800915e312595b687551784e99d74e00c021d63652.png)

### ***Automatically add a disclaimer***

You can automatically inject text after (or before) the agent message by adding the beforeSendMessage listener to Flex Actions. In this example, the code appends a confidentiality disclaimer before sending the email. The agent won't see this change in their HTML editor, but they will see it in the sent message.

```bash
Twilio.Flex.Actions.addListener("beforeSendMessage", (payload) => {
   payload.htmlBody += <p style="font-size:10px; color:#666; margin-top:20px;">CONFIDENTIAL: This email and any files transmitted [....]</p>;
});
```

Message in agent's editor:

![Email draft with subject 'Hello there' and message 'Hi there, Thanks.'.](https://docs-resources.prod.twilio.com/db909d1e9c09d06cc2f22f09170162f20bafdc6efbcd7dcafafe3c6f6339cd2b.png)

Output message:

![Email to raffa@stowlcustomer.com with a confidentiality notice.](https://docs-resources.prod.twilio.com/ad328047146a3692a8ad5d9eaad1a1f959b774f875b7b164ca15cbc2eda27c48.png)

### ***Replace placeholder text***

You can create message templates by adding the `beforeSendMessage` listener to Flex Actions. In this example, Flex replaces the $CUSTOMER\_NAME variable with the actual name of the customer. The agent won't see this change in their HTML editor, but they will see it in the sent message.

```javascript
Twilio.Flex.Actions.addListener("beforeSendMessage", (payload) => {
   const task = Twilio.Flex.TaskHelper.getTaskFromConversationSid(payload.conversationSid);
   payload.htmlBody = payload.htmlBody.replace(/\$CUSTOMER_NAME\$/g, task.attributes.customerName);
})
```

Message in agent's editor:

![Email template with subject 'Hello there' and placeholder for customer name.](https://docs-resources.prod.twilio.com/ca64a6d6f82207544576a3b38835e26f7c01ea53cf3fe1c897387574f5d14d20.png)

Output message:

![Email message to Raffaele Abramini thanking them for feedback.](https://docs-resources.prod.twilio.com/12466857c6239c5982b958c5647a61ed5fa32c64568b45c7bc0d8919f888000c.png)

## Next Steps

* [Start using Conversations to interact with email contents on the fly](/docs/flex/developer/email/conversations)

[\< Email index page](/docs/flex/email)
