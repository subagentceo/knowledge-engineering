# Build a pre-built subscription page with Stripe Checkout

# Prebuilt subscription page with Stripe Checkout 

Get started with our sample app to run a full, working subscription integration using [Stripe Billing](https://docs.stripe.com/billing.md) and [Stripe Checkout](https://docs.stripe.com/payments/checkout.md).

The sample app demonstrates redirecting your customers from your site to a prebuilt payment page hosted on Stripe. The Stripe Billing APIs create and manage subscriptions, invoices, and recurring payments, while Checkout provides the prebuilt, secure, Stripe-hosted UI for collecting payment details.

You can model customers in your integration either as [customer-configured Account](https://docs.stripe.com/api/v2/core/accounts/create.md#v2_create_accounts-configuration-customer) objects using the Accounts v2 API (recommended in most cases) or as [Customer](https://docs.stripe.com/api/customers/object.md) objects using the Customers v1 API. For details about the differences between these options, see [Use Accounts as customers](https://docs.stripe.com/accounts-v2/use-accounts-as-customers.md).

Click each step to see the corresponding sample code. As you interact with the steps, such as adding pricing data, the builder updates the sample code.

Download and customize the sample app locally to test your integration.

### Add your products and prices

Create new *Products* (Products represent what your business sells—whether that's a good or a service) and *Prices* (Prices define how much and how often to charge for products. This includes how much the product costs, what currency to use, and the interval if the price is for subscriptions) that you can use in this sample.

> Sign in to your Stripe account to configure your products and prices.

### Add features to your product

Create features, such as an annual birthday gift, and associate them with your subscription to [entitle](https://docs.stripe.com/billing/entitlements.md) new subscribers to them. Listen to the [active entitlements summary events](https://docs.stripe.com/billing/entitlements.md#webhooks) for your [event destination](https://docs.stripe.com/event-destinations.md), and use the [list active entitlements API](https://docs.stripe.com/api/entitlements/active-entitlement/list.md) for a given customer to fulfill your customer’s entitlements.

### (Optional) Enable payment methods

Use your [Dashboard](https://dashboard.stripe.com/settings/payment_methods) to enable [supported payment methods](https://docs.stripe.com/payments/payment-methods/payment-method-support.md) that you want to accept in addition to cards. Checkout dynamically displays your enabled payment methods in order of relevance, based on the customer’s location and other characteristics.

### Add a pricing preview page

Add a page to your site that displays your product and allows your customers to subscribe to it. Clicking **Checkout**, redirects them to a Stripe-hosted [Checkout](https://docs.stripe.com/payments/checkout.md) page, which finalizes the order and prevents further modification.

Consider embedding a [pricing table](https://docs.stripe.com/payments/checkout/pricing-table.md) to dynamically display your pricing information through the Dashboard. Clicking a pricing option redirects your customer to the payment page.

### Add a checkout button

The button on your order preview page redirects your customer to the Stripe-hosted payment page and uses your product’s `lookup_key` to retrieve the `price_id` from the server.

### Add a success page

Create a success page to display order confirmation messaging or order details to your customer. Associate this page with the Checkout Session `success_url`, which Stripe redirects to after the customer successfully completes the checkout.

### Add a customer portal button

Add a button to redirect to the customer portal to allow customers to manage their subscription. Clicking this button redirects your customer to the Stripe-hosted customer portal page.

### Redirect to the customer portal session

Make a request to the endpoint on your server to redirect to a new customer portal session. This example uses the `session_id` from the [Checkout session](https://docs.stripe.com/api/checkout/sessions/object.md#checkout_session_object-id) to demonstrate retrieving the `customer_id`. In a production environment, we recommend that you store this value alongside the authenticated user in your database.

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

The [Checkout Session](https://docs.stripe.com/api/checkout/sessions.md) controls what your customer sees in the Stripe-hosted payment page such as line items, the order amount and currency, and acceptable payment methods.

### Get the price from lookup key

Pass the lookup key you defined for your product in the [Price](https://docs.stripe.com/api/prices/list.md) endpoint to apply its price to the order.

### Define the line items

Always keep sensitive information about your product inventory, such as price and availability, on your server to prevent customer manipulation from the client. Pass in the predefined price ID retrieved above.

### Set the mode

Set the mode to `subscription`. Checkout also supports [payment](https://docs.stripe.com/checkout/quickstart.md) and [setup](https://docs.stripe.com/payments/save-and-reuse.md) modes for non-recurring payments.

### Supply success URL

Specify a publicly accessible URL that Stripe can redirect customers after success. Add the `session_id` query parameter at the end of your URL so you can retrieve the customer later and so Stripe can generate the customer’s hosted Dashboard.

### Redirect from Checkout

After creating the session, redirect your customer to the URL returned in the response (either the success or cancel URL).

### Create a customer portal session

Initiate a secure, Stripe-hosted [customer portal session](https://docs.stripe.com/api/customer_portal/sessions/create.md) that lets your customers manage their subscriptions and billing details.

### Redirect to customer portal

After creating the portal session, redirect your customer to the URL returned in the response.

### Fulfill the subscription

Create a `/webhook` endpoint and obtain your webhook secret key in the [Webhooks](https://dashboard.stripe.com/webhooks) tab in Workbench to listen for events related to subscription activity. After a successful payment and redirect to the success page, verify that the subscription status is `active` and grant your customer access to the products and features they subscribed to.

### Run the server

Start your server and go to <http://localhost:4242/>

```bash
npm start
```

### Run the server

Start your server. It automatically opens a browser window to <http://localhost:3000/checkout>

```bash
npm start
```

### Run the server

Start your server and go to <http://localhost:4242/>

```bash
ruby server.rb
```

### Run the server

Start your server. It automatically opens a browser window to <http://localhost:3000/checkout>

```bash
ruby server.rb
```

### Run the server

Start your server and go to <http://localhost:4242/>

```bash
python3 -m flask run --port=4242
```

### Run the server

Start your server. It automatically opens a browser window to <http://localhost:3000/checkout>

```bash
python3 -m flask run --port=4242
```

### Run the server

Start your server and go to <http://localhost:4242/>

```bash
php -S 127.0.0.1:4242 --docroot=public
```

### Run the server

Start your server. It automatically opens a browser window to <http://localhost:3000/checkout>

```bash
php -S 127.0.0.1:4242 --docroot=public
```

### Run the server

Start your server and go to <http://localhost:4242/>

```bash
dotnet run
```

### Run the server

Start your server. It automatically opens a browser window to <http://localhost:3000/checkout>

```bash
dotnet run
```

### Run the server

Start your server and go to <http://localhost:4242/>

```bash
go run server.go
```

### Run the server

Start your server. It automatically opens a browser window to <http://localhost:3000/checkout>

```bash
go run server.go
```

### Run the server

Start your server and go to <http://localhost:4242/>

```bash
java -cp target/sample-jar-with-dependencies.jar com.stripe.sample.Server
```

### Run the server

Start your server. It automatically opens a browser window to <http://localhost:3000/checkout>

```bash
java -cp target/sample-jar-with-dependencies.jar com.stripe.sample.Server
```

### Try it out

Click the checkout button. In the Stripe-hosted payment page, use any of these test cards to simulate a payment.

| Scenario                            | Card Number      |
| ----------------------------------- | ---------------- |
| Payment succeeds                    | 4242424242424242 |
| Payment requires 3DS authentication | 4000002500003155 |
| Payment is declined                 | 4000000000009995 |

## Add customization features

If you successfully subscribed to your product in your test, you have a working, basic subscriptions checkout integration. Use the toggles below to see how to customize this sample with additional features.

### Add trials

Attach a trial period to a Checkout session.

### Add a trial period

Use `subscription_data` to add an integer representing the number of `trial_period_days` before charging the customer for the first time. This must be at least `1`.

If you start a free trial without a payment method, set the `trial_settings[end_behavior][missing_payment_method]` field to `pause` or `cancel` so the subscription doesn’t continue if the trial ends with no payment method. Pass this parameter into `subscription_data` when you create a Checkout session, or update it on the subscription at another time. See [Use trial periods](https://docs.stripe.com/billing/subscriptions/trials/free-trials.md#create-free-trials-without-payment) for more information.

### Set billing cycle date

Specify a billing cycle anchor when creating a Checkout session.

### Anchor the subscription billing cycle

Use `subscription_data` to set a `billing_cycle_anchor` timestamp for a subscription’s next billing date. See [Setting the billing cycle date in Checkout](https://docs.stripe.com/payments/checkout/billing-cycle.md) for more information.

### Automate tax collection

Calculate and collect the right amount of tax on your Stripe transactions. Learn more about [Stripe Tax](https://docs.stripe.com/tax.md) and [how to add it to Checkout](https://docs.stripe.com/tax/checkout.md). [Activate Stripe Tax](https://dashboard.stripe.com/tax) in the Dashboard before integrating.

### Add the automatic tax parameter

Set the `automatic_tax` parameter to `enabled: true`.

    <script src="https://js.stripe.com/dahlia/stripe.js"></script>
      <div class="product">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14px" height="16px" viewBox="0 0 14 16" version="1.1">
            <defs/>
            <g id="Flow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="0-Default" transform="translate(-121.000000, -40.000000)" fill="#E184DF">
                    <path d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z" id="Pilcrow"/>
                </g>
            </g>
        </svg>
        <div class="description">
          <h3>{{PRODUCT_NAME}}</h3>
          <h5>{{FORMATTED_RECURRING_PRICE}}</h5>
        </div>
      </div>
      <form action="/create-checkout-session" method="POST">
        <!-- Add a hidden field with the lookup_key of your Price -->
        <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
        <button id="checkout-and-portal-button" type="submit">Checkout</button>
      </form>
      <form action="/create-checkout-session.php" method="POST">
        <!-- Add a hidden field with the lookup_key of your Price -->
        <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
        <button id="checkout-and-portal-button" type="submit">Checkout</button>
      </form>
<body>
  <section>
    <div class="product Box-root">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14px" height="16px" viewBox="0 0 14 16" version="1.1">
          <defs/>
          <g id="Flow" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="0-Default" transform="translate(-121.000000, -40.000000)" fill="#E184DF">
                  <path d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z" id="Pilcrow"/>
              </g>
          </g>
      </svg>
      <div class="description Box-root">
        <h3>Subscription to Starter plan successful!</h3>
      </div>
    </div>
    <form action="/create-portal-session" method="POST">
      <input type="hidden" id="session-id" name="session_id" value="" />
      <button id="checkout-and-portal-button" type="submit">Manage your billing information</button>
    </form>
    <form action="/create-portal-session.php" method="POST">
      <input type="hidden" id="session-id" name="session_id" value="" />
      <button id="checkout-and-portal-button" type="submit">Manage your billing information</button>
    </form>
  </section>
</body>
<body>
  <section>
    <p>Picked the wrong subscription? Shop around then come back to pay!</p>
  </section>
</body>
    <div className="product">
      <Logo />
      <div className="description">
        <h3>{{PRODUCT_NAME}}</h3>
        <h5>{{FORMATTED_RECURRING_PRICE}}</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      {/* Add a hidden field with the lookup_key of your Price */}
      <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
      <button id="checkout-and-portal-button" type="submit">
        Checkout
      </button>
    </form>
    <form action="/create-checkout-session.php" method="POST">
      {/* Add a hidden field with the lookup_key of your Price */}
      <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
      <button id="checkout-and-portal-button" type="submit">
        Checkout
      </button>
    </form>
    <section>
      <div className="product Box-root">
        <Logo />
        <div className="description Box-root">
          <h3>Subscription to {{PRODUCT_NAME}} successful!</h3>
        </div>
      </div>
      <form action="/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
      <form action="/create-portal-session.php" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section>
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
    "stripe": "^8.202.0"
  },
  "devDependencies": {
    "concurrently": "4.1.2"
  },
  "homepage": "http://localhost:3000/checkout",
  "proxy": "http://127.0.0.1:4242",
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
    "react-scripts": "^5.0.1"
  },
  "homepage": "http://localhost:3000/checkout",
  "proxy": "http://127.0.0.1:4242",
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
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
// Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
const stripe = require('stripe')('<<YOUR_SECRET_KEY>>');
const YOUR_DOMAIN = "http://localhost:4242";
const YOUR_DOMAIN = "http://localhost:3000";
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ['data.product'],
  });
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: prices.data[0].id,
        // For usage-based billing, don't pass quantity
        quantity: 1,

      },
    ],
    mode: 'subscription',
    success_url: `${YOUR_DOMAIN}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    success_url: `${YOUR_DOMAIN}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
    discounts: [{
      coupon: '{{COUPON_ID}}',
    }],
    customer: 'cus_123',
    customer_account: 'acct_123',
    subscription_data: {
      trial_period_days: 7,
      billing_cycle_anchor: 1672531200,
    },
    subscription_data: {
      billing_cycle_anchor: 1672531200,
    },
    automatic_tax: { enabled: true },
  });

  res.redirect(303, session.url);
  // This is the url to which the customer will be redirected when they're done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });
  // This is the url to which the customer will be redirected when they're done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer_account: checkoutSession.customer_account,
    return_url: returnUrl,
  });
  res.redirect(303, portalSession.url);
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    let event = request.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = 'whsec_12345';
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
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.trial_will_end':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case 'customer.subscription.deleted':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case 'customer.subscription.created':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case 'customer.subscription.updated':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      case 'entitlements.active_entitlement_summary.updated':
        subscription = event.data.object;
        console.log(`Active entitlement summary updated for ${subscription}.`);
        // Then define and call a method to handle active entitlement summary updated
        // handleEntitlementUpdated(subscription);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);
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
    "stripe": "^21.0.1"
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
    "stripe": "21.0.1"
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
\# This is a public sample test API key.
# Don’t submit any personally identifiable information in requests made with this key.
# Sign in to see your own test API key embedded in code samples.
\# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = Stripe::StripeClient.new('<<YOUR_SECRET_KEY>>')
  prices = client.v1.prices.list(
    lookup_keys: [params['lookup_key']],
    expand: ['data.product']
  )
    session = client.v1.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{
        quantity: 1,
        price: prices.data[0].id
      }],
      success_url: YOUR_DOMAIN + '/success.html?session_id={CHECKOUT_SESSION_ID}',
      success_url: YOUR_DOMAIN + '?success=true&session_id={CHECKOUT_SESSION_ID}',
      subscription_data: {
        trial_period_days: 7,
        billing_cycle_anchor: 1672531200
      },
      subscription_data: {
        billing_cycle_anchor: 1672531200
      },
      customer: 'cus_JyTTNqVDAoRYE1',
      customer_account: 'acct_123',
      discounts: [{
        coupon: 'gBY6sFUf'
      }],
      automatic_tax: {
        enabled: true
      },
    })
  redirect session.url, 303
  session = client.v1.billing_portal.sessions.create({

                                                    customer: checkout_session.customer,
                                                    return_url: return_url
                                                  })
  session = client.v1.billing_portal.sessions.create({

                                                    customer_account: checkout_session.customer_account,
                                                    return_url: return_url
                                                  })
  redirect session.url, 303
post '/webhook' do
  \# Replace this endpoint secret with your endpoint's unique secret
  # If you are testing with the CLI, find the secret by running 'stripe listen'
  # If you are using an endpoint defined with the API or dashboard, look in your webhook settings
  # at https://dashboard.stripe.com/webhooks
  webhook_secret = 'whsec_12345'
  payload = request.body.read
  if !webhook_secret.empty?
    # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
    sig_header = request.env['HTTP_STRIPE_SIGNATURE']
    event = nil

    begin
      event = Stripe::Webhook.construct_event(
        payload, sig_header, webhook_secret
      )
    rescue JSON::ParserError => e
      # Invalid payload
      status 400
      return
    rescue Stripe::SignatureVerificationError => e
      # Invalid signature
      puts '⚠️  Webhook signature verification failed.'
      status 400
      return
    end
  else
    data = JSON.parse(payload, symbolize_names: true)
    event = Stripe::Event.construct_from(data)
  end
  # Get the type of webhook event sent - used to check the status of PaymentIntents.
  event_type = event['type']
  data = event['data']
  data_object = data['object']

  if event.type == 'customer.subscription.deleted'
    # handle subscription canceled automatically based
    # upon your subscription settings. Or if the user cancels it.
    # puts data_object
    puts "Subscription canceled: #{event.id}"
  end

  if event.type == 'customer.subscription.updated'
    # handle subscription updated
    # puts data_object
    puts "Subscription updated: #{event.id}"
  end

  if event.type == 'customer.subscription.created'
    # handle subscription created
    # puts data_object
    puts "Subscription created: #{event.id}"
  end

  if event.type == 'customer.subscription.trial_will_end'
    # handle subscription trial ending
    # puts data_object
    puts "Subscription trial will end: #{event.id}"
  end

  if event.type == 'entitlements.active_entitlement_summary.updated'
    # handle active entitlement summary updated
    # puts data_object
    puts "Active entitlement summary updated: #{event.id}"
  end

  content_type 'application/json'
  {
    status: 'success'
  }.to_json
end
import stripe
\# This is a public sample test API key.
# Don’t submit any personally identifiable information in requests made with this key.
# Sign in to see your own test API key embedded in code samples.
\# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = stripe.StripeClient('<<YOUR_SECRET_KEY>>')
    try:
        prices = client.v1.prices.list(params={
            'lookup_keys': [request.form['lookup_key']],
            'expand': ['data.product'],
        })

        checkout_session = client.v1.checkout.sessions.create(params={
            'line_items': [
                {
                    'price': prices.data[0].id,
                    'quantity': 1,
                },
            ],
            'mode': 'subscription',
            'success_url': YOUR_DOMAIN +
            '/success.html?session_id={CHECKOUT_SESSION_ID}',
            'success_url': YOUR_DOMAIN +
            '?success=true&session_id={CHECKOUT_SESSION_ID}',
            'subscription_data': {
                'trial_period_days': 7,
                'billing_cycle_anchor': 1672531200,
            },
            'subscription_data': {
                'billing_cycle_anchor': 1672531200,
            },
            'discounts': [
                {
                    'coupon': '{{COUPON_ID}}'
                }
            ],
            'customer': 'cus_123',
            'customer_account': 'acct_123',
            'automatic_tax': {
              'enabled': True
            },
        })
        return redirect(checkout_session.url, code=303)
    portalSession = client.v1.billing_portal.sessions.create(params={
        'customer': checkout_session.customer,
        'return_url': return_url,
    })
    portalSession = stripe.billing_portal.Session.create(
        customer_account=checkout_session.customer_account,
        return_url=return_url,
    )
    return redirect(portalSession.url, code=303)
@app.route('/webhook', methods=['POST'])
def webhook_received():
    \# Replace this endpoint secret with your endpoint's unique secret
    # If you are testing with the CLI, find the secret by running 'stripe listen'
    # If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    # at https://dashboard.stripe.com/webhooks
    webhook_secret = 'whsec_12345'
    request_data = json.loads(request.data)

    if webhook_secret:
        # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
        signature = request.headers.get('stripe-signature')
        try:
            event = client.construct_event(
                payload=request.data, sig_header=signature, secret=webhook_secret)
            data = event['data']
        except Exception as e:
            return e
        # Get the type of webhook event sent - used to check the status of PaymentIntents.
        event_type = event['type']
    else:
        data = request_data['data']
        event_type = request_data['type']
    data_object = data['object']

    print('event ' + event_type)

    if event_type == 'checkout.session.completed':
        print('🔔 Payment succeeded!')
    elif event_type == 'customer.subscription.trial_will_end':
        print('Subscription trial will end')
    elif event_type == 'customer.subscription.created':
        print('Subscription created %s', event.id)
    elif event_type == 'customer.subscription.updated':
        print('Subscription created %s', event.id)
    elif event_type == 'customer.subscription.deleted':
        # handle subscription canceled automatically based
        # upon your subscription settings. Or if the user cancels it.
        print('Subscription canceled: %s', event.id)
    elif event_type == 'entitlements.active_entitlement_summary.updated':
        # handle active entitlement summary updated
        print('Active entitlement summary updated: %s', event.id)

    return jsonify({'status': 'success'})
certifi==2026.1.4
chardet==5.2.0
click==8.3.1
Flask==3.1.2
idna==3.11
itsdangerous==2.2.0
Jinja2==3.1.6
MarkupSafe==3.0.3
requests==2.32.5
stripe==15.0.0
toml==0.10.2
Werkzeug==3.1.5
  $session = $stripe->billingPortal->sessions->create([
    'customer' => $checkout_session->customer,
    'return_url' => $return_url,
  ]);
  $session = $stripe->billingPortal->sessions->create([
    'customer_account' => $checkout_session->customer_account,
    'return_url' => $return_url,
  ]);
  header("HTTP/1.1 303 See Other");
  header("Location: " . $session->url);
// Replace this endpoint secret with your endpoint's unique secret
// If you are testing with the CLI, find the secret by running 'stripe listen'
// If you are using an endpoint defined with the API or dashboard, look in your webhook settings
// at https://dashboard.stripe.com/webhooks
$endpoint_secret = 'whsec_12345';

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
// Handle the event
switch ($event->type) {
  case 'customer.subscription.trial_will_end':
    $subscription = $event->data->object; // contains a \Stripe\Subscription
    // Then define and call a method to handle the trial ending.
    // handleTrialWillEnd($subscription);
    break;
  case 'customer.subscription.created':
    $subscription = $event->data->object; // contains a \Stripe\Subscription
    // Then define and call a method to handle the subscription being created.
    // handleSubscriptionCreated($subscription);
    break;
  case 'customer.subscription.deleted':
    $subscription = $event->data->object; // contains a \Stripe\Subscription
    // Then define and call a method to handle the subscription being deleted.
    // handleSubscriptionDeleted($subscription);
    break;
  case 'customer.subscription.updated':
    $subscription = $event->data->object; // contains a \Stripe\Subscription
    // Then define and call a method to handle the subscription being updated.
    // handleSubscriptionUpdated($subscription);
    break;
  case 'entitlements.active_entitlement_summary.updated':
    $subscription = $event->data->object; // contains a \Stripe\Subscription
    // Then define and call a method to handle active entitlement summary updated.
    // handleEntitlementUpdated($subscription);
    break;
  default:
    // Unexpected event type
    echo 'Received unknown event type';
}
// Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
$stripeSecretKey = '<<YOUR_SECRET_KEY>>';
$stripe = new \Stripe\StripeClient($stripeSecretKey);
  $prices = $stripe->prices->all([
    // retrieve lookup_key from form data POST body
    'lookup_keys' => [$_POST['lookup_key']],
    'expand' => ['data.product']
  ]);
  $checkout_session = $stripe->checkout->sessions->create([
    'line_items' => [[
      'price' => $prices->data[0]->id,
      'quantity' => 1,
    ]],
    'mode' => 'subscription',
    'success_url' => $YOUR_DOMAIN . '/success.html?session_id={CHECKOUT_SESSION_ID}',
    'success_url' => $YOUR_DOMAIN . '?success=true&session_id={CHECKOUT_SESSION_ID}',
    'subscription_data' => [
      'trial_period_days' => 7,
      'billing_cycle_anchor' => 1672531200,
    ],
    'subscription_data' => [
      'billing_cycle_anchor' => 1672531200,
    ],
    'discounts' => [[
        'coupon' => '{{COUPON_ID}}',
    ]],
    'customer' => 'cus_123',
    'automatic_tax' => [
      'enabled' => true,
    ],
  ]);
  header("HTTP/1.1 303 See Other");
  header("Location: " . $checkout_session->url);
            // This is a public sample test API key.
            // Don’t submit any personally identifiable information in requests made with this key.
            // Sign in to see your own test API key embedded in code samples.
            // Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
            services.AddSingleton(new StripeClient("<<YOUR_SECRET_KEY>>"));
            var priceOptions = new PriceListOptions
            {
                LookupKeys = new List<string> {
                    Request.Form["lookup_key"]
                }
            };
            StripeList<Price> prices = _client.V1.Prices.List(priceOptions);
            var options = new SessionCreateOptions
            {
                LineItems = new List<SessionLineItemOptions>
                {
                  new SessionLineItemOptions
                  {
                    Price = prices.Data[0].Id,
                    Quantity = 1,
                  },
                },
                Mode = "subscription",
                SuccessUrl = domain + "/success.html?session_id={CHECKOUT_SESSION_ID}",
                SuccessUrl = domain + "?success=true&session_id={CHECKOUT_SESSION_ID}",
                SubscriptionData = new SessionSubscriptionDataOptions
                {
                    TrialPeriodDays = 7,
                    BillingCycleAnchor = 1672531200,
                },
                SubscriptionData = new SessionSubscriptionDataOptions
                {
                    BillingCycleAnchor = 1672531200,
                },
                Customer = "cus_123",
      CustomerAccount: stripe.String("acct_123"),
                AutomaticTax = new SessionAutomaticTaxOptions { Enabled = true },
                CustomerAccount = "acct_123",
            };
            Session session = _client.V1.Checkout.Sessions.Create(options);
            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);
            var options = new Stripe.BillingPortal.SessionCreateOptions
            {
                Customer = checkoutSession.CustomerId,
                ReturnUrl = returnUrl,
            };
            var session = _client.V1.BillingPortal.Sessions.Create(options);
            var options = new Stripe.BillingPortal.SessionCreateOptions
            {
                CustomerAccount = checkoutSession.CustomerAccount,
                ReturnUrl = returnUrl,
            };
            var session = _client.V1.BillingPortal.Sessions.Create(options);
            Response.Headers.Add("Location", session.Url);
            return new StatusCodeResult(303);
    [Route("webhook")]
    [ApiController]
    public class WebhookController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> Index()
        {
            var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
            // Replace this endpoint secret with your endpoint's unique secret
            // If you are testing with the CLI, find the secret by running 'stripe listen'
            // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
            // at https://dashboard.stripe.com/webhooks
            const string endpointSecret = "whsec_12345";
            try
            {
                var stripeEvent = EventUtility.ParseEvent(json);
                var signatureHeader = Request.Headers["Stripe-Signature"];
                stripeEvent = EventUtility.ConstructEvent(json,
                        signatureHeader, endpointSecret);
                // If on SDK version < 46, use class Events instead of EventTypes
                if (stripeEvent.Type == EventTypes.CustomerSubscriptionDeleted)
                {
                    var subscription = stripeEvent.Data.Object as Subscription;
                    Console.WriteLine("A subscription was canceled.", subscription.Id);
                    // Then define and call a method to handle the successful payment intent.
                    // handleSubscriptionCanceled(subscription);
                }
                else if (stripeEvent.Type == EventTypes.CustomerSubscriptionUpdated)
                {
                    var subscription = stripeEvent.Data.Object as Subscription;
                    Console.WriteLine("A subscription was updated.", subscription.Id);
                    // Then define and call a method to handle the successful payment intent.
                    // handleSubscriptionUpdated(subscription);
                }
                else if (stripeEvent.Type == EventTypes.CustomerSubscriptionCreated)
                {
                    var subscription = stripeEvent.Data.Object as Subscription;
                    Console.WriteLine("A subscription was created.", subscription.Id);
                    // Then define and call a method to handle the successful payment intent.
                    // handleSubscriptionUpdated(subscription);
                }
                else if (stripeEvent.Type == EventTypes.CustomerSubscriptionTrialWillEnd)
                {
                    var subscription = stripeEvent.Data.Object as Subscription;
                    Console.WriteLine("A subscription trial will end", subscription.Id);
                    // Then define and call a method to handle the successful payment intent.
                    // handleSubscriptionUpdated(subscription);
                }
                else if (stripeEvent.Type == EventTypes.ActiveEntitlementSummaryUpdated)
                {
                    var summary = stripeEvent.Data.Object as ActiveEntitlementSummary;
                    Console.WriteLine("Active entitlement summary updated for customer", summary.Customer);
                    // Then define and call a method to handle active entitlement summary updated.
                    // handleEntitlementUpdated($subscription);
                }
                else
                {
                    Console.WriteLine("Unhandled event type: {0}", stripeEvent.Type);
                }
                return Ok();
            }
            catch (StripeException e)
            {
                Console.WriteLine("Error: {0}", e.Message);
                return BadRequest();
            }
        }
    "github.com/stripe/stripe-go/v85"
    "github.com/stripe/stripe-go/v85/webhook"
    // This is a public sample test API key.
    // Don’t submit any personally identifiable information in requests made with this key.
    // Sign in to see your own test API key embedded in code samples.
    // Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
    sc = stripe.NewClient("<<YOUR_SECRET_KEY>>")
    params := &stripe.PriceListParams{
      LookupKeys: stripe.StringSlice([]string{
        lookup_key,
      }),
    }
    var price *stripe.Price
    for p, err := range sc.V1Prices.List(context.TODO(), params).All(context.TODO()) {
      if err != nil {
        log.Printf("sc.V1Prices.List: %v", err)
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
      }
      price = p
      break
    }
    if price == nil {
      log.Printf(">>>>>>>>>>>>>>>>>>>>>>>>>>> Add a price lookup key to checkout.html for the demo <<<<<<<<<<<<<<<<<<<<<<<<")
      return
    }
    checkoutParams := &stripe.CheckoutSessionCreateParams{
      Mode: stripe.String(stripe.CheckoutSessionModeSubscription),
      LineItems: []*stripe.CheckoutSessionCreateLineItemParams{
        &stripe.CheckoutSessionCreateLineItemParams{
          Price:    stripe.String(price.ID),
          Quantity: stripe.Int64(1),
        },
      },
      SubscriptionData: &stripe.CheckoutSessionCreateSubscriptionDataParams{
        TrialPeriodDays: stripe.Int64(7),
        BillingCycleAnchor: stripe.Int64(1672531200),
      },
      SubscriptionData: &stripe.CheckoutSessionCreateSubscriptionDataParams{
        BillingCycleAnchor: stripe.Int64(1672531200),
      },
      Discounts: []*stripe.CheckoutSessionCreateDiscountParams{
        &stripe.CheckoutSessionCreateDiscountParams{
          Coupon: stripe.String("gBY6sFUf"),
        },
      },
      SuccessURL: stripe.String(domain + "/success.html?session_id={CHECKOUT_SESSION_ID}"),
      SuccessURL: stripe.String(domain + "?success=true&session_id={CHECKOUT_SESSION_ID}"),
      Customer: stripe.String("cus_123"),
      CustomerAccount: stripe.String("acct_123"),
      AutomaticTax: &stripe.CheckoutSessionCreateAutomaticTaxParams{
        Enabled: stripe.Bool(true),
      },
    }

    s, err := sc.V1CheckoutSessions.Create(context.TODO(), checkoutParams)
    http.Redirect(w, r, s.URL, http.StatusSeeOther)
    // Authenticate your user.
    params := &stripe.BillingPortalSessionCreateParams{
      Customer:  stripe.String(s.Customer.ID),
      ReturnURL: stripe.String(domain),
    }
    ps, _ := sc.V1BillingPortalSessions.Create(context.TODO(), params)
    log.Printf("sc.V1BillingPortalSessions.Create: %v", ps.URL)
    // Authenticate your user.
    params := &stripe.BillingPortalSessionCreateParams{
      CustomerAccount: stripe.String(s.CustomerAccount),
      ReturnURL: stripe.String(domain),
    }
    ps, _ := sc.V1BillingPortalSessions.Create(context.TODO(), params)
    log.Printf("sc.V1BillingPortalSessions.Create: %v", ps.URL)
    http.Redirect(w, r, ps.URL, http.StatusSeeOther)
func handleWebhook(w http.ResponseWriter, req *http.Request) {
    const MaxBodyBytes = int64(65536)
    bodyReader := http.MaxBytesReader(w, req.Body, MaxBodyBytes)
    payload, err := ioutil.ReadAll(bodyReader)
    if err != nil {
      fmt.Fprintf(os.Stderr, "Error reading request body: %v\n", err)
      w.WriteHeader(http.StatusServiceUnavailable)
      return
    }
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    endpointSecret := "whsec_12345"
    signatureHeader := req.Header.Get("Stripe-Signature")
    event, err := sc.ConstructEvent(payload, signatureHeader, endpointSecret)
    if err != nil {
      fmt.Fprintf(os.Stderr, "⚠️  Webhook signature verification failed. %v\n", err)
      w.WriteHeader(http.StatusBadRequest) // Return a 400 error on a bad signature
      return
    }
    // Unmarshal the event data into an appropriate struct depending on its Type
    switch event.Type {
    case "customer.subscription.deleted":
      var subscription stripe.Subscription
      err := json.Unmarshal(event.Data.Raw, &subscription)
      if err != nil {
        fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
        w.WriteHeader(http.StatusBadRequest)
        return
      }
      log.Printf("Subscription deleted for %d.", subscription.ID)
      // Then define and call a func to handle the deleted subscription.
      // handleSubscriptionCanceled(subscription)
    case "customer.subscription.updated":
      var subscription stripe.Subscription
      err := json.Unmarshal(event.Data.Raw, &subscription)
      if err != nil {
        fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
        w.WriteHeader(http.StatusBadRequest)
        return
      }
      log.Printf("Subscription updated for %d.", subscription.ID)
      // Then define and call a func to handle the successful attachment of a PaymentMethod.
      // handleSubscriptionUpdated(subscription)
    case "customer.subscription.created":
      var subscription stripe.Subscription
      err := json.Unmarshal(event.Data.Raw, &subscription)
      if err != nil {
        fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
        w.WriteHeader(http.StatusBadRequest)
        return
      }
      log.Printf("Subscription created for %d.", subscription.ID)
      // Then define and call a func to handle the successful attachment of a PaymentMethod.
      // handleSubscriptionCreated(subscription)
    case "customer.subscription.trial_will_end":
      var subscription stripe.Subscription
      err := json.Unmarshal(event.Data.Raw, &subscription)
      if err != nil {
        fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
        w.WriteHeader(http.StatusBadRequest)
        return
      }
      log.Printf("Subscription trial will end for %d.", subscription.ID)
      // Then define and call a func to handle the successful attachment of a PaymentMethod.
      // handleSubscriptionTrialWillEnd(subscription)
    case "entitlements.active_entitlement_summary.updated":
      var subscription stripe.Subscription
      err := json.Unmarshal(event.Data.Raw, &subscription)
      if err != nil {
        fmt.Fprintf(os.Stderr, "Error parsing webhook JSON: %v\n", err)
        w.WriteHeader(http.StatusBadRequest)
        return
      }
      log.Printf("Active entitlement summary updated for %d.", subscription.ID)
      // Then define and call a func to handle active entitlement summary updated.
      // handleEntitlementUpdated(subscription)
    default:
      fmt.Fprintf(os.Stderr, "Unhandled event type: %s\n", event.Type)
    }
    w.WriteHeader(http.StatusOK)
  }
require github.com/stripe/stripe-go/v85 v85.0.0
    // This is a public sample test API key.
    // Don’t submit any personally identifiable information in requests made with this key.
    // Sign in to see your own test API key embedded in code samples.
    // Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
    StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");
      PriceListParams priceParams = PriceListParams.builder().addLookupKey(request.queryParams("lookup_key")).build();
      StripeCollection<Price> prices = client.v1().prices().list(priceParams);
      SessionCreateParams params = SessionCreateParams.builder()
          .addLineItem(
              SessionCreateParams.LineItem.builder().setPrice(prices.getData().get(0).getId()).setQuantity(1L).build())
          .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
          .setSuccessUrl(YOUR_DOMAIN + "/success.html?session_id={CHECKOUT_SESSION_ID}")
          .setSuccessUrl(YOUR_DOMAIN + "?success=true&session_id={CHECKOUT_SESSION_ID}")
          .setSubscriptionData(SessionCreateParams.SubscriptionData.builder().setTrialPeriodDays(7L).setBillingCycleAnchor(1672531200).build())
          .setSubscriptionData(SessionCreateParams.SubscriptionData.builder().setBillingCycleAnchor(1672531200).build())
          .addDiscount(SessionCreateParams.Discount.builder().setCoupon("{{COUPON_ID}}").build())
          .setCustomer("cus_JyTTNqVDAoRYE1")
          .setCustomerAccount("acct_123")
          .setAutomaticTax(
            SessionCreateParams.AutomaticTax.builder()
              .setEnabled(true)
              .build())
          .build();
      Session session = client.v1().checkout().sessions().create(params);
      response.redirect(session.getUrl(), 303);
      com.stripe.param.billingportal.SessionCreateParams params = new com.stripe.param.billingportal.SessionCreateParams.Builder()
          .setCustomer(checkoutSession.getCustomer())
          .setReturnUrl(YOUR_DOMAIN).build();

      com.stripe.model.billingportal.Session portalSession = client.v1().billingPortal().sessions().create(params);

      com.stripe.param.billingportal.SessionCreateParams params = new com.stripe.param.billingportal.SessionCreateParams.Builder()
          .setCustomerAccount(checkoutSession.getCustomerAccount())
          .setReturnUrl(YOUR_DOMAIN).build();

      com.stripe.model.billingportal.Session portalSession = client.v1().billingPortal().sessions().create(params);

      response.redirect(portalSession.getUrl(), 303);
      return "";
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
      if (endpointSecret != null && sigHeader != null) {
        // Only verify the event if you have an endpoint secret defined.
        // Otherwise use the basic event deserialized with GSON.
        try {
          event = client.constructEvent(payload, sigHeader, endpointSecret);
        } catch (SignatureVerificationException e) {
          // Invalid signature
          System.out.println("⚠️  Webhook error while validating signature.");
          response.status(400);
          return "";
        }
      }
      // Deserialize the nested object inside the event
      EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
      StripeObject stripeObject = null;
      if (dataObjectDeserializer.getObject().isPresent()) {
        stripeObject = dataObjectDeserializer.getObject().get();
      } else {
        // Deserialization failed, probably due to an API version mismatch.
        // Refer to the Javadoc documentation on `EventDataObjectDeserializer` for
        // instructions on how to handle this case, or return an error here.
      }
      // Handle the event
      Subscription subscription = null;
      switch (event.getType()) {
        case "customer.subscription.deleted":
          subscription = (Subscription) stripeObject;
          // Then define and call a function to handle the event
          // customer.subscription.deleted
          // handleSubscriptionTrialEnding(subscription);
        case "customer.subscription.trial_will_end":
          subscription = (Subscription) stripeObject;
          // Then define and call a function to handle the event
          // customer.subscription.trial_will_end
          // handleSubscriptionDeleted(subscriptionDeleted);
        case "customer.subscription.created":
          subscription = (Subscription) stripeObject;
          // Then define and call a function to handle the event
          // customer.subscription.created
          // handleSubscriptionCreated(subscription);
        case "customer.subscription.updated":
          subscription = (Subscription) stripeObject;
          // Then define and call a function to handle the event
          // customer.subscription.updated
          // handleSubscriptionUpdated(subscription);
        case "entitlements.active_entitlement_summary.updated":
          subscription = (Subscription) stripeObject;
          // Then define and call a function to handle the event
          // entitlements.active_entitlement_summary.updated
          // handleEntitlementUpdated(subscription);
          // ... handle other event types
        default:
          System.out.println("Unhandled event type: " + event.getType());
      }
      response.status(200);
      return "";
    });
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
## Next steps

#### [Update subscription prices](https://docs.stripe.com/billing/subscriptions/change-price.md)

Update subscriptions to handle customers upgrading or downgrading their pricing plan.

#### [Apply prorations](https://docs.stripe.com/billing/subscriptions/prorations.md)

Learn how to adjust a customer’s invoice to accurately reflect mid-cycle pricing changes.

#### [Offer upsells](https://docs.stripe.com/payments/checkout/upsells.md)

Incentivize customers with discounts for committing to longer billing intervals.
