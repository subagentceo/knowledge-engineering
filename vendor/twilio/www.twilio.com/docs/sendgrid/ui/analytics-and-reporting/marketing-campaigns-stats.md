# Marketing Campaigns Statistics

> \[!NOTE]
>
> These tutorials cover the latest version of Marketing Campaigns. If you're using the legacy version of Marketing Campaigns, your experience might differ. To send email with the Twilio SendGrid Email API, see the [API reference][] or the [SMTP Reference][].

[API reference]: /docs/sendgrid/api-reference

[SMTP Reference]: /docs/sendgrid/for-developers/sending-email/getting-started-smtp

With Marketing Campaigns email statistics, you can unlock the full potential with the right data at your fingertips. Use your data to guide you to the right strategy. Get insights about both marketing and transactional email for a 360-degree understanding of your audience's experience. Finally, use your data to brings results to life and share your performance with teammates and stakeholders.

## View single send statistics

Once you send a single send message, you can view related statistics.

1. Log in to the Twilio SendGrid console.
2. Go to **Marketing** > **Single Sends**. The **Single Sends** appears.
3. Go to the desired Single Send.\
   Each entry includes the date sent, the name given the send, and the date last edited.
4. If doesn't list its status as **Draft**, click its link. The page for that single send appears.
5. If no statistics display, you might need to change the date range. Click the displayed date range and choose a different range of dates. Set the first date as the date the single send got sent.
6. The statistics displayed include one or more of the following:
   * Emails Triggered
   * Delivered
   * Unique Opens
   * Unique Clicks
   * Bounces
   * Unsubscribes
   * Spam Reports
7. To filter out certain statistics, click **Select Stats**. You can select one or more of the following statistics to display:
   * All Stats
   * [Bounce Drops][drop]
   * [Bounces][]
   * [Total Clicks][clicks]
   * [Delivered][]
   * [Invalid Emails][]
   * [Total Opens][opens]
   * [Emails Triggered][]
   * [Spam Report Drops][drop]
   * [Spam Reports][]
   * [Unique Clicks][clicks]
   * [Unique Opens][opens]
   * [Unsubscribes][]

## View automation statistics

Once you activate an automation, you can view related statistics.

1. Log in to the Twilio SendGrid console.
2. Go to **Marketing** > **Automations**. The **Automations** appears.
3. Go to the desired Automation.\
   Each entry includes the date sent, the name given the send, and the date last edited.
4. If doesn't list its status as **Draft**, click its link. The page for that single send appears.
5. If no statistics display, you might need to change the date range. Click the displayed date range and choose a different range of dates. Set the first date as the date the single send got sent.
6. The statistics displayed include one or more of the following:
   * Emails Triggered
   * Delivered
   * Unique Opens
   * Unique Clicks
   * Bounces
   * Unsubscribes
   * Spam Reports
7. To filter out certain statistics, click **Select Stats**. You can select one or more of the following statistics to display:
   * All Stats
   * [Bounce Drops][drop]
   * [Bounces][]
   * [Total Clicks][clicks]
   * [Delivered][]
   * [Invalid Emails][]
   * [Total Opens][opens]
   * [Emails Triggered][]
   * [Spam Report Drops][drop]
   * [Spam Reports][]
   * [Unique Clicks][clicks]
   * [Unique Opens][opens]
   * [Unsubscribes][]

## Track clicks of email links

With click tracking, you can see how many clicks each individual link in your Single Sends and Automation emails received. Marketing Campaigns lists each link separately, including links that appear multiple times. For example, links that appear at both the top and bottom of an email.

Marketing Campaigns will provide the "URL location" for each link, ordered top left to bottom right. You can use this to identify the link if multiple URLs are the same, and to understand which link locations are more or less engaging.

### Track clicks for A/B tests

A/B tests are a special case for link click tracking.

![Link tracking results showing Facebook, Twitter, Instagram, and Pinterest with total clicks.](https://docs-resources.prod.twilio.com/2bcdcbdb56991a02e466581069fea2d1669b7b897afb3059e6eea62affb72c97.png)

Each tab shows all-time clicks for each of the variants sent as part of a test sample size, as opposed to clicks just earned during the testing period. For example, if the sample size for a Single Send was 100 emails for each variant, you would see the engagement with those 100 emails inclusive of and beyond the test period. In other words, if the test period is 24 hours, but someone who received the test email opened it 48 hours later, that click would be included in the variant tab.

This means that if the winner were selected by clicks, there's a chance that in a test period, Version B could win, but over time, Version A could end up earning more clicks.

## Additional resources

* [Sending a Campaign][]
* [A/B Testing Your Campaign][]

[Sending a Campaign]: /docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns

[A/B Testing Your Campaign]: /docs/sendgrid/ui/sending-email/a-b-testing

[drop]: /docs/sendgrid/glossary/drops

[Bounces]: /docs/sendgrid/glossary/bounces

[clicks]: /docs/sendgrid/glossary/clicks

[Delivered]: /docs/sendgrid/glossary/deliveries

[Invalid Emails]: /docs/sendgrid/glossary/invalid-email

[opens]: /docs/sendgrid/glossary/opens

[Emails Triggered]: /docs/sendgrid/glossary/triggered-email

[Spam Reports]: /docs/sendgrid/glossary/spam-reports

[Unsubscribes]: /docs/sendgrid/glossary/unsubscribes
