# Rooms Resource

The Programmable Video Rooms resource represents a communications session among multiple endpoints using one of Twilio's Programmable Video SDKs. Connected users (Participants) can share video and audio Tracks with the Room, and receive video and audio Tracks from other Participants in the Room.

The Rooms resource lets you dynamically create and complete Rooms, and configure a Room's topology and behavior. Use this API to set Room properties such as its name, type, TURN configuration, webhook status callback URL, and the maximum number of Participants.

All Programmable Video REST API resources use the following base URL.

```bash
https://video.twilio.com

```

## Room Instance Resource

### Resource URI

```bash
/v1/Rooms/{RoomNameOrSid}

```

### Resource Properties

```json
{"type":"object","refName":"video.v1.room","modelName":"video_v1_room","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RM[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that Twilio created to identify the Room resource."},"status":{"type":"string","enum":["in-progress","completed","failed"],"refName":"room_enum_room_status","modelName":"room_enum_room_status"},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Room resource."},"enable_turn":{"type":"boolean","nullable":true,"description":"Deprecated, now always considered to be true."},"unique_name":{"type":"string","nullable":true,"description":"An application-defined string that uniquely identifies the resource. It can be used as a `room_sid` in place of the resource's `sid` in the URL to address the resource, assuming it does not contain any [reserved characters](https://tools.ietf.org/html/rfc3986#section-2.2) that would need to be URL encoded. This value is unique for `in-progress` rooms. SDK clients can use this name to connect to the room. REST API clients can use this name in place of the Room SID to interact with the room as long as the room is `in-progress`."},"status_callback":{"type":"string","format":"uri","nullable":true,"description":"The URL Twilio calls using the `status_callback_method` to send status information to your application on every room event. See [Status Callbacks](https://www.twilio.com/docs/video/api/status-callbacks) for more info."},"status_callback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method Twilio uses to call `status_callback`. Can be `POST` or `GET` and defaults to `POST`."},"end_time":{"type":"string","format":"date-time","nullable":true,"description":"The UTC end time of the room in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#UTC) format."},"duration":{"type":"integer","nullable":true,"description":"The duration of the room in seconds."},"type":{"type":"string","description":"Type of room. Use `group` for new implementations. `go`, `peer-to-peer`, and `group-small` are deprecated.","enum":["group","go","peer-to-peer","group-small"],"refName":"room_enum_room_type","modelName":"room_enum_room_type"},"max_participants":{"type":"integer","default":0,"description":"The maximum number of concurrent Participants allowed in the room. "},"max_participant_duration":{"type":"integer","default":0,"description":"The maximum number of seconds a Participant can be connected to the room. The maximum possible value is 86400 seconds (24 hours). The default is 14400 seconds (4 hours)."},"max_concurrent_published_tracks":{"type":"integer","nullable":true,"description":"The maximum number of published audio, video, and data tracks all participants combined are allowed to publish in the room at the same time. Check [Programmable Video Limits](https://www.twilio.com/docs/video/programmable-video-limits) for more details. If it is set to 0 it means unconstrained."},"record_participants_on_connect":{"type":"boolean","nullable":true,"description":"Whether to start recording when Participants connect."},"video_codecs":{"type":"array","nullable":true,"description":"An array of the video codecs that are supported when publishing a track in the room.  Can be: `VP8` and `H264`.","items":{"type":"string","enum":["VP8","H264"],"refName":"room_enum_video_codec","modelName":"room_enum_video_codec"}},"media_region":{"type":"string","nullable":true,"description":"The region for the Room's media server.  Can be one of the [available Media Regions](https://www.twilio.com/docs/video/ip-addresses#media-servers)."},"audio_only":{"type":"boolean","nullable":true,"description":"When set to true, indicates that the participants in the room will only publish audio. No video tracks will be allowed."},"empty_room_timeout":{"type":"integer","default":0,"description":"Specifies how long (in minutes) a room will remain active after last participant leaves. Can be configured when creating a room via REST API. For Ad-Hoc rooms this value cannot be changed."},"unused_room_timeout":{"type":"integer","default":0,"description":"Specifies how long (in minutes) a room will remain active if no one joins. Can be configured when creating a room via REST API. For Ad-Hoc rooms this value cannot be changed."},"large_room":{"type":"boolean","nullable":true,"description":"Indicates if this is a large room."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."}}}
```

### HTTP GET \[#get-instance]

Returns a single Room resource represented by `{RoomNameOrSid}`.

#### Retrieve an `in-progress` Room instance by `UniqueName` \[#get-by-unique-name]

You can retrieve an `in-progress` Room instance object using the Room's `UniqueName`, assuming the `UniqueName` does not contain any [reserved characters](https://tools.ietf.org/html/rfc3986#section-2.2) that would need to be URL encoded. This makes it easier to interact with Twilio's REST API without having to keep track of Twilio's Room SID identifiers.

For example:

```bash
GET /Rooms/DailyStandup
```

Retrieve an in-progress Room instance by UniqueName

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchRoom() {
  const room = await client.video.v1.rooms("DailyStandup").fetch();

  console.log(room.sid);
}

fetchRoom();
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

room = client.video.v1.rooms("DailyStandup").fetch()

print(room.sid)
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

        var room = await RoomResource.FetchAsync(pathSid: "DailyStandup");

        Console.WriteLine(room.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Room;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Room room = Room.fetcher("DailyStandup").fetch();

        System.out.println(room.getSid());
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

	resp, err := client.VideoV1.FetchRoom("DailyStandup")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$room = $twilio->video->v1->rooms("DailyStandup")->fetch();

print $room->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

room = @client
       .video
       .v1
       .rooms('DailyStandup')
       .fetch

puts room.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:fetch \
   --sid DailyStandup
```

```bash
curl -X GET "https://video.twilio.com/v1/Rooms/DailyStandup" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "status": "in-progress",
  "type": "peer-to-peer",
  "sid": "DailyStandup",
  "enable_turn": true,
  "unique_name": "unique_name",
  "max_participants": 10,
  "max_participant_duration": 86400,
  "max_concurrent_published_tracks": 0,
  "duration": 0,
  "status_callback_method": "POST",
  "status_callback": null,
  "record_participants_on_connect": false,
  "video_codecs": [
    "VP8"
  ],
  "audio_only": false,
  "media_region": "us1",
  "empty_room_timeout": 5,
  "unused_room_timeout": 5,
  "end_time": "2015-07-30T20:00:00Z",
  "large_room": false,
  "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "participants": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants",
    "recordings": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings",
    "transcriptions": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions",
    "recording_rules": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RecordingRules"
  }
}
```

Will return the Room instance object for the Room `DailyStandup` if the room is currently `in-progress`. If no Room exists by the name `DailyStandup`, or a Room by that name is only in `completed` status, the above request will return an HTTP 404 response.

#### Retrieve an `in-progress` or `completed` Room instance by `RoomSid` \[#get-by-room-sid]

A Room's `SID` property is Twilio's own canonical unique identifier for a Room. You can always use the Room `SID` to retrieve the Room, whether the room is `in-progress` or `completed`.

For example:

```bash
GET /Rooms/RMxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Retrieve an in-progress or completed Room instance by RoomSid

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchRoom() {
  const room = await client.video.v1
    .rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(room.sid);
}

fetchRoom();
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

room = client.video.v1.rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch()

print(room.sid)
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

        var room = await RoomResource.FetchAsync(pathSid: "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(room.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Room;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Room room = Room.fetcher("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(room.getSid());
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

	resp, err := client.VideoV1.FetchRoom("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$room = $twilio->video->v1->rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->fetch();

print $room->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

room = @client
       .video
       .v1
       .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
       .fetch

puts room.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:fetch \
   --sid RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "status": "in-progress",
  "type": "peer-to-peer",
  "sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "enable_turn": true,
  "unique_name": "unique_name",
  "max_participants": 10,
  "max_participant_duration": 86400,
  "max_concurrent_published_tracks": 0,
  "duration": 0,
  "status_callback_method": "POST",
  "status_callback": null,
  "record_participants_on_connect": false,
  "video_codecs": [
    "VP8"
  ],
  "audio_only": false,
  "media_region": "us1",
  "empty_room_timeout": 5,
  "unused_room_timeout": 5,
  "end_time": "2015-07-30T20:00:00Z",
  "large_room": false,
  "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "participants": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants",
    "recordings": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings",
    "transcriptions": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions",
    "recording_rules": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RecordingRules"
  }
}
```

Will return the Room instance object for the Room with `SID` `RMxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`, regardless of its status. If no Room exists with that SID, the above request will return an HTTP 404 response.

### HTTP POST \[#post-instance]

Modifies a Room resource.

**Supported `POST` parameters**

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Room resource to update.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateRoomRequest","required":["Status"],"properties":{"Status":{"type":"string","enum":["in-progress","completed","failed"],"refName":"room_enum_room_status","modelName":"room_enum_room_status"}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"Status\": \"completed\"\n}","meta":"","code":"{\n  \"Status\": \"completed\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"completed\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

#### Complete a Room \[#complete-room]

Update a Room's status to `completed` with the following request to end the Room. All `connected` Participants will be immediately disconnected from the Room.

Complete a Room

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateRoom() {
  const room = await client.video.v1
    .rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ status: "completed" });

  console.log(room.sid);
}

updateRoom();
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

room = client.video.v1.rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update(
    status="completed"
)

print(room.sid)
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

        var room = await RoomResource.UpdateAsync(
            status: RoomResource.RoomStatusEnum.Completed,
            pathSid: "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(room.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Room;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Room room = Room.updater("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", Room.RoomStatus.COMPLETED).update();

        System.out.println(room.getSid());
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

	params := &video.UpdateRoomParams{}
	params.SetStatus("completed")

	resp, err := client.VideoV1.UpdateRoom("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$room = $twilio->video->v1->rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->update(
    "completed" // Status
);

print $room->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

room = @client
       .video
       .v1
       .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
       .update(status: 'completed')

puts room.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:update \
   --sid RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status completed
```

```bash
curl -X POST "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Status=completed" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "status": "completed",
  "type": "peer-to-peer",
  "sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "enable_turn": true,
  "unique_name": "unique_name",
  "max_participants": 10,
  "max_participant_duration": 86400,
  "max_concurrent_published_tracks": 10,
  "status_callback_method": "POST",
  "status_callback": null,
  "record_participants_on_connect": false,
  "video_codecs": [
    "VP8"
  ],
  "media_region": "us1",
  "audio_only": false,
  "empty_room_timeout": 5,
  "unused_room_timeout": 5,
  "end_time": "2015-07-30T20:00:00Z",
  "large_room": false,
  "duration": 10,
  "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "participants": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants",
    "recordings": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings",
    "transcriptions": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions",
    "recording_rules": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RecordingRules"
  }
}
```

## Rooms List Resource

### Resource URI \[#resource-uri-2]

```bash
/v1/Rooms

```

### HTTP POST \[#post-list-resource]

Create a new Room with an HTTP `POST` to the Rooms list resource.

Once you create a Room, you will need to generate Access Tokens and use Twilio's client-side Video SDKs to connect to the Room. Learn more about the [components of a Twilio Video app](/docs/video/video-app-components).

The Quickstart guides for each client-side SDK explain how to connect to and interact with Rooms:

* [JavaScript](/docs/video/javascript-getting-started)
* [iOS](/docs/video/ios-getting-started)
* [Android](/docs/video/android-getting-started)

#### Supported POST parameters \[#post-parameters]

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateRoomRequest","properties":{"EnableTurn":{"type":"boolean","description":"Deprecated, now always considered to be true."},"Type":{"type":"string","description":"Type of room. Use `group` for new implementations. `go`, `peer-to-peer`, and `group-small` are deprecated.","enum":["group","go","peer-to-peer","group-small"],"refName":"room_enum_room_type","modelName":"room_enum_room_type"},"UniqueName":{"type":"string","description":"An application-defined string that uniquely identifies the resource. It can be used as a `room_sid` in place of the resource's `sid` in the URL to address the resource, assuming it does not contain any [reserved characters](https://tools.ietf.org/html/rfc3986#section-2.2) that would need to be URL encoded. This value is unique for `in-progress` rooms. SDK clients can use this name to connect to the room. REST API clients can use this name in place of the Room SID to interact with the room as long as the room is `in-progress`."},"StatusCallback":{"type":"string","format":"uri","description":"The URL Twilio should call using the `status_callback_method` to send status information to your application on every room event. See [Status Callbacks](https://www.twilio.com/docs/video/api/status-callbacks) for more info."},"StatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method Twilio should use to call `status_callback`. Can be `POST` or `GET`."},"MaxParticipants":{"type":"integer","description":"The maximum number of concurrent Participants allowed in the room. The maximum allowed value is 50."},"RecordParticipantsOnConnect":{"type":"boolean","description":"Whether to start recording when Participants connect."},"TranscribeParticipantsOnConnect":{"type":"boolean","description":"Whether to start transcriptions when Participants connect. If TranscriptionsConfiguration is not provided, default settings will be used."},"VideoCodecs":{"type":"array","description":"An array of the video codecs that are supported when publishing a track in the room.  Can be: `VP8` and `H264`.","items":{"type":"string","enum":["VP8","H264"],"refName":"room_enum_video_codec","modelName":"room_enum_video_codec"}},"MediaRegion":{"type":"string","description":"The region for the Room's media server.  Can be one of the [available Media Regions](https://www.twilio.com/docs/video/ip-addresses#group-rooms-media-servers)."},"RecordingRules":{"description":"A collection of Recording Rules that describe how to include or exclude matching tracks for recording"},"TranscriptionsConfiguration":{"type":"object","description":"A collection of properties that describe transcription behaviour. If TranscribeParticipantsOnConnect is set to true and TranscriptionsConfiguration is not provided, default settings will be used."},"AudioOnly":{"type":"boolean","description":"When set to true, indicates that the participants in the room will only publish audio. No video tracks will be allowed."},"MaxParticipantDuration":{"type":"integer","description":"The maximum number of seconds a Participant can be connected to the room. The maximum possible value is 86400 seconds (24 hours). The default is 14400 seconds (4 hours)."},"EmptyRoomTimeout":{"type":"integer","description":"Configures how long (in minutes) a room will remain active after last participant leaves. Valid values range from 1 to 60 minutes (no fractions)."},"UnusedRoomTimeout":{"type":"integer","description":"Configures how long (in minutes) a room will remain active if no one joins. Valid values range from 1 to 60 minutes (no fractions)."},"LargeRoom":{"type":"boolean","description":"When set to true, indicated that this is the large room."}}},"examples":{"create":{"value":{"lang":"json","value":"{}","meta":"","code":"{}","tokens":[["{}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWebrtcGo":{"value":{"lang":"json","value":"{\n  \"Type\": \"go\",\n  \"UniqueName\": \"room1\"\n}","meta":"","code":"{\n  \"Type\": \"go\",\n  \"UniqueName\": \"room1\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Type\"","#7EE787"],[":","#C9D1D9"]," ",["\"go\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"room1\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createGroupRooms":{"value":{"lang":"json","value":"{\n  \"Type\": \"group\",\n  \"UniqueName\": \"grouproom\",\n  \"RecordingRules\": \"%5B%7B%22type%22%3A%22exclude%22%2C%22all%22%3A%20true%7D%5D\"\n}","meta":"","code":"{\n  \"Type\": \"group\",\n  \"UniqueName\": \"grouproom\",\n  \"RecordingRules\": \"%5B%7B%22type%22%3A%22exclude%22%2C%22all%22%3A%20true%7D%5D\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Type\"","#7EE787"],[":","#C9D1D9"]," ",["\"group\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"grouproom\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RecordingRules\"","#7EE787"],[":","#C9D1D9"]," ",["\"%5B%7B%22type%22%3A%22exclude%22%2C%22all%22%3A%20true%7D%5D\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createGroupRoomsWithAudioOnlyEnabled":{"value":{"lang":"json","value":"{\n  \"Type\": \"group\",\n  \"UniqueName\": \"grouproom\",\n  \"RecordingRules\": \"%5B%7B%22type%22%3A%22exclude%22%2C%22all%22%3A%20true%7D%5D\",\n  \"AudioOnly\": true\n}","meta":"","code":"{\n  \"Type\": \"group\",\n  \"UniqueName\": \"grouproom\",\n  \"RecordingRules\": \"%5B%7B%22type%22%3A%22exclude%22%2C%22all%22%3A%20true%7D%5D\",\n  \"AudioOnly\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Type\"","#7EE787"],[":","#C9D1D9"]," ",["\"group\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"grouproom\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RecordingRules\"","#7EE787"],[":","#C9D1D9"]," ",["\"%5B%7B%22type%22%3A%22exclude%22%2C%22all%22%3A%20true%7D%5D\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AudioOnly\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createSmallGroupRooms":{"value":{"lang":"json","value":"{\n  \"Type\": \"group-small\",\n  \"UniqueName\": \"SmallDailyStandup\"\n}","meta":"","code":"{\n  \"Type\": \"group-small\",\n  \"UniqueName\": \"SmallDailyStandup\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Type\"","#7EE787"],[":","#C9D1D9"]," ",["\"group-small\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"SmallDailyStandup\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createLargeGroupRooms":{"value":{"lang":"json","value":"{\n  \"Type\": \"group\",\n  \"UniqueName\": \"MyWebinar\",\n  \"MaxParticipants\": 90\n}","meta":"","code":"{\n  \"Type\": \"group\",\n  \"UniqueName\": \"MyWebinar\",\n  \"MaxParticipants\": 90\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Type\"","#7EE787"],[":","#C9D1D9"]," ",["\"group\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"MyWebinar\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MaxParticipants\"","#7EE787"],[":","#C9D1D9"]," ",["90","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createLargeGroupRoomsWithAudioOnlyEnabled":{"value":{"lang":"json","value":"{\n  \"Type\": \"group\",\n  \"UniqueName\": \"MyWebinar\",\n  \"MaxParticipants\": 90,\n  \"AudioOnly\": true\n}","meta":"","code":"{\n  \"Type\": \"group\",\n  \"UniqueName\": \"MyWebinar\",\n  \"MaxParticipants\": 90,\n  \"AudioOnly\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Type\"","#7EE787"],[":","#C9D1D9"]," ",["\"group\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"MyWebinar\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MaxParticipants\"","#7EE787"],[":","#C9D1D9"]," ",["90","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"AudioOnly\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

> \[!NOTE]
>
> Rooms created via the REST API exist for five minutes to allow the first Participant to connect. If no Participants join within five minutes, the Room times out and a new Room must be created.

#### Example 1: Create a Room called "DailyStandup" \[#create-room]

Create a Room

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createRoom() {
  const room = await client.video.v1.rooms.create({
    uniqueName: "DailyStandup",
  });

  console.log(room.sid);
}

createRoom();
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

room = client.video.v1.rooms.create(unique_name="DailyStandup")

print(room.sid)
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

        var room = await RoomResource.CreateAsync(uniqueName: "DailyStandup");

        Console.WriteLine(room.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Room;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Room room = Room.creator().setUniqueName("DailyStandup").create();

        System.out.println(room.getSid());
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

	params := &video.CreateRoomParams{}
	params.SetUniqueName("DailyStandup")

	resp, err := client.VideoV1.CreateRoom(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$room = $twilio->video->v1->rooms->create(["uniqueName" => "DailyStandup"]);

print $room->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

room = @client
       .video
       .v1
       .rooms
       .create(unique_name: 'DailyStandup')

puts room.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:create \
   --unique-name DailyStandup
```

```bash
curl -X POST "https://video.twilio.com/v1/Rooms" \
--data-urlencode "UniqueName=DailyStandup" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "status": "in-progress",
  "type": "peer-to-peer",
  "sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "enable_turn": true,
  "unique_name": "DailyStandup",
  "max_concurrent_published_tracks": 0,
  "max_participants": 10,
  "max_participant_duration": 86400,
  "duration": 0,
  "status_callback_method": "POST",
  "status_callback": null,
  "record_participants_on_connect": false,
  "video_codecs": [
    "VP8"
  ],
  "media_region": "us1",
  "audio_only": false,
  "empty_room_timeout": 5,
  "unused_room_timeout": 5,
  "end_time": "2015-07-30T20:00:00Z",
  "large_room": false,
  "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "participants": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants",
    "recordings": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings",
    "transcriptions": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions",
    "recording_rules": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RecordingRules"
  }
}
```

#### Example 2: Create a Room, enable Recording, and set a Status Callback URL

Create a Room with recordings enabled

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createRoom() {
  const room = await client.video.v1.rooms.create({
    recordParticipantsOnConnect: true,
    statusCallback: "http://example.org",
    uniqueName: "DailyStandup",
  });

  console.log(room.sid);
}

createRoom();
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

room = client.video.v1.rooms.create(
    record_participants_on_connect=True,
    status_callback="http://example.org",
    unique_name="DailyStandup",
)

print(room.sid)
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

        var room = await RoomResource.CreateAsync(
            recordParticipantsOnConnect: true,
            statusCallback: new Uri("http://example.org"),
            uniqueName: "DailyStandup");

        Console.WriteLine(room.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.Room;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Room room = Room.creator()
                        .setRecordParticipantsOnConnect(true)
                        .setStatusCallback(URI.create("http://example.org"))
                        .setUniqueName("DailyStandup")
                        .create();

        System.out.println(room.getSid());
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

	params := &video.CreateRoomParams{}
	params.SetRecordParticipantsOnConnect(true)
	params.SetStatusCallback("http://example.org")
	params.SetUniqueName("DailyStandup")

	resp, err := client.VideoV1.CreateRoom(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$room = $twilio->video->v1->rooms->create([
    "recordParticipantsOnConnect" => true,
    "statusCallback" => "http://example.org",
    "uniqueName" => "DailyStandup",
]);

print $room->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

room = @client
       .video
       .v1
       .rooms
       .create(
         record_participants_on_connect: true,
         status_callback: 'http://example.org',
         unique_name: 'DailyStandup'
       )

puts room.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:create \
   --record-participants-on-connect \
   --status-callback http://example.org \
   --unique-name DailyStandup
```

```bash
curl -X POST "https://video.twilio.com/v1/Rooms" \
--data-urlencode "RecordParticipantsOnConnect=true" \
--data-urlencode "StatusCallback=http://example.org" \
--data-urlencode "UniqueName=DailyStandup" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "status": "in-progress",
  "type": "peer-to-peer",
  "sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "enable_turn": true,
  "unique_name": "DailyStandup",
  "max_concurrent_published_tracks": 0,
  "max_participants": 10,
  "max_participant_duration": 86400,
  "duration": 0,
  "status_callback_method": "POST",
  "status_callback": "http://example.org",
  "record_participants_on_connect": true,
  "video_codecs": [
    "VP8"
  ],
  "media_region": "us1",
  "audio_only": false,
  "empty_room_timeout": 5,
  "unused_room_timeout": 5,
  "end_time": "2015-07-30T20:00:00Z",
  "large_room": false,
  "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "participants": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants",
    "recordings": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings",
    "transcriptions": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions",
    "recording_rules": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RecordingRules"
  }
}
```

#### Example 3: Create a Room with a 60 minute empty room timeout

By default, a Room will end five minutes after the last participant disconnects from the Room. You can configure this to be a different value up to 60 minutes when you create the Room via the REST API. The value is specified in minutes.

The example below demonstrates configuring the Room's empty room timeout value. Note that you can also configure with the Room's unused room timeout value in the same way. The unused room timeout determines how long to wait before ending the Room if no participants join.

Create a Room with a 60 Minute Empty Room Timeout

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createRoom() {
  const room = await client.video.v1.rooms.create({
    emptyRoomTimeout: 60,
    uniqueName: "DailyStandup",
  });

  console.log(room.sid);
}

createRoom();
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

room = client.video.v1.rooms.create(
    unique_name="DailyStandup", empty_room_timeout=60
)

print(room.sid)
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

        var room = await RoomResource.CreateAsync(uniqueName: "DailyStandup", emptyRoomTimeout: 60);

        Console.WriteLine(room.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Room;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Room room = Room.creator().setUniqueName("DailyStandup").setEmptyRoomTimeout(60).create();

        System.out.println(room.getSid());
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

	params := &video.CreateRoomParams{}
	params.SetUniqueName("DailyStandup")
	params.SetEmptyRoomTimeout(60)

	resp, err := client.VideoV1.CreateRoom(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$room = $twilio->video->v1->rooms->create([
    "uniqueName" => "DailyStandup",
    "emptyRoomTimeout" => 60,
]);

print $room->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

room = @client
       .video
       .v1
       .rooms
       .create(
         unique_name: 'DailyStandup',
         empty_room_timeout: 60
       )

puts room.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:create \
   --unique-name DailyStandup \
   --empty-room-timeout 60
```

```bash
curl -X POST "https://video.twilio.com/v1/Rooms" \
--data-urlencode "UniqueName=DailyStandup" \
--data-urlencode "EmptyRoomTimeout=60" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "status": "in-progress",
  "type": "peer-to-peer",
  "sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "enable_turn": true,
  "unique_name": "DailyStandup",
  "max_concurrent_published_tracks": 0,
  "max_participants": 10,
  "max_participant_duration": 86400,
  "duration": 0,
  "status_callback_method": "POST",
  "status_callback": null,
  "record_participants_on_connect": false,
  "video_codecs": [
    "VP8"
  ],
  "media_region": "us1",
  "audio_only": false,
  "empty_room_timeout": 60,
  "unused_room_timeout": 5,
  "end_time": "2015-07-30T20:00:00Z",
  "large_room": false,
  "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "participants": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants",
    "recordings": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings",
    "transcriptions": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions",
    "recording_rules": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RecordingRules"
  }
}
```

#### Example 4: Create a Room with a maximum Participant duration \[#configure-max-participant-duration]

You can configure the maximum duration (in seconds) that a Participant can be connected to the Room. The example below sets it to 86,400 seconds (24 hours).

Configure the maximum Participant duration

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createRoom() {
  const room = await client.video.v1.rooms.create({
    maxParticipantDuration: 86400,
    uniqueName: "DailyStandup",
  });

  console.log(room.sid);
}

createRoom();
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

room = client.video.v1.rooms.create(
    unique_name="DailyStandup", max_participant_duration=86400
)

print(room.sid)
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

        var room = await RoomResource.CreateAsync(
            uniqueName: "DailyStandup", maxParticipantDuration: 86400);

        Console.WriteLine(room.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Room;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Room room = Room.creator().setUniqueName("DailyStandup").setMaxParticipantDuration(86400).create();

        System.out.println(room.getSid());
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

	params := &video.CreateRoomParams{}
	params.SetUniqueName("DailyStandup")
	params.SetMaxParticipantDuration(86400)

	resp, err := client.VideoV1.CreateRoom(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$room = $twilio->video->v1->rooms->create([
    "uniqueName" => "DailyStandup",
    "maxParticipantDuration" => 86400,
]);

print $room->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

room = @client
       .video
       .v1
       .rooms
       .create(
         unique_name: 'DailyStandup',
         max_participant_duration: 86400
       )

puts room.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:create \
   --unique-name DailyStandup \
   --max-participant-duration 86400
```

```bash
curl -X POST "https://video.twilio.com/v1/Rooms" \
--data-urlencode "UniqueName=DailyStandup" \
--data-urlencode "MaxParticipantDuration=86400" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "status": "in-progress",
  "type": "peer-to-peer",
  "sid": "RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "enable_turn": true,
  "unique_name": "DailyStandup",
  "max_concurrent_published_tracks": 0,
  "max_participants": 10,
  "max_participant_duration": 86400,
  "duration": 0,
  "status_callback_method": "POST",
  "status_callback": null,
  "record_participants_on_connect": false,
  "video_codecs": [
    "VP8"
  ],
  "media_region": "us1",
  "audio_only": false,
  "empty_room_timeout": 5,
  "unused_room_timeout": 5,
  "end_time": "2015-07-30T20:00:00Z",
  "large_room": false,
  "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "participants": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants",
    "recordings": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings",
    "transcriptions": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions",
    "recording_rules": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RecordingRules"
  }
}
```

### HTTP GET \[#get-list-resource]

Returns a list of Room resources created in the given account. The list includes [paging information](/docs/usage/twilios-response#pagination).

#### List Filters \[#get-list-filters]

The following `GET` query string parameters allow you to limit the list returned. Note, parameters are case-sensitive.

### Query parameters

```json
[{"name":"Status","in":"query","description":"Read only the rooms with this status. Can be: `in-progress` (default) or `completed`","schema":{"type":"string","enum":["in-progress","completed","failed"],"refName":"room_enum_room_status","modelName":"room_enum_room_status"},"examples":{"readWithStatus":{"value":"completed"}}},{"name":"UniqueName","in":"query","description":"Read only rooms with the this `unique_name`.","schema":{"type":"string"}},{"name":"DateCreatedAfter","in":"query","description":"Read only rooms that started on or after this date, given as `YYYY-MM-DD`.","schema":{"type":"string","format":"date-time"}},{"name":"DateCreatedBefore","in":"query","description":"Read only rooms that started before this date, given as `YYYY-MM-DD`.","schema":{"type":"string","format":"date-time"}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

#### Filter Rooms by `UniqueName` \[#filter-by-unique-name]

Retrieve a list of Rooms by UniqueName

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRoom() {
  const rooms = await client.video.v1.rooms.list({
    status: "completed",
    uniqueName: "DailyStandup",
    limit: 20,
  });

  rooms.forEach((r) => console.log(r.sid));
}

listRoom();
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

rooms = client.video.v1.rooms.list(
    status="completed", unique_name="DailyStandup", limit=20
)

for record in rooms:
    print(record.sid)
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

        var rooms = await RoomResource.ReadAsync(
            status: RoomResource.RoomStatusEnum.Completed, uniqueName: "DailyStandup", limit: 20);

        foreach (var record in rooms) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Room;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Room> rooms =
            Room.reader().setStatus(Room.RoomStatus.COMPLETED).setUniqueName("DailyStandup").limit(20).read();

        for (Room record : rooms) {
            System.out.println(record.getSid());
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

	params := &video.ListRoomParams{}
	params.SetStatus("completed")
	params.SetUniqueName("DailyStandup")
	params.SetLimit(20)

	resp, err := client.VideoV1.ListRoom(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
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

$rooms = $twilio->video->v1->rooms->read(
    [
        "status" => "completed",
        "uniqueName" => "DailyStandup",
    ],
    20
);

foreach ($rooms as $record) {
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

rooms = @client
        .video
        .v1
        .rooms
        .list(
          status: 'completed',
          unique_name: 'DailyStandup',
          limit: 20
        )

rooms.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:list \
   --status completed \
   --unique-name DailyStandup
```

```bash
curl -X GET "https://video.twilio.com/v1/Rooms?Status=completed&UniqueName=DailyStandup&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "rooms": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://video.twilio.com/v1/Rooms?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Rooms?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "rooms"
  }
}
```

Returns a list containing any `completed` Rooms with the name `DailyStandup`. Note that the `status` parameter defaults to `in-progress`. If no `status` is provided, this endpoint will return a list containing only `in-progress` rooms with the name `DailyStandup`.

#### Filter Rooms by `Status` \[#filter-by-status]

Retrieve a list of Rooms by Status

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRoom() {
  const rooms = await client.video.v1.rooms.list({
    status: "completed",
    limit: 20,
  });

  rooms.forEach((r) => console.log(r.sid));
}

listRoom();
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

rooms = client.video.v1.rooms.list(status="completed", limit=20)

for record in rooms:
    print(record.sid)
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

        var rooms =
            await RoomResource.ReadAsync(status: RoomResource.RoomStatusEnum.Completed, limit: 20);

        foreach (var record in rooms) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Room;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Room> rooms = Room.reader().setStatus(Room.RoomStatus.COMPLETED).limit(20).read();

        for (Room record : rooms) {
            System.out.println(record.getSid());
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

	params := &video.ListRoomParams{}
	params.SetStatus("completed")
	params.SetLimit(20)

	resp, err := client.VideoV1.ListRoom(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
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

$rooms = $twilio->video->v1->rooms->read(["status" => "completed"], 20);

foreach ($rooms as $record) {
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

rooms = @client
        .video
        .v1
        .rooms
        .list(
          status: 'completed',
          limit: 20
        )

rooms.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:list \
   --status completed
```

```bash
curl -X GET "https://video.twilio.com/v1/Rooms?Status=completed&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "rooms": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://video.twilio.com/v1/Rooms?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Rooms?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "rooms"
  }
}
```

#### Using multiple list filters \[#multiple-list-filters]

Retrieve a list of completed Rooms

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRoom() {
  const rooms = await client.video.v1.rooms.list({
    status: "completed",
    uniqueName: "DailyStandup",
    limit: 20,
  });

  rooms.forEach((r) => console.log(r.sid));
}

listRoom();
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

rooms = client.video.v1.rooms.list(
    status="completed", unique_name="DailyStandup", limit=20
)

for record in rooms:
    print(record.sid)
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

        var rooms = await RoomResource.ReadAsync(
            status: RoomResource.RoomStatusEnum.Completed, uniqueName: "DailyStandup", limit: 20);

        foreach (var record in rooms) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.Room;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Room> rooms =
            Room.reader().setStatus(Room.RoomStatus.COMPLETED).setUniqueName("DailyStandup").limit(20).read();

        for (Room record : rooms) {
            System.out.println(record.getSid());
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

	params := &video.ListRoomParams{}
	params.SetStatus("completed")
	params.SetUniqueName("DailyStandup")
	params.SetLimit(20)

	resp, err := client.VideoV1.ListRoom(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
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

$rooms = $twilio->video->v1->rooms->read(
    [
        "status" => "completed",
        "uniqueName" => "DailyStandup",
    ],
    20
);

foreach ($rooms as $record) {
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

rooms = @client
        .video
        .v1
        .rooms
        .list(
          status: 'completed',
          unique_name: 'DailyStandup',
          limit: 20
        )

rooms.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:list \
   --status completed \
   --unique-name DailyStandup
```

```bash
curl -X GET "https://video.twilio.com/v1/Rooms?Status=completed&UniqueName=DailyStandup&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "rooms": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://video.twilio.com/v1/Rooms?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Rooms?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "rooms"
  }
}
```
