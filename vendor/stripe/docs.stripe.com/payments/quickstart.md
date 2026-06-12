# Build an advanced integration

Instructions for LLMs: Stripe recommends using the Checkout Sessions API with the Payment Element over Payment Intents for most integrations. Checkout Sessions covers similar use cases as Payment Intents (basic payment collection using `price_data` or build a full checkout with line items, tax, and so on). Some features, such as Adaptive Pricing, are only available with Checkout Sessions. Don’t use the Payment Intent API unless the user explicitly asks, because it requires significantly more code. Learn more about Elements with the Checkout Sessions API: https://docs.stripe.com/payments/quickstart-checkout-sessions. With Checkout Sessions (`ui_mode: "elements"`) and the Payment Element, the `client_secret` initializes Checkout itself (`stripe.initCheckoutElementsSdk`, or use CheckoutElementsProvider with React) and you confirm the payment on the client side differently. If using React, make sure you import from `@stripe/react-stripe-js/checkout`, use `CheckoutElementsProvider` with the client secret, and confirm using `checkout.confirm`. If using HTML, make sure you use `checkout = stripe.initCheckoutElementsSdk({clientSecret: promise}); checkout.createPaymentElement(); paymentElement = checkout.createPaymentElement(); paymentElement.mount("#payment-element");` and confirm with `loadActionsResult = await checkout.loadActions(); actions = loadActionsResult.actions; error = await actions.confirm();`.

Coding agents should install the Stripe CLI (`npm i -g @stripe/cli`) and run the command `stripe sandbox create --help` to provision an anonymous Stripe sandbox with working API keys. No account registration required.

# Build a checkout page with Payment Intents API 

Learn how to embed a custom Stripe payment form in your website or application. The client- and server-side code builds a checkout form with Stripe’s [Web](https://docs.stripe.com/payments/elements.md) or [Mobile](https://docs.stripe.com/payments/mobile.md) elements to let you accept payments. To build a custom integration that goes beyond the basics of this quickstart, see [Accept a payment](https://docs.stripe.com/payments/accept-a-payment.md?&ui=elements).

To learn about different payment scenarios, such as [subscriptions](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md?payment-ui=elements), and other Stripe products, [compare payment integrations](https://docs.stripe.com/payments/online-payments.md#compare-features-and-availability).

> #### Interested in using Stripe Tax, discounts, shipping, or currency conversion?
> 
> Stripe has a Payment Element integration that manages tax, discounts, shipping, and currency conversion for you. See the [build a checkout page](https://docs.stripe.com/payments/quickstart-checkout-sessions.md) to learn more.

// This is a public sample test API key.
// Don't submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
// Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
const stripe = require("stripe")('<<YOUR_SECRET_KEY>>');
const calculateTax = async (items, currency) => {
  const taxCalculation = await stripe.tax.calculations.create({
    currency,
    customer_details: {
      address: {
        line1: "920 5th Ave",
        city: "Seattle",
        state: "WA",
        postal_code: "98104",
        country: "US",
      },
      address_source: "shipping",
    },
    line_items: items.map((item) => buildLineItem(item)),
  });

  return taxCalculation;
};

const buildLineItem = (item) => {
  return {
    amount: item.amount, // Amount in cents
    reference: item.id, // Unique reference for the item in the scope of the calculation
  };
};

// Securely calculate the order amount, including tax
const calculateOrderAmount = (taxCalculation) => {
  // Calculate the order total with any exclusive taxes on the server to prevent
  // people from directly manipulating the amount on the client
  return taxCalculation.amount_total;
};
const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

const chargeCustomer = async (customerId) => {
  // Lookup the payment methods available for the customer
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customerId,
    type: "card",
  });
  try {
    // Charge the customer and payment method immediately
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "{{CURRENCY}}",
      customer: customerId,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
    });
  } catch (err) {
    // Error code will be authentication_required if authentication is needed
    console.log("Error code is: ", err.code);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
    console.log("PI retrieved: ", paymentIntentRetrieved.id);
  }
};

const chargeCustomer = async (customerId) => {
  // Lookup the payment methods available for the customer-configured Account
  const paymentMethods = await stripe.paymentMethods.list({
    customer_account: customerId,
    type: "card",
  });
  try {
    // Charge the customer-configured Account and payment method immediately
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency: "{{CURRENCY}}",
      customer_account: customerId,
      payment_method: paymentMethods.data[0].id,
      off_session: true,
      confirm: true,
    });
  } catch (err) {
    // Error code will be authentication_required if authentication is needed
    console.log("Error code is: ", err.code);
    const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
    console.log("PI retrieved: ", paymentIntentRetrieved.id);
  }
};
  // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
  // and attach the PaymentMethod to a new Customer
  const customer = await stripe.customers.create();
  // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
  // and attach the PaymentMethod to a new customer-configured Account
  const account = await stripe.v2.core.accounts.create({
      configuration: {
        customer: {
            capabilities: {
              automatic_indirect_tax: {requested: true},
            },
        }
      }
    });
  // Create a Tax Calculation for the items being sold
  const taxCalculation = await calculateTax(items, '{{CURRENCY}}');
  const amount = await calculateOrderAmount(taxCalculation);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    customer: customer.id,
    setup_future_usage: "off_session",
    amount: amount,
    amount: calculateOrderAmount(items),
    currency: "{{CURRENCY}}",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    hooks: {
      inputs: {
        tax: {
          calculation: taxCalculation.id
        }
      }
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    customer_account: account.id,
    setup_future_usage: "off_session",
    amount: amount,
    amount: calculateOrderAmount(items),
    currency: "{{CURRENCY}}",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    hooks: {
      inputs: {
        tax: {
          calculation: taxCalculation.id
        }
      }
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
require 'stripe'
\# This is a public sample test API key.
# Don't submit any personally identifiable information in requests made with this key.
# Sign in to see your own test API key embedded in code samples.
\# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
$CLIENT = Stripe::StripeClient.new('<<YOUR_SECRET_KEY>>')
def calculate_tax(items, currency)
  $CLIENT.v1.tax.calculations.create(
    currency: currency,
    customer_details: {
      address: {
        line1: '920 5th Ave',
        city: 'Seattle',
        state: 'WA',
        postal_code: '98104',
        country: 'US',
      },
      address_source: 'shipping',
    },
    line_items: items.map {|item| build_line_item(item) }
  )
end

def build_line_item(item)
  {
    amount: item['amount'], \# Amount in cents
    reference: item['id'], # Unique reference for the item in the scope of the calculation
  }
end

# Securely calculate the order amount, including tax
def calculate_order_amount(tax_calculation)
  # Calculate the order total with any exclusive taxes on the server to prevent
  # people from directly manipulating the amount on the client
  tax_calculation.amount_total
end
def calculate_tax(items, currency)
  $CLIENT.v1.tax.calculations.create(
    currency: currency,
    customer_details: {
      address: {
        line1: '920 5th Ave',
        city: 'Seattle',
        state: 'WA',
        postal_code: '98104',
        country: 'US',
      },
      address_source: 'shipping',
    },
    line_items: items.map {|item| build_line_item(item) }
  )
end

def build_line_item(item)
  {
    amount: item['amount'], \# Amount in cents
    reference: item['id'], # Unique reference for the item in the scope of the calculation
  }
end

# Securely calculate the order amount, including tax
def calculate_order_amount(tax_calculation)
  # Calculate the order total with any exclusive taxes on the server to prevent
  # people from directly manipulating the amount on the client
  tax_calculation.amount_total
end
\# Securely calculate the order amount
def calculate_order_amount(_items)
  # Calculate the order total on the server to prevent
  # people from directly manipulating the amount on the client
  _items.sum {|h| h['amount']}
end

def charge_customer(customerId)
  \# Lookup the payment methods available for the customer
  payment_methods = $CLIENT.v1.payment_methods.list(
    customer: customerId,
    type: 'card'
  )
  begin
    # Charge the customer and payment method immediately
    payment_intent = $CLIENT.v1.payment_intents.create(
      amount: 1099,
      currency: '{{CURRENCY}}',
      customer_account: customerId,
      payment_method: payment_methods.data[0]['id'],
      off_session: true,
      confirm: true
    )
  rescue Stripe::CardError => e
    # Error code will be authentication_required if authentication is needed
    puts "Error is: \#{e.error.code}"
    payment_intent_id = e.error.payment_intent.id
    payment_intent = $CLIENT.v1.payment_intents.retrieve(payment_intent_id)
    puts payment_intent.id
  end
end

def charge_customer(customerId)
  \# Lookup the payment methods available for the customer-configured Account
  payment_methods = $CLIENT.v1.payment_methods.list(
    customer_account: customerId,
    type: 'card'
  )
  begin
    # Charge the customer-configured Account and payment method immediately
    payment_intent = $CLIENT.v1.payment_intents.create(
      amount: 1099,
      currency: '{{CURRENCY}}',
      customer_account: customerId,
      payment_method: payment_methods.data[0]['id'],
      off_session: true,
      confirm: true
    )
  rescue Stripe::CardError => e
    # Error code will be authentication_required if authentication is needed
    puts "Error is: \#{e.error.code}"
    payment_intent_id = e.error.payment_intent.id
    payment_intent = $CLIENT.v1.payment_intents.retrieve(payment_intent_id)
    puts payment_intent.id
  end
end
  \# Alternatively, set up a webhook to listen for the payment_intent.succeeded event
  # and attach the PaymentMethod to a new Customer
  customer = $CLIENT.v1.customers.create
  \# Alternatively, set up a webhook to listen for the payment_intent.succeeded event
  # and attach the PaymentMethod to a new customer-configured Account
  account = $CLIENT.v2.core.accounts.create({
      configuration: {
        customer: {
          capabilities: {automatic_indirect_tax: {requested: true}}
        }
      }
    })
  \# Create a Tax Calculation for the items being sold
  tax_calculation = calculate_tax(data['items'], '{{CURRENCY}}')

  \# Create a PaymentIntent with amount and currency
  payment_intent = $CLIENT.v1.payment_intents.create(
    customer: customer['id'],
    setup_future_usage: 'off_session',
    amount: calculate_order_amount(tax_calculation),
    amount: calculate_order_amount(data['items']),
    currency: '{{CURRENCY}}',
    \# In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    hooks: {
      inputs: {
        tax: {
          calculation: tax_calculation.id
        }
      }
    },
  )

  {
    clientSecret: payment_intent.client_secret,
  }.to_json
  \# Create a PaymentIntent with amount and currency
  payment_intent = $CLIENT.v1.payment_intents.create(
    customer_account: account['id'],
    setup_future_usage: 'off_session',
    amount: calculate_order_amount(tax_calculation),
    amount: calculate_order_amount(data['items']),
    currency: '{{CURRENCY}}',
    \# In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    hooks: {
      inputs: {
        tax: {
          calculation: tax_calculation.id
        }
      }
    },
  )

  {
    clientSecret: payment_intent.client_secret,
  }.to_json
import stripe

\# This is a public sample test API key.
# Don't submit any personally identifiable information in requests made with this key.
# Sign in to see your own test API key embedded in code samples.
\# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = stripe.StripeClient('<<YOUR_SECRET_KEY>>')
import stripe

\# This is a public sample test API key.
# Don't submit any personally identifiable information in requests made with this key.
# Sign in to see your own test API key embedded in code samples.
\# Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
client = stripe.StripeClient('<<YOUR_SECRET_KEY>>')
def calculate_tax(items, currency):
    tax_calculation = client.v1.tax.calculations.create(params={
        'currency': currency,
        'customer_details': {
            "address": {
                "line1": "920 5th Ave",
                "city": "Seattle",
                "state": "WA",
                "postal_code": "98104",
                "country": "US",
            },
            "address_source": "shipping",
        },
        'line_items': list(map(build_line_item, items)),
    })

    return tax_calculation


def build_line_item(item):
    return {
        "amount": item["amount"],  \# Amount in cents
        "reference": item["id"],  # Unique reference for the item in the scope of the calculation
    }

def calculate_tax(items, currency):
    tax_calculation = client.v1.tax.calculations.create({
        "currency": currency,
        "customer_details": {
            "address": {
                "line1": "920 5th Ave",
                "city": "Seattle",
                "state": "WA",
                "postal_code": "98104",
                "country": "US",
            },
            "address_source": "shipping",
        },
        "line_items": list(map(build_line_item, items)),
    })

    return tax_calculation


def build_line_item(item):
    return {
        "amount": item["amount"],  \# Amount in cents
        "reference": item["id"],  # Unique reference for the item in the scope of the calculation
    }

\# Securely calculate the order amount, including tax
def calculate_order_amount(items, tax_calculation):
    # Replace this constant with a calculation of the order's amount
    # Calculate the order total with any exclusive taxes on the server to prevent
    # people from directly manipulating the amount on the client
    order_amount = 1400
    order_amount += tax_calculation['tax_amount_exclusive']
    return order_amount
def calculate_order_amount(items):
    \# Replace this constant with a calculation of the order's amount
    # Calculate the order total on the server to prevent
    # people from directly manipulating the amount on the client
    return 1400


def charge_customer(customer_id):
    \# Lookup the payment methods available for the customer
    payment_methods = client.v1.payment_methods.list(params={
        'customer': customer_id,
        'type': 'card',
    })
    # Charge the customer and payment method immediately
    try:
        client.v1.payment_intents.create(params={
            'amount': 1099,
            'currency': '{{CURRENCY}}',
            'customer': customer_id,
            'payment_method': payment_methods.data[0].id,
            'off_session': True,
            'confirm': True,
        })
    except stripe.error.CardError as e:
        err = e.error
        # Error code will be authentication_required if authentication is needed
        print('Code is: %s' % err.code)
        payment_intent_id = err.payment_intent['id']
        payment_intent = client.v1.payment_intents.retrieve(payment_intent_id)


def charge_customer(customer_id):
    \# Lookup the payment methods available for the customer-configured Account
    payment_methods = stripe.PaymentMethod.list(
        customer_account=customer_id,
        type='card'
    )
    # Charge the customer-configured Account and payment method immediately
    try:
        stripe.PaymentIntent.create(
            amount=1099,
            currency='{{CURRENCY}}',
            customer_account=customer_id,
            payment_method=payment_methods.data[0].id,
            off_session=True,
            confirm=True
        )
    except stripe.error.CardError as e:
        err = e.error
        # Error code will be authentication_required if authentication is needed
        print('Code is: %s' % err.code)
        payment_intent_id = err.payment_intent['id']
        payment_intent = client.v1.payment_intents.retrieve(payment_intent_id)
    \# Alternatively, set up a webhook to listen for the payment_intent.succeeded event
    # and attach the PaymentMethod to a new Customer
    customer = client.v1.customers.create()

    \# Alternatively, set up a webhook to listen for the payment_intent.succeeded event
    # and attach the PaymentMethod to a new customer-configured Account
    account = client.v2.core.accounts.create({
        "configuration": {
            "customer": {
                "capabilities": {"automatic_indirect_tax": {"requested": True}}
            },
        },
    })

    try:
        data = json.loads(request.data)
        \# Create a Tax Calculation for the items being sold
        tax_calculation = calculate_tax(data['items'], '{{CURRENCY}}')

        \# Create a PaymentIntent with the order amount and currency
        intent = client.v1.payment_intents.create(params={
            'customer': customer['id'],
            'setup_future_usage': 'off_session',
            'amount': calculate_order_amount(data['items'], tax_calculation),
            'amount': calculate_order_amount(data['items']),
            'currency': '{{CURRENCY}}',
            \# In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            'automatic_payment_methods': {
                'enabled': True,
            },
            'hooks': {
                'inputs': {
                    'tax': {
                        'calculation': tax_calculation['id']
                    }
                }
            },
        })
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403
    try:
        data = json.loads(request.data)
        \# Create a Tax Calculation for the items being sold
        tax_calculation = calculate_tax(data['items'], '{{CURRENCY}}')

        \# Create a PaymentIntent with the order amount and currency
        intent = client.v1.payment_intents.create({
            "customer_account": account['id'],
            "setup_future_usage": 'off_session',
            "amount": calculate_order_amount(data['items'], tax_calculation),
            "amount": calculate_order_amount(data['items']),
            "currency": '{{CURRENCY}}',
            \# In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            "automatic_payment_methods": {
                'enabled': True,
            },
            "hooks": {
                'inputs': {
                    'tax': {
                        'calculation': tax_calculation['id']
                    }
                }
            },
        })
        return jsonify({
            'clientSecret': intent['client_secret']
        })
    except Exception as e:
        return jsonify(error=str(e)), 403
$stripe = new \Stripe\StripeClient($stripeSecretKey);
function calculateTax($stripe, $items, $currency) {
    $taxCalculation = $stripe->tax->calculations->create([
        'currency' => $currency,
        'customer_details' => [
            'address' => [
                'line1' => '920 5th Ave',
                'city' => 'Seattle',
                'state' => 'WA',
                'postal_code' => '98104',
                'country' => 'US',
            ],
            'address_source' => 'shipping',
        ],
        'line_items' => array_map('buildLineItem', $items),
    ]);

    return $taxCalculation;
}

function buildLineItem($item) {
    return [
        'amount' => $item->amount, // Amount in cents
        'reference' => $item->id, // Unique reference for the item in the scope of the calculation
    ];
}
// Securely calculate the order amount, including tax
function calculateOrderAmount($taxCalculation) {
    // Calculate the order total with any exclusive taxes on the server to prevent
    // people from directly manipulating the amount on the client
    return $taxCalculation->amount_total;
}
function calculateOrderAmount(array $items): int {
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    $total = 0;
    foreach($items as $item) {
      $total += $item->amount;
    }
    return $total;
}
    // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
    // and attach the PaymentMethod to a new Customer
    $customer = $stripe->customers->create();
    // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
    // and attach the PaymentMethod to a new customer-configured Account
    $account = $stripe->v2->core->accounts->create([
      'configuration' => [
        'customer' => [
          'capabilities' => [
                'automatic_indirect_tax' => [
                  'requested' => true,
                ],
          ],
        ],
      ]
    ]);
    // Create a Tax Calculation for the items being sold
    $taxCalculation = calculateTax($stripe, $jsonObj->items, '{{CURRENCY}}');

    // Create a PaymentIntent with amount and currency
    $paymentIntent = $stripe->paymentIntents->create([
        'customer' => $customer->id,
        'setup_future_usage' => 'off_session',
        'amount' => calculateOrderAmount($jsonObj->items, $taxCalculation),
        'amount' => calculateOrderAmount($jsonObj->items),
        'currency' => '{{CURRENCY}}',
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        'automatic_payment_methods' => [
            'enabled' => true,
        ],
        'hooks' => [
            'inputs' => [
                'tax' => [
                    'calculation' => $taxCalculation->id
                ]
            ]
        ],
    ]);

    $output = [
        'clientSecret' => $paymentIntent->client_secret,
    ];
    // Create a PaymentIntent with amount and currency
    $paymentIntent = $stripe->paymentIntents->create([
        'customer_account' => $account->id,
        'setup_future_usage' => 'off_session',
        'amount' => calculateOrderAmount($jsonObj->items, $taxCalculation),
        'amount' => calculateOrderAmount($jsonObj->items),
        'currency' => '{{CURRENCY}}',
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        'automatic_payment_methods' => [
            'enabled' => true,
        ],
        'hooks' => [
            'inputs' => [
                'tax' => [
                    'calculation' => $taxCalculation->id
                ]
            ]
        ],
    ]);

    $output = [
        'clientSecret' => $paymentIntent->client_secret,
    ];
// Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
$stripe = new \Stripe\StripeClient($'<<YOUR_SECRET_KEY>>');
    // Lookup the payment methods available for the customer
    $paymentMethods = $stripe->paymentMethods->all([
        'customer' => $jsonObj->customer,
        'type' => 'card'
    ]);

    // Charge the customer and payment method immediately
    $paymentIntent = $stripe->paymentIntents->create([
        'amount' => 1099,
        'currency' => '{{CURRENCY}}',
        'customer' => $jsonObj->customer,
        'payment_method' => $paymentMethods->data[0]->id,
        'off_session' => true,
        'confirm' => true,
    ]);
    // Lookup the payment methods available for the customer-configured Account
    $paymentMethods = $stripe->paymentMethods->all([
        'customer_account' => $jsonObj->customer,
        'type' => 'card'
    ]);

    // Charge the customer-configured Account and payment method immediately
    $paymentIntent = $stripe->paymentIntents->create([
        'amount' => 1099,
        'currency' => '{{CURRENCY}}',
        'customer_account' => $jsonObj->customer,
        'payment_method' => $paymentMethods->data[0]->id,
        'off_session' => true,
        'confirm' => true,
    ]);
// Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
$stripeSecretKey = '<<YOUR_SECRET_KEY>>';
  "github.com/stripe/stripe-go/v85"
  // This is a public sample test API key.
  // Don't submit any personally identifiable information in requests made with this key.
  // Sign in to see your own test API key embedded in code samples.
  // Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
  sc = stripe.NewClient("<<YOUR_SECRET_KEY>>")

func calculateTax(items []item, currency stripe.Currency) *stripe.TaxCalculation {
    var lineItems []*stripe.TaxCalculationCreateLineItemParams
    for _, item := range items {
      lineItems = append(lineItems, buildLineItem(item))
    }

    taxCalculationParams := &stripe.TaxCalculationCreateParams{
        Currency: stripe.String(string(currency)),
        CustomerDetails: &stripe.TaxCalculationCreateCustomerDetailsParams{
            Address: &stripe.AddressParams{
                Line1:      stripe.String("920 5th Ave"),
                City:       stripe.String("Seattle"),
                State:      stripe.String("WA"),
                PostalCode: stripe.String("98104"),
                Country:    stripe.String("US"),
            },
            AddressSource: stripe.String("shipping"),
        },
        LineItems: lineItems,
    }

    taxCalculation, _ := sc.V1TaxCalculations.Create(context.TODO(), taxCalculationParams)
    return taxCalculation
}

func buildLineItem(i item) *stripe.TaxCalculationCreateLineItemParams {
    return &stripe.TaxCalculationCreateLineItemParams{
        Amount:   stripe.Int64(i.Amount), // Amount in cents
        Reference: stripe.String(i.Id), // Unique reference for the item in the scope of the calculation
    }
}


func calculateTax(items []item, currency stripe.Currency) *stripe.TaxCalculation {
    var lineItems []*stripe.TaxCalculationCreateLineItemParams
    for _, item := range items {
      lineItems = append(lineItems, buildLineItem(item))
    }

    taxCalculationParams := &stripe.TaxCalculationCreateParams{
        Currency: stripe.String(string(currency)),
        CustomerDetails: &stripe.TaxCalculationCreateCustomerDetailsParams{
            Address: &stripe.AddressParams{
                Line1:      stripe.String("920 5th Ave"),
                City:       stripe.String("Seattle"),
                State:      stripe.String("WA"),
                PostalCode: stripe.String("98104"),
                Country:    stripe.String("US"),
            },
            AddressSource: stripe.String("shipping"),
        },
        LineItems: lineItems,
    }

    taxCalculation, _ := sc.V1TaxCalculations.Create(context.TODO(), taxCalculationParams)
    return taxCalculation
}

func buildLineItem(i item) *stripe.TaxCalculationCreateLineItemParams {
    return &stripe.TaxCalculationCreateLineItemParams{
        Amount:   stripe.Int64(i.Amount), // Amount in cents
        Reference: stripe.String(i.Id), // Unique reference for the item in the scope of the calculation
    }
}

// Securely calculate the order amount, including tax
func calculateOrderAmount(taxCalculation *stripe.TaxCalculation) int64 {
  // Calculate the order total with any exclusive taxes on the server to prevent
  // people from directly manipulating the amount on the client
  return taxCalculation.AmountTotal
}
func calculateOrderAmount(items []item) int64 {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  total := int64(0)
  for _, item := range items {
      total += item.Amount
  }
  return total;
}

func chargeCustomer(CustomerID string) {
  // Look up the payment methods available for the customer
  params := &stripe.PaymentMethodListParams{
    Customer: stripe.String(CustomerID),
    Type:     stripe.String(stripe.PaymentMethodTypeCard),
  }

  var pm *stripe.PaymentMethod
  for p, err := range sc.V1PaymentMethods.List(context.TODO(), params).All(context.TODO()) {
    if err != nil {
      log.Printf("sc.V1Prices.List: %v", err)
      http.Error(w, err.Error(), http.StatusInternalServerError)
      return
    }
    pm = p
    break
  }

  paymentIntentParams := &stripe.PaymentIntentCreateParams{
    Amount:        stripe.Int64(1099),
    Currency:      stripe.String(string(stripe.Currency{{CURRENCY}})),
    Customer:      stripe.String(CustomerID),
    PaymentMethod: stripe.String(pm.ID),
    Confirm:       stripe.Bool(true),
    OffSession:    stripe.Bool(true),
  }

  // Charge the customer and payment method immediately
  _, err := sc.V1PaymentIntents.Create(context.TODO(), paymentIntentParams)

  if err != nil {
    if stripeErr, ok := err.(*stripe.Error); ok {
      // Error code will be authentication_required if authentication is needed
      fmt.Printf("Error code: %v", stripeErr.Code)

      paymentIntentID := stripeErr.PaymentIntent.ID
      paymentIntent, _ := sc.V1PaymentIntents.Retrieve(context.TODO(), paymentIntentID, nil)

      fmt.Printf("PI: %v", paymentIntent.ID)
    }
  }
}

func chargeCustomer(CustomerID string) {
  // Look up the payment methods available for the customer-configured Account
  params := &stripe.PaymentMethodListParams{
    CustomerAccount: stripe.String(CustomerID),
    Type:     stripe.String(stripe.PaymentMethodTypeCard),
  }
  var pm *stripe.PaymentMethod
  for p, err := range sc.V1PaymentMethods.List(context.TODO(), params).All(context.TODO()) {
    if err != nil {
      log.Printf("sc.V1Prices.List: %v", err)
      http.Error(w, err.Error(), http.StatusInternalServerError)
      return
    }
    pm = p
    break
  }

  paymentIntentParams := &stripe.PaymentIntentCreateParams{
    Amount:        stripe.Int64(1099),
    Currency:      stripe.String(string(stripe.Currency{{CURRENCY}})),
    CustomerAccount:      stripe.String(CustomerID),
    PaymentMethod: stripe.String(pm.ID),
    Confirm:       stripe.Bool(true),
    OffSession:    stripe.Bool(true),
  }

  // Charge the customer-configured Account and payment method immediately
  _, err := sc.V1PaymentIntents.Create(context.TODO(), paymentIntentParams)

  if err != nil {
    if stripeErr, ok := err.(*stripe.Error); ok {
      // Error code will be authentication_required if authentication is needed
      fmt.Printf("Error code: %v", stripeErr.Code)

      paymentIntentID := stripeErr.PaymentIntent.ID
      paymentIntent, _ := sc.V1PaymentIntents.Retrieve(context.TODO(), paymentIntentID, nil)

      fmt.Printf("PI: %v", paymentIntent.ID)
    }
  }
}
  // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
  // and attach the PaymentMethod to a new Customer
  custParams := &stripe.CustomerCreateParams{}
  cust, _ := sc.V1Customers.Create(context.TODO(), custParams)
  // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
  // and attach the PaymentMethod to a new customer-configured Account
  acctParams := &stripe.V2CoreAccountCreateParams{
      Configuration: &stripe.V2CoreAccountCreateConfigurationParams{
          Customer: &stripe.V2CoreAccountCreateConfigurationCustomerParams{
              Capabilities: &stripe.V2CoreAccountCreateConfigurationCustomerCapabilitiesParams{
                  AutomaticIndirectTax: &stripe.V2CoreAccountCreateConfigurationCustomerCapabilitiesAutomaticIndirectTaxParams{
                  Requested: stripe.Bool(true),
                  },
              },
          },
      },
  }
  acct, _ := sc.V2CoreAccounts.Create(context.TODO(), acctParams)
  // Create a Tax Calculation for the items being sold
  taxCalculation := calculateTax(req.Items, "{{CURRENCY}}")

  // Create a PaymentIntent with amount and currency
  params := &stripe.PaymentIntentCreateParams{
    Customer: stripe.String(cust.ID),
    SetupFutureUsage: stripe.String("off_session"),
    Amount:   stripe.Int64(calculateOrderAmount(taxCalculation)),
    Amount:   stripe.Int64(calculateOrderAmount(req.Items)),
    Currency: stripe.String(string(stripe.Currency{{CURRENCY}})),
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    AutomaticPaymentMethods: &stripe.PaymentIntentCreateAutomaticPaymentMethodsParams{
      Enabled: stripe.Bool(true),
    },
  }

  params.Hooks = &stripe.PaymentIntentCreateHooksParams{
    Inputs: &stripe.PaymentIntentCreateHooksInputsParams{
      Tax: &stripe.PaymentIntentCreateHooksInputsTaxParams{
        Calculation: stripe.String(taxCalculation.ID),
      },
    },
  }

  pi, err := sc.V1PaymentIntents.Create(context.TODO(), params)

  if err != nil {
    log.Printf("sc.V1PaymentIntents.Create: %v", pi.ClientSecret)
    http.Error(w, err.Error(), http.StatusInternalServerError)
    log.Printf("sc.V1PaymentIntents.Create: %v", err)
    return
  }

  writeJSON(w, struct {
    ClientSecret string `json:"clientSecret"`
  }{
    ClientSecret: pi.ClientSecret,
  })
  // Create a PaymentIntent with amount and currency
  params := &stripe.PaymentIntentCreateParams{
    CustomerAccount: stripe.String(acct.ID),
    SetupFutureUsage: stripe.String("off_session"),
    Amount:   stripe.Int64(calculateOrderAmount(taxCalculation)),
    Amount:   stripe.Int64(calculateOrderAmount(req.Items)),
    Currency: stripe.String(string(stripe.Currency{{CURRENCY}})),
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    AutomaticPaymentMethods: &stripe.PaymentIntentCreateAutomaticPaymentMethodsParams{
      Enabled: stripe.Bool(true),
    },
  }

  params.Hooks = &stripe.PaymentIntentCreateHooksParams{
    Inputs: &stripe.PaymentIntentCreateHooksInputsParams{
      Tax: &stripe.PaymentIntentCreateHooksInputsTaxParams{
        Calculation: stripe.String(taxCalculation.ID),
      },
    },
  }

  pi, err := sc.V1PaymentIntents.Create(context.TODO(), params)
  log.Printf("pi.Create: %v", pi.ClientSecret)

  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    log.Printf("pi.Create: %v", err)
    return
  }

  writeJSON(w, struct {
    ClientSecret string `json:"clientSecret"`
  }{
    ClientSecret: pi.ClientSecret,
  })
using Stripe.Tax;
using System.Linq;
      // This is a public sample test API key.
      // Don't submit any personally identifiable information in requests made with this key.
      // Sign in to see your own test API key embedded in code samples.
      // Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
      services.AddSingleton(new StripeClient("<<YOUR_SECRET_KEY>>"));
    private readonly StripeClient _client;

    public PaymentIntentApiController(StripeClient client)
    {
      _client = client;
    }
      // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
      // and attach the PaymentMethod to a new Customer
      var customer = _client.V1.Customers.Create(new CustomerCreateOptions());
      // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
      // and attach the PaymentMethod to a new customer-configured Account
      var customerOptions = new Stripe.V2.Core.AccountCreateOptions
        {
          Configuration = new Stripe.V2.Core.AccountCreateConfigurationOptions
          {
            Customer = new Stripe.V2.Core.AccountCreateConfigurationCustomerOptions
            {
              Capabilities = new Stripe.V2.Core.AccountCreateConfigurationCustomerCapabilitiesOptions
              {
                  AutomaticIndirectTax = new Stripe.V2.Core.AccountCreateConfigurationCustomerCapabilitiesAutomaticIndirectTaxOptions
                  {
                      Requested = true,
                  },
              },
            }
          },
        };
      var account = _client.V2.Core.Accounts.Create(customerOptions);
      // Create a Tax Calculation for the items being sold
      var taxCalculation = CalculateTax(request.Items, "{{CURRENCY}}");

      var paymentIntent = _client.V1.PaymentIntents.Create(new PaymentIntentCreateOptions
      {
        Customer = customer.Id,
        SetupFutureUsage = "off_session",
        CustomerAccount = account.Id,
        SetupFutureUsage = "off_session",
        Amount = CalculateOrderAmount(taxCalculation),
        Amount = CalculateOrderAmount(request.Items),
        Currency = "{{CURRENCY}}",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
        {
          Enabled = true,
        },
        Hooks = new PaymentIntentHooksOptions
        {
          Inputs = new PaymentIntentHooksInputsOptions
          {
            Tax = new PaymentIntentHooksInputsTaxOptions
            {
              Calculation = taxCalculation.Id,
            },
          },
        },
        Metadata = new Dictionary<string, string>
        {
          { "tax_calculation", taxCalculation.Id },
        },
      });

      return Json(new { clientSecret = paymentIntent.ClientSecret });
    // Securely calculate the order amount, including tax
    [NonAction]
    public long CalculateOrderAmount(Calculation taxCalculation)
    {
        // Calculate the order total with any exclusive taxes on the server to prevent
        // people from directly manipulating the amount on the client
        return taxCalculation.AmountTotal;
    }

    private long CalculateOrderAmount(Item[] items)
    {
      // Calculate the order total on the server to prevent
      // people from directly manipulating the amount on the client
      long total = 0;
      foreach (Item item in items) {
        total += item.Amount;
      }
      return total;
    }
    [NonAction]
    public Calculation CalculateTax(Item[] items, string currency)
    {
        var lineItems = items.Select(item => BuildLineItem(item)).ToList();
        var calculationCreateOptions = new CalculationCreateOptions
        {
            Currency = currency,
            CustomerDetails = new CalculationCustomerDetailsOptions
            {
                Address = new AddressOptions
                {
                    Line1 = "920 5th Ave",
                    City = "Seattle",
                    State = "WA",
                    PostalCode = "98104",
                    Country = "US",
                },
                AddressSource = "shipping",
            },
            LineItems = lineItems,
        };

        var calculation = _client.V1.Tax.Calculations.Create(calculationCreateOptions);

        return calculation;
    }

    [NonAction]
    public CalculationLineItemOptions BuildLineItem(Item item)
    {
        return new CalculationLineItemOptions
        {
            Amount = item.Amount, // Amount in cents
            Reference = item.Id, // Unique reference for the item in the scope of the calculation
        };
    }


    public void ChargeCustomer(string customerId)
    {
      // Lookup the payment methods available for the customer
      var availableMethods = _client.V1.PaymentMethods.List(new PaymentMethodListOptions
      {
        Customer = customerId,
        Type = "card",
      });
      try
      {
        // Charge the customer and payment method immediately
        var paymentIntent = _client.V1.PaymentIntents.Create(new PaymentIntentCreateOptions
        {
          Amount = 1099,
          Currency = "{{CURRENCY}}",
          Customer = customerId,
          PaymentMethod = availableMethods.Data[0].Id,
          OffSession = true,
          Confirm = true
        });
      }
      catch (StripeException e)
      {
        switch (e.StripeError.ErrorType)
        {
          case "card_error":
            // Error code will be authentication_required if authentication is needed
            Console.WriteLine("Error code: " + e.StripeError.Code);
            var paymentIntentId = e.StripeError.PaymentIntent.Id;
            var paymentIntent = _client.V1.PaymentIntents.Get(paymentIntentId);

            Console.WriteLine(paymentIntent.Id);
            break;
          default:
            break;
        }
      }
    }

    public void ChargeCustomer(string customerId)
    {
      // Lookup the payment methods available for the customer-configured Account
      var availableMethods = _client.V1.PaymentMethods.List(new PaymentMethodListOptions
      {
        CustomerAccount = customerId,
        Type = "card",
      });
      try
      {
        // Charge the customer-configured Account and payment method immediately
        var paymentIntent = _client.V1.PaymentIntents.Create(new PaymentIntentCreateOptions
        {
          Amount = 1099,
          Currency = "{{CURRENCY}}",
          CustomerAccount = customerId,
          PaymentMethod = availableMethods.Data[0].Id,
          OffSession = true,
          Confirm = true
        });
      }
      catch (StripeException e)
      {
        switch (e.StripeError.ErrorType)
        {
          case "card_error":
            // Error code will be authentication_required if authentication is needed
            Console.WriteLine("Error code: " + e.StripeError.Code);
            var paymentIntentId = e.StripeError.PaymentIntent.Id;
            var paymentIntent = _client.V1.PaymentIntents.Get(paymentIntentId);

            Console.WriteLine(paymentIntent.Id);
            break;
          default:
            break;
        }
      }
    }
import com.stripe.model.Customer;
import com.stripe.param.CustomerCreateParams;
import com.stripe.model.v2.core.Account;
import com.stripe.param.v2.core.AccountCreateParams;
import com.stripe.model.PaymentMethod;
import com.stripe.model.StripeCollection;
import com.stripe.param.PaymentMethodListParams;
import java.util.Arrays;
import com.stripe.model.tax.Calculation;
import com.stripe.param.tax.CalculationCreateParams;
import com.stripe.param.tax.CalculationCreateParams.CustomerDetails;
import com.stripe.param.tax.CalculationCreateParams.CustomerDetails.Address;
import com.stripe.param.tax.CalculationCreateParams.CustomerDetails.AddressSource;
import com.stripe.param.tax.CalculationCreateParams.LineItem;
  static Calculation calculateTax(List<CreatePaymentItem> items, String currency) throws StripeException {
     List<LineItem> lineItems = items.stream()
            .map(Server::buildLineItem)
            .collect(Collectors.toList());

    CalculationCreateParams.Builder createParamsBuilder = CalculationCreateParams.builder()
            .setCurrency(currency)
            .setCustomerDetails(CustomerDetails.builder()
                .setAddress(Address.builder()
                    .setLine1("920 5th Ave")
                    .setCity("Seattle")
                    .setState("WA")
                    .setPostalCode("98104")
                    .setCountry("US")
                    .build())
                .setAddressSource(AddressSource.SHIPPING)
                .build())
            .addAllLineItem(lineItems);

    return client.v1().tax().calculations().create(createParamsBuilder.build());
  }

  static LineItem buildLineItem(CreatePaymentItem item) {
    return LineItem.builder()
            .setAmount(item.getAmount()) // Amount in cents
            .setReference(item.getId()) // Unique reference for the item in the scope of the calculation
            .build();
  }

  // Securely calculate the order amount, including tax
  static long calculateOrderAmount(Calculation taxCalculation) {
      // Calculate the order total with any exclusive taxes on the server to prevent
      // people from directly manipulating the amount on the client
      return taxCalculation.getAmountTotal();
  }
  static int calculateOrderAmount(CreatePaymentItem[] items) {
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    int total = 0;
    for (CreatePaymentItem item : items) {
      total += item.getAmount();
    }
    return total;
  }

  // Call this function with the ID of the Customer you want to charge
  static void chargeCustomer(String customerId) throws StripeException {
    // Lookup the payment methods available for the customer
    PaymentMethodListParams listParams = new PaymentMethodListParams.Builder().setCustomer(customerId)
        .setType(PaymentMethodListParams.Type.CARD).build();
    StripeCollection<PaymentMethod> paymentMethods = client.v1().paymentMethods().list(listParams);
    PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder().setCurrency("{{CURRENCY}}")
        .setAmount(new Long(1099))
        .setPaymentMethod(paymentMethods.getData().get(0).getId())
        .setCustomer(customerId)
        .setConfirm(true)
        .setOffSession(true)
        .build();
    try {
      // Charge the customer and payment method immediately
      PaymentIntent paymentIntent = client.v1().paymentIntents().create(createParams);
    } catch (CardException e) {
      // Error code will be authentication_required if authentication is needed
      System.out.println("Error code is : " + e.getCode());
      String paymentIntentId = e.getStripeError().getPaymentIntent().getId();
      PaymentIntent paymentIntent = client.v1().paymentIntents().retrieve(paymentIntentId);
      System.out.println(paymentIntent.getId());
    }
  }

  // Call this function with the ID of the customer-configured Account you want to charge
  static void chargeCustomer(String customerId) throws StripeException {
    // Lookup the payment methods available for the customer-configured Account
    PaymentMethodListParams listParams = new PaymentMethodListParams.Builder().setCustomerAccount(customerId)
        .setType(PaymentMethodListParams.Type.CARD).build();
    StripeCollection<PaymentMethod> paymentMethods = client.v1().paymentMethods().list(listParams);
    PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder().setCurrency("{{CURRENCY}}")
        .setAmount(new Long(1099))
        .setPaymentMethod(paymentMethods.getData().get(0).getId())
        .setCustomerAccount(customerId)
        .setConfirm(true)
        .setOffSession(true)
        .build();
    try {
      // Charge the customer-configured Account and payment method immediately
      PaymentIntent paymentIntent = client.v1().paymentIntents().create(createParams);
    } catch (CardException e) {
      // Error code will be authentication_required if authentication is needed
      System.out.println("Error code is : " + e.getCode());
      String paymentIntentId = e.getStripeError().getPaymentIntent().getId();
      PaymentIntent paymentIntent = client.v1().paymentIntents().retrieve(paymentIntentId);
      System.out.println(paymentIntent.getId());
    }
  }
      // This is a public sample test API key.
      // Don't submit any personally identifiable information in requests made with this key.
      // Sign in to see your own test API key embedded in code samples.
  // Don't put any keys in code. See https://docs.stripe.com/keys-best-practices.
  public static StripeClient client = new StripeClient("<<YOUR_SECRET_KEY>>");

  public static void main(String[] args) {
    port(4242);
    staticFiles.externalLocation(Paths.get("public").toAbsolutePath().toString());
      // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
      // and attach the PaymentMethod to a new Customer
      CustomerCreateParams customerParams = new CustomerCreateParams.Builder().build();
      Customer customer = client.v1().customers().create(customerParams);
      // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
      // and attach the PaymentMethod to a new customer-configured Account
      AccountCreateParams accountParams =
        AccountCreateParams
          .builder()
          .setConfiguration(
            AccountCreateParams.Configuration.builder()
            .setCustomer(
              AccountCreateParams.Configuration.Customer.builder()
                .setCapabilities(
                  AccountCreateParams.Configuration.Customer.Capabilities.builder()
                    .setAutomaticIndirectTax(
                      AccountCreateParams.Configuration.Customer.Capabilities.AutomaticIndirectTax.builder()
                        .setRequested(true)
                        .build()
                    )
                    .build()
                )
                  .build()
              )
              .build()
          )
          .build();
      Account account = client.v2().core().accounts().create(accountParams);
      CreatePayment postBody = gson.fromJson(request.body(), CreatePayment.class);

      // Create a Tax Calculation for the items being sold
      Calculation taxCalculation = calculateTax(Arrays.asList(postBody.getItems()), "{{CURRENCY}}");

      PaymentIntentCreateParams params =
        PaymentIntentCreateParams.builder()
          .setCustomerAccount(account.getId())
          .setSetupFutureUsage(PaymentIntentCreateParams.SetupFutureUsage.OFF_SESSION)
          .setAmount(calculateOrderAmount(taxCalculation))
          .setAmount(new Long(calculateOrderAmount(postBody.getItems())))
          .setCurrency("{{CURRENCY}}")
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods
              .builder()
              .setEnabled(true)
              .build()
          )
          .setHooks(
            PaymentIntentCreateParams.Hooks
              .builder()
              .setInputs(
                PaymentIntentCreateParams.Hooks.Inputs
                  .builder()
                  .setTax(
                    PaymentIntentCreateParams.Hooks.Inputs.Tax
                      .builder()
                      .setCalculation(taxCalculation.getId())
                      .build()
                  )
                  .build()
              )
              .build()
          )
          .build();

      // Create a PaymentIntent with the order amount and currency
      PaymentIntent paymentIntent = client.v1().paymentIntents().create(params);

      CreatePaymentResponse paymentResponse = new CreatePaymentResponse(paymentIntent.getClientSecret(), paymentIntent.getId());
      return gson.toJson(paymentResponse);
      CreatePayment postBody = gson.fromJson(request.body(), CreatePayment.class);

      // Create a Tax Calculation for the items being sold
      Calculation taxCalculation = calculateTax(Arrays.asList(postBody.getItems()), "{{CURRENCY}}");

      PaymentIntentCreateParams params =
        PaymentIntentCreateParams.builder()
          .setCustomerAccount(customer.getId())
          .setSetupFutureUsage(PaymentIntentCreateParams.SetupFutureUsage.OFF_SESSION)
          .setAmount(calculateOrderAmount(taxCalculation))
          .setAmount(new Long(calculateOrderAmount(postBody.getItems())))
          .setCurrency("{{CURRENCY}}")
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          .setAutomaticPaymentMethods(
            PaymentIntentCreateParams.AutomaticPaymentMethods
              .builder()
              .setEnabled(true)
              .build()
          )
          .setHooks(
            PaymentIntentCreateParams.Hooks
              .builder()
              .setInputs(
                PaymentIntentCreateParams.Hooks.Inputs
                  .builder()
                  .setTax(
                    PaymentIntentCreateParams.Hooks.Inputs.Tax
                      .builder()
                      .setCalculation(taxCalculation.getId())
                      .build()
                  )
                  .build()
              )
              .build()
          )
          .build();

      // Create a PaymentIntent with the order amount and currency
      PaymentIntent paymentIntent = client.v1().paymentIntents().create(params);

      CreatePaymentResponse paymentResponse = new CreatePaymentResponse(paymentIntent.getClientSecret(), paymentIntent.getId());
      return gson.toJson(paymentResponse);
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don't submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("<<YOUR_PUBLISHABLE_KEY>>");
  useEffect(() => {
    if (window.location.pathname === "/complete") {
      return;
    }

    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
  useEffect(() => {
    if (window.location.pathname === "/complete") {
      return;
    }

    // Create PaymentIntent as soon as the page loads
    fetch("/create.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
      })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);
  const appearance = {
    {{APPEARANCE}}
  };
        {clientSecret && (
          <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
            <Routes>
              <Route path="/checkout" element={<CheckoutForm />} />
              <Route path="/complete" element={<CompletePage />} />
            </Routes>
          </Elements>
        )}
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      if (!paymentIntent) {
        return;
      }

      setStatus(paymentIntent.status);
      setIntentId(paymentIntent.id);
    });
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/complete",
        receipt_email: email,
      },
    });
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
#email {
  border-radius: 6px;
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  max-height: 44px;
  font-size: 16px;
  width: 100%;
  background: white;
  box-sizing: border-box;
}
    <script src="https://js.stripe.com/dahlia/stripe.js"></script>
    <form id="payment-form">
      <input type="text" id="email" placeholder="Enter email address" />
      <div id="payment-element">
        <!--Stripe.js injects the Payment Element-->
      </div>
      <button id="submit">
        <div class="spinner hidden" id="spinner"></div>
        <span id="button-text">Pay now</span>
      </button>
      <div id="payment-message" class="hidden"></div>
    </form>
const stripe = Stripe("<<YOUR_PUBLISHABLE_KEY>>");
// Fetches a payment intent and captures the client secret
async function initialize() {
  const response = await fetch("/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const { clientSecret } = await response.json();

  const appearance = {
    {{APPEARANCE}}
  };
  elements = stripe.elements({ appearance, clientSecret });

  const paymentElementOptions = {
    layout: "accordion",
  };

  const paymentElement = elements.create("payment", paymentElementOptions);
  paymentElement.mount("#payment-element");
}
// Fetches a payment intent and captures the client secret
async function initialize() {
  const { clientSecret } = await fetch("/create.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  }).then((r) => r.json());

  elements = stripe.elements({ clientSecret });

  const paymentElementOptions = {
    layout: "accordion",
  };

  const paymentElement = elements.create("payment", paymentElementOptions);
  paymentElement.mount("#payment-element");
}
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: "http://localhost:4242/complete.html",
      receipt_email: document.getElementById("email").value,
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}
async function handleSubmit(e) {
  e.preventDefault();
  setLoading(true);

  const { error } = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: "http://localhost:4242/complete.html",
      receipt_email: document.getElementById("email").value,
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === "card_error" || error.type === "validation_error") {
    showMessage(error.message);
  } else {
    showMessage("An unexpected error occurred.");
  }

  setLoading(false);
}

#email {
  border-radius: 6px;
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  max-height: 44px;
  font-size: 16px;
  width: 100%;
  background: white;
  box-sizing: border-box;
}
const stripe = Stripe("<<YOUR_PUBLISHABLE_KEY>>");
// Fetches the payment intent status after payment submission
async function checkStatus() {
  const clientSecret = new URLSearchParams(window.location.search).get(
    "payment_intent_client_secret"
  );

  if (!clientSecret) {
    setErrorState();
    return;
  }

  const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

  setPaymentDetails(paymentIntent);
}
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/success",
        receipt_email: email,
      },
    });
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email address"
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
  const appearance = {
    {{APPEARANCE}}
  };
    <Elements stripe={stripePromise} options={{ appearance, clientSecret }}>
      <PaymentForm />
    </Elements>
  const { payment_intent: paymentIntentId } = await searchParams

  if (!paymentIntentId) redirect('/')

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

  if (!paymentIntent) redirect('/')

  const { status } = paymentIntent
\# https://dashboard.stripe.com/apikeys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<<YOUR_PUBLISHABLE_KEY>>
STRIPE_SECRET_KEY=<<YOUR_SECRET_KEY>>
\# Set this environment variable to support webhooks — https://stripe.com/docs/webhooks#verify-events
# STRIPE_WEBHOOK_SECRET=whsec_12345
  const calculateTax = async (items, currency) => {
    const taxCalculation = await stripe.tax.calculations.create({
      currency,
      customer_details: {
        address: {
          line1: "920 5th Ave",
          city: "Seattle",
          state: "WA",
          postal_code: "98104",
          country: "US",
        },
        address_source: "shipping",
      },
      line_items: items.map((item) => buildLineItem(item)),
    });

    return taxCalculation;
  };

  const buildLineItem = (item) => {
    return {
      amount: item.amount, // Amount in cents
      reference: item.id, // Unique reference for the item in the scope of the calculation
    };
  };

  // Securely calculate the order amount, including tax
  const calculateOrderAmount = (items, taxCalculation) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total with any exclusive taxes on the server to prevent
    // people from directly manipulating the amount on the client
    let orderAmount = 1400;
    orderAmount += taxCalculation.tax_amount_exclusive;
    return orderAmount;
  };
  const calculateOrderAmount = (items) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return 1400;
  };
  const chargeCustomer = async (customerId) => {
    // Lookup the payment methods available for the customer
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
    });
    try {
      // Charge the customer and payment method immediately
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: "eur",
        customer: customerId,
        payment_method: paymentMethods.data[0].id,
        off_session: true,
        confirm: true,
      });
    } catch (err) {
      // Error code will be authentication_required if authentication is needed
      console.log("Error code is: ", err.code);
      const paymentIntentRetrieved = await stripe.paymentIntents.retrieve(err.raw.payment_intent.id);
      console.log("PI retrieved: ", paymentIntentRetrieved.id);
    }
  };
  // Alternatively, set up a webhook to listen for the payment_intent.succeeded event
  // and attach the PaymentMethod to a new Customer
  const customer = await stripe.customers.create();
  const items = [{
    id: 'xl-tshirt',
    amount: 1000
  }]
  const taxCalculation = await calculateTax(items, "eur");
  const amount = await calculateOrderAmount(items, taxCalculation);
  // Create PaymentIntent as soon as the page loads
  const { client_secret: clientSecret } = await stripe.paymentIntents.create({
    customer: customer.id,
    setup_future_usage: "off_session",
    amount,
    amount: calculateOrderAmount([{ id: 'xl-tshirt' }]),
    currency: 'eur',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      tax_calculation: taxCalculation.id
    },
  })
import 'server-only';

import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req) {
import StripePaymentSheet
    private lazy var addressViewController: AddressViewController? = {
      return AddressViewController(configuration: self.addressConfiguration, delegate: self)
    }()

    private var addressDetails: AddressViewController.AddressDetails?

    private var addressConfiguration: AddressViewController.Configuration {
        return AddressViewController.Configuration(additionalFields: .init(phone: .optional))
    }

    private lazy var addressButton: UIButton = {
        let button = UIButton(type: .custom)
        button.setTitle("Add shipping address", for: .normal)
        button.backgroundColor = .systemIndigo
        button.layer.cornerRadius = 5
        button.contentEdgeInsets = UIEdgeInsets(top: 12, left: 12, bottom: 12, right: 12)
        button.addTarget(self, action: #selector(didTapShippingAddressButton), for: .touchUpInside)
        button.translatesAutoresizingMaskIntoConstraints = false
        return button
    }()
        StripeAPI.defaultPublishableKey = "<<YOUR_PUBLISHABLE_KEY>>"
        view.addSubview(addressButton)

        NSLayoutConstraint.activate([
            addressButton.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 16),
            addressButton.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -16),
            addressButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -80)
        ])
    func fetchPaymentIntent() {
        let url = Self.backendURL.appendingPathComponent("/create-payment-intent")

        let shoppingCartContent: [String: Any] = [
            "items": [
                ["id": "xl-shirt"]
                ["id": "xl-shirt", "amount": 1000]
            ]
        ]

        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try? JSONSerialization.data(withJSONObject: shoppingCartContent)

        let task = URLSession.shared.dataTask(with: request, completionHandler: { [weak self] (data, response, error) in
            guard
                let response = response as? HTTPURLResponse,
                response.statusCode == 200,
                let data = data,
                let json = try? JSONSerialization.jsonObject(with: data, options: []) as? [String : Any],
                let clientSecret = json["clientSecret"] as? String
            else {
                let message = error?.localizedDescription ?? "Failed to decode response from server."
                self?.displayAlert(title: "Error loading page", message: message)
                return
            }

            print("Created PaymentIntent")
            self?.paymentIntentClientSecret = clientSecret

            DispatchQueue.main.async {
                self?.payButton.isEnabled = true
            }
        })

        task.resume()
    }
        var configuration = PaymentSheet.Configuration()
        configuration.merchantDisplayName = "Example, Inc."
        configuration.allowsDelayedPaymentMethods = true
        configuration.primaryButtonColor = UIColor(red: 1.0, green: 0.82, blue: 0.04, alpha: 1.0)
        configuration.applePay = .init(
            merchantId: "com.example.appname",
            merchantCountryCode: "US"
        )

        configuration.shippingDetails = { [weak self] in
            return self?.addressDetails
        }

        let paymentSheet = PaymentSheet(
            paymentIntentClientSecret: paymentIntentClientSecret,
            configuration: configuration)

        paymentSheet.present(from: self) { [weak self] (paymentResult) in
            switch paymentResult {
            case .completed:
                self?.displayAlert(title: "Payment complete!")
            case .canceled:
                print("Payment canceled!")
            case .failed(let error):
                self?.displayAlert(title: "Payment failed", message: error.localizedDescription)
            }
    @objc
    func didTapShippingAddressButton() {
        present(UINavigationController(rootViewController: addressViewController!), animated: true)
    }
// MARK: - AddressViewControllerDelegate

extension CheckoutViewController: AddressViewControllerDelegate {
    func addressViewControllerDidFinish(_ addressViewController: AddressViewController, with address: AddressViewController.AddressDetails?) {
        addressViewController.dismiss(animated: true)
        self.addressDetails = address
    }
}
  <key>NSCameraUsageDescription</key>
  <string>Allow the app to scan cards.</string>
        PaymentConfiguration.init(
            applicationContext,
            "<<YOUR_PUBLISHABLE_KEY>>"
        )
import androidx.compose.foundation.layout.Column
import androidx.compose.ui.platform.LocalContext
import com.stripe.android.PaymentConfiguration
import com.stripe.android.paymentsheet.addresselement.AddressDetails
import com.stripe.android.paymentsheet.addresselement.AddressLauncher
import com.stripe.android.paymentsheet.addresselement.AddressLauncher.AdditionalFieldsConfiguration
import com.stripe.android.paymentsheet.addresselement.AddressLauncherResult
import com.stripe.android.paymentsheet.addresselement.rememberAddressLauncher

    private val addressConfiguration = AddressLauncher.Configuration.Builder()
        .additionalFields(
            AdditionalFieldsConfiguration(
                AdditionalFieldsConfiguration.FieldConfiguration.REQUIRED
            )
        )
        .allowedCountries(setOf("US", "CA", "GB"))
        .title("Shipping Address")
        .googlePlacesApiKey("(optional) YOUR KEY HERE")
        .build()
            when (paymentResult) {
                is PaymentSheetResult.Completed -> showToast("Payment complete!")
                is PaymentSheetResult.Canceled -> showToast("Payment canceled!")
                is PaymentSheetResult.Failed -> {
                    error = paymentResult.error.localizedMessage ?: paymentResult.error.message
                }
            }

        val context = LocalContext.current

        var shippingDetails by remember { mutableStateOf<AddressDetails?>(null) }

        val addressLauncher = rememberAddressLauncher { result ->
            when (result) {
                is AddressLauncherResult.Succeeded -> {
                    shippingDetails = result.address

                    showToast("Address selection complete!")
                }
                is AddressLauncherResult.Canceled -> showToast("Address selection canceled!")
            }
        }
        Column(
            modifier = Modifier.fillMaxWidth()
        ) {
            AddressButton {
                addressLauncher.present(
                    publishableKey = PaymentConfiguration.getInstance(context).publishableKey,
                    configuration = addressConfiguration
                )
            }

            PayButton(
                enabled = paymentIntentClientSecret != null,
                onClick = {
                    paymentIntentClientSecret?.let {
                        onPayClicked(
                            paymentSheet = paymentSheet,
                            paymentIntentClientSecret = it,
                            shippingDetails = shippingDetails,
                        )
                    }
                }
            )
        }
        PayButton(
            enabled = paymentIntentClientSecret != null,
            onClick = {
                paymentIntentClientSecret?.let {
                    onPayClicked(
                        paymentSheet = paymentSheet,
                        paymentIntentClientSecret = it,
                    )
                }
            }
        )

    @Composable
    private fun AddressButton(
        onClick: () -> Unit
    ) {
        Button(
            modifier = Modifier.fillMaxWidth(),
            onClick = onClick
        ) {
            Text("Add shipping address")
        }
    }
    private suspend fun fetchPaymentIntent(): Result<String> = suspendCoroutine { continuation ->
        val url = "$BACKEND_URL/create-payment-intent"

        val shoppingCartContent = """
            {
                "items": [
                    {"id":"xl-tshirt"}
                    {"id":"xl-tshirt", "amount":1000}
                ]
            }
        """

        val mediaType = "application/json; charset=utf-8".toMediaType()

        val body = shoppingCartContent.toRequestBody(mediaType)
        val request = Request.Builder()
            .url(url)
            .post(body)
            .build()

        OkHttpClient()
            .newCall(request)
            .enqueue(object: Callback {
                override fun onFailure(call: Call, e: IOException) {
                    continuation.resume(Result.failure(e))
                }

                override fun onResponse(call: Call, response: Response) {
                    if (!response.isSuccessful) {
                        continuation.resume(Result.failure(Exception(response.message)))
                    } else {
                        val clientSecret = extractClientSecretFromResponse(response)

                        clientSecret?.let { secret ->
                            continuation.resume(Result.success(secret))
                        } ?: run {
                            val error = Exception("Could not find payment intent client secret in response!")

                            continuation.resume(Result.failure(error))
                        }
                    }
                }
            })
    }

    private fun extractClientSecretFromResponse(response: Response): String? {
        return try {
            val responseData = response.body?.string()
            val responseJson = responseData?.let { JSONObject(it) } ?: JSONObject()

            responseJson.getString("clientSecret")
        } catch (exception: JSONException) {
            null
        }
    }
        shippingDetails: AddressDetails?,
        val configuration = PaymentSheet.Configuration.Builder(merchantDisplayName = "Example, Inc.")
            .shippingDetails(shippingDetails)
            .allowsDelayedPaymentMethods(true)
            .appearance(
                PaymentSheet.Appearance(
                    primaryButton = PaymentSheet.PrimaryButton(
                        colorsLight = PaymentSheet.PrimaryButtonColors(
                            background = Color(red = 248, green = 72, blue = 94),
                            onBackground = Color.White,
                            border = Color.Unspecified
                        )
                    )
                )
            )
            .googlePay(
                PaymentSheet.GooglePayConfiguration(
                    environment = PaymentSheet.GooglePayConfiguration.Environment.Test,
                    countryCode = "US"
                )
            )
            .build()

        // Present Payment Sheet
        paymentSheet.presentWithPaymentIntent(paymentIntentClientSecret, configuration)
  <meta-data
    android:name="com.google.android.gms.wallet.api.enabled"
    android:value="true" />
        PaymentConfiguration.init(
            getApplicationContext(),
            "<<YOUR_PUBLISHABLE_KEY>>"
        );
import com.stripe.android.paymentsheet.addresselement.AddressDetails;
import com.stripe.android.paymentsheet.addresselement.AddressLauncher;
import com.stripe.android.paymentsheet.addresselement.AddressLauncherResult;
    private AddressLauncher addressLauncher;

    private AddressDetails shippingDetails;

    private Button addressButton;

    private final AddressLauncher.Configuration configuration =
            new AddressLauncher.Configuration.Builder()
                    .additionalFields(
                            new AddressLauncher.AdditionalFieldsConfiguration(
                                AddressLauncher.AdditionalFieldsConfiguration.FieldConfiguration.REQUIRED
                            )
                    )
                    .allowedCountries(new HashSet<>(Arrays.asList("US", "CA", "GB")))
                    .title("Shipping Address")
                    .googlePlacesApiKey("(optional) YOUR KEY HERE")
                    .build();
          // Hook up the address button
          addressButton = findViewById(R.id.address_button);
          addressButton.setOnClickListener(this::onAddressClicked);
          addressLauncher = new AddressLauncher(this, this::onAddressLauncherResult);
    private void fetchPaymentIntent() {
        final String shoppingCartContent = "{\"items\": [ {\"id\":\"xl-tshirt\"}]}";
        final String shoppingCartContent = "{\"items\": [ {\"id\":\"xl-tshirt\", \"amount\":1000}]}";

        final RequestBody requestBody = RequestBody.create(
            shoppingCartContent,
            MediaType.get("application/json; charset=utf-8")
        );

        Request request = new Request.Builder()
            .url(BACKEND_URL + "/create-payment-intent")
            .post(requestBody)
            .build();

        new OkHttpClient()
            .newCall(request)
            .enqueue(new Callback() {
                @Override
                public void onFailure(@NonNull Call call, @NonNull IOException e) {
                    showAlert("Failed to load data", "Error: " + e.toString());
                }

                @Override
                public void onResponse(
                    @NonNull Call call,
                    @NonNull Response response
                ) throws IOException {
                    if (!response.isSuccessful()) {
                        showAlert(
                        "Failed to load page",
                        "Error: " + response.toString()
                        );
                    } else {
                        final JSONObject responseJson = parseResponse(response.body());
                        paymentIntentClientSecret = responseJson.optString("clientSecret");
                        runOnUiThread(() -> payButton.setEnabled(true));
                        Log.i(TAG, "Retrieved PaymentIntent");
                    }
                }
            });
    }
        PaymentSheet.Configuration configuration = new PaymentSheet.Configuration.Builder("Example, Inc.")
                .allowsDelayedPaymentMethods(true)

                .primaryButtonColor(ColorStateList.valueOf(Color.rgb(248, 72, 94)))
                .googlePay(new PaymentSheet.GooglePayConfiguration(
                        PaymentSheet.GooglePayConfiguration.Environment.Test,
                        "US"))
                .build();

        // Present Payment Sheet
        paymentSheet.presentWithPaymentIntent(paymentIntentClientSecret, configuration);
    private void onAddressClicked(View view) {
      AddressLauncher.Configuration addressConfiguration = new AddressLauncher.Configuration.Builder().address(shippingDetails).build();
      String publishableKey = PaymentConfiguration.getInstance(this.getApplicationContext()).getPublishableKey();

      addressLauncher.present(
        publishableKey,
        addressConfiguration
      );
    }
        if (paymentSheetResult instanceof PaymentSheetResult.Completed) {
            showToast("Payment complete!");
        } else if (paymentSheetResult instanceof PaymentSheetResult.Canceled) {
            Log.i(TAG, "Payment canceled!");
        } else if (paymentSheetResult instanceof PaymentSheetResult.Failed) {
            Throwable error = ((PaymentSheetResult.Failed) paymentSheetResult).getError();
            showAlert("Payment failed", error.getLocalizedMessage());
        }
    private void onAddressLauncherResult(AddressLauncherResult result) {
        // TODO: Handle result and update your UI
        if (result instanceof AddressLauncherResult.Succeeded) {
            shippingDetails = ((AddressLauncherResult.Succeeded) result).getAddress();
        } else if (result instanceof AddressLauncherResult.Canceled) {
            // TODO: Handle cancel
        }
    }
  <meta-data
    android:name="com.google.android.gms.wallet.api.enabled"
    android:value="true" />
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
require github.com/stripe/stripe-go/v85 v85.2.0
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
{
  "name": "stripe-sample",
  "version": "0.2.0",
  "license": "ISC",
  "dependencies": {
    "@stripe/react-stripe-js": "^3.7.0",
    "@stripe/stripe-js": "^7.3.0",
    "express": "^4.21.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "react-scripts": "^5.0.1",
    "stripe": "^16.12.0"
  },
  "devDependencies": {
    "@babel/plugin-transform-private-property-in-object": "^7.25.7",
    "concurrently": "^9.0.1"
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
    "react-router-dom": "^6.26.1",
    "react-scripts": "^5.0.1"
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

\## API Keys

This code sample uses a public sample test API key. Don't submit any personally identifiable information in requests made with this key.

The "View details" link to see the PaymentIntent details in the Dashboard won't work until you use your own test [API key](https://docs.stripe.com/keys).
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

2. Download and run the [Stripe CLI](https://stripe.com/docs/stripe-cli). The Stripe CLI is a developer tool that helps you build, test, and manage your integration with Stripe directly from the command line.
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

### Create a PaymentIntent

Add an endpoint on your server that creates a [PaymentIntent](https://docs.stripe.com/api/payment_intents.md). A PaymentIntent tracks the customer’s payment lifecycle, keeping track of any failed payment attempts and ensuring the customer is only charged once. Return the PaymentIntent’s *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)) in the response to finish the payment on the client.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Add Stripe to your React app

Use the *Stripe.js* (Use Stripe.js’ APIs to tokenize customer information, collect sensitive card data, and accept payments with browser payment APIs) and the [Stripe Elements UI library](https://docs.stripe.com/sdks/stripejs-react.md) to stay *PCI compliant* (Any party involved in processing, transmitting, or storing credit card data must comply with the rules specified in the Payment Card Industry (PCI) Data Security Standards. PCI compliance is a shared responsibility and applies to both Stripe and your business) by ensuring that payment details go directly to Stripe and never reach your server.

```bash
npm install --save @stripe/react-stripe-js @stripe/stripe-js
```

### Add Stripe to your React app

Use the *Stripe.js* (Use Stripe.js’ APIs to tokenize customer information, collect sensitive card data, and accept payments with browser payment APIs) and the [Stripe Elements UI library](https://docs.stripe.com/sdks/stripejs-react.md) to stay *PCI compliant* (Any party involved in processing, transmitting, or storing credit card data must comply with the rules specified in the Payment Card Industry (PCI) Data Security Standards. PCI compliance is a shared responsibility and applies to both Stripe and your business) by ensuring that payment details go directly to Stripe and never reach your server.

```bash
npm install --save @stripe/react-stripe-js @stripe/stripe-js
```

### Load Stripe.js

Call `loadStripe()` with your Stripe [publishable API key](https://docs.stripe.com/keys.md#obtain-api-keys) to configure the Stripe library.

### Load Stripe.js

Call `loadStripe()` with your Stripe [publishable API key](https://docs.stripe.com/keys.md#obtain-api-keys) to configure the Stripe library.

### Load Stripe.js

Use *Stripe.js* (Use Stripe.js’ APIs to tokenize customer information, collect sensitive card data, and accept payments with browser payment APIs) to remain *PCI compliant* (Any party involved in processing, transmitting, or storing credit card data must comply with the rules specified in the Payment Card Industry (PCI) Data Security Standards. PCI compliance is a shared responsibility and applies to both Stripe and your business) by ensuring that payment details are sent directly to Stripe without hitting your server. Always load Stripe.js from js.stripe.com to remain compliant. Don’t include the script in a bundle or host it yourself.

### Define the payment form

Add one empty placeholder `div` to your checkout form for each Element that you’ll mount. Stripe inserts an iframe into each `div` to securely collect the customer’s email address and payment information.

### Initialize Stripe.js

Initialize Stripe.js with your [publishable API key](https://docs.stripe.com/keys.md#obtain-api-keys). You’ll use Stripe.js to create the Payment Element and complete the payment on the client.

### Fetch a PaymentIntent

Immediately make a request to the endpoint on your server to create a new PaymentIntent as soon as your checkout page loads. The `clientSecret` returned by your endpoint is used to complete the payment.

### Initialize Stripe Elements

Pass the resulting promise from `loadStripe` to the Elements provider. This allows the child components to access the Stripe service with the Elements consumer. Additionally, pass the client secret as an option to the Elements provider.

### Initialize Stripe Elements

Pass the resulting promise from `loadStripe` to the Elements provider. This allows the child components to access the Stripe service through the Elements consumer. Additionally, pass the client secret as an option to the Elements provider.

### Initialize Stripe Elements

Initialize the [Stripe Elements UI library](https://docs.stripe.com/js/elements_object/create) with the client secret. Elements manages the UI components you need to collect payment details.

### Set up the state

Initialize some state to keep track of the payment, show errors, and manage the user interface.

### Set up the state

Initialize some state to keep track of the payment, show errors, and manage the user interface.

### Store a reference to Stripe

Access the Stripe library in your CheckoutForm component by using the `useStripe()` and `useElements()` hooks. If you need to access Elements with a class component, use the [ElementsConsumer](https://docs.stripe.com/sdks/stripejs-react.md#elements-consumer) instead.

### Store a reference to Stripe

Access the Stripe library in your CheckoutForm component by using the `useStripe()` and `useElements()` hooks. If you need to access Elements through a class component, use the [ElementsConsumer](https://docs.stripe.com/sdks/stripejs-react.md#elements-consumer) instead.

### Add the PaymentElement

Add [PaymentElement](https://docs.stripe.com/js/elements_object/create_payment_element) to your payment form. It embeds an iframe with a dynamic form that collects payment details for a variety of payment methods. Your customer can pick a payment method type, and the form automatically collects all necessary payments details for their selection.

### Add the PaymentElement

Add the [PaymentElement](https://docs.stripe.com/js/elements_object/create_payment_element) to your payment form. It embeds an iframe with a dynamic form that collects payment details for a variety of payment methods. Your customer can pick a payment method type, and the form automatically collects all necessary payments details for their selection.

### Create the PaymentElement

Create a [PaymentElement](https://docs.stripe.com/js/elements_object/create_payment_element) and mount it to the placeholder `<div>` in your payment form. This embeds an iframe with a dynamic form that displays configured payment method types available from the PaymentIntent, allowing your customer to select a payment method. The form automatically collects the associated payment details for the selected payment method type.

### (Optional) Style the Payment Element

Customize the Payment Element UI by creating an [Appearance object](https://docs.stripe.com/elements/appearance-api.md) and passing it as an option to the Elements provider. Use your company’s color scheme and font to make it match with the rest of your checkout page. Use custom fonts (for example, from Google Fonts) by initializing Elements with a [font set](https://docs.stripe.com/js/elements_object/create#stripe_elements-options-fonts).

Make sure to open the preview on the right to see your changes live.

> Parts of the preview demo might not match your actual checkout page. The above settings represent only a subset of the [Appearance object’s](https://docs.stripe.com/elements/appearance-api.md) variables, and the [Appearance object](https://docs.stripe.com/elements/appearance-api.md) only controls certain attributes of Stripe Elements. You’re responsible for styling the rest of your checkout page.

### (Optional) Style the Payment Element

Customize the Payment Element UI by creating an [Appearance object](https://docs.stripe.com/elements/appearance-api.md) and passing it as an option to the Elements provider. Use your company’s color scheme and font to make it match with the rest of your checkout page. Use custom fonts (for example, from Google Fonts) by initializing Elements with a [font set](https://docs.stripe.com/js/elements_object/create#stripe_elements-options-fonts).

Make sure to open the preview on the right to see your changes live.

> Parts of the preview demo might not match your actual checkout page. The above settings represent only a subset of the Appearance object’s variables, and the Appearance object only controls certain attributes of Stripe Elements. You’re responsible for styling the rest of your checkout page.

### (Optional) Style the Payment Element

Customize the Payment Element UI by creating an [Appearance object](https://docs.stripe.com/elements/appearance-api.md) and initializing Elements with it. Use your company’s color scheme and font to make it match with the rest of your checkout page. Use custom fonts (for example, from Google Fonts) by initializing Elements with a [font set](https://docs.stripe.com/js/elements_object/create#stripe_elements-options-fonts).

Make sure to open the preview on the right to see your changes live.

> Parts of the preview demo might not match your actual checkout page. The above settings represent only a subset of the [Appearance object’s](https://docs.stripe.com/elements/appearance-api.md) variables, and the [Appearance object](https://docs.stripe.com/elements/appearance-api.md) only controls certain attributes of Stripe Elements. You’re responsible for styling the rest of your checkout page.

### Handle the submit event

Listen to the form’s submit event to know when to confirm the payment through the Stripe API.

### Complete the payment

When your customer clicks the pay button, call [confirmPayment](https://docs.stripe.com/js/payment_intents/confirm_payment) with the PaymentElement and pass a [return_url](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-return_url) to indicate where Stripe redirects the customer after they complete the payment. For payments that require authentication, Stripe displays a modal for *3D Secure* (3D Secure (3DS) provides an additional layer of authentication for credit card transactions that protects businesses from liability for fraudulent card payments) authentication or redirects the customer to an authentication page, depending on the payment method. After the customer completes the authentication process, they’re redirected to the `return_url`.

### Complete the payment

When your customer clicks the pay button, call [confirmPayment](https://docs.stripe.com/js/payment_intents/confirm_payment) with the PaymentElement and pass a [return_url](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-return_url) to indicate where Stripe redirects the customer after they complete the payment. For payments that require authentication, Stripe displays a modal for *3D Secure* (3D Secure (3DS) provides an additional layer of authentication for credit card transactions that protects businesses from liability for fraudulent card payments) authentication or redirects the customer to an authentication page, depending on the payment method. After the customer completes the authentication process, they’re redirected to the `return_url`.

### Complete the payment

Call [confirmPayment](https://docs.stripe.com/js/payment_intents/confirm_payment) with the Element instance and a [return_url](https://docs.stripe.com/api/payment_intents/create.md#create_payment_intent-return_url) to indicate where Stripe redirects the customer after they complete the payment. For payments that require authentication, Stripe displays a modal for *3D Secure* (3D Secure (3DS) provides an additional layer of authentication for credit card transactions that protects businesses from liability for fraudulent card payments) authentication or redirects the customer to an authentication page, depending on the payment method. After the customer completes the authentication process, they’re redirected to the `return_url`.

### Handle errors

If there are any immediate [errors](https://docs.stripe.com/error-codes.md) (for example, your customer’s card is declined), Stripe.js returns an error. Show that error message to your customer so they can try again.

### Show a payment status message

When Stripe redirects the customer to the `return_url`, the `payment_intent_client_secret` query parameter is appended by Stripe.js. Use this to retrieve the [PaymentIntent status update](https://docs.stripe.com/payments/payment-intents/verifying-status.md) and determine what to show to your customer.

### Show a payment status message

When Stripe redirects the customer to the `return_url`, the `payment_intent` query parameter is appended by Stripe.js. Use this to retrieve the [PaymentIntent status update](https://docs.stripe.com/payments/payment-intents/verifying-status.md) and determine what to show to your customer.

### Use a webhook

Stripe sends multiple events during the payment process and after the payment is complete. Create an [event destination](https://docs.stripe.com/event-destinations.md) for a [webhook endpoint](https://docs.stripe.com/webhooks/quickstart.md) to receive these events and run actions, such as sending an order confirmation email to your customer, logging the sale in a database, or starting a shipping workflow. Stripe recommends handling the [payment_intent.succeeded](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.succeeded), [payment_intent.processing](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.processing), and [payment_intent.payment_failed](https://docs.stripe.com/api/events/types.md?lang=php#event_types-payment_intent.payment_failed) events.

Listen for these events rather than waiting on a callback from the client. On the client, the customer could close the browser window or quit the app before the callback executes, and malicious clients could manipulate the response. Setting up your integration to listen for asynchronous events is what enables you to accept [different types of payment methods](https://stripe.com/payments/payment-methods-guide) with a single integration.

### Run the application

Run the React app and the server. Go to [localhost:3000/checkout](http://localhost:3000/checkout) to see your checkout page.

```bash
npm start
```

### Run the application

Run the Next.js app. Go to [localhost:3000](http://localhost:3000) to see your checkout page.

```bash
npm run dev
```

### Run the application

Run your Node server and go to [localhost:4242/checkout.html](http://localhost:4242/checkout.html).

```bash
npm start
```

### Run the server application

Run the React app and the server. Go to [localhost:3000/checkout](http://localhost:3000/checkout) to see your checkout page.

```bash
ruby server.rb
```

### Run the application

Run your Ruby server and go to [localhost:4242/checkout.html](http://localhost:4242/checkout.html).

```bash
ruby server.rb
```

### Run the server application

Run the React app and the server. Go to [localhost:3000/checkout](http://localhost:3000/checkout) to see your checkout page.

```bash
python3 -m flask run --port=4242
```

### Run the application

Run your Python server and go to [localhost:4242/checkout.html](http://localhost:4242/checkout.html).

```bash
python3 -m flask run --port=4242
```

### Run the server application

Run the React app and the server. Go to [localhost:3000/checkout](http://localhost:3000/checkout) to see your checkout page.

```bash
php -S 127.0.0.1:4242 --docroot=public
```

### Run the application

Run your server and go to [localhost:4242/checkout.html](http://localhost:4242/checkout.html).

```bash
php -S 127.0.0.1:4242 --docroot=public
```

### Run the server application

Run the React app and the server. Go to [localhost:3000/checkout](http://localhost:3000/checkout) to see your checkout page.

```bash
go run server.go
```

### Run the application

Run your Go server and go to [localhost:4242/checkout.html](http://localhost:4242/checkout.html).

```bash
go run server.go
```

### Run the server application

Run the React app and the server. Go to [localhost:3000/checkout](http://localhost:3000/checkout) to see your checkout page.

```bash
dotnet run
```

### Run the application

Run your ASP.NET MVC server and go to [localhost:4242/checkout.html](http://localhost:4242/checkout.html).

```bash
dotnet run
```

### Run the application

Run your server and go to [localhost:4242/checkout.html](http://localhost:4242/checkout.html).

```bash
java -cp target/sample-jar-with-dependencies.jar com.stripe.sample.Server
```

### Run the server application

Run the React app and the server. Go to [localhost:3000/checkout](http://localhost:3000/checkout) to see your checkout page.

```bash
java -cp target/sample-jar-with-dependencies.jar com.stripe.sample.Server
```

### Run the application

Run the React app and go to [localhost:3000/checkout](http://localhost:3000/checkout).

```bash
npm start
```

### Make a test payment

To verify that your integration works, make a test payment using [test payment details](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=elements&api-integration=paymentintents#web-test-the-integration).

### See your payment in the Dashboard

Navigate to the [Stripe Dashboard](https://dashboard.stripe.com/test/payments) to see your test payment.

## Accept payments and enhance your integration

You’re ready to accept payments with Stripe. Continue with the steps below to add more features.

### Automate tax collection

Calculate and collect the right amount of tax on your Stripe transactions. Before using Stripe Tax, you need to activate it in the [Dashboard](https://dashboard.stripe.com/tax). Learn more about [Stripe Tax](https://docs.stripe.com/tax.md) and [how to add it to your Payments integration](https://docs.stripe.com/tax/standalone-tax-api.md).

### Use the Stripe Tax API to calculate tax

Use the [Stripe Tax API](https://docs.stripe.com/api/tax/calculations/create.md) to calculate tax on the transaction. Provide the `currency`, `customer_details`, and the `line_items` of the order in the request body.

Use the `tax_amount_exclusive` attribute of the resulting Tax Calculation to add the exclusive taxes to the order’s total.

### Record a Tax Transaction upon successful Payment

Link the tax calculation to the PaymentIntent using `hooks[inputs][tax][calculation]`.

This records the collected taxes in your Stripe account that you can later export for accounting purposes, and triggers other [Stripe actions](https://docs.stripe.com/tax/payment-intent/simplified.md#automatic-actions).

### Send an email receipt

Stripe can send an email receipt to your customer using your brand logo and color theme, which are configurable in the [Dashboard](https://dashboard.stripe.com/settings/branding).

### Collect the customer’s email address

Add an input field to your payment form to collect the email address.

### Add email to the state

Add a variable to keep track of the email the customer enters.

### Add email to the state

Add a variable to keep track of the email the customer enters.

### Provide the email address to Stripe

Pass the provided email address as the `receipt_email` value. Stripe sends an email receipt when the payment succeeds in live mode (but won’t send one in a *sandbox* (A sandbox is an isolated test environment that allows you to test Stripe functionality in your account without affecting your live integration. Use sandboxes to safely experiment with new features and changes)).

### Save payment details after payment

Often used by SaaS or e-commerce businesses with recurring customers.

### Import additional Stripe resources

Import the Stripe `customer` and `paymentmethod` packages. Use these packages to store information about your customer.

### Import additional Stripe resources

Import the Stripe PaymentMethod and Customer models. Use these models to store information about your Customer.

### Create a customer

Stripe stores the card on a *Customer* (Customer objects represent customers of your business. They let you reuse payment methods and give you the ability to track multiple payments) object. Create a new Customer before creating a PaymentIntent. You can also store name, email, shipping address, and other details on the Customer.

### Create a customer

Stripe stores the card on an [Account](https://docs.stripe.com/api/v2/core/accounts/object.md) object representing the [customer](https://docs.stripe.com/connect/account-capabilities.md?accounts-namespace=v2#customer). Create a new Account before creating a PaymentIntent. You can also store name, email, shipping address, and other details on the Account.

### Add the customer to the PaymentIntent

Pass the Customer ID to the PaymentIntent and set `setup_future_usage` to `off_session`. `setup_future_usage` tells Stripe how you plan to use the payment method—certain regions, such as Europe and India, have requirements around reusing payment details. [Learn more](https://docs.stripe.com/payments/payment-intents.md#future-usage) about the most effective way to apply `setup_future_usage`. You can also view a [list of supported payment methods](https://docs.stripe.com/payments/payment-methods/payment-method-support.md#additional-api-supportability). After the PaymentIntent succeeds, Stripe automatically [attaches](https://docs.stripe.com/api/payment_methods/attach.md) the payment details (in a *PaymentMethod* (PaymentMethods represent your customer's payment instruments, used with the Payment Intents or Setup Intents APIs) object) to your Customer.

### Add the customer to the PaymentIntent

Pass the Account ID to the PaymentIntent and set `setup_future_usage` to `off_session`. `setup_future_usage` tells Stripe how you plan to use the payment method—certain regions, such as Europe and India, have requirements around reusing payment details. [Learn more](https://docs.stripe.com/payments/payment-intents.md#future-usage) about the most effective way to apply `setup_future_usage`. You can also view a [list of supported payment methods](https://docs.stripe.com/payments/payment-methods/payment-method-support.md#additional-api-supportability). After the PaymentIntent succeeds, Stripe automatically [attaches](https://docs.stripe.com/api/payment_methods/attach.md) the payment details (in a *PaymentMethod* (PaymentMethods represent your customer's payment instruments, used with the Payment Intents or Setup Intents APIs) object) to the customer-configured Account.

### Charge the saved PaymentMethod

When you’re ready to charge the PaymentMethod again, create a new PaymentIntent with the Customer ID, the ID of the PaymentMethod you want to charge, and set the `off_session` and `confirm` flags to true.

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

### Create a PaymentIntent

Add an endpoint on your server that creates a [PaymentIntent](https://docs.stripe.com/api/payment_intents.md). A PaymentIntent tracks the customer’s payment lifecycle, keeping track of any failed payment attempts and ensuring the customer is only charged once. Return the PaymentIntent’s *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)) in the response to finish the payment on the client.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Install the SDK

The Stripe iOS SDK is [open source](https://github.com/stripe/stripe-ios), [fully documented](https://stripe.dev/stripe-ios/), and compatible with apps supporting iOS 13 or above. Import the Stripe SDK into your checkout screen’s View Controller.

#### Swift Package Manager

In Xcode, select **File** > **Add Package Dependencies……** and enter `https://github.com/stripe/stripe-ios-spm` as the repository URL. Select the latest version number from our [releases page](https://github.com/stripe/stripe-ios/releases), and add the `StripePaymentSheet` module to your app’s target.

#### CocoaPods

Add this line to your Podfile, and use the .xcworkspace file to open your project in Xcode, instead of the .xcodeproj file, from here on out.

```bash
pod 'StripePaymentSheet'
```

#### Carthage

Add this line to your Cartfile.

```bash
github "stripe/stripe-ios"
```

#### Manual Framework

To include Stripe in your project, download and unzip Stripe.xcframework.zip from a [release on GitHub](https://github.com/stripe/stripe-ios/releases). Drag the required xcframework files to the “Embedded Binaries” settings in your Xcode project. Make sure to select “Copy items if needed”.

### Setup the SDK

Configure the Stripe SDK with your Stripe [publishable API key](https://docs.stripe.com/keys.md#obtain-api-keys). Hardcoding the publishable API key in the SDK is for demonstration only. In a production app, you must retrieve the API key from your server.

### Fetch a PaymentIntent

Make a request to your server for a PaymentIntent as soon as the view loads. Store a reference to the PaymentIntent’s *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)) returned by the server; the Payment Sheet uses this secret to complete the payment later.

### Configure and present the Payment Sheet

Create a `PaymentSheet` instance using the client secret retrieved earlier, and present it from your view controller.

Use the `PaymentSheet.Configuration` struct for [customizing](https://stripe.dev/stripe-ios/stripe-paymentsheet/Classes/PaymentSheet/Configuration.html) the Payment Sheet.

### Handle the payment result

Use the completion block for handling the payment result.

If payment fails with an [error](https://docs.stripe.com/error-codes.md), display the appropriate message to your customer so they can take action and try again. If no error has occurred, tell your customer that the payment was successful.

### Make a test payment

#### iOS

To verify that your integration works, make a test payment using [test payment details](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=mobile&platform=ios#ios-test-the-integration).

#### Android

To verify that your integration works, make a test payment using [test payment details](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=mobile&platform=android#android-test-the-integration).

### See your payment in the Dashboard

Navigate to the [Stripe Dashboard](https://dashboard.stripe.com/test/payments) to see your test payment.

## Accept payments and enhance your integration

You’re ready to accept payments with Stripe. Continue with the steps below to add more features.

### Automate tax collection

Calculate and collect the right amount of tax on your Stripe transactions. Before using Stripe Tax, you need to activate it in the [Dashboard](https://dashboard.stripe.com/tax). Learn more about [Stripe Tax](https://docs.stripe.com/tax.md) and [how to add it to your Payments integration](https://docs.stripe.com/tax/standalone-tax-api.md).

### Use the Stripe Tax API to calculate tax

Use the [Stripe Tax API](https://docs.stripe.com/api/tax/calculations/create.md) to calculate tax on the transaction. Provide the `currency`, `customer_details`, and the `line_items` of the order in the request body.

Use the `tax_amount_exclusive` attribute of the resulting Tax Calculation to add the exclusive taxes to the order’s total.

### Record a Tax Transaction upon successful Payment

Link the tax calculation to the PaymentIntent using `hooks[inputs][tax][calculation]`.

This records the collected taxes in your Stripe account that you can later export for accounting purposes, and triggers other [Stripe actions](https://docs.stripe.com/tax/payment-intent/simplified.md#automatic-actions).

### Allow delayed payment methods

Some payment methods can’t guarantee that you’ll receive funds from your customer at the end of the check out because they take time to settle (for example, most bank debits, such as SEPA or ACH) or require customer action to complete (for example, OXXO, Konbini, Boleto). Use this flag to enable delayed payment methods.

If you enable this feature, make sure your server integration listens to [webhooks](https://docs.stripe.com/payments/payment-methods.md#payment-notification) for notifications on whether payment has succeeded or not.

### Add Apple Pay support

To enable Apple Pay, provide your [Apple Pay Merchant ID](https://support.stripe.com/questions/enable-apple-pay-on-your-stripe-account) and your Stripe account’s [country code](https://dashboard.stripe.com/settings/account).

### Add Google Pay support

To use Google Pay, first enable the Google Pay API in your AndroidManifest.xml.

Enable Google Pay by passing a [PaymentSheet.GooglePayConfiguration](https://stripe.dev/stripe-android/paymentsheet/com.stripe.android.paymentsheet/-payment-sheet/-google-pay-configuration/index.html) object with the Google Pay environment (production or test) and the [country code of your business](https://dashboard.stripe.com/settings/account) when initializing [PaymentSheet.Configuration](https://stripe.dev/stripe-android/paymentsheet/com.stripe.android.paymentsheet/-payment-sheet/-configuration/index.html).

### Customize the primary button color

Consider using a custom color for the primary button that better matches your brand or app’s visual identity.

### Enable card scanning

Card scanning can help increase your conversion rate by removing the friction of manual card entry. To enable card scanning, set `NSCameraUsageDescription` in your application’s `Info.plist`, and provide a reason for accessing the camera (for example, “To scan cards”).

> Card scanning is only supported on devices running iOS 13 or higher.

### Enable card scanning

Card scanning can help increase your conversion rate by removing the friction of manual card entry. To enable card scanning, add `stripecardscan` to the `dependencies` block of your [app/build.gradle](https://developer.android.com/studio/build/dependencies) file:

#### Groovy

```groovy
implementation 'com.stripe:stripecardscan:23.10.0'
```

### Save payment details after payment

Often used by SaaS or e-commerce businesses with recurring customers.

### Import additional Stripe resources

Import the Stripe `customer` and `paymentmethod` packages. Use these packages to store information about your customer.

### Import additional Stripe resources

Import the Stripe PaymentMethod and Customer models. Use these models to store information about your Customer.

### Create a customer

Stripe stores the card on a *Customer* (Customer objects represent customers of your business. They let you reuse payment methods and give you the ability to track multiple payments) object. Create a new Customer before creating a PaymentIntent. You can also store name, email, shipping address, and other details on the Customer.

### Create a customer

Stripe stores the card on an [Account](https://docs.stripe.com/api/v2/core/accounts/object.md) object representing the [customer](https://docs.stripe.com/connect/account-capabilities.md?accounts-namespace=v2#customer). Create a new Account before creating a PaymentIntent. You can also store name, email, shipping address, and other details on the Account.

### Add the customer to the PaymentIntent

Pass the Customer ID to the PaymentIntent and set `setup_future_usage` to `off_session`. `setup_future_usage` tells Stripe how you plan to use the payment method—certain regions, such as Europe and India, have requirements around reusing payment details. [Learn more](https://docs.stripe.com/payments/payment-intents.md#future-usage) about the most effective way to apply `setup_future_usage`. You can also view a [list of supported payment methods](https://docs.stripe.com/payments/payment-methods/payment-method-support.md#additional-api-supportability). After the PaymentIntent succeeds, Stripe automatically [attaches](https://docs.stripe.com/api/payment_methods/attach.md) the payment details (in a *PaymentMethod* (PaymentMethods represent your customer's payment instruments, used with the Payment Intents or Setup Intents APIs) object) to your Customer.

### Add the customer to the PaymentIntent

Pass the Account ID to the PaymentIntent and set `setup_future_usage` to `off_session`. `setup_future_usage` tells Stripe how you plan to use the payment method—certain regions, such as Europe and India, have requirements around reusing payment details. [Learn more](https://docs.stripe.com/payments/payment-intents.md#future-usage) about the most effective way to apply `setup_future_usage`. You can also view a [list of supported payment methods](https://docs.stripe.com/payments/payment-methods/payment-method-support.md#additional-api-supportability). After the PaymentIntent succeeds, Stripe automatically [attaches](https://docs.stripe.com/api/payment_methods/attach.md) the payment details (in a *PaymentMethod* (PaymentMethods represent your customer's payment instruments, used with the Payment Intents or Setup Intents APIs) object) to the customer-configured Account.

### Charge the saved PaymentMethod

When you’re ready to charge the PaymentMethod again, create a new PaymentIntent with the Customer ID, the ID of the PaymentMethod you want to charge, and set the `off_session` and `confirm` flags to true.

### Collect addresses using the Address Element

Collect local and international shipping or billing addresses from your customers.

### Collect addresses using the Address Element

Collect local and international shipping or billing addresses from your customers.

If you use the Address Element, you can optionally use the [Google Places SDK](https://developers.google.com/maps/documentation/places/android-sdk/overview) to fetch address autocomplete suggestions. To enable autocomplete suggestions, add `places` to the dependency block of your [app/build.gradle](https://developer.android.com/studio/build/dependencies) file:

#### Groovy

```groovy
implementation 'com.google.android.libraries.places:places:2.6.0'
```

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

### Create a PaymentIntent

Add an endpoint on your server that creates a [PaymentIntent](https://docs.stripe.com/api/payment_intents.md). A PaymentIntent tracks the customer’s payment lifecycle, keeping track of any failed payment attempts and ensuring the customer is only charged once. Return the PaymentIntent’s *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)) in the response to finish the payment on the client.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Configure payment methods

Stripe enables cards and other common payment methods by default with [dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md). You can update and configure payment methods from the [Dashboard](https://dashboard.stripe.com/settings/payment_methods) with no code required. Stripe filters payment methods based on eligibility and payment method preferences, then orders and displays them by probability based on factors including amount, currency, and buyer location.

### Install the SDK

The Stripe Android SDK is [open source](https://github.com/stripe/stripe-android) and [fully documented](https://stripe.dev/stripe-android/) and compatible with devices running Android 5.0 (API level 21) and above.

To install the SDK, add `stripe-android` to the dependencies block of your `build.gradle` file:

#### Groovy

```groovy
implementation 'com.stripe:stripe-android:23.10.0'
```

> For details on the latest SDK release and past versions, see the [Releases page](https://github.com/stripe/stripe-android/releases) on GitHub.

### Setup the SDK

Configure the Stripe SDK with your Stripe [publishable API key](https://docs.stripe.com/keys.md#obtain-api-keys). Hardcoding the publishable API key in the SDK is for demonstration only. In a production app, you must retrieve the API key from your server.

### Fetch a PaymentIntent

Make a request to your server for a PaymentIntent as soon as the view loads. Store a reference to the PaymentIntent’s *client secret* (The client secret is a unique key returned from Stripe as part of a PaymentIntent. This key lets the client access important fields from the PaymentIntent (status, amount, currency) while hiding sensitive ones (metadata, customer)) returned by the server; the Payment Sheet uses this secret to complete the payment later.

### Configure and present the Payment Sheet

Create a `PaymentSheet` instance using the client secret retrieved earlier, and present it from your view controller.

Use the `PaymentSheet.Configuration` struct for [customizing](https://stripe.dev/stripe-ios/stripe-paymentsheet/Classes/PaymentSheet/Configuration.html) the Payment Sheet.

### Handle the payment result

Use the completion block for handling the payment result.

If payment fails with an [error](https://docs.stripe.com/error-codes.md), display the appropriate message to your customer so they can take action and try again. If no error has occurred, tell your customer that the payment was successful.

### Make a test payment

#### iOS

To verify that your integration works, make a test payment using [test payment details](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=mobile&platform=ios#ios-test-the-integration).

#### Android

To verify that your integration works, make a test payment using [test payment details](https://docs.stripe.com/payments/accept-a-payment.md?payment-ui=mobile&platform=android#android-test-the-integration).

### See your payment in the Dashboard

Navigate to the [Stripe Dashboard](https://dashboard.stripe.com/test/payments) to see your test payment.

## Accept payments and enhance your integration

You’re ready to accept payments with Stripe. Continue with the steps below to add more features.

### Automate tax collection

Calculate and collect the right amount of tax on your Stripe transactions. Before using Stripe Tax, you need to activate it in the [Dashboard](https://dashboard.stripe.com/tax). Learn more about [Stripe Tax](https://docs.stripe.com/tax.md) and [how to add it to your Payments integration](https://docs.stripe.com/tax/standalone-tax-api.md).

### Use the Stripe Tax API to calculate tax

Use the [Stripe Tax API](https://docs.stripe.com/api/tax/calculations/create.md) to calculate tax on the transaction. Provide the `currency`, `customer_details`, and the `line_items` of the order in the request body.

Use the `tax_amount_exclusive` attribute of the resulting Tax Calculation to add the exclusive taxes to the order’s total.

### Record a Tax Transaction upon successful Payment

Link the tax calculation to the PaymentIntent using `hooks[inputs][tax][calculation]`.

This records the collected taxes in your Stripe account that you can later export for accounting purposes, and triggers other [Stripe actions](https://docs.stripe.com/tax/payment-intent/simplified.md#automatic-actions).

### Allow delayed payment methods

Some payment methods can’t guarantee that you’ll receive funds from your customer at the end of the check out because they take time to settle (for example, most bank debits, such as SEPA or ACH) or require customer action to complete (for example, OXXO, Konbini, Boleto). Use this flag to enable delayed payment methods.

If you enable this feature, make sure your server integration listens to [webhooks](https://docs.stripe.com/payments/payment-methods.md#payment-notification) for notifications on whether payment has succeeded or not.

### Add Apple Pay support

To enable Apple Pay, provide your [Apple Pay Merchant ID](https://support.stripe.com/questions/enable-apple-pay-on-your-stripe-account) and your Stripe account’s [country code](https://dashboard.stripe.com/settings/account).

### Add Google Pay support

To use Google Pay, first enable the Google Pay API in your AndroidManifest.xml.

Enable Google Pay by passing a [PaymentSheet.GooglePayConfiguration](https://stripe.dev/stripe-android/paymentsheet/com.stripe.android.paymentsheet/-payment-sheet/-google-pay-configuration/index.html) object with the Google Pay environment (production or test) and the [country code of your business](https://dashboard.stripe.com/settings/account) when initializing [PaymentSheet.Configuration](https://stripe.dev/stripe-android/paymentsheet/com.stripe.android.paymentsheet/-payment-sheet/-configuration/index.html).

### Customize the primary button color

Consider using a custom color for the primary button that better matches your brand or app’s visual identity.

### Enable card scanning

Card scanning can help increase your conversion rate by removing the friction of manual card entry. To enable card scanning, set `NSCameraUsageDescription` in your application’s `Info.plist`, and provide a reason for accessing the camera (for example, “To scan cards”).

> Card scanning is only supported on devices running iOS 13 or higher.

### Enable card scanning

Card scanning can help increase your conversion rate by removing the friction of manual card entry. To enable card scanning, add `stripecardscan` to the `dependencies` block of your [app/build.gradle](https://developer.android.com/studio/build/dependencies) file:

#### Groovy

```groovy
implementation 'com.stripe:stripecardscan:23.10.0'
```

### Save payment details after payment

Often used by SaaS or e-commerce businesses with recurring customers.

### Import additional Stripe resources

Import the Stripe `customer` and `paymentmethod` packages. Use these packages to store information about your customer.

### Import additional Stripe resources

Import the Stripe PaymentMethod and Customer models. Use these models to store information about your Customer.

### Create a customer

Stripe stores the card on a *Customer* (Customer objects represent customers of your business. They let you reuse payment methods and give you the ability to track multiple payments) object. Create a new Customer before creating a PaymentIntent. You can also store name, email, shipping address, and other details on the Customer.

### Create a customer

Stripe stores the card on an [Account](https://docs.stripe.com/api/v2/core/accounts/object.md) object representing the [customer](https://docs.stripe.com/connect/account-capabilities.md?accounts-namespace=v2#customer). Create a new Account before creating a PaymentIntent. You can also store name, email, shipping address, and other details on the Account.

### Add the customer to the PaymentIntent

Pass the Customer ID to the PaymentIntent and set `setup_future_usage` to `off_session`. `setup_future_usage` tells Stripe how you plan to use the payment method—certain regions, such as Europe and India, have requirements around reusing payment details. [Learn more](https://docs.stripe.com/payments/payment-intents.md#future-usage) about the most effective way to apply `setup_future_usage`. You can also view a [list of supported payment methods](https://docs.stripe.com/payments/payment-methods/payment-method-support.md#additional-api-supportability). After the PaymentIntent succeeds, Stripe automatically [attaches](https://docs.stripe.com/api/payment_methods/attach.md) the payment details (in a *PaymentMethod* (PaymentMethods represent your customer's payment instruments, used with the Payment Intents or Setup Intents APIs) object) to your Customer.

### Add the customer to the PaymentIntent

Pass the Account ID to the PaymentIntent and set `setup_future_usage` to `off_session`. `setup_future_usage` tells Stripe how you plan to use the payment method—certain regions, such as Europe and India, have requirements around reusing payment details. [Learn more](https://docs.stripe.com/payments/payment-intents.md#future-usage) about the most effective way to apply `setup_future_usage`. You can also view a [list of supported payment methods](https://docs.stripe.com/payments/payment-methods/payment-method-support.md#additional-api-supportability). After the PaymentIntent succeeds, Stripe automatically [attaches](https://docs.stripe.com/api/payment_methods/attach.md) the payment details (in a *PaymentMethod* (PaymentMethods represent your customer's payment instruments, used with the Payment Intents or Setup Intents APIs) object) to the customer-configured Account.

### Charge the saved PaymentMethod

When you’re ready to charge the PaymentMethod again, create a new PaymentIntent with the Customer ID, the ID of the PaymentMethod you want to charge, and set the `off_session` and `confirm` flags to true.

### Collect addresses using the Address Element

Collect local and international shipping or billing addresses from your customers.

### Collect addresses using the Address Element

Collect local and international shipping or billing addresses from your customers.

If you use the Address Element, you can optionally use the [Google Places SDK](https://developers.google.com/maps/documentation/places/android-sdk/overview) to fetch address autocomplete suggestions. To enable autocomplete suggestions, add `places` to the dependency block of your [app/build.gradle](https://developer.android.com/studio/build/dependencies) file:

#### Groovy

```groovy
implementation 'com.google.android.libraries.places:places:2.6.0'
```

## Next steps

#### Web

#### [Collect billing address details](https://docs.stripe.com/elements/address-element.md)

By default, the Payment Element only collects the necessary billing address details. To collect a customer’s full billing address (to calculate the tax for digital goods and services, for example) or shipping address, use the Address Element.

#### iOS

#### Android

#### [Payouts](https://docs.stripe.com/payouts.md)

Learn how to move funds out of your Stripe account into your bank account.

#### [Refunds](https://docs.stripe.com/refunds.md)

Handle requests for refunds by using the Stripe API or Dashboard.

#### [Fulfillment](https://docs.stripe.com/webhooks/quickstart.md)

Create an event destination to send events to your webhook endpoint to fulfill orders after a payment succeeds, and to handle other critical events.
