# TwiML™ Voice: \<Recording>

The `<Recording>` TwiML noun is used with the `<Start>` verb to begin recording an inbound or outbound call. When Twilio executes `<Start><Recording>`, it immediately starts recording the call's audio before processing any other TwiML instructions.

After Twilio starts recording the call, it continues executing the next TwiML instruction. If there are no instructions, the call will end.

If you provided a `name` attribute when starting the recording, you can stop the recording using the `<Stop>` TwiML verb. You can also stop, pause, or resume the recording at any time by making requests to the [Recordings resource](/docs/voice/api/recording).

`<Recording>` is part of Twilio's Voice Recording product. Learn more about how to programmatically start and manage a recording using the [Recordings resource](/docs/voice/api/recording).

The following is an example of `<Start><Recording>`:

Start a Recording

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.recording({
  channels: 'dual',
  recordingStatusCallback: 'https://example.com/your-callback-url',
});
response.say('The recording has started.');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Recording, VoiceResponse, Say, Start

response = VoiceResponse()
start = Start()
start.recording(
    channels='dual',
    recording_status_callback='https://example.com/your-callback-url'
)
response.append(start)
response.say('The recording has started.')

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
        var start = new Start();
        start.Recording(channels: "dual",
            recordingStatusCallback: "https://example.com/your-callback-url");
        response.Append(start);
        response.Say("The recording has started.");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Recording;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Recording recording = new Recording.Builder().channels("dual")
            .recordingStatusCallback("https://example.com/your-callback-url")
            .build();
        Start start = new Start.Builder().recording(recording).build();
        Say say = new Say.Builder("The recording has started.").build();
        VoiceResponse response = new VoiceResponse.Builder().start(start)
            .say(say).build();

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
$start = $response->start();
$start->recording(['channels' => 'dual',
    'recordingStatusCallback' => 'https://example.com/your-callback-url']);
$response->say('The recording has started.');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.recording(channels: 'dual', recording_status_callback: 'https://example.com/your-callback-url')
end
response.say(message: 'The recording has started.')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Recording channels="dual" recordingStatusCallback = 
        "https://example.com/your-callback-url" />
    </Start>
    <Say>The recording has started.</Say>
</Response>
```

## Noun attributes \[#attributes]

The `<Recording>` TwiML noun supports the following attributes:

| Attribute name                                                                | Allowed values                       | Default value  |
| :---------------------------------------------------------------------------- | :----------------------------------- | :------------- |
| [name](#attributes-name)                                                      | A string                             | none           |
| [recordingStatusCallback](#attributes-recording-status-callback)              | A relative or absolute URL           | none           |
| [recordingStatusCallbackMethod](#attributes-recording-status-callback-method) | `GET`, `POST`                        | `POST`         |
| [recordingStatusCallbackEvent](#attributes-recording-status-callback-event)   | `in-progress`, `completed`, `absent` | `completed`    |
| [trim](#attributes-trim)                                                      | `trim-silence`, `do-not-trim`        | `trim-silence` |
| [track](#attributes-track)                                                    | `inbound`, `outbound`, `both`        | `both`         |
| [channels](#attributes-channels)                                              | `mono`, `dual`                       | `dual`         |
| [recordingConfigurationId](#attributes-recording-configuration-id)            | A string                             | None           |

### name \[#attributes-name]

Providing a `name` allows you to reference the Recording directly. This name must be unique per Call. This allows you to [stop a Recording by name](#stop-a-recording) using the `<Stop>` TwiML verb.

For example, to start a recording named `my_recording`:

```xml
<Start>
    <Recording name="my_recording" />
</Start>
```

### recordingStatusCallback \[#attributes-recording-status-callback]

The `recordingStatusCallback` attribute specifies a URL for Twilio to send webhook requests to for each event specified in the `recordingStatusCallbackEvent` attribute.

The `recordingStatusCallback` request includes the following parameters:

| Parameter            | Description                                                                                                                           |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `AccountSid`         | The SID of the account responsible for this recording.                                                                                |
| `CallSid`            | The SID of the call associated with the recording. This always refers to the parent leg of a two-leg call.                            |
| `RecordingSid`       | The SID of the recording.                                                                                                             |
| `RecordingUrl`       | The URL of the recorded audio.                                                                                                        |
| `RecordingStatus`    | The status of the recording. Possible values: `in-progress`, `completed`, `absent`.                                                   |
| `RecordingDuration`  | The length of the recording in seconds. Only provided when `RecordingStatus` is `completed`.                                          |
| `RecordingChannels`  | The number of channels in the recording file. Possible values: `1`, `2`.                                                              |
| `RecordingStartTime` | The timestamp when the recording started.                                                                                             |
| `RecordingSource`    | The method used to initiate this recording. Returns `OutboundAPI` for recordings initiated when `Record=true` is set on the REST API. |
| `RecordingTrack`     | The audio track recorded. Possible values: `inbound`, `outbound`, `both`.                                                             |

### recordingStatusCallbackMethod \[#attributes-recording-status-callback-method]

The HTTP method to use when requesting the `recordingStatusCallback` URL. Possible values: `GET`, `POST`. The default is `POST`.

### recordingStatusCallbackEvent \[#attributes-recording-status-callback-event]

The `recordingStatusCallbackEvent` specifies which recording status changes should trigger a callback to your application. To specify multiple events, separate them with a space (`in-progress completed absent`). If `recordingStatusCallback` is provided without `recordingStatusCallbackEvent`, `completed` is sent by default.

| Parameter     | Description                                                                                                                                                                                                                                                                                                                     |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `in-progress` | The recording has started.                                                                                                                                                                                                                                                                                                      |
| `completed`   | The recording is complete and available for access.                                                                                                                                                                                                                                                                             |
| `absent`      | The recording is absent and inaccessible. This can occur due to a system error, when a recording is less than one minute after trimming silence, or when the recording was silent and your account is set to automatically delete silent recordings. To change this option, contact [Twilio Support](https://help.twilio.com/). |

### trim \[#attributes-trim]

Whether to trim any leading and trailing silence from the recording. Possible values: `trim-silence`, `do-not-trim`. The default is `trim-silence`.

### track \[#attributes-track]

The audio track to record for the call. Possible values: `inbound`, `outbound`, `both`. The default is `both`.

* `inbound` records the audio that is received by Twilio.
* `outbound` records the audio that is generated from Twilio.
* `both` records the audio that is received and generated by Twilio.

### channels \[#attributes-channels]

The number of channels in the final recording. Possible values: `mono`, `dual`. The default is `dual`.

* `mono` records both legs of the call in a single channel of the recording file.
* `dual` records each leg to a separate channel of the recording file.

In a dual-channel recording, the first channel contains the parent call and the second channel contains the child call.

### recordingConfigurationId \[#attributes-recording-configuration-id]

The `recordingConfigurationId` attribute specifies the identifier of a [Recording Configuration](/docs/configurations/recording-configuration-resource) to use when creating and processing the recording.

## Stop a Recording

If you started a Recording with `<Start>` and the `name` attribute, you can use the `<Stop>` TwiML verb to stop the Recording by `name`.

The following sample TwiML instructions start the recording using `<Start>` and the `name` attribute. The `name` is `my_recording`:

```xml
<Start>
    <Recording name="my_recording" />
</Start>
```

You can later use the unique `name` of `my_recording` to stop the Recording, as shown by the following sample TwiML instructions:

```xml
<Stop>
   <Recording name="my_recording" />
</Stop>
```

You can also stop a Recording via API. Visit the [Recordings resource API reference page](/docs/voice/api/recording) for more information.
