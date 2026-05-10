# Custom payment methods

Extend your integrations with additional payment methods processed outside of Stripe.

Custom payment methods allow you to extend your payment and billing integrations with payment methods processed outside of Stripe. For a list of payment methods offered by Stripe, see the [payment method overview page](https://docs.stripe.com/payments/payment-methods/overview.md).

While you process custom payment method transactions outside of Stripe, you can still [record the transaction details](https://docs.stripe.com/api/payment-record/report-payment/report.md) to your Stripe account to unify reporting and build back office workflows.

## Configure custom payment method types

In the Dashboard, create the custom payment method type your customers will pay with. Custom payment method types allow you to specify branding for the custom payment methods you define for each customer. For example, if you’re using `SamplePay` as another processor, you might want to create a `SamplePayCard` to represent cards that you process with `SamplePay`.

Go to [Custom payment method types](https://dashboard.stripe.com/settings/custom_payment_methods) in the Dashboard. At the end of these steps, you’ll have one or more custom payment method types defined that you can offer your customers when they checkout.

1. Create a custom payment method type.
1. Set the display name and logo for the custom payment method type. Alternatively, use one of over 50 preset methods for common payment methods processed outside of Stripe.

> Set your own display name and logo if you use a custom front end or want the logo to display when interacting with the custom payment method through the [Payment Methods API](https://docs.stripe.com/api/payment_methods.md). A preset is suitable if you rely on Payment Element to render the custom payment method.

> Make sure your custom payment method display name and logo align with our [marks policy](https://docs.stripe.com/payments/payment-methods/custom-payment-methods.md#marks-requirements).

1. Click **Create** to make a new payment method type, `SamplePayCard`, which you can then use to set up a custom payment method.
1. You can see the created custom payment method type details in the Dashboard.
1. Custom payment method types aren’t retrievable through the API. We recommend storing the ID in your database and retrieving it during payment method creation.

### Payment Methods 

Create and retrieve custom payment methods with the [Payment Methods API](https://docs.stripe.com/api/payment_methods.md). When creating them, pass the ID of the custom payment method type you configured in the Stripe Dashboard as `custom[type]`.

```curl
curl https://api.stripe.com/v1/payment_methods \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d type=custom \
  -d "custom[type]={{CUSTOM_PAYMENT_METHOD_TYPE_ID}}"
```

```json
{
  "id": "pm_123456789",
  "object": "payment_method",
  "billing_details": {
    "address": {...},
    "email": "jenny@example.com",
    "name": "Jenny Rosen",
    "phone": "+335555555555"
  },"custom": {
    "display_name": "SamplePayCard",
    "logo": {
      "content_type": "image/jpeg",
      "url": "https://files.stripe.com/files/..."
    },
    "type": "cpmt_..."
  },
  "type": "custom",
  (...)
}
```

## Integrations 

| Payment method         | Connect     | Checkout      | Payment Links | Payment Element | Express Checkout Element | Mobile Payment Element | Subscriptions | Invoicing   | Customer Portal |
| ---------------------- | ----------- | ------------- | ------------- | --------------- | ------------------------ | ---------------------- | ------------- | ----------- | --------------- |
| Custom payment methods | ✓ Supported | - Unsupported | - Unsupported | ✓ Supported     | - Unsupported            | ✓ Supported            | ✓ Supported   | ✓ Supported | ✓ Supported     |

### Payment Element 

The Payment Element can display custom payment methods so you can provide your customers with unified checkout. See [Custom payment methods in Payment Element](https://docs.stripe.com/payments/payment-element/custom-payment-methods.md) to learn more.

### Subscription Billing 

Integrate Stripe Billing with your third-party payment service processors to create subscriptions that automatically charge payment methods not stored on Stripe, manage subscription states, and track payment success for external payments. See [Integrate with third-party payment processors](https://docs.stripe.com/billing/subscriptions/third-party-payment-processing.md) to learn more.

### Connect 

Your platform account can create custom payment methods in its connected accounts using its own custom payment method types, as well as the connected account’s custom payment method types.

```curl
curl https://api.stripe.com/v1/payment_methods \
  -u "<<YOUR_SECRET_KEY>>:" \
  -H "Stripe-Account: {{CONNECTEDACCOUNT_ID}}" \
  -d type=custom \
  -d "custom[type]={{CUSTOM_PAYMENT_METHOD_TYPE_ID}}"
```

## Compliance 

### Ongoing availability of custom payment methods and PSP integrations 

Stripe might at any time decide to remove or block the availability of any payment method as a custom payment method (for example, if required to do so by a governmental authority). Stripe notifies you of any removal of a custom payment method that you’re using, and you must immediately remove the custom payment method in your code. Failure to do so results in the custom payment method not rendering to your customers.

### Restricted custom payment methods 

The following payment methods or types of payment methods are prohibited from being used with custom payment methods and third-party payment processors:

- In Indonesia and Thailand:
  - The [crypto payment methods](https://market.sec.or.th/public/idisc/th/Viewmore/invalert-head?LicenseType=03&PublicFlag=Y) provided by the operators
  - Any other crypto-related payment methods

### Marks requirements 

The use of name, logo, icon, design element or anything else that can identify a payment method (“Marks”) must adhere to the following guidance:

- Follow any Marks guidelines of that payment method provider (for example, [terms](https://stripe.com/legal/marks) for use of Stripe Marks).
- Don’t alter or modify the payment method Marks, unless you have permission to do so.
- Don’t use the payment method Marks in violation of your obligations to that payment method provider.
- Don’t use Marks of one payment method provider for another payment method provider.
- Don’t use methods, devices or designs to obfuscate or mislead as to the true underlying payment method.
- Don’t use the payment method Marks in violation of any laws or regulations.

### Disclaimer 

By using custom payment methods (CPM) and [third-party payment processors](https://docs.stripe.com/billing/subscriptions/third-party-payment-processing.md), you acknowledge that:

- The third-party payment services provider (PSP) provides operation and support of CPMs and your third-party payment processors integration.
- Your chosen PSP complies with applicable laws, including anti-money laundering (AML) and sanctions laws.
- You’re responsible for maintaining a direct integration with the PSP.
- You must maintain an agreement with the PSP and must comply with your agreements with each PSP.
- You’re responsible for obtaining all necessary [rights to use the PSP’s marks and logos](https://docs.stripe.com/payments/payment-methods/custom-payment-methods.md#marks-requirements) within your checkout.
- Stripe isn’t responsible for the processing of any transactions with any PSP including, for example, any charges, refunds, disputes, settlements, or funds flows.
- You or the PSP are responsible for the completion of the purchase flow after a customer has selected a CPM, including, for example, the order confirmation and reconciliation of orders.
- You’re responsible for properly configuring the CPM and third-party payment processor integration, which might include configuring a redirect URL.
- You must immediately remove any CPM and disable your PSP integration in the event your agreement with any PSP terminates or Stripe, at its sole discretion, gives you notices or documents its [prohibition of use of that type of custom payment method](https://docs.stripe.com/payments/payment-methods/custom-payment-methods.md#restricted-custom-payment-methods).
- You can’t integrate with [restricted PSPs](https://docs.stripe.com/payments/payment-methods/custom-payment-methods.md#restricted-custom-payment-methods).
- You’re solely responsible for correctly presenting buyers with their chosen CPM.
- You won’t misrepresent that Stripe processes payments for the CPMs you present to your customers.
- As a third-party payment processor user, you’ve obtained the requisite permission to enable Stripe to collect, use, retain, and disclose the data provided through the integration (“PSP Data”).
- You authorize Stripe to access and use the PSP Data to provide and update the Stripe services, comply with legal and financial partner requirements, and prevent and mitigate fraud, financial loss, and other harm.
- To the extent permitted by law, upon Stripe’s written request, you agree to provide Stripe with information about transactions with PSPs using the services so that Stripe can comply with any investigations, administrative inquiries, legal requirements, audits, and demands or inquiries from consumers, businesses, or PSPs.

> Consult with legal counsel to confirm what additional requirements specific to your business you might need to comply with before using these services.
