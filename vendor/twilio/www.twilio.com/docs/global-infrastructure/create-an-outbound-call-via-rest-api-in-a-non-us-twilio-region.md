# Make an outbound phone call using REST API in a non-US Twilio Region

This guide will show you how to make an outbound Call using the [Twilio REST API](/docs/usage/api) in a Region other than the default, United States (US1) Region.

The examples in this guide will use the Ireland (IE1) Region.

Before you begin, review the guides on [making outbound calls](/docs/voice/tutorials/how-to-make-outbound-phone-calls) and [Twilio Regions](/docs/global-infrastructure/understanding-twilio-regions).

## Step 1: Setup

Before proceeding, make sure that you have the following items handy:

* Your Twilio Account SID
* A Voice-capable Twilio phone number

See the guide on [how to search for and buy a Twilio phone number](https://help.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console) for help finding and purchasing a Twilio phone number.

Next, you need a Twilio [API Key](/docs/iam/api-keys/key-resource-v2010) that's valid in the target Region.

Twilio API Keys are a Region-specific resource. To interact with the API in the IE1 Region, you need to use an API Key which exists in that Region (rather than an API Key you created in the default US1 Region, for example). Refer to the [Twilio Regions overview](/docs/global-infrastructure/understanding-twilio-regions) for more information about the Region isolation model.

Follow these steps to create an API Key for the IE1 Region using the Twilio Console:

## Twilio Console

1. Log in to the [Twilio Console](https://1console.twilio.com/).
2. Navigate to **Develop > API Keys & creds > API Keys & auth tokens**.
3. Use the Region selector dropdown to switch between Regions and select the IE1 Region.
4. Click **Create API key**.
5. Enter a name for the API key and select the "Standard" key type.
6. Make note of the API Key SID and secret for use in the next step.
7. Click **Finish**.

## Legacy Console

1. Log into the [Twilio Console](https://console.twilio.com).
2. Go to the **Account** menu.
3. Click **API keys**, under the **Keys & Credentials**.
4. Select the "Ireland (IE1)" option from the **Region** menu.
5. Click **Create API key**.
6. Enter a friendly name for the key (for example, "Regional Calls Quickstart").
7. Leave **Key type** on the default option, "Standard".
8. Click **Create API Key**.
9. Make note of the API Key's SID and secret for use in the next step.

## Step 2: Make a request to the Calls endpoint

The Twilio REST API operates on a per-Region basis. When making requests to the API, it's up to you to select which Region handles the request. Whichever Region you choose is the Region that processes and stores data related to the request.

If you don't specify a target Region for a request, the request is handled in the default US1 Region.

To specify a target Region for a request, you will include the name of the target Region in the request's hostname, also known as the [fully qualified domain name (FQDN)](https://en.wikipedia.org/wiki/Fully_qualified_domain_name).

### The Twilio API's FQDN format

The FQDN format follows a convention that encodes three pieces of information in the hostname:

1. The Twilio Product
2. The target [Edge Location](/docs/global-infrastructure/understanding-edge-locations)
3. The target Region

The format of an FQDN is:

`{product}.{edge-location}.{region}.twilio.com`

Some example FQDNs targeting API products in different Regions (through various Edge Locations) include:

| FQDN                                | Target region              |
| ----------------------------------- | -------------------------- |
| studio.sydney.**au1**.twilio.com    | Australia (AU1) Region     |
| events.ashburn.**us1**.twilio.com   | United States (US1) Region |
| messaging.dublin.**ie1**.twilio.com | Ireland (IE1) Region       |

> \[!WARNING]
>
> Legacy FQDNs which do not include the Edge Location and Region (for example, `video.twilio.com`) are implicitly routed to the **US1** Region through the ashburn Edge Location.

In this example, you'll be making a `POST` request to the [Call resource](/docs/voice/api/call-resource) endpoint to create a Call. This endpoint is a part of Twilio's core **API** product. You will select the dublin Edge Location, and the **IE1** processing Region.

Thus, the FQDN you need to use is:

`api.dublin.ie1.twilio.com`

> \[!NOTE]
>
> You can use the Twilio server-side SDKs for making API requests to a target Region. SDKs accept an edge and region parameter, and automatically construct the appropriate FQDN for API requests.

### Issue the API request with cURL

If you use a MacOS or Linux operating system, you can follow these instructions to issue the request using the cURL command line utility. Otherwise, please continue to read along, since this section contains important information.

First, set some environment variables containing data that will be referenced by the `curl` command you run later. This practice prevents us from needing to include sensitive data directly in shell commands, and has the added benefit of making our `curl` command copy/pasteable without needing to adjust any placeholder values.

Create a new file named `.env`, and add the following content, using your own Account SID, API Key SID, and API Key secret:

```bash
export ACCOUNT_SID=<your_account_sid_here>
export API_KEY_SID=<your_api_key_sid_here>
export API_KEY_SECRET=<your_api_key_secret_here>
```

Next, add [E.164 formatted](https://help.twilio.com/hc/en-us/articles/223183008-Formatting-International-Phone-Numbers) phone number values for the To and From number of the phone call that you want to make. Be sure to use a From number that is either a Twilio phone number you own, or a verified phone number associated with your Twilio account.

```bash
export TO_NUMBER=<your_to_number_here>
export FROM_NUMBER=<your_from_number_here>
```

Save the file, and run the source command in a terminal to set the file's values as variables in your shell session:

```bash
source .env
```

Confirm that the variables are set by `echo`ing one of them:

```bash
echo $TO_NUMBER
```

The shell should print the value of the To number that you set in the `.env` file.

Run the following command to issue the API request.

```bash
curl -X POST \
    -u $API_KEY_SID:$API_KEY_SECRET \
    https://api.dublin.ie1.twilio.com/2010-04-01/Accounts/$ACCOUNT_SID/Calls.json \
    --data-urlencode "To=$TO_NUMBER" \
    --data-urlencode "From=$FROM_NUMBER" \
    --data-urlencode "Twiml=<Response><Say>Ahoy from Ireland</Say></Response>"
```

The command should print a JSON representation of the new Call, and the destination phone should now be ringing.

You've successfully created a Call using a non-US1 Twilio Region.

Keep in mind that this Call will only exist in the Region where it was created — IE1 in this case. In order to view the Call log in the Twilio Console, for example, you'll need to access the [IE1-specific Call Logs](https://console.twilio.com/ie1/monitor/logs/calls?frameUrl=/console/voice/calls/logs) page. Refer to the [Twilio Regions](/docs/global-infrastructure/understanding-twilio-regions) introduction for a refresher on Twilio's Region isolation model.

## Step 3 (optional): Issue the API request with a server-side SDK

Real applications are unlikely to make API requests using cURL, and will instead be using an HTTP client appropriate for the application's programming language. A common choice is to use one of Twilio's language-specific [server-side SDKs](/docs/libraries).

These libraries help you issue requests against a target Region by setting a region attribute on a client instance.

For example, using one of the SDKs, a request equivalent to the one sent using the `curl` command in the previous step could be sent using the following language-specific code:

Specify a Twilio Region and Edge when making a call

```js
const accountSid = process.env.ACCOUNT_SID;
const apiKeySid = process.env.API_KEY_SID;
const apiKeySecret = process.env.API_KEY_SECRET;

const toNumber = process.env.TO_NUMBER;
const fromNumber = process.env.FROM_NUMBER;

const client = require('twilio')(apiKeySid, apiKeySecret, {
  accountSid: accountSid,
  edge: 'dublin',
  region: 'ie1',
});

client.calls.create({
  twiml: '<Response><Say>Ahoy from Ireland</Say></Response>',
  to: toNumber,
  from: fromNumber,
});
```

```py
import os
from twilio.rest import Client


account_sid = os.environ['ACCOUNT_SID']
api_key_sid = os.environ['API_KEY_SID']
api_key_secret = os.environ['API_KEY_SECRET']

to_number = os.environ['TO_NUMBER']
from_number = os.environ['FROM_NUMBER']

client = Client(
    account_sid=account_sid,
    username=api_key_sid,
    password=api_key_secret,
    edge='dublin',
    region='ie1'
)

call = client.calls.create(
    twiml='<Response><Say>Ahoy from Ireland</Say></Response>',
    to=to_number,
    from_=from_number
)
```

```cs
using Twilio;
using Twilio.Rest.Api.V2010.Account;

class Program
{
    static void Main(string[] args)
    {
        string accountSid = Environment.GetEnvironmentVariable("ACCOUNT_SID");
        string apiKeySid = Environment.GetEnvironmentVariable("API_KEY_SID");
        string apiKeySecret = Environment.GetEnvironmentVariable("API_KEY_SECRET");

        string toNumber = Environment.GetEnvironmentVariable("TO_NUMBER");
        string fromNumber = Environment.GetEnvironmentVariable("FROM_NUMBER");

        TwilioClient.Init(
            apiKeySid,
            apiKeySecret,
            accountSid=accountSid,
        );

        TwilioClient.SetRegion("ie1");
        TwilioClient.SetEdge("dublin");


        var call = CallResource.Create(
            twiml: new Twilio.Types.Twiml("<Response><Say>Ahoy from Ireland</Say></Response>"),
            to: new Twilio.Types.PhoneNumber(toNumber),
            from: new Twilio.Types.PhoneNumber(fromNumber)
        );
    }
}
```

```java
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.type.PhoneNumber;
import com.twilio.type.Twiml;

public class Example {

    public static final String ACCOUNT_SID = System.getenv("ACCOUNT_SID");
    public static final String API_KEY_SID = System.getenv("API_KEY_SID");
    public static final String API_KEY_SECRET = System.getenv("API_KEY_SECRET");

    public static final String TO_NUMBER = System.getenv("TO_NUMBER");
    public static final String FROM_NUMBER = System.getenv("FROM_NUMBER");

    public static void main(String[] args) {
        Twilio.init(API_KEY_SID, API_KEY_SECRET, ACCOUNT_SID);
        Twilio.setEdge("dublin");
        Twilio.setRegion("ie1");
        
        Call call = Call.creator(
                new com.twilio.type.PhoneNumber(TO_NUMBER),
                new com.twilio.type.PhoneNumber(FROM_NUMBER),
                new com.twilio.type.Twiml("<Response><Say>Ahoy from Ireland</Say></Response>"))
            .create();
    }
}
```

```go
package main

import (
	"fmt"
	"os"

	"github.com/twilio/twilio-go"
	twilioApi "github.com/twilio/twilio-go/rest/api/v2010"
	"github.com/twilio/twilio-go/twiml"
)

func main() {

	var accountSid string = os.Getenv("TWILIO_ACCOUNT_SID")
	var apiKeySid string = os.Getenv("TWILIO_API_KEY")
	var apiKeySecret string = os.Getenv("TWILIO_API_SECRET")

	var to_number = os.Getenv("TO_NUMBER")
	var from_number = os.Getenv("FROM_NUMBER")

	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username:   apiKeySid,
		Password:   apiKeySecret,
		AccountSid: accountSid,
	})

	client.SetRegion("ie1")
	client.SetEdge("dublin")

	params := &twilioApi.CreateCallParams{}
	params.SetTo(to_number)
	params.SetFrom(from_number)

	say := &twiml.VoiceSay{
		Message: "Ahoy from Ireland",
	}

	twimlResult, twimlErr := twiml.Voice([]twiml.Element{say})
	if twimlErr != nil {
		fmt.Println(twimlErr)
	} else {
		params.SetTwiml(twimlResult)
	}

	callResp, callErr := client.Api.CreateCall(params)
	if callErr != nil {
		fmt.Println(callErr.Error())
	} else {
		fmt.Println("Call Sid: ", *callResp.Sid)
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once '/path/to/vendor/autoload.php';

use Twilio\Rest\Client;

$account_sid = getenv("ACCOUNT_SID");
$api_key_sid = getenv("API_KEY_SID");
$api_key_secret = getenv("API_KEY_SECRET");

$to_number = getenv("TO_NUMBER");
$from_number = getenv("FROM_NUMBER");

$twilio = new Client(
    $api_key_sid,
    $api_key_secret,
    $account_sid,
    "ie1");

$twilio -> setEdge("dublin");

$call = $twilio->calls
               ->create($to_number,
                        $from_number,
                        [
                            "twiml" => "<Response><Say>Ahoy from Ireland</Say></Response>"
                        ]
               );
```

```rb
require "twilio-ruby"

account_sid = ENV["ACCOUNT_SID"]
api_key_sid = ENV["API_KEY_SID"]
api_key_secret = ENV["API_KEY_SECRET"]

to_number = ENV["TO_NUMBER"]
from_number = ENV["FROM_NUMBER"]

@client = Twilio::REST::Client.new(
    api_key_sid,
    api_key_secret,
    account_sid
)

@client.edge = "dublin"
@client.region = "ie1"

call = @client.calls.create(
    twiml: '<Response><Say>Ahoy from Ireland</Say></Response>',
    to: to_number,
    from: from_number
)
```

## Next steps

Now that you know the basics of making Calls using a specific Twilio Region using the REST API, check out these other resources to learn more about building with Twilio Regions:

* [Route inbound calls to a non-US1 Twilio Region](/docs/global-infrastructure/inbound-processing-console)
