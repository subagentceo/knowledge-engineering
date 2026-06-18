# List-Unsubscribe

[List-Unsubscribe](https://sendgrid.com/blog/list-unsubscribe) is a small piece of text that can be inserted in the header section of your email. The List-Unsubscribe header will insert an "unsubscribe" button, or link, next to the From address at the top of your email. A recipient can click this link to notify you that they would like to unsubscribe from your emails.

```json
{
  "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  "List-Unsubscribe": "<mailto:unsubscribeexampexample@example.com>, <https://www.unsubscribe.example.com/>"
}
```

![Email from Best Buy with unsubscribe link highlighted.](https://docs-resources.prod.twilio.com/122634829aaae7df42fb2e19905a8ad20be2c3a72a1d20de3e27768f29af6c57.png)

> \[!CAUTION]
>
> It is important to note that the list-unsubscribe header is not a complete replacement for the standard unsubscribe functionality that should be included in the body of your email. For more information on adding unsubscribe links to the body of your email, see our [Unsubscribe Groups documentation](/docs/sendgrid/ui/sending-email/create-and-manage-unsubscribe-groups/).

## SendGrid subscription tracking

If you enable SendGrid's [subscription tracking](https://app.sendgrid.com/settings/tracking) feature, SendGrid will automatically insert the List-Unsubscribe header in all of your text and HTML emails— placing an HTTPS unsubscribe link in all of your emails. Additionally, SendGrid will insert a List-Unsubscribe-Post header with List-Unsubscribe=One-Click.

You can also place the substitution tag \[unsubscribe] anywhere in the body of your email to specify the exact location where you want the unsubscribe link to appear. You may customize this tag and the message inserted during the substitution. For more information, see our [subscription tracking documentation](/docs/sendgrid/ui/account-and-settings/tracking/).

It is possible to use the List-Unsubscribe header even if you do not want to use subscription tracking. This is useful for users who want to provide their recipients an easy way to unsubscribe from their emails without relying on SendGrid's tracking features. Continue reading below for an explanation of the both headers, and how you can use it when sending email via SendGrid.

## How does the List-Unsubscribe header work?

The List-Unsubscribe header provides two methods of unsubscribing users: an email unsubscribe, and a web unsubscribe. Both of these methods should be used to comply with various inbox providers.

## Web Unsubscribe: https

The https portion of the List-Unsubscribe header allows you to specify a URL that will receive a `POST` whenever someone clicks the unsubscribe link in your email. Inboxes such as Gmail and Yahoo! require a valid https unsubscribe link in the headers of marketing emails.

## Email Unsubscribe: mailto

The mailto portion of the List-Unsubscribe header allows you to specify an email address that will receive the unsubscribe request. In other words, when a recipient clicks the "unsubscribe" link in your email, the recipient's mail client will send an email to this address.

**It is your responsibility to receive and process these generated emails**.

> \[!CAUTION]
>
> Failure to honor your recipients' unsubscribe requests may do more than damage your sender reputation. To learn more about deliverability and compliance, see our [2019 Email Deliverability Guide](https://sendgrid.com/blog/sendgrids-2019-email-deliverability-guide/).

## How does the List-Unsubscribe-Post header work?

Inboxes such as Gmail and Yahoo! require all marketing email to contain a List-Unsubscribe-Post header with the value `List-Unsubscribe=One-Click`. This header communicates that the unsubscribe method is one click via a `POST` request. Additionally, anti spam software may issue `GET` requests to links in emails. To prevent accidental unsubscribes, add an additional step so that the `GET` request to that link does not unsubscribe someone. As an example, you could make the `GET` request to the link present a landing page to the user containing a link or button to confirm the unsubscribe. A `POST` request to this link, such as that generated through the one click unsubscribe in the email header, should result in an unsubscribe.

> \[!WARNING]
>
> When testing the implementation of one-click unsubscribe, developers may not see a one click unsubscribe button even if it has been implemented correctly. Inbox providers are the ultimate deciders of which emails will display a one click unsubscribe button next to the From address of the email. Low sender reputations can occasionally cause the one click unsubscribe button to not be displayed.

## Which method should I use?

You must include both the **mailto** and **https** portions of the List-Unsubscribe header, since different inboxes either only support mailto (iOS, for example) or require https (Gmail and Yahoo!).

Not honoring your recipients' unsubscribe requests could not only harm your sender reputation, but could also violate legislation laid out in [CAN-SPAM](/docs/sendgrid/glossary/can-spam/), [CASL](https://sendgrid.com/blog/canadian-anti-spam-law-need-know/), and other legislation. For more information about deliverability best practices and compliance, please visit our [Deliverability Overview](/docs/sendgrid/ui/sending-email/deliverability/).

## Examples

### Using List-Unsubscribe with v3 Mail Send

```json
{
  "personalizations": [
    {
      "to": [
        {
          "email": "example@example.com"
        }
      ],
      "subject": "Your subject line here"
    }
  ],
  "from": {
    "email": "example@example.com"
  },
  "content": [
    {
      "type": "text/plain",
      "value": "Hello, World!"
    }
  ],
  "headers": {
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    "List-Unsubscribe": "<mailto:unsubscribeexampexample@example.com>, <https://www.unsubscribe.example.com>"
  }
}
```

### Using List-Unsubscribe with v2 Mail Send

```bash
api_user=your_sendgrid_username&
api_key=your_sendgrid_password&
to=destination@example.com&
toname=Destination&
subject=Example_Subject&
text=testingtextbody&
from=info@domain.com&
"headers": {"List-Unsubscribe-Post": "List-Unsubscribe=One-Click", "List-Unsubscribe": "<mailto:unsubscribeexampexample@example.com>, <https://www.unsubscribe.example.com>"}
```

### List-Unsubscribe with SMTP

```json
{
  "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  "List-Unsubscribe": "<mailto:unsubscribeexampexample@example.com>, <https://www.unsubscribe.example.com/>"
}
```
