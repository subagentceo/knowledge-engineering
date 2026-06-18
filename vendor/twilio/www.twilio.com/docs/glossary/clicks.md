# Clicks and unique clicks

*Analytics*. A record of each time a customer clicks any link in your Twilio Email email messages.

> \[!NOTE]
>
> Consider the privacy implications of click and open tracking. Depending on the country where your recipient resides, tracking engagement with this feature may require the [affirmative consent][consent] of the recipient.

When you turn on click tracking, Twilio Email replaces the links in your email templates with a custom link. When a customer clicks this link, Twilio records the click, then redirects your customers to the original link from your template. Twilio Email can track 1,000 links per email.

Twilio Email tracks clicks and unique clicks in two places:

* In Statistics as a *percentage*:
  * It calculates clicks as the total number of times your customers have clicked on the various links within your emails divided by the total number of delivered messages.
  * It calculates unique clicks as the number of unique individuals that have clicked the links in your emails, divided by the total number of delivered messages.
* In the Email Activity Feed as an *integer*:
  * The feed displays the number of opens and clicks for each email sent to each recipient.

Twilio doesn't count clicking an unsubscribe link as a click. If you use a third-party unsubscribe link, Twilio counts it as a click.

Twilio stores unique click events for up to seven days.

[consent]: /docs/glossary/affirmative-consent
