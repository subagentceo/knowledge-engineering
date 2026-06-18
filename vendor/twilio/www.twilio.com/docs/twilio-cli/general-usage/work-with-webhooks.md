# Work with webhooks

One of the most convenient features of the CLI is the ability to quickly direct [Twilio webhooks](/docs/usage/webhooks) to a handler. Both [Incoming Message Webhooks](/docs/usage/webhooks/messaging-webhooks#incoming-message-webhook) and [Voice](/docs/usage/webhooks/voice-webhooks) are supported.

## Update webhook handlers

For example, redirect incoming SMS webhooks to the `/handle-sms` route of your deployed server using your phone number SID:

```bash
twilio phone-numbers:update PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
  --sms-url http://www.your-server.com/handle-sms
```

When the update succeeds, you'll see output similar to:

```bash
SID                                 Phone Number  Friendly Name
PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  +14155552671  My Phone Number
```

You can also use the [E.164 formatted](/docs/glossary/what-e164) phone number:

```bash
twilio phone-numbers:update "+18005550100" \
  --sms-url http://www.your-server.com/handle-sms
```

> \[!NOTE]
>
> To find your phone number SID, visit the [Phone Numbers page](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming) in the Twilio Console. Click the phone number you want to update, and you'll see the SID at the top of the page (it starts with `PN`).

Similarly, you can leverage the `--voice-url` flag to modify your phone number's incoming call handler:

```bash
twilio phone-numbers:update PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
  --voice-url http://www.your-server.com/handle-call
```

There are also options for setting the fallback URL and more. Run `twilio phone-numbers:update --help` for a full list of options.

### Verify the webhook update

To confirm your webhook URL was set correctly, list your phone numbers:

```bash
twilio phone-numbers:list
```

Look for your phone number in the output. You can also check in the [Twilio Console](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming) to see the updated webhook URLs.

### Test the webhook

To test that your webhook is working:

1. Send a test SMS to your Twilio phone number from your personal phone.
2. Check your server logs to verify the webhook request was received.

Your server should receive a `POST` request with parameters like `Body`, `From`, `To`, and more. See the [Messaging webhook documentation](/docs/usage/webhooks/messaging-webhooks#incoming-message-webhook) for the full list of parameters.

## Proxy your localhost

> \[!WARNING]
>
> The Twilio CLI does **not** accept `localhost` or `127.0.0.1` URLs directly. Attempting to use a localhost URL will result in an error: "localhost URLs are not allowed for this operation." You must use a tunneling service like ngrok to create a public URL.

### Using ngrok to tunnel your localhost

To test webhooks with your local development server, start ngrok and use the public URL it provides:

**Prerequisites**:

* [Download and install ngrok](https://ngrok.com/download)
* [Sign up for a free ngrok account](https://dashboard.ngrok.com/signup) to get your authtoken
* Configure ngrok: `ngrok config add-authtoken YOUR_AUTHTOKEN`

> \[!NOTE]
>
> Twilio requires a public URL for webhooks because Twilio servers cannot reach your local machine. To test webhooks with your local development server, create a tunnel that makes your localhost accessible from the internet.

**Steps**:

1. Start your local server (for example, on port 3000).
2. In a separate terminal, start ngrok: `ngrok http 3000`.
3. Copy the public URL from ngrok (for example, `https://abc123.ngrok-free.app`).
4. Update your phone number with the public URL using your phone number SID:

```bash
twilio phone-numbers:update PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
  --sms-url https://abc123.ngrok-free.app/handle-sms
```

You'll see output confirming the update with your phone number details.

5. Test by sending an SMS to your Twilio number - watch for the incoming request in both your server logs and the ngrok web interface at `http://127.0.0.1:4040`

This approach gives you full control over the tunnel. You can see incoming requests in the ngrok dashboard.

> \[!WARNING]
>
> Using ngrok or any tunneling service temporarily exposes your computer to the internet. Stop the tunnel when your testing is complete to avoid unintended access.

## The Webhook plugin

In addition to these built-in features, [Twilio Labs](/en-us/labs) has released a [CLI plugin](/docs/twilio-cli/plugins) to further help you develop and test your webhooks: [the Webhook plugin for the Twilio CLI](https://github.com/twilio-labs/plugin-webhook).

Read this excellent [introduction blog post](https://www.twilio.com/blog/validate-webhooks-with-new-webhook-plugin-for-twilio-cli) to learn more.
