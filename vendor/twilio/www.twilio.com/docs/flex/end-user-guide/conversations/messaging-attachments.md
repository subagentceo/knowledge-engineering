# Send an attachment

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0. If you are on Flex UI 1.x, please refer to [Chat and Messaging](/docs/flex/end-user-guide/messaging) pages.

Once Flex UI 2.x.x is enabled on your account and messaging channels have been migrated to Flex Conversations, you can start sending files via [Flex Conversations channels](/docs/flex/admin-guide/core-concepts/conversations), such as SMS and WhatsApp.

> \[!NOTE]
>
> Only a single file attachment can be sent per message.
>
> For more information on available file types and size limitations - please contact your administrator.

## **Send and receive files**

Agents and customers will see the messaging canvas with any previous messages sent and received between them. At the bottom of the message canvas is the message input where you type out your replies, which includes the attachment button underneath on the left.

![Chat input box with attach file icon and send button.](https://docs-resources.prod.twilio.com/e1edc41d3c3c02a635d05ddca04c96de68e95c397c933270b879b1297b593a78.png)

Clicking it will open your Operating System's file picker which you can use to navigate your file structure and select the file you want to send. The chosen file will appear in a preview of the message with the file name and size shown. Click the send button to send the file or click the remove button to clear the file from the message input.

You can also include a text message with the file.

![Message input with attached PDF file named 'Laptop Par...pdf', size 211 KB.](https://docs-resources.prod.twilio.com/c336e652959f4455a1ba0fce9a4c72cd9c6cee0baf80346747355cb82992c7e4.png)

You will see an error notification if the file doesn't meet the size or type restrictions your administrator has configured.

![Error message: idealC-2021.3.dmg file type is unsupported.](https://docs-resources.prod.twilio.com/5c558eb1c08b774c7c68759fb1e0ccc25a2faeb83d560ef8d72a6a328f458373.png)

When the attachment has been sent you'll see the file preview in the chat history. If customers send you files they will also appear in the chat history.

![Chat exchange with file attachments, including invoice and confirmation PDFs.](https://docs-resources.prod.twilio.com/19dda02ea6eb3a4b508aa34f8173a60e0ea079ab48e2936cdccf0f9a9aa271a3.png)

You can click the file preview to open the file. Depending on the file type it may open as a preview in your browser or be downloaded to your device. You may be prompted to select a location on your computer to save the file.

If the attachment fails to send you'll be notified with a warning. You'll need to re-select the file and send it again.

![Error message: File '-001.docx' failed to send at 18:45.](https://docs-resources.prod.twilio.com/475158296996410de7845c9795f2b86230a2caf36ce0bcd89868c8d1899f71af.png)

You can also drag and drop files into the Messaging Canvas to send them. Once you have dragged the file in, it will appear in the Message Input and you can send it right away or add text to the message before sending.

![Drag and drop a PDF file to attach in a WhatsApp conversation.](https://docs-resources.prod.twilio.com/5cfa1e11399b8fca535e79ddf29a7d6fe14f4b152cd713ef8cbab1b2a8b18b7c.png)

## Next Steps

* Learn how to [enable attachments](/docs/flex/developer/messaging/webchat/enable-attachments)
* Discover the [programmability of chat attachments](/docs/flex/developer/messaging/webchat/customize-attachment-behavior)
* Learn more about [Flex WebChat UI](/docs/flex/developer/messaging/webchat/setup)
