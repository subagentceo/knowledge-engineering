# Twilio Email

## Twilio Email

### Send transactional and marketing email at scale

Authenticate your domain, manage deliverability, and integrate with the Email API — all from one product.

[Get started with Twilio Email API](/docs/email/api/getting-started)

## Tutorial

```bash !sample
curl -X POST 'https://comms.twilio.com/v1/Emails' \
-H 'Content-Type: application/json' \
-d '{
    "from": {
        "address": "support@example.com",
        "name": "Support Team"
    },
    "to": [
        {
            "address": "john.doe@example.com",
            "name": "John Doe"
        }
    ],
    "content": {
        "subject": "Hello from Twilio",
        "html": "<p>Your message content.</p>",
        "text": "Your message content."
    }
}' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

1. Authenticate your domain and verify your sender identity.
2. Compose your email with recipients, subject, and content.
3. Send your request — Twilio processes it asynchronously and returns an operation ID to track delivery.

Tutorial code output: "Send your first email in minutes."

[Find more examples](/docs/email/api/getting-started)

## Email concepts

Understanding email security, reputation, and deliverability improves your chances of reaching inboxes. Start with email concepts before integrating.

## New to email deliverability?

[Read the guide](/docs/email/concepts)

Good security improves reputation, which improves deliverability. Learn how each concept builds on the last.

### Learn the Fundamentals

* [Email concepts overview][concepts]
* [Secure your email][security]
* [Manage your reputation][reputation]
* [Improve your deliverability][deliverability]

## Set up your account

To prepare to send email messages, set up your account with domain authentication.

Pick the docs that are right for you. These guides, Console walkthroughs, and API reference docs will get you from setup to integration.

* [API getting started](/docs/email/api/getting-started)

### Console Setup

* [Authenticate your domain using DNS][domains]
* [Check email delivery logs][logs]
* [Manage email suppressions][suppressions]
* [Configure bounce and spam notifications][settings]

### Email API

* [Getting started][getting-started]
* [API overview][overview]
* [Mail Send][mail-send]
* [Status codes and errors][errors]

### API Reference

* [Email resource][email-resource]
* [Email Operation resource][operation-resource]

## Related Products

Reach your customers across multiple channels with Twilio.

### Messaging

Send SMS, MMS, and WhatsApp messages programmatically.

[Product Docs](/docs/messaging)

### SendGrid Email

Full-featured email platform with templates, analytics, and SMTP relay.

[Product Docs](/docs/sendgrid)

### Voice

Build voice experiences with programmable voice calls.

[Product Docs](/docs/voice)

[concepts]: /docs/email/concepts

[security]: /docs/email/concepts/security/email-authentication

[reputation]: /docs/email/concepts/reputation/establish-maintain-reputation

[deliverability]: /docs/email/concepts/deliverability/deferrals

[domains]: /docs/email/security/domains

[logs]: /docs/email/logs

[suppressions]: /docs/email/suppressions

[settings]: /docs/email/settings

[getting-started]: /docs/email/api/getting-started

[overview]: /docs/email/api/overview

[mail-send]: /docs/email/api/mail-send

[errors]: /docs/email/api/errors

[email-resource]: /docs/email/api/reference/mail-send-resource

[operation-resource]: /docs/email/api/reference/email-operation-resource
