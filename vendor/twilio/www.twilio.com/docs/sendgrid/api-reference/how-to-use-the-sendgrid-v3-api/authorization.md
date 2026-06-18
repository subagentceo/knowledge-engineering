# Authorization

## API Overview

## Twilio supported SDKs

The Twilio SendGrid Web REST API v3 provides SDKs for seven different languages.

* [C#](https://github.com/sendgrid/sendgrid-csharp)
* [Go](https://github.com/sendgrid/sendgrid-go)
* [Java](https://github.com/sendgrid/sendgrid-java)
* [Node.js](https://github.com/sendgrid/sendgrid-nodejs)
* [PHP](https://github.com/sendgrid/sendgrid-php)
* [Python](https://github.com/sendgrid/sendgrid-python)
* [Ruby](https://github.com/sendgrid/sendgrid-ruby)

## API Key Permissions List

API Keys can be used to authenticate the use of SendGrid's v3 Web API, or the [Mail API endpoint](/docs/sendgrid/api-reference/). API Keys may be assigned certain permissions, or scopes, that limit which API endpoints they are able to access. For a more detailed explanation of how you can use API Key permissions, please visit our [API Keys docs](/docs/sendgrid/ui/account-and-settings/api-keys/).

The following is a complete list of all possible permissions that you may assign to an API Key.

> \[!NOTE]
>
> When updating a key to include `user` or `subuser` scopes, use basic authentication.

### Alerts

```json
"scopes": [
  "alerts.create",
  "alerts.delete",
  "alerts.read",
  "alerts.update"
]
```

### API Keys

```json
"scopes": [
  "api_keys.create",
  "api_keys.delete",
  "api_keys.read",
  "api_keys.update"
]
```

### ASM Groups

```json
"scopes": [
  "asm.groups.create",
  "asm.groups.delete",
  "asm.groups.read",
  "asm.groups.update"
]
```

### Billing

```json
"scopes": [
  "billing.create",
  "billing.delete",
  "billing.read",
  "billing.update"
]
```

**Billing permissions are mutually exclusive from all other permissions. An API Key can have *either* Billing Permissions *or* any other set of Permissions but not *both*.**

### Categories

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

### Stats

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

### IPs

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

### Mail Settings

```json
"scopes": [
  "mail_settings.address_whitelist.read",
  "mail_settings.address_whitelist.update",
  "mail_settings.bounce_purge.read",
  "mail_settings.bounce_purge.update",
  "mail_settings.footer.read",
  "mail_settings.footer.update",
  "mail_settings.forward_bounce.read",
  "mail_settings.forward_bounce.update",
  "mail_settings.forward_spam.read",
  "mail_settings.forward_spam.update",
  "mail_settings.template.read",
  "mail_settings.template.update"
]
```

### Mail

```json
"scopes": [
  "mail.batch.create",
  "mail.batch.delete",
  "mail.batch.read",
  "mail.batch.update",
  "mail.send"
]
```

### Marketing Campaigns

```json
"scopes": [
  "marketing_campaigns.create",
  "marketing_campaigns.delete",
  "marketing_campaigns.read",
  "marketing_campaigns.update"
]
```

### Partner Settings

```json
"scopes": [
  "partner_settings.new_relic.read",
  "partner_settings.new_relic.update",
  "partner_settings.read"
]
```

### Scheduled Sends

```json
"scopes": [
  "user.scheduled_sends.create",
  "user.scheduled_sends.delete",
  "user.scheduled_sends.read",
  "user.scheduled_sends.update"
]
```

### Subusers

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

### Suppressions

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

### Teammates

```json
"scopes": [
  "teammates.create",
  "teammates.read",
  "teammates.update",
  "teammates.delete"
]
```

### Templates

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

### Tracking

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

### User Settings

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

### Webhook

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

### Domain Authentication (formerly Whitelabel)

```json
"scopes": [
  "whitelabel.create",
  "whitelabel.delete",
  "whitelabel.read",
  "whitelabel.update"
]
```

### Reverse DNS (formerly Whitelist)

```json
"scopes": [
  "access_settings.activity.read",
  "access_settings.whitelist.create",
  "access_settings.whitelist.delete",
  "access_settings.whitelist.read",
  "access_settings.whitelist.update"
]
```

### Admin API Key Scopes

Below is a complete list of every API Key scope to be given to an admin level API Key.

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
  "mail_settings.read",,
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
  "partner_settings.new_relic.read",
  "partner_settings.new_relic.update",
  "partner_settings.read",
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
  "teammates.create",
  "teammates.read",
  "teammates.update",
  "teammates.delete",
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
