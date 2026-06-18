# Working with Categories

> \[!WARNING]
>
> This information will be stored as a "Not PII" field and may be used for counting or other operations as SendGrid runs its systems. These fields generally cannot be redacted or removed. You should take care not to place PII in this field. SendGrid does not treat this data as PII, and its value may be visible to SendGrid employees, stored long-term, and may continue to be stored after you have left SendGrid's platform.

[Categories](/docs/sendgrid/glossary/categories) can help organize your email analytics by enabling you to group emails by type. Just as you can view the statistics on all your email activity, you can go a step further and view the statistics by a particular category.

## Working with categories

Categories can be added using either the X-SMTPAPI header or the Twilio SendGrid Web API.

### Categories and the X-SMTPAPI header

You can use the [X-SMTPAPI header](/docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header) to add categories to your email. This will allow you to track emails based on your own categorization system.

Categories must be in 7-bit encoding using the US-ASCII character set.

#### Example Category Header

In the following example, SendGrid would associate statistics for the email containing that header with the category **Example Category**.

```json
{
  "category": "Example Category"
}
```

### Categories and the Web API

You can also work with categories using the Twilio SendGrid Categories REST API. See our [API reference](/docs/sendgrid/api-reference/categories/) for more information and examples.

> \[!WARNING]
>
> When passing `category` please make sure to only use strings as shown in our examples. Any other type could result in unintended behavior.

> \[!NOTE]
>
> Categories should be used to group messages together by broad topic. If you need to attach unique data or identifiers to a message, use [Unique Arguments](/docs/sendgrid/for-developers/sending-email/unique-arguments/) instead.

## Limitations

Currently, you can assign up to 10 categories per message, and there is no limit to the number of categories you can track. However, Twilio SendGrid will begin enforcing limits on February 1, 2022. We recommend sending no more than \~100 total unique categories, as this will increase your ease of use in the Statistics area. Additionally, a high rate of unique categories on your account can negatively impact the rate at which we process the messages you send.

Effective February 1, 2022, Twilio SendGrid will limit the number of stored category statistics available per user. Accounts on a paid plan will be allowed 1,000 categories daily. Accounts on a free plan will be allowed 100 categories daily. The existing limit of 10 categories per email message will remain in place.

If you exceed the maximum number of categories sent, the top-used categories — 100 for free plans or 1,000 for paid plans — will be retained, and all remaining categories will be permanently deleted. Twilio SendGrid will determine a user's top categories by querying and ranking categories by the total number of statistics for each category. If multiple categories have the same statistics count, Twilio SendGrid will sort the categories alphabetically by name.

Categories are deleted on a 7-day rolling basis. This means that all of your categories will be available, without limitation, for the first 7 days after they are initially sent. Category stats will then be trimmed on a rolling basis from the eighth day prior to the current day.

For example, if you send with a total of 2,000 unique categories on February 1, you will be able to access the stats for all 2,000 categories from February 1 through February 7. On February 8, if you attempt to retrieve the category stats for February 1, only the top 100 (free plans) or top 1000 (paid plans) will be available. On February 9, categories in excess of the limit will be trimmed from February 2, and so on.

Because Twilio SendGrid uses this rolling mechanism to delete category statistics, you can retrieve and store the statistics on your own systems before they are deleted. You can configure the Twilio SendGrid [Event Webhook](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook) or use the [Categories API](/docs/sendgrid/api-reference/categories/retrieve-email-statistics-for-categories) to retrieve all the statistics that you wish to retain before they are deleted from Twilio SendGrid's systems.

If this limit change applies to you, it may be a good opportunity to evaluate how you use category statistics. Categories are meant to group messages by broad topics. However, they are not intended as tags you can use to attach unique data to an email. Twilio SendGrid provides [unique arguments](/docs/sendgrid/for-developers/sending-email/unique-arguments) specifically for this purpose, and they may be more appropriate for customers running into category statistic limits.
