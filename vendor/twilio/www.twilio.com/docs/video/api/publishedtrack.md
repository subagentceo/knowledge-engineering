# PublishedTrack

The Published Track resource is a subresource of a Participant instance resource. It represents the Tracks a Participant is currently publishing to the Room.

Using the Published Track resource, you can query tracks published to a Room. You can also get a list of Tracks associated with a given Participant.

## Published Track Instance Resource

### Resource URI

```bash
/v1/Rooms/{RoomNameOrSid}/Participants/{ParticipantIdentityOrSid}/PublishedTracks/{TrackNameOrSid}

```

### Resource Properties

```json
{"type":"object","refName":"video.v1.room.room_participant.room_participant_published_track","modelName":"video_v1_room_room_participant_room_participant_published_track","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MT[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the RoomParticipantPublishedTrack resource."},"participant_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Participant resource with the published track."},"room_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RM[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Room resource where the track is published."},"name":{"type":"string","nullable":true,"description":"The track name. Must be no more than 128 characters, and be unique among the participant's published tracks."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"enabled":{"type":"boolean","nullable":true,"description":"Whether the track is enabled."},"kind":{"type":"string","enum":["audio","video","data"],"description":"The track type. Can be: `audio`, `video` or `data`.","refName":"room_participant_published_track_enum_kind","modelName":"room_participant_published_track_enum_kind"},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."}}}
```

### HTTP GET

Returns a single Track resource represented by `TrackNameOrSid`.

#### Retrieve a Track published to the Room by a Participant by `TrackNameOrSid`

Retrieve Track Published by a Participant

```js
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/node
var apiKeySid = 'SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
var apiKeySecret = 'your_api_key_secret';
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var Twilio = require('twilio');

var client = new Twilio(apiKeySid, apiKeySecret, { accountSid: accountSid });

client.video
  .rooms('DailyStandup')
  .participants.get('Alice')
  .publishedTracks.get('Camera')
  .fetch()
  .then((publishedTrack) => {
    console.log(publishedTrack.kind);
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

publishedtrack = client.video.rooms('DailyStandup')\
        .participants.get('Alice')\
        .published_tracks.get('Camera')\
        .fetch()

print(publishedtrack.date_created)
```

```cs
using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Video.V1.Room.Participant;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        PublishedTrackResource publishedTrack = PublishedTrackResource.Fetch(
                       "DailyStandup",
                       "Alice",
                       "Camera");

        Console.WriteLine(publishedTrack.Sid);
    }
}
```

```java
import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.participant.PublishedTrack;

public class PublishedTrackExample1 {
    public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");;
    public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

    public static void main(String args[]) {
        Twilio.init(API_KEY_SID, API_KEY_SECRET);

        PublishedTrack publishedTrack = PublishedTrack.fetcher(
                "DailyStandup",
                "Alice",
                "Camera").fetch();

        System.out.println(publishedTrack.getSid());
    }
}
```

```php
<?php
// Get the PHP helper library from twilio.com/docs/php/install
require __DIR__ . '/twilio-php-main/Twilio/autoload.php';  // Loads the library
use Twilio\Rest\Client;

// Your Account Sid and Auth Token from twilio.com/console
// To set up environmental variables, see http://twil.io/secure
$apiKeySid = getenv('TWILIO_API_KEY');
$apiKeySecret = getenv('TWILIO_API_KEY_SECRET');
$client = new Client($apiKeySid, $apiKeySecret);

$publishedtrack = $client->video->rooms("DailyStandup")
    ->participants("Alice")
    ->publishedTracks("Camera")
    ->fetch();

echo $publishedtrack->kind;
```

```rb
# Download the Ruby helper library from twilio.com/docs/libraries/ruby
require 'twilio-ruby'

# Get your Account Sid and Auth Token from https://www.twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = ENV['TWILIO_API_KEY']
api_key_secret = ENV['TWILIO_API_KEY_SECRET']

client = Twilio::REST::Client.new api_key_sid, api_key_secret

publishedTrack = client.video.rooms('DailyStandup')
                     .participants('Alice')
                     .published_tracks('Camera').fetch

puts publishedTrack.date_created
```

```bash
curl -G 'https://video.twilio.com/v1/Rooms/DailyStandup/Participants/Alice/PublishedTracks/Camera' \
    -u 'SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_api_key_secret'
```

```json
{
  "kind": "video",
  "name": "Camera",
  "date_updated": null,
  "sid": "MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "enabled": true,
  "url": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants/PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/PublishedTracks/MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2017-12-13T23:46:36Z",
  "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "participant_sid": "PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

### HTTP POST

Not supported.

## Published Track List Resource

### Resource URI \[#resource-uri-2]

```bash
/v1/Rooms/{RoomNameOrSid}/Participants/{ParticipantIdentityOrSid}/PublishedTracks/

```

### HTTP GET \[#http-get-2]

Returns a list of tracks associated with a given Participant. The list includes [paging information](/docs/usage/twilios-response#pagination). Only `currently` Published Tracks are in the list resource.

*Note: No filters supported.*

#### Retrieve Tracks published to the Room by a Participant

Retrieve Tracks Published by a Participant

```js
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/node
var apiKeySid = 'SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
var apiKeySecret = 'your_api_key_secret';
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var Twilio = require('twilio');

var client = new Twilio(apiKeySid, apiKeySecret, { accountSid: accountSid });

client.video
  .rooms('DailyStandup')
  .participants.get('Alice')
  .publishedTracks.list()
  .then((publishedTracks) => {
    publishedTracks.forEach((publishedTrack) =>
      console.log(publishedTrack.sid)
    );
  });
```

```py
# Download the Python helper library from twilio.com/docs/python/install
import os
from twilio.rest import Client

# Your Account Sid and Auth Token from twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = os.environ['TWILIO_API_KEY']
api_key_secret = os.environ['TWILIO_API_KEY_SECRET']
client = Client(api_key_sid, api_key_secret)

publishedtrack = client.video.rooms('DailyStandup')\
        .participants.get('Alice')\
        .published_tracks.list()

for publishedtrack in publishedtrack:
    print(publishedtrack.sid)
```

```cs
using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Base;
using Twilio.Rest.Video.V1.Room.Participant;

class Program
{
    static void Main(string[] args)
    {
        // Find your API Key SID and Secret at twilio.com/console
        // To set up environmental variables, see http://twil.io/secure
        const string apiKeySid = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SID");
        const string apiKeySecret = Environment.GetEnvironmentVariable("TWILIO_API_KEY_SECRET");

        ResourceSet<PublishedTrackResource> publishedTracks = PublishedTrackResource.Read(
                 "DailyStandup",
                 "Alice");

        foreach(PublishedTrackResource pt in publishedTracks)
        {
           Console.WriteLine(pt.Sid);
        }
    }
}
```

```java
import com.twilio.Twilio;
import com.twilio.base.ResourceSet;
import com.twilio.rest.video.v1.room.participant.PublishedTrack;

public class PublishedTrackExample2 {
    public static final String API_KEY_SID = System.getenv("TWILIO_API_KEY_SID");;
    public static final String API_KEY_SECRET = System.getenv("TWILIO_API_KEY_SECRET");

    public static void main(String args[]) {
        Twilio.init(API_KEY_SID, API_KEY_SECRET);

        ResourceSet<PublishedTrack> publishedTracks = PublishedTrack.reader(
                "DailyStandup",
                "Alice").read();

        for (PublishedTrack publishedTrack : publishedTracks) {
            System.out.println(publishedTrack.getSid());
        }
    }
}
```

```php
<?php
// Get the PHP helper library from twilio.com/docs/php/install
require __DIR__ . '/twilio-php-main/Twilio/autoload.php';  // Loads the library
use Twilio\Rest\Client;

// Your Account Sid and Auth Token from twilio.com/console
// To set up environmental variables, see http://twil.io/secure
$apiKeySid = getenv('TWILIO_API_KEY');
$apiKeySecret = getenv('TWILIO_API_KEY_SECRET');
$client = new Client($apiKeySid, $apiKeySecret);

$publishedTracks = $client->video->rooms("DailyStandup")
			->participants("Alice")
			->publishedTracks->read();

// Loop over the list of participants and echo a property for each one
foreach ($publishedTracks as $publishedTrack) {
	echo $publishedTrack->sid;
}
```

```rb
# Download the Ruby helper library from twilio.com/docs/libraries/ruby
require 'twilio-ruby'

# Get your Account Sid and Auth Token from https://www.twilio.com/console
# To set up environmental variables, see http://twil.io/secure
api_key_sid = ENV['TWILIO_API_KEY']
api_key_secret = ENV['TWILIO_API_KEY_SECRET']

client = Twilio::REST::Client.new api_key_sid, api_key_secret

publishedTracks = client.video.rooms('DailyStandup')
                      .participants('Alice')
                      .published_tracks.list

publishedTracks.each do |publishedTrack|
  puts publishedTrack.sid
```

```bash
curl -G 'https://video.twilio.com/v1/Rooms/DailyStandup/Participants/Alice/PublishedTracks/' \
    -u 'SKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX:your_api_key_secret'
```

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://video.twilio.com/v1/Rooms/DailyStandup/Participants/ZestyYolandaZimmerman/PublishedTracks?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Rooms/DailyStandup/Participants/ZestyYolandaZimmerman/PublishedTracks?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "published_tracks"
  },
  "published_tracks": [{
    "kind": "audio",
    "name": "moderator-audio",
    "date_updated": null,
    "sid": "MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "enabled": true,
    "url": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants/PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/PublishedTracks/MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2017-12-13T23:46:36Z",
    "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "participant_sid": "PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  }, {
    "kind": "video",
    "name": "moderator-camera",
    "date_updated": null,
    "sid": "MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "enabled": true,
    "url": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants/PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/PublishedTracks/MTXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "date_created": "2017-12-13T23:46:36Z",
    "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "participant_sid": "PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  }]
}
```
