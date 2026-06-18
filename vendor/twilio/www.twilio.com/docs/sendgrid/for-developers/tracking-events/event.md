# Event Webhook Reference

> \[!WARNING]
>
> To secure the Event Webhook data, use the Signed Event Webhook, OAuth 2.0, or both.
>
> Twilio stores categories and unique arguments in a field that shouldn't include personally identifiable information (PII). Twilio might use these categories and arguments for counting or other operations as SendGrid runs its systems. You can't redact or remove these fields. Never place PII in this field. Twilio SendGrid doesn't treat this data as PII. Twilio employees could see these values. These values get stored long-term even if you leave the Twilio SendGrid platform.
>
> To learn more about Event Webhook security, see [Getting Started with the Event Webhook Security Features][].

## Events

When Twilio SendGrid and email service providers process email messages, these messages generate events that Twilio logs. Twilio tracks three types of events: delivery, engagement, and account.

* **Delivery events** that indicate the status of email delivery to the recipient.
* **Engagement events** that indicate how the recipient is interacting with the email.
* **Account change events** that indicate changes and impacts to your account.

## Delivery events

Delivery events cover messages that were
[bounced][bounce-event], [delivered][delivered-event], [deferred][deferred-event], [dropped][dropped-event], or [processed][processed-event].

### Expected properties for delivery events

The following table identifies the properties each delivery type returns:

| Property                  | Bounce | Delivered | Deferred | Dropped | Processed |
| ------------------------- | ------ | --------- | -------- | ------- | --------- |
| `asm_group_id`            | X      | X         | X        | X       | X         |
| `bounce_classification`   | X      |           |          |         |           |
| `attempt`                 |        |           | X        |         |           |
| `category`                | X      | X         | X        | X       | X         |
| `email`                   | X      | X         | X        | X       | X         |
| `event`                   | X      | X         | X        | X       | X         |
| `ip`                      |        | X         |          |         |           |
| `marketing_campaign_id`   | X      | X         | X        | X       | X         |
| `marketing_campaign_name` | X      | X         | X        | X       | X         |
| `pool`                    |        |           |          |         | X         |
| `reason`                  | X      |           | X        | X       |           |
| `response`                |        | X         |          |         |           |
| `sg_event_id`             | X      | X         | X        | X       | X         |
| `sg_message_id`           | X\*    | X         | X        | X       | X         |
| `smtp-id`                 | X      | X         | X        | X       | X         |
| `status`                  | X      |           |          |         |           |
| `timestamp`               | X      | X         | X        | X       | X         |
| `tls`                     | X      | X         |          |         |           |
| `unique_args`             | X      | X         | X        | X       | X         |

\* In the case of a delayed or [asynchronous bounce][async-bounces], Twilio doesn't return the message ID.

### Bounce and blocked events

Events can return two types of bounces: a [bounce][bounce-type], a *permanent* delivery denial, or a [block][blocked-type], a *temporary* delivery denial.

#### Bounce type of Bounce event

The receiving server doesn't accept mail sent to this recipient. Twilio refers to this Bounce event type as a hard bounce (`"type": "bounce"`). If a recipient unsubscribed from your emails, Twilio SendGrid drops the message.

```json {title="Example bounced event webhook response"}
// !focus(6,7,11,13)
[
   {
      "email": "alex@example.com",
      "timestamp": 1513299569,
      "smtp-id": "<14c5d75ce93.dfd.64b469@ismtpd-555>",
      "bounce_classification": "Invalid Address",
      "event": "bounce",
      "category": "cat facts",
      "sg_event_id": "6g4ZI7SA-xmRDv57GoPIPw==",
      "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0",
      "reason": "500 unknown recipient",
      "status": "5.0.0",
      "type": "bounce"
   }
]
```

#### Blocked type of Bounce event

The receiving server can't accept the message at this time. Twilio refers to this Bounce event type as a soft bounce (`"type": "blocked"`). The receiving server might accept the blocked message at a later time.

```json {title="Example webhook response for blocked events"}
[
   {
      "email": "alex@example.com",
      "timestamp": 1513299569,
      "smtp-id": "<14c5d75ce93.dfd.64b469@ismtpd-555>",
      "bounce_classification": "Invalid Address",
      "event": "bounce",
      "category": "cat facts",
      "sg_event_id": "6g4ZI7SA-xmRDv57GoPIPw==",
      "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0",
      "reason": "500 unknown recipient",
      "status": "5.0.0",
      "type": "blocked"
   }
]
```

#### Bounce classifications

The `bounce_classification` property accepts the following values:

* [Invalid Address][invalid-address]
* [Technical][technical]
* [Content][content]
* [Reputation][reputation]
* [Frequency/Volume][frequencyvolume-too-high]
* [Mailbox Unavailable][mailbox-unavailable]
* [Unclassified][unclassified]

To learn the details about these values, see [Bounce and Block Classifications][].

### Delivered events

Twilio SendGrid succeeded in delivering the message to the receiving server.

```json {title="Example delivered event webhook response"}
// !focus(6)
[
   {
      "email": "alex@example.com",
      "timestamp": 1513299569,
      "smtp-id": "<14c5d75ce93.dfd.64b469@ismtpd-555>",
      "event": "delivered",
      "category": "cat facts",
      "sg_event_id": "rWVYmVk90MjZJ9iohOBa3w==",
      "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0",
      "response": "250 OK"
   }
]
```

### Deferred events

The receiving server rejected the message temporarily.

```json {title="Example deferred event webhook response"}
// !focus(8,12)
[
   {
      "email": "alex@example.com",
      "domain": "example.com",
      "from": "test@example.com",
      "timestamp": 1513299569,
      "smtp-id": "<14c5d75ce93.dfd.64b469@ismtpd-555>",
      "event": "deferred",
      "category": "cat facts",
      "sg_event_id": "t7LEShmowp86DTdUW8M-GQ==",
      "sg_message_id": " 14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0",
      "response": "400 try again later",
      "attempt": "5"
   }
]
```

### Dropped events

Twilio SendGrid dropped the message for one of the following reasons:

* Invalid SMTPAPI header
* Spam Content (if you turned on the Spam Checker app)
* Unsubscribed Address
* Bounced Address
* Spam Reporting Address
* [Invalid Address][invalid-address]
* Recipient List over Package Quota

```json {title="Example dropped event webhook response"}
// !focus(6,10)
[
  {
      "email": "alex@example.com",
      "timestamp": 1513299569,
      "smtp-id": "<14c5d75ce93.dfd.64b469@ismtpd-555>",
      "event": "dropped",
      "category": "cat facts",
      "sg_event_id": "zmzJhfJgAfUSOW80yEbPyw==",
      "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0",
      "reason": "Bounced Address",
      "status": "5.0.0"
  }
]
```

### Processed events

Twilio SendGrid accepted and can deliver the message.

```json {title="Example processed event webhook response"}
// !focus(10)
[
  {
      "email": "alex@example.com",
      "timestamp": 1513299569,
      "pool": {
            "name": "new_MY_test",
            "id": 210
      },
      "smtp-id": "<14c5d75ce93.dfd.64b469@ismtpd-555>",
      "event": "processed",
      "category": "cat facts",
      "sg_event_id": "rbtnWrG1DVDGGGFHFyun0A==",
      "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.000000000000000000000"
  }
]
```

## Engagement events

Engagement events include
[open][open-event], [click][click-event], [spam report][spam-report-event], [unsubscribe][unsubscribe-event],
[group unsubscribe][group-unsubscribe-event], and [group resubscribe][group-resubscribe-event].

### Expected properties for engagement events

The following table identifies the properties each engagement event type returns:

| Property                  | Opened | Clicked | Spam report | Unsubscribe | Group unsubscribe | Group resubscribe |
| ------------------------- | ------ | ------- | ----------- | ----------- | ----------------- | ----------------- |
| `asm_group_id`            | X      | X       |             |             | X                 | X                 |
| `category`                | X      | X       | X           | X           |                   |                   |
| `email`                   | X      | X       | X           | X           | X                 | X                 |
| `event`                   | X      | X       | X           | X           | X                 | X                 |
| `ip`                      | X      | X       |             |             | X                 | X                 |
| `marketing_campaign_id`   | X      | X       | X           | X           | X                 | X                 |
| `marketing_campaign_name` | X      | X       | X           | X           | X                 | X                 |
| `sg_event_id`             | X      | X       | X           | X           | X                 | X                 |
| `sg_machine_open`         | X      |         |             |             |                   |                   |
| `sg_message_id`           | X      | X       | X           | X           | X                 | X                 |
| `timestamp`               | X      | X       | X           | X           | X                 | X                 |
| `url`                     |        | X       |             |             |                   |                   |
| `url_offset`              |        | X       |             |             |                   |                   |
| `useragent`               | X      | X       |             |             | X                 | X                 |
| `unique_args`             | X      | X       | X           | X           | X                 | X                 |

### Click events

Recipient clicked on a link within the message. To track clicks, turn on [Click Tracking][].

```json {title="Example webhook response for click events"}
// !focus(7,8,10,16)
[
  {
    "sg_event_id": "sendgrid_internal_event_id",
    "sg_message_id": "sendgrid_internal_message_id",
    "ip": "255.255.255.255",
    "useragent": "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D257 Safari/9537.53",
    "event": "click",
    "email": "email@example.com",
    "timestamp": 1249948800,
    "url": "http://example.com/blog/news.html",
    "url_offset": {
      "index": 0,
      "type": "html"
    },
    "unique_arg_key": "unique_arg_value",
    "category": ["category1", "category2"],
    "newsletter": {
      "newsletter_user_list_id": "10557865",
      "newsletter_id": "1943530",
      "newsletter_send_id": "2308608"
    },
    "asm_group_id": 1
  }
]
```

### Open events

Recipient has opened the HTML message. To track opens, turn on [Open Tracking][].

```json {title="Example webhook response for open events"}
// !focus(5)
[
   {
      "email": "alex@example.com",
      "timestamp": 1513299569,
      "event": "open",
      "sg_machine_open": false,
      "category": "cat facts",
      "sg_event_id": "FOTFFO0ecsBE-zxFXfs6WA==",
      "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0",
      "useragent": "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
      "ip": "255.255.255.255"
   }
]
```

### Spam report events

Recipient marked message as spam.

```json {title="Example webhook response for spam report events"}
// !focus(6)
[
   {
      "email": "alex@example.com",
      "timestamp": 1513299569,
      "smtp-id": "<14c5d75ce93.dfd.64b469@ismtpd-555>",
      "event": "spamreport",
      "sg_event_id": "37nvH5QBz858KGVYCM4uOA==",
      "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0"
   }
]
```

### Unsubscribe events

Recipient clicked on the **Opt Out of All Emails** link. To track subscriptions, turn on [Subscription Tracking][].

```json {title="Example webhook response for unsubscribe events"}
// !focus(5)
[
   {
      "email": "alex@example.com",
      "timestamp": 1513299569,
      "event": "unsubscribe",
      "category": "cat facts",
      "sg_event_id": "zz_BjPgU_5pS-J8vlfB1sg==",
      "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0"
   }
]
```

### Group resubscribe events

Recipient resubscribed to a specific group by updating their preferences. To track subscriptions, turn on [Subscription Tracking][].

```json {title="Example webhook response for group resubscribe events"}
// !focus(6)
[
   {
      "email": "alex@example.com",
      "timestamp": 1513299569,
      "smtp-id": "<14c5d75ce93.dfd.64b469@ismtpd-555>",
      "event": "group_resubscribe",
      "category": "cat facts",
      "sg_event_id": "w_u0vJhLT-OFfprar5N93g==",
      "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0",
      "useragent": "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
      "ip": "255.255.255.255",
      "url": "http://www.example.com/",
      "asm_group_id": 10
   }
]
```

### Group unsubscribe events

Recipient unsubscribed from a specific group. The recipient clicked an unsubscribe link or updated their preferences. To track subscriptions, turn on [Subscription Tracking][].

```json {title="Example webhook response for group unsubscribe events"}
// !focus(6)
[
   {
      "email": "alex@example.com",
      "timestamp": 1513299569,
      "smtp-id": "<14c5d75ce93.dfd.64b469@ismtpd-555>",
      "event": "group_unsubscribe",
      "category": "cat facts",
      "sg_event_id": "ahSCB7xYcXFb-hEaawsPRw==",
      "sg_message_id": "14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0",
      "useragent": "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)",
      "ip": "255.255.255.255",
      "url": "http://www.example.com/",
      "asm_group_id": 10
   }
]
```

## Account status change events

Your account status changed because of issues related to compliance with the [Twilio SendGrid terms of service][tos]. This can happen when Twilio SendGrid identifies abnormal activity such as phishing, elevated spam rates, or other bad behavior.

### Expected properties for account status change events

The following table identifies the properties each account status change event returns:

| Property      | Account status change |
| ------------- | --------------------- |
| `event`       | X                     |
| `sg_event_id` | X                     |
| `timestamp`   | X                     |
| `type`        | X                     |

```json {title="Example webhook response for account status change events"}
// !focus(3)
[
   {
      "event":"account_status_change", 
      "sg_event_id":"MjEzNTg5OTcyOC10ZXJtaW5hdGUtMTcwNzg1MTUzMQ",
      "timestamp":1709142428,
      "type":"compliance_suspend"
   }
]
```

To learn more about account statuses, see [Account Under Review][account-under-review].

## Property descriptions

| Property                | Type         | Description                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asm_group_id`          | Integer      | Unique ID attached to the unsubscribe group.                                                                                                                                                                                                                                                                                                                                                                                              |
| `attempt`               | Integer      | Number of times Twilio SendGrid attempted to deliver this message.                                                                                                                                                                                                                                                                                                                                                                        |
| `bounce_classification` | String       | Grouping of Simple Mail Transfer Protocol (SMTP) failure messages into classifications.<br />Expects: [Invalid Address][invalid-address], [Technical][technical], [Content][content], [Reputation][reputation], [Frequency/Volume][frequencyvolume-too-high], [Mailbox Unavailable][mailbox-unavailable], or [Unclassified][unclassified].                                                                                                |
| `category`              | String       | Custom tags set to organize your emails. If you send single categories as an array, the webhook returns them as an array. If you send single categories as a string, the webhook returns them as a string.                                                                                                                                                                                                                                |
| `email`                 | String       | Email address to which Twilio SendGrid sent the message.                                                                                                                                                                                                                                                                                                                                                                                  |
| `event`                 | Enum(String) | Type of occurrence that triggered this event.<br />Expects: [`processed`][processed-event], [`dropped`][dropped-event], [`delivered`][delivered-event], [`deferred`][deferred-event], [`bounce`][bounce-event], [`open`][open-event], [`click`][click-event], [`spam report`][spam-report-event], [`unsubscribe`][unsubscribe-event], [`group_unsubscribe`][group-unsubscribe-event], and [`group_resubscribe`][group-resubscribe-event]. |
| `ip`                    | String       | IP address used to send the email. For open and click events, the IP address of the recipient who engaged with the email. Certain events don't return the IP address in the response.                                                                                                                                                                                                                                                     |
| `reason`                | String       | Error response that the receiving server returned. The response describes what occurrence triggered this event.                                                                                                                                                                                                                                                                                                                           |
| `response`              | String       | Full text of the HTTP response error returned from the receiving server.                                                                                                                                                                                                                                                                                                                                                                  |
| `status`                | String       | Three digits, formatted as string `X.Y.Z`, that corresponds to HTTP status code `XYZ`.                                                                                                                                                                                                                                                                                                                                                    |
| `sg_event_id`           | String       | Unique ID that Twilio attached to this event. These URL-safe IDs can be no more than 100 characters long. Use this ID for deduplication purposes.                                                                                                                                                                                                                                                                                         |
| `sg_machine_open`       | Boolean      | Flag that indicates whether or not Apple Mail Privacy Protection (MPP) generated an open event.                                                                                                                                                                                                                                                                                                                                           |
| `sg_message_id`         | String       | Unique ID that Twilio attached to this message.                                                                                                                                                                                                                                                                                                                                                                                           |
| `smtp-id`               | String       | Unique ID that the originating system attached to the message.                                                                                                                                                                                                                                                                                                                                                                            |
| `timestamp`             | String       | Date and time when the event occurred, expressed as a [UNIX timestamp][].                                                                                                                                                                                                                                                                                                                                                                 |
| `tls`                   | Boolean      | Flag that indicates whether the message was sent with TLS encryption.                                                                                                                                                                                                                                                                                                                                                                     |
| `type`                  | String       | Defines the kind of bounce and account status change events.                                                                                                                                                                                                                                                                                                                                                                              |
| `url`                   | String       | URL where the event originates. For click events, this is the URL clicked on by the recipient.                                                                                                                                                                                                                                                                                                                                            |
| `url_offset`            | Integer      | Zero-based index for the location of a link in the message's HTML code. Each duplicate URL has a unique index number.                                                                                                                                                                                                                                                                                                                     |
| `useragent`             | String       | User agent or program that generated the event.                                                                                                                                                                                                                                                                                                                                                                                           |
| `unique_args`           | Object       | [SMTP API][smtp-api] or [v2 Mail Send][mail-send-v2] use unique arguments.                                                                                                                                                                                                                                                                                                                                                                |
| `custom_args`           | Object       | [v3 Mail Send][mail-send-v3] uses custom arguments.                                                                                                                                                                                                                                                                                                                                                                                       |

### `asm_group_id` property

ID of the unsubscribe group that includes the recipient's email address. When you create an unsubscribe group, Advanced Subscription Management (ASM) Group IDs correspond to the ID returned.

### `attempt` property

Number of times Twilio SendGrid attempted to deliver this message.

### `bounce_classification` property

Grouping of SMTP failure messages into classifications. Expected values include [Invalid Address][invalid-address], [Technical][technical], [Content][content], [Reputation][reputation], [Frequency/Volume][frequencyvolume-too-high], [Mailbox Unavailable][mailbox-unavailable], or [Unclassified][unclassified].

To learn more about these classifications, see [Bounce and Block Classifications][].

### `category` property

To organize your emails, set these custom tags. If you send single [categories][category] as an array, the webhook returns them as an array. If you send single categories as a string, the webhook returns them as a string.

```json {title="Category as string"}
// !focus(5,11)
[
  {
    "email": "alex@example.com",
    "timestamp": 1337966815,
    "category": "newuser",
    "event": "open"
  },
  {
    "email": "bobby@example.com",
    "timestamp": 1337966815,
    "category": "olduser",
    "event": "open"
  }
]
```

```json {title="Category as array"}
// !focus(5)
[
  {
    "email": "alex@example.com",
    "timestamp": 1337966815,
    "category": ["newuser", "transactional"],
    "event": "open"
  },
  {
    "email": "bobby@example.com",
    "timestamp": 1337966815,
    "category": "olduser",
    "event": "open"
  }
]
```

### `email` property

Email address to which Twilio SendGrid sent the message.

### `event` property

Type of occurrence that triggered this event.
This property expects: [`bounce`][bounce-event], [`click`][click-event], [`deferred`][deferred-event], [`delivered`][delivered-event], [`dropped`][dropped-event], [`group_resubscribe`][group-resubscribe-event], [`group_unsubscribe`][group-unsubscribe-event], [`open`][open-event], [`processed`][processed-event], [`spam report`][spam-report-event], and [`unsubscribe`][unsubscribe-event]

### `ip` property

IP address used to send the email.

* The [`open`][open-event] and [`click`][open-event] events return the IP address of the recipient who engaged with the email.
* The [`bounce`][bounce-event] and [`deferral`][deferred-event] events don't return the IP address.
  * During an internal deferral, Twilio takes no action. Without an action, Twilio logs no IP. When Twilio SendGrid determines an issue at a specific MX record, an internal deferral occurs. Before trying to deliver more mail, the service awaits the issue resolution.
  * When Twilio accepts a message for delivery but rejects it after the SMTP conversation ends, a delayed bounce occurs. Without the SMTP conversation, another conversation starts without much of the previous context. Therefore, delayed bounces lack an IP address and other data.

### `pool` property

If Twilio sends messages from a specified IP Pool, the webhook returns the IP Pool for a processed event.

```json
// !focus(6:9,12)
[
  {
    "email": "alex@example.com",
    "smtp-id": "<14c583da911.2c36.1c804d@ismtpd-073>",
    "timestamp": 1427409578,
    "pool": {
      "name": "new_MY_test",
      "id": 210
    },
    "sg_event_id": "RHFZB1IrTD2Y9Q7bUdZxUw",
    "sg_message_id": "14c583da911.2c36.1c804d.filter-406.22375.55148AA99.0",
    "event": "processed"
  }
]
```

### `reason` property

Error response that the receiving server returned. The response describes what occurrence triggered this event.

### `response` property

Full text of the HTTP response error returned from the receiving server.

### `sg_event_id` property

Unique ID that Twilio attached to this event. These URL-safe IDs can exceed 100 characters. Use this ID for deduplication purposes.

### `sg_machine_open` property

Boolean flag that indicates whether or not Apple Mail Privacy Protection (MPP) generated an open event.

* When set to `true`, indicates a recipient with MPP turned on triggered an open event.
* When set to `false`, a conventional open triggered an open event. Twilio added this field as a response to [Apple Mail Privacy Protection][]-anonymization of some open event tracking.

### `sg_message_id` property

Unique ID that Twilio attached to this message. The first half of this ID comes from the [`smtp-id`][smtp-id-property]. The events include the message ID except in delayed or [asynchronous bounces][async-bounces].

### `smtp-id` property

Unique ID that the originating system attached to the message.

### `status` property

Three digits, formatted as string `X.Y.Z`, that corresponds to HTTP status code `XYZ`.

### `timestamp` property

Date and time when the event occurred, expressed as a [UNIX timestamp][].

### `tls` property

Flag that indicates whether the message was sent with [TLS encryption][tls].

### `type` property

Defines the kind of [bounce][bounce-event] and [account status change][account-status-change-event] event.

#### In a bounce event

Indicates the kind of the bounce event, either a hard bounce (`"type": "bounce"`) or block (`"type": "blocked"`).

#### In an account status change event

Kind of event that triggered a status change for a user for compliance reasons. When a user account changes to a particular status type, the actions that get triggered display in the following table.

| Twilio SendGrid action based on `type`        | `compliance_suspend` | `compliance_deactivate` | `compliance_ban` | `reactivate` |
| --------------------------------------------- | -------------------- | ----------------------- | ---------------- | ------------ |
| Blocks delivery of user messages              | X                    | X                       | X                |              |
| Queues messages, but bounces at delivery time | X                    |                         |                  |              |
| Rejects mail queues                           |                      | X                       | X                |              |
| Deletes queued messages                       |                      | X                       | X                |              |
| Bans user after 48 hours                      |                      | X                       |                  |              |
| Removes access to the Twilio SendGrid console |                      |                         | X                |              |
| Cancels billing                               |                      |                         | X                |              |
| Removes assigned IP addresses                 |                      |                         | X                |              |
| Restores user account to active status        |                      |                         |                  | X            |

### `url` property

URL where the event originates. For [click][click-event] events, the recipient clicked this URL.

### `url_offset` property

Zero-index integer that identifies the order in which a URL occurs in the message's HTML code. The first link has an index value of `0`. To help identify a link when reviewing metrics like clicks, Twilio provides the `url_offset`. This allows you to identify each instance of one link. The one closer to the top have a lower `url_offset` value. Twilio assigns the index based on the link location in the HTML and not based on the link URL.

> \[!NOTE]
>
> Consider when the links in your email occur in the following order: `example.com`, `example.net`, `example.com`, `example.org`, `example.com`. Each link has an index relative to the links appearing before and after it without regard to the link URL. This sets the index values for `example.com` to `0`, `2`, and `4`. The index value for `example.net` gets set to `1` and the index value for `example.org` gets set to `3`.
>
> | Link URL      | Index value |
> | ------------- | ----------- |
> | `example.com` | 0           |
> | `example.net` | 1           |
> | `example.com` | 2           |
> | `example.org` | 3           |
> | `example.com` | 4           |

### `useragent` property

User agent or program that generated the event. The typical agent is a web browser.

**For example**:

* **Chrome on macOS**: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36`
* **Safari on macOS**: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0.1 Safari/605.1.15`

[Apple Mail Privacy Protection]: https://sendgrid.com/blog/apple-mail-privacy-protection

## Unique argument and custom argument properties

The events that Twilio SendGrid generates can include [unique arguments][] or [custom arguments][]. Unique arguments and custom arguments serve the same function.

* The [SMTP API][smtp-api] or [v2 Mail Send][mail-send-v2] resource uses unique arguments (`unique_args`).
* The [v3 Mail Send][mail-send-v3] resource uses custom arguments (`custom_args`).

### Unique arguments

To define and receive unique arguments when sending email with the [SMTP API][smtp-api] or the [v2 Mail Send][mail-send-v2] endpoint, use the `unique_args` parameter in the `X-SMTPAPI` header.

**For example**: To receive custom parameters such as the `userid` and the email `template`, submit them with the `X-SMTPAPI` header.

> \[!NOTE]
>
> If you include the following unique arguments in your `X-SMTPAPI` header for an email sent using the [v2 Mail Send][mail-send-v2] endpoint:
>
> ```json {title="Example of unique arguments in the v2 Mail Send API call"}
> // !focus(2:5)
> {
>   "unique_args": {
>     "userid": "1123",
>     "template": "welcome"
>   }
> }
> ```
>
> You receive the same unique argument included with the data posted to your Event Webhook.
>
> ```json {title="Example of unique arguments returned in Webhook"}
> // !focus(4,6)
> [
>   {
>     "sg_message_id": "sendgrid_internal_message_id",
>     "email": "alex@example.com",
>     "timestamp": 1337966815,
>     "event": "click",
>     "url": "https://example.com",
>     "userid": "1123",
>     "template": "welcome"
>   }
> ]
> ```

> \[!WARNING]
>
> Though you can create unique arguments with the same words as reserved keys, Twilio SendGrid uses the reserved key value and not your unique argument value.
>
> ```json {title="Reserved keys in unique arguments"}
> // !focus(3:9)
> // for this example, assume we're sending to alex@example.com
> {
>   "unique_args": {
>     "customerAccountNumber": "55555",
>     "activationAttempt": "1",
>     "New Argument 1": "New Value 1",
>     "email": "alex@example.com",
>     "event": "SendEmail"
>   }
> }
> ```
>
> ```json {title="Events webhook call with unique arguments"}
> // !focus(3,8)
> [
>   {
>     "event": "Processed",
>     "timestamp": "123456789",
>     "customerAccountNumber": "55555",
>     "activationAttempt": "1",
>     "New Argument 1": "New Value 1",
>     "email": "alex@example.com"
>   }
> ]
> ```
>
> This overwrites the unique arguments, `event` and `email`, because they're reserved keys for Twilio SendGrid values.

### Custom arguments

To define and receive custom arguments when sending email with the [v3 Mail Send][mail-send-v3], use the `custom_args` parameter. These values get added to your Event Webhook response.

```json {title="Example payload for the v3 Mail Send"}
// !focus(11)
{
  "personalizations": [
    {
      "to": [
        {
          "email": "alex@example.com"
        }
      ],
      "subject": "Hello, World!",
      "custom_args": {
        "userid": "1123"
      }
    }
  ],
  "from": {
    "email": "from_address@example.com"
  },
  "content": [
    {
      "type": "text/plain",
      "value": "Hello, World!"
    }
  ]
}
```

```json {title="Event Webhook response"}
// !focus(3)
[
  {
    "userid": "1123"
  }
]
```

#### Marketing Campaign parameters to the Event Webhook

For emails sent through Marketing Campaigns, add Marketing Campaigns specific parameters to the Event Webhook.

#### Single Send custom parameters

Single Send can include `singlesend_id` and `singlesend_name`. These parameters accept any string value you want to identify this message.

```json {title="Example of Marketing Campaigns single send event"}
// !focus(15:16)
[
  {
    "category": [],
    "email": "alex@example.com",
    "event": "open",
    "ip": "127.0.0.1",
    "mc_stats": "singlesend",
    "phase_id": "send",
    "send_at": "1591726752372",
    "sg_content_type": "html",
    "sg_event_id": "sendgrid_internal_event_id",
    "sg_message_id": "sendgrid_internal_message_id",
    "sg_template_id": "sendgrid_template_id",
    "sg_template_name": "sendgrid_template_name",
    "singlesend_id": "sendgrid_singlesend_id",
    "singlesend_name": "Example Single Send",
    "template_hash": "sendgrid_template_hash",
    "template_id": "sendgrid_template_id",
    "template_version_id": "sendgrid_template_version_id",
    "timestamp": 1591726752372,
    "useragent": "Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)"
  }
]
```

#### Standard Marketing Campaign send custom properties

A Marketing Campaign send can include `marketing_campaign_id` and `marketing_campaign_name`. These parameters accept any string value you want to identify this campaign.

```json {title="Example event from a standard (non-A/B test) campaign send"}
// !focus(5:6)
{
  "category": [],
  "email": "alex@example.com",
  "event": "processed",
  "marketing_campaign_id": 12345,
  "marketing_campaign_name": "campaign name",
  "post_type": "event",
  "sg_event_id": "sendgrid_internal_event_id",
  "sg_message_id": "sendgrid_internal_message_id",
  "sg_user_id": 12345,
  "smtp-id": "",
  "timestamp": 1442349428
}
```

#### A/B test custom property

If you use an A/B test, you can use the `marketing_campaign_version` parameter. Its value returns a capital Latin character, starting with A, B, C, and so on.

```json {title="Example event from an A/B Test"}
{
  "category": [],
  "email": "tadpole_0010@stbase-018.sjc1.sendgrid.net",
  "event": "processed",
  "marketing_campaign_id": 23314,
  "marketing_campaign_name": "unique args ab",
  "marketing_campaign_version": "B",
  "marketing_campaign_split_id": 13471,
  "post_type": "event",
  "sg_event_id": "qNOzbkTuTNCdxa1eXEpnXg",
  "sg_message_id": "5lFl7Fr1Rjme_EyzNNB_5A.stfilter-015.5185.55F883172.0",
  "sg_user_id": 939115,
  "smtp-id": "<5lFl7Fr1Rjme_EyzNNB_5A@stismtpd-006.sjc1.sendgrid.net>",
  "timestamp": 1442349848
}
```

```json {title="Example event response from the winning phase of an A/B Test"}
{
  "category": [],
  "email": "tadpole_0001@stbase-018.sjc1.sendgrid.net",
  "event": "delivered",
  "marketing_campaign_id": 23314,
  "marketing_campaign_name": "unique args ab",
  "post_type": "event",
  "response": "250 Ok",
  "sg_event_id": "X2M1IUfMRhuAhWM0CbmFqQ",
  "sg_message_id": "fPJrJPIRTxC_obpgfTy74w.stfilter-015.5185.55F883564.0",
  "sg_user_id": 12345,
  "smtp-id": "",
  "timestamp": 1442349911
}
```

#### Legacy Marketing email unsubscribes

For emails sent through the Twilio Legacy Marketing Email tool, unsubscribe webhook resembles the following example:

```json {title="Example of Legacy Marketing unsubscribe"}
[
  {
    "email": "nick@sendgrid.com",
    "timestamp": 1380822437,
    "newsletter": {
      "newsletter_user_list_id": "10557865",
      "newsletter_id": "1943530",
      "newsletter_send_id": "2308608"
    },
    "category": ["Tests", "Newsletter"],
    "event": "unsubscribe"
  }
]
```

## Additional resources

* [Getting started with the Event Webhook][]
* [Troubleshooting the event webhook][]
* [An Event Webhook case study][]
* [Webhook web libraries][]
* [Analyze, Visualize, and Store SendGrid Event Data with Keen][]
* [Email Event Data with Keen][]

[account-status-change-event]: #account-status-change-event

[account-under-review]: /docs/sendgrid/ui/account-and-settings/account-under-review

[An Event Webhook case study]: https://sendgrid.com/blog/leveraging-sendgrids-event-api

[Analyze, Visualize, and Store SendGrid Event Data with Keen]: /docs/sendgrid/for-developers/tracking-events/tracking-data-with-keen-io

[async-bounces]: /docs/sendgrid/ui/sending-email/bounces#asynchronous-bounces

[Bounce and Block Classifications]: /docs/sendgrid/ui/analytics-and-reporting/bounce-and-block-classifications

[bounce-event]: #bounce-and-blocked-events

[bounce-type]: #bounce-type-of-bounce-event

[blocked-type]: #blocked-type-of-bounce-event

[category]: /docs/sendgrid/glossary/categories

[click-event]: #click-events

[Click Tracking]: /docs/sendgrid/ui/account-and-settings/tracking#click-tracking

[content]: /docs/sendgrid/ui/analytics-and-reporting/bounce-and-block-classifications#content

[custom arguments]: #custom-arguments

[deferred-event]: #deferred-events

[delivered-event]: #delivered-events

[dropped-event]: #dropped-events

[Email Event Data with Keen]: /docs/sendgrid/for-developers/tracking-events/tracking-data-with-keen-io

[frequencyvolume-too-high]: /docs/sendgrid/ui/analytics-and-reporting/bounce-and-block-classifications#frequencyvolume-too-high

[Getting Started with the Event Webhook Security Features]: /docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook-security-features

[Getting started with the Event Webhook]: /docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook/

[group-resubscribe-event]: #group-resubscribe-events

[group-unsubscribe-event]: #group-unsubscribe-events

[invalid-address]: /docs/sendgrid/ui/analytics-and-reporting/bounce-and-block-classifications#invalid-address

[mail-send-v2]: /docs/sendgrid/v2-api/mail

[mail-send-v3]: /docs/sendgrid/api-reference/mail-send/mail-send

[mailbox-unavailable]: /docs/sendgrid/ui/analytics-and-reporting/bounce-and-block-classifications#mailbox-unavailable

[open-event]: #open-events

[Open Tracking]: /docs/sendgrid/ui/account-and-settings/tracking#open-tracking

[processed-event]: #processed-events

[reputation]: /docs/sendgrid/ui/analytics-and-reporting/bounce-and-block-classifications#reputation

[smtp-api]: /docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header

[smtp-id-property]: #smtp-id-property

[spam-report-event]: #spam-report-events

[Subscription Tracking]: /docs/sendgrid/ui/account-and-settings/tracking#subscription-tracking

[technical]: /docs/sendgrid/ui/analytics-and-reporting/bounce-and-block-classifications#technical

[tls]: /docs/sendgrid/glossary/tls

[tos]: https://twilio.com/legal/tos

[Troubleshooting the event webhook]: /docs/sendgrid/for-developers/tracking-events/twilio-sendgrid-event-webhook-overview

[unclassified]: /docs/sendgrid/ui/analytics-and-reporting/bounce-and-block-classifications#unclassified

[unique arguments]: #unique-arguments

[UNIX timestamp]: https://en.wikipedia.org/wiki/Unix_time

[unsubscribe-event]: #unsubscribe-events

[Webhook web libraries]: /docs/sendgrid/for-developers/sending-email/libraries
