# API Key Permissions

> \[!WARNING]
>
> Twilio SendGrid API keys are 69 characters long. Twilio can't make exceptions for third-party infrastructure unable to support a key of 69 characters.

API Keys can be used to authenticate the use of [SendGrid's v3 API](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/authorization). API Keys may be assigned certain permissions, or scopes, that limit which API endpoints they are able to access.

The following is a complete list of all possible permissions that you may assign to an API Key.

## Admin API Key Permissions

Below is a complete list of every API Key permission that should be given to an admin level API Key.

```json
"scopes": [
  "access_settings.activity.read",
  "access_settings.whitelist.create",
  "access_settings.whitelist.delete",
  "access_settings.whitelist.read",
  "access_settings.whitelist.update",
  "alerts.create",
  "alerts.delete",
  "alerts.read",
  "alerts.update",
  "api_keys.create",
  "api_keys.delete",
  "api_keys.read",
  "api_keys.update",
  "asm.groups.create",
  "asm.groups.delete",
  "asm.groups.read",
  "asm.groups.update",
  "billing.create",
  "billing.delete",
  "billing.read",
  "billing.update",
  "browsers.stats.read",
  "categories.create",
  "categories.delete",
  "categories.read",
  "categories.stats.read",
  "categories.stats.sums.read",
  "categories.update",
  "clients.desktop.stats.read",
  "clients.phone.stats.read",
  "clients.stats.read",
  "clients.tablet.stats.read",
  "clients.webmail.stats.read",
  "credentials.create",
  "credentials.delete",
  "credentials.read",
  "credentials.update",
  "devices.stats.read",
  "email_activity.read",
  "geo.stats.read",
  "ips.assigned.read",
  "ips.pools.create",
  "ips.pools.delete",
  "ips.pools.ips.create",
  "ips.pools.ips.delete",
  "ips.pools.ips.read",
  "ips.pools.ips.update",
  "ips.pools.read",
  "ips.pools.update",
  "ips.read",
  "ips.warmup.create",
  "ips.warmup.delete",
  "ips.warmup.read",
  "ips.warmup.update",
  "mail_settings.address_whitelist.read",
  "mail_settings.address_whitelist.update",
  "mail_settings.bcc.read",
  "mail_settings.bcc.update",
  "mail_settings.bounce_purge.read",
  "mail_settings.bounce_purge.update",
  "mail_settings.footer.read",
  "mail_settings.footer.update",
  "mail_settings.forward_bounce.read",
  "mail_settings.forward_bounce.update",
  "mail_settings.forward_spam.read",
  "mail_settings.forward_spam.update",
  "mail_settings.plain_content.read",
  "mail_settings.plain_content.update",
  "mail_settings.read",
  "mail_settings.spam_check.read",
  "mail_settings.spam_check.update",
  "mail_settings.template.read",
  "mail_settings.template.update",
  "mail.batch.create",
  "mail.batch.delete",
  "mail.batch.read",
  "mail.batch.update",
  "mail.send",
  "mailbox_providers.stats.read",
  "marketing_campaigns.create",
  "marketing_campaigns.delete",
  "marketing_campaigns.read",
  "marketing_campaigns.update",
  "newsletter.create",
  "newsletter.delete",
  "newsletter.read",
  "newsletter.update",
  "partner_settings.new_relic.read",
  "partner_settings.new_relic.update",
  "partner_settings.read",
  "partner_settings.sendwithus.read",
  "partner_settings.sendwithus.update",
  "stats.global.read",
  "stats.read",
  "subusers.create",
  "subusers.credits.create",
  "subusers.credits.delete",
  "subusers.credits.read",
  "subusers.credits.remaining.create",
  "subusers.credits.remaining.delete",
  "subusers.credits.remaining.read",
  "subusers.credits.remaining.update",
  "subusers.credits.update",
  "subusers.delete",
  "subusers.monitor.create",
  "subusers.monitor.delete",
  "subusers.monitor.read",
  "subusers.monitor.update",
  "subusers.read",
  "subusers.reputations.read",
  "subusers.stats.monthly.read",
  "subusers.stats.read",
  "subusers.stats.sums.read",
  "subusers.summary.read",
  "subusers.update",
  "suppression.blocks.create",
  "suppression.blocks.delete",
  "suppression.blocks.read",
  "suppression.blocks.update",
  "suppression.bounces.create",
  "suppression.bounces.delete",
  "suppression.bounces.read",
  "suppression.bounces.update",
  "suppression.create",
  "suppression.delete",
  "suppression.invalid_emails.create",
  "suppression.invalid_emails.delete",
  "suppression.invalid_emails.read",
  "suppression.invalid_emails.update",
  "suppression.read",
  "suppression.spam_reports.create",
  "suppression.spam_reports.delete",
  "suppression.spam_reports.read",
  "suppression.spam_reports.update",
  "suppression.unsubscribes.create",
  "suppression.unsubscribes.delete",
  "suppression.unsubscribes.read",
  "suppression.unsubscribes.update",
  "suppression.update",
  "templates.create",
  "templates.delete",
  "templates.read",
  "templates.update",
  "templates.versions.activate.create",
  "templates.versions.activate.delete",
  "templates.versions.activate.read",
  "templates.versions.activate.update",
  "templates.versions.create",
  "templates.versions.delete",
  "templates.versions.read",
  "templates.versions.update",
  "tracking_settings.click.read",
  "tracking_settings.click.update",
  "tracking_settings.google_analytics.read",
  "tracking_settings.google_analytics.update",
  "tracking_settings.open.read",
  "tracking_settings.open.update",
  "tracking_settings.read",
  "tracking_settings.subscription.read",
  "tracking_settings.subscription.update",
  "user.account.read",
  "user.credits.read",
  "user.email.create",
  "user.email.delete",
  "user.email.read",
  "user.email.update",
  "user.multifactor_authentication.create",
  "user.multifactor_authentication.delete",
  "user.multifactor_authentication.read",
  "user.multifactor_authentication.update",
  "user.password.read",
  "user.password.update",
  "user.profile.read",
  "user.profile.update",
  "user.scheduled_sends.create",
  "user.scheduled_sends.delete",
  "user.scheduled_sends.read",
  "user.scheduled_sends.update",
  "user.settings.enforced_tls.read",
  "user.settings.enforced_tls.update",
  "user.timezone.read",
  "user.username.read",
  "user.username.update",
  "user.webhooks.event.settings.read",
  "user.webhooks.event.settings.update",
  "user.webhooks.event.test.create",
  "user.webhooks.event.test.read",
  "user.webhooks.event.test.update",
  "user.webhooks.parse.settings.create",
  "user.webhooks.parse.settings.delete",
  "user.webhooks.parse.settings.read",
  "user.webhooks.parse.settings.update",
  "user.webhooks.parse.stats.read",
  "whitelabel.create",
  "whitelabel.delete",
  "whitelabel.read",
  "whitelabel.update"
]
```

## Alerts

```json
"scopes": [
  "alerts.create",
  "alerts.delete",
  "alerts.read",
  "alerts.update"
]
```

## API Keys

```json
"scopes": [
  "api_keys.create",
  "api_keys.delete",
  "api_keys.read",
  "api_keys.update"
]
```

## ASM Groups

```json
"scopes": [
  "asm.groups.create",
  "asm.groups.delete",
  "asm.groups.read",
  "asm.groups.update"
]
```

## Billing

**Billing permissions are mutually exclusive from all other permissions. An API Key can have *either* Billing Permissions *or* any other set of Permissions but not *both*.**

```json
"scopes": [
  "billing.create",
  "billing.delete",
  "billing.read",
  "billing.update"
]
```

## Categories

```json
"scopes": [
  "categories.create",
  "categories.delete",
  "categories.read",
  "categories.update",
  "categories.stats.read",
  "categories.stats.sums.read"
]
```

## Clients

```json
"scopes": [
  "clients.desktop.stats.read",
  "clients.phone.stats.read",
  "clients.stats.read",
  "clients.tablet.stats.read",
  "clients.webmail.stats.read"
]
```

## Credentials

```json
"scopes": [
  "credentials.create",
  "credentials.delete",
  "credentials.read",
  "credentials.update"
]
```

## Email Marketing

**The marketing.read scope provides the user with both read and write access to the Email Marketing API.**

```json
"scopes": [
  "marketing.read",
]
```

## IPs

```json
"scopes": [
  "ips.assigned.read",
  "ips.read",
  "ips.pools.create",
  "ips.pools.delete",
  "ips.pools.read",
  "ips.pools.update",
  "ips.pools.ips.create",
  "ips.pools.ips.delete",
  "ips.pools.ips.read",
  "ips.pools.ips.update",
  "ips.warmup.create",
  "ips.warmup.delete",
  "ips.warmup.read",
  "ips.warmup.update"
]
```

## Mail Settings

```json
"scopes": [
  "mail_settings.address_whitelist.read",
  "mail_settings.address_whitelist.update",
  "mail_settings.bcc.read",
  "mail_settings.bcc.update",
  "mail_settings.bounce_purge.read",
  "mail_settings.bounce_purge.update",
  "mail_settings.footer.read",
  "mail_settings.footer.update",
  "mail_settings.forward_bounce.read",
  "mail_settings.forward_bounce.update",
  "mail_settings.forward_spam.read",
  "mail_settings.forward_spam.update",
  "mail_settings.plain_content.read",
  "mail_settings.plain_content.update",
  "mail_settings.read",
  "mail_settings.spam_check.read",
  "mail_settings.spam_check.update",
  "mail_settings.template.read",
  "mail_settings.template.update"
]
```

## Mail

```json
"scopes": [
  "mail.batch.create",
  "mail.batch.delete",
  "mail.batch.read",
  "mail.batch.update",
  "mail.send"
]
```

## Marketing Campaigns Legacy

```json
"scopes": [
  "marketing_campaigns.create",
  "marketing_campaigns.delete",
  "marketing_campaigns.read",
  "marketing_campaigns.update"
]
```

## Newsletter

```json
"scopes": [
  "newsletter.create",
  "newsletter.delete",
  "newsletter.read",
  "newsletter.update"
]
```

## Partner-Settings

```json
"scopes": [
  "partner_settings.new_relic.read",
  "partner_settings.new_relic.update",
  "partner_settings.read",
  "partner_settings.sendwithus.read",
  "partner_settings.sendwithus.update"
]
```

## Scheduled Sends

```json
"scopes": [
  "user.scheduled_sends.create",
  "user.scheduled_sends.delete",
  "user.scheduled_sends.read",
  "user.scheduled_sends.update"
]
```

## Stats

```json
"scopes": [
  "email_activity.read",
  "stats.read",
  "stats.global.read",
  "browsers.stats.read",
  "devices.stats.read",
  "geo.stats.read",
  "mailbox_providers.stats.read",
  "clients.desktop.stats.read",
  "clients.phone.stats.read",
  "clients.stats.read",
  "clients.tablet.stats.read",
  "clients.webmail.stats.read"
]
```

## Subusers

```json
"scopes": [
  "subusers.create",
  "subusers.delete",
  "subusers.read",
  "subusers.update",
  "subusers.credits.create",
  "subusers.credits.delete",
  "subusers.credits.read",
  "subusers.credits.update",
  "subusers.credits.remaining.create",
  "subusers.credits.remaining.delete",
  "subusers.credits.remaining.read",
  "subusers.credits.remaining.update",
  "subusers.monitor.create",
  "subusers.monitor.delete",
  "subusers.monitor.read",
  "subusers.monitor.update",
  "subusers.reputations.read",
  "subusers.stats.read",
  "subusers.stats.monthly.read",
  "subusers.stats.sums.read"
  "subusers.summary.read"
]
```

## Suppressions

```json
"scopes": [
  "suppression.create",
  "suppression.delete",
  "suppression.read",
  "suppression.update",
  "suppression.bounces.create",
  "suppression.bounces.read",
  "suppression.bounces.update",
  "suppression.bounces.delete",
  "suppression.blocks.create",
  "suppression.blocks.read",
  "suppression.blocks.update",
  "suppression.blocks.delete",
  "suppression.invalid_emails.create",
  "suppression.invalid_emails.read",
  "suppression.invalid_emails.update",
  "suppression.invalid_emails.delete",
  "suppression.spam_reports.create",
  "suppression.spam_reports.read",
  "suppression.spam_reports.update",
  "suppression.spam_reports.delete",
  "suppression.unsubscribes.create",
  "suppression.unsubscribes.read",
  "suppression.unsubscribes.update",
  "suppression.unsubscribes.delete"
]
```

## Teammates

```json
"scopes": [
  "teammates.create",
  "teammates.read",
  "teammates.update",
  "teammates.delete"
]
```

## Templates

```json
"scopes": [
  "templates.create",
  "templates.delete",
  "templates.read",
  "templates.update",
  "templates.versions.activate.create",
  "templates.versions.activate.delete",
  "templates.versions.activate.read",
  "templates.versions.activate.update",
  "templates.versions.create",
  "templates.versions.delete",
  "templates.versions.read",
  "templates.versions.update"
]
```

## Tracking

```json
"scopes": [
  "tracking_settings.click.read",
  "tracking_settings.click.update",
  "tracking_settings.google_analytics.read",
  "tracking_settings.google_analytics.update",
  "tracking_settings.open.read",
  "tracking_settings.open.update",
  "tracking_settings.read",
  "tracking_settings.subscription.read",
  "tracking_settings.subscription.update"
]
```

## User Settings

```json
"scopes": [
  "user.account.read",
  "user.credits.read",
  "user.email.create",
  "user.email.delete",
  "user.email.read",
  "user.email.update",
  "user.multifactor_authentication.create",
  "user.multifactor_authentication.delete",
  "user.multifactor_authentication.read",
  "user.multifactor_authentication.update",
  "user.password.read",
  "user.password.update",
  "user.profile.read",
  "user.profile.update",
  "user.settings.enforced_tls.read",
  "user.settings.enforced_tls.update",
  "user.timezone.read",
  "user.timezone.update",
  "user.username.read",
  "user.username.update"
]
```

## Webhook

```json
"scopes": [
  "user.webhooks.event.settings.read",
  "user.webhooks.event.settings.update",
  "user.webhooks.event.test.create",
  "user.webhooks.event.test.read",
  "user.webhooks.event.test.update",
  "user.webhooks.parse.settings.create",
  "user.webhooks.parse.settings.delete",
  "user.webhooks.parse.settings.read",
  "user.webhooks.parse.settings.update",
  "user.webhooks.parse.stats.read"
]
```

## Domain Authentication (formerly Whitelabel)

```json
"scopes": [
  "whitelabel.create",
  "whitelabel.delete",
  "whitelabel.read",
  "whitelabel.update"
]
```

## Reverse DNS (formerly Whitelist)

```json
"scopes": [
  "access_settings.activity.read",
  "access_settings.whitelist.create",
  "access_settings.whitelist.delete",
  "access_settings.whitelist.read",
  "access_settings.whitelist.update"
]
```
