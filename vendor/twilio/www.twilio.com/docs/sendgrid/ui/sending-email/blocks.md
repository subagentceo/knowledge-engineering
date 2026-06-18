# Manage blocked messages

When an inbox provider rejects your message for a content reason, this is called a [block][]. This can happen for a few reasons:

* Someone added your mail server IP address to a deny list.
* An ISP blocked your mail server IP address.
* A filter on the receiving server flagged the content of your message.

The **Block Reason** provides the exact reason. You might have your IP address removed from a deny list. Some lists remove email addresses after a period of time. To correct a filtered block, you can modify message content.

> \[!NOTE]
>
> A block event will not result in the recipient address being added to a suppression list.

You can filter your list of blocked email addresses using an address or date ranges.

## Search blocks by date

To change the range of blocks displayed in this list, choose a date range.

1. Open the Twilio SendGrid console.
2. Go to **Suppressions** > **Blocks**.
3. Click **All Time**. A calendar appears.
4. Click the date when your search should start.
5. Click the date when your search should end.

Your recipient list refreshes and displays the recipients blockd in that range.

To reset the date range to all time through the Twilio SendGrid console:

1. Click date range button. A calendar appears.
2. Click **All Time**.

Your recipient list refreshes and displays the recipients blockd for all time.

## Download a list of blocks

To download a list of blocks, export a comma-separated value list.

1. Open the Twilio SendGrid console.
2. Go to **Suppressions** > **Blocks**.
3. Click the gear icon.
4. Click **Export CSV**. The file downloads through your browser.

## Remove recipients from the list

To remove a recipient from the block list, find the recipient and delete their entry from the list.

1. Open the Twilio SendGrid console.
2. Go to **Suppressions** > **Blocks**.
3. Choose if you want to delete certain blocks or all of them.
   * To delete all blocks:
     1. Click the gear icon.
     2. Click **Delete All**.
     3. When prompted, click **Delete**.
   * To delete some blocks:
     1. Select the checkbox next to the recipient name that you want to delete.
     2. Click **Delete**.
     3. When prompted, click **Delete**.

After you remove a recipient from the block list, Twilio allows you to send email to that recipient. The block list doesn't include unsubscribed recipients.

## Additional resources

* [blocks](/docs/sendgrid/ui/sending-email/blocks/)
* [Global Unsubscribes](/docs/sendgrid/ui/sending-email/global-unsubscribes/)
* [Web API and Blocks](/docs/sendgrid/api-reference/blocks-api)

[block]: /docs/sendgrid/glossary/blocks
