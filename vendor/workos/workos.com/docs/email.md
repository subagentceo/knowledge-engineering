# Email delivery

## Introduction

Many WorkOS features rely on your users receiving and acting upon email. For example, this includes invitations to join your app, password reset links, or Magic Auth sign-in. Prompt delivery of these emails is crucial.

WorkOS offers three options for sending email:

- **WorkOS email domain:** WorkOS sends email from the `workos-mail.com` domain.
- **Your email domain:** WorkOS sends email from your own email domain.
- **Send your own email:** WorkOS emits events, allowing your app to listen to these events and send email using your own email provider.

These options provide different trade-offs between convenience, customization, and control over email deliverability.

WorkOS follows industry best practices when sending email. SPF and DKIM email authentication records are configured automatically, the email content is continually refined to ensure it passes spam filters, and delivery of every email is actively monitored. However, regardless of the option you chose for sending email to your users, there are additional steps you can take to ensure that it reaches user inboxes.

***

## (A) WorkOS email domain

By default WorkOS will send the following emails from the `workos-mail.com` domain in production environments.

| Email              | Sent From               | Purpose                                |
| ------------------ | :---------------------- | :------------------------------------- |
| Invitation         | welcome@workos-mail.com | Invite a user to create an account     |
| Magic Auth         | access@workos-mail.com  | Allow sign in with a one-time-use code |
| Email verification | welcome@workos-mail.com | Verify ownership of a given email      |
| Password reset     | access@workos-mail.com  | Support the password reset flow        |

WorkOS has configured SPF, DKIM and DMARC email authentication records for the `workos-mail.com` domain. These records prove to the receiving mail server that a given email comes from WorkOS.

We actively monitor the delivery of email sent from the `workos-mail.com` domain to protect the domain's reputation. If we detect unusually high rates of undelivered mail or mail marked as spam from a WorkOS team account, we may suspend that team's ability to send email.

### Do not send unsolicited email

To ensure email is delivered when using the WorkOS email domain, be sure not to allow unsolicited email to be sent on your behalf. For example, an invitation email should be sent only if a user explicitly requests access to your application for themselves or another user. Do not attempt to bulk invite users from an email marketing list.

### Use appropriate team and organization names

It is also important to ensure that your WorkOS team account and all organizations under your team have appropriate names that avoid [common spam words](https://mailtrap.io/blog/email-spam-words/) that may trigger spam filters. While our static email content is thoroughly tested, WorkOS emails can include your team name as well as the names of organizations under your team. There may be an impact to email deliverability if these names use terms often flagged by spam filters.

***

## (B) Your email domain

While using the WorkOS email domain option is convenient, you can provide your users a better experience. Using your own email domain means that your users will receive emails from a domain they recognize, one associated with your app. In addition, because you control the email domain, you have more control over the domain reputation and therefore more control over email deliverability.

You can configure your own email domain in the [WorkOS dashboard](https://dashboard.workos.com). You will need to verify ownership of the domain by setting up a CNAME record with your domain provider. Two additional CNAME records are required to automatically configure SPF and DKIM email authentication using [SendGrid's automated security feature](https://support.sendgrid.com/hc/en-us/articles/21415314709147-Email-Authentication-SendGrid-s-Automated-Security-Explained).

![Configuring your email domain](https://images.workoscdn.com/images/84e47c58-e5e5-47c3-8245-f414a203f284.png?auto=format\&fit=clip\&q=50)

In addition to not sending unsolicited emails and using appropriate team and organization names, when using your own email domain there are a few additional steps you can take to ensure email is delivered promptly.

### Set up inboxes

When using your own domain, email will be sent from `welcome@<your domain>` and `access@<your domain>`. Email providers check if there are inboxes associated with sender addresses, so setting up inboxes for both the `welcome` and `access` email addresses on your domain can help ensure your emails reach users.

### Set up DMARC

WorkOS recommends that you set up DMARC (Domain-based Message Authentication, Reporting & Conformance) with your domain provider. Google has released [guidelines](https://support.google.com/a/answer/81126?visit_id=638529785140327067-2643207201\&rd=1#zippy=%2Crequirements-for-all-senders%2Crequirements-for-sending-or-more-messages-per-day) for email senders and the guidelines include DMARC requirements. Apple and Yahoo have released similar best practice guides.

A DMARC policy tells a receiving mail server what to do when a message from your domain doesn’t pass DMARC authentication. Configuring DMARC requires setting up a DNS TXT record with your domain provider.

Here is an example DMARC record that will reject all emails not legitimately sent by an email provider on your behalf:

```plaintext
TXT Record

name:
_dmarc<.example.com>

content:
v=DMARC1; p=reject; rua=mailto:postmaster@example.com, mailto:dmarc@example.com; pct=100; adkim=s; aspf=s
```

More details about DMARC can be found at [dmarc.org](https://dmarc.org/overview/).

***

## (C) Connect your own email provider to WorkOS

By connecting your own email provider to WorkOS, you get control over deliverability, reputation, and compliance, while still offloading the heavy lifting of email handling. This option also allows you to easily utilize an existing email service provider configuration.

For complete instructions on configuring a custom email provider, see the [custom email providers section](https://workos.com/docs/authkit/custom-email-providers).

***

## (D) Send your own email

There are a number of reasons why you may want to send email using your own email provider. Perhaps you already send a welcome email to new users and want to include an invitation link instead of sending a second email. Perhaps you already track sent email status with your own email provider and want a unified view into the status of all emails associated with your app. Regardless, when you send your own email, you have complete control over email deliverability.

For complete instructions on sending your own email, see the section on [custom emails](https://workos.com/docs/authkit/custom-emails) in the AuthKit documentation.

When sending your own email, you will want to follow the all of the recommendations in Google's [email sender guidelines](https://support.google.com/a/answer/81126?hl=en). This includes setting up SPF, DKIM and DMARC email authentication.

You will also need to be conscious of your sender reputation. It's based on the quality of emails, their frequency, and user interaction. A good sender reputation can increase the chances of your emails reaching inboxes. SendGrid provides some [useful tips for improving sender reputation](https://sendgrid.com/en-us/blog/email-reputation-101-ip-reputation-vs-domain-reputation).

If you author your own email content, you may want to test your emails against various email providers' spam filters. There are a number of spam testing services available such as [Litmus](https://www.litmus.com/email-testing) and [Warmly](https://www.warmy.io/free-tools/email-deliverability-test/).

***

## (E) Check suppression status

Email providers maintain suppression lists: addresses that previously bounced, were marked as spam, or were flagged as invalid. Once suppressed, WorkOS will not attempt to deliver emails to that address.

### Suppression types

- **Bounce**: The email hard-bounced because the address doesn't exist.
- **Spam complaint**: The recipient marked the email as spam.
- **Block**: The email provider blocked delivery.
- **Invalid**: The email address is malformed.

### Checking and removing suppressions

In the [WorkOS Dashboard](https://dashboard.workos.com/), navigate to the **Users → \[User] → Emails** tab. The suppression status is shown for the user's email address. If suppressed, you can click "Re-enable email" to remove the suppression.

Before removing a suppression, confirm:

- The recipient wants to receive emails.
- The mailbox is not full and can receive mail.
- The email address is valid and not malformed.

> **Note:** Removing a suppression for an address that continues to bounce will harm your
> domain's sender reputation.

Suppression management is available when using the default WorkOS email provider or a [custom email provider](https://workos.com/docs/authkit/custom-email-providers).

> **Note:** Resend is not currently supported for suppression management. If you use
> Resend as your custom email provider, manage suppressions directly in the
> Resend dashboard.

***

## Troubleshooting

Even when following industry best practices, an email may get filtered as spam and not reach a user's inbox. Other times an email might be delayed, for example, when [Enhanced Pre-delivery Message Scanning](https://apps.google.com/supportwidget/articlehome?hl=en\&article_url=https%3A%2F%2Fsupport.google.com%2Fa%2Fanswer%2F7380368%3Fhl%3Den\&product_context=7380368\&product_name=UnuFlow\&trigger_context=a) is enabled on a Google workspace or when a similar feature is enabled with other email providers. Email providers do not explain the heuristics used by their spam filters and security mechanisms, and they are often changing, making it especially frustrating to troubleshoot problems.

The first step in troubleshooting is to determine if the problem exists for all users or only a subset of users. Generally, this will provide insight into the nature of the issue and how best to resolve it. If the issue exists for all users, it is most likely a matter of poor domain reputation. If the issue only exists for a subset of users, it may be because of specific settings used by an email provider or the IT department at a given organization.

Both Google and Microsoft have been noted as being especially aggressive when identifying spam. However, both companies provide some tooling to help you debug email deliverability problems. Google offers [Postmaster Tools](https://www.gmail.com/postmaster/) to help with email deliverability related to Gmail and Google Workspaces. Microsoft offers similar tools with [Sender Support](https://sendersupport.olc.protection.outlook.com/pm/). Lastly, more general spam testing services such as [Litmus](https://www.litmus.com/email-testing) and [Warmly](https://www.warmy.io/free-tools/email-deliverability-test/) are available.

If you continue to have issues regarding email deliverability despite following all of the above suggestions, please [contact support](mailto:support@workos.com).
