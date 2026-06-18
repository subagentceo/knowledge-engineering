# Pay Connectors

Pay Connectors are integrations with payment processors/gateways that allow you to tokenize payment details and create charges on credit and debit cards. In a matter of minutes, a merchant or ISV (independent software vendor) can start accepting payments over a phone call without having to become [PCI Compliant](https://www.pcicomplianceguide.org/faq/#1). To learn about the pricing of Pay Connectors, [visit the pricing page](https://www.twilio.com/en-us/voice/pay-connectors/pricing).

![Flowchart showing TwiML Pay process with PCI compliance and Stripe integration.](https://docs-resources.prod.twilio.com/cc0b2361603f5c799b0f8dd175962869598c563544e897205c0e0763e7282965.png)

A tokenized payment is a payment that doesn't have any charge associated to it. A tokenized payment returns a token which represents a payment method information in the payment provider system (e.g. *customer ID*). In order to tokenize a payment using \<Pay>, the **chargeAmount** should be 0 or not present.

A charge transaction means you want to immediately capture funds from the customer's supplied payment method (i.e. credit card) in return for the goods or services you offer. In order to create a charge transaction with \<Pay>, the **chargeAmount** should be greater than 0.

Pay Connectors are available as a part of Twilio Programmable Voice. You can choose your preferred payment processor/gateway and instantly install it for free. Once installed, you must authorize Twilio to initiate transactions on your behalf.

![Pay Connectors Console showing Stripe and Base Commerce connectors installed.](https://docs-resources.prod.twilio.com/bb9bb73be83b1676fcc88f2a8c9fc84f8c7b4ab24a4958f2c9831505d61d9b53.png)

## Supported products

Twilio Pay Connectors are currently supported only by Programmable Voice. Navigate to [Pay Connectors](https://console.twilio.com/us1/develop/add-ons/catalog?tags=pay_connectors) in Twilio console to see list of available connectors.

If you don't see your preferred payment processor/gateway in the list of branded connectors, you can use a [Generic Pay Connector](/docs/voice/twiml/pay/generic-pay-connector). **Note:** The payment processor/gateway will need to write custom, PCI-compliant code to work with Twilio's Generic Pay Connector.

## Install and configure a Pay Connector

### Install Pay Connectors

Twilio's available Pay Connectors can be found [here in the Console](https://console.twilio.com/us1/develop/add-ons/catalog?tags=pay_connectors). To get started, click on your preferred Pay Connector and install it. This creates an instance of the Pay Connector that you can configure with a Unique Name (***Not treated as [PII](/docs/glossary/what-is-personally-identifiable-information-pii) by Twilio***).

![Stripe Connector page showing 'Default' as unique name under Configure tab.](https://docs-resources.prod.twilio.com/16014e3a7167e63b0fb75f25a84bc976715be6801a00b4d50c3dd7ed96e990b8.png)

### Configuration and authorization

Each Pay Connector instance must be given a unique name as highlighted in the above diagram. The Unique Name must be unique to this Twilio account. If you enter **Default**, then when you invoke \<Pay> you don't have to specify a paymentConnector attribute.

If you have multiple Pay Connector instances, you should use the `paymentConnector` attribute in your \<Pay> verb to indicate which Pay Connector you want to use. [See here to learn how to use \<Pay>](/docs/voice/twiml/pay).

For example, to use a Pay Connector instance with a unique name of `Stripe_Connector_1`, use the following:

Use a named Pay Connector

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.pay({
  paymentConnector: 'Stripe_Connector_1',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Pay, VoiceResponse

response = VoiceResponse()
response.pay(payment_connector='Stripe_Connector_1')

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
        response.Pay(paymentConnector: "Stripe_Connector_1");

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
        Pay pay = new Pay.Builder().paymentConnector("Stripe_Connector_1")
            .build();
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
			PaymentConnector: "Stripe_Connector_1",
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
$response->pay(['paymentConnector' => 'Stripe_Connector_1']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.pay(payment_connector: 'Stripe_Connector_1')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Pay paymentConnector="Stripe_Connector_1" />
</Response>
```

To initiate transactions from Twilio to the payment processor/gateway, you must first have an account set up with the payment processor/gateway. Make sure to authorize Twilio to initiate transactions on your behalf.

When you configure the Pay Connector instance you will do one of the following:

1. Provide your credentials/secret keys for the payment processor/gateway.
2. Authorize Twilio using a revocable access token.

> \[!NOTE]
>
> When possible, provide authorization that is scoped to only tokenization or charges. Not all payment processors/gateways make this possible.

## Create multiple instances of a Pay Connector

Twilio supports creating multiple instances of a Pay Connector. This means that you can create one instance of a Pay Connector for your production environment, another for your staging environment, and the third instance for your development environment.\
If using [Stripe](https://stripe.com), you might create the following three instances:

| # | Environment | Pay Connector Instance Unique Name | Stripe Mode |
| - | ----------- | ---------------------------------- | ----------- |
| 1 | Production  | Stripe\_Prod                       | Live        |
| 2 | Staging     | Stripe\_Stage                      | Test        |
| 3 | Development | Stripe\_Dev                        | Test        |

## Terms of Service

Pay Connectors are provided and supported by Twilio. As a part of the Pay Connector installation process, you are required to accept Twilio's Terms of Service.

The Pay Connector is provided under [https://www.twilio.com/en-us/pci-compliance](https://www.twilio.com/en-us/pci-compliance). Documentation specific to each payment gateway can be found on the Console under the documentation tab of the corresponding Pay Connector.

## Don't see the payment processor/gateway you're looking for?

Consider using our [Generic Pay Connector](/docs/voice/twiml/pay/generic-pay-connector) to connect to the payment processor of your choice.

## What's next?

Learn how to capture your first payment using \<Pay> with [this Pay Connector tutorial](/docs/voice/tutorials/how-capture-your-first-payment-using-pay).
