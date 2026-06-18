# Recording Rules

There are two ways a Participant's video and audio tracks can be recorded in the cloud:

* Set the record\_participants\_on\_connect flag when creating the Room. When this flag is set, recording of the participant's video and audio tracks starts when the participant connects to the Room. With this approach all participants' video and audio tracks are recorded by default.
* Use Recording Rules. The Recording Rules can be provided when the Room is created via the REST API or the rules can be set at any time during the lifetime of the Room via the Recording Rules resource.

The Recording Rules can be used to specify which participants and tracks should be recorded or not and they provide a fine grained approach for creating Recordings. For example, rules can be defined to simply start or stop recording or they can be defined so that only one participant in a Room is recorded. In addition, rules can specify if just the audio tracks should be recorded or both audio and video ones.

## The RecordingRules Resource \[#rr-resource]

The RecordingRules resource is a subresource of a Room instance resource. It represents the state of the recording rules for the specified Room.

### Resource URI \[#rr-uri]

For the sake of simplicity, we define the RecordingRules Resource URI as:

```bash
RECORDING_RULES_URI = https://video.twilio.com/v1/Rooms/{RoomNameOrSid}/RecordingRules
```

One list of rules can be specified using the Recording Rules URI per Room. It can be updated anytime during the life of the Room to include/exclude video/audio Tracks.

```json
{"type":"object","refName":"video.v1.room.room_recording_rule","modelName":"video_v1_room_room_recording_rule","properties":{"room_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RM[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Room resource for the Recording Rules"},"rules":{"type":"array","nullable":true,"description":"A collection of Recording Rules that describe how to include or exclude matching tracks for recording","items":{"type":"object","format":"recording-rule","x-class-extra-annotation":"@JsonInclude(JsonInclude.Include.NON_NULL)","properties":{"type":{"type":"string"},"all":{"type":"boolean"},"publisher":{"type":"string"},"track":{"type":"string"},"kind":{"type":"string"}}}},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."}}}
```

### Get a Room's Recording Rules (HTTP GET) \[#rr-get]

Returns the current state of the recording rules of the specified Room.

### Modify a Room's Recording Rules (HTTP POST) \[#rr-post]

Updates the recording rules of the specified Room. The following
parameters are supported:

### Path parameters

```json
[{"name":"RoomSid","in":"path","description":"The SID of the Room resource where the recording rules to update apply.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateRoomRecordingRuleRequest","properties":{"Rules":{"description":"A JSON-encoded array of recording rules."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"Rules\": \"%5B%7B%22type%22%3A%22exclude%22%2C%22all%22%3A%20true%7D%5D\"\n}","meta":"","code":"{\n  \"Rules\": \"%5B%7B%22type%22%3A%22exclude%22%2C%22all%22%3A%20true%7D%5D\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Rules\"","#7EE787"],[":","#C9D1D9"]," ",["\"%5B%7B%22type%22%3A%22exclude%22%2C%22all%22%3A%20true%7D%5D\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

For a deeper understanding on how recording rules work, see the
[Understanding Recording Rules](#understanding-rr) section below.

### Other HTTP Methods

This resource does not support `PUT` or `DELETE`.

## Understanding Recording Rules \[#understanding-rr]

Recording rules can be set at any time during the life of the Room. If the record\_participants\_on\_connect flag is set to true during the Room creation then a default rule to record all video and audio tracks will be automatically set.

### Specifying Recording Rules \[#specifying-rr]

A recording rule instance has the following JSON structure:

```bash
{"type": rule_type, filter_name: filter_value, filter_name: filter_value, ...}
```

Where:

| Field                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `rule_type`                        | An identifier specifying the type of rule. It must be one of the following:-`include`: includes the tracks that match the filters into the Recordings.-`exclude`: excludes the tracks that match the filters from the Recordings.                                                                                                                                                                                                                                                                                                                                                                |
| `filter_name` and   `filter_value` | The `filter_name` must be one of the following:-`all`: the filter affects all tracks. Accepts only one value: `true` (matches all tracks)-`kind`: matches tracks of a given type. Accepts `video` and `audio` as values.-`publisher`: matches all tracks published by the Participant with the identity (case sensitive) or SID specified as value-`track`: matches tracks with the name (case sensitive) or SID specified as value. A rule containing multiple filters matches the set of tracks that comply with all of them. In other words, filters combine in a rule through a logical AND. |

Based on this, recording rules are specified as a JSON array containing up
to 20 rules. For example:

```bash
Rules = [
  {"type": "include", "all": true},                              //rule_1
  {"type": "exclude", "kind": "video"},                          //rule_2
  {"type": "include", "publisher": "Bob", "track": "screen"},    //rule_3
  {"type": "include", "track": "MTXXXXXXXXXXXXXXXXXXXXXXXXXXX"}, //rule_4
  ...
  rule_20
]
```

Remember that valid recording rules comply with the following:

* The maximum number of rules that can be specified is 20.
* An empty set of rules (i.e. `[]`) is not allowed.
* A rule containing the `"all"` filter must have a value of `true`. Notice that
  this means `false` is not allowed.
* A rule having an `"all"` filter cannot have any other filters.
* A rule must contain a `"type"` field.
* If the `"kind"` filter is used, its value must be either `audio` or `video`.
* A rule cannot contain duplicated filters (e.g. specify two different `kind`s or `publisher`s)

When invalid rules are specified, the current active rules will not be updated
and the `POST` will be answered with an HTTP `400` error response like the following:

```bash
{
  "code": 53120,
  "message": "Invalid Recording Rule(s)",
  "more_info": "https://www.twilio.com/docs/errors/53120",
  "status": 400
}
```

For example, the following requests are invalid:

```bash
//Invalid because it's using an empty set
Rules = []
```

```bash
//Invalid because it uses false as value of "all"
Rules = [
  {"type":"include", "all": false}
]
```

```bash
//Invalid because it specifies a non supported kind
Rules = [
  {"type": "include", "all": true},
  {"type": "exclude", "kind": "video"}
]
```

```bash
//Invalid because it repeats the "kind" filter twice
Rules = [
  {"type": "include", "kind": "audio", "kind": "video"},
]
```

```bash
//Invalid because an "all" filter is not compatible with any other filter
Rules = [
  {"type": "include", "all": "true", "kind": "audio"},
]
```

### Recording Rules Semantics \[#rr-semantics]

`RecordingRules` are enforced by Twilio using three main principles:

1. Recording Rules semantics are based on [Algebra of Sets](https://en.wikipedia.org/wiki/Algebra_of_sets).
2. Recording Rules are stateless.
3. Recording Rules are enforced declaratively.

#### 1. Recording Rules Semantics are based on Algebra of Sets \[#sr-algebra]

We define the Set of Recording Tracks (SetRT) as the set of tracks a given
Room should be recording at any time. The SetRT is computed by Twilio
using Algebra of Sets based on the following algorithm:

* The SetRT is initialized to the empty set unless the record\_participants\_on\_connect flag is set on Room creation.
* The subscribe rules are applied to the SetRT using Algebra of Sets in the
  order provided such that:
  * For any `include` rule we perform the union of the SetRT with the set of
    tracks matching the rule filters.
  * For any `exclude` rule we perform the set difference of the SetRT with
    the set of tracks matching by the rule filters.
* All the tracks remaining in SetRT after all the rules have been evaluated are the ones recorded.

If the record\_participants\_on\_connect is set on Room creation then the SetRT is initialized to:

```bash
{"type": "include", "all": true}
```

Let's illustrate this using an example. Imagine a Room
with three participants named: Alice, Bob and Carl, who publish the tracks
specified in the following table:

|                      | Alice (PTA)           | Bob (PTB)           | Carl (PTC)           |
| -------------------- | --------------------- | ------------------- | -------------------- |
| Audio Track          | `MTA_A` `alice-audio` | `MTB_A` `bob-audio` | `MTC_A` `carl-audio` |
| Video Track (cam)    | `MTA_C` `alice-cam`   | `MTB_C` `bob-cam`   | `MTC_C` `carl-cam`   |
| Video Track (screen) | `MTA_S` `screen`      | `MTB_S` `screen`    |                      |

Notice that, for the sake of simplicity, we have assumed the following conventions:

* Track SIDs have the prefix `MT` followed by the participant initial and by a
  letter identifying the track nature (`_A` for audio, `_C` for webcam, and `_S` for screenshare).
* Track names are specified under their corresponding SIDs.

##### Example: Start Recording all Participants

To record the audio and video tracks of all participants in a Room, `POST` the following to the Room's RecordingRules resource:

```bash
Rules = [
  {"type": "include", "all": true}
]
```

Recording will start for all Participants connected to the Room. Any new Participants who join will also be recorded.

##### Example: Stop Recording all Participants

To stop the recording of all video and audio tracks of all participants in a Room, `POST` the following to the Room's RecordingRules resource:

```bash
Rules = [
  {"type": "exclude", "all": true}
]
```

This will stop the Recordings for all tracks. Note that Recordings can be started again some time later by reposting with the "include", "all" rule. New Recording SIDs will be created each time a track Recording is started.

##### Example: Only Record the audio tracks of all Participants

To restrict the recording to just the audio tracks of all participants in a Room, `POST` the following to the Room's RecordingRules resource:

```bash
Rules = [
  {"type": "include", "kind": "audio"}
]
```

Video tracks of participants will not be recorded.

##### Example: Record the video and audio of the one Participant and the audio tracks of all other Participants

In this scenario we want to record the video and audio of Alice while also recording the audio tracks of the other participants.
To achieve this, `POST` the following to the Room's RecordingRules resource:

```bash
Rules = [
    {"type": "include", "publisher": "Alice"},
    {"type": "include", "kind": "audio"}
]
```

The video and audio tracks of Alice will be recorded and there will be an audio track Recording for any other Participant who joins the Room.

#### 2. Recording Rules are stateless \[#rr-stateless]

The Recording Rules API is stateless. This means that it has no memory of
rules. Every time a developer `POST`s a set of new recording
rules, the previous rules are fully erased and replaced with new rules, which
are then enforced using the algorithm described in the section above.

#### 3. Recording Rules are enforced declaratively \[#rr-declarative]

When developers `POST` recording rules to Twilio, those rules are enforced in
a dynamic way. That means that the algorithm does not only execute at `POST` time,
but it is executed every time there is change in the Room's available tracks.
Hence, once the rules have been `POST`ed, Twilio guarantees that they are enforced
at any time without requiring further developer intervention.

## Examples \[#rr-examples]

Update Room Recording Rules to Start Recording All Participants

```js
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.video
  .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .recordingRules.update({ rules: [{ type: 'include', all: true }] })
  .then((recording_rules) => console.log(recording_rules.roomSid));
```

```py
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

recording_rules = client.video \
                        .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') \
                        .recording_rules \
                        .update(rules=[{"type": "include", "all": true}])

print(recording_rules.room_sid)
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Video.V1.Room;
using Twilio.Types;

class Program
{
    static void Main(string[] args)
    {
        // Find your Account Sid and Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);
        var recordingRules = RecordingRulesResource.Update(
            rules: new List<RecordingRule>(){
                new RecordingRule(Twilio.Types.RecordingRule.TypeEnum.Include, true, null, null, null)
            },
            pathRoomSid: "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        );

        Console.WriteLine(recordingRules.RoomSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.RecordingRules;
import com.twilio.type.RecordingRule;
import com.twilio.type.RecordingRulesUpdate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class UpdateRules{
  // Find your Account Sid and Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

      ArrayList<RecordingRule> rules = new ArrayList<>();
      rules.add(RecordingRule.builder()
              .withType(RecordingRule.Type.INCLUDE).withAll()
              .build());
	
      RecordingRules recordingRules =
          RecordingRules.updater("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
          .setRules(new ObjectMapper().convertValue(new RecordingRulesUpdate(rules), Map.class))
          .update();

	  System.out.println(recordingRules.getRoomSid());
  }
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once '/path/to/vendor/autoload.php';

use Twilio\Rest\Client;

// Find your Account Sid and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$recording_rules = $twilio->video->v1->rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                     ->recordingRules
                                     ->update(["rules" => [["type" => "include", "all" => true]]]);

print($recording_rules->roomSid);
```

```rb
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'rubygems'
require 'twilio-ruby'

# Your Account Sid and Auth Token from twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording_rules = @client.video
                         .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                         .recording_rules
                         .update(rules: [{"type": :"include", "all": true}])

puts recording_rules.room_sid
```

```bash
curl -X POST https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/RecordingRules \
--data-urlencode Rules='[{"type": "include", "all": true}]' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "rules": [
    {
      "type": "include",
      "all": true
    }
  ]
}
```

Update Room Recording Rules to Only Record Audio Tracks of All Participants

```js
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.video
  .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .recordingRules.update({ rules: [{ type: 'include', kind: 'audio' }] })
  .then((recording_rules) => console.log(recording_rules.roomSid));
```

```py
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

recording_rules = client.video \
                        .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') \
                        .recording_rules \
                        .update(rules=[{"type": "include", "kind": "audio"}])

print(recording_rules.room_sid)
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Video.V1.Room;
using Twilio.Types;

class Program
{
    static void Main(string[] args)
    {
        // Find your Account Sid and Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);
        var recordingRules = RecordingRulesResource.Update(
            rules: new List<RecordingRule>(){
                new RecordingRule(Twilio.Types.RecordingRule.TypeEnum.Include, null, null, null, Twilio.Types.RecordingRule.KindEnum.Audio)
            },
            pathRoomSid: "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        );

        Console.WriteLine(recordingRules.RoomSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.RecordingRules;
import com.twilio.type.RecordingRule;
import com.twilio.type.RecordingRulesUpdate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class UpdateRules{
  // Find your Account Sid and Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
      
      ArrayList<RecordingRule> rules = new ArrayList<>();
      rules.add(RecordingRule.builder()
			.withType(RecordingRule.Type.INCLUDE).withKind(Rule.Kind.AUDIO)
			.build());

      RecordingRules recordingRules =
          RecordingRules.updater("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
          .setRules(new ObjectMapper().convertValue(new RecordingRulesUpdate(rules), Map.class))
          .update();

	  System.out.println(recordingRules.getRoomSid());
  }
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once '/path/to/vendor/autoload.php';

use Twilio\Rest\Client;

// Find your Account Sid and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$recording_rules = $twilio->video->v1->rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                     ->recordingRules
                                     ->update(["rules" => [["type" => "include", "kind" => "audio"]]]);

print($recording_rules->roomSid);
```

```rb
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'rubygems'
require 'twilio-ruby'

# Your Account Sid and Auth Token from twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording_rules = @client.video
                         .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                         .recording_rules
                         .update(rules: [{"type": :"include", "kind": "audio"}])

puts recording_rules.room_sid
```

```bash
curl -X POST https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/RecordingRules \
--data-urlencode Rules='[{"type": "include", "kind": "audio"}]' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "rules": [
    {
      "type": "include",
      "kind": "audio"
    }
  ]
}
```

Update Room Recording Rules to Stop Recording All Participants

```js
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.video
  .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .recordingRules.update({ rules: [{ type: 'exclude', all: true }] })
  .then((recording_rules) => console.log(recording_rules.roomSid));
```

```py
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client


# Your Account Sid and Auth Token from twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

recording_rules = client.video \
                        .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX') \
                        .recording_rules \
                        .update(rules=[{"type": "exclude", "all": true}])

print(recording_rules.room_sid)
```

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using System.Collections.Generic;
using Twilio;
using Twilio.Rest.Video.V1.Room;
using Twilio.Types;

class Program
{
    static void Main(string[] args)
    {
        // Find your Account Sid and Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);
        var recordingRules = RecordingRulesResource.Update(
            rules: new List<RecordingRule>(){
                new RecordingRule(Twilio.Types.RecordingRule.TypeEnum.Exclude, true, null, null, null)
            },
            pathRoomSid: "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        );

        Console.WriteLine(recordingRules.RoomSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.fasterxml.jackson.databind.ObjectMapper;
import com.twilio.Twilio;
import com.twilio.rest.video.v1.room.RecordingRules;
import com.twilio.type.RecordingRule;
import com.twilio.type.RecordingRulesUpdate;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

public class UpdateRules{
  // Find your Account Sid and Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
  public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

  public static void main( String[] args ) throws IOException{
      // Initialize the client
      Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

      ArrayList<RecordingRule> rules = new ArrayList<>();
      rules.add(RecordingRule.builder()
              .withType(RecordingRule.Type.EXCLUDE).withAll()
              .build());
	
      RecordingRules recordingRules =
          RecordingRules.updater("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
          .setRules(new ObjectMapper().convertValue(new RecordingRulesUpdate(rules), Map.class))
          .update();

	  System.out.println(recordingRules.getRoomSid());
  }
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once '/path/to/vendor/autoload.php';

use Twilio\Rest\Client;

// Find your Account Sid and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$recording_rules = $twilio->video->v1->rooms("RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                     ->recordingRules
                                     ->update(["rules" => [["type" => "exclude", "all" => true]]]);

print($recording_rules->roomSid);
```

```rb
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'rubygems'
require 'twilio-ruby'

# Your Account Sid and Auth Token from twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording_rules = @client.video
                         .rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                         .recording_rules
                         .update(rules: [{"type": :"exclude", "all": true}])

puts recording_rules.room_sid
```

```bash
curl -X POST https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/RecordingRules \
--data-urlencode Rules='[{"type": "exclude", "all": true}]' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "rules": [
    {
      "type": "exclude",
      "all": true
    }
  ]
}
```
