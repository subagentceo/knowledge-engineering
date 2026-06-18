# Warming Up an IP Address

When adding a [dedicated IP address][sg-dedicated-ips] to your account, gradually increase the volume of email messages sent through the [IP address][]. This process is called [IP warm up][ip-warm]. This gradual process establishes a reputation with Internet Service Providers (ISPs) as a legitimate email sender.

To establish a positive [sender reputation][], [warm up][ip-warm] your dedicated IP address. If you haven't sent email messages through your IP address in more than 30 days, warm it up again.

When an ISP observes email coming from an added or "cold" IP address, they begin evaluating the traffic coming from that IP address. Since ISPs treat email volume as a key factor in spam detection, begin sending a low to moderate volume. You can work your way up to larger volumes. This lets receiving email providers observe your sending habits and record how your recipients engage with your email messages.

A gradual warmup doesn't guarantee a perfect sending reputation. Follow sending [best practices][].

> \[!NOTE]
>
> Establishing a positive reputation as a sender takes less effort than repairing an existing reputation.

## Warming your IP address

To add an IP address into warm up, use the [automated IP warmup feature](#automated-ip-warmup).

If you have one or more existing available IP addresses, the added IP address email volume slowly increases over time. When the warming IP address reaches [hourly limit](#automated-ip-warmup), it stops sending email messages. Other IP addresses on the account can continue to send emails.

If you lack other available IP addresses, Twilio attempts a series of quick retries, then retries approximately every 15 minutes. Twilio retries email messages until they expire after 72 hours.

### Manual IP warmup

If you prefer a customizable approach, use manual IP warmup. This allows you to gradually increase your email volume over your dedicated IP address.

To learn how much mail to send during the warm up process, see the Twilio recommended [IP Warmup Schedule][warmup schedule].

### Automated IP warmup

> \[!NOTE]
>
> If you send transactional emails, don't focus on a strict IP warmup schedule. You can't control the rate at which transactional emails trigger.

Automatic IP warmup allows Twilio SendGrid to throttle the number of emails for you, avoiding you damaging your sender reputation. If you send marketing emails, follow some form of IP warmup. The slower you can warm up the better. This way, you can locate and fix any anomalies and issues that arise when you first begin sending, helping your deliverability long term.

When automatically warming up an IP address, Twilio SendGrid limits the amount of email sent through that IP address each hour. The IP address placed in automated warmup sends the email requests across all available IP addresses.

Available IP addresses can include other IP addresses in automated warmup with sending capacity.

When it reaches the hourly limit, the warming IP address stops sending messages. Other IP addresses on the account can continue sending email messages. If you lack other available IP addresses, Twilio retries sending the messages for 72 hours. To learn more, see [deferrals][].

#### View the Automated IP warmup hourly send schedule

| Warmup age (days) | Hourly email limit |
| ----------------- | ------------------ |
| 0                 | 20                 |
| 1                 | 28                 |
| 2                 | 39                 |
| 3                 | 55                 |
| 4                 | 77                 |
| 5                 | 108                |
| 6                 | 151                |
| 7                 | 211                |
| 8                 | 295                |
| 9                 | 413                |
| 10                | 579                |
| 11                | 810                |
| 12                | 1,000              |
| 13                | 1,587              |
| 14                | 2,222              |
| 15                | 3,111              |
| 16                | 4,356              |
| 17                | 6,098              |
| 18                | 8,583              |
| 19                | 11,953             |
| 20                | 16,734             |
| 21                | 23,427             |
| 22                | 32,798             |
| 23                | 45,917             |
| 24                | 64,284             |
| 25                | 89,998             |
| 26                | 125,997            |
| 27                | 176,395            |
| 28                | 246,953            |
| 29                | 345,735            |
| 30                | 484,029            |
| 31                | 677,640            |
| 32                | 948,696            |
| 33                | 1,328,175          |
| 34                | 1,859,444          |
| 35                | 2,603,222          |
| 36                | 3,644,511          |
| 37                | 5,102,316          |
| 38                | 7,143,242          |
| 39                | 10,000,539         |
| 40                | 14,000,754         |
| 41                | 19,601,056         |

Upon completion of day 41 in the warmup schedule, automated warmup removes these IP addresses.

#### Set up automated IP warmup in the Console

To set up automated IP warmup in the console, follow these steps:

1. Go to **Settings** > [**IP Addresses**][].
2. Click the action menu for the IP you want to warmup. This brings up the **Edit Your Dedicated IP Address** screen.
3. Select **Use Automated IP warmup**.
4. Save the **Edit Your Dedicated IP Address** screen.

#### Set up Automated IP warmup in the API

To put your IP address into warmup mode, you can also use the [Automated Warmup API][ip-warmup-api]. This API throttles traffic sent through your added IP according to the [warmup schedule][].

## Why don't other ESPs require IP warmup?

Some [email service providers (ESPs)][esp] don't offer dedicated IP addresses to their customers—they place all of their customers on shared IP groups by default. SendGrid Free and Essentials customers leverage our shared pools and therefore don't require a warm up strategy.

Having a dedicated IP gives you complete control of your reputation including impact from the reputations of other Twilio SendGrid users. To avoid possible deliverability challenges, Twilio SendGrid customers with dedicated IP addresses should warm up these IP addresse program.

## Related resources

* [Adding a dedicated IP](/docs/sendgrid/ui/account-and-settings/dedicated-ip-addresses/)
* [IP Access Management](/docs/sendgrid/ui/account-and-settings/ip-access-management/)
* [SendGrid billing information](/docs/sendgrid/ui/account-and-settings/billing/)

[ip-warmup-api]: /docs/sendgrid/api-reference/ip-warmup/start-warming-up-an-ip-address

[best practices]: https://www.twilio.com/en-us/blog/insights/10-tips-to-keep-email-out-of-the-spam-folder

[deferrals]: /docs/sendgrid/ui/analytics-and-reporting/email-activity#deferrals

[sender reputation]: /docs/sendgrid/glossary/email-reputation-score

[**IP Addresses**]: https://app.sendgrid.com/settings/ip_addresses

[ip-warm]: /docs/sendgrid/glossary/ip-warmup

[warmup schedule]: https://docs-resources.prod.twilio.com/documents/Generic_IP_Warmup_Schedule.pdf

[sg-dedicated-ips]: /docs/sendgrid/ui/account-and-settings/dedicated-ip-addresses

[IP address]: /docs/sendgrid/glossary/ip-address

[esp]: /docs/sendgrid/glossary/email-service-provider
