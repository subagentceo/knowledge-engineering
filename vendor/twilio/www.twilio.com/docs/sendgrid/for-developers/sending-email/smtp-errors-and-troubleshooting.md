# SMTP Errors and Troubleshooting

## Response codes

Each SMTP request made returns a numerical response from the recipient server.

* `2xx` responses indicate success.
* `4xx` responses indicate temporary failures. These are usually treated as deferrals and will be retried for up to 72 hours.
* `5xx` responses indicate permanent failures. These are generally not retried.

The following table covers possible response codes with example errors and a general explanation of that sort of response.

| Error | Message                                                                                                                                                                  | Explanation                                                                                                                                                                                                                                                                                                                                                                    |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 250   | `Queued mail for delivery`                                                                                                                                               | The recipient server has accepted your email message.                                                                                                                                                                                                                                                                                                                          |
| 403   | `You are not authorized to send from that email address`                                                                                                                 | This means the "from" address does not match a verified Sender Identity. Mail cannot be sent until this error is resolved. To learn how to resolve this error, see our [Sender Identity requirements](/docs/sendgrid/for-developers/sending-email/sender-identity/).                                                                                                           |
| 421   | `Message from (X.X.X.X) temporarily deferred`                                                                                                                            | Messages are temporarily deferred because of recipient server policy - often it's because of too many messages or connections in too short of a timeframe. We continue to retry deferred messages for up to 72 hours. Consider temporarily sending less messages to a domain that is returning this code because this could further delay your messages currently being tried. |
| 450   | `too frequent connects from X.X.X.X, please try again later.`                                                                                                            | Due to excessive sending volume, the recipient mail server deferred your email message. Twilio retries sending this message for up to 72 hours. Consider reducing your message volume to the domain returning this code. Sending more messages could further delay messages in progress.                                                                                       |
| 451   | `Temporary local problem - please try later`                                                                                                                             | The message failed, usually due to a far-end server error. We continue to retry messages for up to 72 hours.                                                                                                                                                                                                                                                                   |
| 451   | `Authentication failed: Maximum credits exceeded`                                                                                                                        | There is a credit limit of emails per day enforced in error. [Contact support](https://support.sendgrid.com/hc/en-us) to remove that limit.                                                                                                                                                                                                                                    |
| 452   | `Too many recipients received this hour (throttled)`                                                                                                                     | The message has been deferred due to insufficient system storage. We continue to retry messages for up to 72 hours.                                                                                                                                                                                                                                                            |
| 550   | `Requested action not taken: mailbox unavailable`                                                                                                                        | The user's mailbox was unavailable. Usually because it could not be found, or because of incoming policy reasons. Remove these address from your list - it is likely a fake, or it was mistyped.                                                                                                                                                                               |
| 550   | `You are temporarily blocked from sending emails due to repeated bad requests.`                                                                                          | Too many bad requests, such as bad sender or bad recipient address, have been sent in a short time frame. A temporary block of a few minutes has been activated to prevent more bad requests until a fix can be implemented.                                                                                                                                                   |
| 551   | `User does not exist.`                                                                                                                                                   | The intended mailbox does not exist on this recipient server. Remove these addresses from your list.                                                                                                                                                                                                                                                                           |
| 552   | `This message is larger than the current system limit or the recipient's mailbox is full. Create a shorter message body or remove attachments and try sending it again.` | The recipients mailbox has exceeded its storage limits. We don't resend messages with this error code because this is usually a sign this is an abandoned email.                                                                                                                                                                                                               |
| 553   | `Invalid/inactive user.`                                                                                                                                                 | The message was refused because the mailbox name is either malformed or does not exist. Remove these addresses from your list.                                                                                                                                                                                                                                                 |
| 554   | `ERROR: Mail refused`                                                                                                                                                    | This is a default response that can be caused by a lot of issues. There is often a human readable portion of this error that gives more detailed information, but if not, remove these addresses from your list.                                                                                                                                                               |
| Other | `Delayed Bounce - Unable to Parse Server Reason`                                                                                                                         | This is what SendGrid displays when the recipients server returns a blank reason code.                                                                                                                                                                                                                                                                                         |

## Turning off click tracking

To turn off click tracking, add this to your X-SMTPAPI header:

```json
{
  "filters": {
    "clicktrack": {
      "settings": {
        "enable": 0
      }
    }
  }
}
```

## Invalid SMTP API header

When you try to send an invalid X-SMTPAPI header, you will get an email with details about the invalidations. You may also see errors on your Email Activity page or in your Event Webhook data. If this happens, the email should give you the information you need to begin troubleshooting. We also recommend uploading your JSON into a JSON validator, because this is often an invalid JSON issue.

## Certificate verification failed for smtp.sendgrid.net

`"certificate verification failed for [smtp.sendgrid.net](http://smtp.sendgrid.net/)[198.37.144.225]:587: untrusted issuer /C=US/O=The Go Daddy Group, Inc./OU=Go Daddy Class 2 Certification Authority"`

If you receive this error, the connection is still encrypted; it's just that your server doesn't have the necessary CA (certificate authority) certificates to confirm that our certificate is valid.

*To update your certificates:*

1. Download the GoDaddy CA bundle from [https://certs.godaddy.com/anonymous/repository.pki](https://certs.godaddy.com/anonymous/repository.pki) (grab the one called `"gd_bundle-g2-g1.crt"`).
2. Save that on your server.
3. Tell Postfix where to find it by adding or editing the following line in `/etc/postfix/main.cf`: `"smtp_tls_CAfile = /etc/postfix/ssl/gd_bundle-g2-g1.crt"`
4. Restart Postfix to make the change take effect.

If the mail server communicates with more than just us, add this certificate to your existing CA bundle (frequently called `ca-bundle.crt`).

## 550 Unauthenticated Senders Not Allowed

If you're getting an "Unauthenticated Senders Not Allowed" error, the problem usually lies in authenticating with our SMTP server. This error gets triggered when there was an attempt to hand over an email message through `smtp.sendgrid.net` before authenticating the connection with your SendGrid username and API key.

To fix this issue, you'll want to make sure that you've configured your setup to connect to `smtp.sendgrid.net` using authentication, and that the credentials you're using are your SendGrid username and a properly configured API key as the password. For more on API keys, see [API Keys](/docs/sendgrid/ui/account-and-settings/api-keys/).

If you're using cPanel/Exim, you'll want to make sure it's configured to authenticate every time it connects to `smtp.sendgrid.net`.

## Additional Resources

* [SMTP Service Crash Course](https://sendgrid.com/blog/smtp-service-crash-course/)
* [Getting Started with the SMTP API](/docs/sendgrid/for-developers/sending-email/getting-started-smtp/)
* [Integrating with SMTP](/docs/sendgrid/for-developers/sending-email/integrating-with-the-smtp-api/)
* [Building an SMTP Email](/docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header/)
