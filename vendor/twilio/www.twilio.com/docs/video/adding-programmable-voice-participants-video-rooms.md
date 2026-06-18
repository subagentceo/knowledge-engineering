# Add Programmable Voice Participants to Video Rooms

The Programmable Video Rooms API allows you to add real-time voice and video into web, mobile, and desktop applications. With the [Programmable Voice](/docs/voice) integration, you can connect PSTN (Public Switched Telephone Network) and SIP audio calls into your [Video Rooms](/docs/video/api/rooms-resource).

> \[!NOTE]
>
> Video Rooms can support up to 35 PSTN Participants.

> \[!WARNING]
>
> PSTN calls connecting to a Twilio Video Room will always be routed [through the US-1 region](/docs/video/tutorials/video-regions-and-global-low-latency#twilio-regions), no matter where the call and phone number originates.

## Working with Twilio Video Rooms in TwiML

Video Rooms are represented in TwiML through the [\<Room> noun](/docs/voice/twiml/connect/room) within the [\<Connect> verb](/docs/voice/twiml/connect).

To connect a Programmable Voice call to a Video Room, use the `<Room>` noun and pass the unique name of the Room you would like to join within the TwiML.

```xml
<?xml version="1.0" encoding="UTF‐8"?>
<Response>
  <Connect>
    <Room>DailyStandup</Room>
  </Connect>
</Response>
```

If a room with that unique name does not exist for your account, the call will move to the next TwiML instruction, or disconnect if it is the last TwiML instruction.

Connect a Programmable Voice call to a Room

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const connect = response.connect();
connect.room('DailyStandup');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Connect, VoiceResponse, Room

response = VoiceResponse()
connect = Connect()
connect.room('DailyStandup')
response.append(connect)

print(response)
```

```cs
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var connect = new Connect();
        connect.Room("DailyStandup");
        response.Append(connect);

        System.Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Connect;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Room;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Room room = new Room.Builder("DailyStandup").build();
        Connect connect = new Connect.Builder().room(room).build();
        VoiceResponse response = new VoiceResponse.Builder().connect(connect)
            .build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```php
<?php
require_once 'vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$connect = $response->connect();
$connect->room('DailyStandup');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.connect do |connect|
    connect.room('DailyStandup')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Room>DailyStandup</Room>
  </Connect>
</Response>
```

### Set the participant's identity

Video Rooms expect every Participant to have a unique identity. Every Programmable Voice Participant that joins a Video Room is considered to be a new Participant.

You can set a unique identity on the voice caller using the `participantIdentity` attribute on the `<Room>` noun. If a `participantIdentity` is not provided, Twilio will generate a random string and set it as the Participant's identity.

Connect a Programmable Voice call to a Room with a Participant identity

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const connect = response.connect();
connect.room(
  {
    participantIdentity: 'alice',
  },
  'DailyStandup'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Connect, VoiceResponse, Room

response = VoiceResponse()
connect = Connect()
connect.room('DailyStandup', participant_identity='alice')
response.append(connect)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var connect = new Connect();
        connect.Room("DailyStandup", participantIdentity: "alice");
        response.Append(connect);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Connect;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Room;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Room room = new Room.Builder("DailyStandup").participantIdentity("alice").build();
        Connect connect = new Connect.Builder().room(room).build();
        VoiceResponse response = new VoiceResponse.Builder().connect(connect).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$connect = $response->connect();
$connect->room('DailyStandup', ['participantIdentity' => 'alice']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.connect do |connect|
    connect.room('DailyStandup', participant_identity: 'alice')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Connect>
    <Room participantIdentity="alice">DailyStandup</Room>
  </Connect>
</Response>
```

> \[!WARNING]
>
> Twilio Video requires each Participant to have a unique identity. If two participants join a Programmable Video Room using the same identity, Twilio will disconnect the first participant with that identity and throw an [error](/docs/api/errors/53205).

## Connect incoming calls to a Video Room

The Programmable Voice documentation shows how to [handle incoming voice calls](/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls). When a call comes in to your Twilio number, Twilio will send a webhook request to your web server to request TwiML instructions for the incoming call. To connect the incoming call to a Video Room, your web server should respond back with a TwiML response containing a `<Room>` noun, as shown above.

## Make outgoing calls and connect them to a Video Room

The Programmable Voice documentation shows how to [make outbound phone calls](/docs/voice/tutorials/how-to-make-outbound-phone-calls). When you make an outbound call with your Twilio phone number, Twilio will send a webhook request to your web server when the called party answers the call and request TwiML instructions for handling the call. To connect the call to a Video Room, your web server should respond back with a TwiML response containing a `<Room>` noun, as shown above.

## Known Issues

* The `<Connect>` verb is designed to connect individual PSTN phone calls to a Video Room. This functionality should not be used to bridge a [Programmable Voice Conference](/docs/voice/conference) with a Video Room. This is an unsupported use case and it can fail in unexpected ways.
