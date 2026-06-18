# Encrypted Recordings

> \[!NOTE]
>
> Video Recording Encryption is available to Twilio Enterprise Edition and Twilio Security Edition customers. Learn more about [Editions](https://www.twilio.com/en-us/editions).

The Twilio Recording Settings REST API lets you configure Twilio to store
your recordings encrypted. Recording Settings work per-account (i.e. project).
If you activate encryption, all Video Recordings in your account (or project)
will get encrypted.

This document contains reference information about the Recording Settings REST
API for encryption. For a step-by-step guide you can also read the
[Encrypting your Stored Media developer guide](/docs/video/tutorials/encrypting-your-stored-media)

## Contents

* [URI Schemes](#uri-schemes)
* [Recording Settings instance resource](#recording-settings-instance-resource)
  * [Base URL](#base-url)
  * [Resource Properties](#resource-properties)
  * [HTTP `GET`: Get Settings](#http-get)
  * [HTTP `POST`: Set Settings](#http-post)
    * [Enabling Encrypted Recordings](#enable-encryption)
* [Known Problems and Limitations](#known-problems-and-limitations)

## URI Schemes \[#uri-schemes]

These are the URI schemes for the Recording Settings REST API
and the supported methods:

* `/v1/RecordingSettings/Default`
  * `GET`: Retrieves current Recording Settings.
  * `POST`: Updates the Recording Settings.

## Recording Settings instance resource \[#recording-settings-instance-resource]

The `Default` `RecordingSettings` resource holds the default recording settings
for the given Twilio account (or project). Its configuration will be applied to
all Recordings created in such account (or project).

### Base URL

The Recording Settings default resource is located at the following Base URL:

```bash
https://video.twilio.com/v1/RecordingSettings/Default

```

### Resource Properties \[#resource-properties]

A RecordingSettings resource has the following properties:

```json
{"type":"object","refName":"video.v1.recording_settings","modelName":"video_v1_recording_settings","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the RecordingSettings resource."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource and show the user in the console"},"aws_credentials_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CR[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the stored Credential resource."},"aws_s3_url":{"type":"string","format":"uri","nullable":true,"description":"The URL of the AWS S3 bucket where the recordings are stored. We only support DNS-compliant URLs like `https://documentation-example-twilio-bucket/recordings`, where `recordings` is the path in which you want the recordings to be stored. This URL accepts only URI-valid characters, as described in the [RFC 3986](https://tools.ietf.org/html/rfc3986#section-2)."},"aws_storage_enabled":{"type":"boolean","nullable":true,"description":"Whether all recordings are written to the `aws_s3_url`. When `false`, all recordings are stored in our cloud."},"encryption_key_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CR[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Public Key resource used for encryption."},"encryption_enabled":{"type":"boolean","nullable":true,"description":"Whether all recordings are stored in an encrypted form. The default is `false`."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."}}}
```

In the table above, the following properties are reserved for the feature called
External S3 Storage:

* `aws_credentials_sid`
* `aws_s3_url`
* `aws_storage_enabled`

### HTTP GET: Get Settings \[#http-get]

Retrieves your account's default Recording Settings.

For example:

Fetch Recording Settings

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchRecordingSettings() {
  const recordingSetting = await client.video.recordingSettings().fetch();

  console.log(recordingSetting.accountSid);
}

fetchRecordingSettings();
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

recording_setting = client.video.recording_settings().fetch()

print(recording_setting.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var recordingSettings = await RecordingSettingsResource.FetchAsync();

        Console.WriteLine(recordingSettings.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.RecordingSettings;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        RecordingSettings recordingSettings = RecordingSettings.fetcher().fetch();

        System.out.println(recordingSettings.getAccountSid());
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

	resp, err := client.VideoV1.FetchRecordingSettings()
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

$recording_setting = $twilio->video->recordingSettings()->fetch();

print $recording_setting->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording_setting = @client
                    .video
                    .recording_settings
                    .fetch

puts recording_setting.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:recording-settings:default:fetch
```

```bash
curl -X GET "https://video.twilio.com/v1/RecordingSettings/Default" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "string",
  "aws_credentials_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "encryption_key_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "aws_s3_url": "https://my-super-duper-bucket.s3.amazonaws.com/my/path/",
  "aws_storage_enabled": true,
  "encryption_enabled": true,
  "url": "https://video.twilio.com/v1/RecordingSettings/Default"
}
```

### HTTP POST: Set Settings \[#http-post]

Sets your account's default Recording Settings. `POST` requests support the
following parameters:

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateRecordingSettingsRequest","required":["FriendlyName"],"properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource and be shown to users in the console"},"AwsCredentialsSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CR[0-9a-fA-F]{32}$","description":"The SID of the stored Credential resource."},"EncryptionKeySid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CR[0-9a-fA-F]{32}$","description":"The SID of the Public Key resource to use for encryption."},"AwsS3Url":{"type":"string","format":"uri","description":"The URL of the AWS S3 bucket where the recordings should be stored. We only support DNS-compliant URLs like `https://documentation-example-twilio-bucket/recordings`, where `recordings` is the path in which you want the recordings to be stored. This URL accepts only URI-valid characters, as described in the [RFC 3986](https://tools.ietf.org/html/rfc3986#section-2)."},"AwsStorageEnabled":{"type":"boolean","description":"Whether all recordings should be written to the `aws_s3_url`. When `false`, all recordings are stored in our cloud."},"EncryptionEnabled":{"type":"boolean","description":"Whether all recordings should be stored in an encrypted form. The default is `false`."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"AwsCredentialsSid\": \"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"EncryptionKeySid\": \"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab\",\n  \"AwsS3Url\": \"https://my-super-duper-bucket.s3.amazonaws.com/my/path/\",\n  \"AwsStorageEnabled\": true,\n  \"EncryptionEnabled\": true\n}","meta":"","code":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"AwsCredentialsSid\": \"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"EncryptionKeySid\": \"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab\",\n  \"AwsS3Url\": \"https://my-super-duper-bucket.s3.amazonaws.com/my/path/\",\n  \"AwsStorageEnabled\": true,\n  \"EncryptionEnabled\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AwsCredentialsSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EncryptionKeySid\"","#7EE787"],[":","#C9D1D9"]," ",["\"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AwsS3Url\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://my-super-duper-bucket.s3.amazonaws.com/my/path/\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AwsStorageEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"EncryptionEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

In the table above, the following parameters are reserved for the feature called
External S3 Storage:

* `AwsCredentialsSid`
* `AwsS3Url`
* `AwsStorageEnabled`

#### Enabling Encrypted Recordings \[#enable-encryption]

The following code snippets illustrate how you can set Encryption in your
Recordings settings:

Creates or updates the configuration to upload encrypted files

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createRecordingSettings() {
  const recordingSetting = await client.video.recordingSettings().create({
    encryptionEnabled: true,
    encryptionKeySid: "CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    friendlyName: "Upload encrypted",
  });

  console.log(recordingSetting.accountSid);
}

createRecordingSettings();
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

recording_setting = client.video.recording_settings().create(
    encryption_enabled=True,
    encryption_key_sid="CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    friendly_name="Upload encrypted",
)

print(recording_setting.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var recordingSettings = await RecordingSettingsResource.CreateAsync(
            encryptionEnabled: true,
            encryptionKeySid: "CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            friendlyName: "Upload encrypted");

        Console.WriteLine(recordingSettings.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.RecordingSettings;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        RecordingSettings recordingSettings = RecordingSettings.creator("Upload encrypted")
                                                  .setEncryptionEnabled(true)
                                                  .setEncryptionKeySid("CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                                  .create();

        System.out.println(recordingSettings.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.CreateRecordingSettingsParams{}
	params.SetEncryptionEnabled(true)
	params.SetEncryptionKeySid("CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetFriendlyName("Upload encrypted")

	resp, err := client.VideoV1.CreateRecordingSettings(params)
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

$recording_setting = $twilio->video->recordingSettings()->create(
    "Upload encrypted", // FriendlyName
    [
        "encryptionEnabled" => true,
        "encryptionKeySid" => "CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ]
);

print $recording_setting->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording_setting = @client
                    .video
                    .recording_settings
                    .create(
                      encryption_enabled: true,
                      encryption_key_sid: 'CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                      friendly_name: 'Upload encrypted'
                    )

puts recording_setting.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:recording-settings:default:update \
   --encryption-enabled \
   --encryption-key-sid CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --friendly-name "Upload encrypted"
```

```bash
curl -X POST "https://video.twilio.com/v1/RecordingSettings/Default" \
--data-urlencode "EncryptionEnabled=true" \
--data-urlencode "EncryptionKeySid=CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "FriendlyName=Upload encrypted" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Upload encrypted",
  "aws_credentials_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "encryption_key_sid": "CRXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "aws_s3_url": "https://my-super-duper-bucket.s3.amazonaws.com/my/path/",
  "aws_storage_enabled": true,
  "encryption_enabled": true,
  "url": "https://video.twilio.com/v1/RecordingSettings/Default"
}
```

## Known Problems and Limitations \[#known-problems-and-limitations]

* If you activate Encryption in your account, you will not be able to use Compositions in such account given that Compositions require the source recordings to be stored unencrypted.
