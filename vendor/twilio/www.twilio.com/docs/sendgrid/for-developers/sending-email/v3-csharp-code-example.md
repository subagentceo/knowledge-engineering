# v3 API C# Code Example

> \[!NOTE]
>
> We recommend using SendGrid C#, our client library, [available on GitHub](https://github.com/sendgrid/sendgrid-csharp), with full documentation.

> \[!NOTE]
>
> Do you have an [API Key](https://app.sendgrid.com/settings/api_keys) yet? If not, go get one. You're going to need it to integrate!

## Using SendGrid's C# Library

```csharp
// using SendGrid's C# Library
// https://github.com/sendgrid/sendgrid-csharp
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Threading.Tasks;

namespace Example
{
    internal class Example
    {
        private static void Main()
        {
            Execute().Wait();
        }

        static async Task Execute()
        {
            var apiKey = Environment.GetEnvironmentVariable("NAME_OF_THE_ENVIRONMENT_VARIABLE_FOR_YOUR_SENDGRID_KEY");
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("test@example.com", "Example User");
            var subject = "Sending with SendGrid is Fun";
            var to = new EmailAddress("test@example.com", "Example User");
            var plainTextContent = "and easy to do anywhere with C#.";
            var htmlContent = "<strong>and easy to do anywhere with C#.</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }
    }
}
```
