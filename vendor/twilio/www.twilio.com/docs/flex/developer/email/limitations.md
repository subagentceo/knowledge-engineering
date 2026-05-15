# Email in Flex limitations

> \[!WARNING]
>
> Email in Twilio Flex is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

## Configuration

Once the Twilio account is linked with a SendGrid account, you cannot unlink it yourself. If you need to change, unlink, or delete the linked SendGrid account, [contact our support team](https://help.twilio.com) for help.

## TaskRouter scalability

Please discuss TaskRouter scalability with your Twilio team, particularly for managing a backlog of tasks. The maximum number of Tasks in TaskRouter is 25,000.

## Email attachments

The following file types are supported for attachments: .pdf, .jpg and .jpeg, .png, .gif, .mp3, .mp4, .txt, .heic, and .amr. Other file types are not supported as attachments at this time.

Inline attachments--an attached file, such as an image, that appears the body of an email--are currently supported for inbound emails only. For outbound emails, agents must use the paperclip icon to select and add their attachments.

## Email size

| **Action**                                   | **Size** |
| -------------------------------------------- | -------- |
| Email size (inbound, including attachments)  | 20MB     |
| Email size (outbound, including attachments) | 20MB     |

Out-of-order processing of inbound emails is possible. For example, if an end user sends multiple messages in quick succession, Twilio may process the second message before the first. This limitation is complex and impacted by the implementation of mailbox providers. Additionally, unwanted emails coming from spam senders or a malicious actor may impede the processing of valid emails.

## Scalability

Following are the scalability limitations for Email in Flex:

| **Action**                                  | **Rate**               |
| ------------------------------------------- | ---------------------- |
| Create a new email interaction              | 20 requests per second |
| Accept email reservations                   | 20 requests per second |
| Add new participants to email conversation  | 20 requests per second |
| Remove participants from email conversation | 20 requests per second |

## Conversations

Email in Flex uses [the Conversations API and its associated limits](/docs/conversations-classic/conversations-limits).

| **Action**                                                     | **Rate**                                                                              |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Actions (e.g., new email conversations and new email messages) | 30 actions per second                                                                 |
| Inbound email processing                                       | 25 inbound emails per second (subject to change based upon the number of attachments) |
