# Secure your C# / ASP.NET Core app by validating incoming Twilio requests

> \[!WARNING]
>
> [See the **ASP.NET** version of this](/docs/usage/tutorials/how-to-secure-your-csharp-aspnet-core-app-by-validating-incoming-twilio-requests)[guide](/docs/usage/tutorials/how-to-secure-your-csharp-aspnet-web-api-app-by-validating-incoming-twilio-requests).

In this guide, we'll cover how to secure your C# / [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/) application by validating incoming requests to your Twilio webhooks are, in fact, from Twilio.

With a few lines of code, we'll write a custom filter attribute for our ASP.NET app that uses the [Twilio C# SDK](https://github.com/twilio/twilio-csharp)'s validator utility. This filter will then be invoked on the controller actions that accept Twilio webhooks to confirm that incoming requests genuinely originated from Twilio.

Let's get started!

> \[!NOTE]
>
> If you don't want to develop your own validation filter, you can install [the Twilio SDK for ASP.NET Core](https://github.com/twilio-labs/twilio-aspnet) and use the library's `[ValidateRequest]` attribute instead that has more features. This library also contains an endpoint filter and a middleware validator.

## Create a custom filter attribute

The Twilio C# SDK includes a `RequestValidator` class we can use to validate incoming requests.

We could include our request validation code as part of our controller, but this is a perfect opportunity to write an [action filter attribute](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/filters). This way we can reuse our validation logic across all our controllers and actions that accept incoming requests from Twilio.

```cs title="Use filter attribute to validate Twilio requests" description="Confirm incoming requests to your controllers are genuine with this filter."
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Twilio.Security;

namespace ValidateRequestExample.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class ValidateTwilioRequestAttribute : TypeFilterAttribute
    {
        public ValidateTwilioRequestAttribute() : base(typeof(ValidateTwilioRequestFilter))
        {
        }
    }

    internal class ValidateTwilioRequestFilter : IAsyncActionFilter
    {
        private readonly RequestValidator _requestValidator;

        public ValidateTwilioRequestFilter(IConfiguration configuration)
        {
            var authToken = configuration["Twilio:AuthToken"] ?? throw new Exception("'Twilio:AuthToken' not configured.");
            _requestValidator = new RequestValidator(authToken);
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var httpContext = context.HttpContext;
            var request = httpContext.Request;

            var requestUrl = $"{request.Scheme}://{request.Host}{request.Path}{request.QueryString}";
            Dictionary<string, string> parameters = null;

            if (request.HasFormContentType)
            {
                var form = await request.ReadFormAsync(httpContext.RequestAborted).ConfigureAwait(false);
                parameters = form.ToDictionary(p => p.Key, p => p.Value.ToString());
            }

            var signature = request.Headers["X-Twilio-Signature"];
            var isValid = _requestValidator.Validate(requestUrl, parameters, signature);

            if (!isValid)
            {
                httpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
                return;
            }

            await next();
        }
    }
}
```

To validate an incoming request genuinely originated from Twilio, we first need to create an instance of the `RequestValidator` class passing it our Twilio Auth Token. Then we call its `Validate` method passing the requester URL, the form parameters, and the Twilio request signature.

That method will return `True` if the request is valid or `False` if it isn't. Our filter attribute then either continues processing the action or returns a 403 HTTP response for forbidden requests.

## Use the filter attribute with our Twilio webhooks

Now we're ready to apply our filter attribute to any controller action in our ASP.NET application that handles incoming requests from Twilio.

```cs title="Apply the request validation filter attribute to a set of controller methods" description="Apply a custom Twilio request validation filter attribute to a set of controller methods used for Twilio webhooks."
using Microsoft.AspNetCore.Mvc;
using Twilio.TwiML;
using ValidateRequestExample.Filters;

namespace ValidateRequestExample.Controllers
{
    [Route("[controller]/[action]")]
    public class IncomingController : Controller
    {
        [ValidateTwilioRequest]
        public IActionResult Voice(string from)
        {
            var message = "Thanks for calling! " +
                          $"Your phone number is {from}. " +
                          "I got your call because of Twilio\'s webhook. " +
                          "Goodbye!";

            var response = new VoiceResponse();
            response.Say(string.Format(message, from));
            response.Hangup();

            return Content(response.ToString(), "text/xml");
        }

        [ValidateTwilioRequest]
        public IActionResult Message(string body)
        {
            var message = $"Your text to me was {body.Length} characters long. " +
                          "Webhooks are neat :)";

            var response = new MessagingResponse();
            response.Message(message);

            return Content(response.ToString(), "text/xml");
        }
    }
}
```

To use the filter attribute with an existing controller action, just put `[ValidateTwilioRequest]` above the action's definition. In this sample application, we use our filter attribute with two controller actions: one that handles incoming phone calls and another that handles incoming text messages.

> \[!NOTE]
>
> If your Twilio webhook URLs start with `https://` instead of `http://`, your request validator may fail locally when you use Ngrok or in production, if your stack terminates SSL connections upstream from your app. This is because the request URL that your ASP.NET application sees does not match the URL Twilio used to reach your application.
>
> To fix this for local development with ngrok, use `http://` for your webhook instead of `https://`. To fix this in your production app, your method will need to reconstruct the request's original URL using request headers like `X-Original-Host` and `X-Forwarded-Proto`, if available.

Before running the application, make sure you configure your [Twilio Auth Token](https://help.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them#where-is-my-auth-token) as the `Twilio:AuthToken` configuration, using [.NET's secrets manager](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets#secret-manager), environment variables, a vault service, or some other secure configuration source.

## Disable request validation during testing

If you write tests for your controller actions, those tests may fail where you use your Twilio request validation filter. Any requests your test suite sends to those actions will fail the filter's validation check.

To fix this problem we recommend adding an extra check in your filter attribute, like so, telling it to only reject incoming requests if your app is running in production.

```cs title="An improved request validation filter attribute, useful for testing" description="Use this version of the custom filter attribute if you test your controllers."
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Twilio.Security;

namespace ValidateRequestExample.Filters
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class ValidateTwilioRequestAttribute : TypeFilterAttribute
    {
        public ValidateTwilioRequestAttribute() : base(typeof(ValidateTwilioRequestFilter))
        {
        }
    }

    internal class ValidateTwilioRequestFilter : IAsyncActionFilter
    {
        private readonly RequestValidator _requestValidator;
        private readonly bool _isEnabled;

        public ValidateTwilioRequestFilter(IConfiguration configuration, IWebHostEnvironment environment)
        {
            var authToken = configuration["Twilio:AuthToken"] ?? throw new Exception("'Twilio:AuthToken' not configured.");
            _requestValidator = new RequestValidator(authToken);
            _isEnabled = configuration.GetValue("Twilio:RequestValidation:Enabled", true);
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (!_isEnabled)
            {
                await next();
                return;
            }

            var httpContext = context.HttpContext;
            var request = httpContext.Request;

            var requestUrl = $"{request.Scheme}://{request.Host}{request.Path}{request.QueryString}";
            Dictionary<string, string> parameters = null;

            if (request.HasFormContentType)
            {
                var form = await request.ReadFormAsync(httpContext.RequestAborted).ConfigureAwait(false);
                parameters = form.ToDictionary(p => p.Key, p => p.Value.ToString());
            }

            var signature = request.Headers["X-Twilio-Signature"];
            var isValid = _requestValidator.Validate(requestUrl, parameters, signature);

            if (!isValid)
            {
                httpContext.Response.StatusCode = StatusCodes.Status403Forbidden;
                return;
            }

            await next();
        }
    }
}
```

To disable the request validation, you can now configure `Twilio:RequestValidation:Enabled` to `false` in your *appsettings.json* or *appsettings.Development.json* file.

## What's next?

Validating requests to your Twilio webhooks is a great first step for securing your Twilio application. We recommend reading over [our full security documentation](/docs/usage/security) for more advice on protecting your app, and the [Anti-Fraud Developer's Guide](/docs/usage/anti-fraud-developer-guide) in particular.

To learn more about securing your ASP.NET MVC application in general, check out [the security considerations page in the official ASP.NET docs](https://www.asp.net/mvc/overview/security).
