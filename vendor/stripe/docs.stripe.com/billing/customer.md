# Customers

Learn how to use the Customer object with Stripe Billing.

The *Customer* (Customer objects represent customers of your business. They let you reuse payment methods and give you the ability to track multiple payments) object is a core entity within Stripe. Use it to store all of the profile, billing, and tax information required to bill a customer for *subscriptions* (A Subscription represents the product details associated with the plan that your customer subscribes to. Allows you to charge the customer on a recurring basis) and *invoices* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice).

> #### Use the Accounts v2 API to represent customers
> 
> You can instead use customer-configured `Account` objects to represent your customers. Using `Accounts` gives you a unified way to represent your users across Stripe products.
> 
> The Accounts v2 API is generally available for Connect users, and in public preview for other Stripe users. Learn more about [modeling your customers as customer-configured Account objects](https://docs.stripe.com/accounts-v2/use-accounts-as-customers.md) instead of using `Customer` objects.

## Manage customers 

Create a customer for every new user or business you want to bill. When creating a new customer, set a [minimum customer profile](https://docs.stripe.com/billing/customer.md#minimum-customer-profile) to help create useful invoices and enable Smart Retries (dunning). After creating and configuring this customer, use it to create a subscription and issue one-off invoices.

#### Dashboard

You can create and manage customers on the [Customers page](https://dashboard.stripe.com/customers) when you don’t want to use code to create a customer, or if you want to manually bill a customer with a one-off invoice. You can also create a customer in the Dashboard during invoice creation.

### Create a customer 

When you create a new customer, you can set their account and billing information, such as **Email**, **Name**, and **Country**. You can also set a customer’s preferred language, currency, and other important details.

To create a customer, complete these steps:

1. Verify that the customer doesn’t already exist.

2. Click **Add customer**, or press **N**, on the **Customers** page.

3. At a minimum, enter your customer’s **Name** and **Account email**.

4. Click **Add customer** in the dialog.

### Edit a customer 

To edit a customer’s profile, complete these steps:

1. Find the customer you want to modify and click the name on the **Customers** page.

2. In the account information page, select **Actions** > **Edit information**.

3. Make your changes to the customer profile.

4. Click **Update customer**.

### Delete a customer 

To delete a customer, complete these steps:

1. Find the customer you want to delete on the **Customers** page.

2. Click the checkbox next to your customer’s name followed by **Delete**. You can also click into the customer’s details page and select **Actions** > **Delete customer**.

#### API

Before billing a customer, you need to create a Customer object that you can configure with a name, email, and payment method. You can read more about this in the [integration guide](https://docs.stripe.com/billing/subscriptions/build-subscriptions.md), but here’s a basic example:

```curl
curl https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>:" \
  --data-urlencode "email=jenny.rosen@example.com" \
  -d payment_method=pm_card_visa \
  -d "invoice_settings[default_payment_method]=pm_card_visa"
```

See how to [create a customer](https://docs.stripe.com/api/customers/create.md) with the API for a complete list of parameters.

## Available properties and uses 

The Customer resource has many useful properties you can set to customize billing. This section explains the properties you can store on the Customer, and the effects of each.

### Customer profile

A basic customer profile is useful for invoice and receipt generation, and can generally act as a lightweight customer relationship management system (CRM) for your application. You can also use [affiliate and referral Stripe apps](https://marketplace.stripe.com/categories/affiliate_and_referrals) to set up and manage referral and affiliate programs with Stripe, get customer information, and automate commission adjustments from the Stripe Dashboard.

#### Minimal customer profile 

When creating a customer, set these properties:

- Email address
- Customer name
- Metadata with a reference to the internal customer ID of your application

An [email address](https://docs.stripe.com/api/customers/object.md#customer_object-email) lets Stripe notify the customer of failed payments or when completing a payment requires further action, as part of the [Automatic Collection](https://docs.stripe.com/invoicing/automatic-collection.md) process.

Store the internal customer ID of your application in the [metadata](https://docs.stripe.com/api/customers/object.md#customer_object-metadata) attribute. Like most Stripe resources, the Customer resource includes a [Metadata](https://docs.stripe.com/api/metadata.md) object hash to flexibly store contextual key-value information. To aid in auditing and support, store your internal customer ID as a key-value pair on the Customer resource. This allows you to search for the customer using your internal reference ID. Conversely, we recommend storing Stripe customer IDs against the internal customer model of your application.

#### Billing and shipping addresses 

Use the address properties to set an [address](https://docs.stripe.com/api/customers/object.md#customer_object-address) for billing (invoicing, credit notes, and so on), and a [shipping](https://docs.stripe.com/api/customers/object.md#customer_object-shipping) address (for physical goods).

While a shipping address is most relevant to businesses delivering physical goods, a billing address is useful because it displays on invoices, credit notes, and receipts—a common requirement for tax compliance.

#### Email and PDF language localization 

Localize Stripe-generated emails and PDFs by setting the `preferred_locales` property. This property accepts an ordered list of preferred languages, sorted by preference. These preferred locale values are based on [RFC-4646](https://tools.ietf.org/html/rfc4646). Examples include “en” for English, or “fr-CA” for Canadian French. See the [Customizing invoices](https://docs.stripe.com/invoicing/customize.md#customer-language) page for more information.

#### Per-customer invoice settings 

For further details on customizing invoice contents on a per-customer basis, see the [Customizing invoices](https://docs.stripe.com/invoicing/customize.md) page. It explains [custom fields](https://docs.stripe.com/invoicing/customize.md#custom-fields), [invoice footer](https://docs.stripe.com/invoicing/customize.md#footer-field) content, and how to [customize the invoice number](https://docs.stripe.com/invoicing/customize.md#invoice-numbering-schemes).

### Payment 

All payments are collected from [payment](https://docs.stripe.com/payments.md) details associated with a customer, and a customer can have multiple ways to make a payment, including:

- [Payment Methods](https://docs.stripe.com/payments/payment-methods.md)
- [Customer Credit Balance](https://docs.stripe.com/billing/customer.md#customer-balance)

Customers are [single-currency](https://docs.stripe.com/billing/customer.md#currency), meaning after you’ve assigned a currency, invoiced the customer, or [set a customer credit balance](https://docs.stripe.com/billing/customer.md#customer-balance), you can’t change the currency. This locked status is visible in the Dashboard in a disabled **Currency** dropdown.

If you need to bill a single entity with multiple currencies, create a new customer for each currency.

### Invoicing 

All invoicing-related resources are associated with the customer being billed. These resources include:

- [Pending invoice items](https://docs.stripe.com/billing/invoices/subscription.md#adding-draft-invoice-items)
- [Subscriptions](https://docs.stripe.com/billing/subscriptions/overview.md)
- [Invoices](https://docs.stripe.com/invoicing/overview.md)
- [Receipts](https://docs.stripe.com/receipts.md)
- [Invoice settings](https://docs.stripe.com/api/customers/create.md#create_customer-invoice_settings)

### Tax info 

To meet tax jurisdiction requirements, you might need to include customer tax ID numbers and other information on invoices. It’s ultimately your responsibility to make sure your customer’s invoices contain the correct information. This includes [tax IDs](https://docs.stripe.com/billing/customer/tax-ids.md), [tax exemption status](https://docs.stripe.com/api/customers/create.md#create_customer-tax_exempt), and [addresses](https://docs.stripe.com/billing/customer.md#addresses).

Tax IDs provide a way to store and render one or more tax ID numbers on invoices. Tax exemption status indicates whether the entity is taxable. By default, a customer’s `tax_exempt` status is set to `none`, meaning it’s a taxable billing entity. However, you can flag a customer as being responsible for paying the tax on an invoice by setting the `tax_exempt` property to `reverse`, or flag them as being tax exempt by setting the status to `exempt`. You can read more about using `tax_exempt` and `reverse` on the [Tax Rates](https://docs.stripe.com/tax/tax-rates.md#tax-exempt-and-reverse-charge) page.

## Common tasks 

This section explains some of the common tasks you might perform with the Customer resource.

### Create a subscription 

Before you can create a new subscription, you need to create a customer for billing purposes.

1. [Create the customer](https://docs.stripe.com/billing/customer.md#create-a-customer).
2. Define your [product](https://docs.stripe.com/products-prices/manage-prices.md#create-product) catalog and [prices](https://docs.stripe.com/products-prices/manage-prices.md#create-price).
3. [Create a subscription](https://docs.stripe.com/billing/subscriptions/overview.md) using the customer created in step one and a price (or multiple prices) from step two.

You can continue to update the customer’s details after you create the subscription until an invoice is [finalized](https://docs.stripe.com/invoicing.md). Any changes apply to the next billing period, when a new invoice is generated using the latest status of the customer when rendering PDFs, emails, and the hosted invoice page. Read the [How subscriptions work](https://docs.stripe.com/billing/subscriptions/overview.md) page for more detailed information.

### Send a one-off (manual) invoice to a customer 

Unlike subscription invoices, you manually issue one-off invoices and they don’t follow an automated schedule. This makes them useful for billing one-off orders or work, such as setup and installation fees, consultancy fees, or single orders for physical goods.

1. [Create the customer](https://docs.stripe.com/billing/customer.md#create-a-customer).
2. [Create a new draft invoice](https://docs.stripe.com/invoicing/dashboard.md#create-invoice) by adding invoice line items with a description, quantity, unit price, and tax rate.
3. [Set the invoice payment method](https://docs.stripe.com/invoicing/dashboard.md#create-invoice). You can collect payment for an invoice either by automatically charging the payment method on file, or by emailing the invoice to the customer.
4. Finalize the invoice.

See the [one-off invoices documentation](https://docs.stripe.com/invoicing/dashboard.md#create-invoice) for full details on how to create and collect payment for one-off invoices.

### Store a customer credit balance 

The [customer credit balance](https://docs.stripe.com/billing/customer/balance.md) feature allows you to assign credit and debit adjustments to a specific customer. The resulting balance is applied to future invoices for that customer.

### Add and validate tax ID numbers

Displaying a customer’s tax ID on invoice documents is a common requirement. With Stripe, you can add one or multiple [tax IDs](https://docs.stripe.com/billing/customer/tax-ids.md) to a customer. A customer’s tax IDs are displayed in the header of invoice and credit note PDFs. See the [Tax IDs](https://docs.stripe.com/billing/customer/tax-ids.md) page for more details.

### Set the currency for a customer 

The `currency` property is a three-letter [ISO code for the currency](https://docs.stripe.com/currencies.md) that you charge the customer in for recurring billing purposes. You can set the currency in the Dashboard by navigating to the **Customers** > **Details** page and clicking **Update details**. After you set the currency, you can’t change it. Creating an invoice, invoice item, or credit balance for the customer also permanently sets the customer’s currency.
