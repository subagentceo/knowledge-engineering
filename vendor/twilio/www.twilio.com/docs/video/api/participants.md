# Participants

The Participants resource is a subresource of a Rooms instance resource. It represents participants currently connected to a given Room. A Participant instance resource represents an individual Room participant.

The Participant Instance resource lets you kick Participants out of a Room they are connected to. You can query the Participants List resource to get a list of participants currently `connected` to the Room. You can also get a list of Participants that are `disconnected` from the Room.

## Participant Instance Resource

This resource represents a single Room participant, identified by the ParticipantSid or a ParticipantIdentity.

### Resource URI

```bash
/v1/Rooms/{RoomNameOrSid}/Participants/{ParticipantIdentityOrSid}/

```

### Resource Properties

```json
{"type":"object","refName":"video.v1.room.room_participant","modelName":"video_v1_room_room_participant","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PA[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the RoomParticipant resource."},"room_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RM[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the participant's room."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the RoomParticipant resource."},"status":{"type":"string","enum":["connected","disconnected","reconnecting"],"description":"The status of the Participant. Can be: `connected` or `disconnected`.","refName":"room_participant_enum_status","modelName":"room_participant_enum_status"},"identity":{"type":"string","nullable":true,"description":"The application-defined string that uniquely identifies the resource's User within a Room. If a client joins with an existing Identity, the existing client is disconnected. See [access tokens](https://www.twilio.com/docs/video/tutorials/user-identity-access-tokens) and [limits](https://www.twilio.com/docs/video/programmable-video-limits) for more info. "},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"start_time":{"type":"string","format":"date-time","nullable":true,"description":"The time of participant connected to the room in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#UTC) format."},"end_time":{"type":"string","format":"date-time","nullable":true,"description":"The time when the participant disconnected from the room in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#UTC) format."},"duration":{"type":"integer","nullable":true,"description":"The duration in seconds that the participant was `connected`. Populated only after the participant is `disconnected`."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."}}}
```

### HTTP GET

Returns a single Participant resource represented by `{ParticipantNameOrSid}`.

#### Naming behavior

`GET /Participants/{ParticipantIdentity}` implicitly searches only `connected` Participants for the given `ParticipantIdentity` and returns either an instance or a 404.

#### Retrieve a `connected` Participant from a Room by `Identity`

Will return the Participant instance object for the Participant `Alice` whose Status is `connected`, from the `in-progress` Room named `DailyStandup`.

Retrieve a Participant

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchRoomParticipant() {
  const participant = await client.video.v1
    .rooms("DailyStandup")
    .participants("Alice")
    .fetch();

  console.log(participant.sid);
}

fetchRoomParticipant();
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

participant = (
    client.video.v1.rooms("DailyStandup").participants("Alice").fetch()
)

print(participant.sid)
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

        var participant =
            await ParticipantResource.FetchAsync(pathRoomSid: "DailyStandup", pathSid: "Alice");

        Console.WriteLine(participant.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant = Participant.fetcher("DailyStandup", "Alice").fetch();

        System.out.println(participant.getSid());
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

	resp, err := client.VideoV1.FetchRoomParticipant("DailyStandup",
		"Alice")
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

$participant = $twilio->video->v1
    ->rooms("DailyStandup")
    ->participants("Alice")
    ->fetch();

print $participant->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participant = @client
              .video
              .v1
              .rooms('DailyStandup')
              .participants('Alice')
              .fetch

puts participant.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:participants:fetch \
   --room-sid DailyStandup \
   --sid Alice
```

```bash
curl -X GET "https://video.twilio.com/v1/Rooms/DailyStandup/Participants/Alice" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "DailyStandup",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "start_time": "2015-07-30T20:00:00Z",
  "end_time": null,
  "sid": "Alice",
  "identity": "bob",
  "status": "connected",
  "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "duration": null,
  "links": {
    "published_tracks": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PublishedTracks",
    "subscribed_tracks": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SubscribedTracks",
    "subscribe_rules": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SubscribeRules",
    "anonymize": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Anonymize"
  }
}
```

### HTTP POST

Modifies a Participant resource.

### Path parameters

```json
[{"name":"RoomSid","in":"path","description":"The SID of the room with the participant to update.","schema":{"type":"string"},"required":true},{"name":"Sid","in":"path","description":"The SID of the RoomParticipant resource to update.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateRoomParticipantRequest","properties":{"Status":{"type":"string","enum":["connected","disconnected","reconnecting"],"description":"The status of the Participant. Can be: `connected` or `disconnected`.","refName":"room_participant_enum_status","modelName":"room_participant_enum_status"}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"Status\": \"disconnected\"\n}","meta":"","code":"{\n  \"Status\": \"disconnected\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"disconnected\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

#### Kick/Remove Participant from a Room

Update a Participant's status to `disconnected` to remove the Participant from a Room.

Remove a Participant

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateRoomParticipant() {
  const participant = await client.video.v1
    .rooms("DailyStandup")
    .participants("Alice")
    .update({ status: "disconnected" });

  console.log(participant.sid);
}

updateRoomParticipant();
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

room_participant = (
    client.video.v1.rooms("DailyStandup")
    .participants("Alice")
    .update(status="disconnected")
)

print(room_participant.sid)
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

        var participant = await ParticipantResource.UpdateAsync(
            status: ParticipantResource.StatusEnum.Disconnected,
            pathRoomSid: "DailyStandup",
            pathSid: "Alice");

        Console.WriteLine(participant.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant =
            Participant.updater("DailyStandup", "Alice").setStatus(Participant.Status.DISCONNECTED).update();

        System.out.println(participant.getSid());
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

	params := &video.UpdateRoomParticipantParams{}
	params.SetStatus("disconnected")

	resp, err := client.VideoV1.UpdateRoomParticipant("DailyStandup",
		"Alice",
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

$room_participant = $twilio->video->v1
    ->rooms("DailyStandup")
    ->participants("Alice")
    ->update(["status" => "disconnected"]);

print $room_participant->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participant = @client
              .video
              .v1
              .rooms('DailyStandup')
              .participants('Alice')
              .update(status: 'disconnected')

puts participant.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:participants:update \
   --room-sid DailyStandup \
   --sid Alice \
   --status disconnected
```

```bash
curl -X POST "https://video.twilio.com/v1/Rooms/DailyStandup/Participants/Alice" \
--data-urlencode "Status=disconnected" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "room_sid": "DailyStandup",
  "date_created": "2017-07-30T20:00:00Z",
  "date_updated": "2017-07-30T20:00:00Z",
  "start_time": "2017-07-30T20:00:00Z",
  "end_time": "2017-07-30T20:00:01Z",
  "sid": "Alice",
  "identity": "alice",
  "status": "disconnected",
  "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "duration": 1,
  "links": {
    "published_tracks": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PublishedTracks",
    "subscribed_tracks": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SubscribedTracks",
    "subscribe_rules": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SubscribeRules",
    "anonymize": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Anonymize"
  }
}
```

## Participant List Resource

### Resource URI \[#resource-uri-2]

```bash
/v1/Rooms/{RoomNameOrSid}/Participants/

```

### HTTP GET \[#http-get-2]

Returns a list of Participant resources associated with this Room. The list includes [paging information](/docs/usage/twilios-response#pagination). You can filter the results by providing query string parameters.

#### List Filters

The following `GET` query string parameters allow you to limit the list returned. Note, parameters are case-sensitive.

### Path parameters

```json
[{"name":"RoomSid","in":"path","description":"The SID of the room with the Participant resources to read.","schema":{"type":"string"},"required":true}]
```

### Query parameters

```json
[{"name":"Status","in":"query","description":"Read only the participants with this status. Can be: `connected` or `disconnected`. For `in-progress` Rooms the default Status is `connected`, for `completed` Rooms only `disconnected` Participants are returned.","schema":{"type":"string","enum":["connected","disconnected","reconnecting"],"description":"The status of the Participant. Can be: `connected` or `disconnected`.","refName":"room_participant_enum_status","modelName":"room_participant_enum_status"},"examples":{"readFilters":{"value":"disconnected"}}},{"name":"Identity","in":"query","description":"Read only the Participants with this [User](https://www.twilio.com/docs/chat/rest/user-resource) `identity` value.","schema":{"type":"string"},"examples":{"readFilters":{"value":"alice"}}},{"name":"DateCreatedAfter","in":"query","description":"Read only Participants that started after this date in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#UTC) format.","schema":{"type":"string","format":"date-time"},"examples":{"readFilters":{"value":"2017-01-01T00:00:01Z"}}},{"name":"DateCreatedBefore","in":"query","description":"Read only Participants that started before this date in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601#UTC) format.","schema":{"type":"string","format":"date-time"},"examples":{"readFilters":{"value":"2017-12-31T23:59:59Z"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

#### Retrieve `connected` participants from an `in-progress` Room instance

Retrieve a list of connected Participants

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRoomParticipant() {
  const participants = await client.video.v1
    .rooms("DailyStandup")
    .participants.list({
      status: "connected",
      limit: 20,
    });

  participants.forEach((p) => console.log(p.sid));
}

listRoomParticipant();
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

participants = client.video.v1.rooms("DailyStandup").participants.list(
    status="connected", limit=20
)

for record in participants:
    print(record.sid)
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

        var participants = await ParticipantResource.ReadAsync(
            pathRoomSid: "DailyStandup",
            status: ParticipantResource.StatusEnum.Connected,
            limit: 20);

        foreach (var record in participants) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.Participant;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Participant> participants =
            Participant.reader("DailyStandup").setStatus(Participant.Status.CONNECTED).limit(20).read();

        for (Participant record : participants) {
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

	params := &video.ListRoomParticipantParams{}
	params.SetStatus("connected")
	params.SetLimit(20)

	resp, err := client.VideoV1.ListRoomParticipant("DailyStandup",
		params)
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

$participants = $twilio->video->v1
    ->rooms("DailyStandup")
    ->participants->read(["status" => "connected"], 20);

foreach ($participants as $record) {
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

participants = @client
               .video
               .v1
               .rooms('DailyStandup')
               .participants
               .list(
                 status: 'connected',
                 limit: 20
               )

participants.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:participants:list \
   --room-sid DailyStandup \
   --status connected
```

```bash
curl -X GET "https://video.twilio.com/v1/Rooms/DailyStandup/Participants?Status=connected&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "participants": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "participants"
  }
}
```

#### Retrieve `disconnected` Participants from a Room instance

Retrieve a list of disconnected Participants

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRoomParticipant() {
  const participants = await client.video.v1
    .rooms("DailyStandup")
    .participants.list({
      status: "disconnected",
      limit: 20,
    });

  participants.forEach((p) => console.log(p.sid));
}

listRoomParticipant();
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

participants = client.video.v1.rooms("DailyStandup").participants.list(
    status="disconnected", limit=20
)

for record in participants:
    print(record.sid)
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

        var participants = await ParticipantResource.ReadAsync(
            pathRoomSid: "DailyStandup",
            status: ParticipantResource.StatusEnum.Disconnected,
            limit: 20);

        foreach (var record in participants) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.Participant;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Participant> participants =
            Participant.reader("DailyStandup").setStatus(Participant.Status.DISCONNECTED).limit(20).read();

        for (Participant record : participants) {
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

	params := &video.ListRoomParticipantParams{}
	params.SetStatus("disconnected")
	params.SetLimit(20)

	resp, err := client.VideoV1.ListRoomParticipant("DailyStandup",
		params)
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

$participants = $twilio->video->v1
    ->rooms("DailyStandup")
    ->participants->read(["status" => "disconnected"], 20);

foreach ($participants as $record) {
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

participants = @client
               .video
               .v1
               .rooms('DailyStandup')
               .participants
               .list(
                 status: 'disconnected',
                 limit: 20
               )

participants.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:video:v1:rooms:participants:list \
   --room-sid DailyStandup \
   --status disconnected
```

```bash
curl -X GET "https://video.twilio.com/v1/Rooms/DailyStandup/Participants?Status=disconnected&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "participants": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "participants"
  }
}
```
