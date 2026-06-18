# Custom Email Providers

## Introduction

By default, WorkOS will send emails via our default email service provider, either through our domain or through your own [custom email domain](https://workos.com/docs/custom-domains/email). If you would like to have more control over deliverability, reputation, and compliance, while still offloading the heavy lifting of email handling, you can configure a custom email provider. This option is also ideal if you already have an existing email service provider configuration.

***

## Configure a custom email provider

To configure a custom email provider for an environment, navigate to [*Emails* → *Providers*](https://dashboard.workos.com/environment/emails/providers) and click *Enable* next to the provider you would like to use and enter the required information.

> If the email service provider you'd like to use is not listed, please [contact support](mailto:support@workos.com).

![A screenshot showing the WorkOS Dashboard email providers page](https://images.workoscdn.com/images/660bd317-6240-40ce-8cb7-d80dccac294a.png?auto=format\&fit=clip\&q=80)

### Amazon SES

To connect WorkOS to Amazon SES, you'll need to [create an IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) with an access key, and [verify email sending identities](https://docs.aws.amazon.com/ses/latest/dg/creating-identities.html). Ensure the IAM user has a policy like the following:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "SendEmailAccess",
      "Effect": "Allow",
      "Action": "ses:SendEmail",
      "Resource": [
        "arn:aws:ses:<region>:<accountId>:identity/*",
        "arn:aws:ses:<region>:<accountId>:configuration-set/*"
      ]
    },
    {
      "Sid": "IdentityManagementAccess",
      "Effect": "Allow",
      "Action": ["ses:GetIdentityVerificationAttributes", "ses:ListIdentities"],
      "Resource": "*"
    }
  ]
}
```

You'll need to update the resource scope with your Amazon SES region and account ID. For additional ways to restrict access, refer to the [Amazon SES documentation](https://docs.aws.amazon.com/ses/latest/dg/control-user-access.html).

> If you're interested in using temporary security credentials to access Amazon SES, please [contact support](mailto:support@workos.com).

Once you have an IAM user with the necessary permissions and have verified sending identities, you can configure the Amazon SES custom email provider in the [WorkOS Dashboard](https://dashboard.workos.com/):

![A screenshot showing the WorkOS Dashboard Amazon SES custom email provider configuration](https://images.workoscdn.com/images/4df55e43-d68c-410c-9452-32978e0ca874.png?auto=format\&fit=clip\&q=50)

### Mailgun

Before configuring the Mailgun custom email provider in WorkOS, you'll need to [verify your domain in your Mailgun account](https://help.mailgun.com/hc/en-us/articles/32884700912923-Domain-Verification-Setup-Guide).

Once you've verified a domain, you'll need an API key, which you can create on the [API Security page of the Mailgun dashboard](https://app.mailgun.com/settings/api_security). The API key is used to validate verified domains in your account and send emails.

![A screenshot showing the Mailgun API Security page](https://images.workoscdn.com/images/fc6d06dd-790e-419e-ba0d-5a1783e8748d.png?auto=format\&fit=clip\&q=80)

Once you've verified your domain and obtained an API key, you can configure the Mailgun custom email provider in the [WorkOS Dashboard](https://dashboard.workos.com/):

![A screenshot showing the Mailgun custom email provider configuration](https://images.workoscdn.com/images/5e287a26-7851-49f5-95b5-bc74ab58b506.png?auto=format\&fit=clip\&q=80)

### Postmark

Before configuring the Postmark custom email provider in WorkOS, you'll need to [verify sender signatures in your Postmark account](https://postmarkapp.com/developer/user-guide/managing-your-account/managing-sender-signatures).

Once you've verified a sender signature, you'll need an account and server token, which you can find on the [API Tokens page of the Postmark dashboard](https://postmarkapp.com/account/api-tokens).

![A screenshot showing the Postmark API Tokens page](https://images.workoscdn.com/images/e441ca41-2768-4887-83f1-8f298ab25847.png?auto=format\&fit=clip\&q=50)

The account token is used to validate sender signatures in your account, and the server token is used to send emails.

Once you've verified your sender signature and obtained your account and server token, you can configure the Postmark custom email provider in the [WorkOS Dashboard](https://dashboard.workos.com/):

![A screenshot showing the Postmark custom email provider configuration](https://images.workoscdn.com/images/21f94d07-b661-4a24-9e2b-940cd0bbfdaa.png?auto=format\&fit=clip\&q=50)

Upon enabling the Postmark custom email provider, a WorkOS transactional message stream with the ID `workos-transactional-s` will be created for you. All WorkOS emails will be sent using this message stream.

### Resend

Before configuring the Resend custom email provider in WorkOS, you'll need to [verify domains in your Resend account](https://resend.com/docs/dashboard/domains/introduction).

Once you've verified your domain, you'll need to create an API key with the "Full access" permission on the [Resend API Keys page](https://resend.com/api-keys).

![A screenshot showing creating an API key in the Resend dashboard](https://images.workoscdn.com/images/ce0ae76c-7ab4-4506-9e48-78a61243a42d.png?auto=format\&fit=clip\&q=50)

"Full access" permission is required to fetch verified domains and send emails.

Once you've verified your domain and obtained an API key, you can configure the Resend custom email provider in the [WorkOS Dashboard](https://dashboard.workos.com/):

![A screenshot showing the Resend custom email provider configuration](https://images.workoscdn.com/images/25efadf6-405f-416b-aaa0-7e7fb266034a.png?auto=format\&fit=clip\&q=50)

### SendGrid

Before configuring the SendGrid custom email provider in WorkOS, you'll need to verify your domain in the [Sender Authentication settings in your SendGrid dashboard](https://app.sendgrid.com/settings/sender_auth).

Once you've verified your domain, you'll need to create an API key under *Settings* → *API Keys* in the [SendGrid dashboard](https://app.sendgrid.com/settings/api_keys).

![A screenshot showing the SendGrid API Keys side panel](https://images.workoscdn.com/images/61bf31b4-0e7f-4616-988f-69319d542866.png?auto=format\&fit=clip\&q=50)

For API key permissions, select "Full Access" for Mail Send, and "Read Access" for Sender Authentication.

Once you've verified your domain and obtained an API key, you can configure the SendGrid custom email provider in the [WorkOS Dashboard](https://dashboard.workos.com/):

![A screenshot showing the SendGrid custom email provider configuration](https://images.workoscdn.com/images/4502c8ad-2bdf-481b-82a7-0d8829032da4.png?auto=format\&fit=clip\&q=50)

***

## Re-enable the WorkOS default provider

At any time when you are using a custom email provider, you can re-enable the WorkOS default provider by navigating to [*Emails* → *Providers*](https://dashboard.workos.com/environment/emails/providers) and clicking *Enable* next to the WorkOS provider.

![A screenshot showing re-enabling the WorkOS default provider](https://images.workoscdn.com/images/7b4f4713-3381-49aa-b77c-679c9698b429.png?auto=format\&fit=clip\&q=80)

Alternatively, you can also remove your current custom email provider, which will automatically re-enable the WorkOS default provider.

![A screenshot showing removing a custom email provider](https://images.workoscdn.com/images/7b4f4713-3381-49aa-b77c-679c9698b429.png?auto=format\&fit=clip\&q=80)

***

## Frequently asked questions

### What types of emails are sent through custom email providers?

All transactional emails for your users will be sent through your custom email provider when configured. This includes AuthKit invitations and magic codes, Radar challenges, and Admin Portal notification emails.

### If I am using a custom email provider, do I need to set up a custom email domain in WorkOS?

No. When using a custom email provider, you configure the sending domain in that provider, not in WorkOS. Any custom email domain set up in WorkOS will not be used.

### What happens if emails fail to send via my custom email provider?

If emails fail to send via your custom email provider, you will be notified according to your notifications preferences via the [WorkOS Dashboard](https://dashboard.workos.com/), email, or Slack. You can also utilize the [*Emails* → *Events* page](https://dashboard.workos.com/environment/emails/events) in the WorkOS Dashboard to track email delivery failures.

Additionally, repeated delivery failures may cause the provider to suppress the recipient's email address. See [Check suppression status](https://workos.com/docs/email/e-check-suppression-status) for how to check and resolve suppressions.
