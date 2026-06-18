# How to build an IVR with Twilio Studio

Twilio Studio is a visual drag-and-drop editor for creating communications workflows. Studio Flows are composed of widgets that represent operations in the Twilio API. By connecting these widgets, you can build applications, such as an [IVR (Interactive Voice Response) system](/docs/glossary/what-is-ivr), without writing code.

If you've ever pressed 1 on your phone to connect to an agent, you've interacted with an IVR. An IVR is an automated phone menu that lets callers navigate by voice or keypress so that calls are routed to the appropriate destination.

In this tutorial, you'll create a basic IVR that:

* Collects a keypress or speech input.
* Routes callers to one of two phone numbers (Sales or Support).

> \[!NOTE]
>
> New to Twilio Studio? Review the [Getting started guide for Twilio Studio](/docs/studio/user-guide/get-started) before beginning this tutorial.

## Prerequisites

Before you start, you need:

* A Twilio account. If you are new to Twilio, [create a free account](https://www.twilio.com/try-twilio). You can review the [features and limitations of a free account](/docs/usage/tutorials/how-to-use-your-free-trial-account).
* A Twilio phone number. Follow the instructions to [purchase a phone number](/docs/usage/tutorials/how-to-use-your-free-trial-account#get-your-free-twilio-phone-number).

## Create your Flow

Create a new Studio Flow that will hold the logic for the IVR.

Use the Twilio Console to create a Flow from scratch. If this is your first Flow, see [Create a Flow](/docs/studio/user-guide/get-started#create-a-flow) for detailed steps. Name the Flow, for example, "IVR Tutorial."

## Gather user input

The first task is to gather information from callers.

1. In the **Widget Library**, locate the [Gather Input on Call widget](/docs/studio/widget-library/gather-input-call) and drag it to the Canvas.
2. Connect the **[Trigger (Start) widget](/docs/studio/widget-library/trigger-start)** to the new widget by dragging from the red dot under **Incoming Call** to the Gather widget. This connection tells the Flow how to handle an incoming call.

### Configure the Gather Input on Call widget

1. Select the widget on the Canvas and, in the configuration pane, rename it to `greet_caller`.
2. Ensure **Say/Play a Message** is set to "Say a message," then enter the following prompt (or similar) in the text field:

   `Hello, how can we direct your call? Press 1 for Sales or say "Sales". Press 2 for Support or say "Support".`
3. Scroll to **Stop gathering on keypress?**, choose **YES**, and set **Stop gathering after \_ digits** to `1`. This setting prevents the widget from waiting for additional input after the caller presses one key.

![Config screen for gathering input on call, stop on key-press set to "Yes", stop after entering 1 digit, with save button.](https://docs-resources.prod.twilio.com/d56656bd682658db48589afcf7598dcfc914c80132e2af33903560c91d0f5b84.jpg)

## Route the call

With caller input collected, determine where to route the call.

### Split based on key press

1. Drag a [Split Based On… widget](/docs/studio/widget-library/split-based-on) to the Canvas and connect it to the **User Pressed Keys** transition from `greet_caller`.
2. Rename the widget to `split_key_press`.
3. In the configuration pane, set **Variable to test** to `widgets.greet_caller.Digits`.

![Connect split\_key\_press widget to User Pressed Keys transition from greet\_caller widget.](https://docs-resources.prod.twilio.com/e78a9cf48a8729f716f3667f8dc1516b6d30becd940c2849b48edb7ae86d28d9.png)

### Create transitions for key presses

1. In the **Transitions** tab of `split_key_press`, click **New**, select **Condition Matches**, and set **If value equal\_to…** to `1`.\
   This transition represents callers who pressed 1 for Sales.
2. Repeat the step above, creating a second condition where the value equals `2` for Support.

The widget now shows transitions for "1," "2," and **No Matches**.

![split\_key\_press with transitions for None, 1, and 2.](https://docs-resources.prod.twilio.com/a91d85421fdb268ec7d64d6804477805e0e455bd69c9d0c9cdcf8f776fb0355c.jpg)

## Connect the call

Use the [Connect Call To widget](/docs/studio/widget-library/connect-call) to forward the call.

1. Drag two Connect Call To widgets to the Canvas—one for Sales and one for Support.
2. Rename them `connect_call_to_sales` and `connect_call_to_support`.
3. For each widget, choose **Single Number** and enter the appropriate destination phone number (use different test numbers for Sales and Support).

![Two widgets and the widget configuration panel for call connection.](https://docs-resources.prod.twilio.com/2884eadb7f742ace408dfc61be36f02335853e2f6f460b2c7d2a3325c62e6681.jpg)

### Link the transitions

Connect the transition labeled `1` from `split_key_press` to `connect_call_to_sales`, and the transition labeled `2` to `connect_call_to_support`.

![Two connect\_call widgets attached to transitions from split\_key\_press.](https://docs-resources.prod.twilio.com/92d598a0c365c9c91e8633f7e5c64a74e6dc1e0ecd956f15ab3193a0a4feccb4.jpg)

## Split based on voice

Next, handle callers who speak their selection.

1. Drag another Split Based On… widget to the Canvas and rename it `split_voice_input`.
2. Set **Variable to test** to `widgets.greet_caller.SpeechResult`.
3. Connect **User Said Something** from `greet_caller` to `split_voice_input`.

![Split based on widget for voice input linked to User Said Something transition.](https://docs-resources.prod.twilio.com/abbb1a450d08428a7fbc308cb57e4bdded4441165226aa88f3b3e051e52de95a.png)

### Create transitions for speech input

1. In **Transitions** for `split_voice_input`, click **+**, choose **Condition Matches**, select **Contains**, and set the value to `Sales`.
2. Add another **Contains** condition with the value `Support`.

Using **Contains** instead of **Equal To** allows the match even if punctuation is present (for example, "Sales.").

![Twilio Studio IVR tutorial conditions for SpeechResult.](https://docs-resources.prod.twilio.com/b5aa52a73dcfeaf9ef9049048358c086d45fb74d1bee1d2649ab1fa40001aaef.png)

4. Connect the `Sales` transition to `connect_call_to_sales` and the `Support` transition to `connect_call_to_support`.

## Finish your IVR flow

The final Canvas should show:

* **Trigger (Start)** → **Gather Input on Call (`greet_caller`)**
* `greet_caller` → **split\_key\_press** (Digits) → **Connect Call To** (Sales or Support)
* `greet_caller` → **split\_voice\_input** (Speech) → **Connect Call To** (Sales or Support)

![Twilio Studio IVR tutorial full flow.](https://docs-resources.prod.twilio.com/e51d915c96f2685086875615fb5a485ff583fde4a3456cbe364ffbc16a892eaf.png)

After saving and publishing the Flow, connect it to a Twilio phone number.

### Connect your Twilio phone number to the IVR flow

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

Call the configured Twilio number and verify that keypress or speech input routes the call to the correct destination.

## What's next

Explore additional Studio tutorials:

* [Conduct a survey with Studio](/docs/studio/tutorials/how-to-conduct-a-survey)
* [Set up an SMS auto-responder](/docs/studio/tutorials/how-to-set-up-auto-responder)
* [Route leads](/docs/studio/tutorials/how-to-route-leads)
* [Use Studio's Liquid templates](/docs/studio/user-guide/liquid-template-language)
