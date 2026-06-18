# Twilio SendGrid

## Twilio SendGrid

Build transactional and marketing email solutions with Twilio SendGrid.

[Let's build](#send-your-first-email)

## Tutorial

```js !sample
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'recipient@example.com',
  from: 'sender@example.com',
  subject: 'Ahoy!',
  html: 'Ahoy, World!',
};

sgMail
  .send(msg)
  .then((error) => console.error(error));
```

1. Complete Domain Authentication.
2. Send an email using the Mail Send API.
3. Twilio SendGrid sends the "Ahoy, World!" email to the recipient.

Tutorial code output: "Ahoy, world!"

[Find more examples](/docs/sendgrid/api-reference/mail-send/mail-send)

## Send your first email

Get started with the Twilio SendGrid Mail Send API and the open-source SDKs.
To send your first message, use the following sample code in your preferred programming language.

## C\#

```csharp
using System;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

class Program
{
    static async Task Main()
    {
        var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
        var client = new SendGridClient(apiKey);
        var from = new EmailAddress("test@example.com", "Example User");
        var subject = "Sending with Twilio SendGrid is Fun";
        var to = new EmailAddress("test@example.com", "Example User");
        var plainTextContent = "and easy to do anywhere, even with C#";
        var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
        var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
        var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
    }
}
```

## Go

```go
package main

import (
	"fmt"
	"log"
	"os"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

func main() {
	from := mail.NewEmail("Example User", "test@example.com")
	subject := "Sending with Twilio SendGrid is Fun"
	to := mail.NewEmail("Example User", "test@example.com")
	plainTextContent := "and easy to do anywhere, even with Go"
	htmlContent := "<strong>and easy to do anywhere, even with Go</strong>"
	message := mail.NewSingleEmail(from, subject, to, plainTextContent, htmlContent)
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))
	response, err := client.Send(message)
	if err != nil {
		log.Println(err)
	} else {
		fmt.Println(response.StatusCode)
		fmt.Println(response.Body)
		fmt.Println(response.Headers)
	}
}
```

## Java

```java
import com.sendgrid.*;
import java.io.IOException;

public class Example {
  public static void main(String[] args) throws IOException {
    Email from = new Email("test@example.com");
    String subject = "Sending with Twilio SendGrid is Fun";
    Email to = new Email("test@example.com");
    Content content = new Content("text/plain", "and easy to do anywhere, even with Java");
    Mail mail = new Mail(from, subject, to, content);

    SendGrid sg = new SendGrid(System.getenv("SENDGRID_API_KEY"));
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

## Node.js

```js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'test@example.com',
  from: 'test@example.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

(async () => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  }
})();
```

## PHP

```php
$email = new \SendGrid\Mail\Mail();
$email->setFrom("test@example.com", "Example User");
$email->setSubject("Sending with Twilio SendGrid is Fun");
$email->addTo("test@example.com", "Example User");
$email->addContent("text/plain", "and easy to do anywhere, even with PHP");
$email->addContent(
    "text/html", "<strong>and easy to do anywhere, even with PHP</strong>"
);
$sendgrid = new \SendGrid(getenv('SENDGRID_API_KEY'));
try {
    $response = $sendgrid->send($email);
    print $response->statusCode() . "\n";
    print_r($response->headers());
    print $response->body() . "\n";
} catch (Exception $e) {
    echo 'Caught exception: '. $e->getMessage() ."\n";
}
```

## Python

```python
import sendgrid
import os
from sendgrid.helpers.mail import *

sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
from_email = Email("test@example.com")
to_email = To("test@example.com")
subject = "Sending with SendGrid is Fun"
content = Content("text/plain", "and easy to do anywhere, even with Python")
mail = Mail(from_email, to_email, subject, content)
response = sg.client.mail.send.post(request_body=mail.get())
print(response.status_code)
print(response.body)
print(response.headers)
```

## Ruby

```ruby
require 'sendgrid-ruby'
include SendGrid

from = SendGrid::Email.new(email: 'test@example.com')
to = SendGrid::Email.new(email: 'test@example.com')
subject = 'Sending with Twilio SendGrid is Fun'
content = SendGrid::Content.new(type: 'text/plain', value: 'and easy to do anywhere, even with Ruby')
mail = SendGrid::Mail.new(from, subject, to, content)

sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
response = sg.client.mail._('send').post(request_body: mail.to_json)
puts response.status_code
puts response.body
puts response.parsed_body
puts response.headers
```

### Email API quickstarts

To implement the previous code sample in your preferred programming language, jump to a quickstart for a full guide.

* [C#](/docs/sendgrid/for-developers/sending-email/email-api-quickstart-for-c)
* [Go](/docs/sendgrid/for-developers/sending-email/quickstart-go)
* [Java](/docs/sendgrid/for-developers/sending-email/email-quickstart-for-java)
* [Node.js](/docs/sendgrid/for-developers/sending-email/quickstart-nodejs)
* [PHP](/docs/sendgrid/for-developers/sending-email/quickstart-php)
* [Python](/docs/sendgrid/for-developers/sending-email/quickstart-python)
* [Ruby](/docs/sendgrid/for-developers/sending-email/quickstart-ruby)

## Do more with email

Twilio SendGrid offers tools that build your email communications program.
Gather data from and report on the effectiveness of your email campaigns. Add content and accept files through inbound email.
Use Twilio SendGrid to send and receive email or integrate with a cloud partner for email processing.

### Beyond sending your first email

* [Get started with the Email API][email-api-onboarding]
* [Set up domain authentication][domain-authentication]
* [Review the SendGrid v3 API reference][sg-api-reference]
* [Review the Email glossary][email-glossary]

### Send email

* [Send email using SMTP][send-smtp-email]
* [Build an X-SMTPAPI Header][build-x-smtpapi-header]
* [Send email using Microsoft Azure][microsoft-azure]

### Templates and dynamic data

* [Send an email with Dynamic Templates][send-templates]
* [Send personalized email messages][email-personalize]
* [Personalize messages with Handlebars][use-handlebars]

### Analytics and reporting

* [Get started with the Event webhook][get-started-event-webhook]
* [Review the Event webhook reference][event-webhook-reference]
* [Use the Email Activity Feed][email-activity-feed]
* [Review the SendGrid Engagement Quality API][sg-eq-api]

### Account and settings

* [API Keys](/docs/sendgrid/ui/account-and-settings/api-keys)
* [Subusers](/docs/sendgrid/ui/account-and-settings/subusers)
* [Teammates](/docs/sendgrid/ui/account-and-settings/teammates)
* [Domain Authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication)
* [Single Sign-On (SSO)](/docs/sendgrid/ui/account-and-settings/sso)

### Parsing email

* [Configure the Inbound Parse webhook][inbound-parse-config]
* [Review Inbound Parse API][inbound-parse-api-ref]

### SDKs and tools

* [C#](https://github.com/sendgrid/sendgrid-csharp)
* [Go](https://github.com/sendgrid/sendgrid-go)
* [Java](https://github.com/sendgrid/sendgrid-java)
* [Node.js](https://github.com/sendgrid/sendgrid-nodejs)
* [PHP](https://github.com/sendgrid/sendgrid-php)
* [Python](https://github.com/sendgrid/sendgrid-python)
* [Ruby](https://github.com/sendgrid/sendgrid-ruby)
* [OpenAPI](https://github.com/twilio/sendgrid-oai)

## Get started with Marketing Campaigns

Create well-designed, personalized messages for your Marketing Campaigns.

### Build and send with Marketing Campaigns

* [Send email using Marketing Campaigns][mktg-campaigns-email]
* [Get started with automation][get-started-automation]

### Manage contacts

* [Create and manage contacts][contacts-manage]
* [Build your contact list][contacts-build]
* [Segment your contacts][contacts-segment]
* [Use custom fields][contacts-custom-fields]

### Design your messages

* [Build templates with email designs][build-templates]
* [Design messages with the Design and Code Editor][design-and-code-editor]
* [Add dynamic content with Handlebars in Marketing Campaigns][dynamic-content-handlebars]

## Related Products

Build your customer engagement infrastructure that fits the unique requirements of your business with the other communication channels from Twilio.

### Messaging

Send and receive Short Message Service (SMS), Multimedia Messaging Service (MMS), Rich Communication Services (RCS), or WhatsApp messages with Twilio Programmable Messaging.

[Product Docs](/docs/messaging)

### Voice

Send and receive voice calls through your app with Twilio Programmable Voice.

[Product Docs](/docs/voice)

### Flex

Build your digital engagement center for sales and customer support teams with Twilio Flex.

[Product Docs](/docs/flex)

[build-templates]: /docs/sendgrid/ui/sending-email/working-with-marketing-campaigns-email-designs

[build-x-smtpapi-header]: /docs/sendgrid/for-developers/sending-email/building-an-x-smtpapi-header

[contacts-build]: /docs/sendgrid/ui/managing-contacts/building-your-contact-list

[contacts-custom-fields]: /docs/sendgrid/ui/managing-contacts/custom-fields

[contacts-manage]: /docs/sendgrid/ui/managing-contacts/create-and-manage-contacts

[contacts-segment]: /docs/sendgrid/ui/managing-contacts/segmenting-your-contacts

[design-and-code-editor]: /docs/sendgrid/ui/sending-email/editor

[domain-authentication]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication#set-up-domain-authentication

[dynamic-content-handlebars]: /docs/sendgrid/ui/sending-email/adding-dynamic-content-with-handlebars-in-marketing-campaigns

[email-activity-feed]: /docs/sendgrid/ui/analytics-and-reporting/email-activity-feed

[email-api-onboarding]: /docs/sendgrid/onboarding/email-api

[email-glossary]: /docs/sendgrid/glossary/dmarc

[email-personalize]: /docs/sendgrid/for-developers/sending-email/personalizations

[event-webhook-reference]: /docs/sendgrid/for-developers/tracking-events/event

[get-started-automation]: /docs/sendgrid/ui/sending-email/getting-started-with-automation

[get-started-event-webhook]: /docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook

[inbound-parse-api-ref]: /docs/sendgrid/api-reference/settings-inbound-parse/

[inbound-parse-config]: /docs/sendgrid/for-developers/parsing-email/setting-up-the-inbound-parse-webhook

[microsoft-azure]: /docs/sendgrid/for-developers/partners/microsoft-azure-2021

[mktg-campaigns-email]: /docs/sendgrid/ui/sending-email/how-to-send-email-with-marketing-campaigns

[send-smtp-email]: /docs/sendgrid/for-developers/sending-email/getting-started-smtp

[send-templates]: /docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates

[sg-api-reference]: /docs/sendgrid/api-reference

[sg-eq-api]: /docs/sendgrid/api-reference/sendgrid-engagement-quality-api

[use-handlebars]: /docs/sendgrid/for-developers/sending-email/using-handlebars
