# Getting started with the SendGrid API

There are several ways you can get started with the SendGrid API.

## Prerequisites for sending your first email with the SendGrid API

These instructions describe how to send your first email using cURL calls. This is one of many ways to send email with the SendGrid API - we also have [PHP](https://github.com/sendgrid/sendgrid-php), [Python](https://github.com/sendgrid/sendgrid-python), [Node.js](https://github.com/sendgrid/sendgrid-nodejs), [Java](https://github.com/sendgrid/sendgrid-java), [C#](https://github.com/sendgrid/sendgrid-csharp), [Go](https://github.com/sendgrid/sendgrid-go), and [Ruby](https://github.com/sendgrid/sendgrid-ruby) libraries.

Before you can start using the API, you need to do the following:

1. Create a SendGrid [account](https://sendgrid.com/pricing/).
2. Create an [API Key](https://app.sendgrid.com/settings/api_keys).
3. Make sure you have [curl](https://curl.haxx.se/) installed on your machine.

> \[!NOTE]
>
> cURL comes standard on Mac operating systems.

## How to send an API email

### Build your API call

Your API call must have the following components:

* **A host.** The host for Web API v3 requests is always `https://api.sendgrid.com/v3/`
* **An [Authorization header](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/authentication#authorization-header).** An [API Key](https://app.sendgrid.com/settings/api_keys) must be included in the Authorization header.
* **A request.** When submitting data to a resource via `POST` or `PUT`, you must submit your payload in JSON.

> \[!NOTE]
>
> The total message size should not exceed 20MB. This includes the message
> itself, headers, and the combined size of any attachments.

> \[!NOTE]
>
> SendGrid recommends setting your server host to `https://api.sendgrid.com/v3/`
> and not directly pointing to SendGrid IP addresses. SendGrid IP addresses
> occasionally change without notice and hardcoding IP addresses, especially
> without a way to regularly check for updates, can cause integrations to break.

### Send your email using the API

> \[!NOTE]
>
> Basic Authentication is no longer accepted; you must use an API key.

*To Send an email using the SendGrid API:*

```bash
curl --request POST \
--url https://api.sendgrid.com/v3/mail/send \
--header 'Authorization: Bearer <<YOUR_API_KEY>>' \
--header 'Content-Type: application/json' \
--data '{"personalizations":[{"to":[{"email":"john.doe@example.com","name":"John Doe"}],"subject":"Hello, World!"}],"content": [{"type": "text/plain", "value": "Heya!"}],"from":{"email":"sam.smith@example.com","name":"Sam Smith"},"reply_to":{"email":"sam.smith@example.com","name":"Sam Smith"}}'
```

1. Copy the curl example above.
2. Paste the curl call into your favorite text editor.
3. Copy your API key and paste it in the "Authorization" header.
4. In the data section, specify the "to", "from", and "reply to" names and email addresses and enter a subject.
5. Copy the code and paste it in your terminal.
6. Hit **Enter**.
7. Check the inbox of the address you specified as the "to" email and see your message!

> \[!NOTE]
>
> If you have not yet set up [Sender
> Authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication/)
> in your account, you may need to check your spam folder for the email you just
> sent.

## Do you want expert help to get your email program started on the right foot?

[IMPLEMENTATION SERVICES](https://sendgrid.com/solutions/email-implementation/)

Save time and feel confident you are set up for long-term success with Email
Implementation. Our experts will work as an extension of your team to ensure
your email program is correctly set up and delivering value for your business.

### API response messages

All responses are returned in JSON format. We specify this by sending the `Content-Type` header. The Web API v3 provides a selection of [response codes](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#status-codes), [content-type headers](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#content-type-header), and [pagination](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#pagination) options to help you interpret the responses to your API requests.

> \[!NOTE]
>
> Get additional onboarding support. Save time, increase the quality of your
> sending, and feel confident you are set up for long-term success with
> [SendGrid Onboarding
> Services](https://sendgrid.com/marketing/onboarding-services-request/?utm_source=docs).

## Next steps

For more information on SendGrid and where you can go from here, check out these pages:

* [API Reference](/docs/sendgrid/api-reference/)
* [Sender Authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication/)
* [Automating Subusers](/docs/sendgrid/for-developers/sending-email/automating-subusers/)
