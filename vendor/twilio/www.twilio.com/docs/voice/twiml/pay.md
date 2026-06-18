# TwiML™ Voice: \<Pay>

> \[!NOTE]
>
> [\<Pay>](/docs/voice/twiml/pay) and the [Payment resource](/docs/voice/api/payment-resource) are now available in the Ireland (IE1) and Australia (AU1) Regions for the following Pay Connectors: Base Commerce, Braintree, CardConnect, Chase Paymentech, [Generic Pay Connector](/docs/voice/twiml/pay/generic-pay-connector), and Shuttle.
>
> * For outbound calls, [follow the guide for outbound calls in non-US Regions](/docs/global-infrastructure/create-an-outbound-call-via-rest-api-in-a-non-us-twilio-region).
> * For inbound calls, [follow the guide for inbound call processing in non-US Regions](/docs/global-infrastructure/inbound-call-processing).
> * For more info on Twilio Regions, [visit the Global Infrastructure docs](/docs/global-infrastructure).

To capture and process both Automatic Clearing House (ACH) and credit card data during a call, use [TwiML's](/docs/voice/twiml) `<Pay>` [verb](/docs/voice/twiml#twiml-verbs-for-programmable-voice).

`<Pay>` prompts your customer to enter their payment information. If the processor finds part of that information invalid, `<Pay>` also handles retries.

To keep you informed of its progress, `<Pay>` sends webhooks to your `statusCallback` URL. It also manages necessary interactions when a request times out or sends invalid input.

Once `<Pay>` captures all payment data, it sends that data to your payment processor or gateway via a Pay Connector configured on your account.

Once `<Pay>` finishes collecting a customer's valid payment information, it sends the transaction data to your `statusCallback` URL, your `action` URL, or both via webhook.

> \[!NOTE]
>
> `<Pay>` terminates when someone presses the `*` key and sends that dual tone multi-frequency (DTMF) signal at any point.
>
> When `<Pay>` finishes collecting valid payment data or terminates, Twilio sends a webhook to the `action` URL.
>
> **Twilio continues the current call using the TwiML message returned in the response from the `action` URL.**

`<Pay>` can create two types of transactions: **charge** and **tokenize**.

* A **charge** transaction means you want to capture funds from the customer's supplied payment method (like a credit card) in return for the goods or services you offer immediately.

  * To create a charge transaction, set the `chargeAmount` attribute in your `<Pay>` verb to a decimal value greater than 0.
* A **tokenize** transaction means you want to obtain a token based on the user's supplied credit card information from the payment processor instead of posting any charge. Tokens are typically stored so that you can charge the user in the future without having to ask for the credit card information again. **Note:** your payment gateway or processor provides tokens.

  * To create a tokenize transaction, set the `chargeAmount` to "0" **or** omit the `chargeAmount` attribute from your `<Pay>` verb.

## \<Pay> attributes

The `<Pay>` verb supports the following attributes to modify its default behavior:

| Attribute                                   | Allowed values                                                                                                                      | Default values                                              |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| [input](#input)                             | `dtmf`                                                                                                                              | `dtmf`                                                      |
| [action](#action)                           | A relative or absolute URL                                                                                                          | Current document URL. Must use https. Supports `POST` only. |
| [statusCallback](#statuscallback)           | A relative or absolute URL                                                                                                          | none                                                        |
| [paymentMethod](#paymentmethod)             | `ach-debit`, `credit-card`                                                                                                          | `credit-card`                                               |
| [bankAccountType](#bankaccounttype)         | `consumer-checking`, `consumer-savings`, `commercial-checking`                                                                      | `consumer-checking`                                         |
| [timeout](#timeout)                         | A positive integer                                                                                                                  | `5`                                                         |
| [maxAttempts](#maxattempts)                 | `1`, `2`, `3`                                                                                                                       | none                                                        |
| [securityCode](#securitycode)               | `true`, `false`                                                                                                                     | `"true"`                                                    |
| [postalCode](#postalcode)                   | `true`, `false`, a String value                                                                                                     | `"true"`                                                    |
| [minPostalCodeLength](#minpostalcodelength) | A positive integer                                                                                                                  | none                                                        |
| [paymentConnector](#paymentconnector)       | A String value                                                                                                                      | `Default`                                                   |
| [tokenType](#tokentype)                     | `one-time`,`reusable`, `payment-method`                                                                                             | `reusable`                                                  |
| [chargeAmount](#chargeamount)               | A decimal (min: 0, max: 1,000,000)                                                                                                  | none                                                        |
| [currency](#currency)                       | A String value                                                                                                                      | `usd`                                                       |
| [language](#language)                       | See list in the [language section below](#language).                                                                                | `en-us`                                                     |
| [description](#description)                 | A String value                                                                                                                      | none                                                        |
| [validCardTypes](#validcardtypes)           | One or more of the following values: `visa`, `mastercard`, `amex`, `maestro`, `discover`, `optima`, `jcb`, `diners-club`, `enroute` | `"visa mastercard amex"`                                    |

### input

A list of inputs that Twilio should accept for `<Pay>`. It supports **dtmf** only.

`<Pay>` redacts all digits captured from the logs.

[Back to attributes list](#pay-attributes)

### action

The URL where Twilio will send a `POST` request for the next set of TwiML instructions after a successful `<Pay>` transaction.

The `action` attribute takes an absolute or relative URL as value.

When the `<Pay>` verb has successfully tokenized or created a charge, Twilio will make a `POST` request to the `action` URL. The body of the request includes the [standard request parameters](/docs/voice/twiml#request-parameters) and the additional parameters described in the [Twilio's `POST` request to your action URL](#twilios-post-request-to-your-action-url) section below.

Twilio's default `action` makes a `POST` request to the current document URL.

The attribute only accepts **https** protocol for the URL.

If you made a tokenize transaction, Twilio's request to your application includes the `PaymentToken` parameter, the `ProfileId` parameter, or both. These fields contain the tokenized information received from the Payment Gateway.

If you made a charge transaction, Twilio's request to your application will include a `PaymentConfirmationCode` parameter with the confirmation code received from the payment processor or gateway.

> \[!WARNING]
>
> If you **started or updated** a `<Call>` that included a `twiml` parameter, the `action` URLs for `<Record>`, `<Gather>`, and `<Pay>` must be **absolute**.
>
> The [Call Resource API Docs](/docs/voice/api/call-resource) have language-specific examples of creating and updating Calls with TwiML:
>
> * To learn how to create a call with a `twiml` parameter, consult [Create a Call Resource](/docs/voice/api/call-resource#create-a-call-resource).
> * To learn how to update a call with a `twiml` parameter, consult [Update a Call Resource](/docs/voice/api/call-resource#update-a-call-resource).

#### Twilio's POST request to your action URL

After a successful `<Pay>` transaction, Twilio will send a `POST` request to your `action` URL. The body of this request will contain the [standard request parameters](/docs/voice/twiml#request-parameters), along with the additional parameters listed in the following table.

##### Result

The `Result` property contains the result of the `<Pay>` transaction. The following table lists possible values.

| `Result` value                 | Description                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| `success`                      | Twilio successfully captured the payment data and either tokenized or processed the payment |
| `too-many-failed-attempts`     | Max attempts reached when capturing the payment information                                 |
| `payment-connector-error`      | Twilio experienced an error communicating with the payment processor or gateway             |
| `caller-interrupted-with-star` | Caller pressed `*` (star) key to interrupt the payment session                              |
| `caller-hung-up`               | Caller hung up the call                                                                     |
| `validation-error`             | Invalid `<Pay>` verb attribute (Example: paymentAmount="-0.5")                              |
| `internal-error`               | Twilio encountered an error                                                                 |

##### ProfileId

The `ProfileId` property identifies the customer object associated with the payment. You can use this property as a token depending on which Pay Connector, payment processor, or both that you used.

* ACI: no value
* Base Commerce: no value
* Braintree: ID of the customer object (can't use as a token)
* CardConnect: profile
* Chase: customer reference number
* Stripe: ID of the customer resource

##### PaymentToken

The `PaymentToken` property is the tokenized value of the credit card or ACH payment data. Each payment processor handles tokens in their own way. The following list offers some examples.

* ACI uses a Card Token.
* Base Commerce uses a BankCard Token.
* Braintree and CardConnect use a token.
* Chase doesn't use tokens.
* Stripe can return one of two types of tokenized data:
  * If your request sets the `tokenType` attribute to `one-time` or `reusable`, the response returns a [Token object id](https://docs.stripe.com/api/tokens/object) .
  * If your request sets the `tokenType` attribute to `payment-method`, the response returns a [PaymentMethod object id](https://docs.stripe.com/payments/payment-methods#payment-method-object).

##### PaymentConfirmationCode

If the request used `<Pay>` to process the payment instead of tokenizing, the `PaymentConfirmationCode` property returns confirmation code from the payment gateway.

##### PaymentMethod

This property indicates the payment method that the developer set in the `<Pay>` verb's `paymentMethod` attribute. Possible values are `ach-debit` and `credit-card`.

##### PaymentCardNumber

If your request sets `paymentMethod="credit-card"`, the response includes the card number that the caller or consumer provided with only the last 4 digits visible. Example value: `"xxxx-xxxxxx-x4001"`

##### PaymentCardType

If your request sets `paymentMethod="credit-card"`, the response includes the type of card that the caller or consumer provided. The value will be one of the `validCardTypes`:

* `visa`
* `mastercard`
* `amex`
* `maestro`
* `discover`
* `optima`
* `jcb`
* `diners-club`
* `enroute`

##### ExpirationDate

If your request sets `paymentMethod="credit-card"`, the response includes the expiration date that the caller or consumer provided in MMYY (two-digit month, two-digit year) format. Example value: `0522`

##### SecurityCode

If your request sets `paymentMethod="credit-card"`, the response includes the security code that the caller or consumer provided. Twilio redacts this value in the response. Example value: `***`

##### PaymentCardPostalCode

If your request sets `paymentMethod="credit-card"`, the response includes the postal code that the caller or consumer provided. Example value: `94109`

##### BankAccountNumber

If your request sets `paymentMethod="ach-debit"`, the response includes the bank account number that the caller or consumer provided. Twilio redacts all but the last 2 digits of this value in the response. Example: A customer enters 508862392. The `BankAccountNumber` value will be `*******92`

##### BankRoutingNumber

If your request sets `paymentMethod="ach-debit"`, the response includes the complete bank routing number that the caller or consumer provided. Example value: `121181976`

##### BankAccountType

If your request sets `paymentMethod="ach-debit"`, the response includes the type of bank account that the caller or consumer provided. Possible values include, but not limited to, `"personal"` or `"business"`.

##### PaymentError

The `PaymentError` property shows error details for the following types of errors:

* Validation error for incorrect `<Pay>` verb attribute.
  * Example value: `paymentAmount='-0.59' (not a number between 0.00 - 1,000,000.00)`
* Payment error for failures.
  * Example value: `card is declined`
* Payment error for input timeout.
  * Example value: `invalid-date` (if user enters an invalid date or incorrect number of digits and times out)
  * Example value: `invalid-security-code` (if user enters an invalid CVV and times out)
  * Example value: `invalid-postal-code` (if user enters incorrect number of alphanumeric characters for the postal code and times out)

##### PayErrorCode

The `PayErrorCode` property is a numerical error code that gives more details about the error. To learn more about the error, visit the [Error Code Dictionary](/docs/api/errors) and search for the error code.

##### ConnectorError

The `ConnectorError` property contains the actual error code/message received from the underlying payment platform.

[Back to attributes list](#pay-attributes)

### statusCallback

The `statusCallback` attribute takes an absolute or relative URL as value. Whenever a status change happens in `<Pay>`, Twilio makes a `POST` request to this URL with the following parameters in its body.

##### AccountSid

The unique identifier of the Twilio Account responsible for this Pay session

##### CallSid

A unique identifier for the Call Resource associated with the Pay sessions. CallSid always refers to the parent leg of a two-leg call.

##### For

The current stage of `<Pay>` request. The following table describes the possible values.

| `For` value           | Description                                                              |
| --------------------- | ------------------------------------------------------------------------ |
| `payment-card-number` | Asking the customer for credit or debit card information                 |
| `expiration-date`     | Asking the customer for the expiration date for their payment card       |
| `security-code`       | Asking the customer for the security code for their payment card         |
| `postal-code`         | Asking the customer for the postal code associated with the payment card |
| `bank-routing-number` | Asking the customer for their bank's routing number                      |
| `bank-account-number` | Asking the customer for their bank account number                        |
| `payment-processing`  | Processing the payment                                                   |

##### ErrorType

The type of error that occurred (if applicable). The following table describes the possible error types.

| `ErrorType` value                                    | Description                                                                                                                                                           |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `input-timeout`                                      | The payment session experienced a timeout at one of the stages of the Pay session. See `PaymentError` for more details on the field the caller timed out on.          |
| `invalid-card-number`                                | The card entered didn't pass validation. This could include an incorrect number of digits for the credit card number, expiration date, security code, or postal code. |
| `invalid-card-type`                                  | The card number didn't match the accepted card types as specified by the `validCardTypes` attribute                                                                   |
| `invalid-date`                                       | The date entered was the incorrect number of digits, was in the past, or was otherwise not a valid date                                                               |
| `invalid-security-code`                              | Twilio received an invalid security code                                                                                                                              |
| `invalid-postal-code`                                | Twilio didn't receive the correct number of alphanumeric characters for the postal code                                                                               |
| `invalid-bank-routing-number`                        | Twilio either didn't receive the correct number of digits for the routing number or the routing number provided failed validation                                     |
| `invalid-bank-account-number`                        | Twilio didn't receive the minimum number of digits required for the bank account number                                                                               |
| `invalid-bank-account-type`                          | Twilio didn't receive the accepted values for `BankAccountType` field                                                                                                 |
| `invalid-card-number-security-code-capture-sequence` | Twilio validates the card verification value (CVV) against a credit card. If the request captures the CVV before the credit card number, it returns this error.       |
| `input-matching-failed`                              | Caller's inputs didn't match when using `<Prompt>` with `requireMatchingInputs`.                                                                                      |
| `session-in-progress`                                | If Twilio receives a request to start a new Pay session while the existing Pay session hasn't completed or cancelled, it returns this error.                          |
| `internal-error`                                     | Twilio encountered an internal error.                                                                                                                                 |

##### Attempt

The `Attempt` property indicates the current attempt count.

Possible values are `1`, `2`, or `3`.

##### PaymentCardNumber

*For `ach-debit` payments only.*

The `PaymentCardNumber` indicates the card number provided to `<Pay>` with only the last 4 digits visible. For example: `"xxxxxxxxxxx4001"`

##### PaymentCardType

*For `credit-card` payments only.*

The `PaymentCardType` indicates the type of card provided to `<Pay>`, For example: `"amex"` The value provided here will be one of the values provided in the `validCardTypes` attribute.

##### ExpirationDate

*For `credit-card` payments only.*

The `ExpirationDate` contains the credit card expiration date provided to `<Pay>` in MMYY (two-digit month, two-digit year) format. You would write a May 2022 expiration date as `"0522"` **Note:** The response displays this date in plaintext as it isn't PCI data.

##### SecurityCode

*For `credit-card` payments only.*

The `SecurityCode` contains the security code for the credit card provided to `<Pay>`. The response returns this value with all digits redacted.

##### PaymentCardPostalCode

*For `credit-card` payments only.*

The `PaymentCardPostalCode` contains the postal code that the caller or consumer provided. For example: `"94109"` **Note:** The response displays this value in plaintext as it isn't PCI data.

##### BankAccountNumber

*For `ach-debit` payments only.*

The `BankAccountNumber` contains the bank account number that the caller or consumer provided. Twilio returns all but the last two digits of this value redacted. For example: `"*******92"`.

##### BankRoutingNumber

*For `ach-debit` payments only.*

The `BankRoutingNumber` contains the complete bank routing number that the caller or consumer provided. For example: `"121181976"`

##### BankAccountType

*For `ach-debit` payments only.*

The `BankAccountType` contains the bank account type that the caller or consumer provided. Possible values are:

* `consumer-checking`
* `consumer-savings`
* `commercial-checking`

[Back to attributes list](#pay-attributes)

### paymentMethod

The `paymentMethod` attribute specifies whether to capture credit card or ACH payment information.

`<Pay>` by default captures credit card information (credit card number, expiration date, security code, and postal code).

To capture bank account information, set the value of the `paymentMethod` attribute to `"ach-debit"` as shown below.

```xml
<Response>
   <Pay paymentConnector="Your_Connector_Name" paymentMethod="ach-debit" />
</Response>

```

Once `<Pay>` successfully captures the information, it will securely send that information to the appropriate payment platform using the Pay Connector you've configured. Twilio returns the results from the payment platform via a webhook to the `action` URL specified in the `<Pay>` verb.

[Back to attributes list](#pay-attributes)

### bankAccountType

This attribute indicates the type of bank account information that the caller or consumer provided when capturing ACH payments. The `bankAccountType` attribute accepts either `"consumer-checking"`,`"consumer-savings"`, `"commercial-checking"`.

The processing speed of the ACH transactions depends on the `bankAccountType` and the underlying payment platform used.

Use [\<Gather>](/docs/voice/twiml/gather) to capture the type of bank account and pass one of the allowed values to your `bankAccountType` attribute when using `<Pay>` to capture ACH payments.

[Back to attributes list](#pay-attributes)

### timeout

The `timeout` attribute sets the limit in seconds that `<Pay>` will wait for the caller to press another digit before moving on to validate the digits captured.

For example, if `timeout` is 3, `<Pay>` will wait three seconds for the caller to press a key when capturing either credit card number, expiration date, security code or zip code. When accepting ACH payments, `<Pay>` will wait three seconds for the caller to press a key when capturing either bank account or routing numbers.

[Back to attributes list](#pay-attributes)

### maxAttempts

The `maxAttempts` attribute specifies the number of times `<Pay>` should retry when collecting information.

The default of `1` means `<Pay>` retries *once* when it encounters a timeout or receives invalid data. For example, if it receives a timeout when prompted for a credit card number, `<Pay>` reprompts one more time to enter a credit card number before terminating. When `<Pay>` hits the **maxAttempts** value, `<Pay>` terminates and TwiML execution starts with the next verb after `<Pay>`.

[Back to attributes list](#pay-attributes)

### securityCode

To let `<Pay>` know whether to prompt for security code, set the `securityCode` attribute to `true` or `false` .

When you set `paymentMethod` to `credit-card`, `<Pay>` collects the credit card number, expiration date, security code and zip code. Use `<Pay securityCode="false" />` to disable prompting for security code.

[Back to attributes list](#pay-attributes)

### postalCode

To let `<Pay>` know whether to prompt for a postal code, like the U.S. ZIP code, set the `postalCode` attribute to `true` or `false`.

When `paymentMethod="credit-card"`, `<Pay>` collects credit card number, expiration date, security code and postal code. To disable prompting for postal code, use `<Pay postalCode="false" />`. If you have access to customer code, provide the postal code as value to the attribute. For example, if the billing postal code is 95105 then use `<Pay postalCode="94105" />`. When processing this payment, `<Pay>` passes `94105` to the Payment Gateway.

[Back to attributes list](#pay-attributes)

### minPostalCodeLength

The `minPostalCodeLength` attribute takes a positive integer to let `<Pay>` validate the length of the **postalCode** attribute. Twilio expects users to enter at least these many alphanumeric characters.

[Back to attributes list](#pay-attributes)

### chargeAmount

The `chargeAmount` attribute takes an amount to charge against the credit card or bank account that `<Pay>` captured. The attribute takes a decimal value with no currency prefix and defaults to USD.

> \[!WARNING]
>
> If the `chargeAmount` attribute has a value greater than 0, the transaction will be a **charge** transaction.
>
> If the `<Pay>` verb omits the `chargeAmount` attribute or sets its value to `0`, the transaction becomes a **tokenize** transaction.

For example, use `chargeAmount="20.45"` to process payment in the amount of $20.45.

To override the default currency, use the **currency** attribute.

[Back to attributes list](#pay-attributes)

### currency

The `currency` attribute provides the currency of the `amount` attribute. This attribute defaults to `usd` (US Dollars). It accepts all values that the selected Pay Connector accepts.

[Back to attributes list](#pay-attributes)

### language

The `language` attribute provides the language that a customer hears when interacting with `<Pay>`.

For credit card payments, possible values are:

* English:

  * `en-AU`
  * `en-CA`
  * `en-GB`
  * `en-IN`
  * `en-US`
* Spanish:

  * `es-ES`
  * `es-MX`
* French:

  * `fr-CA`
  * `fr-FR`
* German:

  * `de-DE`
* Italian:

  * `it-IT`

For ACH, possible values are:

* English:

  * `en-AU`
  * `en-CA`
  * `en-GB`
  * `en-IN`
  * `en-US`

You can also further customize what the customer hears using the [\<Prompt>](/docs/voice/twiml/pay/prompt) noun.

[Back to attributes list](#pay-attributes)

### paymentConnector

The `paymentConnector` attribute must contain the unique name corresponding to the Pay Connector installed in your Twilio Marketplace Account in the Twilio Console. Learn more on [the Pay Connectors page](/docs/voice/twiml/pay/pay-connectors).

For example, to process the transaction using Stripe use **paymentConnector=Stripe\_1,** where *Stripe\_1* is the unique name specified when configuring the Pay Connector Add-on in the Marketplace.

If no one specifies a `paymentConnector`, `<Pay>` uses the Pay Connector on your account with the unique name `"Default"`.

If you are using a [Generic Pay Connector](/docs/voice/twiml/pay/generic-pay-connector), you can use the [\<Parameter> noun](/docs/voice/twiml/pay/twiml-voice-parameter) with `<Pay>` to pass custom parameters to your payment processor.

> \[!WARNING]
>
> You must have an installed Pay Connector named "Default" **or** you must include the `paymentConnector` attribute.

[Back to attributes list](#pay-attributes)

### tokenType

The `tokenType` attribute takes either `one-time` or `reusable` as value.

If you're using a Stripe Pay Connector, `payment-method` is also a possible value.

> \[!WARNING]
>
> To tokenize a payment method, set `chargeAmount` **=** `0` or omit the `chargeAmount` attribute.
>
> If `<Pay>` should generate a one-time token, use `tokenType="one-time"` and to generate a token for recurring payments use, `tokenType="reusable"`.

[Back to attributes list](#pay-attributes)

### description

The `description` attribute takes a value that describes more details regarding the payment.

Requests submit this information with the payment details to the Payment Gateway. This data gets posted on the transactions. For example, you can provide "Payment of $20.52 submitted from CallSid CAxxxxxx and Phone Number (xxx)-xxx-xxxx" to create a record to show which call created the payment.

[Back to attributes list](#pay-attributes)

### validCardTypes

The `validCardTypes` attribute takes credit card types that `<Pay>` should accept. Separate multiple values with a space.

If the payee enters a card number outside of valid card types, `<Pay>` returns an "invalid-card-type" error. For example, if `validCardTypes=visa mastercard` and payee enters an American Express card number, then `<Pay>` generates an "invalid-card-type" error.

The default value of `validCardTypes` is `"visa mastercard amex"`.

A customer could provide any of the following card types separated by space:

| Card type   | Description                                                                                                                                                                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| visa        | Valid length: 13, 15, 19 digits. First digit must be a 4.                                                                                                                                                                                                              |
| mastercard  | Valid length: 16 digits. First digit must be 5 and second digit must be in the range 1 through 5 inclusive. The range is 510000 through 559999. First digit must be 2 and second digit must be in the range 2 through 7 inclusive. The range is 222100 through 272099. |
| amex        | Valid length: 15 digits. First digit must be a 3 and second digit must be a 4 or 7.                                                                                                                                                                                    |
| maestro     | Valid length: 12-19 digits. First digit must be either 5 or 6. If the first digit starts with 5, then second digit must be either 0, 6, 7 or 8.                                                                                                                        |
| discover    | Valid length: 16-19 digits. Must start with either 64, 65 or 6011                                                                                                                                                                                                      |
| jcb         | Valid length: 16 to 19 digits. First 4 digits must be in the range 3528 through 3589.                                                                                                                                                                                  |
| diners-club | Diners Club for US and Canada Valid length: 16-19 digits. **\*** The digits must begin with 300, 301, 302, 303, 304, 3095, 36, 38, or 39.   **\* Note**: If first two digits are 36, valid length is 14-19 digits.                                                     |
| enroute     | Valid length: 15 digits. First four digits must be 2014 or 2149.                                                                                                                                                                                                       |

[Back to attributes list](#pay-attributes)

## \<Pay> sample usage

Collect payment data during a voice call and charge a specific amount.

Collect payment for a specific amount

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.say('Calling Twilio Pay');
response.pay({
  chargeAmount: '20.45',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Pay, VoiceResponse, Say

response = VoiceResponse()
response.say('Calling Twilio Pay')
response.pay(charge_amount='20.45')

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        response.Say("Calling Twilio Pay");
        response.Pay(chargeAmount: "20.45");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Pay;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Say say = new Say.Builder("Calling Twilio Pay").build();
        Pay pay = new Pay.Builder().chargeAmount("20.45").build();
        VoiceResponse response = new VoiceResponse.Builder().say(say).pay(pay)
            .build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceSay{
			Message: "Calling Twilio Pay",
		},
		&twiml.VoicePay{
			ChargeAmount: "20.45",
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$response->say('Calling Twilio Pay');
$response->pay(['chargeAmount' => '20.45']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.say(message: 'Calling Twilio Pay')
response.pay(charge_amount: '20.45')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Calling Twilio Pay</Say>   
  <Pay chargeAmount="20.45"/>
</Response>
```

Collect payment of a specific amount and specify a callback handler

Receive a callback on payment actions

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.say('Calling Twilio Pay');
response.pay({
  chargeAmount: '20.45',
  action: 'https://enter-your-callback-function-url.twil.io/pay',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Pay, VoiceResponse, Say

response = VoiceResponse()
response.say('Calling Twilio Pay')
response.pay(
    charge_amount='20.45',
    action='https://enter-your-callback-function-url.twil.io/pay'
)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        response.Say("Calling Twilio Pay");
        response.Pay(chargeAmount: "20.45",
            action: new Uri("https://enter-your-callback-function-url.twil.io/pay"));

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Pay;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Say say = new Say.Builder("Calling Twilio Pay").build();
        Pay pay = new Pay.Builder().chargeAmount("20.45")
            .action("https://enter-your-callback-function-url.twil.io/pay")
            .build();
        VoiceResponse response = new VoiceResponse.Builder().say(say).pay(pay)
            .build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceSay{
			Message: "Calling Twilio Pay",
		},
		&twiml.VoicePay{
			Action:       "https://enter-your-callback-function-url.twil.io/pay",
			ChargeAmount: "20.45",
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$response->say('Calling Twilio Pay');
$response->pay(['chargeAmount' => '20.45',
    'action' => 'https://enter-your-callback-function-url.twil.io/pay']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.say(message: 'Calling Twilio Pay')
response.pay(charge_amount: '20.45',
             action: 'https://enter-your-callback-function-url.twil.io/pay')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Calling Twilio Pay</Say>
  <Pay chargeAmount="20.45" 
    action="https://enter-your-callback-function-url.twil.io/pay"/>
</Response>
```

Tokenize a payment

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.pay({ tokenType: 'one-time', chargeAmount: '0' });

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Pay, VoiceResponse

response = VoiceResponse()
response.pay(token_type='one-time', charge_amount='0')

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        response.Pay(tokenType: "one-time", chargeAmount: "0");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Pay;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Pay pay = new Pay.Builder().tokenType(Pay.TokenType.ONE_TIME)
            .chargeAmount("0").build();
        VoiceResponse response = new VoiceResponse.Builder().pay(pay).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoicePay{
			ChargeAmount: "0",
			TokenType:    "one-time",
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$response->pay(['tokenType' => 'one-time', 'chargeAmount' => '0']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.pay(token_type: 'one-time', charge_amount: '0')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Pay tokenType="one-time" chargeAmount="0" />
</Response>
```
