# Hosted Number Order Resource

> \[!NOTE]
>
> The Hosted Phone Numbers API is currently under development, and this
> documentation is for existing users. A new version will soon be released as a
> generally available (GA) product. Be aware that the API path
> `https://preview.twilio.com/HostedNumbers/HostedNumberOrders` will change with
> the GA release. You will be informed about the timeline and given time to
> update accordingly.

The Hosted Number Orders product allows an account to request for their phone numbers to be hosted on Twilio for SMS. Start the Hosted Number onboarding process by sending a `POST` to the list resource, which will create a new request to host a phone number, or move the Hosted Number Order along the onboarding process by updating the status of the Hosted Number Orders Instance Resource. Upon creation of a Hosted Number Order instance resource, a corresponding [IncomingPhoneNumbers](/docs/phone-numbers/api/incomingphonenumber-resource) instance resource will also be created. Currently, Twilio only has the ability to onboard landline or toll-free US & Canada numbers that are not currently SMS enabled.

After the number's ownership has been verified, the user will then need to create a new Authorization Document that is electronically signed, giving Twilio permission to route SMS to and from Twilio's network. To see how to interact with the Authorization Documents resource, please visit the [Public API reference](/docs/phone-numbers/hosted-numbers/hosted-numbers-api/authorization-document-resource).

Once the process is completed, users will be able to answer phone calls on their existing infrastructure and leverage the same number identity for two-way SMS on Twilio's platform.

## HostedNumberOrder Properties

<OperationTable type="properties" data={{"type":"object","refName":"preview.hosted_numbers.hosted_number_order","modelName":"preview_hosted_numbers_hosted_number_order","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HR[0-9a-fA-F]{32}$","nullable":true,"description":"A 34 character string that uniquely identifies this HostedNumberOrder."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"A 34 character string that uniquely identifies the account."},"incoming_phone_number_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$","nullable":true,"description":"A 34 character string that uniquely identifies the [IncomingPhoneNumber](https://www.twilio.com/docs/phone-numbers/api/incomingphonenumber-resource) resource that represents the phone number being hosted."},"address_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AD[0-9a-fA-F]{32}$","nullable":true,"description":"A 34 character string that uniquely identifies the Address resource that represents the address of the owner of this phone number."},"signing_document_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PX[0-9a-fA-F]{32}$","nullable":true,"description":"A 34 character string that uniquely identifies the [Authorization Document](https://www.twilio.com/docs/phone-numbers/hosted-numbers/hosted-numbers-api/authorization-document-resource) the user needs to sign."},"phone_number":{"type":"string","format":"phone-number","nullable":true,"description":"Phone number to be hosted. This must be in [E.164](https://en.wikipedia.org/wiki/E.164) format, e.g., +16175551212"},"capabilities":{"type":"object","format":"phone-number-capabilities","x-class-extra-annotation":"@JsonInclude(JsonInclude.Include.NON_NULL)","nullable":true,"description":"Set of booleans describing the capabilities hosted on Twilio's platform. SMS is currently only supported.","properties":{"mms":{"type":"boolean"},"sms":{"type":"boolean"},"voice":{"type":"boolean"},"fax":{"type":"boolean"}}},"friendly_name":{"type":"string","nullable":true,"description":"A 64 character string that is a human-readable text that describes this resource.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"unique_name":{"type":"string","nullable":true,"description":"Provides a unique and addressable name to be assigned to this HostedNumberOrder, assigned by the developer, to be optionally used in addition to SID.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"status":{"type":"string","enum":["twilio-processing","received","pending-verification","verified","pending-loa","carrier-processing","testing","completed","failed","action-required"],"description":"Status of this resource. It can hold one of the values: 1. Twilio Processing 2. Received, 3. Pending LOA, 4. Carrier Processing, 5. Completed, 6. Action Required, 7. Failed. See the [HostedNumberOrders Status Values](https://www.twilio.com/docs/phone-numbers/hosted-numbers/hosted-numbers-api/hosted-number-order-resource#status-values) section for more information on each of these statuses.","refName":"hosted_number_order_enum_status","modelName":"hosted_number_order_enum_status"},"failure_reason":{"type":"string","nullable":true,"description":"A message that explains why a hosted_number_order went to status \"action-required\""},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date this resource was created, given as [GMT RFC 2822](http://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date that this resource was updated, given as [GMT RFC 2822](http://www.ietf.org/rfc/rfc2822.txt) format."},"verification_attempts":{"type":"integer","default":0,"description":"The number of attempts made to verify ownership of the phone number that is being hosted."},"email":{"type":"string","nullable":true,"description":"Email of the owner of this phone number that is being hosted.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"cc_emails":{"type":"array","nullable":true,"description":"A list of emails that LOA document for this HostedNumberOrder will be carbon copied to.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"items":{"type":"string"}},"url":{"type":"string","format":"uri","nullable":true,"description":"The URL of this HostedNumberOrder."},"verification_type":{"type":"string","enum":["phone-call","phone-bill"],"description":"The type of ownership verification required to move the number to a `verified` state. The verification methods are `phone-call` or `phone-bill`.","refName":"hosted_number_order_enum_verification_type","modelName":"hosted_number_order_enum_verification_type"},"verification_document_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RI[0-9a-fA-F]{32}$","nullable":true,"description":"A 34 character string that uniquely identifies the Identity Document resource that represents the document for verifying ownership of the number to be hosted."},"extension":{"type":"string","nullable":true,"description":"A numerical extension to be used when making the ownership verification call."},"call_delay":{"type":"integer","default":0,"description":"A value between 0-30 specifying the number of seconds to delay initiating the ownership verification call."},"verification_code":{"type":"string","nullable":true,"description":"A verification code provided in the response for a user to enter when they pick up the phone call."},"verification_call_sids":{"type":"array","nullable":true,"description":"A list of 34 character strings that are unique identifiers for the calls placed as part of ownership verification.","items":{"type":"string"}}}}} />

## Status Values \[#status-values]

| Status               | Description                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| twilio-processing    | Twilio is processing your request and will either send to the `failed` status if the number is not eligible to be hosted, or move the number to `received` status.                                                                                                                                                                                                                                                                     |
| received             | Twilio has received the HostedNumberOrder request and determined that the phone number in the request can be hosted on Twilio's platform.                                                                                                                                                                                                                                                                                              |
| pending-verification | Twilio is awaiting the Hosted Number Order to be verified by the end-user by picking up the phone and listening to a security token. The verification code is valid for *10 minutes*. Subsequent calls to the API within the expiration time will send the same verification code. There can be a max of three verification attempts before the status changes to action\_required.                                                    |
| verified             | Twilio has confirmed with a security token that the person answering the phone has verified their request for Hosted SMS.                                                                                                                                                                                                                                                                                                              |
| pending-loa          | LOA for the HostedNumberOrder has been generated, but the document has not yet been signed by the email recipient specified on the HostedNumberOrder.                                                                                                                                                                                                                                                                                  |
| carrier-processing   | LOA for the HostedNumberOrder has been signed, and the phone number has been submitted to Twilio's underlying provider/carrier to enable the specified capabilities.                                                                                                                                                                                                                                                                   |
| testing              | The phone number is undergoing capability testing for the capabilities specified in this order.                                                                                                                                                                                                                                                                                                                                        |
| completed            | HostedNumberOrder onboarding has completed and the phone number is ready for use.                                                                                                                                                                                                                                                                                                                                                      |
| action-required      | HostedNumberOrder onboarding encountered a failure. An operations specialist will investigate the failure.                                                                                                                                                                                                                                                                                                                             |
| failed               | The Hosted Number Order failed because the number is currently SMS enabled or has been idle for more than 30 days. At this point, it is no longer possible to re-submit the request for the failed Hosted Number Order. However, a *new* Hosted Number Order can be created for the same phone number once SMS registration has been deactivated on the phone number or the previous Hosted Number Order has failed due to being idle. |

## HostedNumberOrders Status Callback \[#status-Callback]

When a Hosted Number Order changes status, Twilio will make an asynchronous HTTP request to the StatusCallback URL if you provided one in your API request. By capturing this request, you can determine when the Hosted Number Order changes status.

The Hosted Number Orders status callback request passes the parameters listed in the table below:

| Status               | Description                                            |
| :------------------- | :----------------------------------------------------- |
| Status               | The new status of the Hosted Number Order              |
| HostedNumberOrderSid | The unique sid of the Hosted Number Order              |
| PhoneNumber          | The \[+E.164]\[e164] format of the Hosted Number Order |

## Create a HostedNumberOrder resource

`POST https://preview.twilio.com/HostedNumbers/HostedNumberOrders`

Creates a new Hosted Number Order for the specified capability. Currently, only SMS is a supported capability.

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateHostedNumbersHostedNumberOrderRequest","required":["PhoneNumber","SmsCapability"],"properties":{"PhoneNumber":{"type":"string","format":"phone-number","description":"The number to host in [+E.164](https://en.wikipedia.org/wiki/E.164) format"},"SmsCapability":{"type":"boolean","description":"Used to specify that the SMS capability will be hosted on Twilio's platform."},"AccountSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","description":"This defaults to the AccountSid of the authorization the user is using. This can be provided to specify a subaccount to add the HostedNumberOrder to."},"FriendlyName":{"type":"string","description":"A 64 character string that is a human readable text that describes this resource.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"UniqueName":{"type":"string","description":"Optional. Provides a unique and addressable name to be assigned to this HostedNumberOrder, assigned by the developer, to be optionally used in addition to SID.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"CcEmails":{"type":"array","description":"Optional. A list of emails that the LOA document for this HostedNumberOrder will be carbon copied to.","items":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"SmsUrl":{"type":"string","format":"uri","description":"The URL that Twilio should request when somebody sends an SMS to the phone number. This will be copied onto the IncomingPhoneNumber resource."},"SmsMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method that should be used to request the SmsUrl. Must be either `GET` or `POST`.  This will be copied onto the IncomingPhoneNumber resource."},"SmsFallbackUrl":{"type":"string","format":"uri","description":"A URL that Twilio will request if an error occurs requesting or executing the TwiML defined by SmsUrl. This will be copied onto the IncomingPhoneNumber resource."},"SmsFallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method that should be used to request the SmsFallbackUrl. Must be either `GET` or `POST`. This will be copied onto the IncomingPhoneNumber resource."},"StatusCallbackUrl":{"type":"string","format":"uri","description":"Optional. The Status Callback URL attached to the IncomingPhoneNumber resource."},"StatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"Optional. The Status Callback Method attached to the IncomingPhoneNumber resource."},"SmsApplicationSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AP[0-9a-fA-F]{32}$","description":"Optional. The 34 character sid of the application Twilio should use to handle SMS messages sent to this number. If a `SmsApplicationSid` is present, Twilio will ignore all of the SMS urls above and use those set on the application."},"AddressSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AD[0-9a-fA-F]{32}$","description":"Optional. A 34 character string that uniquely identifies the Address resource that represents the address of the owner of this phone number."},"Email":{"type":"string","description":"Optional. Email of the owner of this phone number that is being hosted.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"VerificationType":{"type":"string","enum":["phone-call","phone-bill"],"description":"The type of ownership verification required to move the number to a `verified` state. The verification methods are `phone-call` or `phone-bill`.","refName":"hosted_number_order_enum_verification_type","modelName":"hosted_number_order_enum_verification_type"},"VerificationDocumentSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RI[0-9a-fA-F]{32}$","description":"Optional. The unique sid identifier of the Identity Document that represents the document for verifying ownership of the number to be hosted. Required when VerificationType is phone-bill."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"AddressSid\": \"AD11111111111111111111111111111111\",\n  \"PhoneNumber\": \"+14153608311\",\n  \"SmsCapability\": true,\n  \"Email\": \"test@twilio.com\"\n}","meta":"","code":"{\n  \"AddressSid\": \"AD11111111111111111111111111111111\",\n  \"PhoneNumber\": \"+14153608311\",\n  \"SmsCapability\": true,\n  \"Email\": \"test@twilio.com\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"AddressSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"AD11111111111111111111111111111111\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PhoneNumber\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14153608311\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsCapability\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Email\"","#7EE787"],[":","#C9D1D9"]," ",["\"test@twilio.com\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithoutOptionalLoaFields":{"value":{"lang":"json","value":"{\n  \"PhoneNumber\": \"+14153608311\",\n  \"SmsCapability\": true\n}","meta":"","code":"{\n  \"PhoneNumber\": \"+14153608311\",\n  \"SmsCapability\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"PhoneNumber\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14153608311\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsCapability\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithPhoneBillVerification":{"value":{"lang":"json","value":"{\n  \"PhoneNumber\": \"+14153608311\",\n  \"SmsCapability\": true,\n  \"VerificationType\": \"phone-bill\",\n  \"VerificationDocumentSid\": \"RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"PhoneNumber\": \"+14153608311\",\n  \"SmsCapability\": true,\n  \"VerificationType\": \"phone-bill\",\n  \"VerificationDocumentSid\": \"RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"PhoneNumber\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14153608311\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsCapability\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"VerificationType\"","#7EE787"],[":","#C9D1D9"]," ",["\"phone-bill\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VerificationDocumentSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create Hosted Number Order

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createHostedNumbersHostedNumberOrder() {
  const hostedNumberOrder =
    await client.preview.hosted_numbers.hostedNumberOrders.create({
      phoneNumber: "+15017122661",
      smsCapability: true,
    });

  console.log(hostedNumberOrder.sid);
}

createHostedNumbersHostedNumberOrder();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

hosted_number_order = client.preview.hosted_numbers.hosted_number_orders.create(
    phone_number="+15017122661", sms_capability=True
)

print(hosted_number_order.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Preview.HostedNumbers;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var hostedNumberOrder = await HostedNumberOrderResource.CreateAsync(
            phoneNumber: new Twilio.Types.PhoneNumber("+15017122661"), smsCapability: true);

        Console.WriteLine(hostedNumberOrder.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.preview.hostedNumbers.HostedNumberOrder;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        HostedNumberOrder hostedNumberOrder =
            HostedNumberOrder.creator(new com.twilio.type.PhoneNumber("+15017122661"), true).create();

        System.out.println(hostedNumberOrder.getSid());
    }
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$hosted_number_order = $twilio->preview->hostedNumbers->hostedNumberOrders->create(
    "+15017122661", // PhoneNumber
    true // SmsCapability
);

print $hosted_number_order->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

hosted_number_order = @client
                      .preview
                      .hosted_numbers
                      .hosted_number_orders
                      .create(
                        phone_number: '+15017122661',
                        sms_capability: true
                      )

puts hosted_number_order.sid
```

```bash
curl -X POST "https://preview.twilio.com/HostedNumbers/HostedNumberOrders" \
--data-urlencode "PhoneNumber=+15017122661" \
--data-urlencode "SmsCapability=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_sid": "AD11111111111111111111111111111111",
  "call_delay": 0,
  "capabilities": {
    "sms": true,
    "voice": false
  },
  "cc_emails": [],
  "date_created": "2017-03-28T20:06:39Z",
  "date_updated": "2017-03-28T20:06:39Z",
  "email": "test@twilio.com",
  "extension": null,
  "failure_reason": "",
  "friendly_name": null,
  "incoming_phone_number_sid": "PN11111111111111111111111111111111",
  "phone_number": "+15017122661",
  "sid": "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "signing_document_sid": null,
  "status": "received",
  "unique_name": null,
  "url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verification_attempts": 0,
  "verification_call_sids": null,
  "verification_code": null,
  "verification_document_sid": null,
  "verification_type": "phone-call"
}
```

## Fetch a HostedNumberOrder resource

`GET https://preview.twilio.com/HostedNumbers/HostedNumberOrders/{Sid}`

Returns a single, existing Hosted Number Orders instance resource specified by the requested Hosted Number Orders instance resource SID.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"A 34 character string that uniquely identifies this HostedNumberOrder.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HR[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a specific HostedNumberOrder

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchHostedNumbersHostedNumberOrder() {
  const hostedNumberOrder = await client.preview.hosted_numbers
    .hostedNumberOrders("HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(hostedNumberOrder.sid);
}

fetchHostedNumbersHostedNumberOrder();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

hosted_number_order = client.preview.hosted_numbers.hosted_number_orders(
    "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(hosted_number_order.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Preview.HostedNumbers;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var hostedNumberOrder = await HostedNumberOrderResource.FetchAsync(
            pathSid: "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(hostedNumberOrder.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.preview.hostedNumbers.HostedNumberOrder;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        HostedNumberOrder hostedNumberOrder = HostedNumberOrder.fetcher("HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(hostedNumberOrder.getSid());
    }
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$hosted_number_order = $twilio->preview->hostedNumbers
    ->hostedNumberOrders("HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $hosted_number_order->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

hosted_number_order = @client
                      .preview
                      .hosted_numbers
                      .hosted_number_orders('HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                      .fetch

puts hosted_number_order.sid
```

```bash
curl -X GET "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_sid": "AD11111111111111111111111111111111",
  "call_delay": 15,
  "capabilities": {
    "sms": true,
    "voice": false
  },
  "cc_emails": [
    "aaa@twilio.com",
    "bbb@twilio.com"
  ],
  "date_created": "2017-03-28T20:06:39Z",
  "date_updated": "2017-03-28T20:06:39Z",
  "email": "test@twilio.com",
  "extension": "5105",
  "failure_reason": "",
  "friendly_name": "friendly_name",
  "incoming_phone_number_sid": "PN11111111111111111111111111111111",
  "phone_number": "+14153608311",
  "sid": "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "signing_document_sid": "PX11111111111111111111111111111111",
  "status": "received",
  "unique_name": "foobar",
  "url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verification_attempts": 0,
  "verification_call_sids": [
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
  ],
  "verification_code": "8794",
  "verification_document_sid": null,
  "verification_type": "phone-call"
}
```

## Read multiple HostedNumberOrder resources

`GET https://preview.twilio.com/HostedNumbers/HostedNumberOrders`

### Query parameters

```json
[{"name":"Status","in":"query","description":"The Status of this HostedNumberOrder. One of `received`, `pending-verification`, `verified`, `pending-loa`, `carrier-processing`, `testing`, `completed`, `failed`, or `action-required`.","schema":{"type":"string","enum":["twilio-processing","received","pending-verification","verified","pending-loa","carrier-processing","testing","completed","failed","action-required"],"description":"Status of this resource. It can hold one of the values: 1. Twilio Processing 2. Received, 3. Pending LOA, 4. Carrier Processing, 5. Completed, 6. Action Required, 7. Failed. See the [HostedNumberOrders Status Values](https://www.twilio.com/docs/phone-numbers/hosted-numbers/hosted-numbers-api/hosted-number-order-resource#status-values) section for more information on each of these statuses.","refName":"hosted_number_order_enum_status","modelName":"hosted_number_order_enum_status"},"examples":{"readEmpty":{"value":"completed"}}},{"name":"PhoneNumber","in":"query","description":"An E164 formatted phone number hosted by this HostedNumberOrder.","schema":{"type":"string","format":"phone-number"},"examples":{"readEmpty":{"value":"+19193608000"}}},{"name":"IncomingPhoneNumberSid","in":"query","description":"A 34 character string that uniquely identifies the IncomingPhoneNumber resource created by this HostedNumberOrder.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$"},"examples":{"readEmpty":{"value":"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"FriendlyName","in":"query","description":"A human readable description of this resource, up to 64 characters.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"examples":{"readEmpty":{"value":"example"}}},{"name":"UniqueName","in":"query","description":"Provides a unique and addressable name to be assigned to this HostedNumberOrder, assigned by the developer, to be optionally used in addition to SID.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"examples":{"readEmpty":{"value":"something123"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieve a list of HostedNumberOrders belonging to the account initiating the request

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listHostedNumbersHostedNumberOrder() {
  const hostedNumberOrders =
    await client.preview.hosted_numbers.hostedNumberOrders.list({ limit: 20 });

  hostedNumberOrders.forEach((h) => console.log(h.sid));
}

listHostedNumbersHostedNumberOrder();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

hosted_number_orders = client.preview.hosted_numbers.hosted_number_orders.list(
    limit=20
)

for record in hosted_number_orders:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Preview.HostedNumbers;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var hostedNumberOrders = await HostedNumberOrderResource.ReadAsync(limit: 20);

        foreach (var record in hostedNumberOrders) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.preview.hostedNumbers.HostedNumberOrder;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<HostedNumberOrder> hostedNumberOrders = HostedNumberOrder.reader().limit(20).read();

        for (HostedNumberOrder record : hostedNumberOrders) {
            System.out.println(record.getSid());
        }
    }
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$hostedNumberOrders = $twilio->preview->hostedNumbers->hostedNumberOrders->read(
    [],
    20
);

foreach ($hostedNumberOrders as $record) {
    print $record->sid;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

hosted_number_orders = @client
                       .preview
                       .hosted_numbers
                       .hosted_number_orders
                       .list(limit: 20)

hosted_number_orders.each do |record|
   puts record.sid
end
```

```bash
curl -X GET "https://preview.twilio.com/HostedNumbers/HostedNumberOrders?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "first_page_url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders?Status=completed&FriendlyName=example&PhoneNumber=%2B19193608000&UniqueName=something123&IncomingPhoneNumberSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "key": "items",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders?Status=completed&FriendlyName=example&PhoneNumber=%2B19193608000&UniqueName=something123&IncomingPhoneNumberSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0"
  },
  "items": []
}
```

## Update a HostedNumberOrder resource

`POST https://preview.twilio.com/HostedNumbers/HostedNumberOrders/{Sid}`

Tries to update a single, existing Hosted Number Orders instance resource's properties and returns the updated resource representation if successful. The returned response is identical to that returned above when fetching.

{" "}

### Path parameters

```json
[{"name":"Sid","in":"path","description":"A 34 character string that uniquely identifies this HostedNumberOrder.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HR[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateHostedNumbersHostedNumberOrderRequest","properties":{"FriendlyName":{"type":"string","description":"A 64 character string that is a human readable text that describes this resource.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"UniqueName":{"type":"string","description":"Provides a unique and addressable name to be assigned to this HostedNumberOrder, assigned by the developer, to be optionally used in addition to SID.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Email":{"type":"string","description":"Email of the owner of this phone number that is being hosted.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"CcEmails":{"type":"array","description":"Optional. A list of emails that LOA document for this HostedNumberOrder will be carbon copied to.","items":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Status":{"type":"string","enum":["twilio-processing","received","pending-verification","verified","pending-loa","carrier-processing","testing","completed","failed","action-required"],"description":"Status of this resource. It can hold one of the values: 1. Twilio Processing 2. Received, 3. Pending LOA, 4. Carrier Processing, 5. Completed, 6. Action Required, 7. Failed. See the [HostedNumberOrders Status Values](https://www.twilio.com/docs/phone-numbers/hosted-numbers/hosted-numbers-api/hosted-number-order-resource#status-values) section for more information on each of these statuses.","refName":"hosted_number_order_enum_status","modelName":"hosted_number_order_enum_status"},"VerificationCode":{"type":"string","description":"A verification code that is given to the user via a phone call to the phone number that is being hosted."},"VerificationType":{"type":"string","enum":["phone-call","phone-bill"],"description":"The type of ownership verification required to move the number to a `verified` state. The verification methods are `phone-call` or `phone-bill`.","refName":"hosted_number_order_enum_verification_type","modelName":"hosted_number_order_enum_verification_type"},"VerificationDocumentSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RI[0-9a-fA-F]{32}$","description":"Optional. The unique sid identifier of the Identity Document that represents the document for verifying ownership of the number to be hosted. Required when VerificationType is phone-bill."},"Extension":{"type":"string","description":"Digits to dial after connecting the verification call."},"CallDelay":{"type":"integer","description":"The number of seconds, between 0 and 60, to delay before initiating the verification call. Defaults to 0."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"new friendly name\",\n  \"UniqueName\": \"new unique name\",\n  \"Email\": \"test+hosted@twilio.com\",\n  \"CcEmails\": [\n    \"test1@twilio.com\",\n    \"test2@twilio.com\"\n  ],\n  \"Status\": \"pending-loa\",\n  \"Extension\": \"1234\",\n  \"CallDelay\": 15\n}","meta":"","code":"{\n  \"FriendlyName\": \"new friendly name\",\n  \"UniqueName\": \"new unique name\",\n  \"Email\": \"test+hosted@twilio.com\",\n  \"CcEmails\": [\n    \"test1@twilio.com\",\n    \"test2@twilio.com\"\n  ],\n  \"Status\": \"pending-loa\",\n  \"Extension\": \"1234\",\n  \"CallDelay\": 15\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"new friendly name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"new unique name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Email\"","#7EE787"],[":","#C9D1D9"]," ",["\"test+hosted@twilio.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CcEmails\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"test1@twilio.com\"","#A5D6FF"],[",","#C9D1D9"],"\n    ",["\"test2@twilio.com\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"pending-loa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Extension\"","#7EE787"],[":","#C9D1D9"]," ",["\"1234\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CallDelay\"","#7EE787"],[":","#C9D1D9"]," ",["15","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

{" "}

Update Friendly Name of Hosted Number Order

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateHostedNumbersHostedNumberOrder() {
  const hostedNumberOrder = await client.preview.hosted_numbers
    .hostedNumberOrders("HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ friendlyName: "My important hosted number order" });

  console.log(hostedNumberOrder.sid);
}

updateHostedNumbersHostedNumberOrder();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

hosted_numbers_hosted_number_order = (
    client.preview.hosted_numbers.hosted_number_orders(
        "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    ).update(friendly_name="My important hosted number order")
)

print(hosted_numbers_hosted_number_order.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Preview.HostedNumbers;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var hostedNumberOrder = await HostedNumberOrderResource.UpdateAsync(
            friendlyName: "My important hosted number order",
            pathSid: "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(hostedNumberOrder.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.preview.hostedNumbers.HostedNumberOrder;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        HostedNumberOrder hostedNumberOrder = HostedNumberOrder.updater("HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                                  .setFriendlyName("My important hosted number order")
                                                  .update();

        System.out.println(hostedNumberOrder.getSid());
    }
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$hosted_numbers_hosted_number_order = $twilio->preview->hostedNumbers
    ->hostedNumberOrders("HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["friendlyName" => "My important hosted number order"]);

print $hosted_numbers_hosted_number_order->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

hosted_number_order = @client
                      .preview
                      .hosted_numbers
                      .hosted_number_orders('HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                      .update(friendly_name: 'My important hosted number order')

puts hosted_number_order.sid
```

```bash
curl -X POST "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "FriendlyName=My important hosted number order" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_sid": "AD11111111111111111111111111111111",
  "call_delay": 15,
  "capabilities": {
    "sms": true,
    "voice": false
  },
  "cc_emails": [
    "test1@twilio.com",
    "test2@twilio.com"
  ],
  "date_created": "2017-03-28T20:06:39Z",
  "date_updated": "2017-03-28T20:06:39Z",
  "email": "test+hosted@twilio.com",
  "extension": "1234",
  "failure_reason": "",
  "friendly_name": "My important hosted number order",
  "incoming_phone_number_sid": "PN11111111111111111111111111111111",
  "phone_number": "+14153608311",
  "sid": "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "signing_document_sid": "PX11111111111111111111111111111111",
  "status": "pending-loa",
  "unique_name": "new unique name",
  "url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verification_attempts": 1,
  "verification_call_sids": [
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
  ],
  "verification_code": "8794",
  "verification_document_sid": null,
  "verification_type": "phone-call"
}
```

{" "}

Prove Ownership with Phone Call

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateHostedNumbersHostedNumberOrder() {
  const hostedNumberOrder = await client.preview.hosted_numbers
    .hostedNumberOrders("HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      status: "pending-verification",
      verificationType: "phone-call",
    });

  console.log(hostedNumberOrder.sid);
}

updateHostedNumbersHostedNumberOrder();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

hosted_numbers_hosted_number_order = (
    client.preview.hosted_numbers.hosted_number_orders(
        "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    ).update(verification_type="phone-call", status="pending-verification")
)

print(hosted_numbers_hosted_number_order.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Preview.HostedNumbers;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var hostedNumberOrder = await HostedNumberOrderResource.UpdateAsync(
            verificationType: HostedNumberOrderResource.VerificationTypeEnum.PhoneCall,
            status: HostedNumberOrderResource.StatusEnum.PendingVerification,
            pathSid: "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(hostedNumberOrder.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.preview.hostedNumbers.HostedNumberOrder;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        HostedNumberOrder hostedNumberOrder = HostedNumberOrder.updater("HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                                  .setVerificationType(HostedNumberOrder.VerificationType.PHONE_CALL)
                                                  .setStatus(HostedNumberOrder.Status.PENDING_VERIFICATION)
                                                  .update();

        System.out.println(hostedNumberOrder.getSid());
    }
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$hosted_numbers_hosted_number_order = $twilio->preview->hostedNumbers
    ->hostedNumberOrders("HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "verificationType" => "phone-call",
        "status" => "pending-verification",
    ]);

print $hosted_numbers_hosted_number_order->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

hosted_number_order = @client
                      .preview
                      .hosted_numbers
                      .hosted_number_orders('HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                      .update(
                        verification_type: 'phone-call',
                        status: 'pending-verification'
                      )

puts hosted_number_order.sid
```

```bash
curl -X POST "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "VerificationType=phone-call" \
--data-urlencode "Status=pending-verification" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_sid": "AD11111111111111111111111111111111",
  "call_delay": 15,
  "capabilities": {
    "sms": true,
    "voice": false
  },
  "cc_emails": [
    "test1@twilio.com",
    "test2@twilio.com"
  ],
  "date_created": "2017-03-28T20:06:39Z",
  "date_updated": "2017-03-28T20:06:39Z",
  "email": "test+hosted@twilio.com",
  "extension": "1234",
  "failure_reason": "",
  "friendly_name": "new friendly name",
  "incoming_phone_number_sid": "PN11111111111111111111111111111111",
  "phone_number": "+14153608311",
  "sid": "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "signing_document_sid": "PX11111111111111111111111111111111",
  "status": "pending-verification",
  "unique_name": "new unique name",
  "url": "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "verification_attempts": 1,
  "verification_call_sids": [
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
  ],
  "verification_code": "8794",
  "verification_document_sid": null,
  "verification_type": "phone-call"
}
```

## Ownership Verification

Ownership Verification is a security measure to host the number with Twilio for SMS to ensure the authenticity of the request.

## Delete a HostedNumberOrder resource

`DELETE https://preview.twilio.com/HostedNumbers/HostedNumberOrders/{Sid}`

Cancels the Hosted Number Order, and consequently, deletes the corresponding Incoming Phone Number.

{" "}

> \[!WARNING]
>
> You can only issue the `DELETE` request when the HostedNumberOrder status is
> in `received`, `pending-verification`, `verified` or `pending-loa`. If the
> Hosted Number Order is `completed`, you can off-board the Twilio platform by
> issuing a `DELETE` request to the corresponding
> [IncomingPhoneNumbers](/docs/phone-numbers/api/incomingphonenumber-resource).
> If the Hosted Number Order is in a `failed` state due to either current SMS
> enablement or idle timeout, a *new* Hosted Number Order can be created. The
> Hosted Number Order will keep failing if SMS enablement is not removed from
> the number.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"A 34 character string that uniquely identifies this HostedNumberOrder.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HR[0-9a-fA-F]{32}$"},"required":true}]
```

Cancel the HostedNumberOrder (only available when the status is in \`received\`)

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteHostedNumbersHostedNumberOrder() {
  await client.preview.hosted_numbers
    .hostedNumberOrders("HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteHostedNumbersHostedNumberOrder();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.preview.hosted_numbers.hosted_number_orders(
    "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Preview.HostedNumbers;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await HostedNumberOrderResource.DeleteAsync(pathSid: "HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.preview.hostedNumbers.HostedNumberOrder;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        HostedNumberOrder.deleter("HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
    }
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$twilio->preview->hostedNumbers
    ->hostedNumberOrders("HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

@client
  .preview
  .hosted_numbers
  .hosted_number_orders('HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
curl -X DELETE "https://preview.twilio.com/HostedNumbers/HostedNumberOrders/HRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
