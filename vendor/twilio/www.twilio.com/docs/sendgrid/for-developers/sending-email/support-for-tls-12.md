# Support for TLS 1.2

Twilio SendGrid will support TLS connections using only TLS 1.2 beginning June 5, 2023.

If you attempt to connect to Twilio SendGrid using TLS 1.0 or 1.1, the [TLS handshake](https://en.wikipedia.org/wiki/Transport_Layer_Security) will fail, preventing you from establishing a connection with our APIs. Be sure you are using TLS 1.2 before June 5, 2023 to avoid interruptions to your email services.

## Test your connection

We have provided HTTP and SMTP test endpoints that support only TLS 1.2 to help you prepare for this change. Use these endpoints to test your current environment. If your connection test fails, you may need to upgrade one or more layers of your infrastructure. See the "[Components to check](#components-to-check)" section of this page for a list of components that may require updates.

To test your connection, you should make an HTTP or SMTP request — whichever matches your Twilio SendGrid integration — to one of the following test endpoints. Some options for making this connection are outlined in the next section. We have tried to be as comprehensive as possible with our examples. You do not need to read this entire document. You can skip directly to the testing method that matches your integration or testing preferences.

> \[!WARNING]
>
> Your connection tests should come from your production environment. Testing
> from a local development environment may pick up support for TLS 1.2 from your
> local operating system, which does not indicate if your production environment
> is properly configured to support TLS 1.2.

## Test endpoints

Like the production Twilio SendGrid endpoints, the test HTTP endpoint is on the `.com` top level domain (TLD) and the SMTP test endpoint is on the `.net` TLD. If your test is failing, be sure you are using the correct test URL.

**Test HTTP endpoint**

`tls12.api.sendgrid.com`

**Test SMTP endpoint**

`tls12.smtp.sendgrid.net`

## Test an HTTP connection

### Test with curl

If you are able to make curl requests from your production environment, you can run the following command to verify a connection with our TLS 1.2 test endpoint.

```shell
curl https://tls12.api.sendgrid.com:443 --tlsv1.2 --verbose
```

If your connection is successful, you will see information about the TLS handshake and the message: `Connection #0 to host tls12.api.sendgrid.com left intact`.

The following example shows a partial response from a successful connection. More information will be present in a complete response, which is represented by the "`…`" in this example.

```shell
*   Trying 167.89.118.69:443...
* Connected to tls12.api.sendgrid.com (167.89.118.69) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
* successfully set certificate verify locations:
*  CAfile: /etc/ssl/cert.pem
*  CApath: none
* (304) (OUT), TLS handshake, Client hello (1):
* (304) (IN), TLS handshake, Server hello (2):
* TLSv1.2 (IN), TLS handshake, Certificate (11):
* TLSv1.2 (IN), TLS handshake, Server key exchange (12):
* TLSv1.2 (IN), TLS handshake, Server finished (14):
* TLSv1.2 (OUT), TLS handshake, Client key exchange (16):
* TLSv1.2 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (OUT), TLS handshake, Finished (20):
* TLSv1.2 (IN), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (IN), TLS handshake, Finished (20):
* SSL connection using TLSv1.2 / ECDHE-RSA-AES128-GCM-SHA256
...
* Connection #0 to host tls12.api.sendgrid.com left intact
```

You can also use curl with your SendGrid API key to test your connection to our HTTP test endpoint and the Mail Send API. The email addresses are demos and you must update them to real email addresses to successfully send and receive messages.

```shell
curl https://tls12.api.sendgrid.com/v3/mail/send \
  --tlsv1.2 \
  --header 'Authorization: Bearer <<YOUR API KEY>>' \
  --header 'Content-Type: application/json' \
  --data '{"personalizations": [{"to": [{"email": "recipient@example.com"}]}],"from": {"email": "sender@example.com"},"subject": "Hello, World!","content": [{"type": "text/plain", "value": "Hello from SendGrid!"}]}'
```

### Test with openssl

Unix-like systems, including Linux distributions and macOS, often have the openssl library available. You can test your connection using the following command.

```shell
openssl s_client -connect tls12.api.sendgrid.com:443 -tls1_2
```

A successful connection will return a large response that includes a certificate chain and server certificate. You should see a block labeled `SSL-Session` with the TLSv1.2 protocol listed.

The following example shows a partial response from a successful connection. More information will be present in a complete response, which is represented by the "`…`" in the example. All of this information will be below the certificate chain and server certificate in the response.

```shell
SSL handshake has read 5793 bytes and written 322 bytes
...
SSL-Session:
    Protocol  : TLSv1.2
    Cipher    : ECDHE-RSA-AES256-GCM-SHA384
...
```

### Test with Windows Server

Beginning with [Windows Server 2012, TLS 1.2 is enabled by default](https://learn.microsoft.com/en-us/windows/win32/secauthn/protocols-in-tls-ssl--schannel-ssp-). Windows Server 2008 has reached end of life, so your Windows Server is likely already supporting TLS 1.2 if you are keeping your systems up to date. See the [Microsoft documentation](https://learn.microsoft.com/en-us/windows-server/security/tls/tls-registry-settings?tabs=diffie-hellman#tls-dtls-and-ssl-protocol-version-settings) for help enabling and configuring TLS on Windows Server.

### Test with Twilio SendGrid SDKs

The [SendGrid HTTP SDKs](/docs/sendgrid/for-developers/sending-email/libraries) each offer a client that will set the host of your API requests for you. By default, the host is `https://api.sendgrid.com`. You can modify the host to use the TLS 1.2 test URL, `https://tls12.api.sendgrid.com`, to make a connection with our TLS 1.2 test endpoint.

The following samples show a request to the Mail Send endpoint at `/v3/mail/send`. These code samples are modified from the samples provided in our SDK README files. Please see the SDK you are using for more library-specific documentation. Each library is linked just before its related code sample.

**Note**:The email addresses are demos and you must update them to real email addresses to successfully send and receive messages.

#### C#/.Net

**Library repository**: [https://github.com/sendgrid/sendgrid-csharp](https://github.com/sendgrid/sendgrid-csharp)

```csharp
using SendGrid;
using SendGrid.Helpers.Mail;


var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");


// Override host with TLS 1.2+ endpoint
var host = "https://tls12.api.sendgrid.com";
var client = new SendGridClient(apiKey, host);


var from = new EmailAddress("sender@example.com", "Sender");
var subject = "Sending with Twilio SendGrid is Fun";
var to = new EmailAddress("recipient@example.com", "Recipient");
var plainTextContent = "and easy to do anywhere with C#.";
var htmlContent = "<strong>and easy to do anywhere with C#</strong>.";


var message = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
var response = await client.SendEmailAsync(message);


Console.WriteLine($"Response status code: {response.StatusCode}");
Console.WriteLine($"Response body: {await response.Body.ReadAsStringAsync()}");
```

#### Go

**Library repository**: [https://github.com/sendgrid/sendgrid-go](https://github.com/sendgrid/sendgrid-go)

```go
package main

import (
    "fmt"
    "log"
    "os"

    "github.com/sendgrid/sendgrid-go"
    "github.com/sendgrid/sendgrid-go/helpers/mail"
)

// Override default client to accept TLS 1.2 test host
func NewSendClient(key string, host string) *sendgrid.Client {
    request := sendgrid.GetRequest(key, "/v3/mail/send", host)
    request.Method = "POST"
    return &sendgrid.Client{Request: request}
}

func main() {
    from := mail.NewEmail("Sender", "sender@example.com")
    subject := "Sending with Twilio SendGrid is Fun"
    to := mail.NewEmail("Recipient", "recipient@example.com")
    plainTextContent := "and easy to do anywhere with Go."
    htmlContent := "<strong>and easy to do anywhere with Go.</strong>"
    message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
    // Use TLS 1.2+ endpoint as host
    client := NewSendClient(os.Getenv("SENDGRID_API_KEY"), "https://tls12.api.sendgrid.com")


    response, err := client.Send(message)
    if err != nil {
        log.Println(err)
    } else {
        fmt.Println(response.StatusCode)
        fmt.Println(response.Headers)
    }
}
```

#### Java

**Library repository**: [https://github.com/sendgrid/sendgrid-java](https://github.com/sendgrid/sendgrid-java)

```java
import com.sendgrid.*;
import java.io.IOException;


public class Example {
  public static void main(String[] args) throws IOException {
    Email from = new Email("sender@example.com");
    String subject = "Sending with Twilio SendGrid is Fun";
    Email to = new Email("recipient@example.com");
    Content content = new Content("text/plain", "and easy to do anywhere with Java.");
    Mail mail = new Mail(from, subject, to, content);


    SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
    // Override host with TLS 1.2+ endpoint
    sg.setHost("tls12.api.sendgrid.com");
    Request request = new Request();
    try {
      request.setMethod(Method.POST);
      request.setEndpoint("mail/send");
      request.setBody(mail.build());
      Response response = sg.api(request);
      System.out.println(response.getStatusCode());
      System.out.println(response.getBody());
      System.out.println(response.getHeaders());
    } catch (IOException ex) {
      throw ex;
    }
  }
}
```

#### NodeJS

**Library repository**: [https://github.com/sendgrid/sendgrid-nodejs](https://github.com/sendgrid/sendgrid-nodejs)

```javascript
const sgMail = require("@sendgrid/mail");
const client = require("@sendgrid/client");

// Override baseUrl to use TLS 1.2+ test endpoint
client.setApiKey(process.env.SENDGRID_API_KEY);
client.setDefaultRequest("baseUrl", "https://tls12.api.sendgrid.com");
sgMail.setClient(client);

const msg = {
  to: "recipient@example.com",
  from: "sender@example.com",
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere with NodeJS.",
  html: "<strong>and easy to do anywhere with NodeJS.</strong>",
};

sgMail.send(msg).then(
  () => {},
  (error) => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
);
```

#### PHP

**Library repository**: [https://github.com/sendgrid/sendgrid-php](https://github.com/sendgrid/sendgrid-php)

```php
<?php

declare(strict_types=1);

require 'vendor/autoload.php';

use \SendGrid\Mail\Mail;

$email = new Mail();
// Replace the email address and name with your verified sender
$email->setFrom(
    'sender@example.com',
    'Example Sender'
);
$email->setSubject('Sending with Twilio SendGrid is Fun');
// Replace the email address and name with your recipient
$email->addTo(
    'recipient@example.com',
    'Example Recipient'
);
$email->addContent(
    'text/html',
    '<strong>and easy to do anywhere with PHP.</strong>'
);
// Pass the SendGrid class an options array with the TLS 1.2+ host
$sendgrid = new \SendGrid(
    getenv('SENDGRID_API_KEY'),
    ['host' => 'https://tls12.api.sendgrid.com']
);
try {
    $response = $sendgrid->send($email);
    printf("Response status: %d\n\n", $response->statusCode());


    $headers = array_filter($response->headers());
    echo "Response Headers\n\n";
    foreach ($headers as $header) {
        echo '- ' . $header . "\n";
    }
} catch (Exception $e) {
    echo 'Caught exception: ' . $e->getMessage() . "\n";
}
```

#### Python

**Library repository**: [https://github.com/sendgrid/sendgrid-python](https://github.com/sendgrid/sendgrid-python)

```python
import sendgrid
import os
from sendgrid.helpers.mail import *

# Set host to the TLS 1.2+ test endpoint
sg = sendgrid.SendGridAPIClient(
    host='https://tls12.api.sendgrid.com',
    api_key=os.environ.get('SENDGRID_API_KEY')
)
from_email = Email("sender@example.com")
to_email = To("recipient@example.com")
subject = "Sending with SendGrid is Fun"
content = Content("text/plain", "and easy to do anywhere with Python.")
mail = Mail(from_email, to_email, subject, content)
response = sg.client.mail.send.post(request_body=mail.get())
print(response.status_code)
print(response.body)
print(response.headers)
```

#### Ruby

**Library repository**: [https://github.com/sendgrid/sendgrid-ruby](https://github.com/sendgrid/sendgrid-ruby)

```ruby
require 'sendgrid-ruby'
include SendGrid

from = SendGrid::Email.new(email: 'sender@example.com', name: "Sender")
to = SendGrid::Email.new(email: 'recipient@example.com', name: "Recipient")
subject = 'Sending with Twilio SendGrid is Fun'
content = SendGrid::Content.new(type: 'text/html', value: 'and easy to do anywhere with Ruby.')
mail = SendGrid::Mail.new(from, subject, to, content)

# Set host to TLS 1.2 test endpoint
sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'], host: 'https://tls12.api.sendgrid.com')
response = sg.client.mail._('send').post(request_body: mail.to_json)
puts response.status_code
puts response.headers
```

## Test an SMTP connection

### Test with openssl \[#test-with-openssl-2]

Unix-like systems, including Linux distributions and MacOS, often have the openssl library available. You can test your connection with this library using the following commands.

> \[!WARNING]
>
> Some ISPs block port 25. If your ISP blocks port 25, the test command on that
> port will timeout and fail.

```shell
# Port 25 startTLS
openssl s_client -connect tls12.smtp.sendgrid.net:25 -starttls smtp -tls1_2

# Port 465 SSL
openssl s_client -connect tls12.smtp.sendgrid.net:465 -tls1_2
```

A successful connection will return a large response that includes a certificate chain and server certificate. You should see a block labeled `SSL-Session` with the TLSv1.2 protocol listed.

The following example shows a partial response from a successful connection. More information will be present in a complete response, which is represented by the "`…`" in the example. All of this information will be below the certificate chain and server certificate in the response.

```shell
SSL handshake has read 5779 bytes and written 322 bytes
...
SSL-Session:
    Protocol  : TLSv1.2
    Cipher    : ECDHE-RSA-AES256-GCM-SHA384
...
```

### Test with Twilio SendGrid SDKs

The [SendGrid SMTP SDKs](/docs/sendgrid/for-developers/sending-email/libraries) each provide a way to build a SendGrid [X-SMTPAPI header](/docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header). The X-SMTPAPI header makes it possible to schedule your sends, add categories, and otherwise modify your messages when using the SendGrid SMTP service.

To send your email via SMTP, you may be using one of several SMTP libraries. Some languages, such as Python, take a batteries-included approach and provide an SMTP package as part of their standard libraries. Other languages, such as NodeJS, rely on third-party packages for SMTP support.

When reviewing your code, you will need to look at your SMTP library to test with our TLS 1.2 endpoint rather than the Twilio SendGrid SDK itself. Your use of the Twilio SendGrid SMTP libraries will not require any modifications.

By default, Twilio SendGrid's SMTP host is `smtp.sendgrid.net`. You can modify the host to use the TLS 1.2 test URL, `tls12.smtp.sendgrid.net`, wherever the host is set in your SMTP library.

For your convenience, the Twilio SendGrid SMTP SDKs are linked below.

* [C#/.Net](https://github.com/sendgrid/smtpapi-csharp)
* [Go](https://github.com/sendgrid/smtpapi-go)
* [Java](https://github.com/sendgrid/smtpapi-java)
* [NodeJS](https://github.com/sendgrid/smtpapi-nodejs)
* [PHP](https://github.com/sendgrid/smtpapi-php)
* [Python](https://github.com/sendgrid/smtpapi-python)
* [Ruby](https://github.com/sendgrid/smtpapi-ruby)

## Components to check

If your connection test failed, there are several layers of your infrastructure to check.

* Operating System SSL library
* Application server security components
* Network proxy
* Firewall

Often, you need only to upgrade your operating system's SSL libraries. However, it's possible you will need to update your HTTP client's or SDK's underlying dependencies.

Because every software system is different, you will need to consult with your internal teams to understand the best approach for upgrading your system. We hope the above list provides a good starting point.

### .Net SendGrid SDK

Customers using the [SendGrid C# SDK](https://github.com/sendgrid/sendgrid-csharp) who are not able to connect with our TLS 1.2 endpoint are likely using an older version of the [.Net framework](https://dotnet.microsoft.com/en-us/download/dotnet-framework) that they will need to update. See the following Microsoft documentation for more information.

* [Transport Layer Security (TLS) best practices with the .NET Framework](https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls)
* [Transport Layer Security 1.0 and 1.1 disablement - Microsoft Lifecycle](https://docs.microsoft.com/en-us/lifecycle/announcements/transport-layer-security-1x-disablement)

## Verifying your upgrade

Once you have upgraded the necessary layers of your infrastructure, attempt to connect with TLS 1.2 test endpoints as detailed in the "[Test your connection](#test-your-connection)" section of this document. You should now be able to successfully connect.

Twilio SendGrid's systems already support TLS 1.2, so you can connect to Twilio SendGrid's other endpoints immediately following updates to your own systems.
