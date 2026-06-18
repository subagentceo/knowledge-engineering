# User Identity & Access Tokens for Programmable Video

## Overview

An Access Token controls Participant identity and Room permissions in your Programmable Video application. Read below to learn more.

* [About Access Tokens](#about-access-tokens)
  * [Limit Room Access](#limit-room-access)
  * [Time-To-Live (ttl)](#time-to-live)
* [Generating Access Tokens](#generating-access-tokens)
  * [Use the Twilio CLI plugin](#generate-cli)
  * [Use a Twilio server-side SDK](#generate-helper-lib)
  * [Access Token Server Sample Applications](#access-token-server-sample-applications)
  * [Generate tokens without a Twilio server-side SDK](#generate-tokens-without-a-twilio-server-side-sdk)
* [Using Access Tokens](#using-access-tokens)

## About Access Tokens

Access Tokens are [JSON Web Tokens (JWTs)](https://jwt.io/introduction). They are short-lived credentials that are signed with a Twilio API Key Secret and contain *grants* that govern the actions the client holding the token is permitted to perform.

End-users require an Access Token to join a Twilio Video Room. Below is the general workflow that your application will need to generate Access Tokens and allow end-users to connect to Twilio Video Rooms.

![Steps to connect a client to a Twilio Video Room using access tokens from server.](https://docs-resources.prod.twilio.com/5fdf07df17ebc490eee0f5dc3c06e2d72c619f1e48dbd4849d009d3a24391b08.png)

All Twilio Access Tokens *must* include the following information:

* A **Twilio Account SID**, which is the public identifier of the Twilio account associated with the Access Token.
* An **API Key SID**, which is the public identifier of the key used to sign the token.
* An **Identity grant**, which sets the Twilio user identifier for the client holding the token.
* The **API Key Secret** associated with the API Key SID is used to sign the Access Token and verify that it is associated with your Twilio account.

> \[!WARNING]
>
> The API Key you use to create Access Tokens must be in the **United States (US1)** region. Access Tokens that are generated with API Keys in other regions outside of US1 will not work and will not connect to Video Rooms.
>
> You can select the key's region when you [create the API key](https://www.twilio.com/console/runtime/api-keys/create).
>
> ![Form to create a new API key with fields for friendly name, region set to US1, and key type as standard.](https://docs-resources.prod.twilio.com/eb7c84159d68389d1aea350173ce3ee7ea2fe59b857fdfbf28c156133f849ead.png)
>
> To see a list of your API keys in the United States (US1) region, select that region from the dropdown in the top right side of the page in the [Auth Token and API Keys section of the Twilio Console](https://www.twilio.com/console/runtime/api-keys/create).
>
> ![Auth tokens and API keys section with US1 region selected and create API key button.](https://docs-resources.prod.twilio.com/5765646c4674772280f7edcaa45dd31e4d4575e2374c34d1a9737adf4801dc51.png)

Programmable Video Access Tokens also include the following information:

* A mandatory **Video grant**, which indicates the holder of the Access Token can access Programmable Video services.
* Optionally, a **Room grant** (contained within the Video grant) for a specific Room name or SID, which indicates the holder of the Access Token may only connect to the indicated Room.

### Limit Room Access

The Room grant allows you to scope a Participant's access to a single Room. When a Participant connects with a token that contains a Room grant, the value is compared against:

1. The Room's `UniqueName`.
2. The Room's `Sid`.

For example, if the Access Token contains a Room grant for `DailyStandup`, the client holding this Access Token will only be allowed to connect to the Room with the `UniqueName` property `DailyStandup`.

[See below for working examples.](#generate-helper-lib)

### Time-To-Live (ttl) \[#time-to-live]

Access Tokens must be valid while joining a Room and when reconnecting to a Room due to network disruption or handoff. We recommend that you set the `ttl` to the maximum allowed session length, which is currently 86,400 seconds (24 hours).

## Generating Access Tokens

You can generate Access Tokens using either a [Twilio CLI plugin](#generate-cli) or [a Twilio server-side SDK](#generate-helper-lib). The Twilio CLI Plugin is a useful tool for creating individual Access Tokens for testing or getting started with Twilio Video. You should use the Twilio server-side SDKs to generate Access Tokens in your application's server.

### Use the Twilio CLI plugin \[#generate-cli]

The [Twilio CLI](/docs/twilio-cli/quickstart) has a [plugin](https://github.com/twilio-labs/plugin-token) for generating Access Tokens from the command line. This can be useful for testing Access Tokens when you are starting to develop your application.

First, you will need to install the Twilio CLI and log in to your Twilio account from the command line; see the [CLI Quickstart for instructions](/docs/twilio-cli/quickstart). Then, you can install the plugin with the following command:

```bash
twilio plugins:install @twilio-labs/plugin-token
```

To generate an Access Token, run the following command. `--identity` is a required argument and should be a string that represents the user identity for this Access Token.

```bash
twilio token:video --identity=<identity>
```

You can add [other arguments to the command](https://github.com/twilio-labs/plugin-token#twilio-tokenvideo), such as TTL and room name. To see the list of options, use the `--help` flag:

```bash
twilio token:video --help
```

### Use a Twilio server-side SDK \[#generate-helper-lib]

Use a [Twilio server-side SDK](/docs/libraries) to generate an Access Token in your back-end server. See below for examples of creating an Access Token for a particular user to enter a specific Video Room.

Creating an Access Token (Video)

```js
const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// Used when generating any kind of tokens
// To set up environmental variables, see http://twil.io/secure
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

const identity = 'user';

// Create Video Grant
const videoGrant = new VideoGrant({
  room: 'cool room',
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, {
  identity: identity,
});
token.addGrant(videoGrant);

// Serialize the token to a JWT string
console.log(token.toJwt());
```

```py
import os
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VideoGrant

# Required for all Twilio Access Tokens
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
api_key = os.environ['TWILIO_API_KEY']
api_secret = os.environ['TWILIO_API_KEY_SECRET']

# required for Video grant
identity = 'user'

# Create Access Token with credentials
token = AccessToken(account_sid, api_key, api_secret, identity=identity)

# Create a Video grant and add to token
video_grant = VideoGrant(room='cool room')
token.add_grant(video_grant)

# Return token info as JSON
print(token.to_jwt())
```

```cs
using System;
using System.Collections.Generic;
using Twilio.Jwt.AccessToken;

class Example
{
    static void Main(string[] args)
    {
        // These values are necessary for any access token
        // To set up environmental variables, see http://twil.io/secure
        const string twilioAccountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        const string twilioApiKey = Environment.GetEnvironmentVariable("TWILIO_API_KEY");
        const string twilioApiSecret = Environment.GetEnvironmentVariable("TWILIO_API_SECRET");

        // These are specific to Video
        const string identity = "user";

        // Create a Video grant for this token
        var grant = new VideoGrant();
        grant.Room = "cool room";

        var grants = new HashSet<IGrant> { grant };

        // Create an Access Token generator
        var token = new Token(
            twilioAccountSid,
            twilioApiKey,
            twilioApiSecret,
            identity: identity,
            grants: grants);

        Console.WriteLine(token.ToJwt());
    }
}
```

```java
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.VideoGrant;

public class TokenGenerator {

  public static void main(String[] args) {
    // Get your Account SID from https://twilio.com/console
    // To set up environment variables, see http://twil.io/secure
    // Required for all types of tokens
    String twilioAccountSid = System.getenv("TWILIO_ACCOUNT_SID");
    String twilioApiKey = System.getenv("TWILIO_API_KEY");
    String twilioApiSecret = System.getenv("TWILIO_API_SECRET");

    // Required for Video
    String identity = "user";

    // Create Video grant
    VideoGrant grant = new VideoGrant().setRoom("cool room");

    // Create access token
    AccessToken token = new AccessToken.Builder(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret
    ).identity(identity).grant(grant).build();

    System.out.println(token.toJwt());
  }
}
```

```go
package main

import (
	"fmt"
	"os"

	"github.com/twilio/twilio-go/client/jwt"
)

func main() {
	// Get your Account SID from https://twilio.com/console
	// To set up environment variables, see http://twil.io/secure
	// Required for all types of tokens
	var twilioAccountSid string = os.Getenv("TWILIO_ACCOUNT_SID")
	var twilioApiKey string = os.Getenv("TWILIO_API_KEY")
	var twilioApiSecret string = os.Getenv("TWILIO_API_SECRET")

	params := jwt.AccessTokenParams{
		AccountSid:    twilioAccountSid,
		SigningKeySid: twilioApiKey,
		Secret:        twilioApiSecret,
		Identity:      "user",
	}

	jwtToken := jwt.CreateAccessToken(params)
	videoGrant := &jwt.VideoGrant{
		Room: "cool room",
	}

	jwtToken.AddGrant(videoGrant)
	token, err := jwtToken.ToJwt()

	if err != nil {
		error := fmt.Errorf("error: %q", err)
		fmt.Println(error.Error())
	}

	fmt.Println(token)
}
```

```php
<?php
// Get the PHP helper library from https://twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php'; // Loads the library
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VideoGrant;

// Required for all Twilio access tokens
// To set up environmental variables, see http://twil.io/secure
$twilioAccountSid = getenv('TWILIO_ACCOUNT_SID');
$twilioApiKey = getenv('TWILIO_API_KEY');
$twilioApiSecret = getenv('TWILIO_API_KEY_SECRET');

// Required for Video grant
$roomName = 'cool room';
// An identifier for your app - can be anything you'd like
$identity = 'john_doe';

// Create access token, which we will serialize and send to the client
$token = new AccessToken(
    $twilioAccountSid,
    $twilioApiKey,
    $twilioApiSecret,
    3600,
    $identity
);

// Create Video grant
$videoGrant = new VideoGrant();
$videoGrant->setRoom($roomName);

// Add grant to token
$token->addGrant($videoGrant);

// render token to string
echo $token->toJWT();
```

```rb
require 'twilio-ruby'

# Required for any Twilio Access Token
# To set up environmental variables, see http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
api_key = ENV['TWILIO_API_KEY']
api_secret = ENV['TWILIO_API_KEY_SECRET']

# Required for Video
identity = 'user'

# Create Video grant for our token
video_grant = Twilio::JWT::AccessToken::VideoGrant.new
video_grant.room = 'cool room'

# Create an Access Token
token = Twilio::JWT::AccessToken.new(
  account_sid,
  api_key,
  api_secret,
  [video_grant],
  identity: identity
)

# Generate the token
puts token.to_jwt
```

### Access Token Server Sample Applications

These sample applications demonstrate the generation of Access Tokens in different programming languages.

* [Access Token Server Sample Application - PHP](https://github.com/TwilioDevEd/video-access-token-server-php)
* [Access Token Server Sample Application - Node](https://github.com/TwilioDevEd/video-access-token-server-node)
* [Access Token Server Sample Application - Python](https://github.com/TwilioDevEd/video-access-token-server-python)
* [Access Token Server Sample Application - Ruby](https://github.com/TwilioDevEd/video-access-token-server-ruby)
* [Access Token Server Sample Application - Java](https://github.com/TwilioDevEd/video-access-token-server-java)
* [Access Token Server Sample Application - C#](https://github.com/TwilioDevEd/video-access-token-server-csharp)

If you do not want to host your own server to create Access Tokens, you can use a [serverless Twilio Function](/docs/serverless/functions-assets/functions) to create an Access Token server hosted in Twilio's cloud. See an example of [how to generate Access Tokens without a server](https://www.twilio.com/blog/generate-access-token-twilio-chat-video-voice-using-twilio-functions) or an example of [creating a serverless video application](https://www.twilio.com/blog/serverless-video-chat-application-javascript-twilio-programmable-video) in the Twilio Blog.

### Generate tokens without a Twilio server-side SDK

Using a Twilio server-side SDK is the easiest way to create an Access Token. Twilio server-side SDKs have code that generate the Access Tokens in the correct format. However, it is possible to write your own code to do this if you are not using a server-side SDK.

Access Tokens are standard [JSON Web Tokens](https://jwt.io/introduction) that use the HS256 signing algorithm. The signing key is your API Key Secret. You can review all the elements included in the Access Token in the [Access Token API documentation](/docs/iam/access-tokens#token-anatomy).

To ensure that you are creating a token with the correct format and grants, you can generate a single token using the Twilio CLI or Twilio server-side SDKs and decode its payload to verify you are generating your own tokens with the same format. You can decode a JWT token at [https://jwt.io](https://jwt.io).

You can also use the source code for Twilio server-side SDKs as a reference to see how a particular library generates Access Tokens.

You can find the code for each server-side SDK in GitHub:

* [PHP](https://github.com/twilio/twilio-php/blob/main/src/Twilio/Jwt/AccessToken.php)
* [Node](https://github.com/twilio/twilio-node/blob/main/src/jwt/AccessToken.ts)
* [Python](https://github.com/twilio/twilio-python/blob/main/twilio/jwt/access_token/__init__.py)
* [Ruby](https://github.com/twilio/twilio-ruby/blob/main/lib/twilio-ruby/jwt/access_token.rb)
* [Java](https://github.com/twilio/twilio-java/blob/main/src/main/java/com/twilio/jwt/accesstoken/AccessToken.java)
* [C#](https://github.com/twilio/twilio-csharp/blob/main/src/Twilio/JWT/AccessToken/Token.cs)
* [Go](https://github.com/twilio/twilio-go/blob/main/client/jwt/access_token.go)

## Using Access Tokens

After you have generated an Access Token on the server-side of your application (or generated an Access Token via the Twilio CLI), you can use it to connect to a Programmable Video Room in a client-side application. You can learn more about how to connect to a Video Room using an Access Token in the Quickstart guides for [JavaScript](/docs/video/javascript-getting-started#connect-to-a-room), [Android](/docs/video/android-getting-started#connect-to-a-room), and [iOS](/docs/video/ios-getting-started#connect-to-a-room).

### Examples

Below are examples for connecting to a Twilio Video Room using an Access Token.

#### JavaScript

```javascript
const { connect } = require('twilio-video');

connect('$TOKEN', { name:'my-new-room' }).then(room => {
  console.log(`Successfully joined a Room: ${room}`);
  room.on('participantConnected', participant => {
    console.log(`A remote Participant connected: ${participant}`);
  });
}, error => {
  console.error(`Unable to connect to Room: ${error.message}`);
});
```

#### Android

```java
private Room.Listener roomListener() {
  return new Room.Listener() {
      @Override
      public void onConnected(Room room) {
        Log.d(TAG,"Connected to " + room.getName());
      }
  }
}

public void connectToRoom(String roomName) {
  ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
    .roomName(roomName)
    .audioTracks(localAudioTracks)
    .videoTracks(localVideoTracks)
    .dataTracks(localDataTracks)
    .build();
  room = Video.connect(context, connectOptions, roomListener);
}
```

#### iOS

```swift
@IBAction func createARoom(sender: AnyObject) {
    let connectOptions = ConnectOptions(token: accessToken) { (builder) in
        builder.roomName = "my-room"
    }
    room = TwilioVideoSDK.connect(options: connectOptions, delegate: self)
}

// MARK: RoomDelegate

func roomDidConnect(room: Room) {
    print("Did connect to Room")

    if let localParticipant = room.localParticipant {
        print("Local identity \(localParticipant.identity)")

        // Set the delegate of the local particiant to receive callbacks
        localParticipant.delegate = self
    }
}
```
