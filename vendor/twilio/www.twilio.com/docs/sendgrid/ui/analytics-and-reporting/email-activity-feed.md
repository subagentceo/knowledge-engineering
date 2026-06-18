# Email Activity Feed

The Email Activity Feed displays a snapshot of email-activity events for your account and any subusers. As each entry shows the full delivery flow of the message, this helps you identify delivery issues. If you purchase the Email Activity history add-on, the feed retains events for up to 30 days.

The Email Activity Feed offers you the following functionality:

* Examine sequential event data for each message to diagnose delivery issues.
* Locate specific messages with search and filter options, including subject line and message metadata.
* Download event data as a CSV file.
* View up to 30 days of events with the Email Activity history add-on.
* Retrieve all events for a message by using the Email Activity API when additional storage is enabled.

> \[!NOTE]
>
> * Reseller accounts and extra-high-volume accounts can't access the new Email Activity Feed. They can view [Legacy Email Activity][sg-legacy-activity].
> * Twilio stores all Email Activity data in the United States.

## Filter email activity

The Email Activity Feed lists each message. Select a message to view the events that have occurred for that message. Use the basic or advanced search to filter by subject line, recipient, or event type.

### Search by date or email pattern

1. Log in to the Twilio SendGrid console.
2. Click [**Activity**][sg-activity].
3. Use the displayed boxes to filter events.
   * To filter on part of an email address, type that part into the **To email address** field. It uses [fuzzy matching][wp-fuzzy].
   * To limit events to a specific duration, set a range in the **Dates** box.
4. Click **Search**.\
   The email activity matching the email pattern, date range, or both displays.

### Search by event type

1. Log in to the Twilio SendGrid console.
2. Click [**Activity**][sg-activity].
3. Click **Advanced Search**.
4. From the first dropdown menu, select **Events**.
5. From the second dropdown menu, select one of the following options:
   1. Select **is** to *match* the event type
   2. Select **is not** to match every other event type but the one you choose
6. From the third dropdown menu, select the event type to find.

   #### View accepted event types

   | Event              | Expanded description                                                                              |
   | ------------------ | ------------------------------------------------------------------------------------------------- |
   | Blocked            | ISP or inbox provider blocked the message. Blocks are temporary and don't suppress future sends.  |
   | Bounced            | Recipient's server rejected the message or message delivery attempted to unsubscribed recipients. |
   | Clicked            | Recipient clicked a tracked link. Feed shows when clicked and destination URL.                    |
   | Deferred           | Recipient's mail server asked to slow message delivery.                                           |
   | Delivered          | Recipient's mail server accepted the message.                                                     |
   | Dropped            | No delivery attempted to suppressed, bounced, or spam-reporting recipient.                        |
   | Global Unsubscribe | Recipient unsubscribed from your email.                                                           |
   | Group Resubscribes | Recipient resubscribed to a suppression group.                                                    |
   | Group Unsubscribes | Recipient unsubscribed from a suppression group.                                                  |
   | Opened             | Recipient opened the message.                                                                     |
   | Processed          | Received an email request from your site or app.                                                  |
   | Spam Report        | Recipient marked the message as spam. Recipient's mail server reported the action.                |
7. To add another filter to your advanced search, click **Add a filter** and repeat steps 4 to 6 for that filter.

   #### View all filterable parameters

   * API Key ID
   * API Key Name
   * Categories
   * Dates
   * Events
   * From Email
   * Message ID
   * Number of Clicks
   * Number of Opens
   * Requesting IP Address
   * Sending IP Address
   * Status
   * Subject
   * Teammate
   * To Email
   * Transactional Template ID
   * Transactional Template Name
   * Unsubscribe Group ID
   * Unsubscribe Group Name
8. To change the breadth of the results, toggle the word **all** in the phrase **Search emails by all of the following**.
   * **Search emails by any of the following** returns events that match one or more selected criteria.
   * **Search emails by all of the following** returns events that match every selected criterion.
9. Click **Search**.\
   The email activity matching the email pattern, date range, or both displays.

   ![Activity feed with email search filters, delivery status, and message previews.](https://docs-resources.prod.twilio.com/2ce86b01fb503c5c16858e27b40a274733b20174c699fcbdc83299870eeb106a.gif)

> \[!NOTE]
>
> * A **Deferred** event might exclude an IP address. When Twilio SendGrid detects an issue at a recipient's MX record, it pauses delivery until the issue clears. As Twilio SendGrid took no action, it doesn't log an IP address.
> * A **Bounced** event might exclude an IP address. When a recipient's mail server accepts, but later rejects, an email message, Twilio SendGrid doesn't log an IP address. As the rejection occurs after the SMTP conversation ends, the subsequent bounce lacks the original connection information.
> * The parse events don't get logged in the feed. To verify parse events, use the [Inbound Parse resource][sg-inbound-parse].
> * A **Blocked** event results from the recipient's mail server rejecting the email message. Start investigations with the recipient's mail provider.

## View event history

To inspect the event history of one message, complete the following steps:

1. In the feed, select the message you want to inspect.\
   The right-hand information panel opens.
2. Click any section with an arrow to see details.
3. Click **Close**.

![Email activity feed showing delivery status, recipient addresses, and message details.](https://docs-resources.prod.twilio.com/d5834f19ee0f8fe2d394b3544bb9c8bf9c28ec02b9db790740bcae9af906edc5.gif)

## Download email activity

> \[!WARNING]
>
> You can only export the last one million events. If you purchased the Email Activity Feed add-on, you can export events up to 30 days, but limited to the last one million events.

To export events to a comma-separated value (CSV) file, complete the following steps:

1. Log in to the Twilio SendGrid console if necessary.
2. Click [**Activity**][sg-activity].
3. Click **Export CSV**.
   Twilio SendGrid sends an email message with the download link to the email address associated with your account.
4. Check your inbox and open the email.
5. Click **Download**.

## Additional resources

* [Avoiding email block lists][]
* [Email Activity API][]
* [Legacy Email Activity][sg-legacy-activity]
* [Getting started with the Email Activity API][]
* [Create compound Email Activity queries][]

[Avoiding email block lists]: https://www.twilio.com/en-us/blog/insights/avoiding-email-blacklists

[Create compound Email Activity queries]: /docs/sendgrid/for-developers/sending-email/getting-started-email-activity-api/#creating-compound-queries

[Email Activity API]: /docs/sendgrid/api-reference/email-activity/filter-all-messages

[Getting started with the Email Activity API]: /docs/sendgrid/for-developers/sending-email/getting-started-email-activity-api

[sg-activity]: https://app.sendgrid.com/email_activity

[sg-inbound-parse]: /docs/sendgrid/ui/account-and-settings/inbound-parse

[sg-legacy-activity]: /docs/sendgrid/ui/analytics-and-reporting/email-activity

[wp-fuzzy]: https://en.wikipedia.org/wiki/Approximate_string_matching
