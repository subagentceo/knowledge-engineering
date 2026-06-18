# No-code Voice quickstart with Twilio Studio

This quickstart shows you how to build an application that answers phone calls using [Twilio Studio](/docs/studio), our no-code application builder.

## Complete the prerequisites

1. [Create a Twilio account](https://www.twilio.com/try-twilio).
2. [Buy a voice-enabled phone number](https://www.twilio.com/console/phone-numbers/search).

## Create a Flow

A Flow is an application in Twilio Studio that handles calls and messages. Each Flow has a visual, flowchart-like interface.

1. Go to **Studio** > [**Flows**](https://www.twilio.com/console/studio/flows).
2. Click **Create new Flow**.
3. In the **Flow Name** field, enter a name for your Flow.
4. Click **Next**.
5. Keep **Start from scratch** selected, and click **Next**.

## Use a Widget

A canvas with a **Trigger Widget** and the **Widget Library** is displayed. Follow these steps to create a Widget:

1. In the **Widget Library**, find **Say/Play**.
2. Click and drag **Say/Play** onto the canvas. The canvas displays a Say/Play Widget.
3. Connect the Trigger Widget to the Say/Play Widget:
   * Click the red dot next to **Incoming Call** on the Trigger Widget.
   * Drag to the gray dot on the Say/Play Widget.
4. Select the Say/Play Widget.
5. In the configuration pane on the side of the canvas, find the **Text to say** field and enter the message you want callers to hear.
6. Click **Save**.
7. Click **Publish**.

## Connect a phone number to your Flow'

## Twilio console

1. Go to the [Numbers & senders](https://1console.twilio.com/go?to=/account/account/__account__/us1/senders-hub/list/phone-numbers/inventory) page in the Twilio Console.
2. Click a phone number.
3. Go to the **Configuration details** tab and select **Voice and emergency calling**.
4. Click **Edit details**.
5. On the *Edit voice configuration* dialog, select the **Webhook, TwiML Bin, Function, Studio Flow, Proxy Service** option.
6. Under *How do you want to set up your primary method?*, select **Studio Flow**.
7. Select the Studio Flow you'd like to connect to your phone number, then click **Save**.

## Legacy console

1. Go to the [Active Numbers](https://www.twilio.com/console/phone-numbers/incoming) page in the Twilio Console.
2. Click a phone number.
3. Go to the **Configure** tab and find the **Voice Configuration** section.
4. In the **A call comes in** row, select the **Studio Flow** option.
5. From the **Select a Flow** dropdown, select the name of your new Flow.
6. Click **Save configuration**.

## Test your application with a call

Place a call to your Twilio number. The message you entered earlier plays.

## Next steps

* [Get Started with Twilio Studio](/docs/studio/user-guide/get-started): a longer guide that covers variables, transitions and other concepts
* [Build an Interactive Voice Response system (IVR) with Twilio Studio](/docs/studio/tutorials/how-to-build-an-ivr)
* [Forward Calls with Twilio Studio](/docs/studio/tutorials/how-to-forward-calls)
* [Route Inbound Sales Leads with Twilio Studio](/docs/studio/tutorials/how-to-route-leads)
