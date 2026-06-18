# Statistics Overview

Tracking your emails is an important part of being a good sender and learning about how your users interact with your email. This includes everything from basics of clicks and opens to looking at which browsers and mailbox providers your customers use.

We have broken up statistics in specific ways so that you can get at-a-glance data, as well as allowing you to get into the details of how your email is being used.

## Available Email Reports

> \[!NOTE]
>
> The timezone for statistics pages is set in your [account settings](/docs/sendgrid/ui/account-and-settings/account/).

**Overview** - The overview is your at-a-glance statistics. We give you the highlight reel so that you can keep an eye out for any issues and make sure you're on the right track.

**[Global Statistics](/docs/sendgrid/ui/analytics-and-reporting/global/)** - All of your statistics, aggregated in one place so you can see the high level view of everything.

**[Category Statistics](/docs/sendgrid/ui/analytics-and-reporting/categories/)** -You can define your categories when you send, so that you can view your email performance by category later.

> \[!NOTE]
>
> **Category statistics** are available for the previous thirteen months only.

> \[!NOTE]
>
> Categories will be stored as a "Not PII" field and may be used for counting or other operations as SendGrid runs its systems. These fields generally cannot be redacted or removed. You should avoid placing PII in this field. SendGrid does not treat this data as PII, and its value may be visible to SendGrid employees, stored long-term, and may continue to be stored after you've left SendGrid's platform.

**[Category Comparison](/docs/sendgrid/ui/analytics-and-reporting/category-comparison/)** - Compare the performance of emails from up to 10 categories against each other.

**[Subuser Statistics](/docs/sendgrid/ui/analytics-and-reporting/subuser/)** - You can segment your email to be sent by different subusers, which allows you to compare how each type or subset of your email is performing.

**[Subuser Comparison](/docs/sendgrid/ui/analytics-and-reporting/subuser-comparison/)** - Compare the performance of emails from up to 10 subusers against each other.

**[Geographical](/docs/sendgrid/ui/analytics-and-reporting/geographic/)** - See where you get the best engagement and compare engagement by geographical region.

**[Email Clients and Devices](/docs/sendgrid/ui/analytics-and-reporting/device/)** - Find out which applications and devices your recipients use to view your mail and see the statistics for each.

**[Mailbox Provider Statistics](/docs/sendgrid/ui/analytics-and-reporting/mailbox-provider-statistics)** - See all the statistics for the mailbox providers your recipients use.

**[Mailbox Provider Comparison](/docs/sendgrid/ui/analytics-and-reporting/mailbox-provider-comparison/)** - Compare the performance of emails by statistic and provider.

**[Browser Statistics](/docs/sendgrid/ui/analytics-and-reporting/browser/)** - See all the statistics for the web browsers your users view your emails from.

**[Browser Comparison](/docs/sendgrid/ui/analytics-and-reporting/browser-comparison/)** - Compare the performance of your emails by statistic and browser.

**[Parse Webhook](/docs/sendgrid/for-developers/parsing-email/inbound-email/)** - View the number of requests you have received via the Parse Webhook.

## Metrics

On the available statistics reports, you will find that your deliverability is broken down by the following metrics. Each one gives you a different piece of information about how SendGrid or your recipients interact with your email.

**[Blocks](/docs/sendgrid/glossary/blocks)** - The number of emails that were not allowed to be delivered by ISPs.

**[Bounces](/docs/sendgrid/glossary/bounces)** - The number of emails that bounced instead of being delivered.

**[Clicks](/docs/sendgrid/glossary/clicks)** - The number of links that were clicked in your emails.

**[Delivered](/docs/sendgrid/glossary/deliveries)** - The number of emails SendGrid was able to confirm were actually delivered to a recipient.

**Invalid Emails** - The number of recipients that you sent emails to, who have malformed email addresses or whose mail provider reported the address as invalid.

**[Opens](/docs/sendgrid/glossary/opens)** - The total number of times your emails were opened by recipients.

**[Requests](/docs/sendgrid/glossary/request)** - The number of emails you requested to send via SendGrid.

**[Spam Reports](/docs/sendgrid/glossary/spam-reports)** - The number of recipients who have marked your email as spam.

**[Unique Opens](/docs/sendgrid/glossary/opens)** - The number of first time opens for a specific date. (E.g. You sent an email to a recipient last week, but that recipient did not open it until today. That would count as one unique open for today. Any other subsequent opens to that email would not be considered unique.)

> \[!NOTE]
>
> Because **unique opens** are the first time the recipient opens your email, by definition, the "unique opens" percentage is the number of unique individuals that have opened your emails, divided by the total number of Delivered messages. You should be de-duping against the message ID and event field in order to determine an accurate count of **unsubscribes** and **unique opens** as these are paper trails for every unique message relayed through your account. The message ID is the unique identifier of each email relayed through the account.

**[Unique Clicks](/docs/sendgrid/glossary/clicks/)** - The number of unique recipients who have clicked links in your emails.

**Unsubscribes** - The number of recipients who have unsubscribed from your emails. Unsubscribe events are triggered when the end recipient clicks the SendGrid unsubscribe link within your emails. This statistic does not include Group Unsubscribes; only Global Unsubscribes are reported as part of this metric.

**Unsubscribe Drops** - The number of emails dropped by SendGrid because the recipient unsubscribed from your emails.

## Filters

These filters are available on most of the statistics pages. They will help you see your statistics in more or less details, depending on your needs.

**Metric Filters** - You can select all of the metrics or only some of them.

**Date Filters** - To display statistics between specific dates, choose your date range.

**Grouping Filter** - Display statistics grouped by day, week, or month.

## Top 5 Categories

The Top 5 Categories report allows you to see your top 5 most used categories by number of requests. Switch your view by actual number of emails or percentage using the toggle at the top right of this section.

> \[!NOTE]
>
> Want deeper data and insights? With [Twilio SendGrid Expert Insights](/docs/sendgrid/ui/analytics-and-reporting/subscribing-to-expert-insights/), you'll get access to more data about your email performance plus customized insights from a deliverability consultant.

## Additional Resources

* [API Statistics Overview](/docs/sendgrid/api-reference/stats/retrieve-global-email-statistics)
