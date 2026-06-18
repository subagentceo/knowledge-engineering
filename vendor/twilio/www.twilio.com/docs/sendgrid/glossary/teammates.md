# Teammates

*Configuration*. Option that allows multiple physical users to share access to a single Twilio SendGrid account.

To permit multiple users to share a single Twilio SendGrid account, Twilio developed [Teammates][]. This abstraction allows the Twilio SendGrid parent account owner grant administration and security permissions. Teammates might have users with different roles, so each requires access to different Twilio SendGrid features.

> \[!NOTE]
>
> A marketer, developer, and accountant would each have their own teammate account under one Twilio SendGrid parent account. The parent account has administrator teammate permissions and can grant any or all of these permissions to other teammates.
>
> As an example of [role-specific permissions][Teammate Permissions], the parent account would grant the marketer the following levels of access:
>
> | Permission                      | Permission level |
> | ------------------------------- | ---------------- |
> | [Alerts][]                      | Full             |
> | [Category Management][]         | Read             |
> | [Email Activity][]              | Read             |
> | [Mail Send: Scheduled Sends][]  | Read             |
> | [Mail Settings: Spam Checker][] | Full             |
> | [Marketing Campaigns][]         | Full             |
> | [Stats][]                       | Read             |
> | [Suppressions][]                | Full             |
> | [Template Engine][]             | Full             |
> | [Tracking][]                    | Full             |

To learn more about how to manage teammates, see [Teammates][] and [Teammate Permissions][]

[Teammates]: /docs/sendgrid/ui/account-and-settings/teammates

[Teammate Permissions]: /docs/sendgrid/ui/account-and-settings/teammate-permissions

[Alerts]: /docs/sendgrid/ui/account-and-settings/alerts

[Category Management]: /docs/sendgrid/ui/analytics-and-reporting/categories

[Email Activity]: /docs/sendgrid/ui/analytics-and-reporting/email-activity-feed

[Mail Send: Scheduled Sends]: https://sendgrid.api-docs.io/v3.0/mail-send

[Mail Settings: Spam Checker]: /docs/sendgrid/ui/account-and-settings/mail/#spam-checker

[Marketing Campaigns]: /docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns

[Stats]: /docs/sendgrid/ui/analytics-and-reporting/stats-overview

[Suppressions]: /docs/sendgrid/ui/sending-email/index-suppressions

[Template Engine]: /docs/sendgrid/ui/sending-email/create-and-edit-legacy-transactional-templates

[Tracking]: /docs/sendgrid/ui/analytics-and-reporting/email-activity-feed
