# Automatically collect tax on invoices

Learn how to automatically calculate tax on your invoices.

> [Log in](https://dashboard.stripe.com/settings/tax) or [sign up](https://dashboard.stripe.com/register) for Stripe to enable Stripe Tax.

On an *invoice* (Invoices are statements of amounts owed by a customer. They track the status of payments from draft through paid or otherwise finalized. Subscriptions automatically generate invoices, or you can manually create a one-off invoice), Stripe Tax calculates sales tax, VAT, and GST. To calculate these for each line item, Stripe uses:

- Your [tax settings](https://dashboard.stripe.com/settings/tax)
- The customer’s tax settings and location
- The product tax code and price tax behavior

Stripe calculates the tax at the published rate at the time of invoice finalization. For example, if you initialize an invoice draft on December 20 and set it to finalize on January 15, then January 1 introduces a new tax rate. Subsequently, Stripe calculates the invoice at the new rate.
[Watch on YouTube](https://www.youtube.com/watch?v=_A2tC63ooSs)
## Set up the customer

We use the customer’s location to determine the relevant taxes to collect. Different countries have different setup requirements:

- Customers outside of the US require at least a country-level address.
- Customers in the US require a 5-digit postal code.
- Customers in Canada require either the province or postal code.

#### Dashboard

You can add customer location information in the **Customer details** page by clicking **Edit** next to **Details**. To add a customer’s location from the [Invoice Editor](https://dashboard.stripe.com/invoices/create), click the overflow menu (⋯) next to the customer. Select **Edit customer information**, click **Add additional details**, and scroll down to **Billing details**.

After you update the location, click **Update customer**. Stripe applies the new location to all of your customer’s future invoices unless you update it. For more information, see [Determine customer locations](https://docs.stripe.com/tax/customer-locations.md).

#### API

#### Accounts v2

Create a customer-configured [Account](https://docs.stripe.com/accounts-v2/use-accounts-as-customers.md) with the `automatic_indirect_tax` capability, and provide as much information as possible to help identify their location and tax requirements. [Include](https://docs.stripe.com/api/v2/core/accounts/create.md#v2_create_accounts-include) `configuration.customer` to see the capability status in the response. We recommend populating [identity.individual.address](https://docs.stripe.com/api/v2/core/accounts/object.md#v2_account_object-identity-individual-address) or [identity.business_details.address](https://docs.stripe.com/api/v2/core/accounts/object.md#v2_account_object-identity-business_details-address) with the complete address.

```curl
curl -X POST https://api.stripe.com/v2/core/accounts \
  -H "Authorization: Bearer <<YOUR_SECRET_KEY>>" \
  -H "Stripe-Version: 2026-05-27.preview" \
  --json '{
    "identity": {
        "country": "US",
        "individual": {
            "address": {
                "line1": "510 Townsend St",
                "city": "San Francisco",
                "state": "CA",
                "country": "US",
                "postal_code": "94103"
            }
        }
    },
    "configuration": {
        "customer": {
            "capabilities": {
                "automatic_indirect_tax": {
                    "requested": true
                }
            }
        }
    },
    "include": [
        "configuration.customer"
    ]
  }'
```

If Stripe can’t resolve the address, we create the account with [configuration.customer.capabilities.automatic_indirect_tax.status](https://docs.stripe.com/api/v2/core/accounts/object.md#v2_account_object-configuration-customer-capabilities-automatic_indirect_tax-status) as `restricted`. You can [update the account](https://docs.stripe.com/api/v2/core/accounts/update.md) later to validate the address using `configuration.customer.automatic_indirect_tax.validate_location="immediately"`.

Instead of a physical address, you can provide their IP address:

```curl
curl -X POST https://api.stripe.com/v2/core/accounts \
  -H "Authorization: Bearer <<YOUR_SECRET_KEY>>" \
  -H "Stripe-Version: 2026-05-27.preview" \
  --json '{
    "configuration": {
        "customer": {
            "automatic_indirect_tax": {
                "ip_address": "203.0.113.0"
            }
        }
    }
  }'
```

#### Customer v1

Create a customer, providing as much information as possible to help identify their location and tax requirements. We recommend populating [customer.address](https://docs.stripe.com/api/customers/create.md#create_customer-address) with your customer’s complete billing address.

Validate the customer address at creation by setting [tax.validate_location](https://docs.stripe.com/api/customers/create.md#create_customer-tax-validate_location) to `immediately`. You can also [expand](https://docs.stripe.com/api/expanding_objects.md) the [tax](https://docs.stripe.com/api/customers/create.md#create_customer-tax) property to confirm the location that Stripe Tax identified for your customer.

```curl
curl https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "description=a new user" \
  -d "address[line1]=510 Townsend St" \
  -d "address[city]=San Francisco" \
  -d "address[state]=CA" \
  -d "address[country]=US" \
  -d "address[postal_code]=94103" \
  -d "tax[validate_location]=immediately" \
  -d "expand[]=tax"
```

Instead of a physical address, you can provide their IP address:

```curl
curl https://api.stripe.com/v1/customers \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "description=a new user" \
  -d "tax[ip_address]=203.0.113.0" \
  -d "tax[validate_location]=immediately" \
  -d "expand[]=tax"
```

The expanded `tax` property indicates the computed tax location and whether the customer is compatible with automatic tax calculation:

```json
{
  "id": ""{{CUSTOMER_ID}}"",
  "object": "customer",
  // ... other properties omitted
  "tax": {
    "location": {
      "country": "US",
      "state": "CA",
      "source": "billing_address"
    },
    "ip_address": null,"automatic_tax": "supported"
  }
}
```

The [tax.automatic_tax](https://docs.stripe.com/api/customers/object.md#customer_object-tax-automatic_tax) property can have the following values:

| Status                  | Description                                                                     | Possible Action                                                                                                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `supported`             | Automatic tax is fully supported.                                               | No further action needed.                                                                                                                                                                                          |
| `unrecognized_location` | The address isn’t valid for determining a tax location.                         | Ask the customer for an updated address and set `customer.address` to the new value.                                                                                                                               |
| `not_collecting`        | The address resolves to a location for which you haven’t set up a registration. | Depending on your tax obligations, you can either proceed and Stripe Tax won’t assess any taxes, or you can [add a new registration](https://docs.stripe.com/tax/registering.md) for this customer’s jurisdiction. |
| `failed`                | An error occurred with Stripe’s servers. This is rare.                          | Try the request again, or contact Stripe support for additional assistance.                                                                                                                                        |

## Set up line items

To calculate tax on each line item on an invoice, you need to set a tax behavior and optionally a tax code.

### Customize tax settings for one-off line items

Customize line items in the Invoice Editor by selecting the tax behavior from the **Include tax in price** drop-down menu.

### Customize tax settings for product-based line items 

You can use both the Dashboard and the API to customize tax settings for product-based line items.

#### Dashboard

On the [Products page](https://dashboard.stripe.com/products), you can select both the tax behavior for a particular price and the optional tax code for the product. The tax behavior is per price. You can’t change the tax behavior after you select it, but you can create new prices or archive old ones. To set up a tax behavior, click **Add a price** (or **Add another price** if you already have one) and select it from the **Tax behavior** drop-down menu.

To set up a tax code, select it from the **Tax code** drop-down menu when you create a new product or edit the details of an existing one.

#### API

Stripe Tax uses information stored on the [Products](https://docs.stripe.com/api/products.md) and [Prices](https://docs.stripe.com/api/prices.md) objects to determine the rates and rules to apply when calculating tax. Update the products and prices you use with Invoices to include:

- [Tax behavior](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#tax-behavior)—either *inclusive* or *exclusive*. This determines whether or not tax is already included in your pricing. For example, an inclusive line item with an amount of 10 USD totals to 10 USD, whereas an exclusive line item with an amount of 10 USD totals to 10 USD plus tax. Exclusive pricing is common practice in US markets and for B2B sales, while inclusive is common practice for B2C buyers in many markets outside the US. Setting the tax behavior explicitly on a price is optional, if you [set up the default tax behavior](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md#set-tax-behavior-on-price) in the [Stripe Tax settings](https://dashboard.stripe.com/login?redirect=%2Fsettings%2Ftax). You can override the default tax behavior setting by setting a tax behavior on a price.

- [Tax code](https://docs.stripe.com/tax/products-prices-tax-codes-tax-behavior.md) (Optional)—a selection from a list of options that determine what type of product it’s. Some examples include “Audio book," “Gift card," or “Software as a service." If you don’t set this explicitly, your preset tax code applies.

> You can’t change `tax_behavior` after it’s set to either *exclusive* or *inclusive*. If you want to change the tax behavior of a price, you need to create a new price with the desired behavior, and archive the old price.

```curl
curl https://api.stripe.com/v1/prices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d unit_amount=5000 \
  -d currency=usd \
  -d tax_behavior=exclusive \
  -d "product_data[name]=A new product"
```

## Enable automatic tax

#### Dashboard

Enable the **Use automatic tax collection** toggle on the [tax settings](https://dashboard.stripe.com/settings/tax/integrations) page to automatically enable tax calculation on *new* invoices you create in the Dashboard.

### Update untaxed invoices 

To enable automatic tax calculation for existing invoices:

1. Click **Edit invoice** from the **Invoice details** page, or click the invoice’s overflow menu (⋯), then **Edit invoice** from the [Invoices page](https://dashboard.stripe.com/test/invoices) to create a new draft in the **Invoice Editor**.
2. In the editor, turn on the **Collect tax automatically** toggle.
3. If customer is missing address information required for tax calculation, a notification badge alerts you and provides instructions to resolve the problem.
4. Save the invoice to enable automatic tax calculations on all future instances of the invoice. Learn more about [editing invoices after finalization](https://docs.stripe.com/invoicing/invoice-edits.md).

### Update invoices with existing tax rates 

To replace invoice [tax rates](https://docs.stripe.com/tax/tax-rates.md) with automatic tax calculation, follow the previous steps to edit the invoice. Then remove the applied tax rates and enable the **Collect tax automatically** toggle.

#### API

#### Customer v1

After specifying a tax behavior and tax code, you can add the price to the customer as an invoice item:

```curl
curl https://api.stripe.com/v1/invoiceitems \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "pricing[price]={{PRICE_ID}}"
```

In the API, pass the `automatic_tax` field to enable or disable automatic tax calculation.

```curl
curl https://api.stripe.com/v1/invoices \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "customer={{CUSTOMER_ID}}" \
  -d "automatic_tax[enabled]=true"
```

To enable automatic tax calculation when you update an invoice, set `automatic_tax[enabled]` to `true`:

```curl
curl https://api.stripe.com/v1/invoices/{{INVOICE_ID}} \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "automatic_tax[enabled]=true"
```

## See also

- [Determine customer locations](https://docs.stripe.com/tax/customer-locations.md)
- [Understand zero tax amounts](https://docs.stripe.com/tax/zero-tax.md)
- [Test your tax integration](https://docs.stripe.com/tax/testing.md)
- [Reporting and filing](https://docs.stripe.com/tax/reports.md)
- [Use Stripe Tax with Connect](https://docs.stripe.com/tax/connect.md)
