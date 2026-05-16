# Handle a Voice Contact

## Overview

On this page, you'll learn how to purchase, configure, and test a Twilio phone number to use with Flex.

## Purchase a new Twilio Phone Number

In order to provision more than one phone number, you must [upgrade your Twilio Flex account](https://help.twilio.com/hc/en-us/articles/223183208-Upgrading-to-a-paid-Twilio-Account). After upgrading, navigate to **Phone Numbers** > [**Buy a Number**](https://www.twilio.com/console/phone-numbers/search) in the Twilio Console. You can filter for specific phone numbers based on your business needs.

![Phone number review with $1.00 monthly fee and capabilities for voice, fax, SMS, and MMS.](https://docs-resources.prod.twilio.com/5dcaa2735c6b848d62453123dce8c3520beaa48dbf2faad0f28f351b2b7ddfd0.png)

If you want to use your phone number for messaging your customers, [make sure it is SMS-enabled](https://help.twilio.com/hc/en-us/articles/226690868-Using-Twilio-when-SMS-numbers-are-unavailable-in-your-country). You can learn about the different number types on the [Core Concepts: Numbers page](/docs/flex/admin-guide/core-concepts/numbers).

![review-number.](https://docs-resources.prod.twilio.com/f1783345a03611eb99f58a8e741d7e7d2c807c64498f6632a34b386f5b7a2cdd.png)

Upon successfully purchasing the phone number, you'll be redirected to that number's management page.

## Configure your Phone Number with a Studio Flow

By default, the phone number that came with your Flex instance is configured with the **Voice IVR** Studio Flow for voice calls. This is just an example, and you can handle the voice calls with any Studio Flow that eventually routes them to Flex. Routing to Flex is implemented by invoking the Send To Flex widget, which sends the call to TaskRouter to start looking for a suitable agent to handle it.

![Twilio Studio flow with trigger and SendCallToAgent widget for voice channel.](https://docs-resources.prod.twilio.com/05edac23656d91e9fc7ba12d553289438af6dfeb8bde5f3acc772cfc939947c4.png)

To configure a new phone number for Flex:

1. Open the phone number details from the [Manage Numbers page](https://www.twilio.com/console/phone-numbers/incoming) in Console.
2. Locate **Voice** and ensure the selection for **Configure With** is **Webhooks, TwiML Bins, Functions, Studio, or Proxy**.
3. Under **A Call Comes In**, select **Studio Flow**, then **Voice IVR** (or any other Studio Flow that you have set up to send your calls to Flex).
4. Click **Save**.

## Test the voice experience

To confirm that your new phone number is properly configured, follow the steps in [Answer a voice call in Flex](/docs/flex/admin-guide/setup/voice/test#answer-voice-calls-in-flex).

## Next steps

* [Handle an SMS Contact](/docs/flex/admin-guide/tutorials/sms-setup)
