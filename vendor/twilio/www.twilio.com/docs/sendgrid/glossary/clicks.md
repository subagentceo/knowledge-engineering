# Clicks and unique clicks

*Analytics*. A record of each time a customer clicks any link in your Twilio SendGrid emails. To track clicks, turn on [click tracking][click-tracking].

> \[!NOTE]
>
> Consider the privacy implications of click and open tracking. Depending on the country where your recipient resides, tracking engagement with this feature may require the [affirmative consent][consent] of the recipient.

When you turn on click tracking, Twilio SendGrid replaces the links in your email templates with a custom link. When a customer clicks this link, Twilio records the click, then redirects your customers to the original link from your template. Twilio SendGrid can track 1,000 links per email.

Twilio SendGrid tracks clicks and unique clicks in two places:

* In [Statistics][] as a *percentage*:
  * It calculates clicks as the total number of times your customers have clicked on the various links within your emails divided by the total number of delivered messages.
  * It calculates unique clicks as the number of unique individuals that have clicked the links in your emails, divided by the total number of delivered messages.
* In the [Email Activity Feed][] as an *integer*:
  * The feed displays the number of opens and clicks for each email sent to each recipient.

Twilio doesn't count clicking an unsubscribe link as a click. If you use a third-party unsubscribe link, Twilio counts it as a click.

Twilio stores unique click events for up to seven days.

[click-tracking]: /docs/sendgrid/ui/account-and-settings/tracking#click-tracking

[consent]: /docs/sendgrid/glossary/affirmative-consent

[Statistics]: /docs/sendgrid/ui/analytics-and-reporting/marketing-campaigns-stats-overview#total-clicks

[Email Activity Feed]: /docs/sendgrid/ui/analytics-and-reporting/email-activity-feed
