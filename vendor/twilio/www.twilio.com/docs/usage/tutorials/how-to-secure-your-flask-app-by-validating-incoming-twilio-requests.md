# Secure your Flask App by Validating Incoming Twilio Requests

In this guide we'll cover how to secure your [Flask](http://flask.pocoo.org/) application by validating incoming requests to your Twilio webhooks are, in fact, from Twilio.

With a few lines of code, we'll write a custom decorator for our Flask app that uses the Twilio Python SDK's validator utility. We can then use that decorator on our Flask views which accept Twilio webhooks to confirm that incoming requests genuinely originated from Twilio.

Let's get started!

## Create a custom decorator

The Twilio Python SDK includes a `RequestValidator` class we can use to validate incoming requests.

We could include our request validation code as part of our Flask views, but this is a perfect opportunity to write [a Python decorator](https://jeffknupp.com/blog/2013/11/29/improve-your-python-decorators-explained/). This way we can reuse our validation logic across all our views which accept incoming requests from Twilio.

```py title="Custom decorator for Flask apps to validate Twilio requests" description="Confirm incoming requests to your Flask views are genuine with this custom decorator."
from flask import abort, Flask, request
from functools import wraps
from twilio.request_validator import RequestValidator

import os


app = Flask(__name__)


def validate_twilio_request(f):
    """Validates that incoming requests genuinely originated from Twilio"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Create an instance of the RequestValidator class
        validator = RequestValidator(os.environ.get('TWILIO_AUTH_TOKEN'))

        # Validate the request using its URL, POST data,
        # and X-TWILIO-SIGNATURE header
        request_valid = validator.validate(
            request.url,
            request.form,
            request.headers.get('X-TWILIO-SIGNATURE', ''))

        # Continue processing the request if it's valid, return a 403 error if
        # it's not
        if request_valid:
            return f(*args, **kwargs)
        else:
            return abort(403)
    return decorated_function

```

To validate an incoming request genuinely originated from Twilio, we first need to create an instance of the `RequestValidator` class using our Twilio auth token. After that we call its `validate` method, passing in the request's URL, payload, and the value of the request's `X-TWILIO-SIGNATURE` header.

That method will return True if the request is valid or False if it isn't. Our decorator then either continues processing the view or returns a 403 HTTP response for inauthentic requests.

> \[!WARNING]
>
> If you are passing query string parameters in the URLs used in the webhooks you are validating, you may need to take extra care to encode or decode the URL so that validation passes. Some web frameworks like Flask will sometimes automatically unescape the query string part of the request URL, causing validation to fail.

## Use the Decorator with our Twilio Webhooks

Now we're ready to apply our decorator to any view in our Flask application that handles incoming requests from Twilio.

```py title="Apply the request validation decorator to a Flask view" description="Apply a custom Twilio request validation decorator to a Flask view used for Twilio webhooks."
from flask import Flask, request
from twilio.twiml.voice_response import VoiceResponse, MessagingResponse


app = Flask(__name__)


@app.route('/voice', methods=['POST'])
@validate_twilio_request
def incoming_call():
    """Twilio Voice URL - receives incoming calls from Twilio"""
    # Create a new TwiML response
    resp = VoiceResponse()

    # <Say> a message to the caller
    from_number = request.values['From']
    body = """
    Thanks for calling!

    Your phone number is {0}. I got your call because of Twilio's webhook.

    Goodbye!""".format(' '.join(from_number))
    resp.say(body)

    # Return the TwiML
    return str(resp)


@app.route('/message', methods=['POST'])
@validate_twilio_request
def incoming_message():
    """Twilio Messaging URL - receives incoming messages from Twilio"""
    # Create a new TwiML response
    resp = MessagingResponse()

    # <Message> a text back to the person who texted us
    body = "Your text to me was {0} characters long. Webhooks are neat :)" \
        .format(len(request.values['Body']))
    resp.message(body)

    # Return the TwiML
    return str(resp)


if __name__ == '__main__':
    app.run(debug=True)

```

To use the decorator with an existing view, just put `@validate_twilio_request` above the view's definition. In this sample application, we use our decorator with two views: one that handles incoming phone calls and another that handles incoming text messages.

> \[!WARNING]
>
> If your Twilio webhook URLs start with `https\://` instead of `http\://`, your request validator may fail locally when you use Ngrok or in production if your stack terminates SSL connections upstream from your app. This is because the request URL that your Flask application sees does not match the URL Twilio used to reach your application.
>
> To fix this for local development with Ngrok, use `http\://` for your webhook instead of `https\://`. To fix this in your production app, your decorator will need to reconstruct the request's original URL using request headers like `X-Original-Host` and `X-Forwarded-Proto`, if available.

## Disable Request Validation During Testing

If you write tests for your Flask views those tests may fail for views where you use your Twilio request validation decorator. Any requests your test suite sends to those views will fail the decorator's validation check.

To fix this problem we recommend adding an extra check in your decorator, like so, telling it to only reject incoming requests if your app is running in production.

```py title="An improved Flask request validation decorator, useful for testing" description="Use this version of the custom Flask decorator if you test your Flask views."
from flask import abort, current_app, request
from functools import wraps
from twilio.request_validator import RequestValidator

import os


def validate_twilio_request(f):
    """Validates that incoming requests genuinely originated from Twilio"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Create an instance of the RequestValidator class
        validator = RequestValidator(os.environ.get('TWILIO_AUTH_TOKEN'))

        # Validate the request using its URL, POST data,
        # and X-TWILIO-SIGNATURE header
        request_valid = validator.validate(
            request.url,
            request.form,
            request.headers.get('X-TWILIO-SIGNATURE', ''))

        # Continue processing the request if it's valid (or if DEBUG is True)
        # and return a 403 error if it's not
        if request_valid or current_app.debug:
            return f(*args, **kwargs)
        else:
            return abort(403)
    return decorated_function

```

## Test the validity of your webhook signature

> \[!NOTE]
>
> It's a great idea to run automated testing against your webhooks to ensure that their signatures are secure. The following Python code can test your unique endpoints against both valid and invalid signatures.

To make this test work for you, you'll need to:

1. Set your [Auth Token](https://www.twilio.com/console) as an environment variable
2. Set the URL to the endpoint you want to test
3. If testing BasicAuth, change `HTTPDigestAuth` to `HTTPBasicAuth`

```py title="Test the validity of your webhook signature" description="This sample test will test the validity of your webhook signature with HTTP Basic or Digest authentication."
# Download the twilio-python library from twilio.com/docs/python/install
from twilio.request_validator import RequestValidator
from requests.auth import HTTPDigestAuth
from requests.auth import HTTPBasicAuth
import requests
import urllib
import os

# Your Auth Token from twilio.com/user/account saved as an environment variable
# Remember never to hard code your auth token in code, browser Javascript, or distribute it in mobile apps
auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
validator = RequestValidator(auth_token)

# Replace this URL with your unique URL
url = 'https://example.com/myapp'
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

## What's next?

Validating requests to your Twilio webhooks is a great first step for securing your Twilio application. We recommend reading over [our full security documentation](/docs/usage/security) for more advice on protecting your app, and the [Anti-Fraud Developer's Guide](/docs/usage/anti-fraud-developer-guide) in particular.

To learn more about securing your Flask application in general, check out [the security considerations page in the official Flask docs](http://flask.pocoo.org/docs/1.0/security/).
