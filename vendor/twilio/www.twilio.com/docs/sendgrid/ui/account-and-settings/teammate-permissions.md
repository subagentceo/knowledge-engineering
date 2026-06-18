# Teammate Permissions

Teammates are assigned permissions, or scopes, that determine which actions they may perform on the Twilio SendGrid account to which they belong. This page lists all the possible permissions that you may assign to a Teammate. The scopes are grouped by functionality. For example, all permissions related to API keys are listed under the [API keys heading](#api-keys).

## Personas

SendGrid allows you to assign a persona to an SSO Teammate. A persona is a collection of permissions that are most often required by common types of SendGrid Teammates. This means you can assign a persona to an SSO Teammate rather than having to assign each scope individually. The permissions included with each persona assignment are listed in the [Personas section of this page](#persona-scopes). See the [SSO and non-SSO Teammates section of this page](#sso-and-non-sso-teammates) to understand the difference between the two Teammate types.

## Administrators

It's also possible to make a Teammate an administrator for the account. Assigning someone admin privileges will allocate all scopes to the Teammate. See the [Admin Teammate permissions section of this page](#administrator-scopes) for a full list of permissions assigned to an admin.

## SSO and non-SSO Teammates

If you are using Twilio SendGrid's Single Sign-On (SSO) features to manage access to your SendGrid account, you will create SSO Teammates. The scopes that may be assigned to an SSO Teammate do not differ from those that may be assigned to a non-SSO Teammate unless otherwise noted. You will, however, manage your Teammates using different APIs and different steps in the SendGrid application user interface. See our [SSO documentation](/docs/sendgrid/ui/account-and-settings/sso) and [SSO Teammate's API operations](/docs/sendgrid/api-reference/single-sign-on-teammates/) for more information about managing SSO Teammates. See our [Teammates](/docs/sendgrid/ui/account-and-settings/teammates) documentation and [Teammates API operations](/docs/sendgrid/api-reference/teammates/) for more information about managing non-SSO Teammates.

## The SendGrid application user interface

When creating or updating a Teammate in the SendGrid application user interface (UI), permissions can be assigned at one of three levels: **No Access**, **Read Access**, or **Full Access**.

* **No Access**: The Teammate cannot work with the SendGrid feature in any way.
* **Read Access**: The Teammate can view the feature and its settings but not modify it.
* **Full Access**: The Teammate can view *and* modify the feature, including deleting its settings. For example, a Teammate with **Full Access** API key permissions can view, update, and delete any existing API keys on the account, as well as create new API keys.

## Nested scopes in the SendGrid UI

Some scopes are represented as nested groups of permissions in the SendGrid app UI. For example, the **Mail Settings** permissions may be configured for all settings or more granularly for each individual mail setting.

![Mail settings with adjustable access levels for features like BCC and spam checker.](https://docs-resources.prod.twilio.com/0779945d5a57c9b7e5132829db7496314e44aca90114e83b7700fe0019492b39.png)

Similarly, a Teammate may have read access for scheduled mail sends but lack scopes to send email. You can achieve this by setting **Read Access** for the **Mail Send** permission. Once set, you will see **No Access** for the nested **Mail Send** scope and **Read Access** for the nested **Scheduled Sends** scope.

![Mail Send and Scheduled Sends access sliders under Custom Access.](https://docs-resources.prod.twilio.com/4728d9472159029d1bf62b41034d51f8886eaf0f77f6d5a599cb1fb35975a58a.png)

This same level of permissions would be achieved with the [Teammates API](/docs/sendgrid/api-reference/teammates/) or [SSO Teammates API](/docs/sendgrid/api-reference/single-sign-on-teammates/) by assigning the `mail.batch.read` and `user.scheduled_sends.read` scopes to the Teammate. You would omit the `mail.batch.create`, `mail.batch.delete`, `mail.batch.update`, `mail.send`, `user.scheduled_sends.create`, `user.scheduled_sends.delete`, and `user.scheduled_sends.update` scopes.

The SendGrid UI tries to group scopes into logical blocks of functionality. This page notes where the UI terminology doesn't align perfectly with the name of the individual permissions assigned and returned by the API.

## All available Teammate scopes

The following groups of permissions represent all the possible scopes that may be assigned to a Teammate.

## Alerts

You can set up alerts to be sent to a specific email address on a recurring basis, whether for informational purposes or when specific account actions occur. The following scopes determine a Teammate's ability to create, view, modify, and delete alerts. See [**Alerts**](/docs/sendgrid/ui/account-and-settings/alerts) for more information.

```json
{
    "scopes": [
        "alerts.create",
        "alerts.delete",
        "alerts.read",
        "alerts.update"
    ]
}
```

## API keys

Your application, mail client, or website will use API keys to authenticate access to SendGrid's services. The following scopes determine a Teammate's ability to create, view, modify, and delete API keys for the account. See [**API keys**](/docs/sendgrid/ui/account-and-settings/api-keys) for more information. The scopes you can apply to a Teammate are like the scopes you can apply to an API key. In this way, working with Teammates and API keys is similar, as both provide access to your SendGrid account.

```json
{
    "scopes": [
        "api_keys.create",
        "api_keys.delete",
        "api_keys.read",
        "api_keys.update"
    ]
}
```

## ASM

With SendGrid, an unsubscribe is the action an email recipient takes when they opt-out of receiving your messages. A suppression is the action you take as a sender to filter or *suppress* an unsubscribed address from your email send. From the perspective of the recipient, your suppression is the result of their unsubscribe.

You can have global suppressions, which represent addresses that have been unsubscribed from all of your emails. You can also have suppression groups, also known as ASM groups, which represent categories or groups of emails that your recipients can unsubscribe from, rather than unsubscribing from all of your messages.

The following scopes determine a Teammate's ability to create, view, modify, and delete global suppressions and suppression groups.

These scopes are found in the SendGrid UI under **Suppressions** > **Unsubscribe Groups** and **Suppressions** > **Suppressions**. See [**Suppressions**](/docs/sendgrid/for-developers/sending-email/suppressions) for more information.

You will also see "[Suppressions](#suppressions)" later in this document as another group of scopes. These additional suppressions are created automatically by SendGrid to unsubscribe addresses that bounce, are invalid, or are otherwise unable to receive your messages. These suppressions are created to help protect your sender reputation.

```json
{
    "scopes": [
        "asm.groups.create",
        "asm.groups.read",
        "asm.groups.update",
        "asm.groups.delete",
        "asm.groups.suppressions.create",
        "asm.groups.suppressions.read",
        "asm.groups.suppressions.update",
        "asm.groups.suppressions.delete",
        "asm.suppressions.global.create",
        "asm.suppressions.global.read",
        "asm.suppressions.global.update",
        "asm.suppressions.global.delete"
    ]
}
```

## Billing

> \[!NOTE]
>
> Billing permissions are mutually exclusive from all other permissions. A Teammate can have either Billing permissions or any other set of permissions but not both.

The following scopes determine a Teammate's ability to create, view, modify, and delete billing details for the account such as payment methods.

```json
{
    "scopes": [
        "billing.create",
        "billing.delete",
        "billing.read",
        "billing.update"
    ]
}
```

## Credentials

The following scopes determine a Teammate's ability to create, view, modify, and delete credentials such as passwords for the account.

```json
{
    "scopes": [
        "credentials.create",
        "credentials.delete",
        "credentials.read",
        "credentials.update"
    ]
}
```

## Deliverability Insights

Twilio SendGrid's Deliverability Insights is a streamlined in-app dashboard that provides an actionable view of your email delivery performance over time. The following scope determines a Teammate's ability to view Deliverability Insights in the SendGrid application UI. See [**Deliverability Insights**](/docs/sendgrid/ui/analytics-and-reporting/deliverability-insights) for more information.

```json
{
    "scopes": [
        "di.bounce_block_classifications.read"
    ]
}
```

## Domain Authentication (formerly Whitelabel)

Domain Authentication is SendGrid's process for setting the DNS records necessary to approve SendGrid as a sender of email for your domain. These include DKIM, SPF, and DMARC records. The following scopes determine a Teammate's ability to create, view, modify, and delete authenticated domains. See [**How to Set Up Domain Authentication**](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication) for more information.

In the SendGrid UI, you will find these scopes under **Sender Authentication**.

```json
{
    "scopes": [
        "whitelabel.create",
        "whitelabel.delete",
        "whitelabel.read",
        "whitelabel.update"
    ]
}
```

## Email Testing

Email testing offers robust, pre-send testing of your emails, including in-app spam testing, inbox rendering previews, and link validation without leaving your workflow. The following scopes determine a Teammate's ability to view and create email tests. See [**Email Testing**](/docs/sendgrid/ui/sending-email/email-testing) for more information.

```json
{
    "scopes": [
        "email_testing.read",
        "email_testing.write"
    ]
}
```

## Email validations

Email Address Validation provides real-time detailed information on the validity of email addresses. You can integrate this validation process into your platform's signup form and customize the best use of email address validation for your use case. The following scopes determine a Teammate's ability to work with email validations. See [**Email Address Validation**](/docs/sendgrid/ui/managing-contacts/email-address-validation) for more information.

```json
{
    "scopes": [
        "validations.email.read",
        "validations.email.create"
    ]
}

```

## IP address management

SendGrid allows customers on Pro Email API plans and Advanced Marketing Campaigns plans to send from dedicated IP addresses. This allows you to have complete control over the sending reputation of that IP. Additionally, you can group multiple IP addresses into IP pools. The following scopes determine a Teammate's ability to manage IP addresses and IP pools. See the [IP address](/docs/sendgrid/ui/account-and-settings/dedicated-ip-addresses), [IP pools](/docs/sendgrid/ui/account-and-settings/ip-pools), and [IP Warmup](/docs/sendgrid/concepts/reputation/warm-up-ip-addresses) documentation for more information.

```json
{
    "scopes": [
        "ips.assigned.read",
        "ips.create",
        "ips.read",
        "ips.update",
        "ips.delete",
        "ips.pools.create",
        "ips.pools.read",
        "ips.pools.update",
        "ips.pools.delete",
        "ips.pools.ips.create",
        "ips.pools.ips.read",
        "ips.pools.ips.update",
        "ips.pools.ips.delete",
        "ips.warmup.create",
        "ips.warmup.read",
        "ips.warmup.update",
        "ips.warmup.delete"
    ]
}
```

## Mail

Mail send permissions determine a Teammate's ability to send email as well as create and assign batch IDs to a send. To schedule a send, you must first create a batch ID and then assign that ID to your send as part of the request to the Mail Send API. Once a batch ID is associated with a send, you can use the ID to pause or cancel the scheduled send. See the [Mail Send API reference](/docs/sendgrid/api-reference/mail-send/mail-send) and [scheduled sends reference](/docs/sendgrid/api-reference/cancel-scheduled-sends/create-a-batch-id) for more information.

Additional scopes are required to work with the scheduled sends themselves. See the [Scheduled sends](#scheduled-sends) section below for more about those scopes.

```json
{
    "scopes": [
        "mail.send",
        "mail.batch.create",
        "mail.batch.delete",
        "mail.batch.read",
        "mail.batch.update"
    ]
}
```

### Scheduled sends

SendGrid allows you to schedule a mail send up to 72 hours in advance. The following scopes determine a Teammate's ability to create, view, and modify scheduled sends. To schedule a send, you must first create a batch ID and then assign that ID to your send as part of the request to the Mail Send API. Once a batch ID is associated with a send, you can use the ID to pause or cancel the send. See the [Mail Send API reference](/docs/sendgrid/api-reference/mail-send/mail-send) and [scheduled sends reference](/docs/sendgrid/api-reference/cancel-scheduled-sends/create-a-batch-id) for more information.

In the SendGrid UI, you will find the **Scheduled Sends** scopes nested below the **Mail Send** scopes.

```json
{
    "scopes": [
        "user.scheduled_sends.create",
        "user.scheduled_sends.delete",
        "user.scheduled_sends.read",
        "user.scheduled_sends.update"
    ]
}
```

## Mail settings

Mail Settings allow you to tell SendGrid specific things to do to every email that you send over SendGrid's Web API or SMTP Relay. For example, the Footer setting will insert a custom footer at the bottom of the text and HTML bodies of each message. The Event Notification setting allows you to receive events from the SendGrid Event Webhook. The following scopes determine a Teammate's ability to enable, view, modify, and disable each Mail Setting. See [**Mail Settings**](/docs/sendgrid/ui/account-and-settings/mail) for more information.

```json
{
    "scopes": [
        "mail_settings.read",
        "mail_settings.bcc.create",
        "mail_settings.bcc.read",
        "mail_settings.bcc.update",
        "mail_settings.bcc.delete",
        "mail_settings.address_whitelist.create",
        "mail_settings.address_whitelist.read",
        "mail_settings.address_whitelist.update",
        "mail_settings.address_whitelist.delete",
        "mail_settings.footer.create",
        "mail_settings.footer.read",
        "mail_settings.footer.update",
        "mail_settings.footer.delete",
        "mail_settings.forward_spam.create",
        "mail_settings.forward_spam.read",
        "mail_settings.forward_spam.update",
        "mail_settings.forward_spam.delete",
        "mail_settings.plain_content.create",
        "mail_settings.plain_content.read",
        "mail_settings.plain_content.update",
        "mail_settings.plain_content.delete",
        "mail_settings.spam_check.create",
        "mail_settings.spam_check.read",
        "mail_settings.spam_check.update",
        "mail_settings.spam_check.delete",
        "mail_settings.bounce_purge.create",
        "mail_settings.bounce_purge.read",
        "mail_settings.bounce_purge.update",
        "mail_settings.bounce_purge.delete",
        "mail_settings.forward_bounce.create",
        "mail_settings.forward_bounce.read",
        "mail_settings.forward_bounce.update",
        "mail_settings.forward_bounce.delete",
        "mail_settings.template.create",
        "mail_settings.template.read",
        "mail_settings.template.update",
        "mail_settings.template.delete",
        "mail_settings.forward_bounce.create"
    ]
}
```

## Marketing Campaigns

SendGrid's Marketing Campaigns product provides a rich feature set, including contact management, segmentation, and automated drip campaigns. The following scopes determine a Teammate's ability to work with Marketing Campaigns. See [**How to Send Email with Marketing Campaigns**](/docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns) for more information.

```json
{
    "scopes": [
        "marketing_campaigns.create",
        "marketing_campaigns.delete",
        "marketing_campaigns.read",
        "marketing_campaigns.update",
        "marketing.read"
    ]
}
```

### Marketing Campaigns Automations

Automations are SendGrid's automated drip campaigns. The following scope determines a Teammate's ability to view Marketing Campaigns Automations.

```json
{
    "scopes": [
        "marketing.automation.read"
    ]
}
```

### Marketing Campaigns Design Library

The Marketing Campaigns Design Library allows you to quickly build dynamic email templates for your Single Sends and Automations. The following scopes determine a Teammate's ability to create, modify, view, and delete email designs. See [**Working with Marketing Campaigns Email Designs**](/docs/sendgrid/ui/sending-email/working-with-marketing-campaigns-email-designs) for more information.

The Design Library is available for Marketing Campaigns only. To send templates with the Mail Send API, see [**How to Send an Email with Dynamic Templates**](/docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates). Both the Design Library and our dynamic templates use the same editor, so you will find the experience similar when designing your emails across SendGrid's product offerings.

```json
{
    "scopes": [
        "design_library.read",
        "design_library.create",
        "design_library.update",
        "design_library.delete"
    ]
}
```

## Messages

```json
{
    "scopes": [
        "messages.read"
    ]
}
```

## Newsletter

The following scopes exist for SendGrid's legacy Newsletter feature. Please see our Marketing Campaigns [**Single Sends**](/docs/sendgrid/ui/sending-email/single-sends) page to learn about sending single non-automated marketing emails, such as newsletters, with SendGrid's current Marketing Campaigns product.

```json
{
    "scopes": [
        "newsletter.create",
        "newsletter.read",
        "newsletter.update",
        "newsletter.delete"
    ]
}
```

## Partner

The following scopes exist for partner integrations with third-party service providers. Some of these scopes, such as those for New Relic are provided for legacy integrations that are no longer supported. They are shown here for reference. These scopes determine a Teammate's ability to add, manage, and remove partner integrations.

```json
{
    "scopes": [
        "partner_settings.read",
        "partner_settings.new_relic.create",
        "partner_settings.new_relic.read",
        "partner_settings.new_relic.update",
        "partner_settings.new_relic.delete",
        "partner_settings.sendwithus.create",
        "partner_settings.sendwithus.read",
        "partner_settings.sendwithus.update",
        "partner_settings.sendwithus.delete"
    ]
}
```

## Reverse DNS (formerly Whitelist)

Setting up reverse DNS on an IP address allows mailbox providers to verify the sender when they do a reverse DNS lookup upon receipt of the emails you send. Reverse DNS is only available if you have a dedicated IP address. The following scopes determine a Teammate's ability to setup and modify reverse DNS. See [**Reverse DNS**](/docs/sendgrid/ui/account-and-settings/how-to-set-up-reverse-dns) for more information.

In the SendGrid UI, you will find these scopes under **Security**.

```json
{
    "scopes": [
        "access_settings.activity.read",
        "access_settings.whitelist.create",
        "access_settings.whitelist.delete",
        "access_settings.whitelist.read",
        "access_settings.whitelist.update"
    ]
}
```

## Single Sign-On

SendGrid offers a SAML-based single sign-on (SSO) feature, which allows you to manage your SendGrid account access with the identity provider of your choice. The following scopes determine a Teammate's ability to create, view, configure, and delete an SSO configuration. See [**SendGrid Single Sign-On**](/docs/sendgrid/ui/account-and-settings/sso) for more information.

```json
{
    "scopes": [
        "sso.settings.create",
        "sso.settings.read",
        "sso.settings.update",
        "sso.settings.delete",
        "sso.teammates.create",
        "sso.teammates.update"
    ]
}
```

## Statistics

SendGrid provides statistics in specific ways so that you can quickly view data about your email program in context. The following scopes determine a Teammate's ability to work with various statistics. This group of scopes includes statistics scopes categorized by type such as [client statistics](#clients). See [**Statistics Overview**](/docs/sendgrid/ui/analytics-and-reporting/stats-overview) for more information.

```json
{
    "scopes": [
        "stats.read",
        "stats.global.read",
        "browsers.stats.read",
        "geo.stats.read",
        "mailbox_providers.stats.read"
    ]
}
```

### Categories

Categories can help organize your email statistics by enabling you to group emails by type. Just as you can view the statistics on all your email activity, you can go a step further and view the statistics by a particular category. The following scopes determine a Teammate's ability to create, view, modify, and delete categories. See [**Category Statistics**](/docs/sendgrid/ui/analytics-and-reporting/categories) for more information.

In the SendGrid UI, you will see **Category Management**, which represents the scopes required to create, view, and modify categories themselves such as `categories.create` and `categories.read`. You will also see **Category Stats** nested under **Stats**, which represent the scopes required to view statistics by the categories that have been created such as `categories.stats.read` and `categories.stats.sums.read`.

```json
{
    "scopes": [
        "categories.create",
        "categories.delete",
        "categories.read",
        "categories.update",
        "categories.stats.read",
        "categories.stats.sums.read"
    ]
}
```

### Clients

Clients statistics allow you to view your email metrics by the type of device used to access the message. These clients include:

* Desktop
* Phone
* Tablet
* Webmail

The following scopes determine a Teammate's ability to view statistics for your account by client type. See [**Device Statistics**](/docs/sendgrid/ui/analytics-and-reporting/device) for more information.

In the SendGrid UI, you will find these scopes under **Stats** > **Email Clients and Devices**.

```json
{
    "scopes": [
        "devices.stats.read",
        "clients.desktop.stats.read",
        "clients.phone.stats.read",
        "clients.stats.read",
        "clients.tablet.stats.read",
        "clients.webmail.stats.read"
    ]
}
```

### Email Activity

The Email Activity Feed allows you to view a snapshot of recent email-related activity events associated with your account and any Subusers. The following scopes determine a Teammate's ability to view the Email Activity Feed. See [**Email Activity Feed**](/docs/sendgrid/ui/analytics-and-reporting/email-activity-feed) for more information.

```json
{
    "scopes": [
        "messages.read"
    ]
}
```

The majority of SendGrid accounts use SendGrid's [Email Activity Feed](/docs/sendgrid/ui/analytics-and-reporting/email-activity-feed), which the code above relates to.

If you know that you are still using SendGrid's [Legacy Email Activity feed](/docs/sendgrid/ui/analytics-and-reporting/email-activity), you should use the scope below instead:

```json
{
    "scopes": [
        "email_activity.read"
    ]
}
```

Note that for most users, the Legacy Email Activity feed is not used and this scope will not produce the desired results.

## Subusers

SendGrid Subusers can be thought of like sub-accounts. Each Subuser may have its own Teammates, IP addresses, and more. We often recommend creating one Subuser for your transactional email and another for your marketing email. However, ISV customers can also create Subusers for each of their own customers. Subusers are flexible and allow you to extend and organize your SendGrid account as you need. See [**Subusers**](/docs/sendgrid/ui/account-and-settings/subusers) for more information.

The following scopes determine a Teammate's ability to create, view, modify, and delete Subusers.

```json
{
    "scopes": [
        "subusers.create",
        "subusers.read",
        "subusers.update",
        "subusers.delete",
        "subusers.credits.create",
        "subusers.credits.read",
        "subusers.credits.update",
        "subusers.credits.delete",
        "subusers.credits.remaining.create",
        "subusers.credits.remaining.read",
        "subusers.credits.remaining.update",
        "subusers.credits.remaining.delete",
        "subusers.monitor.create",
        "subusers.monitor.read",
        "subusers.monitor.update",
        "subusers.monitor.delete",
        "subusers.stats.read",
        "subusers.stats.read",
        "subusers.stats.sums.read",
        "subusers.stats.monthly.read",
        "subusers.reputations.read",
        "subusers.summary.read"
    ]
}
```

## Suppressions

With SendGrid, an unsubscribe is the action an email recipient takes when they opt-out of receiving your messages. A suppression is the action you take as a sender to filter or *suppress* an unsubscribed address from your email send. From the perspective of the recipient, your suppression is the result of their unsubscribe.

SendGrid automatically suppresses emails sent to users for a variety of reasons, including blocks, bounces, invalid email addresses, spam reports, and unsubscribes. We suppress these messages to help you maintain the best possible sender reputation by attempting to prevent unwanted mail. You may also add addresses to your suppressions.

The following scopes determine a Teammate's ability to create, view, modify, and delete suppressions. See [**Suppressions**](/docs/sendgrid/for-developers/sending-email/suppressions) for more information.

In the SendGrid UI, you will find these scopes under **Suppressions** > **Suppressions**.

You will see "[ASM](#asm)" scopes earlier in this document. These other suppressions represent specific suppression groups you create as well as global suppressions.

```json
{
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
}
```

## Teammates

Teammates may themselves need Teammate permissions. For example, a Teammate may need to create additional Teammates. The following scopes determine a Teammate's ability to create, view, modify, and delete additional Teammates and their scopes.

In the SendGrid UI, you will not find specific Teammate scopes. You must make a Teammate an administrator to assign Teammate permissions.

```json
{
    "scopes": [
        "teammates.create",
        "teammates.read",
        "teammates.update",
        "teammates.delete"
    ]
}
```

## Templates

SendGrid offers the ability to send dynamic templates that make your messages more visually appealing and engaging. The following scopes determine a Teammate's ability to create, view, modify, and delete templates, including template versions. See [**How to Send an Email with Dynamic Templates**](/docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates) for more information.

If you are using SendGrid's Marketing Campaigns product, you will work with our email designs rather than dynamic templates. Both the Design Library and our dynamic templates use the same editor, so you will find the experience similar when designing your emails across SendGrid's product offerings. See [**Working with the Marketing Campaigns Email Designs**](/docs/sendgrid/ui/sending-email/working-with-marketing-campaigns-email-designs) for more information.

```json
{
    "scopes": [
        "templates.create",
        "templates.read",
        "templates.update",
        "templates.delete",
        "templates.versions.create",
        "templates.versions.read",
        "templates.versions.update",
        "templates.versions.delete",
        "templates.versions.activate.create",
        "templates.versions.activate.read",
        "templates.versions.activate.update",
        "templates.versions.activate.delete"
    ]
}
```

## Tracking

SendGrid makes it possible to track various activities related to your mail send such as when a recipient opens or clicks a message. The following scopes determine a Teammate's ability to enable and disable tracking settings, as well as view and delete the results of each tracking setting SendGrid provides. See [**Tracking Settings**](/docs/sendgrid/ui/account-and-settings/tracking) for more information.

```json
{
    "scopes": [
        "tracking_settings.read",
        "tracking_settings.click.create",
        "tracking_settings.click.read",
        "tracking_settings.click.update",
        "tracking_settings.click.delete",
        "tracking_settings.subscription.create",
        "tracking_settings.subscription.read",
        "tracking_settings.subscription.update",
        "tracking_settings.subscription.delete",
        "tracking_settings.open.create",
        "tracking_settings.open.read",
        "tracking_settings.open.update",
        "tracking_settings.open.delete",
        "tracking_settings.google_analytics.create",
        "tracking_settings.google_analytics.read",
        "tracking_settings.google_analytics.update",
        "tracking_settings.google_analytics.delete"
    ]
}
```

## User settings

User settings represent the actions a Teammate can take on their own user account such as changing their password and email address. Note that an SSO Teammate may not change their email address because it serves as their username in your identity provider configuration.

```json
{
    "scopes": [
        "user.account.read",
        "user.credits.read",
        "user.email.create",
        "user.email.read",
        "user.email.update",
        "user.email.delete",
        "user.profile.create",
        "user.profile.read",
        "user.profile.update",
        "user.profile.delete",
        "user.password.create",
        "user.password.read",
        "user.password.update",
        "user.password.delete",
        "user.timezone.create",
        "user.timezone.read",
        "user.timezone.update",
        "user.timezone.delete",
        "user.username.create",
        "user.username.read",
        "user.username.update",
        "user.username.delete",
        "user.settings.enforced_tls.read",
        "user.settings.enforced_tls.update",
        "user.multifactor_authentication.create",
        "user.multifactor_authentication.delete",
        "user.multifactor_authentication.read",
        "user.multifactor_authentication.update"
    ]
}
```

Some user scopes are added automatically to a SendGrid Teammate as requirements by SendGrid. These include the requirement to set up a verified sender and enable two-factor authentication. Note that the `2fa_exempt` scope is available for SSO Teammates — two-factor authentication is handled through your identity provider when SSO is configured.

```json
{
    "scopes": [
       "2fa_exempt",
        "2fa_required",
        "sender_verification_eligible",
        "sender_verification_legacy",
        "ui.signup_complete",
        "ui.provision",
        "ui.confirm_email",
        "signup.trigger_confirmation"
    ]
}
```

## Webhook

SendGrid provides two webhooks: the Event Webhook and the Inbound Parse Webhook.

The Event Webhook will make `POST` requests to a URL you specify with event data about your mail send. For example, the Event Webhook can send events such as bounces, clicks, and opens in real-time. See [**Getting Started with the Event Webhook**](/docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook) for more information.

The Inbound Parse webhook process all inbound email for a domain and parses its contents. It will then pass the parsed message contents, including attachments, as `multipart/form-data` to a URL you specify. See [**Setting up the Inbound Parse Webhook**](/docs/sendgrid/for-developers/parsing-email/setting-up-the-inbound-parse-webhook) for more information.

The following scopes determine a Teammate's ability to create, view, modify, and delete either or both of SendGrid's Webhooks.

In the SendGrid UI, you will find the Inbound Parse scopes under **Inbound Parse**. You will find the Event Webhook scopes under **Mail Settings** > **Event Notification**.

```json
{
    "scopes": [
        "user.webhooks.event.settings.create",
        "user.webhooks.event.settings.read",
        "user.webhooks.event.settings.update",
        "user.webhooks.event.settings.delete",
        "user.webhooks.event.test.create",
        "user.webhooks.event.test.read",
        "user.webhooks.event.test.update",
        "user.webhooks.event.test.delete",
        "user.webhooks.parse.settings.create",
        "user.webhooks.parse.settings.read",
        "user.webhooks.parse.settings.update",
        "user.webhooks.parse.settings.delete"
    ]
}

```

## Persona scopes

Personas are groups of permissions that are commonly required by certain types of Teammates working with SendGrid. For example, a developer will likely need access to Mail Send and Event Webhook features. A Marketer may need Marketing Campaigns and Event Webhook permissions. When creating SSO Teammates, you can assign a persona that includes a block of scopes most likely to fit the needs of that Teammate, rather than assign each of your Teammates individual permissions.

We currently provide four SSO Teammate personas: Accountant, Developer, Marketer, and Observer. You can see which scopes are assigned to each below.

## Accountant

```json
{
    "scopes": [
        "billing.create",
        "billing.read",
        "billing.update",
        "billing.delete",
        "mail_settings.read",
        "partner_settings.read",
        "tracking_settings.read",
        "stats.read",
        "stats.global.read",
        "categories.stats.read",
        "categories.stats.sums.read",
        "devices.stats.read",
        "clients.stats.read",
        "clients.phone.stats.read",
        "clients.tablet.stats.read",
        "clients.webmail.stats.read",
        "clients.desktop.stats.read",
        "geo.stats.read",
        "mailbox_providers.stats.read",
        "browsers.stats.read",
        "subusers.stats.read",
        "subusers.stats.sums.read",
        "subusers.stats.monthly.read",
        "user.webhooks.parse.stats.read",
        "user.account.read",
        "user.credits.read",
        "user.email.read",
        "user.profile.read",
        "user.profile.update",
        "user.timezone.read",
        "user.username.read",
        "user.settings.enforced_tls.read",
        "categories.read",
        "sender_verification_eligible",
        "sender_verification_legacy",
        "2fa_exempt",
        "2fa_required"
    ]
}
```

## Developer

```json
{
    "scopes": [
        "alerts.create",
        "alerts.read",
        "alerts.update",
        "alerts.delete",
        "asm.groups.create",
        "asm.groups.read",
        "asm.groups.update",
        "asm.groups.delete",
        "ips.warmup.create",
        "ips.warmup.read",
        "ips.warmup.update",
        "ips.warmup.delete",
        "ips.pools.create",
        "ips.pools.read",
        "ips.pools.update",
        "ips.pools.delete",
        "ips.pools.ips.create",
        "ips.pools.ips.read",
        "ips.pools.ips.update",
        "ips.pools.ips.delete",
        "ips.assigned.read",
        "ips.create",
        "ips.read",
        "ips.update",
        "ips.delete",
        "mail.send",
        "mail_settings.read",
        "mail_settings.bcc.read",
        "mail_settings.bcc.update",
        "mail_settings.address_whitelist.read",
        "mail_settings.address_whitelist.update",
        "mail_settings.footer.read",
        "mail_settings.footer.update",
        "mail_settings.forward_spam.read",
        "mail_settings.forward_spam.update",
        "mail_settings.plain_content.read",
        "mail_settings.plain_content.update",
        "mail_settings.spam_check.read",
        "mail_settings.spam_check.update",
        "mail_settings.bounce_purge.read",
        "mail_settings.bounce_purge.update",
        "mail_settings.forward_bounce.read",
        "mail_settings.forward_bounce.update",
        "partner_settings.read",
        "tracking_settings.read",
        "tracking_settings.click.read",
        "tracking_settings.click.update",
        "tracking_settings.subscription.read",
        "tracking_settings.subscription.update",
        "tracking_settings.open.read",
        "tracking_settings.open.update",
        "tracking_settings.google_analytics.read",
        "tracking_settings.google_analytics.update",
        "user.webhooks.event.settings.read",
        "user.webhooks.event.settings.update",
        "user.webhooks.event.test.create",
        "user.webhooks.event.test.read",
        "user.webhooks.event.test.update",
        "user.webhooks.parse.settings.create",
        "user.webhooks.parse.settings.read",
        "user.webhooks.parse.settings.update",
        "user.webhooks.parse.settings.delete",
        "stats.read",
        "stats.global.read",
        "categories.stats.read",
        "categories.stats.sums.read",
        "devices.stats.read",
        "clients.stats.read",
        "clients.phone.stats.read",
        "clients.tablet.stats.read",
        "clients.webmail.stats.read",
        "clients.desktop.stats.read",
        "geo.stats.read",
        "mailbox_providers.stats.read",
        "browsers.stats.read",
        "subusers.stats.read",
        "subusers.stats.sums.read",
        "subusers.stats.monthly.read",
        "user.webhooks.parse.stats.read",
        "templates.create",
        "templates.read",
        "templates.update",
        "templates.delete",
        "templates.versions.create",
        "templates.versions.read",
        "templates.versions.update",
        "templates.versions.delete",
        "templates.versions.activate.create",
        "user.account.read",
        "user.credits.read",
        "user.email.read",
        "user.profile.read",
        "user.profile.update",
        "user.timezone.read",
        "user.username.read",
        "user.settings.enforced_tls.read",
        "api_keys.create",
        "api_keys.read",
        "api_keys.update",
        "api_keys.delete",
        "categories.create",
        "categories.read",
        "categories.update",
        "categories.delete",
        "mail_settings.template.read",
        "mail_settings.template.update",
        "marketing_campaigns.create",
        "marketing_campaigns.read",
        "marketing_campaigns.update",
        "marketing_campaigns.delete",
        "mail.batch.create",
        "mail.batch.read",
        "mail.batch.update",
        "mail.batch.delete",
        "user.scheduled_sends.create",
        "user.scheduled_sends.read",
        "user.scheduled_sends.update",
        "user.scheduled_sends.delete",
        "access_settings.whitelist.create",
        "access_settings.whitelist.read",
        "access_settings.whitelist.update",
        "access_settings.whitelist.delete",
        "access_settings.activity.read",
        "suppression.create",
        "suppression.read",
        "suppression.update",
        "suppression.delete",
        "email_testing.read",
        "email_testing.write",
        "sender_verification_eligible",
        "sender_verification_legacy",
        "2fa_exempt",
        "2fa_required"
    ]
}
```

## Marketer

```json
{
    "scopes": [
        "alerts.create",
        "alerts.read",
        "alerts.update",
        "alerts.delete",
        "asm.groups.create",
        "asm.groups.read",
        "asm.groups.update",
        "asm.groups.delete",
        "mail_settings.read",
        "mail_settings.spam_check.read",
        "mail_settings.spam_check.update",
        "partner_settings.read",
        "tracking_settings.read",
        "tracking_settings.click.read",
        "tracking_settings.click.update",
        "tracking_settings.subscription.read",
        "tracking_settings.subscription.update",
        "tracking_settings.open.read",
        "tracking_settings.open.update",
        "tracking_settings.google_analytics.read",
        "tracking_settings.google_analytics.update",
        "stats.global.read",
        "categories.stats.read",
        "categories.stats.sums.read",
        "devices.stats.read",
        "clients.stats.read",
        "clients.phone.stats.read",
        "clients.tablet.stats.read",
        "clients.webmail.stats.read",
        "clients.desktop.stats.read",
        "geo.stats.read",
        "mailbox_providers.stats.read",
        "browsers.stats.read",
        "subusers.stats.read",
        "subusers.stats.sums.read",
        "subusers.stats.monthly.read",
        "user.webhooks.parse.stats.read",
        "templates.create",
        "templates.read",
        "templates.update",
        "templates.delete",
        "templates.versions.create",
        "templates.versions.read",
        "templates.versions.update",
        "templates.versions.delete",
        "templates.versions.activate.create",
        "user.account.read",
        "user.credits.read",
        "user.email.read",
        "user.profile.read",
        "user.profile.update",
        "user.timezone.read",
        "user.username.read",
        "user.settings.enforced_tls.read",
        "categories.read",
        "marketing_campaigns.create",
        "marketing_campaigns.read",
        "marketing_campaigns.update",
        "marketing_campaigns.delete",
        "mail.batch.read",
        "user.scheduled_sends.read",
        "suppression.create",
        "suppression.read",
        "suppression.update",
        "suppression.delete",
        "email_testing.read",
        "email_testing.write",
        "sender_verification_eligible",
        "sender_verification_legacy",
        "2fa_exempt",
        "2fa_required"
    ]
}
```

## Observer

```json
{
    "scopes": [
        "alerts.read",
        "asm.groups.read",
        "billing.read",
        "ips.warmup.read",
        "ips.pools.read",
        "ips.pools.ips.read",
        "ips.assigned.read",
        "ips.read",
        "mail_settings.read",
        "mail_settings.bcc.read",
        "mail_settings.address_whitelist.read",
        "mail_settings.footer.read",
        "mail_settings.forward_spam.read",
        "mail_settings.plain_content.read",
        "mail_settings.spam_check.read",
        "mail_settings.bounce_purge.update",
        "mail_settings.forward_bounce.read",
        "partner_settings.read",
        "partner_settings.new_relic.read",
        "partner_settings.sendwithus.read",
        "tracking_settings.read",
        "tracking_settings.click.read",
        "tracking_settings.subscription.read",
        "tracking_settings.open.read",
        "tracking_settings.google_analytics.read",
        "user.webhooks.event.settings.read",
        "user.webhooks.event.test.read",
        "user.webhooks.parse.settings.read",
        "stats.read",
        "stats.global.read",
        "categories.stats.read",
        "categories.stats.sums.read",
        "devices.stats.read",
        "clients.stats.read",
        "clients.phone.stats.read",
        "clients.tablet.stats.read",
        "clients.webmail.stats.read",
        "clients.desktop.stats.read",
        "geo.stats.read",
        "mailbox_providers.stats.read",
        "browsers.stats.read",
        "subusers.stats.read",
        "subusers.stats.sums.read",
        "subusers.stats.monthly.read",
        "user.webhooks.parse.stats.read",
        "subusers.read",
        "subusers.monitor.read",
        "subusers.credits.read",
        "subusers.credits.remaining.read",
        "subusers.reputations.read",
        "subusers.summary.read",
        "templates.read",
        "templates.versions.read",
        "user.account.read",
        "user.credits.read",
        "user.email.read",
        "user.profile.read",
        "user.profile.update",
        "user.timezone.read",
        "user.username.read",
        "user.settings.enforced_tls.read",
        "api_keys.read",
        "categories.read",
        "mail_settings.template.read",
        "mail.batch.read",
        "user.scheduled_sends.read",
        "access_settings.whitelist.read",
        "access_settings.activity.read",
        "suppression.read",
        "messages.read",
        "email_testing.read",
        "sender_verification_eligible",
        "sender_verification_legacy",
        "2fa_exempt",
        "2fa_required"
    ]
}
```

## Administrator scopes

Below is a complete list of every permission that is given to an admin Teammate.

```json
{
    "scopes": [
        "alerts.create",
        "alerts.read",
        "alerts.update",
        "alerts.delete",
        "asm.groups.create",
        "asm.groups.read",
        "asm.groups.update",
        "asm.groups.delete",
        "asm.groups.suppressions.create",
        "asm.groups.suppressions.read",
        "asm.groups.suppressions.update",
        "asm.groups.suppressions.delete",
        "asm.suppressions.global.create",
        "asm.suppressions.global.read",
        "asm.suppressions.global.update",
        "asm.suppressions.global.delete",
        "billing.create",
        "billing.read",
        "billing.update",
        "billing.delete",
        "ui.confirm_email",
        "signup.trigger_confirmation",
        "ui.provision",
        "ips.warmup.create",
        "ips.warmup.read",
        "ips.warmup.update",
        "ips.warmup.delete",
        "ips.pools.create",
        "ips.pools.read",
        "ips.pools.update",
        "ips.pools.delete",
        "ips.pools.ips.create",
        "ips.pools.ips.read",
        "ips.pools.ips.update",
        "ips.pools.ips.delete",
        "ips.assigned.read",
        "ips.create",
        "ips.read",
        "ips.update",
        "ips.delete",
        "mail.send",
        "mail_settings.read",
        "mail_settings.bcc.create",
        "mail_settings.bcc.read",
        "mail_settings.bcc.update",
        "mail_settings.bcc.delete",
        "mail_settings.address_whitelist.create",
        "mail_settings.address_whitelist.read",
        "mail_settings.address_whitelist.update",
        "mail_settings.address_whitelist.delete",
        "mail_settings.footer.create",
        "mail_settings.footer.read",
        "mail_settings.footer.update",
        "mail_settings.footer.delete",
        "mail_settings.forward_spam.create",
        "mail_settings.forward_spam.read",
        "mail_settings.forward_spam.update",
        "mail_settings.forward_spam.delete",
        "mail_settings.plain_content.create",
        "mail_settings.plain_content.read",
        "mail_settings.plain_content.update",
        "mail_settings.plain_content.delete",
        "mail_settings.spam_check.create",
        "mail_settings.spam_check.read",
        "mail_settings.spam_check.update",
        "mail_settings.spam_check.delete",
        "mail_settings.bounce_purge.create",
        "mail_settings.bounce_purge.read",
        "mail_settings.bounce_purge.update",
        "mail_settings.bounce_purge.delete",
        "mail_settings.forward_bounce.create",
        "mail_settings.forward_bounce.read",
        "mail_settings.forward_bounce.update",
        "mail_settings.forward_bounce.delete",
        "partner_settings.read",
        "partner_settings.new_relic.create",
        "partner_settings.new_relic.read",
        "partner_settings.new_relic.update",
        "partner_settings.new_relic.delete",
        "partner_settings.sendwithus.create",
        "partner_settings.sendwithus.read",
        "partner_settings.sendwithus.update",
        "partner_settings.sendwithus.delete",
        "tracking_settings.read",
        "tracking_settings.click.create",
        "tracking_settings.click.read",
        "tracking_settings.click.update",
        "tracking_settings.click.delete",
        "tracking_settings.subscription.create",
        "tracking_settings.subscription.read",
        "tracking_settings.subscription.update",
        "tracking_settings.subscription.delete",
        "tracking_settings.open.create",
        "tracking_settings.open.read",
        "tracking_settings.open.update",
        "tracking_settings.open.delete",
        "tracking_settings.google_analytics.create",
        "tracking_settings.google_analytics.read",
        "tracking_settings.google_analytics.update",
        "tracking_settings.google_analytics.delete",
        "user.webhooks.event.settings.create",
        "user.webhooks.event.settings.read",
        "user.webhooks.event.settings.update",
        "user.webhooks.event.settings.delete",
        "user.webhooks.event.test.create",
        "user.webhooks.event.test.read",
        "user.webhooks.event.test.update",
        "user.webhooks.event.test.delete",
        "user.webhooks.parse.settings.create",
        "user.webhooks.parse.settings.read",
        "user.webhooks.parse.settings.update",
        "user.webhooks.parse.settings.delete",
        "stats.read",
        "stats.global.read",
        "categories.stats.read",
        "categories.stats.sums.read",
        "devices.stats.read",
        "clients.stats.read",
        "clients.phone.stats.read",
        "clients.tablet.stats.read",
        "clients.webmail.stats.read",
        "clients.desktop.stats.read",
        "geo.stats.read",
        "mailbox_providers.stats.read",
        "browsers.stats.read",
        "subusers.stats.read",
        "subusers.stats.sums.read",
        "subusers.stats.monthly.read",
        "user.webhooks.parse.stats.read",
        "subusers.create",
        "subusers.read",
        "subusers.update",
        "subusers.delete",
        "subusers.monitor.create",
        "subusers.monitor.read",
        "subusers.monitor.update",
        "subusers.monitor.delete",
        "subusers.credits.create",
        "subusers.credits.read",
        "subusers.credits.update",
        "subusers.credits.delete",
        "subusers.credits.remaining.create",
        "subusers.credits.remaining.read",
        "subusers.credits.remaining.update",
        "subusers.credits.remaining.delete",
        "subusers.reputations.read",
        "subusers.summary.read",
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
        "suppression.unsubscribes.delete",
        "templates.create",
        "templates.read",
        "templates.update",
        "templates.delete",
        "templates.versions.create",
        "templates.versions.read",
        "templates.versions.update",
        "templates.versions.delete",
        "templates.versions.activate.create",
        "templates.versions.activate.read",
        "templates.versions.activate.update",
        "templates.versions.activate.delete",
        "user.account.read",
        "user.credits.read",
        "user.email.create",
        "user.email.read",
        "user.email.update",
        "user.email.delete",
        "user.profile.create",
        "user.profile.read",
        "user.profile.update",
        "user.profile.delete",
        "user.password.create",
        "user.password.read",
        "user.password.update",
        "user.password.delete",
        "user.timezone.create",
        "user.timezone.read",
        "user.timezone.update",
        "user.timezone.delete",
        "user.username.create",
        "user.username.read",
        "user.username.update",
        "user.username.delete",
        "user.settings.enforced_tls.read",
        "user.settings.enforced_tls.update",
        "api_keys.create",
        "api_keys.read",
        "api_keys.update",
        "api_keys.delete",
        "credentials.create",
        "credentials.read",
        "credentials.update",
        "credentials.delete",
        "categories.create",
        "categories.read",
        "categories.update",
        "categories.delete",
        "mail_settings.template.create",
        "mail_settings.template.read",
        "mail_settings.template.update",
        "mail_settings.template.delete",
        "user.multifactor_authentication.create",
        "user.multifactor_authentication.read",
        "user.multifactor_authentication.update",
        "user.multifactor_authentication.delete",
        "newsletter.create",
        "newsletter.read",
        "newsletter.update",
        "newsletter.delete",
        "marketing_campaigns.create",
        "marketing_campaigns.read",
        "marketing_campaigns.update",
        "marketing_campaigns.delete",
        "ui.signup_complete",
        "mail.batch.create",
        "mail.batch.read",
        "mail.batch.update",
        "mail.batch.delete",
        "user.scheduled_sends.create",
        "user.scheduled_sends.read",
        "user.scheduled_sends.update",
        "user.scheduled_sends.delete",
        "access_settings.whitelist.create",
        "access_settings.whitelist.read",
        "access_settings.whitelist.update",
        "access_settings.whitelist.delete",
        "access_settings.activity.read",
        "whitelabel.create",
        "whitelabel.read",
        "whitelabel.update",
        "whitelabel.delete",
        "suppression.create",
        "suppression.read",
        "suppression.update",
        "suppression.delete",
        "teammates.create",
        "teammates.read",
        "teammates.update",
        "teammates.delete",
        "messages.read",
        "validations.email.read",
        "validations.email.create",
        "marketing.read",
        "marketing.automation.read",
        "design_library.read",
        "design_library.create",
        "design_library.update",
        "design_library.delete",
        "email_testing.read",
        "email_testing.write",
        "sender_verification_eligible",
        "sso.settings.create",
        "sso.settings.read",
        "sso.settings.update",
        "sso.settings.delete",
        "sender_verification_legacy",
        "sso.teammates.create",
        "sso.teammates.update",
        "2fa_required",
        "di.bounce_block_classification.read"
    ]
}
```
