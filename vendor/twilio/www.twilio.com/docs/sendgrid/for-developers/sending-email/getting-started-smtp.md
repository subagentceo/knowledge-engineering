# How to send an Email with SMTP

Learn how to send an email with SMTP. This tutorial uses Telnet so you can see how an SMTP server requests and responds.

In most other use cases, you would send email with the [Twilio SendGrid console][tsg-console] or the [Twilio SendGrid API][].

## SMTP overview

The [Simple Mail Transfer Protocol (SMTP)][] provides the language that transmits email from one server to another. Twilio SendGrid provides an SMTP service to deliver your email using its servers.

To set custom email handling instructions, use a JSON-encoded list called the [X-SMTPAPI header][x-smtpapi] in the Twilio SendGrid SMTP API. To modify your message in the ways you specify, Twilio SendGrid parses the X-SMTPAPI header.

To learn more about SMTP, see the [SMTP Service Crash Course][] in the Twilio blog.

## Prerequisites

Before you start this tutorial, complete the following prerequisites.

> \[!NOTE]
>
> The following code samples wrap placeholder values in angle brackets (`<YOUR_API_KEY>`). Replace the brackets and the text they contain with an actual value.
>
> For example, if your API key is `SG.someactualkey`, change `echo -n '<YOUR_API_KEY>' | openssl base64` to `echo -n 'SG.someactualkey' | openssl base64`.
>
> In some cases, a placeholder gets wrapped in two sets of angle brackets. In this case, Twilio SendGrid requires the outer set of brackets in the actual value and you shouldn't replace them.
>
> For example, if the example displays `From: "Example" <<example@example.com>>`, change your value to `From: "Example" <example@example.com>`.

1. Install OpenSSL.
   * OpenSSL comes installed on macOS and Linux.
   * If you use Windows, download and run the [official installer][].
2. Install `telnet`. See the [PuTTY for Windows][], [macOS Homebrew formula][], or
   [Linux instructions][].
3. Sign up for a [SendGrid account][]
4. Create and store a SendGrid [API key][] with full access "Mail Send" permissions.
5. Open your terminal, command prompt, or command line.
6. Encode your API key using Base64, use the following command.

   ```shell
   echo -n '<YOUR_API_KEY>' | openssl base64
   ```

   Never convert your API key using an external webpage, always convert it in your terminal with OpenSSL.
7. Save your encoded key for later.\
   Check that the API key doesn't include any newline or whitespace characters by accident. This can happen when copying the encoded key from a shell that line wraps output. SMTP uses line breaks to end commands, so Linefeed characters prevent successful authentication.
8. Verify your [Sender Identity][].

## Send an SMTP email using Telnet

To see how the SMTP server requests and responds, use Telnet.

> \[!CAUTION]
>
> Telnet doesn't register backspaces. Type your commands correctly or copy and paste them from this tutorial.

1. Type the following in the terminal and start a Telnet session:

   ```shell
   telnet smtp.sendgrid.net 587
   ```

   Use port `587`. This should avoid rate limiting or connection blocking from ISPs and hosting providers.
2. After connecting to Twilio SendGrid, log in to the mail service using the following SMTP command:

   ```shell
   AUTH LOGIN
   ```

   The mail server responds with `334 VXNlcm5hbWU6`, a Base64-encoded request for your username.
3. Type `YXBpa2V5` and press **Enter** on your keyboard.\
   Twilio SendGrid authenticates using an API key, so it expects `apikey` instead of your account username. When Base64-encoded, `apikey` becomes `YXBpa2V5`.

   The mail server responds with `334 UGFzc3dvcmQ6`, a Base64-encoded request for your API Key as a password.
4. Enter your Base64-converted API key in the next line as the password and press **Enter**.

   The mail server responds with `235 Authentication successful`. This indicates an open connection to `smtp.sendgrid.net` on port `587` and that you have a valid API key.
5. Add the email that you're sending from using the SMTP `MAIL FROM` command and press **Enter**.

   ```shell
   MAIL FROM: <SENDER_EMAIL>
   ```

   The mail server responds with `250 Sender address accepted`.
6. Type the SMTP `RCPT TO` command, then the recipient email address, and press **Enter**.

   ```shell
   RCPT TO: <RECIPIENT_ADDRESS>
   ```

   To add more recipient addresses, type `RCPT TO <RECIPIENT_ADDRESS>` and press **Enter** for each recipient.

   After each recipient, the mail server should respond with `250 Recipient address accepted`.
7. Type `DATA` and press **Enter**.

   The mail server responds with `354 Continue`.
   Unlike the `MAIL FROM` and `RCPT TO` commands, which define the email envelope and route your message to the recipient, the `DATA` command modifies the content of your message.
8. You can add a `mail-to` header to add the name and email address of the recipient to the email header and press **Enter**.\
   **Note**: Wrap the name in quotation marks (`"`) and the address in angle brackets (`<`,`>`).

   ```shell
   To: "<RecipientName>" <<RecipientEmailAddress>>
   ```
9. Add a `From` header to add the name and email address of the sender to the email header and press **Enter**.

   > \[!WARNING]
   >
   > If you omit a `From` header, Twilio SendGrid blocks your email as it violates [RFC 5322][].

   ```shell
   From: "<SenderName>" <<SenderEmail>>
   ```
10. Add a `Subject` line and press **Enter**.

    ```shell
    Subject: <EMAIL_SUBJECT>
    ```
11. Press **Enter** to start the body of your message.
12. Type the body content then press **Enter**.

    ```shell
    "<MESSAGE>"
    ```

    For example:

    ```bash
    "This is a test for the SMTP relay."
    ```
13. Type a period (`.`) as the signal to end the email body, then press **Enter**. This sends the email.

    The mail server returns `250 Ok: queued as <examplestring1234>`. The mail server has put this email into the send queue. This queue clears quickly. The mail should deliver to the designated recipients in a short time.
14. To exit the Telnet connection, type `quit` and press **Enter**.

## Complete telnet SMTP example

The following example shows the all user inputs and SMTP server responses.

```shell
235 Authentication successful
MAIL FROM:tiramisu@example.com
250 Sender address accepted
RCPT TO:person1@sendgrid.com
250 Recipient address accepted
DATA
354 Continue
From: "Tira Misu" <tiramisu@example.com>
To: "Person 1" <person1@example.com>
Subject: Test message subject

"This is the test message body."
.
250 Ok: queued as Yo60h6C5ScGPeP5fUWU3K
```

## Do you want expert help to get your email program started on the right foot?

[IMPLEMENTATION SERVICES](https://sendgrid.com/solutions/email-implementation/)

Save time and feel confident in your long-term success with Email Implementation. Our experts work as an extension of your team to ensure your email program is correctly set up and delivering value for your business.

## Additional resources

* [Getting Started with the UI][tsg-console]
* [Getting Started with the API][]
* [SMTP Service Crash Course][]
* [Integrating with the SMTP API][smtp-api]
* [Building an SMTP Email][x-smtpapi]

[tsg-console]: /docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns/

[Twilio SendGrid API]: /docs/sendgrid/api-reference/

[Simple Mail Transfer Protocol (SMTP)]: /docs/sendgrid/glossary/smtp

[SMTP Service Crash Course]: https://www.twilio.com/en-us/blog/insights/smtp-service-crash-course

[official installer]: https://slproweb.com/products/Win32OpenSSL.html

[PuTTY for Windows]: https://putty.software/

[macOS Homebrew formula]: https://formulae.brew.sh/formula/telnet

[Linux instructions]: https://www.baeldung.com/linux/telnet

[SendGrid account]: https://signup.sendgrid.com/

[API key]: https://app.sendgrid.com/settings/api_keys

[Sender Identity]: /docs/sendgrid/for-developers/sending-email/sender-identity/

[RFC 5322]: https://tools.ietf.org/html/rfc5322

[Getting Started with the API]: /docs/sendgrid/for-developers/sending-email/api-getting-started/

[SMTP Service Crash Course]: https://sendgrid.com/blog/smtp-service-crash-course/

[smtp-api]: /docs/sendgrid/for-developers/sending-email/integrating-with-the-smtp-api/

[x-smtpapi]: /docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header/
