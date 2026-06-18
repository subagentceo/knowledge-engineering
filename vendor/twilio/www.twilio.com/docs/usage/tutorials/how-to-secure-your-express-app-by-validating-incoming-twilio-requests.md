# Secure your Express app by validating incoming Twilio requests

In this guide we'll cover how to secure your [Express](https://github.com/expressjs/express) application by validating incoming requests to your Twilio webhooks are, in fact, from Twilio.

Securing your Express app with [Twilio Node SDK's](https://github.com/twilio/twilio-node) is simple. The Twilio SDK comes with an Express middleware which is ready to use.

Let's get started!

## Use Twilio Express request validation middleware

The Twilio Node SDK includes a `webhook()` method which we can use as an Express middleware to validate incoming requests. When applied to an Express route, if the request is unauthorized the middleware will return a *403* HTTP response.

```js title="Use Twilio webhook middleware for Express apps that validates Twilio requests" description="Confirm incoming requests to your Express routes are genuine with this custom middleware."
// You can find your Twilio Auth Token here: https://www.twilio.com/console
// Set at runtime as follows:
// $ TWILIO_AUTH_TOKEN=XXXXXXXXXXXXXXXXXXX node index.js
//
// This will not work unless you set the TWILIO_AUTH_TOKEN environment
// variable.

const twilio = require('twilio');
const app = require('express')();
const bodyParser = require('body-parser');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/voice', twilio.webhook(), (req, res) => {
  // Twilio Voice URL - receives incoming calls from Twilio
  const response = new VoiceResponse();

  response.say(
    `Thanks for calling!
     Your phone number is ${req.body.From}. I got your call because of Twilio´s
     webhook. Goodbye!`
  );

  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});

app.post('/message', twilio.webhook(), (req, res) => {
  // Twilio Messaging URL - receives incoming messages from Twilio
  const response = new MessagingResponse();

  response.message(`Your text to me was ${req.body.Body.length} characters long.
                    Webhooks are neat :)`);

  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});

app.listen(3000);

```

## Use a tunnel for your local development environment in order to use live Twilio webhooks

If your Twilio webhook URLs start with `https://` instead of `http://`, your request validator may fail locally when you use [ngrok](https://www.npmjs.com/package/ngrok) or in production if your stack terminates SSL connections upstream from your app. This is because the request URL that your Express application sees does not match the URL Twilio used to reach your application.

To fix this for local development with `ngrok`, use `ngrok http 3000` to accept requests on your webhooks instead of `ngrok https 3000`.

## Disable request validation during testing

If you write tests for your Express routes those tests may fail for routes where you use the Twilio request validation middleware. Any requests your test suite sends to those routes will fail the middleware validation check.

To fix this problem we recommend passing `{validate: false}` to the validation middleware `twilio.webhook()` thus disabling it. In Express applications it's typical to use `NODE_ENV` as the value to use to determine the environment the application is running in. In the code example, when `NODE_ENV` is `'test'`, the validation middleware should be disabled.

```js title="Disable Twilio webhook middleware when testing Express routes." description="Use environment variable to disable webhook validation during testing."
// You can find your Twilio Auth Token here: https://www.twilio.com/console
// Set at runtime as follows:
// $ TWILIO_AUTH_TOKEN=XXXXXXXXXXXXXXXXXXX node index.js
//
// This will not work unless you set the TWILIO_AUTH_TOKEN environment
// variable.

const twilio = require('twilio');
const app = require('express')();
const bodyParser = require('body-parser');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const shouldValidate = process.env.NODE_ENV !== 'test';

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/voice', twilio.webhook({ validate: shouldValidate }), (req, res) => {
  // Twilio Voice URL - receives incoming calls from Twilio
  const response = new VoiceResponse();

  response.say(
    `Thanks for calling!
     Your phone number is ${req.body.From}. I got your call because of Twilio´s
     webhook. Goodbye!`
  );

  res.set('Content-Type', 'text/xml');
  res.send(response.toString());
});

app.post(
  '/message',
  twilio.webhook({ validate: shouldValidate }),
  (req, res) => {
    // Twilio Messaging URL - receives incoming messages from Twilio
    const response = new MessagingResponse();

    response.message(`Your text to me was ${req.body.Body
      .length} characters long.
                    Webhooks are neat :)`);

    res.set('Content-Type', 'text/xml');
    res.send(response.toString());
  }
);

app.listen(3000);

```

## What's next?

Validating requests to your Twilio webhooks is a great first step for securing your Twilio application. We recommend reading over our [full security documentation](/docs/usage/security) for more advice on protecting your app, and the [Anti-Fraud Developer's Guide](/docs/usage/anti-fraud-developer-guide) in particular.

To learn more about securing your Express application in general, check out the [security considerations page in the official Express docs.](https://expressjs.com/en/advanced/best-practice-security.html)
