# Manage bounced messages

When the receiving mail server rejects a sent message, a [*bounce*][bounce] occurs. Common causes for bounced email messages include a misspelled or [nonexistent email address][].

A *repeat bounce* occurs when an address has bounced, bounced a second time, then logged to the bounce suppression list, but you ask Twilio to send to this recipient again. Twilio SendGrid suppresses the message because it recorded that recipient address as [invalid][].

## Receive bounce notifications

To receive a notification for each bounce message, turn on **Forward Bounce Messages**.

1. Open the Twilio SendGrid console.
2. Go to **Settings** > **Mail Settings**.
3. Click **Forward Bounce Messages**. The **Forward Bounce Messages** panel appears.
4. Choose which email address should receive the notifications.
5. Toggle **Forward Bounce Messages Status** to **Enabled**.
6. Click **Save**.

**Note**: If you enable bounce notifications, any interactions with the bounce notification (such as opens or clicks) are tracked and associated with the original message that failed to deliver.

## Search bounces by date

To change the range of bounces displayed in this list, choose a date range.

1. Open the Twilio SendGrid console.
2. Go to **Suppressions** > **Bounces**.
3. Click **All Time**. A calendar appears.
4. Click the date when your search should start.
5. Click the date when your search should end.

Your recipient list refreshes and displays the recipients bounced in that range.

To reset the date range to all time through the Twilio SendGrid console:

1. Click date range button. A calendar appears.
2. Click **All Time**.

Your recipient list refreshes and displays the recipients bounced for all time.

## Download a list of bounces

To download a list of bounces, export a comma-separated value list.

1. Open the Twilio SendGrid console.
2. Go to **Suppressions** > **Bounces**.
3. Click the gear icon.
4. Click **Export CSV**. The file downloads through your browser.

## Remove recipients from the list

To remove a recipient from the bounce list, find the recipient and delete their entry from the list.

1. Open the Twilio SendGrid console.
2. Go to **Suppressions** > **Bounces**.
3. Choose if you want to delete certain bounces or all of them.
   * To delete all bounces:
     1. Click the gear icon.
     2. Click **Delete All**.
     3. When prompted, click **Delete**.
   * To delete some bounces:
     1. Select the checkbox next to the recipient name that you want to delete.
     2. Click **Delete**.
     3. When prompted, click **Delete**.

After you remove a recipient from the bounce list, Twilio allows you to send email to that recipient. The bounce list doesn't include unsubscribed recipients.

## Types of bounces

Bounces occur either before (*synchronous*) or after (*asynchronous*) the message gets delivered.

* When Twilio SendGrid accepts a message for delivery, but the inbox providers reports that message as a bounce, an [*asynchronous bounce*][async-bounce] occurs.
* When the remote inbox provider rejects the message during the initial delivery attempt, a [*synchronous bounce*][sync-bounce] occurs.

## Additional resources

* [Global Unsubscribes][]
* [Group Unsubscribes][]

[Global Unsubscribes]: /docs/sendgrid/ui/sending-email/global-unsubscribes/

[Group Unsubscribes]: /docs/sendgrid/ui/sending-email/group-unsubscribes/

[nonexistent email address]: /docs/sendgrid/ui/sending-email/invalid-emails

[bounce]: /docs/sendgrid/glossary/bounces

[async-bounce]: /docs/sendgrid/glossary/bounces#asynchronous-bounce

[sync-bounce]: /docs/sendgrid/glossary/bounces#synchronous-bounce

[invalid]: /docs/sendgrid/glossary/invalid-email
