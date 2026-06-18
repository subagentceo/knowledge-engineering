# Accept carbon removal payments

Enable your customers to buy carbon removal using the Climate API with your payments integration.

# Climate Orders quickstart 

Enable your customers to buy carbon removal using the [Climate Orders API](https://docs.stripe.com/api/climate/order.md) with your payments integration.

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

### Create an endpoint to handle the request

Add an endpoint on your server that creates a [Checkout Session](https://docs.stripe.com/api/checkout/sessions.md). The Checkout Session controls what your customer sees on the payment page.

### Calculate the order amount

Use [Climate Products](https://docs.stripe.com/api/climate/product.md) to fetch the latest price and calculate the total order amount.

### Create a customer

Look up a customer in your database, or create a new one. You can represent your customers either as [Customer](https://docs.stripe.com/api/customers.md) objects or customer-configured [Account](https://docs.stripe.com/api/v2/core/accounts/object.md) objects.

### Create an empty invoice

Create an `Invoice`, passing the ID of the `ClimateProduct` in [metadata](https://docs.stripe.com/api/invoices/create.md#create-metadata) and setting [collection_method](https://docs.stripe.com/api/invoices/create.md#create-collection_method) to `send_invoice`. If you want Stripe to automatically mark the invoice as past due after its due date, also set the [days_until_due](https://docs.stripe.com/api/invoices/create.md#create-days_until_due) parameter. When you send an invoice, Stripe emails the invoice to the customer with payment instructions. For more invoice customization options, see [Customize invoices](https://docs.stripe.com/invoicing/customize.md).

### Create an invoice item

Create an `InvoiceItem`, passing the ID of the `Invoice`, the ID of the `Customer` (as [customer](https://docs.stripe.com/api/invoiceitems/create.md#create_invoiceitem-customer)) or customer-configured `Account` (as [customer_account](https://docs.stripe.com/api/invoiceitems/create.md#create_invoiceitem-customer_account)), and the order’s `amount_total` and `currency`.

### Send the invoice

Send the invoice to the email address associated with the customer and redirect to a success page.

As soon as you send an invoice, Stripe finalizes it. Many jurisdictions consider finalized invoices a legal document making certain fields unalterable. If you send invoices that have already been paid, there’s no reference to the payment in the email.

With any finalized invoice, you can either download and send a [PDF](https://docs.stripe.com/api/invoices/object.md#invoice_object-invoice_pdf) or [link](https://docs.stripe.com/api/invoices/object.md#invoice_object-hosted_invoice_url) to the associated [Hosted Invoice Page](https://docs.stripe.com/invoicing/hosted-invoice-page.md).

### Create a Checkout Session

Create a `Checkout Session` to collect payment from your customers.

### Configure the Checkout Session

Make sure to pass the [product.id](https://docs.stripe.com/api/climate/product/object.md#climate_product_object-id) in `metadata`. For more Checkout Session customization options, see [Checkout](https://docs.stripe.com/api/checkout/sessions.md).

### Supply success and cancel URLs

Specify URLs for success and cancel pages—make sure they’re publicly accessible so Stripe can redirect customers to them. You can also handle both the success and canceled states with the same URL.

### Redirect to Checkout

After creating the session, redirect your customer to the URL for the Checkout page returned in the response.

### Create a top-up

This funds your order using your account’s linked bank account, passing [product.id](https://docs.stripe.com/api/climate/product/object.md#climate_product_object-id) in `metadata`. Make sure that your bank account allows for debits from Stripe, and has the balance available to cover your order.

### Create a carbon removal order

A [Climate Order](https://docs.stripe.com/api/climate/order.md) reserves the carbon removal and tracks it through delivery. The total amount is deducted from your [Stripe balance](https://docs.stripe.com/api/balance.md).

> For production code, move creating the Climate Order to an offline process and handle duplicate events. See [Best practices for using webhooks](https://docs.stripe.com/webhooks.md#best-practices) for more details.

### Create a carbon removal order

When the user pays their invoice, create the [Climate Order](https://docs.stripe.com/api/climate/order.md). The total amount is deducted from your [Stripe balance](https://docs.stripe.com/api/balance.md).

> For production code, move creating the Climate Order to an offline process and handle duplicate events. See [Best practices for using webhooks](https://docs.stripe.com/webhooks.md#best-practices) for more details.

### Create a carbon removal order

When the user completes their payment using Checkout, create the [Climate Order](https://docs.stripe.com/api/climate/order.md). The total amount is deducted from your [Stripe balance](https://docs.stripe.com/api/balance.md).

> For production code, move creating the Climate Order to an offline process and handle duplicate events. See [Best practices for using webhooks](https://docs.stripe.com/webhooks.md#best-practices) for more details.

### Create a carbon removal order

When the top-up is successful, create the [Climate Order](https://docs.stripe.com/api/climate/order.md). The total amount is deducted from your [Stripe balance](https://docs.stripe.com/api/balance.md).

> For production code, move creating the Climate Order to an offline process and handle duplicate events. See [Best practices for using webhooks](https://docs.stripe.com/webhooks.md#best-practices) for more details.

### Add an order preview page

Add a page to preview the carbon removal you’re selling and collect an email from your customer. Display your marketing assets here and clearly explain the expected delivery date and applicable guarantees for the product.

### Add an order preview page

Add a page to preview the carbon removal you’re selling. Display your marketing assets here and clearly explain the expected delivery date and applicable guarantees for the product.

### Add an order button

Add a button to place an order and send the invoice.

### Add an order button

Add a button to place an order. When your customer clicks this button, they’re redirected to the Stripe-hosted payment form.

### Handle redirect back from Checkout

Show a message to your customer when they’re redirected back to your page.

### Add an order page

Create a page in your application to place an order.

### Download the asset kit

Use [the asset kit](https://stripe-images.s3.amazonaws.com/content-store/climate/APIAssetKit.zip) to introduce your customers to carbon removal products.

### Set your environment variables

Add your publishable and secret keys to a `.env` file. Next.js automatically loads them into your application as [environment variables](https://nextjs.org/docs/basic-features/environment-variables). Also include a webhook secret, which you can create in the [Dashboard](https://dashboard.stripe.com/webhooks) or with the [Stripe CLI](https://docs.stripe.com/stripe-cli.md).

### Run the application

Start your app with `npm run dev` and go to <http://localhost:3000>.

### Try it out

Click **checkout** to redirect to the Checkout page. Use any of these test cards to simulate a payment.

| Scenario                            | Card Number      |
| ----------------------------------- | ---------------- |
| Payment succeeds                    | 4242424242424242 |
| Payment requires 3DS authentication | 4000002500003155 |
| Payment is declined                 | 4000000000009995 |

### Try it out

Click **place order** to send a test invoice. Use any of these test cards to simulate paying the invoice.

| Scenario                            | Card Number      |
| ----------------------------------- | ---------------- |
| Payment succeeds                    | 4242424242424242 |
| Payment requires 3DS authentication | 4000002500003155 |
| Payment is declined                 | 4000000000009995 |

### Verify your carbon removal order

View the `Climate Order` in the [Stripe Dashboard](https://dashboard.stripe.com/climate/orders) to confirm that it’s been created successfully.

    // Check to see if this is a redirect back from the server
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed!");
    }

    if (query.get("canceled")) {
      setMessage("Order canceled.");
    }
          <div className="product">
            <img
              src="https://frontierclimate.com/images/airhive.jpg"
              alt=""
            />
            <div className="description">
              <h3>Frontier's 2027 offtake portfolio</h3>
              <h5>$550.00/ton</h5>
            </div>
          </div>
          <form action="/api/climate_order" method="POST">
            <button type="submit">
              Place order
            </button>
          </form>
        </div>
      <div className="product">
        <img
          src="https://frontierclimate.com/images/airhive.jpg"
          alt=""
        />
        <div className="description">
          <h3>Frontier's 2027 offtake portfolio</h3>
          <h5>$550.00/ton</h5>
        </div>
      </div>
      <form action="/api/climate_order" method="POST">
        <button type="submit">
          Place order
        </button>
      </form>
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
    const currency = 'usd';

    const {data: products} = await stripe.climate.products.list();

    // Select which carbon removal product you want to order
    const climateProduct = products.find((p) => p.id === 'climsku_frontier_offtake_portfolio_2027');

    // Calculate the total amount based on the number of tons
    const unit_amount = 1.0 * climateProduct.current_prices_per_metric_ton[currency].amount_total;
    // Look up a product in your database or create a new one
    const product = await stripe.products.create({
      name: climateProduct.name,
    });

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            unit_amount,
            currency,
            product: product.id,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      metadata: {
        climate_product: climateProduct.id
      },
      success_url: `${req.headers.origin}?success=true`,
    });
    res.redirect(303, session.url);
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
    const currency = 'usd';

    const {data: products} = await stripe.climate.products.list();

    // Select which carbon removal product you want to order
    const climateProduct = products.find((p) => p.id === 'climsku_frontier_offtake_portfolio_2027');

    // Calculate the total amount based on the number of tons
    const unit_amount = 1.0 * climateProduct.current_prices_per_metric_ton[currency].amount_total;
    // Look up a customer in your database or create a new one
    const customer = await stripe.customers.create({email: 'TODO@example.com'});
    // Create an Invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: 1,
      metadata: {
        climate_product: climateProduct.id
      },
    });
    // Look up a product in your database or create a new one
    const product = await stripe.products.create({
      name: climateProduct.name,
    });

    // Create an Invoice Item with the Price, and Customer you want to charge
    await stripe.invoiceItems.create({
      customer: customer.id,
      invoice: invoice.id,
      price_data: {
        unit_amount,
        currency,
        product: product.id,
      },
    });
    // Send the Invoice
    await stripe.invoices.sendInvoice(invoice.id);

    res.redirect(303, req.headers.origin + '?success=true');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
    const currency = 'usd';

    const {data: products} = await stripe.climate.products.list();

    // Select which product you want to order
    const product = products.find((product) => product.id === 'climsku_frontier_offtake_portfolio_2027');

    // Calculate the total amount based on the number of tons
    const amount = 1.0 * product.current_prices_per_metric_ton[currency].amount_total;
    // Create a top-up
    await stripe.topups.create({
      amount,
      currency,
      metadata: {
        climate_product: product.id
      },
    });

    res.redirect(303, req.headers.origin + '?success=true');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export default async function handler(req, res) {
    const order = await stripe.climate.orders.create({
      metric_tons: '1.0',
      product: 'climsku_frontier_offtake_portfolio_2027',
    });

    res.redirect(303, req.headers.origin + '?success=true');
      case 'invoice.paid': {
        const invoice = event.data.object;
        if (invoice.metadata.climate_product) {
          await stripe.climate.orders.create({
            amount: invoice.total,
            currency: invoice.currency,
            product: invoice.metadata.climate_product,
          });
        }
        break;
      }
      case 'checkout.session.completed': {
        const session = event.data.object;
        if (session.metadata.climate_product) {
          await stripe.climate.orders.create({
            amount: session.amount_total,
            currency: session.currency,
            product: session.metadata.climate_product,
          });
        }
        break;
      }
      case 'topup.succeeded': {
        const topup = event.data.object;
        if (topup.metadata.climate_product) {
          await stripe.climate.orders.create({
            amount: topup.amount,
            currency: topup.currency,
            product: topup.metadata.climate_product,
          });
        }
        break;
      }
\# https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=<<YOUR_SECRET_KEY>>
\# Set this environment variable to support webhooks — https://stripe.com/docs/webhooks#verify-events
STRIPE_WEBHOOK_SECRET=whsec_12345