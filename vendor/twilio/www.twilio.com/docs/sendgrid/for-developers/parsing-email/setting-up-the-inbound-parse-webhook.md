# Configure the inbound parse webhook

Twilio SendGrid can help process email using the Inbound Parse webhook. The Inbound Parse webhook parses the contents and attachments for incoming email to a email server, then send that data to a URL of your choice. You can choose how your application handles this parsed data.

For examples of the Inbound Parse webhook, see the blog posts [Parse API: Oh, What You Can Do!][] and [Microservice for Handling SendGrid Inbound Parse][].

> \[!NOTE]
>
> To review pre-made integrations for the Twilio SendGrid Inbound Parse webhook, see the [Library Index][].

## Prerequisites

Before you configure the Inbound Parse webhook, complete the following tasks:

* Create and configure MX records.
* Choose the hostname or receiving domain that receives the emails to parse.
* Define the URL that receives your parsed emails.

## Create an MX record

1. Go to the MX Records page on your domain provider website.\
   If you don't know who hosts your domain, contact your website administrator or networking team.
2. Create a new MX record.
3. Set the **subdomain** or **hostname** to the one that processes incoming email followed by a period (`.`).
   * This hostname should serve no other purpose other than parsing your incoming email.
   * Never change the MX record for your domain. If you do, your domain stops receiving email.
4. Set the **priority** to `10`.
5. Set the **mail server address** to `mx.sendgrid.net`.
   If your provider offers field for priority, type `10` before the mail server address. `10 mx.sendgrid.net.`
6. Leave the **Time to Live** or **TTL** value unchanged.
7. Click **Save** or **Add** depending on your domain provider user interface.

```text {title="Example MX record"}
HOST    TYPE  TTL   SERVER
------  ----  ----  ----------------
parse.  MX    3600  mx.sendgrid.net.
```

## Set the email server and webhook URL

The inbound parse requires two parameters:

* **Receiving domain**: The domain that encompasses the email servers that receive the email messages you want to parse
* **Destination URL**: The URL at which your Inbound Parse webhook is hosted

To configure the inbound parse webhook:

1. Log in to the [Twilio SendGrid Console][sg-console].
2. Go to **Settings** > **Inbound Parse**. The Inbound Parse page appears.
3. Click **Add Host & URL**. The **Add Host & URL** panel appears.
4. In the **Receiving domain** fields, provide the following:

   * Type the *hostname* or *subdomain* for your domain in the box, if needed.
   * Select the *domain* from the **Domain** dropdown menu.

   Twilio parses all email messages sent to the receiving domain.

   If you set your receiving domain to the same value as your [authenticated domain][domain-auth], turn off [Automatic Security][auto-security] on the authenticated domain. Otherwise, messages sent to the receiving domain bounce in an infinite loop between the servers set as the [canonical domain name (CNAME)][cname] and the [mail exchanger (MX)][mx] records.
5. In the **Destination URL**, type the webhook URL that should receive the parsed email data. This URL must be accessible from the internet.
6. In the **Additional Options** section, select one or both of the options.
   * To have Inbound Parse check incoming email 2.5 MB or smaller for spam, select **Check incoming emails for spam**. Checking this box also includes the spam report and spam score in the payload. In general, spam email messages don't exceed 2.5 MB. The Twilio SendGrid-generated report marks those messages as not spam.
   * To URL encode both the email messages and their attachments, select **`POST` the raw, full MIME message**.\
     If you don't select **`POST` the raw, full MIME message**, Twilio SendGrid URL encodes the message but not their attachments. If your code only reads URL-encoded content, it can drop attachments.
7. Click **Add**.

## Test your webhook

To test the webhook, send an email from your email account to an email address on your receiving domain, like `example@example.com`.

The local-part of this email address, anything before `@`, can be any single word or combination of words with three exceptions: `abuse`, `postmaster`, and `unsubscribe`. This means you can't use `abuse@subdomain.example.com`, `postmaster@subdomain.example.com`, and `unsubscribe@subdomain.example.com`.

## Examples of the payloads and their parameters

## Default Data Format

| Parameter                                  | Description                                                                                                              |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `headers`                                  | The raw headers of the email.                                                                                            |
| `dkim`                                     | The verification results of any DKIM and domain keys signatures in the message.                                          |
| `content-ids`                              | The identifiers of the attachments included in the email message.                                                        |
| `to`                                       | A JSON object containing the email address of the recipient extracted from the message headers.                          |
| `text`                                     | The text-formatted form of the email message body.                                                                       |
| `html`                                     | The HTML-formatted form of the email message body, if provided.                                                          |
| `from`                                     | The email sender extracted from the message headers.                                                                     |
| `sender_ip`                                | The IP address from which the email message was sent.                                                                    |
| `spam_report`                              | The content of the report [SpamAssassin][] generates.                                                                    |
| `envelope`                                 | A JSON object that represents the SMTP envelope.                                                                         |
| `envelope.from`                            | The return address for the message.                                                                                      |
| `envelope.to`                              | A single-element array containing the address of the recipient of the received email message                             |
| `attachments`                              | The number of attachments included in email message.                                                                     |
| `subject`                                  | The subject line of the email message.                                                                                   |
| `spam_score`                               | The SpamAssassin rating that determines if it considers this message spam.                                               |
| `attachment-info`                          | A JSON object that contain one object for each attachment.                                                               |
| `attachment-info.attachment{X}`            | Each attachment key points to a JSON object for each attachment. `X` ranges from `0` to the total number of attachments. |
| `attachment-info.attachment{X}.filename`   | The name of the file if it was provided.                                                                                 |
| `attachment-info.attachment{X}.type`       | The [media type][] of the file.                                                                                          |
| `attachment-info.attachment{X}.content-id` | A unique identifier assigned to the file.                                                                                |
| `charsets`                                 | A JSON object that contains the [character sets][charset] of the values extracted from the message.                      |
| `SPF`                                      | The results of the [Sender Policy Framework][spf] verification of the message sender and receiving IP address.           |

#### View an example default payload

```text {title="Default webhook payload in multipart/form-data format"}
  POST /your-webhook-url HTTP/1.1
  Host: example.com
  Content-Type: multipart/form-data; boundary=001a11447dc881e40b0537fe6d58
  Content-Length: [content-length]

  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="headers"

  Received: by mx0047p1mdw1.sendgrid.net with SMTP id n02SRiHsLZ Tue, 27 Jul 2021 15:53:29 +0000 (UTC)
  Received: from mail-sor-f41.google.com (mail-sor-f41.google.com [209.85.223.169])
          by mx0047p1mdw1.sendgrid.net (Postfix) with ESMTPS id 09F3B1801C8
          for <example@example.com>; Tue, 27 Jul 2021 15:53:29 +0000 (UTC)
  DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=sendgrid.com; s=ga1;
          h=mime-version:from:date:message-id:subject:to:content-type;
          bh=NpmKhQmfVa+5lFZlsFg3EjLQGAGOmz8+fGEXjSs1+2g=;
          b=OKl5gvNGYmz/YzjhGLxPwAS2B0PsQm2s/ywxSXAbmQhwOC2gaLFB8NJjfNmI7asTghsL...
  MIME-Version: 1.0
  From: Sender Name <sender@example.com>
  Date: Tue, 27 Jul 2021 15:53:29 +0000
  Message-ID: <CABQbZKGSEWPBtYVn3W_JUb70n-Oe=fykq@mail.gmail.com>
  Subject: Different File Types
  To: example@example.com
  Content-Type: multipart/mixed; boundary="000000000000abcdef05c8c1c2d3"
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="dkim"

  {@sendgrid.com : pass}
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="to"

  example@example.com
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="from"

  Sender Name <sender@example.com>
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="subject"

  Different File Types
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="text"

  Here's an email with multiple attachments
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="html"

  <div dir="ltr">Here&#39;s an email with <b>multiple attachments</b><br><img src="cid:ii_1562e2169c132d83" alt="image.png"><br></div>
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="sender_ip"

  209.85.223.169
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="envelope"

  {"to":["example@example.com"],"from":"sender@example.com"}
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="attachments"

  2
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="charsets"

  {"to":"UTF-8","from":"UTF-8","subject":"UTF-8","text":"UTF-8","html":"UTF-8"}
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="SPF"

  pass
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="spam_score"

  0.011
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="spam_report"

  Spam detection software, running on the system "mx0047p1mdw1.sendgrid.net",
  has NOT identified this incoming email as spam. The original
  message has been attached to this so you can view it or label
  similar future email. If you have any questions, see
  the administrator of that system for details.

  Content preview: Here's an email with multiple attachments [image.png]

  Content analysis details: (0.0 points, 5.0 required)

  pts rule name              description
  ---- ---------------------- --------------------------------------------------
  0.0 HTML_MESSAGE           BODY: HTML included in message
  0.0 T_MIME_NO_TEXT         No text body parts
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="content-ids"

  {"ii_1562e2169c132d83":"attachment1"}
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="attachment-info"

  {"attachment1":{"filename":"image.png","name":"image.png","type":"image/png","content-id":"ii_1562e2169c132d83"},"attachment2":{"filename":"document.pdf","name":"document.pdf","type":"application/pdf"}}
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="attachment1"; filename="image.png"
  Content-Type: image/png

  [binary content]
  --001a11447dc881e40b0537fe6d58
  Content-Disposition: form-data; name="attachment2"; filename="document.pdf"
  Content-Type: application/pdf

  [binary content]
  --001a11447dc881e40b0537fe6d58--
```

## Raw Data Format

| Parameter       | Description                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------- |
| `dkim`          | The verification results of any DKIM and domain keys signatures in the message.                                |
| `email`         | A string containing the email headers, date, body, and attachments                                             |
| `to`            | A JSON object containing the email address of the recipient extracted from the message headers.                |
| `from`          | Email sender extracted from the message headers.                                                               |
| `sender_ip`     | The IP address from which the email message was sent.                                                          |
| `spam_report`   | The content of the report [SpamAssassin][] generates.                                                          |
| `envelope`      | A JSON object that represents the SMTP envelope.                                                               |
| `envelope.from` | The return address for the message.                                                                            |
| `envelope.to`   | A single-element array containing the address of the recipient of the received email message                   |
| `subject`       | The subject line of the email message.                                                                         |
| `spam_score`    | The SpamAssassin rating that determines if it considers this message spam.                                     |
| `charsets`      | A JSON object that contains the [character sets][charset] of the values extracted from the message.            |
| `SPF`           | The results of the [Sender Policy Framework][spf] verification of the message sender and receiving IP address. |

> \[!NOTE]
>
> To aid in delivery, limit the total size of your message, including the message and attachments, to 30 MB. Other inbox providers might have their own limitations. Some ISPs and companies might limit the size, type of attachments, or both, or even block them completely.

```text {title="Raw webhook payload"}
array(11) {
  ["dkim"]=>
  string(22) "{@sendgrid.com : pass}"
  ["email"]=>
  string(8879) "Received: by mx0032p1mdw1.sendgrid.net with SMTP id rOkt2xLLKV Tue, 19 Jul 2016 15:06:29 +0000 (UTC)
Received: from mail-it0-f45.google.com (mail-it0-f45.google.com [209.85.214.45]) by mx0032p1mdw1.sendgrid.net (Postfix) with ESMTPS id 26D6080397 for <parse@parse.yourdomain>; Tue, 19 Jul 2016 15:06:22 +0000 (UTC)
Received: by mail-it0-f45.google.com with SMTP id f6so93587860ith.1 for <example@example.com>; Tue, 19 Jul 2016 08:06:22 -0700 (PDT)
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=sendgrid.com; s=ga1; h=mime-version:from:date:message-id:subject:to; bh=UYWCIUKTVXyV9U41l+c9+qOlpoeQGcJkKpyOAatNr3Y=; b=c1I/LcqHEJklmAThWr9Z8NKlTPHUlE/8sDSpK382fJtIQcGdUtczG0pijnUHegrFVt FDr4NehtJDD9KFvXLXboLCtObsu5HTN99ckUCCZTibZseA+J8U3jjCqTdj1fmUage5C7 //Iwi0Ndioonzhm18J7KStap66yZ69ED7UxPk=
X-Google-DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20130820; h=x-gm-message-state:mime-version:from:date:message-id:subject:to; bh=UYWCIUKTVXyV9U41l+c9+qOlpoeQGcJkKpyOAatNr3Y=; b=lgmLXnmmpNcQMckjshsZsa2/8OjFZzntWYSG5XZo0fi32KHLuBLSHuNDFXn0V4ICp1 1xuT2fZCyhBSgNBiWNbjqFspdemzrBjaI1Tgm/Zz8Fv6wW2XdjpoANNQzJxfdhnecPd5 HvZ5P8+KTqjr4tAa9RmLthDc3UqhV9NRnCnhbW/AZaVQLB8eoJus92tD1GeXpBQml5XF m6vPUGrWGZWNugINkRKxIpk+2uECglAjNm4NpZIi9j7N94CxA18RC4NJ59WIsSybtIer hbCgT1Q13rvGEzvnp6FfFQVbE3DOibNqd0bh/EvZCagFVbnenNc/Q+qHtU9KqFlisSOp xh0w==
X-Gm-Message-State: ALyK8tINVaZIP8YCgQbpg5ya8EnqQo76uxkXUPpDnM+kAyAQQzehFU10EgyuAe2fAmWf/muBiFDy0JDU74Eclp1/
X-Received: by 10.36.76.16 with SMTP id a16mr4479786itb.77.1468940781988; Tue, 19 Jul 2016 08:06:21 -0700 (PDT)
MIME-Version: 1.0
Received: by 10.107.48.17 with HTTP; Tue, 19 Jul 2016 08:06:21 -0700 (PDT)
From: Sender Name <example@example.com>
Date: Tue, 19 Jul 2016 09:06:21 -0600
Message-ID: <CAN_P_JNa25--hzm5=-ES9cnxgWa+h+E49OOAS7sPpV0gsoXCOw@mail.gmail.com>
Subject: Hello
To: example@example.com
Content-Type: multipart/mixed; boundary=001a11447dc881e40f0537fe6d5a

--001a11447dc881e40f0537fe6d5a
Content-Type: multipart/alternative; boundary=001a11447dc881e40b0537fe6d58

--001a11447dc881e40b0537fe6d58
Content-Type: text/plain; charset=UTF-8

This is a test email with 1 attachment.

--001a11447dc881e40b0537fe6d58
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: quoted-printable

<div dir=3D"ltr">This is a test email with 1 attachment.<br clear=3D"all"><=
div> </div>--  <div class=3D"gmail_signature" data-smartmail=3D"gmail=
_signature"><div dir=3D"ltr"><img src=3D"https://sendgrid.com/brand/sg-logo=
-email.png" width=3D"96" height=3D"17"> <div> </div></div></div>
</div>

--001a11447dc881e40b0537fe6d58--

--001a11447dc881e40f0537fe6d5a
Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document;
    name="DockMcWordface.docx"
Content-Disposition: attachment; filename="DockMcWordface.docx"
Content-Transfer-Encoding: base64
X-Attachment-Id: f_iqtleujy0

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

--001a11447dc881e40f0537fe6d5a--
"
  ["to"]=>
  string(22) "example@example.com"
  ["from"]=>
  string(33) "Sender Name <example@example.com>"
  ["sender_ip"]=>
  string(13) "209.85.214.45"
  ["spam_report"]=>
  string(798) "Spam detection software, running on the system "mx0032p1mdw1.sendgrid.net", has
identified this incoming email as possible spam. The original message
has been attached to this so you can view it (if it isn't spam) or label
similar future email. If you have any questions, see
@@CONTACT_ADDRESS@@ for details.

Content preview:  This is a test email with 1 attachment.
Content analysis details:   (0.4 points, 5.0 required)

 pts rule name              description
---- ---------------------- --------------------------------------------------
 0.0 HTML_MESSAGE           BODY: HTML included in message
 0.3 HTML_IMAGE_ONLY_04     BODY: HTML: images with 0-400 bytes of words
 0.0 T_MIME_NO_TEXT         No text body parts

"
  ["envelope"]=>
  string(73) "{"to":["example@example.com"],"from":"example@example.com"}"
  ["subject"]=>
  string(5) "Hello"
  ["spam_score"]=>
  string(5) "0.353"
  ["charsets"]=>
  string(47) "{"to":"UTF-8","subject":"UTF-8","from":"UTF-8"}"
  ["SPF"]=>
  string(4) "pass"
}
```

### Statistics

Twilio SendGrid provides [statistics][] of how many emails it parses over time. To specify what the graph displays, adjust the statistics filters.

To learn more, see [Parse Webhook Stats][].

## Additional resources

* [Parse API][]: Manage Inbound Parse Webhook settings using the Parse API (Web API v3).
* [Parse Settings Subuser][]: Get current Parse settings and create, edit, and delete entries using the Subuser API (Web API v2).
* [Reseller API Parse Settings][]: Get current Parse settings and create, edit, and delete entries using the Reseller API (Web API v2).
* [Reseller Customer Subuser Parse Settings][]: Get current Parse settings and create, edit, and delete entries using the Reseller Customer Subuser API (Web API v2).

[Library Index]: /docs/sendgrid/for-developers/sending-email/libraries/#web-api-libraries

[Microservice for Handling SendGrid Inbound Parse]: https://www.twilio.com/en-us/blog/microservice-template-handle-sendgrid-inbound-parse

[Parse API: Oh, What You Can Do!]: https://www.twilio.com/en-us/blog/insights/parse-api-oh-what-you-can-do

[media type]: https://en.wikipedia.org/wiki/Internet_media_type

[Parse API]: /docs/sendgrid/api-reference/settings-inbound-parse/create-a-parse-setting

[Parse Settings Subuser]: /docs/sendgrid/api-reference/settings-inbound-parse

[Parse Webhook Stats]: /docs/sendgrid/api-reference/webhooks/retrieves-inbound-parse-webhook-statistics

[Reseller API Parse Settings]: /docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api

[Reseller Customer Subuser Parse Settings]: /docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api

[statistics]: https://app.sendgrid.com/statistics/parse_webhook

[sg-console]: https://app.sendgrid.com

[domain-auth]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication

[auto-security]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication#use-automated-security

[cname]: /docs/sendgrid/glossary/cname

[spf]: /docs/sendgrid/glossary/spf

[mx]: /docs/sendgrid/glossary/mx-record

[spamassassin]: https://spamassassin.apache.org

[media type]: https://en.wikipedia.org/wiki/Internet_media_type

[charset]: https://en.wikipedia.org/wiki/Character_encoding
