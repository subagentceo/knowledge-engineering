# Secure your C# / ASP.NET app by validating incoming Twilio requests

> \[!WARNING]
>
> [See the **AspNetCore** version of this guide](/docs/usage/tutorials/how-to-secure-your-csharp-aspnet-core-app-by-validating-incoming-twilio-requests).

In this guide we'll cover how to secure your C# / [ASP.NET MVC](https://www.asp.net/mvc) application by validating incoming requests to your Twilio webhooks are, in fact, from Twilio.

With a few lines of code, we'll write a custom filter attribute for our ASP.NET app that uses the [Twilio C# SDK](https://github.com/twilio/twilio-csharp)'s validator utility. This filter will then be invoked on the controller actions that accept Twilio webhooks to confirm that incoming requests genuinely originated from Twilio.

Let's get started!

## Create a custom filter attribute

The Twilio C# SDK includes a `RequestValidator` class we can use to validate incoming requests.

We could include our request validation code as part of our controller, but this is a perfect opportunity to write an [action filter attribute](https://msdn.microsoft.com/en-us/library/dd410056\(v=vs.98\).aspx). This way we can reuse our validation logic across all our controller actions which accept incoming requests from Twilio.

```cs title="Use filter attribute to validate Twilio requests" description="Confirm incoming requests to your controllers are genuine with this filter."
using System;
using System.Configuration;
using System.Web;
using System.Net;
using System.Web.Mvc;
using Twilio.Security;

namespace ValidateRequestExample.Filters
{
    [AttributeUsage(AttributeTargets.Method)]
    public class ValidateTwilioRequestAttribute : ActionFilterAttribute
    {
        private readonly RequestValidator _requestValidator;

        public ValidateTwilioRequestAttribute()
        {
            var authToken = ConfigurationManager.AppSettings["TwilioAuthToken"];
            _requestValidator = new RequestValidator(authToken);
        }

        public override void OnActionExecuting(ActionExecutingContext actionContext)
        {
            var context = actionContext.HttpContext;
            if(!IsValidRequest(context.Request))
            {
                actionContext.Result = new HttpStatusCodeResult(HttpStatusCode.Forbidden);
            }

            base.OnActionExecuting(actionContext);
        }

        private bool IsValidRequest(HttpRequestBase request) {
            var signature = request.Headers["X-Twilio-Signature"];
            var requestUrl = request.Url.AbsoluteUri;
            return _requestValidator.Validate(requestUrl, request.Form, signature);
        }
    }
}

```

To validate an incoming request genuinely originated from Twilio, we first need to create an instance of the `RequestValidator` class. After that we call its validate method, passing in the request's HTTP context and our Twilio auth token.

That method will return True if the request is valid or False if it isn't. Our filter attribute then either continues processing the action or returns a 403 HTTP response for invalid requests.

## Use the filter attribute with our Twilio webhooks

Now we're ready to apply our filter attribute to any controller action in our ASP.NET application that handles incoming requests from Twilio.

```cs title="Apply the request validation filter attribute to a set of controller methods" description="Apply a custom Twilio request validation filter attribute to a set of controller methods used for Twilio webhooks."
using System.Web.Mvc;
using Twilio.AspNet.Mvc;
using Twilio.TwiML;
using ValidateRequestExample.Filters;

namespace ValidateRequestExample.Controllers
{
    public class IncomingController : TwilioController
    {
        [ValidateTwilioRequest]
        public ActionResult Voice(string from)
        {
            var message = "Thanks for calling! " +
                $"Your phone number is {from}. " +
                "I got your call because of Twilio's webhook. " +
                "Goodbye!";

            var response = new VoiceResponse();
            response.Say(string.Format(message, from));
            response.Hangup();

            return TwiML(response);
        }

        [ValidateTwilioRequest]
        public ActionResult Message(string body)
        {
            var message = $"Your text to me was {body.Length} characters long. " +
                "Webhooks are neat :)";

            var response = new MessagingResponse();
            response.Message(new Message(message));

            return TwiML(response);
        }
    }
}

```

To use the filter attribute with an existing view, just put `[ValidateTwilioRequest]` above the action's definition. In this sample application, we use our filter attribute with two controller actions: one that handles incoming phone calls and another that handles incoming text messages.

**Note:** If your Twilio webhook URLs start with `https://` instead of `http://`, your request validator may fail locally when you use Ngrok or in production if your stack terminates SSL connections upstream from your app. This is because the request URL that your ASP.NET application sees does not match the URL Twilio used to reach your application.

To fix this for local development with Ngrok, use `http://` for your webhook instead of `https://`. To fix this in your production app, your decorator will need to reconstruct the request's original URL using request headers like `X-Original-Host` and `X-Forwarded-Proto`, if available.

## Disable request validation during testing

If you write tests for your controller actions, those tests may fail where you use your Twilio request validation filter. Any requests your test suite sends to those actions will fail the filter's validation check.

To fix this problem we recommend adding an extra check in your filter attribute, like so, telling it to only reject incoming requests if your app is running in production.

```cs title="An improved request validation filter attribute, useful for testing" description="Use this version of the custom filter attribute if you test your controllers."
using System;
using System.Configuration;
using System.Web;
using System.Net;
using System.Web.Mvc;
using Twilio.Security;

namespace ValidateRequestExample.Filters
{
    [AttributeUsage(AttributeTargets.Method)]
    public class ValidateTwilioRequestAttribute : ActionFilterAttribute
    {
        private readonly RequestValidator _requestValidator;
        private static bool IsTestEnvironment =>
            bool.Parse(ConfigurationManager.AppSettings["IsTestEnvironment"]);

        public ValidateTwilioRequestAttribute()
        {
            var authToken = ConfigurationManager.AppSettings["TwilioAuthToken"];
            _requestValidator = new RequestValidator(authToken);
        }

        public override void OnActionExecuting(ActionExecutingContext actionContext)
        {
            var context = actionContext.HttpContext;
            if (!IsTestEnvironment && !IsValidRequest(context.Request))
            {
                actionContext.Result = new HttpStatusCodeResult(HttpStatusCode.Forbidden);
            }

            base.OnActionExecuting(actionContext);
        }

        private bool IsValidRequest(HttpRequestBase request) {
            var signature = request.Headers["X-Twilio-Signature"];
            var requestUrl = request.RawUrl;
            return _requestValidator.Validate(requestUrl, request.Form, signature);
        }
    }
}

```

## What's next?

Validating requests to your Twilio webhooks is a great first step for securing your Twilio application. We recommend reading over [our full security documentation](/docs/usage/security) for more advice on protecting your app, and the [Anti-Fraud Developer's Guide](/docs/usage/anti-fraud-developer-guide) in particular.

To learn more about securing your ASP.NET MVC application in general, check out [the security considerations page in the official ASP.NET docs](https://www.asp.net/mvc/overview/security).
