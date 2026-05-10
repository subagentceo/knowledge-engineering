# Affirm payments

Offer your US and Canadian customers flexible financing while getting paid upfront with Affirm.

[Affirm](https://www.affirm.com/) is a popular payment method in the US and Canada that gives your customers a way to split purchases over a series of payments. Pay in 4 interest-free installments or in monthly installments of up to 36 months.

For information on payment method transaction fees, refer to [pricing details](https://stripe.com/pricing/local-payment-methods#affirm).

To pay with Affirm, customers are redirected to Affirm’s site, where they [authorize](https://docs.stripe.com/payments/payment-methods.md#customer-actions) the payment by agreeing to the terms of a payment plan, then return to your website to complete the order. Affirm offers payment options based on factors such as customer credit, prior account history, order amount, and the type of goods or services being underwritten. After payment acceptance, the full amount of the order (minus fees) is made available to your Stripe account upfront, and Affirm collects the purchase amount from your customer, who repays Affirm directly over time.

#### Payment method properties

- **Customer locations**

  United States, Canada

- **Presentment currency**

  USD or CAD

- **Payment confirmation**

  Customer-initiated

- **Payment method family**

  Buy now, pay later

- **Recurring payments**

  No

- **Payout timing**

  Standard

- **Connect support**

  Yes

- **Dispute support**

  [Yes, by email from Stripe](https://docs.stripe.com/payments/affirm.md#disputes-and-fraud)

- **Manual capture support**

  Yes

- **Refunds / Partial refunds**

  [Yes / Yes](https://docs.stripe.com/payments/affirm.md#refunds)

#### Business locations

Stripe accounts in the following countries can accept Affirm payments:

- CA
- US

#### Product support

- Connect
- Payment Links
- Checkout1

- Elements2

- Invoicing3

- Terminal

1Not supported when using Checkout in subscription mode or setup mode.2Express Checkout Element doesn’t support Affirm.3Not supported for subscription invoices.

> Affirm only supports domestic transactions, meaning you can only sell to customers in the same country as your business. If you’re using [Dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods.md), Stripe handles a customer’s payment method eligibility automatically. If you use [payment_method_types](https://docs.stripe.com/api/payment_intents/object.md#payment_intent_object-payment_method_types), you must either configure your integration so that it only presents Affirm to eligible customers, or use dynamic payment methods.

## Payment flow 

Below is a demonstration of the Affirm payment flow from your checkout page:
![](https://d37ugbyn3rpeym.cloudfront.net/videos/affirm_checkout.mp4)
## Get started 

You don’t have to integrate Affirm and other payment methods individually. If you use our front-end products, Stripe automatically determines the most relevant payment methods to display. Go to the [Stripe Dashboard](https://dashboard.stripe.com/settings/payment_methods) and enable Affirm. To get started with one of our hosted UIs, follow a quickstart:

- [Checkout](https://docs.stripe.com/checkout/quickstart.md): Our prebuilt, hosted checkout page.
- [Elements](https://docs.stripe.com/payments/quickstart-checkout-sessions.md): Our drop-in UI components.

[Payment Links](https://docs.stripe.com/payment-links.md) also supports adding Affirm from the Dashboard.

If you prefer to manually list payment methods, learn how to [manually configure Affirm as a payment](https://docs.stripe.com/payments/affirm/accept-a-payment.md). To accept in-person payments you need to manually list Affirm. Learn how to [accept Affirm on Terminal smart readers](https://docs.stripe.com/terminal/payments/additional-payment-methods.md).

You can also let customers know Affirm payments are available by including the [Payment Method Messaging Element](https://docs.stripe.com/elements/payment-method-messaging.md) on your product, cart, and payment pages. We recommend adding a site messaging Element to help drive conversion.

## Payment options

Depending on the cart order size, Affirm presents customers with Pay in 30, Pay in 4, or monthly installment offers. Term lengths and cart ranges are determined by Affirm and might change at their discretion. Regardless of the underlying payment option selected, Stripe makes the full amount of the funds (minus fees) available to you upfront and Affirm collects the purchase amount from your customer, who repays Affirm directly. These options include:

- **Pay in 30**: Customers pay for the purchase in a single payment in 30 days, interest-free.
- **Pay in 4**: Customers pay for purchases in four interest-free, biweekly payments over a 6 week term.
- **Monthly installments**: Customers pay for purchases over a longer term of up to 36 months, which might include interest.

Affirm supports two *financing packages* (A financing package is a configuration on your Stripe account to set the Affirm payment option terms for your buyers): Standard and Enhanced. By default, businesses get the Standard financing package. Businesses with Stripe Dashboard access can view or change their financing package on the [Payment methods settings page](https://dashboard.stripe.com/login?redirect=%2Fsettings%2Fpayment_methods), except for connected accounts and platforms. Financing packages are identical across the US and Canada.

#### Standard

| Order minimum (USD and CAD) | Order maximum (USD and CAD) | Available payment options                                                             |
| --------------------------- | --------------------------- | ------------------------------------------------------------------------------------- |
| 35 (USD only)               | 49.99 (USD only)            | - Pay in 30 days - 0% APR (USD only)                                                  |
| 50                          | 99.99                       | - Pay in 4 - 0% APR                                                                   |
| 100                         | 499.99                      | - Pay in 4 - 0% APR
  - 6 months - interest bearing
  - 12 months - interest bearing  |
| 500                         | 699.99                      | - 3 months - 0% APR
  - 6 months - interest bearing
  - 12 months - interest bearing  |
| 700                         | 1,699.99                    | - 6 months - 0% APR
  - 12 months - interest bearing
  - 18 months - interest bearing |
| 1,700                       | 30,000                      | - 6 months - 0% APR
  - 12 months - interest bearing
  - 36 months - interest bearing |

Rates vary from 10% to 36% APR, subject to eligibility. For example, a 800 USD purchase might cost 72.12 USD per month over 12 months at 15% APR. See [Affirm lending terms](http://affirm.com/disclosures) for more details. Platforms don’t qualify for the pay in 30 and monthly installments with 0% APR plans.

#### Enhanced

| Order minimum (USD and CAD) | Order maximum (USD and CAD) | Available payment options                                                   |
| --------------------------- | --------------------------- | --------------------------------------------------------------------------- |
| 35 (USD only)               | 49.99 (USD only)            | - Pay in 30 days - 0% APR (USD only)                                        |
| 50                          | 99.99                       | - Pay in 4 - 0% APR                                                         |
| 100                         | 499.99                      | - Pay in 4 - 0% APR
  - 6 months - 0% APR
  - 12 months - interest bearing  |
| 500                         | 699.99                      | - 3 months - 0% APR
  - 6 months - 0% APR
  - 12 months - interest bearing  |
| 700                         | 1,699.99                    | - 6 months - 0% APR
  - 12 months - 0% APR
  - 18 months - interest bearing |
| 1,700                       | 30,000                      | - 6 months - 0% APR
  - 12 months - 0% APR
  - 36 months - interest bearing |

Rates vary from 10% to 36% APR, subject to eligibility. For example, a 800 USD purchase might cost 72.12 USD per month over 12 months at 15% APR. See [Affirm lending terms](http://affirm.com/disclosures) for more details. Platforms don’t qualify for the pay in 30 and monthly installments with 0% APR plans.

## Prohibited and restricted business categories

For more information about Affirm eligibility for your account, go to your [Payment methods settings](https://dashboard.stripe.com/settings/payment_methods).

In addition to the categories of [businesses restricted from using Stripe overall](https://stripe.com/restricted-businesses), the following categories are prohibited from using Affirm in all countries or are subject to additional requirements.

- Business to business services
- Home improvement services, including contractors and special trade contractors
- Titled goods and auto loans, including entire cars, boats, and other motor vehicles (parts and services allowed)
- Professional services (including legal, consulting, and accounting)
- NFTs
- Pre-orders

Healthcare services are approved to use Affirm, however they’re subject to additional requirements. For the complete list of prohibited businesses and additional requirements, see [the Affirm Payment Terms](https://stripe.com/legal/affirm).

## Add Affirm branding to your website

Use the [Payment Method Messaging Element](https://docs.stripe.com/elements/payment-method-messaging.md) on your site to let customers know that you offer Affirm ahead of checkout. You must comply with Affirm’s [marketing compliance guides](https://docs.affirm.com/developers/docs/compliance_and_guidelines) and use the Affirm [guide](https://businesshub.affirm.com/hc/en-us/articles/10653174159636-Affirm-Marketing-Compliance-Guides) that relates to the Affirm payment options you offer your customers.

## Refunds

Returns are subject to the return policy that you display on your website. If your business allows returns, you can [refund](https://docs.stripe.com/refunds.md) Affirm transactions as you normally would for card payments by calling the [Refunds API](https://docs.stripe.com/api/refunds.md) or refunding the payment from the [Dashboard](https://dashboard.stripe.com/payments). Affirm supports both full and partial refunds, and you can issue multiple partial refunds against a single payment. Refunds can be submitted up to 120 days after the original purchase. After Stripe initiates the refund with Affirm, Affirm pauses the customer’s payment plan and credits the customer for any payments they’ve already made, minus any interest paid. Stripe doesn’t credit back the processing fees in the event of a refund.

Affirm processes refunds asynchronously—the refund object remains in a `pending` state until Affirm confirms it. You can’t cancel a refund after it begins processing. If a dispute is currently open for a payment, you can’t create a refund on that payment until the dispute is resolved. You can check the status of a refund in the [Stripe Dashboard](https://dashboard.stripe.com/payments) or through the [Refunds API](https://docs.stripe.com/api/refunds.md). Customers can check the status of their refund by logging into their Affirm account.

Stripe notifies you of the final refund status using the [refund.updated](https://docs.stripe.com/api/events/types.md#event_types-refund.updated) or [refund.failed](https://docs.stripe.com/api/events/types.md#event_types-refund.failed) *webhook* (A webhook is a real-time push notification sent to your application as a JSON payload through HTTPS requests) event. When a refund succeeds, the [Refund](https://docs.stripe.com/api/refunds/object.md) object’s status transitions to `succeeded`. If the refund fails, the Refund object’s status transitions to `failed` and Stripe returns the amount to your Stripe balance. In these cases, you need to arrange an alternative way of providing your customer with a refund.

## Disputes 

Customers must authenticate Affirm payments by logging into their Affirm account. This requirement helps reduce the risk of fraud or unrecognized payments. While Affirm covers losses incurred from customer fraud, Stripe might contact you on behalf of Affirm and request to stop or pause shipment before any losses are incurred. Comply promptly with these requests.

Customers can dispute Affirm payments in certain cases—for example, if they receive faulty goods or don’t receive them at all. Customers can file a dispute after the date of purchase and there isn’t a time limitation for filing. The dispute process works like this:

After the customer initiates a dispute, Stripe notifies you using:

- Email notification
- Stripe Dashboard
- An API `charge.dispute.created` event (if your integration is set up to receive [webhooks](https://docs.stripe.com/webhooks.md))

Stripe holds back the disputed amount from your balance until Affirm resolves the dispute, which can take a maximum of 30 calendar days from dispute creation.

Stripe requests that you upload compelling evidence that you fulfilled the purchase order [using the Stripe Dashboard](https://docs.stripe.com/disputes/responding.md#respond). This evidence can include:

- Received return confirmation (for shipped goods returned from the customer to you)
- Tracking ID
- Shipping date
- Record of purchase for intangible goods, such as IP address or email receipt
- Record of purchase for services or physical goods, such as phone number or proof of receipt

If you prefer to handle disputes programmatically, you can [respond to disputes using the API](https://docs.stripe.com/disputes/api.md).

This information helps Affirm determine if a dispute is valid or if they should reject it. Make sure the evidence you provide contains as much detail as possible from what the customer provided at checkout. You must submit the requested information within 15 calendar days. Affirm makes a decision within 15 calendar days of evidence submission. If Affirm resolves the dispute with you winning, Stripe returns the disputed amount to your Stripe balance. If Affirm rules in favor of the customer, the balance charge becomes permanent.

## Customer emails

After a customer uses Affirm to make a purchase, Affirm emails the customer with updates. These updates include information about the following events:

- Affirm confirms or denies a loan. Affirms sends these updates when the payment_intent succeeds or when Affirm denies the loan.
- A [refund](https://docs.stripe.com/refunds.md) completes.
- A payment is canceled, which results in Affirm canceling the loan.
- The customer completes a payment as part of the payment plan.

Affirm only sends email updates about Affirm’s loan issuance to your customer. Continue to separately send emails related to the purchase such as order confirmation and shipping updates.

## Connect

You can use [Stripe Connect](https://docs.stripe.com/connect.md) with Affirm to process payments on behalf of a connected account. *Connect* (Connect is Stripe's solution for multi-party businesses, such as marketplace or software platforms, to route payments between sellers, customers, and other recipients) users can use Affirm with the following charge types:

- [Direct](https://docs.stripe.com/connect/direct-charges.md)
- [Destination](https://docs.stripe.com/connect/destination-charges.md)
- [Separate Charges and Transfers](https://docs.stripe.com/connect/separate-charges-and-transfers.md)

### Request Affirm capability

You must turn on the Affirm payment method in [your platform settings](https://dashboard.stripe.com/settings/payment_methods) and [request](https://docs.stripe.com/connect/account-capabilities.md#requesting-unrequesting) the `affirm_payments` capability for your connected accounts that will accept Affirm payments.

### Set correct MCC

Stripe and Affirm rely on merchant category codes (MCC) to determine eligibility of the connected accounts against the Affirm [prohibited business categories](https://docs.stripe.com/payments/affirm.md#prohibited-and-restricted-business-categories). Make sure that you set [correct MCCs](https://docs.stripe.com/connect/setting-mcc.md) for your connected accounts that use the Express Dashboard or a dashboard that isn’t hosted by Stripe.

### Merchant of record

The [charge type](https://docs.stripe.com/connect/charges.md) of Connect payments might change the merchant name that appears on Affirm’s website or app during the redirect. The merchant of record determines the Stripe account authorized to create payments with a particular [PaymentMethod](https://docs.stripe.com/api/payment_methods/object.md).

## Buyer country filtering

Buyer country filtering applies when you enable a dynamic payment method on the Payment Element or Checkout Session. Affirm only displays as a payment method option if the buyer’s country is supported.

We determine the buyer’s country in the following priority order:

1. Shipping address country - The two-letter country code, not the full name of the country.
1. Geocoded country - The country based on the client-side IP address.
