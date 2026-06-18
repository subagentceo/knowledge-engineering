# TwiML™ for Programmable Messaging

## What is TwiML?

TwiML (*the Twilio Markup Language*) is a set of instructions you can use to tell Twilio what to do when you receive an incoming call, SMS, MMS, or WhatsApp message.

TwiML can be generated using one of the [Twilio Language SDKs](/docs/libraries), or written manually to instruct Twilio on what actions to take in response to various SMS related events.

> \[!NOTE]
>
> Not sending messages? TwiML powers more than just Programmable Messaging - check out the documentation on how to use TwiML with [Programmable Voice](/docs/voice/twiml).

## A basic TwiML Message response example

The following manual TwiML will instruct Twilio to respond to an incoming message with a "Hello World!" reply:

```bash
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message><Body>Hello World!</Body></Message>
</Response>
```

The same TwiML can also be generated using the examples in these following code samples. The *redirect control* allows you to point at another TwiML file from your current file.

Toggle between the code in your language of choice and TwiML in the top bar of the code viewer:

Send Hello World and redirect TwiML control

```js
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const response = new MessagingResponse();
const message = response.message();
message.body('Hello World!');
response.redirect('https://demo.twilio.com/welcome/sms/');

console.log(response.toString());
```

```py
from twilio.twiml.messaging_response import Body, Message, Redirect, MessagingResponse

response = MessagingResponse()
message = Message()
message.body('Hello World!')
response.append(message)
response.redirect('https://demo.twilio.com/welcome/sms/')

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Messaging;


class Example
{
    static void Main()
    {
        var response = new MessagingResponse();
        var message = new Message();
        message.Body("Hello World!");
        response.Append(message);
        response.Redirect(url: new Uri("https://demo.twilio.com/welcome/sms/"));

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.messaging.Body;
import com.twilio.twiml.messaging.Message;
import com.twilio.twiml.messaging.Redirect;
import com.twilio.twiml.MessagingResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Body body = new Body.Builder("Hello World!").build();
        Message message = new Message.Builder().body(body).build();
        Redirect redirect = new Redirect
            .Builder("https://demo.twilio.com/welcome/sms/").build();
        MessagingResponse response = new MessagingResponse.Builder()
            .message(message).redirect(redirect).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Messages([]twiml.Element{
		&twiml.MessagingMessage{
			InnerElements: []twiml.Element{
				&twiml.MessagingBody{
					Message: "Hello World!",
				},
			},
		},
		&twiml.MessagingRedirect{
			Url: "https://demo.twilio.com/welcome/sms/",
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\MessagingResponse;

$response = new MessagingResponse();
$message = $response->message('');
$message->body('Hello World!');
$response->redirect('https://demo.twilio.com/welcome/sms/');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::MessagingResponse.new
response.message do |message|
  message.body('Hello World!')
end
response.redirect('https://demo.twilio.com/welcome/sms/')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message><Body>Hello World!</Body></Message>
    <Redirect>https://demo.twilio.com/welcome/sms/</Redirect>
</Response>
```

> \[!NOTE]
>
> Building an Messaging Application? [The Messaging Quickstarts](/docs/messaging/quickstart) show you how to send, receive, and reply to messages using your programming language of choice.

## Generating TwiML with the Twilio SDKs

Twilio provides SDKs to help you generate TwiML in your favorite language.

For example, here's code demonstrating how to send two unique messages one after the other using SDKs. Select your choice of language to see how it's done:

Send two messages

```js
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const response = new MessagingResponse();
response.message('This is message 1 of 2.');
response.message('This is message 2 of 2.');

console.log(response.toString());
```

```py
from twilio.twiml.messaging_response import Message, MessagingResponse

response = MessagingResponse()
response.message('This is message 1 of 2.')
response.message('This is message 2 of 2.')

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Messaging;


class Example
{
    static void Main()
    {
        var response = new MessagingResponse();
        response.Message("This is message 1 of 2.");
        response.Message("This is message 2 of 2.");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.messaging.Message;
import com.twilio.twiml.MessagingResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Message message = new Message.Builder("This is message 1 of 2.")
            .build();
        Message message2 = new Message.Builder("This is message 2 of 2.")
            .build();
        MessagingResponse response = new MessagingResponse.Builder()
            .message(message).message(message2).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Messages([]twiml.Element{
		&twiml.MessagingMessage{
			Body: "This is message 1 of 2.",
		},
		&twiml.MessagingMessage{
			Body: "This is message 2 of 2.",
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\MessagingResponse;

$response = new MessagingResponse();
$response->message('This is message 1 of 2.');
$response->message('This is message 2 of 2.');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::MessagingResponse.new
response.message(body: 'This is message 1 of 2.')
response.message(body: 'This is message 2 of 2.')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>This is message 1 of 2.</Message>
    <Message>This is message 2 of 2.</Message>
</Response>
```

## Twilio's request to your application

When a message arrives at your Twilio phone number, Twilio sends a request to your web application using the webhook URL that you've specified. For more information about Twilio's request, including the parameters sent to your application, see our guide to [Twilio's Request to your Webhook URL](/docs/messaging/guides/webhook-request).

### Data formats

#### Phone numbers

All phone numbers in requests from Twilio are in [E.164](/docs/glossary/what-e164) format if possible. For example, (415) 555-4345 would come through as '+14155554345'. However, there are occasionally cases where Twilio cannot normalize an incoming caller ID to E.164. In these situations, Twilio will report the raw caller ID string.

If you're using a non-SMS messaging channel, the channel address is used instead of a phone number. A WhatsApp channel address has a `whatsapp:` channel prefix (e.g., `whatsapp:+15551119999`)

#### Dates and times

All dates and times in requests from Twilio are GMT in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format. For example, 6:13 PM PDT on August 19th, 2010 would be 'Fri, 20 Aug 2010 01:13:42 +0000'

#### 'STOP' and opt-out

Twilio handles opt-outs on all long code phone numbers in accordance with industry standards.

[Opt out keywords](https://help.twilio.com/articles/223134027) are passed to your application to notify you that a user has opted out. All future messages to the user are not sent. 'Start' and 'Yes' keywords will also be passed to your application and to opt users back in.

When a user has opted out of a phone number that belongs to a Messaging Service, the user has also been opted out of receiving all messages sent from that particular Messaging Service.

| PARAMETER  | DESCRIPTION                                                              |
| ---------- | ------------------------------------------------------------------------ |
| OptOutType | String indicating whether the message is a STOP, HELP, or START message. |

> \[!WARNING]
>
> The OptOutType parameter is not included in the webhook payload unless you have Advanced Opt-Out enabled on the Messaging Service.

## Responding to Twilio

When a message comes into one of your Twilio numbers, Twilio makes an HTTP request to the message URL configured for that number.

In your response to that request, you can tell Twilio what to do in response to the message. You can configure your number URLs in [Numbers & senders (new Twilio console)](https://1console.twilio.com/go?to=/account/account/__account__/us1/senders-hub/list/phone-numbers/inventory) or [Active Numbers (legacy console)](https://www.twilio.com/console/phone-numbers/incoming).

### Twilio is a well-behaved HTTP client

Twilio behaves just like a web browser, so there's nothing new to learn.

* **Cookies**: Twilio accepts HTTP cookies and will include them in each request, just like a normal web browser.
* **Redirects**: Twilio follows HTTP Redirects (HTTP status codes 301, 307, etc.), just like a normal web browser.
* **Caching**: Twilio will cache files when HTTP headers allow it (via ETag and Last-Modified headers) and when the HTTP method is `GET`, just like a normal web browser.

### Cookies

Twilio will keep cookie state across multiple SMS messages between the same two phone numbers. This allows you to treat the separate messages as a conversation, and store data about the conversation, such as a session identifier, in the cookies for future reference. Twilio will expire the cookies for that conversation after four hours of inactivity.

### Twilio understands MIME types

Twilio does the right thing when your application responds with different MIME types.

| MIME TYPE                            | BEHAVIOR                                                                                                         |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| text/xml, application/xml, text/html | Twilio interprets the returned document as a TwiML XML Instruction Set. This is the most commonly used response. |
| text/plain                           | Twilio returns the content of the text file to the sender in the form of a message.                              |

### How Twilio's TwiML interpreter works

When your application responds to a Twilio request with XML, Twilio runs your document through the TwiML interpreter. The TwiML interpreter only understands a few specially-named XML elements. In TwiML parlance, these are divided into three groups: the root `<Response>` element, "`verbs`" and "`nouns`." We discuss each group below.

The interpreter starts at the top of your TwiML document and executes instructions ("verbs") in order from top to bottom. As an example, the following TwiML Message snippet sends "Hello World" as a message reply to the sender before redirecting control to the TwiML at [https://demo.twilio.com/welcome/sms](https://demo.twilio.com/welcome/sms).

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<Response>
    <Message>Hello World!</Message>
    <Redirect>https://demo.twilio.com/welcome/sms</Redirect>
</Response>
```

You can provide multiple `<Message>` verbs in one TwiML document to send multiple messages. For example:

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<Response>
    <Message>This is message 1 of 2.</Message>
    <Message>This is message 2 of 2.</Message>
</Response>
```

> \[!WARNING]
>
> TwiML elements ("verbs" and "nouns") have case-sensitive names. For example, don't use `<message>` instead of `<Message>`. Attribute names are also case sensitive and [camelCased](https://en.wikipedia.org/wiki/CamelCase). You can use XML comments freely; the interpreter ignores them.

### The `<Response>` element

The root element of Twilio's XML Markup is the `<Response>` element. In any TwiML response to a Twilio request, all verb elements must be nested within this element. Any other structure is considered invalid.

**Example**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Message>I'm hungry!</Message>
</Response>
```

### TwiML messaging verbs

Most XML elements in a TwiML document are TwiML verbs. Verb names are case sensitive, as are their attribute names. There is only one core TwiML Message verb and one secondary verb, with detailed documentation on each. The core verb is:

**[`<Message>`](/docs/messaging/twiml/message)**: Send a message in reply to the incoming message.

> \[!WARNING]
>
> There are certain situations when the TwiML interpreter may not reach verbs in a TwiML document because control flow has passed to a different document. This usually happens when a verb's 'action' attribute is set.
>
> For example, if a `<Message>` is followed by a `<Redirect>`, the `<Redirect>` is unreachable if the `<Message>` verb's `action` URL is set. In this case, the messaging session flow continues with the TwiML received in your response to the `action` URL request.
>
> The following verbs may impact control flow: [`<Message>`](/docs/messaging/twiml/message) and [`<Redirect>`](/docs/messaging/twiml/redirect)

### TwiML nouns

A Noun in TwiML is anything nested inside a verb that is not itself a verb. It's whatever the verb is acting on. This is usually just text. But sometimes, as in the case of `<Message>` with its `<Media>` and `<Body>` nouns, there are nested XML elements that are nouns.

### Status callbacks

You can use [status callbacks](/docs/messaging/guides/track-outbound-message-status) to have Twilio reach out to your app when the status of a message has changed.

Status callbacks do not control application flow, so TwiML does not need to be returned. However, you should respond to status callbacks requests with either a `204 No Content` or a `200 OK` with `Content-Type: text/xml` and an empty `<Response/>` in the body. Failure to do so results in warnings in the [Console](https://console.twilio.com).
