# Conversation Intelligence (classic) - Transcript Sentence Subresource

A Transcript Sentence subresource represents a transcribed sentence from a given [Conversation Intelligence (classic) Transcript](/docs/conversation-intelligence-classic/api/transcript-resource).

## Transcript Sentence properties

<OperationTable type="properties" data={{"type":"object","refName":"intelligence.v2.transcript.sentence","modelName":"intelligence_v2_transcript_sentence","properties":{"media_channel":{"type":"integer","default":0,"description":"The channel number."},"sentence_index":{"type":"integer","default":0,"description":"The index of the sentence in the transcript."},"start_time":{"type":"string","nullable":true,"description":"Offset from the beginning of the transcript when this sentence starts."},"end_time":{"type":"string","nullable":true,"description":"Offset from the beginning of the transcript when this sentence ends."},"transcript":{"type":"string","nullable":true,"description":"Transcript text.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^GX[0-9a-fA-F]{32}$","nullable":true,"description":"A 34 character string that uniquely identifies this Sentence."},"confidence":{"type":"string","nullable":true},"words":{"type":"array","nullable":true,"description":"Detailed information for each of the words of the given Sentence."}}}} />

## Retrieve all Transcript Sentences for a given Transcript

`GET https://intelligence.twilio.com/v2/Transcripts/{TranscriptSid}/Sentences`

### Path parameters

```json
[{"name":"TranscriptSid","in":"path","description":"The unique SID identifier of the Transcript.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^GT[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"Redacted","in":"query","description":"Grant access to PII Redacted/Unredacted Sentences. If redaction is enabled, the default is `true` to access redacted sentences.","schema":{"type":"boolean"},"examples":{"readParams":{"value":"True"}}},{"name":"WordTimestamps","in":"query","description":"Returns word level timestamps information, if word_timestamps is enabled. The default is `false`.","schema":{"type":"boolean"},"examples":{"readParams":{"value":"True"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 5000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":5000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

The `GET` request shown below returns a list of Transcript Sentences for a given Transcript, with the `WordTimestamps` query parameter set to `true`.

Retrieve all Transcript Sentences for a Transcript

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listSentence() {
  const sentences = await client.intelligence.v2
    .transcripts("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sentences.list({ limit: 20 });

  sentences.forEach((s) => console.log(s.mediaChannel));
}

listSentence();
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

sentences = client.intelligence.v2.transcripts(
    "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).sentences.list(limit=20)

for record in sentences:
    print(record.media_channel)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2.Transcript;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var sentences = await SentenceResource.ReadAsync(
            pathTranscriptSid: "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in sentences) {
            Console.WriteLine(record.MediaChannel);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.transcript.Sentence;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Sentence> sentences = Sentence.reader("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

        for (Sentence record : sentences) {
            System.out.println(record.getMediaChannel());
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

	params := &intelligence.ListSentenceParams{}
	params.SetLimit(20)

	resp, err := client.IntelligenceV2.ListSentence("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			fmt.Println(resp[record].MediaChannel)
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

$sentences = $twilio->intelligence->v2
    ->transcripts("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->sentences->read([], 20);

foreach ($sentences as $record) {
    print $record->mediaChannel;
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

sentences = @client
            .intelligence
            .v2
            .transcripts('GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            .sentences
            .list(limit: 20)

sentences.each do |record|
   puts record.media_channel
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:transcripts:sentences:list \
   --transcript-sid GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sentences": [
    {
      "media_channel": 1,
      "sentence_index": 0,
      "start_time": null,
      "end_time": null,
      "transcript": "test test",
      "sid": "GXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "confidence": null,
      "words": [
        {
          "word": "test",
          "start_time": null,
          "end_time": null
        },
        {
          "word": "test",
          "start_time": null,
          "end_time": null
        }
      ]
    }
  ],
  "meta": {
    "key": "sentences",
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences?PageSize=50&Page=0",
    "url": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences?PageSize=50&Page=0",
    "next_page_url": null,
    "previous_page_url": null
  }
}
```

## Show redacted Transcript Sentences

If [PII redaction was enabled](/docs/conversation-intelligence-classic/onboarding#redact-pii) at the time the associated Transcript was created, you can retrieve the redacted or unredacted Sentences.

If `Redacted` is `true` (the default value), the redacted Sentences are returned.

If `Redacted` is `false` , the original, unredacted Sentences are returned.

Retrieve unredacted Sentences for a Transcript

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listSentence() {
  const sentences = await client.intelligence.v2
    .transcripts("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sentences.list({
      redacted: false,
      limit: 20,
    });

  sentences.forEach((s) => console.log(s.mediaChannel));
}

listSentence();
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

sentences = client.intelligence.v2.transcripts(
    "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).sentences.list(redacted=False, limit=20)

for record in sentences:
    print(record.media_channel)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2.Transcript;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var sentences = await SentenceResource.ReadAsync(
            pathTranscriptSid: "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", redacted: false, limit: 20);

        foreach (var record in sentences) {
            Console.WriteLine(record.MediaChannel);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.transcript.Sentence;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Sentence> sentences =
            Sentence.reader("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setRedacted(false).limit(20).read();

        for (Sentence record : sentences) {
            System.out.println(record.getMediaChannel());
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

	params := &intelligence.ListSentenceParams{}
	params.SetRedacted(false)
	params.SetLimit(20)

	resp, err := client.IntelligenceV2.ListSentence("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			fmt.Println(resp[record].MediaChannel)
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

$sentences = $twilio->intelligence->v2
    ->transcripts("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->sentences->read(["redacted" => false], 20);

foreach ($sentences as $record) {
    print $record->mediaChannel;
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

sentences = @client
            .intelligence
            .v2
            .transcripts('GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            .sentences
            .list(
              redacted: false,
              limit: 20
            )

sentences.each do |record|
   puts record.media_channel
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:transcripts:sentences:list \
   --transcript-sid GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences?Redacted=false&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sentences": [
    {
      "media_channel": 1,
      "sentence_index": 0,
      "start_time": null,
      "end_time": null,
      "transcript": "test test",
      "sid": "GXaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "confidence": null,
      "words": [
        {
          "word": "test",
          "start_time": null,
          "end_time": null
        },
        {
          "word": "test",
          "start_time": null,
          "end_time": null
        }
      ]
    }
  ],
  "meta": {
    "key": "sentences",
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences?PageSize=50&Page=0",
    "url": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences?PageSize=50&Page=0",
    "next_page_url": null,
    "previous_page_url": null
  }
}
```

## Retrieve Encrypted Transcript Sentences

Get the encrypted data of the Transcript Sentences by fetching the `/Encrypted` subresource.

Get Encrypted Sentences

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchEncryptedSentences() {
  const encryptedSentence = await client.intelligence.v2
    .transcripts("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .encryptedSentences()
    .fetch();

  console.log(encryptedSentence.location);
}

fetchEncryptedSentences();
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

encrypted_sentence = (
    client.intelligence.v2.transcripts("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .encrypted_sentences()
    .fetch()
)

print(encrypted_sentence.location)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2.Transcript;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var encryptedSentences = await EncryptedSentencesResource.FetchAsync(
            pathTranscriptSid: "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(encryptedSentences.Location);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.transcript.EncryptedSentences;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        EncryptedSentences encryptedSentences =
            EncryptedSentences.fetcher("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(encryptedSentences.getLocation());
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

	params := &intelligence.FetchEncryptedSentencesParams{}

	resp, err := client.IntelligenceV2.FetchEncryptedSentences("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Location != nil {
			fmt.Println(*resp.Location)
		} else {
			fmt.Println(resp.Location)
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

$encrypted_sentence = $twilio->intelligence->v2
    ->transcripts("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->encryptedSentences()
    ->fetch();

print $encrypted_sentence->location;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

encrypted_sentence = @client
                     .intelligence
                     .v2
                     .transcripts('GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                     .encrypted_sentences
                     .fetch

puts encrypted_sentence.location
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:transcripts:sentences:encrypted:fetch \
   --transcript-sid GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences/Encrypted" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "location": "https://com.twilio.us1.sentences.s3.amazonaws.com/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "transcript_sid": "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://intelligence.twilio.com/v2/Transcripts/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sentences/Encrypted"
}
```
