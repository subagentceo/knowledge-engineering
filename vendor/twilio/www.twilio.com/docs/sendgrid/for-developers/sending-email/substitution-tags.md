# Substitution Tags

Substitution tags allow you to generate dynamic content for each recipient on your list. When you send to a list of recipients over SMTP API, you can specify substitution tags specific to each recipient. For example, a first name that will then be inserted into an opening greeting like the following, where each recipient sees -firstName- replaced with their first name.

```html
"Dear -firstName-"
```

These tags can also be used in more complex scenarios. For example, you could use a `-customerID-` to build a custom URL that is specific to that user.

## A customer specific ID can replace -customerID- in the URL within your email

```html
<a href="http://example.com/customerOffer?id=-customerID-">Claim your offer!</a>
```

> \[!NOTE]
>
> Substitution tags will work in the Subject line, body of the email and in [Unique Arguments](/docs/sendgrid/for-developers/sending-email/unique-arguments/).

> \[!CAUTION]
>
> Unique Arguments will be stored as a "Not PII" field and may be used for counting or other operations as SendGrid runs its systems. These fields generally cannot be redacted or removed. You should take care not to place PII in this field. SendGrid does not treat this data as PII, and its value may be visible to SendGrid employees, stored long-term, and may continue to be stored after you've left SendGrid's platform.

> \[!NOTE]
>
> Substitutions are limited to 50,000 bytes per personalization block.

> \[!CAUTION]
>
> When passing substitutions please make sure to only use strings as shown in our examples. Any other type could result in unintended behavior.

How you format your substitution tags may depend on the library you use to create your SMTP connection, the language you are writing your code in, or any intermediate mail servers that your servers will send mail through. In some cases `-subVal-` may be the best choice while in other `%subVal%` or `#subVal#` may make more sense. It is best to avoid characters that have special meaning in HTML, such as `<`, `>`, and `&`. These might end up encoded and will not be properly substituted.

> \[!NOTE]
>
> You can have up to 4 nested substitutions.

> \[!CAUTION]
>
> Do not use spaces inside your substitution tags, for example: `%first name%`

> \[!CAUTION]
>
> Do not nest substitution tags in substitutions as they will fail and your substitution will not take place.

## Substitution Tag Example

Email HTML content:

```html
<html>
  <head></head>
  <body>
    <p>
      Hello -name-,<br />
      Thank you for your interest in our products. I have set up an appointment
      to call you at -time- EST to discuss your needs in more detail. If you
      would like to reschedule this call, please visit the following link: `<a
        href="http://example.com/reschedule?id=-customerID-"
        >reschedule</a
      >` Regards, -salesContact- -contactPhoneNumber-<br />
    </p>
  </body>
</html>
```

An accompanying SMTP API JSON header might look something like this:

```json
{
  "to": ["example@example.com", "example@example.com"],
  "sub": {
    "-name-": ["John", "Jane"],
    "-customerID-": ["1234", "5678"],
    "-salesContact-": ["Jared", "Ben"],
    "-contactPhoneNumber-": ["555.555.5555", "777.777.7777"],
    "-time-": ["3:00pm", "5:15pm"]
  }
}
```

The resulting email for John would look like this:

```html
<html>
  <head></head>
  <body>
    <p>
      Hello John,<br />
      Thank you for your interest in our products. I have set up an appointment
      to call you at 3:00 pm EST to discuss your needs in more detail. If you
      would like to reschedule this call, please visit the following link:
      <a href="http://example.com/reschedule?id=1234">reschedule</a>
      Regards, Jared 555.555.5555
    </p>
  </body>
</html>
```

In contrast, the resulting email for Jane will look like the following, with her specific values replaced in for each tag:

```html
<html>
  <head></head>
  <body>
    <p>
      Hello Jane,<br />
      Thank you for your interest in our products. I have set up an appointment
      to call you at 5:15pm EST to discuss your needs in more detail. If you
      would like to reschedule this call please visit the following link:
      <a href="http://example.com/reschedule?id=5678">reschedule</a>
      Regards, Ben 777.777.7777
    </p>
  </body>
</html>
```

## SendGrid Defined Substitution Tags

While the tags above are tags that you define at the time of your send in the SMTP API headers, SendGrid also offers [Unsubscribe Groups tags](/docs/sendgrid/ui/sending-email/editor#reserved-substitution-tags) that have been pre-defined for you. You can use these tags within the content of your email, and you do not have to and should not, define them.

## Additional Resources

* [Section Tags](/docs/sendgrid/for-developers/sending-email/section-tags/)
* [SMTP Service Crash Course](https://sendgrid.com/blog/smtp-service-crash-course/)
* [Getting Started with the SMTP API](/docs/sendgrid/for-developers/sending-email/getting-started-smtp/)
* [Integrating with SMTP](/docs/sendgrid/for-developers/sending-email/integrating-with-the-smtp-api/)
* [Building an SMTP Email](/docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header)
