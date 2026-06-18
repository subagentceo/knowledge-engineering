# Forward Calls with Twilio Studio

You can set up call forwarding with just one Studio widget. Divert calls to your personal or business number and never miss a critical call again.

## Prerequisites

Before you get started, you'll need:

* A Twilio Account. If you are new to Twilio, [create a free account](https://www.twilio.com/try-twilio). You can review the [features and limitations of a free Twilio account here](/docs/usage/tutorials/how-to-use-your-free-trial-account).
* A Twilio Phone Number. View instructions for [purchasing a Twilio Phone Number here](/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-free-twilio-phone-number).

> \[!WARNING]
>
> If you are sending SMS to the U.S. or Canada, please be aware of updated restrictions on the use of Toll-Free numbers for **messaging** purposes. These restrictions do not apply to **Voice**, or to other non-SMS uses of Twilio phone numbers. But if you obtain a Toll-Free Number for non-SMS purposes and then wish to use it as well for Messaging, please [read this first](https://help.twilio.com/hc/en-us/articles/20212966914075-Toll-Free-Verification-and-Developers-Navigating-the-New-Restrictions).

New to Twilio Studio? Before completing this tutorial, you should familiarize yourself with the mechanics of working with Studio by reviewing the [Getting Started guide](/docs/studio/user-guide/get-started).

## Create your Studio Flow

You'll start with a blank Twilio Studio Flow. Log into your Twilio account and navigate to the [Studio Dashboard](https://www.twilio.com/console/studio/), then select **Create new Flow** or tap the **+** icon to create a new Flow. You can name your Flow anything you like, for example, "Call Forwarding".

You'll notice that the Canvas comes with a widget already in place. That is the **[Trigger (Start) widget](/docs/studio/widget-library/trigger-start)**, which kicks off your Flow when the trigger you specify occurs. In this case, the trigger is going to be an `Incoming Call`.

![Twilio Studio canvas showing forward\_call widget connecting to number 5558675310 with config panel open.](https://docs-resources.prod.twilio.com/aaaccc8671403ee8da14aaadbe8b4baaadd00bbcef14594033136ccf6810dfa1.png)

## Configure and Publish your Flow

This Flow only requires one widget — the **[Connect Call To widget](/docs/studio/widget-library/connect-call)**. Drag one onto the Canvas and connect the dot from the `Incoming Call` trigger to the dot in the upper left corner of the new widget. This creates a Transition from the Incoming Call Trigger to the Connect Call To widget.

In the right sidebar, you'll see the Connect Call To widget's Configuration Menu. Select **Single Number** from the **Connect Call To** dropdown, and enter the number you'd like to forward your calls to. The number should be in [E.164 format](/docs/glossary/what-e164). You can also specify a Caller ID, which is the number that will show up when the call gets forwarded to your number. In this example, you can you leave the default.

![Twilio Studio Tutorial Forward Calls Connect Call To widget on Canvas shown with configuration panel on the right.](https://docs-resources.prod.twilio.com/5c8c80314fbef5e40079ebf0bff2d528f1ef291b0fde9c3ff347d34c71ba244a.png)

Your Canvas is now set up! Press **Publish** to update the Flow and you're ready to move on.

## Connect your Flow to a Twilio Phone Number

Once you're happy with your Flow and you've published all changes, you can connect it to a Twilio Number so people can start interacting with it.

## New Twilio console

1. Go to [Numbers & senders](https://1console.twilio.com/go?to=/account/account/__account__/us1/senders-hub/list/phone-numbers/inventory) and select the number you'd like to connect to the Flow. If you don't have any phone numbers, click **Set up a new phone number**.
2. Select the *Configuration details* tab.
3. Select **Voice and emergency calling**, then click **Edit details**.
4. On the *Edit voice configuration* dialog, select the **Webhook, TwiML Bin, Function, Studio Flow, Proxy Service** option.
5. Under *How do you want to set up your primary method?*, select **Studio Flow**.
6. Select the Studio Flow you'd like to connect to your phone number, then click **Save**.

## Legacy console

1. Go to the [Active Numbers section](https://www.twilio.com/console/phone-numbers/incoming) and click on the number you'd like to connect to the Flow. If you don't have any phone numbers, you can [purchase one from the Console](https://help.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console).
2. Scroll down to the Voice & Fax section of the configuration menu. Under **Configure With**, select the dropdown option "Webhook, TwiML Bin, Function, Studio Flow, Proxy Service".
3. Under **A Call Comes In**, select the dropdown option "Studio Flow". You'll see another dropdown menu appear where you can select the Studio Flow you'd like to connect to when a call comes in to this number.
4. Choose the Flow you'd like to connect the number to, and then press **Save** to save these changes. You've connected your Flow to your Twilio number.

Now it's time to test it out. Dial your Twilio number, and it should immediately connect you to the number you specified. Lean back, relax, and bask in the knowledge that you'll never miss an important phone call.
