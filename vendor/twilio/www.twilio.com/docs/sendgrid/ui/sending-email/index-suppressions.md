# Suppressions

The decision to stop sending email messages to a specific recipient can come from two points in the email delivery chain. What one calls the decision depends upon who makes it.

* When a recipient chooses not to receive more email messages from a sender, they *[unsubscribe][]* from further email messages.
* When an email system stops sending email messages, on a sender's behalf, to a recipient, the system *suppresses* sending email messages. An email system might suppress email messages for reasons beyond a recipient unsubscribing.

> \[!CAUTION]
>
> Each email you attempt to send to a suppressed address consumes one credit from your account.

## Allow the recipient to unsubscribe

Give your recipients the option to unsubscribe.

Managing unsubscribes helps maximize email delivery. Without an unsubscribe option to stop getting your email messages, recipients have only one option: report your email as [spam][]. To maintain your [reputation][ers], give recipients an unsubscribe option.

Twilio SendGrid enables and manages unsubscribes in two ways: Advanced Suppression Management (ASM) and Subscription Tracking. ASM provides greater control over managing unsubscriptions. To contain the number and granularity of unsubscriptions, use this feature instead of Subscription Tracking.

### Advanced Suppression Management

Advanced Suppression Management (ASM) offers you and your recipients more choices. Your email message displays one or more links that allows recipients to unsubscribe from some email messages or all email messages.

* Every email template you create with the Code Editor includes the **Unsubscribe** and **Unsubscribe Preferences** links.
* You can add the unsubscribe links to your email in the Design Editor. To add an unsubscription block, add a [Unsubscribe module][unsub-mod] to your template.

Through ASM, your recipients can manage their subscriptions in three ways:

* Unsubscribe to certain email messages. Twilio SendGrid collects these selective [Group Unsubscribes][Group Unsubscribe] in an [Unsubscribe Group][Unsubscribe Groups].
* Unsubscribe to all email messages. Twilio SendGrid collects these total unsubscribes in a separate [Global Unsubscribe][] Unsubscribe Group.
* Select which email messages they want to keep through a [Recipient Subscription Preferences][rcpt-sub-pref] page. Twilio SendGrid hosts this page.

### Subscription tracking

> \[!WARNING]
>
> Subscription tracking offers recipients an all-or-nothing choice. Your email message displays one link that allows recipients to unsubscribe from all of your email messages. This provides no option to remain subscribed to some email messages, but not others. This method of unsubscription prevents recipients from getting any email messages, including non-promotional ones like password resets.

Subscription tracking provides the following capabilities:

* [Adds an unsubscribe link][add-track-link] to the footer of your email messages.
  * You can [customize the text][change-track-link] of the unsubscribe link.
  * You can [move the unsubscribe link elsewhere][move-track-link] in the email message using a substitution tag.
* [Adds the `list-unsubscribe` header][list-sub] to your email messages.

When you turn on [Subscription Tracking][sub-track], Twilio SendGrid adds an unsubscribe option to the footer of every email message. When a recipient clicks that unsubscribe link, Twilio adds them to your [Global Unsubscribe][] group. Twilio suppresses *any* future attempts to send email messages to that recipient.

You can add and remove email addresses from the Global Unsubscribe group using the UI or the API.

## Maintain your reputation

To maintain your reputation, Twilio SendGrid might suppress your email messages for one of the following reasons.

| Suppression method         | Rejected by            | Suppression reason                                         | Keep suppressing? |
| -------------------------- | ---------------------- | ---------------------------------------------------------- | ----------------- |
| **[Block][]**              | Recipient email server | Relates to the sender's IP address or the message content. | No                |
| **[Bounce][]**             | Recipient email server | Found issue with the recipient address.                    | Yes               |
| **[Invalid Email][]**      | Recipient email server | Can't find the recipient address.                          | Yes               |
| **[Spam Report][]**        | Recipient              | Marked message as spam.                                    | Yes               |
| **[Global Unsubscribe][]** | Recipient              | Opted not to receive anything from the sender.             | Yes               |
| **[Group Unsubscribe][]**  | Recipient              | Opted not to receive a specific group of email messages.   | Yes               |

## Bypass suppressions and unsubscribes

> \[!WARNING]
>
> Use these filters only when you must deliver a message all recipients including those who have unsubscribed from your emails.
> This might be in response to a local, regional, or national regulation.

A *bypass filter* lets you ignore unsubscribe groups and suppressions as you send an email message.

### Bypass all suppressions and unsubscribes

Both the [X-SMTPAPI header][] and the [v3 Mail Send API][send-v3-api] support bypassing all suppression lists.

How these APIs support list bypass differs. Each API requires that you add a key-value pair to their JSON payload. To bypass all suppression lists, add the following parameters and values according to the API standards:

| API              | Key                                              | Value  |
| ---------------- | ------------------------------------------------ | ------ |
| X-STMPAPI        | `filters.bypass_list_management.settings.enable` | `1`    |
| v3 Mail Send API | `bypass_list_management.enable`                  | `true` |

If you don't provide this key and value, X-SMTPAPI sets the value as `0` and the v3 Mail Send API sets the value to `false`.

#### View an example of using a bypass filter

```json {title="Example of a v3 Mail Send API highlighting bypass"}
//!focus(83:86)
{
    "personalizations": [
        {
            "to": [
                {
                    "email": "alex@example.com",
                    "name": "Alex"
                },
                {
                    "email": "bola@example.com",
                    "name": "Bola"
                }
            ],
            "cc": [
                {
                    "email": "charlie@example.com",
                    "name": "Charlie"
                }
            ],
            "bcc": [
                {
                    "email": "dana@example.com",
                    "name": "Dana"
                }
            ]
        },
        {
            "from": {
                "email": "sales@example.com",
                "name": "Example Sales Team"
            },
            "to": [
                {
                    "email": "ira@example.com",
                    "name": "Ira"
                }
            ],
            "bcc": [
                {
                    "email": "lee@example.com",
                    "name": "Lee"
                }
            ]
        }
    ],
    "from": {
        "email": "orders@example.com",
        "name": "Example Order Confirmation"
    },
    "reply_to": {
        "email": "customer_service@example.com",
        "name": "Example Customer Service Team"
    },
    "subject": "Your Example Order Confirmation",
    "content": [
        {
            "type": "text/html",
            "value": "<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>"
        }
    ],
    "attachments": [
        {
            "content": "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KCiAgICA8aGVhZD4KICAgICAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICAgICAgPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIj4KICAgICAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICAgICAgPHRpdGxlPkRvY3VtZW50PC90aXRsZT4KICAgIDwvaGVhZD4KCiAgICA8Ym9keT4KCiAgICA8L2JvZHk+Cgo8L2h0bWw+Cg==",
            "filename": "index.html",
            "type": "text/html",
            "disposition": "attachment"
        }
    ],
    "categories": [
        "cake",
        "pie",
        "baking"
    ],
    "send_at": 1617260400,
    "batch_id": "AsdFgHjklQweRTYuIopzXcVBNm0aSDfGHjklmZcVbNMqWert1znmOP2asDFjkl",
    "asm": {
        "group_id": 12345,
        "groups_to_display": [
            12345
        ]
    },
    "ip_pool_name": "transactional email",
    "mail_settings": {
        "bypass_list_management": {
            "enable": false
        },
        "footer": {
            "enable": false
        },
        "sandbox_mode": {
            "enable": false
        }
    },
    "tracking_settings": {
        "click_tracking": {
            "enable": true,
            "enable_text": false
        },
        "open_tracking": {
            "enable": true,
            "substitution_tag": "%open-track%"
        },
        "subscription_tracking": {
            "enable": false
        }
    }
}
```

### Bypass specific suppressions

In addition to `bypass_list_management`, the v3 Mail Send API provides three finer-grained bypass filters. To bypass a *single* list, use one of these filters. You can add multiple bypass filters except in combination with the `bypass_list_management` filter. You can't combine this list with other bypass lists.

To apply these bypass filters, add them to the `mail_settings` parameter with the attribute `enable`. When you set a filter to `true`, Twilio SendGrid disregards the unsubscribe or suppression status of the addresses in the list and delivers the message to the recipients.

Twilio SendGrid doesn't *require* any bypass filters in the payload. By default, Twilio disables all bypass parameters. If you don't need the filter, don't set it. To filter out a specific suppression, choose the parameter from the following table:

| To bypass   | Add API payload parameter                            |
| ----------- | ---------------------------------------------------- |
| all         | `mail_settings.bypass_list_management.enable`        |
| spam        | `mail_settings.bypass_spam_management.enable`        |
| bounce      | `mail_settings.bypass_bounce_management.enable`      |
| unsubscribe | `mail_settings.bypass_unsubscribe_management.enable` |

To understand how what each filter includes or excludes, see the following table:

| Bypass                     | all | `spam` | `bounce` | `unsubscribe` |
| -------------------------- | --- | ------ | -------- | ------------- |
| Ignore spam report list    | Yes | Yes    | No       | No            |
| Ignore bounce list         | Yes | No     | Yes      | Yes           |
| Ignore global unsubscribe  | Yes | No     | Yes      | Yes           |
| Ignore group unsubscribe   | Yes | No     | No       | No            |
| Can use with other filters | No  | Yes    | Yes      | Yes           |

To review examples, see the [v3 Mail Send API reference][send-v3-api].

## Additional resources

* [Unsubscribe Groups][]
* [Create and Manage Unsubscribe Groups][]
* \[Manage bounced messages]\[bounces-how]
* \[Manage blocked messages]\[blocks-how]

[Create and Manage Unsubscribe Groups]: /docs/sendgrid/ui/sending-email/create-and-manage-unsubscribe-groups

[sub-track]: /docs/sendgrid/ui/sending-email/subscription-tracking

[Unsubscribe Groups]: /docs/sendgrid/ui/sending-email/create-and-manage-unsubscribe-groups

[send-v3-api]: /docs/sendgrid/api-reference/mail-send/mail-send

[X-SMTPAPI header]: /docs/sendgrid/for-developers/sending-email/smtp-filters/#filter-bypass_list_management

[Block]: /docs/sendgrid/glossary/blocks

[Bounce]: /docs/sendgrid/glossary/bounces

[block-how]: /docs/sendgrid/ui/sending-email/blocks

[bounce-how]: /docs/sendgrid/ui/sending-email/bounces

[Global Unsubscribe]: /docs/sendgrid/ui/sending-email/global-unsubscribes

[Group Unsubscribe]: /docs/sendgrid/ui/sending-email/group-unsubscribes

[Invalid Email]: /docs/sendgrid/ui/sending-email/invalid-emails

[Spam Report]: /docs/sendgrid/glossary/spam-reports

[unsubscribe]: /docs/sendgrid/glossary/unsubscribes

[spam]: /docs/sendgrid/glossary/spam

[ers]: /docs/sendgrid/glossary/email-reputation-score

[add-track-link]: /docs/sendgrid/ui/sending-email/subscription-tracking#how-do-i-just-add-an-unsubscribe-link

[change-track-link]: /docs/sendgrid/ui/sending-email/subscription-tracking#how-do-i-change-what-the-link-says

[move-track-link]: /docs/sendgrid/ui/sending-email/subscription-tracking#i-dont-want-my-unsubscribe-links-at-the-bottom

[list-sub]: /docs/sendgrid/ui/sending-email/list-unsubscribe

[rcpt-sub-pref]: /docs/sendgrid/ui/sending-email/recipient-subscription-preferences

[unsub-mod]: /docs/sendgrid/ui/sending-email/design-editor#unsubscribe-module
