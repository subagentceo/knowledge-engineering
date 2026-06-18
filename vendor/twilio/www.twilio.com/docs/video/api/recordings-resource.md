# Recordings Resource

Twilio Video's Rooms and Recording APIs allow you to record the audio and video shared in a Programmable Video Room. To turn on Recording in a Room, set the `RecordParticipantsOnConnect` property to `true` when creating the Room. Check the [Rooms REST API documentation](/docs/video/api/rooms-resource) for additional information.

All Recording resources are located beneath the following base URL.

```bash
https://video.twilio.com

```

> \[!WARNING]
>
> If you choose to record voice or video calls, you need to comply with certain laws and regulations, including those regarding obtaining consent to record (such as California's Invasion of Privacy Act and similar laws in other jurisdictions). Additional information on the legal implications of call recording can be found [in the "Legal Considerations with Recording Voice and Video Communications" Help Center article](https://help.twilio.com/hc/en-us/articles/360011522553-Legal-Considerations-with-Recording-Voice-and-Video-Communications).
>
> *Notice*: Twilio recommends that you consult with your legal counsel to make sure that you are complying with all applicable laws in connection with communications you record or store using Twilio.

## Contents

* [Recording Instance Resource](#recording-instance-resource)
  * [Resource Properties](#resource-properties)
  * [Get a Recording Instance (HTTP `GET`)](#get-instance)
  * [Get a Recording's Media](#get-media-subresource)
  * [Delete a Recording (HTTP `DELETE`)](#delete-instance)
* [Recordings List Resource](#recordings-list-resource)
  * [Get list of Recordings (HTTP `GET`)](#get-list-resource)
  * [Filter parameters](#get-list-filters)
* [Using the Rooms API to find Recordings](#rooms-recordings)
* Examples
  * [Retrieve a Recording](#get-by-sid)
  * [Retrieve a Recording's Media](#get-media-by-sid)
  * [Delete a Recording](#delete-recording)
  * [Get all Recordings from a given Room](#filter-by-room-sid)
  * [Get all Recordings from a given Participant](#filter-by-participant-sid)
  * [Get the list of deleted Recordings](#filter-by-status)
  * [Get all Recordings from a given Room using the Rooms API](#rooms-filter-by-room-sid)
  * [Retrieve a Recording using the Rooms API](#rooms-get-instance)
  * [Retrieve a Recording's Media using the Rooms API](#rooms-get-media-subresource)
* [Size estimation of a track Recording](#recording-size-estimation)
* [Known limitations](#known-issues)

## Recording instance resource \[#recording-instance-resource]

Recordings captured by Programmable Video products are single-track, single-media and stored in a single file format.

Recordings are represented through a REST API with the following URI scheme:

```bash
 /v1/Recordings/{RecordingSid}
```

### Resource properties \[#resource-properties]

A Recording has the following properties:

```json
{"type":"object","refName":"video.v1.recording","modelName":"video_v1_recording","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource."},"status":{"type":"string","enum":["processing","completed","deleted","failed"],"description":"The status of the recording. Can be: `processing`, `completed`, or `deleted`. `processing` indicates the recording is still being captured; `completed` indicates the recording has been captured and is now available for download. `deleted` means the recording media has been deleted from the system, but its metadata is still available.","refName":"recording_enum_status","modelName":"recording_enum_status"},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RT[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Recording resource."},"source_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^[a-zA-Z]{2}[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the recording source. For a Room Recording, this value is a `track_sid`."},"size":{"type":"integer","format":"int64","nullable":true,"description":"The size of the recorded track, in bytes."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"type":{"type":"string","enum":["audio","video","data"],"description":"The recording's media type. Can be: `audio` or `video`.","refName":"recording_enum_type","modelName":"recording_enum_type"},"duration":{"type":"integer","nullable":true,"description":"The duration of the recording in seconds rounded to the nearest second. Sub-second tracks have a `Duration` property of 1 second"},"container_format":{"type":"string","enum":["mka","mkv"],"refName":"recording_enum_format","modelName":"recording_enum_format"},"codec":{"type":"string","enum":["VP8","H264","OPUS","PCMU"],"description":"The codec used to encode the track. Can be: `VP8`, `H264`, `OPUS`, and `PCMU`.","refName":"recording_enum_codec","modelName":"recording_enum_codec"},"grouping_sids":{"nullable":true,"description":"A list of SIDs related to the recording. Includes the `room_sid` and `participant_sid`."},"track_name":{"type":"string","nullable":true,"description":"The name that was given to the source track of the recording. If no name is given, the `source_sid` is used.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"offset":{"type":"integer","format":"int64","nullable":true,"description":"The time in milliseconds elapsed between an arbitrary point in time, common to all group rooms, and the moment when the source room of this track started. This information provides a synchronization mechanism for recordings belonging to the same room."},"media_external_location":{"type":"string","format":"uri","nullable":true,"description":"The URL of the media file associated with the recording when stored externally. See [External S3 Recordings](/docs/video/api/external-s3-recordings) for more details."},"status_callback":{"type":"string","format":"uri","nullable":true,"description":"The URL called using the `status_callback_method` to send status information on every recording event."},"status_callback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method used to call `status_callback`. Can be: `POST` or `GET`, defaults to `POST`."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."}}}
```

Note: The duration of media tracks is rounded to the nearest second. Thus, sub-second duration tracks have a `Duration` property of 1 second.

### HTTP GET \[#get-instance]

Returns a single Recording Instance resource identified by a `RecordingSid`.

#### Example: Retrieve a Recording \[#get-by-sid]

Retrieve a Recording

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchRecording() {
  const recording = await client.video.v1
    .recordings("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(recording.accountSid);
}

fetchRecording();
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

recording = client.video.v1.recordings(
    "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).fetch()

print(recording.account_sid)
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

        var recording =
            await RecordingResource.FetchAsync(pathSid: "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(recording.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Recording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Recording recording = Recording.fetcher("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(recording.getAccountSid());
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

	resp, err := client.VideoV1.FetchRecording("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$recording = $twilio->video->v1
    ->recordings("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $recording->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording = @client
            .video
            .v1
            .recordings('RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .fetch

puts recording.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:recordings:fetch \
   --sid RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://video.twilio.com/v1/Recordings/RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "sid": "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "source_sid": "MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "size": 0,
  "url": "https://video.twilio.com/v1/Recordings/RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "audio",
  "duration": 0,
  "container_format": "mka",
  "codec": "opus",
  "track_name": "A name",
  "offset": 10,
  "status_callback": "https://mycallbackurl.com",
  "status_callback_method": "POST",
  "grouping_sids": {
    "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "media_external_location": "https://my-super-duper-bucket.s3.amazonaws.com/my/path/",
  "links": {
    "media": "https://video.twilio.com/v1/Recordings/RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

### HTTP GET to the `/Media` subresource \[#get-media-subresource]

Retrieves the media file associated to a given Recording Instance resource
identified by a `RecordingSid`.

When you make a request to this URL, Twilio will generate a temporary URL for accessing this binary data, and issue an HTTP 302 redirect response to your request. The Recording will be returned in the format as described in the metadata, with the `Content-Type` header set according to the codec used to record the media.

| **Codec** | **`Content-Type` value** |
| --------- | ------------------------ |
| `PCMU`    | `audio/x-matroska`       |
| `H264`    | `video/x-matroska`       |

The URL returned will be available by default for 600 seconds, but this can be configured to a value between 1 and 3600 seconds via the `Ttl` request param. If the recording is not yet available, a 404 is returned. If the recording is not available (for example, if its status is `processing` or `deleted`, or if the track was muted for the duration of the recording), an HTTP 404 response is returned.

The HTTP `GET` request accepts the following parameters

| Name               | Description                                                                                                                                                                                                                                                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ContentDisposition | Optional. Sets the `Content-Disposition` header of the `redirect_to` URL. Possible values are `attachment` or `inline`. Default value `attachment%3B%20filename%3D%22RTxxx.mk{a\|v}` ([not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii))                                                   |
| Ttl                | Optional. Duration in seconds for which the `redirect_to` URL can be used to retrieve the media file. The default `Ttl` is 600 seconds. The minimum supported `Ttl` value is 1 second and the maximum supported value is 3600 seconds. ([not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii)) |

The [`Content-Disposition`](https://tools.ietf.org/html/rfc6266#section-4.2) header can be set in this request. By default, the value of this header is `attachment%3B%20filename%3D%22RTxxx.mk{a|v}`.

**NOTE:** You can play these recordings in media players that support the [Matroska file format](https://matroska.org/), like the [VLC](https://www.videolan.org/vlc/index.html) player. You can also use other programs like *Chrome*, *ffplay* or *ffplayer* to play these recordings. However, these files are optimized for compactness and they are not player-friendly. Hence, you may experience different types of problems when playing these files. For generating player-friendly media files, compose your Recordings using [Twilio's Recordings Composition API](/docs/video/api/compositions-resource).

#### Example: Retrieve a Recording's Media \[#get-media-by-sid]

Retrieve the actual recording Media

```js
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/node
const Twilio = require('twilio');

// To set up environmental variables, see http://twil.io/secure
const apiKeySid = process.env.TWILIO_API_KEY;
const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const client = new Twilio(apiKeySid, apiKeySecret, { accountSid: accountSid });

const recordingSid = 'RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const uri = `https://video.twilio.com/v1/Recordings/${recordingSid}/Media`;
client.request({ method: 'GET', uri: uri }).then((response) => {
  const mediaLocation = response.data.redirect_to;
  request.get(mediaLocation, (err, res, media) => {
    console.log(media);
  });
});
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
import json
from urllib.request import urlopen

from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

recording_sid = "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
uri = "https://video.twilio.com/v1/Recordings/{}/Media".format(recording_sid)
response = client.request("GET", uri)
media_location = json.loads(response.text).get("redirect_to")

media_content = urlopen(media_location).read()
print(media_content)
```

```cs
// Download the twilio-csharp library from twilio.com/docs/libraries/csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using Newtonsoft.Json;

class Example
{
    static void Main(string[] args)
    {
        // Find your Account SID and Auth Token at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        const string recordingSid = "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
        const string uri = $"https://video.twilio.com/v1/Recordings/{recordingSid}/Media";

        var request = (HttpWebRequest)WebRequest.Create(uri);
        request.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(apiKeySid + ":" + apiKeySecret)));
        request.AllowAutoRedirect = false;
        string responseBody = new StreamReader(request.GetResponse().GetResponseStream()).ReadToEnd();
        var mediaLocation = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseBody)["redirect_to"];

        Console.WriteLine(mediaLocation);
        new WebClient().DownloadFile(mediaLocation, $"{recordingSid}.out");
    }
}
```

```java
import com.twilio.http.HttpMethod;
import com.twilio.http.NetworkHttpClient;
import com.twilio.http.Request;
import com.twilio.http.Response;
import com.twilio.http.TwilioRestClient;
import com.twilio.rest.Domains;
import org.apache.commons.io.IOUtils;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONObject;

import java.io.IOException;


public class Example {
    // Get your Account SID and Auth Token from https://twilio.com/console
    // To set up environment variables, see http://twil.io/secure
    public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");;
    public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

    public static void main(String args[]) throws IOException {
        // Disable HttpClient follow redirect by default
        HttpClientBuilder clientBuilder = HttpClientBuilder.create();
        clientBuilder.disableRedirectHandling();

        // Initialize the client
        TwilioRestClient restClient = new TwilioRestClient
                .Builder(API_KEY_SID, API_KEY_SECRET)
                .httpClient(new NetworkHttpClient(clientBuilder))
                .build();

        // Retrieve media location
        String recordingSid = "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
        Request request = new Request(
                HttpMethod.GET,
                Domains.VIDEO.toString(),
                "/v1/Recordings/" + recordingSid + "/Media/",
                restClient.getRegion()
        );
        Response response = restClient.request(request);
        JSONObject json = new JSONObject(response.getContent());
        String mediaLocation = json.getString("redirect_to");

        // Retrieve media content
        String mediaContent = org.apache.http.client.fluent.Request
                .Get(mediaLocation)
                .execute()
                .handleResponse((r) ->
                        IOUtils.toString(r.getEntity().getContent()));

        System.out.println(mediaContent);
    }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once "/path/to/vendor/autoload.php"; // Loads the library
use Twilio\Rest\Client;

// Your Account Sid and Auth Token from twilio.com/console
// To set up environmental variables, see http://twil.io/secure
$apiKeySid = getenv('TWILIO_API_KEY');
$apiKeySecret = "your_auth_api_key_secret";
$client = new Client($apiKeySid, $apiKeySecret);

$recordingSid = "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
$uri = "https://video.twilio.com/v1/Recordings/$recordingSid/Media";
$response = $client->request("GET", $uri);
$mediaLocation = $response->getContent()["redirect_to"];

$media_content = file_get_contents($mediaLocation);
print_r($media_content);
```

```rb
# Download the Ruby helper library from twilio.com/docs/libraries/ruby
require 'twilio-ruby'
require 'net/http'

# Get your Account Sid and Auth Token from https://www.twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = ENV['TWILIO_API_KEY']
api_key_secret = ENV['TWILIO_API_KEY_SECRET']

client = Twilio::REST::Client.new(api_key_sid, api_key_secret)

recording_sid = 'RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
uri = "https://video.twilio.com/v1/Recordings/#{recording_sid}/Media"

response = client.request('video.twilio.com', 443, 'GET', uri)
media_content = Net::HTTP.get(URI(response.body['redirect_to']))
puts media_content
```

```bash
curl 'https://video.twilio.com/v1/Recordings/RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media' \
  -u 'SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_api_key_secret' \
```

```json
{
    "redirect_to": "https://com-twilio-us1-video-recording.s3.amazonaws.com/RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

### HTTP POST

Not supported.

### HTTP DELETE \[#delete-instance]

Deletes the recording media file.

The **metadata** for the Recording is **preserved for a period of 30 days**, and its `Status` is set to `deleted`. After this period, the metadata will not be available. By default, Recordings with `deleted` status are not returned when retrieving the Recordings list. To retrieve `deleted` Recordings, use the `Status=deleted` filter.

Note that the 30-day period starts after the `Status` is set to `deleted`. After this period expires, the metadata will not be available.

#### Example: Delete a Recording \[#delete-recording]

Delete a Recording

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteRecording() {
  await client.video.v1
    .recordings("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .remove();
}

deleteRecording();
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

client.video.v1.recordings("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
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

        await RecordingResource.DeleteAsync(pathSid: "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Recording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Recording.deleter("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete();
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

	err := client.VideoV1.DeleteRecording("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$twilio->video->v1->recordings("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->delete();
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
  .video
  .v1
  .recordings('RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:recordings:remove \
   --sid RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X DELETE "https://video.twilio.com/v1/Recordings/RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

> \[!NOTE]
>
> To delete a large set of Video Recordings, you can use the bulk deletion capabilities available in the [Twilio Console](https://www.twilio.com/console/video/logs/recordings).

## Recordings List Resource \[#recordings-list-resource]

Recordings list is available at the following URI:

```bash
 /v1/Recordings

```

### HTTP GET \[#get-list-resource]

Returns a list of all Track Recordings with paging data.

### HTTP GET: List filters \[#get-list-filters]

The following `GET` query string parameters allow you to limit the list returned. Note, parameters are case-sensitive.

### Query parameters

```json
[{"name":"Status","in":"query","description":"Read only the recordings that have this status. Can be: `processing`, `completed`, or `deleted`.","schema":{"type":"string","enum":["processing","completed","deleted","failed"],"description":"The status of the recording. Can be: `processing`, `completed`, or `deleted`. `processing` indicates the recording is still being captured; `completed` indicates the recording has been captured and is now available for download. `deleted` means the recording media has been deleted from the system, but its metadata is still available.","refName":"recording_enum_status","modelName":"recording_enum_status"},"examples":{"readEmpty":{"value":"completed"},"readResults":{"value":"completed"}}},{"name":"SourceSid","in":"query","description":"Read only the recordings that have this `source_sid`.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^[a-zA-Z]{2}[0-9a-fA-F]{32}$"},"examples":{"readEmpty":{"value":"MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readResults":{"value":"MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"GroupingSid","in":"query","description":"Read only recordings with this `grouping_sid`, which may include a `participant_sid` and/or a `room_sid`.","schema":{"type":"array","items":{"type":"string","minLength":34,"maxLength":34,"pattern":"^[a-zA-Z]{2}[0-9a-fA-F]{32}$"}},"examples":{"readEmpty":{"value":["RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]},"readResults":{"value":["RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]}}},{"name":"DateCreatedAfter","in":"query","description":"Read only recordings that started on or after this [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time with time zone.","schema":{"type":"string","format":"date-time"},"examples":{"readResults":{"value":"2017-01-01T00:00:01Z"}}},{"name":"DateCreatedBefore","in":"query","description":"Read only recordings that started before this [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time with time zone, given as `YYYY-MM-DDThh:mm:ss+|-hh:mm` or `YYYY-MM-DDThh:mm:ssZ`.","schema":{"type":"string","format":"date-time"},"examples":{"readResults":{"value":"2017-12-31T23:59:59Z"}}},{"name":"MediaType","in":"query","description":"Read only recordings that have this media type. Can be either `audio` or `video`.","schema":{"type":"string","enum":["audio","video","data"],"description":"The recording's media type. Can be: `audio` or `video`.","refName":"recording_enum_type","modelName":"recording_enum_type"},"examples":{"readEmpty":{"value":"audio"},"readResults":{"value":"audio"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":100,"default":50}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

#### Example: Get all Recordings from a given Room \[#filter-by-room-sid]

> \[!NOTE]
>
> This endpoint does not retrieve deleted recordings by default. To retrieve deleted recordings, [use the status filter in your request.](/docs/video/api/recordings-resource#filter-by-status)

Get all Recordings from a given Room

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRecording() {
  const recordings = await client.video.v1.recordings.list({
    groupingSid: ["RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
    limit: 20,
  });

  recordings.forEach((r) => console.log(r.accountSid));
}

listRecording();
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

recordings = client.video.v1.recordings.list(
    grouping_sid=["RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"], limit=20
)

for record in recordings:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var recordings = await RecordingResource.ReadAsync(
            groupingSid: new List<string> { "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }, limit: 20);

        foreach (var record in recordings) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Recording;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Recording> recordings =
            Recording.reader().setGroupingSid(Arrays.asList("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")).limit(20).read();

        for (Recording record : recordings) {
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
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.ListRecordingParams{}
	params.SetGroupingSid([]string{
		"RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	})
	params.SetLimit(20)

	resp, err := client.VideoV1.ListRecording(params)
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

$recordings = $twilio->video->v1->recordings->read(
    ["groupingSid" => ["RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"]],
    20
);

foreach ($recordings as $record) {
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

recordings = @client
             .video
             .v1
             .recordings
             .list(
               grouping_sid: [
                 'RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
               ],
               limit: 20
             )

recordings.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:recordings:list \
   --grouping-sid RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://video.twilio.com/v1/Recordings?GroupingSid=RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "recordings": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://video.twilio.com/v1/Recordings?Status=completed&SourceSid=MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&MediaType=audio&GroupingSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Recordings?Status=completed&SourceSid=MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&MediaType=audio&GroupingSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "recordings"
  }
}
```

#### Example: Get all Recordings for a given Participant \[#filter-by-participant-sid]

> \[!NOTE]
>
> This endpoint does not retrieve deleted recordings by default. To retrieve deleted recordings, [use the status filter in your request.](/docs/video/api/recordings-resource#filter-by-status)

Get all Recordings for a given Participant

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRecording() {
  const recordings = await client.video.v1.recordings.list({
    groupingSid: ["PARTICIPANT_SID"],
    limit: 20,
  });

  recordings.forEach((r) => console.log(r.accountSid));
}

listRecording();
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

recordings = client.video.v1.recordings.list(
    grouping_sid=["PARTICIPANT_SID"], limit=20
)

for record in recordings:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var recordings = await RecordingResource.ReadAsync(
            groupingSid: new List<string> { "PARTICIPANT_SID" }, limit: 20);

        foreach (var record in recordings) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Recording;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Recording> recordings =
            Recording.reader().setGroupingSid(Arrays.asList("PARTICIPANT_SID")).limit(20).read();

        for (Recording record : recordings) {
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
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.ListRecordingParams{}
	params.SetGroupingSid([]string{
		"PARTICIPANT_SID",
	})
	params.SetLimit(20)

	resp, err := client.VideoV1.ListRecording(params)
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

$recordings = $twilio->video->v1->recordings->read(
    ["groupingSid" => ["PARTICIPANT_SID"]],
    20
);

foreach ($recordings as $record) {
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

recordings = @client
             .video
             .v1
             .recordings
             .list(
               grouping_sid: [
                 'PARTICIPANT_SID'
               ],
               limit: 20
             )

recordings.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:recordings:list \
   --grouping-sid PARTICIPANT_SID
```

```bash
curl -X GET "https://video.twilio.com/v1/Recordings?GroupingSid=PARTICIPANT_SID&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "recordings": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://video.twilio.com/v1/Recordings?Status=completed&SourceSid=MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&MediaType=audio&GroupingSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Recordings?Status=completed&SourceSid=MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&MediaType=audio&GroupingSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "recordings"
  }
}
```

#### Example: Get the list of deleted Recordings \[#filter-by-status]

Get the list of deleted Recordings

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRecording() {
  const recordings = await client.video.v1.recordings.list({
    status: "deleted",
    limit: 20,
  });

  recordings.forEach((r) => console.log(r.accountSid));
}

listRecording();
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

recordings = client.video.v1.recordings.list(status="deleted", limit=20)

for record in recordings:
    print(record.account_sid)
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

        var recordings = await RecordingResource.ReadAsync(
            status: RecordingResource.StatusEnum.Deleted, limit: 20);

        foreach (var record in recordings) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Recording;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Recording> recordings = Recording.reader().setStatus(Recording.Status.DELETED).limit(20).read();

        for (Recording record : recordings) {
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
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.ListRecordingParams{}
	params.SetStatus("deleted")
	params.SetLimit(20)

	resp, err := client.VideoV1.ListRecording(params)
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

$recordings = $twilio->video->v1->recordings->read(["status" => "deleted"], 20);

foreach ($recordings as $record) {
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

recordings = @client
             .video
             .v1
             .recordings
             .list(
               status: 'deleted',
               limit: 20
             )

recordings.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:recordings:list \
   --status deleted
```

```bash
curl -X GET "https://video.twilio.com/v1/Recordings?Status=deleted&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "recordings": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://video.twilio.com/v1/Recordings?Status=completed&SourceSid=MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&MediaType=audio&GroupingSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Recordings?Status=completed&SourceSid=MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&MediaType=audio&GroupingSid=RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "recordings"
  }
}
```

### HTTP POST \[#http-post-2]

Not supported.

### HTTP DELETE

Not supported.

## Using the Rooms API to find Recordings \[#rooms-recordings]

You can also retrieve the list of recordings for a specific room using the Rooms API endpoint.

### Example: Get all recordings from a given Room using the Rooms API \[#rooms-filter-by-room-sid]

> \[!NOTE]
>
> This endpoint does not retrieve deleted recordings by default. To retrieve deleted recordings, [use the status filter in your request.](/docs/video/api/recordings-resource#filter-by-status)

Get all Recordings from a given Room using the Rooms API

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRoomRecording() {
  const recordings = await client.video.v1
    .rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings.list({ limit: 20 });

  recordings.forEach((r) => console.log(r.accountSid));
}

listRoomRecording();
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

recordings = client.video.v1.rooms(
    "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).recordings.list(limit=20)

for record in recordings:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1.Room;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var roomRecordings = await RoomRecordingResource.ReadAsync(
            pathRoomSid: "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", limit: 20);

        foreach (var record in roomRecordings) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.RoomRecording;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<RoomRecording> roomRecordings =
            RoomRecording.reader("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").limit(20).read();

        for (RoomRecording record : roomRecordings) {
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
	video "github.com/twilio/twilio-go/rest/video/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &video.ListRoomRecordingParams{}
	params.SetLimit(20)

	resp, err := client.VideoV1.ListRoomRecording("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
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

$recordings = $twilio->video->v1
    ->rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->recordings->read([], 20);

foreach ($recordings as $record) {
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

recordings = @client
             .video
             .v1
             .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
             .recordings
             .list(limit: 20)

recordings.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:recordings:list \
   --room-sid RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "recordings": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "recordings"
  }
}
```

### Example: Retrieve a Recording using the Rooms API \[#rooms-get-instance]

Retrieve a Recording using the Rooms API

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchRoomRecording() {
  const recording = await client.video.v1
    .rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(recording.accountSid);
}

fetchRoomRecording();
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

recording = (
    client.video.v1.rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(recording.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Video.V1.Room;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var roomRecording = await RoomRecordingResource.FetchAsync(
            pathRoomSid: "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(roomRecording.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.RoomRecording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        RoomRecording roomRecording =
            RoomRecording.fetcher("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(roomRecording.getAccountSid());
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

	resp, err := client.VideoV1.FetchRoomRecording("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$recording = $twilio->video->v1
    ->rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->recordings("RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $recording->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording = @client
            .video
            .v1
            .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .recordings('RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .fetch

puts recording.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:recordings:fetch \
   --room-sid RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "processing",
  "date_created": "2015-07-30T20:00:00Z",
  "sid": "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "source_sid": "MTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "size": 0,
  "type": "audio",
  "duration": 0,
  "container_format": "mka",
  "codec": "opus",
  "track_name": "A name",
  "offset": 10,
  "grouping_sids": {
    "room_sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "media_external_location": "https://my-super-duper-bucket.s3.amazonaws.com/my/path/",
  "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "media": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/RTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media"
  }
}
```

### Example: Retrieve a Recording's Media using the Rooms API \[#rooms-get-media-subresource]

Retrieve the actual recording Media using the Rooms API

```js
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/node
const Twilio = require('twilio');

// To set up environmental variables, see http://twil.io/secure
const apiKeySid = process.env.TWILIO_API_KEY;
const apiKeySecret = process.env.TWILIO_API_KEY_SECRET;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const client = new Twilio(apiKeySid, apiKeySecret, { accountSid: accountSid });

const roomSid = 'RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const recordingSid = 'RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const uri =
  'https://video.twilio.com/v1/' +
  `Rooms/${roomSid}/` +
  `Recordings/${recordingSid}` +
  '/Media';
client.request({ method: 'GET', uri: uri }).then((response) => {
  const mediaLocation = response.data.redirect_to;
  request.get(mediaLocation, (err, res, media) => {
    console.log(media);
  });
});
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
import json
from urllib.request import urlopen

from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

room_sid = "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
recording_sid = "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
uri = "https://video.twilio.com/v1/" \
      "Rooms/{}/" \
      "Recordings/{}/" \
      "Media".format(room_sid, recording_sid)
response = client.request("GET", uri)
media_location = json.loads(response.text).get("redirect_to")

media_content = urlopen(media_location).read()
print(media_content)
```

```cs
// Download the twilio-csharp library from twilio.com/docs/libraries/csharp
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Text;
using Newtonsoft.Json;

class Example
{
    static void Main(string[] args)
    {
        // Find your Account SID and Auth Token at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        const string roomSid = "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
        const string recordingSid = "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
        const string uri = "https://video.twilio.com/v1/" +
                          $"Rooms/{roomSid}/" +
                          $"Recordings/{recordingSid}/" +
                           "Media/";

        var request = (HttpWebRequest)WebRequest.Create(uri);
        request.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(Encoding.ASCII.GetBytes(apiKeySid + ":" + apiKeySecret)));
        request.AllowAutoRedirect = false;
        string responseBody = new StreamReader(request.GetResponse().GetResponseStream()).ReadToEnd();
        var mediaLocation = JsonConvert.DeserializeObject<Dictionary<string, string>>(responseBody)["redirect_to"];

        Console.WriteLine(mediaLocation);
        new WebClient().DownloadFile(mediaLocation, $"{recordingSid}.out");
    }
}
```

```java
import com.twilio.http.HttpMethod;
import com.twilio.http.NetworkHttpClient;
import com.twilio.http.Request;
import com.twilio.http.Response;
import com.twilio.http.TwilioRestClient;
import com.twilio.rest.Domains;
import org.apache.commons.io.IOUtils;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONObject;

import java.io.IOException;


public class Example {
    // Get your Account SID and Auth Token from https://twilio.com/console
    // To set up environment variables, see http://twil.io/secure
    public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");;
    public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

    public static void main(String args[]) throws IOException {
        // Disable HttpClient follow redirect by default
        HttpClientBuilder clientBuilder = HttpClientBuilder.create();
        clientBuilder.disableRedirectHandling();

        // Initialize the client
        TwilioRestClient restClient = new TwilioRestClient
                .Builder(API_KEY_SID, API_KEY_SECRET)
                .httpClient(new NetworkHttpClient(clientBuilder))
                .build();

        // Retrieve media location
        String roomSid = "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
        String recordingSid = "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
        Request request = new Request(
            HttpMethod.GET,
            Domains.VIDEO.toString(),
            "/v1/Rooms/" + roomSid +
            "/Recordings/" + recordingSid +
            "/Media/",
            restClient.getRegion()
        );
        Response response = restClient.request(request);
        JSONObject json = new JSONObject(response.getContent());
        String mediaLocation = json.getString("redirect_to");

        // Retrieve media content
        String mediaContent = org.apache.http.client.fluent.Request
                .Get(mediaLocation)
                .execute()
                .handleResponse((r) ->
                        IOUtils.toString(r.getEntity().getContent()));

        System.out.println(mediaContent);
    }
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library
use Twilio\Rest\Client;

// Your Account Sid and Auth Token from twilio.com/console
// To set up environmental variables, see http://twil.io/secure
$apiKeySid = getenv('TWILIO_API_KEY');
$apiKeySecret = getenv('TWILIO_API_KEY_SECRET');
$client = new Client($apiKeySid, $apiKeySecret);

$roomSid = "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
$recordingSid = "RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
$uri = "https://video.twilio.com/v1/" .
       "Rooms/$roomSid/" .
       "Recordings/$recordingSid/" .
       "Media/";
$response = $client->request("GET", $uri);
$mediaLocation = $response->getContent()["redirect_to"];

$media_content = file_get_contents($mediaLocation);
print_r($media_content);
```

```rb
# Download the Ruby helper library from twilio.com/docs/libraries/ruby
require 'twilio-ruby'
require 'net/http'

# Get your Account Sid and Auth Token from https://www.twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = ENV['TWILIO_API_KEY']
api_key_secret = ENV['TWILIO_API_KEY_SECRET']

client = Twilio::REST::Client.new(api_key_sid, api_key_secret)

room_sid = 'RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
recording_sid = 'RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
uri = 'https://video.twilio.com/v1/' +
      "Rooms/#{room_sid}/" +
      "Recordings/#{recording_sid}/" +
      'Media'
response = client.request('video.twilio.com', 443, 'GET', uri)
media_location = response.body['redirect_to']

media_content = Net::HTTP.get(URI(media_location))
puts media_content
```

```bash
curl 'https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media' \
  -u 'SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_api_key_secret'
  -L
  --output video.mkv

# Output to an .mkv for video, or an .mka for audio
```

```json
{
    "redirect_to": "https://com.twilio.us1.video.recording.s3.amazonaws.com/RTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

### Size estimation of a track Recording \[#recording-size-estimation]

#### Video track Recording

The size of a video Recording (.mkv) will vary based on resolution, bit rate and duration. The following table shows files size for a single participant with video captured at common resolutions and bitrates:

| Capture Size     | 1 Hr   | 8 Hrs  | 24 Hrs  |
| ---------------- | ------ | ------ | ------- |
| 720 @ 1,500 kbps | 0.7 GB | 5.4 GB | 16.2 GB |
| 480 @ 700 kbps   | 0.3 GB | 2.5 GB | 7.6 GB  |
| 180 @ 200 kbps   | 0.1 GB | 0.7 GB | 2.2 GB  |

> \[!WARNING]
>
> The above table is for heuristic estimation and reference only. There are a lot of other factors influence the actual video file size such as compression ratio, variable bitrate, color depth.

#### Audio track Recording

The size of an audio Recording (.mka) will vary based on bit rate and duration. By default, Opus audio bitrate is uncapped and typically ranges between 20 kbps and 40 kbps. The following table shows file sizes for a single participant with audio captured at common bit rates:

| Capture Size | 1 Hr    | 8 Hrs    | 24 Hrs   |
| ------------ | ------- | -------- | -------- |
| 20 kbps      | 9 MB    | 72 MB    | 216 MB   |
| 32 kbps      | 14.4 MB | 115.2 MB | 345.6 MB |
| 40 kbps      | 18 MB   | 144 MB   | 432 MB   |

> \[!WARNING]
>
> Note that the file size reported by our REST API may vary slightly from that shown due to file allocation methods and/or possible differences in the amount of header information.

## Known limitations \[#known-issues]

* Recording files are generated with a format optimized for reliability and compactness. This format is not player friendly. Hence, many media players may not render Recordings media files appropriately. For generating player-friendly media files, compose your Recordings using [Twilio's Recordings Composition API](/docs/video/api/compositions-resource).
* Participants on the browser `Firefox Mobile` could find Recording gaps due to a Firefox bug when sending temporization. Twilio recommends Video participants to use other mobile browsers.
