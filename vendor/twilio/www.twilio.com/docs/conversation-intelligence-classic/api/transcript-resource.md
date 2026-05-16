# Conversation Intelligence (classic) - Transcript Resource

A Conversation Intelligence (classic) Transcript resource represents a transcribed voice conversation. To initiate the transcription process of a specific recording's audio, you'll need to call the Create a new Conversation Intelligence (classic) Transcript endpoint. You can transcribe recordings created by Twilio or those that are externally created or stored.

If [automatic transcription](/docs/conversation-intelligence-classic/onboarding#enable-automatic-transcription-of-all-twilio-voice-call-recordings) is enabled, Twilio creates a Conversation Intelligence (classic) Transcript resource whenever a Voice call within your Account has been recorded.

A Transcript resource contains links to the associated subresources:

* The [Transcript Sentence](/docs/conversation-intelligence-classic/api/transcript-sentence-subresource) subresource contains the recording's transcribed sentences.
* The [Transcript Media](/docs/conversation-intelligence-classic/api/transcript-media-subresource) subresource includes the URL of the recording's media file.
* The [Transcript OperatorResults](/docs/conversation-intelligence-classic/api/transcript-operator-results-subresource) subresource contains the results from the Intelligence Service's Language Operators.

## Audio channel formats

Conversation Intelligence (classic) supports various audio formats, each suited for different needs:

* Mono: A single audio channel, suitable for straightforward recordings where speaker differentiation isn't crucial.
* Stereo: Two channels providing spatial sound, but not specifically separating speakers.
* Dual-Channel: Two distinct audio tracks in the same file, ideal for differentiating speakers such as agents and customers in call recordings. This format enhances transcription accuracy and participant differentiation.

We recommend using dual-channel recordings to improve transcription accuracy, especially in scenarios requiring speaker differentiation.

## Conversation Intelligence (classic) Transcript properties

<OperationTable type="properties" data={{"type":"object","refName":"intelligence.v2.transcript","modelName":"intelligence_v2_transcript","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The unique SID identifier of the Account."},"service_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^GA[0-9a-fA-F]{32}$","nullable":true,"description":"The unique SID identifier of the Service."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^GT[0-9a-fA-F]{32}$","nullable":true,"description":"A 34 character string that uniquely identifies this Transcript."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date that this Transcript was created, given in ISO 8601 format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date that this Transcript was updated, given in ISO 8601 format."},"status":{"type":"string","enum":["queued","in-progress","completed","new","failed","canceled","error"],"description":"The Status of this Transcript. One of `queued`, `in-progress`, `completed`, `failed` or `canceled`.","refName":"transcript_enum_status","modelName":"transcript_enum_status"},"channel":{"nullable":true,"description":"Media Channel describing Transcript Source and Participant Mapping"},"data_logging":{"type":"boolean","nullable":true,"description":"Data logging allows Twilio to improve the quality of the speech recognition & language understanding services through using customer data to refine, fine tune and evaluate machine learning models.\nNote: Data logging cannot be activated via API, only via www.twilio.com, as it requires additional consent."},"language_code":{"type":"string","nullable":true,"description":"The default language code of the audio."},"customer_key":{"type":"string","nullable":true},"media_start_time":{"type":"string","format":"date-time","nullable":true,"description":"The date that this Transcript's media was started, given in ISO 8601 format."},"duration":{"type":"integer","default":0,"description":"The duration of this Transcript's source"},"url":{"type":"string","format":"uri","nullable":true,"description":"The URL of this resource."},"redaction":{"type":"boolean","nullable":true,"description":"If the transcript has been redacted, a redacted alternative of the transcript will be available."},"encryption_credential_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CR[0-9a-fA-F]{32}$","nullable":true,"description":"The unique SID identifier of the Public Key resource used to encrypt the sentences and operator results."},"links":{"type":"object","format":"uri-map","nullable":true}}}} />

### Channel object

The `Channel` parameter object contains information about the conversational media used for the transcription. The table below describes the properties of the `Channel`  object. Click **Show channel properties** to show the details on each property.

#### `Channel` parameter properties

<OperationTable
  type="body"
  data={{
    encodingType: "application/json",
    schema: {
      type: "object",
      properties: {
        Channel: {
          type: "object",
          description: "Object representing the media associated with the transcript. It has information about the source of the transcript and its participants.",
          properties: {
            type: {
              type: "string",
              enum: ["voice", "messaging"],
              description: "The Twilio communications channel where the transcribed conversation took place.",
            },
            media_properties: {
              type: "object",
              properties: {
                source: {
                  type: "string",
                  enum: ["Recording", "ExternalRecording", "Call", "Conversation", "ConversationRelay"],
                  description: "The source of the media used to generate the transcript. `Recording` is from a Twilio recording, `ExternalRecording` is from a third-party recording, `Call` is  from a real-time transcription session, `Conversation` is from a Messaging Conversation, and `ConversationRelay` is from a Conversation Relay virtual agent session.",
                },
                source_sid: {
                  type: "string",
                  pattern: "^RE[0-9a-fA-F]{32}$",
                  minLength: 34,
                  maxLength: 34,
                  description: "Twilio SID of the transcript media source, if applicable.",
                },
                media_url: {
                  type: "string",
                  format: "uri",
                  description: "URL where the media can be accessed, if applicable.",
                },
              },
            },
            participants: {
              type: "array",
              description: "Array containing two objects that represent each channel/participant. See the [Specify participant information](#specify-participant-information) section below for more information.",
              items: {
                type: "object",
                properties: {
                  channel_participant: {
                    type: "integer",
                    enum: [1, 2],
                    description: "The channel of the participant described in this object.",
                  },
                  email: {
                    type: "string",
                    description: "An optional customer-provided email address for displaying in the transcript viewer.",
                    format: "email",
                  },
                  full_name: {
                    type: "string",
                    description: "An optional customer-provided participant name for displaying in the transcript viewer.",
                  },
                  image_url: {
                    type: "string",
                    format: "uri",
                    description: "An optional customer-provided participant profile picture for displaying in the transcript viewer.",
                  },
                  media_participant_id: {
                    type: "string",
                    description: "A channel-specific identifier for participants, such as a phone number in case of Twilio Voice Recordings.",
                  },
                  role: {
                    type: "string",
                    description: "By default, only Agent and Customer roles are assigned to participants. This property can be set to override default mapping or role names.",
                  },
                  user_id: {
                    type: "string",
                    description: "An optional customer-provided ID for displaying in the transcript viewer.",
                  },
                },
              },
            },
          },
        },
      },
    },
  }}
/>

## Create a new Transcript

`POST https://intelligence.twilio.com/v2/Transcripts`

> \[!NOTE]
>
> When you use [automatic transcription](/docs/conversation-intelligence-classic/onboarding#enable-automatic-transcription-of-all-twilio-voice-call-recordings), you don't need this API request to create new Conversation Intelligence (classic) Transcripts.

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateTranscriptRequest","required":["ServiceSid","Channel"],"properties":{"ServiceSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^GA[0-9a-fA-F]{32}$","description":"The unique SID identifier of the Service."},"Channel":{"description":"JSON object describing Media Channel including Source and Participants"},"CustomerKey":{"type":"string","description":"Used to store client provided metadata. Maximum of 64 double-byte UTF8 characters."},"MediaStartTime":{"type":"string","format":"date-time","description":"The date that this Transcript's media was started, given in ISO 8601 format."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"ServiceSid\": \"GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Channel\": \"{ \\\"media_properties\\\" : { \\\"media_url\\\": \\\"http://foobar.test/ClusterTests/call1.wav\\\"}}\",\n  \"CustomerKey\": \"aaaaaaaa\"\n}","meta":"","code":"{\n  \"ServiceSid\": \"GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Channel\": \"{ \\\"media_properties\\\" : { \\\"media_url\\\": \\\"http://foobar.test/ClusterTests/call1.wav\\\"}}\",\n  \"CustomerKey\": \"aaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ServiceSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Channel\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"]," ",["\\\"","#79C0FF"],["media_properties","#A5D6FF"],["\\\"","#79C0FF"]," ",[": {","#A5D6FF"]," ",["\\\"","#79C0FF"],["media_url","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["http://foobar.test/ClusterTests/call1.wav","#A5D6FF"],["\\\"","#79C0FF"],["}}\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomerKey\"","#7EE787"],[":","#C9D1D9"]," ",["\"aaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createParams":{"value":{"lang":"json","value":"{\n  \"ServiceSid\": \"GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Channel\": \"{ \\\"media_properties\\\" : { \\\"media_url\\\": \\\"http://foobar.test/ClusterTests/call1.wav\\\"}}\",\n  \"CustomerKey\": \"aaaaaaaa\"\n}","meta":"","code":"{\n  \"ServiceSid\": \"GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Channel\": \"{ \\\"media_properties\\\" : { \\\"media_url\\\": \\\"http://foobar.test/ClusterTests/call1.wav\\\"}}\",\n  \"CustomerKey\": \"aaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ServiceSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Channel\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"]," ",["\\\"","#79C0FF"],["media_properties","#A5D6FF"],["\\\"","#79C0FF"]," ",[": {","#A5D6FF"]," ",["\\\"","#79C0FF"],["media_url","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["http://foobar.test/ClusterTests/call1.wav","#A5D6FF"],["\\\"","#79C0FF"],["}}\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomerKey\"","#7EE787"],[":","#C9D1D9"]," ",["\"aaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

### Channel parameter

The `Channel` parameter object contains information about the conversational media used for the transcription.

The table below describes the properties of the `Channel` parameter object. Click **Show channel properties** to show the `media_properties` and `participants` fields.

#### `Channel` parameter properties

<OperationTable
  type="body"
  data={{
    encodingType: "application/json",
    schema: {
      type: "object",
      properties: {
        Channel: {
          type: "object",
          description: "Object representing the media associated with the transcript. It has information about the source of the transcript and its participants.",
          properties: {
            media_properties: {
              type: "object",
              properties: {
                source_sid: {
                  type: "string",
                  pattern: "^RE[0-9a-fA-F]{32}$",
                  minLength: 34,
                  maxLength: 34,
                  description: "SID of the Twilio Recording resource to be transcribed. If using `source_sid`, don't use `media_url`.",
                },
                media_url: {
                  type: "string",
                  format: "uri",
                  description: "URL where external media can be accessed for transcription, used for uploading an external recording. If using `media_url`, don't use `source_sid`.",
                },
              },
            },
            participants: {
              type: "array",
              description: "Array containing two objects that represent each channel/participant. See the [Specify participant information](#specify-participant-information) section below for more information.",
              items: {
                type: "object",
                properties: {
                  channel_participant: {
                    type: "integer",
                    enum: [1, 2],
                    description: "The channel of the participant described in this object. Use this to override the default channel/participant mapping.",
                  },
                  email: {
                    type: "string",
                    description: "An optional customer-provided email address for displaying in the transcript viewer.",
                    format: "email",
                  },
                  full_name: {
                    type: "string",
                    description: "An optional customer-provided participant name for displaying in the transcript viewer.",
                  },
                  image_url: {
                    type: "string",
                    format: "uri",
                    description: "An optional customer-provided participant profile picture for displaying in the transcript viewer.",
                  },
                  media_participant_id: {
                    type: "string",
                    description: "A channel-specific identifier for participants, such as a phone number in case of Twilio Voice Recordings.",
                  },
                  role: {
                    type: "string",
                    description: "By default, only Agent and Customer roles are assigned to participants. This property can be set to override default mapping or role names.",
                  },
                  user_id: {
                    type: "string",
                    description: "An optional customer-provided ID for displaying in the transcript viewer.",
                  },
                },
                required: ["channel_participant"],
              },
            },
          },
        },
      },
    },
  }}
/>

### CustomerKey parameter

You can optionally provide a `CustomerKey` parameter to map a Transcript to an internal identifier known within your system. This unique identifier helps track the Transcript, and it's included in webhook callback when the results for Transcripts and Operators are available. Note that `CustomerKey` doesn't replace the Transcript SID in Conversation Intelligence (classic) API calls.

### Transcribe a Twilio Recording

To transcribe Recordings made via Twilio and stored within Twilio's infrastructure, provide the [Recording](/docs/voice/api/recording) SID in the `Channel` object's `media_properties.source_sid` property as shown below. `REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` represents a Recording SID.

In this scenario, the `Channel` information appears as follows:

```json
{
     "media_properties":{
        "source_sid": "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
     }
}
```

Create a Conversation Intelligence (classic) Transcript from a Twilio Recording

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTranscript() {
  const transcript = await client.intelligence.v2.transcripts.create({
    channel: {
      media_properties: {
        source_sid: "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      },
    },
    serviceSid: "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  });

  console.log(transcript.accountSid);
}

createTranscript();
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

transcript = client.intelligence.v2.transcripts.create(
    channel={
        "media_properties": {"source_sid": "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
    },
    service_sid="GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(transcript.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var transcript = await TranscriptResource.CreateAsync(
            channel: new Dictionary<
                string,
                Object>() { { "media_properties", new Dictionary<string, Object>() { { "source_sid", "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } } } },
            serviceSid: "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(transcript.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import java.util.Map;
import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.Transcript;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Transcript transcript = Transcript
                                    .creator("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                        new HashMap<String, Object>() {
                                            {
                                                put("media_properties", new HashMap<String, Object>() {
                                                    {
                                                        put("source_sid", "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                    }
                                                });
                                            }
                                        })
                                    .create();

        System.out.println(transcript.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	intelligence "github.com/twilio/twilio-go/rest/intelligence/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &intelligence.CreateTranscriptParams{}
	params.SetChannel(map[string]interface{}{
		"media_properties": map[string]interface{}{
			"source_sid": "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		},
	})
	params.SetServiceSid("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.IntelligenceV2.CreateTranscript(params)
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

$transcript = $twilio->intelligence->v2->transcripts->create(
    "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // ServiceSid
    [
        "media_properties" => [
            "source_sid" => "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        ],
    ] // Channel
);

print $transcript->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

transcript = @client
             .intelligence
             .v2
             .transcripts
             .create(
               channel: {
                 'media_properties' => {
                   'source_sid' => 'REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                 }
               },
               service_sid: 'GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
             )

puts transcript.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:transcripts:create \
   --channel "{\"media_properties\":{\"source_sid\":\"REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}}" \
   --service-sid GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
CHANNEL_OBJ=$(cat << EOF
{
  "media_properties": {
    "source_sid": "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  }
}
EOF
)
curl -X POST "https://intelligence.twilio.com/v2/Transcripts" \
--data-urlencode "Channel=$CHANNEL_OBJ" \
--data-urlencode "ServiceSid=GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2010-08-31T20:36:28Z",
  "date_updated": "2010-08-31T20:36:28Z",
  "status": "queued",
  "channel": {
    "media_properties": {
      "source_sid": "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
  },
  "data_logging": false,
  "language_code": "en-US",
  "media_start_time": null,
  "duration": 0,
  "customer_key": "aaaaaaaa",
  "url": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "redaction": true,
  "encryption_credential_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "sentences": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences",
    "encrypted_sentences": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences/Encrypted",
    "media": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media",
    "operator_results": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OperatorResults",
    "encrypted_operator_results": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OperatorResults/Encrypted"
  }
}
```

#### Limits for Twilio Recording transcriptions

* The recording file size must not exceed 3GB.
* Audio duration can't exceed eight hours.
* Recordings shorter than two seconds aren't transcribed.
* Transcripts are indexed and available for search for 90 days.
* You can create only one Conversation Intelligence (classic) Transcript resource for a given Recording resource. To re-transcribe a Recording, [delete the original Conversation Intelligence (classic) Transcript resource](#delete-a-conversation-intelligence-classic-transcript-resource) and create a new one.
* To create Transcripts for Twilio Recordings in external storage, use the `MediaUrl` parameter. The `SourceSid` parameter isn't supported for externally-stored Twilio Recordings.
* You can't create Conversation Intelligence (classic) Transcripts from [encrypted Voice Recordings](/docs/voice/tutorials/voice-recording-encryption), because Conversation Intelligence (classic) can't decrypt those resources. You should move those recordings to your own external storage and generate pre-signed URLs for the decrypted recordings. Once you've done that, you can follow the instructions in the ["Transcribe an external recording" section below](#transcribe-an-external-recording).

### Transcribe an external recording

To transcribe a recording stored externally, for example, a recording stored in your own S3 bucket, provide the recording's URL in the `Channel` object's `media_properties.media_url` property.

The following limitations apply when transcribing an external recording (specified by a `MediaUrl`):

* You must make external recordings stored in [Twilio Assets](/docs/serverless/functions-assets/assets) public.
* Basic authentication on `MediaUrl`s isn't supported for external recordings. If you store the recordings on S3, use a [presigned URL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html). And when storing them on Azure Blob Storage, use a [Shared Access Signature (SAS)](https://docs.microsoft.com/en-us/rest/api/storageservices/delegate-access-with-shared-access-signature).
* `MediaUrl`s that respond with a non-200 HTTP status code will result in a failed request.
* Requests to access external recordings are performed once. There is currently no retry behavior.

### Transcribe a Twilio Video recording

To transcribe the audio of a Twilio Video recording, it needs additional processing to become compatible with Conversation Intelligence (classic).

First, create a dual-channel audio recording by transcoding a separate audio-only composition for each participant in the Video Room.

```bash title="Create a dual-channel audio recording"
curl -X POST "https://video.twilio.com/v1/Compositions" \ --data-urlencode "AudioSources=PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
\ --data-urlencode "StatusCallback=https://www.example.com/callbacks"
\ --data-urlencode "Format=mp4"
\ --data-urlencode "RoomSid=RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
\ -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Next, download the media from these compositions and merge them into a single stereo audio file.

```sh title="Download the Video Room Media"
ffmpeg -i speaker1.mp4 -i speaker2.mp4 -filter_complex "[0:a][1:a]amerge=inputs=2[a]" -map "[a]" -f flac -bits_per_raw_smaple 16 -ar 441000 output.flac
```

If the recording duration for each participant differs, you can avoid overlapping audio tracks. Use `ffmpeg` to create a single-stereo audio track with delay to cover the difference in track length. For example, if one audio track lasts 63 seconds and the other 67 seconds, use `ffmpeg` to create a stereo file with the first track, with four seconds of delay to match the length of the second track.

```sh title="Create a single stereo audio track"
ffmpeg -i speaker1.wav -i speaker2.wav -filter_complex "aevalsrc=0:d=${second_to_delay}[s1];[s1][1:a]concat=n=2:v=0:a=1[ac2];[0:a]apad[ac1];[ac1][ac2]amerge=2[a]" -map "[a]" -f flac -bits_per_raw_sample 16 -ar 441000 output.flac
```

Finally, use the Create a new Conversation Intelligence (classic) Transcript endpoint with the `Channel` parameter's `media_properties.media_url` property set to a publicly accessible URL of the audio file.

#### Supported media

Recordings must be publicly accessible during transcription. The recordings can be hosted or used on a time-limited pre-signed URL. To share a recording on an existing AWS S3 bucket, read the ["Sharing objects with pre-signed URLs" guide from AWS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html).

Twilio attempts to download an external recording for up to 10 minutes. After 10 minutes, the transcription fails.

You can't transcribe encrypted recordings.

Conversation Intelligence (classic) doesn't perform speaker diarization on recordings, meaning it doesn't differentiate between different speakers. Additionally, using mono recordings can lead to reduced transcription accuracy. For improved transcription accuracy and participant differentiation, use dual-channel recordings.

Conversation Intelligence (classic) supports both mono and stereo audio formats for the following media formats:

* WAV (PCM-encoded)
* MP3
* FLAC

The following limits apply to the media files:

* The maximum file size allowed is 3GB.
* The maximum audio length is eight hours.
* The minimum sample rate required is 8kHz (telephony grade). For best results, use 16KHz.

In this scenario, the `Channel` information appears as follows:

```json
{
     "media_properties":{
        "media_url": "http://www.example.com/recording/call.wav"
     }
}
```

Create a Conversation Intelligence (classic) Transcript from an external media file

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTranscript() {
  const transcript = await client.intelligence.v2.transcripts.create({
    channel: {
      media_properties: {
        media_url: "https://example.com/your-recording.wav",
      },
    },
    serviceSid: "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  });

  console.log(transcript.accountSid);
}

createTranscript();
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

transcript = client.intelligence.v2.transcripts.create(
    channel={
        "media_properties": {
            "media_url": "https://example.com/your-recording.wav"
        }
    },
    service_sid="GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(transcript.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var transcript = await TranscriptResource.CreateAsync(
            channel: new Dictionary<
                string,
                Object>() { { "media_properties", new Dictionary<string, Object>() { { "media_url", "https://example.com/your-recording.wav" } } } },
            serviceSid: "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(transcript.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import java.util.Map;
import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.Transcript;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Transcript transcript = Transcript
                                    .creator("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                        new HashMap<String, Object>() {
                                            {
                                                put("media_properties", new HashMap<String, Object>() {
                                                    {
                                                        put("media_url", "https://example.com/your-recording.wav");
                                                    }
                                                });
                                            }
                                        })
                                    .create();

        System.out.println(transcript.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	intelligence "github.com/twilio/twilio-go/rest/intelligence/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &intelligence.CreateTranscriptParams{}
	params.SetChannel(map[string]interface{}{
		"media_properties": map[string]interface{}{
			"media_url": "https://example.com/your-recording.wav",
		},
	})
	params.SetServiceSid("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.IntelligenceV2.CreateTranscript(params)
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

$transcript = $twilio->intelligence->v2->transcripts->create(
    "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // ServiceSid
    [
        "media_properties" => [
            "media_url" => "https://example.com/your-recording.wav",
        ],
    ] // Channel
);

print $transcript->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

transcript = @client
             .intelligence
             .v2
             .transcripts
             .create(
               channel: {
                 'media_properties' => {
                   'media_url' => 'https://example.com/your-recording.wav'
                 }
               },
               service_sid: 'GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
             )

puts transcript.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:transcripts:create \
   --channel "{\"media_properties\":{\"media_url\":\"https://example.com/your-recording.wav\"}}" \
   --service-sid GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
CHANNEL_OBJ=$(cat << EOF
{
  "media_properties": {
    "media_url": "https://example.com/your-recording.wav"
  }
}
EOF
)
curl -X POST "https://intelligence.twilio.com/v2/Transcripts" \
--data-urlencode "Channel=$CHANNEL_OBJ" \
--data-urlencode "ServiceSid=GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2010-08-31T20:36:28Z",
  "date_updated": "2010-08-31T20:36:28Z",
  "status": "queued",
  "channel": {
    "media_properties": {
      "media_url": "https://example.com/your-recording.wav"
    }
  },
  "data_logging": false,
  "language_code": "en-US",
  "media_start_time": null,
  "duration": 0,
  "customer_key": "aaaaaaaa",
  "url": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "redaction": true,
  "encryption_credential_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "sentences": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences",
    "encrypted_sentences": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences/Encrypted",
    "media": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media",
    "operator_results": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OperatorResults",
    "encrypted_operator_results": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OperatorResults/Encrypted"
  }
}
```

> \[!WARNING]
>
> If you include both `MediaUrl` and `SourceSid` in the Transcript creation request, Twilio uses the `MediaUrl`.

### Specify participant information

By default, Conversation Intelligence (classic) labels the left channel (channel one) as `Agent` and the right channel (channel two) as `Customer`. Depending on your call flow and the recorded call leg, this may not accurately reflect the participant/channel relationships on your recording. If needed, specify which participant is on a given channel via the [Channel parameter](#channel-parameter-properties)'s `participants` array.

> \[!WARNING]
>
> If the default behavior doesn't align with your application's recording implementation, you can do one of the following:
>
> * Update your application's logic to ensure the "Agent" is always on the first channel. For two-party voice calls, that's the first call leg. For Conferences, that's the first Participant that joined the recorded Conference.
> * If your application logic places all "Agents" on channel 2 and all "Customers" on channel 1, reach out to Twilio Support to invert the Agent/Customer Conversation Intelligence (classic) labeling at the Account level. This affects all recordings within that Account.
> * Specify Participant information in the request to create a Transcript. Use this only if the first two options aren't feasible for your application. See below for how to do this.

Only two participants can be overridden in the `Channel` object of the Transcript resource.

The code sample below demonstrates an example request that overrides the default Conversation Intelligence (classic)Conversation Intelligence (classic) labels.

Customize participant labels when creating a new Transcript

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTranscript() {
  const transcript = await client.intelligence.v2.transcripts.create({
    channel: {
      media_properties: {
        media_url: "https://example.com/your-recording",
      },
      participants: [
        {
          user_id: "id1",
          channel_participant: 1,
          media_participant_id: "+1555959545",
          email: "veronica.meyer@example.com",
          full_name: "Veronica Meyer",
          image_url:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
          role: "Customer",
        },
        {
          user_id: "id2",
          channel_participant: 2,
          media_participant_id: "+1555959505",
          email: "lauryn.trujillo@example.com",
          full_name: "Lauryn Trujillo",
          image_url:
            "https://images.unsplash.com/photo-1554384645-13eab165c24b",
          role: "Agent",
        },
      ],
    },
    serviceSid: "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  });

  console.log(transcript.accountSid);
}

createTranscript();
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

transcript = client.intelligence.v2.transcripts.create(
    channel={
        "media_properties": {"media_url": "https://example.com/your-recording"},
        "participants": [
            {
                "user_id": "id1",
                "channel_participant": 1,
                "media_participant_id": "+1555959545",
                "email": "veronica.meyer@example.com",
                "full_name": "Veronica Meyer",
                "image_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
                "role": "Customer",
            },
            {
                "user_id": "id2",
                "channel_participant": 2,
                "media_participant_id": "+1555959505",
                "email": "lauryn.trujillo@example.com",
                "full_name": "Lauryn Trujillo",
                "image_url": "https://images.unsplash.com/photo-1554384645-13eab165c24b",
                "role": "Agent",
            },
        ],
    },
    service_sid="GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
)

print(transcript.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var transcript =
            await TranscriptResource.CreateAsync(channel: new Dictionary<string, Object>() { { "media_properties", new Dictionary<string, Object>() { { "media_url", "https://example.com/your-recording" } } }, { "participants", new List<Object> { new Dictionary<string, Object>() { { "user_id", "id1" }, { "channel_participant", 1 }, { "media_participant_id", "+1555959545" }, { "email", "veronica.meyer@example.com" }, { "full_name", "Veronica Meyer" }, { "image_url", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80" }, { "role", "Customer" } }, new Dictionary<string, Object>() { { "user_id", "id2" }, { "channel_participant", 2 }, { "media_participant_id", "+1555959505" }, { "email", "lauryn.trujillo@example.com" }, { "full_name", "Lauryn Trujillo" }, { "image_url", "https://images.unsplash.com/photo-1554384645-13eab165c24b" }, { "role", "Agent" } } } } }, serviceSid: "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(transcript.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.Transcript;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Transcript transcript =
            Transcript
                .creator("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    new HashMap<String, Object>() {
                        {
                            put("media_properties", new HashMap<String, Object>() {
                                {
                                    put("media_url", "https://example.com/your-recording");
                                }
                            });
                            put("participants",
                                Arrays.asList(
                                    new HashMap<String, Object>() {
                                        {
                                            put("user_id", "id1");
                                            put("channel_participant", 1);
                                            put("media_participant_id", "+1555959545");
                                            put("email", "veronica.meyer@example.com");
                                            put("full_name", "Veronica Meyer");
                                            put("image_url",
                                                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80");
                                            put("role", "Customer");
                                        }
                                    },
                                    new HashMap<String, Object>() {
                                        {
                                            put("user_id", "id2");
                                            put("channel_participant", 2);
                                            put("media_participant_id", "+1555959505");
                                            put("email", "lauryn.trujillo@example.com");
                                            put("full_name", "Lauryn Trujillo");
                                            put("image_url",
                                                "https://images.unsplash.com/photo-1554384645-13eab165c24b");
                                            put("role", "Agent");
                                        }
                                    }));
                        }
                    })
                .create();

        System.out.println(transcript.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	intelligence "github.com/twilio/twilio-go/rest/intelligence/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &intelligence.CreateTranscriptParams{}
	params.SetChannel(map[string]interface{}{
		"media_properties": map[string]interface{}{
			"media_url": "https://example.com/your-recording",
		},
		"participants": []interface{}{
			map[string]interface{}{
				"user_id":              "id1",
				"channel_participant":  1,
				"media_participant_id": "+1555959545",
				"email":                "veronica.meyer@example.com",
				"full_name":            "Veronica Meyer",
				"image_url":            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
				"role":                 "Customer",
			},
			map[string]interface{}{
				"user_id":              "id2",
				"channel_participant":  2,
				"media_participant_id": "+1555959505",
				"email":                "lauryn.trujillo@example.com",
				"full_name":            "Lauryn Trujillo",
				"image_url":            "https://images.unsplash.com/photo-1554384645-13eab165c24b",
				"role":                 "Agent",
			},
		},
	})
	params.SetServiceSid("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.IntelligenceV2.CreateTranscript(params)
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

$transcript = $twilio->intelligence->v2->transcripts->create(
    "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // ServiceSid
    [
        "media_properties" => [
            "media_url" => "https://example.com/your-recording",
        ],
        "participants" => [
            [
                "user_id" => "id1",
                "channel_participant" => 1,
                "media_participant_id" => "+1555959545",
                "email" => "veronica.meyer@example.com",
                "full_name" => "Veronica Meyer",
                "image_url" =>
                    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
                "role" => "Customer",
            ],
            [
                "user_id" => "id2",
                "channel_participant" => 2,
                "media_participant_id" => "+1555959505",
                "email" => "lauryn.trujillo@example.com",
                "full_name" => "Lauryn Trujillo",
                "image_url" =>
                    "https://images.unsplash.com/photo-1554384645-13eab165c24b",
                "role" => "Agent",
            ],
        ],
    ] // Channel
);

print $transcript->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

transcript = @client
             .intelligence
             .v2
             .transcripts
             .create(
               channel: {
                 'media_properties' => {
                   'media_url' => 'https://example.com/your-recording'
                 },
                 'participants' => [
                   {
                     'user_id' => 'id1',
                     'channel_participant' => 1,
                     'media_participant_id' => '+1555959545',
                     'email' => 'veronica.meyer@example.com',
                     'full_name' => 'Veronica Meyer',
                     'image_url' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
                     'role' => 'Customer'
                   },
                   {
                     'user_id' => 'id2',
                     'channel_participant' => 2,
                     'media_participant_id' => '+1555959505',
                     'email' => 'lauryn.trujillo@example.com',
                     'full_name' => 'Lauryn Trujillo',
                     'image_url' => 'https://images.unsplash.com/photo-1554384645-13eab165c24b',
                     'role' => 'Agent'
                   }
                 ]
               },
               service_sid: 'GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
             )

puts transcript.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:transcripts:create \
   --channel "{\"media_properties\":{\"media_url\":\"https://example.com/your-recording\"},\"participants\":[{\"user_id\":\"id1\",\"channel_participant\":1,\"media_participant_id\":\"+1555959545\",\"email\":\"veronica.meyer@example.com\",\"full_name\":\"Veronica Meyer\",\"image_url\":\"https://images.unsplash.com/photo-1438761681033-6461ffad8d80\",\"role\":\"Customer\"},{\"user_id\":\"id2\",\"channel_participant\":2,\"media_participant_id\":\"+1555959505\",\"email\":\"lauryn.trujillo@example.com\",\"full_name\":\"Lauryn Trujillo\",\"image_url\":\"https://images.unsplash.com/photo-1554384645-13eab165c24b\",\"role\":\"Agent\"}]}" \
   --service-sid GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
CHANNEL_OBJ=$(cat << EOF
{
  "media_properties": {
    "media_url": "https://example.com/your-recording"
  },
  "participants": [
    {
      "user_id": "id1",
      "channel_participant": 1,
      "media_participant_id": "+1555959545",
      "email": "veronica.meyer@example.com",
      "full_name": "Veronica Meyer",
      "image_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      "role": "Customer"
    },
    {
      "user_id": "id2",
      "channel_participant": 2,
      "media_participant_id": "+1555959505",
      "email": "lauryn.trujillo@example.com",
      "full_name": "Lauryn Trujillo",
      "image_url": "https://images.unsplash.com/photo-1554384645-13eab165c24b",
      "role": "Agent"
    }
  ]
}
EOF
)
curl -X POST "https://intelligence.twilio.com/v2/Transcripts" \
--data-urlencode "Channel=$CHANNEL_OBJ" \
--data-urlencode "ServiceSid=GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2010-08-31T20:36:28Z",
  "date_updated": "2010-08-31T20:36:28Z",
  "status": "queued",
  "channel": {
    "media_properties": {
      "media_url": "https://example.com/your-recording"
    },
    "participants": [
      {
        "user_id": "id1",
        "channel_participant": 1,
        "media_participant_id": "+1555959545",
        "email": "veronica.meyer@example.com",
        "full_name": "Veronica Meyer",
        "image_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        "role": "Customer"
      },
      {
        "user_id": "id2",
        "channel_participant": 2,
        "media_participant_id": "+1555959505",
        "email": "lauryn.trujillo@example.com",
        "full_name": "Lauryn Trujillo",
        "image_url": "https://images.unsplash.com/photo-1554384645-13eab165c24b",
        "role": "Agent"
      }
    ]
  },
  "data_logging": false,
  "language_code": "en-US",
  "media_start_time": null,
  "duration": 0,
  "customer_key": "aaaaaaaa",
  "url": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "redaction": true,
  "encryption_credential_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "sentences": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences",
    "encrypted_sentences": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences/Encrypted",
    "media": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media",
    "operator_results": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OperatorResults",
    "encrypted_operator_results": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OperatorResults/Encrypted"
  }
}
```

## Fetch a Conversation Intelligence (classic) Transcript resource

`GET https://intelligence.twilio.com/v2/Transcripts/{Sid}`

> \[!NOTE]
>
> Use the webhook callback to know when a Create a new Conversation Intelligence (classic) Transcript request has completed and when the results are available. This is preferable to polling the Fetch a Conversation Intelligence (classic) Transcript endpoint.
>
> The webhook callback URL can be configured on the Intelligence Service's settings.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"A 34 character string that uniquely identifies this Transcript.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^GT[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a specific Transcript

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchTranscript() {
  const transcript = await client.intelligence.v2
    .transcripts("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(transcript.accountSid);
}

fetchTranscript();
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

transcript = client.intelligence.v2.transcripts(
    "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(transcript.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var transcript =
            await TranscriptResource.FetchAsync(pathSid: "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(transcript.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.Transcript;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Transcript transcript = Transcript.fetcher("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(transcript.getAccountSid());
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

	resp, err := client.IntelligenceV2.FetchTranscript("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$transcript = $twilio->intelligence->v2
    ->transcripts("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $transcript->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

transcript = @client
             .intelligence
             .v2
             .transcripts('GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
             .fetch

puts transcript.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:transcripts:fetch \
   --sid GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2010-08-31T20:36:28Z",
  "date_updated": "2010-08-31T20:36:28Z",
  "status": "queued",
  "channel": {},
  "data_logging": false,
  "language_code": "en-US",
  "media_start_time": null,
  "duration": 0,
  "customer_key": null,
  "url": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "redaction": true,
  "encryption_credential_sid": null,
  "links": {
    "sentences": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences",
    "encrypted_sentences": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences/Encrypted",
    "media": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media",
    "operator_results": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OperatorResults",
    "encrypted_operator_results": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OperatorResults/Encrypted"
  }
}
```

## Fetch multiple Conversation Intelligence (classic) Transcript resources

`GET https://intelligence.twilio.com/v2/Transcripts`

### Query parameters

```json
[{"name":"ServiceSid","in":"query","description":"The unique SID identifier of the Service.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^GA[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readQuery":{"value":"GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"BeforeStartTime","in":"query","description":"Filter by before StartTime.","schema":{"type":"string"}},{"name":"AfterStartTime","in":"query","description":"Filter by after StartTime.","schema":{"type":"string"}},{"name":"BeforeDateCreated","in":"query","description":"Filter by before DateCreated.","schema":{"type":"string"}},{"name":"AfterDateCreated","in":"query","description":"Filter by after DateCreated.","schema":{"type":"string"},"examples":{"readFull":{"value":"2019-11-22T23:46:00Z"}}},{"name":"Status","in":"query","description":"Filter by status.","schema":{"type":"string"}},{"name":"LanguageCode","in":"query","description":"Filter by Language Code.","schema":{"type":"string"},"examples":{"readFull":{"value":"en-US"}}},{"name":"SourceSid","in":"query","description":"Filter by SourceSid.","schema":{"type":"string"},"examples":{"readFull":{"value":"REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieve a list of Transcripts for a given service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listTranscript() {
  const transcripts = await client.intelligence.v2.transcripts.list({
    limit: 20,
  });

  transcripts.forEach((t) => console.log(t.accountSid));
}

listTranscript();
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

transcripts = client.intelligence.v2.transcripts.list(limit=20)

for record in transcripts:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var transcripts = await TranscriptResource.ReadAsync(limit: 20);

        foreach (var record in transcripts) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.Transcript;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Transcript> transcripts = Transcript.reader().limit(20).read();

        for (Transcript record : transcripts) {
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
	intelligence "github.com/twilio/twilio-go/rest/intelligence/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &intelligence.ListTranscriptParams{}
	params.SetLimit(20)

	resp, err := client.IntelligenceV2.ListTranscript(params)
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

$transcripts = $twilio->intelligence->v2->transcripts->read([], 20);

foreach ($transcripts as $record) {
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

transcripts = @client
              .intelligence
              .v2
              .transcripts
              .list(limit: 20)

transcripts.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:transcripts:list
```

```bash
curl -X GET "https://intelligence.twilio.com/v2/Transcripts?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "transcripts": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "service_sid": "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2010-08-31T20:36:28Z",
      "date_updated": "2010-08-31T20:36:28Z",
      "status": "queued",
      "channel": {},
      "data_logging": false,
      "language_code": "en-US",
      "media_start_time": null,
      "duration": 0,
      "customer_key": null,
      "url": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "redaction": true,
      "encryption_credential_sid": null,
      "links": {
        "sentences": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences",
        "encrypted_sentences": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences/Encrypted",
        "media": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media",
        "operator_results": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OperatorResults",
        "encrypted_operator_results": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/OperatorResults/Encrypted"
      }
    }
  ],
  "meta": {
    "key": "transcripts",
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://intelligence.twilio.com/v2/Transcripts?LanguageCode=en-US&SourceSid=REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&ServiceSid=GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&AfterDateCreated=2019-11-22T23%3A46%3A00Z&PageSize=50&Page=0",
    "next_page_url": null,
    "previous_page_url": null,
    "url": "https://intelligence.twilio.com/v2/Transcripts?LanguageCode=en-US&SourceSid=REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&ServiceSid=GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&AfterDateCreated=2019-11-22T23%3A46%3A00Z&PageSize=50&Page=0"
  }
}
```

## Delete a Conversation Intelligence (classic) Transcript resource

`DELETE https://intelligence.twilio.com/v2/Transcripts/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"A 34 character string that uniquely identifies this Transcript.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^GT[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a specific Transcript

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteTranscript() {
  await client.intelligence.v2
    .transcripts("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteTranscript();
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

client.intelligence.v2.transcripts(
    "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await TranscriptResource.DeleteAsync(pathSid: "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.Transcript;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Transcript.deleter("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.IntelligenceV2.DeleteTranscript("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$twilio->intelligence->v2
    ->transcripts("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->delete();
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
  .intelligence
  .v2
  .transcripts('GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:transcripts:remove \
   --sid GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
