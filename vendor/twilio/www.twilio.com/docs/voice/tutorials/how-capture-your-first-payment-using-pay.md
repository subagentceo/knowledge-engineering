# How to capture your first payment using \<Pay>

In this tutorial, you'll create an interactive voice response (IVR) that collects payment details from a customer and passes the information in a [PCI-compliant](/docs/voice/pci-workflows) manner to your payment processor of choice. You'll use a TwiML Bin with the [\<Pay> verb](/docs/voice/twiml/pay) and the [Stripe](https://stripe.com/) Pay Connector to charge a credit card.

![Flowchart showing Twilio Pay process with TwiML and Stripe integration.](https://docs-resources.prod.twilio.com/cc0b2361603f5c799b0f8dd175962869598c563544e897205c0e0763e7282965.png)

In this tutorial you will learn how to:

1. Enable PCI Mode on your account
2. Create a Stripe account
3. Configure a Stripe Pay Connector
4. Create a TwiML Bin with `<Pay>`
5. Create a Twilio Function that handles the payment result and provides new TwiML instructions
6. Buy a Twilio phone number
7. Configure the Twilio phone number to use the TwiML Bin for incoming calls
8. Test capturing credit card details and see the resulting charge on your Stripe account

## 1. Enable PCI Mode

To use Twilio's Pay Connectors, you must enable PCI mode in the Twilio Console. This ensures Twilio captures payment details in a PCI-compliant manner and redacts sensitive PCI information from all call logs. Learn more about [PCI workflows](/docs/voice/pci-workflows).

> \[!CAUTION]
>
> PCI Mode will redact sensitive information from ALL of your account's logs. Turning on PCI Mode **cannot be undone**.
>
> If you want to avoid redacting information from all logs on an account, consider creating another Twilio account, enable PCI Mode on that account, and use that account when collecting payments with `<Pay>` or Agent Assist/Payment API.

To enable PCI Mode, complete the following steps:

1. Open **Voice** > **Settings** > **General** in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/settings/general-settings) or the [legacy Console](https://www.twilio.com/console/voice/settings).
2. Select **Enable PCI Mode**.
3. In the dialog, select **I Agree** to accept Twilio's Terms of Service.
4. Select **Save**.

## 2. Create a Stripe Account

`<Pay>` allows you to use a variety of payment providers; we will use Stripe for this tutorial.

To get started, [head over to Stripe to create your account](https://dashboard.stripe.com/register).

## 3. Configure Stripe Pay Connector

In order to authorize Twilio to create charges and create tokens on your behalf, you must connect your Stripe account to Twilio's Stripe Connect platform. Complete the following steps:

1. Open Pay Connectors in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/add-ons/catalog?tags=pay_connectors) or the [legacy Console](https://www.twilio.com/console/voice/pay-connectors). Select the **Stripe Connector** tile.
2. Select **Install**.
3. In the dialog, read the Terms of Service. Select the checkbox next to **I agree to Twilio Inc's Terms of Service**, then select **Agree & Install**.
4. Enter **Default** for the **UNIQUE NAME**.

   You can create one Pay Connector per Twilio account with the name **Default.** When `<Pay>` is invoked, if the `paymentConnector` attribute is not specified then the `Default` Pay Connector is used.
5. Select **Connect with Stripe**, which redirects you to Stripe. Enter your Stripe credentials and answer the prompts with your business details. If your Stripe account has not been activated to accept payments in live mode, bypass entering your business details by selecting **Skip this account form** at the top. You are then redirected back to Twilio.
6. You are directed back to the Stripe Connector page in the Twilio Console. Notice that the **STRIPE ACCOUNT ID** (`acct_XXXXXXXXXXXXXXX`) is now shown on the page. If you have multiple Stripe accounts for Dev/Stage/Prod, the Account ID helps you differentiate these accounts for each Stripe Connector Instance

## 4. Create a TwiML Bin with \<Pay>

Next, we'll use a TwiML Bin to provide Twilio with the `<Pay>` TwiML instruction. When Twilio executes the `<Pay>` verb, a customer will hear prompts to enter their payment information.

1. Open TwiML Bins in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/twiml-bins/twiml-bins) or the [legacy Console](https://www.twilio.com/console/runtime/twiml-bins).
2. Select the **+** button to create a new TwiML Bin.
3. Give the TwiML Bin a **FRIENDLY NAME** of "**\<Pay> with Stripe**"
4. Copy and paste the following TwiML into the **TWIML** input box:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <Response>
     <Say>Calling Twilio Pay</Say>
     <Pay paymentConnector="Default" action="" chargeAmount="20.45"/>
   </Response>
   ```

   Notice how the `<Pay>` verb has three attributes: `paymentConnector`, `action`, and `chargeAmount`. \
   The `paymentConnector` attribute's value is the Pay Connector you want to use with this `<Pay>` verb. In this case, it's the Generic Pay Connector you just created called "Default".\
   The `action` attribute is left blank for now. This attribute will be a URL. Upon the completion of a `<Pay>` transaction, Twilio will send a webhook to your `action` URL to get a new set of TwiML instructions. We'll create an endpoint in the next step that handles the request to this `action` attribute. \
   The `chargeAmount` attribute is set to `20.45`, representing a charge of $20.45. (If you wanted to create a tokenize transaction, you would set this attribute value to 0 or omit the attribute altogether.)
5. Select **Save** at the bottom of the page.

## 5. Create a Twilio Function to handle the payment result

When `<Pay>` completes capturing the consumers' credit card, the Pay Connector initiates a transaction with the Payment Provider. Next, the Twilio sends an HTTP request to `<Pay>`'s `action` URL with a `status` returned.

You will use [Twilio's Serverless Functions](/docs/serverless/api) to write and host the endpoint for our `action` URL. Twilio Functions allow you deploy Node.js-based applications without needing to install anything locally on your own machine.

1. Open **Functions & assets** > **Services** in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/functions/services), or **Functions** > **Services** in the [legacy Console](https://console.twilio.com/us1/develop/functions/services?frameUrl=%2Fconsole%2Ffunctions%2Foverview%2Fservices%3Fx-target-region%3Dus1).
2. Select **Create Service** to create a new Functions service.
3. In the **Name your Service** dialog, give your service the name `pay-with-stripe-action-url`.
4. Select **Next** on the **Name your Service** dialog.
5. In the **Functions** pane, rename the `/path_1` Function to `/pay` and press **Enter**.
6. Next to the **/pay** path name, you'll see a lock icon (hovering over it shows a **Protected** tooltip). Select the lock icon, then select **Public**.
7. **Select all of the provided sample code** in the code editor pane and **delete** **it**.
8. Copy and paste the following code into the code editor of your **/pay** function:

   ```javascript
   exports.handler = function(context, event, callback) {
       console.log("in Pay");
       console.log(event);
       console.log(event.Result);

       let twiml = new Twilio.twiml.VoiceResponse();

       switch (event.Result) {
       case "success":
           text = "Thank you for your payment";
           break;
       case "payment-connector-error":
           text = "The Payment Gateway is reporting an error";
           console.log(decodeURIComponent(event.PaymentError));
           break;

       default: 
           text = "The payment was not completed successfully";
   }
       twiml.say(text);
       callback(null, twiml);
   };
   ```

   Your Functions editor should now look like this: \\

   ![Code editor showing a function handling payment success and error cases.](https://docs-resources.prod.twilio.com/dab3cff20da1594a8e5f5be3f645d5fd8a27c1574e08a89b3c4918d18e492370.png)

   \
   This Function checks the `Result` property in the request from Twilio. If the `Result` is `"success"`, the Function returns the following TwiML:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <Response>
     <Say>Thank you for your payment</Say>
   </Response>
   ```

   If the Result is `"payment-connector-error"`, the function returns the following TwiML:

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <Response>
     <Say>The payment was not completed successfully</Say>
   </Response>
   ```
9. Select **Save** at the bottom of the code editor pane.
10. Select **Deploy All** at the bottom of the page. This deploys your Twilio Function to the internet.
11. Turn on the **Enable live logs** switch so that you'll see live logs when your **/pay** endpoint receives a request from Twilio.
12. Copy the URL for your new endpoint by selecting **Copy URL** next to the **Live logs on** toggle.
13. In a new browser tab, open the \<Pay> with Stripe TwiML Bin you created earlier. Find it in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/twiml-bins/twiml-bins) or the [legacy Console](https://console.twilio.com/develop/twiml-bins/twiml-bins?frameUrl=%2Fconsole%2Ftwiml-bins).
14. Paste the Function URL from step 12 between the double quotation marks after `action=` (i.e. in the place of `https://example.com/pay` below).

    ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <Response>
      <Say>Calling Twilio Pay</Say>
      <Pay paymentConnector="Default" chargeAmount="20.45" 
        action="https://example.com/pay"/>
    </Response>
    ```
15. Select **Save** on the TwiML Bin page.

Now it's time to purchase Twilio phone number and configure it to use the \<Pay> instructions in the TwiML Bin.

## 6. Purchase a Twilio phone number

If you don't already own a Twilio Voice-enabled phone number, complete the following steps:

1. Open **Buy a number** in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/number-requests) or the [legacy Console](https://www.twilio.com/console/phone-numbers/search).
2. Make sure the **Voice** checkbox is selected and select **Search**.
3. You'll see a list of available phone numbers and their capabilities. Find a number that you like and select **Buy**.
4. In the **Review Phone Number** dialog, review the information and select **Buy (xxx) xxx-xxxx** to confirm your purchase.

## 7. Configure a Twilio number to use your \<Pay> TwiML Bin for incoming calls

Now you'll navigate to the configuration page for the phone number and configure it to use your **\<Pay> with Stripe** TwiML Bin when someone calls the number.

1. If you see the **Number Purchased** modal from the last step, select **Configure (xxx) xxx-xxxx**. Otherwise, go to **Phone Numbers** > **Active numbers** and select the phone number you bought.
2. Give the phone number a **FRIENDLY NAME** of "**\<Pay> Tutorial**".
3. Scroll down to the **Voice & Fax** section.
4. Find the **A CALL COMES IN** label.
5. Select the **Webhook** list, then select **TwiML Bin**.
6. In the **Select a TwiML Bin** list, select **\<Pay> with Stripe**.
7. Select **Save** at the bottom of the page.

## 8. Test your application

Before you call your Twilio phone number, review what should happen:

* You dial your Twilio phone number
* The phone number's configuration points to the **\<Pay> with Stripe** TwiML Bin.
* Twilio executes the `<Pay>` verb, so you hear prompts to enter your payment details.
* You enter your payment details.
* Twilio sends a request to Stripe via your **Default** Stripe Pay Connector.
* Stripe returns a response to Twilio.
* Twilio sends a request with the result of the payment to your Twilio Function (the URL of `<Pay>`'s `action` attribute).
* The payment is successful, so your Twilio Function sends `<Say>Thank you for your payment.</Say>` TwiML back to Twilio.
* You hear "Thank you for your payment" and the call ends.

### Test it out

1. Call your Twilio number.
2. Enter your test payment information:

   * Credit card number: `4242 4242 4242 4242`
   * Expiry date (MM/YY): `12 25` (pick a date in the future)
   * Zip code: `94105`
   * CVC security code: `333`
3. To verify that your application correctly captured this data, open your call logs in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/logs/voice/calls) or the [legacy Console](https://www.twilio.com/console/voice/calls/logs) and select your most recent call. Scroll down to see the Request Inspector. Expand the parameters on the second `POST` for your call.
4. You can navigate over to your [Stripe Dashboard](https://dashboard.stripe.com/), copy the "PaymentConfirmationCode" "ch\_xxxxx," and paste into the Stripe search. You should see the following:

   ![Stripe payment of $20.45 succeeded with normal risk evaluation on Sep 13, 8:53 PM.](https://docs-resources.prod.twilio.com/de6ee5c432207099ebc2931ce7ea9a8caca63d074bfa24b709ca427200c57f92.png)

## Troubleshooting

You can add the line `console.log(event);` in your Twilio Function's code. (Don't forget to save and deploy the changes.) This prints out the request parameters in the Log to let you inspect the contents.

You can also navigate to your Call Logs in the Console and view the call in more detail.

You will notice a `POST` request to `<Pay>`'s `action` URL for each stage of the call, first `ringing` state, and then `in-progress`.

If you expand the second `POST` request parameters you will see the call status `in-progress`. The **Result** field shows information on error causes. [Read the \<Pay> documentation](/docs/voice/twiml/pay#twilios-post-request-to-your-action-url) for more information.

When Stripe rejects a transaction the result is `payment-connector-error` and you can get further insight by inspecting the **PaymentError** field.

For instance, if instead of entering `4242 4242 4242 4242` you enter another card then you will see the following:

![Payment error message: Only test cards allowed, with states FL and CA.](https://docs-resources.prod.twilio.com/49ce8657f741d8a8ea1b41098239d61769a6894ae72306c0f7e4c60fbd94cb31.png)

Stripe offers a list of test card numbers to help with error handling:

* 4100 0000 0000 0019 - Card declined
* 4000 0000 0000 9995 - Card has insufficient funds
* 4000 0000 0000 0069 - Card expired

See [Stripe's full list](https://stripe.com/docs/testing) of test cards.

If you want a `POST` request after each payment detail is collected, you can use [\<Pay>'s statusCallback](/docs/voice/twiml/pay#statuscallback) attribute.

## What's next?

Great work! In a few lines of code, you've captured payment details and charged your customer in test mode.

For more information on `<Pay>`, including unique attributes you can use to modify your payments, check out the [\<Pay>](/docs/voice/twiml/pay) docs.
