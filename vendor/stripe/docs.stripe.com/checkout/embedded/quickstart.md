# Embed a checkout page in your site

# Full embedded page 

Explore a full, working code sample of an integration with [Stripe Checkout](https://docs.stripe.com/payments/checkout.md) that lets your customers pay through an embedded form on your website. The example includes client and server-side code, and an embeddable UI component displays the checkout page.

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

### Create a Checkout Session

Add an endpoint on your server that creates a *Checkout Session* (A Checkout Session represents your customer's session as they pay for one-time purchases or subscriptions through Checkout. After a successful payment, the Checkout Session contains a reference to the Customer, and either the successful PaymentIntent or an active Subscription), setting the [ui_mode](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-ui_mode) to `embedded_page`.

The Checkout Session response includes a client secret, which the client uses to mount Checkout. Return the [client_secret](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-client_secret) in your response.

### Create a Checkout Session

Add a [Server Action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) to your application that creates a *Checkout Session* (A Checkout Session represents your customer's session as they pay for one-time purchases or subscriptions through Checkout. After a successful payment, the Checkout Session contains a reference to the Customer, and either the successful PaymentIntent or an active Subscription), setting the [ui_mode](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-ui_mode) to `embedded_page`.

The Checkout Session response includes a client secret, which the client uses to mount Checkout. Return the [client_secret](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-client_secret) from the function.

### Supply a return URL

To define how Stripe redirects your customer after payment, specify the URL of the return page in the [return_url](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-return_url) parameter while creating the Checkout Session. After the payment attempt, Stripe directs your customer to return page hosted on your website.

Include the `{CHECKOUT_SESSION_ID}` template variable in the URL. Before redirecting your customer, Checkout replaces the variable with the Checkout Session ID. You’re responsible for creating and hosting the return page on your website.

### Define a product to sell

Define the products you’re selling when you create the Checkout Session by using [predefined price IDs](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=checkout&ui=embedded-page#create-product-prices-upfront).

Always keep sensitive information about your product inventory, such as price and availability, on your server to prevent customer manipulation from the client.

### Choose the mode

To handle different transaction types, adjust the `mode` parameter. For one-time payments, use `payment`. To initiate recurring payments with [subscriptions](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md?payment-ui=checkout&ui=embedded-page), switch the `mode` to `subscription`. And for [setting up future payments](https://docs.stripe.com/payments/save-and-reuse.md?platform=web&ui=embedded-page), set the `mode` to `setup`.

### Add Stripe to your React app

To stay *PCI compliant* (Any party involved in processing, transmitting, or storing credit card data must comply with the rules specified in the Payment Card Industry (PCI) Data Security Standards. PCI compliance is a shared responsibility and applies to both Stripe and your business) by ensuring that payment details go directly to Stripe and never reach your server, install [React Stripe.js](https://docs.stripe.com/sdks/stripejs-react.md).

```bash
npm install --save @stripe/react-stripe-js @stripe/stripe-js
```

### Load Stripe.js

To configure the Stripe library, call `loadStripe()` with your Stripe publishable API key.

### Load Stripe.js

Use *Stripe.js* (Use Stripe.js’ APIs to tokenize customer information, collect sensitive card data, and accept payments with browser payment APIs) to remain *PCI compliant* (Any party involved in processing, transmitting, or storing credit card data must comply with the rules specified in the Payment Card Industry (PCI) Data Security Standards. PCI compliance is a shared responsibility and applies to both Stripe and your business) by ensuring that payment details are sent directly to Stripe without hitting your server. Always load Stripe.js from *js.stripe.com* to remain compliant. Don’t include the script in a bundle or host it yourself.

### Define the payment form

To securely collect the customer’s information, create an empty placeholder `div`. Stripe inserts an iframe into the `div`.

### Initialize Stripe.js

Initialize Stripe.js with your [publishable API key](https://docs.stripe.com/keys.md#obtain-api-keys).

### Fetch a Checkout Session client secret

Create an asynchronous `fetchClientSecret` function that makes a request to your server to [create a Checkout Session](https://docs.stripe.com/api/checkout/sessions/create.md) and retrieve the client secret.

### Fetch a Checkout Session client secret

Import the Server Action to [create a Checkout Session](https://docs.stripe.com/api/checkout/sessions/create.md) and retrieve the client secret, passing it to the [`fetchClientSecret`](https://docs.stripe.com/js/embedded_checkout/create#embedded_checkout_create-options-fetchClientSecret) parameter.

### Initialize Checkout

Initialize Checkout with your `fetchClientSecret` function and mount it to the placeholder `<div>` in your payment form. Checkout is rendered in an iframe that securely sends payment information to Stripe over an HTTPS connection.

Avoid placing Checkout within another iframe because some payment methods require redirecting to another page for payment confirmation.

### Initialize Checkout

To allow the child components to access the Stripe service through the embedded Checkout consumer, pass the resulting promise from `loadStripe` and the client secret as an `option`  to the embedded Checkout provider.

### Create an endpoint to retrieve a Checkout Session

Add an endpoint to retrieve a Checkout Session status.

### Add a return page

To display order information to your customer, create a return page for the URL you provided as the Checkout Session `return_url`. Stripe redirects to this page after the customer completes the checkout.

### Add a return component

To display order information to your customer, add a new route and return component for the URL you provided as the Checkout Session `return_url`. Stripe redirects to this page after the customer completes the checkout.

### Add a return page

To display order information to your customer, add a file under `pages/` for the URL you provided as the Checkout Session `return_url`. Stripe redirects your customer to this page after they check out.

### Retrieve a Checkout session

As soon as your return page loads, immediately make a request to the endpoint on your server. Use the Checkout Session ID in the URL to retrieve the status of the Checkout Session.

### Handle session

Handle the result of the session by using its status:

- `complete`: The payment succeeded. Use the information from the Checkout Session to render a success page.
- `open`: The payment failed or was canceled. Remount Checkout so that your customer can try again.

### Set your environment variables

Add your publishable and secret keys to a `.env` file. Next.js automatically loads them into your application as [environment variables](https://nextjs.org/docs/basic-features/environment-variables).

Each webhook endpoint has a unique signing secret. Webhooks are managed in [Workbench](https://docs.stripe.com/workbench.md) in the Dashboard. You can find the secret in the destination detail view for your webhook endpoint in Workbench’s [Webhooks tab](https://dashboard.stripe.com/workbench/webhooks). If you’re testing locally with the Stripe CLI, you can also get the secret from the CLI output using the command `stripe listen`.

To include a webhook endpoint signing secret to listen to [events](https://docs.stripe.com/event-destinations.md), go to Workbench’s [Event destinations](https://dashboard.stripe.com/workbench/webhooks) tab or use the [Stripe CLI](https://docs.stripe.com/stripe-cli.md).

### Run the application

Start your server and go to <http://localhost:4242/checkout.html>

### Run the application

Start your server and go to <http://localhost:3000/checkout>

### Run the application

Start your app with `npm run dev` and go to <http://localhost:3000>

### Try it out

Click the pay button to complete the payment, which redirects you to the specified return page.

If you see the return page, and the payment in the list of [successful payments](https://dashboard.stripe.com/test/payments?status%5B0%5D=successful) in the Dashboard, your integration is successfully working. Use any of the following test cards to simulate a payment:

| Scenario                            | Card Number      |
| ----------------------------------- | ---------------- |
| Payment succeeds                    | 4242424242424242 |
| Payment requires 3DS authentication | 4000002500003155 |
| Payment is declined                 | 4000000000009995 |

## Congratulations!

You have a basic Checkout integration working. Now learn how to customize the appearance of your checkout page and automate tax collection.

### Customize the checkout page

[Customize](https://docs.stripe.com/payments/checkout/customization.md) the appearance of the embedded form by:

- Adding your color theme and font in your [branding settings](https://dashboard.stripe.com/settings/branding/checkout).
- Using the [Checkout Sessions API](https://docs.stripe.com/api/checkout/sessions/create.md)to activate additional features, like collecting addresses and prefilling customer data.

### Prefill customer data

Use [customer_email](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer_email) to prefill the customer’s email address in the email input field. You can also pass a [Customer](https://docs.stripe.com/api/customers.md) ID to the `customer` field to prefill the email address field with the email stored on the Customer.

### Pick a submit button

Change the text of the submit button to `pay`, `donate`, or `book` by setting the [submit_type](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-submit_type). The default text is `pay`.

### Collect billing and shipping details

Use [billing_address_collection](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-billing_address_collection) and [shipping_address_collection](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-shipping_address_collection) to collect your customer’s address. [shipping_address_collection](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-shipping_address_collection) requires a list of `allowed_countries`, which Checkout displays in a dropdown menu on the page.

### Automate tax collection

Calculate and collect the right amount of tax on your Stripe transactions. Learn more about [Stripe Tax](https://docs.stripe.com/tax.md) and [how to add it to Checkout](https://docs.stripe.com/tax/checkout.md).

### Set up Stripe Tax in the Dashboard

[Activate Stripe Tax](https://dashboard.stripe.com/tax) to monitor your tax obligations, automatically collect tax, and access the reports you need to file returns.

### Add the automatic tax parameter

Set the `automatic_tax` parameter to `enabled: true`.

### New and returning customers

By default, Checkout only creates [Customers](https://docs.stripe.com/api/customers.md) when one is required (for example, for subscriptions). Otherwise, Checkout uses [guest customers](https://docs.stripe.com/payments/checkout/guest-customers.md) to group payments in the Dashboard. You can optionally configure Checkout to always create a new customer or to specify a returning customer.

### Always create customers

To always create customers whenever one isn’t provided, set [customer_creation](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer_creation) to `'always'`.

### Specify returning customers

To associate a Checkout Session with a customer that already exists, provide the [customer](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer) when creating a session. If you model customers using Accounts v2, you can also pass an Account ID to the [customer_account](https://docs.stripe.com/api/checkout/sessions/create.md#create_checkout_session-customer_account) field to prefill the associated email address. Learn more about the [difference between using v1 Customers and v2 Accounts](https://docs.stripe.com/accounts-v2/use-accounts-as-customers.md).

// This test secret API key is a placeholder. Don't include personal details in requests with this key.
// To see your test secret API key embedded in code samples, sign in to your Stripe account.
// You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
// Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');
const YOUR_DOMAIN = 'http://localhost:4242';
const YOUR_DOMAIN = 'http://localhost:3000';
  const session = await stripe.checkout.sessions.create({

    ui_mode: 'embedded_page',
    customer_email: 'customer@example.com',
    submit_type: 'donate',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: {{CHECKOUT_MODE}},
    return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    return_url: `${YOUR_DOMAIN}/return.html?session_id={CHECKOUT_SESSION_ID}`,
    automatic_tax: {enabled: true},
    customer_creation: 'always',
    // Provide the Customer ID (for example, cus_1234) for an existing customer to associate it with this session
    // customer: '{{CUSTOMER_ID}}'
  });

  res.send({clientSecret: session.client_secret});
app.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email
  });
});
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
\# This test secret API key is a placeholder. Don't include personal details in requests with this key.
# To see your test secret API key embedded in code samples, sign in to your Stripe account.
# You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
\# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = Stripe::StripeClient.new('<<YOUR_SECRET_KEY>>')
YOUR_DOMAIN = 'http://localhost:4242'
YOUR_DOMAIN = 'http://localhost:3000'
  session = client.v1.checkout.sessions.create({

    ui_mode: 'embedded_page',
    customer_email: 'customer@example.com',
    submit_type: 'donate',
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    line_items: [{
      \# Provide the exact Price ID (for example, price_1234) of the product you want to sell
      price: '{{PRICE_ID}}',
      quantity: 1,
    }],
    mode: {{CHECKOUT_MODE}},
    return_url: YOUR_DOMAIN + '/return.html?session_id={CHECKOUT_SESSION_ID}',
    return_url: YOUR_DOMAIN + '/return?session_id={CHECKOUT_SESSION_ID}',
    automatic_tax: {enabled: true},
    customer_creation: 'always',
    \# Provide the Customer ID (for example, cus_1234) for an existing customer to associate it with this session
    # customer: '{{CUSTOMER_ID}}'
  })

  {clientSecret: session.client_secret}.to_json
get '/session-status' do
  session = client.v1.checkout.sessions.retrieve(params[:session_id])

  {status: session.status, customer_email:  session.customer_details.email}.to_json
end
import stripe
\# This test secret API key is a placeholder. Don't include personal details in requests with this key.
# To see your test secret API key embedded in code samples, sign in to your Stripe account.
# You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
\# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = stripe.StripeClient('<<YOUR_SECRET_KEY>>')
YOUR_DOMAIN = 'http://localhost:4242'
YOUR_DOMAIN = 'http://localhost:3000'
        session = client.v1.checkout.sessions.create(params={
            'ui_mode': 'embedded_page',
            'customer_email': 'customer@example.com',
            'submit_type': 'donate',
            'billing_address_collection': 'auto',
            'shipping_address_collection': {
              'allowed_countries': ['US', 'CA'],
            },
            'line_items': [
                {
                    \# Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    'price': '{{PRICE_ID}}',
                    'quantity': 1,
                },
            ],
            'mode': {{CHECKOUT_MODE}},
            'return_url': YOUR_DOMAIN + '/return.html?session_id={CHECKOUT_SESSION_ID}',
            'return_url': YOUR_DOMAIN + '/return?session_id={CHECKOUT_SESSION_ID}',
            'automatic_tax': {'enabled': True},
            'customer_creation': 'always',
            \# Provide the Customer ID (for example, cus_1234) for an existing customer to associate it with this session
            # 'customer': '{{CUSTOMER_ID}}'
        })
    return jsonify(clientSecret=session.client_secret)
@app.route('/session-status', methods=['GET'])
def session_status():
  session = client.v1.checkout.sessions.retrieve(request.args.get('session_id'))

  return jsonify(status=session.status, customer_email=session.customer_details.email)
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
$YOUR_DOMAIN = 'http://localhost:4242';
$YOUR_DOMAIN = 'http://localhost:3000';

$checkout_session = $stripe->checkout->sessions->create([

  'ui_mode' => 'embedded_page',
  'customer_email' => 'customer@example.com',
  'submit_type' => 'donate',
  'billing_address_collection' => 'required',
  'shipping_address_collection' => [
    'allowed_countries' => ['US', 'CA'],
  ],
  'line_items' => [[
    \# Provide the exact Price ID (for example, price_1234) of the product you want to sell
    'price' => '{{PRICE_ID}}',
    'quantity' => 1,
  ]],
  'mode' => {{CHECKOUT_MODE}},
  'return_url' => $YOUR_DOMAIN . '/return.html?session_id={CHECKOUT_SESSION_ID}',
  'return_url' => $YOUR_DOMAIN . '/return?session_id={CHECKOUT_SESSION_ID}',
  'automatic_tax' => [
    'enabled' => true,
  ],
  'customer_creation' => 'always',
  \# Provide the Customer ID (for example, cus_1234) for an existing customer to associate it with this session
  # 'customer' => '{{CUSTOMER_ID}}'
]);

  echo json_encode(array('clientSecret' => $checkout_session->client_secret));
try {
  // retrieve JSON from POST body
  $jsonStr = file_get_contents('php://input');
  $jsonObj = json_decode($jsonStr);

  $session = $stripe->checkout->sessions->retrieve($jsonObj->session_id);

  echo json_encode(['status' => $session->status, 'customer_email' => $session->customer_details->email]);
  http_response_code(200);
} catch (Error $e) {
  http_response_code(500);
  echo json_encode(['error' => $e->getMessage()]);
}
// Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
$stripeSecretKey = '<<YOUR_SECRET_KEY>>';
            // This test secret API key is a placeholder. Don't include personal details in requests with this key.
            // To see your test secret API key embedded in code samples, sign in to your Stripe account.
            // You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
            // Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
            services.AddSingleton(new StripeClient("<<YOUR_SECRET_KEY>>"));
            var domain = "http://localhost:4242";
            var domain = "http://localhost:3000";

                UiMode = "embedded_page",
                CustomerEmail = "customer@example.com",
                SubmitType = "donate",
                BillingAddressCollection = "auto",
                ShippingAddressCollection = new SessionShippingAddressCollectionOptions
                {
                  AllowedCountries = new List<string>
                  {
                    "US",
                    "CA",
                  },
                },
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    Price = "{{PRICE_ID}}",
                    Quantity = 1,
                  },
                },
                Mode = {{CHECKOUT_MODE}},
                ReturnUrl = domain + "/return.html?session_id={CHECKOUT_SESSION_ID}",
                ReturnUrl = domain + "/return?session_id={CHECKOUT_SESSION_ID}",
                AutomaticTax = new SessionAutomaticTaxOptions { Enabled = true },
                CustomerCreation = "always",
                // Provide the Customer ID (for example, cus_1234) for an existing customer to associate it with this session
                // Customer="cus_RnhPlBnbBbXapY",
            Session session = _client.V1.Checkout.Sessions.Create(options);

            return Json(new {clientSecret = session.ClientSecret});
    [Route("session-status")]
    [ApiController]
    public class SessionStatusController : Controller
    {
        private readonly StripeClient _client;

        public SessionStatusController(StripeClient client)
        {
            _client = client;
        }

        [HttpGet]
        public ActionResult SessionStatus([FromQuery] string session_id)
        {
            Session session = _client.V1.Checkout.Sessions.Get(session_id);

            return Json(new {status = session.Status,  customer_email = session.CustomerDetails.Email});
        }
    }
    "github.com/stripe/stripe-go/v85"
  // Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
  sc := stripe.NewClient("<<YOUR_SECRET_KEY>>")
  domain := "http://localhost:4242"
  domain := "http://localhost:3000"
  params := &stripe.CheckoutSessionCreateParams{

    UIMode: stripe.String("embedded_page"),
    ReturnURL: stripe.String(domain + "/return.html?session_id={CHECKOUT_SESSION_ID}"),
    ReturnURL: stripe.String(domain + "/return?session_id={CHECKOUT_SESSION_ID}"),
    CustomerEmail: stripe.String("customer@example.com"),
    SubmitType: stripe.String("donate"),
    BillingAddressCollection: stripe.String("auto"),
    ShippingAddressCollection: &stripe.CheckoutSessionShippingAddressCollectionParams{
      AllowedCountries: stripe.StringSlice([]string{
        "US",
        "CA",
      }),
    },
    LineItems: []*stripe.CheckoutSessionCreateLineItemParams{
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        Price: stripe.String("{{PRICE_ID}}"),
        Quantity: stripe.Int64(1),
      },
    },
    Mode: stripe.String("{{CHECKOUT_MODE}}"),
    AutomaticTax: &stripe.CheckoutSessionAutomaticTaxParams{Enabled: stripe.Bool(true)},
    CustomerCreation: stripe.String(stripe.CheckoutSessionCustomerCreationAlways),
    // Provide the Customer ID (for example, cus_1234) for an existing customer to associate it with this session
    // Customer:   stripe.String("{{CUSTOMER_ID}}"),
  }

  s, err := sc.V1CheckoutSessions.Create(context.TODO(), params)

  if err != nil {
    log.Printf("sc.V1CheckoutSessions.Create: %v", err)
  }

  writeJSON(w, struct {
    ClientSecret string `json:"clientSecret"`
  }{
    ClientSecret: s.ClientSecret,
  })
func retrieveCheckoutSession(sc *stripe.Client, w http.ResponseWriter, r *http.Request) {
  s, _ := sc.V1CheckoutSessions.Retrieve(context.TODO(), r.URL.Query().Get("session_id"), nil)

  writeJSON(w, struct {
    Status string `json:"status"`
    CustomerEmail string `json:"customer_email"`
  }{
    Status: string(s.Status),
    CustomerEmail: string(s.CustomerDetails.Email),
  })
}
require github.com/stripe/stripe-go/v85 v85.2.0
    // This test secret API key is a placeholder. Don't include personal details in requests with this key.
    // To see your test secret API key embedded in code samples, sign in to your Stripe account.
    // You can also find your test secret API key at https://dashboard.stripe.com/test/apikeys.
    // Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
    StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");
        String YOUR_DOMAIN = "http://localhost:4242";
        String YOUR_DOMAIN = "http://localhost:3000";
        SessionCreateParams params =
          SessionCreateParams.builder()

            .setUiMode(SessionCreateParams.UiMode.EMBEDDED_PAGE)
            .setCustomerEmail("customer@example.com")
            .setSubmitType(SessionCreateParams.SubmitType.DONATE)
            .setBillingAddressCollection(SessionCreateParams.BillingAddressCollection.REQUIRED)
            .setShippingAddressCollection(
              SessionCreateParams.ShippingAddressCollection.builder()
                .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.CA)
                .addAllowedCountry(SessionCreateParams.ShippingAddressCollection.AllowedCountry.US)
                .build())
            .setMode({{CHECKOUT_MODE}})
            .setReturnUrl(YOUR_DOMAIN + "/return?session_id={CHECKOUT_SESSION_ID}")
            .setReturnUrl(YOUR_DOMAIN + "/return.html?session_id={CHECKOUT_SESSION_ID}")
            .setAutomaticTax(
              SessionCreateParams.AutomaticTax.builder()
                .setEnabled(true)
                .build())
            .setCustomerCreation(SessionCreateParams.CustomerCreation.ALWAYS)
            // Provide the Customer ID (for example, cus_1234) for an existing customer to associate it with this session
            // .setCustomer("{{CUSTOMER_ID}}")
            .addLineItem(
              SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                .setPrice("{{PRICE_ID}}")
                .build())
            .build();
      Map<String, String> map = new HashMap();
      map.put("clientSecret", session.getRawJsonObject().getAsJsonPrimitive("client_secret").getAsString());


      return map;
    get("/session-status", (request, response) -> {
      Session session = client.v1().checkout().sessions().retrieve(request.queryParams("session_id"));

      Map<String, String> map = new HashMap();
      map.put("status", session.getRawJsonObject().getAsJsonPrimitive("status").getAsString());
      map.put("customer_email", session.getRawJsonObject().getAsJsonObject("customer_details").getAsJsonPrimitive("email").getAsString());

      return map;
    }, gson::toJson);
    <script src="https://js.stripe.com/dahlia/stripe.js"></script>
      <div id="checkout">
        <!-- Checkout will insert the payment form here -->
      </div>
const stripe = Stripe("<<YOUR_PUBLISHABLE_KEY>>");
initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const response = await fetch("/checkout.php", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };
  const checkout = await stripe.createEmbeddedCheckoutPage({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}
<!DOCTYPE html>
<html>
<head>
  <title>Thanks for your order!</title>
  <link rel="stylesheet" href="style.css">
  <script src="return.js" defer></script>
</head>
<body>
  <section id="success" class="hidden">
    <p>
      We appreciate your business! A confirmation email will be sent to <span id="customer-email"></span>.

      If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
    </p>
  </section>
</body>
</html>
initialize();

async function initialize() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get('session_id');
  const response = await fetch(`/session-status?session_id=${sessionId}`);
  const response = await fetch("/status.php", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ session_id: sessionId }),
  });
  const session = await response.json();
  if (session.status == 'open') {
    window.location.replace('http://localhost:4242/checkout.html')
  } else if (session.status == 'complete') {
    document.getElementById('success').classList.remove('hidden');
    document.getElementById('customer-email').textContent = session.customer_email
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
    "react-scripts": "^5.0.1",
    "react-router-dom": "^6.16.0",
    "stripe": "^8.202.0"
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
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@stripe/react-stripe-js": "^3.7.0",
    "@stripe/stripe-js": "^7.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^5.0.1",
    "react-router-dom": "^6.16.0"
  },
  "homepage": "http://localhost:3000/checkout",
  "proxy": "http://localhost:4242/",
  "scripts": {
    "start": "react-scripts start --ignore client",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
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
import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
// This is a public sample test API key.
// Don't submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("<<YOUR_PUBLISHABLE_KEY>>");
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/create-checkout-session", {
      method: "POST",
    })
    return fetch("/checkout.php", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = {fetchClientSecret};
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`/session-status?session_id=${sessionId}`)
    fetch("/status.php", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ session_id: sessionId }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);
  if (status === 'open') {
    return (
      <Navigate to="/checkout" />
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }
  return null;
}
          <Route path="/return" element={<Return />} />
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
    "stripe": "^8.202.0"
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
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@stripe/react-stripe-js": "^3.7.0",
    "@stripe/stripe-js": "^7.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^3.4.0"
  },
  "homepage": "http://localhost:3000/checkout",
  "proxy": "http://localhost:4242",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
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
  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({

    ui_mode: 'embedded_page',
    customer_email: 'customer@example.com',
    submit_type: 'donate',
    billing_address_collection: 'auto',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of
        // the product you want to sell
        price: '{{PRICE_ID}}',
        quantity: 1
      }
    ],
    mode: 'payment',
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    automatic_tax: {enabled: true},
  })
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { fetchClientSecret } from '../actions/stripe'
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{ fetchClientSecret }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
\# https://dashboard.stripe.com/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<<YOUR_PUBLISHABLE_KEY>>
STRIPE_SECRET_KEY=<<YOUR_SECRET_KEY>>
\# Set this environment variable to support webhooks — https://stripe.com/docs/webhooks#verify-events
# STRIPE_WEBHOOK_SECRET=whsec_12345
export default async function Return({ searchParams }) {
  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })
  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{' '}
          {customerEmail}. If you have any questions, please email{' '}
        </p>
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </section>
    )
  }
import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
1. Build the server

~~~
pip3 install -r requirements.txt
~~~
1. Build the server

~~~
bundle install
~~~
1. Build the server

~~~
composer install
~~~
1. Build the server

~~~
dotnet restore
~~~
1. Build the server

~~~
mvn package
~~~

2. Run the server

~~~
export FLASK_APP=server.py
python3 -m flask run --port=4242
~~~

2. Run the server

~~~
ruby server.rb -o 0.0.0.0
~~~

2. Run the server

~~~
php -S 127.0.0.1:4242 --docroot=public
~~~

2. Run the server

~~~
dotnet run
~~~

2. Run the server

~~~
java -cp target/sample-jar-with-dependencies.jar com.stripe.sample.Server
~~~

3. Build the client app

~~~
npm install
~~~

4. Run the client app

~~~
npm start
~~~

If you run into an error, when running npm start, try running the following code and starting again:
~~~
export NODE_OPTIONS=--openssl-legacy-provider
~~~

5. Go to [http://localhost:3000/checkout](http://localhost:3000/checkout)

3. Go to [http://localhost:4242/checkout.html](http://localhost:4242/checkout.html)

3. Build the client app

~~~
npm install
~~~

4. Run the client app

~~~
npm start
~~~

5. Go to [http://localhost:3000/checkout](http://localhost:3000/checkout)

3. Go to [http://localhost:4242/checkout.html](http://localhost:4242/checkout.html)

3. Build the client app

~~~
npm install
~~~

4. Run the client app

~~~
npm start
~~~

5. Go to [http://localhost:3000/checkout](http://localhost:3000/checkout)

3. Go to [http://localhost:4242/checkout.html](http://localhost:4242/checkout.html)

3. Build the client app

~~~
npm install
~~~

4. Run the client app

~~~
npm start
~~~

5. Go to [http://localhost:3000/checkout](http://localhost:3000/checkout)

3. Go to [http://localhost:4242/checkout.html](http://localhost:4242/checkout.html)

3. Build the client app

~~~
npm install
~~~

4. Run the client app

~~~
npm start
~~~

5. Go to [http://localhost:3000/checkout](http://localhost:3000/checkout)

3. Go to [http://localhost:4242/checkout.html](http://localhost:4242/checkout.html)
1. Run the server

~~~
go run server.go
~~~

2. Build the client app

~~~
npm install
~~~

3. Run the client app

~~~
npm start
~~~

4. Go to [http://localhost:3000/checkout](http://localhost:3000/checkout)
1. Run the server

~~~
go run server.go
~~~

2. Go to [http://localhost:4242/checkout.html](http://localhost:4242/checkout.html)
1. Build the application

~~~
npm install
~~~

2. Run the application

~~~
npm start
~~~

3. Go to [http://localhost:3000/checkout](http://localhost:3000/checkout)
1. Build the server

~~~
npm install
~~~

2. Run the server

~~~
npm start
~~~

3. Go to [http://localhost:4242/checkout.html](http://localhost:4242/checkout.html)
\### Development

1. Build the application
~~~shell
$ npm install
~~~

2. _Optional_: download and run the [Stripe CLI](https://stripe.com/docs/stripe-cli)
~~~shell
$ stripe listen --forward-to localhost:3000/api/webhooks
~~~

3. Run the application
~~~shell
$ STRIPE_WEBHOOK_SECRET=$(stripe listen --print-secret) npm run dev
~~~

4. Go to [localhost:3000](http://localhost:3000)

### Production

1. Build the application
~~~shell
$ npm install

$ npm build
~~~

2. Run the application
~~~shell
$ npm start
~~~
## Next steps

#### [Fulfill orders](https://docs.stripe.com/checkout/fulfillment.md)

Set up a webhook to fulfill orders after a payment succeeds. Webhooks are the most reliable way to handle business-critical events.

#### [Receive payouts](https://docs.stripe.com/payouts.md)

Learn how to move funds out of your Stripe account into your bank account.

#### [Refund and cancel payments](https://docs.stripe.com/refunds.md)

Handle requests for refunds by using the Stripe API or Dashboard.

#### [Customer management](https://docs.stripe.com/customer-management.md)

Let your customers self-manage their payment details, invoices, and subscriptions
