# Twilio Dev Phone

The Twilio Dev Phone makes it easier for you to test your Twilio apps when you do not have access to SMS and calling capabilities. It uses existing Twilio products to send and receive calls and SMS from your local development environment.

![Dev Phone interface with dial pad, call history, and messaging feature.](https://docs-resources.prod.twilio.com/39ca73d4368ac4af25134dc168d814e1df86d8bf9028887b878a3cebb247c9e6.png)

## Prerequisites

To use the Dev Phone, you need an [installation of the Twilio CLI](/docs/twilio-cli/getting-started/install) and access to a spare Twilio phone number. If you use a trial account, [upgrade to a paid Twilio account](https://help.twilio.com/hc/en-us/articles/223183208-Upgrading-to-a-paid-Twilio-Account).

After you install the Twilio CLI, add the Dev Phone plugin with the following command:

```bash
twilio plugins:install @twilio-labs/plugin-dev-phone
```

After installation, run the Dev Phone with the following command:

```bash
twilio dev-phone
```

You'll see output that looks something like this:

```bash
# OUTPUT

Hello 👋 I'm your dev-phone and my name is dev-phone-XXXXXX



✅ I'm using your profile API key.



💻 Creating a new conversation...

✅ I'm using the conversation CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX from service ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



💻 Creating a new sync list for call history...

✅ I'm using the sync service ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



💻 Deploying a Functions Service to handle incoming calls and SMS...

✅ I'm using the Serverless Service ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



💻 Creating a new TwiML App to allow voice calls from your browser...

✅ I'm using the TwiML App APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



🚀 Your local webserver is listening on port 3001

🌐 Opening http://localhost:3001/ your browser

▶️  Use Ctrl+C to stop the Dev Phone
```

These services are created when you start the Twilio Dev Phone. This will open a new tab in your browser where you can send and receive calls and SMS. The Dev Phone will continue running until you stop it by pressing `Ctrl + C` in your terminal.

When you stop it (by pressing `Ctrl + C`), the Twilio Dev Phone will delete the resources from your account. If you can't tear down the Dev Phone, the plugin removes the old resources the next time you run it.

## When to use the Dev Phone

The Dev Phone helps you test your Twilio applications without relying on your personal cell phone.

Some example use cases include:

* You don't have access to a Twilio phone number that can send and receive communications from your region (this is often the case [for numbers outside of the US and Canada](https://www.twilio.com/blog/developers-guide-phone-number-regulatory-requirements)).
* You don't have cell service but have a reliable internet connection (for example, you're working in a building with poor coverage, the cell network is down, or you're low on minutes).
* Your phone isn't nearby and you prefer to test without it.

In any of these scenarios, you can use the Dev Phone as a replacement for your Twilio phone number.

> \[!WARNING]
>
> Using the Dev Phone overwrites a phone number's webhooks, so don't use phone numbers that are already configured. If a number is in production, your customers' communications will appear in the Dev Phone tab in your browser.

### Send a message

![Dev Phone interface showing keypad and destination number entry.](https://docs-resources.prod.twilio.com/25978bd6fd9623919022b9b322b3496f7105050454385a54985c6b035d05539e.gif)

To make an outbound call, fill out the Destination number field and then click the **Call** button.

### Receive inbound calls and SMS

To receive inbound calls and SMS, call or text the Dev Phone's configured phone number. Your communications should pass directly through to the Dev Phone, where you can click to accept.

## Next steps

Explore these resources to get more out of the Dev Phone:

* [Leave feedback on the Dev Phone](https://airtable.com/shrn1gZFT0uayIjgJ) so that we can make improvements
* The Dev Phone is open source. Open an issue or pull request on [the Dev Phone GitHub repository](https://github.com/twilio-labs/dev-phone)
* [Start building with the Dev Phone](/docs/messaging/tutorials/how-to-send-sms-messages) instead of your cell phone.
