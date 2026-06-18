# Transcriptions resource

A Transcription resource represents the transcribed text and metadata from a transcribed recording of a voice call.

The transcription text comes from converting an audio recording to readable text. To generate transcriptions from call recordings, use the [TwiML `<Record>` verb](/docs/voice/twiml/record) and set `transcribe="true"`.

> \[!NOTE]
>
> Call recordings aren't Payment Card Industry (PCI) compliant by default. To use Voice Recordings in a [PCI workflow](/docs/voice/pci-workflows), [enable PCI Mode in the Twilio Console](https://www.twilio.com/console/voice/settings).
>
> To transcribe voice recordings, use the \<Transcription> TwiML noun. Native and Marketplace transcriptions aren't available when PCI Mode is enabled.

> \[!WARNING]
>
> If you request recording transcription, your account incurs additional charges. Transcription is a paid feature. Twilio only transcribes recordings initiated with the TwiML `<Record>` verb and that have a duration no longer than two minutes in length. \
> To learn about pricing, see the [transcriptions pricing page](https://www.twilio.com/en-us/voice/pricing/us#extras).

## Transcriptions properties

<OperationTable type="properties" data={{"title":"ListTranscriptionResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"transcriptions":{"type":"array","items":{"type":"object","refName":"api.v2010.account.transcription","modelName":"api_v2010_account_transcription","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource."},"api_version":{"type":"string","nullable":true,"description":"The API version used to create the transcription."},"date_created":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"duration":{"type":"string","nullable":true,"description":"The duration of the transcribed audio in seconds."},"price":{"type":"number","nullable":true,"description":"The charge for the transcript in the currency associated with the account. This value is populated after the transcript is complete so it may not be available immediately."},"price_unit":{"type":"string","format":"currency","nullable":true,"description":"The currency in which `price` is measured, in [ISO 4127](https://www.iso.org/iso/home/standards/currency_codes.htm) format (e.g. `usd`, `eur`, `jpy`)."},"recording_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RE[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Recording](https://www.twilio.com/docs/voice/api/recording) from which the transcription was created."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TR[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that that we created to identify the Transcription resource."},"status":{"type":"string","enum":["in-progress","completed","failed"],"description":"The status of the transcription. Can be: `in-progress`, `completed`, `failed`.","refName":"transcription_enum_status","modelName":"transcription_enum_status"},"transcription_text":{"type":"string","nullable":true,"description":"The text content of the transcription.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}},"type":{"type":"string","nullable":true,"description":"The transcription type. Can only be: `fast`."},"uri":{"type":"string","nullable":true,"description":"The URI of the resource, relative to `https://api.twilio.com`."}}}}}}} />

## Retrieve a Transcription

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json`

Returns the JSON metadata for the Transcription.

* The Transcriptions resource doesn't support CSV and HTML formatted responses.\
  Requests made for CSV and HTML files return an HTTP `404` status code.
* To retrieve only the transcription text, append "`.txt`" to the Transcriptions resource's URI:

  ```text
  /2010-04-01/Accounts/{AccountSid}/Transcriptions/{TranscriptionSid}.txt
  ```

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Transcription resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TR[0-9a-fA-F]{32}$"},"required":true}]
```

Retrieve a Transcription

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchTranscription() {
  const transcription = await client
    .transcriptions("TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(transcription.accountSid);
}

fetchTranscription();
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

transcription = client.transcriptions(
    "TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).fetch()

print(transcription.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var transcription =
            await TranscriptionResource.FetchAsync(pathSid: "TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(transcription.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Transcription;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Transcription transcription = Transcription.fetcher("TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(transcription.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.FetchTranscriptionParams{}

	resp, err := client.Api.FetchTranscription("TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$transcription = $twilio
    ->transcriptions("TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $transcription->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

transcription = @client
                .api
                .v2010
                .transcriptions('TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                .fetch

puts transcription.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:transcriptions:fetch \
   --sid TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Transcriptions/TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2008-08-01",
  "date_created": "Sun, 13 Feb 2011 02:12:08 +0000",
  "date_updated": "Sun, 13 Feb 2011 02:30:01 +0000",
  "duration": "1",
  "price": "-0.05000",
  "price_unit": "USD",
  "recording_sid": "REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "failed",
  "transcription_text": "(blank)",
  "type": "fast",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions/TRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Retrieve a list of Transcriptions

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Transcriptions.json`

Returns a list of Transcriptions generated from all recordings in an account.

The response contains a [paginated list](/docs/usage/twilios-response#pagination).

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieve a list of Transcriptions

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listTranscription() {
  const transcriptions = await client.transcriptions.list({ limit: 20 });

  transcriptions.forEach((t) => console.log(t.end));
}

listTranscription();
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

transcriptions = client.transcriptions.list(limit=20)

for record in transcriptions:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var transcriptions = await TranscriptionResource.ReadAsync(limit: 20);

        foreach (var record in transcriptions) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Transcription;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Transcription> transcriptions = Transcription.reader().limit(20).read();

        for (Transcription record : transcriptions) {
            System.out.println(record.getEnd());
        }
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListTranscriptionParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListTranscription(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
			}
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

$transcriptions = $twilio->transcriptions->read(20);

foreach ($transcriptions as $record) {
    print $record->end;
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

transcriptions = @client
                 .api
                 .v2010
                 .transcriptions
                 .list(limit: 20)

transcriptions.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:transcriptions:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Transcriptions.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json?PageSize=1&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 1,
  "previous_page_uri": null,
  "start": 0,
  "transcriptions": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2008-08-01",
      "date_created": "Thu, 25 Aug 2011 20:59:45 +0000",
      "date_updated": "Thu, 25 Aug 2011 20:59:45 +0000",
      "duration": "10",
      "price": "0.00000",
      "price_unit": "USD",
      "recording_sid": "REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "TRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "status": "completed",
      "transcription_text": null,
      "type": "fast",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions/TRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
    }
  ],
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json?PageSize=1&Page=0"
}
```

To access a full list of transcriptions from a given Recording, pass the `RecordingSid` to the [Recording resource](/docs/voice/api/recording):

```bash
/2010-04-01/Accounts/{YourAccountSid}/Recordings/{RecordingSid}/Transcriptions.json
```

To fetch Transcriptions from a Recording, write a cURL command that resembles the following:

```bash
curl -G https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions.json \
     -u 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_auth_token'
```

* To return an XML-formatted response, change the end of this URI from `.json` to `.xml`.
* The Recording Transcription resource doesn't support CSV and HTML formatted responses.\
  Requests made for CSV and HTML files return an HTTP `404` status code.
* To return only the transcription text, append "`.txt`" to the Transcription resource's URI:

  ```bash
  curl -G https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions.txt \
    -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
  ```

## Delete a Transcription

`DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json`

Delete a transcription from your account.

If the request succeeds, Twilio returns HTTP `204 (No Content)` with no body.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Transcription resources to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Transcription resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TR[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a Transcription

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteTranscription() {
  await client.transcriptions("TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").remove();
}

deleteTranscription();
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

client.transcriptions("TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await TranscriptionResource.DeleteAsync(pathSid: "TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Transcription;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Transcription.deleter("TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete();
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.DeleteTranscriptionParams{}

	err := client.Api.DeleteTranscription("TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
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

$twilio->transcriptions("TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->delete();
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
  .api
  .v2010
  .transcriptions('TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:transcriptions:remove \
   --sid TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X DELETE "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Transcriptions/TRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
