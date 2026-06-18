# Conferences resource

The Conferences resource allows you to query and manage the state of [conferences](/docs/voice/conference) on your Twilio account.

> \[!NOTE]
>
> Conference rooms are not directly created from the Programmable Voice API.
>
> In order to create a new conference, you must use [TwiML's \<Dial> verb](/docs/voice/twiml/dial) with the [\<Conference> noun,](/docs/voice/twiml/conference) or by [creating a conference participant using the /Participants API](/docs/voice/api/conference-participant-resource). After a **Conference** instance has been created, you can access it by using the REST API.
>
> For step-by-step instructions on how to write this TwiML and programmatically handle the conference, check out our guides on [how to create conference calls using Twilio's supported SDKs](/docs/voice/tutorials/how-to-create-conference-calls).

## Conferences properties

<OperationTable type="properties" data={{"title":"ListConferenceResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"conferences":{"type":"array","items":{"type":"object","refName":"api.v2010.account.conference","modelName":"api_v2010_account_conference","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Conference resource."},"date_created":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in UTC that this resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in UTC that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"api_version":{"type":"string","nullable":true,"description":"The API version used to create this conference."},"friendly_name":{"type":"string","nullable":true,"description":"A string that you assigned to describe this conference room. Maximum length is 128 characters."},"region":{"type":"string","nullable":true,"description":"A string that represents the Twilio Region where the conference audio was mixed. May be `us1`, `us2`, `ie1`,  `de1`, `sg1`, `br1`, `au1`, and `jp1`. Basic conference audio will always be mixed in `us1`. Global Conference audio will be mixed nearest to the majority of participants."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CF[0-9a-fA-F]{32}$","nullable":true,"description":"The unique, Twilio-provided string used to identify this Conference resource."},"status":{"type":"string","enum":["init","in-progress","completed"],"description":"The status of this conference. Can be: `init`, `in-progress`, or `completed`.","refName":"conference_enum_status","modelName":"conference_enum_status"},"uri":{"type":"string","nullable":true,"description":"The URI of this resource, relative to `https://api.twilio.com`."},"subresource_uris":{"type":"object","format":"uri-map","nullable":true,"description":"A list of related resources identified by their URIs relative to `https://api.twilio.com`."},"reason_conference_ended":{"type":"string","enum":["conference-ended-via-api","participant-with-end-conference-on-exit-left","participant-with-end-conference-on-exit-kicked","last-participant-kicked","last-participant-left"],"description":"The reason why a conference ended. When a conference is in progress, will be `null`. When conference is completed, can be: `conference-ended-via-api`, `participant-with-end-conference-on-exit-left`, `participant-with-end-conference-on-exit-kicked`, `last-participant-kicked`, or `last-participant-left`.","refName":"conference_enum_reason_conference_ended","modelName":"conference_enum_reason_conference_ended"},"call_sid_ending_conference":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$","nullable":true,"description":"The call SID that caused the conference to end."}}}}}}} />

> \[!WARNING]
>
> You may have many conference instances that share the same `friendly_name`. Only **one** of these distinct conferences may be in-progress at any given time. For instance, if you have two separate conferences with the `friendly_name` of `"my-conference"` you cannot add participants to one instance while the other is in progress.

## Retrieve a Conference

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json`

> \[!NOTE]
>
> The recommended way to monitor the state of a Conference and its participants is to use the Conference [statusCallback](/docs/voice/twiml/conference#attributes-statusCallback). This webhook callback will be fired when the state of the Conference or a participant changes.
>
> At any time you can use the REST API to query the Conferences resource and [Participants](/docs/voice/api/conference-participant-resource) subresource, however continuously polling these resources is **not** recommended.
>
> When fetching conferences after the conference has ended, associated Participants will not be returned. For retrieving conference participants after a conference has ended, see the [Conferences resource](/docs/voice/voice-insights/api/conference/conference-summary-resource) of the Voice Insights API.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference resource(s) to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Conference resource to fetch","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CF[0-9a-fA-F]{32}$"},"required":true}]
```

Retrieve a Conference

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchConference() {
  const conference = await client
    .conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(conference.accountSid);
}

fetchConference();
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

conference = client.conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch()

print(conference.account_sid)
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

        var conference =
            await ConferenceResource.FetchAsync(pathSid: "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(conference.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Conference;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Conference conference = Conference.fetcher("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(conference.getAccountSid());
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

	params := &api.FetchConferenceParams{}

	resp, err := client.Api.FetchConference("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$conference = $twilio
    ->conferences("CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $conference->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

conference = @client
             .api
             .v2010
             .conferences('CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
             .fetch

puts conference.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:fetch \
   --sid CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "date_created": "Fri, 18 Feb 2011 19:26:50 +0000",
  "date_updated": "Fri, 18 Feb 2011 19:27:33 +0000",
  "friendly_name": "AHH YEAH",
  "sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "region": "us1",
  "status": "completed",
  "subresource_uris": {
    "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "reason_conference_ended": "last-participant-left",
  "call_sid_ending_conference": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Retrieve a list of Conferences

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences.json`

Read all the conferences within your account.

The list of conferences that we return includes [paging information](/docs/usage/twilios-response#pagination).

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference resource(s) to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"DateCreated","in":"query","description":"Only include conferences that were created on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read conferences that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read conferences that were created on or after midnight of this date.","schema":{"type":"string","format":"date"},"examples":{"readEmpty":{"value":"2008-01-03"},"readNext":{"value":"2008-01-03"},"readPrevious":{"value":"2008-01-03"},"readDateCreatedEquals":{"value":"2020-07-07"}}},{"name":"DateCreated<","in":"query","description":"Only include conferences that were created on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read conferences that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read conferences that were created on or after midnight of this date.","schema":{"type":"string","format":"date"},"examples":{"readEmpty":{"value":"2008-01-01"},"readNext":{"value":"2008-01-01"},"readPrevious":{"value":"2008-01-01"}}},{"name":"DateCreated>","in":"query","description":"Only include conferences that were created on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read conferences that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read conferences that were created on or after midnight of this date.","schema":{"type":"string","format":"date"},"examples":{"readEmpty":{"value":"2008-01-02"},"readNext":{"value":"2008-01-02"},"readPrevious":{"value":"2008-01-02"},"readDateCreatedOnOrAfter":{"value":"2021-01-01"}}},{"name":"DateUpdated","in":"query","description":"Only include conferences that were last updated on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were last updated on this date. You can also specify an inequality, such as `DateUpdated<=YYYY-MM-DD`, to read conferences that were last updated on or before midnight of this date, and `DateUpdated>=YYYY-MM-DD` to read conferences that were last updated on or after midnight of this date.","schema":{"type":"string","format":"date"},"examples":{"readEmpty":{"value":"2018-11-13"},"readNext":{"value":"2018-11-13"},"readPrevious":{"value":"2018-11-13"}}},{"name":"DateUpdated<","in":"query","description":"Only include conferences that were last updated on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were last updated on this date. You can also specify an inequality, such as `DateUpdated<=YYYY-MM-DD`, to read conferences that were last updated on or before midnight of this date, and `DateUpdated>=YYYY-MM-DD` to read conferences that were last updated on or after midnight of this date.","schema":{"type":"string","format":"date"},"examples":{"readEmpty":{"value":"2018-11-11"},"readNext":{"value":"2018-11-11"},"readPrevious":{"value":"2018-11-11"}}},{"name":"DateUpdated>","in":"query","description":"Only include conferences that were last updated on this date. Specify a date as `YYYY-MM-DD` in UTC, for example: `2009-07-06`, to read only conferences that were last updated on this date. You can also specify an inequality, such as `DateUpdated<=YYYY-MM-DD`, to read conferences that were last updated on or before midnight of this date, and `DateUpdated>=YYYY-MM-DD` to read conferences that were last updated on or after midnight of this date.","schema":{"type":"string","format":"date"},"examples":{"readEmpty":{"value":"2018-11-12"},"readNext":{"value":"2018-11-12"},"readPrevious":{"value":"2018-11-12"}}},{"name":"FriendlyName","in":"query","description":"The string that identifies the Conference resources to read.","schema":{"type":"string"},"examples":{"readEmpty":{"value":"friendly_name"},"readNext":{"value":"friendly_name"},"readPrevious":{"value":"friendly_name"},"readMyroom":{"value":"MyRoom"}}},{"name":"Status","in":"query","description":"The status of the resources to read. Can be: `init`, `in-progress`, or `completed`.","schema":{"type":"string","enum":["init","in-progress","completed"],"description":"The status of this conference. Can be: `init`, `in-progress`, or `completed`.","refName":"conference_enum_status","modelName":"conference_enum_status"},"examples":{"readEmpty":{"value":"init"},"readNext":{"value":"in-progress"},"readPrevious":{"value":"in-progress"},"readDateCreatedOnOrAfter":{"value":"in-progress"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieve a list of Conferences

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listConference() {
  const conferences = await client.conferences.list({ limit: 20 });

  conferences.forEach((c) => console.log(c.end));
}

listConference();
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

conferences = client.conferences.list(limit=20)

for record in conferences:
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

        var conferences = await ConferenceResource.ReadAsync(limit: 20);

        foreach (var record in conferences) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Conference;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Conference> conferences = Conference.reader().limit(20).read();

        for (Conference record : conferences) {
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

	params := &api.ListConferenceParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListConference(params)
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

$conferences = $twilio->conferences->read([], 20);

foreach ($conferences as $record) {
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

conferences = @client
              .api
              .v2010
              .conferences
              .list(limit: 20)

conferences.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "conferences": [
    {
      "status": "in-progress",
      "region": "jp1",
      "sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_updated": "Fri, 03 Jul 2020 11:23:45 +0000",
      "date_created": "Fri, 03 Jul 2020 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "friendly_name": "friendly_name",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "in-progress",
      "region": "de1",
      "sid": "CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "date_updated": "Thu, 02 Jul 2020 11:23:45 +0000",
      "date_created": "Thu, 02 Jul 2020 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Recordings.json"
      },
      "friendly_name": "MyRoom",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "completed",
      "region": "br1",
      "sid": "CFcccccccccccccccccccccccccccccccc",
      "date_updated": "Wed, 01 Jul 2020 11:23:45 +0000",
      "date_created": "Wed, 01 Jul 2020 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Recordings.json"
      },
      "friendly_name": "FRIEND",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": "participant-with-end-conference-on-exit-left",
      "call_sid_ending_conference": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?PageSize=3&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?PageSize=3&Page=1&PageToken=PACFcccccccccccccccccccccccccccccccc",
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?PageSize=3&Page=0",
  "page": 0,
  "page_size": 3,
  "start": 0,
  "end": 2
}
```

Retrieve a list of Conferences that started on a specific date

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listConference() {
  const conferences = await client.conferences.list({
    dateCreated: "2020-07-07",
    limit: 20,
  });

  conferences.forEach((c) => console.log(c.end));
}

listConference();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import date

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conferences = client.conferences.list(date_created=date(2020, 7, 7), limit=20)

for record in conferences:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;
using Twilio.Converters;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var conferences = await ConferenceResource.ReadAsync(
            dateCreated: MarshalConverter.DateTimeFromString("2020-07-07"), limit: 20);

        foreach (var record in conferences) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.LocalDate;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Conference;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Conference> conferences =
            Conference.reader().setDateCreated(LocalDate.of(2020, 7, 7)).limit(20).read();

        for (Conference record : conferences) {
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

	params := &api.ListConferenceParams{}
	params.SetDateCreated("2020-07-07")
	params.SetLimit(20)

	resp, err := client.Api.ListConference(params)
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

$conferences = $twilio->conferences->read(
    ["dateCreated" => new \DateTime("2020-07-07")],
    20
);

foreach ($conferences as $record) {
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

conferences = @client
              .api
              .v2010
              .conferences
              .list(
                date_created: Date.new(2020, 7, 7),
                limit: 20
              )

conferences.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:list \
   --date-created 2020-07-07
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences.json?DateCreated=2020-07-07&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "conferences": [
    {
      "status": "in-progress",
      "region": "jp1",
      "sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_updated": "Tue, 07 Jul 2020 11:23:45 +0000",
      "date_created": "Tue, 07 Jul 2020 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "friendly_name": "friendly_name",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "in-progress",
      "region": "de1",
      "sid": "CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "date_updated": "Tue, 07 Jul 2020 11:23:45 +0000",
      "date_created": "Tue, 07 Jul 2020 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Recordings.json"
      },
      "friendly_name": "MyRoom",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "completed",
      "region": "br1",
      "sid": "CFcccccccccccccccccccccccccccccccc",
      "date_updated": "Tue, 07 Jul 2020 11:23:45 +0000",
      "date_created": "Tue, 07 Jul 2020 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Recordings.json"
      },
      "friendly_name": "FRIEND",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": "participant-with-end-conference-on-exit-left",
      "call_sid_ending_conference": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?DateCreated=2020-07-07&PageSize=3&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?DateCreated=2020-07-07&PageSize=3&Page=1&PageToken=PACFcccccccccccccccccccccccccccccccc",
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?DateCreated=2020-07-07&PageSize=3&Page=0",
  "page": 0,
  "page_size": 3,
  "start": 0,
  "end": 2
}
```

Retrieve a list of in-progress Conferences that were created on or after a specific date

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listConference() {
  const conferences = await client.conferences.list({
    dateCreated: "2021-01-01",
    status: "in-progress",
    limit: 20,
  });

  conferences.forEach((c) => console.log(c.end));
}

listConference();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import date

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

conferences = client.conferences.list(
    date_created=date(2021, 1, 1), status="in-progress", limit=20
)

for record in conferences:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;
using Twilio.Converters;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var conferences = await ConferenceResource.ReadAsync(
            dateCreated: MarshalConverter.DateTimeFromString("2021-01-01"),
            status: ConferenceResource.StatusEnum.InProgress,
            limit: 20);

        foreach (var record in conferences) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.LocalDate;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Conference;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Conference> conferences = Conference.reader()
                                                  .setDateCreated(LocalDate.of(2021, 1, 1))
                                                  .setStatus(Conference.Status.IN_PROGRESS)
                                                  .limit(20)
                                                  .read();

        for (Conference record : conferences) {
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

	params := &api.ListConferenceParams{}
	params.SetDateCreated("2021-01-01")
	params.SetStatus("in-progress")
	params.SetLimit(20)

	resp, err := client.Api.ListConference(params)
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

$conferences = $twilio->conferences->read(
    [
        "dateCreated" => new \DateTime("2021-01-01"),
        "status" => "in-progress",
    ],
    20
);

foreach ($conferences as $record) {
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

conferences = @client
              .api
              .v2010
              .conferences
              .list(
                date_created: Date.new(2021, 1, 1),
                status: 'in-progress',
                limit: 20
              )

conferences.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:list \
   --date-created 2021-01-01 \
   --status in-progress
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences.json?DateCreated=2021-01-01&Status=in-progress&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "conferences": [
    {
      "status": "in-progress",
      "region": "jp1",
      "sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_updated": "Fri, 01 Jan 2021 11:23:45 +0000",
      "date_created": "Fri, 01 Jan 2021 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "friendly_name": "friendly_name",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "in-progress",
      "region": "de1",
      "sid": "CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "date_updated": "Fri, 01 Jan 2021 11:23:45 +0000",
      "date_created": "Fri, 01 Jan 2021 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Recordings.json"
      },
      "friendly_name": "MyRoom",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "in-progress",
      "region": "br1",
      "sid": "CFcccccccccccccccccccccccccccccccc",
      "date_updated": "Fri, 01 Jan 2021 11:23:45 +0000",
      "date_created": "Fri, 01 Jan 2021 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Recordings.json"
      },
      "friendly_name": "FRIEND",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?Status=in-progress&DateCreated%3E=2021-01-01&PageSize=20&Page=0",
  "next_page_uri": null,
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?Status=in-progress&DateCreated%3E=2021-01-01&PageSize=20&Page=0",
  "page": 0,
  "page_size": 20,
  "start": 0,
  "end": 2
}
```

Retrieve a list of Conferences named 'MyRoom'

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listConference() {
  const conferences = await client.conferences.list({
    friendlyName: "MyRoom",
    limit: 20,
  });

  conferences.forEach((c) => console.log(c.end));
}

listConference();
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

conferences = client.conferences.list(friendly_name="MyRoom", limit=20)

for record in conferences:
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

        var conferences = await ConferenceResource.ReadAsync(friendlyName: "MyRoom", limit: 20);

        foreach (var record in conferences) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Conference;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Conference> conferences = Conference.reader().setFriendlyName("MyRoom").limit(20).read();

        for (Conference record : conferences) {
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

	params := &api.ListConferenceParams{}
	params.SetFriendlyName("MyRoom")
	params.SetLimit(20)

	resp, err := client.Api.ListConference(params)
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

$conferences = $twilio->conferences->read(["friendlyName" => "MyRoom"], 20);

foreach ($conferences as $record) {
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

conferences = @client
              .api
              .v2010
              .conferences
              .list(
                friendly_name: 'MyRoom',
                limit: 20
              )

conferences.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:list \
   --friendly-name MyRoom
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences.json?FriendlyName=MyRoom&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "conferences": [
    {
      "status": "in-progress",
      "region": "jp1",
      "sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_updated": "Sun, 03 Jan 2021 11:23:45 +0000",
      "date_created": "Sun, 03 Jan 2021 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
      },
      "friendly_name": "MyRoom",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": null,
      "call_sid_ending_conference": null
    },
    {
      "status": "completed",
      "region": "us1",
      "sid": "CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      "date_updated": "Sat, 02 Jan 2021 11:23:45 +0000",
      "date_created": "Sat, 02 Jan 2021 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb/Recordings.json"
      },
      "friendly_name": "MyRoom",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": "last-participant-left",
      "call_sid_ending_conference": "CAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"
    },
    {
      "status": "completed",
      "region": "ie1",
      "sid": "CFcccccccccccccccccccccccccccccccc",
      "date_updated": "Fri, 01 Jan 2021 11:23:45 +0000",
      "date_created": "Fri, 01 Jan 2021 11:23:45 +0000",
      "subresource_uris": {
        "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Participants.json",
        "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc/Recordings.json"
      },
      "friendly_name": "MyRoom",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFcccccccccccccccccccccccccccccccc.json",
      "api_version": "2010-04-01",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason_conference_ended": "last-participant-left",
      "call_sid_ending_conference": "CAcccccccccccccccccccccccccccccccc"
    }
  ],
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?FriendlyName=MyRoom&PageSize=20&Page=0",
  "next_page_uri": null,
  "previous_page_uri": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences.json?FriendlyName=MyRoom&PageSize=20&Page=0",
  "page": 0,
  "page_size": 20,
  "start": 0,
  "end": 2
}
```

## Update a Conference

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json`

You can use the update action to change the conference's properties as well as to end the conference.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Conference resource(s) to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Conference resource to update","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateConferenceRequest","properties":{"Status":{"type":"string","enum":["completed"],"refName":"conference_enum_update_status","modelName":"conference_enum_update_status"},"AnnounceUrl":{"type":"string","format":"uri","description":"The URL we should call to announce something into the conference. The URL may return an MP3 file, a WAV file, or a TwiML document that contains `<Play>`, `<Say>`, `<Pause>`, or `<Redirect>` verbs."},"AnnounceMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method used to call `announce_url`. Can be: `GET` or `POST` and the default is `POST`"}}},"examples":{"updateEndConference":{"value":{"lang":"json","value":"{\n  \"Status\": \"completed\"\n}","meta":"","code":"{\n  \"Status\": \"completed\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"completed\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"announceToConference":{"value":{"lang":"json","value":"{\n  \"AnnounceUrl\": \"http://www.myapp.com/announce\"\n}","meta":"","code":"{\n  \"AnnounceUrl\": \"http://www.myapp.com/announce\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"AnnounceUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.myapp.com/announce\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Conference: End the conference

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateConference() {
  const conference = await client
    .conferences("Sid")
    .update({ status: "completed" });

  console.log(conference.accountSid);
}

updateConference();
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

conference = client.conferences("Sid").update(status="completed")

print(conference.account_sid)
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

        var conference = await ConferenceResource.UpdateAsync(
            status: ConferenceResource.UpdateStatusEnum.Completed, pathSid: "Sid");

        Console.WriteLine(conference.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Conference;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Conference conference = Conference.updater("Sid").setStatus(Conference.UpdateStatus.COMPLETED).update();

        System.out.println(conference.getAccountSid());
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

	params := &api.UpdateConferenceParams{}
	params.SetStatus("completed")

	resp, err := client.Api.UpdateConference("Sid",
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

$conference = $twilio->conferences("Sid")->update(["status" => "completed"]);

print $conference->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

conference = @client
             .api
             .v2010
             .conferences('Sid')
             .update(status: 'completed')

puts conference.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:update \
   --sid Sid \
   --status completed
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/Sid.json" \
--data-urlencode "Status=completed" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "date_created": "Mon, 22 Aug 2011 20:58:45 +0000",
  "date_updated": "Mon, 22 Aug 2011 20:58:46 +0000",
  "friendly_name": null,
  "region": "us1",
  "sid": "Sid",
  "status": "completed",
  "subresource_uris": {
    "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "reason_conference_ended": "conference-ended-via-api",
  "call_sid_ending_conference": null
}
```

Update a Conference: Announce to the Conference

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateConference() {
  const conference = await client
    .conferences("Sid")
    .update({ announceUrl: "http://www.myapp.com/announce" });

  console.log(conference.accountSid);
}

updateConference();
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

conference = client.conferences("Sid").update(
    announce_url="http://www.myapp.com/announce"
)

print(conference.account_sid)
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

        var conference = await ConferenceResource.UpdateAsync(
            announceUrl: new Uri("http://www.myapp.com/announce"), pathSid: "Sid");

        Console.WriteLine(conference.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Conference;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Conference conference =
            Conference.updater("Sid").setAnnounceUrl(URI.create("http://www.myapp.com/announce")).update();

        System.out.println(conference.getAccountSid());
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

	params := &api.UpdateConferenceParams{}
	params.SetAnnounceUrl("http://www.myapp.com/announce")

	resp, err := client.Api.UpdateConference("Sid",
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

$conference = $twilio
    ->conferences("Sid")
    ->update(["announceUrl" => "http://www.myapp.com/announce"]);

print $conference->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

conference = @client
             .api
             .v2010
             .conferences('Sid')
             .update(announce_url: 'http://www.myapp.com/announce')

puts conference.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:update \
   --sid Sid \
   --announce-url http://www.myapp.com/announce
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/Sid.json" \
--data-urlencode "AnnounceUrl=http://www.myapp.com/announce" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "date_created": "Mon, 08 Feb 2021 20:58:45 +0000",
  "date_updated": "Mon, 08 Feb 2021 20:58:46 +0000",
  "friendly_name": "MyRoom",
  "region": "us1",
  "sid": "Sid",
  "status": "in-progress",
  "subresource_uris": {
    "participants": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json"
  },
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "reason_conference_ended": null,
  "call_sid_ending_conference": null
}
```

## Manage conference participants

Each Conference resource has a Participant subresource. Participants represent the set of people currently connected to a running conference.

You can retrieve a list of Participants from a given Conference by requesting the following:

```bash
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
```

Learn more about [Participants subresource](/docs/voice/api/conference-participant-resource) and how to manage them.

## Conference recordings

You can access the Recordings subresource on any given Conference resource.

The following will return a list of all of the recordings generated for a given conference, identified by its `ConferenceSid`. (Note that recordings associated with an individual call leg of the conference will not be returned.)

```bash
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json
```

Learn more about [Recordings](/docs/voice/api/recording).

## Conference Log Retention

Starting on February 5, 2021 you will be able to retrieve resources via `GET` to the /Conferences and /Participants endpoints for thirteen months after the resource is created. This represents a significant change as these logs are currently stored indefinitely by Twilio and retrievable via Console and API.

It's important to note that we are not deleting your logs; we're only changing *where* they will be available to you. We provide a Bulk Export utility in Log Archives ([Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/settings/log-archives-settings) or legacy Console: [Conferences](https://www.twilio.com/console/voice/settings/conferences-archives) and [Participants](https://www.twilio.com/console/voice/settings/participants-archives)) and through the [API](/docs/usage/bulkexport). Bulk Export generates S3 files containing one day of data per file and delivers the download link by webhook, email, or Console. Records older than thirteen months can only be retrieved through Bulk Export.

If you perform log extraction via API on a rolling basis, it is important to verify that you are pulling the logs at a frequency that will remain unaffected by this change.

## Tips and best practices

* Long audio files for conference announcements delay playback. For example, a 25-minute file can take about 13–15 seconds to begin after you send the API request.
* Conference announcements that are 30 minutes or longer can trigger a request timeout and cause the announcement to fail. When this happens, the conference and all calls stay connected, but participants hear "An application error has occurred." The 30-minute limit is approximate. Factors such as file size, HTTP method, and your server's processing or response time can also cause timeouts.
* For announcements longer than 30 minutes, divide the audio into shorter segments and play them sequentially.

## What's next?

Explore [Voice Insights](/docs/voice/voice-insights) with its [Conference Insights Event Stream](/docs/voice/voice-insights/event-streams/conference-insights-event) and [Conference Insights REST API](/docs/voice/voice-insights/api/conference) which allow you to see conference parameters, investigate participant event timelines, and understand detected quality issues.
