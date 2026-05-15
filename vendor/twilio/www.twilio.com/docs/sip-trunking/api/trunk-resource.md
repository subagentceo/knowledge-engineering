# Trunk Resource

The Trunk resource represents a SIP Trunk in your Twilio account. A Trunk can have associated [Credential Lists](/docs/sip-trunking/api/credentiallist-resource), [IP Access Control Lists](/docs/sip-trunking/api/ipaccesscontrollist-resource), [Origination URLs](/docs/sip-trunking/api/originationurl-resource), and [Phone Numbers](/docs/sip-trunking/api/phonenumber-resource).

To learn how to create and use SIP Trunks, check out our [getting started guide](/docs/sip-trunking).

## Trunk Properties

<OperationTable type="properties" data={{"type":"object","refName":"trunking.v1.trunk","modelName":"trunking_v1_trunk","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Trunk resource."},"domain_name":{"type":"string","nullable":true,"description":"The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and `-` and must end with `pstn.twilio.com`. See [Termination Settings](https://www.twilio.com/docs/sip-trunking#termination) for more information."},"disaster_recovery_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call the `disaster_recovery_url`. Can be: `GET` or `POST`."},"disaster_recovery_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we call using the `disaster_recovery_method` if an error occurs while sending SIP traffic towards the configured Origination URL. We retrieve TwiML from this URL and execute the instructions like any other normal TwiML call. See [Disaster Recovery](https://www.twilio.com/docs/sip-trunking#disaster-recovery) for more information.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource."},"secure":{"type":"boolean","nullable":true,"description":"Whether Secure Trunking is enabled for the trunk. If enabled, all calls going through the trunk will be secure using SRTP for media and TLS for signaling. If disabled, then RTP will be used for media. See [Secure Trunking](https://www.twilio.com/docs/sip-trunking#securetrunking) for more information."},"recording":{"nullable":true,"description":"The recording settings for the trunk. Can be: `do-not-record`, `record-from-ringing`, `record-from-answer`. If set to `record-from-ringing` or `record-from-answer`, all calls going through the trunk will be recorded. The only way to change recording parameters is on a sub-resource of a Trunk after it has been created. e.g.`/Trunks/[Trunk_SID]/Recording -XPOST -d'Mode=record-from-answer'`. See [Recording](https://www.twilio.com/docs/sip-trunking#recording) for more information."},"transfer_mode":{"type":"string","enum":["disable-all","enable-all","sip-only"],"description":"The call transfer settings for the trunk. Can be: `enable-all`, `sip-only` and `disable-all`. See [Transfer](https://www.twilio.com/docs/sip-trunking/call-transfer) for more information.","refName":"trunk_enum_transfer_setting","modelName":"trunk_enum_transfer_setting"},"transfer_caller_id":{"type":"string","enum":["from-transferee","from-transferor"],"description":"Caller Id for transfer target. Can be: `from-transferee` (default) or `from-transferor`.","refName":"trunk_enum_transfer_caller_id","modelName":"trunk_enum_transfer_caller_id"},"cnam_lookup_enabled":{"type":"boolean","nullable":true,"description":"Whether Caller ID Name (CNAM) lookup is enabled for the trunk. If enabled, all inbound calls to the SIP Trunk from the United States and Canada automatically perform a CNAM Lookup and display Caller ID data on your phone. See [CNAM Lookups](https://www.twilio.com/docs/sip-trunking#CNAM) for more information."},"auth_type":{"type":"string","nullable":true,"description":"The types of authentication mapped to the domain. Can be: `IP_ACL` and `CREDENTIAL_LIST`. If both are mapped, the values are returned in a comma delimited list. If empty, the domain will not receive any traffic."},"symmetric_rtp_enabled":{"type":"boolean","nullable":true,"description":"Whether Symmetric RTP is enabled for the trunk. When Symmetric RTP is disabled, Twilio will send RTP to the destination negotiated in the SDP. Disabling Symmetric RTP is considered to be more secure and therefore recommended. See [Symmetric RTP](https://www.twilio.com/docs/sip-trunking#symmetric-rtp) for more information."},"auth_type_set":{"type":"array","nullable":true,"description":"Reserved.","items":{"type":"string"}},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TK[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Trunk resource."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."}}}} />

## Create a Trunk resource

`POST https://trunking.twilio.com/v1/Trunks`

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateTrunkRequest","properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to 64 characters long."},"DomainName":{"type":"string","description":"The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and `-` and must end with `pstn.twilio.com`. See [Termination Settings](https://www.twilio.com/docs/sip-trunking#termination) for more information."},"DisasterRecoveryUrl":{"type":"string","format":"uri","description":"The URL we should call using the `disaster_recovery_method` if an error occurs while sending SIP traffic towards the configured Origination URL. We retrieve TwiML from the URL and execute the instructions like any other normal TwiML call. See [Disaster Recovery](https://www.twilio.com/docs/sip-trunking#disaster-recovery) for more information.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"DisasterRecoveryMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call the `disaster_recovery_url`. Can be: `GET` or `POST`."},"TransferMode":{"type":"string","enum":["disable-all","enable-all","sip-only"],"description":"The call transfer settings for the trunk. Can be: `enable-all`, `sip-only` and `disable-all`. See [Transfer](https://www.twilio.com/docs/sip-trunking/call-transfer) for more information.","refName":"trunk_enum_transfer_setting","modelName":"trunk_enum_transfer_setting"},"Secure":{"type":"boolean","description":"Whether Secure Trunking is enabled for the trunk. If enabled, all calls going through the trunk will be secure using SRTP for media and TLS for signaling. If disabled, then RTP will be used for media. See [Secure Trunking](https://www.twilio.com/docs/sip-trunking#securetrunking) for more information."},"CnamLookupEnabled":{"type":"boolean","description":"Whether Caller ID Name (CNAM) lookup should be enabled for the trunk. If enabled, all inbound calls to the SIP Trunk from the United States and Canada automatically perform a CNAM Lookup and display Caller ID data on your phone. See [CNAM Lookups](https://www.twilio.com/docs/sip-trunking#CNAM) for more information."},"TransferCallerId":{"type":"string","enum":["from-transferee","from-transferor"],"description":"Caller Id for transfer target. Can be: `from-transferee` (default) or `from-transferor`.","refName":"trunk_enum_transfer_caller_id","modelName":"trunk_enum_transfer_caller_id"}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"DomainName\": \"test.pstn.twilio.com\",\n  \"FriendlyName\": \"friendly_name\",\n  \"DisasterRecoveryMethod\": \"GET\",\n  \"DisasterRecoveryUrl\": \"http://disaster-recovery.com\",\n  \"TransferMode\": \"disable-all\",\n  \"TransferCallerId\": \"from-transferee\",\n  \"Secure\": false,\n  \"CnamLookupEnabled\": false\n}","meta":"","code":"{\n  \"DomainName\": \"test.pstn.twilio.com\",\n  \"FriendlyName\": \"friendly_name\",\n  \"DisasterRecoveryMethod\": \"GET\",\n  \"DisasterRecoveryUrl\": \"http://disaster-recovery.com\",\n  \"TransferMode\": \"disable-all\",\n  \"TransferCallerId\": \"from-transferee\",\n  \"Secure\": false,\n  \"CnamLookupEnabled\": false\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"DomainName\"","#7EE787"],[":","#C9D1D9"]," ",["\"test.pstn.twilio.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"DisasterRecoveryMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"DisasterRecoveryUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://disaster-recovery.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TransferMode\"","#7EE787"],[":","#C9D1D9"]," ",["\"disable-all\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TransferCallerId\"","#7EE787"],[":","#C9D1D9"]," ",["\"from-transferee\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Secure\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"CnamLookupEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create Trunk

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTrunk() {
  const trunk = await client.trunking.v1.trunks.create();

  console.log(trunk.accountSid);
}

createTrunk();
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

trunk = client.trunking.v1.trunks.create()

print(trunk.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trunking.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trunk = await TrunkResource.CreateAsync();

        Console.WriteLine(trunk.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trunking.v1.Trunk;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Trunk trunk = Trunk.creator().create();

        System.out.println(trunk.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	trunking "github.com/twilio/twilio-go/rest/trunking/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trunking.CreateTrunkParams{}

	resp, err := client.TrunkingV1.CreateTrunk(params)
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

$trunk = $twilio->trunking->v1->trunks->create();

print $trunk->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trunk = @client
        .trunking
        .v1
        .trunks
        .create

puts trunk.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trunking:v1:trunks:create
```

```bash
curl -X POST "https://trunking.twilio.com/v1/Trunks" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "domain_name": "test.pstn.twilio.com",
  "disaster_recovery_method": "POST",
  "disaster_recovery_url": "http://disaster-recovery.com",
  "friendly_name": "friendly_name",
  "secure": false,
  "cnam_lookup_enabled": false,
  "symmetric_rtp_enabled": false,
  "recording": {
    "mode": "do-not-record",
    "trim": "do-not-trim"
  },
  "transfer_mode": "disable-all",
  "transfer_caller_id": "from-transferee",
  "auth_type": "",
  "auth_type_set": [],
  "date_created": "2015-01-02T11:23:45Z",
  "date_updated": "2015-01-02T11:23:45Z",
  "url": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "origination_urls": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OriginationUrls",
    "credential_lists": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CredentialLists",
    "ip_access_control_lists": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IpAccessControlLists",
    "phone_numbers": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers"
  }
}
```

## Fetch a Trunk resource

`GET https://trunking.twilio.com/v1/Trunks/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The unique string that we created to identify the Trunk resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TK[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch Trunk

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchTrunk() {
  const trunk = await client.trunking.v1
    .trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(trunk.accountSid);
}

fetchTrunk();
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

trunk = client.trunking.v1.trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch()

print(trunk.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trunking.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trunk = await TrunkResource.FetchAsync(pathSid: "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(trunk.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trunking.v1.Trunk;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Trunk trunk = Trunk.fetcher("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(trunk.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	resp, err := client.TrunkingV1.FetchTrunk("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$trunk = $twilio->trunking->v1
    ->trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $trunk->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trunk = @client
        .trunking
        .v1
        .trunks('TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        .fetch

puts trunk.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trunking:v1:trunks:fetch \
   --sid TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "domain_name": "test.pstn.twilio.com",
  "disaster_recovery_method": "POST",
  "disaster_recovery_url": "http://disaster-recovery.com",
  "friendly_name": "friendly_name",
  "secure": false,
  "cnam_lookup_enabled": false,
  "symmetric_rtp_enabled": false,
  "recording": {
    "mode": "do-not-record",
    "trim": "do-not-trim"
  },
  "transfer_mode": "disable-all",
  "transfer_caller_id": "from-transferor",
  "auth_type": "",
  "auth_type_set": [],
  "date_created": "2015-01-02T11:23:45Z",
  "date_updated": "2015-01-02T11:23:45Z",
  "url": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "origination_urls": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OriginationUrls",
    "credential_lists": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CredentialLists",
    "ip_access_control_lists": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IpAccessControlLists",
    "phone_numbers": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers"
  }
}
```

## Read multiple Trunk resources

`GET https://trunking.twilio.com/v1/Trunks`

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Read Trunk

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listTrunk() {
  const trunks = await client.trunking.v1.trunks.list({ limit: 20 });

  trunks.forEach((t) => console.log(t.accountSid));
}

listTrunk();
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

trunks = client.trunking.v1.trunks.list(limit=20)

for record in trunks:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trunking.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trunks = await TrunkResource.ReadAsync(limit: 20);

        foreach (var record in trunks) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trunking.v1.Trunk;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Trunk> trunks = Trunk.reader().limit(20).read();

        for (Trunk record : trunks) {
            System.out.println(record.getAccountSid());
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
	trunking "github.com/twilio/twilio-go/rest/trunking/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trunking.ListTrunkParams{}
	params.SetLimit(20)

	resp, err := client.TrunkingV1.ListTrunk(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].AccountSid != nil {
				fmt.Println(*resp[record].AccountSid)
			} else {
				fmt.Println(resp[record].AccountSid)
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

$trunks = $twilio->trunking->v1->trunks->read(20);

foreach ($trunks as $record) {
    print $record->accountSid;
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

trunks = @client
         .trunking
         .v1
         .trunks
         .list(limit: 20)

trunks.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trunking:v1:trunks:list
```

```bash
curl -X GET "https://trunking.twilio.com/v1/Trunks?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "first_page_url": "https://trunking.twilio.com/v1/Trunks?PageSize=50&Page=0",
    "url": "https://trunking.twilio.com/v1/Trunks?PageSize=50&Page=0",
    "page_size": 50,
    "key": "trunks",
    "next_page_url": null,
    "page": 0,
    "previous_page_url": null
  },
  "trunks": [
    {
      "sid": "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "domain_name": "test.pstn.twilio.com",
      "disaster_recovery_method": "POST",
      "disaster_recovery_url": "http://disaster-recovery.com",
      "friendly_name": "friendly_name",
      "secure": false,
      "cnam_lookup_enabled": false,
      "symmetric_rtp_enabled": false,
      "recording": {
        "mode": "do-not-record",
        "trim": "do-not-trim"
      },
      "transfer_mode": "disable-all",
      "transfer_caller_id": "from-transferee",
      "auth_type": "",
      "auth_type_set": [],
      "date_created": "2015-01-02T11:23:45Z",
      "date_updated": "2015-01-02T11:23:45Z",
      "url": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "origination_urls": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OriginationUrls",
        "credential_lists": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CredentialLists",
        "ip_access_control_lists": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IpAccessControlLists",
        "phone_numbers": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers"
      }
    }
  ]
}
```

## Update a Trunk resource

`POST https://trunking.twilio.com/v1/Trunks/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The unique string that we created to identify the OriginationUrl resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TK[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateTrunkRequest","properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to 64 characters long."},"DomainName":{"type":"string","description":"The unique address you reserve on Twilio to which you route your SIP traffic. Domain names can contain letters, digits, and `-` and must end with `pstn.twilio.com`. See [Termination Settings](https://www.twilio.com/docs/sip-trunking#termination) for more information."},"DisasterRecoveryUrl":{"type":"string","format":"uri","description":"The URL we should call using the `disaster_recovery_method` if an error occurs while sending SIP traffic towards the configured Origination URL. We retrieve TwiML from the URL and execute the instructions like any other normal TwiML call. See [Disaster Recovery](https://www.twilio.com/docs/sip-trunking#disaster-recovery) for more information.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"DisasterRecoveryMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call the `disaster_recovery_url`. Can be: `GET` or `POST`."},"TransferMode":{"type":"string","enum":["disable-all","enable-all","sip-only"],"description":"The call transfer settings for the trunk. Can be: `enable-all`, `sip-only` and `disable-all`. See [Transfer](https://www.twilio.com/docs/sip-trunking/call-transfer) for more information.","refName":"trunk_enum_transfer_setting","modelName":"trunk_enum_transfer_setting"},"Secure":{"type":"boolean","description":"Whether Secure Trunking is enabled for the trunk. If enabled, all calls going through the trunk will be secure using SRTP for media and TLS for signaling. If disabled, then RTP will be used for media. See [Secure Trunking](https://www.twilio.com/docs/sip-trunking#securetrunking) for more information."},"CnamLookupEnabled":{"type":"boolean","description":"Whether Caller ID Name (CNAM) lookup should be enabled for the trunk. If enabled, all inbound calls to the SIP Trunk from the United States and Canada automatically perform a CNAM Lookup and display Caller ID data on your phone. See [CNAM Lookups](https://www.twilio.com/docs/sip-trunking#CNAM) for more information."},"TransferCallerId":{"type":"string","enum":["from-transferee","from-transferor"],"description":"Caller Id for transfer target. Can be: `from-transferee` (default) or `from-transferor`.","refName":"trunk_enum_transfer_caller_id","modelName":"trunk_enum_transfer_caller_id"}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"updated_name\",\n  \"DisasterRecoveryMethod\": \"GET\",\n  \"DisasterRecoveryUrl\": \"http://updated-recovery.com\",\n  \"Secure\": true,\n  \"TransferMode\": \"disable-all\",\n  \"TransferCallerId\": \"from-transferor\",\n  \"CnamLookupEnabled\": true\n}","meta":"","code":"{\n  \"FriendlyName\": \"updated_name\",\n  \"DisasterRecoveryMethod\": \"GET\",\n  \"DisasterRecoveryUrl\": \"http://updated-recovery.com\",\n  \"Secure\": true,\n  \"TransferMode\": \"disable-all\",\n  \"TransferCallerId\": \"from-transferor\",\n  \"CnamLookupEnabled\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"updated_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"DisasterRecoveryMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"DisasterRecoveryUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://updated-recovery.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Secure\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TransferMode\"","#7EE787"],[":","#C9D1D9"]," ",["\"disable-all\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TransferCallerId\"","#7EE787"],[":","#C9D1D9"]," ",["\"from-transferor\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CnamLookupEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update Trunk

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTrunk() {
  const trunk = await client.trunking.v1
    .trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ friendlyName: "FriendlyName" });

  console.log(trunk.accountSid);
}

updateTrunk();
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

trunk = client.trunking.v1.trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").update(
    friendly_name="FriendlyName"
)

print(trunk.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trunking.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trunk = await TrunkResource.UpdateAsync(
            friendlyName: "FriendlyName", pathSid: "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(trunk.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trunking.v1.Trunk;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Trunk trunk = Trunk.updater("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setFriendlyName("FriendlyName").update();

        System.out.println(trunk.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	trunking "github.com/twilio/twilio-go/rest/trunking/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trunking.UpdateTrunkParams{}
	params.SetFriendlyName("FriendlyName")

	resp, err := client.TrunkingV1.UpdateTrunk("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$trunk = $twilio->trunking->v1
    ->trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["friendlyName" => "FriendlyName"]);

print $trunk->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trunk = @client
        .trunking
        .v1
        .trunks('TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        .update(friendly_name: 'FriendlyName')

puts trunk.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trunking:v1:trunks:update \
   --sid TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --friendly-name FriendlyName
```

```bash
curl -X POST "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "FriendlyName=FriendlyName" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "domain_name": "test.pstn.twilio.com",
  "disaster_recovery_method": "GET",
  "disaster_recovery_url": "http://updated-recovery.com",
  "friendly_name": "FriendlyName",
  "secure": true,
  "cnam_lookup_enabled": true,
  "symmetric_rtp_enabled": true,
  "recording": {
    "mode": "do-not-record",
    "trim": "do-not-trim"
  },
  "transfer_mode": "disable-all",
  "transfer_caller_id": "from-transferor",
  "auth_type": "",
  "auth_type_set": [],
  "date_created": "2015-01-02T11:23:45Z",
  "date_updated": "2015-01-02T11:23:45Z",
  "url": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "origination_urls": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OriginationUrls",
    "credential_lists": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CredentialLists",
    "ip_access_control_lists": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IpAccessControlLists",
    "phone_numbers": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers"
  }
}
```

## Delete a Trunk resource

`DELETE https://trunking.twilio.com/v1/Trunks/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The unique string that we created to identify the Trunk resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TK[0-9a-fA-F]{32}$"},"required":true}]
```

Delete Trunk

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteTrunk() {
  await client.trunking.v1
    .trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteTrunk();
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

client.trunking.v1.trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trunking.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await TrunkResource.DeleteAsync(pathSid: "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trunking.v1.Trunk;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Trunk.deleter("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	err := client.TrunkingV1.DeleteTrunk("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$twilio->trunking->v1->trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")->delete();
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
  .trunking
  .v1
  .trunks('TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trunking:v1:trunks:remove \
   --sid TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
