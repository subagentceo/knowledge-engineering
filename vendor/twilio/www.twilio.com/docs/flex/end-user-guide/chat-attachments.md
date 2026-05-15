# Chat Attachments

> \[!NOTE]
>
> This guide is for Flex UI 1.x.x and channels that use Programmable Chat and Proxy. Programmable Chat for Flex will reach end of life on June 1, 2026. If you're new to Flex or currently using Programmable Chat, [build with Flex Conversations](/docs/flex/conversations) or [migrate](/docs/flex/developer/conversations/programmable-chat-to-flex-conversations).

> \[!NOTE]
>
> This Twilio product is currently available as a **Public** **Beta** release. Some features are not yet implemented and others may be changed before the product is declared as Generally Available. **Beta products are not covered by a Twilio SLA**. [Learn more about beta product support](https://help.twilio.com/articles/115002413087-Twilio-Beta-Product-Support).

Once Flex Webchat attachments are enabled, you can start sending files via Flex web chat.

## **Send and receive files via web chat**

Agents and customers will see the messaging canvas with any previous messages sent and received between them. At the bottom of the message canvas is the message input where you type out your replies, which includes the attachment button.

Clicking it will open your Operating System's file picker which you can use to navigate your file structure and select the file you want to send. The chosen file will appear in a preview of the message with the file name and size shown. Click the send button to send the file or click the remove button to clear the file from the message input.

Agents will see an error notification if the file doesn't meet the size or type restrictions you've configured.

When the attachment has been sent you'll see the file preview in the chat history. If customers are able to send you files they will also appear in the chat history.

You can click the file preview to open the file. Depending on the file type it may open as a preview in your browser or be downloaded to your device. You may be prompted to select a location on your computer to save the file.

If the attachment fails to send you'll be notified with a warning. You'll need to re-select the file and send it again.

You can also drag-n-drop files into the Messaging Canvas to send them. Once you have dragged the file in, it will appear in the Message Input and you can send it right away or add text to the message before sending.

## Next Steps

* Learn how to [enable chat attachments in Flex](/docs/flex/developer/messaging/webchat/enable-attachments)
* Discover the [programmability of chat attachments](/docs/flex/developer/messaging/webchat/customize-attachment-behavior)
* Learn more about [Flex Webchat](/docs/flex/developer/messaging/webchat/setup)
