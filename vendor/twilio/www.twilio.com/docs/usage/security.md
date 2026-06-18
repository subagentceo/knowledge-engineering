# Security

## Encrypted communication \[#encrypted-communication]

Twilio supports encryption to protect communications between Twilio and your web application. Specify an HTTPS URL. Twilio will not connect to an HTTPS URL with a self-signed certificate, so use a certificate from a provider such as [Let's Encrypt](https://letsencrypt.org/).

> \[!WARNING]
>
> Do not pin Twilio certificates. Twilio rotates certificates without notice.

Twilio can use the HTTP protocol for callbacks—for instance, if you're working on a development environment that doesn't have SSL certificates installed. On your Twilio project's [Settings page in the Console](/console/project/settings), the SSL Certificate Validation setting enforces validation on webhooks.

Here is the list of [supported TLS ciphers for callbacks](https://help.twilio.com/hc/en-us/articles/360002288554-TwiML-Request-and-Status-Callback-URL-supported-ciphers).

## HTTP authentication \[#http-authentication]

Twilio supports HTTP Basic and Digest Authentication. This allows you to password-protect the TwiML URLs on your web server so that only you and Twilio can access them.

Provide a username and password using the following URL format:

```bash
https://username:password@www.myserver.com/my_secure_document
```

> \[!WARNING]
>
> Twilio supports the TLS cryptographic protocol. Twilio can't handle self-signed certificates, and support for SSLv3 is officially deprecated.

> \[!WARNING]
>
> Be careful to not include any special characters, such as `&,``:`, etc., in
> your username or password.

Twilio will authenticate to your web server using the provided username and password and will remain logged in for the duration of the call. We highly recommend that you use HTTP Authentication in conjunction with encryption. To learn more about Basic and Digest Authentication, refer to your web server documentation.

If you specify a password-protected URL, Twilio will first send a request with no `Authorization` header. After your server responds with a `401 Unauthorized` status code, a `WWW-Authenticate` header and a `realm` in the response, Twilio will make the same request with an `Authorization` header.

The following example shows a response from your server:

```bash
HTTP/1.1 401 UNAUTHORIZED
WWW-Authenticate: Basic realm="My Realm"
Date: Wed, 21 Jun 2017 01:14:36 GMT
Content-Type: application/xml
Content-Length: 327
```

## Protect media access with HTTP basic authentication \[#protect-media-access-with-http-authentication]

Media files, such as call recordings in Programmable Voice or an image associated with any Programmable Messaging channel (for example, MMS, WhatsApp, or Facebook), can be stored in our Services.

Requiring HTTP Basic Authentication for stored media is considered industry best practice. Twilio implements this for all applicable Services. Some of our products such as Programmable Voice and Programmable Messaging support HTTP Basic Authentication. However, they aren't turned on by default. This opt-in setting applies to your Twilio account and any subaccounts.

To protect media access, you can enforce authentication by turning on HTTP Basic Authentication in your Twilio Account. This setting requires your Twilio Account SID and Auth Token or API Key for all requests to access media files.

**Twilio highly recommends turning on HTTP Basic Authentication for your media, especially if it contains sensitive data.**

Turn on HTTP Basic Authentication for media access in the following Services and functionalities:

* Programmable Messaging (for example, MMS, WhatsApp Facebook Business Messenger)
* Programmable Voice (for example, call recordings)

## HTTPS and TLS \[#https\_tls]

To secure your web application, ensure that you're using HTTPS for your web application's endpoint. Twilio won't connect to an HTTPS URL with a self-signed certificate, so use a certificate from a provider such as [Let's Encrypt](https://letsencrypt.org/).

Twilio can use the HTTP protocol for callbacks. For instance, if you're working on a development environment that doesn't have SSL certificates installed. On your Twilio project's [Settings page](/console/project/settings) in the Console, the SSL Certificate Validation setting enforces validation on webhooks.

Here is the list of [supported TLS ciphers for callbacks](https://help.twilio.com/hc/en-us/articles/360002288554-TwiML-Request-and-Status-Callback-URL-supported-ciphers).

## Validating requests are coming from Twilio \[#validating-requests]

If your application exposes sensitive data or modifies your data, you may want to verify that HTTP requests to your web application come from Twilio. This ensures they're not from a malicious third party. To provide this level of security, Twilio cryptographically signs its requests.

Here's how it works:

1. Turn on TLS on your server and configure your Twilio account to use HTTPS URLs.
2. Twilio assembles its request to your application, including the final URL and any `POST` fields. \* If your request is a `POST`, Twilio takes all the `POST` fields, sorts them alphabetically by their name, and concatenates the parameter name and value to the end of the URL (with no delimiter). Only query parameters get parsed to generate a security token, not the `POST` body. \* If the request is a `GET`, the final URL includes all of the Twilio request parameters appended in the query string of your original URL using the standard delimiter `&` between the name and value pairs.
3. Twilio takes the resulting string (the full URL with the scheme, port, query string and any `POST` parameters) and signs it using [HMAC-SHA1](#a-note-on-hmac-sha1) and your AuthToken as the key.
4. Twilio sends this signature in an HTTP header called `X-Twilio-Signature`

To verify the authenticity of the request, you can leverage the built-in request validation method provided by all of our SDKs:

Validate Signature of Request (x-www-form-urlencoded body)

```js
// Get twilio-node from twilio.com/docs/libraries/node
const client = require('twilio');

// Your Auth Token from twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Store Twilio's request URL (the url of your webhook) as a variable
const url = 'https://mycompany.com/myapp';

// Store the application/x-www-form-urlencoded parameters from Twilio's request as a variable
// In practice, this MUST include all received parameters, not a
// hardcoded list of parameters that you receive today. New parameters
// may be added without notice.
const params = {
  CallSid: 'CA1234567890ABCDE',
  Caller: '+12349013030',
  Digits: '1234',
  From: '+12349013030',
  To: '+18005551212',
};

// Store the X-Twilio-Signature header attached to the request as a variable
const twilioSignature = 'Np1nax6uFoY6qpfT5l9jWwJeit0=';

// Check if the incoming signature is valid for your application URL and the incoming parameters
console.log(client.validateRequest(authToken, twilioSignature, url, params));
```

```py
import os
# Download the twilio-python library from twilio.com/docs/python/install
from twilio.request_validator import RequestValidator

# Your Auth Token from twilio.com/user/account
auth_token = os.environ['TWILIO_AUTH_TOKEN']

# Initialize the request validator
validator = RequestValidator(auth_token)

# Store Twilio's request URL (the url of your webhook) as a variable
url = 'https://example.com/myapp'

# Store the application/x-www-form-urlencoded parameters from Twilio's request as a variable
# In practice, this MUST include all received parameters, not a
# hardcoded list of parameters that you receive today. New parameters
# may be added without notice.
params = {
  'CallSid': 'CA1234567890ABCDE',
  'Caller': '+12349013030',
  'Digits': '1234',
  'From': '+12349013030',
  'To': '+18005551212'
}

# Store the X-Twilio-Signature header attached to the request as a variable
twilio_signature = 'Np1nax6uFoY6qpfT5l9jWwJeit0='

# Check if the incoming signature is valid for your application URL and the incoming parameters
print(validator.validate(url, params, twilio_signature))
```

```cs
// Download the twilio-csharp library from
// https://www.twilio.com/docs/libraries/csharp#installation
using System;
using System.Collections.Generic;
using Twilio.Security;

class Example
{
    static void Main(string[] args)
    {
        // Your Auth Token from twilio.com/console
        const string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        // Initialize the request validator
        var validator = new RequestValidator(authToken);

        // Store Twilio's request URL (the url of your webhook) as a variable
        const string url = "https://example.com/myapp";

        // Store the application/x-www-form-urlencoded params from Twilio's request as a variable
        // In practice, this MUST include all received parameters, not a
        // hardcoded list of parameters that you receive today. New parameters
        // may be added without notice.
        var parameters = new Dictionary<string, string>
        {
            {"CallSid", "CA1234567890ABCDE"},
            {"Caller", "+12349013030"},
            {"Digits", "1234"},
            {"From", "+12349013030"},
            {"To", "+18005551212"}
        };

        // Store the X-Twilio-Signature header attached to the request as a variable
        const string twilioSignature = "Np1nax6uFoY6qpfT5l9jWwJeit0=";

        // Check if the incoming signature is valid for your application URL and the incoming parameters
        Console.WriteLine(validator.Validate(url, parameters, twilioSignature));
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import java.util.HashMap;
import java.util.Map;

import com.twilio.security.RequestValidator;

public class Example {
  // Your Auth Token from twilio.com/user/account
  public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");
    
  public static void main(String[] args) throws java.net.URISyntaxException {
    // Initialize the request validator
    RequestValidator validator = new RequestValidator(AUTH_TOKEN);

    // Store Twilio's request URL (the url of your webhook) as a variable
    String url = "https://example.com/myapp";

    // Store the application/x-www-form-urlencoded parameters from Twilio's request as a variable
    // In practice, this MUST include all received parameters, not a
    // hardcoded list of parameters that you receive today. New parameters
    // may be added without notice.
    Map<String, String> params = new HashMap<>();
    params.put("CallSid", "CA1234567890ABCDE");
    params.put("Caller", "+12349013030");
    params.put("Digits", "1234");
    params.put("From", "+12349013030");
    params.put("To", "+18005551212");

    // Store the X-Twilio-Signature header attached to the request as a variable
    String twilioSignature = "Np1nax6uFoY6qpfT5l9jWwJeit0=";

    // Check if the incoming signature is valid for your application URL and the incoming parameters
    System.out.println(validator.validate(url, params, twilioSignature));
  }
}
```

```go
package main

import (
	"fmt"
	"os"

	"github.com/twilio/twilio-go/client"
)

func main() {
	// Your Auth Token from twilio.com/console
	authToken := os.Getenv("TWILIO_AUTH_TOKEN")

	// Initialize the request validator
	requestValidator := client.NewRequestValidator(authToken)

	// Store Twilio's request URL (the url of your webhook) as a variable
	url := "https://example.com/myapp"

	// Store the application/x-www-form-urlencoded params from Twilio's request as a variable
	// In practice, this MUST include all received parameters, not a
	// hardcoded list of parameters that you receive today. New parameters
	// may be added without notice.
	params := map[string]string{
		"CallSid": "CA1234567890ABCDE",
		"Caller":  "+12349013030",
		"Digits":  "1234",
		"From":    "+12349013030",
		"To":      "+18005551212",
	}

	// Store the X-Twilio-Signature header attached to the request as a variable
	signature := "Np1nax6uFoY6qpfT5l9jWwJeit0="

	// Check if the incoming signature is valid for your application URL and the incoming parameters
	fmt.Println(requestValidator.Validate(url, params, signature))
}
```

```php
<?php
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php';

use Twilio\Security\RequestValidator;

// Your auth token from twilio.com/user/account
$token = getenv("TWILIO_AUTH_TOKEN");

// The X-Twilio-Signature header - in PHP this should be
// You may be able to use $signature = $_SERVER["HTTP_X_TWILIO_SIGNATURE"];
$signature = 'Np1nax6uFoY6qpfT5l9jWwJeit0=';

// Initialize the request validator
$validator = new RequestValidator($token);

// The Twilio request URL. You may be able to retrieve this from
// You may be able to use $url = $_SERVER['SCRIPT_URI']
$url = 'https://example.com/myapp';

// Store the application/x-www-form-urlencoded parameters from Twilio's request as a variable
// In practice, this MUST include all received parameters, not a
// hardcoded list of parameters that you receive today. New parameters
// may be added without notice.
// You may be able to use $postVars = $_POST
$postVars = array(
  'CallSid' => 'CA1234567890ABCDE',
  'Caller' => '+12349013030',
  'Digits' => '1234',
  'From' => '+12349013030',
  'To' => '+18005551212'
);

// Check if the incoming signature is valid for your application URL and the incoming parameters
if ($validator->validate($signature, $url, $postVars)) {
  echo "Confirmed to have come from Twilio.";
} else {
  echo "NOT VALID. It might have been spoofed!";
}
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'rubygems' # This line not needed for ruby > 1.8
require 'twilio-ruby'

# Get your Auth Token from https://www.twilio.com/console
auth_token = ENV['TWILIO_AUTH_TOKEN']

#  Initialize the request validator
validator = Twilio::Security::RequestValidator.new(auth_token)

# Store Twilio's request URL (the url of your webhook) as a variable
url = 'https://example.com/myapp'

# Store the application/x-www-form-urlencoded params from Twilio's request as a variable
# In practice, this MUST include all received parameters, not a
# hardcoded list of parameters that you receive today. New parameters
# may be added without notice.
params = {
  'CallSid' => 'CA1234567890ABCDE',
  'Caller'  => '+12349013030',
  'Digits'  => '1234',
  'From'    => '+12349013030',
  'To'      => '+18005551212'
}

# Store the X-Twilio-Signature header attached to the request as a variable
twilio_signature = 'Np1nax6uFoY6qpfT5l9jWwJeit0='

# Check if the incoming signature is valid for your application URL and the incoming parameters
puts validator.validate(url, params, twilio_signature)
```

Validate Signature of Request (application/json body)

```js
// Get twilio-node from twilio.com/docs/libraries/node
const client = require('twilio');

// Your Auth Token from twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Store Twilio's request URL (the url of your webhook) as a variable
// including all query parameters
const url =
  'https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9';

// Store the application/json body from Twilio's request as a variable
// In practice, this MUST include all received parameters, not a
// hardcoded list of parameters that you receive today. New parameters
// may be added without notice.
const body = '{"CallSid":"CA1234567890ABCDE","Caller":"+12349013030"}';

// Store the X-Twilio-Signature header attached to the request as a variable
const twilioSignature = 'hqeF3G9Hrnv6/R0jOhoYDD2PPUs=';

// Check if the incoming signature is valid for your application URL and the incoming body
console.log(
  client.validateRequestWithBody(authToken, twilioSignature, url, body)
);
```

```py
import os
# Download the twilio-python library from twilio.com/docs/python/install
from twilio.request_validator import RequestValidator

# Your Auth Token from twilio.com/user/account
auth_token = os.environ['TWILIO_AUTH_TOKEN']

# Initialize the request validator
validator = RequestValidator(auth_token)

# Store Twilio's request URL (the url of your webhook) as a variable
# including all query parameters
url = 'https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9'

# Store the application/json body from Twilio's request as a variable
# In practice, this MUST include all received parameters, not a
# hardcoded list of parameters that you receive today. New parameters
# may be added without notice.
body = """{"CallSid":"CA1234567890ABCDE","Caller":"+12349013030"}"""

# Store the X-Twilio-Signature header attached to the request as a variable
twilio_signature = 'hqeF3G9Hrnv6/R0jOhoYDD2PPUs='

# Check if the incoming signature is valid for your application URL and the incoming body
print(validator.validate(url, body, twilio_signature))
```

```cs
// Download the twilio-csharp library from
// https://www.twilio.com/docs/libraries/csharp#installation
using System;
using System.Collections.Generic;
using Twilio.Security;

class Example
{
    static void Main(string[] args)
    {
        // Your Auth Token from twilio.com/console
        const string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        // Initialize the request validator
        var validator = new RequestValidator(authToken);

        // Store Twilio's request URL (the url of your webhook) as a variable
        // including all query parameters
        const string url = "https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9";

        // Store the application/json body from Twilio's request as a variable
        // In practice, this MUST include all received parameters, not a
        // hardcoded list of parameters that you receive today. New parameters
        // may be added without notice.
        const string body = "{\"CallSid\":\"CA1234567890ABCDE\",\"Caller\":\"+12349013030\"}";


        // Store the X-Twilio-Signature header attached to the request as a variable
        const string twilioSignature = "hqeF3G9Hrnv6/R0jOhoYDD2PPUs=";

        // Check if the incoming signature is valid for your application URL and the incoming body
        Console.WriteLine(validator.Validate(url, body, twilioSignature));
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install
import com.twilio.security.RequestValidator;

public class Example {
  // Your Auth Token from twilio.com/user/account
  public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

  public static void main(String[] args) throws java.net.URISyntaxException {
    // Initialize the request validator
    RequestValidator validator = new RequestValidator(AUTH_TOKEN);

    // Store Twilio's request URL (the url of your webhook) as a variable
    // including all query parameters
    String url = "https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9";

    // Store the application/json body from Twilio's request as a variable
    // In practice, this MUST include all received parameters, not a
    // hardcoded list of parameters that you receive today. New parameters
    // may be added without notice.
    String body = "{\"CallSid\":\"CA1234567890ABCDE\",\"Caller\":\"+12349013030\"}";

    // Store the X-Twilio-Signature header attached to the request as a variable
    String twilioSignature = "hqeF3G9Hrnv6/R0jOhoYDD2PPUs=";

    // Check if the incoming signature is valid for your application URL and the incoming body
    System.out.println(validator.validate(url, body, twilioSignature));
  }
}
```

```go
package main

import (
	"fmt"
	"os"

	"github.com/twilio/twilio-go/client"
)

func main() {
	// Your Auth Token from twilio.com/console
	authToken := os.Getenv("TWILIO_AUTH_TOKEN")

	// Initialize the request validator
	requestValidator := client.NewRequestValidator(authToken)

	// Store Twilio's request URL (the url of your webhook) as a variable
	// including all query parameters
	url := "https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9"

	// Store the application/json body from Twilio's request as a variable
	// In practice, this MUST include all received parameters, not a
	// hardcoded list of parameters that you receive today. New parameters
	// may be added without notice.
	body :=  []byte("{\"CallSid\":\"CA1234567890ABCDE\",\"Caller\":\"+12349013030\"}")

	// Store the X-Twilio-Signature header attached to the request as a variable
	signature := "hqeF3G9Hrnv6/R0jOhoYDD2PPUs="

	// Check if the incoming signature is valid for your application URL and the incoming parameters
	fmt.Println(requestValidator.ValidateBody(url, body, signature))
}
```

```php
<?php
// NOTE: This example uses the next generation Twilio helper library - for more
// information on how to download and install this version, visit
// https://www.twilio.com/docs/libraries/php
require_once '/path/to/vendor/autoload.php';

use Twilio\Security\RequestValidator;

// Your auth token from twilio.com/user/account
$token = getenv("TWILIO_AUTH_TOKEN");

// The X-Twilio-Signature header - in PHP this should be
// You may be able to use $signature = $_SERVER["HTTP_X_TWILIO_SIGNATURE"];
$signature = 'hqeF3G9Hrnv6/R0jOhoYDD2PPUs=';

// Initialize the request validator
$validator = new RequestValidator($token);

// Store Twilio's request URL (the url of your webhook) as a variable
// including all query parameters
// You may be able to use $url = $_SERVER['SCRIPT_URI']
$url = 'https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9';

// Store the application/json body from Twilio's request as a variable
// In practice, this MUST include all received parameters, not a
// hardcoded list of parameters that you receive today. New parameters
// may be added without notice.
// You may be able to use $body = $_POST
$body = "{\"CallSid\":\"CA1234567890ABCDE\",\"Caller\":\"+12349013030\"}";

// Check if the incoming signature is valid for your application URL and the incoming parameters
if ($validator->validate($signature, $url, $body)) {
  echo "Confirmed to have come from Twilio.";
} else {
  echo "NOT VALID. It might have been spoofed!";
}
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'rubygems' # This line not needed for ruby > 1.8
require 'twilio-ruby'

# Get your Auth Token from https://www.twilio.com/console
auth_token = ENV['TWILIO_AUTH_TOKEN']

#  Initialize the request validator
validator = Twilio::Security::RequestValidator.new(auth_token)

# Store Twilio's request URL (the url of your webhook) as a variable
url = 'https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9'

# Store the application/json body from Twilio's request as a variable
# In practice, this MUST include all received parameters, not a
# hardcoded list of parameters that you receive today. New parameters
# may be added without notice.
body = '{"CallSid":"CA1234567890ABCDE","Caller":"+12349013030"}'

# Store the X-Twilio-Signature header attached to the request as a variable
twilio_signature = 'hqeF3G9Hrnv6/R0jOhoYDD2PPUs='

# Check if the incoming signature is valid for your application URL and the incoming body
puts validator.validate(url, body, twilio_signature)
```

If the method call returns `true`, then the request can be considered valid and it is safe to proceed with your application logic.

> \[!NOTE]
>
> We highly recommend you use the SDKs to do signature validation.

### Explore the algorithm yourself

Follow these steps to perform the validation on your end:

1. Take the full URL of the request URL you specify for your phone number or app, from the protocol (https...) through the end of the query string (everything after the ?).
2. If the request is a `POST`, sort all the `POST` parameters alphabetically (using Unix-style case-sensitive sorting order).
3. Iterate through the sorted list of `POST` parameters, and append the variable name and value (with no delimiters) to the end of the URL string.
4. Sign the resulting string with [HMAC-SHA1](#a-note-on-hmac-sha1) using your AuthToken as the key (remember, your AuthToken's case matters!).
5. Base64-encode the resulting hash value.
6. Compare your hash to ours, submitted in the X-Twilio-Signature header. If they match, then you're good to go.

The following example shows a `POST` request from Twilio to your application as part of an incoming call webhook:

```bash
https://example.com/myapp.php?foo=1&bar=2
```

In this example, Twilio posted some digits from a `Gather` to that URL, in addition to all the usual `POST` fields:

* `Digits`: 1234
* `To`: +18005551212
* `From`: +14158675310
* `Caller`: +14158675310
* `CallSid`: CA1234567890ABCDE

Create a string that is your URL with the full query string:

```bash
https://example.com/myapp.php?foo=1&bar=2
```

Then, sort the list of `POST` variables by the parameter name (using Unix-style case-sensitive sorting order):

* `CallSid`: CA1234567890ABCDE
* `Caller`: +14158675310
* `Digits`: 1234
* `From`: +14158675310
* `To`: +18005551212

Next, append each `POST` variable, name, and value to the string with no delimiters:

```bash
https://example.com/myapp.php?foo=1&bar=2CallSidCA1234567890ABCDECaller+14158675310Digits1234From+14158675310To+18005551212
```

Hash the resulting string using HMAC-SHA1, using your AuthToken [Primary](#notes) as the key.

Suppose your AuthToken is `12345`. Take the hash value returned from the following function call (or its equivalent in your language of choice):

```xml
hmac_sha1(https://example.com/myapp.php?foo=1&bar=2CallSidCA1234567890ABCDECaller+14158675310Digits1234From+14158675310To+18005551212, 12345)
```

Take the Base64 encoding of the hash value (so it's only ASCII characters):

```bash
L/OH5YylLD5NRKLltdqwSvS0BnU=
```

Finally, compare that to the hash Twilio sent in the X-Twilio-Signature HTTP header. If they match, the request is valid.

> \[!WARNING]
>
> This example is for illustrative purposes only. When validating requests in
> your application, only use the provided helper methods.

### A few notes \[#notes]

* If the `Content-Type` is `application-json`, don't use the JSON body to fill in the `validator`'s parameter for `POST` parameters.
  * The query parameter `bodySHA256` will be included in the request.
  * Its value is calculated as the hexadecimal representation of the SHA-256 hash of the request body.
* Some frameworks may trim whitespace from `POST` body fields. A notable example is Laravel, which has the TrimStrings middleware turned on by default. You must turn off these behaviors to successfully match signatures generated from fields that have leading or trailing whitespace. Certain Node.js middleware may also trim whitespace from requests.
  * When constructing the request body to be sent (as can be done in the Studio HTTP Request widget) ensure that no hidden whitespaces are in the body.
* When creating the hash make sure you are using your Primary AuthToken as the key. If you have recently created a secondary AuthToken, this means you still need to use your old AuthToken until the secondary one has been [promoted to your primary AuthToken](https://help.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them).
* The [HMAC-SHA1](#a-note-on-hmac-sha1) secure hashing algorithm should be available in all major languages, either in the core or via an extension or package.
* If your URL uses an "index" page, such as `index.php` or `index.html` to handle the request, such as: `https://example.com/twilio` where the real page is served from `https://example.com/twilio/index.php`, then Apache or PHP may rewrite that URL so it has a trailing slash, e.g., `https://example.com/twilio/`. Using the code above, or similar code in another language, you could end up with an incorrect hash, because Twilio built the hash using `https://example.com/twilio` and you may have built the hash using `https://example.com/twilio/`.
* For SMS *and* voice callbacks over HTTP:
  * Twilio will *drop* the username and password (if any) from the URL before computing the signature.
  * Twilio will *keep* the port (if any) in the URL when computing the signature.
* For SMS callbacks over HTTPS:
  * Twilio will *drop* the username and password (if any) from the URL before computing the signature.
  * Twilio will *keep* the port (if any) in the URL when computing the signature.
* For voice callbacks over HTTPS:
  * Twilio will *drop* the username and password (if any) from the URL before computing the signature.
  * Twilio will also *drop* the port (if any) from the URL before computing the signature.
* For voice WSS handshake requests:
  * If you are having trouble verifying a WebSocket handshake request (e.g., for Programmable Voice [Media Streams](/docs/voice/media-streams)), try appending a trailing `/` character to the URL that you pass to the signature validation method.

> \[!NOTE]
>
> *Concerned about SHA1 security issues? Twilio does not use SHA-1 alone.*
>
> The critical component of `HMAC-SHA1` that distinguishes it from `SHA-1` alone is the use of your Twilio **AuthToken** as a complex secret key. While there are possible collision-based attacks on [SHA-1](https://en.wikipedia.org/wiki/SHA-1), [HMACs](https://en.wikipedia.org/wiki/HMAC) aren't affected by those same attacks. The combination of the underlying hashing algorithm (SHA-1) and the strength of the secret key (AuthToken) protects you in this case.

## Test the validity of your webhook signature

> \[!NOTE]
>
> It's a great idea to test your webhooks and ensure that their signatures are
> secure. The following sample code can test your unique endpoint against both
> valid and invalid signatures.

Complete the following steps to make this test work for you:

1. Set your [Auth Token](https://www.twilio.com/console) as an environment variable
2. Set the URL to the endpoint you want to test
3. If testing BasicAuth, change `HTTPDigestAuth` to `HTTPBasicAuth`

Test the validity of your webhook signature (x-www-form-urlencoded body)

```js
// Get twilio-node from twilio.com/docs/libraries/node
const webhooks = require('twilio/lib/webhooks/webhooks');
const request = require('request');

// Your Auth Token from twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;

// The Twilio request URL
const url = 'https://mycompany.com/myapp';

// The post variables in Twilio's request
const params = {
  CallSid: 'CA1234567890ABCDE',
  Caller: '+12349013030',
  Digits: '1234',
  From: '+12349013030',
  To: '+18005551212',
};

function testUrl(method, url, params, valid) {
  if (method === 'GET') {
    url +=
      '?' +
      Object.keys(params)
        .map((key) => key + '=' + params[key])
        .join('&');
    params = {};
  }
  const signatureUrl = valid ? url : 'http://invalid.com';
  const signature = webhooks.getExpectedTwilioSignature(
    authToken,
    signatureUrl,
    params
  );
  const options = {
    method: method,
    url: url,
    form: params,
    headers: {
      'X-Twilio-Signature': signature,
    },
  };

  request(options, function (error, response, body) {
    const validStr = valid ? 'valid' : 'invalid';
    console.log(
      `HTTP ${method} with ${validStr} signature returned ${response.statusCode}`
    );
  });
}

testUrl('GET', url, params, true);
testUrl('GET', url, params, false);
testUrl('POST', url, params, true);
testUrl('POST', url, params, false);
```

```py
# Download the twilio-python library from twilio.com/docs/python/install
from twilio.request_validator import RequestValidator
from requests.auth import HTTPDigestAuth
from requests.auth import HTTPBasicAuth
import requests
import urllib
import os

# Your Auth Token from twilio.com/user/account saved as an environment variable
# Remember never to hard code your auth token in code, browser Javascript, or distribute it in mobile apps
# To set up environmental variables, see http://twil.io/secure
auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
validator = RequestValidator(auth_token)

# Replace this URL with your unique URL
url = 'https://mycompany.com/myapp'
# User credentials if required by your web server. Change to 'HTTPBasicAuth' if needed
auth = HTTPDigestAuth('username', 'password')

params = {
    'CallSid': 'CA1234567890ABCDE',
    'Caller': '+12349013030',
    'Digits': '1234',
    'From': '+12349013030',
    'To': '+18005551212'
}

def test_url(method, url, params, valid):
    if method == "GET":
        url = url + '?' + urllib.parse.urlencode(params)
        params = {}

    if valid:
        signature = validator.compute_signature(url, params)
    else:
        signature = validator.compute_signature("http://invalid.com", params)

    headers = {'X-Twilio-Signature': signature}
    response = requests.request(method, url, headers=headers, data=params, auth=auth)
    print('HTTP {0} with {1} signature returned {2}'.format(method, 'valid' if valid else 'invalid', response.status_code))


test_url('GET', url, params, True)
test_url('GET', url, params, False)
test_url('POST', url, params, True)
test_url('POST', url, params, False)
```

```cs
// Download the twilio-csharp library from
// https://www.twilio.com/docs/libraries/csharp#installation
using System;
using System.Collections.Generic;
using Twilio.Security;

class Example
{
    // Your Auth Token from twilio.com/console
    static readonly string AuthToken = Environment.GetEnvironmentVariable("AUTH_TOKEN");

    static async Task Main(string[] args)
    {
        // The Twilio request URL
        const string url = "https://mycompany.com/myapp";

        var parameters = new Dictionary<string, string>
        {
            {"CallSid", "CA1234567890ABCDE"},
            {"Caller", "+12349013030"},
            {"Digits", "1234"},
            {"From", "+12349013030"},
            {"To", "+18005551212"}
        };

        await TestUrl("POST", url, parameters, true);
        await TestUrl("POST", url, parameters, false);
        await TestUrl("GET", url, parameters, true);
        await TestUrl("GET", url, parameters, false);
    }

    private static async Task TestUrl(string method, string url, IDictionary<string, string> parameters, bool valid) {
        var client = new HttpClient();
        if(method == "GET")
        {
            var query = string.Join("&",parameters.Select(
                kvp => $"{kvp.Key}={HttpUtility.UrlEncode(kvp.Value)}"));
            url += '?' + query;
            parameters = new Dictionary<string, string>();
        }

        var signature = ComputeSignature(valid ? url : "http://invalid.com", parameters);
        client.DefaultRequestHeaders.Add("X-Twilio-Signature", signature);
    
        HttpResponseMessage response;
        if(method == "GET") {
            response = await client.GetAsync(url);
        } else {
            response = await client.PostAsync(url, new FormUrlEncodedContent(parameters));
        }

        var validStr = valid ? "valid" : "invalid";
        Console.WriteLine($"HTTP {method} with {validStr} signature returned {response.StatusCode}");
    }

    private static string ComputeSignature(string url, IDictionary<string, string> parameters){
        var b = new StringBuilder(url);
        if (parameters != null)
        {
            var sortedKeys = new List<string>(parameters.Keys);
            sortedKeys.Sort(StringComparer.Ordinal);

            foreach (var key in sortedKeys)
            {
                b.Append(key).Append(parameters[key] ?? "");
            }
        }

        var hmac = new HMACSHA1(Encoding.UTF8.GetBytes(AuthToken));
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(b.ToString()));
        return Convert.ToBase64String(hash);
    }
}
```

```java
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class Application {

    // Your Auth Token from twilio.com/user/account
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    // Initialize the validator
    public static void main(String[] args) throws Exception {

        // The Twilio request URL
        String url = "https://mycompany.com/myapp";

        // The post variables in Twilio's request
        Map<String, String> params = new HashMap<>();
        params.put("CallSid", "CA1234567890ABCDE");
        params.put("Caller", "+12349013030");
        params.put("Digits", "1234");
        params.put("From", "+12349013030");
        params.put("To", "+18005551212");

        TestUrl("GET", url, params, true);
        TestUrl("GET", url, params, false);
        TestUrl("POST", url, params, true);
        TestUrl("POST", url, params, false);
    }

    private static void TestUrl(
            String method, String url, Map<String, String> params, boolean valid) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();
        if("GET".equals(method)) {
            url += '?' + String.join("&", params.entrySet().stream().map(
                (Map.Entry<String, String> entry) -> String.format("%s=%s", entry.getKey(), entry.getValue())
            ).toArray(String[]::new));
            params = new HashMap<>();
        }

        String signature = ComputeSignature(valid ? url : "http://invalid.com", params);

        HttpUriRequest request;
        if("GET".equals(method)) {
            request = new HttpGet(url);
        } else {
            HttpPost post = new HttpPost(url);
            post.setEntity(new UrlEncodedFormEntity(
                Arrays.asList(params.entrySet().stream().map(
                        (Map.Entry<String, String> entry) -> new BasicNameValuePair(entry.getKey(), entry.getValue())
                ).toArray(NameValuePair[]::new))
            ));
            request = post;
        }
        request.setHeader("X-Twilio-Signature", signature);

        HttpResponse response = client.execute(request);

        System.out.printf("HTTP %s with %s signature returned %s\n", method, valid, response.getStatusLine());
    }

    private static String ComputeSignature(String url, Map<String, String> params) throws Exception{
        StringBuilder builder = new StringBuilder(url);
        if (params != null) {
            List<String> sortedKeys = new ArrayList(params.keySet());
            Collections.sort(sortedKeys);

            for (String key : sortedKeys) {
                builder.append(key);
                String value = params.get(key);
                builder.append(value == null ? "" : value);
            }
        }

        Mac mac = Mac.getInstance("HmacSHA1");
        mac.init(new SecretKeySpec(AUTH_TOKEN.getBytes(), "HmacSHA1"));
        byte[] rawHmac = mac.doFinal(builder.toString().getBytes(StandardCharsets.UTF_8));
        return DatatypeConverter.printBase64Binary(rawHmac);
    }
}
```

```php
<?php
// To download and install Twilio helper library visit
// https://www.twilio.com/docs/libraries/php
require_once 'vendor/autoload.php';

use Twilio\Security\RequestValidator;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

// Your auth token from twilio.com/user/account
// To set up environmental variables, see http://twil.io/secure
$token = getenv('TWILIO_AUTH_TOKEN');

// Initialize the validator
$validator = new RequestValidator($token);

$url = 'https://mycompany.com/myapp';

$postVars = array(
    'CallSid' => 'CA1234567890ABCDE',
    'Caller' => '+12349013030',
    'Digits' => '1234',
    'From' => '+12349013030',
    'To' => '+18005551212'
);

function testUrl($method, $url, $params, $valid) {
    global $validator;
    $client = new Client();
    
    if($method == 'GET'){
        $url .= "?" . http_build_query($params);
        $params = [];
    }

    $signature = $validator->computeSignature($valid ? $url : 'http://invalid.com', $params);
    echo $signature . "\n";
    try {
        $response = $client->request($method, $url, [
            'form_params' => $params,
            'headers' => [
                'X-Twilio-Signature' => $signature,
            ]
        ]);
    } catch (ClientException $e) {
        $response = $e->getResponse();
    }
    $validStr = $valid ? "valid" : "invalid";
    echo "HTTP {$method} with {$validStr} signature returned {$response->getStatusCode()}\n";
}

testUrl('GET', $url, $postVars, true);
testUrl('GET', $url, $postVars, false);
testUrl('POST', $url, $postVars, true);
testUrl('POST', $url, $postVars, false);
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'rubygems' # This line not needed for ruby > 1.8
require 'twilio-ruby'
require 'httparty'

# Get your Auth Token from https://www.twilio.com/console
# To set up environmental variables, see http://twil.io/secure
auth_token = ENV['TWILIO_AUTH_TOKEN']
@validator = Twilio::Security::RequestValidator.new(auth_token)

url = 'https://mycompany.com/myapp'
params = {
  'CallSid' => 'CA1234567890ABCDE',
  'Caller'  => '+12349013030',
  'Digits'  => '1234',
  'From'    => '+12349013030',
  'To'      => '+18005551212'
}

def test_url(method, url, params, valid)
    if method == 'GET'
        url += '?' + URI.encode_www_form(params)
        params = {}
    end

    signature = @validator.build_signature_for(valid ? url : "http://invalid.com", params)
    headers = {'X-Twilio-Signature': signature}
    if method == 'GET'
      response = HTTParty.get(url, headers: headers)
    else
      response = HTTParty.post(url, body: params, headers: headers)
    end
    valid_str = valid ? 'valid' : 'invalid'
    puts "HTTP #{method} with #{valid_str} signature returned #{response.code}"
end

test_url('GET', url, params, true)
test_url('GET', url, params, false)
test_url('POST', url, params, true)
test_url('POST', url, params, false)
```

Test the validity of your webhook signature (application/json body)

```js
// Get twilio-node from twilio.com/docs/libraries/node
const webhooks = require('twilio/lib/webhooks/webhooks');
const request = require('request');

// Your Auth Token from twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN;

// The Twilio request URL
const url =
  'https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9';

// The post variables in Twilio's request
const params = {};
const body = '{"CallSid":"CA1234567890ABCDE","Caller":"+12349013030"}';

function testUrl(method, url, params, valid) {
  const signatureUrl = valid ? url : 'http://invalid.com';
  const signature = webhooks.getExpectedTwilioSignature(
    authToken,
    signatureUrl,
    params
  );
  const options = {
    method: method,
    url: url,
    body: body,
    headers: {
      'X-Twilio-Signature': signature,
      'Content-Type': 'application/json',
    },
  };

  request(options, function (error, response, body) {
    const validStr = valid ? 'valid' : 'invalid';
    console.log(
      `HTTP ${method} with ${validStr} signature returned ${response.statusCode}`
    );
  });
}

testUrl('GET', url, params, true);
testUrl('GET', url, params, false);
testUrl('POST', url, params, true);
testUrl('POST', url, params, false);
```

```py
# Download the twilio-python library from twilio.com/docs/python/install
from twilio.request_validator import RequestValidator
from requests.auth import HTTPDigestAuth
from requests.auth import HTTPBasicAuth
import requests
import urllib
import os

# Your Auth Token from twilio.com/user/account saved as an environment variable
# Remember never to hard code your auth token in code, browser Javascript, or distribute it in mobile apps
# To set up environmental variables, see http://twil.io/secure
auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
validator = RequestValidator(auth_token)

# Replace this URL with your unique URL
url = "https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9"
# User credentials if required by your web server. Change to 'HTTPBasicAuth' if needed
auth = HTTPDigestAuth('username', 'password')

params = {}
body = """{"CallSid":"CA1234567890ABCDE","Caller":"+12349013030"}"""

def test_url(method, url, params, valid):
    if valid:
        signature = validator.compute_signature(url, params)
    else:
        signature = validator.compute_signature("http://invalid.com", params)

    headers = {'X-Twilio-Signature': signature,'Content-Type: application/json'}
    response = requests.request(method, url, headers=headers, data=body, auth=auth)
    print('HTTP {0} with {1} signature returned {2}'.format(method, 'valid' if valid else 'invalid', response.status_code))

test_url('GET', url, params, True)
test_url('GET', url, params, False)
test_url('POST', url, params, True)
test_url('POST', url, params, False)
```

```cs
// Download the twilio-csharp library from
// https://www.twilio.com/docs/libraries/csharp#installation
using System;
using System.Collections.Generic;
using Twilio.Security;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text;
using System.Security.Cryptography;

class Example
{
    // Your Auth Token from twilio.com/console
    static readonly string AuthToken = Environment.GetEnvironmentVariable("AUTH_TOKEN");

    static async Task Main(string[] args)
    {
        // The Twilio request URL
        const string url = "https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9";

        const string body = "{\"CallSid\":\"CA1234567890ABCDE\",\"Caller\":\"+12349013030\"}";

        await TestUrl("POST", url, body, true);
        await TestUrl("POST", url, body, false);
        await TestUrl("GET", url, body, true);
        await TestUrl("GET", url, body, false);
    }

    private static async Task TestUrl(string method, string url, string body, bool valid) {
        var client = new HttpClient();

        var signature = ComputeSignature(valid ? url : "http://invalid.com");
        client.DefaultRequestHeaders.Add("X-Twilio-Signature", signature);
    
        var request = new HttpRequestMessage
        {
            Method = (method == "GET" ? HttpMethod.Get : HttpMethod.Post),
            RequestUri = new Uri(url),
            Content = new StringContent(
                body,
                Encoding.UTF8,
                "application/json"
            )
        };
        var response = await client.SendAsync(request);

        var validStr = valid ? "valid" : "invalid";
        Console.WriteLine($"HTTP {method} with {validStr} signature returned {response.StatusCode}");
    }

    private static string ComputeSignature(string url){
        var b = new StringBuilder(url);
        var hmac = new HMACSHA1(Encoding.UTF8.GetBytes(AuthToken));
        var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(b.ToString()));
        return Convert.ToBase64String(hash);
    }
}
```

```java
import org.apache.http.HttpHeaders;
import org.apache.http.HttpResponse;
import org.apache.http.entity.StringEntity;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.client.methods.RequestBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class Application {

    // Your Auth Token from twilio.com/user/account
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    // Initialize the validator
    public static void main(String[] args) throws Exception {

        // The Twilio request URL
        String url = "https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9";

        // The post body in Twilio's request
        String body = "{\"CallSid\":\"CA1234567890ABCDE\",\"Caller\":\"+12349013030\"}";

        TestUrl("GET", url, body, true);
        TestUrl("GET", url, body, false);
        TestUrl("POST", url, body, true);
        TestUrl("POST", url, body, false);
    }

    private static void TestUrl(
            String method, String url, String body, boolean valid) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();

        String signature = ComputeSignature(valid ? url : "http://invalid.com");

        HttpUriRequest request;
        if("GET".equals(method)) {
            request = RequestBuilder
                .get(url)
                .setEntity(new StringEntity(body))
                .setHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .setHeader("X-Twilio-Signature", signature)
                .build();
        } else {
            request = RequestBuilder
                .post(url)
                .setEntity(new StringEntity(body))
                .setHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .setHeader("X-Twilio-Signature", signature)
                .build();
        }

        HttpResponse response = client.execute(request);

        System.out.printf("HTTP %s with %s signature returned %s\n", method, valid, response.getStatusLine());
    }

    private static String ComputeSignature(String url) throws Exception{
        StringBuilder builder = new StringBuilder(url);
        Mac mac = Mac.getInstance("HmacSHA1");
        mac.init(new SecretKeySpec(AUTH_TOKEN.getBytes(), "HmacSHA1"));
        byte[] rawHmac = mac.doFinal(builder.toString().getBytes(StandardCharsets.UTF_8));
        return DatatypeConverter.printBase64Binary(rawHmac);
    }
}
```

```php
<?php
// To download and install Twilio helper library visit
// https://www.twilio.com/docs/libraries/php
require_once 'vendor/autoload.php';

use Twilio\Security\RequestValidator;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

// Your auth token from twilio.com/user/account
// To set up environmental variables, see http://twil.io/secure
$token = getenv('TWILIO_AUTH_TOKEN');

// Initialize the validator
$validator = new RequestValidator($token);

$url = 'https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9';

$body = "{\"CallSid\":\"CA1234567890ABCDE\",\"Caller\":\"+12349013030\"}";

function testUrl($method, $url, $body, $valid) {
    global $validator;
    $client = new Client();

    $signature = $validator->computeSignature($valid ? $url : 'http://invalid.com', array());
    echo $signature . "\n";
    try {
        $response = $client->request($method, $url, [
            'body' => $body,
            'headers' => [
                'X-Twilio-Signature' => $signature,
                'Content-Type' => 'application/json'
            ]
        ]);
    } catch (ClientException $e) {
        $response = $e->getResponse();
    }
    $validStr = $valid ? "valid" : "invalid";
    echo "HTTP {$method} with {$validStr} signature returned {$response->getStatusCode()}\n";
}

testUrl('GET', $url, $body, true);
testUrl('GET', $url, $body, false);
testUrl('POST', $url, $body, true);
testUrl('POST', $url, $body, false);
```

```rb
# Get twilio-ruby from twilio.com/docs/ruby/install
require 'rubygems' # This line not needed for ruby > 1.8
require 'twilio-ruby'
require 'httparty'

# Get your Auth Token from https://www.twilio.com/console
# To set up environmental variables, see http://twil.io/secure
auth_token = ENV['TWILIO_AUTH_TOKEN']
@validator = Twilio::Security::RequestValidator.new(auth_token)

url = 'https://example.com/myapp?bodySHA256=5ccde7145dfb8f56479710896586cb9d5911809d83afbe34627818790db0aec9'
body = '{"CallSid":"CA1234567890ABCDE","Caller":"+12349013030"}'

def test_url(method, url, body, valid)
    signature = @validator.build_signature_for(valid ? url : "http://invalid.com", {})
    headers = {'X-Twilio-Signature': signature, 'Content-Type': 'application/json'}
    if method == 'GET'
      response = HTTParty.get(url, body: body, headers: headers)
    else
      response = HTTParty.post(url, body: body, headers: headers)
    end
    valid_str = valid ? 'valid' : 'invalid'
    puts "HTTP #{method} with #{valid_str} signature returned #{response.code}"
end

test_url('GET', url, body, true)
test_url('GET', url, body, false)
test_url('POST', url, body, true)
test_url('POST', url, body, false)
```

### Validation using the Twilio SDKs \[#validation-with-libraries]

All the official [Twilio SDKs](/docs/libraries "Twilio Helper
Libraries in PHP, C#, Ruby, Java, Python, and others") ship with a Utilities
class which facilitates request validation. Head over to the [libraries
page](/docs/libraries "Twilio SDKs in PHP, C#, Ruby, Java,
Python, and others") to download the library for your language of choice.

### Your Auth Token \[#auth-token]

Keep your AuthToken secure. It provides access to the REST API and to request signatures. [Learn how to secure this token](/docs/usage/secure-credentials) using environment variables.

## What's next?

* See [Secure your credentials](/docs/usage/secure-credentials) to learn best practices for storing and managing your Twilio credentials.
* See [Twilio Helper Libraries](/docs/libraries) to download SDKs with built-in security features for your programming language.
* See [API security best practices](https://www.twilio.com/docs/usage/api) to learn how to interact securely with the Twilio API.
