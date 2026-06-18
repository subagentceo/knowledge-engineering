# Access Tokens

Access Tokens are short-lived tokens that you use to authenticate Twilio client-side SDKs like [Voice](/docs/voice/sdks), [Conversations](/docs/conversations-classic), [Sync](/docs/sync/sync-sdk-download), and [Video](/docs/video/platform-sdk-support-policy).

You create them on your server to verify a user's identity and grant access to client API features. All tokens have a limited lifetime, configurable for up to 24 hours. The best practice is to generate Access Tokens for the shortest amount of time feasible for your application.

## Anatomy of an Access Token \[#token-anatomy]

Each Access Token is a [JSON Web Token](https://jwt.io/) (JWT), an encoded JSON object with three parts: the header, the payload, and the signature.

The following is an example Access Token generated for Conversations:

```bash
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS3h4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4LTE0NTA0NzExNDciLCJpc3MiOiJTS3h4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4Iiwic3ViIjoiQUN4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eCIsIm5iZiI6MTQ1MDQ3MTE0NywiZXhwIjoxNDUwNDc0NzQ3LCJncmFudHMiOnsiaWRlbnRpdHkiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaXBfbWVzc2FnaW5nIjp7InNlcnZpY2Vfc2lkIjoiSVN4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eCIsImVuZHBvaW50X2lkIjoiSGlwRmxvd1NsYWNrRG9ja1JDOnVzZXJAZXhhbXBsZS5jb206c29tZWlvc2RldmljZSJ9fX0.IHx8KeH1acIfwnd8EIin3QBGPbfnF-yVnSFp5NpQJi0
```

If you inspect it [with the debugger at jwt.io](https://jwt.io/), you can further explore its content.

### Header \[#jwt-header]

```json
{
  "typ": "JWT",
  "alg": "HS256",
  "cty": "twilio-fpa;v=1"
}
```

The `header` section encodes the format of the token and includes the following fields:

* `typ` is the type of token. Its value **must** be `"JWT"`.
* `alg` is the algorithm used to encode the token. Its value **must** be `"HS256"`.
* `cty` is the content type and encodes the version of the Access Token. Its value **must** be `"twilio-fpa;v=1"`.

### Payload

```json
{
  "jti": "SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-1450471147",
  "iss": "SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "sub": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "iat": 1450471147,
  "nbf": 1450471147,
  "exp": 1450474747,
  "grants": {
    "identity": "user_name",
    "chat": {
      "service_sid": "ISxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  }
}
```

The `payload` section describes the authorization granted and includes the following fields:

* `jti` is a unique identifier for the token. Your application can choose this identifier. The default SDK implementation includes the SID of the API key used to generate the token and a unique random string.
* `iss` is the issuer — the API key containing the secret used to sign the token.
* `sub` is the SID of the Twilio Account to which access is scoped.
* `iat` is the timestamp at which the token was issued.
* `nbf` is an optional timestamp, before which the token will NOT be accepted.
* `exp` is the timestamp at which the token will expire. Tokens have a maximum age of 24 hours.
* `grants` is the list of permissions that the token grants. Grant properties and values will depend on the Twilio product and the needs of your specific use case.

### Signature

The `signature` section is a signed hash that serves to prove the authenticity of the token. It is the result of hashing the JWT header and payload together with your API key secret, which should only be known to your application and Twilio.

## Create Access Tokens \[#creating-tokens]

Twilio Access Tokens are based on the [JSON Web Token](https://jwt.io) standard.

You can use one of the Twilio SDKs to create Access Tokens quickly and programmatically.

### Step 1: Find your Account SID \[#step-1-account-sid]

Every Access Token requires your Account SID, which you can find in your [Twilio Console](https://console.twilio.com). This token ties a user's activity to a specific Twilio account.

### Step 2: Create an API Key and Secret \[#step-2-api-key]

Create an [API key](/docs/iam/api-keys/key-resource-v2010). You can create API keys from the [Twilio Console](https://console.twilio.com/us1/account/keys-credentials/api-keys?frameUrl=/console/project/api-keys) or with the [REST API](/docs/iam/api-keys/key-resource-v2010).

**Note**: You can create Access Tokens using **Main** and **Standard** API Keys. Creating Access Tokens is not yet supported with Restricted API Keys.

> \[!WARNING]
>
> If you are creating a key to use with Twilio Video, you must create it in the **US1** Region. [Learn more in the Twilio Video documentation.](/docs/video/tutorials/user-identity-access-tokens#api-key-region)

When you create the API key, you'll be shown the key's secret, which is used to sign the Access Token. For security, you will only be shown the secret at this time, so you need to store it with the key's SID in a secure location for the next step.

### Step 3: Generate an Access Token \[#step-3-generate-token]

Now use the information gathered in steps 1 and 2 to generate an Access Token using a Twilio SDK.

When creating an Access Token, you must provide the following:

* Your Twilio Account SID
* The API key SID and API key secret from Step 2

You can also optionally provide any of the following JWT configuration values.

| Parameter  | Description                                                                                                                                                                | Example      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `identity` | The identity to associate with the Access Token. Typically, this will be a username in your system. Voice tokens may only contain alpha-numeric and underscore characters. | `user_name`  |
| `ttl`      | Time to live for the token, in seconds.                                                                                                                                    | `3600`       |
| `nbf`      | Token not before time, or the time before which the token isn't accepted. Values are in Epoch time.                                                                        | `1615404972` |
| `region`   | The intended [Twilio Region](/docs/global-infrastructure/understanding-twilio-regions) for the token. Currently only supported for Voice tokens.                           | `us1`        |

Each Twilio product also requires at least one grant, which will provide product-specific abilities to the user associated with an Access Token.

> \[!WARNING]
>
> Programmable Voice access tokens limit the number of concurrent sessions for a given identity to ten. When the 11th instance of the identity is registered the oldest registration is removed.

#### Use an SDK to create Access Tokens

Below are code samples for creating Access Tokens with Twilio SDKs. Click on a product below to jump to the related code samples.

* [Conversations](#create-an-access-token-for-conversations)
* [Voice](#create-an-access-token-for-voice)
* [Video](#create-an-access-token-for-video)
* [Sync](#create-an-access-token-for-sync)

#### Create an Access Token for Conversations

The Conversations SDK requires each Access Token to contain a `ChatGrant`. Each `ChatGrant` must contain the SID for your Conversation Service. Each Access Token will also contain an `identity` grant that associates an Access Token with a specific user.

Create an Access Token for Conversations

```js
const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

// Used when generating any kind of tokens
// To set up environmental variables, see http://twil.io/secure
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

// Used specifically for creating Chat tokens
const serviceSid = process.env.TWILIO_CHAT_SERVICE_SID;
const identity = 'user@example.com';

// Create a "grant" which enables a client to use Chat as a given user,
// on a given device
const chatGrant = new ChatGrant({
  serviceSid: serviceSid,
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, {
  identity: identity,
});

token.addGrant(chatGrant);

// Serialize the token to a JWT string
console.log(token.toJwt());
```

```py
import os
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import ChatGrant

# required for all twilio access tokens
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
api_key = os.environ['TWILIO_API_KEY']
api_secret = os.environ['TWILIO_API_KEY_SECRET']

# required for Chat grants
service_sid = 'ISxxxxxxxxxxxx'
identity = 'user@example.com'

# Create access token with credentials
token = AccessToken(account_sid, api_key, api_secret, identity=identity)

# Create an Chat grant and add to token
chat_grant = ChatGrant(service_sid=service_sid)
token.add_grant(chat_grant)

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

        // These are specific to Chat
        const string serviceSid = Environment.GetEnvironmentVariable("TWILIO_SERVICE_SID");
        const string identity = "user@example.com";

        // Create an Chat grant for this token

        var grant = new ChatGrant
        {
          ServiceSid = serviceSid
        };

        var grants = new HashSet<IGrant>
        {
            { grant }
        };

        // Create an Access Token generator
        var token = new Token(
            twilioAccountSid,
            twilioApiKey,
            twilioApiSecret,
            identity,
            grants: grants);

        Console.WriteLine(token.ToJwt());
    }
}
```

```java
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.ChatGrant;

public class Example {
  public static void main(String[] args) {
    // Get your Account SID from https://twilio.com/console
    // To set up environment variables, see http://twil.io/secure
    // Required for all types of tokens
    String twilioAccountSid = System.getenv("TWILIO_ACCOUNT_SID");
    String twilioApiKey = System.getenv("TWILIO_API_KEY");
    String twilioApiSecret = System.getenv("TWILIO_API_SECRET");

    String serviceSid = System.getenv("TWILIO_SERVICE_SID");
    String identity = "user@example.com";

    ChatGrant grant = new ChatGrant();
    grant.setServiceSid(serviceSid);

    AccessToken token = new AccessToken.Builder(twilioAccountSid, twilioApiKey, twilioApiSecret)
        .identity(identity).grant(grant).build();

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
		Identity:      "user@example.com",
	}

	jwtToken := jwt.CreateAccessToken(params)
	chatGrant := &jwt.ChatGrant{
		ServiceSid: "ISxxxxxxxxxxxx",
	}

	jwtToken.AddGrant(chatGrant)
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
use Twilio\Jwt\Grants\ChatGrant;

// Required for all Twilio access tokens
// To set up environmental variables, see http://twil.io/secure
$twilioAccountSid = getenv('TWILIO_ACCOUNT_SID');
$twilioApiKey = getenv('TWILIO_API_KEY');
$twilioApiSecret = getenv('TWILIO_API_KEY_SECRET');

// Required for Chat grant
$serviceSid = 'ISxxxxxxxxxxxx';
// choose a random username for the connecting user
$identity = "john_doe";

// Create access token, which we will serialize and send to the client
$token = new AccessToken(
    $twilioAccountSid,
    $twilioApiKey,
    $twilioApiSecret,
    3600,
    $identity
);

// Create Chat grant
$chatGrant = new ChatGrant();
$chatGrant->setServiceSid($serviceSid);

// Add grant to token
$token->addGrant($chatGrant);

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

# Required for Chat
service_sid = 'ISxxxxxxxxxxxx'
identity = 'user@example.com'

# Create Chat grant for our token
grant = Twilio::JWT::AccessToken::ChatGrant.new
grant.service_sid = service_sid

# Create an Access Token
token = Twilio::JWT::AccessToken.new(
  account_sid,
  api_key,
  api_secret,
  [grant],
  identity: identity
)

# Generate the token
puts token.to_jwt
```

#### Create an Access Token for Voice

Create an Access Token for the Voice SDKs

```js
const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// Used when generating any kind of tokens
// To set up environmental variables, see http://twil.io/secure
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

// Used specifically for creating Voice tokens
const outgoingApplicationSid = 'APxxxxxxxxxxxxx';
const identity = 'user';

// Create a "grant" which enables a client to use Voice as a given user
const voiceGrant = new VoiceGrant({
  outgoingApplicationSid: outgoingApplicationSid,
  incomingAllow: true, // Optional: add to allow incoming calls
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, {
  identity: identity,
});
token.addGrant(voiceGrant);

// Serialize the token to a JWT string
console.log(token.toJwt());
```

```py
import os
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import VoiceGrant

# required for all twilio access tokens
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
api_key = os.environ['TWILIO_API_KEY']
api_secret = os.environ['TWILIO_API_KEY_SECRET']

# required for Voice grant
outgoing_application_sid = 'APxxxxxxxxxxxxx'
identity = 'user'

# Create access token with credentials
token = AccessToken(account_sid, api_key, api_secret, identity=identity)

# Create a Voice grant and add to token
voice_grant = VoiceGrant(
    outgoing_application_sid=outgoing_application_sid,
    incoming_allow=True, # Optional: add to allow incoming calls
)
token.add_grant(voice_grant)

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

        // These are specific to Voice
        const string outgoingApplicationSid = "APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
        const string identity = "user";

        // Create a Voice grant for this token
        var grant = new VoiceGrant();
        grant.OutgoingApplicationSid = outgoingApplicationSid;

        // Optional: add to allow incoming calls
        grant.IncomingAllow = true;

        var grants = new HashSet<IGrant>
        {
            { grant }
        };

        // Create an Access Token generator
        var token = new Token(
            twilioAccountSid,
            twilioApiKey,
            twilioApiSecret,
            identity,
            grants: grants);

        Console.WriteLine(token.ToJwt());
    }
}
```

```java
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.VoiceGrant;

public class TokenGenerator {
  
  public static void main(String[] args) {
    // Get your Account SID from https://twilio.com/console
    // To set up environment variables, see http://twil.io/secure
    // Required for all types of tokens
    String twilioAccountSid = System.getenv("TWILIO_ACCOUNT_SID");
    String twilioApiKey = System.getenv("TWILIO_API_KEY");
    String twilioApiSecret = System.getenv("TWILIO_API_SECRET");

    // Required for Voice
    String outgoingApplicationSid = System.getenv("TWILIO_APP_SID");
    String identity = "user";
      
    // Create Voice grant
    VoiceGrant grant = new VoiceGrant();
    grant.setOutgoingApplicationSid(outgoingApplicationSid);

    // Optional: add to allow incoming calls
    grant.setIncomingAllow(true);
    
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

	var outgoing_application_sid string = os.Getenv("APxxxxxxxxxxxxx")

	params := jwt.AccessTokenParams{
		AccountSid:    twilioAccountSid,
		SigningKeySid: twilioApiKey,
		Secret:        twilioApiSecret,
		Identity:      "user",
	}

	jwtToken := jwt.CreateAccessToken(params)
	voiceGrant := &jwt.VoiceGrant{
		Outgoing: jwt.Outgoing{
			ApplicationSid: outgoing_application_sid,
		},
		Incoming: jwt.Incoming{
			Allow: true,
		},
	}

	jwtToken.AddGrant(voiceGrant)
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
use Twilio\Jwt\Grants\VoiceGrant;

// Required for all Twilio access tokens
// To set up environmental variables, see http://twil.io/secure
$twilioAccountSid = getenv('TWILIO_ACCOUNT_SID');
$twilioApiKey = getenv('TWILIO_API_KEY');
$twilioApiSecret = getenv('TWILIO_API_KEY_SECRET');

// Required for Voice grant
$outgoingApplicationSid = 'APxxxxxxxxxxxx';
// An identifier for your app - can be anything you'd like
$identity = "john_doe";

// Create access token, which we will serialize and send to the client
$token = new AccessToken(
    $twilioAccountSid,
    $twilioApiKey,
    $twilioApiSecret,
    3600,
    $identity
);

// Create Voice grant
$voiceGrant = new VoiceGrant();
$voiceGrant->setOutgoingApplicationSid($outgoingApplicationSid);

// Optional: add to allow incoming calls
$voiceGrant->setIncomingAllow(true);

// Add grant to token
$token->addGrant($voiceGrant);

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

# Required for Voice
outgoing_application_sid = 'APxxxxxxxxxxxx'
identity = 'user'

# Create Voice grant for our token
grant = Twilio::JWT::AccessToken::VoiceGrant.new
grant.outgoing_application_sid = outgoing_application_sid

# Optional: add to allow incoming calls
grant.incoming_allow = true

# Create an Access Token
token = Twilio::JWT::AccessToken.new(
  account_sid,
  api_key,
  api_secret,
  [grant],
  identity: identity
)

# Generate the token
puts token.to_jwt
```

The Voice SDKs require each Access Token to contain an `identity` grant and a `VoiceGrant`. The `identity` grant is what associates an Access Token with a specific user.

Each `VoiceGrant` contains the following parameters:

| Parameter                 | Type    | Description                                                                                                                                               |
| ------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| incomingAllow             | Boolean | Indicates whether or not the endpoint associated with this Access Token is allowed to receive incoming calls as the identity included in the Access Token |
| outgoingApplicationSid    | string  | The SID of the TwiML App that Twilio will look to when making outgoing calls. (Note: This is **required** for using any of the Voice SDKs.)               |
| outgoingApplicationParams | object  | Request parameters to send to the TwiML Application for outgoing calls                                                                                    |
| pushCredentialSid         | string  | The SID of the Push Credential to use when registering to receive incoming call notifications (**Mobile SDKs only**)                                      |

The following is an example of a decoded Voice Access Token payload:

```bash
{
  "jti": "SKxxxx...-1643993631",
  "grants": {
    "identity": "alice",
    "voice": {
      "incoming": {
        "allow": true
      },
      "outgoing": {
        "application_sid": "APxxxx..."
      },
      "push_credential_sid": "CRxxxx..."
    }
  },
  "iat": 1643993631,
  "exp": 1643997231,
  "iss": "SKxxxx...",
  "sub": "ACxxxx..."
}
```

#### Create an Access Token for Video

> \[!WARNING]
>
> The API Key you use to create an Access Token for Twilio Video [must be in the US1 region](/docs/video/tutorials/user-identity-access-tokens#api-key-region).

The Video SDKs require each Access Token to contain an `identity` grant and a `VideoGrant`.

The `identity` grant is what associates an Access Token with a specific user.

Each `VideoGrant` contains an optional `room` parameter for a specific Room name or SID, which indicates the holder of the Access Token may only connect to the indicated Room.

Learn more about Video Access Tokens on the [User Identity & Access Tokens page](/docs/video/tutorials/user-identity-access-tokens).

Create an Access Token for Video

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

#### Create an Access Token for Sync

Sync requires your Access Token to contain an `identity` grant and a `SyncGrant`. The `identity` grant is what associates an Access Token with a specific user.

The `SyncGrant` requires a `serviceSid` parameter containing the SID for your Sync Service.

Learn more about [Issuing Sync Tokens](/docs/sync/identity-and-access-tokens).

Create an Access Token for Sync

```js
const AccessToken = require('twilio').jwt.AccessToken;
const SyncGrant = AccessToken.SyncGrant;

// Used when generating any kind of tokens
// To set up environmental variables, see http://twil.io/secure
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;
const twilioSyncService = process.env.TWILIO_SYNC_SERVICE_SID;

// Used specifically for creating Sync tokens
const identity = 'user';

// Create a "grant" which enables a client to use Sync as a given user
const syncGrant = new SyncGrant({
  serviceSid: twilioSyncService,
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret, {
  identity: identity,
});
token.addGrant(syncGrant);

// Serialize the token to a JWT string
console.log(token.toJwt());
```

```py
import os
from twilio.jwt.access_token import AccessToken
from twilio.jwt.access_token.grants import SyncGrant

# required for all twilio access tokens
# To set up environmental variables, see http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
api_key = os.environ['TWILIO_API_KEY']
api_secret = os.environ['TWILIO_API_KEY_SECRET']
twilio_sync_service = os.environ['TWILIO_SYNC_SERVICE_SID']

# required for Sync grant
identity = 'user'

# Create access token with credentials
token = AccessToken(account_sid, api_key, api_secret, identity=identity)

# Create a Sync grant and add to token
sync_grant = SyncGrant(
    # Create a "grant" which enables a client to use Sync as a given user
    service_sid=twilio_sync_service
)

token.add_grant(sync_grant)

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
        const string twilioSyncService = Environment.GetEnvironmentVariable("TWILIO_SYNC_SERVICE_SID");

        // These are specific to Sync
        const string identity = "user";

        // Create a Sync grant for this token
        var grant = new SyncGrant();

        // Create a "grant" which enables a client to use Sync as a given user
        grant.serviceSid = twilioSyncService;

        var grants = new HashSet<IGrant>
        {
            { grant }
        };

        // Create an Access Token generator
        var token = new Token(
            twilioAccountSid,
            twilioApiKey,
            twilioApiSecret,
            identity,
            grants: grants);

        Console.WriteLine(token.ToJwt());
    }
}
```

```java
import com.twilio.jwt.accesstoken.AccessToken;
import com.twilio.jwt.accesstoken.SyncGrant;

public class TokenGenerator {
  
  public static void main(String[] args) {
    // Get your Account SID from https://twilio.com/console
    // To set up environment variables, see http://twil.io/secure
    // Required for all types of tokens
    String twilioAccountSid = System.getenv("TWILIO_ACCOUNT_SID");
    String twilioApiKey = System.getenv("TWILIO_API_KEY");
    String twilioApiSecret = System.getenv("TWILIO_API_SECRET");
    String twilioSyncService = System.getenv("TWILIO_SYNC_SERVICE_SID");


    // Required for Sync
    String identity = "user";
      
    // Create Sync grant
    SyncGrant grant = new SyncGrant();

    // Create a "grant" which enables a client to use Sync as a given user
    grant.setServiceSid(twilioSyncService);

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
	var twilioSyncService string = os.Getenv("TWILIO_SYNC_SERVICE_SID")

	params := jwt.AccessTokenParams{
		AccountSid:    twilioAccountSid,
		SigningKeySid: twilioApiKey,
		Secret:        twilioApiSecret,
		Identity:      "user",
	}

	jwtToken := jwt.CreateAccessToken(params)
	syncGrant := &jwt.SyncGrant{
		ServiceSid: twilioSyncService,
	}

	jwtToken.AddGrant(syncGrant)
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
use Twilio\Jwt\Grants\SyncGrant;

// Required for all Twilio access tokens
// To set up environmental variables, see http://twil.io/secure
$twilioAccountSid = getenv('TWILIO_ACCOUNT_SID');
$twilioApiKey = getenv('TWILIO_API_KEY');
$twilioApiSecret = getenv('TWILIO_API_KEY_SECRET');
$twilioSyncService = getenv("TWILIO_SYNC_SERVICE_SID");


// Required for Sync grant
// An identifier for your app - can be anything you'd like
$identity = "john_doe";

// Create access token, which we will serialize and send to the client
$token = new AccessToken(
    $twilioAccountSid,
    $twilioApiKey,
    $twilioApiSecret,
    3600,
    $identity
);

// Create Sync grant
$syncGrant = new SyncGrant();

// Create a "grant" which enables a client to use Sync as a given user
$syncGrant->setServiceSid($twilioSyncService);


// Add grant to token
$token->addGrant($syncGrant);

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
twilio_sync_service = ENV['TWILIO_SYNC_SERVICE_SID']


# Required for Sync
identity = 'user'

# Create Sync grant for our token
grant = Twilio::JWT::AccessToken::SyncGrant.new

# Create a "grant" which enables a client to use Sync as a given user
grant.service_sid = twilio_sync_service

# Create an Access Token
token = Twilio::JWT::AccessToken.new(
  account_sid,
  api_key,
  api_secret,
  [grant],
  identity: identity
)

# Generate the token
puts token.to_jwt
```

### Step 4: Authenticate

You're now ready to use your token. For client-side SDKs like [Conversations](/docs/conversations-classic), [Voice](/docs/voice/sdks), and [Video](/docs/video), you will need to get the stringified token to your client-side code via Ajax or some other means.

Refer to the **Identity and Access Tokens** guides in the product documentation for [Video](/docs/video/tutorials/user-identity-access-tokens), [Conversations](/docs/conversations-classic/identity), [Sync](/docs/sync/identity-and-access-tokens) for more details.

## Managing the lifecycle of Access Tokens \[#managing-lifecycle]

You can use [API keys](/docs/iam/api-keys/key-resource-v2010) to manage the lifecycle of Access Tokens.

Since each Access Token was created using an API Key, you can [delete the API key](/docs/iam/api-keys/key-resource-v2010#delete-a-key-resource) to revoke all of the Access Tokens related to that API Key.
