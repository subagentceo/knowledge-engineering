# Post Messages to Slack with Twilio Studio

In this tutorial you will post an inbound SMS to a Slack feed using Twilio Studio and an incoming Slack webhook. You'll need an existing Slack team to follow along with this tutorial, so if you don't have one yet, [create one for free now.](https://slack.com/get-started)

## Prerequisites

Before you get started, you'll need:

* A Twilio Account. If you are new to Twilio, [create a free account](https://www.twilio.com/try-twilio). You can review the [features and limitations of a free Twilio account here](/docs/usage/tutorials/how-to-use-your-free-trial-account).
* A Twilio Phone Number. View instructions for [purchasing a Twilio Phone Number here](/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-free-twilio-phone-number).

New to Twilio Studio? Before completing this tutorial, you should familiarize yourself with the mechanics of working with Studio by reviewing the [Getting Started guide](/docs/studio/user-guide/get-started).

## Create Your Flow

You'll start with a new Twilio Studio Flow. A Flow is an individual workflow you create to handle your use case. For example, in this case you're going to post an inbound SMS to a Slack Feed. All the logic for this will exist in the Twilio Studio Flow you create.

To create a new Studio Flow:

1. Log into your Twilio account and navigate to the [Studio Dashboard](https://www.twilio.com/console/studio/).
2. Click the **Create a Flow** button to create your first Studio flow. If you already have some Studio Flows (awesome!), tap the **"+"** icon instead.
3. Name your Flow. You can name your Flow anything you like; we're calling ours "SMS to Slack".
4. Click next to select a template. You'll see a few different templates you can use but you'll want a blank Canvas for this tutorial, so select **Start from scratch** on the template selection screen.

   ![New flow creation screen with flow name 'SMS to Slack' and options to cancel or proceed.](https://docs-resources.prod.twilio.com/352ac96618f2d2ee823d1e95a9003825a8e3e177be792a4f3643b0905cd11edf.png)

You'll notice that the Canvas comes with a widget already in place - that's the **[Trigger (Start) widget](/docs/studio/widget-library/trigger-start)**. It will kick off your Flow when the trigger you specify is fired. In this case, your trigger is going to be an `Incoming Message`.

![Twilio Studio flow with post\_to\_slack HTTP request widget configuration.](https://docs-resources.prod.twilio.com/d5a554f534b9cffc4461382ac140d8f77368b96887261946aa78451325e4944d.png)

## The Make HTTP Request widget

This Studio Flow only requires one widget — the [**Make HTTP Request widget**](/docs/studio/widget-library/http-request). Drag a Make HTTP Request widget onto the Canvas from the **Tools & Execute Code** section of the Widget Library, and connect the red dot from the `Incoming Message` trigger to the gray dot in the upper left corner of the Make HTTP Request widget. Give your widget a name (in this example, *post\_to\_slack* is used).

![Twilio Studio Tutorial Post to Slack Blank HTTP Request widget on Canvas.](https://docs-resources.prod.twilio.com/6efacda23a2f656975b314355e4c2939171a6952d897c4a2228a3e73fc5c6c9e.png)

You'll need a **Request URL** in order to successfully use the Make HTTP Request widget, and in this case, it's going to be a Slack webhook URL.

## Configure Slack Webhook URL

[Slack has excellent documentation](https://api.slack.com/incoming-webhooks) around setting up incoming webhooks, and we encourage you to learn about the available customizations. Today, you'll focus on the part that is most relevant to the Make HTTP Request widget — **the webhook URL**.

First, [head over to Slack](https://my.slack.com/services/new/incoming-webhook/) to set up an incoming webhook integration.

Navigate to the incoming webhooks configuration page and select the Slack channel you'd like to send your inbound SMS to. Click the **Add Incoming WebHooks integration** button to create a new incoming webhook.

![Slack webhook setup with channel selection and integration button.](https://docs-resources.prod.twilio.com/17daedf705ee9df26ae8982283a01a00388d40982c38fb8271af369b9037beaf.png)

Once you create a new webhook integration, you'll get a Webhook URL like the one shown in the screenshot below:

![Slack webhook URL for integration setup.](https://docs-resources.prod.twilio.com/02555cc66edf5f2ca67256ed35e3c77af1fde89986ee91148e92bad2c9267749.png)

Copy this URL to your clipboard; you'll need it for the Make HTTP Request widget. Paste the URL into the **Request URL field** in the widget configuration menu for the Make HTTP Request widget.

![Twilio Studio Tutorial Post to Slack HTTP Request widget with Webhook shown in configuration panel.](https://docs-resources.prod.twilio.com/97546e6bd8b9423aeac0632310ab380ffa278ae3de49b8fe1e07b29432f71216.png)

Halfway there! Once you've got the Request URL set up, the next step is to declare a payload (the incoming SMS message). You can do this by setting an HTTP Body in a format that Slack will recognize.

## Declare the Payload

In the Make HTTP Request widget configuration menu, set the widget's **Content Type** to **Application/JSON** so that Slack knows what to expect. To format inbound SMS messages for the payload, set the Request Body field to the following, keeping the curly braces and quote marks in place:

`{"text": "{{trigger.message.Body}}"}`

![Twilio Studio HTTP request widget posting to Slack with JSON request body configuration.](https://docs-resources.prod.twilio.com/633c1ef35fec0c0e15a87242ad6eaa2aafd3e437a152b6d82fbc33e6692706f0.png)

Your HTTP request is now configured! Now you're ready to connect the Studio Flow to a Twilio phone number.

## Connect your Flow to a Twilio Phone Number

Once you're happy with your Flow and you've published all changes, you can connect it to a Twilio Number so people can start interacting with it.

Go to the [Numbers & senders section of the Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory) and click on the number you'd like to connect to the Flow. (If you do not have any phone numbers, you can [purchase one from the Console](/docs/numbers-and-senders/phone-number-senders).)

After clicking on the number, you will see its configuration menu where you can connect the number to your Studio Flow.

To trigger a Studio Flow with an Incoming Message, scroll down to the Messaging section in the configuration menu. Under **Configure with Other Handlers**, select the dropdown option "Webhook, TwiML Bin, Function, Studio Flow, Proxy Service". Then, under **A Message Comes In**, select the dropdown option "Studio Flow". You'll see another dropdown menu appear where you can select the Studio Flow you'd like to connect to when a message comes in to this number.

![Messaging configuration with regional routing and Studio Flow selection.](https://docs-resources.prod.twilio.com/be596b31cd689ac1f172f83460ba69d0ab4bd416e5faa2f63309921377f8fbbf.png)

Choose the Flow you'd like to connect the number to, and then press **Save** to save these changes. Your Flow is now connected to your Twilio number!

Now you can test out your SMS to Slack hook! Send an SMS to your Twilio number, and watch your Slack channel for an inbound message.

![Slack message from incoming-webhook app saying 'Ahoy, world!'.](https://docs-resources.prod.twilio.com/044ffafa7299d739d1b81ee4249805ad16f136be12e8fd89e4ca8889dfe1997d.png)

## What's Next?

Want to get creative? You can specify additional payload properties, such as **icon\_emoji**, **username**, and more. Enjoy watching the stream of messages in your Slack channel!

Learn more about Twilio Studio:

* [Check out the Trigger widget documentation](/docs/studio/widget-library/trigger-start) to learn about the widget that begins your Studio Flow.
* Dive deeper into the HTTP Request widget with the [Make HTTP Request widget documentation.](/docs/studio/widget-library/http-request)
