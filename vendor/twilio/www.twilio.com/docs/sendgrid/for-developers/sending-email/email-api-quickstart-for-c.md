# Email API Quickstart for C\#

This quickstart covers sending your first email using the [Twilio SendGrid Mail Send API][] and [C#][ms-csharp].

## Prerequisites

These are C# installation prerequisites:

* .NET Framework 4.0+ (only available on Windows)
* .NET Core 1.0+
* .NET Standard 1.3+

Be sure to perform the following prerequisites to complete this tutorial. You can skip ahead if you've already completed these tasks.

1. Sign up for a Twilio SendGrid account.
2. Enable Two-factor authentication.
3. Create and store a SendGrid API Key with **Mail Send** > **Full Access** permissions.
4. Complete Domain Authentication.
5. Install C#.

### Sign up for a Twilio SendGrid account

When you sign up for a [SendGrid account](https://signup.sendgrid.com/), you can start a [free trial](/docs/sendgrid/ui/account-and-settings/upgrading-your-plan#free-trial)that allows you to send up to 100 emails per day for 60 days. After the 60-day trial period ends, you'll need to [upgrade your plan](/docs/sendgrid/ui/account-and-settings/upgrading-your-plan) to continue sending emails. For more plan options, see [SendGrid pricing](https://sendgrid.com/pricing/).

### Enable two-factor authentication

Twilio SendGrid requires that you enable *two-factor authentication* (TFA). You can enable TFA with SMS or with an authentication app. See the [TFA section of our authentication documentation][tfa] for instructions.

### Create and store a Twilio SendGrid API key

Unlike a username and password — credentials that allow access to your full account — an API key is authorized to perform a limited scope of actions. If your API key is compromised, you can also cycle it (delete and create another) without changing your other account credentials.

Visit our [API Key documentation][] for instructions on creating an API key and [storing an API key in an environment variable][]. To complete this tutorial, you can create a Restricted Access API key with **Mail Send** > **Full Access** permissions only, which will allow you to send email and schedule emails to be sent later. You can edit the permissions assigned to an API key later to work with additional services.

### Verify your Sender Identity

To ensure our customers maintain the best possible sender reputations and to uphold legitimate sending behavior, we require customers to verify their [Sender Identities][] by completing [Domain Authentication][]. A Sender Identity represents your 'From' email address—the address your recipients see as the sender of your emails.

> \[!NOTE]
>
> To get started quickly, you may be able to skip Domain Authentication and begin by completing [Single Sender Verification][]. Single Sender Verification is recommended for testing only. Some email providers have [DMARC][] policies that restrict email from being delivered using their domains. For the best experience, complete Domain Authentication. Domain Authentication is also required to upgrade from a free account.

### Install C\#

If you do not already have a version of C# installed, visit the [.NET Framework website][ms-csharp] to download and install a version appropriate for your operating system.

#### C# version check

Check your C# version by opening your terminal (also known as a command line or console) and typing the following command.

```shell
dotnet --version
```

#### Initialize your project

Using a [Twilio SendGrid SDK][tsg-csharp] is the fastest way to deliver your first email.

Start by creating a project folder for this app. You can name the project anything you like.

If you do not have a version of NuGet installed, you can download and install it using the NuGet installation instructions on [docs.microsoft.com][].

#### Install the SDK

To use Twilio SendGrid in your C# project, you can either download the Twilio SendGrid C# .NET libraries directly from our Github repository or if you have the NuGet package manager installed, you can grab them automatically:

```shell
dotnet add package SendGrid

//use Twilio SendGrid wiith HttpClientFactory
dotnet add package SendGrid.Extensions.DependencyInjection
```

Once you have the Twilio SendGrid library installed, you can start making calls to Twilio SendGrid in your code. For sample implementations, see the [.NET Core Example][] and the [.NET 4.5.2 Example][] folders.

## How to Send an Email with the SendGrid API

You're now ready to write some code. First, create a file in your project directory. You can use `Program.cs`.

## Complete code block

The following C# block contains all the code needed to successfully deliver a message with the Twilio SendGrid Mail Send API. You can copy this code, modify the `from_email` and `to_email` variables, and run the code if you like. We'll break down each piece of this code in the following sections.

```csharp
/*
* Hello Email
* The following is the minimum needed code to send a simple email. Use this exam* ple, and modify the apiKey, from and to variables:
*/

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
       var from_email = new EmailAddress("test@example.com", "Example User");
       var subject = "Sending with Twilio SendGrid is Fun";
       var to_email = new EmailAddress("test@example.com", "Example User");
       var plainTextContent = "and easy to do anywhere, even with C#";
       var htmlContent = "<strong>and easy to do anywhere, even with C#</strong>";
       var msg = MailHelper.CreateSingleEmail(from_email, to_email, subject, plainTextContent, htmlContent);
       var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
   }
}
```

## Build your API call

Your API call must have the following components:

* A host (the host for Web API v3 requests is always `https://api.sendgrid.com/v3/`)
* An API key passed in an Authorization Header
* A request (when submitting data to a resource via `POST` or `PUT`, you must submit your request body in JSON format)

In your `Program.cs` file, import the Twilio SendGrid SDK. The library will handle setting the Host, `https://api.sendgrid.com/v3/`, for you.

```csharp
using Sendgrid;
```

Next, use the API key you set up earlier. Remember, the API key is stored in an environment variable, so you can use the `Environment.GetEnvironmentVariable(<name>)` method to access it. This means we also need to import the System namespace.

```csharp
using System;
```

Assign the key to a variable named `apiKey`. Using the SDK's `SendGridClient()` method, pass your key to the v3 API in an Authorization header using Bearer token authentication.

```csharp
 var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
 var client = new SendGridClient(apiKey);
```

Now you're ready to set up the `from_email`, `to_email`, `subject`, and message body `content`. These values are passed to the API in a [`personalizations`][] object when using the v3 Mail Send API. You can assign each of these values to variables, and the Twilio SendGrid library will handle creating a personalizations object for you.

First, import the `Sendgrid.Helpers.Mail` namespace.

```csharp
using Sendgrid.Helpers.Mail;
```

With the helpers imported, define and assign values for `from_email`, `to_email`, `subject`, and `content` variables. Assigning an email address like `from_email = new EmailAddress("test@example.com","Test User"` will construct an EmailAddress object using the provided email and name arguments respectively. Be sure to assign the `to_email` to an address with an inbox you can access.

You have two options for the content type: `text/plain` or `text/html`.

```csharp
 var from_email = new EmailAddress("test@example.com", "Example User");
 var subject = "Sending with Twilio SendGrid is Fun";
 var to_email = new EmailAddress("test@example.com", "Example User");
 var plainTextContent = "and easy to do anywhere, even with C#";
 var htmlContent = "<strong>and easy to do anywhere, even with C#</strong";
```

To properly construct the message, pass each of the previous variables into the Twilio SendGrid SDK's CreateSingleEmail method's parameters which returns a SendGridMessage object. You can assign this to a variable named `msg`.

```csharp
var msg = MailHelper.CreateSingleEmail(from_email, to_email, subject, plainTextContent, htmlContent);
```

For more advanced use cases, you can build the SendGridMessage object yourself with these minimum required settings:

```csharp
var msg = new SendGridMessage()
{
    From = new EmailAddress("from@example.com", "Golden Dawn"),
    Subject = "Sending With Twilio SendGrid is Fun",
    PlainTextContent = "and easy to do anywhere, even with C#",
    HtmlContent = "<strong>and easy to do anywhere, even with C#</strong>"
};
msg.AddTo(new EmailAddress("to@example.com", "To User"));
```

Lastly, you need to make a request to the Twilio SendGrid Mail Send API to deliver your message.

```csharp
var response = await client.SendEmailAsync(msg).ConfigureAwait(false);
```

The SDK uses Twilio SendGrid's [csharp-http-client][] library to construct the request URL by chaining together portions of your desired path.

The path to the Twilio SendGrid v3 Mail Send endpoint is `https://api.sendgrid.com/v3/mail/send`. The Twilio SendGrid SDK has set the client for you, so the base `https://api.sendgrid.com/v3` is taken care of when we make a call to the SendGridClient objects `RequestAsync` method.

With the baseUrl built, we must pass the arguments `method`, `requestBody`, `queryParams`, `urlPath`, and `cancellationToken`, to the RequestAsync method with all being optional except the `method` parameter. To submit a `GET` request you can use the `SendGridClient.Method.GET`. The `requestBody` and `queryParams` must be provided JSON formatted values.

```csharp
using System;
using System.Threading.Tasks;
using SendGrid;

class Program
{
    static async Task Main()
    {
        var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
        var client = new SendGridClient(apiKey);
        var queryParams = @"{'limit': 100}";
        var response = await client.RequestAsync(
                    method: SendGridClient.Method.GET,
                    urlPath: "supression/bounce",
            queryParams: queryParams)
                .ConfigureAwait(false);
    }
}

```

With all this code in place, you can run your `Program.cs` file with C# to send the email.

If you receive a [202 status code][] printed to the console, your message was sent successfully. Check the inbox of the `"to_email"` address, and you should see your demo message.

If you don't see the email, you may need to check your spam folder.

## Troubleshooting

If you receive an error message, see the [response message documentation][http-codes].

## API response messages

All responses are returned in JSON format. We specify this by sending the `Content-Type` header. The Web API v3 provides a selection of [response codes][http-codes], [content-type headers][], and [pagination][] options to help you interpret the responses to your API requests.

## Additional resources

* [How to Send Email with C# and Twilio SendGrid][]
* [Receive an SMS and email it using Twilio SendGrid, C# and .NET Core][]

## Next steps

To learn more about the Twilio SendGrid API, see the following resources.

* [API Reference][]
* [Sending Email with Dynamic Transactional Templates][]
* [Getting Started with the Event Webhook][]
* [The Email Activity Feed][]
* [Sender Authentication][]
* [Twilio SendGrid SDK for C#][tsg-csharp]

[.NET 4.5.2 Example]: https://github.com/sendgrid/sendgrid-csharp/tree/main/ExampleNet45Project

[.NET Core Example]: https://github.com/sendgrid/sendgrid-csharp/tree/main/ExampleCoreProject

[`personalizations`]: https://www.notion.so/for-developers/sending-email/personalizations

[202 status code]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/202

[API Key documentation]: /docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/authentication#api-keys

[API Reference]: /docs/sendgrid/api-reference

[content-type headers]: /docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#content-type-header

[csharp-http-client]: https://github.com/sendgrid/csharp-http-client

[DMARC]: /docs/sendgrid/glossary/dmarc

[docs.microsoft.com]: https://docs.microsoft.com

[Domain Authentication]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication

[Getting Started with the Event Webhook]: /docs/sendgrid/for-developers/tracking-events/getting-started-event-webhook

[How to Send Email with C# and Twilio SendGrid]: https://youtu.be/ddSymc0hE0A

[http-codes]: /docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#status-codes

[ms-csharp]: https://dotnet.microsoft.com/download

[pagination]: /docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/responses#pagination

[Receive an SMS and email it using Twilio SendGrid, C# and .NET Core]: https://www.twilio.com/blog/receive-an-sms-and-email-it-using-twilio-sendgrid-c-and-net-core

[Sender Authentication]: /docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication

[Sender Identities]: /docs/sendgrid/for-developers/sending-email/sender-identity

[Sending Email with Dynamic Transactional Templates]: /docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates

[Single Sender Verification]: /docs/sendgrid/ui/sending-email/sender-verification

[storing an API key in an environment variable]: /docs/sendgrid/ui/account-and-settings/api-keys#storing-an-api-key-in-an-environment-variable

[tfa]: /docs/sendgrid/ui/account-and-settings/two-factor-authentication

[The Email Activity Feed]: /docs/sendgrid/ui/analytics-and-reporting/email-activity-feed

[tsg-csharp]: https://github.com/sendgrid/sendgrid-csharp

[Twilio SendGrid Mail Send API]: /docs/sendgrid/api-reference/mail-send/mail-send
