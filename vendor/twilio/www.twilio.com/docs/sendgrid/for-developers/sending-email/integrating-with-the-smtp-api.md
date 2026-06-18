# Integrating with the SMTP API

## Integrating with SendGrid

*To integrate with SendGrid's SMTP API:*

1. [Create an API Key](https://app.sendgrid.com/settings/api_keys) with at least "Mail" permissions.
2. Set the server host in your email client or application to `smtp.sendgrid.net`. This setting is sometimes referred to as the *external SMTP server* or the *SMTP relay*.
3. Set your username to the string `apikey`. This setting is the exact string "apikey" and not the API key itself.
4. Set your password to the API key generated in step one.
5. Set the port to `587` (or as specified below).

> \[!NOTE]
>
> When submitting base64 encoded API key values, be sure you have not included any newline or whitespace characters by accident. This can happen when copying the encoded key from an environment that line wraps output. SMTP is a line-oriented protocol, and linefeed characters will prevent you from authenticating successfully.

### SMTP ports

* For an unencrypted or a [TLS connection](/docs/sendgrid/ui/sending-email/ssl-vs-tls/), use port `25`, `2525`, or `587`.
* For a [SSL connection](/docs/sendgrid/ui/sending-email/tls/), use port `465`.

> \[!NOTE]
>
> If you are unsure which port to use, a TLS connection on port 587 is typically recommended. To better understand the difference between ports 465 and 587, see the Twilio SendGrid blog post, ["What's the Difference Between Ports 465 and 587"](https://sendgrid.com/blog/whats-the-difference-between-ports-465-and-587).

### Build SMTP email

Now that you've successfully integrated with SendGrid, learn to [build SMTP email](/docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header/).

### Rate limits

When using SMTP to send emails through SendGrid, it's essential to be aware of the following rate limits:

* You may send up to **5k messages per SMTP connection**.
* You may open up to **10k concurrent connections from a single server**.

### Setting your server host

SendGrid recommends setting your server host to `smtp.sendgrid.net`, and not directly pointing to SendGrid IP addresses. SendGrid IP addresses occasionally change without notice and hardcoding IP addresses, especially without a way to regularly check for updates, can cause integrations to break.

## Additional resources

* [Sending email](/docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns/)
* [Getting Started with the API](/docs/sendgrid/api-reference/)
* [SMTP Service Crash Course](https://sendgrid.com/blog/smtp-service-crash-course/)
* [Getting Started with the SMTP API](/docs/sendgrid/for-developers/sending-email/getting-started-smtp/)
* [Building an SMTP Email](/docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header/)
