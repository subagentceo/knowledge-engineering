# Compose an email

> \[!WARNING]
>
> Email in Twilio Flex is not a HIPAA Eligible Service and should not be used in workflows that are subject to HIPAA.

## Compose HTML-formatted emails in the Flex Agent UI

When handling an email task, you can use the HTML editor to apply formatting to your message for the customer. The following formatting options are supported: bold, italic, underline, strikethrough, hyperlinks, numbered lists, and bulleted lists.

![Email draft with subject 'Your birthday party' and details about event confirmation requirements.](https://docs-resources.prod.twilio.com/a92437335014699f30ffe0b68fffa16b1f169da5b9b8a358e880c19eb2be55a0.png)

You can also use keyboard shortcuts to apply certain styles or undo your changes (Command + Z to undo a change on macOS, for example).

Flex currently supports Gmail and Outlook email clients.

The body of your email cannot be larger than 30KB. If you get close to the limit or exceed it, a warning will appear.

## Send and receive attachments

Both you and the customer can send and receive attachments in your email conversation. Click the attachment to view it in a new tab.

When adding an attachment, click the paperclip icon to select the file and add it. Currently, inline attachments--dragging a file, such as an image, to the body of your email--is not supported in outbound emails. However, inline attachments *are* supported in inbound emails from customers.

The following file types are supported for attachments: .pdf, .jpg and .jpeg, .png, .gif, .mp3, .mp4, .txt, .heic, and .amr. Other file types are not supported as attachments at this time.

Email attachments can be no larger than 20MB.

![Email thread with attachments: a billing statement PDF and an ID .](https://docs-resources.prod.twilio.com/a71e3ffa7c7cdf1b5837a703b99685e90adc2d6c3400bf8fbef14e39b62963f3.png)

## Add and remove recipients in the To and CC fields

You and the customer can both add or remove email addresses to the **To** and **CC** fields at any point in an email conversation. The current limit for the number of email recipients is 50.

![Email reply with addresses in To and CC fields, subject 'Re: Follow-up on Inquiry'.](https://docs-resources.prod.twilio.com/45a9e116f946c8534c0a6708d091aebef724a6c4bba89cb131f23a0ef994fdd3.png)

[\< Email index page](/docs/flex/email)
