# Set up and deploy a webhook

Learn how to set up and deploy a webhook to listen to events from Stripe.

# Interactive webhook endpoint builder 

Learn how to set up and deploy a webhook endpoint to listen to events from Stripe. Use a webhook endpoint for post-payment commerce events such as sending custom email receipts, fulfilling orders, or updating your database. Do these steps in a sandbox before doing them in live mode.

1. Build the server

~~~
npm install
~~~

2. Run the server

~~~
npm start
~~~
1. Run the server

~~~
go run server.go
~~~
1. Build the server

~~~
pip3 install -r requirements.txt
~~~

2. Run the server

~~~
export FLASK_APP=server.py
python3 -m flask run --port=4242
~~~

1. Build the server

~~~
bundle install
~~~

2. Run the server

~~~
ruby server.rb -o 0.0.0.0
~~~

1. Build the server

~~~
composer install
~~~

2. Run the server

~~~
php -S 127.0.0.1:4242 --docroot=public
~~~
1. Build the server

~~~
dotnet restore
~~~

2. Run the server

~~~
dotnet run
~~~
1. Build the server

~~~
mvn package
~~~

2. Run the server

~~~
java -cp target/sample-jar-with-dependencies.jar com.stripe.sample.Server
~~~

~~~
stripe listen --forward-to localhost:4242/webhook.php
~~~

~~~
stripe listen --forward-to localhost:4242/webhook
~~~
### Install the Stripe Node library

Install the package and import it in your code. Alternatively, if you’re starting from scratch and need a package.json file, download the project files using the Download link in the code editor.

#### npm

Install the library:

```bash
npm install --save stripe
```

#### GitHub

Or download the stripe-node library source code directly [from GitHub](https://github.com/stripe/stripe-node).

### Install the Stripe Ruby library

Install the Stripe ruby gem and require it in your code. Alternatively, if you’re starting from scratch and need a Gemfile, download the project files using the link in the code editor.

#### Terminal

Install the gem:

```bash
gem install stripe
```

#### Bundler

Add this line to your Gemfile:

```bash
gem 'stripe'
```

#### GitHub

Or download the stripe-ruby gem source code directly [from GitHub](https://github.com/stripe/stripe-ruby).

### Install the Stripe Java library

Add the dependency to your build and import the library. Alternatively, if you’re starting from scratch and need a sample pom.xml file (for Maven), download the project files using the link in the code editor.

#### Maven

Add the following dependency to your POM and replace {VERSION} with the version number you want to use.

```bash
<dependency>\n<groupId>com.stripe</groupId>\n<artifactId>stripe-java</artifactId>\n<version>{VERSION}</version>\n</dependency>
```

#### Gradle

Add the dependency to your build.gradle file and replace {VERSION} with the version number you want to use.

```bash
implementation "com.stripe:stripe-java:{VERSION}"
```

#### GitHub

Download the JAR directly [from GitHub](https://github.com/stripe/stripe-java/releases/latest).

### Install the Stripe Python package

Install the Stripe package and import it in your code. Alternatively, if you’re starting from scratch and need a requirements.txt file, download the project files using the link in the code editor.

#### pip

Install the package through pip:

```bash
pip3 install stripe
```

#### GitHub

Download the stripe-python library source code directly [from GitHub](https://github.com/stripe/stripe-python).

### Install the Stripe PHP library

Install the library with composer and initialize with your secret API key. Alternatively, if you’re starting from scratch and need a composer.json file, download the files using the link in the code editor.

#### Composer

Install the library:

```bash
composer require stripe/stripe-php
```

#### GitHub

Or download the stripe-php library source code directly [from GitHub](https://github.com/stripe/stripe-php).

### Set up your server

Add the dependency to your build and import the library. Alternatively, if you’re starting from scratch and need a go.mod file, download the project files using the link in the code editor.

#### Go

Make sure to initialize with Go Modules:

```bash
go get -u github.com/stripe/stripe-go/v85
```

#### GitHub

Or download the stripe-go module source code directly [from GitHub](https://github.com/stripe/stripe-go).

### Install the Stripe.net library

Install the package with .NET or NuGet. Alternatively, if you’re starting from scratch, download the files which contains a configured .csproj file.

#### dotnet

Install the library:

```bash
dotnet add package Stripe.net
```

#### NuGet

Install the library:

```bash
Install-Package Stripe.net
```

#### GitHub

Or download the Stripe.net library source code directly [from GitHub](https://github.com/stripe/stripe-dotnet).

### Install the Stripe libraries

Install the packages and import them in your code. Alternatively, if you’re starting from scratch and need a `package.json` file, download the project files using the link in the code editor.

Install the libraries:

```bash
npm install --save stripe @stripe/stripe-js next
```

### Create a new endpoint

A [webhook endpoint](https://docs.stripe.com/webhooks.md) is a destination on your server that receives requests from Stripe, notifying you about events that happen on your account such as a customer disputing a charge or a successful recurring payment. Add a new endpoint to your server and make sure it’s publicly accessible so we can send unauthenticated POST requests.

### Read the event data

Stripe sends the event data in the request body. Each event is structured as an [Event object](https://docs.stripe.com/api/events.md) with a `type`, `id`, and related Stripe resource nested under `data`.

### Handle the event

As soon as you have the event object, check the [type](https://docs.stripe.com/api/events/types.md) to know what kind of event happened. You can use one webhook to handle several different event types at once, or set up individual endpoints for specific events.

### Return a 200 response

[Send a successful 200 response](https://docs.stripe.com/webhooks.md#handle-events-asynchronously) to Stripe as quickly as possible because Stripe retries the event if a response isn’t sent within a reasonable time. Write any long-running processes as code that can run asynchronously outside the webhook endpoint.

### Run the server

Build and run your server to test the endpoint at `http://localhost:4242/webhook`.

```bash
npm start
```

### Run the server

Build and run your server to test the endpoint at `http://localhost:4242/webhook`.

```bash
ruby server.rb
```

### Run the server

Build and run your server to test the endpoint at `http://localhost:4242/webhook`.

```bash
python3 -m flask --app server run --port=4242
```

### Run the server

Build and run your server to test the endpoint at `http://localhost:4242/public/webhook.php`.

```bash
php -S 127.0.0.1:4242
```

### Run the server

Build and run your server to test the endpoint at `http://localhost:4242/webhook`.

```bash
dotnet run
```

### Run the server

Build and run your server to test the endpoint at `http://localhost:4242/webhook`.

```bash
go run server.go
```

### Run the server

Build and run your server to test the endpoint at http://localhost:4242/webhook.

```bash
java -cp target/sample-jar-with-dependencies.jar com.stripe.sample.Server
```

### Download the CLI

Use the Stripe CLI to test your webhook locally. [Download the CLI](https://docs.stripe.com/stripe-cli.md) and log in with your Stripe account. Alternatively, use a service like ngrok to make your local endpoint publicly accessible.

```bash
stripe login
```

### Forward events to your webhook

Set up [event forwarding](https://docs.stripe.com/webhooks.md#test-webhook) with the CLI to send all Stripe events in a sandbox to your local webhook endpoint.

```bash
stripe listen --forward-to localhost:4242/webhook
```

### Forward events to your webhook

Set up [event forwarding](https://docs.stripe.com/webhooks.md#test-webhook) with the CLI to send all Stripe events in testmode to your local webhook endpoint.

```bash
stripe listen --forward-to localhost:4242/public/webhook.php
```

### Simulate events

Use the CLI to [simulate specific events](https://docs.stripe.com/cli/trigger) that test your webhook application logic by sending a POST request to your webhook endpoint with a mocked Stripe event object.

```bash
stripe trigger payment_intent.succeeded
```

### Secure your webhook

Verify the source of a webhook request to prevent bad actors from sending fake payloads or injecting SQL that modify your backend systems. Secure your webhook with a client signature to validate that Stripe generated a webhook request and that it didn’t come from a server acting like Stripe.

### Add the endpoint signing secret

Each webhook endpoint has a unique signing secret, which you can find in the [Webhooks](https://dashboard.stripe.com/workbench/webhooks) tab in Workbench. If you’re testing locally with the Stripe CLI, you can also get the signing secret from the CLI output using the command `stripe listen`.

### Verify the event

Use the Stripe library to verify and construct the event from Stripe. You need the endpoint secret, the request headers, and the raw request body to properly verify the event. Alternatively, you can [manually verify](https://docs.stripe.com/webhooks.md?verify=verify-manually#verify-manually) the signature without having to use the Stripe library.

### Read the request signature

Each request from Stripe contains a `Stripe-Signature` header. Store a reference to this header value for later use.

### Verify the request

Use the Stripe library to verify that the request came from Stripe. Pass the raw request body, `Stripe-Signature` header, and endpoint secret to construct an [Event](https://docs.stripe.com/api/events/object.md).

### Handle errors

Checking for errors helps catch improperly configured webhooks or malformed requests from non-Stripe services. Common errors include using the wrong endpoint secret, passing a parsed representation (for example, JSON) of the request body, or reading the wrong request header.

### Test the endpoint

Test your secured endpoint by using the Stripe CLI, which sends the proper signature header in each test event.

// This is a public sample test API key.
// Don't submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
// Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
const endpointSecret = 'whsec_...';
const express = require('express');
const app = express();

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send();
app.listen(4242, () => console.log('Running on port 4242'));
{
  "name": "stripe-sample",
  "version": "1.0.0",
  "description": "A sample Stripe implementation",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "author": "stripe-samples",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1",
    "stripe": "^22.2.0"
  }
}
{
  "name": "stripe-sample",
  "version": "0.1.0",
  "dependencies": {
    "@stripe/react-stripe-js": "^3.7.0",
    "@stripe/stripe-js": "^7.3.0",
    "express": "^4.17.1",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^3.4.0",
    "stripe": "22.2.0"
  },
  "devDependencies": {
    "concurrently": "4.1.2"
  },
  "homepage": "http://localhost:3000/checkout",
  "proxy": "http://localhost:4242",
  "scripts": {
    "start-client": "react-scripts start",
    "start-server": "node server.js",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "start": "concurrently \"yarn start-client\" \"yarn start-server\""
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
require 'stripe'
\# This is a public sample test API key.
# Don't submit any personally identifiable information in requests made with this key.
# Sign in to see your own test API key embedded in code samples.
\# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = Stripe::StripeClient.new('<<YOUR_SECRET_KEY>>')
\# Replace this endpoint secret with your endpoint's unique secret
# If you are testing with the CLI, find the secret by running 'stripe listen'
# If you are using an endpoint defined with the API or dashboard, look in your webhook settings
# at https://dashboard.stripe.com/webhooks
endpoint_secret = 'whsec_...';
post '/webhook' do
  payload = request.body.read
  event = nil

  begin
    event = Stripe::Event.construct_from(
      JSON.parse(payload, symbolize_names: true)
    )
  rescue JSON::ParserError => e
    \# Invalid payload
    puts "⚠️  Webhook error while parsing basic request. #{e.message}"
    status 400
    return
  end
  \# Check if webhook signing is configured.
  if endpoint_secret
    # Retrieve the event by verifying the signature using the raw body and secret.
    signature = request.env['HTTP_STRIPE_SIGNATURE'];
    begin
      event = Stripe::Webhook.construct_event(
        payload, signature, endpoint_secret
      )
    rescue Stripe::SignatureVerificationError => e
      puts "⚠️  Webhook signature verification failed. #{e.message}"
      status 400
    end
  end
  \# Handle the event
  case event.type
  when 'payment_intent.succeeded'
    payment_intent = event.data.object # contains a Stripe::PaymentIntent
    puts "Payment for #{payment_intent['amount']} succeeded."
    # Then define and call a method to handle the successful payment intent.
    # handle_payment_intent_succeeded(payment_intent)
  when 'payment_method.attached'
    payment_method = event.data.object # contains a Stripe::PaymentMethod
    # Then define and call a method to handle the successful attachment of a PaymentMethod.
    # handle_payment_method_attached(payment_method)
  else
    puts "Unhandled event type: #{event.type}"
  end
  status 200
import stripe
\# This is a public sample test API key.
# Don't submit any personally identifiable information in requests made with this key.
# Sign in to see your own test API key embedded in code samples.
\# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = stripe.StripeClient('<<YOUR_SECRET_KEY>>')
\# Replace this endpoint secret with your endpoint's unique secret
# If you are testing with the CLI, find the secret by running 'stripe listen'
# If you are using an endpoint defined with the API or dashboard, look in your webhook settings
# at https://dashboard.stripe.com/webhooks
endpoint_secret = 'whsec_...'
app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
    try:
        event = json.loads(payload)
    except json.decoder.JSONDecodeError as e:
        print('⚠️  Webhook error while parsing basic request.' + str(e))
        return jsonify(success=False)
    if endpoint_secret:
        \# Only verify the event if there is an endpoint secret defined
        # Otherwise use the basic event deserialized with json
        sig_header = request.headers.get('stripe-signature')
        try:
            event = client.construct_event(
                payload, sig_header, endpoint_secret
            )
        except stripe.error.SignatureVerificationError as e:
            print('⚠️  Webhook signature verification failed.' + str(e))
            return jsonify(success=False)
    \# Handle the event
    if event and event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']  # contains a stripe.PaymentIntent
        print('Payment for {} succeeded'.format(payment_intent['amount']))
        # Then define and call a method to handle the successful payment intent.
        # handle_payment_intent_succeeded(payment_intent)
    elif event['type'] == 'payment_method.attached':
        payment_method = event['data']['object']  # contains a stripe.PaymentMethod
        # Then define and call a method to handle the successful attachment of a PaymentMethod.
        # handle_payment_method_attached(payment_method)
    else:
        # Unexpected event type
        print('Unhandled event type {}'.format(event['type']))
    return jsonify(success=True)
certifi==2026.1.4
chardet==5.2.0
click==8.3.1
Flask==3.1.2
idna==3.11
itsdangerous==2.2.0
Jinja2==3.1.6
MarkupSafe==3.0.3
requests==2.32.5
stripe==15.2.0
toml==0.10.2
Werkzeug==3.1.5
$stripe = new \Stripe\StripeClient($stripeSecretKey);
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
$endpoint_secret = 'whsec_...';
$payload = @file_get_contents('php://input');
$event = null;

try {
  $event = \Stripe\Event::constructFrom(
    json_decode($payload, true)
  );
} catch(\UnexpectedValueException $e) {
  // Invalid payload
  echo '⚠️  Webhook error while parsing basic request.';
  http_response_code(400);
  exit();
}
if ($endpoint_secret) {
  // Only verify the event if there is an endpoint secret defined
  // Otherwise use the basic decoded event
  $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
  try {
    $event = \Stripe\Webhook::constructEvent(
      $payload, $sig_header, $endpoint_secret
    );
  } catch(\Stripe\Exception\SignatureVerificationException $e) {
    // Invalid signature
    echo '⚠️  Webhook error while validating signature.';
    http_response_code(400);
    exit();
  }
}
// Handle the event
switch ($event->type) {
  case 'payment_intent.succeeded':
    $paymentIntent = $event->data->object; // contains a \Stripe\PaymentIntent
    // Then define and call a method to handle the successful payment intent.
    // handlePaymentIntentSucceeded($paymentIntent);
    break;
  case 'payment_method.attached':
    $paymentMethod = $event->data->object; // contains a \Stripe\PaymentMethod
    // Then define and call a method to handle the successful attachment of a PaymentMethod.
    // handlePaymentMethodAttached($paymentMethod);
    break;
  default:
    // Unexpected event type
    error_log('Received unknown event type');
}
http_response_code(200);
// Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
$stripeSecretKey = '<<YOUR_SECRET_KEY>>';
      // This is a public sample test API key.
      // Don't submit any personally identifiable information in requests made with this key.
      // Sign in to see your own test API key embedded in code samples.
      // Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
      services.AddSingleton(new StripeClient("<<YOUR_SECRET_KEY>>"));
  [Route("webhook")]
  [ApiController]
  public class WebhookController : Controller
        const string endpointSecret = "whsec_...";
            var stripeEvent = EventUtility.ParseEvent(json);
            var signatureHeader = Request.Headers["Stripe-Signature"];

            stripeEvent = EventUtility.ConstructEvent(json,
                    signatureHeader, endpointSecret);
            // If on SDK version < 46, use class Events instead of EventTypes
            if (stripeEvent.Type == EventTypes.PaymentIntentSucceeded)
            {
                var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                Console.WriteLine("A successful payment for {0} was made.", paymentIntent.Amount);
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded(paymentIntent);
            }
            else if (stripeEvent.Type == EventTypes.PaymentMethodAttached)
            {
                var paymentMethod = stripeEvent.Data.Object as PaymentMethod;
                // Then define and call a method to handle the successful attachment of a PaymentMethod.
                // handlePaymentMethodAttached(paymentMethod);
            }
            else
            {
                Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
            }
            return Ok();
        catch (StripeException e)
        {
            Console.WriteLine("Error: {0}", e.Message);
            return BadRequest();
        }
  "github.com/stripe/stripe-go/v85"
  "github.com/stripe/stripe-go/v85/webhook"
  // This is a public sample test API key.
  // Don't submit any personally identifiable information in requests made with this key.
  // Sign in to see your own test API key embedded in code samples.
  // Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
  sc = stripe.NewClient("<<YOUR_SECRET_KEY>>")
  http.HandleFunc("/webhook", handleWebhook)
  event := stripe.Event{}

  if err := json.Unmarshal(payload, &event); err != nil {
    fmt.Fprintf(os.Stderr, "⚠️  Webhook error while parsing basic request. %v\n", err.Error())
    w.WriteHeader(http.StatusBadRequest)
    return
  }
  // Replace this endpoint secret with your endpoint's unique secret
  // If you are testing with the CLI, find the secret by running 'stripe listen'
  // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
  // at https://dashboard.stripe.com/webhooks
  endpointSecret := "whsec_..."
  signatureHeader := req.Header.Get("Stripe-Signature")
  event, err = sc.ConstructEvent(payload, signatureHeader, endpointSecret)
  if err != nil {
    fmt.Fprintf(os.Stderr, "⚠️  Webhook signature verification failed. %v\n", err)
    w.WriteHeader(http.StatusBadRequest) // Return a 400 error on a bad signature
    return
  }
  // Unmarshal the event data into an appropriate struct depending on its Type
  switch event.Type {
  case "payment_intent.succeeded":
    var paymentIntent stripe.PaymentIntent
    err := json.Unmarshal(event.Data.Raw, &paymentIntent)
    if err != nil {
      fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
      w.WriteHeader(http.StatusBadRequest)
      return
    }
    log.Printf("Successful payment for %d.", paymentIntent.Amount)
    // Then define and call a func to handle the successful payment intent.
    // handlePaymentIntentSucceeded(paymentIntent)
  case "payment_method.attached":
    var paymentMethod stripe.PaymentMethod
    err := json.Unmarshal(event.Data.Raw, &paymentMethod)
    if err != nil {
      fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
      w.WriteHeader(http.StatusBadRequest)
      return
    }
    // Then define and call a func to handle the successful attachment of a PaymentMethod.
    // handlePaymentMethodAttached(paymentMethod)
  default:
    fmt.Fprintf(os.Stderr, "Unhandled event type: %s\n", event.Type)
  }
  w.WriteHeader(http.StatusOK)
require github.com/stripe/stripe-go/v85 v85.2.0
        // This is a public sample test API key.
        // Don't submit any personally identifiable information in requests made with this key.
        // Sign in to see your own test API key embedded in code samples.
        // Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
        StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");
        // Replace this endpoint secret with your endpoint's unique secret
        // If you are testing with the CLI, find the secret by running 'stripe listen'
        // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
        // at https://dashboard.stripe.com/webhooks
        String endpointSecret = "whsec_...";
        post("/webhook", (request, response) -> {
            String payload = request.body();
            Event event = null;

            try {
                event = ApiResource.GSON.fromJson(payload, Event.class);
            } catch (JsonSyntaxException e) {
                // Invalid payload
                System.out.println("⚠️  Webhook error while parsing basic request.");
                response.status(400);
                return "";
            }
            String sigHeader = request.headers("Stripe-Signature");
            if(endpointSecret != null && sigHeader != null) {
                // Only verify the event if you have an endpoint secret defined.
                // Otherwise use the basic event deserialized with GSON.
                try {
                    event = client.constructEvent(
                        payload, sigHeader, endpointSecret
                    );
                } catch (SignatureVerificationException e) {
                    // Invalid signature
                    System.out.println("⚠️  Webhook error while validating signature.");
                    response.status(400);
                    return "";
                }
            }
            // Handle the event
            switch (event.getType()) {
                case "payment_intent.succeeded":
                    PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
                    System.out.println("Payment for " + paymentIntent.getAmount() + " succeeded.");
                    // Then define and call a method to handle the successful payment intent.
                    // handlePaymentIntentSucceeded(paymentIntent);
                    break;
                case "payment_method.attached":
                    PaymentMethod paymentMethod = (PaymentMethod) stripeObject;
                    // Then define and call a method to handle the successful attachment of a PaymentMethod.
                    // handlePaymentMethodAttached(paymentMethod);
                    break;
                default:
                    System.out.println("Unhandled event type: " + event.getType());
                break;
            }
            response.status(200);
            return "";
## Next steps

#### [Secure your webhooks](https://docs.stripe.com/webhooks.md#verify-events)

Secure your webhook endpoint by allowing only verified events from Stripe.

#### [Going live](https://docs.stripe.com/webhooks.md#register-webhook)

Learn how to deploy your webhook endpoint to production and handle events at scale by only sending the specific events you need.

#### [Best practices](https://docs.stripe.com/webhooks.md#best-practices)

Understand best practices for maintaining your endpoint, such as managing retries or duplicate events.

#### [Stripe CLI](https://docs.stripe.com/stripe-cli.md)

The Stripe CLI has several commands that can help test your Stripe application beyond webhooks.
